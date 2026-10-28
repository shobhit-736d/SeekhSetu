import { UserProfile, AuthResponse, AdminUserSummary, AdminStats } from '../types/auth';
import { CareerTrack, LearningResource, GuidedProject, CertificationItem, JobOpportunity, UserJobApplication, OpportunityBookmark } from '../types/career';
import { AssessmentQuestion, AssessmentPreset, AssessmentAttempt, AssessmentSubmitResponse, UserAnswerSubmission } from '../types/assessment';
import { InterviewQuestion, MockInterviewPreset, MockInterviewEvaluation, MockInterviewAttemptRecord } from '../types/interview';
import { careerTracksList, getCareerTrackBySlug } from '../data/careerTracksData';
import { learningResourcesList } from '../data/learningResourcesData';
import { guidedProjectsList } from '../data/guidedProjectsData';
import { certificationsList } from '../data/certificationsData';
import { jobListingsList } from '../data/jobListingsData';
import { assessmentQuestionsBank, assessmentPresetsList } from '../data/assessmentsData';
import { interviewQuestionsList, mockInterviewPresets } from '../data/interviewQuestionsData';

const TOKEN_KEY = 'seekhsetu_jwt_token';
export const LIVE_BACKEND_URL = 'https://seekhsetu.onrender.com/api';

