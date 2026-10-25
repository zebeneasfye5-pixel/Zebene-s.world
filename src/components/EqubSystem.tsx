import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import {
  Coins,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Landmark,
  Smartphone,
  Play,
  RotateCcw,
} from 'lucide-react';

interface EqubMember {
  id: string;
  name: string;
  avatar: string;
  nationality: string;
  shareUnits: number;
  hasWon: boolean;
  wonCycle?: number;
  payoutDate?: string;
  payoutChannel: string;
}

export const EqubSystem: React.FC = () => {
  const { currentUser, userWallet } = useApp();

  const [cycleFrequency, setCycleFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [shareValueBirr, setShareValueBirr] = useState<number>(5000);
  const [currentRound, setCurrentRound] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [latestWinner, setLatestWinner] = useState<EqubMember | null>(null);

  const [members, setMembers] = useState<EqubMember[]>([
    {
      id: 'eq-1',
      name: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      nationality: 'Ethiopia 🇪🇹',
      shareUnits: 2,
      hasWon: true,
      wonCycle: 1,
      payoutDate: '2026-10-05',
      payoutChannel: 'CBE (1000192837465)',
    },
    {
      id: 'eq-2',
      name: 'Dr. Amina Diallo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      nationality: 'Senegal 🇸🇳',
      shareUnits: 1,
      hasWon: true,
      wonCycle: 2,
      payoutDate: '2026-10-12',
      payoutChannel: 'Swift / Telebirr (+221 77 123 4567)',
    },
    {
      id: 'eq-3',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      nationality: 'Singapore 🇸🇬',
      shareUnits: 1,
      hasWon: false,
      payoutChannel: 'DBS / Telebirr Priority',
    },
    {
      id: 'eq-4',
      name: 'Ato Solomon Tessema',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      nationality: 'Ethiopia 🇪🇹',
      shareUnits: 2,
      hasWon: false,
      payoutChannel: 'CBE (1000284729184)',
    },
    {
      id: 'eq-5',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      nationality: 'Greece 🇬🇷',
      shareUnits: 1,
      hasWon: false,
      payoutChannel: 'National Bank of Greece',
    },
    {
      id: 'eq-6',
      name: currentUser.fullName || 'You (Citizen Member)',
      avatar: currentUser.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      nationality: currentUser.nationality || 'Ethiopia 🇪🇹',
      shareUnits: 1,
      hasWon: false,
      payoutChannel: 'Telebirr Priority (+251 91 123 4567)',
    },
  ]);

  const totalPoolBirr = members.reduce((sum, m) => sum + m.shareUnits * shareValueBirr, 0);

  const handleExecuteDraw = () => {
    const eligibleMembers = members.filter((m) => !m.hasWon);
    if (eligibleMembers.length === 0) {
      alert('ሁሉም አባላት እቁባቸውን ወስደዋል! አዲስ ዙር ጀምሩ (All members have received payouts. Reset for next cycle).');
      return;
    }

    setIsDrawing(true);
    setLatestWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomMember = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
      setLatestWinner(randomMember);
      counter++;
      if (counter > 16) {
        clearInterval(interval);
        // Final winner selection
        const winner = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
        setLatestWinner(winner);
        setIsDrawing(false);

        // Update member state
        setMembers((prev) =>
          prev.map((m) =>
            m.id === winner.id
              ? {
                  ...m,
                  hasWon: true,
                  wonCycle: currentRound,
                  payoutDate: new Date().toISOString().split('T')[0],
                }
              : m
          )
        );

        setCurrentRound((prev) => prev + 1);

        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#6366f1', '#ec4899'],
        });
      }
    }, 120);
  };

  return (
    <div className="space-y-6">
      {/* Equb Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>International Equb • አለም አቀፍ የሉዓላዊ እቁብ</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                ዙር #{currentRound}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              Global Rotating Savings & Financial Solidarity (እቁብ)
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Governed under International Cooperative Financial Standards (UN Guidelines & Commercial Code of Ethiopia). Guaranteed payouts via CBE & Telebirr.
            </p>
          </div>

          {/* Draw Trigger */}
          <button
            onClick={handleExecuteDraw}
            disabled={isDrawing}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Play className={`w-4 h-4 fill-slate-950 ${isDrawing ? 'animate-spin' : ''}`} />
            <span>{isDrawing ? 'እጣው እየተሽከረከረ ነው...' : 'የእቁብ እጣ አውጣ (Draw Lottery)'}</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-1">
          <span className="text-slate-400 font-semibold block">የአንድ እጣ ዋጋ (Share Value)</span>
          <div className="text-2xl font-black text-emerald-400">
            {shareValueBirr.toLocaleString()} ETB
          </div>
          <span className="text-[11px] text-slate-400">≈ ${(shareValueBirr / 55).toFixed(1)} USD per share</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1">
          <span className="text-slate-400 font-semibold block">አጠቃላይ የዙሩ ገቢ (Total Pool)</span>
          <div className="text-2xl font-black text-amber-400">
            {totalPoolBirr.toLocaleString()} ETB
          </div>
          <span className="text-[11px] text-slate-400">Across {members.length} verified global members</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-1">
          <span className="text-slate-400 font-semibold block">ቀጣይ የክፍያ ቀን (Payout Frequency)</span>
          <div className="text-2xl font-black text-indigo-300 capitalize">
            {cycleFrequency}
          </div>
          <span className="text-[11px] text-slate-400">Guaranteed Escrow Protection</span>
        </div>
      </div>

      {/* Latest Winner Banner if drawn */}
      {latestWinner && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center space-x-3.5">
            <img
              src={latestWinner.avatar}
              alt={latestWinner.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
            />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                🎉 የዚህ ዙር አሸናፊ (Cycle Winner):
              </span>
              <h4 className="text-base font-black text-white">{latestWinner.name}</h4>
              <p className="text-xs text-emerald-300 font-semibold">
                የተከፈለው ድምር፦ <strong>{totalPoolBirr.toLocaleString()} ETB</strong> • {latestWinner.payoutChannel}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">
            ✓ ክፍያው በይፋ ተፈጽሟል
          </span>
        </div>
      )}

      {/* Roster of Members */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>የእቁብ አባላት ዝርዝርና የደረሳቸው ሁኔታ (Member Roster)</span>
          </h3>
          <span className="text-xs text-slate-400">
            አሸናፊዎች፦ {members.filter((m) => m.hasWon).length} / {members.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {members.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                m.hasWon
                  ? 'bg-slate-950/80 border-emerald-500/40 text-slate-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <span className="font-bold text-white block truncate max-w-[140px]">{m.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {m.nationality} • {m.shareUnits} እጣ
                  </span>
                </div>
              </div>

              <div>
                {m.hasWon ? (
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold block text-center">
                    ✓ ደርሶታል (ዙር #{m.wonCycle})
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-lg bg-slate-800 text-amber-300 text-[10px] font-bold block text-center">
                    በመጠባበቅ ላይ
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
