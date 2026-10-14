import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { StudyDay, MCQQuestion, IncorrectQuestionItem } from '../../types/roadmap';
import { useStudy } from '../../context/StudyContext';
import confetti from 'canvas-confetti';

interface DayAssessmentModalProps {
  day: StudyDay;
  isOpen: boolean;
  onClose: () => void;
}

export const DayAssessmentModal: React.FC<DayAssessmentModalProps> = ({ day, isOpen, onClose }) => {
  const { recordQuizAttempt, showToast } = useStudy();
  const questions: MCQQuestion[] = day.finalAssessmentQuestions || [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const currentQ = questions[currentIdx];

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Finish quiz
      let calculatedScore = 0;
      const incorrectItems: IncorrectQuestionItem[] = [];

      questions.forEach((q, idx) => {
        const userChoice = selectedAnswers[idx];
        if (userChoice === q.correctAnswer) {
          calculatedScore += 1;
        } else {
          incorrectItems.push({
            questionId: q.id,
            dayNumber: day.dayNumber,
            topicTitle: day.title,
            question: q.question,
            code: q.code,
            options: q.options,
            selectedAnswer: userChoice !== undefined ? userChoice : -1,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            date: new Date().toISOString()
          });
        }
      });

      const accuracy = Math.round((calculatedScore / questions.length) * 100);
      setScore(calculatedScore);
      setIsCompleted(true);

      recordQuizAttempt(
        {
          dayNumber: day.dayNumber,
          topicTitle: day.title,
          quizType: 'assessment',
          totalQuestions: questions.length,
          score: calculatedScore,
          accuracy,
          incorrectQuestionIds: incorrectItems.map(i => i.questionId)
        },
        incorrectItems
      );

      if (accuracy >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-aurora-bg-elevated border border-aurora-border rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-aurora-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FA4616]/15 border border-[#FA4616]/30 text-[#FA4616]">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-aurora-text-primary">
                Day {day.dayNumber} Assessment
              </h3>
              <p className="text-xs sm:text-sm text-aurora-text-secondary">
                {isCompleted ? 'Assessment Evaluation' : `Question ${currentIdx + 1} of ${questions.length}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isCompleted ? (
          <div className="py-6 space-y-5">
            {/* Question Text */}
            <h4 className="text-base sm:text-lg font-bold text-aurora-text-primary leading-relaxed">
              {currentQ.question}
            </h4>

            {currentQ.code && (
              <pre className="p-4 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs sm:text-sm text-aurora-text-primary overflow-x-auto leading-relaxed">
                <code>{currentQ.code}</code>
              </pre>
            )}

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-[#FA4616] bg-[#FA4616]/10 text-aurora-text-primary font-semibold shadow-sm ring-1 ring-[#FA4616]/30'
                        : 'border-aurora-border bg-aurora-bg-surface/50 text-aurora-text-primary hover:border-aurora-borderStrong hover:bg-aurora-bg-surface'
                    }`}
                  >
                    <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-[#FA4616] text-white border-[#FA4616]' : 'bg-aurora-bg-primary text-aurora-text-secondary border-aurora-border'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug break-words">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between pt-4 border-t border-aurora-border">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-aurora-text-secondary hover:text-aurora-text-primary disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'Submit Assessment'}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FA4616]/15 border border-[#FA4616]/30 flex items-center justify-center mx-auto text-[#FA4616] shadow-sm">
              <Trophy className="w-8 h-8 text-[#FA4616]" />
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-aurora-text-primary">
                Assessment Completed!
              </h4>
              <p className="text-sm sm:text-base text-aurora-text-secondary mt-1">
                You scored <strong className="text-[#FA4616]">{score}</strong> out of {questions.length} (
                {Math.round((score / questions.length) * 100)}% accuracy)
              </p>
            </div>

            {/* Question by question review */}
            <div className="text-left space-y-3 max-h-60 overflow-y-auto p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctAnswer;
                return (
                  <div key={idx} className="p-3.5 rounded-lg bg-aurora-bg-elevated border border-aurora-border/70 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 font-semibold text-aurora-text-primary mb-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0" />
                      )}
                      <span>Q{idx + 1}: {q.question}</span>
                    </div>
                    <div className="text-xs text-aurora-text-secondary pl-6">
                      Correct Answer: <strong className="text-emerald-500 dark:text-emerald-400">{q.options[q.correctAnswer]}</strong>
                    </div>
                    <div className="text-xs text-aurora-text-secondary pl-6 mt-1 leading-relaxed">
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-aurora-border text-aurora-text-primary hover:bg-aurora-bg-surface"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Assessment</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1754D8] hover:bg-[#1448b8] text-white shadow-md shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Finish & Return
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
