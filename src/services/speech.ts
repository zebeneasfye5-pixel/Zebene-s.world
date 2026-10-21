// Voice synthesis and recognition utilities for Zebene's World

// Map common languages to synthesis locales and fallback names
const langMap: Record<string, string[]> = {
  en: ['en-US', 'en-GB', 'en'],
  am: ['am-ET', 'am', 'en-US'], // fallback to en-US if browser lacks Amharic voice
  om: ['om-ET', 'om', 'en-US'],
  ti: ['ti-ET', 'ti', 'en-US'],
  ar: ['ar-SA', 'ar-EG', 'ar'],
  fr: ['fr-FR', 'fr-CA', 'fr'],
  es: ['es-ES', 'es-MX', 'es'],
  zh: ['zh-CN', 'zh-TW', 'zh'],
  sw: ['sw-KE', 'sw-TZ', 'sw', 'en-US'],
};

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}

// Retain utterances in a top-level array to prevent Chromium from garbage collecting them mid-speech
const activeUtterances: SpeechSynthesisUtterance[] = [];
if (typeof window !== 'undefined') {
  (window as any).__activeUtterances = activeUtterances;
}

// Keep-alive timer to prevent Chrome from pausing speech synthesis after ~15s
let keepAliveTimer: any = null;
function ensureKeepAlive() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (keepAliveTimer) return;
  keepAliveTimer = setInterval(() => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 7000);
}

export function playChimeTone(freq = 660, durationMs = 150) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  } catch (e) {
    // ignore audio context restrictions
  }
}

// Multilingual greeting announcement when user enables Unlimited Continuous Live Listening Channel
export function getListenActivationAnnouncement(langCode: string = 'am'): string {
  switch (langCode) {
    case 'am':
      return 'የቀጥታ ማዳመጫ ቻናል ነቅቷል፤ የሚነገሩ ማናቸውም ንግግሮች ያለገደብ በቀጥታ ይተረጎማሉ።';
    case 'om':
      return 'Sararri dhaggeeffannaa kallattii banameera; jechoonni dubbataman hundi daangaa malee kallattiin hiikamu.';
    case 'ti':
      return 'ናይ ቀጥታ ምስማዕ መስመር ተኸፊቱ ኣሎ፤ ዝኾነ ዝዝረብ ዘረባ ብዘይ ገደብ ብቐጥታ ክትርጎም እዩ።';
    case 'ar':
      return 'تم تفعيل قناة الترجمة المباشرة المستمرة بدون انقطاع.';
    case 'fr':
      return 'Le canal d\'interprétation simultanée continue est maintenant actif sans limite de temps.';
    case 'es':
      return 'El canal de traducción simultánea continua en vivo está activado sin límite de tiempo.';
    case 'zh':
      return '无限制实时同声传译收听频道现已开启。';
    case 'sw':
      return 'Kituo cha utafsiri wa moja kwa moja kiko hewani bila kikomo.';
    case 'en':
    default:
      return 'Unlimited continuous live translation channel is active. You will hear all speeches live without limit.';
  }
}

export function speakText(
  text: string,
  languageCode: string = 'en',
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  if (!text || !text.trim()) return false;

  try {
    ensureKeepAlive();
    // Do not cancel aggressively if already speaking same text
    window.speechSynthesis.cancel();

    // Play subtle high-clarity notification chime
    playChimeTone(587, 100);

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLocales = langMap[languageCode] || [languageCode, 'en-US'];
    utterance.lang = targetLocales[0];

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find((v) =>
        targetLocales.some((loc) => v.lang.toLowerCase().startsWith(loc.toLowerCase()))
      );
      if (match) {
        utterance.voice = match;
      }
    }

    utterance.rate = 0.95; // Slightly slower for international clarity
    utterance.pitch = 1.0;

    // Retain utterance in global array to prevent Chrome GC bug
    activeUtterances.push(utterance);

    const cleanup = () => {
      const idx = activeUtterances.indexOf(utterance);
      if (idx !== -1) {
        activeUtterances.splice(idx, 1);
      }
    };

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      cleanup();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error event:', e);
      cleanup();
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn('Speech synthesis unavailable:', e);
    if (onEnd) onEnd();
    return false;
  }
}

export function isSpeechSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      activeUtterances.length = 0;
    } catch (e) {}
  }
}

export function initSpeechRecognition(
  onResult: (transcript: string) => void,
  onError?: (err: any) => void
): { start: (lang?: string) => void; stop: () => void; isSupported: boolean } {
  if (typeof window === 'undefined') {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      start: () => {},
      stop: () => {},
      isSupported: false,
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };

  if (onError) {
    recognition.onerror = onError;
  }

  return {
    start: (lang?: string) => {
      try {
        if (lang) {
          const langMapLocal: Record<string, string> = {
            am: 'am-ET',
            en: 'en-US',
            ar: 'ar-SA',
            fr: 'fr-FR',
            es: 'es-ES',
            zh: 'zh-CN',
            sw: 'sw-KE',
          };
          recognition.lang = langMapLocal[lang] || lang;
        }
        recognition.start();
      } catch (err) {
        console.warn('Recognition start issue:', err);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {
        console.warn('Recognition stop issue:', err);
      }
    },
    isSupported: true,
  };
}

