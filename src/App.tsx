import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudyProvider, useStudy, ActiveTab } from './context/StudyContext';
import { AppShell } from './components/common/AppShell';
import { DashboardView } from './components/dashboard/DashboardView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { WorkspaceView } from './components/workspace/WorkspaceView';
import { PracticeArenaView } from './components/practice/PracticeArenaView';
import { FocusTimerView } from './components/timer/FocusTimerView';
import { RevisionCenterView } from './components/revision/RevisionCenterView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { CodingArenaView } from './components/coding/CodingArenaView';
import { AptitudeView } from './components/aptitude/AptitudeView';
import { CommunicationView } from './components/communication/CommunicationView';
import { ResumeStudioView } from './components/resume/ResumeStudioView';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { PageTransitionLoader } from './components/common/PageTransitionLoader';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/auth/UserProfileModal';
import { AdminPortalModal } from './components/admin/AdminPortalModal';
import { AuthGate } from './components/auth/AuthGate';
import { AnimatePresence, motion } from 'framer-motion';

const MainView: React.FC = () => {
  const { activeTab } = useStudy();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTab, setDisplayedTab] = useState<ActiveTab>(activeTab);
  const previousTabRef = useRef<ActiveTab>(activeTab);

  // Trigger brief page transition loader when switching active tabs
  useEffect(() => {
    if (activeTab !== previousTabRef.current) {
      previousTabRef.current = activeTab;
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setDisplayedTab(activeTab);
        setIsTransitioning(false);
      }, 320);

      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning ? (
        <PageTransitionLoader key="page-loader" targetTab={activeTab} />
      ) : (
        <motion.div
          key={displayedTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {displayedTab === 'dashboard' && <DashboardView />}
          {displayedTab === 'roadmap' && <RoadmapView />}
          {displayedTab === 'workspace' && <WorkspaceView />}
          {displayedTab === 'coding' && <CodingArenaView />}
          {displayedTab === 'aptitude' && <AptitudeView />}
          {displayedTab === 'communication' && <CommunicationView />}
          {displayedTab === 'resume' && <ResumeStudioView />}
          {displayedTab === 'practice' && <PracticeArenaView />}
          {displayedTab === 'timer' && <FocusTimerView />}
          {displayedTab === 'revision' && <RevisionCenterView />}
          {displayedTab === 'analytics' && <AnalyticsView />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  if (isLoading || showInitialLoader) {
    return <InitialLoadingScreen onComplete={() => setShowInitialLoader(false)} />;
  }

  return (
    <>
      <AppShell>
        {isAuthenticated ? <MainView /> : <AuthGate />}
      </AppShell>
      <AuthModal />
      <UserProfileModal />
      <AdminPortalModal />
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
