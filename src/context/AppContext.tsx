import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Seat, ChamberMessage, ChamberInfo } from '../types';
import { CHAMBERS } from '../data/chambers';
import { translateText, checkSecurityAndPeace } from '../services/api';
import { speakText } from '../services/speech';

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'donation' | 'lottery_win' | 'loan_disbursement';
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
  activeTab: 'chamber' | 'learning' | 'games_lottery' | 'charity' | 'banking_economy' | 'governance';
  setActiveTab: (tab: 'chamber' | 'learning' | 'games_lottery' | 'charity' | 'banking_economy' | 'governance') => void;
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
  userWallet: {
    balanceBirr: number;
    balanceUsd: number;
    lifetimeEarnedBirr: number;
    transactions: Transaction[];
  };
  founderVault: {
    isUnlocked: boolean;
    unlockVault: (pass: string) => boolean;
    lockVault: () => void;
    totalPlatformVolumeBirr: number;
    creatorReserve5PctBirr: number;
    bankReserve10PctBirr: number;
    creatorDirectPayoutsBirr: number;
    registeredMembersCount: number;
  };
  rewardUserAction: (actionType: 'like' | 'share' | 'speak' | 'game' | 'host') => void;
  makeWithdrawal: (bankName: string, accountNumber: string, amountBirr: number) => boolean;
  makeDonation: (projectId: string, amountBirr: number) => boolean;
  isRegistrationOpen: boolean;
  setIsRegistrationOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Generate initial seats for chambers
