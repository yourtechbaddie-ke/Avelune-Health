# Google AI Studio Master Prompt — Avelune Health

You are rebuilding **Avelune Health**, a premium, full-stack cancer-care navigation and support platform. Build a complete, production-minded application—not a landing-page mockup, static prototype, or collection of decorative screens.

## First: inspect before changing anything

This is an existing GitHub repository. Inspect its complete structure, package files, React + TypeScript frontend, Python FastAPI backend, API routes, environment variable usage, Render configuration, tests, and current README before editing. Treat the repository's Product & Experience Blueprint and security architecture documents as requirements.

Preserve working functionality and existing API contracts. Do not delete or replace the FastAPI backend with a generated Node.js backend. Do not silently change database providers, authentication providers, payment providers, deployment target, or environment variable names. If the imported project cannot be fully supported in the AI Studio environment, explain the limitation and preserve the original architecture in the exported code.

## Product vision

Avelune Health — **The Love of Life.** An AI-assisted cancer-care navigation platform connecting patients, caregivers and qualified healthcare professionals. Belle is the AI care-navigation companion.

The product should feel like a thoughtfully designed, premium digital health service: reassuring, sophisticated, human, highly usable, trustworthy and accessible. It is not a hospital, emergency service, diagnostic tool or replacement for a treating oncology team.

## Non-negotiable brand system

Use this exact palette:
- Oxblood: #5A1724
- Deep Teal: #063F43
- Cobalt: #1746D1
- Ink: #111111
- Warm Ivory: #F4F0E8
- Soft Rose: #C9A9A9

Hierarchy: Ink + Warm Ivory foundation; Oxblood signature; Deep Teal sophisticated secondary; Cobalt small digital accent; Soft Rose tiny supporting tone.

Use the refined editorial typography direction of The Belle Amoura Retreat: an elegant high-contrast display serif for major headings, a complementary refined serif for editorial text, and a clean modern sans-serif for functional UI, forms, labels and data. Use a coherent font system with at least three complementary families and a clear type scale. Verify font licensing and provide sensible fallbacks.

Design references: the user's AZ Cloud Recall project and The Belle Amoura Retreat. Borrow their level of polish, typography confidence and visual refinement—not their unrelated branding. Do not use generic AI-generated-looking hospital templates, dated Bootstrap styling, student-project aesthetics, excessive rounded cards, gradients everywhere, cliché pink-ribbon imagery, or a single long scrolling page.

## Critical information architecture

Create genuinely separate pages with proper routing. Do not make every section a long homepage scroll.

### Public website pages
1. Home
2. About Avelune
3. How It Works
4. Patient Support
5. Caregiver Support
6. Healthcare Professionals
7. Care Directory
8. Belle AI Companion
9. Education & Resources
10. Safety & Privacy
11. Contact
12. Sign In
13. Create Account

The public website must clearly explain the platform, who it serves, how it works, its safety boundaries and current feature availability. Keep private app data behind authentication.

### Authenticated app pages
- Role-aware onboarding
- Patient dashboard
- Caregiver dashboard
- Healthcare professional dashboard
- Care journey / timeline
- Care plan and preparation
- Appointments and consultation planning
- Symptom and wellbeing journal
- Care directory and provider details
- Belle AI
- Payment centre
- Notifications
- Profile, consent and privacy settings
- Help and support

### Admin pages
- Admin overview
- User and role management
- Provider onboarding and credential verification
- Directory source review
- Payment oversight
- Content/resource management
- Audit/security events
- Support cases
- Platform settings

Protect admin routes and APIs with server-side authorisation.

## Three dashboards must have completely different visual layouts

This requirement is essential. Do not simply show the same dashboard with different widgets, colours, or permissions. Give each role a different information architecture, composition, navigation priorities and interaction model while maintaining shared brand tokens.

