import React from 'react';
import { Tikil2ryaDossier } from './Tikil2ryaDossier';
import { X, FolderOpen, Key } from 'lucide-react';

interface Tikil2ryaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTreaty?: () => void;
}

export const Tikil2ryaModal: React.FC<Tikil2ryaModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTreaty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-slate-950 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <FolderOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  ቁልፍ 2
                </span>
                <h2 className="text-base font-black text-white">
                  የፈልደር ቁልፍ: ጥቅል መመሪያ (Bundle Directive)
                </h2>
              </div>
              <p className="text-[11px] text-slate-400">
                ዋና ዓላማ በሁሉም ቋንቋዎች እና ዓለም አቀፍ የወንጀል ተጠያቂነት መመሪያ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Tikil2ryaDossier
            isModalView={true}
            onCloseModal={onClose}
            onNavigateToTreaty={() => {
              onClose();
              if (onNavigateToTreaty) onNavigateToTreaty();
            }}
          />
        </div>
      </div>
    </div>
  );
};
