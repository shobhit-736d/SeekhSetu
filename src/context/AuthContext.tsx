import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types/auth';
import { ApiService } from '../services/apiService';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  role: 'student' | 'admin' | null;

  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'student' | 'admin') => Promise<void>;
  registerRequest: (name: string, email: string, password: string) => Promise<{ email: string; expiresInMinutes: number; message: string }>;
  verifyRegister: (email: string, code: string) => Promise<void>;
  loginRequest: (email: string, password: string) => Promise<{ email: string; expiresInMinutes: number; message: string; requiresOtp: boolean }>;
  verifyLogin: (email: string, code: string) => Promise<void>;
  resendCode: (email: string, type: 'register' | 'login' | 'reset') => Promise<string>;
  loginWithGoogle: (email: string, name: string, googleId?: string, avatar?: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<string>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (payload: { name?: string; avatar?: string; theme?: 'dark' | 'light'; dailyGoalMinutes?: number }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => ApiService.getToken());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Modal UI state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Initialize and verify existing token
  useEffect(() => {
    const initAuth = async () => {
      const existingToken = ApiService.getToken();
      if (!existingToken) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await ApiService.getMe();
        setUser(profile);
        setToken(existingToken);
      } catch (err) {
        console.warn('Session verification failed, logging out:', err);
        ApiService.removeToken();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const registerRequest = useCallback(async (name: string, email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.registerRequest({ name, email, password });
      return res;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const verifyRegister = useCallback(async (email: string, code: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.verifyRegister({ email, code });
      setUser(res.user);
      setToken(res.token);
      setIsAuthModalOpen(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const loginRequest = useCallback(async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.loginRequest({ email, password });
      return res;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const verifyLogin = useCallback(async (email: string, code: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.verifyLogin({ email, code });
      setUser(res.user);
      setToken(res.token);
      setIsAuthModalOpen(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const resendCode = useCallback(async (email: string, type: 'register' | 'login' | 'reset') => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.resendCode({ email, type });
      return res.message;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.login({ email, password });
      if ((res as any).token) {
        setUser((res as any).user);
        setToken((res as any).token);
        setIsAuthModalOpen(false);
      }
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.register({ name, email, password, role: 'student' });
      if ((res as any).token) {
        setUser((res as any).user);
        setToken((res as any).token);
        setIsAuthModalOpen(false);
      }
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async (email: string, name: string, googleId?: string, avatar?: string) => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.googleAuth({ email, name, googleId, avatar });
      setUser(res.user);
      setToken(res.token);
      setIsAuthModalOpen(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(() => {
    ApiService.removeToken();
    setUser(null);
    setToken(null);
    setIsAdminModalOpen(false);
    setIsProfileModalOpen(false);
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    const res = await ApiService.requestPasswordReset(email);
    return res.message;
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    await ApiService.resetPassword({ token, newPassword });
  }, []);

  const updateProfile = useCallback(async (payload: { name?: string; avatar?: string; theme?: 'dark' | 'light'; dailyGoalMinutes?: number }) => {
    const res = await ApiService.updateProfile(payload);
    setUser(res.user);
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    await ApiService.changePassword({ currentPassword, newPassword });
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    isAuthenticating,
    role: user?.role || null,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    isAdminModalOpen,
    setIsAdminModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    login,
    register,
    registerRequest,
    verifyRegister,
    loginRequest,
    verifyLogin,
    resendCode,
    loginWithGoogle,
    logout,
    requestPasswordReset,
    resetPassword,
    updateProfile,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
