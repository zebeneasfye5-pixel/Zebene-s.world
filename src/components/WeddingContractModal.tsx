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
} from 'lucide-react';
import { NuptialWeddingRecord, NuptialParticipant } from '../types';

interface WeddingContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeddingContractModal: React.FC<WeddingContractModalProps> = ({ isOpen, onClose }) => {
  const { saveNuptialRecord, currentUser } = useApp();

  // 1. Groom (ሙሽራው)
  const [groomName, setGroomName] = useState('አቤል ተስፋዬ (Abel Tesfaye)');
  const [groomAge, setGroomAge] = useState('28');
  const [groomId, setGroomId] = useState('ET-PASSPORT-A992144');
  const [groomNationality, setGroomNationality] = useState('Ethiopia 🇪🇹');
  const [signedGroom, setSignedGroom] = useState(false);

  // 2. Bride (ሙሽሪት)
  const [brideName, setBrideName] = useState('ሳራ ደምሴ (Sara Demisse)');
  const [brideAge, setBrideAge] = useState('26');
  const [brideId, setBrideId] = useState('ET-PASSPORT-B881023');
  const [brideNationality, setBrideNationality] = useState('Ethiopia 🇪🇹');
  const [signedBride, setSignedBride] = useState(false);

  // 3. Best Man & Maid of Honor (ሚዜዎች)
  const [bestManName, setBestManName] = useState('ዮናስ ታደሰ (Yonas Tadesse - Best Man)');
  const [maidOfHonorName, setMaidOfHonorName] = useState('ሄለን በቀለ (Helen Bekele - Maid of Honor)');
  const [signedBestMan, setSignedBestMan] = useState(false);

  // 4. Presiding Elders & Solemnizers (አጋቢ ሽማግሌዎች)
  const [elderName, setElderName] = useState('ክቡር አቶ ገብርኤል ወልዴ (Elder Gabriel Wolde)');
  const [elderRole, setElderRole] = useState('Presiding Nuptial Elder & Arbitrator (አጋቢ ሽማግሌ)');
  const [signedElder, setSignedElder] = useState(false);

  // 5. Legal Witnesses & Guests (ምስክሮችና ታዳሚዎች)
  const [witnessOneName, setWitnessOneName] = useState('ዶ/ር ማርከስ ቼን (Dr. Marcus Chen)');
  const [witnessTwoName, setWitnessTwoName] = useState('ወ/ሮ ቤተልሔም አበበ (Bethlehem Abebe)');
  const [signedWitness, setSignedWitness] = useState(false);

  // Contract Terms & Property Regime
  const [propertyRegime, setPropertyRegime] = useState<'community_of_property' | 'separate_estate' | 'customary_harmonized'>('community_of_property');
  const [tradition, setTradition] = useState('International Sovereign & Ethiopian Harmonized Civil Covenant');
  const [vows, setVows] = useState(
    'በዚህ ይፋዊ አለም አቀፍ የሉዓላዊ ጋብቻ ውል መሰረት በዘላቂ ፍቅር፣ በመከባበር፣ በመተሳሰብ እና በእኩልነት አብረን ለመኖር በህግና በፈጣሪ ፊት ቃል እንገባለን። (We solemnly covenant lifelong mutual love, reciprocal fidelity, civil equality, and sacred partnership under international harmonized law).'
  );

  // Matrimonial Gift State
  const [giftAmount, setGiftAmount] = useState('500');
  const [totalGifts, setTotalGifts] = useState(12500);
  const [guestCount, setGuestCount] = useState(84);
  const [giftSent, setGiftSent] = useState(false);

  // Official Apostille Certification State
  const [isCertified, setIsCertified] = useState(false);
  const [apostilleHash, setApostilleHash] = useState<string>('');
  const [registryNumber, setRegistryNumber] = useState<string>('ZW-HAGUE-2026-99824');

  if (!isOpen) return null;

  const handleSignGroom = () => setSignedGroom(true);
  const handleSignBride = () => setSignedBride(true);
  const handleSignBestMan = () => setSignedBestMan(true);
  const handleSignElder = () => setSignedElder(true);
  const handleSignWitness = () => setSignedWitness(true);

