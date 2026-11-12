import {
  UserProfile,
  Post,
  CommunityGroup,
  HospitalFacility,
  SurvivorVideo,
  Testimonial,
  MedicalQA,
  AudioTrack,
  BookItem,
  RetreatPackage,
  MedicalEvent,
  MedicationItem,
  InstagramPoem
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_patient_1',
    name: 'Amina Wangari',
    role: 'cancer_patient',
    roleTitle: 'Triple-Negative Breast Cancer Warrior',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fighting stage III TNBC with grace, sisterhood, and faith. Mother of two beautiful girls. Embracing every sunrise as a miracle.',
    location: 'Nairobi, Kenya',
    isVerified: true,
    cancerType: 'Breast Cancer (Stage III)',
    diagnosisYear: '2024',
    donationGoal: 15000,
    donationRaised: 8940,
    paypalEmail: 'amina.carefund@example.com',
    email: 'amina.w@hidden.avelune',
    phone: '+254 712 *** 89',
    joinedDate: 'Jan 2025',
    followersCount: 1420,
    followingCount: 310
  },
  {
    id: 'user_oncologist_1',
    name: 'Dr. Muthoni Mwangi, MD',
    role: 'oncologist',
    roleTitle: 'Senior Clinical Oncologist & Researcher',
    avatar: 'https://images.unsplash.com/photo-1594824813689-5f2c25381a17?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fellow of the Royal College of Radiologists (UK). Passionate about equitable cancer diagnostics, immunotherapy access and supportive palliative care.',
    location: 'Nairobi Hospital & Aga Khan University',
    isVerified: true,
    hospitalAffiliation: 'The Nairobi Hospital Comprehensive Cancer Centre',
    certifications: ['MBChB (UoN)', 'MSc Clinical Oncology (Nottingham)', 'FRCR (Clinical Oncology)'],
    medicalLicense: 'KMPDC-REG-49821-MD',
    email: 'muthoni.mwangi@nairobihosp.org',
    phone: '+254 20 *** 900',
    joinedDate: 'Oct 2024',
    followersCount: 4890,
    followingCount: 180
  },
  {
    id: 'user_survivor_1',
    name: 'Marcus Vance',
    role: 'cancer_survivor',
    roleTitle: 'Lymphoma Survivor (5 Years Cancer-Free)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    bio: 'Non-Hodgkin’s Lymphoma survivor. Ultra-marathoner, mentor to newly diagnosed young adults. Life is sweeter on this side of remission.',
    location: 'London, UK',
    isVerified: true,
    cancerType: 'Non-Hodgkin Lymphoma',
    diagnosisYear: '2020',
    email: 'marcus.vance@hidden.avelune',
    phone: '+44 7911 *** 44',
    joinedDate: 'Nov 2024',
    followersCount: 3200,
    followingCount: 420
  },
  {
    id: 'user_therapist_1',
    name: 'Claire Chen, LMFT',
    role: 'therapist',
    roleTitle: 'Psycho-Oncology Specialist & Trauma Therapist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    bio: 'Dedicated to helping patients, survivors, and caregivers navigate the psychological shockwaves of chronic diagnosis and grief.',
    location: 'Toronto & Global Telehealth',
    isVerified: true,
    hospitalAffiliation: 'Princess Margaret Cancer Centre Supportive Care',
    certifications: ['Licensed Marriage & Family Therapist', 'Certified Psycho-Oncologist (APOS)'],
    medicalLicense: 'CRPO-98144-PSY',
    email: 'claire.chen@mindfuloncology.ca',
    phone: '+1 416 *** 291',
    joinedDate: 'Dec 2024',
    followersCount: 2600,
    followingCount: 140
  },
  {
    id: 'user_poet_1',
    name: 'Kaelo Sunbird',
    role: 'poet',
    roleTitle: 'Poet-in-Residence & Wordsmith of Healing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    bio: 'Author of "Petals in the Ash". Writing poems to hold your hands in the chemo chair and remind you that light is persistent.',
    location: 'Cape Town, South Africa',
    isVerified: true,
    email: 'kaelo.verses@avelune.art',
    phone: '+27 82 *** 554',
    joinedDate: 'Feb 2025',
    followersCount: 5120,
    followingCount: 590
  },
  {
    id: 'user_doctor_1',
    name: 'Dr. Tariq Al-Mansoor, MD',
    role: 'medical_doctor',
    roleTitle: 'Palliative Medicine & Pain Specialist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Consultant physician championing dignity, comfort, and holistic pain protocols for advanced disease.',
    location: 'Nairobi & Dubai',
    isVerified: true,
    hospitalAffiliation: 'MP Shah Hospital & King’s College Affiliate',
    certifications: ['MD', 'Diploma in Palliative Care (Cardiff)', 'Board Certified Internal Medicine'],
    medicalLicense: 'KMPDC-REG-33102-MD',
    email: 'tariq.mansoor@mpshahhosp.org',
    phone: '+254 733 *** 11',
    joinedDate: 'Jan 2025',
    followersCount: 3100,
    followingCount: 205
  },
  {
    id: 'user_donor_1',
    name: 'Elena Rostova',
    role: 'donor',
    roleTitle: 'Philanthropist & Patient Relief Angel',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    bio: 'Supporting medication grants, pediatric oncology travel subsidies and patient nutrition across Sub-Saharan Africa.',
    location: 'Geneva, Switzerland',
    isVerified: true,
    email: 'elena.rostova@hopefoundation.org',
    phone: '+41 22 *** 77',
    joinedDate: 'Dec 2024',
    followersCount: 1850,
    followingCount: 930
  },
  {
    id: 'user_caregiver_1',
    name: 'David Ochieng',
    role: 'family_caregiver',
    roleTitle: 'Caregiver Advocate & Patient Son',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    bio: 'Walking with my mother through her colon cancer journey. Sharing caregiver life-hacks, quiet meals, and scheduling sanity.',
    location: 'Kisumu / Nairobi, Kenya',
    isVerified: true,
    email: 'david.ochieng@hidden.avelune',
    phone: '+254 722 *** 09',
    joinedDate: 'Feb 2025',
    followersCount: 980,
    followingCount: 420
  },
  {
    id: 'user_planner_1',
    name: 'Sophia Lindqvist',
    role: 'medical_event_planner',
    roleTitle: 'Global Oncology Conference Coordinator',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    bio: 'Connecting international oncology researchers, pharma innovators and community patient delegates at world-class medical summits.',
    location: 'Stockholm & Global',
    isVerified: true,
    email: 'sophia@oncosummitglobal.com',
    phone: '+46 8 *** 220',
    joinedDate: 'Jan 2025',
    followersCount: 2200,
    followingCount: 650
  },
  {
    id: 'user_investor_1',
    name: 'Julian Sterling',
    role: 'investor',
    roleTitle: 'Healthcare Venture Partner & MedTech Investor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    bio: 'Investing in AI-assisted cancer diagnostics, liquid biopsy breakthroughs, and patient navigation platforms.',
    location: 'San Francisco & London',
    isVerified: true,
    email: 'julian@sterlinghealthventures.com',
    phone: '+1 415 *** 01',
    joinedDate: 'Nov 2024',
    followersCount: 3900,
    followingCount: 380
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    authorId: 'user_patient_1',
    authorName: 'Amina Wangari',
    authorRole: 'cancer_patient',
    authorRoleTitle: 'TNBC Warrior',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    authorVerified: true,
    type: 'photo',
    content: 'Infusion #4 completed today at Nairobi Hospital! 🌸 The cold cap was chilly, but my sister brought warm ginger tea and we read Kaelo’s poetry together. My blood counts are stable. Thank you to everyone donating to my PayPal care fund—your kindness pays for my weekly targeted lab tests. Keep fighting, sisters!',
    mediaUrl: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800&q=80',
    timestamp: '2 hours ago',
    likes: 184,
    shares: 28,
    saves: 34,
    isLiked: false,
    tags: ['ChemoMilestone', 'BreastCancerHope', 'AveluneCommunity', 'Gratitude'],
    comments: [
      {
        id: 'c1',
        authorName: 'Dr. Muthoni Mwangi, MD',
        authorAvatar: 'https://images.unsplash.com/photo-1594824813689-5f2c25381a17?auto=format&fit=crop&w=400&q=80',
        authorRoleTitle: 'Senior Clinical Oncologist',
        authorVerified: true,
        text: 'Proud of your spirit Amina! Make sure to stay hydrated today and rest before tomorrow’s blood draw.',
        timestamp: '1 hour ago'
      },
      {
        id: 'c2',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        authorRoleTitle: 'Philanthropist',
        authorVerified: true,
        text: 'Just contributed another $250 to your PayPal campaign. You will beat this, warrior!',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'user_poet_1',
    authorName: 'Kaelo Sunbird',
    authorRole: 'poet',
    authorRoleTitle: 'Poet-in-Residence',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    authorVerified: true,
    type: 'poetry',
    content: `“THE CELLS THAT SING”\n\nThey mapped the shadows on your screen,\nbut never measured what lies between:\nThe stubborn pulse of morning light,\nThe quiet prayer that claims the night.\n\nYou are not brittle bone or fear;\nYou are the reason dawn is here.\nLet every medicine know its place—\nYou are the altar, they are the grace.`,
    timestamp: '4 hours ago',
    likes: 342,
    shares: 92,
    saves: 110,
    tags: ['HealingPoetry', 'WordsForCancer', 'AveluneSoul'],
    comments: [
      {
        id: 'c3',
        authorName: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        authorRoleTitle: 'Lymphoma Survivor',
        authorVerified: true,
        text: 'This made me weep in gratitude. Saved to read during my survivor support circle this evening.',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'post_3',
    authorId: 'user_oncologist_1',
    authorName: 'Dr. Muthoni Mwangi, MD',
    authorRole: 'oncologist',
    authorRoleTitle: 'Senior Clinical Oncologist',
    authorAvatar: 'https://images.unsplash.com/photo-1594824813689-5f2c25381a17?auto=format&fit=crop&w=400&q=80',
    authorVerified: true,
    type: 'text',
    content: 'Clinical Insight for our Patient Community: Often patients ask me, “Doctor, is it normal to feel profound brain fog weeks after chemo?” Yes—what we term post-treatment cognitive shift is real and valid. It is not in your head. Gentle aerobic walking, structured memory journals (like Avelune’s Workspace), and neuro-protective sleep rituals make a measurable difference. Do not hesitate to bring this up at your next appointment.',
    timestamp: '6 hours ago',
    likes: 215,
    shares: 64,
    saves: 95,
    tags: ['OncologyAdvice', 'ChemoBrain', 'DoctorVerified'],
    comments: []
  },
  {
    id: 'post_4',
    authorId: 'user_survivor_1',
    authorName: 'Marcus Vance',
    authorRole: 'cancer_survivor',
    authorRoleTitle: 'Lymphoma Survivor (5 Years)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    authorVerified: true,
    type: 'reel',
    content: '5 years ago today, my doctor looked at my PET scan and said those sacred words: “No evidence of disease.” Here is my 60-second message to anyone lying in a hospital room right now feeling hopeless. You are stronger than your cellular storm. 🕊️',
    mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    timestamp: '8 hours ago',
    likes: 540,
    shares: 130,
    saves: 88,
    tags: ['RemissionDay', 'SurvivorStory', 'HopeIsAlive'],
    comments: []
  },
  {
    id: 'post_5',
    authorId: 'user_caregiver_1',
    authorName: 'David Ochieng',
    authorRole: 'family_caregiver',
    authorRoleTitle: 'Caregiver Advocate',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    authorVerified: true,
    type: 'audio_note',
    content: '🎙️ Voice note from the hospital garden: How we dealt with mom’s sudden nausea spike last night without panicking, and the simple herbal ginger broth protocol her oncologist approved.',
    audioDuration: '2:45',
    timestamp: '12 hours ago',
    likes: 96,
    shares: 19,
    saves: 42,
    tags: ['CaregiverTips', 'VoiceNote', 'DailyCare'],
    comments: []
  }
];

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: 'grp_1',
    name: 'Oncology Horizons & Medical Updates',
    tagline: 'Clinicians, Oncologists & Researchers discussing cutting-edge protocols',
    description: 'A peer collaboration forum for medical oncologists, radiation therapists, surgical consultants and healthcare practitioners to exchange insights, review clinical trials, and elevate standard of cancer care globally.',
    category: 'clinical',
    bannerImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    memberCount: 1420,
    isJoined: true,
    topics: ['Immunotherapy', 'Early Detection', 'Palliative Protocols', 'Multidisciplinary Tumor Boards'],
    recentActivity: 'Dr. Tariq posted a discussion on neuropathic pain management in paclitaxel.'
  },
  {
    id: 'grp_2',
    name: 'The Healing Quill: Poetry & Soul Words',
    tagline: 'Where poets, survivors and patients weave words into healing light',
    description: 'Cancer touches the spirit as deeply as the flesh. In this sanctuary, poets, artists, and patients gather to write verses, share personal haikus, express quiet fears, and celebrate every breath with poetic resonance.',
    category: 'poetry',
    bannerImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
    memberCount: 3890,
    isJoined: true,
    topics: ['Weekly Verse Prompt', 'Infusion Poems', 'Night Prayers', 'Expressions of Love'],
    recentActivity: 'Kaelo Sunbird shared “The Golden Thread” — 28 new comments.'
  },
  {
    id: 'grp_3',
    name: 'Caregivers Sanctuary: Strength & Respite',
    tagline: 'Holding space for the families, sons, daughters and partners who care',
    description: 'Caregiving is an act of boundless love that requires community backing. Connect with other family members, exchange practical caregiving tips, schedule respite swap-times, and find compassionate psychological validation.',
    category: 'caregiver',
    bannerImage: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=1000&q=80',
    memberCount: 2150,
    isJoined: false,
    topics: ['Managing Appointments', 'Burnout Prevention', 'Nutrition Hacks', 'Emotional Resilience'],
    recentActivity: 'David Ochieng hosted a live voice circle on “Finding 15 minutes of quiet”.'
  },
  {
    id: 'grp_4',
    name: 'Cancer Warriors & Thrivers Circle',
    tagline: 'Real conversations, raw courage, and mutual cheerleading across every stage',
    description: 'Open to all cancer fighters, patients currently in active therapy, and survivors in remission. Swap advice on managing chemo symptoms, hair loss, skin care, PET scan anxiety, and joyful celebrations.',
    category: 'survivor',
    bannerImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    memberCount: 6420,
    isJoined: true,
    topics: ['Scanxiety Support', 'Port Care & Comfort', 'Nutrition Recipes', 'Remission Celebrations'],
    recentActivity: 'Amina Wangari celebrated infusion #4 with the community!'
  },
  {
    id: 'grp_5',
    name: 'Donors & Philanthropy Circle',
    tagline: 'Matching compassionate capital with urgent patient treatment funds',
    description: 'Investors, philanthropists, family foundations and donors funding surgical procedures, chemotherapy rounds, radiation therapies, and emergency medication for patients facing financial toxicity.',
    category: 'philanthropy',
    bannerImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?auto=format&fit=crop&w=1000&q=80',
    memberCount: 890,
    isJoined: false,
    topics: ['Emergency Patient Grants', 'Pediatric Oncology Funds', 'Equipment Sourcing', 'Verified Impact Reports'],
    recentActivity: 'Elena Rostova mobilized $4,200 for 3 regional chemotherapy subsidies.'
  }
];

export const HOSPITALS: HospitalFacility[] = [
  {
    id: 'hosp_1',
    name: 'The Nairobi Hospital Comprehensive Cancer Centre',
    type: 'Comprehensive Cancer Center',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Argwings Kodhek Rd, Nairobi',
    coordinates: { lat: -1.2974, lng: 36.8049 },
    phone: '+254 20 2845000',
    emergencyPhone: '+254 703 082000',
    website: 'https://nairobihospital.org',
    services: ['Medical Oncology', 'Linear Accelerator Radiation', 'PET-CT Imaging', 'Pediatric Oncology', 'Chemo Day Unit', '24/7 ER'],
    accreditation: 'KMPDC Verified / JCI Accredited',
    isOpen24Hours: true,
    distanceKm: 2.4
  },
  {
    id: 'hosp_2',
    name: 'Aga Khan University Hospital Cancer Care Centre',
    type: 'Comprehensive Cancer Center',
    city: 'Nairobi',
    country: 'Kenya',
    address: '3rd Parklands Ave, Limuru Rd, Nairobi',
    coordinates: { lat: -1.2618, lng: 36.8242 },
    phone: '+254 20 3662000',
    emergencyPhone: '+254 20 3740000',
    website: 'https://hospitals.aku.edu/nairobi',
    services: ['Stereotactic Radiosurgery', 'Targeted Immunotherapy', 'Surgical Oncology', 'Molecular Genetics', '24/7 Emergency'],
    accreditation: 'Joint Commission International (JCI)',
    isOpen24Hours: true,
    distanceKm: 4.8
  },
  {
    id: 'hosp_3',
    name: 'Texas Cancer Centre Nairobi',
    type: 'Specialist Oncology Clinic',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Mbagathi Way, Off Langata Rd, Nairobi',
    coordinates: { lat: -1.3092, lng: 36.8091 },
    phone: '+254 713 222888',
    emergencyPhone: '+254 721 278888',
    website: 'https://texascancercentre.co.ke',
    services: ['Chemotherapy Suites', 'Palliative Consultations', 'Nutrition Therapy', 'Dedicated Pharmacy', 'Oncology Lab'],
    accreditation: 'KMPDC National Cancer Register',
    isOpen24Hours: false,
    distanceKm: 3.1
  },
  {
    id: 'hosp_4',
    name: 'Kenyatta National Hospital — Cancer Treatment Centre',
    type: 'National Referral Hospital',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Hospital Rd, Upper Hill, Nairobi',
    coordinates: { lat: -1.3015, lng: 36.8072 },
    phone: '+254 20 2726300',
    emergencyPhone: '+254 722 829500',
    website: 'https://knh.or.ke',
    services: ['National Oncology Referral', 'Cobalt-60 & Linac Radiation', 'Bone Marrow Biopsy', 'Social Work Subsidies'],
    accreditation: 'Ministry of Health Level 6 Tertiary Center',
    isOpen24Hours: true,
    distanceKm: 2.9
  },
  {
    id: 'hosp_5',
    name: 'MP Shah Hospital Cancer Care Unit',
    type: 'Comprehensive Cancer Center',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Shivachi Rd, Parklands, Nairobi',
    coordinates: { lat: -1.2655, lng: 36.8193 },
    phone: '+254 20 4291000',
    emergencyPhone: '+254 733 606752',
    website: 'https://mpshahhosp.org',
    services: ['Chemotherapy', 'Pain Clinic', 'Home Hospice Team', 'Psychosocial Counseling', 'Ambulance Evacuation'],
    accreditation: 'KMPDC Certified Specialist Facility',
    isOpen24Hours: true,
    distanceKm: 4.2
  },
  {
    id: 'hosp_6',
    name: 'The Royal Marsden NHS Foundation Trust',
    type: 'Comprehensive Cancer Center',
    city: 'London',
    country: 'United Kingdom',
    address: 'Fulham Rd, Chelsea, London SW3 6JJ',
    coordinates: { lat: 51.4886, lng: -0.1741 },
    phone: '+44 20 7352 8171',
    emergencyPhone: '+44 20 7808 2770',
    website: 'https://royalmarsden.nhs.uk',
    services: ['World-Leading Clinical Trials', 'CyberKnife', 'Robotic Cancer Surgery', 'International Patient Unit'],
    accreditation: 'NHS Center of Excellence',
    isOpen24Hours: true,
    distanceKm: 6800
  }
];

export const SURVIVOR_VIDEOS: SurvivorVideo[] = [
  {
    id: 'vid_1',
    title: 'Dancing through Stage 4: How Joy Became My Chemotherapy Co-Pilot',
    survivorName: 'Zara Ndegwa',
    cancerType: 'Colorectal Cancer (Stage IV)',
    remissionYears: '3 Years Cancer-Free',
    quote: '“They gave me 8 months. I gave myself infinite mornings. Cancer didn’t get the memo that my spirit wasn’t on the oncology chart.”',
    videoDuration: '3:45',
    platform: 'TikTok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '72819034',
    tags: ['Stage4Miracle', 'JoyInChemo', 'DanceAndHeal']
  },
  {
    id: 'vid_2',
    title: 'The Day I Shaved My Head & Found My Crown',
    survivorName: 'Beatrice Kemunto',
    cancerType: 'Breast Cancer (HER2+)',
    remissionYears: '4 Years Cancer-Free',
    quote: '“Losing my curls felt like losing my armor. Then I looked in the mirror and realized my strength was never in my follicles.”',
    videoDuration: '4:12',
    platform: 'Instagram',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '88921045',
    tags: ['HairLossStrength', 'BreastCancerSurvivor', 'RealBeauty']
  },
  {
    id: 'vid_3',
    title: 'From Wheelchair to Ultra-Marathoner: Surviving Hodgkin Lymphoma',
    survivorName: 'Marcus Vance',
    cancerType: 'Hodgkin Lymphoma',
    remissionYears: '5 Years Cancer-Free',
    quote: '“Every kilometer I run now is a thank-you note to the bone marrow cells that learned how to be healthy again.”',
    videoDuration: '6:18',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '90123481',
    tags: ['LymphomaThriver', 'UltraMarathon', 'RemissionPower']
  },
  {
    id: 'vid_4',
    title: 'Navigating Ovarian Cancer in My 20s: Love, Fertility & Resilience',
    survivorName: 'Maya Lin',
    cancerType: 'Ovarian Cancer (Stage IIB)',
    remissionYears: '2.5 Years Cancer-Free',
    quote: '“It felt like life paused while all my friends kept moving. Avelune taught me that healing is not lost time; it is deep time.”',
    videoDuration: '5:02',
    platform: 'TikTok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '65432190',
    tags: ['YoungAdultCancer', 'OvarianCancer', 'NewBeginnings']
  },
  {
    id: 'vid_5',
    title: 'A Father’s Journey: Beating Leukemia for My 4-Year-Old Daughter',
    survivorName: 'Juma Kiprop',
    cancerType: 'Acute Myeloid Leukemia (AML)',
    remissionYears: '6 Years Cancer-Free',
    quote: '“I held her little drawing of a sun in my sterile isolation unit for 6 weeks after transplant. That sun pulled me back to earth.”',
    videoDuration: '4:50',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '78291034',
    tags: ['AMLSurvivor', 'StemCellTransplant', 'FathersLove']
  },
  {
    id: 'vid_6',
    title: 'Surviving Melanoma: The Scars that Became My Badges of Honor',
    survivorName: 'Sienna Dubois',
    cancerType: 'Malignant Melanoma',
    remissionYears: '7 Years Cancer-Free',
    quote: '“I used to hide the skin graft on my shoulder. Now I wear sleeveless gowns with pride. My scars say: Death knocked and I didn’t answer.”',
    videoDuration: '3:30',
    platform: 'Instagram',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '98471203',
    tags: ['MelanomaSurvivor', 'BodyPositivity', 'ScarsAreTrophies']
  },
  {
    id: 'vid_7',
    title: 'Pediatric Cancer Survivor 10 Years Later: Now a Medical Student!',
    survivorName: 'Kofi Mensah',
    cancerType: 'Wilms Tumor (Childhood)',
    remissionYears: '10 Years Cancer-Free',
    quote: '“The pediatric oncologist who saved me when I was 9 inspired me. Today I wore my own white coat for clinical rounds.”',
    videoDuration: '5:40',
    platform: 'TikTok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '47291038',
    tags: ['ChildhoodCancer', 'NowADoctor', 'FullCircle']
  },
  {
    id: 'vid_8',
    title: 'Finding Voice After Thyroid Cancer & Vocal Cord Surgery',
    survivorName: 'Clara Sorensen',
    cancerType: 'Papillary Thyroid Carcinoma',
    remissionYears: '4 Years Cancer-Free',
    quote: '“They said I might whisper for life. Last month I sang the soprano solo at our community sanctuary concert.”',
    videoDuration: '4:15',
    platform: 'Avelune Live',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '38291047',
    tags: ['ThyroidCancer', 'VocalRecovery', 'SingingAgain']
  },
  {
    id: 'vid_9',
    title: 'How Food, Faith & Clinical Trials Conquered Pancreatic Cancer',
    survivorName: 'Gabriel Santos',
    cancerType: 'Pancreatic Neuroendocrine Tumor',
    remissionYears: '5 Years Cancer-Free',
    quote: '“When the statistics look grim, remember that you are an individual human being, not a percentage on a slide.”',
    videoDuration: '6:05',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '59281039',
    tags: ['PancreaticCancerHope', 'TargetedTherapy', 'BeatingTheOdds']
  },
  {
    id: 'vid_10',
    title: 'The Bell Ringing Heard Round the World: Ringing Out Cancer Together',
    survivorName: 'Grace Achieng',
    cancerType: 'Cervical Cancer (Stage II)',
    remissionYears: '3.5 Years Cancer-Free',
    quote: '“When that brass bell clanged three times, thirty nurses cheered. That sound is etched in the marrow of my soul forever.”',
    videoDuration: '3:10',
    platform: 'Instagram',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    videoEmbedId: '81920394',
    tags: ['RingingTheBell', 'CervicalCancerSurvivor', 'Victory']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    authorName: 'Grace & Samuel Wanjiku',
    authorRole: 'Patient & Husband Caregiver',
    cancerType: 'Stage III Cervical Cancer',
    title: 'Avelune connected us to donor funding when all our savings were depleted',
    story: 'When my radiation rounds in Nairobi were about to be paused because we couldn’t afford the weekly transport and imaging, our Avelune patient profile received $1,200 via PayPal from three international angels. My treatment continued without a single skipped dose. Today, my check-up is completely clear!',
    date: 'February 2025',
    hearts: 148,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verifiedRecovery: true
  },
  {
    id: 't2',
    authorName: 'Otieno Brian',
    authorRole: 'Prostate Cancer Survivor',
    cancerType: 'Prostate Cancer',
    title: 'The poetry group kept my spirit unbroken during 35 radiation fractions',
    story: 'Men rarely talk about cancer. In the Avelune men’s circle and poetry forum, I found brothers who understood the quiet loneliness of waiting rooms. Kaelo’s verses gave me words when fear felt like stone in my throat. I am 2 years cancer free now.',
    date: 'January 2025',
    hearts: 96,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verifiedRecovery: true
  },
  {
    id: 't3',
    authorName: 'Dr. Evelyn Peters',
    authorRole: 'Surgical Oncologist',
    title: 'Avelune’s preparation notes make our clinic consultations 3x more effective',
    story: 'Patients arrive with organized symptom timelines and clear lists of questions generated through Belle and the Workspace. They feel empowered, informed, and we spend our consultation discussing high-value decision making rather than chasing missing paperwork.',
    date: 'March 2025',
    hearts: 182,
    avatar: 'https://images.unsplash.com/photo-1594824813689-5f2c25381a17?auto=format&fit=crop&w=400&q=80',
    verifiedRecovery: true
  }
];

export const MEDICAL_QAS: MedicalQA[] = [
  {
    id: 'qa_1',
    patientQuestion: 'What are safe ways to manage metallic taste in the mouth during taxane/platinum chemotherapy?',
    patientName: 'Anonymous Patient',
    category: 'Chemotherapy',
    date: 'Yesterday',
    doctorAnswer: {
      doctorName: 'Dr. Muthoni Mwangi, MD',
      doctorTitle: 'Senior Clinical Oncologist',
      doctorHospital: 'The Nairobi Hospital',
      answerText: 'Dysgeusia (altered taste) is very common with platinum-based compounds. Helpful strategies include: 1) Using bamboo, wooden or plastic cutlery instead of stainless steel; 2) Rinsing the mouth with a mild baking soda and warm water rinse before meals; 3) Adding citrus (lemon, lime), tart fruits or mint to mask the metallic sensation; 4) Eating protein cold or at room temperature (e.g. chilled chicken, Greek yogurt) which emits fewer aromas.',
      dateAnswered: '14 hours ago',
      isVerifiedClinician: true
    },
    communityRepliesCount: 8
  },
  {
    id: 'qa_2',
    patientQuestion: 'How can caregivers recognize the difference between clinical depression and post-chemo fatigue in loved ones?',
    patientName: 'Caregiver Michael',
    category: 'Emotional Health',
    date: '3 days ago',
    doctorAnswer: {
      doctorName: 'Claire Chen, LMFT',
      doctorTitle: 'Psycho-Oncology Specialist',
      doctorHospital: 'Princess Margaret Affiliate',
      answerText: 'Cancer-related fatigue is predominantly physical exhaustion that sleep doesn’t fix, but the patient often still finds joy in small things (hearing a grandchild laugh, looking at a garden). Clinical depression typically manifests as anhedonia (complete inability to feel pleasure), pervasive feelings of worthlessness, or withdrawal from all meaningful connections. Both can co-occur and are treatable with compassionate psycho-oncology support.',
      dateAnswered: '2 days ago',
      isVerifiedClinician: true
    },
    communityRepliesCount: 12
  },
  {
    id: 'qa_3',
    patientQuestion: 'Are there evidence-based acupuncture or massage protocols safe during active radiation for breast cancer?',
    patientName: 'Sarah M.',
    category: 'Pain Management',
    date: '5 days ago',
    doctorAnswer: {
      doctorName: 'Dr. Tariq Al-Mansoor, MD',
      doctorTitle: 'Palliative Medicine & Pain Specialist',
      doctorHospital: 'MP Shah Hospital',
      answerText: 'Yes, but with strict safety precautions. Acupuncture must avoid the direct radiation field and the limb at risk for lymphedema (if lymph nodes were dissected). Gentle light-touch massage away from irradiated skin helps reduce cortisol and muscle guarding. Always notify both your radiation oncologist and certified oncology massage therapist beforehand.',
      dateAnswered: '4 days ago',
      isVerifiedClinician: true
    },
    communityRepliesCount: 5
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'track_1',
    title: 'Dawn Above the Savannah (Calm Harp & Birds)',
    artist: 'Avelune Ambient Ensemble',
    genre: 'Healing Ambient',
    duration: '4:20',
    coverArt: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    source: 'Soundtrack'
  },
  {
    id: 'track_2',
    title: 'Weightless Respite (432Hz Piano & Cello)',
    artist: 'Serenity Strings',
    genre: 'Calm Instrumentals',
    duration: '5:14',
    coverArt: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80',
    source: 'Spotify Playlist'
  },
  {
    id: 'track_3',
    title: 'Quiet Strength (Acoustic Guitar Meditation)',
    artist: 'Nuru Healing Project',
    genre: 'Soft Pop',
    duration: '3:48',
    coverArt: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
    source: 'Audio Max'
  },
  {
    id: 'track_4',
    title: 'The Sanctuary Sea (Gentle Ocean Waves & Flute)',
    artist: 'Belle Amoura Wellness Sound',
    genre: 'Healing Ambient',
    duration: '6:30',
    coverArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    source: 'YouTube Music'
  },
  {
    id: 'track_5',
    title: 'Incurable Grace (Spoken Poetry with Ambient Pad)',
    artist: 'Kaelo Sunbird & Mdundo Collective',
    genre: 'Poetry & Meditation',
    duration: '4:02',
    coverArt: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80',
    source: 'Soundtrack'
  }
];

export const BOOKS_LIBRARY: BookItem[] = [
  {
    id: 'book_1',
    title: 'Letters from the Infusion Chair',
    author: 'Seraphina Vale',
    genre: 'Romance',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    summary: 'A heartwarming story of two strangers who met every Tuesday in adjoining chemotherapy bays, exchanging handwritten notes on tea napkins that grew into a love that outlasted the diagnosis.',
    readsCount: '142K reads',
    rating: 4.9,
    source: 'Wattpad Curated',
    excerpt: '“He slid the folded napkin across the armrest. On it, drawn in blue ballpoint, was a miniature sunflower and three words: You glow anyway.”'
  },
  {
    id: 'book_2',
    title: 'The Mapmaker of Days',
    author: 'Kaelo Sunbird',
    genre: 'Inspiration',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    summary: 'Poetic reflections and life stories on reclaiming time, loving deeply in uncertainty, and discovering that every day we are given is a continent waiting to be explored.',
    readsCount: '98K reads',
    rating: 4.8,
    source: 'Avelune Literature',
    excerpt: '“Do not count the years you fear you might lose. Count the moments you are brave enough to inhabit fully.”'
  },
  {
    id: 'book_3',
    title: 'Where the River Bends Back',
    author: 'Miriam Al-Hassan',
    genre: 'Emotional',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80',
    summary: 'A tender drama of a mother and daughter who reconcile their estrangement during a summer journey along the Kenyan coast, learning forgiveness before the final treatment scan.',
    readsCount: '210K reads',
    rating: 4.9,
    source: 'Wattpad Curated',
    excerpt: '“Forgiveness is not pretending the wave did not crash over us; it is choosing to build our sandcastle beside the tide once more.”'
  },
  {
    id: 'book_4',
    title: 'The Oncologist’s Daughter',
    author: 'Devon St. Claire',
    genre: 'Drama',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
    summary: 'An inside look into the emotional lives of hospital families, medical ethics, high-stakes clinical research, and the humanity behind sterile hospital walls.',
    readsCount: '76K reads',
    rating: 4.7,
    source: 'Wattpad Curated',
    excerpt: '“In the hospital, light smelled like disinfectant and clean linen. But my father taught me that true medicine is listening to the breath between answers.”'
  }
];

export const RETREAT_PACKAGES: RetreatPackage[] = [
  {
    id: 'ret_1',
    name: 'The Diani Coral Sanctuary Retreat',
    location: 'Diani Beach, Indian Ocean Coast, Kenya',
    duration: '5 Days / 4 Nights',
    pricePerStay: '$1,250 (Patient & Companion)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Ocean Breeze Restorative Suites', 'On-Site Oncology Nurse Support', 'Gentle Lymphatic Coastal Yoga', 'Anti-Inflammatory Organic Seafood Dining'],
    description: 'Designed specifically for patients post-chemo or survivors needing deep restoration. Soft white sand, tidal sound therapy, guided meditation, and dedicated medical assistance on standby 24/7.',
    inclusions: ['Private beachfront cottage', 'Daily massage & reflexology', 'Nutritional consultation', 'Roundtrip airport transfer from Mombasa/Ukunda'],
    wellnessSpecialists: 'Dr. Tariq Al-Mansoor & Nurse Florence Odhiambo'
  },
  {
    id: 'ret_2',
    name: 'Mount Kenya Highland Forest Sanctuary',
    location: 'Nanyuki, High Altitude Foothills, Kenya',
    duration: '4 Days / 3 Nights',
    pricePerStay: '$980 (All Inclusive)',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    highlights: ['Pine Forest Bathing', 'Clean Mountain Air & Herbal Infusions', 'Expressive Poetry & Art Workshops', 'Thermal Hot Spring Soaks'],
    description: 'Crisp highland air and cedar-scented tranquility. Ideal for caregivers and patients seeking a quiet, cellular reboot far from city smog and hospital machinery.',
    inclusions: ['Luxury eco-lodge chalet', 'Cedar sauna & natural springs', 'Poetry writing sessions with Kaelo', 'Doctor-approved walking trails'],
    wellnessSpecialists: 'Claire Chen, LMFT & Wilderness Guide Noah Rotich'
  },
  {
    id: 'ret_3',
    name: 'Lake Naivasha Serenity & Wildlife Oasis',
    location: 'Great Rift Valley, Naivasha, Kenya',
    duration: '3 Days / 2 Nights',
    pricePerStay: '$750 (Couple / Caregiver Package)',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    highlights: ['Gentle Lake Boat Safaris', 'Birdsong Morning Awakening', 'Psycho-Oncology Couple Sessions', 'Organic Farm-to-Table Gastronomy'],
    description: 'A peaceful lakeside haven where pelicans glide and yellow-barked acacia trees create shade. Reconnect with loved ones, process emotional fatigue, and rest deeply.',
    inclusions: ['Lakefront verandah suite', 'All meals curated by oncology dietitian', 'Caregiver respite spa treatment', 'Evening campfire reflections'],
    wellnessSpecialists: 'Dr. Muthoni Mwangi (Consulting) & Yoga Master Linah W.'
  }
];

