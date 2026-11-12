import { useState } from 'react';
import { InstagramPoem } from '../types';
import { INSTAGRAM_DAILY_POEMS } from '../data/mockData';
import { Heart, Share2, Copy, Volume2, VolumeX, Check, Instagram, Feather, Sparkles, Flower2 } from 'lucide-react';

interface DailyPoetrySectionProps {
  onOpenGroup?: (groupId: string) => void;
}

export default function DailyPoetrySection({ onOpenGroup }: DailyPoetrySectionProps) {
  const [poems, setPoems] = useState<InstagramPoem[]>(INSTAGRAM_DAILY_POEMS);
  const [selectedPoemId, setSelectedPoemId] = useState<string>(poems[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [myPoemInput, setMyPoemInput] = useState('');
  const [myPoemTitle, setMyPoemTitle] = useState('');
  const [submittedPoems, setSubmittedPoems] = useState<Array<{ title: string; verse: string; author: string }>>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const activePoem = poems.find((p) => p.id === selectedPoemId) || poems[0];
  const isLiked = !!likedMap[activePoem.id];

  const handleCopy = (poem: InstagramPoem) => {
    const textToCopy = `“${poem.poemTitle.toUpperCase()}”\n\n${poem.verse}\n\n— ${poem.poetName} (${poem.instagramHandle})\nShared via Avelune Health · The Love of Life`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(poem.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (poem: InstagramPoem) => {
    const shareText = encodeURIComponent(`“${poem.poemTitle}” by ${poem.poetName} on @avelunehealth: ${poem.verse.slice(0, 100)}...`);
    window.open(`https://wa.me/?text=${shareText}`, '_blank');
  };

  const handleSubmitMyPoem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myPoemVerseValid) return;
    setSubmittedPoems([
      { title: myPoemTitle.trim() || 'Untitled Prayer', verse: myPoemInput.trim(), author: 'You (Patient Community Poet)' },
      ...submittedPoems,
    ]);
    setMyPoemInput('');
    setMyPoemTitle('');
    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 4000);
  };

  const myPoemVerseValid = myPoemInput.trim().length > 10;

  return (
    <section className="poetry-sanctuary-section">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={22} className="text-rose-leaf" />
          <span className="script-kicker">Words that Heal the Marrow</span>
          <Flower2 size={22} className="text-rose-leaf" />
        </div>
        <h2 className="exquisite-heading">
          Daily Verses of Hope & Healing
        </h2>
        <p className="exquisite-subtext">
          Curated from the world's most resonant Instagram poets and our patient community.
          Let these words rest softly upon your spirit like dew on morning petals.
        </p>
      </div>

      {/* Poet Selection Bar */}
      <div className="poet-ribbon-container">
        <div className="poet-ribbon">
          {poems.map((poem) => {
            const active = poem.id === activePoem.id;
            return (
              <button
                key={poem.id}
                type="button"
                className={`poet-tab ${active ? 'active' : ''}`}
                onClick={() => {
                  setSelectedPoemId(poem.id);
                  setIsPlayingAudio(false);
                }}
              >
                <img
                  src={poem.profilePic}
                  alt={poem.poetName}
                  className="poet-tab-avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="poet-tab-info">
                  <span className="poet-tab-name">{poem.poetName}</span>
                  <span className="poet-tab-handle">{poem.instagramHandle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Masterpiece Poem Display Card */}
      <div className="master-poem-card-wrapper">
        <article className="master-poem-card deckle-edge">
          {/* Subtle Gilded Floral Border */}
          <div className="card-floral-ornament top-left" aria-hidden="true" />
          <div className="card-floral-ornament bottom-right" aria-hidden="true" />

          {/* Poet Metadata Header */}
          <div className="poem-card-header">
            <div className="poem-poet-meta">
              <a
                href={activePoem.postUrl}
                target="_blank"
                rel="noreferrer"
                className="poem-instagram-link"
                title={`Visit ${activePoem.poetName} on Instagram`}
              >
                <img
                  src={activePoem.profilePic}
                  alt={activePoem.poetName}
                  className="poem-poet-photo"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="poem-poet-title-row">
                    <h3 className="poem-poet-name">{activePoem.poetName}</h3>
                    <Instagram size={14} className="instagram-glyph" />
                  </div>
                  <div className="poem-poet-subline">
                    <span>{activePoem.instagramHandle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activePoem.followers} followers</span>
                    <span aria-hidden="true">·</span>
                    <span className="poem-curation-pill">{activePoem.date}</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Audio Recitation Button */}
            <div className="poem-audio-controls">
              <button
                type="button"
                className={`audio-recite-btn ${isPlayingAudio ? 'playing' : ''}`}
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                title={isPlayingAudio ? 'Pause Voice Recitation' : 'Listen to Gentle Voice Reading'}
              >
                {isPlayingAudio ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isPlayingAudio ? 'Listening…' : 'Hear Spoken Verse'}</span>
              </button>
            </div>
          </div>

          {isPlayingAudio && (
            <div className="audio-voice-wave-banner">
              <div className="audio-waves">
                <span className="wave-bar bar-1" />
                <span className="wave-bar bar-2" />
                <span className="wave-bar bar-3" />
                <span className="wave-bar bar-4" />
                <span className="wave-bar bar-5" />
              </div>
              <p className="audio-voice-caption">
                Soft harp accompaniment playing with tender spoken-word recitation…
              </p>
            </div>
          )}

          {/* Handwritten Title & Verse */}
          <div className="poem-content-canvas">
            <div className="poem-handwritten-title">
              ~ {activePoem.poemTitle} ~
            </div>

            <div className="poem-verse-body">
              {activePoem.verse.split('\n\n').map((stanza, idx) => (
                <p key={idx} className="poem-stanza">
                  {stanza.split('\n').map((line, lIdx) => (
                    <span key={lIdx} className="poem-line">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Handwritten Marginalia Note */}
            <div className="handwritten-marginalia">
              <Feather size={14} className="quill-icon" />
              <span>{activePoem.handwrittenNote}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="poem-card-footer">
            <div className="poem-stat-likes">
              <button
                type="button"
                className={`poem-heart-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(activePoem.id)}
                aria-label="Heart this verse"
              >
                <Heart size={16} fill={isLiked ? '#A35D6E' : 'none'} />
                <span>{isLiked ? 'Loved' : activePoem.likesCount}</span>
              </button>
            </div>

            <div className="poem-action-btns">
              <button
                type="button"
                className="poem-action-icon-btn"
                onClick={() => handleCopy(activePoem)}
                title="Copy verse to clipboard"
              >
                {copiedId === activePoem.id ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                <span>{copiedId === activePoem.id ? 'Copied' : 'Copy Verse'}</span>
              </button>

              <button
                type="button"
                className="poem-action-icon-btn"
                onClick={() => handleShare(activePoem)}
                title="Share to WhatsApp / Messages"
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>

              {onOpenGroup && (
                <button
                  type="button"
                  className="poem-group-cta-btn"
                  onClick={() => onOpenGroup('grp_2')}
                >
                  <Sparkles size={14} />
                  <span>Join The Healing Quill Group</span>
                </button>
              )}
            </div>
          </div>
        </article>
      </div>

      {/* Community Verses & Write Your Own */}
      <div className="community-poetry-grid-wrap">
        <div className="community-poetry-header">
          <div className="script-kicker">The Healing Quill Community</div>
          <h3 className="section-subheading">Verses Written by Patients, Survivors & Doctors</h3>
          <p className="text-sm text-stone-600 max-w-xl mx-auto">
            You don't have to be a published poet to share the words keeping you buoyant today.
            Write a line, a stanza, or a prayer.
          </p>
        </div>

        {/* Form to submit poem */}
        <form className="submit-poem-card" onSubmit={handleSubmitMyPoem}>
          <div className="form-card-title-row">
            <Feather size={18} className="text-wine" />
            <span className="font-serif font-medium text-stone-800">Leave a Verse on the Sanctuary Wall</span>
          </div>

          <input
            type="text"
            className="exquisite-input mb-3"
            placeholder="Poem Title or Prompt (e.g. Infusion Morning, The Night Light)"
            value={myPoemTitle}
            onChange={(e) => setMyPoemTitle(e.target.value)}
          />

          <textarea
            className="exquisite-textarea"
            placeholder="Type your verse here... (e.g. 'I asked the doctor what my cells were doing; she smiled and said they are learning how to live again.')"
            rows={4}
            value={myPoemInput}
            onChange={(e) => setMyPoemInput(e.target.value)}
          />

          <div className="submit-poem-footer">
            <span className="script-hint">“Poetry is medicine that requires no prescription.”</span>
            <button
              type="submit"
              disabled={!myPoemVerseValid}
              className="button-wine"
            >
              Post Verse to Sanctuary
            </button>
          </div>

          {submissionSuccess && (
            <div className="success-banner-script">
              🌸 Your poem has been lovingly added to the community sanctuary wall!
            </div>
          )}
        </form>

        {/* Community submitted poems */}
        {submittedPoems.length > 0 && (
          <div className="submitted-poems-list">
            <h4 className="font-serif text-lg text-wine font-medium mb-3">Recently Shared by You:</h4>
            <div className="submitted-cards-grid">
              {submittedPoems.map((sub, i) => (
                <div key={i} className="submitted-verse-card">
                  <div className="submitted-title font-serif italic text-stone-800 font-semibold">{sub.title}</div>
                  <div className="submitted-verse whitespace-pre-wrap font-serif text-stone-700 text-sm my-2">
                    {sub.verse}
                  </div>
                  <div className="submitted-author script-kicker text-xs text-rose-800">
                    — {sub.author} · Just now
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
