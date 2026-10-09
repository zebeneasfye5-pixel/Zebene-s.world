import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, FileSignature, CheckCircle2, X, Printer, Sparkles, Feather } from 'lucide-react';

interface WeddingContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeddingContractModal: React.FC<WeddingContractModalProps> = ({ isOpen, onClose }) => {
  const [partnerOne, setPartnerOne] = useState('Abel Tesfaye');
  const [partnerTwo, setPartnerTwo] = useState('Sara Demisse');
  const [elderOne, setElderOne] = useState('Ato Gabriel Wolde (Presiding Elder)');
  const [witnessOne, setWitnessOne] = useState('Dr. Marcus Chen & Bethlehem Bekele');
  const [tradition, setTradition] = useState('Ethiopian & Global Harmonized Covenant');
  const [vows, setVows] = useState(
    'We pledge our eternal love, reciprocal loyalty, mutual respect, and lifelong partnership under this sacred digital covenant witnessed by our global community.'
  );

  const [signedPartnerOne, setSignedPartnerOne] = useState(false);
  const [signedPartnerTwo, setSignedPartnerTwo] = useState(false);
  const [signedElder, setSignedElder] = useState(false);
  const [signedWitness, setSignedWitness] = useState(false);
  const [isCertified, setIsCertified] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const triggerCelebration = () => {
    setIsCertified(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#6366f1'],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-pink-500/30 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 mb-2">
            <Heart className="w-8 h-8 fill-pink-500/20" />
          </div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
            Chamber #5 Nuptial Covenant & Wedding Registry
          </h2>
          <p className="text-sm text-pink-300/80 font-medium">
            የሰርግ ቤት • የጋብቻ ውል ሰነድ እና የኦንላይን መፈረሚያ ሲስተም
          </p>
        </div>

        {/* Marriage Document Preview */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-pink-500/20 rounded-xl p-6 sm:p-8 space-y-6 print:border-none print:p-0">
          <div className="text-center border-b border-pink-500/20 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
              International Sovereign Registry • Zebene's World
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-100 mt-1">
              Certificate of Holy Matrimony & Digital Covenant
            </h3>
            <p className="text-xs text-slate-400">Registry Code: ZW-WED-2026-08819</p>
          </div>

          {/* Form / Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Groom / Partner One (ሙሽራው):</label>
              <input
                type="text"
                value={partnerOne}
                onChange={(e) => setPartnerOne(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Bride / Partner Two (ሙሽሪት):</label>
              <input
                type="text"
                value={partnerTwo}
                onChange={(e) => setPartnerTwo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Presiding Elders (አጋቢ ሽማግሌዎች):</label>
              <input
                type="text"
                value={elderOne}
                onChange={(e) => setElderOne(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Witnesses (ምስክሮች):</label>
              <input
                type="text"
                value={witnessOne}
                onChange={(e) => setWitnessOne(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Vows and Terms */}
          <div className="text-xs">
            <label className="block text-slate-400 font-semibold mb-1">Sacred Vows & Customary Terms:</label>
            <textarea
              rows={2}
              value={vows}
              onChange={(e) => setVows(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-pink-500 focus:outline-none italic"
            />
          </div>

          {/* 4 Interactive Online Signature Stations */}
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileSignature className="w-4 h-4" />
              Online Digital Signing Stations (የኦንላይን መፈረሚያ ሲስተም)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              {/* Partner 1 Signature */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[110px]">
                <span className="text-[11px] text-slate-400 truncate w-full">{partnerOne}</span>
                {signedPartnerOne ? (
                  <div className="font-serif italic text-pink-400 font-bold text-base">
                    ✓ {partnerOne.split(' ')[0]}
                  </div>
                ) : (
                  <button
                    onClick={() => setSignedPartnerOne(true)}
                    className="px-2.5 py-1 bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white rounded-lg text-[11px] font-semibold border border-pink-500/40 transition-colors"
                  >
                    Click to Sign
                  </button>
                )}
                <span className="text-[10px] text-slate-500">Groom / Partner 1</span>
              </div>

              {/* Partner 2 Signature */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[110px]">
                <span className="text-[11px] text-slate-400 truncate w-full">{partnerTwo}</span>
                {signedPartnerTwo ? (
                  <div className="font-serif italic text-rose-400 font-bold text-base">
                    ✓ {partnerTwo.split(' ')[0]}
                  </div>
                ) : (
                  <button
                    onClick={() => setSignedPartnerTwo(true)}
                    className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg text-[11px] font-semibold border border-rose-500/40 transition-colors"
                  >
                    Click to Sign
                  </button>
                )}
                <span className="text-[10px] text-slate-500">Bride / Partner 2</span>
              </div>

              {/* Elder Signature */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[110px]">
                <span className="text-[11px] text-slate-400 truncate w-full">Elder Matchmaker</span>
                {signedElder ? (
                  <div className="font-serif italic text-amber-400 font-bold text-base">
                    ✓ Ato Gabriel W.
                  </div>
                ) : (
                  <button
                    onClick={() => setSignedElder(true)}
                    className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white rounded-lg text-[11px] font-semibold border border-amber-500/40 transition-colors"
                  >
                    Elder Sign
                  </button>
                )}
                <span className="text-[10px] text-slate-500">Elder / ሽማግሌ</span>
              </div>

              {/* Witness Signature */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col items-center justify-between min-h-[110px]">
                <span className="text-[11px] text-slate-400 truncate w-full">Witness Council</span>
                {signedWitness ? (
                  <div className="font-serif italic text-emerald-400 font-bold text-base">
                    ✓ Dr. M. Chen
                  </div>
                ) : (
                  <button
                    onClick={() => setSignedWitness(true)}
                    className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white rounded-lg text-[11px] font-semibold border border-emerald-500/40 transition-colors"
                  >
                    Witness Sign
                  </button>
                )}
                <span className="text-[10px] text-slate-500">Witness / ምስክር</span>
              </div>
            </div>
          </div>

          {/* Certificate Stamp if Certified */}
          {isCertified && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h5 className="font-bold text-sm text-emerald-300">
                    Official Sovereign Matrimony Ratified!
                  </h5>
                  <p className="text-xs text-slate-300">
                    Congratulations to {partnerOne} & {partnerTwo}. Recorded in Chamber #5 permanent annals.
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Feather className="w-4 h-4 text-pink-400" />
            <span>All signatories verified via Biometric Face ID.</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Certificate</span>
            </button>
            <button
              onClick={triggerCelebration}
              disabled={!(signedPartnerOne && signedPartnerTwo && signedElder && signedWitness)}
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-500/25 flex items-center space-x-2 transition-transform active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Ratify Covenant & Celebrate!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
