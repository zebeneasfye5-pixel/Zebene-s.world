import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Landmark,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Percent,
  Sparkles,
  Award,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  Building2,
  Tv2,
  Vote,
  FileCheck2,
} from 'lucide-react';

export const BankingAndEconomy: React.FC = () => {
  const { userWallet, makeWithdrawal, rewardUserAction, effectiveOnline } = useApp();

  // Bank payout states
  const [selectedBank, setSelectedBank] = useState('Commercial Bank of Ethiopia (CBE)');
  const [accountNumber, setAccountNumber] = useState('1000123456789');
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(500);
  const [withdrawalStatus, setWithdrawalStatus] = useState<string | null>(null);

  // Microloan application state
  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [loanPurpose, setLoanPurpose] = useState('Agricultural Solar Irrigation Kit');
  const [loanSubmitted, setLoanSubmitted] = useState(false);

  // Talent Show state
  const [talents, setTalents] = useState([
    {
      id: 'tal-1',
      creator: 'Dawit & Bethlehem',
      title: 'Traditional Masenqo & Modern Symphony Fusion',
      category: 'Music & Culture',
      votes: 1420,
      rewardPool: 25000,
      country: 'Ethiopia 🇪🇹',
      hasVoted: false,
    },
    {
      id: 'tal-2',
      creator: 'Kofi Mensah',
      title: 'Solar-Powered Automated Soil Moisture Sentinel',
      category: 'Agritech Innovation',
      votes: 1890,
      rewardPool: 40000,
      country: 'Ghana 🇬🇭',
      hasVoted: false,
    },
    {
      id: 'tal-3',
      creator: 'Fatima Al-Hassan',
      title: 'Epic Oral Poetry: The River of Brotherhood',
      category: 'Literature & Oratory',
      votes: 980,
      rewardPool: 18000,
      country: 'Sudan 🇸🇩',
      hasVoted: false,
    },
  ]);

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawalAmount <= 0) return;
    if (withdrawalAmount > userWallet.balanceBirr) {
      alert('Withdrawal amount exceeds your current balance!');
      return;
    }

    const ok = makeWithdrawal(selectedBank, accountNumber, withdrawalAmount);
    if (ok) {
      setWithdrawalStatus(
        effectiveOnline
          ? `Withdrawal of ${withdrawalAmount} ETB to ${selectedBank} (A/C: ${accountNumber}) initiated successfully! Funds will reflect instantly.`
          : `Withdrawal of ${withdrawalAmount} ETB to ${selectedBank} recorded offline! Local wallet updated. (በኦፍላይን የተመዘገበ ክፍያ)`
      );
      setTimeout(() => setWithdrawalStatus(null), 6000);
    }
  };

  const handleVoteTalent = (talentId: string) => {
    setTalents((prev) =>
      prev.map((t) =>
        t.id === talentId && !t.hasVoted
          ? { ...t, votes: t.votes + 1, hasVoted: true }
          : t
      )
    );
    rewardUserAction('like');
  };

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoanSubmitted(true);
    setTimeout(() => setLoanSubmitted(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Ethiopian Banking & Global Economy Integration (የባንክና የገቢ ሲስተም)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Sovereign Finance, Loans & Civic Rewards
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Connected with Ethiopian banks (CBE, Telebirr, Awash, Dashen) and international settlement rails. Real payouts for user participation and strict revenue sharing.
            </p>
          </div>

          {/* User Balance Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-right space-y-1 shrink-0">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
              Withdrawable Balance
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {userWallet.balanceBirr.toLocaleString()} <span className="text-sm font-sans text-slate-400">ETB</span>
            </div>
            <div className="text-xs text-slate-400">
              ≈ ${(userWallet.balanceBirr / 55).toFixed(2)} USD
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Sharing Architecture (Points 12 & 13) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Percent className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-sm sm:text-base text-slate-100">
              Mandatory Civic Revenue Distribution Architecture
            </h2>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
            Sections 12 & 13 Standard
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Every activity performed on the platform (likes, shares, hosting rooms, discourse, games) generates continuous revenue from internet partners. The gross revenue is automatically split as follows:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-2xl font-black text-emerald-400">85%</span>
            <h3 className="font-bold text-xs text-slate-200">Direct Citizen Net Earning</h3>
            <p className="text-[11px] text-slate-400">
              Paid straight into user's wallet. Withdrawable anytime via Ethiopian commercial banks or Telebirr.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-blue-500/30 space-y-1">
            <span className="text-2xl font-black text-blue-400">10%</span>
            <h3 className="font-bold text-xs text-slate-200">Banking & Settlement Reserve</h3>
            <p className="text-[11px] text-slate-400">
              Mandatory liquidity buffer reserved for interbank transaction fees, currency exchange, and sovereign compliance.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 space-y-1">
            <span className="text-2xl font-black text-purple-400">5%</span>
            <h3 className="font-bold text-xs text-slate-200">Platform Builder Savings Reserve</h3>
            <p className="text-[11px] text-slate-400">
              Held in trust by the platform builder (ድህረገፁ ገንቢ ሀላፊነት የሚቀመጥ ተቆጣቢ ገንዘብ) for infrastructure stability.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Withdrawal to Ethiopian Banks & Transaction Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 cols): Direct Bank Cashout Terminal */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-100">
                Direct Withdrawal to Ethiopian & Global Accounts
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold">Instant Dispatch</span>
          </div>

          <form onSubmit={handleWithdrawal} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1">
                Select Destination Bank / Provider:
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-400"
              >
                <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE / CBE Birr)</option>
                <option value="Telebirr (Ethio Telecom)">Telebirr (Ethio Telecom Mobile Wallet)</option>
                <option value="Awash Bank">Awash International Bank</option>
                <option value="Dashen Bank">Dashen Bank / Amole</option>
                <option value="Bank of Abyssinia">Bank of Abyssinia</option>
                <option value="International Swift Wire">International Swift Wire (USD / EUR)</option>
                <option value="PayPal / Visa">Global Visa / PayPal Gateway</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1">
                Account Number or Mobile Phone (የባንክ ሂሳብ ቁጥር):
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-400 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1">
                Withdrawal Amount (in ETB):
              </label>
              <input
                type="number"
                min="50"
                max={userWallet.balanceBirr}
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-400 font-bold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={userWallet.balanceBirr <= 0}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Withdraw Funds to {selectedBank.split(' ')[0]}</span>
            </button>
          </form>

          {withdrawalStatus && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{withdrawalStatus}</span>
            </div>
          )}

          <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Secure 256-bit Interbank Wire Protection</span>
            <span className="text-emerald-400">Zero Gateway Surcharge</span>
          </div>
        </div>

        {/* Right Column (6 cols): Transaction History Ledger */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Real-Time Earnings & Settlement Ledger</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total: {userWallet.transactions.length} Transactions
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {userWallet.transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-200 line-clamp-1">{tx.description}</p>
                  <span className="text-[10px] text-slate-500">{tx.date}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold font-mono ${
                      tx.amountBirr > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {tx.amountBirr > 0 ? `+${tx.amountBirr}` : tx.amountBirr} ETB
                  </span>
                  <span className="block text-[9px] uppercase font-bold text-slate-500">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 11: Microloans, Grants, Talent Show & Civic Honors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Microloans & Grants (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-sm text-slate-100">
                Microloans & Developmental Grants (የብድርና የስጦታ ሲስተም)
              </h3>
            </div>
            <span className="text-xs text-indigo-400 font-semibold">0-3% Interest Cap</span>
          </div>

          <p className="text-xs text-slate-300">
            Apply for low-interest development microloans for youth entrepreneurship, rural farming machinery, and women artisan cooperatives.
          </p>

          <form onSubmit={handleApplyLoan} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1">
                Requested Loan Amount (ETB):
              </label>
              <input
                type="number"
                min="1000"
                max="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1">
                Purpose of Microloan:
              </label>
              <input
                type="text"
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Submit Microloan Application</span>
            </button>
          </form>

          {loanSubmitted && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold">
              Loan Application for {loanAmount.toLocaleString()} ETB submitted successfully! Under instant automated community peer review.
            </div>
          )}
        </div>

        {/* Global Talent Show (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tv2 className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-sm text-slate-100">
                Global Talent Show & Civic Awards (የታለንት ሾው)
              </h3>
            </div>
            <span className="text-xs text-amber-400 font-bold">Auditions Active</span>
          </div>

          <div className="space-y-3">
            {talents.map((t) => (
              <div
                key={t.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-100">{t.title}</h4>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                    <span>{t.creator}</span>
                    <span>•</span>
                    <span className="text-amber-400">{t.category}</span>
                    <span>•</span>
                    <span>{t.country}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-300">{t.votes} Votes</span>
                    <span className="block text-[9px] text-slate-500">Prize: {t.rewardPool} ETB</span>
                  </div>
                  <button
                    onClick={() => handleVoteTalent(t.id)}
                    disabled={t.hasVoted}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      t.hasVoted
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow'
                    }`}
                  >
                    {t.hasVoted ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