export const MEDICAL_EVENTS: MedicalEvent[] = [
  {
    id: 'ev_1',
    title: 'Avelune Global Oncology & Equitability Summit 2026',
    type: 'Global Medical Conference',
    date: 'April 24-26, 2026',
    time: '09:00 AM - 05:30 PM EAT',
    location: 'Nairobi Serena International Pavilion & Virtual Stream',
    isVirtual: true,
    virtualPlatform: 'Avelune Live Telecast',
    organizer: 'Avelune Health & African Oncology Alliance',
    attendeesCount: 2400,
    description: 'Bringing together oncologists, molecular biologists, global donors, and patient advocates from 42 countries to discuss democratizing access to NGS genomic sequencing and immunotherapy in emerging markets.'
  },
  {
    id: 'ev_2',
    title: 'East Africa Cancer Caregivers & Patient Congress',
    type: 'Clinical Symposium',
    date: 'May 16, 2026',
    time: '10:00 AM - 03:00 PM EAT',
    location: 'Aga Khan University Auditorium, Parklands',
    isVirtual: true,
    virtualPlatform: 'Zoom & Avelune Interactive',
    organizer: 'National Cancer Institute of Kenya & Avelune Care Team',
    attendeesCount: 850,
    description: 'Practical workshops on palliative pain protocols, caregiver emotional health, nutrition guidelines, and financial navigation for families facing catastrophic medical bills.'
  },
  {
    id: 'ev_3',
    title: 'Nairobi Sunrise Survivor Walk & Sunset Vigil',
    type: 'Survivor Walk & Vigil',
    date: 'June 6, 2026',
    time: '06:30 AM - 11:00 AM EAT',
    location: 'Karura Forest Central Track, Nairobi',
    isVirtual: false,
    organizer: 'Avelune Thrivers Circle & Nairobi Cancer Society',
    attendeesCount: 1200,
    description: 'A 5km celebration walk through Karura Forest for survivors, patients, oncology doctors, nurses, and families. Concludes with a brass bell ringing ceremony, live poetry, and planting memorial indigenous trees.'
  },
  {
    id: 'ev_4',
    title: 'Karura Tea & Words: Monthly Patient Coffee Meetup',
    type: 'Local Patient Meetup',
    date: 'Every Second Saturday (Next: March 14, 2026)',
    time: '10:00 AM - 12:30 PM EAT',
    location: 'River Café, Karura Forest Gate A, Nairobi',
    isVirtual: false,
    organizer: 'Amina Wangari & David Ochieng',
    attendeesCount: 45,
    description: 'An informal, friendly morning meetup for patients currently undergoing chemo or radiation and their caregivers. Warm herbal teas, soft seating, laughter, and sincere empathy.'
  }
];

