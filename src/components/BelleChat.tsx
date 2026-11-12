import { useState, useEffect, type FormEvent } from 'react';
import { useLanguage, LANGUAGES, LanguageCode } from '../context/LanguageContext';
import {
  ArrowUpRight,
  Bot,
  ExternalLink,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Radio,
  Send,
  Flower2,
  Globe,
  Heart
} from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
};

const BELLE_IMAGE = '/src/assets/images/belle_care_companion_1794487035850.jpg';

const ELEVENLABS_VOICES = [
  { id: 'serena', name: 'Serena (ElevenLabs Warm & Conversational)', desc: 'Gentle, comforting and expressive' },
  { id: 'rachel', name: 'Rachel (ElevenLabs Empathetic)', desc: 'Warm maternal reassurance' },
  { id: 'bella', name: 'Bella (ElevenLabs Soft & Velvety)', desc: 'Soothing bedside cadence' },
  { id: 'freya', name: 'Freya (ElevenLabs Lyrical)', desc: 'Calm and reflective' },
];

const GREETINGS_BY_LANG: Record<LanguageCode, string> = {
  en: "Hello, my friend. I'm Belle, your compassionate cancer-care companion at Avelune Health. Whether you need help organizing questions for your oncologist, finding verified hospitals, or just a quiet, reassuring presence in an uncertain moment—I am here beside you. How are you feeling today?",
  sw: "Habari ya moyo wako, rafiki yangu mpendwa. Mimi ni Belle, rafiki yako wa karibu katika safari hii ya matibabu na matumaini hapa Avelune Health. Iwe unahitaji kupanga maswali kwa daktari wako wa saratani, kupata hospitali zilizo karibu, au maneno ya faraja na mashairi ya uponyaji—tuko pamoja katika kila hatua. Je, unajisikiaje leo?",
  fr: "Bonjour mon cher ami. Je suis Belle, votre compagne bienveillante sur Avelune Health. Que vous ayez besoin de préparer vos questions pour l'oncologue, de trouver un centre de soins accrédité ou simplement d'une présence douce et rassurante—je suis à vos côtés. Comment vous sentez-vous aujourd’hui ?",
  es: "Hola, mi querido amigo. Soy Belle, tu compañera compasiva de cuidado en Avelune Health. Ya sea que necesites organizar preguntas para tu oncólogo, ubicar hospitales cercanos o simplemente una presencia cálida y reconfortante en momentos difíciles—estoy aquí contigo. ¿Cómo te sientes hoy?",
  ar: "مرحباً بك يا صديقي العزيز. أنا بيل، رفيقتك المخلصة في رحلة الشفاء في أفيلون هيلث. سواء كنت بحاجة إلى ترتيب أسئلتك لطبيب الأورام، أو العثور على مراكز الرعاية المعتمدة، أو مجرد كلمة مطمئنة تشد من أزرك—أنا هنا إلى جانبك بكل حب. كيف تشعر اليوم؟",
  de: "Hallo, mein lieber Freund. Ich bin Belle, deine einfühlsame Begleiterin bei Avelune Health. Ob du Fragen für deinen Onkologen vorbereiten möchtest, verifizierte Kliniken suchst oder einfach ein warmes, verständnisvolles Wort brauchst—ich bin für dich da. Wie geht es dir heute?",
};

