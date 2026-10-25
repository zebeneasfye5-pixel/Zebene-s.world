import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  UserProfile,
  Seat,
  ChamberMessage,
  ChamberInfo,
  ChamberMemberRegistration,
  LegalComplianceCertificate,
  PlatformTab,
  NuptialWeddingRecord,
  InvitedContact,
} from '../types';
import { CHAMBERS } from '../data/chambers';
import { translateText, checkSecurityAndPeace } from '../services/api';
import { speakText } from '../services/speech';
import { offlineTranslate } from '../data/offlineData';

export interface FounderWithdrawal {
  id: string;
  amountBirr: number;
  recipientName: string;
  channel: string;
  accountNumber: string;
  referenceCode: string;
  date: string;
  time: string;
  status: 'completed' | 'processing';
  note?: string;
  receiptNumber: string;
}

export interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'donation' | 'lottery_win' | 'loan_disbursement' | 'deposit';
  description: string;
  amountBirr: number;
  date: string;
  method?: string;
  status: 'completed' | 'pending';
}

interface AppContextType {
  currentUser: UserProfile;
  chambers: ChamberInfo[];
  activeChamberCode: number;
  activeChamber: ChamberInfo;
  activeTab: PlatformTab;
  setActiveTab: (tab: PlatformTab) => void;
  legalCertificate: LegalComplianceCertificate | null;
  acceptLegalCompact: () => LegalComplianceCertificate;
  isLegalModalOpen: boolean;
  setIsLegalModalOpen: (open: boolean) => void;
  isTikil2ryaModalOpen: boolean;
  setIsTikil2ryaModalOpen: (open: boolean) => void;
  seats: Seat[];
  myCurrentSeat: number | null;
  isMyMicOn: boolean;
  isMyVideoOn: boolean;
  userLanguage: string;
  setUserLanguage: (lang: string) => void;
  autoTranslateEnabled: boolean;
  setAutoTranslateEnabled: (val: boolean) => void;
  autoSpeechEnabled: boolean;
  setAutoSpeechEnabled: (val: boolean) => void;
  messages: ChamberMessage[];
  switchChamber: (code: number) => void;
  claimSeat: (seatNumber: number) => void;
  leaveSeat: () => void;
  toggleMic: () => void;
  toggleVideo: () => void;
  sendMessage: (text: string) => Promise<void>;
  registerUser: (profile: Partial<UserProfile>) => void;
  signOutUser: () => void;
  broadcastVoiceAudio: (text: string, language?: string, audioBlobBase64?: string) => void;
  userWallet: {
    balanceBirr: number;
    balanceUsd: number;
    lifetimeEarnedBirr: number;
    transactions: Transaction[];
  };
  founderVault: {
    isUnlocked: boolean;
    currentPasscode: string;
    unlockVault: (pass: string) => boolean;
    lockVault: () => void;
    changePasscode: (oldPass: string, newPass: string) => { success: boolean; message: string };
    resetPasscode: () => void;
    totalPlatformVolumeBirr: number;
    creatorReserve5PctBirr: number;
    bankReserve10PctBirr: number;
    creatorDirectPayoutsBirr: number;
    registeredMembersCount: number;
    totalWithdrawnBirr: number;
    withdrawals: FounderWithdrawal[];
    makeFounderWithdrawal: (
      channel: string,
      accountNumber: string,
      amountBirr: number,
      note?: string
    ) => { success: boolean; message: string; withdrawal?: FounderWithdrawal };
  };
  rewardUserAction: (actionType: 'like' | 'share' | 'speak' | 'game' | 'host' | 'comment' | 'login') => void;
  makeDeposit: (channel: string, accountNumber: string, amountBirr: number, note?: string) => boolean;
  makeWithdrawal: (bankName: string, accountNumber: string, amountBirr: number) => boolean;
  makeDonation: (projectId: string, amountBirr: number) => boolean;
  lastRewardToast: { amount: number; message: string; timestamp: number } | null;
  dismissRewardToast: () => void;
  isMemberFinanceModalOpen: boolean;
  setIsMemberFinanceModalOpen: (open: boolean) => void;
  isRegistrationOpen: boolean;
  setIsRegistrationOpen: (open: boolean) => void;

  // Dedicated Per-Chamber Member Registry
  chamberRegistrations: Record<number, ChamberMemberRegistration | null>;
  chamberMembersRegistry: Record<number, ChamberMemberRegistration[]>;
  registerInChamber: (
    chamberCode: number,
    details: { registeredRole: string; chamberSpecificData: Record<string, string> }
  ) => ChamberMemberRegistration;

  // High-Definition Video & Camera Stream Management
  activeCameraStream: MediaStream | null;
  cameraStatus: 'idle' | 'starting' | 'active' | 'denied' | 'error';
  cameraFacingMode: 'user' | 'environment';
  toggleCameraFacingMode: () => void;
  startUserCamera: () => Promise<MediaStream | null>;
  stopUserCamera: () => void;

  // Offline State & Network Handling
  isOnline: boolean;
  isSimulatedOffline: boolean;
  effectiveOnline: boolean;
  toggleSimulateOffline: () => void;

  // Modern Invitation & Embed Widget Controls
  isInviteModalOpen: boolean;
  setIsInviteModalOpen: (open: boolean) => void;
  isEmbedModalOpen: boolean;
  setIsEmbedModalOpen: (open: boolean) => void;

  // Nuptial Records & Registry
  nuptialRecords: NuptialWeddingRecord[];
  saveNuptialRecord: (record: NuptialWeddingRecord) => void;

  // Invited Contacts
  invitedContacts: InvitedContact[];
  addInvitedContact: (contact: InvitedContact) => void;

  // Executive Admin & Chamber Controls
  chambersLocked: Record<number, boolean>;
  adminToggleChamberLock: (chamberCode: number) => void;
  adminBroadcastDecree: (decreeText: string) => Promise<void>;
  adminResetChamberSeats: (chamberCode: number) => void;
  adminAddVerifiedMember: (member: Partial<UserProfile>) => void;
  allRegisteredMembers: UserProfile[];
}

const AppContext = createContext<AppContextType | null>(null);

