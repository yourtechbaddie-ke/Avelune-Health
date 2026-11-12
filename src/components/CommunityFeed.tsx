import { useState } from 'react';
import { Post, UserProfile } from '../types';
import { INITIAL_POSTS } from '../data/mockData';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Radio,
  Image,
  Video,
  Mic,
  Send,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  Flower2
} from 'lucide-react';

interface CommunityFeedProps {
  currentUser: UserProfile;
  onOpenPatientProfile?: () => void;
}

export default function CommunityFeed({ currentUser, onOpenPatientProfile }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [newPostType, setNewPostType] = useState<'text' | 'photo' | 'reel' | 'audio_note' | 'poetry'>('text');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'reels' | 'poetry' | 'audio'>('all');
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveViewerCount, setLiveViewerCount] = useState(142);
  const [liveCommentInput, setLiveCommentInput] = useState('');
  const [liveComments, setLiveComments] = useState<Array<{ user: string; text: string }>>([
    { user: 'Dr. Muthoni Mwangi, MD', text: 'Watching with warm encouragement from the clinic lounge! 🌸' },
    { user: 'Elena Rostova', text: 'Sending so much strength and love to everyone watching!' },
    { user: 'Marcus Vance', text: 'Keep that radiant smile up! 5 years cancer-free standing with you!' },
  ]);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorRoleTitle: currentUser.roleTitle,
      authorAvatar: currentUser.avatar,
      authorVerified: currentUser.isVerified,
      content: newPostText.trim(),
      type: newPostType,
      mediaUrl: newMediaUrl || (newPostType === 'photo' ? 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80' : undefined),
      audioDuration: newPostType === 'audio_note' ? '1:45' : undefined,
      timestamp: 'Just now',
      likes: 1,
      shares: 0,
      saves: 0,
      isLiked: true,
      comments: [],
      tags: ['AveluneCommunity', 'TheLoveOfLife'],
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewMediaUrl('');
    setNewPostType('text');
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextSaved = !p.isSaved;
          return {
            ...p,
            isSaved: nextSaved,
            saves: nextSaved ? p.saves + 1 : p.saves - 1,
          };
        }
        return p;
      })
    );
  };

  const handleSharePost = (post: Post) => {
    const text = `Read this inspiring story on Avelune Health · The Love of Life: "${post.content.slice(0, 100)}..."`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareToast('Post link copied to clipboard! Share on WhatsApp, Instagram or X.');
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c_${Date.now()}`,
                authorName: currentUser.name,
                authorAvatar: currentUser.avatar,
                authorRoleTitle: currentUser.roleTitle,
                authorVerified: currentUser.isVerified,
                text: commentInput.trim(),
                timestamp: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );
    setCommentInput('');
    setCommentingPostId(null);
  };

  const handleSendLiveComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveCommentInput.trim()) return;
    setLiveComments((prev) => [
      ...prev,
      { user: currentUser.name, text: liveCommentInput.trim() },
    ]);
    setLiveCommentInput('');
  };

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'reels') return p.type === 'reel';
    if (activeTab === 'poetry') return p.type === 'poetry';
    if (activeTab === 'audio') return p.type === 'audio_note';
    return true;
  });

  return (
    <div className="community-feed-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Heartbeats in Harmony</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Community Social Sanctuary
        </h2>
        <p className="exquisite-subtext">
          Share reflections, photos, reels, and voice notes. Join live streams, leave compassionate comments,
          and celebrate every milestone together.
        </p>
      </div>

      {shareToast && (
        <div className="share-toast-notification">
          <Check size={16} />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Feed Layout */}
      <div className="feed-grid-layout">
        {/* Main Feed Column */}
        <div className="feed-main-col">
          {/* Post Creation Box */}
          <div className="create-post-card deckle-edge">
            <div className="create-post-top">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="create-post-avatar"
                referrerPolicy="no-referrer"
              />
              <div className="create-post-prompt-wrap">
                <span className="create-post-user-name font-serif font-medium text-stone-900">
                  {currentUser.name}
                </span>
                <span className="text-xs text-stone-500 block">
                  {currentUser.roleTitle}
                </span>
              </div>

              {/* Go Live Button */}
              <button
                type="button"
                className="go-live-banner-btn"
                onClick={() => setIsLiveActive(true)}
              >
                <Radio size={14} className="animate-pulse" />
                <span>Go Live</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="mt-3">
              <textarea
                className="create-post-textarea"
                rows={3}
                placeholder="Share your thoughts, a chemo milestone, a poem, or word of comfort…"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />

              <div className="create-post-actions-bar">
                <div className="post-type-buttons">
                  <button
                    type="button"
                    className={`post-type-pill ${newPostType === 'text' ? 'active' : ''}`}
                    onClick={() => setNewPostType('text')}
                  >
                    Text
                  </button>
                  <button
                    type="button"
                    className={`post-type-pill ${newPostType === 'photo' ? 'active' : ''}`}
                    onClick={() => setNewPostType('photo')}
                  >
                    <Image size={13} /> Photo
                  </button>
                  <button
                    type="button"
                    className={`post-type-pill ${newPostType === 'reel' ? 'active' : ''}`}
                    onClick={() => setNewPostType('reel')}
                  >
                    <Video size={13} /> Reel
                  </button>
                  <button
                    type="button"
                    className={`post-type-pill ${newPostType === 'audio_note' ? 'active' : ''}`}
                    onClick={() => setNewPostType('audio_note')}
                  >
                    <Mic size={13} /> Voice Note
                  </button>
                  <button
                    type="button"
                    className={`post-type-pill ${newPostType === 'poetry' ? 'active' : ''}`}
                    onClick={() => setNewPostType('poetry')}
                  >
                    Poetry
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="button-wine text-xs px-4 py-2"
                >
                  <Send size={13} /> Post to Community
                </button>
              </div>
            </form>
          </div>

          {/* Feed Filter Tabs */}
          <div className="feed-filter-tabs">
            <button
              type="button"
              className={`filter-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Posts
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${activeTab === 'poetry' ? 'active' : ''}`}
              onClick={() => setActiveTab('poetry')}
            >
              Healing Poetry
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${activeTab === 'reels' ? 'active' : ''}`}
              onClick={() => setActiveTab('reels')}
            >
              Survivor Reels
            </button>
            <button
              type="button"
              className={`filter-tab-btn ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => setActiveTab('audio')}
            >
              Voice Notes
            </button>
          </div>

          {/* Posts Stream */}
          <div className="posts-stream">
            {filteredPosts.map((post) => (
              <article key={post.id} className="post-card deckle-edge">
                {/* Author Bar */}
                <div className="post-header-bar">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="post-author-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div className="post-author-meta">
                    <div className="flex items-center gap-2">
                      <h4 className="post-author-name font-serif text-base font-medium text-stone-900">
                        {post.authorName}
                      </h4>
                      {post.authorVerified && (
                        <span title="Verified Member"><ShieldCheck size={14} className="text-emerald-700" /></span>
                      )}
                    </div>
                    <span className="post-role-badge text-xs text-wine">
                      {post.authorRoleTitle} · {post.timestamp}
                    </span>
                  </div>

                  {post.authorRole === 'cancer_patient' && onOpenPatientProfile && (
                    <button
                      type="button"
                      className="post-donate-shortcut-btn"
                      onClick={onOpenPatientProfile}
                    >
                      <Heart size={12} fill="currentColor" /> Donate
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="post-body-content">
                  {post.type === 'poetry' ? (
                    <div className="post-poetry-block">
                      <p className="font-serif italic text-base leading-relaxed text-stone-800 whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>
                  ) : (
                    <p className="post-prose-text text-sm leading-relaxed text-stone-800 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  )}

                  {/* Media display */}
                  {post.mediaUrl && (
                    <div className="post-media-container mt-3">
                      <img
                        src={post.mediaUrl}
                        alt="Post media"
                        className="post-media-img"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Audio voice note display */}
                  {post.type === 'audio_note' && (
                    <div className="post-audio-visualizer-box mt-3">
                      <div className="flex items-center gap-3">
                        <button type="button" className="audio-play-round-btn">
                          <Mic size={14} />
                        </button>
                        <div className="flex-1">
                          <span className="text-xs font-serif font-medium text-stone-800 block">
                            Voice Note ({post.audioDuration || '1:30'})
                          </span>
                          <div className="simulated-waveform">
                            <span style={{ height: '40%' }} />
                            <span style={{ height: '70%' }} />
                            <span style={{ height: '100%' }} />
                            <span style={{ height: '60%' }} />
                            <span style={{ height: '80%' }} />
                            <span style={{ height: '50%' }} />
                            <span style={{ height: '90%' }} />
                            <span style={{ height: '40%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags-row mt-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="post-tag-item">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interaction Footer */}
                <div className="post-footer-actions">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className={`post-action-btn ${post.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLikePost(post.id)}
                    >
                      <Heart size={16} fill={post.isLiked ? '#A35D6E' : 'none'} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      type="button"
                      className="post-action-btn"
                      onClick={() =>
                        setCommentingPostId(commentingPostId === post.id ? null : post.id)
                      }
                    >
                      <MessageCircle size={16} />
                      <span>{post.comments.length}</span>
                    </button>

                    <button
                      type="button"
                      className="post-action-btn"
                      onClick={() => handleSharePost(post)}
                    >
                      <Share2 size={16} />
                      <span>{post.shares}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`post-action-btn ${post.isSaved ? 'saved' : ''}`}
                    onClick={() => handleSavePost(post.id)}
                    title={post.isSaved ? 'Saved to bookmarks' : 'Save post'}
                  >
                    <Bookmark size={16} fill={post.isSaved ? '#C5A059' : 'none'} />
                  </button>
                </div>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="post-comments-thread">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="comment-row">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="comment-avatar"
                          referrerPolicy="no-referrer"
                        />
                        <div className="comment-bubble">
                          <div className="flex items-center gap-2">
                            <span className="comment-author-name font-serif text-xs font-semibold text-stone-900">
                              {comment.authorName}
                            </span>
                            {comment.authorVerified && (
                              <ShieldCheck size={11} className="text-emerald-700" />
                            )}
                            <span className="text-[10px] text-stone-500">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="comment-text text-xs text-stone-700 mt-1">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline Comment Input Box */}
                {commentingPostId === post.id && (
                  <div className="inline-comment-input-box mt-3">
                    <input
                      type="text"
                      className="exquisite-input text-xs"
                      placeholder="Write an encouraging reply…"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                    />
                    <button
                      type="button"
                      className="button-wine text-xs px-3 py-1.5"
                      onClick={() => handleAddComment(post.id)}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar Info Column */}
        <aside className="feed-sidebar-col">
          {/* Live Collaboration Banner */}
          <div className="sidebar-sanctuary-card deckle-edge mb-4">
            <div className="flex items-center gap-2 text-wine mb-2">
              <Sparkles size={16} />
              <span className="font-serif font-medium text-sm">Avelune Live Circles</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Connect with doctors, patients, caregivers, and poets in real-time video audio rooms.
              Always safe, moderated, and encrypted.
            </p>
            <button
              type="button"
              className="button-wine w-full justify-center text-xs mt-3"
              onClick={() => setIsLiveActive(true)}
            >
              <Radio size={13} className="animate-pulse" /> Launch Live Stream Room
            </button>
          </div>

          {/* Daily Thought from The Love of Life */}
          <div className="sidebar-thought-card deckle-edge">
            <span className="script-kicker text-rose-800">Affirmation of the Day</span>
            <blockquote className="font-serif italic text-sm text-stone-800 my-2 leading-relaxed">
              “You are not carrying this storm alone. Thousands of gentle hands are holding yours
              across this sanctuary today.”
            </blockquote>
            <span className="text-xs text-stone-500">— Avelune Care Companion</span>
          </div>
        </aside>
      </div>

      {/* Live Stream Simulation Modal */}
      {isLiveActive && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="exquisite-modal live-stream-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Avelune Live Stream"
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsLiveActive(false)}
              aria-label="Exit live stream"
            >
              <X size={18} />
            </button>

            <div className="live-stream-header">
              <div className="live-tag">
                <Radio size={12} className="animate-pulse" /> LIVE NOW
              </div>
              <span className="live-viewer-count text-xs text-rose-200">
                {liveViewerCount} souls in attendance
              </span>
            </div>

            {/* Live Stream Stage */}
            <div className="live-stream-stage">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="live-broadcaster-avatar"
                referrerPolicy="no-referrer"
              />
              <div className="live-broadcaster-info">
                <h3 className="font-serif text-white text-xl font-medium">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-rose-200">
                  {currentUser.roleTitle} · Broadcasting Live Healing Circle
                </p>
              </div>
            </div>

            {/* Live Comments Stream */}
            <div className="live-comments-stream">
              {liveComments.map((c, i) => (
                <div key={i} className="live-comment-bubble">
                  <span className="font-semibold text-rose-300 mr-2">{c.user}:</span>
                  <span className="text-white">{c.text}</span>
                </div>
              ))}
            </div>

            {/* Live Comment Input */}
            <form onSubmit={handleSendLiveComment} className="live-comment-form">
              <input
                type="text"
                className="live-comment-input"
                placeholder="Send love and encouragement to the live stream…"
                value={liveCommentInput}
                onChange={(e) => setLiveCommentInput(e.target.value)}
              />
              <button type="submit" className="button-wine text-xs px-4">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