export const PHARMACY_MEDICATIONS: MedicationItem[] = [
  {
    id: 'med_1',
    name: 'Ondansetron (Zofran) 8mg Orally Disintegrating',
    category: 'Anti-nausea',
    dosage: '8mg dissolvable tablets (Pack of 10)',
    price: 18.50,
    requiresPrescription: true,
    inStock: true,
    hospitalSupplier: 'The Nairobi Hospital Pharmacy',
    description: 'Potent 5-HT3 receptor antagonist used for the prevention and treatment of chemotherapy and radiation-induced nausea and vomiting.'
  },
  {
    id: 'med_2',
    name: 'Aprepitant (Emend) Triple-Pack Protocol',
    category: 'Anti-nausea',
    dosage: '125mg / 80mg / 80mg Capsules',
    price: 85.00,
    requiresPrescription: true,
    inStock: true,
    hospitalSupplier: 'Aga Khan University Hospital Pharmacy',
    description: 'Substance P/NK1 receptor antagonist for highly emetogenic chemotherapy regimens (e.g. Doxorubicin / Cisplatin).'
  },
  {
    id: 'med_3',
    name: 'Filgrastim (G-CSF) Pre-filled Syringes',
    category: 'Immune Support',
    dosage: '300mcg / 0.5mL (3 Syringes)',
    price: 120.00,
    requiresPrescription: true,
    inStock: true,
    hospitalSupplier: 'Kenyatta National Hospital Referral Pharmacy',
    description: 'Granulocyte colony-stimulating factor used to stimulate neutrophil production and prevent febrile neutropenia after chemotherapy.'
  },
  {
    id: 'med_4',
    name: 'High-Calorie Oncology Protein Formula (Fortisip / Ensure)',
    category: 'Nutritional Supplement',
    dosage: 'Pack of 12 Ready-to-drink bottles (Vanilla / Chocolate)',
    price: 36.00,
    requiresPrescription: false,
    inStock: true,
    hospitalSupplier: 'Texas Cancer Centre Pharmacy',
    description: 'Enriched with EPA omega-3, 20g protein and zinc to combat cancer-related cachexia, weight loss and muscle wasting.'
  },
  {
    id: 'med_5',
    name: 'L-Glutamine Micronized Powder (Mucositis & Neuropathy)',
    category: 'Supportive Oncology',
    dosage: '300g pure pharmaceutical grade powder',
    price: 28.00,
    requiresPrescription: false,
    inStock: true,
    hospitalSupplier: 'MP Shah Hospital Pharmacy',
    description: 'Supports gastrointestinal mucosal lining repair during radiation and helps buffer peripheral neuropathy caused by taxane chemotherapy.'
  }
];

