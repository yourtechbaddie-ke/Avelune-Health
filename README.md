# Avelune Health

**The Love of Life.** An inclusive, AI-assisted cancer-care navigation and support platform concept connecting patients, caregivers and qualified healthcare professionals. Belle is the planned AI care companion.

> **Clinical safety:** Avelune Health is a care-navigation prototype, not a diagnostic device or emergency service. Belle must not diagnose cancer, infer disease from images or voice, prescribe treatment, or replace a qualified clinician. For severe, sudden or rapidly worsening symptoms, seek urgent medical care.

## What works in this prototype

- Responsive React + TypeScript web experience.
- Patient and healthcare-professional demo views.
- Session-local symptom journal and general appointment question prompts.
- Care timeline with clearly labelled illustrative content.
- Interactive appointment, information, caregiver and wellbeing preparation checklists.
- FastAPI service for public care-pathway content, platform health and safety guidance.
- Automated frontend build and backend API tests through GitHub Actions.

## What is not connected yet

There are no patient accounts, verified clinician accounts, secure health-record storage, caregiver permissions, real appointments, live consultations, AI conversations, facility directory, or live payment processing. The API intentionally does not accept or store personal health information. All examples are illustrative; use synthetic data only.

## Run locally

Requirements: Node.js 20+ and Python 3.12+.

### Frontend

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vite prints the local frontend URL (normally http://localhost:5173).

### API

In a second terminal:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r backend/requirements.txt
uvicorn app.main:app --app-dir backend --reload --port 8000
```

Available API routes:

- `GET /health` — service health and data-mode disclosure.
- `GET /v1/care-pathways` — public preparation checklists used by the frontend when the API is available.
- `GET /v1/safety` — clinical-safety boundaries and urgent-care guidance.\n- `GET /v1/payment-capabilities` — planned payment rails and currency/security constraints; does not initiate payments.

API documentation is available at http://localhost:8000/docs during local development.

## Environment

Copy `.env.example` to `.env.local` for the frontend. Configure `AVELUNE_ALLOWED_ORIGINS` on the API host as a comma-separated list of exact frontend origins. Never put database credentials, PayPal secrets, health-data keys or AI-provider secrets in Vite/browser variables or source control.

## Planned architecture

- Frontend: React, TypeScript and Vite; responsive PWA foundation.
- API: FastAPI; currently limited to public, non-personal content.
- Data: secure persistence is not implemented. Select and review a database, encryption, backups, access controls and retention design before storing any health information.
- AI: provider-agnostic Belle integration, subject to privacy, consent and clinical-safety review.
- Payments: PayPal, M-Pesa and bank transfer are defined as planned payment rails. Live charges are deliberately disabled; currency handling is designed around ISO 4217 codes, with conversion and provider settlement support still to be integrated.
- Clinical operations: qualified professionals retain responsibility for diagnosis, triage and treatment.

## Privacy and safety

Before real patient use, complete a privacy impact assessment and jurisdiction-specific legal and clinical review. Implement informed consent, data minimisation, encryption in transit and at rest, authentication, least-privilege role permissions, caregiver authorisation and revocation, audit logs, retention/deletion, backups and incident response. Review all AI providers and subprocessors before sending any health information to them.

See [Safety and Privacy Guardrails](docs/SAFETY_AND_PRIVACY.md), the [Hackathon MVP plan](docs/HACKATHON_MVP.md), [Account and Access-Control Design](docs/ACCOUNT_ACCESS_DESIGN.md), and [Payments and Global Currency Design](docs/PAYMENTS_AND_GLOBAL_CURRENCIES.md).

## License

MIT — see [LICENSE](LICENSE).
