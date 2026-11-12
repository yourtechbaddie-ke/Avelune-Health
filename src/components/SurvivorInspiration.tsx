import { useState } from 'react';
import { SurvivorVideo, Testimonial, MedicalQA, UserProfile } from '../types';
import { SURVIVOR_VIDEOS, TESTIMONIALS, MEDICAL_QAS } from '../data/mockData';
import {
  Video,
  Heart,
  HelpCircle,
  Play,
  Share2,
  Send,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  Flower2,
  MessageCircle
} from 'lucide-react';

interface SurvivorInspirationProps {
  currentUser: UserProfile;
}

export default function SurvivorInspiration({ currentUser }: SurvivorInspirationProps) {
  const [activeTab, setActiveTab] = useState<'videos' | 'testimonials' | 'qa'>('videos');

  // VIDEOS STATE (10 survivor videos from all platforms)
  const [videos] = useState<SurvivorVideo[]>(SURVIVOR_VIDEOS);
  const [activePlayingVideo, setActivePlayingVideo] = useState<SurvivorVideo | null>(null);

  // TESTIMONIALS STATE
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [newTestimonialTitle, setNewTestimonialTitle] = useState('');
  const [newTestimonialStory, setNewTestimonialStory] = useState('');
  const [newTestimonialCancer, setNewTestimonialCancer] = useState('');
  const [storySubmittedNotice, setStorySubmittedNotice] = useState(false);

  // Q&A STATE
  const [qas, setQas] = useState<MedicalQA[]>(MEDICAL_QAS);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCat, setNewQuestionCat] = useState<'Chemotherapy' | 'Nutrition & Wellness' | 'Surgical Care' | 'Emotional Health' | 'Pain Management'>('Chemotherapy');
  const [questionNotice, setQuestionNotice] = useState(false);

  const handleHeartTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, hearts: t.hearts + 1 } : t))
    );
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonialStory.trim()) return;

    const newT: Testimonial = {
      id: `test_${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.roleTitle,
      cancerType: newTestimonialCancer.trim() || undefined,
      title: newTestimonialTitle.trim() || 'A Light Along the Way',
      story: newTestimonialStory.trim(),
      date: 'Just now',
      hearts: 1,
      avatar: currentUser.avatar,
      verifiedRecovery: true,
    };

    setTestimonials([newT, ...testimonials]);
    setNewTestimonialTitle('');
    setNewTestimonialStory('');
    setNewTestimonialCancer('');
    setStorySubmittedNotice(true);
    setTimeout(() => setStorySubmittedNotice(false), 4000);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQA: MedicalQA = {
      id: `qa_${Date.now()}`,
      patientQuestion: newQuestionText.trim(),
      patientName: currentUser.name,
      category: newQuestionCat,
      date: 'Just now',
      communityRepliesCount: 0,
      doctorAnswer: {
        doctorName: 'Dr. Muthoni Mwangi, MD',
        doctorTitle: 'Senior Clinical Oncologist',
        doctorHospital: 'The Nairobi Hospital',
        answerText: 'Thank you for asking this critical question. We are reviewing this clinically and our oncology advisory team has added this to our urgent response board.',
        dateAnswered: 'Just now',
        isVerifiedClinician: true,
      },
    };

    setQas([newQA, ...qas]);
    setNewQuestionText('');
    setQuestionNotice(true);
    setTimeout(() => setQuestionNotice(false), 4000);
  };

  return (
    <div className="survivor-inspiration-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Victories Over the Storm</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Survivor Stories, Testimonials & Medical Q&A
        </h2>
        <p className="exquisite-subtext">
          Uplifting videos from cancer thrivers across TikTok, Instagram, and YouTube.
          Read community testimonies of healing and ask qualified healthcare professionals your questions.
        </p>
      </div>

      {/* Tabs */}
      <div className="telehealth-tabs-bar mb-6">
        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <Video size={15} />
          <span>10 Survivor Video Journeys</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
          onClick={() => setActiveTab('testimonials')}
        >
          <Heart size={15} />
          <span>Testimonials & Success Stories</span>
        </button>

        <button
          type="button"
          className={`service-tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
          onClick={() => setActiveTab('qa')}
        >
          <HelpCircle size={15} />
          <span>Ask Healthcare Professionals (Q&A)</span>
        </button>
      </div>

      {/* 1. 10 SURVIVOR VIDEOS */}
      {activeTab === 'videos' && (
        <div className="survivor-videos-container">
          <div className="survivor-videos-grid">
            {videos.map((vid, idx) => (
              <article key={vid.id} className="video-story-card deckle-edge">
                <div className="video-thumb-frame" onClick={() => setActivePlayingVideo(vid)}>
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="video-thumb-img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="video-play-overlay">
                    <div className="play-glass-disc">
                      <Play size={24} fill="white" className="text-white ml-1" />
                    </div>
                  </div>
                  <span className="video-platform-badge font-sans">
                    {vid.platform} · {vid.videoDuration}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-serif italic text-wine">{vid.cancerType}</span>
                    <span className="remission-stat-pill font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {vid.remissionYears}
                    </span>
                  </div>

                  <h4 className="video-title font-serif text-base font-semibold text-stone-900 mt-1 line-clamp-2">
                    {vid.title}
                  </h4>
                  <span className="video-survivor-name text-xs text-stone-600 block mt-0.5">
                    Survivor: {vid.survivorName}
                  </span>

                  <blockquote className="video-quote-snippet font-serif italic text-xs text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-200 mt-3 line-clamp-2">
                    {vid.quote}
                  </blockquote>

                  <div className="video-card-footer mt-4 pt-2 border-t border-stone-200/70 flex justify-between items-center">
                    <div className="video-tags-preview flex gap-1">
                      {vid.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-stone-500">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="button-wine text-xs px-3 py-1"
                      onClick={() => setActivePlayingVideo(vid)}
                    >
                      Watch Story
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Video Player Modal */}
          {activePlayingVideo && (
            <div className="modal-backdrop" role="presentation" onClick={() => setActivePlayingVideo(null)}>
              <div
                className="exquisite-modal video-modal deckle-edge"
                role="dialog"
                aria-modal="true"
                aria-label={activePlayingVideo.title}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close-btn"
                  onClick={() => setActivePlayingVideo(null)}
                  aria-label="Close video"
                >
                  <X size={18} />
                </button>

                {/* Simulated High-Res Video Screen */}
                <div className="video-player-screen">
                  <img
                    src={activePlayingVideo.thumbnailUrl}
                    alt={activePlayingVideo.title}
                    className="video-full-frame"
                    referrerPolicy="no-referrer"
                  />
                  <div className="video-player-hud">
                    <span className="hud-badge font-sans">
                      {activePlayingVideo.platform} Story · {activePlayingVideo.remissionYears}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="script-kicker text-rose-800">Survivor Hope & Resilience</div>
                  <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                    {activePlayingVideo.title}
                  </h3>
                  <p className="text-xs text-wine font-serif italic mb-3">
                    {activePlayingVideo.survivorName} · {activePlayingVideo.cancerType}
                  </p>

                  <blockquote className="font-serif italic text-sm text-stone-800 p-4 bg-rose-50/70 rounded-lg border border-rose-200 leading-relaxed">
                    {activePlayingVideo.quote}
                  </blockquote>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-200">
                    <span className="text-xs text-stone-500">
                      Curated from global cancer survivor communities to inspire courage.
                    </span>

                    <button
                      type="button"
                      className="button-wine text-xs px-4 py-1.5"
                      onClick={() => setActivePlayingVideo(null)}
                    >
                      Close Player
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. TESTIMONIALS & SUCCESS STORIES */}
      {activeTab === 'testimonials' && (
        <div className="testimonials-container">
          {/* Add story submission box */}
          <form onSubmit={handleAddTestimonial} className="share-story-form-card deckle-edge mb-8 p-5">
            <div className="flex items-center gap-2 mb-2 text-wine">
              <Sparkles size={18} />
              <h4 className="font-serif text-lg font-medium text-stone-900">
                Share Your Success Story or Positive Update
              </h4>
            </div>

            <div className="form-grid-2col gap-3 mb-3">
              <div>
                <label className="form-label-xs block mb-1">Headline or Title</label>
                <input
                  type="text"
                  placeholder="e.g. 1 Year in Remission, Ringing the Bell Today!"
                  className="exquisite-input"
                  value={newTestimonialTitle}
                  onChange={(e) => setNewTestimonialTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label-xs block mb-1">Diagnosis or Condition (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Lymphoma, Breast Cancer, Colon Cancer"
                  className="exquisite-input"
                  value={newTestimonialCancer}
                  onChange={(e) => setNewTestimonialCancer(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label-xs block mb-1">Your Story & Reflection</label>
              <textarea
                rows={3}
                required
                placeholder="What helped you get through? What words of light would you offer to someone diagnosed yesterday?"
                className="exquisite-textarea"
                value={newTestimonialStory}
                onChange={(e) => setNewTestimonialStory(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="script-kicker text-xs text-stone-500">
                Stories are shared with love across our patient and caregiver circles.
              </span>

              <button type="submit" className="button-wine text-xs px-4 py-2">
                Publish Testimony
              </button>
            </div>

            {storySubmittedNotice && (
              <div className="success-banner-script mt-3">
                🌸 Your inspiring testimony has been published to the community board!
              </div>
            )}
          </form>

          {/* Testimonials List */}
          <div className="testimonials-grid space-y-4">
            {testimonials.map((test) => (
              <article key={test.id} className="testimonial-card deckle-edge p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatar}
                      alt={test.authorName}
                      className="testimonial-avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif text-base font-semibold text-stone-900">
                        {test.authorName}
                      </h4>
                      <span className="text-xs text-wine font-serif italic">
                        {test.authorRole} {test.cancerType ? `· ${test.cancerType}` : ''}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400">{test.date}</span>
                </div>

                <h5 className="font-serif text-lg font-medium text-stone-900 mt-2 mb-1">
                  “{test.title}”
                </h5>

                <p className="testimonial-body text-xs text-stone-700 leading-relaxed">
                  {test.story}
                </p>

                <div className="testimonial-footer mt-4 pt-3 border-t border-stone-200 flex justify-between items-center">
                  <span className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                    <ShieldCheck size={13} /> Verified Patient Recovery Story
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-wine hover:opacity-80"
                    onClick={() => handleHeartTestimonial(test.id)}
                  >
                    <Heart size={14} fill="#A35D6E" />
                    <span>{test.hearts} Hearts</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 3. MEDICAL Q&A PAGE */}
      {activeTab === 'qa' && (
        <div className="medical-qa-container">
          {/* Ask question card */}
          <form onSubmit={handleAskQuestion} className="ask-question-card deckle-edge mb-8 p-5">
            <div className="flex items-center gap-2 mb-2 text-wine">
              <HelpCircle size={18} />
              <h4 className="font-serif text-lg font-medium text-stone-900">
                Ask Verified Healthcare Professionals
              </h4>
            </div>

            <div className="mb-3">
              <label className="form-label-xs block mb-1">Select Care Topic</label>
              <select
                className="exquisite-select text-xs"
                value={newQuestionCat}
                onChange={(e) => setNewQuestionCat(e.target.value as any)}
              >
                <option value="Chemotherapy">Chemotherapy & Side Effects</option>
                <option value="Nutrition & Wellness">Nutrition & Cachexia Management</option>
                <option value="Pain Management">Pain Clinic & Palliative Protocols</option>
                <option value="Emotional Health">Psycho-Oncology & Emotional Resilience</option>
                <option value="Surgical Care">Surgical Oncology Preparation</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label-xs block mb-1">Your Question for the Doctors</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. How can I manage sudden bone aches during G-CSF injections? What gentle foods soothe radiation mouth sores?"
                className="exquisite-textarea"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="script-kicker text-xs text-stone-500">
                Answered by board-certified oncologists, physicians, and licensed therapists.
              </span>

              <button type="submit" className="button-wine text-xs px-4 py-2">
                Submit Question
              </button>
            </div>

            {questionNotice && (
              <div className="success-banner-script mt-3">
                🌸 Your question has been routed to our verified clinical team for response!
              </div>
            )}
          </form>

          {/* Q&A List */}
          <div className="qa-questions-stack space-y-4">
            {qas.map((qa) => (
              <article key={qa.id} className="qa-item-card deckle-edge p-5">
                <div className="flex justify-between items-start mb-1">
                  <span className="qa-category-pill text-xs font-serif italic text-wine">
                    {qa.category}
                  </span>
                  <span className="text-[10px] text-stone-400">{qa.date}</span>
                </div>

                <h4 className="qa-question-text font-serif text-base font-semibold text-stone-900 mt-1">
                  Q: {qa.patientQuestion}
                </h4>
                <span className="text-[11px] text-stone-500 block mb-3">
                  Asked by: {qa.patientName}
                </span>

                {/* Doctor's Answer */}
                {qa.doctorAnswer && (
                  <div className="doctor-answer-box p-4 rounded-lg bg-stone-50 border border-stone-200 mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={14} className="text-emerald-700" />
                      <strong className="font-serif text-xs text-stone-900 font-semibold">
                        {qa.doctorAnswer.doctorName}
                      </strong>
                      <span className="text-[11px] text-wine font-medium">
                        ({qa.doctorAnswer.doctorTitle} · {qa.doctorAnswer.doctorHospital})
                      </span>
                    </div>

                    <p className="doctor-answer-text text-xs text-stone-700 leading-relaxed">
                      {qa.doctorAnswer.answerText}
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-2 text-right">
                      Verified Clinical Assessment · {qa.doctorAnswer.dateAnswered}
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
