import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Bot, ExternalLink, LoaderCircle, MessageCircle, ShieldCheck, Sparkles, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string; sources?: { title: string; url: string }[] };
const API = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export default function BelleChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hello, I'm Belle. I can help you understand general cancer-care information, prepare questions for your care team, and find verified services. I can't diagnose, prescribe or replace a clinician. What would you like help with today?" }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function send(event: FormEvent) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || busy) return;
    const next = [...messages, { role: 'user' as const, content: prompt }];
    setMessages(next);
    setInput('');
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`${API}/v1/belle/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, history: next.slice(-8).map(item => ({ role: item.role, content: item.content })) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail ?? 'Belle is temporarily unavailable.');
      setMessages(current => [...current, { role: 'assistant', content: data.reply, sources: data.sources ?? [] }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Belle could not connect. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;
  return <div className="belle-chat-backdrop" role="presentation" onClick={onClose}>
    <section className="belle-chat-panel" role="dialog" aria-modal="true" aria-label="Chat with Belle" onClick={event => event.stopPropagation()}>
      <header className="belle-chat-header"><div className="belle-chat-avatar"><Sparkles/></div><div><b>Belle</b><small><span/> AI care companion · Not a clinician</small></div><button onClick={onClose} aria-label="Close Belle"><X/></button></header>
      <div className="belle-chat-disclaimer"><ShieldCheck size={14}/> Please don't share names, ID numbers, medical-record documents or other identifying details. This chat is not an emergency service.</div>
      <div className="belle-chat-messages" aria-live="polite">{messages.map((message,index)=><article key={index} className={message.role==='user'?'belle-message user':'belle-message assistant'}><span>{message.role==='user'?'You':<><Bot size={13}/> Belle</>}</span><p>{message.content}</p>{message.sources?.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} <ExternalLink size={12}/></a>)}</article>)}{busy&&<div className="belle-typing"><LoaderCircle size={15}/> Belle is thinking…</div>}</div>
      {error&&<p className="belle-chat-error" role="alert">{error}</p>}
      <form className="belle-chat-compose" onSubmit={send}><input value={input} onChange={event=>setInput(event.target.value)} placeholder="Ask Belle a question…" maxLength={1200} aria-label="Message Belle"/><button disabled={busy||!input.trim()} aria-label="Send message"><ArrowUpRight size={18}/></button></form>
      <footer className="belle-chat-footer">AI-generated information can be wrong. Confirm medical decisions with your qualified care team. For severe, sudden or rapidly worsening symptoms, seek urgent medical care now.</footer>
    </section>
  </div>;
}
