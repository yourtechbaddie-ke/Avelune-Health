import { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import {
  Flower2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Heart,
  Stethoscope,
  Users,
  DollarSign,
  Feather,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthFlowProps {
  onAuthenticated: (user: UserProfile) => void;
}

type AuthStep = 'splash' | 'signup' | 'login';

const ALL_ROLES: { role: UserRole; title: string; category: string; icon: any }[] = [
  { role: 'cancer_patient', title: 'Cancer Patient', category: 'Patients & Family', icon: Heart },
  { role: 'cancer_survivor', title: 'Cancer Survivor', category: 'Patients & Family', icon: Sparkles },
  { role: 'family_caregiver', title: 'Family of Patient / Caregiver', category: 'Patients & Family', icon: Users },
  { role: 'oncologist', title: 'Oncologist (Cancer Specialist)', category: 'Healthcare Providers', icon: Stethoscope },
  { role: 'medical_doctor', title: 'Medical Doctor (Physician)', category: 'Healthcare Providers', icon: Stethoscope },
  { role: 'medical_consultant', title: 'Medical Consultant', category: 'Healthcare Providers', icon: Stethoscope },
  { role: 'therapist', title: 'Therapist / Psycho-Oncologist', category: 'Healthcare Providers', icon: Heart },
  { role: 'medical_event_planner', title: 'Medical Event & Conference Planner', category: 'Professional', icon: Users },
  { role: 'donor', title: 'Donor (Patient Care Sponsor)', category: 'Patrons & Creatives', icon: DollarSign },
  { role: 'investor', title: 'Healthcare Investor', category: 'Patrons & Creatives', icon: DollarSign },
  { role: 'poet', title: 'Poet / Healing Wordsmith', category: 'Patrons & Creatives', icon: Feather },
];

export default function AuthFlow({ onAuthenticated }: AuthFlowProps) {
  const [step, setStep] = useState<AuthStep>('splash');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('cancer_patient');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [bio, setBio] = useState('');
  const [cancerType, setCancerType] = useState('Breast Cancer');
  const [donationGoal, setDonationGoal] = useState('10000');
  const [createdUser, setCreatedUser] = useState<UserProfile | null>(null);
  const [authNotification, setAuthNotification] = useState<string | null>(null);

  // Auto transition splash or let user click to continue
  useEffect(() => {
    const timer = setTimeout(() => {
      // Allow user to explore splash or click
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const matchingRoleMeta = ALL_ROLES.find((r) => r.role === selectedRole);

    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      role: selectedRole,
      roleTitle: matchingRoleMeta ? matchingRoleMeta.title : 'Avelune Member',
      avatar: selectedRole === 'cancer_patient'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
      bio: bio.trim() || 'Embracing every sunrise with grace and courage.',
      location: location.trim() || 'Global Sanctuary',
      isVerified: true,
      cancerType: selectedRole === 'cancer_patient' ? cancerType : undefined,
      donationGoal: selectedRole === 'cancer_patient' ? parseFloat(donationGoal) || 10000 : undefined,
      donationRaised: selectedRole === 'cancer_patient' ? 0 : undefined,
      email: email.trim(),
      phone: '+254 700 *** 00',
      joinedDate: 'Today',
      followersCount: 1,
      followingCount: 5,
    };

    setCreatedUser(newUser);
    setAuthNotification(`Account created successfully for ${name}! Please sign in to enter the sanctuary.`);
    // As instructed: "When the user creates an account, they should be directed to the login page and next into the app."
    setStep('login');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (createdUser) {
      onAuthenticated(createdUser);
    } else {
      // Default to initial patient user if directly logging in
      const defaultUser = INITIAL_USERS.find((u) => u.email === email) || INITIAL_USERS[0];
      onAuthenticated(defaultUser);
    }
  };

  const handleQuickDemoLogin = (user: UserProfile) => {
    onAuthenticated(user);
  };

  // STEP 1: LOGO SPLASH SCREEN
  if (step === 'splash') {
    return (
      <div className="auth-splash-container">
        <div className="splash-card deckle-edge">
          <div className="splash-botanical-art">
            <img
              src="/src/assets/images/floral_botanical_header_1794486895569.jpg"
              alt="Avelune Botanical Floral"
              className="splash-floral-image"
            />
          </div>

          <div className="splash-brand-block text-center">
            <div className="splash-brand-mark">
              <span>a</span>
            </div>
            <h1 className="splash-brand-title">
              avelune <b>health</b>
            </h1>
            <div className="splash-tagline-script">
              “The Love of Life”
            </div>
            <p className="splash-subtext">
              Intelligent, compassionate cancer care navigation, community collaboration,
              and floral sanctuary.
            </p>
          </div>

          <div className="splash-cta-row">
            <button
              type="button"
              className="button-wine splash-enter-btn"
              onClick={() => setStep('signup')}
            >
              <span>Begin Your Journey · Create Account</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="splash-login-link"
              onClick={() => setStep('login')}
            >
              Already have an account? Sign In
            </button>
          </div>

          <div className="splash-security-footnote">
            <ShieldCheck size={14} className="text-emerald-800" />
            <span>End-to-End Encrypted Sanctuary · HIPAA & Privacy Compliant</span>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: SIGN UP PAGE
  if (step === 'signup') {
    return (
      <div className="auth-page-container">
        <div className="auth-form-card deckle-edge">
          <div className="auth-header-strip text-center">
            <div className="botanical-flourish justify-center">
              <Flower2 size={18} className="text-wine" />
              <span className="script-kicker">Welcome to the Sanctuary</span>
              <Flower2 size={18} className="text-wine" />
            </div>
            <h2 className="auth-title font-serif text-3xl font-medium text-stone-900 mt-1">
              Create Your Account
            </h2>
            <p className="auth-subtitle text-xs text-stone-600 max-w-sm mx-auto mt-1">
              Join patients, oncologists, caregivers, and poets in a space designed with compassion and care.
            </p>
          </div>

          <form onSubmit={handleSignUpSubmit} className="auth-form mt-6">
            {/* Role Selection */}
            <div className="form-group mb-4">
              <label className="form-label-xs block mb-2 font-semibold text-stone-800">
                I Am Joining As (Select Your Role):
              </label>
              <div className="role-selection-grid">
                {ALL_ROLES.map(({ role, title, icon: IconComponent }) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      className={`role-select-box ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedRole(role)}
                    >
                      <IconComponent size={14} className={isSelected ? 'text-wine' : 'text-stone-500'} />
                      <span className="role-select-label">{title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Basic Info */}
            <div className="form-grid-2col gap-3 mb-3">
              <div>
                <label className="form-label-xs block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Wangari or Dr. Muthoni"
                  className="exquisite-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label-xs block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="exquisite-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2col gap-3 mb-3">
              <div>
                <label className="form-label-xs block mb-1">Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="exquisite-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label-xs block mb-1">City & Country</label>
                <input
                  type="text"
                  placeholder="e.g. Nairobi, Kenya"
                  className="exquisite-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Patient Specific Fields */}
            {selectedRole === 'cancer_patient' && (
              <div className="patient-extra-signup-box mb-4 p-3 bg-rose-50/70 rounded-lg border border-rose-200/60">
                <div className="flex items-center gap-2 mb-2 text-wine font-serif text-sm font-medium">
                  <Heart size={14} fill="currentColor" /> Patient Care & PayPal Donation Setup
                </div>
                <div className="form-grid-2col gap-3">
                  <div>
                    <label className="form-label-xs block mb-1">Cancer Condition / Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Breast Cancer (Stage III)"
                      className="exquisite-input text-xs"
                      value={cancerType}
                      onChange={(e) => setCancerType(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label-xs block mb-1">Care Donation Target (USD)</label>
                    <input
                      type="number"
                      placeholder="e.g. 15000"
                      className="exquisite-input text-xs"
                      value={donationGoal}
                      onChange={(e) => setDonationGoal(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bio / About */}
            <div className="form-group mb-4">
              <label className="form-label-xs block mb-1">
                A Few Words About You (About Section)
              </label>
              <textarea
                className="exquisite-textarea"
                rows={2}
                placeholder="Share a piece of who you are, what gives you hope, or your specialty…"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="auth-privacy-guarantee flex items-center gap-2 text-[11px] text-stone-600 mb-4">
              <Lock size={13} className="text-amber-800 shrink-0" />
              <span>
                Personal phone and email details are hidden from public view and visible only to verified
                doctors. All communications are end-to-end encrypted.
              </span>
            </div>

            <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
              <span>Create Account & Continue to Sign In</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="auth-switch-link text-center mt-4 text-xs text-stone-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-wine font-semibold underline underline-offset-4"
              onClick={() => setStep('login')}
            >
              Sign In Here
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: LOGIN PAGE
  return (
    <div className="auth-page-container">
      <div className="auth-form-card deckle-edge">
        {authNotification && (
          <div className="auth-success-alert mb-4">
            <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
            <span className="text-xs text-emerald-900 font-medium">{authNotification}</span>
          </div>
        )}

        <div className="auth-header-strip text-center">
          <div className="splash-brand-mark mx-auto mb-2">
            <span>a</span>
          </div>
          <h2 className="auth-title font-serif text-3xl font-medium text-stone-900">
            Sign In to Avelune Health
          </h2>
          <div className="script-kicker text-rose-800 mt-1">“The Love of Life”</div>
          <p className="auth-subtitle text-xs text-stone-600 max-w-sm mx-auto mt-1">
            Access your care workspace, community circles, verified oncologists, and daily poetry.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="auth-form mt-6">
          <div className="form-group mb-3">
            <label className="form-label-xs block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder={createdUser ? createdUser.email : 'amina.w@hidden.avelune'}
              defaultValue={createdUser ? createdUser.email : ''}
              className="exquisite-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label-xs block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              defaultValue="sanctuary2026"
              className="exquisite-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
            <span>Sign In to Sanctuary</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Quick Demo Login Personas */}
        <div className="demo-accounts-strip mt-6 pt-5 border-t border-stone-200">
          <span className="script-kicker text-xs text-stone-600 block text-center mb-3">
            Or Explore Instantly As:
          </span>
          <div className="quick-demo-buttons-grid">
            {INITIAL_USERS.slice(0, 4).map((u) => (
              <button
                key={u.id}
                type="button"
                className="quick-demo-persona-btn"
                onClick={() => handleQuickDemoLogin(u)}
              >
                <img src={u.avatar} alt={u.name} className="quick-avatar" referrerPolicy="no-referrer" />
                <div className="text-left">
                  <strong className="block text-xs font-serif text-stone-900">{u.name}</strong>
                  <small className="text-[10px] text-stone-500 capitalize">{u.role.replace('_', ' ')}</small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="auth-switch-link text-center mt-5 text-xs text-stone-600">
          Don't have an account yet?{' '}
          <button
            type="button"
            className="text-wine font-semibold underline underline-offset-4"
            onClick={() => setStep('signup')}
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}
