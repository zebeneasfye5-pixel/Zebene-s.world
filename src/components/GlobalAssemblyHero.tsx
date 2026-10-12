import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { speakText, stopSpeaking, initSpeechRecognition, playChimeTone } from '../services/speech';
import { translateText } from '../services/api';
import { offlineTranslate } from '../data/offlineData';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Headphones,
  Radio,
  Sparkles,
  Scale,
  FolderOpen,
  ArrowRightLeft,
  CheckCircle2,
  RefreshCw,
  Globe2,
  Users,
  Flag,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
} from 'lucide-react';
import assemblyHeroImg from '../assets/images/global_assembly_hall.jpg';

export interface InterpretationLog {
  id: string;
  timestamp: string;
  speakerName: string;
  sourceLang: string;
  sourceText: string;
  targetLang: string;
  translatedText: string;
  wasSpokenOut: boolean;
}

const SUPPORTED_LANGUAGES = [
  { code: 'am', name: 'አማርኛ (Amharic)', flag: '🇪🇹' },
  { code: 'en', name: 'English (ዓለም አቀፍ)', flag: '🌐' },
  { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', name: 'ትግርኛ (Tigrinya)', flag: '🇪🇹' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'sw', name: 'Kiswahili (Swahili)', flag: '🇰🇪' },
];

export const GlobalAssemblyHero: React.FC = () => {
  const {
    activeChamberCode,
    setActiveTab,
    setIsLegalModalOpen,
    setIsTikil2ryaModalOpen,
    effectiveOnline,
    sendMessage,
    currentUser,
  } = useApp();

  // Interpretation state
  const [speakerLang, setSpeakerLang] = useState<string>('am');
  const [listenerLang, setListenerLang] = useState<string>('en');
  const [isSpeakingListening, setIsSpeakingListening] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [autoHearEnabled, setAutoHearEnabled] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [lastTranslatedText, setLastTranslatedText] = useState<string>(
    'Welcome to the Universal Assembly of Sovereign Peoples! (እንኳን ወደ አለም አቀፍ የሉዓላዊ ህዝቦች ጉባኤ በደህና መጡ!)'
  );
  const [interpretationLogs, setInterpretationLogs] = useState<InterpretationLog[]>([
    {
      id: 'demo-1',
      timestamp: '12:00',
      speakerName: 'ክቡር ዘበነ አስፋው (Convener)',
      sourceLang: 'am',
      sourceText: 'ሰላም ለሁሉም የአለም ህዝቦች ይሁን! በጋራ ተወያይተን አለማችንን ወደተሻለ ሰላም እናሻግራለን።',
      targetLang: 'en',
      translatedText: 'Peace be upon all peoples of the world! Together in dialogue, we shall guide our world towards enduring peace.',
      wasSpokenOut: true,
    },
    {
      id: 'demo-2',
      timestamp: '12:02',
      speakerName: 'Ambassador Jean Dupont (UN Delegate)',
      sourceLang: 'fr',
      sourceText: 'Nous soutenons pleinement la solidarité humaine et la justice universelle.',
      targetLang: 'am',
      translatedText: 'የሰው ልጆች አንድነትን እና አለም አቀፍ ፍትህን በሙሉ ልብ እንደግፋለን።',
      wasSpokenOut: true,
    },
  ]);

  const [isHeroExpanded, setIsHeroExpanded] = useState<boolean>(true);

  // Speech recognition handler for "ለመናገር" button
  const handleStartSpeaking = () => {
    if (isSpeakingListening) {
      setIsSpeakingListening(false);
      return;
    }

    const recognizer = initSpeechRecognition(
      async (transcript) => {
        setIsSpeakingListening(false);
        setInputText(transcript);
        await processLiveTranslation(transcript, speakerLang, listenerLang);
      },
      (err) => {
        console.warn('Speech recognition warning:', err);
        setIsSpeakingListening(false);
      }
    );

    if (recognizer.isSupported) {
      setIsSpeakingListening(true);
      recognizer.start(speakerLang);
    } else {
      // Prompt user or use fallback
      const sample =
        speakerLang === 'am'
          ? 'ሰላም ለሁሉም ህዝቦች ይሁን፤ እኩልነትና ወንድማማችነት ይስፈን!'
          : 'Peace and equal dignity for all global citizens!';
      setInputText(sample);
      processLiveTranslation(sample, speakerLang, listenerLang);
    }
  };

  // Process live translation and auto-playback
  const processLiveTranslation = async (
    textToTranslate: string,
    srcLangCode: string,
    tgtLangCode: string
  ) => {
    if (!textToTranslate.trim()) return;

    setIsTranslating(true);
    const srcObj = SUPPORTED_LANGUAGES.find((l) => l.code === srcLangCode) || SUPPORTED_LANGUAGES[0];
    const tgtObj = SUPPORTED_LANGUAGES.find((l) => l.code === tgtLangCode) || SUPPORTED_LANGUAGES[1];

    let result = '';
    try {
      if (effectiveOnline) {
        result = await translateText(textToTranslate, srcObj.name, tgtObj.name);
      } else {
        result = offlineTranslate(textToTranslate, tgtObj.name);
      }
    } catch {
      result = offlineTranslate(textToTranslate, tgtObj.name);
    }

    setLastTranslatedText(result);
    setIsTranslating(false);

    const newLog: InterpretationLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      speakerName: currentUser.fullName,
      sourceLang: srcLangCode,
      sourceText: textToTranslate,
      targetLang: tgtLangCode,
      translatedText: result,
      wasSpokenOut: autoHearEnabled,
    };

    setInterpretationLogs((prev) => [newLog, ...prev.slice(0, 9)]);

    // Broadcast message to active chamber discourse
    try {
      await sendMessage(`[Voice Live Translation (${srcObj.flag} ➔ ${tgtObj.flag})]: ${textToTranslate} ➔ ${result}`);
    } catch {
      // Chamber broadcast fallback
    }

    // Auto-hear playback if enabled
    if (autoHearEnabled) {
      triggerHearPlayback(result, tgtLangCode);
    }
  };

  // Hear playback button handler for "ለመስማት"
  const triggerHearPlayback = (text: string, langCode: string) => {
    if (isAudioPlaying) {
      stopSpeaking();
      setIsAudioPlaying(false);
      return;
    }

    setIsAudioPlaying(true);
    playChimeTone(660, 100);
    speakText(
      text,
      langCode,
      () => setIsAudioPlaying(true),
      () => setIsAudioPlaying(false)
    );
  };

  const handleSwapLanguages = () => {
    const temp = speakerLang;
    setSpeakerLang(listenerLang);
    setListenerLang(temp);
  };

  // Sample quick speech phrases in chosen language
  const samplePhrases: Record<string, string[]> = {
    am: [
      'ሰላም ለሁሉም የአለም ህዝቦች ይሁን! (Peace to all peoples)',
      'የሰው ልጆች ሁሉ እኩል እና ወንድማማች ናቸው! (All humanity is equal)',
      'በዚህ ታላቅ አዳራሽ በነፃነት እንወያይ! (Let us deliberate freely)',
    ],
    en: [
      'Peace, justice, and solidarity across all nations! (ሰላምና ፍትህ)',
      'Universal human dignity is sacred and inviolable! (የሰው ልጅ ክብር)',
      'Constructive dialogue unites the entire world! (ውይይት አለምን አንድ ያደርጋል)',
    ],
    om: [
      'Nagaan ummata addunyaa hundaaf haa ta\'u! (ሰላም ለሁሉም)',
      'Tokkummaa fi wal-kabajuun haa dagaagu! (አንድነትና መከባበር)',
    ],
    ti: [
      'ሰላምን ፍቕርን ንኹሉ ህዝቢ ዓለም ይኹን! (ሰላምና ፍቅር)',
      'ብሓባር ንዘተን ሓድነትን ንስራሕ! (በጋራ እንስራ)',
    ],
    ar: [
      'السلام والعدل لجميع شعوب العالم! (ሰላምና ፍትህ ለዓለም ህዝቦች)',
    ],
    fr: [
      'Paix, dignité et unité pour toute l\'humanité! (ሰላምና ክብር ለሰው ልጆች)',
    ],
  };

  const currentPhrases = samplePhrases[speakerLang] || samplePhrases['en'];

  return (
    <div className="relative mb-6 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-slate-950 shadow-2xl transition-all">
      {/* Top Background Image: Majestic International Assembly Hall with World Flags and People in Dialogue */}
      <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden group">
        <img
          src={assemblyHeroImg}
          alt="Grand International Diplomatic Assembly Hall with Flags of Nations and Citizens in Dialogue"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

        {/* Top Badges & Chamber Dial Indicator */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-slate-950" />
              <span>Global Sovereign Assembly • ጠቅላላ ጉባኤ</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-500/40">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>170+ Nations Harmonized • የዓለም ህዝቦች የጋራ አዳራሽ</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsHeroExpanded(!isHeroExpanded)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md text-xs font-bold flex items-center space-x-1.5 transition-colors"
              title="Toggle Live Voice Console Details"
            >
              <span>{isHeroExpanded ? 'ትርጓሜን አሳንስ (Collapse)' : 'የቀጥታ ድምፅ ትርጓሜ (Live Voice)'}</span>
              {isHeroExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Hero Banner Titles in Both English and Amharic */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              ● Live Simultaneous Interpretation (የቀጥታ ድምፅና ቋንቋ ትርጓሜ ንቁ ነው)
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold">
              Bilingual Amharic & English Platform (ሁለትዮሽ እንግሊዝኛና አማርኛ)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Zebene's World •{' '}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
              ዘበነ የመሰረተው አለም
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-200 font-medium max-w-4xl drop-shadow leading-relaxed">
            <strong className="text-amber-300">Global Diplomatic Congress & People's Sanctuary:</strong> An
            international forum uniting all nations, flags, and cultures in transparent dialogue, verified identity, and
            strict rule of law under UN UDHR and cybercrime treaties.
            <br className="hidden sm:inline" />
            <span className="text-slate-300 text-xs sm:text-sm">
              (የሁሉም ሀገራት ባንዲራዎች እና ህዝቦች በነጻነት፣ በሰላም፣ እና በህጋዊ ተጠያቂነት የሚወያዩበት አለም አቀፍ የሉዓላዊ ዲሞክራሲ የጋራ አዳራሽ)
            </span>
          </p>
        </div>
      </div>

      {/* Real-Time Live Voice Interpretation Console (3ኛ መስፈርት: ለመናገር እና ለመስማት ቁልፎች) */}
      {isHeroExpanded && (
        <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  የቀጥታ የድምፅና የቋንቋ መተርጎሚያ ሲስተም • Real-Time Voice Interpretation Engine
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ማንኛውም ሰው በመረጠው ቋንቋ ሲናገር ሌላኛው ሰው ደግሞ በቀጥታ አውቶማቲካሊ በሌላ ቋንቋ የተነገረውን በራሱ በመረጠው ቋንቋ በጥራት የሚሰማበት ሲስተም
                (Speak in any tongue, listen translated in real-time with crystal clear audio).
              </p>
            </div>

            {/* Quick Actions to Directives & Legal Dossier */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsTikil2ryaModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 border border-amber-500/40 text-amber-300 text-xs font-black flex items-center space-x-1.5 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>📁 ጥቅል መመሪያ (Bundle Directives)</span>
              </button>
              <button
                onClick={() => setIsLegalModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>ዓለም አቀፍ ሕግ (International Law)</span>
              </button>
            </div>
          </div>

          {/* Interactive Dual Console: Speaker Controls vs Listener Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1. SPEAKER PANEL: [ለመናገር / SPEAK] */}
            <div className="rounded-2xl bg-slate-900/90 border border-indigo-500/30 p-4 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                      <span>ተናጋሪ / Speaker:</span>
                      <span className="text-indigo-400 font-bold">የንግግር ቋንቋህን ምረጥ (Choose Input Tongue)</span>
                    </h4>
                  </div>
                </div>

                {/* Speaker Language Selector */}
                <select
                  value={speakerLang}
                  onChange={(e) => setSpeakerLang(e.target.value)}
                  className="bg-slate-950 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-indigo-500/40 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Input / Speech Transcript */}
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      speakerLang === 'am'
                        ? 'እዚህ ፃፍ ወይም «ለመናገር» የሚለውን ቁልፍ በመጫን በቀጥታ በድምፅ ተናገር...'
                        : 'Type here or click "SPEAK (ለመናገር)" to speak live via your microphone...'
                    }
                    rows={2}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {inputText && (
                    <button
                      onClick={() => setInputText('')}
                      className="absolute top-2 right-2 text-slate-500 hover:text-slate-300 text-[10px] px-1.5 py-0.5 rounded bg-slate-800"
                    >
                      አፅዳ (Clear)
                    </button>
                  )}
                </div>

                {/* Quick Preset Phrases */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  <span className="text-slate-500 text-[10px] whitespace-nowrap">ፈጣን አረፍተ ነገር:</span>
                  {currentPhrases.map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputText(phrase);
                        processLiveTranslation(phrase, speakerLang, listenerLang);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 whitespace-nowrap transition-colors"
                    >
                      {phrase.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* MAIN BUTTON: [ለመናገር / SPEAK] */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={handleStartSpeaking}
                  className={`flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-lg transition-all ${
                    isSpeakingListening
                      ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-500/30'
                      : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
                  }`}
                >
                  {isSpeakingListening ? (
                    <>
                      <MicOff className="w-5 h-5 text-white" />
                      <span>ድምፅህን እያዳመጠ ነው... ለመጨረስ ተጫን (Listening Live...)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 text-white" />
                      <span>ለመናገር ተጫን (SPEAK / Voice Input)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => processLiveTranslation(inputText, speakerLang, listenerLang)}
                  disabled={!inputText.trim() || isTranslating}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-indigo-300 font-bold text-xs border border-slate-700 flex items-center space-x-1.5 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                  <span>ተርጉም (Translate)</span>
                </button>
              </div>
            </div>

            {/* 2. LISTENER PANEL: [ለመስማት / LISTEN] */}
            <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-4 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                      <span>አድማጭ / Listener:</span>
                      <span className="text-emerald-400 font-bold">የምትሰማበት ቋንቋ (Output Tongue)</span>
                    </h4>
                  </div>
                </div>

                {/* Listener Language Selector */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSwapLanguages}
                    title="ቋንቋዎችን ለዋውጥ (Swap Source & Target Languages)"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <select
                    value={listenerLang}
                    onChange={(e) => setListenerLang(e.target.value)}
                    className="bg-slate-950 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Translation Output Box */}
              <div className="space-y-2">
                <div className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 min-h-[72px] flex flex-col justify-between">
                  <div className="text-xs sm:text-sm font-medium text-emerald-300 leading-relaxed">
                    {isTranslating ? (
                      <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ትርጓሜው በቅጽበት እየተዘጋጀ ነው... (Translating speech in real-time...)
                      </span>
                    ) : (
                      lastTranslatedText
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span>
                      የተተረጎመበት ቋንቋ: {SUPPORTED_LANGUAGES.find((l) => l.code === listenerLang)?.name}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> ጥራት: High Fidelity AI Audio
                    </span>
                  </div>
                </div>

                {/* Auto-Hear Toggle */}
                <div className="flex items-center justify-between text-xs px-1 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ቀጥታ አውቶማቲክ ድምፅ ማዳመጥ (Auto-Hear Live Speech):</span>
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoHearEnabled}
                      onChange={(e) => setAutoHearEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* MAIN BUTTON: [ለመስማት / LISTEN] */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => triggerHearPlayback(lastTranslatedText, listenerLang)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm shadow-lg transition-all ${
                    isAudioPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse shadow-amber-500/30'
                      : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-500/25'
                  }`}
                >
                  {isAudioPlaying ? (
                    <>
                      <VolumeX className="w-5 h-5" />
                      <span>ድምፁ እየተሰማ ነው... ለማቆም ተጫን (Playing Speech... Click to Stop)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      <span>ለመስማት ተጫን (HEAR / Audio Playback)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => triggerHearPlayback(lastTranslatedText, listenerLang)}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs border border-slate-700 flex items-center space-x-1.5 transition-colors"
                  title="ደግመህ አዳምጥ (Repeat Audio)"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ድገም (Replay)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Translation History Feed (Directly demonstrates simultaneous conversation in multiple tongues) */}
          <div className="rounded-2xl bg-slate-950/70 border border-slate-800/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                <span>የቀጥታ ትርጓሜ ታሪክ (Live Interpretation Stream)</span>
              </span>
              <span className="text-[10px] text-slate-500">
                አውቶማቲካሊ የተተረጎመ የንግግር መዝገብ (Recent Transcripts)
              </span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-none pr-1">
              {interpretationLogs.map((log) => {
                const sLang = SUPPORTED_LANGUAGES.find((l) => l.code === log.sourceLang);
                const tLang = SUPPORTED_LANGUAGES.find((l) => l.code === log.targetLang);
                return (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <span className="font-bold text-slate-200">{log.speakerName}</span>
                        <span>•</span>
                        <span>{log.timestamp}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-300">
                          {sLang?.flag} {sLang?.name.split(' ')[0]} ➔ {tLang?.flag} {tLang?.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-slate-300 text-xs">
                        <span className="text-slate-400">የተነገረው:</span> «{log.sourceText}»
                      </div>
                      <div className="text-emerald-300 font-medium text-xs">
                        <span className="text-slate-400">የተተረጎመው:</span> «{log.translatedText}»
                      </div>
                    </div>

                    <button
                      onClick={() => triggerHearPlayback(log.translatedText, log.targetLang)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center space-x-1.5 transition-colors"
                      title="ይህንን ንግግር በድምፅ አዳምጥ (Listen to this speech)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>አዳምጥ (Hear)</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
