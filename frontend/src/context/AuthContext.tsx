"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🧭 Safe client local matrix check without page-push actions
    const storedUser = localStorage.getItem("zeverse_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing auth tokens:", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("zeverse_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zeverse_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}