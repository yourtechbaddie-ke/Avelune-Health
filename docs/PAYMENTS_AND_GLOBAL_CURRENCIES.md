# Payments and Global Currency Design

## Product goal

A patient can pay an authorised care professional remotely for an itemised service, including a home visit, live consultation, therapy session, nursing/caregiving visit, or another provider-defined service. Medication payments may be supported only through a legally authorised pharmacy or dispensing provider; Avelune must not facilitate unverified medicine sales.

## Payment rails

- **PayPal:** global option where the merchant's country, account and requested currency are supported. Orders are created and captured on the server. Verify webhook signatures and reconcile final capture/refund states.
- **M-Pesa:** first launch market is Kenya. Use Safaricom Daraja directly or a properly contracted payment aggregator. Initiate STK Push server-side and validate callback authenticity, amount, currency, merchant account and transaction reference before marking an invoice paid. A future multi-country mobile-money layer can add locally supported wallets.
- **Bank transfer:** display provider-issued beneficiary details and a unique payment reference. Reconcile from a bank feed or trusted payment provider. A patient-uploaded receipt is supporting evidence only, never final proof of settlement.

Avelune must not assume all methods work in every country. Method visibility depends on the provider's verified country, merchant account, currency and regulatory eligibility.

## Global currency model

- Use ISO 4217 alpha-3 codes (for example KES, USD, EUR, GBP) throughout invoices and payment records.
- Keep the invoice's original amount and currency immutable after issue.
- If a payer chooses another currency, obtain a live quote from the selected payment provider and persist the quoted amount, quote ID, source currency, target currency, expiry and timestamp.
- Show the patient the final amount, currency, any conversion/processing fees and the provider's settlement currency before confirmation.
- Never invent or hardcode exchange rates. Do not promise support for a currency until the chosen rail confirms it.
- Store monetary amounts as integer minor units (or a decimal type with explicit currency precision), never binary floating point. Respect zero- and three-decimal currencies as defined by the currency metadata source.
- Record refunds, partial refunds, reversals and chargebacks as separate immutable ledger events; do not overwrite the original payment event.

## Safe payment lifecycle

1. A verified provider creates an itemised invoice with service description, date, amount, currency, cancellation/refund terms and provider identity.
2. The patient reviews and explicitly authorises the payment. Caregiver payment is allowed only where the patient has granted the required permission.
3. The server creates a payment session with the selected licensed provider. Browser code receives only a short-lived checkout/session reference.
4. The provider confirms settlement through a verified server-to-server webhook or trusted bank reconciliation.
5. The server updates the invoice/payment state idempotently and records a minimal audit event.
6. Both parties receive a receipt and a route to raise a billing dispute or request a refund.

Statuses should distinguish draft, issued, awaiting_payment, processing, paid, failed, cancelled, partially_refunded, refunded, disputed and expired. A browser redirect alone must never establish payment success.

## Security and privacy boundaries

- Never store card numbers, CVV, online-banking passwords, M-Pesa PINs or provider secrets.
- Use hosted/tokenised checkout wherever possible. Keep credentials in server-side secret storage.
- Verify webhook signatures, timestamps and replay protection; use idempotency keys for create/capture/refund operations.
- Separate clinical records from billing data. A payment provider should receive only the minimum transaction description needed; never send diagnosis, treatment notes or symptom history in payment metadata.
- Require verified provider identity and payout-account ownership before accepting provider invoices.
- Do not hold patient funds, offer escrow, or pay out to unverified recipients. Use licensed payment providers and obtain jurisdiction-specific legal review.
- Provide clear receipts, cancellation/refund terms, dispute handling, fraud monitoring and accessible support.
- Payment records and audit events must not include unnecessary health information.

## Current implementation status

The API's `GET /v1/payment-capabilities` endpoint documents the intended rails and global-currency standard. It does **not** create invoices, initiate charges, collect credentials or claim that any payment has succeeded. Live payments remain disabled until merchant accounts, webhook verification, reconciliation, refund handling, security review and country-by-country availability checks are complete.

## Suggested integration sequence

1. Sandbox PayPal checkout and webhook verification.
2. Kenya M-Pesa sandbox with STK Push and callback validation.
3. Bank-transfer instructions plus trusted reconciliation integration.
4. Currency metadata service and provider-backed FX quotes.
5. Provider verification, invoice permissions, refunds/disputes and audited payout flows.
6. Expand payment methods by country only after legal and provider eligibility review.


## Official integration references

- [PayPal Orders API integration](https://developer.paypal.com/whats-an-order/) — server-side order creation and capture; PayPal documents support in countries where PayPal is available and links to supported currency/country references.
- [PayPal REST API integration guide](https://developer.paypal.com/api/rest/integration/orders-api) — order, authorisation and capture lifecycle.
- [PayPal webhook verification](https://developer.paypal.com/api/rest/webhooks/rest/) — subscribe a HTTPS listener and verify incoming event messages before processing them.
- [Safaricom Daraja developer portal](https://developer.safaricom.co.ke/) — official M-PESA API portal with sandbox app simulation and integration guides.

These are implementation references, not evidence that Avelune has merchant credentials, a production account, or a live payment integration.
