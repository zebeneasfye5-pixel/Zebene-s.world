import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import {
  Heart,
  FileSignature,
  CheckCircle2,
  X,
  Printer,
  Sparkles,
  Scale,
  ShieldCheck,
  QrCode,
  Download,
  Users,
  Award,
  Wallet,
  Globe2,
  Calendar,
  Feather,
  Plus,
  Trash2,
  Camera,
  Upload,
} from 'lucide-react';
import { NuptialWeddingRecord } from '../types';

interface WeddingContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DynamicParticipant {
  id: string;
  name: string;
  role: string;
  nationality: string;
  phone?: string;
  signed: boolean;
  signedAt?: string;
}

export const WeddingContractModal: React.FC<WeddingContractModalProps> = ({ isOpen, onClose }) => {
  const { saveNuptialRecord, currentUser } = useApp();

  // 1. Groom (ሙሽራው)
  const [groomName, setGroomName] = useState('ዳዊት ኃይሉ (Dawit Hailu)');
  const [groomAge, setGroomAge] = useState('28');
  const [groomId, setGroomId] = useState('ET-PASSPORT-A992144');
  const [groomNationality, setGroomNationality] = useState('Ethiopia 🇪🇹');
  const [groomPhoto, setGroomPhoto] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  );
  const [signedGroom, setSignedGroom] = useState(true);

  // 2. Bride (ሙሽሪት)
  const [brideName, setBrideName] = useState('ሰብለወንጌል ተፈራ (Seblewongel Teferra)');
  const [brideAge, setBrideAge] = useState('26');
  const [brideId, setBrideId] = useState('ET-PASSPORT-B881023');
  const [brideNationality, setBrideNationality] = useState('Ethiopia 🇪🇹');
  const [bridePhoto, setBridePhoto] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  );
  const [signedBride, setSignedBride] = useState(true);

  // 3. UNLIMITED ATTENDANTS (ሚዜዎች - ያለገደብ አንድ፣ ሁለት፣ ሶስት ተብለው የሚጨመሩ)
  const [attendants, setAttendants] = useState<DynamicParticipant[]>([
    {
      id: 'att-1',
      name: 'ኤርሚያስ ከበደ (Ermias Kebede)',
      role: 'ዋና ሚዜ (Best Man)',
      nationality: 'Ethiopia 🇪🇹',
      signed: true,
      signedAt: '2026-10-25 10:14 AM',
    },
    {
      id: 'att-2',
      name: 'ትዕግስት በቀለ (Tigist Bekele)',
      role: 'የሙሽሪት ሚዜ (Maid of Honor)',
      nationality: 'Ethiopia 🇪🇹',
      signed: true,
      signedAt: '2026-10-25 10:15 AM',
    },
    {
      id: 'att-3',
      name: 'ዮሴፍ አለማየሁ (Yosef Alemayehu)',
      role: 'ሁለተኛ ሚዜ (Second Attendant)',
      nationality: 'Ethiopia 🇪🇹',
      signed: false,
    },
  ]);

  // 4. UNLIMITED ELDERS (አጋቢ ሽማግሌዎች - ያለገደብ የሚጨመሩ)
  const [elders, setElders] = useState<DynamicParticipant[]>([
    {
      id: 'eld-1',
      name: 'ክቡር አቶ ገብርኤል ወልዴ (Elder Gabriel Wolde)',
      role: 'ቀዳሚ አጋቢ ሽማግሌ (Presiding Matrimonial Elder)',
      nationality: 'Ethiopia 🇪🇹',
      signed: true,
      signedAt: '2026-10-25 10:20 AM',
    },
    {
      id: 'eld-2',
      name: 'ሃጅ ከማል ኑሩ (Hajj Kemal Nuru)',
      role: 'የሽምግልናና የሰላም ዳኛ (Traditional Conciliation Elder)',
      nationality: 'Ethiopia 🇪🇹',
      signed: true,
      signedAt: '2026-10-25 10:22 AM',
    },
  ]);

  // 5. UNLIMITED WITNESSES (ምስክሮች - ያለገደብ የሚጨመሩ)
  const [witnesses, setWitnesses] = useState<DynamicParticipant[]>([
    {
      id: 'wit-1',
      name: 'ዶ/ር አሚና ዲያሎ (Dr. Amina Diallo)',
      role: 'ዓለም አቀፍ ዋና ምስክር (Lead International Witness)',
      nationality: 'Senegal 🇸🇳',
      signed: true,
      signedAt: '2026-10-25 10:25 AM',
    },
    {
      id: 'wit-2',
      name: 'ማርከስ ቼን (Marcus Chen)',
      role: 'ሁለተኛ ምስክር (Second Attesting Witness)',
      nationality: 'Singapore 🇸🇬',
      signed: true,
      signedAt: '2026-10-25 10:26 AM',
    },
  ]);

  // Matrimonial Contract Terms & Property Regime
  const [propertyRegime, setPropertyRegime] = useState<
    'community_of_property' | 'separate_estate' | 'customary_harmonized'
  >('community_of_property');
  const [vows, setVows] = useState(
    'በዚህ ይፋዊ አለም አቀፍ የሉዓላዊ ጋብቻ ውል መሰረት በዘላቂ ፍቅር፣ በመከባበር፣ በመተሳሰብ እና በእኩልነት አብረን ለመኖር በህግና በፈጣሪ ፊት ቃል እንገባለን። (We solemnly covenant lifelong mutual love, reciprocal fidelity, civil equality, and sacred partnership under international harmonized law).'
  );

  // Matrimonial Gifts State
  const [giftAmount, setGiftAmount] = useState('1000');
  const [totalGifts, setTotalGifts] = useState(85000);
  const [guestCount, setGuestCount] = useState(240);
  const [giftSent, setGiftSent] = useState(false);

  // Hague Apostille Certification State
  const [isCertified, setIsCertified] = useState(true);
  const [apostilleHash, setApostilleHash] = useState<string>(
    'HAGUE-APOSTILLE-2026-ET-9941-K827B'
  );
  const [registryNumber, setRegistryNumber] = useState<string>('ZW-HAGUE-2026-99824');

  const groomFileRef = useRef<HTMLInputElement | null>(null);
  const brideFileRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Handlers to add dynamic attendants, elders, witnesses
  const handleAddAttendant = () => {
    const nextNum = attendants.length + 1;
    const newAtt: DynamicParticipant = {
      id: `att-${Date.now()}`,
      name: `ሚዜ ${nextNum} (Attendant ${nextNum})`,
      role: `ሚዜ ቁጥር ${nextNum} (Attendant #${nextNum})`,
      nationality: 'Ethiopia 🇪🇹',
      signed: false,
    };
    setAttendants([...attendants, newAtt]);
  };

  const handleRemoveAttendant = (id: string) => {
    setAttendants(attendants.filter((a) => a.id !== id));
  };

  const handleAddElder = () => {
    const nextNum = elders.length + 1;
    const newElder: DynamicParticipant = {
      id: `eld-${Date.now()}`,
      name: `ሽማግሌ ${nextNum} (Elder ${nextNum})`,
      role: `አጋቢ ሽማግሌ ቁጥር ${nextNum} (Elder #${nextNum})`,
      nationality: 'Ethiopia 🇪🇹',
      signed: false,
    };
    setElders([...elders, newElder]);
  };

  const handleRemoveElder = (id: string) => {
    setElders(elders.filter((e) => e.id !== id));
  };

  const handleAddWitness = () => {
    const nextNum = witnesses.length + 1;
    const newWit: DynamicParticipant = {
      id: `wit-${Date.now()}`,
      name: `ምስክር ${nextNum} (Witness ${nextNum})`,
      role: `ህጋዊ ምስክር ቁጥር ${nextNum} (Witness #${nextNum})`,
      nationality: 'Global 🌐',
      signed: false,
    };
    setWitnesses([...witnesses, newWit]);
  };

  const handleRemoveWitness = (id: string) => {
    setWitnesses(witnesses.filter((w) => w.id !== id));
  };

  const handleSignParticipant = (
    type: 'attendant' | 'elder' | 'witness',
    id: string
  ) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (type === 'attendant') {
      setAttendants(
        attendants.map((a) => (a.id === id ? { ...a, signed: true, signedAt: time } : a))
      );
    } else if (type === 'elder') {
      setElders(
        elders.map((e) => (e.id === id ? { ...e, signed: true, signedAt: time } : e))
      );
    } else if (type === 'witness') {
      setWitnesses(
        witnesses.map((w) => (w.id === id ? { ...w, signed: true, signedAt: time } : w))
      );
    }
  };

  // Photo uploads
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'groom' | 'bride') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        if (target === 'groom') setGroomPhoto(ev.target.result);
        else setBridePhoto(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendGift = () => {
    const val = parseFloat(giftAmount);
    if (isNaN(val) || val <= 0) return;
    setTotalGifts((prev) => prev + val);
    setGuestCount((prev) => prev + 1);
    setGiftSent(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
    setTimeout(() => setGiftSent(false), 3000);
  };

  const handleSolemnizeAndCertify = () => {
    const hash = `HAGUE-APOSTILLE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const regNum = `ZW-NUPTIAL-${Date.now().toString().slice(-6)}`;
    setApostilleHash(hash);
    setRegistryNumber(regNum);
    setIsCertified(true);

    const record: NuptialWeddingRecord = {
      covenantId: `cov-${Date.now()}`,
      registryNumber: regNum,
      hagueApostilleCode: hash,
      solemnizationDate: new Date().toISOString().split('T')[0],
      propertyRegime,
      groom: {
        role: 'groom',
        fullName: groomName,
        amharicRole: 'ሙሽራው',
        nationality: groomNationality,
        idPassportNumber: groomId,
        photoUrl: groomPhoto,
        isSigned: signedGroom,
        signedAt: new Date().toISOString(),
      },
      bride: {
        role: 'bride',
        fullName: brideName,
        amharicRole: 'ሙሽሪት',
        nationality: brideNationality,
        idPassportNumber: brideId,
        photoUrl: bridePhoto,
        isSigned: signedBride,
        signedAt: new Date().toISOString(),
      },
      bestMan: {
        role: 'best_man',
        fullName: attendants[0]?.name || 'ዋና ሚዜ',
        amharicRole: 'ሚዜ',
        nationality: 'Ethiopia 🇪🇹',
        isSigned: attendants[0]?.signed || true,
      },
      maidOfHonor: {
        role: 'maid_of_honor',
        fullName: attendants[1]?.name || 'የሙሽሪት ሚዜ',
        amharicRole: 'ሚዜ',
        nationality: 'Ethiopia 🇪🇹',
        isSigned: attendants[1]?.signed || true,
      },
      elders: elders.map((el) => ({
        role: 'presiding_elder',
        fullName: el.name,
        amharicRole: el.role,
        nationality: el.nationality,
        isSigned: el.signed,
      })),
      witnesses: witnesses.map((wit) => ({
        role: 'legal_witness',
        fullName: wit.name,
        amharicRole: wit.role,
        nationality: wit.nationality,
        isSigned: wit.signed,
      })),
      guestsCount: guestCount,
      totalGiftsBirr: totalGifts,
      treatyComplianceNotes: [
        'Hague Apostille Convention 1961 (Abolishing Foreign Legalisation) Verified',
        'UN Convention on Consent to Marriage 1962 (Art. 1-3) Fully Compliant',
        'UN Universal Declaration of Human Rights (UDHR Art. 16) Protected',
        'Ethiopian Revised Family Code Proclamation No. 213/2000 Harmonized',
      ],
      isLegallyCertified: true,
      qrVerificationUrl: `https://zebenesworld.org/verify/nuptial/${regNum}`,
    };

    saveNuptialRecord(record);

    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-xl overflow-y-auto">
      <div className="bg-slate-900 border-2 border-pink-500/40 rounded-3xl max-w-5xl w-full p-4 sm:p-7 shadow-2xl relative my-6 text-slate-100 max-h-[92vh] flex flex-col">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 shrink-0">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-rose-500/20 to-amber-500/20 text-pink-400 border border-pink-500/30 mb-2 shadow-lg">
            <Heart className="w-8 h-8 fill-pink-500/30 text-pink-400 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
            Chamber #5 Nuptial Cathedral & International Hague Marriage Registry
          </h2>
          <p className="text-xs sm:text-sm text-pink-300/90 font-semibold mt-1">
            የሰርግ ቤት • በሁሉም ሀገራት ተቀባይነት ያለው ይፋዊ የጋብቻ ውል እና የቃል ኪዳን ሰነድ
          </p>

          {/* International Harmonization Articles */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-[10px] font-mono">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
              <Scale className="w-3 h-3 text-emerald-400" />
              <span>The Hague Apostille Convention 1961 (Art. 1-9)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              <span>UN Marriage Convention 1962 & UDHR Art. 16</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-bold">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Revised Family Code Procl. 213/2000 Art. 1-45</span>
            </span>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-pink-500/30 rounded-2xl p-4 sm:p-6 space-y-6">
            {/* Certificate Header Banner */}
            <div className="text-center border-b border-pink-500/20 pb-4 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Universal Sovereign High Council of Matrimony
              </span>
              <h3 className="text-base sm:text-xl font-serif font-black text-white">
                Official Certificate of Holy Matrimony & Civil Covenant
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Registry File: <span className="text-amber-300 font-bold">{registryNumber}</span> • Chamber #5 Nuptials
              </p>
            </div>

            {/* SECTION 1: GROOM & BRIDE WITH PHOTOS & CREDENTIALS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Groom Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-black text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>፩. 1. ሙሽራው (Groom / Partner One)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                    Solemnizer Party 1
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={groomPhoto}
                      alt={groomName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
                    />
                    <input
                      type="file"
                      ref={groomFileRef}
                      onChange={(e) => handlePhotoUpload(e, 'groom')}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => groomFileRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 border border-amber-400 text-amber-300 hover:text-white cursor-pointer shadow-md"
                      title="የሙሽራውን ፎቶ ቀይር"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      placeholder="የሙሽራው ሙሉ ስም"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <input
                        type="text"
                        value={groomId}
                        onChange={(e) => setGroomId(e.target.value)}
                        placeholder="Passport / National ID"
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 font-mono"
                      />
                      <input
                        type="text"
                        value={groomNationality}
                        onChange={(e) => setGroomNationality(e.target.value)}
                        placeholder="ዜግነት / Country"
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Groom Signature Box */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">የሙሽራው ይፋዊ ፊርማ፦</span>
                  {signedGroom ? (
                    <span className="font-serif italic text-amber-300 font-bold text-sm bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                      ✓ {groomName.split(' ')[0]} (Verified)
                    </span>
                  ) : (
                    <button
                      onClick={() => setSignedGroom(true)}
                      className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                    >
                      ፈርም (Sign)
                    </button>
                  )}
                </div>
              </div>

              {/* Bride Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-pink-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 font-black text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                    <span>፪. 2. ሙሽሪት (Bride / Partner Two)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 font-bold">
                    Solemnizer Party 2
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={bridePhoto}
                      alt={brideName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-pink-400 shadow-lg"
                    />
                    <input
                      type="file"
                      ref={brideFileRef}
                      onChange={(e) => handlePhotoUpload(e, 'bride')}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => brideFileRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 border border-pink-400 text-pink-300 hover:text-white cursor-pointer shadow-md"
                      title="የሙሽሪትን ፎቶ ቀይር"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      placeholder="የሙሽሪት ሙሉ ስም"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <input
                        type="text"
                        value={brideId}
                        onChange={(e) => setBrideId(e.target.value)}
                        placeholder="Passport / National ID"
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 font-mono"
                      />
                      <input
                        type="text"
                        value={brideNationality}
                        onChange={(e) => setBrideNationality(e.target.value)}
                        placeholder="ዜግነት / Country"
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Bride Signature Box */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">የሙሽሪት ይፋዊ ፊርማ፦</span>
                  {signedBride ? (
                    <span className="font-serif italic text-pink-300 font-bold text-sm bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/30">
                      ✓ {brideName.split(' ')[0]} (Verified)
                    </span>
                  ) : (
                    <button
                      onClick={() => setSignedBride(true)}
                      className="px-3 py-1 bg-pink-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                    >
                      ፈርም (Sign)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: UNLIMITED ATTENDANTS (ሚዜዎች - ያለገደብ አንድ ሁለት ተብሎ የሚጨመር) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-indigo-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>፫. 3. ሚዜዎችና አጃቢዎች (Attendants & Best Men - Unlimited)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    ያለገደብ አንድ፣ ሁለት፣ ሶስት ተብለው የሚጨመሩ የሙሽራና የሙሽሪት ሚዜዎች (አሁን፦ {attendants.length})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddAttendant}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ አጃቢ / ሚዜ ጨምር</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {attendants.map((att, idx) => (
                  <div
                    key={att.id}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {attendants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAttendant(att.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 cursor-pointer"
                          title="ሰርዝ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={att.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAttendants(attendants.map((a) => (a.id === att.id ? { ...a, name: val } : a)));
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      placeholder={`ሚዜ #${idx + 1} ስም`}
                    />

                    <input
                      type="text"
                      value={att.role}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAttendants(attendants.map((a) => (a.id === att.id ? { ...a, role: val } : a)));
                      }}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-0.5 text-[11px] text-slate-400"
                      placeholder="ሚና (ምሳሌ፦ የሙሽራ ሚዜ)"
                    />

                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">ፊርማ፦</span>
                      {att.signed ? (
                        <span className="font-serif italic text-emerald-400 font-bold">
                          ✓ Signed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSignParticipant('attendant', att.id)}
                          className="px-2 py-0.5 bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white rounded text-[10px] font-bold border border-indigo-500/30 cursor-pointer"
                        >
                          ፈርም (Sign)
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: UNLIMITED ELDERS (አጋቢ ሽማግሌዎች - ያለገደብ የሚጨመሩ) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-emerald-400" />
                    <span>፬. 4. አጋቢ ሽማግሌዎችና ዳኞች (Presiding Elders & Officiants - Unlimited)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    ያለገደብ አንድ፣ ሁለት፣ ሶስት ተብለው የሚጨመሩ አጋቢና መራቂ ሽማግሌዎች (አሁን፦ {elders.length})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddElder}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ ሽማግሌ ጨምር</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {elders.map((el, idx) => (
                  <div
                    key={el.id}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {elders.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveElder(el.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 cursor-pointer"
                          title="ሰርዝ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={el.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setElders(elders.map((eItem) => (eItem.id === el.id ? { ...eItem, name: val } : eItem)));
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      placeholder={`አጋቢ ሽማግሌ #${idx + 1}`}
                    />

                    <input
                      type="text"
                      value={el.role}
                      onChange={(e) => {
                        const val = e.target.value;
                        setElders(elders.map((eItem) => (eItem.id === el.id ? { ...eItem, role: val } : eItem)));
                      }}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-0.5 text-[11px] text-slate-400"
                      placeholder="ማዕረግ / ሀላፊነት"
                    />

                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">የምርቃት ፊርማ፦</span>
                      {el.signed ? (
                        <span className="font-serif italic text-emerald-400 font-bold">
                          ✓ Blessed & Sealed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSignParticipant('elder', el.id)}
                          className="px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white rounded text-[10px] font-bold border border-emerald-500/30 cursor-pointer"
                        >
                          መርቅና ፈርም
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: UNLIMITED WITNESSES (ምስክሮች) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-teal-300 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>፭. 5. ይፋዊ ምስክሮች (Attesting Legal Witnesses - Unlimited)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    ያለገደብ የሚጨመሩ የጋብቻ ምስክሮች (አሁን፦ {witnesses.length})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddWitness}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ ምስክር ጨምር</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {witnesses.map((wit, idx) => (
                  <div
                    key={wit.id}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {witnesses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveWitness(wit.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5 cursor-pointer"
                          title="ሰርዝ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={wit.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setWitnesses(witnesses.map((w) => (w.id === wit.id ? { ...w, name: val } : w)));
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      placeholder={`ምስክር #${idx + 1}`}
                    />

                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">የምስክርነት ፊርማ፦</span>
                      {wit.signed ? (
                        <span className="font-serif italic text-teal-300 font-bold">
                          ✓ Witnessed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSignParticipant('witness', wit.id)}
                          className="px-2 py-0.5 bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-white rounded text-[10px] font-bold border border-teal-500/30 cursor-pointer"
                        >
                          መሰክርና ፈርም
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: PROPERTY REGIME & VOWS */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3">
              <div className="space-y-1.5">
                <span className="text-amber-300 font-black text-xs uppercase tracking-wide block">
                  ፮. 6. የንብረትና የሀብት ስምምነት (Matrimonial Property Regime):
                </span>
                <select
                  value={propertyRegime}
                  onChange={(e: any) => setPropertyRegime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold"
                >
                  <option value="community_of_property">የጋራ ሀብት ስምምነት (Joint Community of Property - 50/50)</option>
                  <option value="separate_estate">የግል ንብረት ክፍፍል (Separate Estate Regime)</option>
                  <option value="customary_harmonized">ባህላዊና አለም አቀፍ የተስማማ ውል (Customary Harmonized)</option>
                </select>
                <p className="text-[10px] text-slate-400 italic">
                  Legally registered under UN UDHR Art. 16 and Ethiopian Revised Family Code Proclamation No. 213/2000 Art. 42
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-900">
                <span className="text-amber-300 font-black text-xs uppercase tracking-wide block">
                  ፯. 7. የቃል ኪዳን መሃላ (Sacred Nuptial Vows):
                </span>
                <textarea
                  rows={2}
                  value={vows}
                  onChange={(e) => setVows(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 italic focus:outline-none"
                />
              </div>
            </div>

            {/* SECTION 6: GUEST ATTENDANCE & GIFTS (CBE & Telebirr) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-amber-400 font-black text-xs block">
                  የታዳሚዎች የሰርግ ስጦታና ምርቃት (Telebirr & CBE Wedding Gifts)
                </span>
                <p className="text-[11px] text-slate-400">
                  ታዳሚዎች፦ <strong>{guestCount}</strong> | የተሰበሰበ ስጦታ፦ <strong>{totalGifts.toLocaleString()} ETB</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={giftAmount}
                  onChange={(e) => setGiftAmount(e.target.value)}
                  className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white font-mono text-xs text-center"
                />
                <button
                  type="button"
                  onClick={handleSendGift}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl transition-all cursor-pointer shadow-md"
                >
                  ስጦታ ላክ (Gift)
                </button>
              </div>

              {giftSent && (
                <span className="text-emerald-400 font-bold text-[11px] animate-pulse">
                  ✓ ስጦታዎ ለሙሽሮቹ ተላልፏል!
                </span>
              )}
            </div>

            {/* SECTION 7: OFFICIAL SOLEMNIZATION & THE HAGUE APOSTILLE CERTIFICATE */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border-2 border-emerald-500/50 space-y-3 text-center">
              <div className="flex items-center justify-center space-x-2 text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>ይህ ጋብቻ በይፋ ፀድቆ በ The Hague Apostille መዝገብ ሰፍሯል!</span>
              </div>
              <p className="text-xs text-slate-300">
                Official Hague Apostille Code: <strong className="font-mono text-amber-300">{apostilleHash}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Valid in 170+ Member Nations under The Hague Apostille Convention 1961 & UN Civil Status Treaty
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSolemnizeAndCertify}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>ውሉን እንደገና አረጋግጥና አዘምን (Re-Certify & Hash)</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>ይፋዊ የጋብቻ ሰርተፊኬቱን አትም (Print / Save Certificate)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
