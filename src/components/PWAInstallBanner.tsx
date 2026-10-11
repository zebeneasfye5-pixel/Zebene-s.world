import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle, ShieldCheck, Share, Globe, Play, Info } from 'lucide-react';
import { GlobalEmblem } from './GlobalEmblem';

interface PWAInstallBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlayStoreGuide?: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  isOpen,
  onClose,
  onOpenPlayStoreGuide,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualSteps, setShowManualSteps] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowManualSteps(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative my-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="Close / ዝጋ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-5">
          {/* Official International Emblem */}
          <div className="flex justify-center">
            <GlobalEmblem size="lg" showGlow={true} />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              Sovereign Mobile Edition • PWA & Play Store
            </span>
            <h2 className="text-xl font-black text-white mt-0.5">
              Install Zebene's World App
            </h2>
            <p className="text-xs text-amber-300 font-serif">
              ዘበነ የመሰረተው አለም • ሞባይል አፕሊኬሽን
            </p>
          </div>

          <p className="text-xs text-slate-300">
            Enjoy full-screen virtual chambers, instant voice translation, HD video stage, and full offline access directly from your phone home screen!
          </p>
        </div>

        <div className="space-y-2.5 mb-5 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant launch from Android home screen (እንደ ማንኛውም አፕሊኬሽን)</span>
          </div>
          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-amber-300">
              ⚡ 100% Offline Support — Works without internet anywhere (ያለ ኢንተርኔት ይሰራል)
            </span>
          </div>
          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted local biometric face authentication & local wallet</span>
          </div>
        </div>

        {/* Manual Instructions Banner if browser needs manual menu click */}
        {showManualSteps && (
          <div className="p-3.5 mb-4 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs space-y-1 text-amber-200">
            <div className="font-bold flex items-center gap-1.5 text-amber-300">
              <Info className="w-4 h-4 shrink-0" />
              <span>በስልክዎ ላይ ለመጫን (To Install on Phone):</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              1. በብራውዘርዎ ከላይ ወይም ከታች ያሉትን <strong>ሶስት ነጥቦች (⋮)</strong> ወይም የ <strong>Share</strong> ምልክት ይጫኑ።<br />
              2. <strong>"Install app"</strong> ወይም <strong>"Add to Home screen (ወደ መነሻ ስክሪን ጨምር)"</strong> የሚለውን ይምረጡ።<br />
              3. ልክ እንደ Play Store አፕ ወዲያውኑ በስልክዎ ላይ ይቀመጣል!
            </p>
          </div>
        )}

        <div className="space-y-2.5">
          <button
            onClick={handleInstallClick}
            className="w-full py-3 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/25 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install / Add to Home Screen (በስልክህ ጫነው)</span>
          </button>

          {onOpenPlayStoreGuide && (
            <button
              onClick={() => {
                onClose();
                onOpenPlayStoreGuide();
              }}
              className="w-full py-2.5 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 fill-indigo-400" />
              <span>ለምን በPlay Store ሰርች አልመጣም? (Play Store Guide)</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Continue in Browser (በድረ-ገጽ ቀጥል)
          </button>
        </div>
      </div>
    </div>
  );
};
