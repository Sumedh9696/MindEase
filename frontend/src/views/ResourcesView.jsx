import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Bookmark, Clock, X, BookOpen, Share2 } from 'lucide-react';
import { api } from '../services/api';

export default function ResourcesView({ setView, initialArticleId }) {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([
    'All', 'Exam Stress', 'Sleep', 'Anxiety Support', 'Emotional Wellbeing', 
    'Mindfulness', 'Self-Care', 'Relationships', 'Productivity'
  ]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchResources(activeCategory, search);
  }, [activeCategory]);

  const fetchResources = async (cat, q) => {
    try {
      const data = await api.getResources(cat, q);
      if (data) {
        setResources(data);
        if (initialArticleId) {
          const match = data.find(d => d.id === initialArticleId);
          if (match) setSelectedArticle(match);
        }
      }
    } catch (e) {
      console.warn('Could not load resources:', e.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResources(activeCategory, search);
  };

  const handleToggleBookmark = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await api.toggleBookmark(id);
      setResources(prev =>
        prev.map(r => r.id === id ? { ...r, isBookmarked: res.bookmarked } : r)
      );
      if (selectedArticle && selectedArticle.id === id) {
        setSelectedArticle(prev => ({ ...prev, isBookmarked: res.bookmarked }));
      }
    } catch (err) {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      
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

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2622]">
          Wellness Resources
        </h1>
        <p className="text-sm text-[#786F66] mt-1">
          Evidence-based strategies, mindfulness guides, and emotional tools.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative mb-6">
        <Search className="w-4 h-4 text-[#A89F93] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full bg-white border border-[#EFE8DD] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#2C2622] placeholder-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30 focus:border-[#E77A57] shadow-sm transition-all"
        />
      </form>

      {/* Categories Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#E77A57] text-white shadow-xs'
                  : 'bg-white text-[#786F66] border border-[#EFE8DD] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {resources.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm hover:border-[#D6CAB8] hover:shadow-md transition-all cursor-pointer group flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#A66717]">
                  {article.category}
                </span>
                <span className="text-xs text-[#A89F93] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#2C2622] group-hover:text-[#E77A57] transition-colors mb-1">
                {article.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#786F66] leading-relaxed">
                {article.summary}
              </p>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => handleToggleBookmark(e, article.id)}
              className="p-2 rounded-full text-[#A89F93] hover:text-[#E77A57] hover:bg-[#FAF4EB] transition-colors"
            >
              <Bookmark className={`w-5 h-5 ${article.isBookmarked ? 'fill-[#E77A57] text-[#E77A57]' : ''}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EFE8DD] relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#786F66] hover:bg-[#FAF4EB] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF0E6] text-[#A66717]">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-[#A89F93] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#2C2622] mb-2">
              {selectedArticle.title}
            </h2>

            <p className="text-xs text-[#A89F93] mb-6 font-medium">
              By {selectedArticle.author || 'MindEase Clinical Team'}
            </p>

            <div className="prose text-sm sm:text-base text-[#2C2622] leading-relaxed border-t border-[#F5EFE6] pt-6 mb-6">
              <p className="mb-4">{selectedArticle.summary}</p>
              <p className="whitespace-pre-line text-[#5C5549]">{selectedArticle.content}</p>
            </div>

            <div className="flex items-center justify-between border-t border-[#F5EFE6] pt-4">
              <button
                onClick={(e) => handleToggleBookmark(e, selectedArticle.id)}
                className="flex items-center gap-2 text-xs font-semibold text-[#786F66] hover:text-[#E77A57]"
              >
                <Bookmark className={`w-4 h-4 ${selectedArticle.isBookmarked ? 'fill-[#E77A57] text-[#E77A57]' : ''}`} />
                <span>{selectedArticle.isBookmarked ? 'Saved to Bookmarks' : 'Bookmark for Later'}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-full bg-[#E77A57] hover:bg-[#D96946] text-white text-xs font-bold"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
