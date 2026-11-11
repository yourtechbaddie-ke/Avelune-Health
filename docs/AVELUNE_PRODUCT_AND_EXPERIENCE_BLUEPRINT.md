# Avelune Health — Product & Experience Blueprint

**Product promise:** The Love of Life.  
**Product type:** AI-assisted cancer-care navigation and support platform.  
**AI companion:** Belle.  
**Primary audiences:** Patients, caregivers, qualified healthcare professionals, and platform administrators.

> This document is the product source of truth. It distinguishes the intended product from functionality currently implemented. A feature described as planned or future must not be presented as live.

## 1. Product vision

Avelune Health should make the cancer-care journey easier to understand and coordinate. It brings trusted educational information, care navigation, patient-authorised collaboration, caregiver support, and professional workflows into one carefully designed platform.

Avelune is not a hospital, emergency service, diagnostic system, or replacement for an oncology team. Belle provides general education and navigation support; it does not diagnose, prescribe, interpret a person's case as a clinician, or choose treatment.

## 2. Experience principles

- Human, calm, respectful, accessible, and reassuring without being childish or overly sentimental.
- Premium editorial design with strong typography, considered whitespace, meaningful imagery, clear hierarchy, and polished interactions.
- Separate public website pages and authenticated application pages. Do not put the entire product into one long scrolling homepage.
- Three genuinely different role experiences. Do not reuse one dashboard shell and merely hide or rename cards.
- Mobile-first responsive layouts, keyboard accessibility, readable contrast, clear loading/empty/error states, and plain-language explanations.
- Every visible control must perform a real action or be clearly labelled as unavailable/planned. No decorative buttons or fake data presented as real.
- Never imply that a provider, facility, appointment, payment, clinical record, or security property is verified unless it has actually been verified.

## 3. Brand and visual system

### Colour palette

| Token | Hex | Role |
|---|---|---|
| Oxblood | `#5A1724` | Signature brand colour, key calls to action, selected states |
| Deep Teal | `#063F43` | Sophisticated secondary colour, navigation and supportive surfaces |
| Cobalt | `#1746D1` | Small digital/action accent; use sparingly |
| Ink | `#111111` | Primary text and dark foundation |
| Warm Ivory | `#F4F0E8` | Main light canvas and calm content surfaces |
| Soft Rose | `#C9A9A9` | Small supporting accents, never dominant |

Hierarchy: Ink + Warm Ivory foundation; Oxblood signature; Deep Teal secondary; Cobalt sparingly; Soft Rose as a subtle supporting tone.

### Typography and art direction

Use the elegant editorial typography direction of The Belle Amoura Retreat as inspiration: a refined display serif for large headings, a complementary readable serif for editorial passages, and a clean modern sans-serif for interface labels, forms, data and body text. Use a considered font pairing (for example, a high-quality Playfair/Canela-like display serif, Lora-like text serif, and Inter/Manrope-like sans-serif); verify font licensing and loading. Do not use typography as a substitute for hierarchy.

Use authentic, respectful, high-quality photography and illustrations. Avoid generic AI-looking hospital imagery, distressing medical imagery, cliché pink-ribbon visuals, and stereotypical depictions of patients. Do not use imagery that implies a real patient or provider endorsement.

## 4. Information architecture

### Public website — separate routes/pages

- Home
- About Avelune
- How Avelune Works
- Patient Support
- Caregiver Support
- Healthcare Professionals
- Care Directory
- Belle AI Companion
- Education & Resources
- Safety and Privacy
- Contact
- Sign in / Create account

The public website explains the service and its limits. It must not expose private workspace information.

### Authenticated application — separate routes/pages

- Role-aware onboarding
- Patient workspace
- Caregiver workspace
- Healthcare professional workspace
- Care journey / timeline
- Care plan and preparation
- Appointments and consultation planning
- Symptom and wellbeing journal
- Secure communications (planned until implemented and independently reviewed)
- Directory and provider details
- Payment centre (sandbox until production readiness)
- Notifications
- Profile, consent and privacy settings
- Help and support

### Administration — protected routes

- Overview and operational health
- User and role management
- Provider onboarding and credential verification
- Directory source review
- Payment and refund oversight (only when supported)
- Content and resource management
- Audit and security events
- Support cases
- Platform configuration

Admin capabilities must be server-authorised. Hiding a link in the frontend is not access control.

## 5. Three distinct dashboard experiences

### A. Patient dashboard — “My Care”

**Visual direction:** warm, calm, spacious, reassuring and personal. Use Warm Ivory as the main canvas, restrained Oxblood for important actions, Deep Teal for supportive information, and gentle visual progress cues. Avoid dense tables and hospital-style command centres.

