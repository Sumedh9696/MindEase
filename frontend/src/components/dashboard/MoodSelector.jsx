import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MoreHorizontal, Check } from 'lucide-react';
import { api } from '../../services/api';

export default function MoodSelector({ onMoodLogged, activeMood }) {
  const [selectedMood, setSelectedMood] = useState(activeMood || 'Daily Joy');
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryMoods = [
    { name: 'Radiant', emoji: '☀️', color: 'border-[#F5B844] text-[#B87A14]', bg: 'bg-[#FDF8EE]', activeBg: 'bg-[#F5B844]/20' },
    { name: 'Daily Joy', emoji: '😊', color: 'border-[#86C59C] text-[#2F7347]', bg: 'bg-[#F2FAF5]', activeBg: 'bg-[#86C59C]/25' },
    { name: 'Positive', emoji: '✨', color: 'border-[#7BB6D8] text-[#2B6D96]', bg: 'bg-[#F2F8FC]', activeBg: 'bg-[#7BB6D8]/25' },
    { name: 'Anxious', emoji: '😟', color: 'border-[#E9A855] text-[#A66717]', bg: 'bg-[#FDF6ED]', activeBg: 'bg-[#E9A855]/25' },
    { name: 'Stressed', emoji: '😣', color: 'border-[#DC7254] text-[#A84227]', bg: 'bg-[#FCF4F1]', activeBg: 'bg-[#DC7254]/25' }
  ];

  const extendedMoods = [
    { name: 'Calm', emoji: '🌿', color: 'border-[#98C1D9] text-[#2A6F8F]' },
    { name: 'Neutral', emoji: '😐', color: 'border-[#B8B0A5] text-[#5C5549]' },
    { name: 'Sad', emoji: '😢', color: 'border-[#7A889B] text-[#334255]' },
    { name: 'Overwhelmed', emoji: '🌪️', color: 'border-[#DE6B48] text-[#9A381C]' }
  ];

  const handleSelectMood = async (moodName) => {
    setSelectedMood(moodName);
    setIsSubmitting(true);
    setShowMoreModal(false);

    try {
      await api.logMood(moodName);
      if (onMoodLogged) onMoodLogged(moodName);

      // Gentle celebration for mindful check-in
      confetti({
        particleCount: 28,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#E77A57', '#F5B844', '#86C59C', '#7BB6D8']
      });
    } catch (err) {
      console.warn('Could not sync mood:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm relative">
      <h3 className="text-base font-bold text-[#2C2622] mb-3.5">
        How are you feeling today?
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {primaryMoods.map((mood) => {
          const isSelected = selectedMood === mood.name;
          return (
            <button
              key={mood.name}
              onClick={() => handleSelectMood(mood.name)}
              disabled={isSubmitting}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1.5 group ${
                isSelected
                  ? `${mood.color} ${mood.activeBg} border-2 scale-[1.03] shadow-xs`
                  : `border-[#EFE8DD] ${mood.bg} hover:border-[#D6CAB8] hover:scale-[1.02]`
              }`}
            >
              <span className="text-2xl transition-transform group-hover:scale-110">
                {mood.emoji}
              </span>
              <span className="text-xs font-semibold text-[#2C2622] group-hover:text-[#000]">
                {mood.name}
              </span>
            </button>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setShowMoreModal(!showMoreModal)}
          className="p-3 rounded-2xl border border-dashed border-[#EFE8DD] bg-[#FAF8F5] hover:bg-[#FAF4EB] hover:border-[#D6CAB8] transition-all flex flex-col items-center justify-center gap-1.5 text-[#786F66]"
        >
          <div className="w-7 h-7 rounded-full bg-[#EFE8DD] flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-[#786F66]" />
          </div>
          <span className="text-xs font-semibold">More</span>
        </button>
      </div>

      {/* More Moods Popover */}
      {showMoreModal && (
        <div className="absolute right-5 top-16 z-20 bg-white rounded-2xl border border-[#EFE8DD] shadow-lg p-3 w-56 animate-fade-in">
          <p className="text-xs font-bold text-[#786F66] mb-2 px-1">More emotions</p>
          <div className="grid grid-cols-2 gap-1.5">
            {extendedMoods.map((m) => (
              <button
                key={m.name}
                onClick={() => handleSelectMood(m.name)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#FAF4EB] text-left text-xs font-medium text-[#2C2622] transition-colors"
              >
                <span>{m.emoji}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
