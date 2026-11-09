-- Avelune Health PostgreSQL foundation.
-- Apply only after selecting a managed PostgreSQL service, configuring TLS,
-- backups, encryption/key management and a reviewed migration process.
-- This schema does not store clinical notes, diagnoses, documents or credentials.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identity_issuer TEXT NOT NULL,
    identity_subject TEXT NOT NULL,
    email_normalized TEXT,
    role TEXT NOT NULL CHECK (role IN ('patient', 'caregiver', 'clinician', 'admin')),
    account_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (account_status IN ('pending', 'active', 'suspended', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (identity_issuer, identity_subject)
);

CREATE UNIQUE INDEX app_users_email_unique
    ON app_users (email_normalized)
    WHERE email_normalized IS NOT NULL;

CREATE TABLE provider_profiles (
    user_id UUID PRIMARY KEY REFERENCES app_users(id) ON DELETE RESTRICT,
    display_name TEXT NOT NULL,
    provider_type TEXT NOT NULL CHECK (provider_type IN (
        'doctor', 'nurse', 'therapist', 'counsellor', 'caregiver',
        'pharmacist', 'pharmacy', 'other'
    )),
    country_code CHAR(2) NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (verification_status IN ('pending', 'verified', 'rejected', 'suspended')),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (
        (verification_status = 'verified' AND verified_at IS NOT NULL)
        OR verification_status <> 'verified'
    )
);

CREATE TABLE provider_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_user_id UUID NOT NULL REFERENCES provider_profiles(user_id) ON DELETE RESTRICT,
    credential_type TEXT NOT NULL,
    issuing_authority TEXT NOT NULL,
    credential_reference_encrypted BYTEA NOT NULL,
    country_code CHAR(2) NOT NULL,
    valid_until DATE,
    verification_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE caregiver_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE RESTRICT,
    caregiver_user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE RESTRICT,
    scopes TEXT[] NOT NULL CHECK (cardinality(scopes) > 0),
    grant_status TEXT NOT NULL DEFAULT 'active'
        CHECK (grant_status IN ('active', 'revoked', 'expired')),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    CHECK (patient_user_id <> caregiver_user_id),
    CHECK (
        (grant_status = 'revoked' AND revoked_at IS NOT NULL)
        OR grant_status <> 'revoked'
    )
);

CREATE INDEX caregiver_grants_active_lookup
    ON caregiver_grants (patient_user_id, caregiver_user_id)
    WHERE grant_status = 'active';

CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES app_users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    outcome TEXT NOT NULL CHECK (outcome IN ('success', 'denied', 'failure')),
    correlation_id UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Intentionally no free-form payload field: do not log health details,
    -- credentials, tokens, payment credentials or document contents.
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX audit_events_resource_lookup
    ON audit_events (resource_type, resource_id, created_at DESC);

CREATE TABLE service_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_user_id UUID NOT NULL REFERENCES provider_profiles(user_id) ON DELETE RESTRICT,
    patient_user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE RESTRICT,
    service_category TEXT NOT NULL CHECK (service_category IN (
        'home_visit', 'consultation', 'therapy', 'nursing',
        'caregiving', 'pharmacy', 'other'
    )),
    description TEXT NOT NULL,
    amount_minor BIGINT NOT NULL CHECK (amount_minor > 0),
    currency CHAR(3) NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
    invoice_status TEXT NOT NULL DEFAULT 'draft'
        CHECK (invoice_status IN (
            'draft', 'issued', 'awaiting_payment', 'processing', 'paid',
            'failed', 'cancelled', 'partially_refunded', 'refunded',
            'disputed', 'expired'
        )),
    due_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    issued_at TIMESTAMPTZ,
    CHECK (provider_user_id <> patient_user_id)
);

CREATE INDEX service_invoices_patient_recent
    ON service_invoices (patient_user_id, created_at DESC);

CREATE TABLE payment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES service_invoices(id) ON DELETE RESTRICT,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('paypal', 'mpesa', 'bank_transfer')),
    provider_reference TEXT,
    amount_minor BIGINT NOT NULL CHECK (amount_minor > 0),
    currency CHAR(3) NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
    payment_status TEXT NOT NULL DEFAULT 'created'
        CHECK (payment_status IN (
            'created', 'pending', 'processing', 'succeeded',
            'failed', 'cancelled', 'refunded', 'disputed'
        )),
    idempotency_key TEXT NOT NULL UNIQUE,
    provider_event_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    confirmed_at TIMESTAMPTZ,
    UNIQUE (payment_method, provider_reference)
);

CREATE TABLE payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_attempt_id UUID NOT NULL REFERENCES payment_attempts(id) ON DELETE RESTRICT,
    event_type TEXT NOT NULL,
    provider_event_id TEXT NOT NULL UNIQUE,
    amount_minor BIGINT,
    currency CHAR(3),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    occurred_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enforce verified provider status before issuing a service invoice.
CREATE OR REPLACE FUNCTION ensure_verified_invoice_provider()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM provider_profiles
        WHERE user_id = NEW.provider_user_id
          AND verification_status = 'verified'
    ) THEN
        RAISE EXCEPTION 'Only verified providers may issue invoices';
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER service_invoice_verified_provider
    BEFORE INSERT OR UPDATE OF provider_user_id, invoice_status
    ON service_invoices
    FOR EACH ROW
    WHEN (NEW.invoice_status <> 'draft')
    EXECUTE FUNCTION ensure_verified_invoice_provider();

-- Application services must additionally enforce patient consent, grant scopes,
-- row-level access, webhook signatures, idempotent transitions and audit writes.