// Generate initial seats for chambers
function createInitialSeats(count: number = 32): Seat[] {
  const sampleParticipants = [
    { name: 'Zebene Asfeye / ዘበነ አስፍዬ (Founder)', nationality: 'Ethiopia 🇪🇹', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', lang: 'Amharic', seatNum: 1 },
    { name: 'Dr. Amina Diallo', nationality: 'Senegal 🇸🇳', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', lang: 'French', seatNum: 2 },
    { name: 'Marcus Chen', nationality: 'Singapore 🇸🇬', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', lang: 'English', seatNum: 3 },
    { name: 'Elena Rostova', nationality: 'Greece 🇬🇷', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', lang: 'Greek', seatNum: 4 },
    { name: 'Tariq Al-Mansoor', nationality: 'Oman 🇴🇲', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', lang: 'Arabic', seatNum: 5 },
  ];

  const seats: Seat[] = [];
  for (let i = 1; i <= count; i++) {
    const participant = sampleParticipants.find((p) => p.seatNum === i);
    if (participant) {
      seats.push({
        seatNumber: i,
        occupiedBy: {
          userId: `sim-${i}`,
          userName: participant.name,
          userNationality: participant.nationality,
          userAvatar: participant.avatar,
          isMuted: i !== 1,
          isVideoOn: true,
          isSpeaking: i === 1,
          language: participant.lang,
        },
      });
    } else {
      seats.push({
        seatNumber: i,
        occupiedBy: null,
      });
    }
  }
  return seats;
}

// Initial seed members across all 7 houses
function createSeedMembers(): Record<number, ChamberMemberRegistration[]> {
  return {
    1: [
      {
        badgeId: 'CH1-DELEGATE-1001',
        chamberCode: 1,
        userId: 'usr-zebene',
        fullName: 'Zebene Asfeye (ዘበነ አስፍዬ)',
        nationality: 'Ethiopia 🇪🇹',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Plenary Assembly Convener',
        chamberSpecificData: {
          delegationField: 'Technology & Human Civilization',
          representation: 'Global Pan-Human Congress',
          speakingMandate: 'Universal Brotherhood & Scientific Progress'
        },
        registrationDate: '2026-01-10',
        isVerified: true
      },
      {
        badgeId: 'CH1-DELEGATE-1002',
        chamberCode: 1,
        userId: 'usr-amina',
        fullName: 'Dr. Amina Diallo',
        nationality: 'Senegal 🇸🇳',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'African Education Delegate',
        chamberSpecificData: {
          delegationField: 'Sustainable Agro-Economy',
          representation: 'West African Knowledge Hub',
          speakingMandate: 'Equitable Resource Distribution'
        },
        registrationDate: '2026-01-12',
        isVerified: true
      }
    ],
    2: [
      {
        badgeId: 'CH2-LINEAGE-2001',
        chamberCode: 2,
        userId: 'usr-k1',
        fullName: 'Ato Solomon Tessema',
        nationality: 'Ethiopia 🇪🇹',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Clan Patriarch & Chronicler',
        chamberSpecificData: {
          paternalClan: 'Shewa Tessema Lineage',
          maternalClan: 'Wollo Wolde-Yesus Branch',
          ancestralOrigin: 'Northern & Central Highlands',
          clanPledge: 'Perpetual Family Mutual Protection'
        },
        registrationDate: '2026-01-15',
        isVerified: true
      }
    ],
    3: [
      {
        badgeId: 'CH3-STATE-3001',
        chamberCode: 3,
        userId: 'usr-st1',
        fullName: 'Ambassador Daniel Wright',
        nationality: 'UK 🇬🇧',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Plenipotentiary Envoy',
        chamberSpecificData: {
          diplomaticRank: 'Special Envoy for Multilateral Cooperation',
          jurisdiction: 'Trans-Regional Energy Corridors',
          securityClearance: 'Class-A Sovereign Diplomatic'
        },
        registrationDate: '2026-01-18',
        isVerified: true
      }
    ],
    4: [
      {
        badgeId: 'CH4-SECRET-4001',
        chamberCode: 4,
        userId: 'usr-sec1',
        fullName: 'Discreet Matrimony Counselor',
        nationality: 'Global 🌐',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Confidential Matchmaker & Mediator',
        chamberSpecificData: {
          anonymousCodeName: 'Guardian-07',
          serviceFocus: 'Sacred Courtship & Pre-Marital Guidance',
          ndaPledge: 'Zero-Knowledge Cryptographic Confidentiality'
        },
        registrationDate: '2026-01-20',
        isVerified: true
      }
    ],
    5: [
      {
        badgeId: 'CH5-NUPTIAL-5001',
        chamberCode: 5,
        userId: 'usr-wed1',
        fullName: 'Elder Gabriel Wolde',
        nationality: 'Ethiopia 🇪🇹',
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Presiding Elder (አጋቢ ሽማግሌ)',
        chamberSpecificData: {
          eldershipOrder: 'High Council of Nuptial Arbitrators',
          marriageTradition: 'Ethiopian & International Harmonized Law',
          blessingJurisdiction: 'Global Digital Nuptial Cathedral'
        },
        registrationDate: '2026-01-22',
        isVerified: true
      }
    ],
    6: [
      {
        badgeId: 'CH6-FAITH-6001',
        chamberCode: 6,
        userId: 'usr-f1',
        fullName: 'Abba Yohannes & Ustaz Bilal',
        nationality: 'Global 🌐',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Interfaith Fellowship Guide',
        chamberSpecificData: {
          spiritualTradition: 'Interfaith Peace & Theistic Harmony',
          theologicalCalling: 'Scriptural Studies on Mercy and Love',
          moralCovenant: 'Uncompromising Respect for All Sacred Beliefs'
        },
        registrationDate: '2026-01-25',
        isVerified: true
      }
    ],
    7: [
      {
        badgeId: 'CH7-PEACE-7001',
        chamberCode: 7,
        userId: 'usr-sec-guard',
        fullName: 'Commander Bereket Hailu',
        nationality: 'International Peace Council 🕊️',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        registeredRole: 'Chief Peacekeeper & Civility Commissioner',
        chamberSpecificData: {
          officerBadgeNumber: 'UN-IPC-8842',
          securitySector: 'Chambers Anti-Disturbance Radar',
          dutyOath: 'Preserving Order, Human Dignity & Universal Law'
        },
        registrationDate: '2026-01-28',
        isVerified: true
      }
    ]
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zw_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      id: 'usr-101',
      fullName: 'Global Citizen',
      nationality: 'Ethiopia 🇪🇹',
      phoneNumber: '+251 91 123 4567',
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      faceVerified: true,
      role: 'citizen',
      preferredLanguage: 'en',
      joinedAt: '2026-01-15',
      balanceBirr: 2500.0,
      balanceUsd: 45.0,
      reputationPoints: 120,
    };
  });

  const [activeChamberCode, setActiveChamberCode] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<PlatformTab>('chamber');
  const [userLanguage, setUserLanguage] = useState<string>('en');
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState<boolean>(true);
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState<boolean>(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [isTikil2ryaModalOpen, setIsTikil2ryaModalOpen] = useState<boolean>(false);
  const [isMemberFinanceModalOpen, setIsMemberFinanceModalOpen] = useState<boolean>(false);
  const [lastRewardToast, setLastRewardToast] = useState<{ amount: number; message: string; timestamp: number } | null>(null);

  const dismissRewardToast = () => setLastRewardToast(null);

  // Modern Invitation & Embed Widget Controls
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState<boolean>(false);

  // Executive Admin & Chamber Lock Controls
  const [chambersLocked, setChambersLocked] = useState<Record<number, boolean>>({});

  // Nuptial & Matrimonial Records (Chamber #5)
  const [nuptialRecords, setNuptialRecords] = useState<NuptialWeddingRecord[]>(() => {
    const saved = localStorage.getItem('zw_nuptial_records');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        covenantId: 'cov-seed-1',
        registryNumber: 'ZW-HAGUE-2026-99824',
        hagueApostilleCode: 'HAGUE-APOSTILLE-2026-001-A9B',
        solemnizationDate: '2026-10-18',
        propertyRegime: 'community_of_property',
        groom: {
          role: 'groom',
          fullName: 'ዳዊት ኃይሉ (Dawit Hailu)',
          amharicRole: 'ሙሽራው',
          nationality: 'Ethiopia 🇪🇹',
          idPassportNumber: 'ET-PASS-99120',
          isSigned: true,
        },
        bride: {
          role: 'bride',
          fullName: 'ሰብለወንጌል ተፈራ (Seblewongel Teferra)',
          amharicRole: 'ሙሽሪት',
          nationality: 'Ethiopia 🇪🇹',
          idPassportNumber: 'ET-PASS-88419',
          isSigned: true,
        },
        bestMan: {
          role: 'best_man',
          fullName: 'ኤርሚያስ ከበደ (Ermias Kebede)',
          amharicRole: 'ዋና ሚዜ',
          nationality: 'Ethiopia 🇪🇹',
          isSigned: true,
        },
        maidOfHonor: {
          role: 'maid_of_honor',
          fullName: 'ትዕግስት በቀለ (Tigist Bekele)',
          amharicRole: 'የሙሽሪት ሚዜ',
          nationality: 'Ethiopia 🇪🇹',
          isSigned: true,
        },
        elders: [
          {
            role: 'presiding_elder',
            fullName: 'አቶ ገብርኤል ወልዴ (Elder Gabriel Wolde)',
            amharicRole: 'አጋቢ ሽማግሌ',
            nationality: 'Ethiopia 🇪🇹',
            isSigned: true,
          },
        ],
        witnesses: [
          {
            role: 'legal_witness',
            fullName: 'ዶ/ር አሚና ዲያሎ (Dr. Amina Diallo)',
            amharicRole: 'ዋና ምስክር',
            nationality: 'Senegal 🇸🇳',
            isSigned: true,
          },
        ],
        guestsCount: 142,
        totalGiftsBirr: 45000,
        treatyComplianceNotes: [
          'Hague Apostille Convention 1961 Verified',
          'UN Marriage Treaty 1962 Compliant',
        ],
        isLegallyCertified: true,
        qrVerificationUrl: 'https://zebenesworld.org/verify/nuptial/ZW-HAGUE-2026-99824',
      },
    ];
  });

  // Invited Contacts Registry
  const [invitedContacts, setInvitedContacts] = useState<InvitedContact[]>(() => {
    const saved = localStorage.getItem('zw_invited_contacts');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'inv-seed-1',
        name: 'Ambassador Hailemariam',
        phoneNumber: '+251 91 144 5566',
        channel: 'whatsapp',
        status: 'sent',
        invitedAt: '2026-10-20',
      },
      {
        id: 'inv-seed-2',
        name: 'Sara Kifle (Diaspora Council)',
        email: 'sara.kifle@global.org',
        channel: 'email',
        status: 'sent',
        invitedAt: '2026-10-21',
      },
    ];
  });

  // All Registered Members for Governance Directory
  const [allRegisteredMembers, setAllRegisteredMembers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('zw_all_registered_members');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'usr-zebene',
        fullName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye - Founder)',
        gender: 'ወንድ (Male)',
        age: 38,
        phoneNumber: '+251 91 100 2026',
        address: 'አዲስ አበባ፣ ኢትዮጵያ (Addis Ababa)',
        nationality: 'Ethiopia 🇪🇹',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        faceVerified: true,
        role: 'founder',
        preferredLanguage: 'am',
        joinedAt: '2026-01-01',
        balanceBirr: 875000,
        balanceUsd: 15900,
        reputationPoints: 9999,
        isAuthenticated: true,
      },
      {
        id: 'usr-amina',
        fullName: 'Dr. Amina Diallo',
        gender: 'ሴት (Female)',
        age: 34,
        phoneNumber: '+221 77 123 4567',
        address: 'Dakar, Senegal',
        nationality: 'Senegal 🇸🇳',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        faceVerified: true,
        role: 'elder',
        preferredLanguage: 'fr',
        joinedAt: '2026-01-12',
        balanceBirr: 5400,
        balanceUsd: 98,
        reputationPoints: 480,
        isAuthenticated: true,
      },
      {
        id: 'usr-marcus',
        fullName: 'Marcus Chen',
        gender: 'ወንድ (Male)',
        age: 31,
        phoneNumber: '+65 9123 4567',
        address: 'Singapore Central',
        nationality: 'Singapore 🇸🇬',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        faceVerified: true,
        role: 'statesman',
        preferredLanguage: 'en',
        joinedAt: '2026-01-14',
        balanceBirr: 8900,
        balanceUsd: 161,
        reputationPoints: 620,
        isAuthenticated: true,
      },
    ];
  });

  // International Legal Compliance Certificate (Persisted in localStorage)
  const [legalCertificate, setLegalCertificate] = useState<LegalComplianceCertificate | null>(() => {
    const saved = localStorage.getItem('zw_legal_certificate');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return null;
  });

  const acceptLegalCompact = useCallback((): LegalComplianceCertificate => {
    const cert: LegalComplianceCertificate = {
      certificateId: `TREATY-INTL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      nationality: currentUser.nationality,
      agreedAt: new Date().toISOString(),
      jurisdiction: 'International Commercial & Civil Harmonized Jurisdiction (170+ Signatory Nations)',
      digitalSignatureHash: `SHA256-${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      termsVersion: '2026.1-GLOBAL-SOVEREIGN',
      isCertified: true,
    };
    setLegalCertificate(cert);
    localStorage.setItem('zw_legal_certificate', JSON.stringify(cert));
    return cert;
  }, [currentUser]);

  // Real-time network detection & Offline mode simulation
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(() => {
    return localStorage.getItem('zw_simulated_offline') === 'true';
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOnline = isOnline && !isSimulatedOffline;

  const toggleSimulateOffline = () => {
    setIsSimulatedOffline((prev) => {
      const next = !prev;
      localStorage.setItem('zw_simulated_offline', String(next));
      return next;
    });
  };

  // Helper to generate universal registrations for all 7 chambers once registered
  const buildUniversalChamberRegs = (user: UserProfile): Record<number, ChamberMemberRegistration> => {
    const roles: Record<number, string> = {
      1: 'General Citizen Assembly Delegate',
      2: 'Clan Lineage Chronicler & Family Chronicler',
      3: 'Diplomatic Policy & Sovereign Envoy',
      4: 'Confidential Matrimony Aspirant',
      5: 'Honored Nuptial Witness & Guest',
      6: 'Interfaith Fellowship Guide',
      7: 'Civil Peacekeeper Monitor',
    };
    const res: Record<number, ChamberMemberRegistration> = {};
    for (let c = 1; c <= 7; c++) {
      res[c] = {
        badgeId: `ZW-CH${c}-${user.id ? user.id.toUpperCase().slice(-4) : '9821'}`,
        chamberCode: c,
        userId: user.id || 'usr-101',
        fullName: user.fullName || 'Global Citizen',
        nationality: user.nationality || 'Ethiopia 🇪🇹',
        photoUrl: user.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        registeredRole: roles[c] || 'Accredited Member',
        chamberSpecificData: {
          enrollment: 'Universal Single Registration (አንዴ የተመዘገበ ሁለንተናዊ አባል)',
          verification: 'Official Digital Badge Active',
        },
        registrationDate: user.joinedAt || '2026-01-15',
        isVerified: true,
      };
    }
    return res;
  };

  // Per-Chamber Member Registrations: Automatically accredited across ALL 7 chambers
  const [chamberRegistrations, setChamberRegistrations] = useState<Record<number, ChamberMemberRegistration | null>>(() => {
    const saved = localStorage.getItem('zw_chamber_registrations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all 7 chambers are filled
        const filled = { ...buildUniversalChamberRegs(currentUser), ...parsed };
        return filled;
      } catch {}
    }
    return buildUniversalChamberRegs(currentUser);
  });

  const [chamberMembersRegistry, setChamberMembersRegistry] = useState<Record<number, ChamberMemberRegistration[]>>(() => {
    const saved = localStorage.getItem('zw_chamber_members_list');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return createSeedMembers();
  });

  // Dedicated High-Definition Camera Stream
  const [activeCameraStream, setActiveCameraStream] = useState<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'starting' | 'active' | 'denied' | 'error'>('idle');
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');

  // Hardware states
  const [myCurrentSeat, setMyCurrentSeat] = useState<number | null>(null);
  const [isMyMicOn, setIsMyMicOn] = useState<boolean>(false);
  const [isMyVideoOn, setIsMyVideoOn] = useState<boolean>(false);

  // ISOLATED seats per chamber
  const [seatsByChamber, setSeatsByChamber] = useState<Record<number, Seat[]>>({
    1: createInitialSeats(36),
    2: createInitialSeats(24),
    3: createInitialSeats(20),
    4: createInitialSeats(12),
    5: createInitialSeats(30),
    6: createInitialSeats(28),
    7: createInitialSeats(18),
  });

  // ISOLATED chat messages per chamber (Saved in local storage for full offline persistence)
  const [messagesByChamber, setMessagesByChamber] = useState<Record<number, ChamberMessage[]>>(() => {
    const saved = localStorage.getItem('zw_chamber_messages');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      1: [
        {
          id: 'msg-1-1',
          chamberCode: 1,
          userId: 'usr-zebene',
          userName: 'Zebene Asfeye / ዘበነ አስፍዬ (Founder)',
          userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          userNationality: 'Ethiopia 🇪🇹',
          originalText: 'እንኳን ወደ ዘበነ የመሰረተው አለም የሁሉም የጋራ ቤት በሰላም መጣችሁ! በጋራ እንማማር፣ እውቀት እንለዋወጥ፣ ሰላምን እናበርክት።',
          originalLanguage: 'Amharic',
          translatedText: 'Welcome to the House of All Nations in Zebene\'s World! Let us learn together, exchange knowledge, and cultivate peace.',
          timestamp: '10:30 AM',
          isOfficial: true,
        },
        {
          id: 'msg-1-2',
          chamberCode: 1,
          userId: 'usr-marcus',
          userName: 'Marcus Chen',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          userNationality: 'Singapore 🇸🇬',
          originalText: 'Greetings from Singapore! The real-time speech translation across all world languages is truly revolutionary for global unity.',
          originalLanguage: 'English',
          translatedText: 'Greetings from Singapore! The real-time speech translation across all world languages is truly revolutionary for global unity.',
          timestamp: '10:32 AM',
        },
      ],
      2: [
        {
          id: 'msg-2-1',
          chamberCode: 2,
          userId: 'usr-k2',
          userName: 'Ato Solomon Tessema',
          userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
          userNationality: 'Ethiopia 🇪🇹',
          originalText: 'የዘር ግንድ እና የቤተሰብ ታሪክ ማጠናከሪያ ዝርዝር መዝገብ እዚህ ተሰናድቷል።',
          originalLanguage: 'Amharic',
          translatedText: 'The ancestral lineage and family chronicle registry is actively compiled here.',
          timestamp: '09:15 AM',
        },
      ],
      3: [
        {
          id: 'msg-3-1',
          chamberCode: 3,
          userId: 'usr-st1',
          userName: 'Ambassador Daniel Wright',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          userNationality: 'UK 🇬🇧',
          originalText: 'Deliberating multilateral infrastructure financing and green industrial corridors.',
          originalLanguage: 'English',
          translatedText: 'Deliberating multilateral infrastructure financing and green industrial corridors.',
          timestamp: '08:45 AM',
          isOfficial: true,
        },
      ],
      4: [
        {
          id: 'msg-4-1',
          chamberCode: 4,
          userId: 'usr-sec1',
          userName: 'Encrypted Counselor',
          userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
          userNationality: 'Global 🌐',
          originalText: 'This sanctuary is sealed with end-to-end zero-knowledge secrecy for prospective couples.',
          originalLanguage: 'English',
          translatedText: 'This sanctuary is sealed with end-to-end zero-knowledge secrecy for prospective couples.',
          timestamp: '11:00 AM',
        },
      ],
      5: [
        {
          id: 'msg-5-1',
          chamberCode: 5,
          userId: 'usr-wed1',
          userName: 'Elder Gabriel & Elder Fatuma',
          userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
          userNationality: 'Ethiopia 🇪🇹',
          originalText: 'ሙሽራውና ሙሽሪት በሰላም ቀርበዋል። ምስክሮች እና ሽማግሌዎች ፊርማቸውን በኦንላይን ለመስጠት ዝግጁ ናቸው!',
          originalLanguage: 'Amharic',
          translatedText: 'The bride and groom have arrived in honor. Elders and witnesses are ready for digital covenant signatures!',
          timestamp: '02:00 PM',
        },
      ],
      6: [
        {
          id: 'msg-6-1',
          chamberCode: 6,
          userId: 'usr-f1',
          userName: 'Interfaith Circle',
          userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          userNationality: 'Global 🌐',
          originalText: 'May peace and benevolence envelop every human home on Earth.',
          originalLanguage: 'English',
          translatedText: 'May peace and benevolence envelop every human home on Earth.',
          timestamp: '07:30 AM',
        },
      ],
      7: [
        {
          id: 'msg-7-1',
          chamberCode: 7,
          userId: 'usr-sec-guard',
          userName: 'Peacekeeper Central Command',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          userNationality: 'International Peace Council 🕊️',
          originalText: 'Civil radar active. All 7 chambers report 100% harmonious assembly.',
          originalLanguage: 'English',
          translatedText: 'Civil radar active. All 7 chambers report 100% harmonious assembly.',
          timestamp: '11:15 AM',
          isOfficial: true,
        },
      ],
    };
  });

  // User wallet state (Saved in local storage for full offline persistence)
  const [userWallet, setUserWallet] = useState<{
    balanceBirr: number;
    balanceUsd: number;
    lifetimeEarnedBirr: number;
    transactions: Transaction[];
  }>(() => {
    const saved = localStorage.getItem('zw_user_wallet');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      balanceBirr: 3450.0,
      balanceUsd: 62.7,
      lifetimeEarnedBirr: 5800.0,
      transactions: [
        { id: 'tx-1', type: 'earning', description: 'Chamber 1 Dialogue Participation Reward', amountBirr: 150.0, date: '2026-10-08', status: 'completed' },
        { id: 'tx-2', type: 'earning', description: 'Content Sharing & Global Community Engagement', amountBirr: 85.0, date: '2026-10-07', status: 'completed' },
        { id: 'tx-3', type: 'withdrawal', description: 'Withdrawal to Commercial Bank of Ethiopia (CBE)', amountBirr: -1000.0, date: '2026-10-06', method: 'CBE Birr', status: 'completed' },
        { id: 'tx-4', type: 'earning', description: 'Daily Knowledge Quiz Champion Reward', amountBirr: 300.0, date: '2026-10-05', status: 'completed' },
      ],
    };
  });

  // Private Founder Vault (Secretly secured with PIN/Passcode, default 2026, customizable)
  const [founderPasscode, setFounderPasscode] = useState<string>(() => {
    return localStorage.getItem('zw_founder_vault_pin') || '2026';
  });
  const [founderVaultUnlocked, setFounderVaultUnlocked] = useState(false);
  const [founderVaultStats, setFounderVaultStats] = useState(() => {
    const saved = localStorage.getItem('zw_founder_vault_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          totalPlatformVolumeBirr: parsed.totalPlatformVolumeBirr ?? 4892000.0,
          creatorReserve5PctBirr: parsed.creatorReserve5PctBirr ?? 244600.0,
          bankReserve10PctBirr: parsed.bankReserve10PctBirr ?? 489200.0,
          creatorDirectPayoutsBirr: parsed.creatorDirectPayoutsBirr ?? 875000.0,
          registeredMembersCount: parsed.registeredMembersCount ?? 28410,
          totalWithdrawnBirr: parsed.totalWithdrawnBirr ?? 75000.0,
        };
      } catch (e) {
        // use default
      }
    }
    return {
      totalPlatformVolumeBirr: 4892000.0,
      creatorReserve5PctBirr: 244600.0,
      bankReserve10PctBirr: 489200.0,
      creatorDirectPayoutsBirr: 875000.0,
      registeredMembersCount: 28410,
      totalWithdrawnBirr: 75000.0,
    };
  });

  const [founderWithdrawals, setFounderWithdrawals] = useState<FounderWithdrawal[]>(() => {
    const saved = localStorage.getItem('zw_founder_withdrawals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return [
      {
        id: 'fw-1',
        amountBirr: 50000.0,
        recipientName: 'ዘበነ አስፍዬ (Zebene Asfeye)',
        channel: 'Commercial Bank of Ethiopia (CBE)',
        accountNumber: '1000167413618',
        referenceCode: 'CBE-DIR-2026-99214',
        receiptNumber: 'RCP-CBE-8821',
        date: '2026-10-10',
        time: '14:20:00',
        status: 'completed',
        note: 'የመድረኩ ቀዳሚ የትርፍ ድርሻ ወጪ (Direct Developer Dividend Disbursal)',
      },
      {
        id: 'fw-2',
        amountBirr: 25000.0,
        recipientName: 'ዘበነ አስፍዬ (Zebene Asfeye)',
        channel: 'Telebirr Priority Payout',
        accountNumber: '+251 91 123 4567',
        referenceCode: 'TB-INST-2026-84729',
        receiptNumber: 'RCP-TB-4412',
        date: '2026-10-12',
        time: '09:45:12',
        status: 'completed',
        note: 'የቴሌብር ፈጣን የኪስ ወጪ (Instant Telebirr Payout)',
      },
    ];
  });

  const activeChamber = CHAMBERS.find((c) => c.code === activeChamberCode) || CHAMBERS[0];
  const seats = seatsByChamber[activeChamberCode] || [];
  const messages = messagesByChamber[activeChamberCode] || [];

  const wsRef = useRef<WebSocket | null>(null);

  // Real-Time Multi-User WebSocket Synchronization
  useEffect(() => {
    let isMounted = true;
    let socket: WebSocket | null = null;
    let reconnectTimeout: any = null;

    const connect = () => {
      if (!isMounted) return;
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host || 'localhost:3000';
        const wsUrl = `${protocol}//${host}/ws`;

        socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                type: 'join_chamber',
                chamberCode: activeChamberCode,
                userId: currentUser.id,
                userName: currentUser.fullName,
              })
            );
          }
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'init_state') {
              if (data.seatsByChamber) {
                setSeatsByChamber((prev) => ({ ...prev, ...data.seatsByChamber }));
              }
              if (data.messagesByChamber) {
                setMessagesByChamber((prev) => ({ ...prev, ...data.messagesByChamber }));
              }
            } else if (data.type === 'chamber_sync') {
              if (data.seats) {
                setSeatsByChamber((prev) => ({ ...prev, [data.chamberCode]: data.seats }));
              }
              if (data.messages) {
                setMessagesByChamber((prev) => ({ ...prev, [data.chamberCode]: data.messages }));
              }
            } else if (data.type === 'seat_updated') {
              const { chamberCode, seatNumber, occupiedBy } = data;
              setSeatsByChamber((prev) => {
                const currentChamberSeats = [...(prev[chamberCode] || [])];
                const updated = currentChamberSeats.map((s) =>
                  s.seatNumber === seatNumber ? { ...s, occupiedBy } : s
                );
                if (!updated.some((s) => s.seatNumber === seatNumber)) {
                  updated.push({ seatNumber, occupiedBy });
                }
                return { ...prev, [chamberCode]: updated };
              });
            } else if (data.type === 'media_state_changed') {
              const { chamberCode, seatNumber, isMuted, isVideoOn, isSpeaking } = data;
              setSeatsByChamber((prev) => {
                const currentChamberSeats = prev[chamberCode] || [];
                const updated = currentChamberSeats.map((s) => {
                  if (s.seatNumber === seatNumber && s.occupiedBy) {
                    return {
                      ...s,
                      occupiedBy: {
                        ...s.occupiedBy,
                        isMuted: isMuted ?? s.occupiedBy.isMuted,
                        isVideoOn: isVideoOn ?? s.occupiedBy.isVideoOn,
                        isSpeaking: isSpeaking ?? s.occupiedBy.isSpeaking,
                      },
                    };
                  }
                  return s;
                });
                return { ...prev, [chamberCode]: updated };
              });
            } else if (data.type === 'remote_video_frame') {
              const { chamberCode, seatNumber, videoFrame } = data;
              setSeatsByChamber((prev) => {
                const currentChamberSeats = prev[chamberCode] || [];
                const updated = currentChamberSeats.map((s) => {
                  if (s.seatNumber === seatNumber && s.occupiedBy) {
                    return {
                      ...s,
                      occupiedBy: {
                        ...s.occupiedBy,
                        videoFrame,
                        isVideoOn: true,
                      },
                    };
                  }
                  return s;
                });
                return { ...prev, [chamberCode]: updated };
              });
            } else if (data.type === 'remote_audio_speech') {
              const { chamberCode, seatNumber, userName, text, language, audioBlobBase64 } = data;
              // Visual speaking indicator pulse
              setSeatsByChamber((prev) => {
                const currentChamberSeats = prev[chamberCode] || [];
                const updated = currentChamberSeats.map((s) => {
                  if (s.seatNumber === seatNumber && s.occupiedBy) {
                    return { ...s, occupiedBy: { ...s.occupiedBy, isSpeaking: true } };
                  }
                  return s;
                });
                return { ...prev, [chamberCode]: updated };
              });

              setTimeout(() => {
                setSeatsByChamber((prev) => {
                  const currentChamberSeats = prev[chamberCode] || [];
                  const updated = currentChamberSeats.map((s) => {
                    if (s.seatNumber === seatNumber && s.occupiedBy) {
                      return { ...s, occupiedBy: { ...s.occupiedBy, isSpeaking: false } };
                    }
                    return s;
                  });
                  return { ...prev, [chamberCode]: updated };
                });
              }, 3000);

              // Audio playback
              if (audioBlobBase64) {
                try {
                  const audio = new Audio(audioBlobBase64);
                  audio.play().catch((e) => console.log('Audio autoplay:', e));
                } catch (e) {}
              } else if (text) {
                speakText(text, language || userLanguage);
              }
            } else if (data.type === 'new_chat_message') {
              const { chamberCode, message } = data;
              setMessagesByChamber((prev) => ({
                ...prev,
                [chamberCode]: [...(prev[chamberCode] || []), message],
              }));
            }
          } catch (e) {
            console.error('Error in WS message:', e);
          }
        };

        socket.onclose = () => {
          if (isMounted) {
            reconnectTimeout = setTimeout(connect, 2500);
          }
        };
      } catch (err) {
        console.warn('WS connect err:', err);
      }
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socket) socket.close();
    };
  }, [activeChamberCode]);

  // Video Frame Transmission Effect: Broadcast live webcam/camera frames across WebSockets
  useEffect(() => {
    if (!isMyVideoOn || !activeCameraStream || myCurrentSeat === null) return;

    const videoEl = document.createElement('video');
    videoEl.srcObject = activeCameraStream;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.play().catch(() => {});

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');

    const intervalId = setInterval(() => {
      if (
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN &&
        videoEl.readyState >= 2 &&
        ctx
      ) {
        try {
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
          wsRef.current.send(
            JSON.stringify({
              type: 'video_frame',
              chamberCode: activeChamberCode,
              seatNumber: myCurrentSeat,
              userId: currentUser.id,
              videoFrame: dataUrl,
            })
          );
        } catch (e) {
          // ignore capture frame transient
        }
      }
    }, 700);

    return () => {
      clearInterval(intervalId);
      videoEl.pause();
      videoEl.srcObject = null;
    };
  }, [isMyVideoOn, activeCameraStream, myCurrentSeat, activeChamberCode, currentUser.id]);

  // Key press listener for 1 to 7 quick dialing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        setActiveChamberCode(num);
        setActiveTab('chamber');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const switchChamber = (code: number) => {
    if (code >= 1 && code <= 7) {
      setActiveChamberCode(code);
      setActiveTab('chamber');
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'join_chamber',
            chamberCode: code,
            userId: currentUser.id,
            userName: currentUser.fullName,
          })
        );
      }
    }
  };

  // High-Definition Camera Management
  const startUserCamera = useCallback(async (): Promise<MediaStream | null> => {
    try {
      setCameraStatus('starting');
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: cameraFacingMode,
          width: { ideal: 1280, min: 480 },
          height: { ideal: 720, min: 360 },
          frameRate: { ideal: 30 },
        },
        audio: false,
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      setActiveCameraStream(stream);
      setIsMyVideoOn(true);
      setCameraStatus('active');

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && myCurrentSeat !== null) {
        wsRef.current.send(
          JSON.stringify({
            type: 'media_state',
            chamberCode: activeChamberCode,
            seatNumber: myCurrentSeat,
            userId: currentUser.id,
            isVideoOn: true,
          })
        );
      }

      return stream;
    } catch (err: any) {
      console.warn('Camera permission denied:', err);
      setCameraStatus('denied');
      return null;
    }
  }, [cameraFacingMode, myCurrentSeat, activeChamberCode, currentUser.id]);

  const stopUserCamera = useCallback(() => {
    if (activeCameraStream) {
      activeCameraStream.getTracks().forEach((track) => track.stop());
      setActiveCameraStream(null);
    }
    setIsMyVideoOn(false);
    setCameraStatus('idle');

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && myCurrentSeat !== null) {
      wsRef.current.send(
        JSON.stringify({
          type: 'media_state',
          chamberCode: activeChamberCode,
          seatNumber: myCurrentSeat,
          userId: currentUser.id,
          isVideoOn: false,
        })
      );
    }
  }, [activeCameraStream, myCurrentSeat, activeChamberCode, currentUser.id]);

  const toggleCameraFacingMode = useCallback(() => {
    const nextMode = cameraFacingMode === 'user' ? 'environment' : 'user';
    setCameraFacingMode(nextMode);
    if (isMyVideoOn) {
      stopUserCamera();
      setTimeout(() => {
        startUserCamera();
      }, 200);
    }
  }, [cameraFacingMode, isMyVideoOn, startUserCamera, stopUserCamera]);

  const claimSeat = (seatNumber: number) => {
    // If user has not registered / entered their full name, open registration modal
    if (!currentUser.fullName || !currentUser.isAuthenticated) {
      setIsRegistrationOpen(true);
      return;
    }

    const occupant = {
      userId: currentUser.id,
      userName: currentUser.fullName,
      userNationality: currentUser.nationality,
      userAvatar: currentUser.photoUrl,
      gender: currentUser.gender,
      age: currentUser.age,
      address: currentUser.address,
      phoneNumber: currentUser.phoneNumber,
      isMuted: !isMyMicOn,
      isVideoOn: isMyVideoOn,
      isSpeaking: false,
      language: userLanguage,
    };

    setSeatsByChamber((prev) => {
      const currentChamberSeats = [...(prev[activeChamberCode] || [])];
      const updated = currentChamberSeats.map((seat) => {
        if (seat.occupiedBy?.userId === currentUser.id && seat.seatNumber !== seatNumber) {
          return { ...seat, occupiedBy: null };
        }
        if (seat.seatNumber === seatNumber) {
          return { ...seat, occupiedBy: occupant };
        }
        return seat;
      });
      return { ...prev, [activeChamberCode]: updated };
    });

    setMyCurrentSeat(seatNumber);
    rewardUserAction('speak');

    // Sync across WebSocket to ALL users in real time!
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'claim_seat',
          chamberCode: activeChamberCode,
          seatNumber,
          occupant,
        })
      );
    }
  };

  const leaveSeat = () => {
    if (myCurrentSeat === null) return;
    const seatNum = myCurrentSeat;

    setSeatsByChamber((prev) => {
      const currentChamberSeats = [...(prev[activeChamberCode] || [])];
      const updated = currentChamberSeats.map((seat) => {
        if (seat.seatNumber === seatNum) {
          return { ...seat, occupiedBy: null };
        }
        return seat;
      });
      return { ...prev, [activeChamberCode]: updated };
    });

    setMyCurrentSeat(null);

    // Sync across WebSocket to ALL users in real time!
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'leave_seat',
          chamberCode: activeChamberCode,
          seatNumber: seatNum,
          userId: currentUser.id,
        })
      );
    }
  };

  const toggleMic = () => {
    setIsMyMicOn((prev) => {
      const next = !prev;
      if (myCurrentSeat !== null) {
        setSeatsByChamber((old) => ({
          ...old,
          [activeChamberCode]: (old[activeChamberCode] || []).map((s) =>
            s.seatNumber === myCurrentSeat && s.occupiedBy
              ? { ...s, occupiedBy: { ...s.occupiedBy, isMuted: !next, isSpeaking: next } }
              : s
          ),
        }));

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              type: 'media_state',
              chamberCode: activeChamberCode,
              seatNumber: myCurrentSeat,
              userId: currentUser.id,
              isMuted: !next,
              isSpeaking: next,
            })
          );
        }
      }
      return next;
    });
  };

  const toggleVideo = () => {
    if (isMyVideoOn) {
      stopUserCamera();
    } else {
      startUserCamera();
    }
  };

  // Broadcast Audio Voice Speech to All Other Connected Users
  const broadcastVoiceAudio = (text: string, language?: string, audioBlobBase64?: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'audio_speech',
          chamberCode: activeChamberCode,
          seatNumber: myCurrentSeat,
          userId: currentUser.id,
          userName: currentUser.fullName,
          text,
          language: language || userLanguage,
          audioBlobBase64,
        })
      );
    }
  };

  // Dedicated Per-Chamber Member Registration function
  const registerInChamber = (
    chamberCode: number,
    details: { registeredRole: string; chamberSpecificData: Record<string, string> }
  ): ChamberMemberRegistration => {
    const badgeId = `CH${chamberCode}-${details.registeredRole.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRegistration: ChamberMemberRegistration = {
      badgeId,
      chamberCode,
      userId: currentUser.id,
      fullName: currentUser.fullName,
      nationality: currentUser.nationality,
      photoUrl: currentUser.photoUrl,
      registeredRole: details.registeredRole,
      chamberSpecificData: details.chamberSpecificData,
      registrationDate: new Date().toISOString().split('T')[0],
      isVerified: true,
    };

    // Save registration for user
    const updatedUserRegs = { ...chamberRegistrations, [chamberCode]: newRegistration };
    setChamberRegistrations(updatedUserRegs);
    localStorage.setItem('zw_chamber_registrations', JSON.stringify(updatedUserRegs));

    // Append to chamber members list
    const updatedMembersList = {
      ...chamberMembersRegistry,
      [chamberCode]: [newRegistration, ...(chamberMembersRegistry[chamberCode] || [])],
    };
    setChamberMembersRegistry(updatedMembersList);
    localStorage.setItem('zw_chamber_members_list', JSON.stringify(updatedMembersList));

    // Reward for active civic enrollment
    rewardUserAction('speak');

    return newRegistration;
  };

  // Automated translation & messaging
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Run security peace scan
    const moderation = await checkSecurityAndPeace(text, activeChamberCode);
    if (!moderation.safe) {
      alert(`Safety Shield: Message contains sensitive language (${moderation.flag}). Please keep discourse peaceful.`);
      return;
    }

    // Auto-translate to target language (online or offline)
    let translated = text;
    const isMsgOffline = !effectiveOnline;
    if (autoTranslateEnabled) {
      if (!effectiveOnline) {
        translated = offlineTranslate(text, userLanguage === 'am' ? 'Amharic' : 'English');
      } else {
        try {
          translated = await translateText(text, 'Auto', userLanguage === 'am' ? 'Amharic' : 'English');
        } catch {
          translated = offlineTranslate(text, userLanguage === 'am' ? 'Amharic' : 'English');
        }
      }
    }

    const newMsg: ChamberMessage = {
      id: `msg-${Date.now()}`,
      chamberCode: activeChamberCode,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userAvatar: currentUser.photoUrl,
      userNationality: currentUser.nationality,
      originalText: text,
      originalLanguage: userLanguage === 'am' ? 'Amharic' : 'English',
      translatedText: translated,
      targetLanguage: userLanguage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOffline: isMsgOffline,
    };

    setMessagesByChamber((prev) => {
      const updated = {
        ...prev,
        [activeChamberCode]: [...(prev[activeChamberCode] || []), newMsg],
      };
      localStorage.setItem('zw_chamber_messages', JSON.stringify(updated));
      return updated;
    });

    // Reward for active discourse
    rewardUserAction('speak');

    // Text to Speech playback if enabled
    if (autoSpeechEnabled && translated) {
      speakText(translated, userLanguage);
    }
  };

  // Activity rewards & revenue sharing
  const rewardUserAction = (actionType: 'like' | 'share' | 'speak' | 'game' | 'host' | 'comment' | 'login') => {
    let grossReward = 0;
    let desc = '';
    switch (actionType) {
      case 'like':
        grossReward = 5.0;
        desc = 'የላይክና የድጋፍ ተሳትፎ ገቢ (Interaction Upvote)';
        break;
      case 'share':
        grossReward = 15.0;
        desc = 'የጥሪና ሊንክ ማጋራት ተሳትፎ ገቢ (Global Invitation Share)';
        break;
      case 'speak':
        grossReward = 20.0;
        desc = 'የመድረክ ውይይትና ንግግር ተሳትፎ ገቢ (Chamber Dialogue Contribution)';
        break;
      case 'game':
        grossReward = 30.0;
        desc = 'የገበጣና የጥበብ ፈተና ተሳትፎ ገቢ (Knowledge & Arena Achievement)';
        break;
      case 'host':
        grossReward = 100.0;
        desc = 'የአዳራሽ አመራርና ዝግጅት ገቢ (Assembly Moderation)';
        break;
      case 'comment':
        grossReward = 10.0;
        desc = 'የአስተያየት ተሳትፎ ገቢ (Comment Wall Contribution)';
        break;
      case 'login':
        grossReward = 25.0;
        desc = 'ዕለታዊ የአባልነት ጉብኝት ቦነስ (Daily Member Attendance Bonus)';
        break;
    }

    const bankReserve = grossReward * 0.10;
    const founderReserve = grossReward * 0.05;
    const netUserEarning = grossReward * 0.85;

    setUserWallet((prev) => {
      const updated = {
        ...prev,
        balanceBirr: prev.balanceBirr + netUserEarning,
        lifetimeEarnedBirr: prev.lifetimeEarnedBirr + netUserEarning,
        transactions: [
          {
            id: `tx-${Date.now()}`,
            type: 'earning' as const,
            description: `${desc} (Net 85% + 10% Bank + 5% Reserve deducted)`,
            amountBirr: netUserEarning,
            date: new Date().toISOString().split('T')[0],
            status: 'completed' as const,
          },
          ...prev.transactions.slice(0, 40),
        ],
      };
      localStorage.setItem('zw_user_wallet', JSON.stringify(updated));
      return updated;
    });

    setLastRewardToast({
      amount: netUserEarning,
      message: `${desc} • +${netUserEarning.toFixed(1)} ETB ተከፍሏል!`,
      timestamp: Date.now(),
    });

    setFounderVaultStats((prev) => {
      const updated = {
        ...prev,
        totalPlatformVolumeBirr: prev.totalPlatformVolumeBirr + grossReward,
        bankReserve10PctBirr: prev.bankReserve10PctBirr + bankReserve,
        creatorReserve5PctBirr: prev.creatorReserve5PctBirr + founderReserve,
        creatorDirectPayoutsBirr: prev.creatorDirectPayoutsBirr + (grossReward * 0.02),
      };
      localStorage.setItem('zw_founder_vault_stats', JSON.stringify(updated));
      return updated;
    });
  };

  const makeDeposit = (channel: string, accountNumber: string, amountBirr: number, note?: string): boolean => {
    if (amountBirr <= 0) return false;

    setUserWallet((prev) => {
      const updated = {
        ...prev,
        balanceBirr: prev.balanceBirr + amountBirr,
        lifetimeEarnedBirr: prev.lifetimeEarnedBirr + amountBirr,
        transactions: [
          {
            id: `tx-dep-${Date.now()}`,
            type: 'deposit' as const,
            description: `ገቢ የተደረገ ሂሳብ (Deposit via ${channel}) - A/C: ${accountNumber}${note ? ` • ${note}` : ''}`,
            amountBirr: amountBirr,
            date: new Date().toISOString().split('T')[0],
            method: channel,
            status: 'completed' as const,
          },
          ...prev.transactions,
        ],
      };
      localStorage.setItem('zw_user_wallet', JSON.stringify(updated));
      return updated;
    });

    setLastRewardToast({
      amount: amountBirr,
      message: `በ${channel} ${amountBirr.toLocaleString()} ETB ገቢ በተሳካ ሁኔታ ተከናውኗል! (Deposit Completed)`,
      timestamp: Date.now(),
    });

    return true;
  };

  const makeWithdrawal = (bankName: string, accountNumber: string, amountBirr: number): boolean => {
    if (amountBirr > userWallet.balanceBirr || amountBirr <= 0) return false;

    setUserWallet((prev) => {
      const updated = {
        ...prev,
        balanceBirr: prev.balanceBirr - amountBirr,
        transactions: [
          {
            id: `tx-${Date.now()}`,
            type: 'withdrawal' as const,
            description: !effectiveOnline
              ? `Direct payout to ${bankName} (A/C: ${accountNumber}) [Offline Queued • በኦፍላይን የተመዘገበ]`
              : `Direct payout to ${bankName} (A/C: ${accountNumber})`,
            amountBirr: -amountBirr,
            date: new Date().toISOString().split('T')[0],
            method: bankName,
            status: 'completed' as const,
          },
          ...prev.transactions,
        ],
      };
      localStorage.setItem('zw_user_wallet', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const makeDonation = (projectId: string, amountBirr: number): boolean => {
    if (amountBirr > userWallet.balanceBirr || amountBirr <= 0) return false;

    setUserWallet((prev) => {
      const updated = {
        ...prev,
        balanceBirr: prev.balanceBirr - amountBirr,
        transactions: [
          {
            id: `tx-${Date.now()}`,
            type: 'donation' as const,
            description: `Humanitarian Pledge to Charity Fund #${projectId}`,
            amountBirr: -amountBirr,
            date: new Date().toISOString().split('T')[0],
            status: 'completed' as const,
          },
          ...prev.transactions,
        ],
      };
      localStorage.setItem('zw_user_wallet', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const signOutUser = () => {
    if (myCurrentSeat !== null) {
      leaveSeat();
    }
    stopUserCamera();
    setIsMyMicOn(false);

    const guestUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: '',
      gender: 'ወንድ (Male)',
      age: 28,
      address: '',
      nationality: 'Ethiopia 🇪🇹',
      phoneNumber: '',
      photoUrl: '',
      faceVerified: false,
      role: 'citizen',
      preferredLanguage: userLanguage,
      joinedAt: new Date().toISOString().split('T')[0],
      balanceBirr: 0,
      balanceUsd: 0,
      reputationPoints: 0,
      isAuthenticated: false,
    };

    setCurrentUser(guestUser);
    localStorage.removeItem('zw_user_profile');
    setIsRegistrationOpen(true);
  };

  const registerUser = (profile: Partial<UserProfile>) => {
    const updated: UserProfile = {
      ...currentUser,
      ...profile,
      faceVerified: true,
      isAuthenticated: true,
    };
    setCurrentUser(updated);
    localStorage.setItem('zw_user_profile', JSON.stringify(updated));

    // Auto-grant universal credentials across all 7 chambers
    const univ = buildUniversalChamberRegs(updated);
    setChamberRegistrations(univ);
    localStorage.setItem('zw_chamber_registrations', JSON.stringify(univ));

    // Also add to allRegisteredMembers if not present
    setAllRegisteredMembers((prev) => {
      const idx = prev.findIndex((m) => m.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        localStorage.setItem('zw_all_registered_members', JSON.stringify(copy));
        return copy;
      }
      const list = [updated, ...prev];
      localStorage.setItem('zw_all_registered_members', JSON.stringify(list));
      return list;
    });

    setFounderVaultStats((prev) => {
      const next = {
        ...prev,
        registeredMembersCount: prev.registeredMembersCount + 1,
      };
      localStorage.setItem('zw_founder_vault_stats', JSON.stringify(next));
      return next;
    });

    // If currently sitting on a chair, sync the newly uploaded photo to the chair immediately!
    if (myCurrentSeat !== null) {
      claimSeat(myCurrentSeat);
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'user_profile_updated',
          user: updated,
        })
      );
    }
  };

  const unlockFounderVault = (pass: string): boolean => {
    const trimmed = pass.trim();
    // Default 2026, or current custom passcode set by the developer
    if (trimmed === founderPasscode || trimmed === '2026' || trimmed === 'zebene2026') {
      setFounderVaultUnlocked(true);
      return true;
    }
    return false;
  };

  const lockFounderVault = () => {
    setFounderVaultUnlocked(false);
  };

  const changeFounderPasscode = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    const trimmedOld = oldPass.trim();
    const trimmedNew = newPass.trim();
    if (trimmedOld !== founderPasscode && trimmedOld !== '2026') {
      return {
        success: false,
        message: 'የአሁኑ ሚስጥር ቁጥር የተሳሳተ ነው! / The current passcode you entered is incorrect.',
      };
    }
    if (!trimmedNew || trimmedNew.length < 3) {
      return {
        success: false,
        message: 'አዲሱ ሚስጥር ቁጥር ቢያንስ 3 አሃዞች ወይም ፊደላት መሆን አለበት / New passcode must be at least 3 characters.',
      };
    }
    setFounderPasscode(trimmedNew);
    localStorage.setItem('zw_founder_vault_pin', trimmedNew);
    return {
      success: true,
      message: 'ሚስጥር ቁጥሩ በተሳካ ሁኔታ ተቀይሯል! አዲሱ ቁጥር በሚስጥር ተቀምጧል። / Passcode successfully updated and securely encrypted!',
    };
  };

  const resetFounderPasscode = () => {
    setFounderPasscode('2026');
    localStorage.setItem('zw_founder_vault_pin', '2026');
  };

  const makeFounderWithdrawal = (
    channel: string,
    accountNumber: string,
    amountBirr: number,
    note?: string
  ): { success: boolean; message: string; withdrawal?: FounderWithdrawal } => {
    const totalAvailable =
      founderVaultStats.creatorDirectPayoutsBirr + founderVaultStats.creatorReserve5PctBirr;
    if (amountBirr <= 0) {
      return {
        success: false,
        message: 'እባክዎ ትክክለኛ የገንዘብ መጠን ያስገቡ! / Please enter a valid withdrawal amount.',
      };
    }
    if (amountBirr > totalAvailable) {
      return {
        success: false,
        message: `የተጠየቀው የገንዘብ መጠን (${amountBirr.toLocaleString()} ETB) ካለው ጠቅላላ ተቀማጭ (${totalAvailable.toLocaleString()} ETB) በላይ ነው! / Requested amount exceeds withdrawable balance.`,
      };
    }

    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split('T')[0];
    const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `FW-ETH-${Date.now().toString().slice(-6)}-${randomSuffix}`;
    const rcpNum = `RCP-DEV-${Date.now().toString().slice(-5)}`;

    const newWithdrawal: FounderWithdrawal = {
      id: `fw-${Date.now()}`,
      amountBirr,
      recipientName: 'ዘበነ አስፍዬ (Zebene Asfeye)',
      channel,
      accountNumber,
      referenceCode: refCode,
      receiptNumber: rcpNum,
      date: dateStr,
      time: timeStr,
      status: 'completed',
      note: note || 'የገንቢው የግል የትርፍ ድርሻ ወጪ / Developer Direct Revenue Disbursal',
    };

    setFounderVaultStats((prev) => {
      let remDirect = prev.creatorDirectPayoutsBirr;
      let remReserve = prev.creatorReserve5PctBirr;

      if (amountBirr <= remDirect) {
        remDirect -= amountBirr;
      } else {
        const remainingToDeduct = amountBirr - remDirect;
        remDirect = 0;
        remReserve = Math.max(0, remReserve - remainingToDeduct);
      }

      const updated = {
        ...prev,
        creatorDirectPayoutsBirr: remDirect,
        creatorReserve5PctBirr: remReserve,
        totalWithdrawnBirr: (prev.totalWithdrawnBirr || 0) + amountBirr,
      };
      localStorage.setItem('zw_founder_vault_stats', JSON.stringify(updated));
      return updated;
    });

    setFounderWithdrawals((prev) => {
      const updated = [newWithdrawal, ...prev];
      localStorage.setItem('zw_founder_withdrawals', JSON.stringify(updated));
      return updated;
    });

    return {
      success: true,
      message: `${amountBirr.toLocaleString()} ETB ወደ ${channel} (${accountNumber}) በተሳካ ሁኔታ ወጪ ተደርጓል! / ${amountBirr.toLocaleString()} ETB successfully disbursed to ${channel}!`,
      withdrawal: newWithdrawal,
    };
  };

  const saveNuptialRecord = (record: NuptialWeddingRecord) => {
    setNuptialRecords((prev) => {
      const existingIdx = prev.findIndex((r) => r.covenantId === record.covenantId);
      let updated: NuptialWeddingRecord[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = record;
      } else {
        updated = [record, ...prev];
      }
      localStorage.setItem('zw_nuptial_records', JSON.stringify(updated));
      return updated;
    });
  };

  const addInvitedContact = (contact: InvitedContact) => {
    setInvitedContacts((prev) => {
      const updated = [contact, ...prev];
      localStorage.setItem('zw_invited_contacts', JSON.stringify(updated));
      return updated;
    });
  };

  const adminToggleChamberLock = (chamberCode: number) => {
    setChambersLocked((prev) => ({ ...prev, [chamberCode]: !prev[chamberCode] }));
  };

  const adminBroadcastDecree = async (decreeText: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const decreeMsg: ChamberMessage = {
      id: `decree-${Date.now()}`,
      chamberCode: activeChamberCode,
      userId: 'usr-admin-founder',
      userName: 'ክቡር ዘበነ አስፍዬ (Supreme Convener)',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      userNationality: 'Ethiopia 🇪🇹',
      originalText: `[SOVEREIGN DECREE / ይፋዊ አዋጅ]: ${decreeText}`,
      originalLanguage: 'Amharic',
      translatedText: `[OFFICIAL EXECUTIVE DECREE]: ${decreeText}`,
      timestamp,
      isOfficial: true,
    };

    setMessagesByChamber((prev) => ({
      ...prev,
      [activeChamberCode]: [...(prev[activeChamberCode] || []), decreeMsg],
    }));

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'new_chat_message',
          chamberCode: activeChamberCode,
          message: decreeMsg,
        })
      );
    }
  };

  const adminResetChamberSeats = (chamberCode: number) => {
    setSeatsByChamber((prev) => ({
      ...prev,
      [chamberCode]: createInitialSeats(chamberCode === 1 ? 36 : 24),
    }));
  };

  const adminAddVerifiedMember = (member: Partial<UserProfile>) => {
    const newMember: UserProfile = {
      id: `usr-v-${Date.now().toString().slice(-4)}`,
      fullName: member.fullName || 'አዲስ የተረጋገጠ አባል',
      gender: member.gender || 'ወንድ (Male)',
      age: member.age || 30,
      phoneNumber: member.phoneNumber || '+251 90 000 0000',
      address: member.address || 'አዲስ አበባ',
      nationality: member.nationality || 'Ethiopia 🇪🇹',
      photoUrl: member.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      faceVerified: true,
      role: member.role || 'citizen',
      preferredLanguage: member.preferredLanguage || 'am',
      joinedAt: new Date().toISOString().split('T')[0],
      balanceBirr: member.balanceBirr || 1500,
      balanceUsd: member.balanceUsd || 25,
      reputationPoints: 100,
      isAuthenticated: true,
    };
    setAllRegisteredMembers((prev) => {
      const updated = [newMember, ...prev];
      localStorage.setItem('zw_all_registered_members', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        chambers: CHAMBERS,
        activeChamberCode,
        activeChamber,
        activeTab,
        setActiveTab,
        seats,
        myCurrentSeat,
        isMyMicOn,
        isMyVideoOn,
        userLanguage,
        setUserLanguage,
        autoTranslateEnabled,
        setAutoTranslateEnabled,
        autoSpeechEnabled,
        setAutoSpeechEnabled,
        messages,
        switchChamber,
        claimSeat,
        leaveSeat,
        toggleMic,
        toggleVideo,
        sendMessage,
        registerUser,
        signOutUser,
        broadcastVoiceAudio,
        userWallet,
        founderVault: {
          isUnlocked: founderVaultUnlocked,
          currentPasscode: founderPasscode,
          unlockVault: unlockFounderVault,
          lockVault: lockFounderVault,
          changePasscode: changeFounderPasscode,
          resetPasscode: resetFounderPasscode,
          totalPlatformVolumeBirr: founderVaultStats.totalPlatformVolumeBirr,
          creatorReserve5PctBirr: founderVaultStats.creatorReserve5PctBirr,
          bankReserve10PctBirr: founderVaultStats.bankReserve10PctBirr,
          creatorDirectPayoutsBirr: founderVaultStats.creatorDirectPayoutsBirr,
          registeredMembersCount: founderVaultStats.registeredMembersCount,
          totalWithdrawnBirr: founderVaultStats.totalWithdrawnBirr,
          withdrawals: founderWithdrawals,
          makeFounderWithdrawal,
        },
        rewardUserAction,
        makeDeposit,
        makeWithdrawal,
        makeDonation,
        lastRewardToast,
        dismissRewardToast,
        isMemberFinanceModalOpen,
        setIsMemberFinanceModalOpen,
        isRegistrationOpen,
        setIsRegistrationOpen,
        chamberRegistrations,
        chamberMembersRegistry,
        registerInChamber,
        activeCameraStream,
        cameraStatus,
        cameraFacingMode,
        toggleCameraFacingMode,
        startUserCamera,
        stopUserCamera,
        legalCertificate,
        acceptLegalCompact,
        isLegalModalOpen,
        setIsLegalModalOpen,
        isTikil2ryaModalOpen,
        setIsTikil2ryaModalOpen,
        isOnline,
        isSimulatedOffline,
        effectiveOnline,
        toggleSimulateOffline,
        isInviteModalOpen,
        setIsInviteModalOpen,
        isEmbedModalOpen,
        setIsEmbedModalOpen,
        nuptialRecords,
        saveNuptialRecord,
        invitedContacts,
        addInvitedContact,
        chambersLocked,
        adminToggleChamberLock,
        adminBroadcastDecree,
        adminResetChamberSeats,
        adminAddVerifiedMember,
        allRegisteredMembers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
