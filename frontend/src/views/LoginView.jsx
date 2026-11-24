import React, { useState } from 'react';
import LotusLogo from '../components/common/LotusLogo';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, AlertCircle } from 'lucide-react';

export default function LoginView({ onLoginSuccess }) {
  const { login, loginAsGuest } = useAuth();
  const [email, setEmail] = useState('user@mindease.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = async () => {
    setIsLoading(true);
    try {
      await loginAsGuest();
      if (onLoginSuccess) onLoginSuccess();
    } catch (e) {
      if (onLoginSuccess) onLoginSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4EB] flex flex-col items-center justify-center p-4 relative">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 w-96 h-96 bg-[#E77A57]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-[#EFE8DD] shadow-[0_4px_30px_rgba(44,38,34,0.06)] relative z-10 animate-fade-in text-center">
        
        {/* Lotus Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF4EB] flex items-center justify-center p-2.5">
            <LotusLogo className="w-12 h-12" />
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-2xl font-bold text-[#2C2622] mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-[#786F66] mb-6">
          Sign in to your MindEase account
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-[#FCF4F1] border border-[#DC7254]/30 text-[#A84227] text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DD] text-sm text-[#2C2622] placeholder-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30 focus:border-[#E77A57] transition-all"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DD] text-sm text-[#2C2622] placeholder-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#E77A57]/30 focus:border-[#E77A57] transition-all"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-[#A89F93] hover:text-[#E77A57] transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-[#E77A57] hover:bg-[#D96946] text-white text-sm font-bold shadow-sm transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>

          {/* Continue as Guest */}
          <button
            type="button"
            onClick={handleGuest}
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-[#FAF4EB] hover:bg-[#F2ECE1] text-[#786F66] hover:text-[#2C2622] text-sm font-semibold border border-[#EFE8DD] transition-all"
          >
            Continue as Guest
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-[#F5EFE6]">
          <p className="text-xs text-[#786F66]">
            Don't have an account?{' '}
            <button
              onClick={handleGuest}
              className="text-[#E77A57] font-semibold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>

      </div>

      {/* Floating Bottom-Right Help Button */}
      <button
        onClick={() => alert('MindEase Help & Guide:\n- Sign in or click "Continue as Guest".\n- Explore Guided Breathing, Daily Journal, Mood Tracking, and your AI Companion MindMate.')}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white border border-[#EFE8DD] shadow-md text-[#2C2622] flex items-center justify-center hover:bg-[#FAF4EB] transition-all z-20"
      >
        <HelpCircle className="w-5 h-5 text-[#786F66]" />
      </button>

    </div>
  );
}
