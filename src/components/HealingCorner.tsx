import { useState } from 'react';
import { AudioTrack, BookItem, RetreatPackage } from '../types';
import { AUDIO_TRACKS, BOOKS_LIBRARY, RETREAT_PACKAGES } from '../data/mockData';
import {
  Music,
  Gamepad2,
  BookOpen,
  Palmtree,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  ExternalLink,
  Sparkles,
  Flower2,
  Heart,
  Check,
  X,
  Compass,
  Star
} from 'lucide-react';

export default function HealingCorner() {
  const [activeTab, setActiveTab] = useState<'music' | 'games' | 'books' | 'retreats'>('music');

  // MUSIC STATE
  const [tracks, setTracks] = useState<AudioTrack[]>(AUDIO_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const currentTrack = tracks[currentTrackIndex];

  // GAMES STATE
  const [activeGame, setActiveGame] = useState<'zen_garden' | 'memory' | 'word_search'>('zen_garden');
  // Zen Garden state: 9 garden tiles
  const [gardenTiles, setGardenTiles] = useState<Array<{ id: number; flower: string | null }>>([
    { id: 1, flower: '🌸' },
    { id: 2, flower: null },
    { id: 3, flower: '🌼' },
    { id: 4, flower: null },
    { id: 5, flower: '🌺' },
    { id: 6, flower: null },
    { id: 7, flower: null },
    { id: 8, flower: '🪷' },
    { id: 9, flower: null },
  ]);
  const [flowersBloomedCount, setFlowersBloomedCount] = useState(4);

  // Memory card game state
  const MEMORY_CARDS = ['🕊️', '🌸', '✨', '🌿', '🕊️', '🌸', '✨', '🌿'];
  const [cardsFlipped, setCardsFlipped] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  // Word Search state
  const WORDS_TO_FIND = ['HOPE', 'HEAL', 'LOVE', 'PEACE'];
  const [foundWords, setFoundWords] = useState<string[]>(['HOPE']);

  // BOOKS STATE
  const [books] = useState<BookItem[]>(BOOKS_LIBRARY);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // RETREATS STATE
  const [retreats] = useState<RetreatPackage[]>(RETREAT_PACKAGES);
  const [bookingRetreat, setBookingRetreat] = useState<RetreatPackage | null>(null);
  const [retreatBookingDone, setRetreatBookingDone] = useState(false);

  // Music handlers
  const handleTogglePlay = () => setIsPlayingMusic(!isPlayingMusic);
  const handleNextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  const handlePrevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

  // Zen Garden click
  const handleTileClick = (tileId: number) => {
    const flowerTypes = ['🌸', '🌺', '🌼', '🪷', '🌷', '🌹'];
    setGardenTiles((prev) =>
      prev.map((t) => {
        if (t.id === tileId) {
          if (!t.flower) {
            setFlowersBloomedCount((c) => c + 1);
            const randomFlower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            return { ...t, flower: randomFlower };
          }
        }
        return t;
      })
    );
  };

  const handleCardClick = (index: number) => {
    if (cardsFlipped.length === 2 || cardsFlipped.includes(index) || matchedPairs.includes(index)) return;
    const newFlipped = [...cardsFlipped, index];
    setCardsFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (MEMORY_CARDS[first] === MEMORY_CARDS[second]) {
        setMatchedPairs((prev) => [...prev, first, second]);
        setCardsFlipped([]);
      } else {
        setTimeout(() => setCardsFlipped([]), 900);
      }
    }
  };

  const handleWordClick = (word: string) => {
    if (!foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
    }
  };

  return (
    <div className="healing-corner-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Sanctuary of Rest & Beauty</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Music, Gentle Games, Books & Retreats
        </h2>
        <p className="exquisite-subtext">
          Restorative entertainment for patients at home or in clinic. Soothing melodies from Spotify & YouTube,
          accessible healing mini-games, stories from Wattpad, and Belle Amoura sanctuary vacations.
        </p>
      </div>

      {/* Tabs */}
      <div className="telehealth-tabs-bar mb-6">
        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'music' ? 'active' : ''}`}
          onClick={() => setActiveTab('music')}
        >
          <Music size={15} />
          <span>Healing Audio Player</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <Gamepad2 size={15} />
          <span>Restorative Mini-Games</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          <BookOpen size={15} />
          <span>Wattpad Book Sanctuary</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'retreats' ? 'active' : ''}`}
          onClick={() => setActiveTab('retreats')}
        >
          <Palmtree size={15} />
          <span>Belle Amoura Retreats</span>
        </button>
      </div>

      {/* 1. MUSIC & SOUNDTRACK PLAYER */}
      {activeTab === 'music' && (
        <div className="music-player-layout">
          {/* Main Now Playing Deckle Card */}
          <div className="music-now-playing deckle-edge">
            <div className="music-cover-wrapper">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="music-cover-img"
                referrerPolicy="no-referrer"
              />
              <div className="music-cover-badge">
                <span className="text-[10px] text-white/90 uppercase tracking-widest">
                  Live Stream from {currentTrack.source}
                </span>
              </div>
            </div>

            <div className="music-track-meta mt-4 text-center">
              <span className="script-kicker text-rose-800">{currentTrack.genre}</span>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">{currentTrack.artist}</p>
            </div>

            {/* Simulated Animated Audio Waveform */}
            <div className="music-waveform-display my-4">
              <div className={`audio-waves-expanded ${isPlayingMusic ? 'animate-waves' : 'paused'}`}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      height: isPlayingMusic ? `${Math.sin(i * 0.4) * 50 + 50}%` : '20%',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="music-controls-cluster">
              <button
                type="button"
                className="music-ctrl-btn"
                onClick={handlePrevTrack}
                aria-label="Previous track"
              >
                <SkipBack size={18} />
              </button>

              <button
                type="button"
                className="music-play-btn button-wine"
                onClick={handleTogglePlay}
                aria-label={isPlayingMusic ? 'Pause music' : 'Play music'}
              >
                {isPlayingMusic ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>

              <button
                type="button"
                className="music-ctrl-btn"
                onClick={handleNextTrack}
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <div className="music-footer-sources mt-4 pt-3 border-t border-stone-200 text-center text-xs text-stone-500">
              Curated frequency-calibrated playlists · Pulled live from YouTube Music, Soundtrack, Audio Max & Spotify
            </div>
          </div>

          {/* Playlist Column */}
          <div className="music-playlist-col deckle-edge">
            <h4 className="font-serif text-lg font-medium text-stone-900 p-4 border-b border-stone-200">
              Calm & Healing Playlist
            </h4>

            <div className="playlist-tracks-stack">
              {tracks.map((t, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`playlist-item-row ${isSelected ? 'active-track' : ''}`}
                    onClick={() => {
                      setCurrentTrackIndex(idx);
                      setIsPlayingMusic(true);
                    }}
                  >
                    <span className="font-mono text-xs text-stone-400 w-5">0{idx + 1}</span>
                    <div className="flex-1 text-left">
                      <strong className="block text-xs font-serif text-stone-900 line-clamp-1">
                        {t.title}
                      </strong>
                      <span className="text-[10px] text-stone-500">{t.artist} · {t.source}</span>
                    </div>
                    <span className="font-mono text-xs text-stone-500">{t.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. ACCESSIBLE HEALING MINI-GAMES */}
      {activeTab === 'games' && (
        <div className="healing-games-container">
          {/* Game Selector */}
          <div className="game-subtabs-row mb-6">
            <button
              type="button"
              className={`game-subtab ${activeGame === 'zen_garden' ? 'active' : ''}`}
              onClick={() => setActiveGame('zen_garden')}
            >
              🌸 Zen Botanical Garden
            </button>
            <button
              type="button"
              className={`game-subtab ${activeGame === 'memory' ? 'active' : ''}`}
              onClick={() => setActiveGame('memory')}
            >
              ✨ Memory of Light (Affirmations)
            </button>
            <button
              type="button"
              className={`game-subtab ${activeGame === 'word_search' ? 'active' : ''}`}
              onClick={() => setActiveGame('word_search')}
            >
              🔍 Words of Hope
            </button>
          </div>

          {/* GAME 1: ZEN BOTANICAL GARDEN */}
          {activeGame === 'zen_garden' && (
            <div className="zen-garden-card deckle-edge p-6 text-center max-w-2xl mx-auto">
              <div className="script-kicker text-rose-800">Mindful Paced Breathing</div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                Tap Any Patch to Bloom a Sacred Flower
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto my-2">
                Breathe in as you tap. Breathe out as the petal opens. Accessible for hospital beds or quiet evenings.
              </p>

              {/* Garden Grid */}
              <div className="zen-soil-grid my-6">
                {gardenTiles.map((tile) => (
                  <button
                    key={tile.id}
                    type="button"
                    className="zen-tile-btn"
                    onClick={() => handleTileClick(tile.id)}
                  >
                    {tile.flower ? (
                      <span className="tile-flower-icon animate-bounce">{tile.flower}</span>
                    ) : (
                      <span className="tile-seed-prompt text-xs text-stone-400">Tap to Plant</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="garden-status-counter text-xs text-wine font-serif font-medium">
                {flowersBloomedCount} flowers blooming in your personal sanctuary today
              </div>
            </div>
          )}

          {/* GAME 2: MEMORY OF LIGHT */}
          {activeGame === 'memory' && (
            <div className="memory-game-card deckle-edge p-6 text-center max-w-2xl mx-auto">
              <div className="script-kicker text-rose-800">Gentle Cognitive Play</div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                Match the Peaceful Symbols
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto my-2">
                Designed to be relaxing and soft on the eyes during post-treatment fatigue.
              </p>

              <div className="memory-cards-grid my-6">
                {MEMORY_CARDS.map((symbol, idx) => {
                  const isFlipped = cardsFlipped.includes(idx) || matchedPairs.includes(idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`memory-card-btn ${isFlipped ? 'flipped' : ''}`}
                      onClick={() => handleCardClick(idx)}
                    >
                      {isFlipped ? symbol : '🌿'}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-stone-600">
                Pairs matched: {matchedPairs.length / 2} of {MEMORY_CARDS.length / 2}
              </div>
            </div>
          )}

          {/* GAME 3: WORD OF HOPE */}
          {activeGame === 'word_search' && (
            <div className="word-search-card deckle-edge p-6 text-center max-w-2xl mx-auto">
              <div className="script-kicker text-rose-800">Restorative Vocabulary</div>
              <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                Collect Words of Strength
              </h3>
              <p className="text-xs text-stone-600 my-2">
                Click each word as an affirmation to seal it in your heart today.
              </p>

              <div className="words-pill-row flex justify-center gap-3 my-4">
                {WORDS_TO_FIND.map((w) => {
                  const isFound = foundWords.includes(w);
                  return (
                    <button
                      key={w}
                      type="button"
                      className={`word-affirmation-pill ${isFound ? 'found' : ''}`}
                      onClick={() => handleWordClick(w)}
                    >
                      {isFound && <Check size={14} className="inline mr-1" />}
                      <span>{w}</span>
                    </button>
                  );
                })}
              </div>

              <div className="affirmation-quote-box p-4 bg-stone-50 rounded-lg border border-stone-200 mt-4 text-xs font-serif italic text-stone-700">
                “When you speak words of hope over your cells, your spirit creates space for healing.”
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. WATTPAD BOOK SANCTUARY */}
      {activeTab === 'books' && (
        <div className="books-sanctuary-container">
          <div className="books-grid">
            {books.map((book) => (
              <article key={book.id} className="book-card deckle-edge">
                <div className="book-cover-frame">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="book-cover-img"
                    referrerPolicy="no-referrer"
                  />
                  <span className="book-genre-pill">{book.genre}</span>
                </div>

                <div className="book-info p-4">
                  <div className="flex items-center gap-1 text-amber-600 text-xs mb-1">
                    <Star size={13} fill="currentColor" />
                    <span>{book.rating}</span>
                    <span className="text-stone-400">· {book.readsCount}</span>
                  </div>

                  <h4 className="book-title font-serif text-lg font-medium text-stone-900 line-clamp-1">
                    {book.title}
                  </h4>
                  <span className="book-author text-xs text-wine font-serif italic block mt-0.5">
                    by {book.author}
                  </span>

                  <p className="book-summary text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {book.summary}
                  </p>

                  <div className="book-actions mt-4 pt-3 border-t border-stone-200/70 flex justify-between items-center">
                    <span className="text-[10px] text-stone-400">{book.source}</span>
                    <button
                      type="button"
                      className="button-wine text-xs px-3 py-1.5"
                      onClick={() => setSelectedBook(book)}
                    >
                      Read Excerpt
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Book Reader Modal */}
          {selectedBook && (
            <div className="modal-backdrop" role="presentation" onClick={() => setSelectedBook(null)}>
              <div
                className="exquisite-modal book-reader-modal deckle-edge"
                role="dialog"
                aria-modal="true"
                aria-label={`Read excerpt of ${selectedBook.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedBook(null)}
                  aria-label="Close reader"
                >
                  <X size={18} />
                </button>

                <div className="modal-script-kicker text-rose-800">Wattpad Curated Literature</div>
                <h3 className="modal-serif-title text-2xl font-medium text-stone-900 mt-1">
                  {selectedBook.title}
                </h3>
                <span className="text-xs text-wine font-serif italic block mb-4">
                  by {selectedBook.author} · {selectedBook.genre}
                </span>

                <blockquote className="reader-excerpt-text font-serif italic text-base text-stone-800 leading-loose p-5 bg-stone-50 rounded-lg border-l-2 border-wine">
                  {selectedBook.excerpt}
                </blockquote>

                <p className="text-xs text-stone-600 leading-relaxed mt-4">
                  Full stories and chapters available through Wattpad and Avelune Literature integrations.
                  Save this story to your personal reading list in your Workspace.
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="button-wine text-xs px-5 py-2"
                    onClick={() => setSelectedBook(null)}
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. BELLE AMOURA WELLNESS RETREATS */}
      {activeTab === 'retreats' && (
        <div className="retreats-sanctuary-container">
          {/* Header Banner with generated image */}
          <div className="retreats-hero-card deckle-edge mb-8">
            <img
              src="/src/assets/images/belle_amoura_retreat_1794486895614.jpg"
              alt="The Belle Amoura Retreat"
              className="retreats-hero-img"
            />
            <div className="retreats-hero-overlay p-6 lg:p-8">
              <span className="script-kicker text-rose-200">The Belle Amoura Retreat Sanctuary</span>
              <h3 className="font-serif text-3xl lg:text-4xl font-medium text-white mt-1">
                Restorative Vacations for Cancer Patients & Loved Ones
              </h3>
              <p className="text-xs text-rose-100 max-w-xl mt-2 leading-relaxed">
                Reclaim calm by the turquoise waters of Diani, the alpine forests of Mount Kenya, or the quiet waters of Lake Naivasha.
                On-site oncology nurse support, restorative nutrition, and lymphatic wellness.
              </p>
            </div>
          </div>

          <div className="retreat-packages-grid">
            {retreats.map((ret) => (
              <article key={ret.id} className="retreat-package-card deckle-edge">
                <img
                  src={ret.image}
                  alt={ret.name}
                  className="retreat-card-img"
                  referrerPolicy="no-referrer"
                />

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-serif italic text-wine">{ret.location}</span>
                    <span className="font-serif font-bold text-stone-900 text-sm">{ret.pricePerStay}</span>
                  </div>

                  <h4 className="font-serif text-xl font-medium text-stone-900 mt-1">
                    {ret.name}
                  </h4>
                  <span className="text-xs text-stone-500 block mb-2">{ret.duration}</span>

                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    {ret.description}
                  </p>

                  <div className="retreat-highlights-list space-y-1 my-3">
                    {ret.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-xs text-stone-700">
                        <Sparkles size={12} className="text-wine shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="retreat-card-footer mt-4 pt-3 border-t border-stone-200 flex justify-between items-center">
                    <span className="text-[10px] text-stone-500">
                      Care Specialist: {ret.wellnessSpecialists}
                    </span>

                    <button
                      type="button"
                      className="button-wine text-xs px-3.5 py-1.5"
                      onClick={() => setBookingRetreat(ret)}
                    >
                      Book Retreat
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Retreat Booking Modal */}
          {bookingRetreat && (
            <div className="modal-backdrop" role="presentation" onClick={() => setBookingRetreat(null)}>
              <div
                className="exquisite-modal retreat-booking-modal deckle-edge"
                role="dialog"
                aria-modal="true"
                aria-label={`Inquire about ${bookingRetreat.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close-btn"
                  onClick={() => setBookingRetreat(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {!retreatBookingDone ? (
                  <div>
                    <div className="modal-script-kicker">The Belle Amoura Retreat Inquiries</div>
                    <h3 className="modal-serif-title text-2xl font-medium text-stone-900 mt-1">
                      Reserve Your Stay at {bookingRetreat.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 mb-4">
                      {bookingRetreat.location} · {bookingRetreat.duration} · {bookingRetreat.pricePerStay}
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setRetreatBookingDone(true);
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="form-label-xs block mb-1">Traveler / Patient Name</label>
                        <input
                          type="text"
                          required
                          defaultValue="Amina Wangari"
                          className="exquisite-input"
                        />
                      </div>

                      <div className="form-grid-2col gap-3">
                        <div>
                          <label className="form-label-xs block mb-1">Preferred Arrival Date</label>
                          <input type="date" defaultValue="2026-05-10" className="exquisite-input" />
                        </div>
                        <div>
                          <label className="form-label-xs block mb-1">Guests</label>
                          <select className="exquisite-select">
                            <option>1 Patient + 1 Companion</option>
                            <option>Patient Solo Sanctuary</option>
                            <option>Family Package (Up to 4)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="form-label-xs block mb-1">Special Medical or Dietary Needs</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Wheelchair accessible room, oncology low-acid meal plan, proximity to clinic…"
                          className="exquisite-textarea"
                        />
                      </div>

                      <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600">
                        Belle Amoura Concierge coordinates travel approvals with treating oncologist.
                      </div>

                      <button type="submit" className="button-wine w-full justify-center py-3 text-sm">
                        Confirm Retreat Booking Request
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Check size={36} className="text-wine mx-auto mb-2" />
                    <h3 className="font-serif text-2xl font-medium text-stone-900">
                      Retreat Booking Request Received!
                    </h3>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto my-3">
                      Our Belle Amoura Sanctuary host has received your reservation for {bookingRetreat.name}.
                      A bespoke wellness itinerary will be sent to your email.
                    </p>
                    <button
                      type="button"
                      className="button-wine text-xs px-5 py-2"
                      onClick={() => {
                        setBookingRetreat(null);
                        setRetreatBookingDone(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
