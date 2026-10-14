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
  Key,
  RotateCcw,
  Sparkles,
  AlertCircle,
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

  // Passcode change states
  const [showChangeSection, setShowChangeSection] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [changeStatus, setChangeStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = founderVault.unlockVault(enteredPass);
    if (!ok) {
      setErrorNotice('የተሳሳተ ሚስጥር ቁጥር! ነባሪው መክፈቻ 2026 ወይም የቀየሩት ቁጥር ነው። / Invalid passcode! Default key is 2026 or your custom PIN.');
      setTimeout(() => setErrorNotice(null), 5000);
    } else {
      setEnteredPass('');
      setErrorNotice(null);
    }
  };

  const handlePasscodeChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setChangeStatus({
        type: 'error',
        text: 'አዲሱ ሚስጥር ቁጥር እና የተረጋገጠው ቁጥር አይመሳሰሉም! / New passcode and confirmation do not match.',
      });
      return;
    }

    const res = founderVault.changePasscode(oldPass, newPass);
    if (res.success) {
      setChangeStatus({ type: 'success', text: res.message });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setChangeStatus(null), 6000);
    } else {
      setChangeStatus({ type: 'error', text: res.message });
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('መክፈቻ ሚስጥር ቁጥሩን ወደ ነባሪ 2026 መመለስ ይፈልጋሉ? / Are you sure you want to reset passcode to default 2026?')) {
      founderVault.resetPasscode();
      setChangeStatus({
        type: 'success',
        text: 'የገንቢው የገቢ ቁልፍ መክፈቻ ሚስጥር ቁጥር ወደ ነባሪ 2026 ተመልሷል! / Passcode successfully reset to default 2026.',
      });
      setTimeout(() => setChangeStatus(null), 6000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="ዝጋ / Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2 shadow-inner">
            <Key className="w-8 h-8" />
          </div>
          <div className="inline-block px-2.5 py-0.5 mb-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
            የገንቢው የገቢ ቁልፍ • Developer Revenue Key
          </div>
          <h2 className="text-xl font-black text-white">
            የገንቢው የገቢ ቁልፍና የግል ካዝና
          </h2>
          <p className="text-sm font-semibold text-slate-300">
            Founder & Developer Private Revenue Vault
          </p>
          <p className="text-xs text-amber-400/90 font-medium mt-1.5">
            ለድህረገፁ ገንቢ (ክቡር ዘበነ አስፍዬ) የሚከፈለውን ክፍያና ገቢ በጥብቅ ሚስጥር የሚጠብቅ
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Strict Confidentiality: Protected by developer encryption. Hidden from public view.
          </p>
        </div>

        {!founderVault.isUnlocked ? (
          /* Passcode Input screen */
          <form onSubmit={handleUnlock} className="space-y-4 max-w-sm mx-auto">
            <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-200">
                  የገቢ ቁልፍ መክፈቻ ሚስጥር ቁጥር:
                </label>
                <span className="text-[10px] text-amber-400 font-mono font-bold">Default: 2026</span>
              </div>

              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={enteredPass}
                  onChange={(e) => setEnteredPass(e.target.value)}
                  placeholder="ሚስጥር ቁጥር ያስገቡ (ለምሳሌ: 2026)"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white focus:outline-none font-mono tracking-wider"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  መክፈቻ ሚስጥር ቁጥር: <code className="text-amber-400 font-bold font-mono">2026</code>
                </span>
                <button
                  type="button"
                  onClick={() => setEnteredPass('2026')}
                  className="text-[10px] font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                >
                  2026 አስገባ (Quick Fill)
                </button>
              </div>
            </div>

            {errorNotice && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-xs text-rose-300 font-semibold text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>የገቢ ካዝናውን ክፈት / Authenticate & Unlock</span>
            </button>

            <p className="text-[11px] text-center text-slate-400">
              * ካዝናው ከተከፈተ በኋላ ሚስጥር ቁጥሩን በማንኛውም ጊዜ መቀየር ይችላሉ።
            </p>
          </form>
        ) : (
          /* Vault Content when authenticated */
          <div className="space-y-5">
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-white font-extrabold">ክቡር ዘበነ አስፍዬ (Zebene Asfeye)</div>
                  <div className="text-[10px] text-emerald-400 font-medium">የገንቢው የገቢ ማስተዳደሪያ ክፍት ነው • Active Founder Vault</div>
                </div>
              </span>
              <button
                onClick={founderVault.lockVault}
                className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-colors"
              >
                ካዝናውን ቆልፍ / Lock
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Total Platform Volume</span>
                <div className="text-base sm:text-lg font-black text-white">
                  {founderVault.totalPlatformVolumeBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-emerald-400">ጠቅላላ የመድረኩ የገቢ ልውውጥ</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-1">
                <span className="text-[11px] text-purple-300 font-medium">
                  Builder 5% Savings Reserve
                </span>
                <div className="text-base sm:text-lg font-black text-purple-300">
                  {founderVault.creatorReserve5PctBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-slate-400">ለገንቢው 5% የተቀመጠ ቁጠባ</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl space-y-1">
                <span className="text-[11px] text-amber-300 font-medium">
                  Builder Direct Commission
                </span>
                <div className="text-base sm:text-lg font-black text-amber-300">
                  {founderVault.creatorDirectPayoutsBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-slate-400">የገንቢው የቀጥታ ክፍያዎች</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-blue-500/30 rounded-xl space-y-1">
                <span className="text-[11px] text-blue-300 font-medium">10% Bank Reserve Buffer</span>
                <div className="text-base sm:text-lg font-black text-blue-300">
                  {founderVault.bankReserve10PctBirr.toLocaleString()} ETB
                </div>
                <span className="text-[10px] text-slate-400">የባንክ ማረጋጊያ ቋት</span>
              </div>
            </div>

            {/* Bank Integration for Founder */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Landmark className="w-4 h-4" />
                <span>የኢትዮጵያ ንግድ ባንክ እና ቴሌብር የገቢ ማስተላለፊያ / Settlement Rails</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                የተገናኘ ሂሳብ: <strong>Commercial Bank of Ethiopia (CBE) & Telebirr Priority Direct Channel</strong>
              </p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>ተጠቃሚ: <strong>ዘበነ አስፍዬ (Zebene Asfeye)</strong></span>
                <span className="text-emerald-400 font-semibold">ሳምንታዊ ቀጥታ ልውውጥ ንቁ ነው</span>
              </div>
            </div>

            {/* Passcode Management Box (ቀጣይ መቀየር እንዲቻል) */}
            <div className="p-4 bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/40 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      የገቢ ቁልፍ ሚስጥር ቁጥር ማስተካከያ (Change Passcode)
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      የገንቢው መክፈቻ ቁጥር ነባሪ 2026 ነው። ቀጣይ መቀየር ይችላሉ።
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowChangeSection(!showChangeSection)}
                  className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold transition-colors"
                >
                  {showChangeSection ? 'ደብቅ / Hide' : 'ሚስጥር ቁጥር ቀይር / Change'}
                </button>
              </div>

              {/* Current passcode display badge */}
              <div className="flex items-center justify-between text-[11px] bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800">
                <span className="text-slate-400">የአሁኑ መክፈቻ ቁጥር (Current Key):</span>
                <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {founderVault.currentPasscode}
                </span>
              </div>

              {changeStatus && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                    changeStatus.type === 'success'
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                  }`}
                >
                  {changeStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{changeStatus.text}</span>
                </div>
              )}

              {showChangeSection && (
                <form onSubmit={handlePasscodeChange} className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      የአሁኑ ሚስጥር ቁጥር (Current Passcode):
                    </label>
                    <input
                      type="password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="የአሁኑን ቁጥር ያስገቡ (ለምሳሌ 2026)"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        አዲሱ ሚስጥር ቁጥር (New Passcode):
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="አዲሱን ቁጥር ያስገቡ"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg pl-3 pr-8 py-2 text-xs text-white focus:outline-none font-mono"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                          tabIndex={-1}
                        >
                          {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        አዲሱን ቁጥር አረጋግጥ (Confirm):
                      </label>
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="በድጋሚ ያስገቡ"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>አዲሱን ሚስጥር ቁጥር መዝግብ / Save New Passcode</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>ወደ ነባሪ 2026 መልስ</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
