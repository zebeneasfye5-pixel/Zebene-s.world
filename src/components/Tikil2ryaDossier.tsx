import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TIKIL_2RYA_MULTILINGUAL_PURPOSE,
  STRICT_CRIMINAL_ACCOUNTABILITY_DIRECTIVES,
  FOUR_TIER_PENALTY_MATRIX,
  CriminalDirectiveViolation,
} from '../data/tikil2ryaData';
import { GlobalEmblem } from './GlobalEmblem';
import { speakText, stopSpeaking } from '../services/speech';
import {
  Folder,
  FolderOpen,
  Key,
  Globe2,
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileCheck,
  UserX,
  Volume2,
  VolumeX,
  Search,
  AlertTriangle,
  Flame,
  Users,
  Lock,
  Landmark,
  Eye,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Tikil2ryaDossierProps {
  onNavigateToTreaty?: () => void;
  isModalView?: boolean;
  onCloseModal?: () => void;
}

export const Tikil2ryaDossier: React.FC<Tikil2ryaDossierProps> = ({
  onNavigateToTreaty,
  isModalView = false,
  onCloseModal,
}) => {
  const { userLanguage, legalCertificate, acceptLegalCompact, setActiveTab } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'purpose' | 'criminal_directives' | 'matrix' | 'pledge'>('purpose');
  const [bilingualMode, setBilingualMode] = useState<'bilingual' | 'amharic' | 'english'>('bilingual');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    TIKIL_2RYA_MULTILINGUAL_PURPOSE[userLanguage] ? userLanguage : 'am'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeViolationId, setActiveViolationId] = useState<string>(
    STRICT_CRIMINAL_ACCOUNTABILITY_DIRECTIVES[0].id
  );
  const [pledgeSigned, setPledgeSigned] = useState<boolean>(false);

  const currentPurpose = TIKIL_2RYA_MULTILINGUAL_PURPOSE[selectedLanguage] || TIKIL_2RYA_MULTILINGUAL_PURPOSE['am'];
  const englishPurpose = TIKIL_2RYA_MULTILINGUAL_PURPOSE['en'];
  const amharicPurpose = TIKIL_2RYA_MULTILINGUAL_PURPOSE['am'];

  const handleSpeak = (id: string, text: string, lang = 'am') => {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    speakText(text, lang);
  };

  const handleSignPledge = () => {
    acceptLegalCompact();
    setPledgeSigned(true);
    setTimeout(() => setPledgeSigned(false), 5000);
  };

  const filteredViolations = STRICT_CRIMINAL_ACCOUNTABILITY_DIRECTIVES.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.amharicTitle.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.amharicDescription.toLowerCase().includes(q) ||
      v.internationalLawBasis.toLowerCase().includes(q)
    );
  });

  const getSeverityBadge = (level: 1 | 2 | 3 | 4) => {
    switch (level) {
      case 1:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> ደረጃ 1 (Level 1: Minor Breach)
          </span>
        );
      case 2:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-orange-400" /> ደረጃ 2 (Level 2: Moderate Violation)
          </span>
        );
      case 3:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
            <Flame className="w-3 h-3 text-rose-400" /> ደረጃ 3 (Level 3: Severe Crime & Fraud)
          </span>
        );
      case 4:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600/30 text-red-300 border border-red-500/60 shadow-md shadow-red-500/20 flex items-center gap-1 animate-pulse">
            <UserX className="w-3 h-3 text-red-400" /> ደረጃ 4 (Level 4: Universal High Crime)
          </span>
        );
    }
  };

  const languagesList = [
    { code: 'am', label: 'አማርኛ (Amharic)', flag: '🇪🇹' },
    { code: 'en', label: 'English (ዓለም አቀፍ)', flag: '🌐' },
    { code: 'om', label: 'Afaan Oromoo', flag: '🇪🇹' },
    { code: 'ti', label: 'ትግርኛ (Tigrinya)', flag: '🇪🇹' },
    { code: 'so', label: 'Soomaali (Somali)', flag: '🇸🇴' },
    { code: 'ar', label: 'العربية (Arabic)', flag: '🇸🇦' },
    { code: 'fr', label: 'Français (French)', flag: '🇫🇷' },
    { code: 'es', label: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'zh', label: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'sw', label: 'Kiswahili (Swahili)', flag: '🇰🇪' },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Grand Top Banner for "ጥቅል መመሪያ" */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 shadow-2xl shadow-amber-500/10">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-slate-950 text-xs font-black tracking-wider flex items-center space-x-1.5 shadow-lg shadow-amber-500/20">
                <FolderOpen className="w-4 h-4 text-slate-950 fill-slate-950" />
                <Key className="w-3.5 h-3.5 text-slate-950" />
                <span>የፈልደር ቁልፍ: ጥቅል መመሪያ (FOLDER KEY: TIKIL MEMERIYA)</span>
              </div>

              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                ዓለም አቀፍ የሕግና የወንጀል ተጠያቂነት መመሪያ
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                በ10 የዓለም ቋንቋዎች ተደራሽ
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>ጥቅል መመሪያ • ዓላማና ዓለም አቀፍ የወንጀል ተጠያቂነት</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              ይህ ይፋዊ የፈልደር ቁልፍ <span className="text-amber-300 font-bold">«ጥቅል መመሪያ»</span> የዚህን ድህረገፅና መተግበሪያ አጠቃላይ ዋና ዓላማ ከ7ቱ ክፍሎች ተግባር ጋር በማስተሳሰር በሁሉም ቋንቋዎች ያብራራል፤ እንዲሁም በፌክ አካውንት ማጭበርበር፣ ስም ማጥፋት፣ ማስፈራራት፣ መሳደብ፣ ለዘረኝነት ወይም ለተለየ ቡድንና ለግል ጥቅም ብቻ የሚደረጉ አላስፈላጊ የቃላትና የድርጊት አካሄዶችን በሙሉ በዓለም አቀፍ ወንጀል ተጠያቂ የሚያደርግ አስገዳጅ መመሪያ ይዟል።
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <button
              onClick={() =>
                handleSpeak(
                  'tikil-top',
                  'የፈልደር ቁልፍ ጥቅል መመሪያ። የዚህ ድህረገፅና መተግበሪያ ዋና ዓላማ ሰብአዊነትን፣ ፍቅርንና እውነተኛ ፍትህን ማስተሳሰር ነው። በፌክ አካውንት ማጭበርበር፣ ስም ማጥፋት፣ ማስፈራራት፣ መሳደብ፣ ዘረኝነት እና ለቡድን ወይም ለግል ጥቅም የሚደረግ ማናቸውም አላስፈላጊ አካሄድ በዓለም አቀፍ ወንጀል ያስቀጣል።',
                  'am'
                )
              }
              className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md"
              title="Listen in Audio"
            >
              {speakingId === 'tikil-top' ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-400" />
                  <span>ድምፅ አቁም</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>መመሪያውን አዳምጥ (Listen)</span>
                </>
              )}
            </button>

            {legalCertificate?.isCertified ? (
              <div className="px-4 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ውሉ የጸደቀ ዜጋ ✓</span>
              </div>
            ) : (
              <button
                onClick={handleSignPledge}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <FileCheck className="w-4 h-4 text-slate-950" />
                <span>ጥቅል መመሪያን ፈርም (Sign Directive)</span>
              </button>
            )}

            {isModalView && onCloseModal && (
              <button
                onClick={onCloseModal}
                className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                ዝጋ (Close)
              </button>
            )}
          </div>
        </div>

        {/* Global treaty icons footer in banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Budapest Convention ETS 185
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Scale className="w-4 h-4 text-amber-400" /> UN ICCPR Art. 17, 20 & CERD
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-4 h-4 text-indigo-400" /> ICC Rome Statute Art. 7
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Landmark className="w-4 h-4 text-teal-400" /> Interpol Cyber Forensics Protocol
            </span>
          </div>

          <div className="text-[11px] text-amber-300/80 font-mono">
            መለያ ኮድ: TIKIL-MEMERIYA-GLOBAL-DISCIPLINE-2026
          </div>
        </div>
      </div>

      {pledgeSigned && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-200 text-sm flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-extrabold">የጥቅል መመሪያ ቃል ኪዳንና ዓለም አቀፍ የህግ ተገዢነት ውል በተሳካ ሁኔታ ተፈርሟል!</p>
              <p className="text-xs text-emerald-300">
                የዲጂታል ሰርተፊኬት ቁጥርዎ: {legalCertificate?.certificateId || 'CERT-TIKIL-MEMERIYA-ACTIVE'} በዓለም አቀፍ መዝገብ ሰፍሯል።
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Section Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveTabLocal('purpose')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'purpose'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>1. ዋና ዓላማ በሁሉም ቋንቋዎች (Grand Purpose in 10 Languages)</span>
          </button>

          <button
            onClick={() => setActiveTabLocal('criminal_directives')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'criminal_directives'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>2. የዓለም አቀፍ ወንጀል ተጠያቂነት መመሪያ (Criminal Accountability Directives)</span>
          </button>

          <button
            onClick={() => setActiveTabLocal('matrix')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. የቅጣት ደረጃ ማትሪክስ (4-Tier Penalty Matrix)</span>
          </button>

          <button
            onClick={() => setActiveTabLocal('pledge')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'pledge'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>4. ቃል ኪዳንና ይፋዊ ማረጋገጫ (Official Digital Pledge)</span>
          </button>
        </div>

        {onNavigateToTreaty && (
          <button
            onClick={onNavigateToTreaty}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold whitespace-nowrap border border-slate-700"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>ወደ 7ቱ ህግጋትና አጠቃቀም መመሪያ ሂድ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* SECTION 1: GRAND PURPOSE IN ALL LANGUAGES */}
      {activeTab === 'purpose' && (
        <div className="space-y-6 animate-fade-in">
          {/* Language Selector Ribbon */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200">
                  ቋንቋ ይምረጡ (Select Language to Read the Complete Purpose):
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                የተመረጠው ቋንቋ: <strong className="text-amber-300">{currentPurpose.nativeName} ({currentPurpose.langName})</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-slate-950 font-extrabold shadow-md'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Multilingual Purpose Main Content Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                  ይፋዊ ቻርተር • SOVEREIGN PURPOSE DECLARATION
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white">{currentPurpose.title}</h2>
                <p className="text-xs sm:text-sm text-indigo-300 font-medium italic">
                  "{currentPurpose.motto}"
                </p>
              </div>

              <button
                onClick={() =>
                  handleSpeak(
                    `purpose-${currentPurpose.langCode}`,
                    `${currentPurpose.title}. ${currentPurpose.overview}. ${currentPurpose.foundingPhilosophy}`,
                    currentPurpose.langCode
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-2 flex-shrink-0"
              >
                {speakingId === `purpose-${currentPurpose.langCode}` ? (
                  <>
                    <VolumeX className="w-4 h-4 text-amber-400" />
                    <span>ድምፅ አቁም</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>በዚህ ቋንቋ አዳምጥ (Listen)</span>
                  </>
                )}
              </button>
            </div>

            {/* Overview & Founding Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  አጠቃላይ ይዘትና የሰው ልጆች ውህደት (Comprehensive Overview)
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentPurpose.overview}
                </p>
                {bilingualMode === 'bilingual' && selectedLanguage !== 'en' && englishPurpose && (
                  <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-2 italic">
                    <strong className="text-indigo-400 not-italic">English Translation:</strong> {englishPurpose.overview}
                  </p>
                )}
                {bilingualMode === 'bilingual' && selectedLanguage === 'en' && amharicPurpose && (
                  <p className="text-xs text-amber-200/90 leading-relaxed border-t border-slate-900 pt-2">
                    <strong className="text-amber-400">የአማርኛ ትርጉም:</strong> {amharicPurpose.overview}
                  </p>
                )}
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-extrabold text-indigo-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  የመስራቹ የፍልስፍና መነሻ (Founding Philosophy & Core Ethics)
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentPurpose.foundingPhilosophy}
                </p>
                {bilingualMode === 'bilingual' && selectedLanguage !== 'en' && englishPurpose && (
                  <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-2 italic">
                    <strong className="text-indigo-400 not-italic">English Philosophy:</strong> {englishPurpose.foundingPhilosophy}
                  </p>
                )}
                {bilingualMode === 'bilingual' && selectedLanguage === 'en' && amharicPurpose && (
                  <p className="text-xs text-indigo-200/90 leading-relaxed border-t border-slate-900 pt-2">
                    <strong className="text-indigo-400">የአማርኛ ፍልስፍና:</strong> {amharicPurpose.foundingPhilosophy}
                  </p>
                )}
              </div>
            </div>

            {/* The 7 Chambers and How They Serve The Purpose */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  የ7ቱ ክፍሎች ተግባር እና ከዋናው ዓላማ ጋር ያለው ትስስር (The 7 Sovereign Chambers)
                </h3>
                <span className="text-xs text-slate-400">ከ1 እስከ 7 ክፍሎች</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPurpose.chambersRole.map((ch) => (
                  <div
                    key={ch.chamberCode}
                    className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 space-y-2 transition-all hover:bg-slate-950"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-black">
                        #{ch.chamberCode}
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab('chamber');
                        }}
                        className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-0.5"
                      >
                        ክፍሉን ክፈት <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{ch.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{ch.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The 3 Sovereign Pillars */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                ዋና ዋና ምሰሶዎች (Core Foundation Pillars)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentPurpose.pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2"
                  >
                    <h4 className="text-xs font-extrabold text-amber-300">{p.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: STRICT CRIMINAL ACCOUNTABILITY DIRECTIVES */}
      {activeTab === 'criminal_directives' && (
        <div className="space-y-6 animate-fade-in">
          {/* Warning Banner on Legal Enforcement */}
          <div className="bg-rose-950/40 border-2 border-rose-500/50 rounded-2xl p-5 text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  አስገዳጅ የዓለም አቀፍ የወንጀልና የሳይበር ሕግ ተጠያቂነት መመሪያ
                </h3>
                <p className="text-xs text-rose-300 mt-1 leading-relaxed">
                  በዚህ ድህረገፅና መተግበሪያ ላይ የሚደረግ ማንኛውም እንቅስቃሴ በዓለም አቀፍ የሳይበር ወንጀል ህግ (Budapest Convention ETS 185)፣ በሰብአዊ መብቶች ስምምነት (ICCPR) እና በዓለም አቀፍ የወንጀል ፍርድ ቤት (ICC) ድንጋጌዎች ስር የተገዛ ነው። ማንም ሰው በሀሰት ስም ወይም ከአገር ውጭ በመሆኑ ከህግ አያመልጥም።
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                handleSpeak(
                  'warn-all',
                  'አስገዳጅ የዓለም አቀፍ የወንጀል ተጠያቂነት መመሪያ። በፌክ አካውንት ማጭበርበር፣ ስም ማጥፋት፣ ማስፈራራት፣ መሳደብ፣ ለዘረኝነት ወይም ለተለየ ቡድንና የግል ጥቅም ብቻ አላስፈላጊ አካሄድ መተግበር በከባድ ዓለም አቀፍ ወንጀል ያስቀጣል።',
                  'am'
                )
              }
              className="px-3.5 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 border border-rose-500 text-xs font-bold text-white flex items-center space-x-2 flex-shrink-0"
            >
              {speakingId === 'warn-all' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>መመሪያውን አዳምጥ</span>
            </button>
          </div>

          {/* Category Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                ሁሉንም ጥፋቶች አሳይ (All 6 Directives)
              </button>
              <button
                onClick={() => setSelectedCategory('fake_accounts')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'fake_accounts'
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                1. ፌክ አካውንትና ማጭበርበር
              </button>
              <button
                onClick={() => setSelectedCategory('defamation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'defamation'
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                2. ስም ማጥፋትና ውንጀላ
              </button>
              <button
                onClick={() => setSelectedCategory('intimidation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'intimidation'
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                3. ማስፈራራትና ዛቻ
              </button>
              <button
                onClick={() => setSelectedCategory('abusive_language')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'abusive_language'
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                4. መሳደብና ጸያፍ ቃላት
              </button>
              <button
                onClick={() => setSelectedCategory('racism_tribalism')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'racism_tribalism'
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                5. ዘረኝነትና የጎሳ ጥላቻ
              </button>
              <button
                onClick={() => setSelectedCategory('factional_selfish_gain')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'factional_selfish_gain'
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                6. ለቡድንና ለግል ጥቅም መሻት
              </button>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {/* Bilingual Display Mode Toggle for Directives */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-[11px]">
                <button
                  onClick={() => setBilingualMode('bilingual')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    bilingualMode === 'bilingual' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Bilingual: View Amharic and English side-by-side"
                >
                  🌐 ሁለትዮሽ (Dual)
                </button>
                <button
                  onClick={() => setBilingualMode('amharic')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    bilingualMode === 'amharic' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  አማርኛ
                </button>
                <button
                  onClick={() => setBilingualMode('english')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    bilingualMode === 'english' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="relative w-full sm:w-56 flex-shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="በጥፋት ወይም በህግ ፈልግ..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* List of Criminal Accountability Directives */}
          <div className="space-y-5">
            {filteredViolations.map((v) => (
              <div
                key={v.id}
                className="bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 space-y-5 shadow-xl transition-all"
              >
                {/* Header of Directive */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {getSeverityBadge(v.severityLevel)}
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                        {v.id}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white">{v.amharicTitle}</h3>
                    <p className="text-xs text-slate-400">{v.title}</p>
                  </div>

                  <button
                    onClick={() =>
                      handleSpeak(
                        v.id,
                        `${v.amharicTitle}. ${v.amharicDescription}. የዓለም አቀፍ ህግ መሰረት፡ ${v.internationalLawBasis}.`,
                        'am'
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 flex-shrink-0"
                  >
                    {speakingId === v.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                        <span>አቁም</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>አዳምጥ (Listen)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Core Description & Treaty Grounding */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {v.amharicDescription}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed italic">{v.description}</p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300">
                    <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>
                      <strong>የዓለም አቀፍ ህግ ድንጋጌ (Statutory Law Basis):</strong> {v.internationalLawBasis}
                    </span>
                  </div>
                </div>

                {/* Prohibited Actions vs Penalties Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Prohibited Actions */}
                  <div className="bg-slate-950/50 border border-rose-500/20 rounded-xl p-4 space-y-2.5">
                    <h4 className="text-xs font-extrabold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      የተከለከሉ ዝርዝር ድርጊቶች (Explicit Prohibitions)
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {v.amharicProhibitedActions.map((act, i) => {
                        const englishAct = v.prohibitedActions[i];
                        return (
                          <li key={i} className="flex items-start gap-2 border-b border-slate-900/60 pb-1.5 last:border-0">
                            <span className="text-rose-400 font-bold">•</span>
                            <div className="space-y-0.5">
                              {bilingualMode !== 'english' && (
                                <p className="text-slate-200">{act}</p>
                              )}
                              {bilingualMode !== 'amharic' && englishAct && (
                                <p className="text-slate-400 text-[11px] italic">
                                  {englishAct}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* International Penalties & Consequences */}
                  <div className="bg-slate-950/50 border border-amber-500/20 rounded-xl p-4 space-y-2.5">
                    <h4 className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      የቅጣት እርምጃዎችና የህግ ተጠያቂነት (Penalties & Consequences)
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {v.amharicPenaltiesAndConsequences.map((pen, i) => {
                        const englishPen = v.penaltiesAndConsequences[i];
                        return (
                          <li key={i} className="flex items-start gap-2 border-b border-slate-900/60 pb-1.5 last:border-0">
                            <span className="text-amber-400 font-bold">✓</span>
                            <div className="space-y-0.5">
                              {bilingualMode !== 'english' && (
                                <p className="text-slate-200">{pen}</p>
                              )}
                              {bilingualMode !== 'amharic' && englishPen && (
                                <p className="text-slate-400 text-[11px] italic">
                                  {englishPen}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Forensics and Evidence Trail */}
                <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      {bilingualMode !== 'english' && (
                        <span>
                          <strong>የማስረጃ ፎረንሲክስ መመርመሪያ:</strong> {v.amharicInvestigationMethod}
                        </span>
                      )}
                      {bilingualMode === 'bilingual' && <span className="block text-slate-500 text-[11px]">{v.investigationMethod}</span>}
                      {bilingualMode === 'english' && (
                        <span>
                          <strong>Forensic Investigation:</strong> {v.investigationMethod}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 shrink-0">ኢንተርፖል ተባባሪ ✓ (Interpol & Legal Rails)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: 4-TIER PENALTY MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  እንደ ጥፋቱ ሁኔታና ደረጃ፡አይነት የተከፋፈለ የቅጣት ማትሪክስ
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Four-Tier Graded Sanction Matrix (ከደረጃ 1 እስከ ደረጃ 4)
                </p>
              </div>

              <button
                onClick={() =>
                  handleSpeak(
                    'matrix-all',
                    'እንደ ጥፋቱ ደረጃ የሚወሰዱ እርምጃዎች። ደረጃ 1 ማስጠንቀቂያና የድምፅ እገዳ። ደረጃ 2 ጊዜያዊ እገዳና የካሳ ቅጣት። ደረጃ 3 ቋሚ ስንብትና የሀብት እገዳ። ደረጃ 4 ዓለም አቀፍ የወንጀል ተጠያቂነትና የኢንተርፖል ሪፖርት።',
                    'am'
                  )
                }
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-2"
              >
                {speakingId === 'matrix-all' ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                <span>ደረጃዎቹን አዳምጥ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FOUR_TIER_PENALTY_MATRIX.map((tier) => (
                <div
                  key={tier.tierLevel}
                  className={`rounded-2xl p-6 space-y-4 border transition-all ${
                    tier.tierLevel === 1
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : tier.tierLevel === 2
                      ? 'bg-orange-950/20 border-orange-500/40'
                      : tier.tierLevel === 3
                      ? 'bg-rose-950/30 border-rose-500/50'
                      : 'bg-red-950/40 border-red-500/70 shadow-lg shadow-red-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-white">
                      {tier.tierName}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{tier.englishName}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-400">የጥፋቱ አይነትና ስፋት (Scope):</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200">{tier.scopeAmharic}</p>
                    <p className="text-xs text-slate-400 italic">{tier.scopeEnglish}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-1">
                    <h4 className="text-xs font-bold text-amber-400">የሚወሰደው አስገዳጅ እርምጃ (Sanction):</h4>
                    <p className="text-xs sm:text-sm font-bold text-white">{tier.actionAmharic}</p>
                    <p className="text-xs text-slate-300 italic">{tier.actionEnglish}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DIGITAL PLEDGE & CERTIFICATION */}
      {activeTab === 'pledge' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-2">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                የጥቅል መመሪያ ይፋዊ የህግ ተገዢነት ዲጂታል ቃል ኪዳን
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                ይህንን ሰነድ በማረጋገጥ እና በመፈረም፤ በዚህ ድህረገፅና መተግበሪያ ላይ ከአንድ በላይ በሆነ የውሸት አካውንት ላለማጭበርበር፣ ማንንም ላለመሳደብ፣ ስም ላለማጥፋት፣ ላለማስፈራራት፣ ዘረኝነትን ላለማስፋፋት እና ለቡድን ወይም ለግል ጥቅም የህዝብን መድረክ ያለ አግባብ ላለመጠቀም በህግ ፊት ሙሉ ቃል ኪዳን እገባለሁ።
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>የውል ሰነድ ስም:</span>
                <strong className="text-white">ጥቅል መመሪያ (Bundle Directive Compact)</strong>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>የተፈጻሚነት ወሰን:</span>
                <strong className="text-amber-300">170+ ሀገራት እና ዓለም አቀፍ የዳኝነት ፍርድ ቤቶች</strong>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>የተጠቃሚ ሁኔታ:</span>
                <span className={legalCertificate?.isCertified ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {legalCertificate?.isCertified ? 'የተረጋገጠ ዜጋ ✓' : 'ፊርማ በመጠባበቅ ላይ'}
                </span>
              </div>
              {legalCertificate && (
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>ዲጂታል መለያ ኮድ:</span>
                  <span className="text-amber-400">{legalCertificate.certificateId}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleSignPledge}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
              >
                <FileCheck className="w-5 h-5 text-slate-950" />
                <span>ቃሌን በዲጂታል ፊርማ አረጋግጣለሁ (Sign & Seal Compact)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