export const INSTAGRAM_DAILY_POEMS: InstagramPoem[] = [
  {
    id: 'poem_rupi',
    poetName: 'Rupi Kaur',
    instagramHandle: '@rupikaur_',
    followers: '4.4M',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    poemTitle: 'how you love yourself',
    verse: `how you love yourself is
how you teach others
to love you

you have survived
the deepest winter
and look at you now:
still finding the courage
to bloom in the morning frost.`,
    handwrittenNote: 'tenderly written for the mornings when you need to be held by words',
    floralMotif: 'rose',
    postUrl: 'https://instagram.com/rupikaur_',
    likesCount: '284K',
    date: 'Daily Featured Poem'
  },
  {
    id: 'poem_atticus',
    poetName: 'Atticus Poetry',
    instagramHandle: '@atticuspoetry',
    followers: '1.6M',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    poemTitle: 'the fierce dance',
    verse: `She was a storm,
not the kind you run from,
the kind you dance in.

There is no bone in you
that fear can break
without love coming in
to knit it back into gold.`,
    handwrittenNote: 'remind your courage that storms are what make oceans deep',
    floralMotif: 'eucalyptus',
    postUrl: 'https://instagram.com/atticuspoetry',
    likesCount: '192K',
    date: 'Yesterday’s Reflection'
  },
  {
    id: 'poem_morgan',
    poetName: 'Morgan Harper Nichols',
    instagramHandle: '@morganharpernichols',
    followers: '1.8M',
    profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    poemTitle: 'all along you were blooming',
    verse: `Tell the heart that is beating:
You are allowed to take your time.

Even when the petals fall,
the root remembers the water.
Even when the light feels thin,
the bud remembers how to open.

All along, in the waiting,
you were becoming sacred.`,
    handwrittenNote: 'breathe in deeply. you are doing the quiet work of healing.',
    floralMotif: 'lotus',
    postUrl: 'https://instagram.com/morganharpernichols',
    likesCount: '154K',
    date: 'Community Favorite'
  },
  {
    id: 'poem_donna',
    poetName: 'Donna Ashworth',
    instagramHandle: '@donnaashworthwords',
    followers: '1.2M',
    profilePic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    poemTitle: 'wild hope',
    verse: `You do not have to be fearless
to be brave.

You just have to look the day
in the softest part of its eye
and whisper:
“I am still here.
I am taking one more step.”`,
    handwrittenNote: 'for the chemo room, for the quiet hallway, for the bedtime sigh',
    floralMotif: 'lavender',
    postUrl: 'https://instagram.com/donnaashworthwords',
    likesCount: '210K',
    date: 'Curated Verse'
  },
  {
    id: 'poem_nikita',
    poetName: 'Nikita Gill',
    instagramHandle: '@nikita_gill',
    followers: '700K',
    profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    poemTitle: 'the constellation within',
    verse: `You have survived
every single worst day of your life.
Your cells are woven
from the dust of exploded stars.

Do not let a shadow convince you
that you were not created
to carry this radiant dawn.`,
    handwrittenNote: 'etched with starlight for every fighter and survivor',
    floralMotif: 'jasmine',
    postUrl: 'https://instagram.com/nikita_gill',
    likesCount: '178K',
    date: 'Evening Serenade'
  },
  {
    id: 'poem_tyler',
    poetName: 'Tyler Knott Gregson',
    instagramHandle: '@tylerknott',
    followers: '450K',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    poemTitle: 'chasers of the light',
    verse: `Promise me
you will not spend
your precious moments
praying for the rain to cease.

Stand in the garden.
Let the cold drops touch your brow.
Flowers know what you forget:
Rain is how we rise.`,
    handwrittenNote: 'typed on vintage 1940s Remington with unconditional warmth',
    floralMotif: 'sunflower',
    postUrl: 'https://instagram.com/tylerknott',
    likesCount: '88K',
    date: 'Morning Bell'
  }
];

