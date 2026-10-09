import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe2,
  Users2,
  Landmark,
  LockKeyhole,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Headphones,
  Video,
  Key,
} from 'lucide-react';

export const ChamberNavigator: React.FC = () => {
  const { chambers, activeChamberCode, switchChamber } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe2': return <Globe2 className="w-5 h-5" />;
      case 'Users2': return <Users2 className="w-5 h-5" />;
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'LockKeyhole': return <LockKeyhole className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Globe2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="mb-6">
      {/* Keyboard Hint banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-rose-500/10 border border-amber-500/20 rounded-xl p-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-2">
        <div className="flex items-center space-x-2">
          <Key className="w-4 h-4 text-amber-400" />
          <span>
            <strong className="text-amber-300 font-semibold">Universal Hotkey Dial:</strong> Press numeric keys{' '}
            <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-400 rounded border border-slate-700 font-mono font-bold">1</kbd> through{' '}
            <kbd className="px-1.5 py-0.5 bg-slate-800 text-amber-400 rounded border border-slate-700 font-mono font-bold">7</kbd> anywhere to switch sovereign chambers instantly.
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-emerald-400" /> HD Video Active
          </span>
          <span className="flex items-center gap-1">
            <Headphones className="w-3.5 h-3.5 text-indigo-400" /> AI Speech Translation On
          </span>
        </div>
      </div>

      {/* Grid of the 7 Chambers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
        {chambers.map((ch) => {
          const isActive = ch.code === activeChamberCode;
          return (
            <button
              key={ch.code}
              onClick={() => switchChamber(ch.code)}
              className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/95 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500" />
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-800 text-slate-300 group-hover:text-white'
                    }`}
                  >
                    #{ch.code}
                  </div>
                  <div className={`${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                    {getIcon(ch.icon)}
                  </div>
                </div>

                <h3 className="font-bold text-xs text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {ch.name}
                </h3>
                <p className="text-[11px] text-amber-400/90 font-medium font-sans mt-0.5 line-clamp-1">
                  {ch.amharicName}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[80px]">{ch.badge}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
