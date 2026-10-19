import { ApiService } from './apiService';
import { UserProfile } from '../types/auth';

export interface MockInterviewRecord {
  id: string;
  role: string;
  companyTarget: string;
  date: string;
  score: number; // 0 - 100
  durationMinutes: number;
  feedback: string;
  strengths: string;
  areasToImprove: string;
}

export interface EarnedCertificate {
  id: string;
  title: string;
  credentialId: string;
  issueDate: string;
  recipientName: string;
  module: string;
  score: number;
  verificationUrl: string;
}

export interface SavedInterviewQuestionItem {
  id: string;
  question: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  frequency: string;
  answerSummary: string;
  savedAt: string;
}

export interface StudentExtendedProfile {
  // 1. Profile Photo / Avatar
  avatar: string;
  avatarType: 'preset' | 'custom' | 'initials';

  // 2-6. Academic Information
  fullName: string;
  email: string;
  collegeName: string;
  degree: string;
  branch: string;
  semester: string;
  graduationYear: string;

  // 15. Career Goal Selection
  careerGoal: string;
  targetCompanyTier: string;
  targetPackage: string;

  // 27. Social & Professional Links
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;

  // 16. Resume Upload
  uploadedResumeName?: string;
  uploadedResumeDate?: string;
  uploadedResumeSize?: string;
  uploadedResumeData?: string;

  // 18. Mock Interview History
  mockInterviews: MockInterviewRecord[];

  // 20. Certificates Earned
  certificates: EarnedCertificate[];

  // 24. Saved Interview Questions
  savedInterviewQuestions: SavedInterviewQuestionItem[];

  // 28. Notification Settings
  notifications: {
    dailyStudyReminder: boolean;
    streakAlerts: boolean;
    weeklyProgressDigest: boolean;
    mockInterviewTips: boolean;
  };

  // 30. Privacy Settings
  privacy: {
    isProfilePublic: boolean;
    showOnLeaderboard: boolean;
    shareActivityWithPeers: boolean;
    allowAiPersonalization: boolean;
  };

  // Bio / Personal Pitch
  bio: string;
}

const STORAGE_KEY = 'seekhsetu_student_extended_profile';

export const DEFAULT_AVATARS = [
  { id: 'av-1', label: 'Code Ninja', emoji: '🥷', bg: 'from-orange-500 to-amber-600' },
  { id: 'av-2', label: 'Tech Lead', emoji: '🧑‍💻', bg: 'from-blue-600 to-indigo-600' },
  { id: 'av-3', label: 'AI Pioneer', emoji: '🤖', bg: 'from-emerald-500 to-teal-600' },
  { id: 'av-4', label: 'Cyberpunk', emoji: '⚡', bg: 'from-purple-600 to-pink-600' },
  { id: 'av-5', label: 'Full Stack', emoji: '🚀', bg: 'from-rose-500 to-red-600' },
  { id: 'av-6', label: 'Algo Master', emoji: '🧠', bg: 'from-indigo-600 to-cyan-600' },
  { id: 'av-7', label: 'Cloud Architect', emoji: '☁️', bg: 'from-sky-500 to-blue-600' },
  { id: 'av-8', label: 'Bug Hunter', emoji: '🎯', bg: 'from-amber-500 to-orange-600' }
];

export const CAREER_GOAL_OPTIONS = [
  'Full Stack Software Engineer',
  'Frontend Engineer (React / Next.js)',
  'Backend Systems Engineer (Node / Go / Java)',
  'Data Structures & Algorithms Specialist',
  'DevOps & Cloud Engineer',
  'Data Analyst / Machine Learning Engineer',
  'Mobile App Engineer (React Native / Flutter)',
  'Quality Assurance & Automation Engineer'
];

export const COMPANY_TIER_OPTIONS = [
  'Tier 1 / FAANG (Google, Amazon, Microsoft)',
  'High-Growth Unicorns (Swiggy, Zomato, Razorpay)',
  'Established Product Enterprises (Adobe, Salesforce, Intuit)',
  'Fintech & Investment Banking (Goldman Sachs, Morgan Stanley)',
  'Fast-Paced Tech Startups'
];

export const CTC_PACKAGE_OPTIONS = [
  '₹6 - ₹10 LPA (Entry Placement)',
  '₹10 - ₹18 LPA (Standard SDE-1)',
  '₹18 - ₹30 LPA (High Growth Product)',
  '₹30+ LPA (Top Tier / International Remote)'
];

const getInitialDefaultProfile = (userName?: string, userEmail?: string): StudentExtendedProfile => {
  return {
    avatar: 'av-1',
    avatarType: 'preset',
    fullName: userName || '',
    email: userEmail || '',
    collegeName: '',
    degree: '',
    branch: '',
    semester: '',
    graduationYear: '',
    careerGoal: '',
    targetCompanyTier: '',
    targetPackage: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    uploadedResumeName: '',
    uploadedResumeDate: '',
    uploadedResumeSize: '',
    bio: '',
    mockInterviews: [],
    certificates: [],
    savedInterviewQuestions: [],
    notifications: {
      dailyStudyReminder: true,
      streakAlerts: true,
      weeklyProgressDigest: true,
      mockInterviewTips: true
    },
    privacy: {
      isProfilePublic: true,
      showOnLeaderboard: true,
      shareActivityWithPeers: true,
      allowAiPersonalization: true
    }
  };
};

