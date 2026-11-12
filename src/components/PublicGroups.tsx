import { useState } from 'react';
import { CommunityGroup, UserProfile } from '../types';
import { COMMUNITY_GROUPS } from '../data/mockData';
import {
  Users,
  MessageCircle,
  PlusCircle,
  Check,
  Send,
  Sparkles,
  Flower2
} from 'lucide-react';

interface PublicGroupsProps {
  currentUser: UserProfile;
  initialGroupId?: string;
}

export default function PublicGroups({ currentUser, initialGroupId }: PublicGroupsProps) {
  const [groups, setGroups] = useState<CommunityGroup[]>(COMMUNITY_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(initialGroupId || groups[0].id);
  const [discussionInput, setDiscussionInput] = useState('');
  const [groupMessages, setGroupMessages] = useState<Record<string, Array<{ author: string; role: string; text: string; time: string }>>>({
    grp_1: [
      { author: 'Dr. Muthoni Mwangi, MD', role: 'Senior Oncologist', text: 'Colleagues: We have seen promising biomarker response using low-dose immunotherapy combinations in triple negative cohorts.', time: '10:30 AM' },
      { author: 'Dr. Tariq Al-Mansoor, MD', role: 'Palliative Medicine', text: 'Important to note the neuro-protective adjuvants should start on cycle 1 rather than after symptom onset.', time: '11:15 AM' }
    ],
    grp_2: [
      { author: 'Kaelo Sunbird', role: 'Poet-in-Residence', text: '“The petal that fell / did not fall in defeat / it made room for the seed.” What lines are holding you up today?', time: '9:00 AM' },
      { author: 'Amina Wangari', role: 'Patient Warrior', text: 'Reading this in the waiting room right now. Tears of relief. Thank you Kaelo.', time: '9:45 AM' }
    ],
    grp_3: [
      { author: 'David Ochieng', role: 'Caregiver Advocate', text: 'Tip of the day: Keep a duplicate pouch of discharge summaries and anti-nausea medication in the car glove compartment.', time: 'Yesterday' }
    ],
    grp_4: [
      { author: 'Marcus Vance', role: '5-Yr Survivor', text: 'Sending thunderous applause to anyone having their chemo port flushed or scanned today. You are a mountain.', time: '2h ago' }
    ],
    grp_5: [
      { author: 'Elena Rostova', role: 'Philanthropist', text: 'Fund allocation update: 14 pediatric chemotherapy vouchers have cleared and reached patients at Kenyatta National today.', time: '4h ago' }
    ]
  });

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];
  const messagesForGroup = groupMessages[selectedGroup.id] || [];

  const handleToggleJoin = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const nextJoined = !g.isJoined;
          return {
            ...g,
            isJoined: nextJoined,
            memberCount: nextJoined ? g.memberCount + 1 : g.memberCount - 1,
          };
        }
        return g;
      })
    );
  };

  const handleSendDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;

    const newMsg = {
      author: currentUser.name,
      role: currentUser.roleTitle,
      text: discussionInput.trim(),
      time: 'Just now',
    };

    setGroupMessages((prev) => ({
      ...prev,
      [selectedGroup.id]: [...(prev[selectedGroup.id] || []), newMsg],
    }));
    setDiscussionInput('');
  };

  return (
    <div className="public-groups-page">
      <div className="section-botanical-header text-center">
        <div className="botanical-flourish">
          <Flower2 size={20} className="text-wine" />
          <span className="script-kicker">Circles of Light & Fellowship</span>
          <Flower2 size={20} className="text-wine" />
        </div>
        <h2 className="exquisite-heading">
          Public Collaboration Groups
        </h2>
        <p className="exquisite-subtext">
          Join multidisciplinary clinical discussions, poetry circles, caregiver sanctuaries, and donor alliances.
        </p>
      </div>

      <div className="groups-container-grid">
        {/* Left: Groups Navigation Column */}
        <div className="groups-list-column">
          <h3 className="groups-sidebar-title font-serif text-lg font-medium text-stone-900 mb-3">
            Public Circles & Forums
          </h3>

          <div className="groups-nav-stack">
            {groups.map((group) => {
              const isActive = group.id === selectedGroup.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  className={`group-nav-card ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedGroupId(group.id)}
                >
                  <div className="group-nav-top">
                    <span className="group-nav-cat-badge">
                      {group.category}
                    </span>
                    <span className="group-nav-members text-[11px] text-stone-500 flex items-center gap-1">
                      <Users size={11} /> {group.memberCount.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="group-nav-name font-serif text-sm font-semibold text-stone-900 mt-1">
                    {group.name}
                  </h4>
                  <p className="group-nav-tagline text-xs text-stone-600 line-clamp-1 mt-0.5">
                    {group.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Group Workspace & Discussion Feed */}
        <div className="group-active-workspace deckle-edge">
          {/* Group Banner & Header */}
          <div className="group-hero-banner">
            <img
              src={selectedGroup.bannerImage}
              alt={selectedGroup.name}
              className="group-banner-image"
              referrerPolicy="no-referrer"
            />
            <div className="group-banner-overlay" />

            <div className="group-hero-content">
              <span className="group-category-pill uppercase tracking-widest text-[10px] text-rose-200">
                {selectedGroup.category} circle
              </span>
              <h3 className="group-title font-serif text-2xl lg:text-3xl font-medium text-white mt-1">
                {selectedGroup.name}
              </h3>
              <p className="group-tagline text-xs text-rose-100 max-w-xl mt-1">
                {selectedGroup.tagline}
              </p>

              <div className="group-actions-strip mt-3">
                <button
                  type="button"
                  className={`group-join-btn ${selectedGroup.isJoined ? 'joined' : ''}`}
                  onClick={() => handleToggleJoin(selectedGroup.id)}
                >
                  {selectedGroup.isJoined ? (
                    <>
                      <Check size={14} /> Joined Member
                    </>
                  ) : (
                    <>
                      <PlusCircle size={14} /> Join This Circle
                    </>
                  )}
                </button>
                <span className="text-xs text-white/80">
                  {selectedGroup.memberCount.toLocaleString()} members in conversation
                </span>
              </div>
            </div>
          </div>

          {/* Group Description & Topics */}
          <div className="group-meta-strip p-4 border-b border-stone-200 bg-stone-50/60">
            <p className="text-xs text-stone-700 leading-relaxed mb-3">
              {selectedGroup.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedGroup.topics.map((topic) => (
                <span key={topic} className="group-topic-tag text-[11px] text-wine bg-white px-2.5 py-1 rounded-full border border-stone-200">
                  #{topic}
                </span>
              ))}
            </div>
          </div>

          {/* Group Live Discussion Thread */}
          <div className="group-discussions-area p-4">
            <div className="flex items-center gap-2 mb-4 text-wine">
              <MessageCircle size={16} />
              <h4 className="font-serif font-medium text-base text-stone-900">
                Live Circle Discussion
              </h4>
            </div>

            <div className="group-messages-stream space-y-3 mb-6">
              {messagesForGroup.map((msg, idx) => (
                <div key={idx} className="group-message-card p-3 rounded-lg bg-white border border-stone-200">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <strong className="font-serif text-xs text-stone-900 font-semibold">{msg.author}</strong>
                      <span className="text-[10px] text-wine font-medium">({msg.role})</span>
                    </div>
                    <span className="text-[10px] text-stone-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Post into Circle */}
            <form onSubmit={handleSendDiscussion} className="group-comment-composer">
              <textarea
                className="exquisite-textarea text-xs"
                rows={2}
                placeholder={`Contribute a thought to ${selectedGroup.name}…`}
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="script-kicker text-xs text-stone-500">
                  Kindness, empathy, and evidence-grounded respect required.
                </span>
                <button
                  type="submit"
                  disabled={!discussionInput.trim()}
                  className="button-wine text-xs px-4 py-2"
                >
                  <Send size={13} /> Post to Circle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
