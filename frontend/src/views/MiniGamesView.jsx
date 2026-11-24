import React, { useState } from 'react';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MiniGamesView({ setView }) {
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({ id: i, popped: false }))
  );
  const [poppedCount, setPoppedCount] = useState(0);

  const popBubble = (id) => {
    setBubbles(prev =>
      prev.map(b => (b.id === id ? { ...b, popped: true } : b))
    );
    setPoppedCount(prev => {
      const next = prev + 1;
      if (next % 12 === 0) {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#86C59C', '#7BB6D8']
        });
      }
      return next;
    });
  };

  const resetGame = () => {
    setBubbles(Array.from({ length: 24 }, (_, i) => ({ id: i, popped: false })));
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622]">Calming Bubble Wrap</h1>
        <p className="text-sm text-[#786F66] mt-1">
          Low-pressure, tactile relaxing clicks to relieve tension.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8DD] shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4 text-xs font-semibold text-[#786F66] px-2">
          <span>Bubbles popped: <strong>{poppedCount}</strong></span>
          <button
            onClick={resetGame}
            className="flex items-center gap-1 text-[#E77A57] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset sheet
          </button>
        </div>

        {/* Bubble Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#FAF6F0] border border-[#EFE8DD]">
          {bubbles.map((b) => (
            <button
              key={b.id}
              onClick={() => !b.popped && popBubble(b.id)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 flex items-center justify-center transform active:scale-90 ${
                b.popped
                  ? 'bg-[#EFE8DD]/70 scale-95 shadow-inner'
                  : 'bg-radial from-[#FFFFFF] to-[#E3D9CC] border border-[#D9CFC2] shadow-md hover:scale-105 hover:border-[#86C59C]'
              }`}
            >
              {!b.popped && (
                <div className="w-3 h-3 rounded-full bg-white/70 absolute top-2 left-2" />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
