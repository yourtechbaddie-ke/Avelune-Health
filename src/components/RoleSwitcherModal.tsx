import { Check, Sparkles, Stethoscope, Heart, Users, DollarSign, Calendar, Feather, ShieldCheck, X } from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface RoleSwitcherModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  allUsers: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
}

const ROLE_ICONS: Record<UserRole, any> = {
  oncologist: Stethoscope,
  medical_doctor: Stethoscope,
  medical_consultant: Stethoscope,
  therapist: Heart,
  cancer_patient: Heart,
  cancer_survivor: Sparkles,
  family_caregiver: Users,
  donor: DollarSign,
  investor: DollarSign,
  medical_event_planner: Calendar,
  poet: Feather,
};

export default function RoleSwitcherModal({
  open,
  onClose,
  currentUser,
  allUsers,
  onSelectUser,
}: RoleSwitcherModalProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="exquisite-modal role-switch-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Switch User Account Perspective"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="modal-script-kicker">Choose Your Perspective</div>
        <h2 className="modal-serif-title">Experience Avelune Through Every Lens</h2>
        <p className="modal-desc">
          Avelune Health unites the entire circle of care. Switch accounts below to explore specific features
          built for oncologists, patients, poets, donors, and family caregivers.
        </p>

        <div className="role-user-grid">
          {allUsers.map((user) => {
            const isSelected = user.id === currentUser.id;
            const IconComponent = ROLE_ICONS[user.role] || Heart;

            return (
              <button
                key={user.id}
                type="button"
                className={`role-user-card ${isSelected ? 'active-role' : ''}`}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
              >
                <div className="role-card-avatar-wrap">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="role-card-avatar"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <span className="role-card-check">
                      <Check size={12} />
                    </span>
                  )}
                </div>

                <div className="role-card-text">
                  <div className="role-card-topline">
                    <span className="role-card-badge">
                      <IconComponent size={11} />
                      {user.role.replace('_', ' ')}
                    </span>
                    {user.isVerified && (
                      <span className="role-verified-badge" title="Verified Professional / Member">
                        <ShieldCheck size={11} />
                      </span>
                    )}
                  </div>
                  <h4 className="role-card-name">{user.name}</h4>
                  <p className="role-card-title">{user.roleTitle}</p>
                  <span className="role-card-location">{user.location}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="modal-footnote-strip">
          <ShieldCheck size={14} />
          <span>
            End-to-end encrypted identity protocols. Personal health contact information remains hidden
            except between verified patients and assigned clinical teams.
          </span>
        </div>
      </div>
    </div>
  );
}
