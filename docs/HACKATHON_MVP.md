# Avelune Health — Hackathon MVP

## Product promise

Avelune Health helps people affected by cancer feel less alone and better prepared for conversations with qualified care teams. Belle is an AI care companion for organisation and navigation—not diagnosis or treatment.

## Demonstrable user journeys

### Patient or caregiver
1. Open the care overview and choose the patient/caregiver journey.
2. Record a symptom or concern in the demo journal.
3. Review the note and use it to prepare questions for a clinician.
4. Explore the care timeline and support pathways.
5. Meet Belle and see her boundaries explained clearly.

### Healthcare professional
1. Choose the professional entry point.
2. Review the planned clinician workspace and the information a patient may choose to share.
3. Understand that clinician identity, access permissions and patient authorization must be verified before real records are available.

## Build order

1. **Reliable frontend demo:** mobile responsive, accessible navigation, meaningful working interactions and synthetic sample data.
2. **Care journey:** symptom journal, appointment and medication timeline mock data, question preparation and caregiver consent explanation.
3. **Belle:** a bounded conversational experience using synthetic demo inputs, clear AI disclosure, safe escalation language and a human-care handoff.
4. **PayPal:** sandbox-only payment demonstration through a server-side Orders API. Never expose credentials in browser code; do not charge for medical care in the demo.
5. **Secure service foundation:** authenticated API, role-based access, consent records, audit trail and encrypted storage. Keep real patient data out of the hackathon prototype.
6. **Demo and evidence:** clean setup instructions, a reproducible build, screenshots and a short public walkthrough.

## Definition of done for the demo

- A reviewer can run the project from the README.
- The core user journey works on a phone-sized viewport and desktop.
- Buttons either complete a real demo interaction or clearly say that the capability is not yet connected.
- No placeholder is presented as a real clinician, real appointment, real payment or real medical result.
- No cancer diagnosis, treatment recommendation or facial/voice-based medical inference is produced.
- The repository contains no API keys, patient records or other secrets.
