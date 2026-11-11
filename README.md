# Avelune Health

**The Love of Life.** An AI-assisted cancer-care navigation platform connecting patients, caregivers and qualified healthcare professionals. **Belle** is the AI care-navigation companion; **PayPal** is the primary payment rail.

## Hackathon experience

- **Belle AI:** live AI chat through the server-side OpenAI API integration. Belle helps with general cancer-care education, question preparation and care navigation; it must not diagnose, prescribe or recommend individual treatment.
- **PayPal Sandbox:** server-created checkout orders, hosted PayPal approval, server-side capture and webhook-signature verification. Sandbox only; no real charges.
- **Verified Kenya care directory:** source-linked institutional facilities and public institutional contacts, with explicit verification caveats.
- **Evidence-linked education:** links to the National Cancer Institute of Kenya, Kenya National Cancer Treatment Protocols, the US National Cancer Institute's general treatment overview and KMPDC registers.
- Patient/caregiver/clinician demo workspace, session-only notes, appointment planning, care timeline and preparation checklists.\n- **Avelune Connect (planned):** private patient-authorised group conversations, peer support, caregiver/clinician communication and scheduled voice/video calls. The security architecture and implementation gates are documented in [Avelune Connect & Security Architecture](docs/AVELUNE_CONNECT_AND_SECURITY_ARCHITECTURE.md).
- FastAPI backend, React + TypeScript frontend, automated CI.

## Run locally

Requirements: Node.js 20+ and Python 3.12+.

Frontend:
```bash
npm install
cp .env.example .env.local
npm run dev
```

API:
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r backend/requirements.txt
uvicorn app.main:app --app-dir backend --reload --port 8000
```

## Required server environment

Set these only in the backend environment / secret manager. Never commit them or put them in Vite variables:

- `OPENAI_API_KEY` — enables live Belle AI.
- `OPENAI_MODEL` — optional; defaults to `gpt-4.1-mini`.
- `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` — PayPal Developer Sandbox REST app credentials.
- `PAYPAL_API_BASE=https://api-m.sandbox.paypal.com`.
- `PAYPAL_WEBHOOK_ID` — Sandbox webhook ID for the verification endpoint.
- `PAYPAL_RETURN_URL` and `PAYPAL_CANCEL_URL` — browser return destinations.
- `AVELUNE_ALLOWED_ORIGINS` — exact frontend origins, comma separated.
- Optional AWS Cognito variables for the authentication foundation.

Frontend optional setting: `VITE_API_BASE_URL` (for example `http://localhost:8000`). No PayPal secret or AI key belongs in the frontend.

## PayPal Sandbox demo flow

1. Create a REST app in the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox).
2. Add its sandbox client ID and secret to the API host's secret store.
3. Set a sandbox webhook endpoint to `POST /v1/payments/paypal/webhook/verify`, subscribe to relevant checkout/order/capture events, and configure the returned webhook ID.
4. Start Belle chat to test the AI integration.
5. Use the PayPal sandbox buyer account to approve the small test order. The UI return alone does not mark an invoice paid; the API capture endpoint must return `COMPLETED`.

API routes include `GET /health`, `GET /v1/care-pathways`, `GET /v1/safety`, `GET /v1/payment-capabilities`, `POST /v1/belle/chat`, `POST /v1/payments/paypal/orders`, `POST /v1/payments/paypal/orders/{order_id}/capture`, and `POST /v1/payments/paypal/webhook/verify`.

## Verified public information and its limits

The Kenya directory snapshot is based on the [National Cancer Institute of Kenya facility portal](https://portal.ncikenya.go.ke/en/facilities), checked 10 November 2026. The detailed source register and verification policy are in [Verified Public Sources](docs/VERIFIED_PUBLIC_SOURCES.md). KNH and KUTRRH service details also link to their official institutional pages. Facility listings and contact information can change; the snapshot does not guarantee current service availability, NCI certification, SHA contracting, insurance coverage, fees or appointment availability. Confirm directly before travelling or paying. Verify practitioners using the [KMPDC register](https://registers.kmpdc.go.ke/). No private patient records or social-media-sourced personal contact information is included.

General treatment education is linked to the [National Cancer Institute (US)](https://www.cancer.gov/about-cancer/treatment/types) and the [Kenya National Cancer Treatment Protocols](https://uploads.ncikenya.go.ke/uploads/policy/National-cancer-treatment-Protocols-2019.pdf). These describe broad modalities and clinical guidance; they are not patient-specific treatment instructions. Medicine choice, dosage and treatment sequence must be determined by the treating oncology team.

## Important limitations

- Live AI requires an API key and must undergo privacy/security review before real patient data is processed. Do not enter identifying information or upload medical records in this demo.
- PayPal is Sandbox only. No real patient fees, therapy bookings, provider payouts, refunds or production charges are enabled.
- Avelune Connect is currently a documented product direction, not a live messaging or calling service. No user-to-user chat, end-to-end encryption, call scheduling or voice/video calls are implemented yet. Do not advertise these as available.
- Workspace entries are session-only; no real medical record storage is implemented.
- Provider profiles, credentials, appointment calendars and clinician availability are not yet onboarded/verified.
- This is a hackathon prototype, not a clinical service or emergency service. For severe, sudden or rapidly worsening symptoms, seek urgent medical attention.

## License

MIT — see [LICENSE](LICENSE).
