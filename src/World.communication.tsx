import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ChamberNavigator } from './components/ChamberNavigator';
import { ChamberView } from './components/ChamberView';
import { LearningHorizon } from './components/LearningHorizon';
import { GamesAndLottery } from './components/GamesAndLottery';
import { CharityHub } from './components/CharityHub';
import { BankingAndEconomy } from './components/BankingAndEconomy';
import { LegalTreatyAndGuide } from './components/LegalTreatyAndGuide';
import { LegalComplianceModal } from './components/LegalComplianceModal';
import { Tikil2ryaDossier } from './components/Tikil2ryaDossier';
import { Tikil2ryaModal } from './components/Tikil2ryaModal';
import { RegistrationModal } from './components/RegistrationModal';
import { FoundersVaultModal } from './components/FoundersVaultModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { PlayStoreModal } from './components/PlayStoreModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { GlobalEmblem } from './components/GlobalEmblem';
import { GlobalAssemblyHero } from './components/GlobalAssemblyHero';
import { MasterDashboardModal } from './components/MasterDashboardModal';
import { AuthGateModal } from './components/AuthGateModal';
import { WeddingContractModal } from './components/WeddingContractModal';
import { ChamberRegistrationModal } from './components/ChamberRegistrationModal';
import { ContactInviteModal } from './components/ContactInviteModal';
import { EmbedWidgetModal } from './components/EmbedWidgetModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MemberFinancialModal } from './components/MemberFinancialModal';
import { ActivityRewardToast } from './components/ActivityRewardToast';
import { Heart, Globe2, ShieldCheck, Scale, FileCheck, FolderOpen, Key, Compass } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isLegalModalOpen,
    setIsLegalModalOpen,
    isTikil2ryaModalOpen,
    setIsTikil2ryaModalOpen,
    legalCertificate,
    switchChamber,
    currentUser,
    isMemberFinanceModalOpen,
    setIsMemberFinanceModalOpen,
  } = useApp();

  const [founderVaultOpen, setFounderVaultOpen] = useState(false);
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const [playStoreModalOpen, setPlayStoreModalOpen] = useState(false);

  // New Sovereign Master Modals
  const [isMasterDashboardOpen, setIsMasterDashboardOpen] = useState(false);
  const [isAuthGateOpen, setIsAuthGateOpen] = useState(false);
  const [isWeddingModalOpen, setIsWeddingModalOpen] = useState(false);
  const [isChamberRegOpen, setIsChamberRegOpen] = useState(false);

  const handleOpenChamberReg = (chamberCode: number) => {
    switchChamber(chamberCode);
    setIsChamberRegOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar with Master Dashboard button */}
      <Navbar
        onOpenFounderVault={() => setFounderVaultOpen(true)}
        onOpenPWA={() => setPwaModalOpen(true)}
        onOpenPlayStoreModal={() => setPlayStoreModalOpen(true)}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenTikil2ryaModal={() => setIsTikil2ryaModalOpen(true)}
        onOpenMasterDashboard={() => setIsMasterDashboardOpen(true)}
        onOpenAuthGate={() => setIsAuthGateOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {/* Top Hero Banner: Grand Assembly Hall with world flags & Real-Time Live Voice Interpretation Console */}
        <GlobalAssemblyHero
          onOpenMasterDashboard={() => setIsMasterDashboardOpen(true)}
          onOpenAuthGate={() => setIsAuthGateOpen(true)}
        />

        {/* Chamber Navigator (always available on chamber tab or accessible) */}
        {activeTab === 'chamber' && <ChamberNavigator />}

        {/* Tab Switcher Body */}
        {activeTab === 'chamber' && <ChamberView />}
        {activeTab === 'learning' && <LearningHorizon />}
        {activeTab === 'games_lottery' && <GamesAndLottery />}
        {activeTab === 'charity' && <CharityHub />}
        {activeTab === 'banking_economy' && <BankingAndEconomy />}
        {activeTab === 'legal_compliance' && <LegalTreatyAndGuide />}
        {activeTab === 'tikil_2rya' && <Tikil2ryaDossier />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Master Modals & Systems */}
      <MasterDashboardModal
        isOpen={isMasterDashboardOpen}
        onClose={() => setIsMasterDashboardOpen(false)}
        onOpenWeddingModal={() => setIsWeddingModalOpen(true)}
        onOpenChamberReg={handleOpenChamberReg}
        onOpenFounderVault={() => setFounderVaultOpen(true)}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenTikil2ryaModal={() => setIsTikil2ryaModalOpen(true)}
      />

      <AuthGateModal
        isOpen={isAuthGateOpen}
        onClose={() => setIsAuthGateOpen(false)}
      />

      <WeddingContractModal
        isOpen={isWeddingModalOpen}
        onClose={() => setIsWeddingModalOpen(false)}
      />

      <ChamberRegistrationModal
        isOpen={isChamberRegOpen}
        onClose={() => setIsChamberRegOpen(false)}
      />

      <ContactInviteModal />
      <EmbedWidgetModal />

      {/* Member Personal Finance & Activity Rewards System */}
      <MemberFinancialModal
        isOpen={isMemberFinanceModalOpen}
        onClose={() => setIsMemberFinanceModalOpen(false)}
      />
      <ActivityRewardToast />

      {/* Legacy and Platform Modals */}
      <RegistrationModal />
      <FoundersVaultModal isOpen={founderVaultOpen} onClose={() => setFounderVaultOpen(false)} />
      <PWAInstallBanner
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
        onOpenPlayStoreGuide={() => setPlayStoreModalOpen(true)}
      />
      <PlayStoreModal
        isOpen={playStoreModalOpen}
        onClose={() => setPlayStoreModalOpen(false)}
        onOpenInstallPWA={() => setPwaModalOpen(true)}
      />
      <LegalComplianceModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        onOpenFullGuide={() => setActiveTab('legal_compliance')}
      />
      <Tikil2ryaModal
        isOpen={isTikil2ryaModalOpen}
        onClose={() => setIsTikil2ryaModalOpen(false)}
        onNavigateToTreaty={() => setActiveTab('legal_compliance')}
      />
      <OfflineIndicator />

      {/* Footer with International Legal Framework Links & Founding Information */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('legal_compliance')}>
              <GlobalEmblem size="sm" showGlow={false} />
              <div>
                <p className="font-bold text-slate-200">Zebene's World • ዘበነ የመሰረተው አለም</p>
                <p className="text-[11px] text-slate-500">
                  Universal Sovereign Assembly • Founded by <strong className="text-amber-300">ክቡር ዘበነ አስፍዬ (Zebene Asfeye)</strong> on <strong className="text-amber-300">ጥር 2 ቀን 2018 ዓ.ም. (January 10, 2026)</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-amber-400" /> Real-Time AI Multilingual Translation
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Chamber Isolation Shield Active
              </span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-amber-400" /> 170+ Nations Harmonized Law
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Humanitarian Solidarity
              </span>
            </div>

            <div className="text-[11px] text-slate-500 text-center md:text-right">
              Connected to CBE & Telebirr Rails • 2026 Sovereign Foundation
            </div>
          </div>

          {/* International Legal Accountability Notice Banner in Footer */}
          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                onClick={() => setIsMasterDashboardOpen(true)}
                className="hover:text-amber-300 text-amber-400 font-bold flex items-center gap-1"
              >
                <Compass className="w-3 h-3 text-amber-400" />
                <span>🎛️ ዋና ዳሽቦርድ (Master Dashboard)</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('tikil_2rya')}
                className="hover:text-amber-300 text-amber-400 font-bold underline underline-offset-2 flex items-center gap-1"
              >
                <FolderOpen className="w-3 h-3 text-amber-400" />
                <span>📁 ጥቅል መመሪያ (ዋና ዓላማና የወንጀል ተጠያቂነት)</span>
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('legal_compliance')}
                className="hover:text-amber-400 text-slate-400 underline underline-offset-2 flex items-center gap-1"
              >
                <Scale className="w-3 h-3 text-amber-400" />
                <span>ዓለም አቀፍ የሕግ ተጠያቂነትና ቻርተር (International Legal Compact)</span>
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setActiveTab('legal_compliance');
                }}
                className="hover:text-indigo-400 text-slate-400 underline underline-offset-2"
              >
                የተጠቃሚዎች የአጠቃቀም መመሪያ (How-To Operational Manual)
              </button>
              <span>•</span>
              <button
                onClick={() => setIsLegalModalOpen(true)}
                className="hover:text-emerald-400 text-slate-400 underline underline-offset-2 flex items-center gap-1"
              >
                <FileCheck className="w-3 h-3 text-emerald-400" />
                <span>{legalCertificate?.isCertified ? 'የተረጋገጠ ውል (Certified)' : 'ውሉን ፈርም (Sign Legal Compact)'}</span>
              </button>
              {currentUser?.role === 'founder' && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="hover:text-rose-400 text-rose-300 font-bold underline underline-offset-2"
                  >
                    🛡️ የአስተዳዳሪ ዳሽቦርድ (Admin)
                  </button>
                </>
              )}
            </div>

            <p className="text-[10px] text-slate-500 text-center">
              All platform activities are legally bound under UN UDHR, Budapest Cybercrime ETS 185, and FATF AML regulations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
