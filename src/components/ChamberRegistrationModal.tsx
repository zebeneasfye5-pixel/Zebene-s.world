import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Award,
  UserCheck,
  CheckCircle2,
  X,
  Sparkles,
  Users2,
  FileBadge,
  Globe2,
  Lock,
  HeartHandshake,
  BookOpen,
  Landmark,
} from 'lucide-react';

interface ChamberRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChamberRegistrationModal: React.FC<ChamberRegistrationModalProps> = ({ isOpen, onClose }) => {
  const {
    activeChamber,
    activeChamberCode,
    currentUser,
    chamberRegistrations,
    chamberMembersRegistry,
    registerInChamber,
  } = useApp();

  const currentRegistration = chamberRegistrations[activeChamberCode];
  const membersList = chamberMembersRegistry[activeChamberCode] || [];

  const [activeTab, setActiveTab] = useState<'register' | 'directory'>('register');
  const [successBadge, setSuccessBadge] = useState<string | null>(null);

  // Dynamic field states based on chamber
  const [role, setRole] = useState(() => {
    switch (activeChamberCode) {
      case 1: return 'Citizen Assembly Delegate';
      case 2: return 'Clan Lineage Chronicler';
      case 3: return 'Diplomatic Policy Delegate';
      case 4: return 'Confidential Matrimony Aspirant';
      case 5: return 'Honored Nuptial Guest';
      case 6: return 'Spiritual Fellowship Member';
      case 7: return 'Civil Peacekeeper Monitor';
      default: return 'Accredited Member';
    }
  });

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');

  if (!isOpen) return null;

  const getChamberFields = () => {
    switch (activeChamberCode) {
      case 1:
        return {
          title: 'House of All Nations — Delegate Accreditation',
          amharicTitle: 'የሁሉም የጋራ ቤት • የጉባኤ ልኡክ መመዝገቢያ',
          f1Label: 'Delegation Domain (የውይይት ዘርፍ):',
          f1Placeholder: 'e.g., Technology, Green Energy, Education, Agriculture',
          f2Label: 'Regional Origin / Constituency (የውክልና ክልል/ሀገር):',
          f2Placeholder: 'e.g., Ethiopia, Horn of Africa, Global Diaspora',
          f3Label: 'Civic Discourse Pledge (የጉባኤ ቃል ኪዳን):',
          f3Placeholder: 'I pledge constructive, respectful and peaceful participation',
        };
      case 2:
        return {
          title: 'Kinship House — Lineage & Clan Enrollment',
          amharicTitle: 'የስጋ ዘመድ ቤት • የዘር ግንድ እና የቤተሰብ መመዝገቢያ',
          f1Label: 'Paternal Clan & Lineage (የአባት ዘር ግንድ):',
          f1Placeholder: 'e.g., Tessema Clan, Wollo Branch',
          f2Label: 'Maternal Clan & Branch (የእናት ዘር ግንድ):',
          f2Placeholder: 'e.g., Demisse Lineage, Shewa Branch',
          f3Label: 'Ancestral Homeland (የትውልድ አውራጃ/መንደር):',
          f3Placeholder: 'e.g., Northern Wollo / Menze / Gonder',
        };
      case 3:
        return {
          title: 'Statesmanship House — Official Dignitary Clearance',
          amharicTitle: 'የባለስልጣናት ቤት • የዲፕሎማቲክ ማዕረግ መመዝገቢያ',
          f1Label: 'Official Rank & Title (የስልጣን ማዕረግ/ደረጃ):',
          f1Placeholder: 'e.g., Minister, Ambassador, Policy Director',
          f2Label: 'Institutional Department (የመንግስት/የተቋም ስም):',
          f2Placeholder: 'e.g., Ministry of Innovation, Foreign Affairs',
          f3Label: 'Policy Portfolio Focus (የፖሊሲ አጀንዳ):',
          f3Placeholder: 'e.g., Regional Infrastructure, Trade Treaties',
        };
      case 4:
        return {
          title: 'Sanctuary of Secrets — Confidential Code Registry',
          amharicTitle: 'የሚስጥር ቤት • የምስጢር ኮድ እና የትዳር መመዝገቢያ',
          f1Label: 'Discreet Alias / Code Name (የተመሰጠረ የምስጢር ስም):',
          f1Placeholder: 'e.g., Seeker-2026, Guardian-Peace',
          f2Label: 'Matrimonial / Counsel Intent (የትዳር/ምክር ፍላጎት):',
          f2Placeholder: 'e.g., Life Partner Search, Family Mediation',
          f3Label: 'Non-Disclosure Oath (የምስጢረኝነት መሐላ):',
          f3Placeholder: 'Zero-knowledge secrecy strictly upheld',
        };
      case 5:
        return {
          title: 'Wedding Cathedral — Nuptial Role Accreditation',
          amharicTitle: 'የሰርግ ቤት • የሰርግ ታዳሚዎች እና ምስክሮች መመዝገቢያ',
          f1Label: 'Wedding Hall Role (በሰርጉ ላይ ያለዎት ሚና):',
          f1Placeholder: 'e.g., Elder (አጋቢ ሽማግሌ), Witness (ምስክር), Guest (ታዳሚ)',
          f2Label: 'Nuptial Tradition & Attire (የሰርግ ባህል):',
          f2Placeholder: 'e.g., Ethiopian Traditional, Global Modern',
          f3Label: 'Blessing / Dedication Note (የምርቃት መልእክት):',
          f3Placeholder: 'May love and eternal unity flourish',
        };
      case 6:
        return {
          title: 'Faith Sanctuary — Spiritual Fellowship Roll',
          amharicTitle: 'የእምነት ቤት • የመንፈሳዊ ማህበረሰብ መመዝገቢያ',
          f1Label: 'Faith Tradition (የእምነት ዘርፍ):',
          f1Placeholder: 'e.g., Orthodox Tewahedo, Islamic Studies, Protestant, Interfaith',
          f2Label: 'Spiritual Calling / Focus (የመንፈሳዊ ጥናት አቅጣጫ):',
          f2Placeholder: 'e.g., Scripture Studies, Global Prayers for Peace',
          f3Label: 'Universal Fraternal Covenant (የፍቅር ቃል ኪዳን):',
          f3Placeholder: 'Universal brotherhood and mutual respect affirmed',
        };
      case 7:
        return {
          title: 'Peace & Security — Peacekeeper Enlistment',
          amharicTitle: 'የደህንነት አስጠባቂ ቤት • የሰላም አስከባሪዎች መመዝገቢያ',
          f1Label: 'Peacekeeper Rank & ID (የሰላም አስከባሪ ማዕረግ):',
          f1Placeholder: 'e.g., Civility Inspector, Conflict Resolver',
          f2Label: 'Security Oversight Sector (የክትትል ዘርፍ):',
          f2Placeholder: 'e.g., Civility Defense, Anti-Disturbance Radar',
          f3Label: 'Rule of Law Oath (የህግ ማስከበር ቃል ኪዳን):',
          f3Placeholder: 'Protecting civil order and human dignity',
        };
      default:
        return {
          title: 'Chamber Member Registration',
          amharicTitle: 'የቤቱ አባላት መመዝገቢያ',
          f1Label: 'Role:',
          f1Placeholder: '',
          f2Label: 'Specialization:',
          f2Placeholder: '',
          f3Label: 'Commitment:',
          f3Placeholder: '',
        };
    }
  };

