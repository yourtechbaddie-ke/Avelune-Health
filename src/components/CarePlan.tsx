import { useMemo, useState } from 'react';
import { HeartHandshake, ShieldCheck } from 'lucide-react';

type CarePlanProps = { role: 'patient' | 'clinician'; onNotice: (message: string) => void };

const pathways: Record<string, { title: string; intro: string; tasks: string[] }> = {
  appointment: {
    title: 'Prepare for an appointment',
    intro: 'A practical checklist to help you make the most of a conversation with your care team.',
    tasks: ['Write down the three questions that matter most to me', 'Bring a current list of medicines and supplements', 'Gather relevant reports or appointment notes', 'Ask who to contact if I have concerns after the visit', 'Plan transport or someone to accompany me'],
  },
  diagnosis: {
    title: 'Understand information I have received',
    intro: 'Use these prompts to clarify information with a qualified healthcare professional.',
    tasks: ['Ask the clinician to explain unfamiliar terms in plain language', 'Ask what is known and what is still uncertain', 'Ask which options are appropriate to discuss for my situation', 'Ask about benefits, risks and possible side effects of each option', 'Ask where I can get a written summary or trusted information'],
  },
  caregiver: {
    title: 'Coordinate support as a caregiver',
    intro: 'Support should respect the patient’s choices, privacy and permission.',
    tasks: ['Ask the person what kind of help they actually want', 'Agree what information may be shared and with whom', 'Create a permission-based list of important contacts', 'Coordinate practical help such as meals, transport or errands', 'Make time for caregiver rest and support'],
  },
  wellbeing: {
    title: 'Find support for everyday wellbeing',
    intro: 'Explore supportive services alongside—not instead of—professional cancer care.',
    tasks: ['Ask the care team about counselling or psycho-oncology support', 'Ask whether a social worker or patient navigator is available', 'Discuss suitable rehabilitation or physiotherapy referrals', 'Identify a trusted person I can talk to', 'Ask about local community and practical support services'],
  },
};

export default function CarePlan({ role, onNotice }: CarePlanProps) {
  const [pathway, setPathway] = useState('appointment');
  const [completed, setCompleted] = useState<string[]>([]);
  const plan = useMemo(() => pathways[pathway], [pathway]);
  const toggleTask = (task: string) => setCompleted(current => current.includes(task) ? current.filter(item => item !== task) : [...current, task]);
  const changePathway = (value: string) => { setPathway(value); setCompleted([]); };
  return <section className="care-plan-section" id="care-plan">
    <div className="care-plan-heading">
      <span className="eyebrow">ONE STEP AT A TIME</span>
      <h2>{role === 'patient' ? 'Make space for your next step.' : 'Help make care easier to navigate.'}</h2>
      <p>Choose what you want help preparing for. Your checklist stays in this browser session and is not shared with a care team.</p>
    </div>
    <div className="care-plan-card">
      <div className="care-plan-controls">
        <label htmlFor="care-pathway">What would you like to focus on?</label>
        <select id="care-pathway" value={pathway} onChange={event => changePathway(event.target.value)}>
          <option value="appointment">Preparing for an appointment</option>
          <option value="diagnosis">Understanding information I've received</option>
          <option value="caregiver">Coordinating caregiver support</option>
          <option value="wellbeing">Emotional and practical wellbeing</option>
        </select>
        <div className="care-plan-note"><HeartHandshake size={18}/><span><b>{plan.title}</b>{plan.intro}</span></div>
      </div>
      <div className="care-plan-tasks">
        <div className="care-plan-progress"><span>YOUR CHECKLIST</span><b>{completed.length} of {plan.tasks.length} completed</b></div>
        <div className="care-plan-progress-track"><span style={{ width: (completed.length / plan.tasks.length * 100) + '%' }}/></div>
        {plan.tasks.map(task => <label className={completed.includes(task) ? 'care-plan-task done' : 'care-plan-task'} key={task}>
          <input type="checkbox" checked={completed.includes(task)} onChange={() => toggleTask(task)}/>
          <span>{task}</span>
        </label>)}
        <button className="button secondary care-plan-reset" onClick={() => { setCompleted([]); onNotice('Your checklist has been reset.'); }}>Reset checklist</button>
      </div>
    </div>
    <p className="care-plan-safety"><ShieldCheck size={15}/> This is a planning aid, not medical advice or a clinical assessment. For severe, sudden or rapidly worsening symptoms, seek urgent medical care rather than using this checklist.</p>
  </section>;
}