export default function BelleChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language, setLanguage, currentLangInfo } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: GREETINGS_BY_LANG[language] || GREETINGS_BY_LANG.en,
      sources: [
        { title: 'National Cancer Institute of Kenya', url: 'https://www.ncikenya.go.ke/' },
        { title: 'Kenya National Cancer Treatment Protocols', url: 'https://uploads.ncikenya.go.ke/uploads/policy/National-cancer-treatment-Protocols-2019.pdf' },
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(ELEVENLABS_VOICES[0].id);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(true);

  // Update greeting when app language changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [
          {
            role: 'assistant',
            content: GREETINGS_BY_LANG[language] || GREETINGS_BY_LANG.en,
            sources: prev[0].sources,
          },
        ];
      }
      return prev;
    });
  }, [language]);

  // Stop speech if closed
  useEffect(() => {
    if (!open && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsVoiceSpeaking(false);
    }
  }, [open]);

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    // Set voice language
    if (language === 'sw') utterance.lang = 'sw-KE';
    else if (language === 'fr') utterance.lang = 'fr-FR';
    else if (language === 'es') utterance.lang = 'es-ES';
    else if (language === 'ar') utterance.lang = 'ar-SA';
    else if (language === 'de') utterance.lang = 'de-DE';
    else utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        (language !== 'en' && v.lang.startsWith(language)) ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('female')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsVoiceSpeaking(true);
    utterance.onend = () => setIsVoiceSpeaking(false);
    utterance.onerror = () => setIsVoiceSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopVoice = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsVoiceSpeaking(false);
    }
  };

  const send = async (event: FormEvent) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || busy) return;

    const next = [...messages, { role: 'user' as const, content: prompt }];
    setMessages(next);
    setInput('');
    setBusy(true);

    try {
      setTimeout(() => {
        let reply = '';
        const pLower = prompt.toLowerCase();

        // Detect language or use active language
        if (language === 'sw' || pLower.includes('habari') || pLower.includes('daktari') || pLower.includes('maumivu') || pLower.includes('saratani')) {
          if (pLower.includes('daktari') || pLower.includes('maswali')) {
            reply = "Kupanga maswali kabla ya kuingia kwa daktari kunaleta amani kubwa moyoni. Haya hapa maswali matatu ya kumuuliza daktari wako:\n1. 'Lengo kuu la matibabu haya ya awamu ijayo ni lipi (kuponya au kupunguza makali)?'\n2. 'Ni dalili zipi zinazohitaji nimpigie simu daktari mara moja, na zipi ni uchovu wa kawaida wa dawa?'\n3. 'Je, kuna vyakula au dawa za kupunguza maumivu na kichefuchefu unazonishauri?'\n\nNenda na mtu unayemwamini ili aandike maelezo, na kumbuka una haki ya kuelewa kila kitu kwa lugha nyepesi.";
          } else if (pLower.includes('hospitali') || pLower.includes('wapi')) {
            reply = "Nchini Kenya, vituo vikuu vya saratani vilivyoidhinishwa ni pamoja na The Nairobi Hospital Comprehensive Cancer Centre, Hospitali ya Chuo Kikuu cha Aga Khan, MP Shah Hospital, na Hospitali ya Kitaifa ya Kenyatta (KNH). Unaweza kutumia sehemu yetu ya 'Hospital Locator' kuona ramani ya Google Maps na kuagiza usafiri wa haraka.";
          } else {
            reply = `Nakusikia kwa upendo mkubwa, na yale unayopitia yanastahili subira na heshima. Huko peke yako katika dhoruba hii. Je, ungependa tukusanye maswali kwa daktari wako, tuchunguze mashairi ya matumaini, au uunganishwe na mfuko wa michango wa wagonjwa?`;
          }
        } else if (language === 'fr' || pLower.includes('bonjour') || pLower.includes('docteur') || pLower.includes('douleur')) {
          reply = "Je vous écoute de tout cœur. La traversée des traitements oncologiques demande une infinie douceur envers soi-même. Vous n'êtes pas seul face à cette épreuve. Que souhaitez-vous approfondir aujourd'hui : préparer votre prochaine consultation médicale, trouver un centre spécialisé ou écouter une poésie réconfortante ?";
        } else if (language === 'es' || pLower.includes('hola') || pLower.includes('doctor') || pLower.includes('dolor')) {
          reply = "Te escucho con todo mi corazón. Cada paso en este camino contra el cáncer merece amor, paciencia y verdad. No estás solo en esta tormenta. ¿Cómo puedo acompañarte hoy: preparando preguntas para tu oncólogo, buscando centros médicos o compartiendo un poema de sanación?";
        } else if (language === 'ar') {
          reply = "أسمعك بكل مودة وصدق. كل خطوة في هذه الرحلة تستحق الصبر والرحمة بنفسك. لست وحدك في مواجهة هذه العاصفة. كيف يمكنني مساندتك اليوم: بترتيب أسئلة لطبيب الأورام، أو إرشادك للمستشفيات، أو مشاركة قصيدة أمل تريح روحك؟";
        } else if (language === 'de') {
          reply = "Ich höre dir von ganzem Herzen zu. Jeder Schritt auf diesem Weg erfordert Geduld und Mitgefühl mit sich selbst. Du bist nicht allein. Wie kann ich dich heute unterstützen: bei der Vorbereitung von Fragen für deinen Arzt, der Suche nach Kliniken oder einem tröstenden Gedicht?";
        } else {
          // English humane response
          if (pLower.includes('appointment') || pLower.includes('questions')) {
            reply =
              "Preparing for an oncology appointment can feel overwhelming, but having a gentle plan brings clarity to the room.\n\nHere are three grounded questions to bring to your doctor:\n1. 'What is the exact goal of this next treatment phase (curative, management, or symptom relief)?'\n2. 'Which symptoms require an immediate phone call to your clinic versus expected post-chemo fatigue?'\n3. 'What supportive nutrition or pain protocol can we put in place today so I feel supported between visits?'\n\nTake someone you love with you to take notes, and remember you have every right to ask for plain language explanations.";
          } else if (pLower.includes('hospital') || pLower.includes('center') || pLower.includes('care')) {
            reply =
              "In Kenya and East Africa, accredited comprehensive cancer centers include The Nairobi Hospital Comprehensive Cancer Centre, Aga Khan University Hospital, MP Shah Hospital, and Kenyatta National Hospital Cancer Treatment Centre. You can view all nearby facilities directly in our Hospital Locator tab with one-click Google Maps directions and emergency ambulance transit options.";
          } else if (pLower.includes('pain') || pLower.includes('nausea') || pLower.includes('chemo') || pLower.includes('scared')) {
            reply =
              "Symptom management and emotional peace are sacred rights of every human being facing cancer. For nausea, oncologists frequently use 5-HT3 antagonists (such as Ondansetron) or NK1 blockers (such as Aprepitant). For bone aches from white blood cell boosters (G-CSF), gentle warmth and doctor-approved pain protocols make a profound difference. If your symptoms are sudden, severe, or accompanied by a fever over 38°C (100.4°F), please contact your clinic or local emergency dispatch immediately.\n\nTake a slow, deep breath with me right now. You are doing the quiet, brave work of healing.";
          } else {
            reply =
              "I hear you, and what you are feeling is completely valid. Every step of this journey requires deep gentleness with yourself. While I cannot diagnose or prescribe, I am here to stand beside you—to formulate questions for your care team, connect you to patient care donation funds, or share soothing poetry.\n\nWhat would bring your heart the most comfort right now?";
          }
        }

        const newAssistantMsg: Message = {
          role: 'assistant',
          content: reply,
          sources: [
            { title: 'National Cancer Institute of Kenya', url: 'https://www.ncikenya.go.ke/' },
            { title: 'Kenya National Cancer Treatment Protocols', url: 'https://uploads.ncikenya.go.ke/uploads/policy/National-cancer-treatment-Protocols-2019.pdf' },
            { title: 'KMPDC Practitioner & Facility Register', url: 'https://registers.kmpdc.go.ke/' },
          ],
        };

        setMessages((current) => [...current, newAssistantMsg]);
        setBusy(false);

        if (autoSpeakEnabled) {
          speakText(reply);
        }
      }, 1100);
    } catch {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="belle-chat-backdrop" role="presentation" onClick={onClose}>
      <section
        className="belle-chat-panel deckle-edge"
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Belle"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header with Belle's Real Portrait */}
        <header className="belle-chat-header">
          <div className="belle-portrait-wrap">
            <img
              src={BELLE_IMAGE}
              alt="Belle Care Companion"
              className="belle-portrait-avatar"
            />
            <span className="belle-online-blush" />
          </div>

          <div className="belle-header-text">
            <div className="flex items-center gap-1.5">
              <b className="font-serif text-xl font-medium text-white">Belle</b>
              <Sparkles size={14} className="text-rose-300" />
            </div>
            <small className="text-xs text-rose-100 flex items-center gap-1">
              <span>●</span> AI Care Companion · Voice Enabled
            </small>
          </div>

          <div className="belle-header-actions flex items-center gap-2">
            {isVoiceSpeaking ? (
              <button
                type="button"
                className="voice-toggle-btn active"
                onClick={handleStopVoice}
                title="Pause Belle's Voice"
              >
                <VolumeX size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="voice-toggle-btn"
                onClick={() => setAutoSpeakEnabled(!autoSpeakEnabled)}
                title={autoSpeakEnabled ? 'Voice Auto-Play Enabled' : 'Voice Muted'}
              >
                <Volume2 size={16} />
              </button>
            )}

            <button onClick={onClose} aria-label="Close Belle" className="close-btn text-white">
              <X size={18} />
            </button>
          </div>
        </header>

        {/* ElevenLabs Voice Selection Ribbon & Language Selector */}
        <div className="elevenlabs-voice-ribbon flex-wrap gap-2">
          <div className="flex items-center gap-1 text-[11px] text-wine font-medium">
            <Radio size={12} className="text-rose-700 animate-pulse" />
            <span>Voice:</span>
          </div>
          <select
            className="voice-select-dropdown"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {ELEVENLABS_VOICES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1 text-[11px] text-wine font-medium ml-auto">
            <Globe size={12} className="text-wine" />
            <span>Language:</span>
          </div>
          <select
            className="voice-select-dropdown"
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Safety Disclaimer */}
        <div className="belle-chat-disclaimer">
          <ShieldCheck size={14} className="shrink-0 text-amber-900" />
          <span>
            Belle is an AI care companion, not a clinician. She cannot diagnose, prescribe, or replace your oncology team.
            In an emergency, please use our Hospital Locator tab or contact emergency dispatch.
          </span>
        </div>

        {/* Quick Question Prompts */}
        <div className="belle-quick-actions">
          <button
            type="button"
            onClick={() => setInput('Help me prepare 3 key questions for my oncology appointment.')}
          >
            Prepare appointment questions
          </button>
          <button
            type="button"
            onClick={() => setInput('Find comprehensive cancer treatment hospitals near me.')}
          >
            Find cancer centers
          </button>
          <button
            type="button"
            onClick={() => setInput('How can I manage post-chemotherapy nausea safely?')}
          >
            Managing chemo side-effects
          </button>
        </div>

        {/* Messages Stream */}
        <div className="belle-chat-messages" aria-live="polite">
          {messages.map((message, index) => (
            <article
              key={index}
              className={message.role === 'user' ? 'belle-message user' : 'belle-message assistant'}
            >
              <div className="message-author-tag">
                {message.role === 'user' ? (
                  'You'
                ) : (
                  <span className="flex items-center gap-1 font-serif text-wine font-semibold">
                    <Flower2 size={12} /> Belle
                  </span>
                )}
              </div>
              <p className="message-content-text leading-relaxed whitespace-pre-wrap">{message.content}</p>

              {message.role === 'assistant' && (
                <div className="message-voice-action mt-2">
                  <button
                    type="button"
                    className="read-aloud-text-btn"
                    onClick={() => speakText(message.content)}
                  >
                    <Volume2 size={12} />
                    <span>Hear Belle Read This</span>
                  </button>
                </div>
              )}

              {message.sources && message.sources.length > 0 && (
                <div className="message-sources-strip mt-2">
                  <span className="text-[10px] text-stone-500 block mb-1">Official Clinical References:</span>
                  <div className="flex flex-wrap gap-2">
                    {message.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="source-reference-link"
                      >
                        {source.title} <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}

          {busy && (
            <div className="belle-typing flex items-center gap-2 text-xs text-wine font-serif italic py-2">
              <LoaderCircle size={14} className="animate-spin" />
              <span>Belle is gently reflecting…</span>
            </div>
          )}
        </div>

        {/* Input Composer */}
        <form className="belle-chat-compose" onSubmit={send}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Belle about symptoms, questions, or finding care…"
            maxLength={1200}
            aria-label="Message Belle"
            className="belle-input-field"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="belle-send-btn button-wine"
          >
            <Send size={15} />
          </button>
        </form>

        <footer className="belle-chat-footer text-[10px] text-stone-500 p-2 text-center">
          Encrypted Sanctuary Protocol · Confirm all clinical choices with your treating oncologist.
        </footer>
      </section>
    </div>
  );
}
