import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlobalEmblem } from './GlobalEmblem';
import {
  Globe2,
  Wallet,
  UserCheck,
  ShieldAlert,
  Sparkles,
  Download,
  BookOpen,
  Trophy,
  Heart,
  Landmark,
  Languages,
  Menu,
  X,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Play,
  Scale,
  FileCheck,
  FolderOpen,
  Key,
  LogOut,
  LogIn,
  Compass,
  Shield,
  UserPlus,
  Code2,
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface NavbarProps {
  onOpenFounderVault: () => void;
  onOpenPWA: () => void;
  onOpenPlayStoreModal?: () => void;
  onOpenLegalModal?: () => void;
  onOpenTikil2ryaModal?: () => void;
  onOpenMasterDashboard?: () => void;
  onOpenAuthGate?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFounderVault,
  onOpenPWA,
  onOpenPlayStoreModal,
  onOpenLegalModal,
  onOpenTikil2ryaModal,
  onOpenMasterDashboard,
  onOpenAuthGate,
}) => {
  const {
    currentUser,
    activeChamberCode,
    switchChamber,
    activeTab,
    setActiveTab,
    userLanguage,
    setUserLanguage,
    userWallet,
    autoSpeechEnabled,
    setAutoSpeechEnabled,
    setIsRegistrationOpen,
    signOutUser,
    effectiveOnline,
    toggleSimulateOffline,
    legalCertificate,
    setIsTikil2ryaModalOpen,
    setIsMemberFinanceModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🌐' },
    { code: 'am', label: 'አማርኛ (Amharic)', flag: '🇪🇹' },
    { code: 'om', label: 'Afaan Oromoo', flag: '🇪🇹' },
    { code: 'ti', label: 'ትግርኛ (Tigrinya)', flag: '🇪🇹' },
    { code: 'ar', label: 'العربية (Arabic)', flag: '🇸🇦' },
    { code: 'fr', label: 'Français (French)', flag: '🇫🇷' },
    { code: 'es', label: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'zh', label: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  ];

  const currentLang = languages.find((l) => l.code === userLanguage) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title with World-Class International Emblem */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('chamber')}>
            <div
              className="transition-transform group-hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Official Sovereign International Emblem (የዘበነ ዓለም ይፋዊ ዓለም አቀፍ አርማ) • Click to open Play Store publication guide"
              onClick={(e) => {
                if (onOpenPlayStoreModal) {
                  e.stopPropagation();
                  onOpenPlayStoreModal();
                }
              }}
            >
              <GlobalEmblem size="md" showGlow={true} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-clip-text text-transparent group-hover:text-amber-200 transition-colors">
                  Zebene's World
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                  ዘበነ የመሰረተው አለም
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Global Congress of Unity • 7 Sovereign Chambers
              </p>
            </div>
          </div>

          {/* Right Header: Consolidated into the 3-Line Hamburger Menu (3 ሰረዝ - ☰) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/10 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-300 border border-amber-500/40 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/10 active:scale-95 cursor-pointer"
              title="ጠቅላላ ማውጫና ዳሽቦርድ (Master Menu & Dashboard - ☰)"
              aria-label="Open 3-line Main Menu"
            >
              <Menu className="w-5 h-5 text-amber-400 stroke-[2.5]" />
              <span className="font-black tracking-wide">ማውጫ (☰)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="bg-slate-950/70 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab('chamber')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'chamber'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>7 Sovereign Chambers</span>
            <span className="bg-slate-900/60 text-amber-200 px-1.5 py-0.2 rounded text-[10px]">
              Chamber #{activeChamberCode}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('learning')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'learning'
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>AI Learning Horizon (የትምህርት አድማስ)</span>
          </button>

          <button
            onClick={() => setActiveTab('games_lottery')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'games_lottery'
                ? 'bg-rose-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-4 h-4 text-rose-400" />
            <span>Games & Fortune Wheel (ጨዋታና ሎተሪ)</span>
          </button>

          <button
            onClick={() => setActiveTab('charity')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'charity'
                ? 'bg-teal-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Heart className="w-4 h-4 text-teal-300" />
            <span>Humanitarian Aid & Orphans (በጎ አድራጎት)</span>
          </button>

          <button
            onClick={() => setActiveTab('banking_economy')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'banking_economy'
                ? 'bg-emerald-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Landmark className="w-4 h-4 text-emerald-300" />
            <span>Banking, Loans & Talent (ኢኮኖሚና ባንክ)</span>
          </button>

          <button
            onClick={() => setActiveTab('legal_compliance')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'legal_compliance'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-amber-500/20'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Legal & Global Treaties (ዓለም አቀፍ ሕግጋትና መመሪያ)</span>
            {legalCertificate?.isCertified ? (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded text-[10px] font-bold">
                ✓ ህጉ ጸድቋል
              </span>
            ) : (
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded text-[10px] font-bold animate-pulse">
                ውል አልተፈረመም
              </span>
            )}
          </button>

          {/* Tikil Memeriya Main Folder Tab */}
          <button
            onClick={() => setActiveTab('tikil_2rya')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
              activeTab === 'tikil_2rya'
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-slate-950 font-black border-amber-400 shadow-md'
                : 'text-amber-300 hover:text-white hover:bg-slate-800/60 border-amber-500/40'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <Key className="w-3.5 h-3.5 text-amber-300" />
            <span>📁 ጥቅል መመሪያ (ዋና ዓላማና የወንጀል ተጠያቂነት)</span>
          </button>
        </div>
      </div>

      {/* Comprehensive 3-Line Master Drawer (በ 3ቱ ሰረዝ የተጠቃለለ ጠቅላላ ማውጫና ዳሽቦርድ) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-Over Drawer on the Right */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800/80 text-slate-100 shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-black text-base shadow-md">
                    ☰
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white">
                      ጠቅላላ ማውጫና ዳሽቦርድ
                    </h2>
                    <p className="text-[11px] text-amber-300 font-semibold">
                      Zebene's World • የተጠቃለሉ 10 ዋና አገልግሎቶች
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="ዝጋ (Close)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {/* 1. ዋና ዳሽቦርድ (Master Dashboard 1-10) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-indigo-500/15 border-2 border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                      ፩. ቁጥር 1
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold">10 ዓለም አቀፍ ሞጁሎች</span>
                  </div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span>ዋና ዳሽቦርድ (Master Dashboard 1-10)</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ምዝገባ፣ 7ቱ አዳራሾች፣ ጋብቻ፣ ጨዋታና ሎተሪ፣ ዓለም አቀፍ እቁብ፣ ሰብአዊ ድጋፍ፣ ቋንቋ፣ ባንክና ካዝና በአንድ ላይ።
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenMasterDashboard) onOpenMasterDashboard();
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>🎛️ ዋና ዳሽቦርዱን ክፈት (Open Dashboard 1-10)</span>
                  </button>
                </div>

                {/* 2. የአባሉ የግል ዋሌትና ገቢ/ወጪ (Personal Member Ledger) */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ፪. ቁጥር 2
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {userWallet.balanceBirr.toLocaleString()} ETB ({userWallet.balanceUsd} USD)
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span>የአባሉ የግል የሂሳብና የገቢ/ወጪ መዝገብ</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    ገቢ (Deposit በCBE፣ ቴሌብር፣ አዋሽ) እና ወጪ (Withdrawal) ማካሄጃ እንዲሁም የተሳትፎ ገቢ መቀበያ።
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsMemberFinanceModalOpen(true);
                    }}
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>የግል ሂሳብና ገቢ/ወጪ መዝገብ ክፈት</span>
                  </button>
                </div>

                {/* 3. የገንቢው የገቢ ካዝና (Founder's Vault PIN 2026) */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      ፫. ቁጥር 3
                    </span>
                    <span className="text-[10px] text-amber-300 font-mono">PIN: 2026</span>
                  </div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>የገንቢው የገቢ ካዝና (Founder's Vault)</span>
                  </h3>
                  <div className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">መሥራች፦</span>
                      <strong className="text-slate-200">ክቡር ዘበነ አስፍዬ (Zebene Asfeye)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ንግድ ባንክ (CBE)፦</span>
                      <strong className="text-amber-300 font-mono">1000167413618</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenFounderVault();
                    }}
                    className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    <span>የገቢ ካዝና ክፈት (Enter PIN 2026)</span>
                  </button>
                </div>

                {/* 4. ጥቅል መመሪያና የወንጀል ተጠያቂነት */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      ፬. ቁጥር 4
                    </span>
                    <span className="text-[10px] text-slate-400">ጥር 2/2018 ዓ.ም.</span>
                  </div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-amber-400" />
                    <span>ጥቅል መመሪያ (Tikil Memeriya Dossier)</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    የተመሰረተበት ይፋዊ ታሪክ፣ የበላይ ዓላማና ዓለም አቀፍ የወንጀል ተጠያቂነት ሙሉ ሰነድ።
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenTikil2ryaModal) onOpenTikil2ryaModal();
                      else setIsTikil2ryaModalOpen(true);
                    }}
                    className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 border border-slate-700 cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>ሙሉ ጥቅል መመሪያውን አንብብ</span>
                  </button>
                </div>

                {/* 5. ዓለም አቀፍ የሕግ ተጠያቂነትና ቻርተር */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      ፭. ቁጥር 5
                    </span>
                    <span className="text-[10px] text-slate-400">UN UDHR & Budapest ETS 185</span>
                  </div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>ዓለም አቀፍ የሕግ ተጠያቂነትና ቻርተር</span>
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">የፊርማ ሁኔታ፦</span>
                    <span className={`font-bold ${legalCertificate?.isCertified ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {legalCertificate?.isCertified ? '✓ የተረጋገጠ ፊርማ (Certified)' : '⚠️ ውል አልተፈረመም'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenLegalModal) onOpenLegalModal();
                      else setActiveTab('legal_compliance');
                    }}
                    className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 border border-slate-700 cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>ዓለም አቀፍ ሕግጋትና ውል</span>
                  </button>
                </div>

                {/* 6. የቋንቋ መተርጎሚያና ምርጫ */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      ፮. ቁጥር 6
                    </span>
                    <span className="text-[10px] text-slate-400">ቅጽበታዊ ትርጉም</span>
                  </div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Languages className="w-4 h-4 text-violet-400" />
                    <span>የቋንቋ መተርጎሚያና ምርጫ (Instant Translation)</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    ቋንቋ ሲቀይሩ ድምፁ ብቻ ሳይሆን በድህረገፁ ያሉት ፅሁፎች በሙሉ ይቀየራሉ።
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => setUserLanguage(l.code)}
                        className={`p-2 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all cursor-pointer ${
                          userLanguage === l.code
                            ? 'bg-violet-600 text-white shadow-md'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span>{l.flag} {l.label.split(' ')[0]}</span>
                        {userLanguage === l.code && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 7. የድምፅ መተርጎሚያ ማብሪያ/ማጥፊያ */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-slate-400">፯. ቁጥር 7</span>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {autoSpeechEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                      <span>የድምፅ መተርጎሚያ (AI Speech Synthesis)</span>
                    </h4>
                  </div>
                  <button
                    onClick={() => setAutoSpeechEnabled(!autoSpeechEnabled)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      autoSpeechEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {autoSpeechEnabled ? 'በርቷል (ON)' : 'ጠፍቷል (OFF)'}
                  </button>
                </div>

                {/* 8. የኔትወርክ ሁኔታ (Online / Offline Toggle) */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-slate-400">፰. ቁጥር 8</span>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {effectiveOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-amber-400" />}
                      <span>የኔትወርክ ዝግጁነት (Zero-Lag Engine)</span>
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {effectiveOnline ? 'ኦንላይን ተገናኝቷል' : 'ያለ ኔትወርክ (ኦፍላይን) ይሰራል'}
                    </p>
                  </div>
                  <button
                    onClick={toggleSimulateOffline}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    {effectiveOnline ? 'ኦፍላይን ሞክር' : 'ኦንላይን መልስ'}
                  </button>
                </div>

                {/* 9. መተግበሪያውን ጫን (Install App / Play Store) */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-black text-slate-400">፱. ቁጥር 9</span>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>መተግበሪያውን በስልክዎ ላይ ይጫኑ (Install App)</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenPWA();
                      }}
                      className="py-2 px-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1 shadow-md cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>App ጫን (PWA)</span>
                    </button>
                    {onOpenPlayStoreModal && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenPlayStoreModal();
                        }}
                        className="py-2 px-3 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-indigo-400" />
                        <span>Play Store</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 10. የአባል መገለጫና ሳይን አውት (Profile & Sign In / Sign Out) */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      ፲. ቁጥር 10
                    </span>
                    <span className="text-[10px] text-slate-400">መለያ ቁጥጥር</span>
                  </div>
                  {currentUser?.fullName && currentUser?.isAuthenticated !== false ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
                        <img
                          src={currentUser.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                          alt={currentUser.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-amber-400"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-white truncate">{currentUser.fullName}</p>
                          <p className="text-[11px] text-amber-300 font-mono truncate">{currentUser.phoneNumber || 'ያልተመዘገበ ስልክ'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          signOutUser();
                          setMobileMenuOpen(false);
                          if (onOpenAuthGate) onOpenAuthGate();
                        }}
                        className="w-full py-2 px-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 hover:text-white border border-rose-500/40 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>ከአካውንት ውጣ / ሳይን አውት (Sign Out)</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenAuthGate) onOpenAuthGate();
                        else setIsRegistrationOpen(true);
                      }}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>ግባ / ተመዝገብ (Sign In / Register)</span>
                    </button>
                  )}
                </div>

                {/* Quick 7 Chambers Dialers */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs uppercase font-bold text-slate-400">
                    7 ሉዓላዊ አዳራሾች (Quick Chamber Dial)
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          switchChamber(num);
                          setActiveTab('chamber');
                          setMobileMenuOpen(false);
                        }}
                        className={`py-2 rounded-lg font-bold text-xs text-center transition-all cursor-pointer ${
                          activeChamberCode === num && activeTab === 'chamber'
                            ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black shadow-md'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        #{num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
