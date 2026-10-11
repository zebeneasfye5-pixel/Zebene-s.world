import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  INTERNATIONAL_LEGAL_ARTICLES,
  USER_OPERATIONAL_MANUAL,
  FREQUENTLY_ASKED_LEGAL_QUESTIONS,
} from '../data/legalFramework';
import { GlobalEmblem } from './GlobalEmblem';
import { speakText, stopSpeaking } from '../services/speech';
import {
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileCheck,
  BookOpen,
  HelpCircle,
  Award,
  Search,
  Volume2,
  VolumeX,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Lock,
  Landmark,
  FileBadge,
  Sparkles,
  Eye,
  Heart,
  ChevronRight,
  ArrowRight,
  UserCheck,
  FolderOpen,
  Key,
} from 'lucide-react';
import { Tikil2ryaDossier } from './Tikil2ryaDossier';

export const LegalTreatyAndGuide: React.FC = () => {
  const {
    currentUser,
    userLanguage,
    legalCertificate,
    acceptLegalCompact,
    setActiveTab,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'tikil_2rya' | 'articles' | 'manual' | 'certificate' | 'faq'>('tikil_2rya');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(INTERNATIONAL_LEGAL_ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [languageMode, setLanguageMode] = useState<'bilingual' | 'amharic' | 'english'>('bilingual');
  const [showSignSuccessAlert, setShowSignSuccessAlert] = useState(false);

  const selectedArticle = INTERNATIONAL_LEGAL_ARTICLES.find((a) => a.id === selectedArticleId) || INTERNATIONAL_LEGAL_ARTICLES[0];

  const handleSpeak = (id: string, textAmharic: string, textEnglish: string) => {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(id);
    const textToSpeak = userLanguage === 'am' || languageMode === 'amharic' ? textAmharic : `${textEnglish}. ${textAmharic}`;
    const lang = userLanguage === 'am' || languageMode === 'amharic' ? 'am' : 'en';
    speakText(textToSpeak, lang);
  };

  const handleSignCompact = () => {
    acceptLegalCompact();
    setShowSignSuccessAlert(true);
    setTimeout(() => setShowSignSuccessAlert(false), 5000);
  };

  const filteredArticles = INTERNATIONAL_LEGAL_ARTICLES.filter((a) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.amharicTitle.toLowerCase().includes(q) ||
      a.internationalTreatyReference.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.amharicSummary.toLowerCase().includes(q)
    );
  });

  const filteredManual = USER_OPERATIONAL_MANUAL.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.amharicTitle.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.amharicCategory.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  });

  const getArticleIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-amber-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-teal-400" />;
      case 'FileBadge': return <FileBadge className="w-5 h-5 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-sky-400" />;
      case 'Scale': return <Scale className="w-5 h-5 text-indigo-400" />;
      default: return <Scale className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Sovereign Legal Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-2 sm:p-3 bg-slate-950/80 border border-amber-400/40 rounded-2xl shadow-xl flex-shrink-0">
              <GlobalEmblem size="lg" showGlow={true} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide uppercase">
                  Official Legal Charter • ይፋዊ የህግ ማዕቀፍ
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  170+ Nations Harmonized Jurisdiction
                </span>
                {legalCertificate?.isCertified && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3" /> እርስዎ በህጉ ተገዢ ሆነዋል (Certified Signatory)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ዓለም አቀፍ የሕግ ተጠያቂነት፣ የአጠቃቀም መመሪያ እና የጋራ ቃል ኪዳን
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                በዚህ ድህረገፅ እና መተግበሪያ ላይ የሚደረግ ማንኛውም የእንቅስቃሴ ድርጊት (ንግግር፣ የቪዲዮ ስብሰባ፣ የገንዘብ ዝውውር፣ ጋብቻ፣ ብድርና ዳታ) ከተመለከተው ዓለም አቀፍ የህግ ተጠያቂነት ጋር በጥብቅ የተሳሰረ ነው።
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {legalCertificate?.isCertified ? (
              <button
                onClick={() => setActiveSection('certificate')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>ሰርተፊኬቴን ተመልከት (View Certificate)</span>
              </button>
            ) : (
              <button
                onClick={handleSignCompact}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-extrabold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <FileCheck className="w-4 h-4" />
                <span>ውሉን አረጋግጥና ፈርም (Sign & Agree)</span>
              </button>
            )}

            <button
              onClick={() => handleSpeak('header', 'ይህ መተግበሪያ በዓለም አቀፍ ህግ፣ በሰብአዊ መብቶች፣ በሳይበር ወንጀል መከላከያ እና በፋይናንስ ደንቦች የሚመራ ነው። ማንኛውም ተጠቃሚ ለሚፈጽመው ድርጊት በህግ ተጠያቂ ይሆናል።', 'This platform is bound by international law, human rights treaties, cybercrime protocols, and anti-money laundering standards. Every user is legally accountable.')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2"
              title="Listen to Legal Summary Voice Narration"
            >
              {speakingId === 'header' ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              <span>{speakingId === 'header' ? 'ድምፅ አቁም' : 'ድምፅ አዳምጥ'}</span>
            </button>
          </div>
        </div>

        {/* Global Treaty Badges Row */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">UN UDHR & ICCPR</p>
              <p className="text-[10px] text-slate-400">ሰብአዊ መብቶችና ሰላም</p>
            </div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">Budapest ETS 185</p>
              <p className="text-[10px] text-slate-400">የሳይበር ወንጀል ህግ</p>
            </div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">FATF 40 & Basel</p>
              <p className="text-[10px] text-slate-400">ጸረ-ገንዘብ ማጭበርበር</p>
            </div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <FileBadge className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">UNCITRAL Signatures</p>
              <p className="text-[10px] text-slate-400">የኤሌክትሮኒክስ ውል</p>
            </div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">WIPO Treaties</p>
              <p className="text-[10px] text-slate-400">የፈጠራና ቅጂ መብት</p>
            </div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-200">1958 New York Conv.</p>
              <p className="text-[10px] text-slate-400">ዓለም አቀፍ ዳኝነት</p>
            </div>
          </div>
        </div>
      </div>

      {showSignSuccessAlert && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 text-sm flex items-center justify-between animate-fade-in shadow-xl">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-bold">የህግ ተገዢነት ውል በተሳካ ሁኔታ ተፈርሟል! (Compact Signed Successfully)</p>
              <p className="text-xs text-emerald-300">
                ዲጂታል ሰርተፊኬት ቁጥር: {legalCertificate?.certificateId} በስምዎ ተመዝግቧል።
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveSection('certificate')}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
          >
            ሰርተፊኬቱን ተመልከት
          </button>
        </div>
      )}

      {/* Main Section Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {/* Tikil Memeriya Main Folder Tab */}
          <button
            onClick={() => setActiveSection('tikil_2rya')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
              activeSection === 'tikil_2rya'
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-amber-300 hover:bg-slate-800 hover:text-white border-amber-500/30'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <Key className="w-3.5 h-3.5" />
            <span>📁 ጥቅል መመሪያ (ዋና ዓላማና የወንጀል ተጠያቂነት)</span>
          </button>

          <button
            onClick={() => setActiveSection('articles')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSection === 'articles'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>7ቱ የዓለም አቀፍ ህግ አንቀጾች (7 Legal Articles)</span>
          </button>

          <button
            onClick={() => setActiveSection('manual')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSection === 'manual'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>የተጠቃሚዎች የአጠቃቀም መመሪያ (How-To Manual)</span>
          </button>

          <button
            onClick={() => setActiveSection('certificate')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSection === 'certificate'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>ይፋዊ የህግ ሰርተፊኬት (Official Certificate)</span>
          </button>

          <button
            onClick={() => setActiveSection('faq')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSection === 'faq'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>ጥያቄና መልስ (Legal FAQ)</span>
          </button>
        </div>

        {/* Search & Language Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="በህግ ወይም በመመሪያው ውስጥ ፈልግ..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px]">
            <button
              onClick={() => setLanguageMode('bilingual')}
              className={`px-2 py-1 rounded-lg font-bold ${
                languageMode === 'bilingual' ? 'bg-slate-800 text-amber-300' : 'text-slate-400'
              }`}
            >
              ሁለቱም
            </button>
            <button
              onClick={() => setLanguageMode('amharic')}
              className={`px-2 py-1 rounded-lg font-bold ${
                languageMode === 'amharic' ? 'bg-slate-800 text-amber-300' : 'text-slate-400'
              }`}
            >
              አማርኛ
            </button>
            <button
              onClick={() => setLanguageMode('english')}
              className={`px-2 py-1 rounded-lg font-bold ${
                languageMode === 'english' ? 'bg-slate-800 text-amber-300' : 'text-slate-400'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 0: TIKIL 2RYA DOSSIER - PURPOSE & CRIMINAL ACCOUNTABILITY */}
      {activeSection === 'tikil_2rya' && (
        <Tikil2ryaDossier onNavigateToTreaty={() => setActiveSection('articles')} />
      )}

      {/* SECTION 1: 7 INTERNATIONAL LEGAL ARTICLES */}
      {activeSection === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Article Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between px-1">
              <span>7ቱ ዓለም አቀፍ የህግ ድንጋጌዎች</span>
              <span className="text-[11px] text-amber-400">አስገዳጅ ህጎች</span>
            </div>

            <div className="space-y-2">
              {filteredArticles.map((article) => {
                const isSelected = article.id === selectedArticleId;
                return (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-500/60 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex-shrink-0 mt-0.5">
                      {getArticleIcon(article.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          አንቀጽ #{article.articleNumber} (Article {article.articleNumber})
                        </span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                          {article.internationalTreatyReference.split('&')[0]}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-100 line-clamp-1">
                        {languageMode === 'english' ? article.title : article.amharicTitle}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {languageMode === 'english' ? article.summary : article.amharicSummary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Article View */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Article Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    {getArticleIcon(selectedArticle.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                      አንቀጽ #{selectedArticle.articleNumber} • Article #{selectedArticle.articleNumber}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white">
                      {selectedArticle.amharicTitle}
                    </h2>
                    <p className="text-xs text-slate-400 italic">
                      {selectedArticle.title}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(selectedArticle.id, `${selectedArticle.amharicTitle}. ${selectedArticle.amharicSummary}`, `${selectedArticle.title}. ${selectedArticle.summary}`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center space-x-1.5 self-start sm:self-center border border-slate-700"
                >
                  {speakingId === selectedArticle.id ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{speakingId === selectedArticle.id ? 'አቁም' : 'አንቀጹን አዳምጥ'}</span>
                </button>
              </div>

              {/* International Treaty Citation */}
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start space-x-3 text-xs">
                <Scale className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-indigo-200">የተመሰረተበት ዓለም አቀፍ የህግ ቻርተር (International Treaty Authority):</p>
                  <p className="text-slate-300 font-mono text-[11px] mt-0.5">
                    {selectedArticle.internationalTreatyReference}
                  </p>
                </div>
              </div>

              {/* Core Provisions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>አስገዳጅ ድንጋጌዎችና የህግ ግዴታዎች (Mandatory Provisions)</span>
                </h4>

                <div className="space-y-3">
                  {selectedArticle.amharicProvisions.map((provision, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                      <div className="flex items-start space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs text-slate-100 font-medium leading-relaxed">
                            {provision}
                          </p>
                          {languageMode !== 'amharic' && selectedArticle.fullProvisions[idx] && (
                            <p className="text-[11px] text-slate-400 mt-1 leading-normal italic">
                              {selectedArticle.fullProvisions[idx]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Liability & Penalties */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>የህግ ተጠያቂነትና ዓለም አቀፍ ቅጣቶች (Legal Consequences & Penalties):</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  {selectedArticle.amharicConsequences}
                </p>
                {languageMode !== 'amharic' && (
                  <p className="text-[11px] text-slate-400 italic">
                    {selectedArticle.legalConsequences}
                  </p>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  ይህ አንቀጽ በሁሉም 7 ክፍሎች እና ግብይቶች ላይ ተፈጻሚ ነው።
                </span>
                <button
                  onClick={handleSignCompact}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>በዚህ ህግ ተስማምቻለሁ (Accept Article)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: USER OPERATIONAL MANUAL */}
      {activeSection === 'manual' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                የተጠቃሚዎች ተግባራዊ የአጠቃቀም መመሪያ (Universal Operational User Manual)
              </h3>
              <p className="text-xs text-slate-400">
                ተጠቃሚዎች እያንዳንዱን አገልግሎት በሰላም፣ በህጋዊ መንገድ እና በትክክል እንዲጠቀሙ ደረጃ በደረጃ የተዘጋጀ መመሪያ።
              </p>
            </div>
            <button
              onClick={() => handleSpeak('manual_intro', 'ይህ የተጠቃሚዎች ተግባራዊ መመሪያ ነው። ክፍሎችን እንዴት እንደሚጠቀሙ፣ የባንክ አገልግሎትን፣ ጋብቻን እና የትምህርት ክፍሎችን በሰላም ለመጠቀም ይረዳዎታል።', 'This is the universal operational guide for using chambers, banking, weddings, and learning with peace and security.')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center space-x-1.5 self-start sm:self-center border border-slate-700"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>መመሪያውን አዳምጥ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredManual.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center justify-center">
                      #{step.stepNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {languageMode === 'english' ? step.category : step.amharicCategory}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {languageMode === 'english' ? step.title : step.amharicTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {languageMode === 'english' ? step.description : step.amharicDescription}
                  </p>

                  <div className="space-y-2 mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      የአሰራር ቅደም ተከተል (Instructions):
                    </p>
                    {(languageMode === 'english' ? step.keyInstructions : step.amharicInstructions).map((inst, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 text-[11px] text-rose-300 flex items-start space-x-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{languageMode === 'english' ? step.legalWarning : step.amharicWarning}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: OFFICIAL LEGAL CERTIFICATE */}
      {activeSection === 'certificate' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
            {/* Watermark Emblem */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <GlobalEmblem size="lg" showGlow={false} />
            </div>

            {/* Certificate Header */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <GlobalEmblem size="lg" showGlow={true} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Universal Sovereign Congress • Zebene's World
                </p>
                <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  ይፋዊ የዓለም አቀፍ ሕግ ተገዢነት ሰርተፊኬት
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest mt-0.5">
                  Official Certificate of International Legal Accountability & Compliance
                </p>
              </div>
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />

            {/* Certificate Body Text */}
            <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              <p>
                ይህ ሰነድ የሚያረጋግጠው ከዚህ በታች የተጠቀሰው ዜጋ በዘበነ የመሰረተው አለም (Zebene's World) ውስጥ የሚደረጉ ማናቸውም እንቅስቃሴዎች በሙሉ ከተመለከታቸው ዓለም አቀፍ የህግ ድንጋጌዎች (UN UDHR፣ Budapest Cybercrime Convention፣ FATF AML፣ UNCITRAL፣ WIPO) ጋር የተሳሰሩ እና አስገዳጅ መሆናቸውን አንብቦ ሙሉ በሙሉ መስማማቱን ነው።
              </p>
              <p className="text-xs text-slate-400 italic">
                This document certifies that the individual below has formally acknowledged and consented to universal legal accountability under international public and private law across all platform chambers, communications, and financial rails.
              </p>
            </div>

            {/* Signatory Credentials Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">የተጠቃሚው ሙሉ ስም (Name):</p>
                <p className="font-bold text-amber-300 text-sm">{currentUser.fullName}</p>
                <p className="text-[10px] text-slate-400">{currentUser.role.toUpperCase()}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">ዜግነት (Nationality):</p>
                <p className="font-bold text-slate-200">{currentUser.nationality}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> ባዮሜትሪክ የተረጋገጠ
                </p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">ሰርተፊኬት ቁጥር (Cert ID):</p>
                <p className="font-mono text-slate-200 text-xs">
                  {legalCertificate?.certificateId || 'PENDING-SIGNATURE'}
                </p>
                <p className="text-[10px] text-slate-400">Version 2026.1-GLOBAL</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">የተፈረመበት ቀን (Timestamp):</p>
                <p className="font-mono text-slate-200 text-xs">
                  {legalCertificate?.agreedAt
                    ? new Date(legalCertificate.agreedAt).toLocaleString()
                    : 'አልተፈረመም (Not Signed)'}
                </p>
                <p className="text-[10px] text-amber-400">170+ Nations Jurisdiction</p>
              </div>
            </div>

            {/* Cryptographic Hash Seal */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">ዲጂታል ፊርማ (Cryptographic Signature Hash):</span>
                <span className="font-mono text-emerald-400 truncate max-w-xs">
                  {legalCertificate?.digitalSignatureHash || 'SHA256-PENDING-ACQUISITION-CLICK-SIGN'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                VERIFIED IMMUTABLE SEAL
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
              {!legalCertificate?.isCertified ? (
                <button
                  onClick={handleSignCompact}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-black text-sm shadow-xl shadow-amber-500/20 flex items-center space-x-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>በአለም አቀፍ ህጎቹ እስማማለሁ (Sign Legally Now)</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-2 border border-slate-700"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>ሰርተፊኬቱን አትም (Print Certificate)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('chamber')}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center space-x-2"
                  >
                    <span>ወደ ክፍሎች ግባ (Enter Chambers)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: FREQUENTLY ASKED LEGAL QUESTIONS */}
      {activeSection === 'faq' && (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                የተደጋጋሚ የህግ ጥያቄዎችና መልሶች (Legal FAQs & Clarifications)
              </h3>
              <p className="text-xs text-slate-400">
                ስለ ዓለም አቀፍ ተጠያቂነት፣ ዳኝነት እና ግዴታዎች የተሰጡ ይፋዊ ማብራሪያዎች።
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {FREQUENTLY_ASKED_LEGAL_QUESTIONS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">
                      {faq.amharicQuestion}
                    </h4>
                    <p className="text-xs text-slate-400 italic mt-0.5">
                      {faq.question}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 leading-relaxed space-y-1.5 ml-11">
                  <p className="font-medium text-slate-100">{faq.amharicAnswer}</p>
                  {languageMode !== 'amharic' && (
                    <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                      {faq.answer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