  const allKeyPartiesSigned = signedGroom && signedBride && signedElder && signedWitness;

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
        isSigned: true,
        signedAt: new Date().toISOString(),
      },
      bride: {
        role: 'bride',
        fullName: brideName,
        amharicRole: 'ሙሽሪት',
        nationality: brideNationality,
        idPassportNumber: brideId,
        isSigned: true,
        signedAt: new Date().toISOString(),
      },
      bestMan: {
        role: 'best_man',
        fullName: bestManName,
        amharicRole: 'ሚዜ',
        nationality: 'Ethiopia 🇪🇹',
        isSigned: signedBestMan,
      },
      maidOfHonor: {
        role: 'maid_of_honor',
        fullName: maidOfHonorName,
        amharicRole: 'ሚዜ',
        nationality: 'Ethiopia 🇪🇹',
        isSigned: signedBestMan,
      },
      elders: [
        {
          role: 'presiding_elder',
          fullName: elderName,
          amharicRole: 'አጋቢ ሽማግሌ',
          nationality: 'Ethiopia 🇪🇹',
          isSigned: true,
        },
      ],
      witnesses: [
        {
          role: 'legal_witness',
          fullName: witnessOneName,
          amharicRole: 'ዋና ምስክር',
          nationality: 'Global 🌐',
          isSigned: true,
        },
        {
          role: 'legal_witness',
          fullName: witnessTwoName,
          amharicRole: 'ሁለተኛ ምስክር',
          nationality: 'Ethiopia 🇪🇹',
          isSigned: true,
        },
      ],
      guestsCount: guestCount,
      totalGiftsBirr: totalGifts,
      treatyComplianceNotes: [
        'UN Convention on Consent to Marriage 1962 (General Assembly Res 1763 A)',
        'The Hague Apostille Convention 1961 (Abolishing Foreign Legalisation)',
        'Ethiopian Revised Family Code Proclamation No. 213/2000 (Articles 1-62)',
      ],
      isLegallyCertified: true,
      qrVerificationUrl: `https://zebenesworld.org/verify/nuptial/${regNum}`,
    };

    saveNuptialRecord(record);

    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#6366f1', '#10b981'],
    });
  };

  const handleSendGift = () => {
    const val = Number(giftAmount) || 0;
    if (val > 0) {
      setTotalGifts((prev) => prev + val);
      setGiftSent(true);
      setTimeout(() => setGiftSent(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-2 border-pink-500/40 rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative my-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-rose-500/20 text-pink-400 border border-pink-500/30 mb-2 shadow-lg">
            <Heart className="w-8 h-8 fill-pink-500/30 text-pink-400 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
            Chamber #5 Nuptial Cathedral & International Hague Marriage Registry
          </h2>
          <p className="text-xs sm:text-sm text-pink-300/90 font-semibold mt-1">
            የሰርግ ቤት • በሁሉም ሀገራት ተቀባይነት ያለው ይፋዊ የጋብቻ ውል እና የቃል ኪዳን ማረጋገጫ
          </p>

          {/* International Legal Harmonization Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-[10px] font-mono">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
              <Scale className="w-3 h-3 text-emerald-400" />
              <span>Hague Apostille Convention 1961</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              <span>UN Marriage Convention 1962</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-bold">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Ethiopian Revised Family Code Procl. 213/2000</span>
            </span>
          </div>
        </div>

        {/* Marriage Document Content */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-pink-500/20 rounded-2xl p-5 sm:p-7 space-y-6">
          <div className="text-center border-b border-pink-500/20 pb-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Universal Sovereign High Council of Matrimony
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-black text-white">
              Official Certificate of Holy Matrimony & Civil Covenant
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Registry File: <span className="text-amber-300 font-bold">{registryNumber}</span> • Chamber #5 Nuptials
            </p>
          </div>

          {/* The 5 Pillars of Matrimonial Solemnization */}
          <div className="space-y-4 text-xs">
            {/* 1. GROOM & BRIDE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="space-y-2">
                <span className="text-amber-400 font-black text-[11px] uppercase tracking-wide block">
                  1. ሙሽራው (Groom / Partner One):
                </span>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="ሙሉ ስም"
                />
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <input
                    type="text"
                    value={groomId}
                    onChange={(e) => setGroomId(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-300"
                    placeholder="Passport/National ID"
                  />
                  <input
                    type="text"
                    value={groomNationality}
                    onChange={(e) => setGroomNationality(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-300"
                    placeholder="ዜግነት / Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-pink-400 font-black text-[11px] uppercase tracking-wide block">
                  2. ሙሽሪት (Bride / Partner Two):
                </span>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="ሙሉ ስም"
                />
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <input
                    type="text"
                    value={brideId}
                    onChange={(e) => setBrideId(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-300"
                    placeholder="Passport/National ID"
                  />
                  <input
                    type="text"
                    value={brideNationality}
                    onChange={(e) => setBrideNationality(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-300"
                    placeholder="ዜግነት / Country"
                  />
                </div>
              </div>
            </div>

            {/* 2. BEST MAN, MAID OF HONOR & ELDERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="space-y-2">
                <span className="text-indigo-400 font-black text-[11px] uppercase tracking-wide block">
                  3. የሙሽራና የሙሽሪት ሚዜዎች (Best Man & Maid of Honor):
                </span>
                <input
                  type="text"
                  value={bestManName}
                  onChange={(e) => setBestManName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="ዋና ሚዜ"
                />
                <input
                  type="text"
                  value={maidOfHonorName}
                  onChange={(e) => setMaidOfHonorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="የሙሽሪት ሚዜ"
                />
              </div>

              <div className="space-y-2">
                <span className="text-emerald-400 font-black text-[11px] uppercase tracking-wide block">
                  4. አጋቢ ሽማግሌዎችና ዳኞች (Presiding Elders & Officiants):
                </span>
                <input
                  type="text"
                  value={elderName}
                  onChange={(e) => setElderName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="አጋቢ ሽማግሌ"
                />
                <input
                  type="text"
                  value={elderRole}
                  onChange={(e) => setElderRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-300"
                  placeholder="ማዕረግ / Jurisdiction"
                />
              </div>
            </div>

            {/* 3. LEGAL WITNESSES & PROPERTY REGIME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="space-y-2">
                <span className="text-teal-400 font-black text-[11px] uppercase tracking-wide block">
                  5. ምስክሮች (Official Legal Witnesses):
                </span>
                <input
                  type="text"
                  value={witnessOneName}
                  onChange={(e) => setWitnessOneName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="ምስክር 1"
                />
                <input
                  type="text"
                  value={witnessTwoName}
                  onChange={(e) => setWitnessTwoName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  placeholder="ምስክር 2"
                />
              </div>

              <div className="space-y-2">
                <span className="text-amber-300 font-black text-[11px] uppercase tracking-wide block">
                  የንብረትና ሀብት ስምምነት (Matrimonial Property Regime):
                </span>
                <select
                  value={propertyRegime}
                  onChange={(e: any) => setPropertyRegime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                >
                  <option value="community_of_property">የጋራ ሀብት ስምምነት (Joint Community of Property)</option>
                  <option value="separate_estate">የግል ንብረት ክፍፍል (Separate Estate Regime)</option>
                  <option value="customary_harmonized">ባህላዊና አለም አቀፍ የተስማማ ውል (Customary Harmonized)</option>
                </select>
                <p className="text-[10px] text-slate-400 italic">
                  Protected under UPMAA & Revised Family Code Art. 42
                </p>
              </div>
            </div>

            {/* VOWS */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <span className="text-amber-300 font-bold text-[11px] uppercase block">
                የቃል ኪዳን መሃላ (Sacred Nuptial Vows):
              </span>
              <textarea
                rows={2}
                value={vows}
                onChange={(e) => setVows(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 italic focus:outline-none"
              />
            </div>
          </div>

          {/* 4 DIGITAL SIGNING STATIONS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileSignature className="w-4 h-4" />
              <span>የ 4ቱ አካላት ይፋዊ የኦንላይን ፊርማ ጣቢያ (Official Digital Signing Stations)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              {/* Groom */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[115px]">
                <span className="text-[11px] text-slate-400 truncate w-full">{groomName.split(' ')[0]}</span>
                {signedGroom ? (
                  <div className="font-serif italic text-pink-400 font-black text-base">
                    ✓ {groomName.split(' ')[0]}
                  </div>
                ) : (
                  <button
                    onClick={handleSignGroom}
                    className="px-3 py-1.5 bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white rounded-lg text-xs font-bold border border-pink-500/40 cursor-pointer"
                  >
                    ፈርም (Sign)
                  </button>
                )}
                <span className="text-[10px] text-slate-500 font-semibold">Groom (ሙሽራው)</span>
              </div>

              {/* Bride */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[115px]">
                <span className="text-[11px] text-slate-400 truncate w-full">{brideName.split(' ')[0]}</span>
                {signedBride ? (
                  <div className="font-serif italic text-rose-400 font-black text-base">
                    ✓ {brideName.split(' ')[0]}
                  </div>
                ) : (
                  <button
                    onClick={handleSignBride}
                    className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg text-xs font-bold border border-rose-500/40 cursor-pointer"
                  >
                    ፈርም (Sign)
                  </button>
                )}
                <span className="text-[10px] text-slate-500 font-semibold">Bride (ሙሽሪት)</span>
              </div>

              {/* Elders */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[115px]">
                <span className="text-[11px] text-slate-400 truncate w-full">{elderName.split(' ')[0]}</span>
                {signedElder ? (
                  <div className="font-serif italic text-emerald-400 font-black text-base">
                    ✓ {elderName.split(' ')[0]}
                  </div>
                ) : (
                  <button
                    onClick={handleSignElder}
                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white rounded-lg text-xs font-bold border border-emerald-500/40 cursor-pointer"
                  >
                    መርቅ (Bless)
                  </button>
                )}
                <span className="text-[10px] text-slate-500 font-semibold">Elder (አጋቢ ሽማግሌ)</span>
              </div>

              {/* Witnesses */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[115px]">
                <span className="text-[11px] text-slate-400 truncate w-full">{witnessOneName.split(' ')[0]}</span>
                {signedWitness ? (
                  <div className="font-serif italic text-amber-400 font-black text-base">
                    ✓ {witnessOneName.split(' ')[0]}
                  </div>
                ) : (
                  <button
                    onClick={handleSignWitness}
                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white rounded-lg text-xs font-bold border border-amber-500/40 cursor-pointer"
                  >
                    መሰክር (Witness)
                  </button>
                )}
                <span className="text-[10px] text-slate-500 font-semibold">Witness (ምስክሮች)</span>
              </div>
            </div>
          </div>

          {/* GUEST ATTENDANCE & MONETARY GIFTS (Telebirr & CBE) */}
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

          {/* SOLEMNIZATION ACTION */}
          {!isCertified ? (
            <button
              onClick={handleSolemnizeAndCertify}
              disabled={!allKeyPartiesSigned}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-2xl transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>
                {allKeyPartiesSigned
                  ? 'ጋብቻውን በይፋ አፅድቅና የ Hague ማረጋገጫ ቁጥር አውጣ (Solemnize & Issue Hague Certificate)'
                  : 'እባክዎ መጀመሪያ ከላይ 4ቱንም ፊርማዎች ያጠናቁ (Complete all 4 signatures above)'}
              </span>
            </button>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/60 space-y-3 text-center">
              <div className="flex items-center justify-center space-x-2 text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>ይህ ጋብቻ በይፋ ፀድቆ በ The Hague Apostille መዝገብ ሰፍሯል!</span>
              </div>
              <p className="text-xs text-slate-300">
                Official Hague Apostille Code: <strong className="font-mono text-amber-300">{apostilleHash}</strong>
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>ይፋዊ የጋብቻ ሰርተፊኬቱን አትም (Print / Save Certificate)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
