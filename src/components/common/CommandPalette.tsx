import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Clock, Target, ArrowRight, Flame } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { allDays } from '../../data/roadmapData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { navigateToDay, setActiveTab } = useStudy();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        quickActions: [
          { label: 'Open Coding Arena (LeetCode Style Problems)', action: () => { setActiveTab('coding'); onClose(); }, icon: Target },
          { label: 'Practice Placement Aptitude & Mock Tests', action: () => { setActiveTab('aptitude'); onClose(); }, icon: BookOpen },
          { label: 'AI Resume Studio & ATS Compatibility Checker', action: () => { setActiveTab('resume'); onClose(); }, icon: Target },
          { label: 'Interview Communication & 60s Voice Pitch', action: () => { setActiveTab('communication'); onClose(); }, icon: Target },
          { label: 'Start 25-min Focus Study Timer', action: () => { setActiveTab('timer'); onClose(); }, icon: Clock },
          { label: 'Review Starred Days & Notes Backlog', action: () => { setActiveTab('revision'); onClose(); }, icon: Flame },
        ],
        days: allDays.slice(0, 5),
        topics: []
      };
    }

    const q = query.toLowerCase();

    const matchedDays = allDays.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.moduleName.toLowerCase().includes(q) ||
      `day ${d.dayNumber}`.includes(q)
    );

    const matchedTopics: Array<{ dayNumber: number; topicId: string; topicTitle: string; moduleName: string }> = [];
    allDays.forEach(day => {
      day.topics.forEach(topic => {
        if (topic.title.toLowerCase().includes(q) || topic.summary.toLowerCase().includes(q)) {
          matchedTopics.push({
            dayNumber: day.dayNumber,
            topicId: topic.id,
            topicTitle: topic.title,
            moduleName: day.moduleName
          });
        }
      });
    });

    return {
      quickActions: [],
      days: matchedDays,
      topics: matchedTopics.slice(0, 8)
    };
  }, [query, setActiveTab, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-aurora-bg-elevated border border-aurora-border rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-aurora-border gap-3">
              <Search className="w-5 h-5 text-[#FA4616] flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search days, topics, algorithms, or concepts... (e.g. closures, ACID, day 1)"
                className="w-full bg-transparent text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-3.5 space-y-4">
              {/* Quick Actions if query empty */}
              {searchResults.quickActions.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Quick Actions
                  </div>
                  <div className="space-y-1">
                    {searchResults.quickActions.map((qa, idx) => {
                      const Icon = qa.icon;
                      return (
                        <button
                          key={idx}
                          onClick={qa.action}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#FA4616] group-hover:text-[#FA4616] transition-colors" />
                            <span>{qa.label}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-aurora-text-secondary group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matched Days */}
              {searchResults.days.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Study Days ({searchResults.days.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.days.map(day => (
                      <button
                        key={day.dayNumber}
                        onClick={() => {
                          navigateToDay(day.dayNumber);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 text-xs font-bold rounded bg-aurora-bg-surface border border-aurora-border text-[#FA4616]">
                            Day {day.dayNumber}
                          </span>
                          <span className="truncate">{day.title}</span>
                        </div>
                        <span className="text-xs text-aurora-text-secondary">
                          {day.estimatedMinutes}m
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Topics */}
              {searchResults.topics.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary px-2 mb-2">
                    Specific Lessons ({searchResults.topics.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.topics.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          navigateToDay(t.dayNumber, t.topicId);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold text-aurora-text-primary hover:bg-[#FA4616]/15 hover:text-[#FA4616] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <BookOpen className="w-4 h-4 text-[#FA4616] flex-shrink-0" />
                          <span className="truncate">{t.topicTitle}</span>
                        </div>
                        <span className="text-xs text-aurora-text-secondary whitespace-nowrap ml-2">
                          Day {t.dayNumber}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query && searchResults.days.length === 0 && searchResults.topics.length === 0 && (
                <div className="py-8 text-center text-sm text-aurora-text-secondary">
                  No matching lessons or days found for <span className="text-aurora-text-primary font-semibold">"{query}"</span>.
                </div>
              )}
            </div>

            {/* Footer with hint */}
            <div className="px-4 py-2.5 bg-aurora-bg-surface/50 border-t border-aurora-border flex items-center justify-between text-xs text-aurora-text-secondary">
              <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border font-mono text-xs">ESC</kbd> to close</span>
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border font-mono text-xs">Ctrl+K</kbd> anytime</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
