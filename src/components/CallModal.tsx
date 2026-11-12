import { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, ShieldCheck, Sparkles } from 'lucide-react';

interface CallModalProps {
  open: boolean;
  onClose: () => void;
  targetUser: UserProfile;
  initialType?: 'voice' | 'video';
}

export default function CallModal({
  open,
  onClose,
  targetUser,
  initialType = 'video',
}: CallModalProps) {
  const [callType, setCallType] = useState<'voice' | 'video'>(initialType);
  const [callState, setCallState] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!open) {
      setCallState('connecting');
      setCallDuration(0);
      return;
    }

    setCallType(initialType);
    setCallState('connecting');

    // Simulate connection after 2 seconds
    const connectTimer = setTimeout(() => {
      setCallState('connected');
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, [open, initialType]);

  useEffect(() => {
    if (callState !== 'connected') return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  if (!open) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="exquisite-modal call-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${callType === 'video' ? 'Video' : 'Voice'} call with ${targetUser.name}`}
      >
        {/* Encrypted Notice Banner */}
        <div className="call-encrypted-ribbon">
          <ShieldCheck size={13} />
          <span>End-to-End Encrypted (Avelune Secure Audio/Video Protocol)</span>
        </div>

        {/* Video or Voice Canvas */}
        <div className="call-viewport-canvas">
          {callType === 'video' && !isVideoOff ? (
            <div className="call-video-stream">
              <img
                src={targetUser.avatar}
                alt={targetUser.name}
                className="call-video-bg-feed"
                referrerPolicy="no-referrer"
              />
              <div className="call-video-gradient" />

              {/* Self Video PIP */}
              <div className="call-pip-self">
                <span className="pip-label">You (Secure)</span>
              </div>
            </div>
          ) : (
            <div className="call-voice-stream">
              <div className="call-avatar-pulse-wrap">
                <div className={`avatar-pulse-ring ${callState === 'connected' ? 'active' : ''}`} />
                <img
                  src={targetUser.avatar}
                  alt={targetUser.name}
                  className="call-large-avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* User Info & State Overlay */}
          <div className="call-info-overlay">
            <h3 className="call-user-name font-serif text-2xl text-white font-medium">
              {targetUser.name}
            </h3>
            <p className="call-user-role text-xs text-rose-200">
              {targetUser.roleTitle}
            </p>

            <div className="call-status-indicator mt-2">
              {callState === 'connecting' && (
                <span className="call-connecting-label flex items-center gap-2 text-xs text-amber-300">
                  <Sparkles size={13} className="animate-spin" /> Calling & Establishing E2EE Channel…
                </span>
              )}
              {callState === 'connected' && (
                <span className="call-duration-clock font-mono text-xs text-emerald-300 tracking-wider">
                  {formatTimer(callDuration)}
                </span>
              )}
              {callState === 'ended' && (
                <span className="call-ended-label text-xs text-rose-300">
                  Call Ended
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Call Controls Bar */}
        <div className="call-controls-dock">
          <button
            type="button"
            className={`call-dock-btn ${isMuted ? 'active-mute' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <button
            type="button"
            className={`call-dock-btn ${isVideoOff ? 'active-video-off' : ''}`}
            onClick={() => {
              setIsVideoOff(!isVideoOff);
              if (callType === 'voice') setCallType('video');
            }}
            title={isVideoOff ? 'Enable camera' : 'Disable camera'}
          >
            {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
          </button>

          <button
            type="button"
            className="call-dock-btn"
            onClick={() => setCallType(callType === 'voice' ? 'video' : 'voice')}
            title="Switch Voice/Video mode"
          >
            <Volume2 size={18} />
          </button>

          <button
            type="button"
            className="call-dock-btn end-call-btn"
            onClick={handleEndCall}
            title="End Call"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
