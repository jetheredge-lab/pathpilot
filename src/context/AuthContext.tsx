import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthUser, apiMe, apiLogin, apiSignup, apiLogout, apiDeleteAccount } from '../api/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session on load.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await apiMe();
      if (!cancelled) {
        setUser(me);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user: u, error } = await apiLogin(email, password);
    if (u) setUser(u);
    return { error };
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    const { user: u, error } = await apiSignup(email, password);
    if (u) setUser(u);
    return { error };
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    const ok = await apiDeleteAccount();
    if (ok) setUser(null);
    return ok;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
