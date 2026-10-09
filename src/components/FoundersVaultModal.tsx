import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Lock,
  KeyRound,
  X,
  TrendingUp,
  Percent,
  CheckCircle2,
  Building,
  Landmark,
  Eye,
  EyeOff,
} from 'lucide-react';

interface FoundersVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoundersVaultModal: React.FC<FoundersVaultModalProps> = ({ isOpen, onClose }) => {
  const { founderVault } = useApp();
  const [enteredPass, setEnteredPass] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = founderVault.unlockVault(enteredPass);
    if (!ok) {
      setErrorNotice('Invalid Founder Passcode. Access restricted to platform builder only.');
      setTimeout(() => setErrorNotice(null), 4000);
    } else {
      setEnteredPass('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Founder Private Treasury & Commission Vault
          </h2>
          <p className="text-xs text-amber-400/80 font-medium mt-1">
            ለድህረገፁ ገንቢ የሚከፈለውን ክፍያ ሌሎች በፍፁም ማወቅ የለባቸውም
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Strict Confidentiality: Protected by sovereign cryptography. Not visible to regular citizens.
          </p>
        </div>

        {!founderVault.isUnlocked ? (
          /* Passcode Input screen */
          <form onSubmit={handleUnlock} className="space-y-4 max-w-sm mx-auto">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Enter Founder Secret Passkey (ዘበነ የምስጢር ኮድ):
              </label>

              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={enteredPass}
                  onChange={(e) => setEnteredPass(e.target.value)}
                  placeholder="Enter passcode (e.g., zebene2026)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <span className="text-[10px] text-slate-500 block italic">
                Default Founder Security PIN: <code className="text-amber-400">zebene2026</code>
              </span>
            </div>

            {errorNotice && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-semibold text-center">
                {errorNotice}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authenticate Founder Passkey</span>
            </button>
          </form>
        ) : (
          /* Vault Content when authenticated */
          <div className="space-y-5">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Founder Master Session Active</span>
              </span>
              <button
                onClick={founderVault.lockVault}
                className="text-xs text-rose-400 hover:underline"
              >
                Lock Vault
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Total Platform Volume</span>
                <div className="text-lg font-black text-white">
                  {founderVault.totalPlatformVolumeBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-emerald-400">All 7 Chambers Combined</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-1">
                <span className="text-[11px] text-purple-300 font-medium">
                  Builder 5% Savings Reserve
                </span>
                <div className="text-lg font-black text-purple-300">
                  {founderVault.creatorReserve5PctBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-slate-400">ድህረገፁ ገንቢ ሀላፊነት የተቀመጠ</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl space-y-1">
                <span className="text-[11px] text-amber-300 font-medium">
                  Builder Direct Commission & Payouts
                </span>
                <div className="text-lg font-black text-amber-300">
                  {founderVault.creatorDirectPayoutsBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-slate-400">Continuous Engagement Earnings</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-blue-500/30 rounded-xl space-y-1">
                <span className="text-[11px] text-blue-300 font-medium">10% Bank Reserve Buffer</span>
                <div className="text-lg font-black text-blue-300">
                  {founderVault.bankReserve10PctBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-slate-400">Liquidity & Wire Clearing</span>
              </div>
            </div>

            {/* Bank Integration for Founder */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Landmark className="w-4 h-4" />
                <span>Ethiopian Commercial Settlement Channel</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Connected Account: <strong>Commercial Bank of Ethiopia (CBE) & Telebirr Priority Rails</strong>
              </p>
              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                <span>Account Status: Linked & Synchronized</span>
                <span className="text-emerald-400">Automatic Weekly Clearing Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
