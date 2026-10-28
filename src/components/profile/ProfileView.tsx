import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import {
  StudentExtendedProfile,
  studentProfileService,
  DEFAULT_AVATARS,
  CAREER_GOAL_OPTIONS,
  COMPANY_TIER_OPTIONS,
  CTC_PACKAGE_OPTIONS,
  EarnedCertificate
} from '../../services/studentProfileService';
import { codingQuestionsList } from '../../data/codingQuestionsData';
import { exportUserStorageJSON, clearUserStorage } from '../../services/storageService';
import {
  User,
  Mail,
  Shield,
  Copy,
  Check,
  LogOut,
  X,
  Flame,
  Award,
  GraduationCap,
  Edit3,
  Save,
  Target,
  Upload,
  FileText,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Star,
  Bookmark,
  BookOpen,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Bell,
  Moon,
  Sun,
  Eye,
  Download,
  Trash2,
  Trophy,
  Zap,
  Terminal,
  Printer,
  Globe,
  Plus,
  ArrowLeft,
  Share2,
  Briefcase,
  Building2
} from 'lucide-react';
import { ApplicationStatus } from '../../types/career';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

type ProfileTab = 'overview' | 'progress' | 'interviews' | 'applications' | 'saved' | 'settings';

export const ProfileView: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const {
    showToast,
    studyStreakDays,
    completedTopicsCount,
    completedDays,
    solvedCodingQuestions,
    bookmarkedCodingQuestions,
    quizAttempts,
    incorrectQuestions,
    bookmarkedConcepts,
    notes,
    studySessions,
    latestAtsScore,
    theme,
    toggleTheme,
    navigateToDay,
    navigateToCodingProblem,
    setActiveTab,
    jobApplications,
    trackJobApplication,
    deleteJobApplication,
    resetAllData
  } = useStudy();

  // Active Sub-Tab
  const [activeTab, setActiveTabState] = useState<ProfileTab>('overview');

  // Extended Profile State
  const [profile, setProfile] = useState<StudentExtendedProfile>(() =>
    studentProfileService.getProfile(user?.name, user?.email)
  );

  // Edit Profile Mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<StudentExtendedProfile>(profile);

  // Avatar Picker Modal
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  // Certificate Viewer Modal
  const [activeCertificate, setActiveCertificate] = useState<EarnedCertificate | null>(null);

  // Delete Account Confirmation Modal
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Clipboard Copy State
  const [copiedId, setCopiedId] = useState(false);

  // File Upload Reference for Resume & Custom Avatar
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize on user change
  useEffect(() => {
    const loaded = studentProfileService.getProfile(user?.name, user?.email);
    setProfile(loaded);
    setEditForm(loaded);
  }, [user]);

  // Safe effective user representation
  const effectiveUser = useMemo(() => ({
    id: user?.id || 'seekhsetu-student-001',
    name: profile?.fullName || user?.name || 'Student User',
    email: profile?.email || user?.email || 'student@seekhsetu.edu',
    role: (user?.role || 'student') as 'student' | 'admin'
  }), [user, profile?.fullName, profile?.email]);

  // Safe collections
  const safeSolved = useMemo(() => (Array.isArray(solvedCodingQuestions) ? solvedCodingQuestions : []), [solvedCodingQuestions]);
  const safeBookmarkedCoding = useMemo(() => (Array.isArray(bookmarkedCodingQuestions) ? bookmarkedCodingQuestions : []), [bookmarkedCodingQuestions]);
  const safeQuizAttempts = useMemo(() => (Array.isArray(quizAttempts) ? quizAttempts : []), [quizAttempts]);
  const safeStudySessions = useMemo(() => (Array.isArray(studySessions) ? studySessions : []), [studySessions]);
  const safeBookmarkedConcepts = useMemo(() => (Array.isArray(bookmarkedConcepts) ? bookmarkedConcepts : []), [bookmarkedConcepts]);
  const safeIncorrect = useMemo(() => (Array.isArray(incorrectQuestions) ? incorrectQuestions : []), [incorrectQuestions]);
  const safeNotes = useMemo(() => (notes && typeof notes === 'object' ? notes : {}), [notes]);
  const safeStreak = typeof studyStreakDays === 'number' ? studyStreakDays : 0;
  const safeCompletedTopics = typeof completedTopicsCount === 'number' ? completedTopicsCount : 0;
  const safeAts = typeof latestAtsScore === 'number' ? latestAtsScore : 0;

  // -------------------------------------------------------------
  // CALCULATIONS & METRICS
  // -------------------------------------------------------------
  const totalRoadmapDays = 30;
  const daysCompletedCount = Object.values(completedDays || {}).filter(Boolean).length;
  const curriculumProgressPercent = Math.min(100, Math.round((daysCompletedCount / totalRoadmapDays) * 100));

  // Placement Preparation Readiness Score (0 - 100%)
  const placementReadinessScore = useMemo(() => {
    const topicWeight = Math.min(30, (safeCompletedTopics / 30) * 30);
    const codingWeight = Math.min(30, (safeSolved.length / 20) * 30);
    const quizWeight = Math.min(20, (safeQuizAttempts.length / 10) * 20);
    const resumeWeight = safeAts > 0 ? Math.min(20, (safeAts / 100) * 20) : 0;
    return Math.min(100, Math.round(topicWeight + codingWeight + quizWeight + resumeWeight));
  }, [safeCompletedTopics, safeSolved.length, safeQuizAttempts.length, safeAts]);

  // Total Coding Solved Breakdown
  const solvedDetails = useMemo(() => {
    const list = (codingQuestionsList || []).filter(q => safeSolved.includes(q.id));
    const easy = list.filter(q => q.difficulty === 'Easy').length;
    const medium = list.filter(q => q.difficulty === 'Medium').length;
    const hard = list.filter(q => q.difficulty === 'Hard').length;
    return { total: safeSolved.length, easy, medium, hard };
  }, [safeSolved]);

  // Quiz Attempt Stats
  const quizStats = useMemo(() => {
    if (safeQuizAttempts.length === 0) return { total: 0, avgScore: 0, bestScore: 0 };
    const totalScorePercent = safeQuizAttempts.reduce((acc, q) => acc + ((q.score || 0) / (q.totalQuestions || 1)) * 100, 0);
    const avgScore = Math.round(totalScorePercent / safeQuizAttempts.length);
    const bestScore = Math.max(...safeQuizAttempts.map(q => Math.round(((q.score || 0) / (q.totalQuestions || 1)) * 100)));
    return { total: safeQuizAttempts.length, avgScore, bestScore };
  }, [safeQuizAttempts]);

  // 7-Day Activity Chart Data (REAL study minutes only)
  const weeklyActivity = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, idx) => {
      const session = safeStudySessions[idx];
      const minutes = session && typeof session.durationMinutes === 'number' ? session.durationMinutes : 0;
      return {
        day,
        minutes,
        heightPercent: minutes > 0 ? Math.min(100, Math.max(12, (minutes / 60) * 100)) : 4
      };
    });
  }, [safeStudySessions]);

  // Skill Assessment Scores (REAL progress only)
  const skillScores = useMemo(() => {
    const dsaScore = Math.min(100, Math.round((safeSolved.length / 20) * 100));
    const dsaLevel = dsaScore === 0 ? 'Not Started' : dsaScore >= 75 ? 'Advanced' : dsaScore >= 40 ? 'Proficient' : 'Beginner';

    const feScore = Math.min(100, Math.round((safeCompletedTopics / 25) * 100));
    const feLevel = feScore === 0 ? 'Not Started' : feScore >= 75 ? 'Advanced' : feScore >= 40 ? 'Proficient' : 'Beginner';

    const beScore = Math.min(100, Math.round((daysCompletedCount / 15) * 100));
    const beLevel = beScore === 0 ? 'Not Started' : beScore >= 75 ? 'Advanced' : beScore >= 40 ? 'Proficient' : 'Beginner';

    const dbScore = quizStats.total > 0 ? Math.min(100, Math.round(quizStats.avgScore)) : 0;
    const dbLevel = dbScore === 0 ? 'Not Assessed' : dbScore >= 75 ? 'Proficient' : 'Intermediate';

    const aptScore = quizStats.total > 0 ? Math.min(100, Math.round((quizStats.total / 10) * 100)) : 0;
    const aptLevel = aptScore === 0 ? 'Not Assessed' : aptScore >= 70 ? 'Proficient' : 'Practicing';

    return [
      { name: 'Data Structures & Algorithms', score: dsaScore, level: dsaLevel },
      { name: 'Frontend Architecture & React', score: feScore, level: feLevel },
      { name: 'Backend & REST Microservices', score: beScore, level: beLevel },
      { name: 'Databases & SQL Engineering', score: dbScore, level: dbLevel },
      { name: 'Aptitude & Quantitative Logic', score: aptScore, level: aptLevel }
    ];
  }, [safeSolved.length, safeCompletedTopics, daysCompletedCount, quizStats]);

  // Badges calculation
  const badgesList = useMemo(() => [
    {
      id: 'b-streak',
      title: '7-Day Flame',
      desc: 'Maintain a 7-day learning streak',
      icon: Flame,
      unlocked: safeStreak >= 7,
      progress: `${Math.min(7, safeStreak)}/7 Days`
    },
    {
      id: 'b-first',
      title: 'First Step',
      desc: 'Complete your first syllabus topic',
      icon: Zap,
      unlocked: safeCompletedTopics >= 1,
      progress: `${Math.min(1, safeCompletedTopics)}/1 Topic`
    },
    {
      id: 'b-code',
      title: 'Code Crusher',
      desc: 'Solve 5 coding challenges',
      icon: Terminal,
      unlocked: safeSolved.length >= 5,
      progress: `${Math.min(5, safeSolved.length)}/5 Solved`
    },
    {
      id: 'b-quiz',
      title: 'Quiz Master',
      desc: 'Attempt 3 module quizzes',
      icon: Award,
      unlocked: safeQuizAttempts.length >= 3,
      progress: `${Math.min(3, safeQuizAttempts.length)}/3 Quizzes`
    },
    {
      id: 'b-ats',
      title: 'ATS Champion',
      desc: 'Score 80+ in ATS Resume Checker',
      icon: FileText,
      unlocked: safeAts >= 80,
      progress: `${safeAts}/80 ATS`
    },
    {
      id: 'b-master',
      title: 'Curriculum Hero',
      desc: 'Master 10 topics across modules',
      icon: Trophy,
      unlocked: safeCompletedTopics >= 10,
      progress: `${Math.min(10, safeCompletedTopics)}/10 Topics`
    },
    {
      id: 'b-focus',
      title: 'Deep Diver',
      desc: 'Complete a focused study session',
      icon: Star,
      unlocked: safeStudySessions.length >= 1,
      progress: `${safeStudySessions.length > 0 ? 1 : 0}/1 Session`
    },
    {
      id: 'b-ready',
      title: 'Interview Ready',
      desc: 'Achieve 70%+ Placement Readiness',
      icon: Target,
      unlocked: placementReadinessScore >= 70,
      progress: `${placementReadinessScore}% / 70%`
    }
  ], [safeStreak, safeCompletedTopics, safeSolved.length, safeQuizAttempts.length, safeAts, safeStudySessions.length, placementReadinessScore]);

  // Saved Coding Problems Mapped
  const savedCodingProblems = useMemo(() => {
    return (codingQuestionsList || []).filter(q => safeBookmarkedCoding.includes(q.id));
  }, [safeBookmarkedCoding]);

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const handleCopyId = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(effectiveUser.id);
    }
    setCopiedId(true);
    showToast('User ID copied to clipboard', 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSaveProfile = () => {
    studentProfileService.saveProfile(editForm);
    setProfile(editForm);
    setIsEditingProfile(false);
    if (user && editForm.fullName !== user.name) {
      updateProfile({ name: editForm.fullName });
    }
    showToast('Profile updated successfully!', 'success');
  };

  const handleSelectAvatarPreset = (avatarId: string) => {
    const updated: StudentExtendedProfile = {
      ...profile,
      avatar: avatarId,
      avatarType: 'preset'
    };
    studentProfileService.saveProfile(updated);
    setProfile(updated);
    setEditForm(updated);
    setIsAvatarPickerOpen(false);
    showToast('Avatar updated', 'success');
  };

  const handleCustomAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image must be under 2MB', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const dataUrl = event.target?.result as string;
      const updated: StudentExtendedProfile = {
        ...profile,
        avatar: dataUrl,
        avatarType: 'custom'
      };
      studentProfileService.saveProfile(updated);
      setProfile(updated);
      setEditForm(updated);
      setIsAvatarPickerOpen(false);
      showToast('Custom photo uploaded successfully', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('Resume file must be under 5MB', 'warning');
      return;
    }
    const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const updated: StudentExtendedProfile = {
      ...profile,
      uploadedResumeName: file.name,
      uploadedResumeDate: dateStr,
      uploadedResumeSize: sizeStr
    };
    studentProfileService.saveProfile(updated);
    setProfile(updated);
    setEditForm(updated);
    showToast(`Resume "${file.name}" uploaded successfully!`, 'success');
  };

  const handleNotificationToggle = (key: keyof StudentExtendedProfile['notifications']) => {
    const current = profile.notifications || {
      dailyStudyReminder: true,
      streakAlerts: true,
      weeklyProgressDigest: true,
      mockInterviewTips: true
    };
    const updated: StudentExtendedProfile = {
      ...profile,
      notifications: {
        ...current,
        [key]: !current[key]
      }
    };
    studentProfileService.saveProfile(updated);
    setProfile(updated);
    setEditForm(updated);
    showToast('Notification preference updated', 'info');
  };

  const handlePrivacyToggle = (key: keyof StudentExtendedProfile['privacy']) => {
    const current = profile.privacy || {
      isProfilePublic: true,
      showOnLeaderboard: true,
      shareActivityWithPeers: true,
      allowAiPersonalization: true
    };
    const updated: StudentExtendedProfile = {
      ...profile,
      privacy: {
        ...current,
        [key]: !current[key]
      }
    };
    studentProfileService.saveProfile(updated);
    setProfile(updated);
    setEditForm(updated);
    showToast('Privacy setting updated', 'info');
  };

  const handleLogout = () => {
    logout();
    setActiveTab('dashboard');
    showToast('Logged out successfully', 'info');
  };

  const handleDeleteAccount = () => {
    studentProfileService.clearProfile();
    clearUserStorage(effectiveUser.id);
    resetAllData();
    setIsDeleteConfirmOpen(false);
    logout();
    setActiveTab('dashboard');
    showToast('Account and all learning history cleared', 'info');
  };

  const renderCurrentAvatar = () => {
    if (profile.avatarType === 'custom' && profile.avatar && profile.avatar.startsWith('data:image')) {
      return (
        <img
          src={profile.avatar}
          alt={profile.fullName}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-[#FA4616] shadow-xl"
        />
      );
    }
    const preset = DEFAULT_AVATARS.find(a => a.id === profile.avatar);
    if (preset) {
      return (
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${preset.bg} text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-xl shadow-[#FA4616]/20 border-2 border-white/20`}>
          <span>{preset.emoji}</span>
        </div>
      );
    }
    return (
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#FA4616] to-amber-500 text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-xl shadow-[#FA4616]/20 border-2 border-white/20">
        {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ========================================================= */}
      {/* 1. TOP HEADER & BREADCRUMB                                */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-aurora-text-secondary hover:text-aurora-text-primary px-3 py-1.5 rounded-xl bg-aurora-bg-elevated border border-aurora-border transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${profile.fullName} - SeekhSetu Profile`,
                  url: window.location.href
                }).catch(() => {});
              } else if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                showToast('Profile link copied to clipboard', 'info');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-surface border border-aurora-border text-xs font-bold text-aurora-text-secondary hover:text-aurora-text-primary transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Profile</span>
          </button>

          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-md transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. HERO PROFILE CARD                                      */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-600/15 via-[#FA4616]/10 to-indigo-600/10 border border-aurora-border shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            {/* Profile Avatar with Quick Picker Trigger */}
            <div className="relative group cursor-pointer" onClick={() => setIsAvatarPickerOpen(true)}>
              {renderCurrentAvatar()}
              <div className="absolute inset-0 rounded-3xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold">
                Change Photo
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center flex-wrap gap-2.5">
                <h1 className="text-xl sm:text-3xl font-extrabold text-aurora-text-primary tracking-tight">
                  {profile.fullName}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  effectiveUser.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                    : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                }`}>
                  {effectiveUser.role}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  <Check className="w-3 h-3 text-blue-500" />
                  Verified Student
                </span>
              </div>

              <p className="text-xs sm:text-sm text-aurora-text-secondary flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-aurora-text-secondary" />
                  {profile.email}
                </span>
                {profile.collegeName ? (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-aurora-text-primary">
                      {profile.collegeName}
                    </span>
                  </>
                ) : null}
              </p>

              <div className="flex items-center gap-2 text-xs text-aurora-text-secondary pt-1 flex-wrap">
                {profile.degree || profile.branch ? (
                  <span className="px-2.5 py-1 rounded-xl bg-aurora-bg-surface border border-aurora-border font-medium text-aurora-text-primary">
                    🎓 {[profile.degree, profile.branch, profile.semester].filter(Boolean).join(' • ')}
                  </span>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-2.5 py-1 rounded-xl bg-aurora-bg-surface/80 hover:bg-[#FA4616]/10 border border-dashed border-[#FA4616]/40 font-semibold text-[#FA4616] text-[11px] transition-colors"
                  >
                    + Add Academic Details
                  </button>
                )}
                {profile.graduationYear && (
                  <span className="px-2.5 py-1 rounded-xl bg-aurora-bg-surface border border-aurora-border font-medium text-aurora-text-primary">
                    📅 Class of {profile.graduationYear}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Target Role Pill */}
          <div className="p-4 rounded-2xl bg-aurora-bg-surface/90 border border-aurora-border space-y-1 w-full sm:w-auto text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-aurora-text-secondary block">
              Placement Target
            </span>
            <div className="font-extrabold text-sm text-[#FA4616]">
              {profile.careerGoal || 'Career Goal Not Set'}
            </div>
            <div className="text-[11px] text-aurora-text-secondary">
              {profile.targetCompanyTier ? profile.targetCompanyTier.split('(')[0] : 'Set in Career Preferences'}
            </div>
          </div>
        </div>

        {/* 4 Quick Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-aurora-border/60 text-xs">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="font-extrabold text-base text-aurora-text-primary">{safeStreak} Days</div>
              <div className="text-[10px] text-amber-800 dark:text-amber-300">Learning Streak</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <div className="font-extrabold text-base text-aurora-text-primary">{safeCompletedTopics} Topics</div>
              <div className="text-[10px] text-blue-800 dark:text-blue-300">Mastered</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <div className="font-extrabold text-base text-aurora-text-primary">{safeSolved.length} Solved</div>
              <div className="text-[10px] text-emerald-800 dark:text-emerald-300">Coding Problems</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-[#FA4616]/20 flex items-center gap-3">
            <Target className="w-5 h-5 text-[#FA4616] shrink-0" />
            <div>
              <div className="font-extrabold text-base text-aurora-text-primary">{placementReadinessScore}%</div>
              <div className="text-[10px] text-orange-800 dark:text-orange-300 font-semibold">Placement Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. SUBTAB NAVIGATION BAR                                  */}
      {/* ========================================================= */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview & Academics', icon: User },
          { id: 'progress', label: 'Progress & Analytics', icon: BarChart2 },
          { id: 'interviews', label: 'Interviews & Badges', icon: Trophy },
          { id: 'applications', label: `Job Applications (${jobApplications?.length || 0})`, icon: Briefcase },
          { id: 'saved', label: 'Saved Items & Notes', icon: Bookmark },
          { id: 'settings', label: 'Settings & Account', icon: Shield }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabState(tab.id as ProfileTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#FA4616] text-white shadow-md'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 4. MAIN TAB CONTENT AREA                                  */}
      {/* ========================================================= */}
      <div className="space-y-6 text-xs text-aurora-text-primary">
        {/* ------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & ACADEMICS                             */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* EDIT PROFILE FORM (Toggleable) */}
            {isEditingProfile && (
              <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-[#FA4616]/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#FA4616]" />
                    <span>Edit Student Profile Details</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1.5 rounded-xl bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary font-semibold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={e => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">College / University Name</label>
                    <input
                      type="text"
                      value={editForm.collegeName}
                      onChange={e => setEditForm({ ...editForm, collegeName: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Degree</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech / B.E. / BCA / MCA"
                      value={editForm.degree}
                      onChange={e => setEditForm({ ...editForm, degree: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Branch / Major</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science and Engineering"
                      value={editForm.branch}
                      onChange={e => setEditForm({ ...editForm, branch: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Current Semester</label>
                    <input
                      type="text"
                      placeholder="e.g. 7th Semester"
                      value={editForm.semester}
                      onChange={e => setEditForm({ ...editForm, semester: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Graduation Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2026"
                      value={editForm.graduationYear}
                      onChange={e => setEditForm({ ...editForm, graduationYear: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      value={editForm.linkedinUrl}
                      onChange={e => setEditForm({ ...editForm, linkedinUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">GitHub Profile URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      value={editForm.githubUrl}
                      onChange={e => setEditForm({ ...editForm, githubUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Bio / Personal Pitch</label>
                    <textarea
                      rows={2}
                      value={editForm.bio}
                      onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Career Goal & Target Placement Strategy */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FA4616]" />
                  <span>Career Goal & Target Placement Strategy</span>
                </h2>
                <span className="text-[11px] text-aurora-text-secondary font-medium">Controls personalized AI recommendations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Target Engineering Role</label>
                  <select
                    value={profile.careerGoal}
                    onChange={e => {
                      const val = e.target.value;
                      const upd = { ...profile, careerGoal: val };
                      studentProfileService.saveProfile(upd);
                      setProfile(upd);
                      setEditForm(upd);
                      showToast(`Target role set to ${val}`, 'info');
                    }}
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                  >
                    {CAREER_GOAL_OPTIONS.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Target Company Tier</label>
                  <select
                    value={profile.targetCompanyTier}
                    onChange={e => {
                      const val = e.target.value;
                      const upd = { ...profile, targetCompanyTier: val };
                      studentProfileService.saveProfile(upd);
                      setProfile(upd);
                      setEditForm(upd);
                      showToast(`Target company tier updated`, 'info');
                    }}
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                  >
                    {COMPANY_TIER_OPTIONS.map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Expected CTC Package</label>
                  <select
                    value={profile.targetPackage}
                    onChange={e => {
                      const val = e.target.value;
                      const upd = { ...profile, targetPackage: val };
                      studentProfileService.saveProfile(upd);
                      setProfile(upd);
                      setEditForm(upd);
                      showToast(`Target package preference saved`, 'info');
                    }}
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary outline-none focus:border-[#FA4616]"
                  >
                    {CTC_PACKAGE_OPTIONS.map(pkg => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FA4616]" />
                  <span className="font-semibold text-aurora-text-primary">
                    Placement Strategy: Preparing for <strong className="text-[#FA4616]">{profile.careerGoal}</strong> at <strong>{profile.targetCompanyTier.split('(')[0]}</strong>
                  </span>
                </div>
                <span className="text-[11px] text-aurora-text-secondary hidden sm:inline">Target CTC: {profile.targetPackage}</span>
              </div>
            </div>

            {/* Resume Upload & ATS Management */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FA4616]" />
                  <span>Resume Upload & ATS Compatibility</span>
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Latest ATS Score: {safeAts}/100
                </span>
              </div>

              <input
                type="file"
                ref={resumeFileInputRef}
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleResumeFileUpload}
              />

              <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center text-[#FA4616]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-aurora-text-primary">{profile.uploadedResumeName || 'No resume uploaded yet'}</div>
                    <div className="text-[11px] text-aurora-text-secondary mt-0.5">
                      {profile.uploadedResumeDate ? `Uploaded on ${profile.uploadedResumeDate} • ${profile.uploadedResumeSize}` : 'Upload your PDF or DOCX resume to analyze and tune'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => resumeFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-elevated/80 border border-aurora-border text-xs font-bold text-aurora-text-primary transition-all shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#FA4616]" />
                    <span>{profile.uploadedResumeName ? 'Replace Resume' : 'Upload Resume'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('resume')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-md transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open ATS Resume Studio</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Personalized AI Recommendations */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/20 via-aurora-bg-elevated to-[#FA4616]/10 border border-aurora-border space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FA4616]" />
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary">Personalized AI Placement Guidance</h2>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-aurora-bg-surface/85 border border-aurora-border flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-aurora-text-primary">Immediate Focus for {profile.careerGoal}:</span>
                    <p className="text-aurora-text-secondary mt-0.5 leading-relaxed">
                      Complete 2 Medium Two Pointer & Sliding Window coding problems today to align with your {profile.targetCompanyTier.split('(')[0]} hiring timeline.
                    </p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-aurora-bg-surface/85 border border-aurora-border flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-aurora-text-primary">Resume Keyword Tuning:</span>
                    <p className="text-aurora-text-secondary mt-0.5 leading-relaxed">
                      Your ATS compatibility score is {safeAts}/100. Incorporate quantifiable impact metrics (e.g. latency decreased by 35%, 10k RPS throughput) to unlock Tier 1 thresholds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Links (LinkedIn, GitHub, Portfolio) */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#FA4616]" />
                <span>Verified Social & Engineering Portfolios</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border hover:border-blue-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-xs text-aurora-text-primary">LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-aurora-text-secondary group-hover:text-blue-500 transition-colors" />
                </a>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border hover:border-[#FA4616]/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-aurora-text-primary" />
                    <span className="font-bold text-xs text-aurora-text-primary">GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-aurora-text-secondary group-hover:text-[#FA4616] transition-colors" />
                </a>

                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border hover:border-emerald-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-xs text-aurora-text-primary">Engineering Portfolio</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-aurora-text-secondary group-hover:text-emerald-500 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* TAB 2: PROGRESS & ANALYTICS                             */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Learning Progress & Curriculum Completion */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#FA4616]" />
                    <span>30-Day Placement Curriculum Progress</span>
                  </h2>
                  <p className="text-[11px] text-aurora-text-secondary mt-0.5">
                    {daysCompletedCount} of {totalRoadmapDays} curriculum days completed ({safeCompletedTopics} syllabus topics mastered)
                  </p>
                </div>
                <span className="text-base font-extrabold text-[#FA4616]">{curriculumProgressPercent}%</span>
              </div>

              <div className="w-full bg-aurora-bg-surface rounded-full h-3 overflow-hidden border border-aurora-border">
                <div
                  className="h-full bg-gradient-to-r from-[#FA4616] via-amber-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${curriculumProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Weekly Activity 7-Day Chart */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#FA4616]" />
                  <span>Weekly Study Activity & Focus Distribution</span>
                </h2>
                <span className="text-[11px] text-aurora-text-secondary">Last 7 Days (Minutes studied)</span>
              </div>

              <div className="h-44 pt-6 flex items-end justify-between gap-3 border-b border-aurora-border px-3">
                {weeklyActivity.map(item => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-bold text-aurora-text-secondary group-hover:text-[#FA4616] transition-colors">
                      {item.minutes}m
                    </span>
                    <div
                      className="w-full max-w-[32px] rounded-t-xl bg-gradient-to-t from-[#FA4616]/40 to-[#FA4616] group-hover:from-[#FA4616]/70 group-hover:to-[#FA4616] transition-all"
                      style={{ height: `${item.heightPercent}%` }}
                    />
                    <span className="text-[11px] font-bold text-aurora-text-secondary mt-1">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coding & Quizzes Deep Dive Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Coding Problems Solved Box */}
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-aurora-text-primary flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span>Coding Arena Solved: {solvedDetails.total}</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('coding')}
                    className="text-[11px] font-bold text-[#FA4616] hover:underline"
                  >
                    Open Arena →
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="font-extrabold text-base text-emerald-700 dark:text-emerald-300">{solvedDetails.easy}</div>
                    <div className="text-[10px] text-aurora-text-secondary">Easy</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="font-extrabold text-base text-amber-700 dark:text-amber-300">{solvedDetails.medium}</div>
                    <div className="text-[10px] text-aurora-text-secondary">Medium</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <div className="font-extrabold text-base text-rose-700 dark:text-rose-300">{solvedDetails.hard}</div>
                    <div className="text-[10px] text-aurora-text-secondary">Hard</div>
                  </div>
                </div>
              </div>

              {/* Quizzes Attempted Box */}
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-aurora-text-primary flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Quizzes Attempted: {quizStats.total}</span>
                  </span>
                  <span className="text-[11px] text-purple-700 dark:text-purple-300 font-bold">
                    Avg Score: {quizStats.avgScore}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                    <div className="font-extrabold text-base text-aurora-text-primary">{quizStats.bestScore}%</div>
                    <div className="text-[10px] text-aurora-text-secondary">Highest Score</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                    <div className="font-extrabold text-base text-aurora-text-primary">{quizStats.total} / 30</div>
                    <div className="text-[10px] text-aurora-text-secondary">Assessments Done</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Assessment Radar Scores */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FA4616]" />
                <span>Technical Competencies & Skill Mastery Index</span>
              </h2>

              <div className="space-y-3.5 pt-1">
                {skillScores.map(skill => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-aurora-text-primary">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary">
                          {skill.level}
                        </span>
                        <span className="font-extrabold text-[#FA4616]">{skill.score}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-aurora-bg-surface rounded-full h-2.5 overflow-hidden border border-aurora-border">
                      <div
                        className="h-full bg-[#FA4616] rounded-full transition-all duration-300"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics & Improvement Areas */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Target Weak Areas & Recommended Practice</span>
                </h2>
                <span className="text-[10px] text-aurora-text-secondary">Identified from assessment errors</span>
              </div>

              {safeIncorrect.length > 0 ? (
                <div className="space-y-2.5">
                  {safeIncorrect.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs text-aurora-text-primary line-clamp-1">{item.question}</div>
                        <div className="text-[10px] text-aurora-text-secondary mt-0.5">
                          Day {item.dayNumber} • {item.topicTitle} • Incorrect on {item.date}
                        </div>
                      </div>
                      <button
                        onClick={() => navigateToDay(item.dayNumber)}
                        className="px-3 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-[11px] font-bold shrink-0 transition-all shadow-sm"
                      >
                        Practice Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>No critical weak topics flagged! Your quiz accuracy is currently ranking in the top 15% tier.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* TAB 3: INTERVIEWS & ACHIEVEMENTS                        */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'interviews' && (
          <div className="space-y-6">
            {/* Mock Interview History */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#FA4616]" />
                    <span>Mock Interview History & Performance Logs</span>
                  </h2>
                  <p className="text-[11px] text-aurora-text-secondary mt-0.5">
                    Technical simulations with automated rubric scoring
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('communication')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs shadow-md transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start Mock Round</span>
                </button>
              </div>

              <div className="space-y-3">
                {(profile.mockInterviews || []).length > 0 ? (
                  (profile.mockInterviews || []).map(mock => (
                    <div key={mock.id} className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="font-bold text-sm text-aurora-text-primary">{mock.role}</span>
                          <span className="text-[11px] text-aurora-text-secondary block">
                            {mock.companyTarget} • {mock.date} ({mock.durationMinutes} mins)
                          </span>
                        </div>
                        <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Score: {mock.score}/100
                        </span>
                      </div>

                      <p className="text-[11px] text-aurora-text-primary bg-aurora-bg-elevated p-3 rounded-xl border border-aurora-border/60 leading-relaxed">
                        "{mock.feedback}"
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-aurora-text-secondary pt-1">
                        <span><strong>Strengths:</strong> {mock.strengths}</span>
                        <span><strong>Focus Areas:</strong> {mock.areasToImprove}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FA4616]/10 text-[#FA4616] flex items-center justify-center mx-auto">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm text-aurora-text-primary">No Mock Interviews Completed Yet</div>
                    <p className="text-xs text-aurora-text-secondary max-w-md mx-auto">
                      Complete real AI speech pitches and technical interview rounds in the Communication Suite to view your performance logs and rubric feedback here.
                    </p>
                    <button
                      onClick={() => setActiveTab('communication')}
                      className="px-4 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Start Interview Round</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Achievements & Badges Grid */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FA4616]" />
                  <span>Earned Badges & Milestone Achievements</span>
                </h2>
                <span className="text-xs font-bold text-[#FA4616]">
                  {badgesList.filter(b => b.unlocked).length} of {badgesList.length} Unlocked
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {badgesList.map(badge => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                        badge.unlocked
                          ? 'bg-aurora-bg-surface border-[#FA4616]/40 shadow-sm'
                          : 'bg-aurora-bg-surface/40 border-aurora-border opacity-60'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 mx-auto shadow-sm">
                        <Icon className={`w-6 h-6 ${badge.unlocked ? 'text-[#FA4616]' : 'text-aurora-text-secondary'}`} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-aurora-text-primary line-clamp-1">{badge.title}</div>
                        <div className="text-[10px] text-aurora-text-secondary line-clamp-2 mt-0.5 leading-tight">{badge.desc}</div>
                      </div>
                      <div className="mt-3">
                        {badge.unlocked ? (
                          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            Unlocked ✓
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-aurora-text-secondary">
                            {badge.progress}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificates Earned */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FA4616]" />
                  <span>Verified Placement Certificates ({(profile.certificates || []).length})</span>
                </h2>
                <span className="text-[10px] text-aurora-text-secondary">Cryptographically verified IDs</span>
              </div>

              <div className="space-y-3">
                {(profile.certificates || []).length > 0 ? (
                  (profile.certificates || []).map(cert => (
                    <div key={cert.id} className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm text-aurora-text-primary">{cert.title}</div>
                        <div className="text-[11px] text-aurora-text-secondary mt-0.5">
                          ID: <span className="font-mono text-aurora-text-primary font-bold">{cert.credentialId}</span> • Issued {cert.issueDate} • Grade: {cert.score}%
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveCertificate(cert)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-aurora-bg-elevated hover:bg-aurora-bg-elevated/80 border border-aurora-border text-xs font-bold text-aurora-text-primary transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#FA4616]" />
                        <span>View Credential</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm text-aurora-text-primary">No Placement Certificates Earned Yet</div>
                    <p className="text-xs text-aurora-text-secondary max-w-md mx-auto">
                      Complete 100% of the 30-Day curriculum or achieve 80%+ on technical module assessments to earn verifiable, shareable credentials.
                    </p>
                    <button
                      onClick={() => setActiveTab('roadmap')}
                      className="px-4 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Continue Roadmap</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* TAB 4: JOB APPLICATIONS PIPELINE                        */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Header / Pipeline Overview Card */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold border border-rose-500/20">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>In-App Application Tracker</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold text-aurora-text-primary">
                    My Campus & Off-Campus Hiring Pipeline
                  </h2>
                  <p className="text-xs text-aurora-text-secondary">
                    Track application stages, technical interview rounds, and job offers directly linked to verified company career portals.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="px-3.5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Browse Hiring Drives</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('resume')}
                    className="px-3.5 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-secondary text-xs font-semibold text-aurora-text-primary border border-aurora-border transition-colors"
                  >
                    Resume Studio
                  </button>
                </div>
              </div>

              {/* Pipeline Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-center">
                  <div className="text-[11px] text-aurora-text-muted">Total Tracked</div>
                  <div className="text-lg font-extrabold text-aurora-text-primary mt-0.5">
                    {jobApplications.length}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Applied / Wishlist</div>
                  <div className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mt-0.5">
                    {jobApplications.filter(a => a.status === 'Applied' || a.status === 'Wishlist').length}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">OA & Interview Rounds</div>
                  <div className="text-lg font-extrabold text-amber-700 dark:text-amber-300 mt-0.5">
                    {jobApplications.filter(a => ['Online Assessment', 'Technical Interview', 'HR Round'].includes(a.status)).length}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Offers Received 🎉</div>
                  <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {jobApplications.filter(a => a.status === 'Offered').length}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Items List or Empty State */}
            {jobApplications.length === 0 ? (
              <div className="p-10 text-center rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-base font-bold text-aurora-text-primary">No Job Applications Tracked Yet</h3>
                  <p className="text-xs text-aurora-text-secondary">
                    Visit the Verified Opportunities Board to explore verified fresher hiring drives (TCS NQT, Infosys DSE, Amazon SDE, Microsoft, etc.) and track your applications end-to-end.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Explore Verified Opportunities</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {jobApplications.map(app => {
                  const getStatusBadge = (status: string) => {
                    switch (status) {
                      case 'Offered':
                        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
                      case 'Technical Interview':
                      case 'HR Round':
                        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30';
                      case 'Online Assessment':
                        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
                      case 'Rejected':
                        return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';
                      case 'Applied':
                        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
                      default:
                        return 'bg-aurora-bg-secondary text-aurora-text-secondary border-aurora-border';
                    }
                  };

                  return (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border hover:border-aurora-borderStrong transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(app.status)}`}>
                            {app.status}
                          </span>
                          <span className="text-[11px] font-semibold text-aurora-text-muted">
                            {app.workplaceType} • {app.location}
                          </span>
                          {app.appliedDate && (
                            <span className="text-[11px] text-aurora-text-muted">
                              Applied: {app.appliedDate}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-aurora-text-primary">
                          {app.title}
                        </h3>

                        <div className="text-xs font-semibold text-[#FA4616] flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{app.company}</span>
                        </div>

                        {app.notes && (
                          <p className="text-[11px] text-aurora-text-secondary italic bg-aurora-bg-surface px-3 py-1.5 rounded-lg border border-aurora-border max-w-xl">
                            Note: "{app.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                        {/* Status Select dropdown */}
                        <select
                          value={app.status}
                          onChange={(e) => {
                            trackJobApplication({
                              ...app,
                              status: e.target.value as ApplicationStatus
                            });
                            showToast(`Updated status to ${e.target.value}`);
                          }}
                          className="text-xs px-2.5 py-1.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary focus:outline-none focus:border-[#FA4616]"
                        >
                          <option value="Wishlist">Wishlist</option>
                          <option value="Applied">Applied</option>
                          <option value="Online Assessment">Online Assessment</option>
                          <option value="Technical Interview">Technical Interview</option>
                          <option value="HR Round">HR Round</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                        {/* Direct Portal Link */}
                        {app.directApplyUrl && (
                          <a
                            href={app.directApplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-secondary text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border transition-colors"
                            title="Open Official Career Portal"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            deleteJobApplication(app.id);
                            showToast('Application removed from tracker');
                          }}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition-colors"
                          title="Remove from Tracker"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* TAB 5: SAVED ITEMS & PERSONAL NOTES                     */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            {/* Saved Coding Problems */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FA4616]" />
                  <span>Bookmarked Coding Problems ({savedCodingProblems.length})</span>
                </h2>
                <span className="text-[10px] text-aurora-text-secondary">Pinned from Coding Arena</span>
              </div>

              {savedCodingProblems.length > 0 ? (
                <div className="space-y-2.5">
                  {savedCodingProblems.map(q => (
                    <div key={q.id} className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-aurora-text-primary">{q.title}</div>
                        <div className="flex items-center gap-2 text-[10px] text-aurora-text-secondary mt-0.5">
                          <span className={`font-bold ${
                            q.difficulty === 'Easy' ? 'text-emerald-500' : q.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                          }`}>
                            {q.difficulty}
                          </span>
                          <span>•</span>
                          <span>{q.topic}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigateToCodingProblem(q.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs transition-all shadow-sm"
                      >
                        Solve Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-2xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary text-xs">
                  No coding problems bookmarked yet. Click the bookmark icon in Coding Arena to save problems here.
                </div>
              )}
            </div>

            {/* Bookmarked Lessons */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FA4616]" />
                  <span>Bookmarked Curriculum Lessons ({safeBookmarkedConcepts.length})</span>
                </h2>
                <span className="text-[10px] text-aurora-text-secondary">Saved from Workspace</span>
              </div>

              {safeBookmarkedConcepts.length > 0 ? (
                <div className="space-y-2.5">
                  {safeBookmarkedConcepts.map(b => (
                    <div key={b.id} className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-aurora-text-primary">{b.title}</div>
                        <div className="text-[10px] text-aurora-text-secondary mt-0.5">
                          Day {b.dayNumber} {b.snippet ? `• ${b.snippet}` : ''}
                        </div>
                      </div>
                      <button
                        onClick={() => navigateToDay(b.dayNumber, b.topicId)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs transition-all shadow-sm"
                      >
                        Jump to Lesson
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-2xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary text-xs">
                  No lessons bookmarked yet. Click the bookmark button in any lesson workspace to access them here.
                </div>
              )}
            </div>

            {/* Saved Interview Questions */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#FA4616]" />
                  <span>Saved High-Yield Interview Questions ({(profile.savedInterviewQuestions || []).length})</span>
                </h2>
                <span className="text-[10px] text-aurora-text-secondary">Quick revision flashcards</span>
              </div>

              <div className="space-y-3">
                {(profile.savedInterviewQuestions || []).length > 0 ? (
                  (profile.savedInterviewQuestions || []).map(q => (
                    <div key={q.id} className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold text-xs sm:text-sm text-aurora-text-primary">{q.question}</span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shrink-0">
                          {q.frequency}
                        </span>
                      </div>
                      <p className="text-[11px] text-aurora-text-secondary leading-relaxed bg-aurora-bg-elevated p-3 rounded-xl border border-aurora-border/60">
                        {q.answerSummary}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center rounded-2xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary text-xs">
                    No saved interview questions yet. Bookmark questions during interview practice to review them here.
                  </div>
                )}
              </div>
            </div>

            {/* Personal Notes */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#FA4616]" />
                  <span>Personal Workspace Notes ({Object.keys(safeNotes).length})</span>
                </h2>
                <span className="text-[10px] text-aurora-text-secondary">Synced across sessions</span>
              </div>

              {Object.keys(safeNotes).length > 0 ? (
                <div className="space-y-2.5">
                  {Object.entries(safeNotes).map(([key, content]) => (
                    <div key={key} className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-aurora-text-primary capitalize">{key.replace(/-/g, ' ')}</span>
                        <span className="text-[10px] text-aurora-text-secondary">{content.length} characters</span>
                      </div>
                      <p className="text-[11px] text-aurora-text-secondary line-clamp-2 leading-relaxed">
                        {content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-2xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary text-xs">
                  No notes written yet. Use the Notes Editor in any workspace day to capture insights.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* TAB 5: SETTINGS & ACCOUNT                               */}
        {/* ------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#FA4616]" />
                <span>Notification & Reminder Preferences</span>
              </h2>

              <div className="space-y-3">
                {[
                  { key: 'dailyStudyReminder', label: 'Daily Study Goal Reminder', desc: 'Alert at 8:00 PM if daily focus minutes are unfulfilled' },
                  { key: 'streakAlerts', label: 'Streak Saver Warnings', desc: 'Urgent notification if streak is at risk of expiring' },
                  { key: 'weeklyProgressDigest', label: 'Weekly Placement Readiness Report', desc: 'Summary of coding challenges, mock interviews, and ATS metrics' },
                  { key: 'mockInterviewTips', label: 'Daily Interview Question of the Day', desc: 'High-frequency question from top tech companies' }
                ].map(item => {
                  const k = item.key as keyof StudentExtendedProfile['notifications'];
                  const isChecked = Boolean(profile.notifications?.[k]);
                  return (
                    <div key={item.key} className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-aurora-text-primary">{item.label}</div>
                        <div className="text-[10px] text-aurora-text-secondary">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(k)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                          isChecked ? 'bg-[#FA4616]' : 'bg-aurora-bg-elevated border border-aurora-border'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Theme Preferences */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#FA4616]" />
                <span>Theme & Visual Styling</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={() => {
                    if (theme !== 'dark') toggleTheme();
                  }}
                  className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                    theme === 'dark'
                      ? 'border-[#FA4616] bg-[#FA4616]/10 text-aurora-text-primary font-bold shadow-sm'
                      : 'border-aurora-border bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  <Moon className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold">LeetCode Dark Mode</div>
                    <div className="text-[10px] opacity-70">High contrast for long coding</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (theme !== 'light') toggleTheme();
                  }}
                  className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                    theme === 'light'
                      ? 'border-[#FA4616] bg-[#FA4616]/10 text-aurora-text-primary font-bold shadow-sm'
                      : 'border-aurora-border bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-bold">Crisp Light Mode</div>
                    <div className="text-[10px] opacity-70">Clear daytime reading contrast</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FA4616]" />
                <span>Privacy & Peer Visibility</span>
              </h2>

              <div className="space-y-3">
                {[
                  { key: 'isProfilePublic', label: 'Public Student Profile', desc: 'Allows recruiters and mentors to view your portfolio and badges' },
                  { key: 'showOnLeaderboard', label: 'Leaderboard Ranking Visibility', desc: 'Display your streak and solved questions count on the peer board' },
                  { key: 'shareActivityWithPeers', label: 'Share Study Activity', desc: 'Show completed topics and badges on public peer feed' },
                  { key: 'allowAiPersonalization', label: 'Personalized AI Guidance', desc: 'Permit AI Copilot to analyze quiz logs for tailored guidance' }
                ].map(item => {
                  const k = item.key as keyof StudentExtendedProfile['privacy'];
                  const isChecked = Boolean(profile.privacy?.[k]);
                  return (
                    <div key={item.key} className="p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-aurora-text-primary">{item.label}</div>
                        <div className="text-[10px] text-aurora-text-secondary">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => handlePrivacyToggle(k)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                          isChecked ? 'bg-[#FA4616]' : 'bg-aurora-bg-elevated border border-aurora-border'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account Settings & Security Details */}
            <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-sm sm:text-base text-aurora-text-primary flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#FA4616]" />
                  <span>Account Security & Database ID</span>
                </h2>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Google Single Sign-On Active
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-aurora-bg-surface border border-aurora-border">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-aurora-text-secondary font-semibold">Unique Database User ID</span>
                  <button
                    onClick={handleCopyId}
                    className="flex items-center gap-1 text-[#FA4616] hover:underline font-mono text-[11px]"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-aurora-text-primary select-all break-all bg-aurora-bg-elevated p-2.5 rounded-xl border border-aurora-border/60">
                  {effectiveUser.id}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                <button
                  onClick={() => {
                    const data = exportUserStorageJSON(effectiveUser.id);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `seekhsetu_backup_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    showToast('Backup JSON downloaded successfully', 'success');
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs font-bold text-aurora-text-primary transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-blue-500" />
                  <span>Export JSON Backup</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Danger Zone: Delete Account */}
            <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="font-extrabold text-sm sm:text-base text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-rose-500" />
                    <span>Danger Zone: Delete Account & Data</span>
                  </h2>
                  <p className="text-[11px] text-aurora-text-secondary mt-0.5">
                    Permanently wipes your learning streak, coding submissions, notes, and local account records.
                  </p>
                </div>
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 5. AVATAR PICKER MODAL                                    */}
      {/* ========================================================= */}
      {isAvatarPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm sm:text-base text-aurora-text-primary">Choose Developer Avatar</h3>
              <button onClick={() => setIsAvatarPickerOpen(false)} className="text-aurora-text-secondary hover:text-aurora-text-primary">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {DEFAULT_AVATARS.map(av => (
                <button
                  key={av.id}
                  onClick={() => handleSelectAvatarPreset(av.id)}
                  className={`p-3 rounded-2xl bg-gradient-to-tr ${av.bg} flex flex-col items-center justify-center text-2xl shadow-sm hover:scale-105 transition-all ${
                    profile.avatar === av.id ? 'ring-2 ring-[#FA4616] scale-105' : ''
                  }`}
                >
                  <span>{av.emoji}</span>
                  <span className="text-[9px] text-white font-bold mt-1 line-clamp-1">{av.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-aurora-border">
              <input
                type="file"
                ref={avatarFileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleCustomAvatarUpload}
              />
              <button
                onClick={() => avatarFileInputRef.current?.click()}
                className="w-full py-2.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs font-bold text-aurora-text-primary flex items-center justify-center gap-2 transition-all"
              >
                <Upload className="w-3.5 h-3.5 text-[#FA4616]" />
                <span>Upload Custom Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. CERTIFICATE VIEWER MODAL                               */}
      {/* ========================================================= */}
      {activeCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl border-4 border-amber-500/40 relative space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                <span className="font-black text-xs uppercase tracking-widest text-slate-500">SeekhSetu Certified Placement Credential</span>
              </div>
              <button onClick={() => setActiveCertificate(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-3 py-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FA4616]">Certificate of Technical Mastery</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {profile.fullName}
              </h2>
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                has successfully demonstrated industry-grade proficiency in <strong className="text-slate-900">{activeCertificate.module}</strong> with a final assessment grade of <strong className="text-[#FA4616]">{activeCertificate.score}%</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Credential Verification ID</div>
                <div className="font-mono font-bold text-slate-800">{activeCertificate.credentialId}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold text-right">Date Issued</div>
                <div className="font-semibold text-slate-800 text-right">{activeCertificate.issueDate}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-400 font-mono">Verified by SeekhSetu Engineering Placement Council</span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. DELETE ACCOUNT CONFIRMATION DIALOG                     */}
      {/* ========================================================= */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-aurora-bg-elevated border border-rose-500/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-aurora-text-primary">Permanently Delete Account?</h3>
                <p className="text-[11px] text-aurora-text-secondary">This action cannot be reversed.</p>
              </div>
            </div>

            <p className="text-xs text-aurora-text-secondary leading-relaxed bg-aurora-bg-surface p-3.5 rounded-2xl border border-aurora-border">
              All your study records, coding submissions, personal notes, custom resume configurations, and {safeStreak}-day streak will be permanently cleared from this device and database session.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-aurora-bg-surface text-aurora-text-primary text-xs font-bold hover:bg-aurora-bg-surface/80"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