const sanitizeProfile = (raw: any, userName?: string, userEmail?: string): StudentExtendedProfile => {
  const defaultProfile = getInitialDefaultProfile(userName, userEmail);
  if (!raw || typeof raw !== 'object') return defaultProfile;

  // Purge any legacy demo/mock data values
  const isDemoName = raw.fullName === 'Aarav Sharma';
  const isDemoCollege =
    raw.collegeName === 'National Institute of Technology' ||
    raw.collegeName === 'Indian Institute of Technology (IIT) Delhi';
  const isDemoResume =
    raw.uploadedResumeName === 'Aarav_Sharma_Resume_2026.pdf' ||
    raw.uploadedResumeName === 'Resume_SoftwareEngineer_2026.pdf';
  const isDemoGithub =
    raw.githubUrl === 'https://github.com/student-seekhsetu' ||
    raw.githubUrl === 'https://github.com/seekhsetu-student';
  const isDemoLinkedin =
    raw.linkedinUrl === 'https://linkedin.com/in/student-seekhsetu' ||
    raw.linkedinUrl === 'https://linkedin.com/in/seekhsetu-student';
  const isDemoPortfolio =
    raw.portfolioUrl === 'https://portfolio.seekhsetu.dev' ||
    raw.portfolioUrl === 'https://seekhsetu.dev';
  const isDemoBio =
    typeof raw.bio === 'string' &&
    raw.bio.includes('Aspiring Full Stack Engineer passionate about scalable distributed systems');

  // Purge fake mock interviews
  const cleanMockInterviews = Array.isArray(raw.mockInterviews)
    ? raw.mockInterviews.filter((m: any) => m && m.id && !m.id.startsWith('mock-'))
    : [];

  // Purge fake mock certificates
  const cleanCertificates = Array.isArray(raw.certificates)
    ? raw.certificates.filter((c: any) => c && c.id && !c.id.startsWith('cert-'))
    : [];

  // Purge fake mock questions
  const cleanQuestions = Array.isArray(raw.savedInterviewQuestions)
    ? raw.savedInterviewQuestions.filter((q: any) => q && q.id && !q.id.startsWith('q-'))
    : [];

  return {
    avatar: raw.avatar || defaultProfile.avatar,
    avatarType: raw.avatarType || defaultProfile.avatarType,
    fullName: isDemoName ? (userName || '') : (raw.fullName || userName || ''),
    email: (userEmail && userEmail.trim()) || raw.email || '',
    collegeName: isDemoCollege ? '' : (raw.collegeName || ''),
    degree: isDemoCollege ? '' : (raw.degree || ''),
    branch: isDemoCollege ? '' : (raw.branch || ''),
    semester: isDemoCollege ? '' : (raw.semester || ''),
    graduationYear: isDemoCollege ? '' : (raw.graduationYear || ''),
    careerGoal: raw.careerGoal || '',
    targetCompanyTier: raw.targetCompanyTier || '',
    targetPackage: raw.targetPackage || '',
    linkedinUrl: isDemoLinkedin ? '' : (raw.linkedinUrl || ''),
    githubUrl: isDemoGithub ? '' : (raw.githubUrl || ''),
    portfolioUrl: isDemoPortfolio ? '' : (raw.portfolioUrl || ''),
    uploadedResumeName: isDemoResume ? '' : (raw.uploadedResumeName || ''),
    uploadedResumeDate: isDemoResume ? '' : (raw.uploadedResumeDate || ''),
    uploadedResumeSize: isDemoResume ? '' : (raw.uploadedResumeSize || ''),
    bio: isDemoBio ? '' : (raw.bio || ''),
    mockInterviews: cleanMockInterviews,
    certificates: cleanCertificates,
    savedInterviewQuestions: cleanQuestions,
    notifications: {
      ...defaultProfile.notifications,
      ...(raw.notifications && typeof raw.notifications === 'object' ? raw.notifications : {})
    },
    privacy: {
      ...defaultProfile.privacy,
      ...(raw.privacy && typeof raw.privacy === 'object' ? raw.privacy : {})
    }
  };
};

export const studentProfileService = {
  getProfile: (userName?: string, userEmail?: string): StudentExtendedProfile => {
    const defaultProfile = getInitialDefaultProfile(userName, userEmail);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const sanitized = sanitizeProfile(parsed, userName, userEmail);
        return sanitized;
      }
    } catch (e) {
      console.warn('Failed to parse student extended profile from storage:', e);
    }
    const fresh = getInitialDefaultProfile(userName, userEmail);
    studentProfileService.saveLocalOnly(fresh);
    return fresh;
  },

  saveLocalOnly: (profile: StudentExtendedProfile): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save student extended profile locally:', e);
    }
  },

  saveProfile: async (profile: StudentExtendedProfile): Promise<void> => {
    try {
      // 1. Save locally for instant UI responsiveness and offline availability
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

      // 2. Persist directly to MongoDB database
      if (ApiService.getToken()) {
        await ApiService.updateProfile({
          studentProfile: profile,
          name: profile.fullName || undefined,
          avatar: profile.avatar || undefined
        }).catch(err => {
          console.warn('Database profile sync notice:', err?.message || err);
        });
      }
    } catch (e) {
      console.error('Failed to save student extended profile:', e);
    }
  },

  syncFromDatabase: (dbUser: UserProfile | null): StudentExtendedProfile | null => {
    if (!dbUser) return null;
    const dbStudentProfile = dbUser.studentProfile;
    if (dbStudentProfile && typeof dbStudentProfile === 'object') {
      const sanitized = sanitizeProfile(dbStudentProfile, dbUser.name, dbUser.email);
      studentProfileService.saveLocalOnly(sanitized);
      return sanitized;
    }
    return null;
  },

  clearProfile: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear profile:', e);
    }
  }
};