  const fields = getChamberFields();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reg = registerInChamber(activeChamberCode, {
      registeredRole: role,
      chamberSpecificData: {
        field1: field1 || 'General Citizen Registry',
        field2: field2 || currentUser.nationality,
        field3: field3 || 'Affirmed Sovereign Accord',
      },
    });

    setSuccessBadge(reg.badgeId);
    setTimeout(() => {
      setSuccessBadge(null);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            <FileBadge className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-clip-text text-transparent">
            {fields.title}
          </h2>
          <p className="text-xs text-amber-300 font-serif mt-1 font-semibold">
            {fields.amharicTitle}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Chamber #{activeChamberCode} Sovereign Member Roll • Separate & Isolated Registry
          </p>
        </div>

        {/* Tab switch between Registration & Directory */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-5">
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {currentRegistration ? 'My Chamber Badge Pass' : 'Initial Member Registration'}
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'directory'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Users2 className="w-4 h-4" />
            <span>Accredited Member Roll ({membersList.length})</span>
          </button>
        </div>

        {/* Tab 1: Registration Form or Issued Badge */}
        {activeTab === 'register' && (
          <div>
            {currentRegistration && !successBadge ? (
              /* Already Registered Badge Card */
              <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/40 rounded-2xl shadow-xl space-y-4 text-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Accreditation Active & Validated</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                    Official Badge ID: {currentRegistration.badgeId}
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {currentRegistration.fullName}
                  </h3>
                  <p className="text-xs text-slate-300 font-semibold">
                    {currentRegistration.registeredRole}
                  </p>
                  <p className="text-xs text-slate-400">
                    {currentRegistration.nationality} • Registered on {currentRegistration.registrationDate}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-300 grid grid-cols-2 gap-2 text-left bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {Object.entries(currentRegistration.chamberSpecificData).map(([k, v]) => (
                    <div key={k} className="truncate">
                      <span className="text-slate-500 text-[10px] block capitalize">{k}:</span>
                      <span className="font-semibold text-amber-200">{v}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg transition-transform active:scale-95"
                >
                  Enter Chamber Floor & Take Seat
                </button>
              </div>
            ) : (
              /* Initial Member Registration Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Legal Name (ሙሉ ስም):
                    </label>
                    <input
                      type="text"
                      value={currentUser.fullName}
                      disabled
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Designated Chamber Role (የአባልነት ሚና):
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {fields.f1Label}
                  </label>
                  <input
                    type="text"
                    value={field1}
                    onChange={(e) => setField1(e.target.value)}
                    placeholder={fields.f1Placeholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {fields.f2Label}
                  </label>
                  <input
                    type="text"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    placeholder={fields.f2Placeholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {fields.f3Label}
                  </label>
                  <input
                    type="text"
                    value={field3}
                    onChange={(e) => setField3(e.target.value)}
                    placeholder={fields.f3Placeholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                {successBadge && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accreditation Granted! Badge Code: {successBadge}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Isolated Chamber Roster Guarantee</span>
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 active:scale-95"
                  >
                    <Award className="w-4 h-4" />
                    <span>Confirm & Issue Chamber Badge</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Accredited Members Directory */}
        {activeTab === 'directory' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Officially Accredited Members of Chamber #{activeChamberCode}:</span>
              <span className="text-amber-400 font-mono font-bold">{membersList.length} Registered</span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {membersList.map((m) => (
                <div
                  key={m.badgeId}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={m.photoUrl}
                      alt={m.fullName}
                      className="w-9 h-9 rounded-full object-cover border border-amber-400/60"
                    />
                    <div>
                      <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{m.fullName}</span>
                        <span className="text-[10px] font-mono font-semibold text-amber-400">
                          [{m.badgeId}]
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-300">{m.registeredRole}</p>
                      <span className="text-[10px] text-slate-500">{m.nationality}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                      Verified
                    </span>
                    <span className="block text-[9px] text-slate-500 mt-1">{m.registrationDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
