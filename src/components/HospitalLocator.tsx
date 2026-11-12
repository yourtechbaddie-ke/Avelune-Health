import { useState } from 'react';
import { HospitalFacility } from '../types';
import { HOSPITALS } from '../data/mockData';
import {
  MapPin,
  Navigation,
  Phone,
  Siren,
  Car,
  ShieldCheck,
  Clock,
  Search,
  ExternalLink,
  CheckCircle2,
  X,
  Sparkles,
  Flower2
} from 'lucide-react';

export default function HospitalLocator() {
  const [facilities, setFacilities] = useState<HospitalFacility[]>(HOSPITALS);
  const [selectedFacility, setSelectedFacility] = useState<HospitalFacility>(HOSPITALS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState<'All' | 'Nairobi' | 'London'>('All');
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [isTaxiModalOpen, setIsTaxiModalOpen] = useState(false);
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);
  const [ambulanceETA, setAmbulanceETA] = useState(8);
  const [taxiProvider, setTaxiProvider] = useState<'Uber' | 'Bolt' | 'Local Medical Cab'>('Uber');
  const [taxiBooked, setTaxiBooked] = useState(false);

  const filteredFacilities = facilities.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = filterCity === 'All' || h.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const handleOpenExternalMaps = (h: HospitalFacility) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${h.name}, ${h.address}`
    )}`;
    window.open(mapsUrl, '_blank');
  };

  const handleDispatchAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    setAmbulanceDispatched(true);
    // Countdown simulation
    const interval = setInterval(() => {
      setAmbulanceETA((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev - 1;
      });
    }, 3000);
  };

  const handleBookTaxi = (e: React.FormEvent) => {
    e.preventDefault();
    setTaxiBooked(true);
  };

  return (
    <div className="hospital-locator-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Compassionate Care Navigation</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Hospitals & Emergency Medical Transit
        </h2>
        <p className="exquisite-subtext">
          Find verified comprehensive cancer treatment centers near you, view locations on Google Maps,
          and request instant medical taxis or emergency ambulance dispatch.
        </p>
      </div>

      {/* Quick Action Emergency Buttons Bar */}
      <div className="emergency-quick-bar deckle-edge">
        <div className="emergency-text-col">
          <div className="flex items-center gap-2 text-wine font-serif text-lg font-medium">
            <Siren size={20} className="text-red-700 animate-pulse" />
            <span>Need Urgent Hospital Transport?</span>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Immediate dispatch for acute oncology complications, pain crises, or scheduled infusion transfers.
          </p>
        </div>

        <div className="emergency-buttons-col">
          <button
            type="button"
            className="emergency-ambulance-btn"
            onClick={() => {
              setAmbulanceDispatched(false);
              setAmbulanceETA(8);
              setIsAmbulanceModalOpen(true);
            }}
          >
            <Siren size={16} />
            <span>Request Ambulance (24/7)</span>
          </button>

          <button
            type="button"
            className="medical-taxi-btn"
            onClick={() => {
              setTaxiBooked(false);
              setIsTaxiModalOpen(true);
            }}
          >
            <Car size={16} />
            <span>Book Hospital Taxi (Uber / Local)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="facility-filters-row my-6">
        <div className="facility-search-wrap">
          <Search size={16} className="search-icon text-stone-400" />
          <input
            type="text"
            className="exquisite-input pl-9"
            placeholder="Search hospitals by name, city, or cancer treatment service…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="facility-city-pills">
          <button
            type="button"
            className={`filter-tab-btn ${filterCity === 'All' ? 'active' : ''}`}
            onClick={() => setFilterCity('All')}
          >
            All Locations
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${filterCity === 'Nairobi' ? 'active' : ''}`}
            onClick={() => setFilterCity('Nairobi')}
          >
            Nairobi Centers
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${filterCity === 'London' ? 'active' : ''}`}
            onClick={() => setFilterCity('London')}
          >
            International Referral
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Facility Cards Grid */}
      <div className="locator-split-layout">
        {/* Left: Facility Cards List */}
        <div className="facility-cards-list">
          {filteredFacilities.map((facility) => {
            const isSelected = facility.id === selectedFacility.id;
            return (
              <article
                key={facility.id}
                className={`facility-master-card deckle-edge ${isSelected ? 'selected-card' : ''}`}
                onClick={() => setSelectedFacility(facility)}
              >
                <div className="facility-card-top-meta">
                  <span className="facility-type-badge font-serif italic text-wine text-xs">
                    {facility.type}
                  </span>
                  {facility.isOpen24Hours && (
                    <span className="facility-24h-pill flex items-center gap-1 text-[11px] text-emerald-800">
                      <Clock size={11} /> 24/7 Oncology ER
                    </span>
                  )}
                </div>

                <h3 className="facility-name font-serif text-lg font-medium text-stone-900 mt-1">
                  {facility.name}
                </h3>
                <p className="facility-address text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                  <MapPin size={13} className="text-wine shrink-0" />
                  <span>{facility.address}, {facility.city}</span>
                </p>

                {/* Services Pills */}
                <div className="facility-services-tags mt-2">
                  {facility.services.slice(0, 4).map((s) => (
                    <span key={s} className="service-tag-item">
                      {s}
                    </span>
                  ))}
                  {facility.services.length > 4 && (
                    <span className="service-tag-more">
                      +{facility.services.length - 4} more
                    </span>
                  )}
                </div>

                <div className="facility-card-footer mt-4 pt-3 border-t border-stone-200/70 flex justify-between items-center">
                  <span className="facility-accreditation text-[11px] text-stone-500">
                    <ShieldCheck size={12} className="inline mr-1 text-emerald-700" />
                    {facility.accreditation}
                  </span>

                  <button
                    type="button"
                    className="facility-nav-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenExternalMaps(facility);
                    }}
                    title="Open in Google Maps / Apple Maps"
                  >
                    <Navigation size={13} />
                    <span>Get Directions</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right: Interactive Hospital Visual Map Pinboard */}
        <div className="interactive-map-canvas-container deckle-edge">
          <div className="map-view-header p-4 border-b border-stone-200 bg-stone-50/70 flex justify-between items-center">
            <div>
              <div className="script-kicker text-rose-800">Hospital Coordinates Canvas</div>
              <h4 className="font-serif text-base font-medium text-stone-900">
                {selectedFacility.name}
              </h4>
            </div>

            <button
              type="button"
              className="button-wine text-xs px-3 py-1.5 flex items-center gap-1.5"
              onClick={() => handleOpenExternalMaps(selectedFacility)}
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Stylized Interactive Map Canvas */}
          <div className="stylized-map-viewport">
            <div className="map-grid-pattern" />

            {/* Pins on the Map */}
            {filteredFacilities.map((f, i) => {
              const isSelected = f.id === selectedFacility.id;
              // Deterministic relative pin positions
              const topPos = 20 + ((i * 18 + 7) % 65);
              const leftPos = 25 + ((i * 22 + 13) % 60);

              return (
                <div
                  key={f.id}
                  className={`interactive-map-pin ${isSelected ? 'active-pin' : ''}`}
                  style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                  onClick={() => setSelectedFacility(f)}
                  title={f.name}
                >
                  <div className="pin-icon-circle">
                    <MapPin size={18} fill={isSelected ? '#6B1D2F' : '#1C332A'} className="text-white" />
                  </div>
                  <div className="pin-label-card">
                    <strong className="block text-xs font-serif">{f.name.split(' ')[0]}</strong>
                    <span className="text-[10px] text-stone-500">{f.distanceKm ? `${f.distanceKm} km away` : f.city}</span>
                  </div>
                </div>
              );
            })}

            {/* Selected Facility Overlay Callout */}
            <div className="map-selected-callout-overlay">
              <div className="callout-header">
                <span className="font-serif font-medium text-sm text-stone-900">
                  {selectedFacility.name}
                </span>
                <span className="text-[11px] text-wine font-medium">
                  {selectedFacility.isOpen24Hours ? '● Open Now 24/7' : '● Specialized Hours'}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {selectedFacility.address}
              </p>
              <div className="callout-contacts-row mt-2">
                <a
                  href={`tel:${selectedFacility.phone}`}
                  className="callout-phone-link"
                >
                  <Phone size={12} />
                  <span>Call Hospital: {selectedFacility.phone}</span>
                </a>
                <a
                  href={`tel:${selectedFacility.emergencyPhone}`}
                  className="callout-phone-link emergency text-red-700"
                >
                  <Siren size={12} />
                  <span>Emergency Line</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AMBULANCE DISPATCH MODAL */}
      {isAmbulanceModalOpen && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="exquisite-modal ambulance-modal deckle-edge"
            role="dialog"
            aria-modal="true"
            aria-label="Request Emergency Ambulance Dispatch"
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsAmbulanceModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {!ambulanceDispatched ? (
              <div>
                <div className="flex items-center gap-2 text-red-700 mb-1">
                  <Siren size={20} className="animate-pulse" />
                  <span className="font-serif font-bold text-lg">24/7 Emergency Ambulance Dispatch</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Connect instantly to verified acute oncology triage dispatchers in Nairobi & partner networks.
                </p>

                <form onSubmit={handleDispatchAmbulance} className="space-y-3">
                  <div>
                    <label className="form-label-xs block mb-1">Patient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amina Wangari"
                      defaultValue="Amina Wangari"
                      className="exquisite-input"
                    />
                  </div>

                  <div>
                    <label className="form-label-xs block mb-1">Current Pickup Address / Coordinates</label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Estate, Apartment Number, Nairobi"
                      defaultValue="Kilimani, Argwings Kodhek Rd, Gate 4"
                      className="exquisite-input"
                    />
                  </div>

                  <div>
                    <label className="form-label-xs block mb-1">Destination Oncology Center</label>
                    <select className="exquisite-select">
                      {facilities.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.name} ({f.isOpen24Hours ? '24/7 ER' : 'Day Clinic'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label-xs block mb-1">Primary Acute Symptom / Alert</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. High fever post-chemo, acute chest tightness, severe sudden pain…"
                      className="exquisite-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="button-wine w-full justify-center py-3 text-sm bg-red-800 hover:bg-red-900"
                  >
                    <Siren size={16} /> Confirm & Dispatch Nearest Paramedic Unit
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="ambulance-pulse-seal mx-auto mb-3">
                  <Siren size={36} className="text-red-700 animate-pulse" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  Ambulance Dispatched & En Route!
                </h3>
                <div className="eta-countdown-card my-4 p-4 bg-red-50/80 rounded-lg border border-red-200">
                  <span className="text-xs text-stone-500 uppercase tracking-widest block">Estimated Arrival</span>
                  <div className="font-mono text-3xl font-bold text-red-700 my-1">
                    ~ {ambulanceETA} Minutes
                  </div>
                  <span className="text-xs text-stone-700">Unit #AMB-NAI-08 · Paramedic Triage Team Assigned</span>
                </div>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mb-4">
                  Please keep phone line clear. The paramedic navigator is reviewing the patient’s oncology notes.
                </p>
                <button
                  type="button"
                  className="button-wine text-xs px-6 py-2"
                  onClick={() => setIsAmbulanceModalOpen(false)}
                >
                  Keep Tracking in Background
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MEDICAL TAXI MODAL (Uber / Local Cabs) */}
      {isTaxiModalOpen && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="exquisite-modal taxi-modal deckle-edge"
            role="dialog"
            aria-modal="true"
            aria-label="Book Hospital Taxi"
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsTaxiModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {!taxiBooked ? (
              <div>
                <div className="flex items-center gap-2 text-wine mb-1">
                  <Car size={20} />
                  <span className="font-serif font-medium text-lg">Book Hospital Medical Taxi</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Comfortable, climate-controlled rides to infusion appointments and outpatient visits.
                </p>

                <form onSubmit={handleBookTaxi} className="space-y-3">
                  <div>
                    <label className="form-label-xs block mb-1">Select Transit Provider</label>
                    <div className="flex gap-2">
                      {(['Uber', 'Bolt', 'Local Medical Cab'] as const).map((prov) => (
                        <button
                          key={prov}
                          type="button"
                          className={`flex-1 p-2 text-xs font-serif rounded border ${
                            taxiProvider === prov
                              ? 'border-wine bg-wine/10 text-wine font-semibold'
                              : 'border-stone-200 bg-white text-stone-700'
                          }`}
                          onClick={() => setTaxiProvider(prov)}
                        >
                          {prov}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label-xs block mb-1">Pickup Location</label>
                    <input
                      type="text"
                      defaultValue="Current Residence (Nairobi)"
                      className="exquisite-input"
                    />
                  </div>

                  <div>
                    <label className="form-label-xs block mb-1">Destination Hospital</label>
                    <select className="exquisite-select">
                      {facilities.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-3 rounded bg-stone-100 text-xs text-stone-600">
                    <span className="font-semibold text-stone-800 block">Care Rider Assurance:</span>
                    Drivers briefed on patient comfort, smooth braking, clean sanitization, and companion seating.
                  </div>

                  <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
                    <Car size={16} /> Request {taxiProvider} Ride
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 size={40} className="text-wine mx-auto mb-2" />
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  {taxiProvider} Ride Confirmed!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto my-3">
                  Driver Samuel (Toyota Premio · KDA 482B) is arriving in <strong>5 minutes</strong>.
                </p>
                <button
                  type="button"
                  className="button-wine text-xs px-6 py-2"
                  onClick={() => setIsTaxiModalOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
