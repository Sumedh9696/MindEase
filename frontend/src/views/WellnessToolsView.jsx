import React from 'react';
import { 
  ArrowLeft, Wind, BookOpen, Sparkles, Gamepad2, 
  Moon, Flower2, BookMarked, Bot, HeartHandshake, 
  Activity, ArrowRight, Clock 
} from 'lucide-react';

export default function WellnessToolsView({ setView, searchQuery }) {
  const tools = [
    {
      id: 'breathing',
      title: 'Guided Breathing',
      desc: 'Slow down your breath and relax in 2 minutes.',
      duration: '2-10 min',
      icon: Wind,
      color: 'text-[#7BB6D8]',
      bg: 'bg-[#7BB6D8]/15',
      hoverBorder: 'hover:border-[#7BB6D8]/50'
    },
    {
      id: 'journal',
      title: 'Daily Journal',
      desc: 'Express how you feel in a private space.',
      duration: '5-15 min',
      icon: BookOpen,
      color: 'text-[#E77A57]',
      bg: 'bg-[#E77A57]/15',
      hoverBorder: 'hover:border-[#E77A57]/50'
    },
    {
      id: 'affirmations',
      title: 'Positive Affirmations',
      desc: 'Gentle reminders of your strength and worth.',
      duration: '2 min',
      icon: Sparkles,
      color: 'text-[#F5B844]',
      bg: 'bg-[#F5B844]/20',
      hoverBorder: 'hover:border-[#F5B844]/50'
    },
    {
      id: 'games',
      title: 'Calming Mini-Games',
      desc: 'Low-pressure, relaxing games to ease your mind.',
      duration: '5-10 min',
      icon: Gamepad2,
      color: 'text-[#86C59C]',
      bg: 'bg-[#86C59C]/20',
      hoverBorder: 'hover:border-[#86C59C]/50'
    },
    {
      id: 'meditation',
      title: 'Meditation',
      desc: 'Guided sessions to bring stillness.',
      duration: '5-20 min',
      icon: Flower2,
      color: 'text-[#A070A1]',
      bg: 'bg-[#A070A1]/15',
      hoverBorder: 'hover:border-[#A070A1]/50'
    },
    {
      id: 'sleep',
      title: 'Sleep & Relaxation',
      desc: 'Wind down and prepare for restful sleep.',
      duration: '10-30 min',
      icon: Moon,
      color: 'text-[#5C7DA3]',
      bg: 'bg-[#5C7DA3]/15',
      hoverBorder: 'hover:border-[#5C7DA3]/50'
    },
    {
      id: 'resources',
      title: 'Wellness Resources',
      desc: 'Articles and guides for mental wellbeing.',
      duration: 'Browse',
      icon: BookMarked,
      color: 'text-[#E77A57]',
      bg: 'bg-[#E77A57]/15',
      hoverBorder: 'hover:border-[#E77A57]/50'
    },
    {
      id: 'mindmate_full',
      title: 'MindMate AI',
      desc: 'Chat with your personal wellness companion.',
      duration: 'Anytime',
      icon: Bot,
      color: 'text-[#DC7254]',
      bg: 'bg-[#DC7254]/15',
      hoverBorder: 'hover:border-[#DC7254]/50'
    },
    {
      id: 'support',
      title: 'Family Support',
      desc: 'Connect with trusted people in your life.',
      duration: 'Anytime',
      icon: HeartHandshake,
      color: 'text-[#86C59C]',
      bg: 'bg-[#86C59C]/20',
      hoverBorder: 'hover:border-[#86C59C]/50'
    },
    {
      id: 'stress_relief',
      title: 'Stress Relief',
      desc: 'Simple body movements to release tension.',
      duration: '5 min',
      icon: Activity,
      color: 'text-[#F5B844]',
      bg: 'bg-[#F5B844]/20',
      hoverBorder: 'hover:border-[#F5B844]/50'
    }
  ];

  const filteredTools = searchQuery && searchQuery.trim() !== ''
    ? tools.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  const handleCardClick = (toolId) => {
    if (toolId === 'mindmate_full') {
      setView('dashboard');
    } else if (toolId === 'meditation' || toolId === 'stress_relief' || toolId === 'sleep') {
      setView('breathing');
    } else {
      setView(toolId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Back button */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setView('dashboard')}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#786F66] hover:text-[#2C2622] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Headings */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622]">
          What would help you right now?
        </h1>
        <p className="text-sm text-[#786F66] mt-1">
          Choose any activity to get started.
        </p>
      </div>

      {/* Tools Grid with Hover Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => handleCardClick(tool.id)}
              className={`bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm transition-all duration-300 cursor-pointer group flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 ${tool.hoverBorder}`}
            >
              {/* Icon Container with hover zoom */}
              <div className={`w-12 h-12 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-[#2C2622] group-hover:text-[#E77A57] transition-colors truncate">
                    {tool.title}
                  </h3>
                  
                  {/* Hover reveal arrow indicator */}
                  <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all text-[#E77A57]">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <p className="text-xs text-[#786F66] line-clamp-2 leading-relaxed">
                  {tool.desc}
                </p>

                {/* Duration chip */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#A89F93] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tool.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
