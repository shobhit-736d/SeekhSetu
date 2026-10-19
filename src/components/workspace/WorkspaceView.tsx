import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { getDayByNumber, allDays } from '../../data/roadmapData';
import { getFlashcardsByDay } from '../../data/flashcardsData';
import { TopicNavigator } from './TopicNavigator';
import { CodeExample } from './CodeExample';
import { StepByStepExplainer } from './StepByStepExplainer';
import { CommonMistakes } from './CommonMistakes';
import { InterviewQuestion } from './InterviewQuestion';
import { QuizCard } from './QuizCard';
import { CodingChallenge } from './CodingChallenge';
import { NotesEditor } from './NotesEditor';
import { DayAssessmentModal } from './DayAssessmentModal';
import { FlashcardDeck } from '../flashcards/FlashcardDeck';
import { AiCoachChat } from '../ai-coach/AiCoachChat';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Layers,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Bot,
  FileText,
  Target
} from 'lucide-react';

export const WorkspaceView: React.FC = () => {
  const {
    selectedDayNumber,
    setSelectedDayNumber,
    selectedTopicId,
    setSelectedTopicId,
    completedTopics,
    toggleTopicCompletion,
    studySessions,
    activeWorkspaceViewMode,
    setActiveWorkspaceViewMode
  } = useStudy();

  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

  const currentDay = getDayByNumber(selectedDayNumber) || getDayByNumber(1)!;

  // Active topic
  const activeTopic = currentDay.topics.find(t => t.id === selectedTopicId) || currentDay.topics[0];
  const activeTopicIdx = currentDay.topics.findIndex(t => t.id === activeTopic.id);

  // Compute actual spent study time on this day
  const dayStudyMinutes = studySessions
    .filter(s => s.dayNumber === currentDay.dayNumber)
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const isCurrentTopicDone = completedTopics[activeTopic.id] || false;

  // Flashcards for this day
  const dayFlashcards = getFlashcardsByDay(currentDay.dayNumber);

  const handlePrevTopic = () => {
    if (activeTopicIdx > 0) {
      setSelectedTopicId(currentDay.topics[activeTopicIdx - 1].id);
    } else if (currentDay.dayNumber > 1) {
      setSelectedDayNumber(currentDay.dayNumber - 1);
      const prevDay = getDayByNumber(currentDay.dayNumber - 1);
      if (prevDay && prevDay.topics.length > 0) {
        setSelectedTopicId(prevDay.topics[prevDay.topics.length - 1].id);
      }
    }
  };

  const handleNextTopic = () => {
    if (activeTopicIdx < currentDay.topics.length - 1) {
      setSelectedTopicId(currentDay.topics[activeTopicIdx + 1].id);
    } else if (currentDay.dayNumber < allDays.length) {
      setSelectedDayNumber(currentDay.dayNumber + 1);
      const nextDay = getDayByNumber(currentDay.dayNumber + 1);
      if (nextDay && nextDay.topics.length > 0) {
        setSelectedTopicId(nextDay.topics[0].id);
      }
    }
  };

  const studyModes: Array<{
    id: 'lesson' | 'flashcards' | 'quiz' | 'ai-coach' | 'notes';
    label: string;
    icon: any;
    badge?: string;
  }> = [
    { id: 'lesson', label: 'Interactive Lesson', icon: BookOpen },
    { id: 'flashcards', label: 'Active Recall Deck', icon: Layers, badge: `${dayFlashcards.length} Cards` },
    { id: 'quiz', label: 'Practice Quiz', icon: Target, badge: `${activeTopic.quizQuestions?.length || 0} Qs` },
    { id: 'ai-coach', label: 'AI Coach', icon: Bot, badge: 'Tutor' },
    { id: 'notes', label: 'Notes', icon: FileText }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Banner: Day Title, Learning Objectives & Studley-Inspired Study Set Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card bubble-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-aurora-bg-surface border border-aurora-border text-[#FA4616]">
                Day {currentDay.dayNumber} of 30
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#FA4616]/15 border border-[#FA4616]/30 text-[#FA4616]">
                {currentDay.moduleName}
              </span>
              {currentDay.isSevenDayTrack && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 dark:text-amber-300">
                  7-Day Fast Track
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
              {currentDay.title}
            </h1>

            <p className="text-sm sm:text-base text-aurora-text-secondary leading-relaxed max-w-3xl">
              {currentDay.primaryObjective}
            </p>
          </div>

          {/* Time Metrics & Assessment Trigger */}
          <div className="flex items-center gap-3 self-start lg:self-center flex-wrap">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-aurora-bg-surface border border-aurora-border text-left sm:text-right">
              <div className="text-xs font-bold text-aurora-text-secondary uppercase tracking-wider">
                Study Time
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-aurora-text-primary mt-0.5">
                {dayStudyMinutes}m <span className="text-aurora-text-secondary font-normal text-xs sm:text-sm">/ {currentDay.estimatedMinutes}m est.</span>
              </div>
            </div>

            <button
              onClick={() => setAssessmentModalOpen(true)}
              className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Day Assessment Quiz</span>
            </button>
          </div>
        </div>

        {/* Studley AI Inspired Unified Study Mode Switcher Bar */}
        <div className="mt-6 pt-4 border-t border-aurora-border/60 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          {studyModes.map(mode => {
            const Icon = mode.icon;
            const isActive = activeWorkspaceViewMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setActiveWorkspaceViewMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#FA4616] text-white shadow-md shadow-orange-500/20 border-transparent'
                    : 'bg-aurora-bg-surface/70 text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface border border-aurora-border/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-aurora-text-secondary'}`} />
                <span>{mode.label}</span>
                {mode.badge && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-aurora-bg-elevated text-aurora-text-secondary border border-aurora-border'
                  }`}>
                    {mode.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout: Left Navigator + Right Active Mode Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Topic Navigator */}
        <div className="lg:col-span-1 lg:sticky lg:top-20">
          <TopicNavigator
            day={currentDay}
            activeTopicId={activeTopic.id}
            onSelectTopic={id => setSelectedTopicId(id)}
            onOpenAssessment={() => setAssessmentModalOpen(true)}
          />
        </div>

        {/* Right Column: Active Study View Mode */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {/* 1. LESSON & ARCHITECTURE MODE */}
            {activeWorkspaceViewMode === 'lesson' && (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Lesson Header Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 bubble-card">
                  <div className="flex items-center justify-between gap-3 border-b border-aurora-border/60 pb-3.5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">
                        Topic {activeTopicIdx + 1} of {currentDay.topics.length}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-aurora-text-primary mt-1">
                        {activeTopic.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleTopicCompletion(activeTopic.id, currentDay.dayNumber)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                          isCurrentTopicDone
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                            : 'border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:border-aurora-indigo'
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${isCurrentTopicDone ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                        <span>{isCurrentTopicDone ? 'Topic Completed' : 'Mark Topic Done'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-aurora-text-primary leading-relaxed">
                    {activeTopic.summary}
                  </p>

                  {/* Core Definitions */}
                  {activeTopic.definitions && activeTopic.definitions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                      {activeTopic.definitions.map((def, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-aurora-bg-surface/90 border border-aurora-border/80 text-xs sm:text-sm"
                        >
                          <div className="font-bold text-[#FA4616] text-sm sm:text-base mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#FA4616]" />
                            <span>{def.term}</span>
                          </div>
                          <p className="text-aurora-text-secondary leading-relaxed">
                            {def.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Syntax-Highlighted Code Blocks */}
                {activeTopic.codeExamples && activeTopic.codeExamples.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                      <Layers className="w-4 h-4 text-[#FA4616]" />
                      <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                        Interactive Code Demonstrations & Engine Output
                      </h3>
                    </div>

                    {activeTopic.codeExamples.map((snippet, idx) => (
                      <CodeExample key={idx} snippet={snippet} />
                    ))}
                  </div>
                )}

                {/* Step-by-Step Architectural Stepper */}
                {activeTopic.stepByStep && activeTopic.stepByStep.length > 0 && (
                  <StepByStepExplainer steps={activeTopic.stepByStep} />
                )}

                {/* Common Mistakes & Debugging */}
                {activeTopic.commonMistakes && activeTopic.commonMistakes.length > 0 && (
                  <CommonMistakes exercises={activeTopic.commonMistakes} />
                )}

                {/* Practical Use Cases */}
                {activeTopic.practicalUseCases && activeTopic.practicalUseCases.length > 0 && (
                  <div className="p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 bubble-card">
                    <h4 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                      Production Use Cases & Industry Relevance
                    </h4>
                    <ul className="space-y-2.5">
                      {activeTopic.practicalUseCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-aurora-text-secondary leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-[#FA4616] mt-2 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical Interview Questions & Answers */}
                {activeTopic.interviewQuestions && activeTopic.interviewQuestions.length > 0 && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                        Associate Interview Q&A Bank ({activeTopic.interviewQuestions.length})
                      </h3>
                      <span className="text-xs text-aurora-text-secondary">Click to reveal expected answers</span>
                    </div>

                    {activeTopic.interviewQuestions.map(qna => (
                      <InterviewQuestion key={qna.id} qna={qna} />
                    ))}
                  </div>
                )}

                {/* Coding Challenges */}
                {activeTopic.codingChallenges && activeTopic.codingChallenges.length > 0 && (
                  <div className="space-y-3">
                    {activeTopic.codingChallenges.map(chal => (
                      <CodingChallenge key={chal.id} challenge={chal} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. FLASHCARD DECK (ACTIVE RECALL) MODE */}
            {activeWorkspaceViewMode === 'flashcards' && (
              <motion.div
                key="flashcards"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <FlashcardDeck
                  cards={dayFlashcards}
                  title={`Day ${currentDay.dayNumber} Active Recall Deck`}
                  subtitle={`Master core definitions and engine mechanics for ${currentDay.title}`}
                />
              </motion.div>
            )}

            {/* 3. PRACTICE QUIZ MODE */}
            {activeWorkspaceViewMode === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
                  <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary">
                    Day {currentDay.dayNumber} Knowledge Checkpoints
                  </h3>
                  <p className="text-sm text-aurora-text-secondary mt-1">
                    Test your understanding with instant feedback before taking the final assessment.
                  </p>
                </div>

                {activeTopic.quizQuestions && activeTopic.quizQuestions.length > 0 ? (
                  activeTopic.quizQuestions.map(q => (
                    <QuizCard key={q.id} question={q} />
                  ))
                ) : (
                  <div className="p-8 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-secondary">
                    No checkpoint questions for this specific topic. Take the Day Final Assessment!
                  </div>
                )}

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setAssessmentModalOpen(true)}
                    className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    Launch Full Day Assessment Quiz
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. AI INTERVIEW COACH MODE */}
            {activeWorkspaceViewMode === 'ai-coach' && (
              <motion.div
                key="ai-coach"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AiCoachChat day={currentDay} topicTitle={activeTopic.title} />
              </motion.div>
            )}

            {/* 5. PERSONAL NOTES & BOOKMARKS MODE */}
            {activeWorkspaceViewMode === 'notes' && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <NotesEditor dayNumber={currentDay.dayNumber} topic={activeTopic} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Topic Navigation Controls */}
          <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
            <button
              onClick={handlePrevTopic}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Previous Topic</span>
            </button>

            <button
              onClick={() => toggleTopicCompletion(activeTopic.id, currentDay.dayNumber)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isCurrentTopicDone
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                  : 'bg-aurora-indigo text-white shadow-aurora-glow'
              }`}
            >
              {isCurrentTopicDone ? 'Topic Completed ✓' : 'Complete Topic & Advance'}
            </button>

            <button
              onClick={handleNextTopic}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
            >
              <span>Next Topic</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Day Assessment Modal */}
      <DayAssessmentModal
        day={currentDay}
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
      />
    </motion.div>
  );
};
