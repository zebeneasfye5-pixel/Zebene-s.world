export type Language = 'en' | 'am' | 'om' | 'ti' | 'so' | 'ar' | 'fr' | 'es' | 'zh' | 'sw';

export interface UserProfile {
  id: string;
  fullName: string;
  gender?: string; // 'ወንድ (Male)' | 'ሴት (Female)'
  age?: number | string;
  phoneNumber: string;
  address?: string; // Address / City / Country
  nationality: string;
  photoUrl: string;
  faceVerified: boolean;
  role: 'citizen' | 'elder' | 'statesman' | 'peacekeeper' | 'founder';
  preferredLanguage: string;
  joinedAt: string;
  balanceBirr: number;
  balanceUsd: number;
  reputationPoints: number;
  isAuthenticated?: boolean;
}

export interface ChamberInfo {
  code: number;
  id: string;
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  icon: string;
  badge: string;
  color: string;
  isRestricted?: boolean;
}

export interface Seat {
  seatNumber: number;
  occupiedBy: {
    userId: string;
    userName: string;
    userNationality: string;
    userAvatar: string;
    gender?: string;
    age?: number | string;
    address?: string;
    isMuted: boolean;
    isVideoOn: boolean;
    isSpeaking: boolean;
    language: string;
    videoFrame?: string; // Live camera broadcast frame (base64 image)
  } | null;
}

export interface ChamberMessage {
  id: string;
  chamberCode: number;
  userId: string;
  userName: string;
  userAvatar: string;
  userNationality: string;
  originalText: string;
  originalLanguage: string;
  translatedText?: string;
  targetLanguage?: string;
  timestamp: string;
  isOfficial?: boolean;
  isOffline?: boolean;
}

export interface CharityProject {
  id: string;
  title: string;
  category: 'orphans' | 'extreme_poor' | 'elderly' | 'rural_infrastructure';
  description: string;
  targetBirr: number;
  raisedBirr: number;
  beneficiariesCount: number;
  location: string;
  imageUrl: string;
}

export interface BankAccount {
  type: 'CBE' | 'Telebirr' | 'Awash' | 'Dashen' | 'Swift' | 'PayPal';
  accountName: string;
  accountNumber: string;
  balanceBirr: number;
  balanceUsd: number;
}

export interface LoanApplication {
  id: string;
  applicantName: string;
  purpose: string;
  amountBirr: number;
  durationMonths: number;
  interestRate: number;
  status: 'approved' | 'under_review' | 'disbursed';
  date: string;
}

export interface TalentEntry {
  id: string;
  creatorName: string;
  title: string;
  category: 'music' | 'innovation' | 'poetry' | 'oratory' | 'craft';
  votes: number;
  rewardPoolBirr: number;
  country: string;
  videoPreviewUrl: string;
}

export interface MarriageCovenant {
  covenantId: string;
  partnerOneName: string;
  partnerTwoName: string;
  elderNames: string[];
  witnessNames: string[];
  date: string;
  tradition: string;
  covenantTerms: string;
  signatures: {
    partnerOne: string | null;
    partnerTwo: string | null;
    elder: string | null;
    witness: string | null;
  };
}

export interface ChamberMemberRegistration {
  badgeId: string;
  chamberCode: number;
  userId: string;
  fullName: string;
  nationality: string;
  photoUrl: string;
  registeredRole: string;
  chamberSpecificData: Record<string, string>;
  registrationDate: string;
  isVerified: boolean;
}

export interface LegalComplianceCertificate {
  certificateId: string;
  userId: string;
  userName: string;
  nationality: string;
  agreedAt: string;
  jurisdiction: string;
  digitalSignatureHash: string;
  termsVersion: string;
  isCertified: boolean;
}

export interface LegalArticle {
  id: string;
  articleNumber: number;
  title: string;
  amharicTitle: string;
  category: 'human_rights' | 'cybercrime' | 'financial_aml' | 'civil_contracts' | 'intellectual_property' | 'privacy_data' | 'jurisdiction';
  internationalTreatyReference: string;
  summary: string;
  amharicSummary: string;
  fullProvisions: string[];
  amharicProvisions: string[];
  legalConsequences: string;
  amharicConsequences: string;
  icon: string;
}

export type PlatformTab = 'chamber' | 'learning' | 'games_lottery' | 'charity' | 'banking_economy' | 'governance' | 'legal_compliance' | 'tikil_2rya';



