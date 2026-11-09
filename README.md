# Avelune Health

**The Love of Life.** An inclusive, AI-assisted cancer-care companion connecting patients, caregivers and qualified healthcare professionals. Belle is the platform's conversational AI companion.

> Clinical safety: Avelune Health is a care-navigation and support prototype, not a diagnostic device. Belle does not diagnose cancer, interpret facial appearance as evidence of disease, prescribe treatment or replace a clinician. Urgent symptoms must be escalated to local emergency services or a qualified professional.

## MVP foundation
- Patient and clinician entry points with role-aware demo flows
- Symptom journal and appointment / medication timeline concepts
- Belle companion interface with transparent AI status and safe boundaries
- Care navigation and nearby-facility discovery placeholder
- PayPal sandbox integration boundary (credentials are never committed)
- Responsive installable web app foundation; native packaging can follow

## Run locally
Requirements: Node.js 20+

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Build with `npm run build` and preview with `npm run preview`.

## Run the API locally\n\nSee [backend setup instructions](backend/README.md). The API currently serves static, non-personal content only.\n\n## Environment
Copy `.env.example` to `.env.local` and fill in credentials only when implementing the corresponding server-side integrations. Never expose PayPal secrets, database service keys, medical API credentials or model keys in client code.

## Planned architecture
- Frontend: React + TypeScript + Vite; responsive PWA baseline
- AI: provider-agnostic conversational layer; real-time voice/video avatar integration is a separate secured service
- Backend: FastAPI foundation serving non-personal care-navigation and safety content; authenticated records API and encrypted database remain future work
- Payments: PayPal Orders API through a server-side integration
- Clinical operations: licensed clinicians retain responsibility for diagnosis, triage and treatment

## Privacy and safety
Use synthetic data only in this prototype. Before real patient use, implement informed consent, data minimization, encryption in transit and at rest, access controls, retention/deletion workflows, audit logging, incident response and applicable health-data/privacy compliance in every operating jurisdiction. Do not use this prototype for emergency care.

## Project guidance
- [Hackathon MVP plan](docs/HACKATHON_MVP.md)
- [Clinical safety and privacy guardrails](docs/SAFETY_AND_PRIVACY.md)

## License
MIT — see [LICENSE](LICENSE).
