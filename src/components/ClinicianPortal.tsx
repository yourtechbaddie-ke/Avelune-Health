import { useState } from 'react';
import { UserProfile } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import {
  ShieldCheck,
  Award,
  Building,
  FileText,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  ExternalLink,
  Flower2
} from 'lucide-react';

interface ClinicianPortalProps {
  currentUser: UserProfile;
}

export default function ClinicianPortal({ currentUser }: ClinicianPortalProps) {
  const [activeTab, setActiveTab] = useState<'directory' | 'verify'>('directory');
  const [clinicians, setClinicians] = useState<UserProfile[]>(
    INITIAL_USERS.filter(
      (u) =>
        u.role === 'oncologist' ||
        u.role === 'medical_doctor' ||
        u.role === 'therapist'
    )
  );

  // Verification Form state
  const [fullName, setFullName] = useState(currentUser.name);
  const [licenseNumber, setLicenseNumber] = useState('KMPDC-REG-49821-MD');
  const [placeOfWork, setPlaceOfWork] = useState('The Nairobi Hospital Comprehensive Cancer Centre');
  const [certificationsText, setCertificationsText] = useState('MBChB (UoN), MSc Clinical Oncology (Nottingham), FRCR');
  const [portfolioSummary, setPortfolioSummary] = useState('Over 12 years of specialized radiation oncology, stereotactic body radiotherapy (SBRT), and supportive palliative care management.');
  const [referenceContact, setReferenceContact] = useState('Dr. J. Karanja (Chief of Oncology, Nairobi Hospital)');
  const [verifyNotice, setVerifyNotice] = useState(false);

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyNotice(true);
    setTimeout(() => setVerifyNotice(false), 5000);
  };

  return (
    <div className="clinician-portal-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Integrity, Science & Compassion</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Healthcare Professional Verification & Portfolios
        </h2>
        <p className="exquisite-subtext">
          Trust is the cornerstone of oncology care. Review verified oncologist credentials, hospital affiliations,
          and clinical portfolios, or submit your credentials for board verification.
        </p>
      </div>

      {/* Tabs */}
      <div className="telehealth-tabs-bar mb-6">
        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'directory' ? 'active' : ''}`}
          onClick={() => setActiveTab('directory')}
        >
          <ShieldCheck size={15} />
          <span>Verified Clinicians Directory</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          <Award size={15} />
          <span>Professional Verification Portal</span>
        </button>
      </div>

      {/* 1. CLINICIAN DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="clinicians-directory-grid">
          {clinicians.map((doc) => (
            <article key={doc.id} className="clinician-full-card deckle-edge">
              <div className="clinician-card-cover-bar">
                <img
                  src={doc.coverImage}
                  alt={`${doc.name} hospital`}
                  className="clinician-cover-thumb"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6">
                <div className="clinician-profile-header-row flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="clinician-large-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-xl font-medium text-stone-900">
                        {doc.name}
                      </h3>
                      {doc.isVerified && (
                        <span className="verified-seal-tag text-xs font-serif italic text-emerald-800 flex items-center gap-1">
                          <ShieldCheck size={14} className="text-emerald-700" /> Verified Specialist
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-wine font-serif italic block mt-0.5">
                      {doc.roleTitle}
                    </span>
                    <span className="text-[11px] text-stone-500 flex items-center gap-1 mt-1">
                      <Building size={12} /> {doc.hospitalAffiliation}
                    </span>
                  </div>
                </div>

                <p className="clinician-bio text-xs text-stone-700 leading-relaxed my-4">
                  {doc.bio}
                </p>

                {/* Medical Certifications & Badges */}
                {doc.certifications && (
                  <div className="clinician-certifications-block mb-4 p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">
                      Board Certifications & Credentials
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.certifications.map((cert) => (
                        <span key={cert} className="cert-pill text-[11px] text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-300">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* License Tag */}
                <div className="license-info-row flex justify-between items-center text-[11px] text-stone-500 pt-3 border-t border-stone-200">
                  <span>License ID: <strong className="font-mono text-stone-800">{doc.medicalLicense}</strong></span>
                  <span>Location: {doc.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 2. VERIFICATION PORTAL */}
      {activeTab === 'verify' && (
        <div className="verification-portal-container max-w-2xl mx-auto deckle-edge p-6">
          <div className="flex items-center gap-2 text-wine mb-2">
            <Award size={20} />
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Submit Medical Credentials for Verification
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed mb-6">
            Healthcare professionals are required to add their certifications, badges, occupation,
            reference contact, place of work, and medical portfolio for verification. The information
            is secured under medical confidentiality protocols and used solely for medical inquiry validation.
          </p>

          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div className="form-grid-2col gap-3">
              <div>
                <label className="form-label-xs block mb-1">Full Legal & Medical Name</label>
                <input
                  type="text"
                  required
                  className="exquisite-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label-xs block mb-1">Medical Board License ID (KMPDC / GMC / Board)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KMPDC-REG-49821-MD"
                  className="exquisite-input"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="form-label-xs block mb-1">Current Primary Place of Work / Hospital Affiliation</label>
              <input
                type="text"
                required
                className="exquisite-input"
                value={placeOfWork}
                onChange={(e) => setPlaceOfWork(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label-xs block mb-1">Board Certifications, Fellowships & Badges (Comma Separated)</label>
              <input
                type="text"
                required
                placeholder="MBChB, MMed Radiation Oncology, FRCR, EONS Member"
                className="exquisite-input"
                value={certificationsText}
                onChange={(e) => setCertificationsText(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label-xs block mb-1">Clinical Portfolio Summary & Specialty Focus</label>
              <textarea
                rows={3}
                required
                placeholder="Summarize your clinical focus, years in practice, clinical trials, and oncology sub-specialty…"
                className="exquisite-textarea"
                value={portfolioSummary}
                onChange={(e) => setPortfolioSummary(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label-xs block mb-1">Professional Reference Contact (Hospital Chair / Colleague)</label>
              <input
                type="text"
                required
                placeholder="Dr. Name, Department, Hospital, Official Email or Phone"
                className="exquisite-input"
                value={referenceContact}
                onChange={(e) => setReferenceContact(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label-xs block mb-1">Upload Medical Degree & Board Certificate Scan (PDF / JPG)</label>
              <input type="file" className="text-xs text-stone-500" />
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
              <Lock size={15} className="text-amber-800 shrink-0 mt-0.5" />
              <span>
                All documents submitted are encrypted at rest with AES-256 and verified through
                national medical registries (e.g. KMPDC registry) before verification badge issuance.
              </span>
            </div>

            <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
              <ShieldCheck size={16} /> Submit Credentials for Medical Registry Audit
            </button>
          </form>

          {verifyNotice && (
            <div className="success-banner-script mt-4">
              🌸 Credentials received! Verification audit initiated with the Medical Practitioners Council.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
