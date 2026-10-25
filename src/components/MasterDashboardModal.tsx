import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../data/translations';
import {
  X,
  Compass,
  Globe2,
  Users2,
  Heart,
  Trophy,
  Coins,
  HeartHandshake,
  Languages,
  Landmark,
  Scale,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  Volume2,
  Share2,
  Radio,
  Award,
  Wallet,
} from 'lucide-react';
import { EqubSystem } from './EqubSystem';
import { InteractiveCommentWall } from './InteractiveCommentWall';

interface MasterDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWeddingModal: () => void;
  onOpenChamberReg: (code: number) => void;
  onOpenFounderVault: () => void;
  onOpenLegalModal: () => void;
  onOpenTikil2ryaModal: () => void;
}

export const MasterDashboardModal: React.FC<MasterDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenWeddingModal,
  onOpenChamberReg,
  onOpenFounderVault,
  onOpenLegalModal,
  onOpenTikil2ryaModal,
}) => {
  const {
    userLanguage,
    setUserLanguage,
    chambers,
    switchChamber,
    setActiveTab,
    currentUser,
    userWallet,
    setIsInviteModalOpen,
    setIsEmbedModalOpen,
    setIsMemberFinanceModalOpen,
  } = useApp();

  const [activeModule, setActiveModule] = useState<number | null>(null);

  if (!isOpen) return null;

  const t = getTranslation(userLanguage);

  const modules = [
    {
      num: '1',
      title: t.mod1Title,
      desc: t.mod1Desc,
      icon: Users2,
      color: 'from-amber-500 to-orange-500',
      badge: '7 Sovereign Houses',
    },
    {
      num: '2',
      title: t.mod2Title,
      desc: t.mod2Desc,
      icon: Globe2,
      color: 'from-indigo-500 to-blue-500',
      badge: 'Live HD Video & Seats',
    },
    {
      num: '3',
      title: t.mod3Title,
      desc: t.mod3Desc,
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      badge: 'The Hague Apostille 1961',
    },
    {
      num: '4',
      title: t.mod4Title,
      desc: t.mod4Desc,
      icon: Trophy,
      color: 'from-amber-400 to-yellow-500',
      badge: 'Gebeta & Daily Lottery',
    },
    {
      num: '5',
      title: t.mod5Title,
      desc: t.mod5Desc,
      icon: Coins,
      color: 'from-emerald-500 to-teal-500',
      badge: 'International ROSCA',
    },
    {
      num: '6',
      title: t.mod6Title,
      desc: t.mod6Desc,
      icon: HeartHandshake,
      color: 'from-teal-500 to-cyan-500',
      badge: 'Orphans & Relief Fund',
    },
    {
      num: '7',
      title: t.mod7Title,
      desc: t.mod7Desc,
      icon: Languages,
      color: 'from-violet-500 to-purple-500',
      badge: 'Speech & Synchronized UI',
    },
    {
      num: '8',
      title: t.mod8Title,
      desc: t.mod8Desc,
      icon: Landmark,
      color: 'from-emerald-600 to-green-500',
      badge: 'CBE & Telebirr Rails',
    },
    {
      num: '9',
      title: t.mod9Title,
      desc: t.mod9Desc,
      icon: Scale,
      color: 'from-amber-500 to-rose-600',
      badge: 'Charter: Jan 10, 2026',
    },
    {
      num: '10',
      title: t.mod10Title,
      desc: t.mod10Desc,
      icon: MessageSquare,
      color: 'from-rose-500 to-pink-600',
      badge: 'Likes, Share & Comments',
    },
  ];

  const handleSelectModule = (index: number) => {
    setActiveModule(index);
  };

  const handleChamberSelect = (code: number) => {
    switchChamber(code);
    setActiveTab('chamber');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-5xl w-full p-4 sm:p-7 shadow-2xl relative my-6 text-slate-100 max-h-[92vh] flex flex-col">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer z-10"
          title="ዳሽቦርድ ዝጋ (Close)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Top Header */}
        <div className="flex items-center space-x-3.5 mb-5 pb-4 border-b border-slate-800 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {t.masterDashboard}
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                10 Master Modules
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.subMasterDashboard} • Founded by <strong className="text-amber-300">{t.founderName}</strong> on {t.foundingDate}
            </p>
          </div>
        </div>

        {/* Modal Body: Two columns on desktop */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeModule === null ? (
            /* Main 10 Numbered Sequential Module Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {modules.map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.num}
                    onClick={() => handleSelectModule(idx + 1)}
                    className="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/60 transition-all text-left flex items-start space-x-3.5 group cursor-pointer shadow-lg hover:scale-[1.01]"
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${m.color} text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-md group-hover:rotate-6 transition-transform`}
                    >
                      {m.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3 className="font-black text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                          {m.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 shrink-0">
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{m.desc}</p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 shrink-0 self-center" />
                  </button>
                );
              })}
            </div>
          ) : (
            /* Sub-Module Detail View */
            <div className="space-y-4">
              {/* Back to 10 Modules button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <button
                  onClick={() => setActiveModule(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 text-amber-400" />
                  <span>ወደ ዋናው 10 ማውጫ ተመለስ (Back to 10 Master Modules)</span>
                </button>

                <span className="text-xs font-bold text-amber-300 font-mono">
                  Module #{activeModule}
                </span>
              </div>

              {/* Module 1: Chambers Registration & Selection */}
              {activeModule === 1 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                    <h3 className="text-sm font-black text-white mb-1">
                      ፩. 1. የ 7ቱ ሉዓላዊ አዳራሾች ምዝገባና ምርጫ (Chambers Criteria)
                    </h3>
                    <p className="text-xs text-slate-300">
                      እያንዳንዱ አዳራሽ በራሱ ልዩ መስፈርት የተዘጋጀ ሲሆን፣ አንዴ ከተመዘገቡ በኋላ በሁሉም አዳራሾች በይፋ እውቅና ያገኛሉ።
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {chambers.map((ch) => (
                      <div
                        key={ch.code}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                              #{ch.code}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{ch.badge}</span>
                          </div>
                          <h4 className="font-bold text-xs text-white mt-1">{ch.name}</h4>
                          <p className="text-[11px] text-amber-400 font-semibold">{ch.amharicName}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{ch.description}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex gap-2">
                          <button
                            onClick={() => {
                              onOpenChamberReg(ch.code);
                              onClose();
                            }}
                            className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                          >
                            የቤቱ መስፈርት
                          </button>
                          <button
                            onClick={() => handleChamberSelect(ch.code)}
                            className="flex-1 py-1.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                          >
                            ወደ አዳራሽ ግባ
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 2: Live Video & Audio Floors */}
              {activeModule === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30">
                    <h3 className="text-sm font-black text-white mb-1">
                      ፪. 2. የቀጥታ ቪዲዮና ድምፅ አዳራሾች (Live Assembly Floors & Seats)
                    </h3>
                    <p className="text-xs text-slate-300">
                      የቀጥታ HD ቪዲዮ፣ የወንበር ቁጥሮች እና የመድረክ ንግግሮች። የሚፈልጉትን አዳራሽ ይምረጡ፦
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {chambers.map((ch) => (
                      <button
                        key={ch.code}
                        onClick={() => handleChamberSelect(ch.code)}
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-400 text-left transition-all cursor-pointer"
                      >
                        <span className="text-amber-400 font-mono text-xs font-bold">Chamber #{ch.code}</span>
                        <h4 className="text-xs font-black text-white truncate">{ch.name}</h4>
                        <span className="text-[10px] text-emerald-400 block mt-1">🟢 Live Video & Mic</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 3: Nuptial Cathedral & Hague Marriage Contract */}
              {activeModule === 3 && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-950/80 to-slate-950 border border-pink-500/40 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-mono border border-pink-500/40 font-bold">
                      Chamber #5 Nuptial Cathedral
                    </span>
                    <h3 className="text-base font-black text-white">
                      ፫. 3. የሰርግ ቤትና አለም አቀፍ የጋብቻ ውል (Hague Apostille 1961)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      በሙሽራውና በሙሽሪት ፎቶዎች፣ ባልተገደቡ አጃቢዎችና ሽማግሌዎች፣ በአለም አቀፍ የጋብቻ ህግጋት የተደነገገ ህጋዊ የቃል ኪዳን ሰነድ።
                    </p>

                    <button
                      onClick={() => {
                        onOpenWeddingModal();
                        onClose();
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2 mt-2"
                    >
                      <Heart className="w-4 h-4 fill-slate-950" />
                      <span>የሰርግ ቤቱንና የጋብቻ ውል ሰነዱን ክፈት (Open Nuptial Cathedral)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Module 4: Games & Lotteries */}
              {activeModule === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
                    <h3 className="text-sm font-black text-white mb-1">
                      ፬. 4. ዘመናዊና ባህላዊ ጨዋታዎች እና ሎተሪ (Mancala/Gebeta & Lottery)
                    </h3>
                    <p className="text-xs text-slate-300">
                      የገበጣ ባህላዊ ውድድር፣ የዲፕሎማቲክ እውቀት ፈተና፣ እና የቀንና ወርሃዊ የሎተሪ እጣዎች።
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="font-bold text-amber-300 text-xs block">የገበጣ ውድድር (Gebeta Mancala Arena)</span>
                      <p className="text-[11px] text-slate-400">
                        ባህላዊ የስትራቴጂ ጨዋታ ከዓለም ዜጎች ጋር በኦንላይን ይጫወቱና ይሸለሙ።
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('games_lottery');
                          onClose();
                        }}
                        className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
                      >
                        ጨዋታ ጀምር (Play Gebeta)
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="font-bold text-rose-300 text-xs block">የቀንና ወርሃዊ ሎተሪ (Fortune Wheel)</span>
                      <p className="text-[11px] text-slate-400">
                        እስከ 50,000 ብር የሚያሸልም የዕድል መንኮራኩር እና የሎተሪ እጣ።
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('games_lottery');
                          onClose();
                        }}
                        className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl"
                      >
                        ሎተሪ ሞክር (Spin Wheel)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Module 5: International Equb */}
              {activeModule === 5 && (
                <div className="space-y-4">
                  <EqubSystem />
                </div>
              )}

              {/* Module 6: Humanitarian Fund */}
              {activeModule === 6 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/30">
                    <h3 className="text-sm font-black text-white mb-1">
                      ፮. 6. አለም አቀፍ ሰብአዊና ልማት ድጋፍ (Global Humanitarian Solidarity)
                    </h3>
                    <p className="text-xs text-slate-300">
                      የየቲሞች፣ የአደጋ ጊዜ ድጋፍ እና የገጠር ንጹህ መጠጥ ውሃ ፕሮጀክቶች መርጃ ፈንድ።
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('charity');
                        onClose();
                      }}
                      className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl mt-3"
                    >
                      ወደ ሰብአዊ ድጋፍ ማዕከል ሂድ
                    </button>
                  </div>
                </div>
              )}

              {/* Module 7: Voice Interpretation & Full-App Language Switcher */}
              {activeModule === 7 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-violet-500/30 space-y-2">
                    <h3 className="text-sm font-black text-white">
                      ፯. 7. የቀጥታ ቋንቋ መተርጎሚያና የገጽ ፅሁፍ መቀየሪያ (Synchronized UI Translation)
                    </h3>
                    <p className="text-xs text-slate-300">
                      አንድ ቋንቋ ሲመርጡ ድምፁ ብቻ ሳይሆን በድህረገፁ ላይ ያሉት ፅሁፎች በሙሉ በቅጽበት ወደተመረጠው ቋንቋ ይቀየራሉ!
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2">
                      {[
                        { code: 'am', label: 'አማርኛ (Amharic)', flag: '🇪🇹' },
                        { code: 'en', label: 'English (ዓለም አቀፍ)', flag: '🌐' },
                        { code: 'om', label: 'Afaan Oromoo', flag: '🇪🇹' },
                        { code: 'ti', label: 'ትግርኛ (Tigrinya)', flag: '🇪🇹' },
                        { code: 'ar', label: 'العربية (Arabic)', flag: '🇸🇦' },
                        { code: 'fr', label: 'Français (French)', flag: '🇫🇷' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setUserLanguage(lang.code)}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            userLanguage === lang.code
                              ? 'bg-violet-600 border-violet-400 text-white font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          <span>{lang.flag} {lang.label}</span>
                          {userLanguage === lang.code && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Module 8: Banking & Developer Treasury */}
              {activeModule === 8 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-white flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span>፰. 8. የፋይናንስ፣ የባንክና የገቢ ማገናኛ (Banking Rails & Vault)</span>
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
                        CBE • Telebirr • Awash • Dashen
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      እያንዳንዱ አባል የራሱን የግል ገቢ (Deposit) እና ወጪ (Withdraw) የሚያስተዳድርበት፣ ለተሳትፎ አነስተኛ ገቢ የሚያገኝበት እና የመሥራቹ የንግድ ባንክ ሂሳብ የተገናኘበት ዓለም አቀፍ የክፍያ ስርአት።
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">የክቡር መሥራች ንግድ ባንክ (CBE)፦</span>
                        <span className="font-mono font-bold text-amber-300">1000167413618</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">ባለቤት፦</span>
                        <span className="text-slate-200 font-semibold">ክቡር ዘበነ አስፍዬ (Zebene Asfeye)</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400 font-semibold pt-1 border-t border-slate-800/80">
                        <span>የተሳትፎ ገቢ ተመን፦</span>
                        <span>መናገር +20 ETB • ሼር +15 ETB • ኮመንት +10 ETB • ላይክ +5 ETB</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => {
                          setIsMemberFinanceModalOpen(true);
                          onClose();
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-900/40 cursor-pointer"
                      >
                        <Wallet className="w-3.5 h-3.5" />
                        <span>የአባሉ የግል ገቢና ወጪ መዝገብ (Personal Ledger)</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('banking_economy');
                          onClose();
                        }}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700"
                      >
                        የባንክና ዋሌት ዝርዝር
                      </button>
                      <button
                        onClick={() => {
                          onOpenFounderVault();
                          onClose();
                        }}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs border border-amber-500/30"
                      >
                        የገንቢው የገቢ ካዝና (Vault PIN)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Module 9: Founding Charter, Directives & Laws */}
              {activeModule === 9 && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 text-xs text-slate-300 leading-relaxed">
                    <div className="flex items-center space-x-2 text-amber-300 font-black text-sm">
                      <Scale className="w-5 h-5 text-amber-400" />
                      <span>የሉዓላዊ ጉባኤው ይፋዊ የመሰረተበት ታሪክና ጥቅል መመሪያ</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <p><strong>የተመሰረተበት ቀን፦</strong> ጥር 2 ቀን 2018 ዓ.ም. (January 10, 2026)</p>
                      <p><strong>መሥራችና የበላይ ጠሪ፦</strong> ክቡር ዘበነ አስፍዬ (Zebene Asfeye - Sovereign Convener)</p>
                      <p><strong>ዋና ዓላማ፦</strong> የዓለምን ሉዓላዊ ህዝቦች በ 7 አዳራሾች በፍቅር፣ በእኩልነት፣ በሳይንስና በዲሞክራሲ ማስተሳሰር።</p>
                      <p><strong>የወንጀል ተጠያቂነት፦</strong> UN Universal Declaration of Human Rights & Budapest Cybercrime ETS 185</p>
                    </div>

                    <button
                      onClick={() => {
                        onOpenTikil2ryaModal();
                        onClose();
                      }}
                      className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                    >
                      ሙሉ ጥቅል መመሪያውን አንብብ (Full Dossier)
                    </button>
                  </div>
                </div>
              )}

              {/* Module 10: Social Interactions */}
              {activeModule === 10 && (
                <div className="space-y-4">
                  <InteractiveCommentWall />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Quick Action Bar */}
        <div className="pt-4 mt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>170+ Nations • Live Interpretation Active • Zero-Lag Offline Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold"
            >
              አባላት ጋብዝ (Invite)
            </button>
            <button
              onClick={() => setIsEmbedModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold"
            >
              ድህረገፅ ላይ ክተት (Embed)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
