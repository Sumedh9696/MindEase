import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Plus, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export default function DailyJournalView({ setView }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedMood, setSelectedMood] = useState('Calm');
  const [pastEntries, setPastEntries] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const moods = [
    { name: 'Radiant', emoji: '☀️' },
    { name: 'Daily Joy', emoji: '😊' },
    { name: 'Positive', emoji: '✨' },
    { name: 'Anxious', emoji: '😟' },
    { name: 'Stressed', emoji: '😣' },
    { name: 'Calm', emoji: '🌿' },
    { name: 'Neutral', emoji: '😐' },
    { name: 'Sad', emoji: '😢' },
    { name: 'Overwhelmed', emoji: '🌪️' }
  ];

  const prompts = [
    "What is on your mind?",
    "What are you grateful for today?",
    "What made you feel good today?",
    "What would you like to let go of?"
  ];

  // Current formatted timestamp
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  useEffect(() => {
    api.getJournals().then(entries => {
      if (entries) setPastEntries(entries);
    }).catch(() => {});
  }, []);

  const handleInsertPrompt = (promptText) => {
    setContent(prev => {
      const prefix = prev.trim() ? prev + '\n\n' : '';
      return `${prefix}Q: ${promptText}\nA: `;
    });
  };

  const handleSave = async () => {
    if (!content.trim() && !title.trim()) return;
    setIsSaving(true);

    try {
      const newEntry = await api.createJournal({
        title: title || 'Journal Entry',
        content,
        moodTag: selectedMood
      });

      if (newEntry && newEntry.entry) {
        setPastEntries(prev => [newEntry.entry, ...prev]);
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);

      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#E77A57', '#86C59C']
      });
    } catch (err) {
      console.warn('Save journal error:', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      
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

      {/* Main Journal Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8DD] shadow-sm mb-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622]">
            Daily Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#A89F93] mt-1 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Mood Selector Row */}
        <div className="mb-6">
          <p className="text-xs text-[#786F66] font-semibold mb-2">Tag your current state:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {moods.map((m) => {
              const isSelected = selectedMood === m.name;
              return (
                <button
                  key={m.name}
                  onClick={() => setSelectedMood(m.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#E77A57] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#786F66] border border-[#EFE8DD] hover:bg-[#FAF4EB]'
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Title */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)..."
            className="w-full text-base sm:text-lg font-bold text-[#2C2622] placeholder-[#C2B8AA] border-b border-[#F0EAE0] pb-2 focus:outline-none focus:border-[#E77A57]"
          />
        </div>

        {/* Rich writing textarea */}
        <div className="mb-6">
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="w-full bg-[#FAF8F5] border border-[#EFE8DD] rounded-2xl p-4 text-sm sm:text-base text-[#2C2622] placeholder-[#A89F93] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30 focus:border-[#E77A57] transition-all"
          />
        </div>

        {/* Journal Prompts */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FAF4EB] border border-[#EFE8DD]">
          <p className="text-xs font-bold text-[#786F66] uppercase tracking-wider mb-2.5">
            Journal prompts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleInsertPrompt(p)}
                className="text-left text-xs text-[#2C2622] bg-white border border-[#EFE8DD] hover:border-[#E77A57] hover:bg-[#FAF8F5] p-2.5 rounded-xl transition-all flex items-center justify-between group"
              >
                <span>{p}</span>
                <Plus className="w-3.5 h-3.5 text-[#A89F93] group-hover:text-[#E77A57] flex-shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {isSaved && (
            <span className="text-xs font-semibold text-[#3F8856] flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Entry saved securely to your journal.
            </span>
          )}
          {!isSaved && <div />}

          <button
            onClick={handleSave}
            disabled={isSaving || (!content.trim() && !title.trim())}
            className="px-6 py-2.5 rounded-2xl bg-[#E77A57] hover:bg-[#D96946] text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-40"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Entry'}</span>
          </button>
        </div>

      </div>

      {/* Past Entries */}
      {pastEntries.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#2C2622] px-1">Past Reflections</h3>
          <div className="space-y-3">
            {pastEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-4 border border-[#EFE8DD] shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-[#2C2622]">{entry.title}</h4>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF4EB] text-[#786F66]">
                    {entry.moodTag}
                  </span>
                </div>
                <p className="text-xs text-[#786F66] line-clamp-3 leading-relaxed whitespace-pre-line">
                  {entry.content}
                </p>
                <p className="text-[10px] text-[#A89F93] mt-2">
                  {new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
