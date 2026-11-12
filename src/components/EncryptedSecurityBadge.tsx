import { ShieldCheck, Lock, KeyRound, CheckCircle2 } from 'lucide-react';

export default function EncryptedSecurityBadge() {
  return (
    <div className="security-airtight-banner deckle-edge">
      <div className="security-icon-col">
        <div className="shield-emboss-circle">
          <ShieldCheck size={28} className="text-emerald-800" />
        </div>
      </div>

      <div className="security-copy-col">
        <div className="flex items-center gap-2">
          <span className="script-kicker text-rose-800">Airtight Patient Security & Integrity</span>
          <span className="text-[10px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-mono font-semibold">
            STATUS: AIRTIGHT & ACTIVE
          </span>
        </div>

        <h4 className="font-serif text-lg font-medium text-stone-900 mt-0.5">
          End-to-End Encrypted (E2EE) · Zero Patient Data Leaks · PayPal Escrow Security
        </h4>

        <p className="text-xs text-stone-600 leading-relaxed mt-1">
          Personal identities, phone numbers, treatment histories, voice calls, video consults, and payment
          flows are protected by AES-256 end-to-end cryptography. Patient contact details are completely
          hidden from public discovery and accessible exclusively to board-verified attending oncologists.
          Monthly algorithmic security and compliance audits run continuously.
        </p>

        <div className="security-badges-row flex flex-wrap gap-4 mt-3 text-xs text-stone-700">
          <span className="flex items-center gap-1.5">
            <Lock size={13} className="text-emerald-700" />
            <strong>E2EE Messages & Calls</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <KeyRound size={13} className="text-emerald-700" />
            <strong>Zero Public PHI Exposure</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-700" />
            <strong>PayPal Sandbox Verified Escrow</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