### 1. Patient — “My Care”
Visual language: calm, personal, spacious, warm, reassuring and approachable. Warm Ivory is the main canvas; Oxblood is used for primary actions; Deep Teal for supportive information; subtle progress indicators and gentle editorial elements. Avoid dense tables and command-centre layouts.

Navigation: Overview, My Care Journey, Care Plan, Appointments, Symptom Journal, My Support Circle, Resources, Payments, Settings.

Dashboard composition:
- Personal welcome and clear today summary.
- Next appointment or meaningful empty state.
- Beautiful, easy-to-understand care journey timeline.
- Patient-entered tasks and reminders.
- Quick actions to record a symptom or prepare a question for the care team.
- Belle education/navigation access with a clear AI disclaimer.
- Patient-authorised support-circle updates, only if secure communication exists.

Patient workflows: manage profile and consent; record symptoms and wellbeing observations; prepare clinician questions; review information shared by authorised professionals; view appointments and preparation checklists; invite or authorise caregivers; revoke permissions; access trusted education and directory listings; view payment status only from verified server records.

The patient must understand exactly who can see their information and be able to manage/revoke access.

### 2. Caregiver — “Care Coordination”
Visual language: operational, organised, supportive and task-led. Use a distinct coordination workspace with its own navigation/sidebar, prominent agenda and task board, people-supported switcher, concise status panels and clear follow-up actions. This must not resemble the patient layout recoloured.

Navigation: Overview, People I Support, Tasks & Reminders, Appointment Calendar, Care Updates, Shared Notes, Care Team, Resources, Settings.

Dashboard composition:
- People supported, restricted to active patient-authorised relationships.
- Today's tasks and upcoming appointments.
- Overdue/upcoming task states and next actions.
- Patient-approved care updates and shared instructions.
- Coordination notes with author and timestamps.
- Care-team contact/communication entry point when implemented.
- Caregiver education and self-care resources.

Caregiver workflows: accept invitation and permission scope; switch between authorised care recipients without mixing data; create/complete non-clinical tasks; coordinate transport and appointment preparation; view only explicitly shared patient information; share observations where permitted; request access/report concerns; manage notifications.

Caregivers must not edit clinical records or impersonate patients/clinicians. Attribute every action to its actual user.

### 3. Healthcare professional — “Clinical Workspace”
Visual language: precise, professional, information-dense and highly legible. Use a structured clinical workspace with compact navigation rail, patient caseload/queue, clear status indicators, consultation schedule, carefully organised information panels and efficient data presentation. This must be visibly and structurally different from both consumer dashboards.

Navigation: Overview, Patient Caseload, Consultations, Follow-ups, Care Coordination, Shared Documents, Messages, Availability, Professional Profile, Settings.

Dashboard composition:
- Assigned patient caseload and consultation queue.
- Today's consultations and follow-ups.
- Patient status summaries limited to authorised information.
- Outstanding tasks and follow-up reminders.
- Patient questions and caregiver-shared observations only when authorised.
- Professional profile and credential-verification state.
- Alerts for missing information or pending patient consent.

Professional workflows: onboarding and credential verification before clinical features; view only assigned/explicitly shared patients; review authorised information; manage consultation schedules and follow-up plans; record notes only when a secured, auditable clinical record system exists; share instructions/resources; communicate with authorised caregivers within patient permissions; manage availability and professional profile.

A directory listing is not proof of credential verification. Display verification source and date. Do not imply clinical governance that does not exist.

## Belle AI companion

Keep the existing server-side AI integration and API contract. Belle may provide general cancer-care education, care navigation, question preparation and help locating resources. Belle must never diagnose, prescribe, select an individual treatment, invent clinical facts, or imply it is a clinician. Make the AI's limitations clear in the interface. Provide safe escalation language for urgent or worsening symptoms. Do not expose API keys in frontend code.

## Avelune Connect — planned feature, not currently live

The product direction includes patient-authorised group conversations, peer support, caregiver/clinician communication, and scheduled audio/video calls. Do not fake these features or label them secure/live if they are not implemented.

