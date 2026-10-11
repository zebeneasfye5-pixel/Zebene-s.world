import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ChamberNavigator } from './components/ChamberNavigator';
import { ChamberView } from './components/ChamberView';
import { LearningHorizon } from './components/LearningHorizon';
import { GamesAndLottery } from './components/GamesAndLottery';
import { CharityHub } from './components/CharityHub';
import { BankingAndEconomy } from './components/BankingAndEconomy';
import { RegistrationModal } from './components/RegistrationModal';
import { FoundersVaultModal } from './components/FoundersVaultModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Heart, Globe2, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [founderVaultOpen, setFounderVaultOpen] = useState(false);
  const [pwaModalOpen, setPwaModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        onOpenFounderVault={() => setFounderVaultOpen(true)}
        onOpenPWA={() => setPwaModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {/* Chamber Navigator (always available on chamber tab or accessible) */}
        {activeTab === 'chamber' && <ChamberNavigator />}

        {/* Tab Switcher Body */}
        {activeTab === 'chamber' && <ChamberView />}
        {activeTab === 'learning' && <LearningHorizon />}
        {activeTab === 'games_lottery' && <GamesAndLottery />}
        {activeTab === 'charity' && <CharityHub />}
        {activeTab === 'banking_economy' && <BankingAndEconomy />}
      </main>

      {/* Global Modals & Indicators */}
      <RegistrationModal />
      <FoundersVaultModal isOpen={founderVaultOpen} onClose={() => setFounderVaultOpen(false)} />
      <PWAInstallBanner isOpen={pwaModalOpen} onClose={() => setPwaModalOpen(false)} />
      <OfflineIndicator />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-white text-sm">
              ZW
            </div>
            <div>
              <p className="font-bold text-slate-200">Zebene's World • ዘበነ የመሰረተው አለም</p>
              <p className="text-[11px] text-slate-500">Universal Sovereign Assembly • 7 Sovereign Chambers</p>
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
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Humanitarian Solidarity
            </span>
          </div>

          <div className="text-[11px] text-slate-500 text-center sm:text-right">
            Connected to CBE & Telebirr Rails • 2026 Sovereign Foundation
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
