# Avelune Health API

FastAPI foundation for non-clinical care-navigation content and Cognito access-token verification.

## Run locally

From the repository root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

On Windows PowerShell, activate with .venv\\Scripts\\Activate.ps1.

- Health: GET /health
- Care preparation pathways: GET /v1/care-pathways
- Safety information: GET /v1/safety
- Payment capability disclosure: GET /v1/payment-capabilities
- Public Cognito configuration: GET /v1/auth/config
- Protected identity endpoint: GET /v1/auth/me (Bearer access token required)
- Interactive API docs (development): /docs

Set AVELUNE_ALLOWED_ORIGINS to a comma-separated allowlist of exact frontend origins before deployment. Do not use wildcard origins with credentials.

## Cognito configuration

Set AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID and AWS_COGNITO_APP_CLIENT_ID in the API environment. If these are absent, auth config reports disabled and the protected identity endpoint returns 503. The API verifies RS256 Cognito access tokens against the user pool's public JWKS; it does not need AWS access keys.

See ../docs/AWS_COGNITO_SETUP.md for the user-pool setup and rollout checklist.

## Scope and limitations

This service currently serves static, non-personal care-navigation content and a minimal identity verification endpoint. It does not create accounts, run browser login/logout, provision users, store patient records, enforce patient/caregiver/clinician resource permissions, verify clinician credentials, manage consent or integrate live payments. Cognito authenticates an identity; application services must still authorize every resource request. Do not add real health information until authentication, authorization, consent, audit logging, encryption, retention/deletion and jurisdictional privacy requirements have been designed and reviewed.
