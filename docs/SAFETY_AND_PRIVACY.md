# Avelune Health — Safety and Privacy Guardrails

Avelune Health is a care-navigation and support platform prototype. It is not a diagnostic device, emergency service, or substitute for licensed healthcare professionals.

## Non-negotiable clinical boundaries

- Never tell a person that they have, do not have, or are likely to have cancer based on a chat, questionnaire, photograph, voice sample, facial expression, or other AI inference.
- Never interpret appearance, emotion, speech patterns, or inferred mental state as evidence of cancer or another medical condition.
- Symptom entries are patient-reported records. They may help a person prepare for a clinical conversation; they are not a diagnosis or a validated risk score.
- Never prescribe, recommend starting/stopping/changing medication, or create an individualized treatment plan.
- Explain uncertainty in plain language. Encourage users to discuss new, persistent, worsening, or concerning symptoms with a qualified clinician.
- For severe, sudden, or rapidly worsening symptoms, direct the user to local emergency services or the nearest appropriate emergency department. Do not delay urgent care with a chatbot flow.
- Do not imply that a clinician has reviewed a note, appointment request, or message unless a real authenticated clinician has done so.

## Belle's permitted role

Belle may:
- Listen to a user's stated concerns and help them organise their own words.
- Help prepare questions for a clinician and summarise user-entered notes for review.
- Explain how to navigate platform features and find support resources.
- Encourage a user to contact a qualified professional when they are concerned.

Belle must:
- Identify herself as an AI companion.
- State when information is general and not personal medical advice.
- Ask permission before processing or sharing sensitive information.
- Offer a clear route to a human professional.
- Avoid claiming to monitor a user's health continuously or to detect distress unless a specific, consented, validated capability has actually been implemented.

## Children, caregivers and accessibility

- Design for people of different ages, genders, abilities, literacy levels and levels of digital confidence.
- A caregiver must not automatically receive access to another person's health information. Implement explicit, revocable, appropriately verified patient authorization.
- Before supporting children, implement age-appropriate consent, guardian authorization and safeguarding workflows reviewed by qualified legal and clinical advisers.
- Use plain language, keyboard support, readable contrast, scalable text and clear error states.

## Privacy and security before real patient use

The current prototype must use synthetic data only. Before collecting real health information:
- Complete a privacy impact assessment and map the laws that apply in every launch jurisdiction.
- Establish a lawful basis, clear notices, informed consent where required, and a process for access, correction, export and deletion.
- Minimise collection; do not collect sensitive data merely because it may be useful later.
- Encrypt data in transit and at rest; keep secrets server-side and use managed key/secret storage.
- Implement authentication, role-based and least-privilege access, session security, audit logs, backups and tested incident response.
- Define retention periods and secure deletion.
- Review all AI providers, subprocessors, data residency, retention and model-training terms before sending any health information to them.
- Obtain clinical, security and jurisdiction-specific legal review before any real-world deployment.

## Prototype status

The current web app is an early frontend prototype. Its symptom journal is session-local and is not a secure medical record. Authentication, clinician verification, encrypted persistence, live consultations, emergency integrations, payments and production AI are not yet implemented. Do not use it to make care decisions or submit real patient data.


## Avelune Connect — planned, not yet available

Avelune Connect is a proposed private communication and scheduling module. The current prototype does not support user-to-user messaging, end-to-end encryption, group chat, call scheduling, voice/video calls or secure sharing of health updates. Do not use it to exchange real patient information. See [Avelune Connect & Security Architecture](AVELUNE_CONNECT_AND_SECURITY_ARCHITECTURE.md) for the threat model requirements, encryption design constraints, permission model and release gates. E2EE must not be claimed until a mature protocol is correctly integrated and independently reviewed.
