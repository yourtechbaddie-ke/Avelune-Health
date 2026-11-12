import { useState } from 'react';
import { MedicalEvent, UserProfile } from '../types';
import { MEDICAL_EVENTS } from '../data/mockData';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  PlusCircle,
  Check,
  X,
  Flower2,
  Sparkles
} from 'lucide-react';

interface EventsAndConferencesProps {
  currentUser: UserProfile;
}

export default function EventsAndConferences({ currentUser }: EventsAndConferencesProps) {
  const [events, setEvents] = useState<MedicalEvent[]>(MEDICAL_EVENTS);
  const [filterType, setFilterType] = useState<'All' | 'Conferences' | 'Meetups'>('All');
  const [isOrganizeModalOpen, setIsOrganizeModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [organizeSuccess, setOrganizeSuccess] = useState(false);

  const handleToggleRSVP = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const nextRegistered = !ev.isRegistered;
          return {
            ...ev,
            isRegistered: nextRegistered,
            attendeesCount: nextRegistered ? ev.attendeesCount + 1 : ev.attendeesCount - 1,
          };
        }
        return ev;
      })
    );
  };

  const handleOrganizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newEv: MedicalEvent = {
      id: `ev_${Date.now()}`,
      title: newTitle.trim(),
      type: 'Local Patient Meetup',
      date: newDate || 'Upcoming Weekend',
      time: '10:00 AM - 12:30 PM',
      location: newLocation.trim(),
      isVirtual: false,
      organizer: currentUser.name,
      attendeesCount: 1,
      isRegistered: true,
      description: newDesc.trim() || 'A compassionate gathering for patient and caregiver support.',
    };

    setEvents([newEv, ...events]);
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewDesc('');
    setOrganizeSuccess(true);
    setTimeout(() => {
      setOrganizeSuccess(false);
      setIsOrganizeModalOpen(false);
    }, 2000);
  };

  const filteredEvents = events.filter((ev) => {
    if (filterType === 'All') return true;
    if (filterType === 'Conferences') return ev.type.includes('Conference') || ev.type.includes('Symposium');
    if (filterType === 'Meetups') return ev.type.includes('Meetup') || ev.type.includes('Walk');
    return true;
  });

  return (
    <div className="events-conferences-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Gatherings of Mind & Heart</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Global Medical Conferences & Local Meetups
        </h2>
        <p className="exquisite-subtext">
          Connect with international oncology researchers at live medical summits or organize
          local patient and caregiver gatherings for medical, emotional, and creative support.
        </p>
      </div>

      {/* Top Controls Bar */}
      <div className="events-controls-bar mb-6 flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2">
          {(['All', 'Conferences', 'Meetups'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-tab-btn ${filterType === tab ? 'active' : ''}`}
              onClick={() => setFilterType(tab)}
            >
              {tab === 'All' ? 'All Gatherings' : tab === 'Conferences' ? 'Medical Conferences' : 'Local Support Meetups'}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="button-wine text-xs px-4 py-2 flex items-center gap-2"
          onClick={() => setIsOrganizeModalOpen(true)}
        >
          <PlusCircle size={15} />
          <span>Organise a Local Meetup</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {filteredEvents.map((ev) => (
          <article key={ev.id} className="event-card deckle-edge p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="event-type-pill text-xs font-serif italic text-wine">
                {ev.type}
              </span>
              {ev.isVirtual ? (
                <span className="flex items-center gap-1 text-[11px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  <Video size={12} /> Virtual Telecast Available
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <MapPin size={12} /> In-Person Gathering
                </span>
              )}
            </div>

            <h3 className="event-title font-serif text-xl font-medium text-stone-900 mt-1">
              {ev.title}
            </h3>

            <div className="event-details-meta my-3 space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-wine shrink-0" />
                <span>{ev.date} · {ev.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-wine shrink-0" />
                <span>{ev.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-wine shrink-0" />
                <span>{ev.attendeesCount.toLocaleString()} delegates & patients attending</span>
              </div>
            </div>

            <p className="event-desc text-xs text-stone-700 leading-relaxed my-3">
              {ev.description}
            </p>

            <div className="event-card-footer mt-4 pt-3 border-t border-stone-200 flex justify-between items-center">
              <span className="text-[11px] text-stone-500 font-serif italic">
                Organized by: {ev.organizer}
              </span>

              <button
                type="button"
                className={`button-wine text-xs px-4 py-1.5 ${ev.isRegistered ? 'bg-emerald-800 hover:bg-emerald-900' : ''}`}
                onClick={() => handleToggleRSVP(ev.id)}
              >
                {ev.isRegistered ? (
                  <>
                    <Check size={13} className="inline mr-1" /> Attending (RSVP Confirmed)
                  </>
                ) : (
                  'RSVP / Register Free'
                )}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ORGANISE MEETUP MODAL */}
      {isOrganizeModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsOrganizeModalOpen(false)}>
          <div
            className="exquisite-modal organize-modal deckle-edge"
            role="dialog"
            aria-modal="true"
            aria-label="Organise a Local Meetup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsOrganizeModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {!organizeSuccess ? (
              <div>
                <div className="modal-script-kicker">Gathering Your Local Circle</div>
                <h3 className="modal-serif-title text-2xl font-medium text-stone-900 mt-1">
                  Organise a Community Meetup
                </h3>
                <p className="text-xs text-stone-600 mt-1 mb-4">
                  Bring patients, caregivers, oncology nurses, and friends together in your city.
                </p>

                <form onSubmit={handleOrganizeSubmit} className="space-y-3">
                  <div>
                    <label className="form-label-xs block mb-1">Meetup Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nairobi Cancer Warriors Morning Tea & Poetry"
                      className="exquisite-input"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-grid-2col gap-3">
                    <div>
                      <label className="form-label-xs block mb-1">Proposed Date</label>
                      <input
                        type="date"
                        required
                        className="exquisite-input"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="form-label-xs block mb-1">Venue / Park / Café</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karura Forest River Café, Nairobi"
                        className="exquisite-input"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label-xs block mb-1">Meetup Description & Purpose</label>
                    <textarea
                      rows={3}
                      placeholder="Share what attendees can expect: soft conversation, herbal teas, guided meditation, or symptom check-in…"
                      className="exquisite-textarea"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
                    Publish Community Meetup
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <Check size={36} className="text-wine mx-auto mb-2" />
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  Meetup Published Successfully!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto my-3">
                  Your local gathering has been added to the Avelune Events directory.
                  Nearby patients and caregivers will receive an invitation in their feed.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
