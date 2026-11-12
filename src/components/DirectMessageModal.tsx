import { useState } from 'react';
import { UserProfile } from '../types';
import { Send, ShieldCheck, X, Mic, Smile, Lock } from 'lucide-react';

interface DirectMessageModalProps {
  open: boolean;
  onClose: () => void;
  targetUser: UserProfile;
  currentUser: UserProfile;
}

interface ChatMsg {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isVoiceNote?: boolean;
}

export default function DirectMessageModal({
  open,
  onClose,
  targetUser,
  currentUser,
}: DirectMessageModalProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      senderId: targetUser.id,
      senderName: targetUser.name,
      text: `Hello ${currentUser.name}! Thank you for reaching out in our Avelune sanctuary. How can I support your journey today?`,
      timestamp: '10:15 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  if (!open) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated caring reply
    setTimeout(() => {
      const replyMsg: ChatMsg = {
        id: `msg_reply_${Date.now()}`,
        senderId: targetUser.id,
        senderName: targetUser.name,
        text: `Thank you for sharing this with me. Your courage is an anchor for our whole community. I'm keeping this strictly confidential.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  const handleSendVoiceNote = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceMsg: ChatMsg = {
        id: `voice_${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: '🎙️ Voice note (0:24) — “Sending warm strength and prayers your way today.”',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVoiceNote: true,
      };
      setMessages((prev) => [...prev, voiceMsg]);
    }, 1800);
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="exquisite-modal dm-modal deckle-edge"
        role="dialog"
        aria-modal="true"
        aria-label={`Direct Message with ${targetUser.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dm-header">
          <div className="dm-user-profile-row">
            <img
              src={targetUser.avatar}
              alt={targetUser.name}
              className="dm-avatar"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="dm-user-name font-serif text-lg text-stone-900 font-medium">
                  {targetUser.name}
                </h3>
                {targetUser.isVerified && (
                  <span title="Verified Member"><ShieldCheck size={14} className="text-emerald-700" /></span>
                )}
              </div>
              <p className="dm-user-subline text-xs text-stone-500">
                {targetUser.roleTitle} · {targetUser.location}
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close message window">
            <X size={18} />
          </button>
        </div>

        {/* E2EE Safety Banner */}
        <div className="dm-safety-banner">
          <Lock size={12} className="text-amber-800 shrink-0" />
          <span>
            End-to-End Encrypted. Neither Avelune nor third parties can read these messages.
            Personal contact details remain protected.
          </span>
        </div>

        {/* Message Thread */}
        <div className="dm-messages-container">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`dm-bubble-row ${isMe ? 'my-message' : 'their-message'}`}
              >
                <div className={`dm-bubble ${isMe ? 'bubble-me' : 'bubble-them'}`}>
                  <p className="dm-text text-sm leading-relaxed">{msg.text}</p>
                  <span className="dm-time text-[10px] opacity-70 block mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="dm-input-form">
          <button
            type="button"
            className={`dm-icon-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleSendVoiceNote}
            title="Send audio voice note"
          >
            <Mic size={17} className={isRecording ? 'text-red-500 animate-pulse' : ''} />
          </button>

          <input
            type="text"
            className="dm-input-field"
            placeholder={isRecording ? 'Recording voice note…' : `Message ${targetUser.name}…`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            type="button"
            className="dm-icon-btn"
            onClick={() => setInputText((prev) => prev + ' 🌸')}
            title="Insert flower emoji"
          >
            <Smile size={17} />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="dm-send-btn button-wine"
            aria-label="Send Message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
