# PayPal Payments and Global Currency Design

## Hackathon implementation

PayPal is Avelune Health's primary and only payment rail in this hackathon build. The integration is restricted to PayPal Sandbox.

- Server-side OAuth using the Sandbox REST app client ID and secret.
- Server-created Checkout Orders with a unique PayPal request ID.
- Hosted PayPal approval page; Avelune never handles buyer credentials or card details.
- Server-side order capture after the buyer returns.
- PayPal webhook signature verification through PayPal's verification API.
- The frontend never marks a payment as successful based on a redirect alone.

## Safe demo scope

The current checkout uses a small, synthetic USD service amount for demonstration. It is not a real appointment, therapy session, clinician fee, invoice or request for money. Do not send diagnosis, symptoms, records or other health information to PayPal; use a generic service description only.

The demo is not yet an invoice ledger or provider marketplace. Before charging a real patient, implement verified provider onboarding, immutable itemised invoices, payer authorisation, caregiver authority checks, capture reconciliation, idempotent webhook event processing, refunds, disputes, audit logs and country-specific legal review.

## Global currencies

- Use ISO 4217 alpha-3 currency codes.
- Validate each currency against PayPal's current supported-currency list and the merchant account's country/eligibility before creating an order.
- Never invent exchange rates. If a conversion is required, use PayPal's live quote and display amount, currency, fees, settlement currency and quote expiry before confirmation.
- Store monetary values as integer minor units or decimal values with currency-specific precision, never binary floating point.
- Do not mark an order paid on browser redirect alone. Verify capture state and signed webhooks server-side.

## Secrets

Keep `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` and `PAYPAL_WEBHOOK_ID` in backend secret storage. Do not commit them, put them in Vite variables, or send them through the chat.

## Official documentation

- [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox)
- [PayPal Orders API](https://developer.paypal.com/docs/api/orders/v2/)
- [PayPal REST API authentication](https://developer.paypal.com/api/rest/)
- [PayPal webhook signature verification](https://developer.paypal.com/api/rest/webhooks/rest/)

## Status

PayPal Sandbox order creation, hosted approval, capture and webhook verification endpoints are implemented in the API. They become operational after valid Sandbox credentials and a webhook ID are configured. No live payment processing is enabled.
