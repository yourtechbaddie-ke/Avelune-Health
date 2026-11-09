# Avelune Health — PayPal + AI Hackathon MVP

## Core idea

Avelune Health is an AI-powered cancer-care navigation companion. Belle helps users understand general information, prepare for care conversations and navigate verified institutional resources. PayPal is the primary payment infrastructure for a sandbox demonstration of paid support access.

## Demonstrable journeys

### 1. Ask Belle for help
1. Open the app and select **Chat with Belle**.
2. Use a quick action or ask a general question.
3. Belle calls the server-side AI endpoint and returns a response with links to authoritative public sources.
4. Try appointment preparation or ask how to find an official cancer-care institution.
5. Observe explicit clinical boundaries. Belle does not diagnose, prescribe or choose treatment.

### 2. Find cancer-care institutions
1. Open **Care directory**.
2. Review Kenya starter listings sourced from the National Cancer Institute of Kenya facility portal.
3. Follow the source links and verify current service availability and clinician licensing directly.
4. The directory is a dated, source-linked snapshot, not a live availability or certification guarantee.

### 3. Test PayPal Sandbox
1. Open **Payments**.
2. Start the small synthetic USD checkout.
3. Approve with a PayPal Sandbox buyer account.
4. Return to Avelune; the frontend asks the backend to capture the order.
5. The backend confirms completion with PayPal before showing a completed sandbox capture.
6. No real funds or real clinical services are involved.

### 4. Organise care
1. Switch between patient, caregiver and clinician demonstration modes.
2. Use the local appointment planner, checklist and support-circle list.
3. These entries are session-only demo data and are not shared or saved to a medical record.

## Technology

- React, TypeScript and Vite.
- Python and FastAPI.
- OpenAI API for Belle's server-side language-model responses.
- PayPal REST Orders API in Sandbox for order creation and capture.
- PayPal webhook signature verification endpoint.
- AWS Cognito token-verification foundation (live User Pool connection is separate).
- GitHub Actions frontend build and backend tests.

## Required secrets

Configure only in the backend host's secret manager:
- `OPENAI_API_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`

Never commit secrets or expose them in frontend variables.

## What is intentionally not claimed

- No private patient records are scraped, created or imported.
- No live clinician appointments, video calls, therapist marketplace or clinical service booking is enabled.
- No provider is described as individually verified solely from a facility listing.
- No live payment, payout, refund or real patient charge is enabled.
- No patient-specific treatment, drug, dosage or regimen is recommended.
- The app is not a diagnostic device, clinical record system or emergency service.

## Judging readiness checklist

- [x] Public GitHub repository.
- [x] Open-source MIT license at repository root.
- [x] React + FastAPI application and setup documentation.
- [x] AI chat interface and backend integration code.
- [x] PayPal Sandbox order, approval, capture and webhook verification code.
- [x] Source-linked institutional directory and public medical education resources.
- [ ] Configure live hackathon demo secrets in the backend host.
- [ ] Deploy frontend and API and test the complete hosted flow.
- [ ] Record and publish a public YouTube demo under three minutes.
- [ ] Complete final accessibility, security and browser testing.
