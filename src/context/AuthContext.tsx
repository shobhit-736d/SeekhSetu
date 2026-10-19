import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, AuthResponse } from '../types/auth';
import { ApiService } from '../services/apiService';
import { studentProfileService } from '../services/studentProfileService';

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
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Actions
  loginWithGoogle: (idToken: string, confirmLink?: boolean) => Promise<AuthResponse>;
  logout: () => void;
  updateProfile: (payload: { name?: string; avatar?: string; theme?: 'dark' | 'light'; dailyGoalMinutes?: number }) => Promise<void>;

  // Legacy stubs kept for interface safety
  login?: (email: string, password: string) => Promise<void>;
  register?: (name: string, email: string, password: string, role?: 'student' | 'admin') => Promise<void>;
  registerRequest?: (name: string, email: string, password: string) => Promise<{ email: string; expiresInMinutes: number; message: string }>;
  verifyRegister?: (email: string, code: string) => Promise<void>;
  loginRequest?: (email: string, password: string) => Promise<{ email: string; expiresInMinutes: number; message: string; requiresOtp: boolean }>;
  verifyLogin?: (email: string, code: string) => Promise<void>;
  resendCode?: (email: string, type: 'register' | 'login' | 'reset') => Promise<string>;
  requestPasswordReset?: (email: string) => Promise<string>;
  resetPassword?: (token: string, newPassword: string) => Promise<void>;
  changePassword?: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => ApiService.getToken());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Modal UI state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
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
        studentProfileService.syncFromDatabase(profile);
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

  // Exclusive Google Sign-In / Register
  const loginWithGoogle = useCallback(async (idToken: string, confirmLink?: boolean): Promise<AuthResponse> => {
    setIsAuthenticating(true);
    try {
      const res = await ApiService.googleAuth({ idToken, confirmLink });
      if (res.user && res.token) {
        studentProfileService.syncFromDatabase(res.user);
        setUser(res.user);
        setToken(res.token);
        setIsAuthModalOpen(false);
      }
      return res;
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

  const updateProfile = useCallback(async (payload: { name?: string; avatar?: string; theme?: 'dark' | 'light'; dailyGoalMinutes?: number }) => {
    const res = await ApiService.updateProfile(payload);
    studentProfileService.syncFromDatabase(res.user);
    setUser(res.user);
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
    loginWithGoogle,
    logout,
    updateProfile
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
