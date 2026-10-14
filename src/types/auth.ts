export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  streakDays?: number;
  preferences?: {
    theme: 'dark' | 'light';
    dailyGoalMinutes: number;
  };
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: UserProfile;
  requiresLinkingConfirmation?: boolean;
  email?: string;
  name?: string;
  isNewUser?: boolean;
  linked?: boolean;
}

export interface AdminUserSummary {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  streakDays: number;
  lastActiveDate?: string;
  createdAt: string;
  metrics: {
    submissionsCount: number;
    attemptsCount: number;
    resumesCount: number;
  };
}

export interface AdminStats {
  totalUsers: number;
  totalSubmissions: number;
  totalAttempts: number;
  totalResumes: number;
  serverTime: string;
}
