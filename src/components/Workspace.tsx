import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, CircleUserRound, ClipboardList, HeartHandshake, Plus, ShieldCheck, Trash2, Users, X } from 'lucide-react';

type Role = 'patient' | 'clinician';
type Appointment = { id: number; title: string; date: string; kind: string; note: string };
type Task = { id: number; label: string; done: boolean };
type Contact = { id: number; name: string; relationship: string };

const today = new Date().toISOString().slice(0, 10);
const initialTasks: Task[] = [
  { id: 1, label: 'Write down questions for my next care conversation', done: false },
  { id: 2, label: 'Gather reports and current medication information', done: false },
  { id: 3, label: 'Decide what practical support I would like', done: false },
];

export default function Workspace({ role }: { role: Role }) {
  const [tab, setTab] = useState<'overview' | 'appointments' | 'tasks' | 'circle'>('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentKind, setAppointmentKind] = useState('Consultation');
  const [appointmentNote, setAppointmentNote] = useState('');
  const [taskLabel, setTaskLabel] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRelationship, setContactRelationship] = useState('Family');
  const [message, setMessage] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const sortedAppointments = useMemo(() => [...appointments].sort((a, b) => a.date.localeCompare(b.date)), [appointments]);
  const completed = tasks.filter(task => task.done).length;

  function addAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!appointmentTitle.trim() || !appointmentDate) return;
    setAppointments(current => [...current, { id: Date.now(), title: appointmentTitle.trim(), date: appointmentDate, kind: appointmentKind, note: appointmentNote.trim() }]);
    setAppointmentTitle(''); setAppointmentDate(''); setAppointmentNote('');
    setShowAppointmentForm(false);
    setMessage('Appointment added to this browser-only demo workspace. No booking or reminder was sent.');
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskLabel.trim()) return;
    setTasks(current => [...current, { id: Date.now(), label: taskLabel.trim(), done: false }]);
    setTaskLabel('');
    setMessage('Task added to your local checklist.');
  }

  function addContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contactName.trim()) return;
    setContacts(current => [...current, { id: Date.now(), name: contactName.trim(), relationship: contactRelationship }]);
    setContactName('');
    setMessage('Support person added to this local preview. No invitation was sent and no access was granted.');
  }

  return <section className="workspace-section" id="workspace">
    <div className="workspace-heading">
      <div><span className="eyebrow">YOUR PRIVATE SPACE · DEMO MODE</span><h2>{role === 'patient' ? 'A little more organised.' : 'A clearer care workspace.'}</h2><p>{role === 'patient' ? 'Bring your next steps, appointments and chosen support into one calm space.' : 'A preview of the coordination tools intended for verified healthcare professionals.'}</p></div>
      <span className="workspace-demo"><ShieldCheck size={14}/> SYNTHETIC / LOCAL ONLY</span>
    </div>
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <div className="workspace-user"><span className="workspace-avatar">{role === 'patient' ? <CircleUserRound/> : <ShieldCheck/>}</span><div><b>{role === 'patient' ? 'My care space' : 'Professional preview'}</b><small>{role === 'patient' ? 'Patient / caregiver view' : 'Clinician demonstration'}</small></div></div>
        <nav aria-label="Workspace sections">
          {([{id:'overview',label:'Overview',icon:HeartHandshake},{id:'appointments',label:'Appointments',icon:CalendarDays},{id:'tasks',label:'My next steps',icon:ClipboardList},{id:'circle',label:'Support circle',icon:Users}] as const).map(item => { const Icon = item.icon; return <button key={item.id} className={tab === item.id ? 'workspace-nav active' : 'workspace-nav'} onClick={() => {setTab(item.id);setMessage('');}}><Icon size={17}/>{item.label}</button>; })}
        </nav>
        <p className="workspace-sidebar-note"><ShieldCheck size={14}/> Your entries stay in this open browser session. They are not uploaded or shared.</p>
      </aside>
      <div className="workspace-main">
        {tab === 'overview' && <div className="workspace-view">
          <span className="eyebrow">AT A GLANCE</span><h3>{role === 'patient' ? 'Welcome to your care space.' : 'Coordination overview.'}</h3>
          <p className="workspace-intro">{role === 'patient' ? 'You do not have to organise everything at once. Start with one small next step.' : 'This is a synthetic preview. Real patient access requires identity verification, a legitimate care relationship and audited permissions.'}</p>
          <div className="workspace-stats"><article><CalendarDays/><b>{appointments.length}</b><span>Appointments added</span></article><article><ClipboardList/><b>{completed}/{tasks.length}</b><span>Next steps complete</span></article><article><Users/><b>{contacts.length}</b><span>Support people listed</span></article></div>
          <div className="workspace-next"><div><span className="eyebrow">YOUR NEXT STEP</span><b>{tasks.find(task => !task.done)?.label ?? 'Your current checklist is complete.'}</b><small>{tasks.length - completed} tasks remaining</small></div><button className="button primary" onClick={() => setTab('tasks')}>Open checklist</button></div>
          <div className="workspace-callout"><HeartHandshake/><p><b>Care is personal.</b> Only include people in your support circle when you are comfortable. In the live product, sharing information will require explicit permission and a way to revoke access.</p></div>
        </div>}
        {tab === 'appointments' && <div className="workspace-view">
          <div className="workspace-view-top"><div><span className="eyebrow">PLAN AHEAD</span><h3>Appointments</h3><p className="workspace-intro">Keep a personal note of upcoming care conversations.</p></div><button className="button primary" onClick={() => setShowAppointmentForm(value => !value)}><Plus size={16}/> Add appointment</button></div>
          {showAppointmentForm && <form className="workspace-form" onSubmit={addAppointment}>
            <label>Appointment title<input required maxLength={80} value={appointmentTitle} onChange={event=>setAppointmentTitle(event.target.value)} placeholder="e.g. Oncology follow-up"/></label>
            <div className="workspace-form-row"><label>Date<input required type="date" min={today} value={appointmentDate} onChange={event=>setAppointmentDate(event.target.value)}/></label><label>Type<select value={appointmentKind} onChange={event=>setAppointmentKind(event.target.value)}><option>Consultation</option><option>Screening</option><option>Test or scan</option><option>Therapy</option><option>Home visit</option><option>Other</option></select></label></div>
            <label>Private note (optional)<textarea maxLength={300} value={appointmentNote} onChange={event=>setAppointmentNote(event.target.value)} placeholder="Questions to bring or details to remember"/></label>
            <div className="workspace-form-actions"><button type="button" className="button secondary" onClick={()=>setShowAppointmentForm(false)}>Cancel</button><button className="button primary" type="submit">Save locally</button></div>
          </form>}
          {sortedAppointments.length === 0 ? <div className="workspace-empty"><CalendarDays/><b>No appointments added yet</b><span>Add a personal reminder. This will not book an appointment or contact a provider.</span></div> : <div className="workspace-record-list">{sortedAppointments.map(item=><article key={item.id} className="workspace-record"><div className="workspace-date"><b>{new Date(item.date+'T12:00:00').toLocaleDateString(undefined,{day:'2-digit'})}</b><span>{new Date(item.date+'T12:00:00').toLocaleDateString(undefined,{month:'short'})}</span></div><div><b>{item.title}</b><small>{item.kind} · {item.date}</small>{item.note&&<p>{item.note}</p>}</div><button aria-label={'Remove '+item.title} onClick={()=>setAppointments(current=>current.filter(row=>row.id!==item.id))}><Trash2 size={16}/></button></article>)}</div>}
        </div>}
        {tab === 'tasks' && <div className="workspace-view">
          <span className="eyebrow">SMALL STEPS COUNT</span><h3>Your next steps</h3><p className="workspace-intro">A flexible list for things you want to prepare or organise.</p>
          <div className="workspace-task-progress"><span style={{width:(tasks.length ? completed/tasks.length*100 : 0)+'%'}}/></div><small className="workspace-progress-label">{completed} of {tasks.length} completed</small>
          <div className="workspace-task-list">{tasks.map(task=><label key={task.id} className={task.done?'workspace-task done':'workspace-task'}><input type="checkbox" checked={task.done} onChange={()=>setTasks(current=>current.map(row=>row.id===task.id?{...row,done:!row.done}:row))}/><span>{task.label}</span><button type="button" aria-label="Remove task" onClick={event=>{event.preventDefault();setTasks(current=>current.filter(row=>row.id!==task.id));}}><X size={15}/></button></label>)}</div>
          <form className="workspace-add-task" onSubmit={addTask}><input aria-label="New task" maxLength={120} value={taskLabel} onChange={event=>setTaskLabel(event.target.value)} placeholder="Add a task or reminder"/><button className="button primary" type="submit"><Plus size={15}/> Add</button></form>
          <p className="workspace-footnote">These are personal planning notes, not treatment instructions or medication reminders.</p>
        </div>}
        {tab === 'circle' && <div className="workspace-view">
          <span className="eyebrow">SUPPORT, ON YOUR TERMS</span><h3>Your support circle</h3><p className="workspace-intro">List people you may want to ask for practical or emotional support. Adding someone here does not notify them or give them access to your information.</p>
          <form className="workspace-form compact" onSubmit={addContact}><label>Person's name<input required maxLength={60} value={contactName} onChange={event=>setContactName(event.target.value)} placeholder="Name"/></label><div className="workspace-form-row"><label>Relationship<select value={contactRelationship} onChange={event=>setContactRelationship(event.target.value)}><option>Family</option><option>Friend</option><option>Partner</option><option>Caregiver</option><option>Other trusted person</option></select></label><button className="button primary" type="submit"><Plus size={15}/> Add person</button></div></form>
          {contacts.length===0?<div className="workspace-empty"><Users/><b>Your circle is yours to choose.</b><span>You can add a trusted person to this private demo list whenever you are ready.</span></div>:<div className="workspace-contact-list">{contacts.map(person=><article key={person.id}><span><CircleUserRound/></span><div><b>{person.name}</b><small>{person.relationship} · local preview only</small></div><button aria-label={'Remove '+person.name} onClick={()=>setContacts(current=>current.filter(row=>row.id!==person.id))}><Trash2 size={16}/></button></article>)}</div>}
          <div className="workspace-callout"><ShieldCheck/><p><b>Consent comes first.</b> A real caregiver invitation must be initiated by the patient, specify exactly what can be accessed, be securely accepted and remain revocable. That secure sharing workflow is not yet connected.</p></div>
        </div>}
        {role === 'clinician' && <div className="workspace-clinician-note"><ShieldCheck/><span><b>Clinician mode is a design preview.</b> No patient records, referrals, prescriptions or clinical actions are available. Professional verification and patient-authorised access must be implemented before clinical use.</span></div>}
        {message && <p className="workspace-message" role="status">{message}</p>}
      </div>
    </div>
  </section>;
}
