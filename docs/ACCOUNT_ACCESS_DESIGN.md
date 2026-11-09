# Account and Access-Control Design

## Identity provider

Avelune will use Amazon Cognito User Pools (Essentials plan) as the identity provider. The FastAPI foundation verifies Cognito RS256 access tokens and reads explicitly assigned Cognito groups. Cognito authenticates the user; it does not by itself authorize access to patient records or prove a professional licence.

See AWS_COGNITO_SETUP.md for pool configuration and rollout steps.

## Roles

- **Patient:** owns their profile and authorises access to selected information.
- **Caregiver:** receives only the specific permissions a patient grants; no automatic access based on family relationship.
- **Clinician/provider:** must complete identity, professional credential, licence and service-location verification before being discoverable or issuing payable invoices.
- **Administrator:** operational access only, with privileged actions separately authorised and audited. Admin access is not blanket permission to read clinical records.

Expected Cognito groups: avelune-patient, avelune-caregiver, avelune-clinician and avelune-admin. Users must not self-assign clinician or admin groups. Privileged group membership requires a reviewed operator process and MFA.

## Required access rules

- Deny access by default; enforce authorisation in the API for every resource and action.
- A caregiver grant is patient-controlled, scoped (for example appointment coordination, selected documents, or paying an invoice), time-bounded where appropriate, revocable and auditable.
- A caregiver must not independently grant themselves additional scopes.
- Children and people requiring supported decision-making need a jurisdiction-appropriate guardian/representative workflow and safeguarding review.
- Clinician access must be tied to a legitimate care relationship, the minimum necessary data and an expiry/revocation path.
- Require stronger authentication for clinicians and privileged users; support secure account recovery and session revocation.
- Do not use role names supplied by the browser as proof of authority.

## Data model groundwork

Recommended PostgreSQL entities: users, patient_profiles, provider_profiles, provider_credentials, caregiver_grants, care_relationships, sessions, audit_events, invoices, payment_attempts, payment_events and consent_records.

Use opaque UUID identifiers, Cognito subject as the external identity key, unique normalized login identifiers, secure session handling, database constraints, migration history and encrypted backups. Never store plaintext passwords or payment credentials.

## Audit design

Record actor ID, action, resource type/ID, timestamp, result, request correlation ID and minimal reason metadata. Do not put symptoms, diagnosis, treatment notes, tokens, passwords, payment credentials or full document contents in logs.

## Current implementation status

Implemented: Cognito environment configuration, public config endpoint, RS256/JWKS access-token verification, issuer/client/token-use checks, protected /v1/auth/me endpoint, known-group-to-role mapping and tests for configuration and group mapping.

Not yet implemented: browser login/logout and PKCE callback, session lifecycle/revocation, user provisioning, database-backed role assignments, provider credential review, consent grants, resource-level authorization, row-level security and audit writes. No patient health data is accepted or stored by the API.

## Rollout gate

Before storing real patient data, complete privacy impact assessment, consent/lawful-basis review, encryption, key management, retention/deletion, incident response, backup restore tests, penetration testing and clinical/legal review for each launch jurisdiction.