function createInitialSeats(count: number = 32): Seat[] {
  const sampleParticipants = [
    { name: 'Zebene Asfaw (Founder)', nationality: 'Ethiopia 🇪🇹', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', lang: 'Amharic', seatNum: 1 },
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
  const [activeTab, setActiveTab] = useState<'chamber' | 'learning' | 'games_lottery' | 'charity' | 'banking_economy' | 'governance'>('chamber');
  const [userLanguage, setUserLanguage] = useState<string>('en');
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState<boolean>(true);
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState<boolean>(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);

  // Hardware states
  const [myCurrentSeat, setMyCurrentSeat] = useState<number | null>(null);
  const [isMyMicOn, setIsMyMicOn] = useState<boolean>(false);
  const [isMyVideoOn, setIsMyVideoOn] = useState<boolean>(true);

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

  // ISOLATED chat messages per chamber (requirement: strict isolation)
  const [messagesByChamber, setMessagesByChamber] = useState<Record<number, ChamberMessage[]>>({
    1: [
      {
        id: 'msg-1-1',
        chamberCode: 1,
        userId: 'usr-zebene',
        userName: 'Zebene Asfaw (Founder)',
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
  });

  // User wallet state
  const [userWallet, setUserWallet] = useState<{
    balanceBirr: number;
    balanceUsd: number;
    lifetimeEarnedBirr: number;
    transactions: Transaction[];
  }>({
    balanceBirr: 3450.0,
    balanceUsd: 62.7,
    lifetimeEarnedBirr: 5800.0,
    transactions: [
      { id: 'tx-1', type: 'earning', description: 'Chamber 1 Dialogue Participation Reward', amountBirr: 150.0, date: '2026-10-08', status: 'completed' },
      { id: 'tx-2', type: 'earning', description: 'Content Sharing & Global Community Engagement', amountBirr: 85.0, date: '2026-10-07', status: 'completed' },
      { id: 'tx-3', type: 'withdrawal', description: 'Withdrawal to Commercial Bank of Ethiopia (CBE)', amountBirr: -1000.0, date: '2026-10-06', method: 'CBE Birr', status: 'completed' },
      { id: 'tx-4', type: 'earning', description: 'Daily Knowledge Quiz Champion Reward', amountBirr: 300.0, date: '2026-10-05', status: 'completed' },
    ],
  });

  // Private Founder Vault (Secretly secured with PIN/Passcode as dictated in prompt!)
  const [founderVaultUnlocked, setFounderVaultUnlocked] = useState(false);
  const [founderVaultStats, setFounderVaultStats] = useState({
    totalPlatformVolumeBirr: 4892000.0,
    creatorReserve5PctBirr: 244600.0,
    bankReserve10PctBirr: 489200.0,
    creatorDirectPayoutsBirr: 875000.0,
    registeredMembersCount: 28410,
  });

  const activeChamber = CHAMBERS.find((c) => c.code === activeChamberCode) || CHAMBERS[0];
  const seats = seatsByChamber[activeChamberCode] || [];
  const messages = messagesByChamber[activeChamberCode] || [];

  // Key press listener for 1 to 7 quick dialing!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
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
    }
  };

  const claimSeat = (seatNumber: number) => {
    setSeatsByChamber((prev) => {
      const currentChamberSeats = [...(prev[activeChamberCode] || [])];
      // Free any seat previously held by user in this chamber
      const updated = currentChamberSeats.map((seat) => {
        if (seat.occupiedBy?.userId === currentUser.id) {
          return { ...seat, occupiedBy: null };
        }
        if (seat.seatNumber === seatNumber) {
          return {
            ...seat,
            occupiedBy: {
              userId: currentUser.id,
              userName: currentUser.fullName,
              userNationality: currentUser.nationality,
              userAvatar: currentUser.photoUrl,
              isMuted: !isMyMicOn,
              isVideoOn: isMyVideoOn,
              isSpeaking: false,
              language: userLanguage,
            },
          };
        }
        return seat;
      });
      return { ...prev, [activeChamberCode]: updated };
    });
    setMyCurrentSeat(seatNumber);
    rewardUserAction('speak');
  };

  const leaveSeat = () => {
    if (myCurrentSeat === null) return;
    setSeatsByChamber((prev) => {
      const currentChamberSeats = [...(prev[activeChamberCode] || [])];
      const updated = currentChamberSeats.map((seat) => {
        if (seat.seatNumber === myCurrentSeat) {
          return { ...seat, occupiedBy: null };
        }
        return seat;
      });
      return { ...prev, [activeChamberCode]: updated };
    });
    setMyCurrentSeat(null);
  };

  const toggleMic = () => {
    setIsMyMicOn((prev) => {
      const next = !prev;
      // Sync seat audio state
      if (myCurrentSeat !== null) {
        setSeatsByChamber((old) => ({
          ...old,
          [activeChamberCode]: (old[activeChamberCode] || []).map((s) =>
            s.seatNumber === myCurrentSeat && s.occupiedBy
              ? { ...s, occupiedBy: { ...s.occupiedBy, isMuted: !next, isSpeaking: next } }
              : s
          ),
        }));
      }
      return next;
    });
  };

  const toggleVideo = () => {
    setIsMyVideoOn((prev) => {
      const next = !prev;
      if (myCurrentSeat !== null) {
        setSeatsByChamber((old) => ({
          ...old,
          [activeChamberCode]: (old[activeChamberCode] || []).map((s) =>
            s.seatNumber === myCurrentSeat && s.occupiedBy
              ? { ...s, occupiedBy: { ...s.occupiedBy, isVideoOn: next } }
              : s
          ),
        }));
      }
      return next;
    });
  };

  // Automated translation & messaging
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Run security peace scan
    const moderation = await checkSecurityAndPeace(text, activeChamberCode);
    if (!moderation.safe) {
      alert(`Safety Shield: Message contains sensitive or prohibited language (${moderation.flag}). Please keep discourse peaceful.`);
      return;
    }

    // Auto-translate to target language
    let translated = text;
    if (autoTranslateEnabled) {
      translated = await translateText(text, 'Auto', userLanguage === 'am' ? 'Amharic' : 'English');
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
    };

    setMessagesByChamber((prev) => ({
      ...prev,
      [activeChamberCode]: [...(prev[activeChamberCode] || []), newMsg],
    }));

    // Reward for active discourse
    rewardUserAction('speak');

    // Text to Speech playback if enabled
    if (autoSpeechEnabled && translated) {
      speakText(translated, userLanguage);
    }
  };

  // Activity rewards & revenue sharing
  const rewardUserAction = (actionType: 'like' | 'share' | 'speak' | 'game' | 'host') => {
    let grossReward = 0;
    let desc = '';
    switch (actionType) {
      case 'like':
        grossReward = 5.0;
        desc = 'Community Engagement & Interaction Upvote';
        break;
      case 'share':
        grossReward = 15.0;
        desc = 'Global Platform Sharing & Viral Invitation';
        break;
      case 'speak':
        grossReward = 20.0;
        desc = 'Constructive Chamber Dialogue Contribution';
        break;
      case 'game':
        grossReward = 50.0;
        desc = 'Knowledge Arena High Score Achievement';
        break;
      case 'host':
        grossReward = 100.0;
        desc = 'Chamber Session Moderation & Assembly Leadership';
        break;
    }

    // Revenue distribution formula per user request:
    // 10% for Banking reserve fees, 5% for Developer/Founder reserve, 85% net user earning
    const bankReserve = grossReward * 0.10;
    const founderReserve = grossReward * 0.05;
    const netUserEarning = grossReward * 0.85;

    setUserWallet((prev) => ({
      ...prev,
      balanceBirr: prev.balanceBirr + netUserEarning,
      lifetimeEarnedBirr: prev.lifetimeEarnedBirr + netUserEarning,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'earning',
          description: `${desc} (Net 85% + 10% Bank + 5% Reserve deducted)`,
          amountBirr: netUserEarning,
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
        },
        ...prev.transactions.slice(0, 30),
      ],
    }));

    // Increment founder stats silently
    setFounderVaultStats((prev) => ({
      ...prev,
      totalPlatformVolumeBirr: prev.totalPlatformVolumeBirr + grossReward,
      bankReserve10PctBirr: prev.bankReserve10PctBirr + bankReserve,
      creatorReserve5PctBirr: prev.creatorReserve5PctBirr + founderReserve,
      creatorDirectPayoutsBirr: prev.creatorDirectPayoutsBirr + (grossReward * 0.02), // builder bonus
    }));
  };

  const makeWithdrawal = (bankName: string, accountNumber: string, amountBirr: number): boolean => {
    if (amountBirr > userWallet.balanceBirr || amountBirr <= 0) return false;

    setUserWallet((prev) => ({
      ...prev,
      balanceBirr: prev.balanceBirr - amountBirr,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'withdrawal',
          description: `Direct payout to ${bankName} (A/C: ${accountNumber})`,
          amountBirr: -amountBirr,
          date: new Date().toISOString().split('T')[0],
          method: bankName,
          status: 'completed',
        },
        ...prev.transactions,
      ],
    }));
    return true;
  };

  const makeDonation = (projectId: string, amountBirr: number): boolean => {
    if (amountBirr > userWallet.balanceBirr || amountBirr <= 0) return false;

    setUserWallet((prev) => ({
      ...prev,
      balanceBirr: prev.balanceBirr - amountBirr,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'donation',
          description: `Humanitarian Pledge to Charity Fund #${projectId}`,
          amountBirr: -amountBirr,
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
        },
        ...prev.transactions,
      ],
    }));
    return true;
  };

  const registerUser = (profile: Partial<UserProfile>) => {
    const updated = { ...currentUser, ...profile, faceVerified: true };
    setCurrentUser(updated);
    localStorage.setItem('zw_user_profile', JSON.stringify(updated));
    setFounderVaultStats((prev) => ({
      ...prev,
      registeredMembersCount: prev.registeredMembersCount + 1,
    }));
  };

  const unlockFounderVault = (pass: string): boolean => {
    // Secret founder access code
    if (pass === 'zebene2026' || pass === 'zebene' || pass === 'admin123') {
      setFounderVaultUnlocked(true);
      return true;
    }
    return false;
  };

  const lockFounderVault = () => {
    setFounderVaultUnlocked(false);
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
        userWallet,
        founderVault: {
          isUnlocked: founderVaultUnlocked,
          unlockVault: unlockFounderVault,
          lockVault: lockFounderVault,
          totalPlatformVolumeBirr: founderVaultStats.totalPlatformVolumeBirr,
          creatorReserve5PctBirr: founderVaultStats.creatorReserve5PctBirr,
          bankReserve10PctBirr: founderVaultStats.bankReserve10PctBirr,
          creatorDirectPayoutsBirr: founderVaultStats.creatorDirectPayoutsBirr,
          registeredMembersCount: founderVaultStats.registeredMembersCount,
        },
        rewardUserAction,
        makeWithdrawal,
        makeDonation,
        isRegistrationOpen,
        setIsRegistrationOpen,
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
