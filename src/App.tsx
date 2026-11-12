import { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { INITIAL_USERS } from './data/mockData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navigation from './components/Navigation';
import AuthFlow from './components/AuthFlow';
import RoleSwitcherModal from './components/RoleSwitcherModal';
import DailyPoetrySection from './components/DailyPoetrySection';
import PatientProfiles from './components/PatientProfiles';
import CommunityFeed from './components/CommunityFeed';
import PublicGroups from './components/PublicGroups';
import HospitalLocator from './components/HospitalLocator';
import TelehealthCenter from './components/TelehealthCenter';
import HealingCorner from './components/HealingCorner';
import SurvivorInspiration from './components/SurvivorInspiration';
import EventsAndConferences from './components/EventsAndConferences';
import ClinicianPortal from './components/ClinicianPortal';
import BelleChat from './components/BelleChat';
import EncryptedSecurityBadge from './components/EncryptedSecurityBadge';
import Workspace from './components/Workspace';
import CareTimeline from './components/CareTimeline';
import {
  Flower2,
  Sparkles,
  Heart,
  ShieldCheck,
  ArrowRight,
  Radio,
  BookOpen,
  Calendar,
  Siren,
  Car
} from 'lucide-react';

function AppContent() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('avelune_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isBelleChatOpen, setIsBelleChatOpen] = useState(false);
  const { t, currentLangInfo } = useLanguage();

  const handleAuthenticated = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('avelune_current_user', JSON.stringify(user));
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSignOut = () => {
    localStorage.removeItem('avelune_current_user');
    setCurrentUser(null);
  };

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('avelune_current_user', JSON.stringify(user));
  };

  // If user is not yet logged in / signed up, show the Logo Splash -> Sign Up -> Login flow
  if (!currentUser) {
    return <AuthFlow onAuthenticated={handleAuthenticated} />;
  }

  const role = currentUser.role === 'oncologist' || currentUser.role === 'medical_doctor'
    ? 'clinician'
    : currentUser.role === 'family_caregiver'
    ? 'caregiver'
    : 'patient';

  return (
    <div className="app-sanctuary-shell">
      {/* Top Bar Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        currentUser={currentUser}
        onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
        onOpenBelleChat={() => setIsBelleChatOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Pages Router */}
      <main className="main-content-canvas">
        {/* 1. HOMEPAGE SANCTUARY */}
        {currentPage === 'home' && (
          <div className="sanctuary-home-wrapper">
            {/* Exquisite Floral Botanical Hero */}
            <section className="editorial-botanical-hero">
              <div className="hero-text-side">
                <div className="botanical-flourish">
                  <Flower2 size={22} className="text-wine" />
                  <span className="script-kicker">“{t('tagline')}”</span>
                </div>

                <h1 className="hero-display-title font-serif">
                  A sanctuary where <br />
                  <em>healing begins in the heart.</em>
                </h1>

                <p className="hero-deckle-lede">
                  More life. More care. A considered space uniting cancer warriors, oncologists,
                  caregivers, and poets. From in-built PayPal patient donations and hospital transit
                  to daily Instagram poetry and our AI companion, Belle.
                </p>

                <div className="hero-action-buttons-strip">
                  <button
                    type="button"
                    className="button-wine"
                    onClick={() => setCurrentPage('patients')}
                  >
                    <Heart size={16} fill="currentColor" />
                    <span>Support Patient Funds</span>
                  </button>

                  <button
                    type="button"
                    className="hero-secondary-btn"
                    onClick={() => setIsBelleChatOpen(true)}
                  >
                    <Sparkles size={16} className="text-wine" />
                    <span>Converse with Belle</span>
                  </button>
                </div>

                {/* Quick Care Indicator */}
                <div className="hero-trust-row mt-6 pt-4 border-t border-stone-200 text-xs text-stone-600 flex items-center gap-3">
                  <ShieldCheck size={16} className="text-emerald-800" />
                  <span>
                    Airtight End-to-End Encryption · Verified KMPDC Clinical Protocols · Zero PHI Leaks
                  </span>
                </div>
              </div>

              {/* Visual Hero Composition with generated botanical masterpiece */}
              <div className="hero-visual-side">
                <div className="hero-deckle-frame deckle-edge">
                  <img
                    src="/src/assets/images/floral_botanical_header_1794486895569.jpg"
                    alt="Avelune Wild Tea Roses and Golden Flora"
                    className="hero-botanical-artwork"
                  />
                  <div className="hero-artwork-caption">
                    <span className="script-kicker text-rose-900">Wild Tea Roses & Golden Flora</span>
                    <p className="text-[11px] text-stone-600 font-serif italic m-0">
                      “In every wound, nature plants the seed of a quiet blossom.”
                    </p>
                  </div>
                </div>

                {/* Meet Belle Floating Invitation */}
                <div
                  className="belle-floating-card deckle-edge cursor-pointer"
                  onClick={() => setIsBelleChatOpen(true)}
                >
                  <img
                    src="/src/assets/images/belle_care_companion_1794487035850.jpg"
                    alt="Belle Care Companion"
                    className="belle-card-thumb"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <strong className="font-serif text-xs text-stone-900 font-semibold">Belle is Online</strong>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    </div>
                    <span className="text-[10px] text-wine font-serif italic block">
                      “How is your spirit today?”
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Daily Poetry Showcase Section */}
            <DailyPoetrySection onOpenGroup={() => setCurrentPage('groups')} />

            {/* Emergency Transit Quick Ribbon */}
            <section className="px-6 max-w-5xl mx-auto my-12">
              <div className="emergency-quick-bar deckle-edge">
                <div className="emergency-text-col">
                  <div className="flex items-center gap-2 text-wine font-serif text-lg font-medium">
                    <Siren size={20} className="text-red-700 animate-pulse" />
                    <span>{t('emergencyTransport')}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Instant 24/7 ambulance dispatch & hospital taxi booking for patient appointments.
                  </p>
                </div>
                <div className="emergency-buttons-col">
                  <button
                    type="button"
                    className="emergency-ambulance-btn"
                    onClick={() => setCurrentPage('hospitals')}
                  >
                    <Siren size={15} /> {t('requestAmbulance')}
                  </button>
                  <button
                    type="button"
                    className="medical-taxi-btn"
                    onClick={() => setCurrentPage('hospitals')}
                  >
                    <Car size={15} /> {t('bookTaxi')}
                  </button>
                </div>
              </div>
            </section>

            {/* 3 Pillar Features of Avelune */}
            <section className="three-pillars-section px-6 max-w-6xl mx-auto my-16">
              <div className="section-botanical-header text-center">
                <span className="script-kicker">Woven for Whole-Person Healing</span>
                <h2 className="exquisite-heading">A Compassionate Ecosystem</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article
                  className="pillar-card deckle-edge p-6 cursor-pointer"
                  onClick={() => setCurrentPage('patients')}
                >
                  <span className="font-mono text-xs text-stone-400">01</span>
                  <div className="pillar-icon my-3 text-wine">
                    <Heart size={28} />
                  </div>
                  <span className="script-kicker text-rose-800">Direct Patient Care</span>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mt-1">
                    In-Built PayPal Donations
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    Transparent patient care campaigns with instant PayPal integration.
                    100% routed to chemotherapy, surgery, and diagnostics.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-wine font-semibold mt-4">
                    Explore Patient Profiles <ArrowRight size={13} />
                  </span>
                </article>

                <article
                  className="pillar-card deckle-edge p-6 cursor-pointer"
                  onClick={() => setCurrentPage('telehealth')}
                >
                  <span className="font-mono text-xs text-stone-400">02</span>
                  <div className="pillar-icon my-3 text-wine">
                    <Sparkles size={28} />
                  </div>
                  <span className="script-kicker text-rose-800">Clinical Telehealth</span>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mt-1">
                    Doctors, Therapy & Meds
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    Book board-certified oncologists, licensed psycho-oncology therapy, doctor home visits,
                    and order supportive hospital medications online.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-wine font-semibold mt-4">
                    Open Telehealth Center <ArrowRight size={13} />
                  </span>
                </article>

                <article
                  className="pillar-card deckle-edge p-6 cursor-pointer"
                  onClick={() => setCurrentPage('healing')}
                >
                  <span className="font-mono text-xs text-stone-400">03</span>
                  <div className="pillar-icon my-3 text-wine">
                    <BookOpen size={28} />
                  </div>
                  <span className="script-kicker text-rose-800">Restorative Living</span>
                  <h3 className="font-serif text-xl font-medium text-stone-900 mt-1">
                    Music, Games & Retreats
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    Frequency-calibrated audio, mindful mini-games for children & adults, Wattpad literature,
                    and Belle Amoura wellness vacation retreats.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-wine font-semibold mt-4">
                    Visit Healing Corner <ArrowRight size={13} />
                  </span>
                </article>
              </div>
            </section>

            {/* Airtight Security Banner */}
            <div className="px-6">
              <EncryptedSecurityBadge />
            </div>
          </div>
        )}

        {/* 2. DAILY POEMS PAGE */}
        {currentPage === 'poems' && (
          <DailyPoetrySection onOpenGroup={() => setCurrentPage('groups')} />
        )}

        {/* 3. COMMUNITY SOCIAL FEED */}
        {currentPage === 'community' && (
          <CommunityFeed
            currentUser={currentUser}
            onOpenPatientProfile={() => setCurrentPage('patients')}
          />
        )}

        {/* 4. CANCER PATIENT PROFILES & DONATION CENTER */}
        {currentPage === 'patients' && (
          <PatientProfiles currentUser={currentUser} />
        )}

        {/* 5. PUBLIC COLLABORATION GROUPS */}
        {currentPage === 'groups' && (
          <PublicGroups currentUser={currentUser} />
        )}

        {/* 6. HOSPITALS & EMERGENCY TRANSIT */}
        {currentPage === 'hospitals' && (
          <HospitalLocator />
        )}

        {/* 7. TELEHEALTH, THERAPY & HOSPITAL PHARMACY */}
        {currentPage === 'telehealth' && (
          <TelehealthCenter currentUser={currentUser} />
        )}

        {/* 8. HEALING CORNER, MUSIC, GAMES & RETREATS */}
        {currentPage === 'healing' && (
          <HealingCorner />
        )}

        {/* 9. SURVIVOR STORIES, TESTIMONIALS & Q&A */}
        {currentPage === 'survivors' && (
          <SurvivorInspiration currentUser={currentUser} />
        )}

        {/* 10. CONFERENCES & MEETUPS */}
        {currentPage === 'events' && (
          <EventsAndConferences currentUser={currentUser} />
        )}

        {/* 11. CLINICIAN VERIFICATION & PORTAL */}
        {currentPage === 'clinicians' && (
          <ClinicianPortal currentUser={currentUser} />
        )}

        {/* 12. PERSONAL WORKSPACE & TIMELINE */}
        {currentPage === 'workspace' && (
          <div className="workspace-page-wrapper px-6 max-w-5xl mx-auto py-10">
            <div className="section-botanical-header text-center">
              <span className="script-kicker">Your Private Sanctuary</span>
              <h2 className="exquisite-heading">Personal Care Workspace</h2>
              <p className="exquisite-subtext">
                Record your symptoms, organize questions for your oncology team, and review your care milestones.
              </p>
            </div>
            <Workspace role={role} />
            <div className="mt-12">
              <CareTimeline role={role} onNotice={() => {}} />
            </div>
          </div>
        )}
      </main>

      {/* Belle Chat Companion Modal */}
      <BelleChat
        open={isBelleChatOpen}
        onClose={() => setIsBelleChatOpen(false)}
      />

      {/* Role Switcher Perspective Modal */}
      <RoleSwitcherModal
        open={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
        currentUser={currentUser}
        allUsers={INITIAL_USERS}
        onSelectUser={handleSelectUser}
      />

      {/* Exquisite Footer */}
      <footer className="site-sanctuary-footer">
        <div className="footer-top-row">
          <div className="footer-brand-lockup">
            <span className="brand-monogram">a</span>
            <div>
              <span className="text-xl font-serif text-white block">avelune <b>health</b></span>
              <span className="footer-quote">“{t('tagline')}”</span>
            </div>
          </div>
          <div className="footer-language-tag text-xs text-stone-400">
            Active Language: <strong>{currentLangInfo.flag} {currentLangInfo.label}</strong>
          </div>
        </div>

        <div className="footer-nav-links">
          {[
            { id: 'home', label: 'Sanctuary' },
            { id: 'poems', label: 'Daily Poems' },
            { id: 'community', label: 'Community' },
            { id: 'patients', label: 'Patient Funds' },
            { id: 'hospitals', label: 'Hospitals' },
            { id: 'telehealth', label: 'Telehealth' },
            { id: 'healing', label: 'Music & Games' },
            { id: 'survivors', label: 'Survivor Stories' },
            { id: 'events', label: 'Conferences' },
            { id: 'clinicians', label: 'Doctors' },
            { id: 'workspace', label: 'Workspace' },
          ].map((lnk) => (
            <a
              key={lnk.id}
              href={`#${lnk.id}`}
              className="footer-nav-link"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(lnk.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {lnk.label}
            </a>
          ))}
        </div>

        <div className="footer-bottom-strip">
          <span>© 2026 Avelune Health · The Love of Life. All rights reserved.</span>
          <span>End-to-End Encrypted Healthcare & Community Platform.</span>
          <span>Not an emergency service. For immediate crises, call local emergency medical dispatch.</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
