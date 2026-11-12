import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'sw' | 'fr' | 'es' | 'ar' | 'de';

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  flag: string;
  greeting: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', greeting: 'Welcome to Avelune' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪', greeting: 'Karibu Avelune' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', greeting: 'Bienvenue sur Avelune' },
  { code: 'es', label: 'Español', flag: '🇪🇸', greeting: 'Bienvenido a Avelune' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', greeting: 'مرحباً بكم في أفيلون' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', greeting: 'Willkommen bei Avelune' },
];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLangInfo: LanguageInfo;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    tagline: 'The Love of Life',
    sanctuary: 'Sanctuary',
    dailyPoems: 'Daily Poems',
    community: 'Community Feed',
    patientFunds: 'Patient Funds',
    publicGroups: 'Public Groups',
    hospitals: 'Hospitals & Transit',
    telehealth: 'Telehealth & Meds',
    healing: 'Healing Corner',
    survivors: 'Survivor Stories',
    conferences: 'Conferences',
    forDoctors: 'For Doctors',
    workspace: 'Workspace',
    meetBelle: 'Meet Belle',
    donate: 'Donate',
    message: 'Message',
    call: 'Call',
    emergencyTransport: 'Need Urgent Hospital Transport?',
    requestAmbulance: 'Request Ambulance (24/7)',
    bookTaxi: 'Book Hospital Taxi (Uber / Local)',
    airtightSecurity: 'Airtight Patient Security & Integrity',
  },
  sw: {
    tagline: 'Upendo wa Maisha',
    sanctuary: 'Mahali Patakatifu',
    dailyPoems: 'Mashairi ya Kila Siku',
    community: 'Ushirika wa Jamii',
    patientFunds: 'Misaada ya Wagonjwa',
    publicGroups: 'Vikundi vya Umma',
    hospitals: 'Hospitali na Usafiri',
    telehealth: 'Ushauri wa Daktari na Dawa',
    healing: 'Kona ya Uponyaji',
    survivors: 'Ushuhuda wa Washindi',
    conferences: 'Mikutano ya Kitabibu',
    forDoctors: 'Kwa Madaktari',
    workspace: 'Daftari Langu',
    meetBelle: 'Ongea na Belle',
    donate: 'Changia',
    message: 'Tuma Ujumbe',
    call: 'Piga Simu',
    emergencyTransport: 'Je, unahitaji gari la wagonjwa kwa dharura?',
    requestAmbulance: 'Omba Ambulansi (Masaa 24/7)',
    bookTaxi: 'Agiza Teksi ya Hospitali (Uber)',
    airtightSecurity: 'Ulinzi Mkali na Usalama wa Mgonjwa',
  },
  fr: {
    tagline: 'L’Amour de la Vie',
    sanctuary: 'Sanctuaire',
    dailyPoems: 'Poèmes Quotidiens',
    community: 'Communauté',
    patientFunds: 'Fonds Patients',
    publicGroups: 'Groupes Publics',
    hospitals: 'Hôpitaux & Transit',
    telehealth: 'Téléconsultation & Pharmacie',
    healing: 'Espace Apaisement',
    survivors: 'Histoires de Guérison',
    conferences: 'Conférences Médicales',
    forDoctors: 'Pour Professionnels',
    workspace: 'Mon Espace',
    meetBelle: 'Parler à Belle',
    donate: 'Faire un don',
    message: 'Message',
    call: 'Appel',
    emergencyTransport: 'Besoin d’un transport hospitalier urgent ?',
    requestAmbulance: 'Demander une ambulance (24/7)',
    bookTaxi: 'Réserver un taxi médical (Uber)',
    airtightSecurity: 'Sécurité et Confidentialité Inviolables',
  },
  es: {
    tagline: 'El Amor a la Vida',
    sanctuary: 'Santuario',
    dailyPoems: 'Poemas Diarios',
    community: 'Comunidad',
    patientFunds: 'Fondos para Pacientes',
    publicGroups: 'Grupos Públicos',
    hospitals: 'Hospitales y Traslado',
    telehealth: 'Telemedicina y Farmacia',
    healing: 'Rincón de Sanación',
    survivors: 'Historias de Superación',
    conferences: 'Congresos Médicos',
    forDoctors: 'Para Médicos',
    workspace: 'Mi Espacio',
    meetBelle: 'Conoce a Belle',
    donate: 'Donar',
    message: 'Mensaje',
    call: 'Llamar',
    emergencyTransport: '¿Necesita traslado médico urgente?',
    requestAmbulance: 'Solicitar ambulancia (24/7)',
    bookTaxi: 'Pedir taxi médico (Uber)',
    airtightSecurity: 'Seguridad y Privacidad Blindada',
  },
  ar: {
    tagline: 'حب الحياة',
    sanctuary: 'الملاذ',
    dailyPoems: 'قصائد يومية',
    community: 'المجتمع',
    patientFunds: 'صناديق المرضى',
    publicGroups: 'المجموعات العامة',
    hospitals: 'المستشفيات والنقل',
    telehealth: 'الرعاية الطبية والصيدلية',
    healing: 'ركن الشفاء والسكينة',
    survivors: 'قصص الناجين والأمل',
    conferences: 'المؤتمرات الطبية',
    forDoctors: 'للأطباء والمختصين',
    workspace: 'مساحتي الخاصة',
    meetBelle: 'تحدث مع بيل',
    donate: 'تبرع',
    message: 'رسالة',
    call: 'اتصال',
    emergencyTransport: 'هل تحتاج إلى نقل طارئ للمستشفى؟',
    requestAmbulance: 'طلب إسعاف (24/7)',
    bookTaxi: 'حجز سيارة طبية (أوبر)',
    airtightSecurity: 'أمان وتشفير لا يُخترق لبيانات المرضى',
  },
  de: {
    tagline: 'Die Liebe zum Leben',
    sanctuary: 'Zufluchtsort',
    dailyPoems: 'Tägliche Gedichte',
    community: 'Gemeinschaft',
    patientFunds: 'Patientenfonds',
    publicGroups: 'Öffentliche Gruppen',
    hospitals: 'Kliniken & Notfallfahrt',
    telehealth: 'Telemedizin & Apotheke',
    healing: 'Ort der Heilung',
    survivors: 'Hoffnungsgeschichten',
    conferences: 'Medizinische Tagungen',
    forDoctors: 'Für Mediziner',
    workspace: 'Mein Arbeitsbereich',
    meetBelle: 'Belle kennenlernen',
    donate: 'Spenden',
    message: 'Nachricht',
    call: 'Anrufen',
    emergencyTransport: 'Dringender Krankenhaustransport erforderlich?',
    requestAmbulance: 'Krankenwagen anfordern (24/7)',
    bookTaxi: 'Medizinisches Taxi buchen (Uber)',
    airtightSecurity: 'Höchste Datensicherheit & Ende-zu-Ende-Verschlüsselung',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  currentLangInfo: LANGUAGES[0],
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('avelune_preferred_language', lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('avelune_preferred_language') as LanguageCode;
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      setLanguageState(saved);
    }
  }, []);

  const currentLangInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLangInfo, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
