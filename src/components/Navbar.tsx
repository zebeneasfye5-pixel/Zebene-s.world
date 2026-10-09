import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
} from 'lucide-react';

interface NavbarProps {
  onOpenFounderVault: () => void;
  onOpenPWA: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFounderVault, onOpenPWA }) => {
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
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('chamber')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-extrabold text-xl tracking-wider">
              ZW
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-clip-text text-transparent">
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

          {/* Quick Chamber Dialers (1 to 7) */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wider flex items-center gap-1">
              <span>Dial:</span>
            </span>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                onClick={() => switchChamber(num)}
                title={`Jump to Chamber #${num} (Press '${num}' on keyboard)`}
                className={`relative w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                  activeChamberCode === num && activeTab === 'chamber'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Audio Speech Synthesis Toggle */}
            <button
              onClick={() => setAutoSpeechEnabled(!autoSpeechEnabled)}
              title={autoSpeechEnabled ? 'Mute AI Auto Voice Playback' : 'Enable AI Voice Translation Playback'}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                autoSpeechEnabled
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {autoSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-colors"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{currentLang.flag}</span>
                <span>{currentLang.label.split(' ')[0]}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                    Select Display & Voice Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setUserLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 ${
                        userLanguage === l.code ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {userLanguage === l.code && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Wallet Badge */}
            <button
              onClick={() => setActiveTab('banking_economy')}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-semibold text-emerald-400 transition-colors"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{userWallet.balanceBirr.toLocaleString()} ETB</span>
            </button>

            {/* Profile / Biometric Face ID Verified */}
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="flex items-center space-x-2 p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-colors"
              title="Identity & Face Biometric Verification"
            >
              <div className="relative">
                <img
                  src={currentUser.photoUrl}
                  alt={currentUser.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-amber-400"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-slate-900" />
              </div>
              <span className="hidden md:inline font-semibold">{currentUser.fullName.split(' ')[0]}</span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" />
            </button>

            {/* Play Store / PWA Install Prompt Button */}
            <button
              onClick={onOpenPWA}
              title="Download Zebene's World App (Play Store / PWA)"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white rounded-lg text-xs font-bold shadow-md shadow-amber-500/20 transition-transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Install App</span>
            </button>

            {/* Private Founder Vault Button (Protected) */}
            <button
              onClick={onOpenFounderVault}
              title="Founder Private Revenue Vault (Passkey Protected)"
              className="p-2 text-slate-500 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="text-xs uppercase font-bold text-slate-400 px-1">Quick Chamber Jump</div>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                onClick={() => {
                  switchChamber(num);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-lg font-bold text-center ${
                  activeChamberCode === num ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200'
                }`}
              >
                #{num}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Wallet: {userWallet.balanceBirr} ETB</span>
            <button
              onClick={() => {
                setIsRegistrationOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-amber-400 font-semibold"
            >
              Verify Face Biometric
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
