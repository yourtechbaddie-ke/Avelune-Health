# Avelune Connect — Product and Security Architecture

Status: proposed product module; not yet implemented. This document records the approved direction without presenting mock interactions as secure or live services.

## Product vision

Avelune Connect is a dedicated area for patient-authorised communication among patients, caregivers and verified healthcare professionals. It is intended to support continuity, peer connection and care coordination. It is not an emergency channel and does not replace the patient's clinical team.

### Planned capabilities

1. **Private conversations**
   - One-to-one conversations and invitation-only group spaces.
   - Patient-created or moderated peer-support groups.
   - Explicit group purpose, membership list, invitation and removal controls.
   - Block, report, mute, leave-group and account safety controls.
   - Clear distinction between peer support and verified clinician communication.

2. **Care updates**
   - Members may voluntarily share treatment experiences, medication questions, milestones and progress.
   - User-generated posts must be labelled as personal experience, not clinical advice.
   - No member may prescribe, direct another person to stop/change medication, or claim to provide a diagnosis.
   - Medication reminders or structured treatment records require a separate consented health-record feature and clinical safety review.

3. **Caregiver and clinician access**
   - Patient-controlled, purpose-specific, revocable permissions.
   - Verify clinician identity and active professional registration before displaying a verified clinician badge.
   - Caregivers do not automatically inherit access to private conversations or health information.
   - Record consent grants, revocations and sensitive access in tamper-evident audit logs.

4. **Scheduled voice and video**
   - Schedule one-to-one or group calls with time zone, participant list, purpose, invitation and cancellation controls.
   - Reminders must avoid exposing sensitive health details on lock screens or shared email accounts.
   - Use authenticated, expiring meeting tokens; waiting room; host controls; participant removal; and no recording by default.
   - Do not show a call as booked until provider availability and the scheduling service confirm it.

## End-to-end encryption requirements

End-to-end encryption is a security property, not a UI label. Do not claim that chat is E2EE until the full protocol and key lifecycle are implemented and independently reviewed.

- Use a mature, independently reviewed protocol/library (for example, a Signal-protocol implementation for asynchronous messaging or IETF Messaging Layer Security / RFC 9420 for group messaging). Do not invent cryptography or write a custom encryption protocol.
- Generate and protect private keys on user devices. The service must not possess message-decryption keys.
- Establish device identity, key verification, secure device enrolment, key rotation, forward secrecy and post-compromise recovery.
- When a member joins or leaves a group, rotate group secrets and prevent removed members from decrypting future messages.
- Encrypt attachments on-device before upload; store only ciphertext and opaque metadata.
- Avoid plaintext message bodies, health details, attachment names and sensitive notification previews in logs, analytics, crash reports, push notifications and backups.
- Clearly explain multi-device recovery trade-offs. Lost keys may mean lost message history; do not add a server-side master key.
- E2EE does not hide all metadata. Minimise and protect membership, timing, delivery and relationship metadata.
- Perform independent cryptographic design and implementation review before real patient use.

## Voice/video security

- Use WebRTC with DTLS-SRTP media encryption and an established, security-reviewed SFU for multi-party calls.
- Validate the threat model for SFU/media-server access. WebRTC transport encryption alone does not automatically mean media is end-to-end encrypted against the SFU.
- If true E2EE calls are required, use a supported insertable-streams/SFrame-style design where available, with authenticated key distribution and device lifecycle management.
- Enforce short-lived room credentials, authenticated participants, waiting rooms, host controls, abuse reporting and rate limits.
- Disable recording and transcription by default. Any later recording/transcription requires explicit informed consent from all participants, clear retention and deletion controls, and jurisdiction-specific review.

## Security baseline for the whole platform

No system can be guaranteed unhackable. The target is defence in depth, least privilege, minimised data collection, tested recovery and rapid incident response.

### Identity and access
- Connect a production identity provider (Cognito or equivalent) with verified email, MFA/passkeys, secure recovery and short-lived access tokens.
- Enforce server-side role and resource-level authorisation on every request; never rely on frontend role selectors.
- Use patient-authorised, scoped, expiring and revocable caregiver/clinician grants.
- Require step-up authentication for sensitive actions and new-device enrolment.
- Protect sessions with secure, HttpOnly, SameSite cookies where cookie sessions are used; rotate/revoke sessions after password or permission changes.

### Application and API
- Apply OWASP ASVS and OWASP API Security Top 10 as engineering checklists.
- Validate schemas and lengths; parameterise database access; encode output; protect against injection, XSS, CSRF, SSRF, IDOR/BOLA and mass assignment.
- Add per-user/IP rate limits, abuse controls, request size limits and safe upload scanning.
- Restrict CORS to exact production origins. Add a restrictive Content Security Policy and HSTS at the production edge.
- Keep all provider secrets server-side in a managed secret store; rotate credentials and never log them.
- Pin and scan dependencies; use secret scanning, static analysis, software composition analysis and automated tests in CI.
- Separate development, test and production environments and data.

### Health data and operations
- Collect the minimum data needed. Use synthetic data until privacy, clinical and security reviews are complete.
- Encrypt data at rest using managed KMS keys and in transit using TLS. Define key rotation and access boundaries.
- Use tenant/resource-level database access controls, backups, tested restore procedures and retention/deletion schedules.
- Keep append-only audit events for sensitive access and permission changes; do not place message plaintext or unnecessary health data in audit logs.
- Establish monitoring, alerting, vulnerability response, incident response, breach notification and disaster recovery procedures.
- Complete a threat model, privacy impact assessment and independent penetration test before onboarding real patients.
- Obtain qualified review for applicable laws, including Kenya's Data Protection Act and any laws in other launch jurisdictions. Do not claim HIPAA or other certification without a formal assessment and applicable contractual/operational controls.

## Implementation sequence

1. **Foundation:** production authentication, verified roles, consent grants, audit trail, privacy assessment and threat model.
2. **Messaging MVP:** select protocol and audited implementation, device/key lifecycle, one-to-one E2EE, then group E2EE; independent review before real data.
3. **Calls:** scheduling and invitations, then authenticated WebRTC voice/video, then validated E2EE media design.
4. **Clinical workflows:** verified professional onboarding, secure referrals/records integration only with lawful basis, explicit consent and appropriate agreements.
5. **Release gate:** security testing, accessibility testing, clinical safety review, incident-response exercise and user-facing privacy documentation.

## Current prototype boundary

The existing Avelune prototype does not provide live chat between users, end-to-end encrypted messaging, call scheduling, voice/video calls, secure clinical records or production-grade authentication. Do not use the prototype to exchange real patient information. A visual preview or local-only demo must be labelled clearly and must not imply that messages are transmitted or encrypted.
