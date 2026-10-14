import React, { useState, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudyProvider, useStudy } from './context/StudyContext';
import { AppShell } from './components/common/AppShell';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { AuthGate } from './components/auth/AuthGate';
import { AnimatePresence, motion } from 'framer-motion';

// Code-split heavy views for optimal initial page load
const DashboardView = React.lazy(() => import('./components/dashboard/DashboardView').then(m => ({ default: m.DashboardView })));
const RoadmapView = React.lazy(() => import('./components/roadmap/RoadmapView').then(m => ({ default: m.RoadmapView })));
const WorkspaceView = React.lazy(() => import('./components/workspace/WorkspaceView').then(m => ({ default: m.WorkspaceView })));
const CodingArenaView = React.lazy(() => import('./components/coding/CodingArenaView').then(m => ({ default: m.CodingArenaView })));
const AptitudeView = React.lazy(() => import('./components/aptitude/AptitudeView').then(m => ({ default: m.AptitudeView })));
const CommunicationView = React.lazy(() => import('./components/communication/CommunicationView').then(m => ({ default: m.CommunicationView })));
const ResumeStudioView = React.lazy(() => import('./components/resume/ResumeStudioView').then(m => ({ default: m.ResumeStudioView })));
const PracticeArenaView = React.lazy(() => import('./components/practice/PracticeArenaView').then(m => ({ default: m.PracticeArenaView })));
const FocusTimerView = React.lazy(() => import('./components/timer/FocusTimerView').then(m => ({ default: m.FocusTimerView })));
const RevisionCenterView = React.lazy(() => import('./components/revision/RevisionCenterView').then(m => ({ default: m.RevisionCenterView })));
const AnalyticsView = React.lazy(() => import('./components/analytics/AnalyticsView').then(m => ({ default: m.AnalyticsView })));

// Code-split supporting pages
const AboutView = React.lazy(() => import('./components/pages/AboutView').then(m => ({ default: m.AboutView })));
const ContactView = React.lazy(() => import('./components/pages/ContactView').then(m => ({ default: m.ContactView })));
const FaqView = React.lazy(() => import('./components/pages/FaqView').then(m => ({ default: m.FaqView })));
const HelpView = React.lazy(() => import('./components/pages/HelpView').then(m => ({ default: m.HelpView })));
const FeedbackView = React.lazy(() => import('./components/pages/FeedbackView').then(m => ({ default: m.FeedbackView })));
const PrivacyPolicyView = React.lazy(() => import('./components/pages/PrivacyPolicyView').then(m => ({ default: m.PrivacyPolicyView })));
const TermsView = React.lazy(() => import('./components/pages/TermsView').then(m => ({ default: m.TermsView })));
const CookiePolicyView = React.lazy(() => import('./components/pages/CookiePolicyView').then(m => ({ default: m.CookiePolicyView })));
const AiDisclaimerView = React.lazy(() => import('./components/pages/AiDisclaimerView').then(m => ({ default: m.AiDisclaimerView })));
const GettingStartedView = React.lazy(() => import('./components/pages/GettingStartedView').then(m => ({ default: m.GettingStartedView })));

// Code-split modals
const AuthModal = React.lazy(() => import('./components/auth/AuthModal').then(m => ({ default: m.AuthModal })));
const UserProfileModal = React.lazy(() => import('./components/auth/UserProfileModal').then(m => ({ default: m.UserProfileModal })));
const AdminPortalModal = React.lazy(() => import('./components/admin/AdminPortalModal').then(m => ({ default: m.AdminPortalModal })));

const ViewLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
    <div className="w-6 h-6 border-2 border-[#FA4616] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs text-aurora-text-secondary font-mono">Loading module...</span>
  </div>
);

const isSupportingTab = (tab: string): boolean => {
  return [
    'about',
    'contact',
    'faq',
    'help',
    'feedback',
    'privacy-policy',
    'terms',
    'cookie-policy',
    'ai-disclaimer',
    'getting-started'
  ].includes(tab);
};

const SupportingView: React.FC = () => {
  const { activeTab } = useStudy();

  return (
    <Suspense fallback={<ViewLoadingFallback />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {activeTab === 'about' && <AboutView />}
          {activeTab === 'contact' && <ContactView />}
          {activeTab === 'faq' && <FaqView />}
          {activeTab === 'help' && <HelpView />}
          {activeTab === 'feedback' && <FeedbackView />}
          {activeTab === 'privacy-policy' && <PrivacyPolicyView />}
          {activeTab === 'terms' && <TermsView />}
          {activeTab === 'cookie-policy' && <CookiePolicyView />}
          {activeTab === 'ai-disclaimer' && <AiDisclaimerView />}
          {activeTab === 'getting-started' && <GettingStartedView />}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
};

const MainView: React.FC = () => {
  const { activeTab } = useStudy();

  return (
    <Suspense fallback={<ViewLoadingFallback />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'workspace' && <WorkspaceView />}
          {activeTab === 'coding' && <CodingArenaView />}
          {activeTab === 'aptitude' && <AptitudeView />}
          {activeTab === 'communication' && <CommunicationView />}
          {activeTab === 'resume' && <ResumeStudioView />}
          {activeTab === 'practice' && <PracticeArenaView />}
          {activeTab === 'timer' && <FocusTimerView />}
          {activeTab === 'revision' && <RevisionCenterView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { activeTab } = useStudy();
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  if (isLoading || showInitialLoader) {
    return <InitialLoadingScreen onComplete={() => setShowInitialLoader(false)} />;
  }

  const renderContent = () => {
    if (isSupportingTab(activeTab)) {
      return <SupportingView />;
    }
    return isAuthenticated ? <MainView /> : <AuthGate />;
  };

  return (
    <>
      <AppShell>
        {renderContent()}
      </AppShell>
      <Suspense fallback={null}>
        <AuthModal />
        <UserProfileModal />
        <AdminPortalModal />
      </Suspense>
    </>
  );
};

export function App() {
  return (
    <AuthProvider>
      <StudyProvider>
        <AppContent />
      </StudyProvider>
    </AuthProvider>
  );
}

export default App;
