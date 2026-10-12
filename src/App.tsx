import React, { useState, useEffect, useRef } from 'react';
import { StudyProvider, useStudy, ActiveTab } from './context/StudyContext';
import { AppShell } from './components/common/AppShell';
import { DashboardView } from './components/dashboard/DashboardView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { WorkspaceView } from './components/workspace/WorkspaceView';
import { PracticeArenaView } from './components/practice/PracticeArenaView';
import { FocusTimerView } from './components/timer/FocusTimerView';
import { RevisionCenterView } from './components/revision/RevisionCenterView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { PageTransitionLoader } from './components/common/PageTransitionLoader';
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
          {displayedTab === 'practice' && <PracticeArenaView />}
          {displayedTab === 'timer' && <FocusTimerView />}
          {displayedTab === 'revision' && <RevisionCenterView />}
          {displayedTab === 'analytics' && <AnalyticsView />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  return (
    <StudyProvider>
      {showInitialLoader ? (
        <InitialLoadingScreen onComplete={() => setShowInitialLoader(false)} />
      ) : (
        <AppShell>
          <MainView />
        </AppShell>
      )}
    </StudyProvider>
  );
}

export default App;
