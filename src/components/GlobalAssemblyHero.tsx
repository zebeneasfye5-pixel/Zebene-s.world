import React, { useState } from 'react';
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
  ArrowRightLeft,
  CheckCircle2,
  RefreshCw,
  Globe2,
  Users,
  ChevronDown,
  ChevronUp,
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
    effectiveOnline,
    sendMessage,
    currentUser,
    broadcastVoiceAudio,
    userLanguage,
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
      speakerName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye - Founder)',
      sourceLang: 'am',
      sourceText: 'ሰላም ለሁሉም የአለም ህዝቦች ይሁን! በጋራ ተወያይተን አለማችንን ወደተሻለ ሰላም እናሻግራለን።',
      targetLang: 'en',
      translatedText: 'Peace be upon all peoples of the world! Together in dialogue, we shall guide our world towards enduring peace.',
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
      const sample =
        speakerLang === 'am'
          ? 'ሰላም ለሁሉም ህዝቦች ይሁን፤ እኩልነትና ወንድማማችነት ይስፈን!'
          : 'Peace and equal dignity for all global citizens!';
      setInputText(sample);
      processLiveTranslation(sample, speakerLang, listenerLang);
    }
  };

  // Process live translation and broadcast across room
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
      speakerName: currentUser.fullName || 'Citizen',
      sourceLang: srcLangCode,
      sourceText: textToTranslate,
      targetLang: tgtLangCode,
      translatedText: result,
      wasSpokenOut: autoHearEnabled,
    };

    setInterpretationLogs((prev) => [newLog, ...prev.slice(0, 5)]);

    // Broadcast across WebSocket to all connected peers in chamber
    try {
      broadcastVoiceAudio(result, tgtLangCode);
      await sendMessage(`[Voice Live Translation (${srcObj.flag} ➔ ${tgtObj.flag})]: ${textToTranslate} ➔ ${result}`);
    } catch (e) {
      // fallback
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

  return (
    <div className="relative mb-5 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-slate-950 shadow-2xl transition-all">
      {/* Top Background Image: Majestic International Assembly Hall with World Flags */}
      <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px] overflow-hidden group">
        <img
          src={assemblyHeroImg}
          alt="Grand International Diplomatic Assembly Hall with Flags of Nations and Citizens in Dialogue"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-slate-950" />
              <span>Global Sovereign Assembly • ጠቅላላ ጉባኤ</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-semibold border border-amber-500/40">
              <Users className="w-3 h-3 text-amber-400" />
              <span>170+ Nations • የዓለም ህዝቦች የጋራ አዳራሽ</span>
            </span>
          </div>

          <button
            onClick={() => setIsHeroExpanded(!isHeroExpanded)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
            title="Toggle Live Voice Console"
          >
            <span>{isHeroExpanded ? 'ትርጓሜን አሳንስ (Collapse)' : 'የድምፅ መተርጎሚያ (Live Voice)'}</span>
            {isHeroExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Hero Banner Titles - Compact & Uncluttered */}
        <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 z-10 space-y-1">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
            Zebene's World •{' '}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
              ዘበነ የመሰረተው አለም
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-semibold drop-shadow">
            ዓለም አቀፍ የሉዓላዊ ዲሞክራሲ ጉባኤ • Universal Sovereign Diplomatic Assembly
          </p>
        </div>
      </div>

      {/* Streamlined Live Voice Interpretation Console (Clean & Direct) */}
      {isHeroExpanded && (
        <div className="p-3 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 space-y-3.5">
          {/* Dual Console: Speaker Controls vs Listener Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* 1. SPEAKER PANEL: [ለመናገር / SPEAK] */}
            <div className="rounded-2xl bg-slate-950 border border-indigo-500/30 p-3 sm:p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    1
                  </span>
                  <span className="text-xs font-bold text-white">
                    ተናጋሪ (Speaker Language):
                  </span>
                </div>

                <select
                  value={speakerLang}
                  onChange={(e) => setSpeakerLang(e.target.value)}
                  className="bg-slate-900 text-slate-200 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-indigo-500/40 focus:outline-none"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Input / Speech Input */}
              <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      processLiveTranslation(inputText, speakerLang, listenerLang);
                    }
                  }}
                  placeholder={
                    speakerLang === 'am'
                      ? 'እዚህ ፃፍ ወይም «ለመናገር» የሚለውን ተጫን...'
                      : 'Type here or click "SPEAK" to talk via mic...'
                  }
                  className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none pr-16"
                />
                {inputText && (
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="absolute right-2 top-2 text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Action Buttons: SPEAK & TRANSLATE */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartSpeaking}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSpeakingListening
                      ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  }`}
                >
                  {isSpeakingListening ? (
                    <>
                      <MicOff className="w-4 h-4 text-white" />
                      <span>እያዳመጠ ነው... (Listening Live)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 text-white" />
                      <span>ለመናገር ተጫን (Speak)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => processLiveTranslation(inputText, speakerLang, listenerLang)}
                  disabled={!inputText.trim() || isTranslating}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-indigo-300 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
                  <span>ተርጉም (Translate)</span>
                </button>
              </div>
            </div>

            {/* 2. LISTENER PANEL: [ለመስማት / LISTEN] */}
            <div className="rounded-2xl bg-slate-950 border border-emerald-500/30 p-3 sm:p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    2
                  </span>
                  <span className="text-xs font-bold text-white">
                    አድማጭ (Listening Language):
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={handleSwapLanguages}
                    title="ቋንቋዎችን ለዋውጥ (Swap Languages)"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <select
                    value={listenerLang}
                    onChange={(e) => setListenerLang(e.target.value)}
                    className="bg-slate-900 text-slate-200 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-emerald-500/40 focus:outline-none"
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
              <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 min-h-[46px] flex items-center justify-between">
                <div className="text-xs text-emerald-300 font-medium truncate pr-2">
                  {isTranslating ? (
                    <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      እየተተረጎመ ነው...
                    </span>
                  ) : (
                    lastTranslatedText
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <label className="flex items-center gap-1 text-[10px] text-slate-400 cursor-pointer mr-1">
                    <Headphones className="w-3 h-3 text-emerald-400" />
                    <span>Auto-Hear</span>
                    <input
                      type="checkbox"
                      checked={autoHearEnabled}
                      onChange={(e) => setAutoHearEnabled(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* Action Button: HEAR PLAYBACK */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => triggerHearPlayback(lastTranslatedText, listenerLang)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAudioPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                  }`}
                >
                  {isAudioPlaying ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>ድምፁ እየተሰማ ነው... (Playing Audio)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>ለመስማት ተጫን (Hear Audio Playback)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
