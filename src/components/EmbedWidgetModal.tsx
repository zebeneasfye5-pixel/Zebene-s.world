import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Copy,
  Check,
  X,
  ExternalLink,
  Globe2,
  Layers,
  Sparkles,
  Maximize2,
  MonitorSmartphone,
  ShieldCheck,
} from 'lucide-react';

export const EmbedWidgetModal: React.FC = () => {
  const { isEmbedModalOpen, setIsEmbedModalOpen, activeChamberCode, userLanguage } = useApp();

  const [embedType, setEmbedType] = useState<'full' | 'chamber' | 'nuptial' | 'voice_pill'>('full');
  const [embedWidth, setEmbedWidth] = useState('100%');
  const [embedHeight, setEmbedHeight] = useState('780px');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isEmbedModalOpen) return null;

  const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-7t24bbefvjbfmx3q3mm3pp-125744783365.europe-west1.run.app';
  
  const getEmbedSrc = () => {
    switch (embedType) {
      case 'chamber':
        return `${currentDomain}?embed=true&chamber=${activeChamberCode}&lang=${userLanguage}`;
      case 'nuptial':
        return `${currentDomain}?embed=true&chamber=5&mode=wedding&lang=${userLanguage}`;
      case 'voice_pill':
        return `${currentDomain}?embed=true&widget=voice_interpreter&lang=${userLanguage}`;
      case 'full':
      default:
        return `${currentDomain}?embed=true&lang=${userLanguage}`;
    }
  };

  const iframeSnippet = `<!-- Zebene's World Sovereign International Assembly Embedded Widget -->
<iframe
  src="${getEmbedSrc()}"
  width="${embedWidth}"
  height="${embedHeight}"
  style="border: 2px solid rgba(245, 158, 11, 0.4); border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden;"
  allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
  loading="lazy"
  title="Zebene's World - Universal Sovereign Assembly"
></iframe>`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(iframeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-6 text-slate-100">
        <button
          onClick={() => setIsEmbedModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-5 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-indigo-600/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>በማንኛውም ድህረገፅ ላይ የመክተቻ ሲስተም (Embed Widget)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Easily embed and run Zebene's World seamlessly inside any external website, news portal, or organization page.
            </p>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-2 block">
              የመክተቻ አይነት ምረጥ (Select Embed Mode):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEmbedType('full')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  embedType === 'full'
                    ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ሙሉ ጉባኤ (Full Assembly)
              </button>

              <button
                type="button"
                onClick={() => setEmbedType('chamber')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  embedType === 'chamber'
                    ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ክፍል #{activeChamberCode} ብቻ (Chamber)
              </button>

              <button
                type="button"
                onClick={() => setEmbedType('nuptial')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  embedType === 'nuptial'
                    ? 'bg-pink-600 border-pink-400 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                የሰርግ ቤት (Wedding Hall)
              </button>

              <button
                type="button"
                onClick={() => setEmbedType('voice_pill')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  embedType === 'voice_pill'
                    ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                የድምፅ መተርጎሚያ (Voice Widget)
              </button>
            </div>
          </div>

          {/* Sizing options */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">ስፋት (Width):</label>
              <input
                type="text"
                value={embedWidth}
                onChange={(e) => setEmbedWidth(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">ቁመት (Height):</label>
              <input
                type="text"
                value={embedHeight}
                onChange={(e) => setEmbedHeight(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Generated Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                የተዘጋጀ የ HTML ኮድ (Copy and Paste to Any Website):
              </span>
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedCode ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'ተገልብጧል!' : 'ኮፒ አድርግ (Copy Snippet)'}</span>
              </button>
            </div>

            <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-[11px] font-mono text-emerald-300 overflow-x-auto select-all max-h-48 leading-relaxed">
              {iframeSnippet}
            </pre>
          </div>

          {/* Security & Permissions Note */}
          <div className="p-3 bg-indigo-950/30 rounded-2xl border border-indigo-500/30 flex items-start space-x-2.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>የፈቃድ ጥበቃ (Permissions Included)፦</strong> ይህ ኮድ ካሜራ (Camera)፣ ማይክሮፎን (Microphone)፣ የቀጥታ ቪዲዮና ድምፅ በሌሎች ድህረገፆች ላይ ያለምንም እክል እንዲሰራ አስፈላጊ የሆኑትን የ <code>allow="..."</code> ፈቃዶች ያካተተ ነው።
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
