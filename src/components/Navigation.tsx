import { useState } from 'react';
import { UserProfile } from '../types';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  UserCheck,
  LogOut,
  Flower2,
  Globe
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: UserProfile;
  onOpenRoleSwitcher: () => void;
  onOpenBelleChat: () => void;
  onSignOut: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Sanctuary' },
  { id: 'poems', label: 'Daily Poems' },
  { id: 'community', label: 'Community Feed' },
  { id: 'patients', label: 'Patient Funds' },
  { id: 'groups', label: 'Public Groups' },
  { id: 'hospitals', label: 'Hospitals & Transit' },
  { id: 'telehealth', label: 'Telehealth & Meds' },
  { id: 'healing', label: 'Healing Corner' },
  { id: 'survivors', label: 'Survivor Stories' },
  { id: 'events', label: 'Conferences' },
  { id: 'clinicians', label: 'For Doctors' },
  { id: 'workspace', label: 'Workspace' },
];

export default function Navigation({
  currentPage,
  onNavigate,
  currentUser,
  onOpenRoleSwitcher,
  onOpenBelleChat,
  onSignOut,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, currentLangInfo, t } = useLanguage();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="exquisite-topbar">
      {/* Zone 1: Brand Wordmark */}
      <div className="topbar-brand-zone">
        <a
          href="/"
          className="brand-lockup-link"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
        >
          <span className="brand-monogram">a</span>
          <div className="brand-text-stack">
            <span className="brand-main-name">
              avelune <b>health</b>
            </span>
            <span className="brand-tagline-script">
              {t('tagline')}
            </span>
          </div>
        </a>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className={`topbar-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-text-link ${currentPage === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Zone 3: Actions Cluster */}
      <div className="topbar-actions-zone">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="header-lang-btn"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            title="Switch Language"
          >
            <Globe size={14} className="text-wine" />
            <span className="font-sans font-medium text-xs">{currentLangInfo.flag} {currentLangInfo.code.toUpperCase()}</span>
          </button>

          {langMenuOpen && (
            <div className="lang-dropdown-menu">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-option-item ${language === lang.code ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangMenuOpen(false);
                  }}
                >
                  <span className="text-base mr-2">{lang.flag}</span>
                  <span className="text-xs font-serif font-medium">{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Meet Belle Button */}
        <button
          type="button"
          className="meet-belle-header-btn"
          onClick={onOpenBelleChat}
          title="Open Belle AI Care Companion"
        >
          <img
            src="/src/assets/images/belle_care_companion_1794487035850.jpg"
            alt="Belle"
            className="header-belle-avatar"
          />
          <span className="belle-btn-text">{t('meetBelle')}</span>
          <Sparkles size={13} className="text-rose-700" />
        </button>

        {/* Current Active Persona & Switcher */}
        <button
          type="button"
          className="current-persona-btn"
          onClick={onOpenRoleSwitcher}
          title="Switch User Account Perspective"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="persona-avatar-img"
            referrerPolicy="no-referrer"
          />
          <div className="persona-info-snippet">
            <strong className="persona-name line-clamp-1">{currentUser.name}</strong>
            <span className="persona-role-label capitalize">
              {currentUser.role.replace('_', ' ')}
            </span>
          </div>
          <UserCheck size={14} className="text-wine" />
        </button>

        {/* Sign Out */}
        <button
          type="button"
          className="header-signout-btn"
          onClick={onSignOut}
          title="Sign Out to Welcome Screen"
        >
          <LogOut size={16} />
        </button>

        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
