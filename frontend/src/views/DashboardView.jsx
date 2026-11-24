import React, { useState } from 'react';
import ToolkitSidebar from '../components/dashboard/ToolkitSidebar';
import MoodSelector from '../components/dashboard/MoodSelector';
import MoodAnalytics from '../components/dashboard/MoodAnalytics';
import WellnessTeasers from '../components/dashboard/WellnessTeasers';
import MindMateCompanion from '../components/common/MindMateCompanion';

export default function DashboardView({ setView, onSelectResource }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMoodLogged = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Wellness Toolkit Sidebar (3 cols on lg) */}
        <div className="lg:col-span-3">
          <ToolkitSidebar currentView="dashboard" setView={setView} />
        </div>

        {/* Center Column: Mood Tracking, Graph & Resources (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Mood Check-in */}
          <MoodSelector onMoodLogged={handleMoodLogged} />

          {/* Mood Trend Spline Graph */}
          <MoodAnalytics refreshTrigger={refreshTrigger} />

          {/* Wellness Resources & Family Support Teasers */}
          <WellnessTeasers setView={setView} onSelectResource={onSelectResource} />
        </div>

        {/* Right Column: MindMate AI Companion (3 cols on lg) */}
        <div className="lg:col-span-3">
          <MindMateCompanion />
        </div>

      </div>
    </div>
  );
}