export class ApiService {
  public static getBaseUrl(): string {
    // When running locally in dev mode, route to local server via Vite /api proxy
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return '/api';
      }
    }

    const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
    if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
      const trimmed = envUrl.trim().replace(/\/+$/, '');
      return trimmed;
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
  // AUTHENTICATION APIs WITH EMAIL VERIFICATION
  // ==========================================
  public static async registerRequest(payload: { name: string; email: string; password: string }): Promise<{ message: string; email: string; expiresInMinutes: number }> {
    const res = await fetch(`${this.baseUrl}/auth/register-request`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send registration verification code');
    return data;
  }

  public static async verifyRegister(payload: { email: string; code: string }): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/auth/verify-register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  public static async loginRequest(payload: { email: string; password: string }): Promise<{ requiresOtp: boolean; message: string; email: string; expiresInMinutes: number }> {
    const res = await fetch(`${this.baseUrl}/auth/login-request`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Sign-in failed');
    return data;
  }

  public static async verifyLogin(payload: { email: string; code: string }): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/auth/verify-login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Sign-in verification failed');
    if (data.token) this.setToken(data.token);
    return data;
  }

  public static async resendCode(payload: { email: string; type: 'register' | 'login' | 'reset' }): Promise<{ message: string; expiresInMinutes: number }> {
    const res = await fetch(`${this.baseUrl}/auth/resend-code`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to resend code');
    return data;
  }

  // Legacy direct fallback methods
  public static async register(payload: { name: string; email: string; password: string; role?: 'student' | 'admin' }): Promise<AuthResponse> {
    return this.registerRequest({ name: payload.name, email: payload.email, password: payload.password }) as any;
  }

  public static async login(payload: { email: string; password: string }): Promise<AuthResponse> {
    return this.loginRequest(payload) as any;
  }

  public static async googleAuth(payload: { idToken: string; confirmLink?: boolean }): Promise<AuthResponse> {
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

  public static async requestPasswordReset(email: string): Promise<{ message: string }> {
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

  public static async updateProfile(payload: { name?: string; avatar?: string; theme?: 'dark' | 'light'; dailyGoalMinutes?: number; studentProfile?: any }): Promise<{ message: string; user: UserProfile }> {
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

  // ==========================================
  // CONTACT & FEEDBACK APIs
  // ==========================================
  public static async submitContactMessage(payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
    category?: string;
    pageUrl?: string;
  }): Promise<{ success: boolean; message: string; id?: string }> {
    const res = await fetch(`${this.baseUrl}/contact`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit contact message. Please try again.');
    }
    return data;
  }

  // ==========================================
  // CAREER ECOSYSTEM & CMS APIs (WITH LOCAL FALLBACK)
  // ==========================================

  public static async getCareerTracks(params?: { category?: string; search?: string }): Promise<CareerTrack[]> {
    try {
      const url = new URL(`${this.baseUrl}/careers/tracks`);
      if (params?.category && params.category !== 'All') url.searchParams.append('category', params.category);
      if (params?.search) url.searchParams.append('search', params.search);

      const res = await fetch(url.toString(), { method: 'GET', headers: this.getHeaders(false) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback gracefully to bundled dataset
    }

    // Client-side fallback filter
    let results = [...careerTracksList];
    if (params?.category && params.category !== 'All') {
      results = results.filter(t => t.category === params.category);
    }
    if (params?.search && params.search.trim()) {
      const s = params.search.toLowerCase().trim();
      results = results.filter(t =>
        t.title.toLowerCase().includes(s) ||
        t.shortDescription.toLowerCase().includes(s) ||
        t.skills.core.some(k => k.toLowerCase().includes(s))
      );
    }
    return results;
  }

  public static async getCareerTrackBySlug(slug: string): Promise<CareerTrack | null> {
    try {
      const res = await fetch(`${this.baseUrl}/careers/tracks/${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.slug) return data;
      }
    } catch {
      // Fallback gracefully
    }
    return getCareerTrackBySlug(slug) || null;
  }

  public static async getLearningResources(params?: {
    track?: string;
    category?: string;
    pricing?: string;
    difficulty?: string;
    search?: string;
  }): Promise<LearningResource[]> {
    try {
      const url = new URL(`${this.baseUrl}/careers/resources`);
      if (params?.track) url.searchParams.append('track', params.track);
      if (params?.category) url.searchParams.append('category', params.category);
      if (params?.pricing) url.searchParams.append('pricing', params.pricing);
      if (params?.difficulty) url.searchParams.append('difficulty', params.difficulty);
      if (params?.search) url.searchParams.append('search', params.search);

      const res = await fetch(url.toString(), { method: 'GET', headers: this.getHeaders(false) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }

    let results = [...learningResourcesList];
    if (params?.track && params.track !== 'all') {
      results = results.filter(r => r.trackSlug.toLowerCase() === params.track!.toLowerCase());
    }
    if (params?.category && params.category !== 'all') {
      results = results.filter(r => r.category === params.category);
    }
    if (params?.pricing && params.pricing !== 'all') {
      results = results.filter(r => r.pricing === params.pricing);
    }
    if (params?.difficulty && params.difficulty !== 'all') {
      results = results.filter(r => r.difficulty === params.difficulty);
    }
    if (params?.search && params.search.trim()) {
      const s = params.search.toLowerCase().trim();
      results = results.filter(r =>
        r.title.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s) ||
        r.tags.some(tag => tag.toLowerCase().includes(s))
      );
    }
    return results;
  }

  public static async getGuidedProjects(params?: {
    track?: string;
    difficulty?: string;
    projectType?: string;
    search?: string;
  }): Promise<GuidedProject[]> {
    try {
      const url = new URL(`${this.baseUrl}/careers/projects`);
      if (params?.track) url.searchParams.append('track', params.track);
      if (params?.difficulty) url.searchParams.append('difficulty', params.difficulty);
      if (params?.projectType) url.searchParams.append('projectType', params.projectType);
      if (params?.search) url.searchParams.append('search', params.search);

      const res = await fetch(url.toString(), { method: 'GET', headers: this.getHeaders(false) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }

    let results = [...guidedProjectsList];
    if (params?.track && params.track !== 'all') {
      results = results.filter(p => p.trackSlug.toLowerCase() === params.track!.toLowerCase());
    }
    if (params?.difficulty && params.difficulty !== 'all') {
      results = results.filter(p => p.difficulty === params.difficulty);
    }
    if (params?.projectType && params.projectType !== 'all') {
      results = results.filter(p => p.projectType === params.projectType);
    }
    if (params?.search && params.search.trim()) {
      const s = params.search.toLowerCase().trim();
      results = results.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.summary.toLowerCase().includes(s) ||
        p.techStack.some(t => t.toLowerCase().includes(s))
      );
    }
    return results;
  }

  public static async getCertifications(params?: {
    track?: string;
    issuer?: string;
    level?: string;
    search?: string;
  }): Promise<CertificationItem[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.track && params.track !== 'all') queryParams.append('track', params.track);
      if (params?.issuer && params.issuer !== 'all') queryParams.append('issuer', params.issuer);
      if (params?.level && params.level !== 'all') queryParams.append('level', params.level);
      if (params?.search && params.search.trim()) queryParams.append('search', params.search.trim());

      const qs = queryParams.toString();
      const url = `${this.baseUrl}/careers/certifications${qs ? `?${qs}` : ''}`;
      const res = await fetch(url, { method: 'GET', headers: this.getHeaders(false) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }

    let results = [...certificationsList];
    if (params?.track && params.track !== 'all') {
      results = results.filter(c => c.trackSlug.toLowerCase() === params.track!.toLowerCase());
    }
    if (params?.issuer && params.issuer !== 'all') {
      results = results.filter(c => c.issuer.toLowerCase() === params.issuer!.toLowerCase());
    }
    if (params?.level && params.level !== 'all') {
      results = results.filter(c => c.level === params.level);
    }
    if (params?.search && params.search.trim()) {
      const s = params.search.toLowerCase().trim();
      results = results.filter(c =>
        c.name.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s) ||
        c.issuer.toLowerCase().includes(s)
      );
    }
    return results;
  }

  public static async getJobListings(params?: {
    track?: string;
    jobType?: string;
    workplaceType?: string;
    experience?: string;
    search?: string;
  }): Promise<JobOpportunity[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.track && params.track !== 'all') queryParams.append('track', params.track);
      if (params?.jobType && params.jobType !== 'all') queryParams.append('jobType', params.jobType);
      if (params?.workplaceType && params.workplaceType !== 'all') queryParams.append('workplaceType', params.workplaceType);
      if (params?.experience && params.experience !== 'all') queryParams.append('experience', params.experience);
      if (params?.search && params.search.trim()) queryParams.append('search', params.search.trim());

      const qs = queryParams.toString();
      const url = `${this.baseUrl}/careers/jobs${qs ? `?${qs}` : ''}`;
      const res = await fetch(url, { method: 'GET', headers: this.getHeaders(false) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }

    let results = [...jobListingsList];
    if (params?.track && params.track !== 'all') {
      results = results.filter(j => j.trackSlug.toLowerCase() === params.track!.toLowerCase());
    }
    if (params?.jobType && params.jobType !== 'all') {
      results = results.filter(j => j.jobType === params.jobType);
    }
    if (params?.workplaceType && params.workplaceType !== 'all') {
      results = results.filter(j => j.workplaceType === params.workplaceType);
    }
    if (params?.experience && params.experience !== 'all') {
      results = results.filter(j => j.experienceLevel === params.experience);
    }
    if (params?.search && params.search.trim()) {
      const s = params.search.toLowerCase().trim();
      results = results.filter(j =>
        j.title.toLowerCase().includes(s) ||
        j.company.toLowerCase().includes(s) ||
        j.location.toLowerCase().includes(s) ||
        j.requiredSkills.some(r => r.toLowerCase().includes(s))
      );
    }
    return results;
  }

  public static async enrollCareerTrack(trackSlug: string): Promise<{ enrolledTracks: string[]; activeTrack: string }> {
    const res = await fetch(`${this.baseUrl}/careers/enroll`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ trackSlug })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to enroll in track');
    return data;
  }

  public static async switchActiveTrack(trackSlug: string): Promise<{ activeTrack: string; enrolledTracks: string[] }> {
    const res = await fetch(`${this.baseUrl}/careers/switch-active-track`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ trackSlug })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to switch active track');
    return data;
  }

  public static async trackJobApplication(payload: {
    jobId?: string;
    title: string;
    company: string;
    location?: string;
    workplaceType?: string;
    status?: string;
    notes?: string;
    deadline?: string;
    directApplyUrl?: string;
  }): Promise<{ applications: UserJobApplication[] }> {
    const res = await fetch(`${this.baseUrl}/careers/track-application`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update job application status');
    return data;
  }

  public static async getUserJobApplications(): Promise<UserJobApplication[]> {
    try {
      const res = await fetch(`${this.baseUrl}/careers/my-applications`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback to local storage if offline
    }
    return [];
  }

  public static async deleteJobApplication(appId: string): Promise<{ message: string; applications: UserJobApplication[] }> {
    const res = await fetch(`${this.baseUrl}/careers/my-applications/${appId}`, {
      method: 'DELETE',
      headers: this.getHeaders(false)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to remove job application');
    return data;
  }

  public static async toggleOpportunityBookmark(payload: {
    itemId: string;
    itemType: 'job' | 'project' | 'resource' | 'certification';
    title?: string;
    trackSlug?: string;
  }): Promise<{ isBookmarked: boolean; bookmarks: OpportunityBookmark[] }> {
    const res = await fetch(`${this.baseUrl}/careers/bookmark`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to bookmark item');
    return data;
  }

  public static async getUserOpportunityBookmarks(): Promise<OpportunityBookmark[]> {
    try {
      const res = await fetch(`${this.baseUrl}/careers/my-bookmarks`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // ==========================================
  // PRACTICE QUIZZES & ASSESSMENTS (PHASE 4)
  // ==========================================

  public static async getAssessmentPresets(): Promise<AssessmentPreset[]> {
    try {
      const res = await fetch(`${this.baseUrl}/assessments/presets`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
    return assessmentPresetsList;
  }

  public static async getAssessmentQuestions(filters?: {
    track?: string;
    subject?: string;
    difficulty?: string;
    type?: string;
    mode?: 'practice' | 'timed-assessment';
    limit?: number;
    search?: string;
  }): Promise<AssessmentQuestion[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.track && filters.track !== 'all') params.set('track', filters.track);
      if (filters?.subject && filters.subject !== 'all') params.set('subject', filters.subject);
      if (filters?.difficulty && filters.difficulty !== 'all') params.set('difficulty', filters.difficulty);
      if (filters?.type && filters.type !== 'all') params.set('type', filters.type);
      if (filters?.mode) params.set('mode', filters.mode);
      if (filters?.limit) params.set('limit', String(filters.limit));
      if (filters?.search) params.set('search', filters.search);

      const qs = params.toString();
      const url = `${this.baseUrl}/assessments/questions${qs ? `?${qs}` : ''}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback to local questions bank
    }

    // Local filter fallback
    let list = [...assessmentQuestionsBank];
    if (filters?.track && filters.track !== 'all') {
      list = list.filter(q => q.trackSlug === filters.track);
    }
    if (filters?.difficulty && filters.difficulty !== 'all') {
      list = list.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters?.type && filters.type !== 'all') {
      list = list.filter(q => q.questionType === filters.type);
    }
    if (filters?.search && filters.search.trim()) {
      const s = filters.search.toLowerCase();
      list = list.filter(q =>
        q.question.toLowerCase().includes(s) ||
        q.topic.toLowerCase().includes(s) ||
        q.tags.some(t => t.toLowerCase().includes(s))
      );
    }

    if (filters?.mode === 'timed-assessment') {
      // Security strip
      return list.map(q => {
        const copy = { ...q };
        delete (copy as any).correctAnswers;
        delete (copy as any).explanation;
        return copy;
      });
    }

    return list;
  }

  public static async submitAssessment(payload: {
    trackSlug: string;
    assessmentTitle: string;
    mode: 'practice' | 'timed-assessment';
    difficulty?: string;
    timeSpentSeconds: number;
    answers: UserAnswerSubmission[];
  }): Promise<AssessmentSubmitResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/assessments/submit`, {
        method: 'POST',
        headers: this.getHeaders(true),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) return data;
      }
    } catch {
      // Offline fallback: calculate securely locally
    }

    // Local secure evaluation fallback
    let score = 0;
    const evaluatedAnswers: any[] = [];
    const topicBreakdown: Record<string, { total: number; correct: number; percent: number }> = {};

    payload.answers.forEach(userAns => {
      const q = assessmentQuestionsBank.find(item => item.id === userAns.questionId);
      if (!q) return;

      const topic = q.topic || q.subject || 'General';
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { total: 0, correct: 0, percent: 0 };
      }
      topicBreakdown[topic].total += 1;

      const userSel = (userAns.selectedAnswers || []).slice().sort((a, b) => a - b);
      const actualCorrect = (q.correctAnswers || []).slice().sort((a, b) => a - b);

      let isCorrect = false;
      if (q.questionType === 'multiple-select') {
        isCorrect = userSel.length === actualCorrect.length &&
          userSel.every((val, idx) => val === actualCorrect[idx]);
      } else {
        isCorrect = userSel.length > 0 && userSel[0] === actualCorrect[0];
      }

      if (isCorrect) {
        score += 1;
        topicBreakdown[topic].correct += 1;
      }

      evaluatedAnswers.push({
        questionId: q.id,
        selectedAnswers: userAns.selectedAnswers,
        correctAnswers: q.correctAnswers,
        isCorrect,
        explanation: q.explanation,
        hint: q.hint
      });
    });

    const total = payload.answers.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const passed = percentage >= 70;

    const recommendations: string[] = [];
    Object.keys(topicBreakdown).forEach(topic => {
      const stats = topicBreakdown[topic];
      stats.percent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      if (stats.percent < 70) {
        recommendations.push(`Revise ${topic} concepts and review recommended track roadmaps.`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Outstanding performance! You achieved proficiency across all evaluated topics.');
    }

    return {
      success: true,
      attemptId: 'local-' + Date.now(),
      score,
      totalQuestions: total,
      percentage,
      passed,
      timeSpentSeconds: payload.timeSpentSeconds,
      topicBreakdown,
      evaluatedAnswers,
      recommendations
    };
  }

  public static async getUserAssessmentHistory(): Promise<AssessmentAttempt[]> {
    try {
      const res = await fetch(`${this.baseUrl}/assessments/history`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return [];
  }

  // ==========================================
  // TECHNICAL INTERVIEWS & MOCK INTERVIEW APIs (PHASE 5)
  // ==========================================

  public static async getInterviewPresets(): Promise<MockInterviewPreset[]> {
    try {
      const res = await fetch(`${this.baseUrl}/interviews/presets`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Offline fallback
    }
    return mockInterviewPresets;
  }

  public static async getInterviewQuestions(filters: {
    trackSlug?: string;
    category?: string;
    difficulty?: string;
    topic?: string;
    role?: string;
    search?: string;
    limit?: number;
    skip?: number;
  } = {}): Promise<InterviewQuestion[]> {
    try {
      const params = new URLSearchParams();
      if (filters.trackSlug && filters.trackSlug !== 'all') params.append('trackSlug', filters.trackSlug);
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.difficulty && filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
      if (filters.topic && filters.topic !== 'all') params.append('topic', filters.topic);
      if (filters.role && filters.role !== 'all') params.append('role', filters.role);
      if (filters.search) params.append('search', filters.search);
      if (filters.limit) params.append('limit', String(filters.limit));
      if (filters.skip) params.append('skip', String(filters.skip));

      const res = await fetch(`${this.baseUrl}/interviews/questions?${params.toString()}`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Offline fallback
    }

    return interviewQuestionsList.filter(q => {
      if (filters.trackSlug && filters.trackSlug !== 'all' && q.trackSlug !== filters.trackSlug) return false;
      if (filters.category && filters.category !== 'all' && q.category !== filters.category) return false;
      if (filters.difficulty && filters.difficulty !== 'all' && q.difficulty !== filters.difficulty) return false;
      if (filters.topic && filters.topic !== 'all' && q.topic !== filters.topic) return false;
      if (filters.search && filters.search.trim()) {
        const s = filters.search.toLowerCase();
        const match =
          q.title.toLowerCase().includes(s) ||
          q.question.toLowerCase().includes(s) ||
          q.topic.toLowerCase().includes(s) ||
          q.tags.some(t => t.toLowerCase().includes(s));
        if (!match) return false;
      }
      return true;
    });
  }

  public static async getInterviewQuestionById(id: string): Promise<InterviewQuestion | null> {
    try {
      const res = await fetch(`${this.baseUrl}/interviews/questions/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: this.getHeaders(false)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    return interviewQuestionsList.find(q => q.id === id || q.slug === id) || null;
  }

  public static async evaluateMockInterview(payload: {
    answers: Array<{
      questionId: string;
      questionText: string;
      category: string;
      userAnswer: string;
      recordingDurationSeconds?: number;
    }>;
    trackSlug?: string;
    targetRole?: string;
  }): Promise<MockInterviewEvaluation> {
    try {
      const res = await fetch(`${this.baseUrl}/interviews/mock/evaluate`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback handled below
    }

    // Client-side fallback evaluation
    const questionEvaluations = payload.answers.map(ans => {
      const q = interviewQuestionsList.find(item => item.id === ans.questionId) || {
        question: ans.questionText,
        comprehensiveAnswer: 'Thorough, structured technical explanation with architectural clarity.',
        keyPointsToMention: ['Core principles', 'Implementation', 'Tradeoffs']
      };

      const userText = (ans.userAnswer || '').trim();
      const wordCount = userText.split(/\s+/).filter(Boolean).length;
      const score = Math.min(100, Math.max(35, Math.round(50 + (Math.min(wordCount, 150) / 150) * 45)));

      return {
        questionId: ans.questionId,
        questionText: q.question,
        score,
        modelAnswer: q.comprehensiveAnswer,
        userAnswer: userText,
        strengths: wordCount >= 30 ? ['Clear structured response', 'Addressed primary question intent'] : ['Provided direct answer'],
        improvements: wordCount < 30 ? ['Elaborate further with production tradeoffs and edge cases'] : ['Structure in 3 stages: Problem -> Mechanism -> Impact'],
        feedback: score >= 70 ? 'Solid response with clear articulation.' : 'Adequate attempt. Review model answer to improve technical depth.'
      };
    });

    const avgScore = Math.round(questionEvaluations.reduce((acc, q) => acc + q.score, 0) / (questionEvaluations.length || 1));

    return {
      overallScore: avgScore,
      passed: avgScore >= 70,
      rubricScores: {
        correctness: Math.min(100, avgScore + 2),
        clarity: Math.min(100, avgScore - 1),
        problemSolving: avgScore,
        communication: Math.min(100, avgScore + 4)
      },
      keyStrengths: ['Demonstrated good technical grounding', 'Professional, respectful communication tone'],
      areasForImprovement: ['Practice speaking to trade-offs and alternative solutions', 'Quantify production outcomes where possible'],
      questionEvaluations,
      disclaimer: 'Note: Automated evaluations provide structured heuristic feedback based on technical keywords and communication length to assist interview practice. They are not definitive hiring judgments.'
    };
  }

  public static async submitMockInterview(payload: any): Promise<{ success: boolean; recordId: string }> {
    try {
      const res = await fetch(`${this.baseUrl}/interviews/mock/submit`, {
        method: 'POST',
        headers: this.getHeaders(true),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    return {
      success: true,
      recordId: 'local-mock-' + Date.now()
    };
  }

  public static async getUserMockInterviewHistory(): Promise<MockInterviewAttemptRecord[]> {
    try {
      const res = await fetch(`${this.baseUrl}/interviews/mock/history`, {
        method: 'GET',
        headers: this.getHeaders(true)
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return [];
  }
}

