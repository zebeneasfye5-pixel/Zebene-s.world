import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  CreditCard,
  Building2,
  Smartphone,
  Landmark,
  CheckCircle2,
  X,
  History,
  Sparkles,
  TrendingUp,
  Receipt,
  Printer,
  Copy,
  Check,
  Coins,
  ShieldCheck,
  Scale,
  Award,
  Zap,
} from 'lucide-react';

interface MemberFinancialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemberFinancialModal: React.FC<MemberFinancialModalProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    userWallet,
    makeDeposit,
    makeWithdrawal,
    rewardUserAction,
    effectiveOnline,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'earnings' | 'history'>('overview');

  // Deposit Form State
  const [depositChannel, setDepositChannel] = useState('Commercial Bank of Ethiopia (CBE)');
  const [depositAccount, setDepositAccount] = useState('1000167413618');
  const [depositAmount, setDepositAmount] = useState('500');
  const [depositReference, setDepositReference] = useState('');
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string | null>(null);

  // Withdrawal Form State
  const [withdrawChannel, setWithdrawChannel] = useState('Commercial Bank of Ethiopia (CBE)');
  const [withdrawAccount, setWithdrawAccount] = useState('1000167413618');
  const [withdrawAmount, setWithdrawAmount] = useState('200');
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawSuccessMsg, setWithdrawSuccessMsg] = useState<string | null>(null);

  // Filter for history
  const [historyFilter, setHistoryFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'earning'>('all');

  // Copied account state
  const [copiedAcc, setCopiedAcc] = useState(false);

  if (!isOpen) return null;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;

    const ok = makeDeposit(
      depositChannel,
      depositAccount.trim() || '1000167413618',
      amount,
      depositReference.trim()
    );

    if (ok) {
      setDepositSuccessMsg(
        `${amount.toLocaleString()} ETB በ${depositChannel} በተሳካ ሁኔታ ገቢ ተደርጓል! የአካውንትዎ ቀሪ ሂሳብ ተጨምሯል።`
      );
      setDepositReference('');
      setTimeout(() => setDepositSuccessMsg(null), 6000);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setWithdrawError('እባክዎ ትክክለኛ የገንዘብ መጠን ያስገቡ!');
      return;
    }
    if (amount > userWallet.balanceBirr) {
      setWithdrawError(
        `ያለዎት ቀሪ ሂሳብ (${userWallet.balanceBirr.toLocaleString()} ETB) ከጠየቁት መጠን (${amount.toLocaleString()} ETB) ያነሰ ነው!`
      );
      return;
    }

    setWithdrawError(null);
    const ok = makeWithdrawal(withdrawChannel, withdrawAccount.trim() || '1000167413618', amount);

    if (ok) {
      setWithdrawSuccessMsg(
        `${amount.toLocaleString()} ETB ወደ ${withdrawChannel} (A/C: ${withdrawAccount.trim() || '1000167413618'}) በተሳካ ሁኔታ ወጪ ተደርጓል!`
      );
      setTimeout(() => setWithdrawSuccessMsg(null), 6000);
    }
  };

  const handleCopyZebeneCBE = () => {
    navigator.clipboard.writeText('1000167413618');
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2500);
  };

  const filteredTransactions = userWallet.transactions.filter((tx) => {
    if (historyFilter === 'all') return true;
    return tx.type === historyFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-xl overflow-y-auto">
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-4xl w-full p-4 sm:p-7 shadow-2xl relative my-6 text-slate-100 max-h-[92vh] flex flex-col">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-slate-800 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/20">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                የአባሉ የግል የሂሳብና የገቢ/ወጪ ሲስተም
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 font-bold">
                Personal Member Ledger
              </span>
            </div>
            <p className="text-xs text-slate-400">
              አባል፦ <strong className="text-white">{currentUser.fullName || 'ክቡር አባል'}</strong> • ዜግነት፦ {currentUser.nationality}
            </p>
          </div>
        </div>

        {/* Top Balance Summary Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 mb-4 shrink-0 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                የአሁኑ ወጪ ሊደረግ የሚችል ቀሪ ሂሳብ / Withdrawable Balance
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight mt-0.5">
                {userWallet.balanceBirr.toLocaleString()} <span className="text-lg text-white font-sans font-bold">ETB</span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                ≈ ${(userWallet.balanceBirr / 125).toFixed(2)} USD • የድህረገፅ ተሳትፎ ጠቅላላ ገቢ፦{' '}
                <strong className="text-amber-300">{userWallet.lifetimeEarnedBirr.toLocaleString()} ETB</strong>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('deposit')}
                className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowDownToLine className="w-4 h-4 text-emerald-200" />
                <span>ገቢ አድርግ (Deposit)</span>
              </button>

              <button
                onClick={() => setActiveTab('withdraw')}
                className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowUpFromLine className="w-4 h-4 text-slate-950" />
                <span>ወጪ አድርግ (Withdraw)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-4 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ማጠቃለያ (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'deposit'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span>ገቢ ማድረጊያ (Deposit)</span>
          </button>

          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'withdraw'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ArrowUpFromLine className="w-3.5 h-3.5" />
            <span>ወጪ ማድረጊያ (Withdraw)</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'earnings'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>የተሳትፎ ገቢዎች (Rewards)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>የዝውውር ታሪክ ({userWallet.transactions.length})</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              {/* Official Bank Account Callout Banner for Founder/Zebene Asfeye CBE */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                    <Landmark className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">
                      የኢትዮጵያ ንግድ ባንክ (CBE) ይፋዊ የሂሳብ ቁጥር
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      የክቡር ዘበነ አስፍዬ የንግድ ባንክ አካውንት፦{' '}
                      <strong className="text-amber-300 font-mono text-xs">1000167413618</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyZebeneCBE}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
                >
                  {copiedAcc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAcc ? 'ተገልብጧል (Copied)' : 'አካውንቱን ኮፒ አድርግ'}</span>
                </button>
              </div>

              {/* Three Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>በድህረገፅ ተሳትፎ የተገኘ</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-lg font-black text-amber-300 font-mono">
                    {userWallet.lifetimeEarnedBirr.toLocaleString()} ETB
                  </div>
                  <p className="text-[10px] text-slate-500">ንግግር፣ ላይክ፣ አስተያየት፣ ሼር</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>የተደረጉ ዝውውሮች</span>
                    <Receipt className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-lg font-black text-emerald-300 font-mono">
                    {userWallet.transactions.length} ዝውውሮች
                  </div>
                  <p className="text-[10px] text-slate-500">ገቢ፣ ወጪና የተሳትፎ ክፍያዎች</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>የህግ ጥበቃ ደረጃ</span>
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-lg font-black text-teal-300 font-mono">
                    100% FATF AML
                  </div>
                  <p className="text-[10px] text-slate-500">የኢትዮጵያ ንግድ ባንክና ቴሌብር</p>
                </div>
              </div>

              {/* Quick Earning Guide Callout */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>በድህረገፁ ተሳትፎ ገቢ ማግኛ መንገዶች (How You Earn)</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('earnings')}
                    className="text-amber-400 hover:underline font-bold text-[11px]"
                  >
                    ሁሉንም ተመልከት ➔
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">መድረክ ላይ መናገር</span>
                    <strong className="text-emerald-400 font-mono">+20 ETB</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">ላይክና ድጋፍ</span>
                    <strong className="text-emerald-400 font-mono">+5 ETB</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">አስተያየት መፃፍ</span>
                    <strong className="text-emerald-400 font-mono">+10 ETB</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">ሊንክ ማጋራት</span>
                    <strong className="text-emerald-400 font-mono">+15 ETB</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEPOSIT (ገቢ ማድረጊያ) */}
          {activeTab === 'deposit' && (
            <form onSubmit={handleDepositSubmit} className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ArrowDownToLine className="w-4 h-4 text-emerald-400" />
                  <span>ገንዘብ ወደ አካውንትዎ ገቢ ማድረጊያ (Deposit to Your Account)</span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  በኢትዮጵያ ንግድ ባንክ (CBE)፣ በቴሌብር ወይም በሌሎች የባንክ መንገዶች ወደ መድረኩ ሂሳብዎ ገንዘብ ገቢ ያድርጉ።
                </p>
              </div>

              {depositSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{depositSuccessMsg}</span>
                </div>
              )}

              {/* Select Deposit Channel */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-300">
                  1. የክፍያ ማስተላለፊያ አማራጭ ይምረጡ (Select Deposit Channel):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'Commercial Bank of Ethiopia (CBE)', label: 'ንግድ ባንክ (CBE)', icon: Landmark },
                    { name: 'Telebirr (Ethio Telecom)', label: 'ቴሌብር (Telebirr)', icon: Smartphone },
                    { name: 'Awash International Bank', label: 'አዋሽ ባንክ (Awash)', icon: Building2 },
                    { name: 'Dashen Bank / Amole', label: 'ዳሸን ባንክ (Dashen)', icon: Building2 },
                  ].map((ch) => {
                    const Icon = ch.icon;
                    const isSel = depositChannel === ch.name;
                    return (
                      <button
                        type="button"
                        key={ch.name}
                        onClick={() => {
                          setDepositChannel(ch.name);
                          if (ch.name.includes('CBE')) setDepositAccount('1000167413618');
                          else if (ch.name.includes('Telebirr')) setDepositAccount('+251 91 123 4567');
                          else setDepositAccount('200084729103');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSel
                            ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1 ${isSel ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <div className="text-xs truncate">{ch.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Account Number & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-300">
                    የከፋዩ የሂሳብ ቁጥር / ስልክ ቁጥር (Account / Phone):
                  </label>
                  <input
                    type="text"
                    value={depositAccount}
                    onChange={(e) => setDepositAccount(e.target.value)}
                    placeholder="ለምሳሌ፦ 1000167413618 ወይም 0911234567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-emerald-400"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-300">
                    የገንዘብ መጠን (Deposit Amount in ETB):
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              {/* Quick Amount Pills */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">ፈጣን መምረጫ፦</span>
                {['100', '500', '1000', '5000'].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setDepositAmount(amt)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] cursor-pointer"
                  >
                    +{amt} ETB
                  </button>
                ))}
              </div>

              {/* Transaction Reference / Bank Slip Number */}
              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">
                  የዝውውር ማረጋገጫ ቁጥር / ማስታወሻ (Reference / Note - Optional):
                </label>
                <input
                  type="text"
                  value={depositReference}
                  onChange={(e) => setDepositReference(e.target.value)}
                  placeholder="ለምሳሌ፦ CBE-TRX-99824 ወይም የቴሌብር ማረጋገጫ ቁጥር"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>ገቢ አድርግና ቀሪ ሂሳብን አዘምን (Complete Deposit)</span>
              </button>
            </form>
          )}

          {/* TAB 3: WITHDRAW (ወጪ ማድረጊያ) */}
          {activeTab === 'withdraw' && (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ArrowUpFromLine className="w-4 h-4 text-amber-400" />
                  <span>ገንዘብ ወጪ ማድረጊያ (Withdraw to Bank or Telebirr)</span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  በድህረገፁ ያገኙትን የተሳትፎ ገቢ ወይም ያስቀመጡትን ገንዘብ ወደ ንግድ ባንክ፣ ቴሌብር ወይም ሌሎች ባንኮች ወጪ ያድርጉ።
                </p>
              </div>

              {withdrawSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{withdrawSuccessMsg}</span>
                </div>
              )}

              {withdrawError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-semibold">
                  ⚠️ {withdrawError}
                </div>
              )}

              {/* Select Payout Destination */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-300">
                  1. ገንዘቡ የሚገባበትን የባንክ አማራጭ ይምረጡ (Select Destination Bank):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'Commercial Bank of Ethiopia (CBE)', label: 'ንግድ ባንክ (CBE)', icon: Landmark },
                    { name: 'Telebirr Priority Payout', label: 'ቴሌብር (Telebirr)', icon: Smartphone },
                    { name: 'Awash International Bank', label: 'አዋሽ ባንክ (Awash)', icon: Building2 },
                    { name: 'Dashen Bank / Amole', label: 'ዳሸን ባንክ (Dashen)', icon: Building2 },
                  ].map((ch) => {
                    const Icon = ch.icon;
                    const isSel = withdrawChannel === ch.name;
                    return (
                      <button
                        type="button"
                        key={ch.name}
                        onClick={() => {
                          setWithdrawChannel(ch.name);
                          if (ch.name.includes('CBE')) setWithdrawAccount('1000167413618');
                          else if (ch.name.includes('Telebirr')) setWithdrawAccount('+251 91 123 4567');
                          else setWithdrawAccount('200084729103');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSel
                            ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1 ${isSel ? 'text-amber-400' : 'text-slate-500'}`} />
                        <div className="text-xs truncate">{ch.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Destination Account Number with Quick Fill for Zebene Asfeye CBE */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-slate-300">
                    ገንዘቡ የሚላክበት የሂሳብ ቁጥር (Destination Account Number):
                  </label>
                  <button
                    type="button"
                    onClick={() => setWithdrawAccount('1000167413618')}
                    className="text-[11px] text-amber-300 hover:underline font-bold"
                  >
                    የክቡር ዘበነ CBE አካውንት (1000167413618) ምረጥ
                  </button>
                </div>
                <input
                  type="text"
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  placeholder="ለምሳሌ: 1000167413618"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-amber-400"
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">
                  ወጪ የሚደረገው መጠን (Withdrawal Amount in ETB):
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={userWallet.balanceBirr}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:border-amber-400"
                  required
                />
                <span className="text-[10px] text-slate-400">
                  ያለዎት ጠቅላላ ተቀማጭ፦ {userWallet.balanceBirr.toLocaleString()} ETB
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black text-xs rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowUpFromLine className="w-4 h-4" />
                <span>ወጪ አድርግና ወደ ባንክ ላክ (Dispatch Payout)</span>
              </button>
            </form>
          )}

          {/* TAB 4: ACTIVITY MICRO-EARNINGS (የተሳትፎ ገቢዎች) */}
          {activeTab === 'earnings' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>የድህረገፅ ተሳትፎ አነስተኛ ገቢዎች ዝርዝር (Member Participation Earning Rates)</span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  እያንዳንዱ አባል በድህረገፁ ላይ በሚያደርገው ማንኛውም እንቅስቃሴ አነስተኛ ገቢ ያገኛል። የተገኘው ገቢ ወዲያውኑ ወደ ግል ሂሳብዎ ይገባል!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    action: 'speak',
                    title: 'በአዳራሽ መናገርና መወያየት',
                    sub: 'Chamber Dialogue & Discourse',
                    reward: '+20 ETB',
                    color: 'text-indigo-300 border-indigo-500/30',
                  },
                  {
                    action: 'like',
                    title: 'ላይክና የድጋፍ ነጥብ መስጠት',
                    sub: 'Upvoting & Loving Content',
                    reward: '+5 ETB',
                    color: 'text-pink-300 border-pink-500/30',
                  },
                  {
                    action: 'comment',
                    title: 'በአስተያየት ግድግዳ ላይ መፃፍ',
                    sub: 'Interactive Comment Wall',
                    reward: '+10 ETB',
                    color: 'text-teal-300 border-teal-500/30',
                  },
                  {
                    action: 'share',
                    title: 'ጥሪና ሊንክ ለጓደኞች ማጋራት',
                    sub: 'WhatsApp / Telegram Share',
                    reward: '+15 ETB',
                    color: 'text-amber-300 border-amber-500/30',
                  },
                  {
                    action: 'game',
                    title: 'በገበጣና በፈተና መሳተፍ',
                    sub: 'Playing Gebeta & Wisdom Quiz',
                    reward: '+30 ETB',
                    color: 'text-emerald-300 border-emerald-500/30',
                  },
                  {
                    action: 'login',
                    title: 'ዕለታዊ የአባልነት ጉብኝት ቦነስ',
                    sub: 'Daily Login Attendance',
                    reward: '+25 ETB',
                    color: 'text-cyan-300 border-cyan-500/30',
                  },
                ].map((item) => (
                  <div
                    key={item.action}
                    className={`p-3.5 rounded-2xl bg-slate-950 border ${item.color} flex items-center justify-between gap-3`}
                  >
                    <div>
                      <h4 className="font-bold text-white text-xs">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.sub}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-emerald-400">{item.reward}</span>
                      <button
                        type="button"
                        onClick={() => rewardUserAction(item.action as any)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold border border-slate-700 cursor-pointer"
                        title="ይህን ተሳትፎ አከናውንና ገቢ አግኝ"
                      >
                        ሞክር
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TRANSACTION HISTORY & STATEMENT (የዝውውር ታሪክ) */}
          {activeTab === 'history' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  {(['all', 'deposit', 'withdrawal', 'earning'] as const).map((flt) => (
                    <button
                      key={flt}
                      type="button"
                      onClick={() => setHistoryFilter(flt)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                        historyFilter === flt
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {flt === 'all' && 'ሁሉም (All)'}
                      {flt === 'deposit' && 'ገቢዎች (Deposits)'}
                      {flt === 'withdrawal' && 'ወጪዎች (Withdrawals)'}
                      {flt === 'earning' && 'የተሳትፎ ገቢዎች (Earnings)'}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>ስቴትመንት አትም</span>
                </button>
              </div>

              {filteredTransactions.length === 0 ? (
                <div className="p-8 text-center text-slate-500">በዚህ ክፍል የተመዘገበ ዝውውር የለም።</div>
              ) : (
                <div className="space-y-2">
                  {filteredTransactions.map((tx) => {
                    const isPositive = tx.amountBirr > 0;
                    return (
                      <div
                        key={tx.id}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              tx.type === 'deposit'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : tx.type === 'withdrawal'
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {tx.type === 'deposit' ? '↓' : tx.type === 'withdrawal' ? '↑' : '★'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white text-xs truncate">{tx.description}</div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {tx.date} • {tx.method || 'Platform System'}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div
                            className={`font-mono font-black text-xs ${
                              isPositive ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isPositive ? `+${tx.amountBirr.toLocaleString()}` : tx.amountBirr.toLocaleString()} ETB
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 border border-emerald-500/20 font-bold uppercase">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
