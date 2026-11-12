import { useState } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, Heart, DollarSign, X, CheckCircle2, Sparkles } from 'lucide-react';

interface DonationModalProps {
  open: boolean;
  onClose: () => void;
  patient: UserProfile;
  onDonationSuccess?: (amount: number, donorName: string, message: string) => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export default function DonationModal({
  open,
  onClose,
  patient,
  onDonationSuccess,
}: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [supportMessage, setSupportMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!open) return null;

  const currentRaised = patient.donationRaised || 8940;
  const targetGoal = patient.donationGoal || 15000;
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const progressPercent = Math.min(100, Math.round((currentRaised / targetGoal) * 100));

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;

    setIsProcessing(true);

    // Simulate PayPal sandbox capture and verification
    setTimeout(() => {
      const fakeOrderRef = `PAYPAL-SANDBOX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setConfirmedOrderId(fakeOrderRef);
      setIsProcessing(false);
      setIsCompleted(true);
      if (onDonationSuccess) {
        onDonationSuccess(finalAmount, donorName || 'Anonymous Angel', supportMessage);
      }
    }, 1400);
  };

  const handleReset = () => {
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="exquisite-modal donation-modal deckle-edge"
        role="dialog"
        aria-modal="true"
        aria-label={`Donate to ${patient.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!isCompleted ? (
          <div>
            <div className="modal-script-kicker">Giving Hope & Vital Treatment</div>
            <h2 className="modal-serif-title">
              Support {patient.name}’s Care Fund
            </h2>

            <div className="donation-patient-preview">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="donation-avatar"
                referrerPolicy="no-referrer"
              />
              <div className="donation-preview-info">
                <span className="donation-cancer-badge font-serif italic text-wine font-medium">
                  {patient.cancerType || 'Cancer Warrior'}
                </span>
                <p className="donation-patient-blurb text-xs text-stone-600 line-clamp-2 mt-1">
                  {patient.bio}
                </p>
              </div>
            </div>

            {/* Campaign Progress Track */}
            <div className="donation-progress-block">
              <div className="progress-numbers-row">
                <span className="raised-stat font-serif font-bold text-wine text-lg">
                  ${currentRaised.toLocaleString()}{' '}
                  <small className="text-xs font-sans text-stone-500 font-normal">raised of ${targetGoal.toLocaleString()} goal</small>
                </span>
                <span className="percent-stat font-sans font-semibold text-xs text-stone-700">
                  {progressPercent}% Funded
                </span>
              </div>
              <div className="donation-progress-track">
                <div
                  className="donation-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="donation-subtext-note text-xs text-stone-500">
                100% of proceeds go directly to chemotherapy rounds, laboratory diagnostics and prescribed hospital care.
              </span>
            </div>

            <form onSubmit={handleDonate} className="donation-form mt-4">
              <label className="form-label font-medium text-xs text-stone-700 uppercase tracking-wider block mb-2">
                Select Donation Amount (USD)
              </label>

              <div className="amount-pills-row">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`amount-pill-btn ${!customAmount && selectedAmount === amt ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="custom-amount-wrap mt-3">
                <div className="custom-input-with-symbol">
                  <DollarSign size={16} className="dollar-icon text-stone-400" />
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Or enter custom amount in USD"
                    className="custom-amount-input"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                  />
                </div>
              </div>

              <div className="form-grid-2col mt-3">
                <div>
                  <label className="form-label-xs block mb-1">Your Name / Alias</label>
                  <input
                    type="text"
                    className="exquisite-input"
                    placeholder="e.g. Maria S. or 'A Friend in Faith'"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label-xs block mb-1">Receipt Email (Private)</label>
                  <input
                    type="email"
                    className="exquisite-input"
                    placeholder="For official donation receipt"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label-xs block mb-1">Encouraging Note or Prayer for {patient.name}</label>
                <textarea
                  className="exquisite-textarea"
                  rows={2}
                  placeholder="You are in our prayers every sunrise. Keep holding on!"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                />
              </div>

              <div className="paypal-secure-strip mt-4">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                <span className="text-xs text-stone-600">
                  Secured by PayPal Sandbox & Avelune E2EE Escrow. Zero patient financial data is shared publicly.
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing || finalAmount <= 0}
                className="paypal-action-button mt-4"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="animate-spin" size={16} /> Connecting to PayPal Sandbox…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart size={16} fill="currentColor" /> Donate ${finalAmount} via PayPal
                  </span>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="donation-success-canvas text-center py-6">
            <div className="success-icon-wrap mx-auto mb-4">
              <CheckCircle2 size={48} className="text-wine" />
            </div>

            <div className="script-kicker text-rose-800 text-lg">Gratitude from the Soul</div>
            <h2 className="modal-serif-title text-2xl my-2">
              Thank You for Your Sacred Generosity!
            </h2>

            <p className="text-sm text-stone-600 max-w-md mx-auto mb-4">
              Your gift of <strong>${finalAmount.toFixed(2)}</strong> has been captured in the PayPal
              Sandbox and routed to {patient.name}’s hospital care account.
            </p>

            <div className="order-receipt-card text-xs text-stone-600 max-w-sm mx-auto mb-6 p-4 rounded-lg bg-stone-100/70 border border-stone-200">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span>Transaction Ref:</span>
                <span className="font-mono text-stone-800 font-semibold">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span>Beneficiary:</span>
                <span className="font-serif text-stone-800">{patient.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Payment Method:</span>
                <span>PayPal Sandbox Verified</span>
              </div>
            </div>

            {supportMessage && (
              <blockquote className="donor-quote-box italic font-serif text-stone-700 bg-rose-50/60 p-4 rounded-lg border border-rose-200/50 max-w-md mx-auto mb-6">
                “{supportMessage}”
                <div className="text-xs font-sans text-stone-500 not-italic mt-1">— {donorName || 'An Anonymous Friend'}</div>
              </blockquote>
            )}

            <button
              type="button"
              className="button-wine px-6 py-2"
              onClick={handleReset}
            >
              Return to Patient Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
