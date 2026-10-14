import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { AptitudeQuestion } from '../../types/placement';
import { useStudy } from '../../context/StudyContext';
import {
  Clock,
  Flag,
  ArrowRight,
  ArrowLeft,
  X,
  Trophy
} from 'lucide-react';

interface AptitudeMockTestModalProps {
  testTitle: string;
  category: string;
  questions: AptitudeQuestion[];
  durationMinutes: number;
  onClose: () => void;
}

export const AptitudeMockTestModal: React.FC<AptitudeMockTestModalProps> = ({
  testTitle,
  category,
  questions,
  durationMinutes,
  onClose
}) => {
  const { recordAptitudeAttempt } = useStudy();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState<{
    correctCount: number;
    total: number;
    accuracy: number;
    timeSpent: number;
  } | null>(null);

  const handleSubmitTest = useCallback(() => {
    let correct = 0;
    const incorrectIds: string[] = [];

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      } else {
        incorrectIds.push(q.id);
      }
    });

    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const timeSpent = durationMinutes * 60 - remainingSeconds;

    setScoreReport({
      correctCount: correct,
      total: questions.length,
      accuracy,
      timeSpent
    });
    setIsSubmitted(true);

    recordAptitudeAttempt({
      category: category as any,
      subtopic: testTitle,
      totalQuestions: questions.length,
      score: correct,
      accuracy,
      timeSpentSeconds: timeSpent,
      incorrectQuestionIds: incorrectIds
    });

    if (accuracy >= 70) {
      confetti({ particleCount: 80, spread: 60 });
    }
  }, [questions, selectedAnswers, durationMinutes, remainingSeconds, category, testTitle, recordAptitudeAttempt]);

  const submitRef = useRef(handleSubmitTest);
  submitRef.current = handleSubmitTest;

  // Countdown timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const toggleMarkReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };



  const currQ = questions[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-aurora-bg-surface border-b border-aurora-border flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-aurora-text-primary tracking-tight">
              {testTitle}
            </h3>
            <p className="text-[11px] text-aurora-text-secondary">
              Placement Simulation • {questions.length} Questions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold ${
                remainingSeconds < 120
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-aurora-bg-primary text-amber-600 dark:text-amber-300 border-aurora-border'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(remainingSeconds)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-elevated transition-colors"
              aria-label="Close test modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        {isSubmitted && scoreReport ? (
          /* Report Card View */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616] flex items-center justify-center mx-auto shadow-sm">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-display font-extrabold text-aurora-text-primary">
                Mock Assessment Completed!
              </h4>
              <p className="text-xs sm:text-sm text-aurora-text-secondary">
                {scoreReport.accuracy >= 75
                  ? 'Outstanding accuracy! You are placement-ready for this section.'
                  : 'Good attempt. Review incorrect questions below to solidify weak areas.'}
              </p>
            </div>

            {/* Score Grid with proper theme contrast */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                <span className="text-[10px] font-bold text-aurora-text-secondary uppercase">Score</span>
                <div className="text-xl font-mono font-extrabold text-aurora-text-primary mt-1">
                  {scoreReport.correctCount} / {scoreReport.total}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                <span className="text-[10px] font-bold text-aurora-text-secondary uppercase">Accuracy</span>
                <div className={`text-xl font-mono font-extrabold mt-1 ${scoreReport.accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {scoreReport.accuracy}%
                </div>
              </div>
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                <span className="text-[10px] font-bold text-aurora-text-secondary uppercase">Time Spent</span>
                <div className="text-xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {formatTime(scoreReport.timeSpent)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                <span className="text-[10px] font-bold text-aurora-text-secondary uppercase">Verdict</span>
                <div className="text-sm font-bold text-aurora-text-primary mt-2">
                  {scoreReport.accuracy >= 70 ? 'Shortlisted' : 'Revision Needed'}
                </div>
              </div>
            </div>

            {/* Review Question List */}
            <div className="space-y-4 text-left max-w-2xl mx-auto pt-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary">
                Detailed Answer Breakdown
              </h5>
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'} space-y-2 text-xs`}
                  >
                    <div className="flex items-center justify-between font-bold gap-2">
                      <span className="text-aurora-text-primary">Q{idx + 1}. {q.question}</span>
                      <span className={isCorrect ? 'text-emerald-600 dark:text-emerald-400 shrink-0' : 'text-rose-600 dark:text-rose-400 shrink-0'}>
                        {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                      </span>
                    </div>
                    <div className="text-aurora-text-secondary">
                      Your answer: <strong className="text-aurora-text-primary">{userAns !== undefined ? q.options[userAns] : 'Skipped'}</strong>
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400">
                      Correct answer: <strong>{q.options[q.correctAnswer]}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary text-[11px] leading-relaxed">
                      <strong className="text-aurora-text-primary font-semibold">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-semibold text-xs shadow-md transition-all"
              >
                Close & Return to Question Bank
              </button>
            </div>
          </div>
        ) : (
          /* Live Test Simulation View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Main Question Display */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-3 border-b border-aurora-border/60 pb-3">
                <span className="text-xs font-extrabold text-[#FA4616] uppercase tracking-wider bg-[#FA4616]/10 px-2.5 py-0.5 rounded-lg border border-[#FA4616]/20">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <button
                  onClick={toggleMarkReview}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    markedForReview[currentIdx]
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold'
                      : 'bg-aurora-bg-surface text-aurora-text-secondary border-aurora-border hover:text-aurora-text-primary'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-medium text-aurora-text-primary leading-relaxed">
                {currQ.question}
              </div>

              {/* Modernized Options */}
              <div className="space-y-3 pt-2">
                {currQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-[#FA4616]/10 border-[#FA4616] text-aurora-text-primary shadow-sm font-semibold ring-1 ring-[#FA4616]/30'
                          : 'bg-aurora-bg-surface/50 border-aurora-border text-aurora-text-primary hover:border-aurora-borderStrong hover:bg-aurora-bg-surface'
                      }`}
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border transition-colors ${
                        isSelected ? 'bg-[#FA4616] text-white border-[#FA4616]' : 'bg-aurora-bg-primary text-aurora-text-secondary border-aurora-border'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="leading-snug break-words">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-aurora-border/60">
                <button
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-aurora-text-secondary hover:text-aurora-text-primary disabled:opacity-40"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-aurora-bg-surface hover:bg-[#FA4616] hover:text-white border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-all shadow-sm"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Question Palette */}
            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-aurora-border bg-aurora-bg-surface/30 p-4 space-y-4">
              <h5 className="text-xs font-bold text-aurora-text-primary tracking-tight uppercase">
                Question Palette
              </h5>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, idx) => {
                  const isAns = selectedAnswers[idx] !== undefined;
                  const isMarked = !!markedForReview[idx];
                  const isCurrent = currentIdx === idx;

                  let colorClass = 'bg-aurora-bg-primary text-aurora-text-secondary border-aurora-border';
                  if (isMarked) colorClass = 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold';
                  else if (isAns) colorClass = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 font-bold';
                  if (isCurrent) colorClass += ' ring-2 ring-[#FA4616]';

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-8 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${colorClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-1.5 text-[11px] text-aurora-text-secondary pt-3 border-t border-aurora-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
                  <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-aurora-bg-primary border border-aurora-border" />
                  <span>Unanswered ({questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmitTest}
                  className="w-full py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-semibold text-xs shadow-md transition-all"
                >
                  Finish Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
