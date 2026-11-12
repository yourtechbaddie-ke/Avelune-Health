import { useState } from 'react';
import { UserProfile } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import DonationModal from './DonationModal';
import CallModal from './CallModal';
import DirectMessageModal from './DirectMessageModal';
import {
  Heart,
  MessageCircle,
  Phone,
  Video,
  Share2,
  ShieldCheck,
  Lock,
  Sparkles,
  DollarSign,
  Calendar,
  Check,
  Flower2
} from 'lucide-react';

interface PatientProfilesProps {
  currentUser: UserProfile;
}

export default function PatientProfiles({ currentUser }: PatientProfilesProps) {
  const [patients, setPatients] = useState<UserProfile[]>(
    INITIAL_USERS.filter((u) => u.role === 'cancer_patient')
  );
  const [selectedPatient, setSelectedPatient] = useState<UserProfile>(patients[0]);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callType, setCallType] = useState<'voice' | 'video'>('video');
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const isDoctor =
    currentUser.role === 'oncologist' ||
    currentUser.role === 'medical_doctor' ||
    currentUser.role === 'medical_consultant';

  const handleShareProfile = (patient: UserProfile) => {
    const shareUrl = window.location.href;
    const shareText = `Support ${patient.name}’s cancer care fund on Avelune Health · The Love of Life: ${shareUrl}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setShareToast(`Care profile link copied! Ready to share on WhatsApp or Instagram.`);
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  const handleDonationSuccess = (amount: number) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? { ...p, donationRaised: (p.donationRaised || 0) + amount }
          : p
      )
    );
    setSelectedPatient((prev) => ({
      ...prev,
      donationRaised: (prev.donationRaised || 0) + amount,
    }));
  };

  const currentRaised = selectedPatient.donationRaised || 8940;
  const targetGoal = selectedPatient.donationGoal || 15000;
  const progressPercent = Math.min(100, Math.round((currentRaised / targetGoal) * 100));

  return (
    <div className="patient-profiles-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Sanctuary of Healing & Generosity</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Cancer Warriors & Patient Circles
        </h2>
        <p className="exquisite-subtext">
          Direct support for patients navigating oncology treatments. In-built PayPal donations,
          end-to-end encrypted calls, and patient-first privacy protection.
        </p>
      </div>

      {shareToast && (
        <div className="share-toast-notification">
          <Check size={16} />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Profile Card & Showcase */}
      <div className="patient-showcase-container">
        <article className="patient-master-card deckle-edge">
          {/* Cover Photo */}
          <div className="patient-cover-wrapper">
            <img
              src={selectedPatient.coverImage}
              alt={`${selectedPatient.name} cover`}
              className="patient-cover-img"
              referrerPolicy="no-referrer"
            />
            <div className="patient-cover-gradient" />
            <button
              type="button"
              className="patient-share-cover-btn"
              onClick={() => handleShareProfile(selectedPatient)}
              title="Share patient profile to other apps"
            >
              <Share2 size={15} />
              <span>Share Profile</span>
            </button>
          </div>

          {/* Profile Header & Avatar Bar */}
          <div className="patient-avatar-identity-bar">
            <div className="patient-avatar-wrap">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="patient-profile-avatar"
                referrerPolicy="no-referrer"
              />
              {selectedPatient.isVerified && (
                <span className="patient-verified-seal" title="Verified Avelune Care Profile">
                  <ShieldCheck size={16} />
                </span>
              )}
            </div>

            {/* Action Buttons: Donate, Message, Call */}
            <div className="patient-action-cluster">
              <button
                type="button"
                className="patient-btn donate-highlight-btn"
                onClick={() => setIsDonateOpen(true)}
              >
                <Heart size={16} fill="currentColor" />
                <span>Donate</span>
              </button>

              <button
                type="button"
                className="patient-btn message-btn"
                onClick={() => setIsMessageOpen(true)}
              >
                <MessageCircle size={16} />
                <span>Message</span>
              </button>

              <div className="call-buttons-split">
                <button
                  type="button"
                  className="patient-btn call-btn"
                  onClick={() => {
                    setCallType('voice');
                    setIsCallOpen(true);
                  }}
                  title="Voice Call"
                >
                  <Phone size={15} />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  className="patient-btn call-video-btn"
                  onClick={() => {
                    setCallType('video');
                    setIsCallOpen(true);
                  }}
                  title="Video Call"
                >
                  <Video size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Patient Details & Bio */}
          <div className="patient-content-body">
            <div className="patient-names-block">
              <h3 className="patient-name font-serif text-3xl font-medium text-stone-900">
                {selectedPatient.name}
              </h3>
              <p className="patient-tagline text-sm text-wine font-serif italic mt-1">
                {selectedPatient.roleTitle} · {selectedPatient.location}
              </p>
            </div>

            {/* In-Built PayPal Campaign Card */}
            <div className="patient-donation-campaign-card">
              <div className="campaign-card-header">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-wine" />
                  <span className="font-serif text-lg font-medium text-stone-900">
                    Active Treatment Care Fund
                  </span>
                </div>
                <span className="paypal-verified-badge">
                  <ShieldCheck size={13} /> PayPal Sandbox Integrated
                </span>
              </div>

              <div className="campaign-stat-numbers my-3">
                <div>
                  <span className="font-serif font-bold text-3xl text-wine">
                    ${currentRaised.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500 block">
                    raised toward ${targetGoal.toLocaleString()} goal
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-sans font-semibold text-sm text-stone-700">
                    {progressPercent}%
                  </span>
                  <span className="text-xs text-stone-500 block">
                    from 48 loving donors
                  </span>
                </div>
              </div>

              <div className="donation-progress-track">
                <div
                  className="donation-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="campaign-actions-row mt-4">
                <button
                  type="button"
                  className="button-wine w-full justify-center"
                  onClick={() => setIsDonateOpen(true)}
                >
                  <Heart size={16} fill="currentColor" /> Donate to {selectedPatient.name}’s Care Fund
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="patient-about-section mt-6">
              <div className="script-kicker text-rose-800">About My Journey</div>
              <h4 className="font-serif text-xl text-stone-900 mb-2">Pieces of Who I Am</h4>
              <p className="patient-about-prose text-sm leading-relaxed text-stone-700">
                {selectedPatient.bio}
              </p>
              <p className="patient-about-prose text-sm leading-relaxed text-stone-700 mt-3">
                “When cancer arrived, it stripped away so many superficial certainties, but it gifted me
                a deeper intimacy with every breath. With the love of my family, the dedication of my oncology
                team, and the generosity of angels here on Avelune, I am reclaiming my future.”
              </p>
            </div>

            {/* Privacy Protection Notice */}
            <div className="patient-privacy-protection-box mt-6">
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600 leading-relaxed">
                  <strong className="text-stone-900 block font-medium mb-1">
                    Confidentiality & Privacy Shield Active
                  </strong>
                  {isDoctor ? (
                    <div className="doctor-unlocked-info">
                      <span className="text-emerald-800 font-semibold block mb-1">
                        ✓ Doctor Access Unlocked (Verified Healthcare Professional)
                      </span>
                      <span>
                        Official Care Contact: {selectedPatient.phone} · {selectedPatient.email}
                      </span>
                    </div>
                  ) : (
                    <span>
                      Personal contact information (phone number, home address, private records) is strictly
                      hidden from public view and visible solely to verified oncology doctors and assigned clinical teams.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Treatment Milestones */}
            <div className="patient-milestones-grid mt-6">
              <div className="milestone-item">
                <Calendar size={16} className="text-wine" />
                <div>
                  <span className="text-xs text-stone-500 block">Diagnosis</span>
                  <strong className="text-xs text-stone-800 font-serif">
                    {selectedPatient.diagnosisYear}
                  </strong>
                </div>
              </div>
              <div className="milestone-item">
                <Sparkles size={16} className="text-wine" />
                <div>
                  <span className="text-xs text-stone-500 block">Condition</span>
                  <strong className="text-xs text-stone-800 font-serif">
                    {selectedPatient.cancerType}
                  </strong>
                </div>
              </div>
              <div className="milestone-item">
                <ShieldCheck size={16} className="text-wine" />
                <div>
                  <span className="text-xs text-stone-500 block">Care Center</span>
                  <strong className="text-xs text-stone-800 font-serif">
                    Nairobi Hospital Comprehensive Centre
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Modals */}
      <DonationModal
        open={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        patient={selectedPatient}
        onDonationSuccess={handleDonationSuccess}
      />

      <CallModal
        open={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        targetUser={selectedPatient}
        initialType={callType}
      />

      <DirectMessageModal
        open={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        targetUser={selectedPatient}
        currentUser={currentUser}
      />
    </div>
  );
}
