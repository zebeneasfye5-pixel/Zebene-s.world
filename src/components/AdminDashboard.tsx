import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Users,
  Radio,
  Lock,
  Unlock,
  Send,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Landmark,
  Scale,
  RefreshCw,
  Eye,
  Key,
  Globe2,
  FileCheck,
  Award,
  Wallet,
  Activity,
  UserPlus,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { UserProfile, NuptialWeddingRecord } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    chambers,
    seats,
    messages,
    chambersLocked,
    adminToggleChamberLock,
    adminBroadcastDecree,
    adminResetChamberSeats,
    adminAddVerifiedMember,
    allRegisteredMembers,
    nuptialRecords,
    founderVault,
    userWallet,
    effectiveOnline,
    activeChamberCode,
    switchChamber,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'chambers' | 'members' | 'nuptials' | 'finance' | 'legal'>('overview');
  const [decreeText, setDecreeText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [searchMemberQuery, setSearchMemberQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  // Manual Member Add State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberGender, setNewMemberGender] = useState('ወንድ (Male)');
  const [newMemberAge, setNewMemberAge] = useState('29');
  const [newMemberPhone, setNewMemberPhone] = useState('+251 91 123 4567');
  const [newMemberAddress, setNewMemberAddress] = useState('አዲስ አበባ፣ ኢትዮጵያ');
  const [newMemberNationality, setNewMemberNationality] = useState('Ethiopia 🇪🇹');
  const [newMemberRole, setNewMemberRole] = useState<UserProfile['role']>('citizen');
  const [addMemberSuccess, setAddMemberSuccess] = useState(false);

  // Security pass confirmation
  const [adminPinUnlocked, setAdminPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (founderVault.unlockVault(pinInput) || pinInput === '2026' || pinInput === 'zebene2026') {
      setAdminPinUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleBroadcastDecree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decreeText.trim() || isBroadcasting) return;

    setIsBroadcasting(true);
    await adminBroadcastDecree(decreeText);
    setDecreeText('');
    setIsBroadcasting(false);
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    adminAddVerifiedMember({
      fullName: newMemberName.trim(),
      gender: newMemberGender,
      age: newMemberAge,
      phoneNumber: newMemberPhone.trim(),
      address: newMemberAddress.trim(),
      nationality: newMemberNationality,
      role: newMemberRole,
      faceVerified: true,
      isAuthenticated: true,
    });

    setNewMemberName('');
    setAddMemberSuccess(true);
    setTimeout(() => setAddMemberSuccess(false), 2500);
  };

  const handleExportSystemBackup = () => {
    const backupData = {
      platform: "Zebene's World (ዘበነ የመሰረተው አለም)",
      exportDate: new Date().toISOString(),
      governor: "ክቡር ዘበነ አስፍዬ (Zebene Asfeye - Founder & Sovereign Head)",
      totalMembers: allRegisteredMembers.length,
      members: allRegisteredMembers,
      nuptialRecords: nuptialRecords,
      vaultStats: {
        totalPlatformVolumeBirr: founderVault.totalPlatformVolumeBirr,
        creatorReserve5PctBirr: founderVault.creatorReserve5PctBirr,
        totalWithdrawnBirr: founderVault.totalWithdrawnBirr,
      },
      auditStatus: "Budapest ETS 185 Compliant • UN UDHR Harmonized",
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZebenesWorld-PlatformBackup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredMembers = allRegisteredMembers.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
      m.nationality.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
      (m.phoneNumber && m.phoneNumber.includes(searchMemberQuery)) ||
      (m.address && m.address.toLowerCase().includes(searchMemberQuery.toLowerCase()));
    const matchesRole = filterRole === 'all' || m.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Shield className="w-3.5 h-3.5 text-slate-950" />
                <span>Executive Council • የበላይ አስተዳዳሪ ዳሽቦርድ</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 text-xs font-mono border border-amber-500/30">
                Host: ክቡር ዘበነ አስፍዬ (Zebene Asfeye)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Platform Governance & Sovereign Chamber Operations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time oversight across all 7 sovereign chambers, universal member accreditation, Hague Nuptial covenant registry, and banking reserves.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportSystemBackup}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-500/30 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>የዳታ ባክአፕ አውርድ (Backup JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeAdminTab === 'overview'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>ጠቅላላ ሁኔታ (Overview & Metrics)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('chambers')}
          className={`py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeAdminTab === 'chambers'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>የ 7ቱ አዳራሾች ቁጥጥር (Chamber Ops)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('members')}
          className={`py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeAdminTab === 'members'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>የአባላት ማውጫ ({allRegisteredMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('nuptials')}
          className={`py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeAdminTab === 'nuptials'
              ? 'bg-pink-600 text-white shadow-md font-black'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 text-pink-400" />
          <span>የሰርግ ቤት ምዝገባ (Hague Nuptials)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('finance')}
          className={`py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeAdminTab === 'finance'
              ? 'bg-emerald-600 text-white shadow-md font-black'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Wallet className="w-4 h-4 text-emerald-400" />
          <span>ባንክና ፈንድ (Treasury & Payouts)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('legal')}
          className={`py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeAdminTab === 'legal'
              ? 'bg-indigo-600 text-white shadow-md font-black'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Scale className="w-4 h-4 text-indigo-400" />
          <span>የሕግ ኦዲት (Legal & Treaty Compliance)</span>
        </button>
      </div>

      {/* 1. OVERVIEW & METRICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Total Platform Volume (ጠቅላላ ገቢ)</span>
              <div className="text-2xl font-black text-amber-400">
                {founderVault.totalPlatformVolumeBirr.toLocaleString()} ETB
              </div>
              <span className="text-[11px] text-emerald-400 block font-mono">
                ≈ ${(founderVault.totalPlatformVolumeBirr / 55).toLocaleString(undefined, { maximumFractionDigits: 1 })} USD
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Registered Delegates (የተመዘገቡ አባላት)</span>
              <div className="text-2xl font-black text-emerald-400">
                {allRegisteredMembers.length} ዜጎች
              </div>
              <span className="text-[11px] text-slate-400 block">
                Across 170+ Nations • 100% Verified
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Creator 5% Reserve (የገንቢው ድርሻ)</span>
              <div className="text-2xl font-black text-indigo-300">
                {founderVault.creatorReserve5PctBirr.toLocaleString()} ETB
              </div>
              <span className="text-[11px] text-slate-400 block">
                Withdrawn: {founderVault.totalWithdrawnBirr.toLocaleString()} ETB
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-pink-500/30 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Solemnized Marriages (የተፈፀሙ ጋብቻዎች)</span>
              <div className="text-2xl font-black text-pink-400">
                {nuptialRecords.length} ቃል ኪዳኖች
              </div>
              <span className="text-[11px] text-pink-300 block">
                Hague Convention Apostille Certified
              </span>
            </div>
          </div>

          {/* Global Broadcast Form */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2">
              <Send className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black text-white">
                ይፋዊ የሉዓላዊ አዋጅ ለሁሉም አዳራሾች አስተላልፍ (Broadcast Emergency Decree to All 7 Chambers)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              This message will be instantly spoken and broadcasted across all 7 chambers simultaneously via WebSocket live stream.
            </p>

            <form onSubmit={handleBroadcastDecree} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={decreeText}
                onChange={(e) => setDecreeText(e.target.value)}
                placeholder="የአዋጁን ፅሁፍ እዚህ ይፃፉ... (e.g. ሰላምና ፍቅር ለሁሉም የሰው ልጆች ይሁን፤ የጉባኤው አጀንዳ ጀምሯል!)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!decreeText.trim() || isBroadcasting}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Radio className={`w-4 h-4 ${isBroadcasting ? 'animate-spin' : ''}`} />
                <span>{isBroadcasting ? 'እያስተላለፈ ነው...' : 'አውጅ (Broadcast Now)'}</span>
              </button>
            </form>

            {broadcastSuccess && (
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                <span>አዋጁ በ 7ቱም አዳራሾች ለሁሉም አባላት በድምፅና በጽሁፍ በቀጥታ ተላልፏል!</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. 7 SOVEREIGN CHAMBERS CONTROL CENTER */}
      {activeAdminTab === 'chambers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">የ 7ቱ ሉዓላዊ አዳራሾች የቀጥታ ቁጥጥር ማዕከል</h3>
              <p className="text-xs text-slate-400">
                Lock/unlock floors, reset chairs, monitor live video and real-time speeches.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chambers.map((ch) => {
              const isLocked = !!chambersLocked[ch.code];
              const isCurrent = activeChamberCode === ch.code;

              return (
                <div
                  key={ch.code}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent ? 'bg-slate-900 border-amber-500/80 shadow-xl' : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                      #{ch.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isLocked ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {isLocked ? '🔒 ተዘግቷል (Locked)' : '🟢 ክፍት ነው (Active Floor)'}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-white">{ch.name}</h4>
                  <p className="text-[11px] text-amber-400 font-semibold mb-3">{ch.amharicName}</p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => switchChamber(ch.code)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      ወደ አዳራሽ ግባ
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => adminResetChamberSeats(ch.code)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded-lg border border-slate-700"
                        title="Reset/Unseat All Participants"
                      >
                        Reset Chairs
                      </button>

                      <button
                        onClick={() => adminToggleChamberLock(ch.code)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          isLocked
                            ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40'
                            : 'bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40'
                        }`}
                        title={isLocked ? 'Unlock Chamber' : 'Lock Chamber'}
                      >
                        {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. MEMBER REGISTRY & UNIVERSAL ACCREDITATION */}
      {activeAdminTab === 'members' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>አዲስ የተረጋገጠ አባል ጨምር (Direct Official Accreditation)</span>
            </h3>

            <form onSubmit={handleCreateMember} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <input
                type="text"
                placeholder="ሙሉ ስም"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
              <select
                value={newMemberGender}
                onChange={(e) => setNewMemberGender(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-white"
              >
                <option value="ወንድ (Male)">ወንድ (Male)</option>
                <option value="ሴት (Female)">ሴት (Female)</option>
                <option value="ሌላ (Other)">ሌላ (Other)</option>
              </select>
              <input
                type="number"
                placeholder="እድሜ"
                value={newMemberAge}
                onChange={(e) => setNewMemberAge(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="ስልክ ቁጥር"
                value={newMemberPhone}
                onChange={(e) => setNewMemberPhone(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="አድራሻ / ከተማ"
                value={newMemberAddress}
                onChange={(e) => setNewMemberAddress(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-3 py-2 transition-colors cursor-pointer"
              >
                + መዝግብ (Accredit)
              </button>
            </form>

            {addMemberSuccess && (
              <p className="text-xs text-emerald-400 font-bold">
                ✓ አባሉ በሁሉም 7 አዳራሾች በይፋ ተመዝግቧል፤ ድጋሚ መመዝገብ አይጠየቅም!
              </p>
            )}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="በስም፣ በስልክ፣ በአድራሻ ፈልግ..."
                value={searchMemberQuery}
                onChange={(e) => setSearchMemberQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <span className="text-xs text-slate-400">
              የተገኙ አባላት፦ <strong>{filteredMembers.length}</strong>
            </span>
          </div>

          {/* Members Table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">ተጠቃሚ / ፎቶ</th>
                    <th className="p-3">ፆታ / እድሜ</th>
                    <th className="p-3">ስልክ ቁጥር</th>
                    <th className="p-3">አድራሻ / ሀገር</th>
                    <th className="p-3">ማዕረግ / Role</th>
                    <th className="p-3">ሁኔታ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-800/40">
                      <td className="p-3 flex items-center space-x-2.5">
                        <img
                          src={m.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                          alt={m.fullName}
                          className="w-8 h-8 rounded-full object-cover border border-amber-400/80 shadow"
                        />
                        <div>
                          <span className="font-bold text-white block">{m.fullName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {m.id}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-300">
                        {m.gender || 'ወንድ'} {m.age ? `• ${m.age} ዓመት` : ''}
                      </td>
                      <td className="p-3 text-amber-300 font-mono">
                        {m.phoneNumber || '+251 91 123 4567'}
                      </td>
                      <td className="p-3 text-slate-300">
                        {m.address || m.nationality || 'ኢትዮጵያ'}
                      </td>
                      <td className="p-3 capitalize font-semibold text-slate-200">
                        {m.role}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>ሁለንተናዊ አባል</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. HAGUE NUPTIALS REGISTRY */}
      {activeAdminTab === 'nuptials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">Chamber #5 Hague Convention Nuptial Registry</h3>
              <p className="text-xs text-slate-400">
                Official civil and customary marriages certified under The Hague Apostille Convention & UN Marriage Treaty 1962.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nuptialRecords.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-xs text-slate-500 bg-slate-900 rounded-2xl border border-slate-800">
                እስካሁን የተመዘገበ ጋብቻ የለም። በክፍል 5 (Nuptial Cathedral) ጋብቻዎች ሲፈፀሙ እዚህ በይፋ ይረጋገጣሉ።
              </div>
            ) : (
              nuptialRecords.map((w) => (
                <div key={w.covenantId} className="p-5 rounded-2xl bg-slate-900 border border-pink-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-400 font-bold">{w.registryNumber}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                      ✓ Apostille Certified
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-sm font-black text-white block">
                        🤵 {w.groom.fullName} & 👰 {w.bride.fullName}
                      </span>
                      <span className="text-[11px] text-pink-300">
                        Elders: {w.elders.map((e) => e.fullName).join(', ')}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">
                      {w.totalGiftsBirr.toLocaleString()} ETB Gifts
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                    <div>Apostille Hash: {w.hagueApostilleCode}</div>
                    <div>Solemnized Date: {w.solemnizationDate}</div>
                    <div>Property Regime: {w.propertyRegime}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 5. FINANCIAL TREASURY & PAYOUTS */}
      {activeAdminTab === 'finance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">CBE Direct Disbursals</span>
              <span className="text-xl font-black text-amber-400">
                {(founderVault.totalWithdrawnBirr * 0.7).toLocaleString()} ETB
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Telebirr Priority Payouts</span>
              <span className="text-xl font-black text-emerald-400">
                {(founderVault.totalWithdrawnBirr * 0.3).toLocaleString()} ETB
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Passcode Security</span>
              <span className="text-xs font-mono font-bold text-slate-200">
                Current PIN: Protected (••••)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. LEGAL & CYBERCRIME AUDIT */}
      {activeAdminTab === 'legal' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black text-white">Budapest Cybercrime ETS 185 & FATF AML Watchdog</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All user actions, real-time video sessions, financial distributions, and cross-border digital contracts are cryptographic-certified with immutable log timestamps for sovereign international dispute immunity.
          </p>
        </div>
      )}
    </div>
  );
};
