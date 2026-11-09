# Avelune Health API

FastAPI foundation for non-clinical care-navigation content.

## Run locally

From the repository root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

On Windows PowerShell, activate with `.venv\\Scripts\\Activate.ps1`.

- Health: `GET /health`
- Care preparation pathways: `GET /v1/care-pathways`
- Safety information: `GET /v1/safety`
- Interactive API docs (development): `/docs`

Set `AVELUNE_ALLOWED_ORIGINS` to a comma-separated allowlist of exact frontend origins before deployment. Do not use wildcard origins with credentials.

## Scope and limitations

This service currently serves static, non-personal care-navigation content only. It does not accept, persist, transmit or expose patient records. It has no authentication, clinician verification, database, payment processing or AI integration. Do not add real health information until authentication, authorization, consent, audit logging, encryption, retention/deletion and jurisdictional privacy requirements have been designed and reviewed.
