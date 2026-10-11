import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, Wifi, CheckCircle2, BookOpen, Video, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, isSimulatedOffline, toggleSimulateOffline } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const effectiveOnline = isOnline && !isSimulatedOffline;

  if (effectiveOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 border-2 border-amber-500/70 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-slate-100 ring-4 ring-amber-500/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-amber-300">
                  ኦፍላይን ሞድ ነቅቷል (Offline Active)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono text-amber-200">
                  ያለ ኢንተርኔት ይሰራል
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                {isSimulatedOffline
                  ? 'የኦፍላይን ሙከራ ሁነታ ላይ ነዎት። ሁሉም ፋይሎች እና ዳታዎች በኮምፒውተርዎ ላይ ይገኛሉ።'
                  : 'የበይነመረብ (ኢንተርኔት) ግንኙነት ባይኖርም ድህረገፁ ሙሉ ለሙሉ ይሰራል!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Expand details"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Offline Feature Checklist */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-amber-500/30 space-y-2 text-xs">
            <p className="font-bold text-amber-200 text-[11px] uppercase tracking-wider">
              ያለ ኢንተርኔት የሚሰሩ አገልግሎቶች (Offline Capabilities):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>7ቱም ቤቶች እና መቀመጫዎች (7 Chambers)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>የፊት ለፊት ኤችዲ ቪዲዮ ካሜራ (Local HD Webcam)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>የድምፅና ፅሁፍ ኦፍላይን ትርጉም (Offline Dictionary)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>የትምህርት አድማስ ማህደር (Offline Knowledge Vault)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>የእውቀት ውድድር እና ሎተሪ (Offline Trivia & Lottery)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>የካሽ እና የባንክ መዝገብ (Local Storage Wallet)</span>
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] text-slate-400 font-medium">
            Service Worker Cached • 100% PWA
          </span>
          {isSimulatedOffline ? (
            <button
              onClick={toggleSimulateOffline}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
            >
              <Wifi className="w-3 h-3" />
              <span>ወደ ኦንላይን መልስ (Go Online)</span>
            </button>
          ) : (
            <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              ዳታ በኮምፒውተርዎ ተቀምጧል
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
