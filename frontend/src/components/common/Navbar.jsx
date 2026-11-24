import React, { useState } from 'react';
import LotusLogo from './LotusLogo';
import { Search, ChevronDown, User, LogOut, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ currentView, setView, onOpenSos, searchQuery, setSearchQuery }) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'tools', label: 'Wellness Tools' },
    { id: 'resources', label: 'Resources' },
    { id: 'support', label: 'Support' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF4EB]/95 backdrop-blur-md border-b border-[#EFE8DD] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <LotusLogo className="w-9 h-9 transition-transform group-hover:scale-105 duration-300" />
          <span className="font-bold text-2xl tracking-tight text-[#2C2622]">
            MindEase
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#2C2622] font-semibold bg-[#EFE8DD]/70'
                    : 'text-[#786F66] hover:text-[#2C2622] hover:bg-[#F2ECE1]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs lg:max-w-md hidden sm:block relative">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A89F93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'resources' && currentView !== 'tools' && e.target.value.trim() !== '') {
                  setView('tools');
                }
              }}
              placeholder="Search wellness tools..."
              className="w-full bg-[#FFFFFF] border border-[#EFE8DD] rounded-full pl-10 pr-4 py-2 text-sm text-[#2C2622] placeholder-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30 focus:border-[#E77A57] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Right Section: User Dropdown & SOS Help */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EFE8DD] shadow-sm hover:border-[#DFCFC0] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#F5D8CE] text-[#E77A57] flex items-center justify-center text-xs font-semibold">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-[#2C2622]">
                {user?.name || 'User'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#786F66]" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-[#EFE8DD] py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-[#F5EFE6]">
                  <p className="text-xs text-[#786F66]">Signed in as</p>
                  <p className="text-sm font-semibold text-[#2C2622] truncate">{user?.email || 'user@mindease.com'}</p>
                </div>
                <button
                  onClick={() => { setView('support'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-[#2C2622] hover:bg-[#FAF4EB] flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-[#E77A57]" />
                  Family Support Circle
                </button>
                <button
                  onClick={() => { logout(); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-[#E77A57] hover:bg-[#FAF4EB] flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* SOS Emergency Help Button */}
          <button
            onClick={onOpenSos}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#DC7254] hover:bg-[#C96043] text-white text-sm font-semibold shadow-sm transition-all transform active:scale-95"
          >
            <span>+</span>
            <span>SOS Help</span>
          </button>
        </div>

      </div>
    </header>
  );
}
