import React, { useState } from 'react';
import { useApp, FounderWithdrawal } from '../context/AppContext';
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
  ArrowDownToLine,
  Smartphone,
  CreditCard,
  Building2,
  Receipt,
  FileText,
  Printer,
  ShieldCheck,
  Coins,
  History,
  Layers,
} from 'lucide-react';

interface FoundersVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoundersVaultModal: React.FC<FoundersVaultModalProps> = ({ isOpen, onClose }) => {
  const { founderVault } = useApp();

  // Authentication states
  const [enteredPass, setEnteredPass] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  // Active sub-tab inside the unlocked vault
  const [activeTab, setActiveTab] = useState<'withdraw' | 'overview' | 'history' | 'security'>('withdraw');

  // Withdrawal form states
  const [withdrawChannel, setWithdrawChannel] = useState('Commercial Bank of Ethiopia (CBE)');
  const [withdrawAccount, setWithdrawAccount] = useState('1000167413618');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('50000');
  const [withdrawNote, setWithdrawNote] = useState('የገንቢው የትርፍ ድርሻ ወጪ / Developer Revenue Disbursal');
  const [confirmAuthPin, setConfirmAuthPin] = useState('');
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<FounderWithdrawal | null>(null);

  // Passcode change states
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCurrentPassRevealed, setShowCurrentPassRevealed] = useState(false);
  const [changeStatus, setChangeStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  // Total available for developer withdrawal: direct commissions + 5% reserve
  const totalWithdrawable =
    founderVault.creatorDirectPayoutsBirr + founderVault.creatorReserve5PctBirr;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = founderVault.unlockVault(enteredPass);
    if (!ok) {
      setErrorNotice(
        'የተሳሳተ ሚስጥር ቁጥር! እባክዎ ትክክለኛውን የገቢ ቁልፍ ያስገቡ። / Invalid passcode! Please enter the correct developer key.'
      );
      setTimeout(() => setErrorNotice(null), 5000);
    } else {
      setEnteredPass('');
      setErrorNotice(null);
    }
  };

  const handleInitiateWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setWithdrawStatus({
        type: 'error',
        text: 'እባክዎ ትክክለኛ የገንዘብ መጠን ያስገቡ! / Please enter a valid withdrawal amount.',
      });
      return;
    }

    if (amount > totalWithdrawable) {
      setWithdrawStatus({
        type: 'error',
        text: `የተጠየቀው መጠን (${amount.toLocaleString()} ETB) ካለው ጠቅላላ ተቀማጭ (${totalWithdrawable.toLocaleString()} ETB) በላይ ነው! / Requested amount exceeds available balance.`,
      });
      return;
    }

    // Security re-check with current passcode
    if (confirmAuthPin.trim() !== founderVault.currentPasscode) {
      setWithdrawStatus({
        type: 'error',
        text: 'የገቢ ማረጋገጫ ሚስጥር ቁጥር የተሳሳተ ነው! / Invalid authorization passcode for withdrawal.',
      });
      return;
    }

    const result = founderVault.makeFounderWithdrawal(
      withdrawChannel,
      withdrawAccount.trim(),
      amount,
      withdrawNote.trim()
    );

    if (result.success) {
      setWithdrawStatus({ type: 'success', text: result.message });
      setConfirmAuthPin('');
      if (result.withdrawal) {
        setSelectedReceipt(result.withdrawal);
      }
      setTimeout(() => setWithdrawStatus(null), 7000);
    } else {
      setWithdrawStatus({ type: 'error', text: result.message });
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
    if (
      window.confirm(
        'መክፈቻ ሚስጥር ቁጥሩን ወደ መጀመሪያው ነባሪ መመለስ ይፈልጋሉ? / Are you sure you want to reset passcode to default?'
      )
    ) {
      founderVault.resetPasscode();
      setChangeStatus({
        type: 'success',
        text: 'የገንቢው የገቢ ቁልፍ መክፈቻ ሚስጥር ቁጥር ወደ ነባሪ ተመልሷል! / Passcode successfully reset to default.',
      });
      setTimeout(() => setChangeStatus(null), 6000);
    }
  };

  const setPresetAmount = (amt: number) => {
    const safeAmt = Math.min(amt, totalWithdrawable);
    setWithdrawAmount(safeAmt.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-6 text-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="ዝጋ / Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex p-2.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2 shadow-inner">
            <Key className="w-7 h-7" />
          </div>
          <div className="inline-block px-2.5 py-0.5 mb-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
            የገንቢው የግል ካዝና • Developer Sovereign Treasury
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            የገንቢው የገቢ ቁልፍ እና የገንዘብ ወጪ ማዘዣ
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-300">
            Founder & Developer Revenue Vault & Payout Center
          </p>
          <p className="text-xs text-amber-400/90 font-medium mt-1">
            ለድህረገፁ ገንቢ (ክቡር ዘበነ አስፍዬ) የተፈቀደ የግል የገቢ ቁጠባ እና የባንክ ወጪ ስርዓት
          </p>
        </div>

        {!founderVault.isUnlocked ? (
          /* ======================================================== */
          /* PASSCODE INPUT SCREEN - STRICT PRIVACY (NO PASSCODE SHOWN) */
          /* ======================================================== */
          <form onSubmit={handleUnlock} className="space-y-4 max-w-sm mx-auto">
            <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-200">
                  የገቢ ቁልፍ መክፈቻ ሚስጥር ቁጥር:
                </label>
                <span className="text-[10px] text-amber-400/80 font-mono flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  ጥብቅ ሚስጥር / Secret PIN
                </span>
              </div>

              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={enteredPass}
                  onChange={(e) => setEnteredPass(e.target.value)}
                  placeholder="ሚስጥር ቁጥር ያስገቡ / Enter Passcode"
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

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ይህ ሚስጥር ቁጥር ለገንቢው ብቻ የተጠበቀ ነው። / Strictly restricted to platform developer.</span>
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
          /* ======================================================== */
          /* AUTHENTICATED FOUNDER HUB WITH COMPLETE WITHDRAWAL SYSTEM */
          /* ======================================================== */
          <div className="space-y-4">
            {/* Top Status & Recipient Banner */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-white font-extrabold flex items-center gap-1.5">
                    <span>ክቡር ዘበነ አስፍዬ (Zebene Asfeye)</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      የመድረኩ ባለቤትና ገንቢ
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    የገንቢው የግል ካዝናና የገንዘብ ወጪ ማዘዣ ንቁ ነው • Authorized Developer Treasury Active
                  </div>
                </div>
              </span>

              <button
                onClick={founderVault.lockVault}
                className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-colors cursor-pointer self-end sm:self-center"
              >
                ካዝናውን ቆልፍ / Lock
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`flex-1 min-w-[120px] py-2 px-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'withdraw'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>ገንዘብ ወጪ ማድረጊያ (Withdraw)</span>
              </button>

              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>የገቢ ስታትስቲክስ (Overview)</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'history'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>የወጪ ታሪክ ({founderVault.withdrawals?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'security'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>ሚስጥር ቁጥር (Security)</span>
              </button>
            </div>

            {/* TAB 1: WITHDRAWAL SYSTEM (ገንዘቡን ወጭ የሚደረግበት ሲስተም) */}
            {activeTab === 'withdraw' && (
              <div className="space-y-4">
                {/* Available Balance Header Card */}
                <div className="p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                        አሁን ወጪ ሊደረግ የሚችል ጠቅላላ ቀሪ ሂሳብ / Total Withdrawable Balance
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                        {totalWithdrawable.toLocaleString()} <span className="text-lg text-white font-sans">ETB</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ≈ ${(totalWithdrawable / 125).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                        (ዓለም አቀፍ ግምት)
                      </div>
                    </div>

                    <div className="text-right sm:text-right bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="text-[10px] text-slate-400">የተከፋፈለ የገቢ ቋት:</div>
                      <div className="text-[11px] text-amber-200">
                        የቀጥታ ገቢ: <strong>{founderVault.creatorDirectPayoutsBirr.toLocaleString()} ETB</strong>
                      </div>
                      <div className="text-[11px] text-purple-300">
                        5% ቁጠባ: <strong>{founderVault.creatorReserve5PctBirr.toLocaleString()} ETB</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ተጠቃሚ (Beneficiary): <strong>ዘበነ አስፍዬ (Zebene Asfeye)</strong>
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      እስካሁን ወጪ የተደረገ: {founderVault.totalWithdrawnBirr?.toLocaleString() || '75,000'} ETB
                    </span>
                  </div>
                </div>

                {/* Status message */}
                {withdrawStatus && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      withdrawStatus.type === 'success'
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                    }`}
                  >
                    {withdrawStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    )}
                    <span>{withdrawStatus.text}</span>
                  </div>
                )}

                {/* Withdrawal Form */}
                <form onSubmit={handleInitiateWithdrawal} className="space-y-4">
                  {/* Select Channel */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-200">
                      1. የክፍያ ማስተላለፊያ አማራጭ ይምረጡ / Select Payout Channel:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        {
                          name: 'Commercial Bank of Ethiopia (CBE)',
                          label: 'ንግድ ባንክ (CBE)',
                          sub: 'Priority Direct Rail',
                          icon: Landmark,
                        },
                        {
                          name: 'Telebirr Priority Payout',
                          label: 'ቴሌብር (Telebirr)',
                          sub: 'Instant Settlement',
                          icon: Smartphone,
                        },
                        {
                          name: 'Bank of Abyssinia (Apollo)',
                          label: 'አቢሲኒያ ባንክ',
                          sub: 'Real-time Transfer',
                          icon: Building,
                        },
                        {
                          name: 'Dashen Bank / Amole',
                          label: 'ዳሸን ባንክ',
                          sub: 'Direct Account Rail',
                          icon: Building2,
                        },
                        {
                          name: 'Awash Bank Payout',
                          label: 'አዋሽ ባንክ',
                          sub: 'Secure Rail',
                          icon: Landmark,
                        },
                        {
                          name: 'PayPal / International Wire',
                          label: 'PayPal / Swift',
                          sub: 'USD Cross-border',
                          icon: CreditCard,
                        },
                        {
                          name: 'Crypto USDT (TRC20)',
                          label: 'USDT (Crypto)',
                          sub: 'Instant Settlement',
                          icon: Coins,
                        },
                      ].map((ch) => {
                        const Icon = ch.icon;
                        const isSelected = withdrawChannel === ch.name;
                        return (
                          <button
                            type="button"
                            key={ch.name}
                            onClick={() => {
                              setWithdrawChannel(ch.name);
                              if (ch.name.includes('Telebirr')) {
                                setWithdrawAccount('+251 91 123 4567');
                              } else if (ch.name.includes('PayPal')) {
                                setWithdrawAccount('zebeneasfye5@gmail.com');
                              } else if (ch.name.includes('Crypto')) {
                                setWithdrawAccount('TN7xK8m9P2q1vZ...usdt');
                              } else if (ch.name.includes('CBE')) {
                                setWithdrawAccount('1000167413618');
                              } else {
                                setWithdrawAccount('200084729103');
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                              <div className="text-xs font-bold leading-tight truncate">{ch.label}</div>
                            </div>
                            <div className="text-[9px] text-slate-400 truncate">{ch.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Destination Account & Beneficiary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        የሂሳብ ቁጥር / የስልክ ቁጥር (Account / Wallet / Phone):
                      </label>
                      <input
                        type="text"
                        value={withdrawAccount}
                        onChange={(e) => setWithdrawAccount(e.target.value)}
                        placeholder="ለምሳሌ: 1000167413618 ወይም 0911234567"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        ተጠቃሚ (Account Holder Name):
                      </label>
                      <input
                        type="text"
                        value="ዘበነ አስፍዬ (Zebene Asfeye)"
                        readOnly
                        className="w-full bg-slate-950/70 border border-slate-800 text-amber-300 rounded-xl px-3 py-2.5 text-xs font-bold cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Amount Selector */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold text-slate-300">
                        2. ወጪ የሚደረገው የገንዘብ መጠን (Amount in ETB):
                      </label>
                      <span className="text-[11px] text-slate-400">
                        የቀረ ሂሳብ:{' '}
                        <strong className="text-amber-300 font-mono">
                          {Math.max(0, totalWithdrawable - (parseFloat(withdrawAmount) || 0)).toLocaleString()} ETB
                        </strong>
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        min="100"
                        max={totalWithdrawable}
                        step="100"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="የብር መጠን ያስገቡ"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl pl-3.5 pr-16 py-2.5 text-sm text-white font-mono font-bold"
                        required
                      />
                      <span className="absolute right-3.5 top-2.5 text-xs font-bold text-amber-400">ETB</span>
                    </div>

                    {/* Quick amount buttons */}
                    <div className="flex flex-wrap gap-1.5">
                      {[10000, 50000, 100000, 250000, 500000].map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => setPresetAmount(amt)}
                          className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors cursor-pointer"
                        >
                          +{amt.toLocaleString()} ETB
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setPresetAmount(totalWithdrawable)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 transition-colors cursor-pointer"
                      >
                        ሙሉውን ወጪ አድርግ (All)
                      </button>
                    </div>
                  </div>

                  {/* Transfer Note & Security PIN Confirmation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        የወጪ ማብራሪያ (Purpose / Remark):
                      </label>
                      <input
                        type="text"
                        value={withdrawNote}
                        onChange={(e) => setWithdrawNote(e.target.value)}
                        placeholder="የማስተላለፊያ ማስታወሻ"
                        className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>የገቢ ማረጋገጫ ሚስጥር ቁጥር:</span>
                        <span className="text-[10px] text-amber-400/80 font-mono">Authorization PIN</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPin ? 'text' : 'password'}
                          value={confirmAuthPin}
                          onChange={(e) => setConfirmAuthPin(e.target.value)}
                          placeholder="ማረጋገጫ ሚስጥር ቁጥርዎን ያስገቡ"
                          className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl pl-3 pr-8 py-2 text-xs text-white font-mono"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPin(!showConfirmPin)}
                          className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200"
                          tabIndex={-1}
                        >
                          {showConfirmPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <ArrowDownToLine className="w-4 h-4 text-slate-950" />
                    <span>ገንዘቡን ወጪ አድርግ • Confirm & Disburse Funds</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: OVERVIEW & RESERVES */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium">Total Platform Volume</span>
                    <div className="text-base sm:text-lg font-black text-white font-mono">
                      {founderVault.totalPlatformVolumeBirr.toLocaleString()} ETB
                    </div>
                    <span className="text-[10px] text-emerald-400">ጠቅላላ የመድረኩ የገቢ ልውውጥ</span>
                  </div>

                  <div className="p-3.5 bg-slate-950 border border-purple-500/30 rounded-xl space-y-1">
                    <span className="text-[11px] text-purple-300 font-medium">Builder 5% Savings Reserve</span>
                    <div className="text-base sm:text-lg font-black text-purple-300 font-mono">
                      {founderVault.creatorReserve5PctBirr.toLocaleString()} ETB
                    </div>
                    <span className="text-[10px] text-slate-400">ለገንቢው 5% የተቀመጠ ቋሚ ቁጠባ</span>
                  </div>

                  <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl space-y-1">
                    <span className="text-[11px] text-amber-300 font-medium">Builder Direct Commission</span>
                    <div className="text-base sm:text-lg font-black text-amber-300 font-mono">
                      {founderVault.creatorDirectPayoutsBirr.toLocaleString()} ETB
                    </div>
                    <span className="text-[10px] text-slate-400">የገንቢው የቀጥታ ኮሚሽን ክፍያዎች</span>
                  </div>

                  <div className="p-3.5 bg-slate-950 border border-blue-500/30 rounded-xl space-y-1">
                    <span className="text-[11px] text-blue-300 font-medium">10% Bank Reserve Buffer</span>
                    <div className="text-base sm:text-lg font-black text-blue-300 font-mono">
                      {founderVault.bankReserve10PctBirr.toLocaleString()} ETB
                    </div>
                    <span className="text-[10px] text-slate-400">የባንክ ማረጋጊያና መጠባበቂያ ቋት</span>
                  </div>
                </div>

                {/* Bank Integration Specs */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Landmark className="w-4 h-4" />
                    <span>የኢትዮጵያ ንግድ ባንክ እና ቴሌብር የገቢ ማስተላለፊያ / Settlement Rails</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    የተገናኘ ሂሳብ: <strong>Commercial Bank of Ethiopia (CBE) & Telebirr Priority Direct Channels</strong>
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>
                      ተጠቃሚ: <strong>ዘበነ አስፍዬ (Zebene Asfeye)</strong>
                    </span>
                    <span className="text-emerald-400 font-semibold">ሳምንታዊና ቀጥታ ልውውጥ ንቁ ነው</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DISBURSAL HISTORY & RECEIPTS */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">የተጠናቀቁ የወጪ ክፍያዎች ታሪክ:</span>
                  <span className="text-[11px] text-slate-400">
                    ድምር ወጪ: <strong>{founderVault.totalWithdrawnBirr?.toLocaleString() || '75,000'} ETB</strong>
                  </span>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {(!founderVault.withdrawals || founderVault.withdrawals.length === 0) ? (
                    <div className="p-6 text-center text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                      እስካሁን የተፈጸመ ወጪ የለም።
                    </div>
                  ) : (
                    founderVault.withdrawals.map((w) => (
                      <div
                        key={w.id}
                        className="p-3 bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs space-y-1.5 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
                              <ArrowDownToLine className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <div className="font-bold text-white">{w.channel}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                A/C: {w.accountNumber} • Ref: {w.referenceCode}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-amber-400 font-mono text-sm">
                              -{w.amountBirr.toLocaleString()} ETB
                            </div>
                            <div className="text-[9px] text-emerald-400 font-semibold uppercase">
                              ● {w.status === 'completed' ? 'ተጠናቋል' : 'በሂደት ላይ'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                          <span>
                            {w.date} {w.time} • {w.note || 'የገንቢ ክፍያ'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(w)}
                            className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>ደረሰኝ እይ / View Receipt</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: PASSCODE MANAGEMENT (SECURITY) */}
            {activeTab === 'security' && (
              <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-xl space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      የገቢ ቁልፍ ሚስጥር ቁጥር ማስተካከያ (Change Passcode)
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      የገንቢው መክፈቻ ሚስጥር ቁጥር በማንኛውም ጊዜ መቀየር ይችላሉ።
                    </p>
                  </div>
                </div>

                {/* Current passcode display badge - MASKED BY DEFAULT */}
                <div className="flex items-center justify-between text-[11px] bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400">የአሁኑ መክፈቻ ቁጥር (Current Status):</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {showCurrentPassRevealed ? founderVault.currentPasscode : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassRevealed(!showCurrentPassRevealed)}
                      className="p-1 text-slate-400 hover:text-white"
                      title="አሳይ / ደብቅ"
                    >
                      {showCurrentPassRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
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

                <form onSubmit={handlePasscodeChange} className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      የአሁኑ ሚስጥር ቁጥር (Current Passcode):
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPass ? 'text' : 'password'}
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder="የአሁኑን ሚስጥር ቁጥር ያስገቡ"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg pl-3 pr-8 py-2 text-xs text-white focus:outline-none font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                        tabIndex={-1}
                      >
                        {showOldPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
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
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-slate-700 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>ወደ ነባሪ መልስ / Reset to Default</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* OFFICIAL WITHDRAWAL RECEIPT MODAL */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1 mb-4 border-b border-slate-800 pb-3">
                <div className="inline-flex p-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-1">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white">
                  የገንዘብ ወጪ ማረጋገጫ ደረሰኝ
                </h3>
                <p className="text-[11px] font-mono text-amber-300">
                  OFFICIAL DEVELOPER DISBURSAL VOUCHER
                </p>
                <p className="text-[10px] text-slate-400">
                  Ref Code: {selectedReceipt.referenceCode}
                </p>
              </div>

              <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">ተጠቃሚ / Beneficiary:</span>
                  <strong className="text-white">{selectedReceipt.recipientName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">የክፍያ መስመር / Channel:</span>
                  <strong className="text-amber-300">{selectedReceipt.channel}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">የሂሳብ ቁጥር / A/C:</span>
                  <strong className="text-white font-mono">{selectedReceipt.accountNumber}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">የተላለፈው ገንዘብ / Amount:</span>
                  <strong className="text-emerald-400 font-mono text-sm">
                    {selectedReceipt.amountBirr.toLocaleString()} ETB
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-400">ቀንና ሰዓት / Timestamp:</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {selectedReceipt.date} {selectedReceipt.time}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">ሁኔታ / Settlement:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    ✓ COMPLETED & SETTLED
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>ደረሰኝ አትም / Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  ተቀበል / Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
