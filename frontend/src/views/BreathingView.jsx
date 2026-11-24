import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function BreathingView({ setView }) {
  const [durationMin, setDurationMin] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Rest
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(2 * 60);
  const [isCompleted, setIsCompleted] = useState(false);

  // Box Breathing cycle: Inhale 4s -> Hold 4s -> Exhale 4s -> Rest 2s
  const CYCLE = [
    { name: 'Inhale', duration: 4, label: 'Breathe in slowly through your nose...', scale: 1.4 },
    { name: 'Hold', duration: 4, label: 'Gently hold your breath...', scale: 1.4 },
    { name: 'Exhale', duration: 4, label: 'Release and exhale smoothly...', scale: 1.0 },
    { name: 'Rest', duration: 2, label: 'Rest and pause in stillness...', scale: 1.0 }
  ];

  const [cycleIndex, setCycleIndex] = useState(0);

  // Timer loop
  useEffect(() => {
    let interval = null;

    if (isActive && totalSecondsLeft > 0) {
      interval = setInterval(() => {
        setTotalSecondsLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });

        setPhaseSeconds(prev => {
          if (prev <= 1) {
            // Next cycle step
            const nextIdx = (cycleIndex + 1) % CYCLE.length;
            setCycleIndex(nextIdx);
            setPhase(CYCLE[nextIdx].name);
            return CYCLE[nextIdx].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, cycleIndex, totalSecondsLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCycleIndex(0);
    setPhase('Inhale');
    setPhaseSeconds(4);
    setTotalSecondsLeft(durationMin * 60);
    setIsCompleted(false);
  };

  const handleDurationChange = (min) => {
    setDurationMin(min);
    setTotalSecondsLeft(min * 60);
    setIsActive(false);
    setCycleIndex(0);
    setPhase('Inhale');
    setPhaseSeconds(4);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
    api.logBreathingSession(durationMin * 60, '4-4-4-2').catch(() => {});

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#7BB6D8', '#86C59C', '#E77A57']
    });
  };

  const currentStep = CYCLE[cycleIndex];
  const minutesDisplay = Math.floor(totalSecondsLeft / 60);
  const secondsDisplay = totalSecondsLeft % 60;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in text-center">
      
      {/* Back Button */}
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
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622] mb-1">
        Take a moment to breathe.
      </h1>
      <p className="text-sm text-[#786F66] mb-8">
        Follow the circle's rhythm.
      </p>

      {/* Breathing Animated Circle Graphic */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-8 flex items-center justify-center">
        
        {/* Soft Background Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-[#FAF4EB] border-2 border-dashed border-[#EFE8DD] pointer-events-none" />

        {/* Breathing Animated Orb */}
        <div
          className="w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-1000 ease-in-out relative"
          style={{
            transform: isActive ? `scale(${currentStep.scale})` : 'scale(1)',
            background: phase === 'Inhale' 
              ? 'radial-gradient(circle, #86C59C 0%, #68B283 100%)' 
              : phase === 'Hold' 
              ? 'radial-gradient(circle, #F5B844 0%, #E2A32B 100%)' 
              : phase === 'Exhale'
              ? 'radial-gradient(circle, #7BB6D8 0%, #5B9EC5 100%)'
              : 'radial-gradient(circle, #B8B0A5 0%, #A39A8E 100%)',
            boxShadow: isActive ? '0 0 40px rgba(118, 193, 142, 0.35)' : '0 10px 30px rgba(0,0,0,0.06)'
          }}
        >
          {isCompleted ? (
            <div className="text-white flex flex-col items-center">
              <CheckCircle className="w-10 h-10 mb-1" />
              <span className="text-sm font-bold">Session Complete!</span>
            </div>
          ) : (
            <div className="text-white text-center select-none px-4">
              <p className="text-lg font-extrabold tracking-wide drop-shadow-sm uppercase">
                {phase}
              </p>
              <p className="text-2xl font-black my-0.5">
                {isActive ? phaseSeconds : '4'}s
              </p>
              <p className="text-[11px] opacity-90 font-medium">
                {isActive ? currentStep.label : 'Follow the rhythm'}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Status & Session Duration */}
      <div className="max-w-md mx-auto space-y-4">
        
        <p className="text-sm font-bold text-[#2C2622]">
          {isCompleted ? 'Peaceful work done.' : isActive ? `Session in progress (${minutesDisplay}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay})` : 'Ready when you are'}
        </p>

        {/* Session duration selector */}
        <div>
          <p className="text-xs text-[#A89F93] mb-2 font-medium">Session duration</p>
          <div className="flex items-center justify-center gap-2">
            {[2, 5, 10].map((min) => (
              <button
                key={min}
                onClick={() => handleDurationChange(min)}
                className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  durationMin === min
                    ? 'bg-[#2C2622] text-white shadow-xs'
                    : 'bg-white text-[#786F66] border border-[#EFE8DD] hover:border-[#D6CAB8]'
                }`}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>

        {/* Actions Start / Pause / Reset */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-8 py-3 rounded-2xl bg-[#E77A57] hover:bg-[#D96946] text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-8 py-3 rounded-2xl bg-[#F5B844] hover:bg-[#E2A32B] text-[#2C2622] text-sm font-bold shadow-md transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Pause className="w-4 h-4 fill-[#2C2622]" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-white border border-[#EFE8DD] text-[#786F66] hover:text-[#2C2622] hover:bg-[#FAF4EB] transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
