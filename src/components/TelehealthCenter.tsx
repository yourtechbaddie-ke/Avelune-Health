import { useState } from 'react';
import { UserProfile, MedicationItem } from '../types';
import { PHARMACY_MEDICATIONS, INITIAL_USERS } from '../data/mockData';
import {
  Stethoscope,
  Video,
  Home,
  Pill,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ShoppingCart,
  X,
  Flower2,
  Lock
} from 'lucide-react';

interface TelehealthCenterProps {
  currentUser: UserProfile;
}

export default function TelehealthCenter({ currentUser }: TelehealthCenterProps) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'therapy' | 'home_visits' | 'pharmacy'>('appointments');
  const [medications, setMedications] = useState<MedicationItem[]>(PHARMACY_MEDICATIONS);
  const [cart, setCart] = useState<Array<{ item: MedicationItem; count: number }>>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState<string | null>(null);

  // Doctors & therapists
  const clinicians = INITIAL_USERS.filter(
    (u) =>
      u.role === 'oncologist' ||
      u.role === 'medical_doctor' ||
      u.role === 'therapist'
  );

  const [selectedClinician, setSelectedClinician] = useState<UserProfile>(clinicians[0]);
  const [selectedDate, setSelectedDate] = useState('2026-03-20');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');
  const [consultReason, setConsultReason] = useState('');

  const handleBookSession = (type: 'Clinic Consultation' | 'Video Telehealth Therapy' | 'Doctor Home Visit') => {
    setBookingSuccessNotice(
      `Your ${type} with ${selectedClinician.name} on ${selectedDate} at ${selectedTimeSlot} is reserved! A secure calendar invite and E2EE video room link have been sent.`
    );
    setTimeout(() => setBookingSuccessNotice(null), 6000);
  };

  const handleAddToCart = (item: MedicationItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) => (c.item.id === item.id ? { ...c, count: c.count + 1 } : c));
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.item.price * c.count, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutOpen(false);
      setOrderConfirmed(false);
    }, 4000);
  };

  return (
    <div className="telehealth-center-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Integrated Medical Care</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Telehealth, Therapy & Hospital Pharmacy
        </h2>
        <p className="exquisite-subtext">
          Book verified oncologist consultations, live therapy sessions, doctor home visits,
          and order hospital-certified cancer medications online.
        </p>
      </div>

      {bookingSuccessNotice && (
        <div className="booking-toast-alert">
          <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
          <span className="text-xs text-emerald-900 font-medium">{bookingSuccessNotice}</span>
        </div>
      )}

      {/* Segmented Service Tabs */}
      <div className="telehealth-tabs-bar">
        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <Stethoscope size={15} />
          <span>Doctor Consultations</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'therapy' ? 'active' : ''}`}
          onClick={() => setActiveTab('therapy')}
        >
          <Video size={15} />
          <span>Live Therapy Sessions</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'home_visits' ? 'active' : ''}`}
          onClick={() => setActiveTab('home_visits')}
        >
          <Home size={15} />
          <span>Doctor Home Visits</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'pharmacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('pharmacy')}
        >
          <Pill size={15} />
          <span>Hospital Pharmacy ({cart.length})</span>
        </button>
      </div>

      {/* TAB 1: DOCTOR APPOINTMENTS & TELEHEALTH */}
      {(activeTab === 'appointments' || activeTab === 'therapy' || activeTab === 'home_visits') && (
        <div className="booking-split-container">
          {/* Clinician Selection Column */}
          <div className="clinicians-selection-col">
            <h3 className="font-serif text-lg text-stone-900 font-medium mb-3">
              1. Select Verified Healthcare Specialist
            </h3>

            <div className="clinicians-cards-stack">
              {clinicians.map((doc) => {
                const isSelected = doc.id === selectedClinician.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    className={`clinician-select-card deckle-edge ${isSelected ? 'active-doctor' : ''}`}
                    onClick={() => setSelectedClinician(doc)}
                  >
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="clinician-avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div className="clinician-text text-left">
                      <div className="flex items-center gap-1.5">
                        <strong className="font-serif text-stone-900 text-sm">{doc.name}</strong>
                        <ShieldCheck size={13} className="text-emerald-700" />
                      </div>
                      <p className="text-xs text-wine font-serif italic">{doc.roleTitle}</p>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        {doc.hospitalAffiliation || doc.location}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Booking Details Form Column */}
          <div className="booking-form-col deckle-edge">
            <div className="booking-card-header p-5 border-b border-stone-200">
              <span className="script-kicker text-rose-800">
                {activeTab === 'appointments' && 'Oncology Clinic / Video Booking'}
                {activeTab === 'therapy' && 'Psycho-Oncology Therapy Session'}
                {activeTab === 'home_visits' && 'Verified Doctor In-Home Care Visit'}
              </span>
              <h4 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                Schedule with {selectedClinician.name}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                {selectedClinician.bio}
              </p>
            </div>

            <div className="p-5 space-y-4">
              <div className="form-grid-2col gap-3">
                <div>
                  <label className="form-label-xs block mb-1">Select Consultation Date</label>
                  <input
                    type="date"
                    className="exquisite-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label-xs block mb-1">Available Time Slot</label>
                  <select
                    className="exquisite-select"
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  >
                    <option value="09:00 AM">09:00 AM - 09:45 AM</option>
                    <option value="10:00 AM">10:00 AM - 10:45 AM</option>
                    <option value="11:30 AM">11:30 AM - 12:15 PM</option>
                    <option value="02:00 PM">02:00 PM - 02:45 PM</option>
                    <option value="04:00 PM">04:00 PM - 04:45 PM</option>
                  </select>
                </div>
              </div>

              {activeTab === 'home_visits' && (
                <div>
                  <label className="form-label-xs block mb-1">Home Visit Residence Address</label>
                  <input
                    type="text"
                    defaultValue="Kilimani, Nairobi (Patient Residence)"
                    className="exquisite-input"
                  />
                </div>
              )}

              <div>
                <label className="form-label-xs block mb-1">Main Concern / Discussion Topics</label>
                <textarea
                  className="exquisite-textarea"
                  rows={3}
                  placeholder="e.g. Reviewing recent PET scan results, adjusting anti-nausea protocol, or discussing emotional coping strategies…"
                  value={consultReason}
                  onChange={(e) => setConsultReason(e.target.value)}
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                <Lock size={14} className="text-amber-800 shrink-0" />
                <span>
                  Consultations are end-to-end encrypted under medical confidentiality protocols.
                </span>
              </div>

              <button
                type="button"
                className="button-wine w-full justify-center py-3 text-sm"
                onClick={() => {
                  const typeLabel =
                    activeTab === 'appointments'
                      ? 'Clinic Consultation'
                      : activeTab === 'therapy'
                      ? 'Video Telehealth Therapy'
                      : 'Doctor Home Visit';
                  handleBookSession(typeLabel);
                }}
              >
                <Calendar size={15} /> Confirm & Reserve Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HOSPITAL PHARMACY */}
      {activeTab === 'pharmacy' && (
        <div className="pharmacy-view-container">
          <div className="pharmacy-banner deckle-edge mb-6 p-5 flex justify-between items-center bg-stone-50/80">
            <div>
              <div className="script-kicker text-rose-800">Verified Oncology Dispensary</div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                Hospital Pharmacy & Supportive Care Medicines
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                Dispensed directly from certified oncology hospital pharmacies (Nairobi Hospital, Aga Khan, MP Shah).
                Doorstep temperature-controlled delivery available.
              </p>
            </div>

            <button
              type="button"
              className="button-wine text-xs px-4 py-2 flex items-center gap-2"
              onClick={() => setIsCheckoutOpen(true)}
            >
              <ShoppingCart size={15} />
              <span>Cart ({cart.reduce((a, b) => a + b.count, 0)}) · ${cartTotal.toFixed(2)}</span>
            </button>
          </div>

          <div className="medications-grid">
            {medications.map((med) => (
              <article key={med.id} className="medication-card deckle-edge">
                <div className="flex justify-between items-start mb-2">
                  <span className="med-category-pill text-xs font-serif italic text-wine">
                    {med.category}
                  </span>
                  <span className="med-price font-serif font-bold text-lg text-stone-900">
                    ${med.price.toFixed(2)}
                  </span>
                </div>

                <h4 className="med-name font-serif text-base font-semibold text-stone-900">
                  {med.name}
                </h4>
                <p className="med-dosage text-xs text-stone-500 font-sans mt-0.5">
                  {med.dosage}
                </p>

                <p className="med-desc text-xs text-stone-600 mt-2 leading-relaxed">
                  {med.description}
                </p>

                <div className="med-footer mt-4 pt-3 border-t border-stone-200/60 flex justify-between items-center">
                  <span className="med-supplier text-[10px] text-stone-500">
                    Dispensary: {med.hospitalSupplier}
                  </span>

                  <button
                    type="button"
                    className="button-wine text-xs px-3 py-1.5"
                    onClick={() => handleAddToCart(med)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* PHARMACY CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsCheckoutOpen(false)}>
          <div
            className="exquisite-modal checkout-modal deckle-edge"
            role="dialog"
            aria-modal="true"
            aria-label="Pharmacy Checkout"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setIsCheckoutOpen(false)} aria-label="Close cart">
              <X size={18} />
            </button>

            {!orderConfirmed ? (
              <div>
                <div className="modal-script-kicker">Hospital Pharmacy Checkout</div>
                <h2 className="modal-serif-title">Review Your Medication Order</h2>

                {cart.length === 0 ? (
                  <p className="text-xs text-stone-500 py-6 text-center">Your medicine cart is empty.</p>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 mt-4">
                    <div className="cart-items-list max-h-48 overflow-y-auto space-y-2 pr-1">
                      {cart.map(({ item, count }) => (
                        <div key={item.id} className="cart-item-row flex justify-between items-center p-2 rounded bg-stone-50 text-xs">
                          <div>
                            <strong className="font-serif block text-stone-900">{item.name}</strong>
                            <span className="text-stone-500 text-[10px]">Qty: {count} · {item.dosage}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif font-bold text-stone-800">${(item.price * count).toFixed(2)}</span>
                            <button
                              type="button"
                              className="text-red-700 hover:text-red-900"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="cart-total-strip flex justify-between py-2 border-t border-b border-stone-200 font-serif text-lg font-bold text-wine">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div>
                      <label className="form-label-xs block mb-1">Delivery Address</label>
                      <input
                        type="text"
                        required
                        defaultValue="Kilimani Estate, Nairobi"
                        className="exquisite-input"
                      />
                    </div>

                    <div>
                      <label className="form-label-xs block mb-1">Upload Prescription (If Required)</label>
                      <input type="file" className="text-xs text-stone-500" />
                    </div>

                    <div className="p-3 bg-stone-100 rounded text-xs text-stone-600 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                      <span>Certified Cold-Chain Medical Courier Dispatch</span>
                    </div>

                    <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
                      <ShoppingCart size={15} /> Confirm Order (${cartTotal.toFixed(2)})
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 size={42} className="text-wine mx-auto mb-2" />
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  Medication Order Confirmed!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto my-3">
                  Your prescription is being prepared at The Nairobi Hospital Dispensary.
                  Estimated temperature-controlled doorstep delivery: <strong>Today, 3:30 PM</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
