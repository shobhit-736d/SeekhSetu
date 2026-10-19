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
  const currentYear = new Date().getFullYear();
  const name = userName || 'Aarav Sharma';
  const email = userEmail || 'student@seekhsetu.edu';

  return {
    avatar: 'av-1',
    avatarType: 'preset',
    fullName: name,
    email: email,
    collegeName: 'National Institute of Technology',
    degree: 'B.Tech',
    branch: 'Computer Science and Engineering',
    semester: '7th Semester',
    graduationYear: `${currentYear + 1}`,
    careerGoal: 'Full Stack Software Engineer',
    targetCompanyTier: 'High-Growth Unicorns (Swiggy, Zomato, Razorpay)',
    targetPackage: '₹18 - ₹30 LPA (High Growth Product)',
    linkedinUrl: 'https://linkedin.com/in/student-seekhsetu',
    githubUrl: 'https://github.com/student-seekhsetu',
    portfolioUrl: 'https://portfolio.seekhsetu.dev',
    uploadedResumeName: 'Aarav_Sharma_Resume_2026.pdf',
    uploadedResumeDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    uploadedResumeSize: '184 KB',
    bio: 'Aspiring Full Stack Engineer passionate about scalable distributed systems, high-concurrency microservices, and modern UI engineering.',
    mockInterviews: [
      {
        id: 'mock-1',
        role: 'SDE-1 Frontend Technical Round',
        companyTarget: 'High-Growth Unicorn',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        score: 88,
        durationMinutes: 45,
        feedback: 'Excellent grasp of React Fiber, reconciliation cycles, and asynchronous JS. Demonstrated clean modular state management.',
        strengths: 'React Hooks, JavaScript Closures, System Thinking',
        areasToImprove: 'Web Performance profiling and SSR caching strategies'
      },
      {
        id: 'mock-2',
        role: 'Data Structures & Algorithms Round',
        companyTarget: 'Tier-1 Product Enterprise',
        date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        score: 82,
        durationMinutes: 60,
        feedback: 'Strong approach to sliding window and binary search problems. Good edge-case verbalization.',
        strengths: 'Sliding Window, Array manipulation, Time Complexity analysis',
        areasToImprove: 'Dynamic Programming state transitions and memoization table setup'
      }
    ],
    certificates: [
      {
        id: 'cert-1',
        title: 'Full Stack Technical Interview Mastery Certificate',
        credentialId: `SEEKH-${currentYear}-FS7821`,
        issueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        recipientName: name,
        module: 'Complete 30-Day Technical Preparation Curriculum',
        score: 94,
        verificationUrl: `https://seekhsetu.dev/verify/SEEKH-${currentYear}-FS7821`
      },
      {
        id: 'cert-2',
        title: 'Algorithmic Problem Solving & Data Structures Specialist',
        credentialId: `SEEKH-${currentYear}-DSA904`,
        issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        recipientName: name,
        module: 'Coding Arena & Assessment Suite',
        score: 91,
        verificationUrl: `https://seekhsetu.dev/verify/SEEKH-${currentYear}-DSA904`
      }
    ],
    savedInterviewQuestions: [
      {
        id: 'q-1',
        question: 'Explain JavaScript Event Loop, Microtask Queue vs Macrotask Queue in V8 engine.',
        topic: 'JavaScript Engine',
        difficulty: 'Medium',
        frequency: 'Asked by Google, Uber, Atlassian',
        answerSummary: 'V8 uses a single-threaded call stack, Web APIs, and two task queues: Microtasks (Promises, queueMicrotask) execute immediately after current synchronous code before any Macrotasks (setTimeout, setInterval).',
        savedAt: '2 days ago'
      },
      {
        id: 'q-2',
        question: 'How does React 18 Fiber reconciliation prioritize urgent vs non-urgent concurrent transitions?',
        topic: 'React Architecture',
        difficulty: 'Hard',
        frequency: 'Asked by Meta, Netflix, Microsoft',
        answerSummary: 'React Fiber splits rendering into cooperative units of work. Concurrent Mode assigns Lane priorities, interrupting render trees for urgent inputs (typing) while deferring transitions (startTransition, useDeferredValue).',
        savedAt: '5 days ago'
      },
      {
        id: 'q-3',
        question: 'What is the B-Tree indexing structure in relational databases and when does index scanning degrade?',
        topic: 'Database Engineering',
        difficulty: 'Medium',
        frequency: 'Asked by Amazon, Oracle, Razorpay',
        answerSummary: 'B-Trees keep keys sorted with balanced depths (O(log N) lookup). Degradation happens during leading wildcards (%term), high-frequency write fragmentation, or low-cardinality index skew.',
        savedAt: '1 week ago'
      }
    ],
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

export const studentProfileService = {
  getProfile: (userName?: string, userEmail?: string): StudentExtendedProfile => {
    const defaultProfile = getInitialDefaultProfile(userName, userEmail);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          // Keep name and email in sync if provided
          const resolvedName = (userName && userName.trim()) || parsed.fullName || defaultProfile.fullName;
          const resolvedEmail = (userEmail && userEmail.trim()) || parsed.email || defaultProfile.email;

          // Safe mock interviews
          const safeMockInterviews = Array.isArray(parsed.mockInterviews) && parsed.mockInterviews.length > 0
            ? parsed.mockInterviews
            : defaultProfile.mockInterviews;

          // Safe certificates
          const safeCertificates = Array.isArray(parsed.certificates) && parsed.certificates.length > 0
            ? parsed.certificates
            : defaultProfile.certificates;

          // Safe saved interview questions
          const safeSavedQuestions = Array.isArray(parsed.savedInterviewQuestions) && parsed.savedInterviewQuestions.length > 0
            ? parsed.savedInterviewQuestions
            : defaultProfile.savedInterviewQuestions;

          // Safe notifications
          const safeNotifications = {
            ...defaultProfile.notifications,
            ...(parsed.notifications && typeof parsed.notifications === 'object' ? parsed.notifications : {})
          };

          // Safe privacy
          const safePrivacy = {
            ...defaultProfile.privacy,
            ...(parsed.privacy && typeof parsed.privacy === 'object' ? parsed.privacy : {})
          };

          return {
            ...defaultProfile,
            ...parsed,
            fullName: resolvedName,
            email: resolvedEmail,
            avatar: parsed.avatar || defaultProfile.avatar,
            avatarType: parsed.avatarType || defaultProfile.avatarType,
            collegeName: parsed.collegeName || defaultProfile.collegeName,
            degree: parsed.degree || defaultProfile.degree,
            branch: parsed.branch || defaultProfile.branch,
            semester: parsed.semester || defaultProfile.semester,
            graduationYear: parsed.graduationYear || defaultProfile.graduationYear,
            careerGoal: parsed.careerGoal || defaultProfile.careerGoal,
            targetCompanyTier: parsed.targetCompanyTier || defaultProfile.targetCompanyTier,
            targetPackage: parsed.targetPackage || defaultProfile.targetPackage,
            uploadedResumeName: parsed.uploadedResumeName !== undefined ? parsed.uploadedResumeName : defaultProfile.uploadedResumeName,
            uploadedResumeDate: parsed.uploadedResumeDate !== undefined ? parsed.uploadedResumeDate : defaultProfile.uploadedResumeDate,
            uploadedResumeSize: parsed.uploadedResumeSize !== undefined ? parsed.uploadedResumeSize : defaultProfile.uploadedResumeSize,
            linkedinUrl: parsed.linkedinUrl || defaultProfile.linkedinUrl,
            githubUrl: parsed.githubUrl || defaultProfile.githubUrl,
            portfolioUrl: parsed.portfolioUrl || defaultProfile.portfolioUrl,
            mockInterviews: safeMockInterviews,
            certificates: safeCertificates,
            savedInterviewQuestions: safeSavedQuestions,
            notifications: safeNotifications,
            privacy: safePrivacy,
            bio: parsed.bio !== undefined ? parsed.bio : defaultProfile.bio
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse student extended profile:', e);
    }
    const fresh = defaultProfile;
    studentProfileService.saveProfile(fresh);
    return fresh;
  },

  saveProfile: (profile: StudentExtendedProfile): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save student extended profile:', e);
    }
  },

  clearProfile: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear profile:', e);
    }
  }
};