Do not invent encryption. End-to-end encryption requires a reviewed protocol, client-side encryption, recipient-only decryption, key lifecycle/recovery/revocation design, secure group membership, metadata minimisation, secure attachment handling, abuse reporting, audit/retention policies, threat modelling and independent security review. TLS is not E2EE. Build a clearly labelled planned/coming-later state until all security gates are satisfied.

## Payments

Preserve existing PayPal Sandbox integration and API contracts. Clearly label sandbox/demo. Never claim a payment is complete because a browser returned to the site. Server capture and verified webhook events must be authoritative. Do not enable real charges, provider payouts, refunds or production patient payments without reconciliation, idempotency, secure webhook processing, audit trail, refund/dispute workflows and testing.

## Technical constraints

- Frontend baseline: React + TypeScript.
- Backend baseline: Python FastAPI.
- Deployment target: Render.
- Preserve existing FastAPI routes, request/response contracts and environment variable names unless a deliberate migration is proposed and approved.
- Do not replace FastAPI with AI Studio's Node.js runtime.
- Do not silently migrate database/auth/payment vendors.
- Do not commit secrets or put server secrets into Vite/client variables.
- Confirm actual database persistence before presenting any patient records as stored.
- Use server-side authorisation for every sensitive resource and action.
- Use separate roles and patient-scoped access grants; never rely on frontend hiding.
- Add input validation, secure headers, rate limiting, strict CORS, safe error handling, audit events and tests.
- Keep logs free of patient-sensitive payloads.
- Do not use mock data in production views. Clearly mark seeded/demo data.
- Ensure direct route loads and browser refresh work for every page.
- Keep the app deployable on Render using documented build/start commands and health check.

## Data and privacy requirements

Plan for users, role assignments, patient profiles, caregiver authorisations, professional credentials, consent grants, appointments, care-plan items, patient-entered observations, shared notes, messages, notifications, payment transactions, directory sources and audit events.

Access must be scoped to the patient, relationship, consent, professional assignment and purpose. Do not create broad role access. Real patient data must not be used until appropriate privacy, legal, clinical and security reviews, persistent storage, backup, retention and deletion processes are ready.

## Functional quality bar

Every button, link, tab, form, dialog and menu must work. Implement real navigation and connected workflows where supported by the existing backend. Where backend support is missing, show an honest disabled/planned state with explanation rather than a fake success.

Include:
- Form validation and helpful error states.
- Loading, empty, success and failure states.
- Accessible labels, keyboard navigation, visible focus, semantic landmarks and readable contrast.
- Responsive layouts for mobile, tablet and desktop.
- Thoughtful micro-interactions that do not slow down clinical workflows.
- Consistent design tokens and reusable components without forcing all dashboards into one layout.
- Tests for route rendering, key workflows, role boundaries, API contracts and payment flow.
- A clear setup guide and accurate feature-status documentation.

## Required work sequence

1. Inspect repository and report the current architecture and implemented features.
2. Read the repository product blueprint and security documentation.
3. Propose the route map, role-specific information architecture and design tokens.
4. Build the public site and each role dashboard as separate pages.
5. Connect to existing APIs without breaking contracts.
6. Implement functional interactions and honest planned states.
7. Add/adjust tests and run lint, typecheck, tests and production build.
8. Fix all discovered errors.
9. Update README and docs with exact implementation status, setup, environment variables, routes and deployment instructions.
10. Summarise changed files, tests passed/failed, remaining blockers and features that are still planned.

Do not claim completion if commands were not run or tests failed. Do not claim production-ready security, clinical compliance, E2EE, real payments or persistent medical records unless each has been implemented and verified.

## Final acceptance criteria

The finished experience must be polished enough to feel like a premium digital health product; all public and app pages are separate routes; the three role dashboards are unmistakably different; current working features remain functional; sensitive access is enforced server-side; the app builds and deploys to Render; and documentation truthfully distinguishes implemented, sandbox/demo, planned and unavailable functionality.
