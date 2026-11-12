export type UserRole =
  | 'medical_doctor'
  | 'oncologist'
  | 'medical_consultant'
  | 'therapist'
  | 'investor'
  | 'donor'
  | 'medical_event_planner'
  | 'cancer_patient'
  | 'cancer_survivor'
  | 'family_caregiver'
  | 'poet';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  isVerified: boolean;
  hospitalAffiliation?: string;
  certifications?: string[];
  medicalLicense?: string;
  // Patient specific
  cancerType?: string;
  diagnosisYear?: string;
  donationGoal?: number;
  donationRaised?: number;
  paypalEmail?: string;
  // Privacy
  email: string;
  phone: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorRoleTitle: string;
  authorAvatar: string;
  authorVerified: boolean;
  content: string;
  timestamp: string;
  type: 'text' | 'photo' | 'reel' | 'audio_note' | 'poetry';
  mediaUrl?: string;
  audioDuration?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  saves: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRoleTitle: string;
  authorVerified: boolean;
  text: string;
  timestamp: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'clinical' | 'poetry' | 'caregiver' | 'survivor' | 'philanthropy';
  bannerImage: string;
  memberCount: number;
  isJoined?: boolean;
  topics: string[];
  recentActivity: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  type: 'Comprehensive Cancer Center' | 'National Referral Hospital' | 'Palliative & Hospice' | 'Specialist Oncology Clinic';
  city: string;
  country: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  emergencyPhone: string;
  website: string;
  services: string[];
  accreditation: string;
  isOpen24Hours: boolean;
  distanceKm?: number;
}

export interface SurvivorVideo {
  id: string;
  title: string;
  survivorName: string;
  cancerType: string;
  remissionYears: string;
  quote: string;
  videoDuration: string;
  platform: 'TikTok' | 'Instagram' | 'YouTube' | 'Avelune Live';
  thumbnailUrl: string;
  videoEmbedId: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  cancerType?: string;
  title: string;
  story: string;
  date: string;
  hearts: number;
  avatar: string;
  verifiedRecovery: boolean;
}

export interface MedicalQA {
  id: string;
  patientQuestion: string;
  patientName: string;
  category: 'Chemotherapy' | 'Nutrition & Wellness' | 'Surgical Care' | 'Emotional Health' | 'Pain Management';
  date: string;
  doctorAnswer?: {
    doctorName: string;
    doctorTitle: string;
    doctorHospital: string;
    answerText: string;
    dateAnswered: string;
    isVerifiedClinician: boolean;
  };
  communityRepliesCount: number;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  genre: 'Calm Instrumentals' | 'Healing Ambient' | 'Soft Pop' | 'Poetry & Meditation';
  duration: string;
  coverArt: string;
  source: 'Spotify Playlist' | 'YouTube Music' | 'Soundtrack' | 'Audio Max';
  audioUrl?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  genre: 'Romance' | 'Inspiration' | 'Emotional' | 'Drama';
  coverUrl: string;
  summary: string;
  readsCount: string;
  rating: number;
  source: 'Wattpad Curated' | 'Avelune Literature';
  excerpt: string;
}

export interface RetreatPackage {
  id: string;
  name: string;
  location: string;
  duration: string;
  pricePerStay: string;
  image: string;
  highlights: string[];
  description: string;
  inclusions: string[];
  wellnessSpecialists: string;
}

export interface MedicalEvent {
  id: string;
  title: string;
  type: 'Global Medical Conference' | 'Clinical Symposium' | 'Local Patient Meetup' | 'Survivor Walk & Vigil';
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualPlatform?: string;
  organizer: string;
  attendeesCount: number;
  description: string;
  isRegistered?: boolean;
}

export interface InstagramPoem {
  id: string;
  poetName: string;
  instagramHandle: string;
  followers: string;
  profilePic: string;
  poemTitle: string;
  verse: string;
  handwrittenNote: string;
  floralMotif: 'rose' | 'eucalyptus' | 'lotus' | 'jasmine' | 'sunflower' | 'lavender';
  postUrl: string;
  likesCount: string;
  date: string;
  audioVoiceNote?: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  category: 'Supportive Oncology' | 'Pain Relief' | 'Anti-nausea' | 'Immune Support' | 'Nutritional Supplement';
  dosage: string;
  price: number;
  requiresPrescription: boolean;
  inStock: boolean;
  hospitalSupplier: string;
  description: string;
}
