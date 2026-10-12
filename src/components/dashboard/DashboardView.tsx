import React from 'react';
import { motion } from 'framer-motion';
import { DashboardHeader } from './DashboardHeader';
import { StudyMetric } from './StudyMetric';
import { PlacementReadinessWidget } from './PlacementReadinessWidget';
import { ActiveRecallDeckWidget } from './ActiveRecallDeckWidget';
import { VisualRoadmapPreview } from './VisualRoadmapPreview';
import { CompactFocusTimer } from './CompactFocusTimer';
import { UpcomingRevisions } from './UpcomingRevisions';
import { RecentActivityList } from './RecentActivityList';

export const DashboardView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Editorial Welcome & Hero CTA */}
      <DashboardHeader />

      {/* Primary Study Metric Cards */}
      <StudyMetric />

      {/* Campus Placement Preparation Hub */}
      <PlacementReadinessWidget />

      {/* Studley AI Inspired Active Recall Decks Showcase */}
      <ActiveRecallDeckWidget />

      {/* Main Grid: Asymmetric Layout with Focal Point */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Visual Roadmap Preview & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <VisualRoadmapPreview />
          <RecentActivityList />
        </div>

        {/* Right 1 Column: Focus Timer & Upcoming Revisions */}
        <div className="space-y-6">
          <CompactFocusTimer />
          <UpcomingRevisions />
        </div>
      </div>
    </motion.div>
  );
};
