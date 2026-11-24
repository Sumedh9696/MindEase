import React, { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const AFFIRMATIONS = [
  { text: "I give myself permission to slow down and rest.", theme: "Peace", bg: "from-[#FDF2EE] to-[#FAF4EB]" },
  { text: "My feelings are valid, and I treat myself with deep kindness.", theme: "Self-Compassion", bg: "from-[#F2FAF5] to-[#FAF4EB]" },
  { text: "I do not have to figure out everything today. One breath at a time.", theme: "Release", bg: "from-[#F2F8FC] to-[#FAF4EB]" },
  { text: "I am stronger than my anxious thoughts, and this moment will pass.", theme: "Resilience", bg: "from-[#FDF8EE] to-[#FAF4EB]" },
  { text: "I choose to focus on what I can control and release what I cannot.", theme: "Clarity", bg: "from-[#FCF4F1] to-[#FAF4EB]" },
  { text: "I am deserving of peace, calm, and happiness in my everyday life.", theme: "Worth", bg: "from-[#FAF2FA] to-[#FAF4EB]" }
];

export default function AffirmationsView({ setView }) {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});

  const current = AFFIRMATIONS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
  };

  const handleLike = () => {
    setLikes(prev => ({ ...prev, [index]: !prev[index] }));
    confetti({
      particleCount: 20,
      spread: 35,
      origin: { y: 0.6 },
      colors: ['#E77A57', '#F5B844']
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in text-center">
      
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

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622]">Positive Affirmations</h1>
        <p className="text-sm text-[#786F66] mt-1">Gentle reminders of your strength and worth.</p>
      </div>

      {/* Flippable Card */}
      <div className={`bg-gradient-to-br ${current.bg} rounded-3xl p-8 sm:p-12 border border-[#EFE8DD] shadow-lg min-h-[300px] flex flex-col justify-between items-center mb-8 relative transition-all duration-300`}>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 text-[#786F66] shadow-2xs">
          {current.theme}
        </span>

        <p className="text-lg sm:text-2xl font-bold text-[#2C2622] leading-relaxed my-6 px-4">
          "{current.text}"
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`p-3 rounded-full bg-white shadow-xs transition-colors ${
              likes[index] ? 'text-[#E77A57]' : 'text-[#A89F93] hover:text-[#E77A57]'
            }`}
          >
            <Heart className={`w-5 h-5 ${likes[index] ? 'fill-[#E77A57]' : ''}`} />
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-full bg-[#E77A57] hover:bg-[#D96946] text-white text-xs font-bold shadow-xs flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next Affirmation</span>
          </button>
        </div>
      </div>

    </div>
  );
}