**Primary navigation:** Overview; My Care Journey; Care Plan; Appointments; Symptom Journal; My Support Circle; Resources; Payments; Settings.

**Overview priorities:**
1. A welcoming personal greeting and a clear “today” summary.
2. Next appointment or a helpful empty state if none exists.
3. A visual care-journey timeline with completed/current/upcoming steps, only where data exists.
4. Patient-entered tasks and reminders.
5. Quick access to record a symptom or question for the care team.
6. Belle education/navigation entry point with clear AI limitations.
7. Patient-authorised support-circle activity and messages, only when secure messaging is implemented.

**Core workflows:**
- View and manage personal profile and consent.
- Record symptoms and wellbeing observations with date/time and user-entered context.
- Prepare questions for a clinician.
- Review care information shared by an authorised professional.
- View appointment details and preparation checklists.
- Invite or authorise a caregiver, with explicit consent and revocation.
- Access trusted education and directory listings.
- View payment history/status only when backed by verified server records.

Patient privacy and autonomy are central. Patients must be able to understand who can see each item and revoke access where appropriate.

### B. Caregiver dashboard — “Care Coordination”

**Visual direction:** operational, organised, supportive and task-led. Use a distinct layout with a clear coordination sidebar, a prominent task/agenda area, compact status panels, and an at-a-glance view of the people the caregiver is authorised to support. This is not the patient dashboard recoloured.

**Primary navigation:** Overview; People I Support; Tasks & Reminders; Appointment Calendar; Care Updates; Shared Notes; Care Team; Resources; Settings.

**Overview priorities:**
1. People supported, limited to active patient-authorised relationships.
2. Today's care tasks and upcoming appointments.
3. Overdue/upcoming task states with clear next actions.
4. Patient-approved updates and shared care instructions.
5. Coordination notes, with authorship and timestamps.
6. Care-team contact and communication entry point when available.
7. Caregiver education and self-care resources.

**Core workflows:**
- Accept an invitation and verify the relationship/permission scope.
- Switch between authorised care recipients without mixing their information.
- Create and complete non-clinical tasks/reminders.
- Coordinate transport, appointment preparation and follow-up tasks.
- View only patient information explicitly shared with them.
- Share observations with the patient or care team where permitted.
- Request access or report a concern.
- Manage notification preferences.

Caregivers must not be able to alter clinical records or impersonate patients or clinicians. Each action must be attributable to the actual actor.

### C. Healthcare professional dashboard — “Clinical Workspace”

**Visual direction:** precise, professional, information-dense and highly legible. Use a structured clinical workspace with a compact navigation rail, patient list/queue, clear status indicators, strong typography, restrained colour and efficient data presentation. It must feel purpose-built for professional work, not like either consumer dashboard.

**Primary navigation:** Overview; Patient Caseload; Consultations; Follow-ups; Care Coordination; Shared Documents; Messages; Availability; Professional Profile; Settings.

**Overview priorities:**
1. Assigned patient caseload and consultation queue.
2. Today's consultations and follow-ups.
3. Patient status summaries limited to authorised information.
4. Outstanding tasks and follow-up reminders.
5. Patient questions and caregiver-shared observations where authorised.
6. Professional profile and verification status.
7. Clear alerts for missing information or pending patient consent.

**Core workflows:**
- Professional onboarding and identity/credential verification before access to clinical features.
- View only patients assigned to or explicitly shared with the professional.
- Review patient-authorised history and observations.
- Manage consultation schedules and follow-up plans.
- Record professional notes only in a properly secured, auditable clinical record system once implemented.
- Share care instructions and educational resources with the patient.
- Communicate with authorised caregivers within patient-granted permissions.
- Maintain availability and professional profile.

The product must not suggest that a directory listing equals verification. Display credential verification state, source, and date. Professional tools require appropriate access controls, audit logging, and clinical governance.

## 6. Shared capabilities

- Authentication, account recovery, role-aware onboarding and session management.
- Consent and permission management with least-privilege access.
- Belle AI for general education, question preparation and care navigation, with safety boundaries and escalation guidance.
- Trusted care directory with source, last-reviewed date and verification caveats.
- Evidence-linked educational library.
- Appointments, reminders and care journey views when backed by persistent records.
- Notifications with user controls.
- Accessible support and contact pathways.
- Responsive web application.

## 7. Avelune Connect — planned, not yet live

The intended Connect experience includes patient-authorised group conversations, peer support, caregiver and clinician communication, and scheduled audio/video calls. It must remain labelled **planned** until the complete implementation has passed security and privacy review.

