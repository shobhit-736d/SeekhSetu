import { UserProfile, AuthResponse, AdminUserSummary, AdminStats } from '../types/auth';

const TOKEN_KEY = 'seekhsetu_jwt_token';
export const LIVE_BACKEND_URL = 'https://seekhsetu.onrender.com/api';

export class ApiService {
  public static getBaseUrl(): string {
    const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
    if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
      const trimmed = envUrl.trim().replace(/\/+$/, '');
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
          return trimmed;
        }
        return LIVE_BACKEND_URL;
      }
      return trimmed;
    }

    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return '/api';
      }
    }

    return LIVE_BACKEND_URL;
  }

  private static get baseUrl(): string {
    return this.getBaseUrl();
  }

  public static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public static setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public static removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  private static getHeaders(includeContentType = true): HeadersInit {
    const headers: Record<string, string> = {};
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  public static async isServerOnline(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }

  // ==========================================
  // AUTHENTICATION APIs
  // ==========================================
  public static async register(payload: { name: string; email: string; password: string; role?: 'student' | 'admin' }): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  public static async login(payload: { email: string; password: string }): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  public static async googleAuth(payload: { email: string; name: string; googleId?: string; avatar?: string }): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/auth/google-auth`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Google authentication failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  public static async requestPasswordReset(email: string): Promise<{ message: string; resetToken?: string }> {
    const res = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Password reset request failed');
    return data;
  }

  public static async resetPassword(payload: { token: string; newPassword: string }): Promise<{ message: string }> {
    const res = await fetch(`${this.baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Password reset failed');
    return data;
  }

  public static async getMe(): Promise<UserProfile> {
    const res = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch user profile');
    return data;
  }

  public static async updateProfile(payload: { name?: string; avatar?: string; theme?: 'dark' | 'light'; dailyGoalMinutes?: number }): Promise<{ message: string; user: UserProfile }> {
    const res = await fetch(`${this.baseUrl}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Profile update failed');
    return data;
  }

  public static async changePassword(payload: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    const res = await fetch(`${this.baseUrl}/auth/change-password`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Password change failed');
    return data;
  }

  // ==========================================
  // PROGRESS & ROADMAP APIs (ISOLATED)
  // ==========================================
  public static async getProgress(): Promise<any> {
    const res = await fetch(`${this.baseUrl}/progress`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch user progress');
    return data;
  }

  public static async updateProgress(payload: any): Promise<any> {
    const res = await fetch(`${this.baseUrl}/progress`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update progress');
    return data;
  }

  public static async resetProgress(): Promise<any> {
    const res = await fetch(`${this.baseUrl}/progress/reset`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to reset progress');
    return data;
  }

  // ==========================================
  // CODING ARENA APIs (ISOLATED)
  // ==========================================
  public static async runCode(payload: {
    questionId: string;
    code: string;
    language: string;
    isSubmission: boolean;
  }) {
    const res = await fetch(`${this.baseUrl}/coding/run`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Code execution API failed');
    return data;
  }

  public static async submitCode(payload: any) {
    const res = await fetch(`${this.baseUrl}/coding/submit`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Submission API failed');
    return data;
  }

  public static async getSubmissions(questionId?: string) {
    const url = questionId
      ? `${this.baseUrl}/coding/submissions?questionId=${encodeURIComponent(questionId)}`
      : `${this.baseUrl}/coding/submissions`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch submissions');
    return data;
  }

  public static async getSubmissionById(id: string) {
    const res = await fetch(`${this.baseUrl}/coding/submissions/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch submission');
    return data;
  }

  // ==========================================
  // APTITUDE APIs (ISOLATED)
  // ==========================================
  public static async submitAptitudeAttempt(payload: any) {
    const res = await fetch(`${this.baseUrl}/aptitude/attempts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Aptitude submission API failed');
    return data;
  }

  public static async getAptitudeAttempts() {
    const res = await fetch(`${this.baseUrl}/aptitude/attempts`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch aptitude history');
    return data;
  }

  // ==========================================
  // RESUME STUDIO APIs (ISOLATED)
  // ==========================================
  public static async uploadResume(file: File, jobDescription?: string) {
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) formData.append('jobDescription', jobDescription);

    const headers: Record<string, string> = {};
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}/resume/upload`, {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Resume upload API failed');
    return data;
  }

  public static async getResumeDocuments() {
    const res = await fetch(`${this.baseUrl}/resume/documents`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch resume documents');
    return data;
  }

  public static async getResumeDocumentById(id: string) {
    const res = await fetch(`${this.baseUrl}/resume/documents/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch resume');
    return data;
  }

  public static async deleteResumeDocument(id: string) {
    const res = await fetch(`${this.baseUrl}/resume/documents/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete resume');
    return data;
  }

  public static async saveResumeProfile(profile: any) {
    const res = await fetch(`${this.baseUrl}/resume/profile`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ profile })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save resume profile');
    return data;
  }

  public static async getResumeProfile() {
    const res = await fetch(`${this.baseUrl}/resume/profile`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get resume profile');
    return data;
  }

  // ==========================================
  // COMMUNICATION APIs (ISOLATED)
  // ==========================================
  public static async saveCommunicationSession(payload: any) {
    const res = await fetch(`${this.baseUrl}/communication/sessions`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save communication session');
    return data;
  }

  public static async getCommunicationSessions() {
    const res = await fetch(`${this.baseUrl}/communication/sessions`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch communication sessions');
    return data;
  }

  // ==========================================
  // AI ASSISTANT APIs (ISOLATED)
  // ==========================================
  public static async queryAi(payload: { prompt: string; history: any[]; context: any }) {
    const res = await fetch(`${this.baseUrl}/ai/chat`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'AI chat API failed');
    return data;
  }

  public static async getAiConversations() {
    const res = await fetch(`${this.baseUrl}/ai/conversations`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch AI chat history');
    return data;
  }

  public static async clearAiConversations() {
    const res = await fetch(`${this.baseUrl}/ai/conversations`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to clear AI chat history');
    return data;
  }

  // ==========================================
  // ADMIN APIs (ROLE-PROTECTED)
  // ==========================================
  public static async getAdminUsers(): Promise<AdminUserSummary[]> {
    const res = await fetch(`${this.baseUrl}/admin/users`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch admin users');
    return data;
  }

  public static async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${this.baseUrl}/admin/stats`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch admin stats');
    return data;
  }

  public static async updateUserRole(userId: string, role: 'student' | 'admin'): Promise<any> {
    const res = await fetch(`${this.baseUrl}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update user role');
    return data;
  }
}
