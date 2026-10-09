// Voice synthesis and recognition utilities for Zebene's World

export function speakText(text: string, languageCode: string = 'en') {
  if (!('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map common languages to synthesis locales
    const langMap: Record<string, string> = {
      en: 'en-US',
      am: 'am-ET',
      ar: 'ar-SA',
      fr: 'fr-FR',
      es: 'es-ES',
      zh: 'zh-CN',
      sw: 'sw-KE'
    };

    utterance.lang = langMap[languageCode] || 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis unavailable:', e);
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function initSpeechRecognition(
  onResult: (transcript: string) => void,
  onError?: (err: any) => void
): { start: () => void; stop: () => void; isSupported: boolean } {
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
    start: () => {
      try {
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
