# AWS Cognito setup for Avelune Health

## Recommended first deployment

Use an Amazon Cognito Essentials user pool in a region selected after checking data-residency, latency, service availability and applicable health-data requirements. The API verifier supports Cognito User Pool access tokens signed with RS256.

### 1. Create the user pool

In the AWS Console:

1. Open Amazon Cognito → User pools → Create user pool.
2. Configure email as the sign-in identifier.
3. Choose the Essentials feature plan.
4. Require a strong password policy and configure account recovery.
5. Enable MFA for clinician and administrator accounts; prefer authenticator-app/TOTP where practical. SMS can incur additional charges and should not be the only security control.
6. Create an app client for a public web application. Do not generate a client secret for a browser-based public client.
7. Configure the Cognito managed login domain and the exact callback/sign-out URLs for the eventual application deployment.
8. Enable only the OAuth scopes the application needs. Use authorization code flow with PKCE for browser sign-in.
9. Create groups named exactly: avelune-patient, avelune-caregiver, avelune-clinician and avelune-admin. Do not let users self-assign clinician or admin groups. Assign privileged groups only through a reviewed administrative process.

Do not enable broad self-service sign-up for clinicians. Provider verification is a separate workflow and must be completed before clinician discovery, care access or invoice issuance.

### 2. Configure the API

Set these environment variables in the API host's configuration settings (not in the frontend bundle):

| Variable | Value |
|---|---|
| AWS_COGNITO_REGION | User pool region |
| AWS_COGNITO_USER_POOL_ID | Exact user pool ID |
| AWS_COGNITO_APP_CLIENT_ID | Public app client ID |
| AVELUNE_ALLOWED_ORIGINS | Exact deployed frontend origin(s) |

The client ID and pool ID are identifiers, not passwords, but keep deployment configuration controlled. Never commit AWS access keys, client secrets, database passwords or private keys. The API needs no AWS access key to verify Cognito JWTs; it retrieves the pool's public signing keys.

For local development, set these variables in an untracked backend environment file. Do not put AWS secrets in Vite/browser variables.

### 3. What the current API implements

- GET /v1/auth/config reports whether Cognito is configured and exposes only public pool/client metadata.
- GET /v1/auth/me requires a valid Cognito access token in the Authorization: Bearer header.
- The API verifies RS256 signature using the pool JWKS, issuer, expiry, token use and app-client ID.
- Known Cognito groups map to role labels. Unknown groups are ignored.

This is an authentication foundation, not a complete account product. It does not yet implement browser login/logout, authorization-code callback handling, user provisioning, MFA enforcement, clinician credential review, session management, account recovery, consent grants, database row-level security or resource-level authorization. Do not expose patient records through endpoints until those controls are implemented and tested.

### 4. Important authorization rules

- Cognito proves the identity of the token holder; it does not prove that a person is a clinician.
- Role/group assignment must be controlled server-side. Never trust a role sent in request JSON or local browser state.
- Every patient, caregiver and clinician resource endpoint must enforce a current care relationship and minimum necessary scope.
- Caregiver access must be explicitly authorised by the patient (or lawful representative), revocable and auditable.
- Treat avelune-admin as a highly privileged group. Require MFA and a separate approval process.
- Do not put health information in Cognito custom attributes or group names.
- Use synthetic accounts and data for the hackathon.

### 5. Deployment checklist

- [ ] Choose the region after residency/legal review.
- [ ] Create Essentials pool and public app client (no client secret).
- [ ] Set exact callback and sign-out URLs.
- [ ] Set the four groups and restrict privileged membership.
- [ ] Add API environment variables.
- [ ] Test valid, expired, wrong-issuer, wrong-client and ID-token rejection.
- [ ] Add browser sign-in with authorization code + PKCE and secure session handling.
- [ ] Complete consent, access-control, audit and privacy review before real patient data.

AWS pricing and free-tier allowances can change. Check the official Amazon Cognito pricing page: https://aws.amazon.com/cognito/pricing/
