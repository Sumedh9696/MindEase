import React from 'react';
import { Wind, BookOpen, Sparkles, Gamepad2, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ToolkitSidebar({ currentView, setView }) {
  const { user } = useAuth();

  const toolkitItems = [
    {
      id: 'breathing',
      label: 'Guided Breathing',
      icon: Wind,
      color: 'text-[#7BB6D8]',
      bg: 'bg-[#7BB6D8]/10'
    },
    {
      id: 'journal',
      label: 'Daily Journal',
      icon: BookOpen,
      color: 'text-[#E77A57]',
      bg: 'bg-[#E77A57]/10'
    },
    {
      id: 'affirmations',
      label: 'Positive Affirmations',
      icon: Sparkles,
      color: 'text-[#F5B844]',
      bg: 'bg-[#F5B844]/15'
    },
    {
      id: 'games',
      label: 'Calming Mini-Games',
      icon: Gamepad2,
      color: 'text-[#86C59C]',
      bg: 'bg-[#86C59C]/15'
    }
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
      
      {/* User Greeting Card */}
      <div className="bg-white rounded-3xl p-4 border border-[#EFE8DD] shadow-sm flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#FAF4EB] border border-[#EFE8DD] flex items-center justify-center text-[#E77A57]">
          <User className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-[#786F66]">Welcome back,</p>
          <h2 className="text-base font-bold text-[#2C2622]">{user?.name || 'User'}</h2>
        </div>
      </div>

      {/* Wellness Toolkit Navigation Card */}
      <div className="bg-white rounded-3xl p-4 border border-[#EFE8DD] shadow-sm">
        <p className="text-[11px] font-bold tracking-wider text-[#A89F93] uppercase px-2 mb-3">
          Wellness Toolkit
        </p>

        <nav className="space-y-1.5">
          {toolkitItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-[#FAF4EB] text-[#2C2622] font-semibold border border-[#EFE8DD]'
                    : 'text-[#786F66] hover:bg-[#FAF8F5] hover:text-[#2C2622]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

    </aside>
  );
}
