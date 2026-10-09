import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Baby,
  Users,
  Sprout,
  HandHeart,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const CharityHub: React.FC = () => {
  const { userWallet, makeDonation } = useApp();

  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('charity-1');
  const [pledgeSuccess, setPledgeSuccess] = useState<string | null>(null);

  // 4 Core Foundations explicitly mandated in user brief
  const [projects, setProjects] = useState([
    {
      id: 'charity-1',
      title: 'Extreme Poverty Eradication & Basic Nutrition Fund',
      amharicTitle: 'የድሀድሀ ማህበረሰብ ድጋፍ ፈንድ',
      category: 'extreme_poor',
      description:
        'Direct emergency food baskets, clothing, and unconditional micro-grants for families living in extreme destitution.',
      targetBirr: 1200000,
      raisedBirr: 894000,
      beneficiaries: 4200,
      location: 'Eastern & Horn of Africa, Global South',
      icon: HandHeart,
      color: 'from-amber-500 to-rose-500',
    },
    {
      id: 'charity-2',
      title: 'Orphans & Vulnerable Children Sanctuary Care',
      amharicTitle: 'የወላጅ አልባ ህፃናት ሁለንተናዊ ድጋፍ',
      category: 'orphans',
      description:
        'Full school sponsorships, uniform supplies, computer literacy kits, nutritious meals, and foster sanctuary home care.',
      targetBirr: 950000,
      raisedBirr: 720000,
      beneficiaries: 1850,
      location: 'Sub-Saharan Rural Hubs & Municipal Centers',
      icon: Baby,
      color: 'from-pink-500 to-rose-600',
    },
    {
      id: 'charity-3',
      title: 'Dignified Care & Pension for Caretaker-less Elders',
      amharicTitle: 'ጧሪ የሌላቸው አዛውንቶች ክብካቤ እና ፔንሽን',
      category: 'elderly',
      description:
        'Monthly dignity stipends, chronic medication supplies, eyesight & mobility clinics, and warm blanket distribution for elderly citizens without living relatives.',
      targetBirr: 800000,
      raisedBirr: 615000,
      beneficiaries: 1420,
      location: 'Ethiopia & East Africa Regional Towns',
      icon: Users,
      color: 'from-teal-500 to-emerald-600',
    },
    {
      id: 'charity-4',
      title: 'Rural Clean Water & Modernization Infrastructure Drive',
      amharicTitle: 'የገጠር መሰረተ ልማት እና የንፁህ ውሃ አቅርቦት',
      category: 'rural_infrastructure',
      description:
        'Drilling solar-powered deep water boreholes, installing off-grid rural solar clinics, and satellite education terminals in neglected villages.',
      targetBirr: 2500000,
      raisedBirr: 1890000,
      beneficiaries: 18400,
      location: 'Remote Rural Pastoralist & Farming Communities',
      icon: Sprout,
      color: 'from-blue-500 to-indigo-600',
    },
  ]);

  const handleDonate = () => {
    if (donationAmount <= 0) return;
    if (donationAmount > userWallet.balanceBirr) {
      alert('Insufficient wallet balance. Please top up or earn tokens from chamber participation!');
      return;
    }

    const success = makeDonation(selectedProjectId, donationAmount);
    if (success) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProjectId
            ? { ...p, raisedBirr: p.raisedBirr + donationAmount }
            : p
        )
      );
      setPledgeSuccess(`Thank you for your generous pledge of ${donationAmount} ETB!`);
      setTimeout(() => setPledgeSuccess(null), 5000);
    }
  };

  const totalRaisedAllFunds = projects.reduce((acc, p) => acc + p.raisedBirr, 0);
  const totalBeneficiaries = projects.reduce((acc, p) => acc + p.beneficiaries, 0);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-semibold">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
            <span>Humanitarian Aid & Community Charity (የበጎ አድራጎት ማሰባሰቢያ)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Universal Fraternal Relief & Rural Upliftment
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Dedicated transparent solidarity fund supporting the poorest of the poor, vulnerable orphans, abandoned elders, and unmodernized rural villages. Every penny is audited and tracked openly.
          </p>

          <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Cumulative Relief Raised</span>
              <span className="text-lg font-black text-teal-300">
                {totalRaisedAllFunds.toLocaleString()} ETB
              </span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Lives Empowered</span>
              <span className="text-lg font-black text-amber-300">
                {totalBeneficiaries.toLocaleString()} Citizens
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Audited Integrity</span>
                <span className="text-xs font-bold text-slate-200">100% Direct Payout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const Icon = proj.icon;
          const percent = Math.min(100, Math.round((proj.raisedBirr / proj.targetBirr) * 100));
          const isSelected = selectedProjectId === proj.id;

          return (
            <div
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-slate-900 border-teal-400 shadow-xl ring-1 ring-teal-400/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-100">{proj.title}</h3>
                      <p className="text-xs text-amber-400 font-serif font-medium">{proj.amharicTitle}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-3 h-3 rounded-full bg-teal-400 ring-2 ring-teal-400/20" />
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">
                      Raised: <strong className="text-teal-300">{proj.raisedBirr.toLocaleString()} ETB</strong>
                    </span>
                    <span className="text-slate-400">
                      Goal: <strong>{proj.targetBirr.toLocaleString()} ETB</strong> ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Beneficiaries: <strong className="text-slate-200">{proj.beneficiaries}</strong></span>
                <span className="truncate max-w-[150px]">{proj.location}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donation Action Station */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              <HandHeart className="w-5 h-5 text-teal-400" />
              <span>Contribute From Your Platform Wallet</span>
            </h3>
            <p className="text-xs text-slate-400">
              Selected: <strong className="text-teal-300">{projects.find((p) => p.id === selectedProjectId)?.title}</strong>
            </p>
          </div>

          <div className="text-xs text-slate-300">
            Available to Pledge: <strong className="text-amber-400 font-bold">{userWallet.balanceBirr.toLocaleString()} ETB</strong>
          </div>
        </div>

        {/* Amount presets */}
        <div className="flex flex-wrap items-center gap-3">
          {[50, 100, 250, 500, 1000].map((amt) => (
            <button
              key={amt}
              onClick={() => setDonationAmount(amt)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                donationAmount === amt
                  ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {amt} ETB
            </button>
          ))}

          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-slate-400">Custom:</span>
            <input
              type="number"
              min="10"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-24 bg-transparent text-white font-bold focus:outline-none"
            />
            <span className="text-slate-400">ETB</span>
          </div>

          <button
            onClick={handleDonate}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center space-x-2 active:scale-95 ml-auto"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Confirm Solidarity Pledge</span>
          </button>
        </div>

        {pledgeSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{pledgeSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
};
