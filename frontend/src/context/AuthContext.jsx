import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mindease_token');
    const savedUser = localStorage.getItem('mindease_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('mindease_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    localStorage.setItem('mindease_token', res.token);
    localStorage.setItem('mindease_user', JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const loginAsGuest = async () => {
    try {
      const res = await api.loginGuest();
      localStorage.setItem('mindease_token', res.token);
      localStorage.setItem('mindease_user', JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    } catch (err) {
      // Offline fallback
      const fallbackGuest = { id: 'usr_default_demo', name: 'User', email: 'guest@mindease.com', isGuest: true };
      localStorage.setItem('mindease_user', JSON.stringify(fallbackGuest));
      setUser(fallbackGuest);
      return fallbackGuest;
    }
  };

  const logout = () => {
    localStorage.removeItem('mindease_token');
    localStorage.removeItem('mindease_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
