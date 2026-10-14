import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { practiceQuestionsBank, PracticeQuestion } from '../../data/practiceQuestions';
import { useStudy } from '../../context/StudyContext';
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Trophy,
  Filter,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticeArenaView: React.FC = () => {
  const { recordQuizAttempt, weakTopics } = useStudy();

  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  // User responses
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionResults, setSessionResults] = useState<Array<{ questionId: string; isCorrect: boolean; selected: number }>>([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return practiceQuestionsBank.filter(q => {
      if (selectedModule !== 'all' && q.module !== selectedModule) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      return true;
    });
  }, [selectedModule, selectedType]);

  const currentQ: PracticeQuestion | undefined = filteredQuestions[activeQuestionIdx];

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQ) return;
    setIsSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    setSessionResults(prev => [
      ...prev,
      { questionId: currentQ.id, isCorrect, selected: selectedAnswer }
    ]);
  };

  const handleNext = () => {
    if (activeQuestionIdx < filteredQuestions.length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      // Completed all questions in filter
      const total = sessionResults.length + (isSubmitted ? 0 : 0);
      const correct = sessionResults.filter(r => r.isCorrect).length;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

      setIsSessionComplete(true);

      recordQuizAttempt({
        quizType: 'practice-arena',
        totalQuestions: total,
        score: correct,
        accuracy,
        incorrectQuestionIds: sessionResults.filter(r => !r.isCorrect).map(r => r.questionId)
      });

      if (accuracy >= 80) {
        confetti({ particleCount: 70, spread: 60 });
      }
    }
  };

  const handleResetSession = () => {
    setActiveQuestionIdx(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowHint(false);
    setSessionResults([]);
    setIsSessionComplete(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card bubble-card">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA4616]/15 text-[#FA4616] text-xs font-bold border border-[#FA4616]/30 mb-2">
            <Target className="w-4 h-4 text-[#FA4616]" />
            Interview Simulation Arena
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
            Practice Arena & Question Bank
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary mt-1.5 leading-relaxed">
            Test your knowledge with output-prediction, tricky JavaScript coercions, React fiber reconciliation, and SQL queries.
          </p>
        </div>

        {/* Timed Mode Toggle */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setIsTimedMode(!isTimedMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
              isTimedMode
                ? 'bg-amber-500/20 border-amber-500 text-amber-500 dark:text-amber-300 shadow-lg'
                : 'bg-aurora-bg-surface border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{isTimedMode ? 'Timed Blitz Active' : 'Enable Timed Blitz'}</span>
          </button>
        </div>
      </div>

      {/* Weak Topics Warning Banner if detected */}
      {weakTopics.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>
              Targeted focus recommended: <strong>{weakTopics[0].topic}</strong> has accuracy below 75%.
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedModule('all');
              setSelectedType('all');
            }}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition-colors whitespace-nowrap"
          >
            Prioritize Review
          </button>
        </div>
      )}

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs sm:text-sm">
        {/* Module Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Subjects' },
            { id: 'javascript', label: 'JavaScript' },
            { id: 'react', label: 'React' },
            { id: 'node', label: 'Node & Express' },
            { id: 'sql', label: 'SQL / PG' },
            { id: 'dsa', label: 'DSA' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModule(m.id);
                setActiveQuestionIdx(0);
                setIsSubmitted(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedModule === m.id
                  ? 'bg-aurora-indigo text-white shadow-aurora-glow'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary bg-aurora-bg-surface'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Question Type Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={e => {
              setSelectedType(e.target.value);
              setActiveQuestionIdx(0);
              setIsSubmitted(false);
            }}
            className="bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs sm:text-sm rounded-lg px-3 py-2 outline-none focus:border-aurora-indigo font-medium"
          >
            <option value="all">All Question Formats</option>
            <option value="output">Output Prediction</option>
            <option value="mcq">Conceptual MCQ</option>
            <option value="debugging">Debugging & Anti-Patterns</option>
          </select>
        </div>
      </div>

      {/* Main Question Player or Session Complete Screen */}
      {!isSessionComplete && currentQ ? (
        <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card space-y-5 bubble-card">
          {/* Progress & Metadata */}
          <div className="flex items-center justify-between gap-2 border-b border-aurora-border/60 pb-3.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-aurora-bg-surface border border-aurora-border text-aurora-cyan">
                Question {activeQuestionIdx + 1} of {filteredQuestions.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-aurora-indigo/15 border border-aurora-indigo/30 text-aurora-violet">
                {currentQ.topicTitle}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                currentQ.difficulty === 'Easy'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                  : currentQ.difficulty === 'Medium'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-300'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>

            {/* Hint toggle */}
            {currentQ.hint && !isSubmitted && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-500 dark:text-amber-300 hover:text-amber-400 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
            )}
          </div>

          {/* Hint view if active */}
          {showHint && !isSubmitted && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-700 dark:text-amber-200 leading-relaxed">
              <strong className="text-amber-600 dark:text-amber-300">Interview Hint: </strong>
              {currentQ.hint}
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Code block if any */}
          {currentQ.code && (
            <pre className="p-4 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs sm:text-sm text-aurora-text-primary overflow-x-auto leading-relaxed">
              <code>{currentQ.code}</code>
            </pre>
          )}

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isThisSelected = selectedAnswer === idx;
              const isThisCorrect = idx === currentQ.correctAnswer;

              let style = 'border-aurora-border bg-aurora-bg-surface text-aurora-text-secondary hover:border-aurora-indigo/50 hover:text-aurora-text-primary';

              if (isSubmitted) {
                if (isThisCorrect) {
                  style = 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold';
                } else if (isThisSelected && !isThisCorrect) {
                  style = 'border-red-500 bg-red-500/15 text-red-700 dark:text-red-300';
                } else {
                  style = 'border-aurora-border/40 opacity-40 text-aurora-text-secondary';
                }
              } else if (isThisSelected) {
                style = 'border-[#FA4616] bg-[#FA4616]/15 text-aurora-text-primary shadow-sm font-semibold';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isSubmitted && (
                    <div>
                      {isThisCorrect && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      )}
                      {isThisSelected && !isThisCorrect && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 dark:text-red-400">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner after submission */}
          {isSubmitted && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                : 'bg-red-500/10 border-red-500/40 text-red-800 dark:text-red-200'
            }`}>
              <div className="font-bold text-sm sm:text-base mb-1.5 flex items-center gap-2">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Accurate Output Prediction</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                    <span className="text-red-600 dark:text-red-400">Incorrect Analysis</span>
                  </>
                )}
              </div>
              <p className="text-aurora-text-secondary mt-1 text-sm leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-3.5 border-t border-aurora-border">
            <span className="text-xs sm:text-sm text-aurora-text-secondary font-medium">
              Session Score: {sessionResults.filter(r => r.isCorrect).length}/{sessionResults.length}
            </span>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>{activeQuestionIdx < filteredQuestions.length - 1 ? 'Next Question' : 'Complete Session'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : isSessionComplete ? (
        /* Session Complete Card */
        <div className="p-8 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card space-y-5 bubble-card">
          <div className="w-16 h-16 rounded-full bg-[#FA4616]/20 border border-[#FA4616] flex items-center justify-center mx-auto text-[#FA4616] shadow-sm">
            <Trophy className="w-8 h-8 text-[#FA4616]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-aurora-text-primary">
              Practice Session Completed!
            </h2>
            <p className="text-sm text-aurora-text-secondary mt-1">
              You answered <strong className="text-[#FA4616]">{sessionResults.filter(r => r.isCorrect).length}</strong> correctly out of {sessionResults.length} questions (
              {Math.round((sessionResults.filter(r => r.isCorrect).length / sessionResults.length) * 100)}% accuracy).
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetSession}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Arena</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border bubble-card">
          <Filter className="w-10 h-10 text-aurora-text-secondary mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary">No questions found for this filter</h3>
          <button
            onClick={() => {
              setSelectedModule('all');
              setSelectedType('all');
            }}
            className="mt-4 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};
