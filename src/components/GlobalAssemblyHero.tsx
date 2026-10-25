import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  speakText,
  stopSpeaking,
  initSpeechRecognition,
  playChimeTone,
  getListenActivationAnnouncement,
} from '../services/speech';
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
  Activity,
  Compass,
  Sparkles,
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

interface GlobalAssemblyHeroProps {
  onOpenMasterDashboard?: () => void;
  onOpenAuthGate?: () => void;
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

export const GlobalAssemblyHero: React.FC<GlobalAssemblyHeroProps> = ({
  onOpenMasterDashboard,
  onOpenAuthGate,
}) => {
  const {
    effectiveOnline,
    sendMessage,
    currentUser,
    broadcastVoiceAudio,
    userLanguage,
    setUserLanguage,
    messages,
  } = useApp();

  // Interpretation state
  const [speakerLang, setSpeakerLang] = useState<string>('am');
  const [listenerLang, setListenerLang] = useState<string>('en');
  const [isSpeakingListening, setIsSpeakingListening] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // UNLIMITED CONTINUOUS LIVE LISTENING CHANNEL (ገደብ የለሽ የቀጥታ ማዳመጫ ቻናል)
  const [isUnlimitedListening, setIsUnlimitedListening] = useState<boolean>(false);
  const [isVoiceOutputActive, setIsVoiceOutputActive] = useState<boolean>(false);
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

  // Synchronize language selection with entire website UI text
  useEffect(() => {
    if (userLanguage && userLanguage !== speakerLang) {
      setSpeakerLang(userLanguage);
    }
  }, [userLanguage]);

  // Audio keep-alive heartbeat while Unlimited Listening Mode is active
  useEffect(() => {
    if (!isUnlimitedListening) return;

    // Periodic heartbeat to prevent browser audio context from sleeping
    const heartbeatInterval = setInterval(() => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(50, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {}
    }, 10000);

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [isUnlimitedListening]);

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
      wasSpokenOut: isUnlimitedListening,
    };

    setInterpretationLogs((prev) => [newLog, ...prev.slice(0, 5)]);

    // Broadcast across WebSocket to all connected peers in chamber
    try {
      broadcastVoiceAudio(result, tgtLangCode);
      await sendMessage(`[Voice Live Translation (${srcObj.flag} ➔ ${tgtObj.flag})]: ${textToTranslate} ➔ ${result}`);
    } catch (e) {
      // fallback
    }

    // If Unlimited Listening Channel is ACTIVE, speak the translated speech immediately into user's headphones!
    if (isUnlimitedListening) {
      playChimeTone(660, 90);
      speakText(
        result,
        tgtLangCode,
        () => setIsVoiceOutputActive(true),
        () => setIsVoiceOutputActive(false)
      );
    }
  };

  // UNLIMITED CONTINUOUS LIVE LISTENING TOGGLE (ገደብ የለሽ የቀጥታ ማዳመጫ)
  const toggleUnlimitedListening = () => {
    if (isUnlimitedListening) {
      // User explicitly stopped listening
      setIsUnlimitedListening(false);
      setIsVoiceOutputActive(false);
      stopSpeaking();
    } else {
      // User turned on Unlimited Continuous Live Listening
      setIsUnlimitedListening(true);
      playChimeTone(784, 150);

      // Instantly speak verbal activation announcement in listener's language
      const announcement = getListenActivationAnnouncement(listenerLang);
      speakText(
        announcement,
        listenerLang,
        () => setIsVoiceOutputActive(true),
        () => {
          setIsVoiceOutputActive(false);
          // If a translated text is currently ready, play it right after
          if (lastTranslatedText && lastTranslatedText.trim()) {
            setTimeout(() => {
              speakText(
                lastTranslatedText,
                listenerLang,
                () => setIsVoiceOutputActive(true),
                () => setIsVoiceOutputActive(false)
              );
            }, 300);
          }
        }
      );
    }
  };

  // Hear playback button handler for re-playing the current translation on demand
  const triggerSinglePlayback = (text: string, langCode: string) => {
    playChimeTone(660, 100);
    speakText(
      text,
      langCode,
      () => setIsVoiceOutputActive(true),
      () => setIsVoiceOutputActive(false)
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
      <div className="relative w-full h-[100px] sm:h-[130px] lg:h-[160px] overflow-hidden group">
        <img
          src={assemblyHeroImg}
          alt="Grand International Diplomatic Assembly Hall with Flags of Nations and Citizens in Dialogue"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Minimal top control bar over hero image: Clean & Pure without text clutter */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <button
            onClick={() => setIsHeroExpanded(!isHeroExpanded)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-100 border border-slate-700/80 backdrop-blur-md text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
            title="Toggle Live Voice Console"
          >
            <span>{isHeroExpanded ? 'ትርጓሜን አሳንስ (Collapse)' : 'የድምፅ መተርጎሚያ (Live Voice)'}</span>
            {isHeroExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
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
                  onChange={(e) => {
                    const code = e.target.value;
                    setSpeakerLang(code);
                    setUserLanguage(code);
                  }}
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
                    onChange={(e) => {
                      const code = e.target.value;
                      setListenerLang(code);
                      setUserLanguage(code);
                    }}
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
              <div className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 min-h-[50px] flex items-center justify-between">
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
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    isUnlimitedListening ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Radio className={`w-3 h-3 ${isUnlimitedListening ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                    <span>{isUnlimitedListening ? 'Live 24/7' : 'Standby'}</span>
                  </span>
                </div>
              </div>

              {/* UNLIMITED CONTINUOUS LIVE LISTENING CONTROLS (ገደብ የለሽ የቀጥታ ማዳመጫ) */}
              <div className="space-y-2">
                {isUnlimitedListening ? (
                  <>
                    <button
                      type="button"
                      onClick={toggleUnlimitedListening}
                      className="w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-between bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30 border-2 border-emerald-300 ring-2 ring-emerald-400/40 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                        </span>
                        <div className="text-left">
                          <span className="block font-black text-xs uppercase tracking-wide">
                            🟢 ገደብ የለሽ ማዳመጫ ነቅቷል (ማዳመጥ አቁም)
                          </span>
                          <span className="block text-[10px] text-emerald-100 font-semibold">
                            {isVoiceOutputActive ? 'ድምፅ እየተናገረ ነው... (Speaking Live)' : 'ያለገደብ ክፍት ነው • Unlimited Live Stream Active'}
                          </span>
                        </div>
                      </div>

                      {/* Animated Live Audio Equalizer Waveform */}
                      <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/20">
                        {[14, 26, 18, 30, 22, 28, 16].map((h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full ${
                              isVoiceOutputActive ? 'bg-amber-300 animate-bounce' : 'bg-emerald-300 animate-pulse'
                            }`}
                            style={{ height: `${h}px`, animationDuration: `${0.35 + (i % 3) * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </button>

                    {/* Sub-bar: Status and Replay */}
                    <div className="flex items-center justify-between text-[11px] bg-slate-900 border border-emerald-500/30 rounded-xl px-3 py-1.5 text-emerald-300">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>ያለጊዜ ገደብ ቀጣይነት ያለው የቀጥታ ድምፅ ክፍት ነው</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerSinglePlayback(lastTranslatedText, listenerLang)}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-200 text-[10px] font-bold border border-emerald-500/40 cursor-pointer"
                      >
                        ድጋሚ አሰማ (Re-Play)
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={toggleUnlimitedListening}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg border border-emerald-400/40 transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-200" />
                    <span>ለመስማት ተጫን • ገደብ የለሽ የቀጥታ ማዳመጫ ክፈት (Start Unlimited Live Hearing)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
