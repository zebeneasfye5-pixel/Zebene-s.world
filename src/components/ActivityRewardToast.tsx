import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ActivityRewardToast: React.FC = () => {
  const { lastRewardToast, dismissRewardToast, setIsMemberFinanceModalOpen } = useApp();

  useEffect(() => {
    if (!lastRewardToast) return;
    const timer = setTimeout(() => {
      dismissRewardToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [lastRewardToast, dismissRewardToast]);

  if (!lastRewardToast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-bounce-short">
      <div className="p-3.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-400/80 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-xs text-white backdrop-blur-xl">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-emerald-300">የተሳትፎ ገቢ ተከፍሏል!</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                +{lastRewardToast.amount.toFixed(1)} ETB
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate mt-0.5">
              {lastRewardToast.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              dismissRewardToast();
              setIsMemberFinanceModalOpen(true);
            }}
            className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-[10px] cursor-pointer transition-colors"
          >
            አካውንት እይ
          </button>
          <button
            type="button"
            onClick={dismissRewardToast}
            className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