Before launch, require:
- A reviewed end-to-end encryption protocol and independently reviewed implementation; do not invent cryptography.
- Strong identity, authentication, device/session and group-membership controls.
- Key lifecycle, recovery, revocation, group changes and secure backup decisions.
- Metadata minimisation and secure attachment handling.
- Abuse reporting, blocking, moderation and safety escalation.
- Secure call signalling and a reviewed audio/video provider architecture.
- Consent, retention, deletion, audit and incident-response policies.
- Penetration testing and documented threat modelling.

TLS alone is not end-to-end encryption. Do not call a feature “E2EE” unless message contents are encrypted on sender devices and only intended recipient devices can decrypt them.

## 8. Payments — current sandbox boundary

PayPal integration is a sandbox demonstration. No real patient fees, provider payouts, refunds or production transactions should be enabled until payment reconciliation, webhook event handling, idempotency, dispute/refund handling, financial records, access control and operational monitoring are implemented and tested. A browser return page is not proof of payment. The server must verify provider events and maintain authoritative transaction state.

## 9. Technical architecture

Current project baseline:
- Frontend: React + TypeScript.
- Backend: Python FastAPI.
- Database: persistence must be explicitly configured and verified; the existing README describes session-only workspace notes and does not establish production patient-record persistence.
- Hosting target: Render, with the existing service and deployment configuration reviewed before release.
- AI: server-side API integration; secrets must never be exposed in browser bundles.
- Payments: PayPal Sandbox only until production readiness is proven.

Preserve existing backend routes and request/response contracts during the visual rebuild unless a deliberate, documented migration is approved. Google AI Studio may generate a Node.js server runtime; do not let it silently replace or duplicate the FastAPI backend. Keep frontend and backend responsibilities explicit.

### Engineering expectations
- Environment-specific configuration; no secrets committed to GitHub.
- Database migrations, backups, retention and deletion strategy before storing real patient records.
- Server-side role and resource authorisation on every sensitive endpoint.
- Input validation, output encoding, CSRF strategy where applicable, rate limiting, secure headers, CORS allowlists and dependency updates.
- Secure authentication, password/session handling, account recovery and MFA strategy appropriate to risk.
- Structured logs without patient-sensitive payloads; audit logs for sensitive access and changes.
- Automated tests for access boundaries, workflows, API contracts and payments.
- CI checks, build validation, health checks, error handling and rollback plan.
- WCAG-informed accessibility and responsive testing.
- No hard-coded demo records in production views. Seed/demo data must be visibly identified.

## 10. Data and privacy model — design requirements

Plan explicit entities and relationships for users, role assignments, patient profiles, caregiver authorisations, professional credentials, consent grants, appointments, care-plan items, patient-entered observations, shared notes, messages, notifications, payment transactions, directory sources and audit events.

Do not implement a generic “any role can see all records” model. Access must be scoped to the patient, relationship, consent, assignment and purpose. Separate demo data from real data. Obtain appropriate legal, clinical, security and privacy review for the jurisdictions in which the service operates before onboarding real patients.

## 11. Quality gates and acceptance criteria

A release is not complete merely because it looks good.

- All public and app routes load directly and survive browser refresh.
- Patient, caregiver and professional dashboards are visually and structurally distinct.
- Each role sees only permitted data and actions; test negative access cases.
- All navigation, buttons, forms, dialogs and empty states work.
- No fake appointment, message, provider, clinical note, payment or verification status is presented as real.
- Mobile, tablet and desktop layouts are tested.
- Keyboard navigation, focus states, labels, contrast and screen-reader semantics are checked.
- API errors and offline/loading states are handled clearly.
- Payment status is server-authoritative and webhook processing is idempotent before production.
- Connect is not exposed as secure/live until the security gates are met.
- README and release notes accurately describe what is implemented, planned, demo-only and not available.

## 12. Current implementation status (baseline from project README)

The repository has described:
- Live Belle AI chat integration, requiring server-side configuration and privacy review.
- PayPal Sandbox order creation/approval/capture and webhook signature verification; not production payments.
- A source-linked Kenya care directory and evidence-linked education.
- A patient/caregiver/clinician demo workspace with session-only notes, appointment planning, care timeline and preparation checklists.
- Avelune Connect as a documented product direction, not a live messaging or calling service.
- No real medical-record persistence, verified provider onboarding, live user-to-user chat, E2EE, or voice/video calling.

Update this section whenever implementation changes are verified. Do not upgrade a status based only on a design mockup or generated UI.
