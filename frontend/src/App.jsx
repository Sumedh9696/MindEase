import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginView from './views/LoginView';
import Navbar from './components/common/Navbar';
import SosModal from './components/common/SosModal';
import DashboardView from './views/DashboardView';
import WellnessToolsView from './views/WellnessToolsView';
import BreathingView from './views/BreathingView';
import DailyJournalView from './views/DailyJournalView';
import ResourcesView from './views/ResourcesView';
import SupportCircleView from './views/SupportCircleView';
import AffirmationsView from './views/AffirmationsView';
import MiniGamesView from './views/MiniGamesView';
import { HelpCircle } from 'lucide-react';

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF4EB] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#E77A57] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={() => setCurrentView('dashboard')} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            setView={setCurrentView}
            onSelectResource={(id) => setSelectedArticleId(id)}
          />
        );
      case 'tools':
        return (
          <WellnessToolsView
            setView={setCurrentView}
            searchQuery={searchQuery}
          />
        );
      case 'breathing':
        return <BreathingView setView={setCurrentView} />;
      case 'journal':
        return <DailyJournalView setView={setCurrentView} />;
      case 'resources':
        return (
          <ResourcesView
            setView={setCurrentView}
            initialArticleId={selectedArticleId}
          />
        );
      case 'support':
        return <SupportCircleView setView={setCurrentView} />;
      case 'affirmations':
        return <AffirmationsView setView={setCurrentView} />;
      case 'games':
        return <MiniGamesView setView={setCurrentView} />;
      default:
        return <DashboardView setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#2C2622] flex flex-col antialiased">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setView={setCurrentView}
        onOpenSos={() => setIsSosOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* SOS Emergency Modal */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />

      {/* Floating Bottom-Right Help Button */}
      <button
        onClick={() => {
          alert(
            "MindEase Quick Navigation:\n" +
            "• Home: Mood tracker, emotional patterns curve & AI companion\n" +
            "• Wellness Tools: 10 interactive activities with hover cards\n" +
            "• Guided Breathing: Follow rhythmic box breathing circle\n" +
            "• Daily Journal: Expressive writing with prompt helpers\n" +
            "• Resources: Curated wellness articles and bookmarks\n" +
            "• Support: Trusted family circle contacts\n" +
            "• + SOS Help: Instant 24/7 crisis lifelines"
          );
        }}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white border border-[#EFE8DD] shadow-md text-[#2C2622] flex items-center justify-center hover:bg-[#FAF4EB] transition-all z-30"
        title="MindEase Help & Guide"
      >
        <HelpCircle className="w-5 h-5 text-[#786F66]" />
      </button>
    </div>
  );
}
