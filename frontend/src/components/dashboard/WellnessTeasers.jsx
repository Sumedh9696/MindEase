import React, { useState } from 'react';
import { Bookmark, ChevronRight, BookOpen, HeartHandshake } from 'lucide-react';
import { api } from '../../services/api';

export default function WellnessTeasers({ setView, onSelectResource }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    api.toggleBookmark('res_exam_stress').catch(() => {});
  };

  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-bold tracking-wider text-[#A89F93] uppercase px-1">
        Wellness Resources & Family Support
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: Managing Exam Stress */}
        <div
          onClick={() => {
            if (onSelectResource) onSelectResource('res_exam_stress');
            setView('resources');
          }}
          className="bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm hover:border-[#DFCFC0] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#A66717]">
                Exam Stress
              </span>
              <button
                onClick={handleBookmark}
                className="p-1 rounded-full text-[#A89F93] hover:text-[#E77A57] transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#E77A57] text-[#E77A57]' : ''}`} />
              </button>
            </div>

            <h4 className="text-sm font-bold text-[#2C2622] group-hover:text-[#E77A57] transition-colors">
              Managing Exam Stress
            </h4>
            <p className="text-xs text-[#786F66] mt-1 line-clamp-2">
              Simple techniques to reduce stress and improve focus.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F5EFE6] flex items-center justify-between">
            <span className="text-[11px] text-[#A89F93]">4 min read</span>
            <span className="text-xs font-semibold text-[#E77A57] group-hover:translate-x-0.5 transition-transform flex items-center">
              Read article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Family Support Circle */}
        <div
          onClick={() => setView('support')}
          className="bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm hover:border-[#DFCFC0] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-[#86C59C]/20 text-[#2F7347] flex items-center justify-center mb-3">
              <HeartHandshake className="w-4 h-4" />
            </div>

            <h4 className="text-sm font-bold text-[#2C2622] group-hover:text-[#E77A57] transition-colors">
              Family Support Circle
            </h4>
            <p className="text-xs text-[#786F66] mt-1">
              Connect with trusted people who care about you.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F5EFE6] flex items-center justify-between">
            <span className="text-[11px] text-[#A89F93]">2 trusted contacts active</span>
            <span className="text-xs font-semibold text-[#E77A57] group-hover:translate-x-0.5 transition-transform flex items-center">
              View circle <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
