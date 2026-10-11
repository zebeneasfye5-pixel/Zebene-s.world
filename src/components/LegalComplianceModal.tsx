import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INTERNATIONAL_LEGAL_ARTICLES } from '../data/legalFramework';
import { GlobalEmblem } from './GlobalEmblem';
import { speakText, stopSpeaking } from '../services/speech';
import {
  X,
  Scale,
  ShieldCheck,
  FileCheck,
  Award,
  AlertTriangle,
  Volume2,
  VolumeX,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface LegalComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullGuide?: () => void;
}

export const LegalComplianceModal: React.FC<LegalComplianceModalProps> = ({
  isOpen,
  onClose,
  onOpenFullGuide,
}) => {
  const { currentUser, legalCertificate, acceptLegalCompact, setActiveTab } = useApp();
  const [hasAgreedCheck, setHasAgreedCheck] = useState(Boolean(legalCertificate?.isCertified));
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakText(
      'ዓለም አቀፍ የሕግ ተጠያቂነት መመሪያ፡ በዚህ መተግበሪያና ድህረገፅ ላይ የሚደረግ ማንኛውም እንቅስቃሴ ከተመለከተው ዓለም አቀፍ የህግ ተጠያቂነት ጋር በጥብቅ የተሳሰረ ነው። የጥላቻ ንግግር፣ የሳይበር ጥቃት፣ የገንዘብ ማጭበርበር እና የውል ጥሰት በህግ ያስቀጣል።',
      'am'
    );
  };

  const handleConfirm = () => {
    acceptLegalCompact();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GlobalEmblem size="sm" showGlow={true} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  ዓለም አቀፍ የህግ ቻርተር
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  170+ Nations Jurisdiction
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                ዓለም አቀፍ የሕግ ተጠያቂነትና የአጠቃቀም ውል
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleSpeak}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400"
              title="Speak in Amharic"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            <div className="flex items-start space-x-2.5">
              <Scale className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300 text-xs sm:text-sm">
                  አስገዳጅ የዓለም አቀፍ ህግ ማስታወቂያ (Mandatory International Notice)
                </p>
                <p className="text-[11px] text-amber-200/90 mt-1 leading-relaxed">
                  በዚህ ድህረገፅ እና መተግበሪያ የሚደረግ ማንኛውም የድምፅ፣ የቪዲዮ፣ የገንዘብ፣ የጋብቻ ውል እና የመረጃ እንቅስቃሴ በሙሉ ከዓለም አቀፍ የሰብአዊ መብቶች (UDHR)፣ የሳይበር ወንጀል (Budapest Convention) እና የጸረ-ገንዘብ ማጭበርበር (FATF AML) ህጎች ጋር የተሳሰረ ነው። ማንኛውም ጥፋት በዓለም አቀፍ ፍርድ ቤቶች ተጠያቂ ያደርጋል።
                </p>
              </div>
            </div>
          </div>

          {/* Core Articles Summary */}
          <div className="space-y-2">
            <p className="font-bold text-white uppercase text-[11px] tracking-wider">
              ዋና ዋና የህግ ድንጋጌዎች (Summary of 7 Articles):
            </p>
            <div className="space-y-1.5">
              {INTERNATIONAL_LEGAL_ARTICLES.slice(0, 5).map((art) => (
                <div key={art.id} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start space-x-2">
                  <span className="font-bold text-amber-400 flex-shrink-0">#{art.articleNumber}</span>
                  <div>
                    <p className="font-bold text-slate-100">{art.amharicTitle}</p>
                    <p className="text-[10px] text-slate-400">{art.amharicSummary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Declaration & Agreement */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-start space-x-3 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <input
                type="checkbox"
                checked={hasAgreedCheck}
                onChange={(e) => setHasAgreedCheck(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-100">
                  እኔ ({currentUser.fullName}) ሁሉንም የዓለም አቀፍ ህግጋትና የአጠቃቀም መመሪያዎችን አንብቤያለሁ፤ በሙሉ ፈቃዴ ራሴን ለዓለም አቀፍ ህግ ተገዢ አድርጌ ቃል ገብቻለሁ።
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  I formally acknowledge and bind myself to international legal accountability across all platform actions.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                onClose();
                setActiveTab('tikil_2rya');
              }}
              className="text-xs px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 hover:text-white rounded-lg border border-amber-500/40 font-bold flex items-center space-x-1"
            >
              <span>📁 ጥቅል መመሪያ (ዓላማና ወንጀል መመሪያ)</span>
            </button>

            {onOpenFullGuide && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFullGuide();
                }}
                className="text-xs text-slate-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>ሙሉውን 7 አንቀጾች (7 Articles)</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium"
            >
              ዝጋ (Close)
            </button>

            <button
              onClick={handleConfirm}
              disabled={!hasAgreedCheck}
              className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                hasAgreedCheck
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>ውሉን አጽድቅና ፈርም (Confirm & Sign)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
