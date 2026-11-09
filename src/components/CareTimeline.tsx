import { CalendarDays, CheckCircle2, Clock3, Pill, ShieldCheck, Users } from 'lucide-react';

type CareTimelineProps = { role: 'patient' | 'clinician'; onNotice: (message: string) => void };

const patientItems = [
  { kind: 'appointment', date: 'Demo · 18 Nov', title: 'Care team check-in', detail: 'A sample appointment reminder. No booking has been made.', icon: CalendarDays },
  { kind: 'medication', date: 'Example schedule', title: 'Medication list review', detail: 'Bring your current medicines and questions to your clinician or pharmacist.', icon: Pill },
  { kind: 'milestone', date: 'When you are ready', title: 'Prepare for your next conversation', detail: 'Collect questions and notes you would like to discuss.', icon: CheckCircle2 },
];

const clinicianItems = [
  { kind: 'review', date: 'Synthetic demo record', title: 'Patient-submitted notes', detail: 'A clinician should review only information shared with valid patient authorization.', icon: ShieldCheck },
  { kind: 'follow-up', date: 'Example workflow', title: 'Follow-up coordination', detail: 'Real scheduling and patient records are not connected in this prototype.', icon: CalendarDays },
  { kind: 'team', date: 'Care coordination', title: 'Multidisciplinary support', detail: 'Coordinate with the patient’s chosen care team using verified, permissioned systems.', icon: Users },
];

export default function CareTimeline({ role, onNotice }: CareTimelineProps) {
  const items = role === 'patient' ? patientItems : clinicianItems;
  return <section className="timeline-section" id="timeline">
    <div className="timeline-heading">
      <div><span className="eyebrow">A CLEARER VIEW OF WHAT'S NEXT</span><h2>{role === 'patient' ? 'Your care timeline.' : 'Care coordination.'}</h2>
      <p>{role === 'patient' ? 'A simple place to organise appointments, medication questions and the next conversation.' : 'A sample view of the coordination tasks a verified care professional may manage.'}</p></div>
      <span className="demo-label">SAMPLE WORKFLOW</span>
    </div>
    <div className="timeline-list">
      {items.map((item, index) => { const Icon = item.icon; return <article className="timeline-item" key={item.title}>
        <div className="timeline-marker"><Icon size={18}/></div>
        <div className="timeline-content"><span>{item.date}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
        <span className="timeline-step">{String(index + 1).padStart(2, '0')}</span>
      </article>; })}
    </div>
    <div className="timeline-footer"><ShieldCheck size={17}/><p>All entries here are illustrative. No real appointment, prescription, patient record or clinician action is created.</p>
      <button className="button secondary" onClick={() => onNotice(role === 'patient' ? 'In a future secure version, you will be able to add appointments and track clinician-approved medication information.' : 'Clinician access will require verified professional identity, patient authorization and audited permissions.')}>{role === 'patient' ? 'How will this work?' : 'View access requirements'}</button>
    </div>
  </section>;
}
