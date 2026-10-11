import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle, ShieldCheck, Share, Globe } from 'lucide-react';

interface PWAInstallBannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

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
      // Standard browser PWA guidance
      alert(
        'To install "Zebene\'s World":\n1. In your browser menu, tap "Install app" or "Add to Home screen"\n2. Launch directly like a native Android Play Store app anytime!'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative my-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/25 text-white font-extrabold text-2xl">
            ZW
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Android Play Store & PWA Edition
            </span>
            <h2 className="text-xl font-black text-white mt-0.5">
              Install Zebene's World App
            </h2>
            <p className="text-xs text-amber-300 font-serif">
              ዘበነ የመሰረተው አለም • ሞባይል አፕሊኬሽን
            </p>
          </div>

          <p className="text-xs text-slate-300">
            Enjoy full-screen virtual chambers, instant voice translation notifications, HD video feeds, and offline access directly from your phone home screen!
          </p>
        </div>

        <div className="space-y-3 mb-6 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2.5 text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant launch from Android home screen / Play Store icon</span>
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

        <div className="space-y-2">
          <button
            onClick={handleInstallClick}
            className="w-full py-3 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/25 transition-transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install / Add to Home Screen</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
          >
            Continue in Browser
          </button>
        </div>
      </div>
    </div>
  );
};
