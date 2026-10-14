import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { MCQQuestion } from '../../types/roadmap';

interface QuizCardProps {
  question: MCQQuestion;
  onAnswerSubmit?: (isCorrect: boolean, selectedOption: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    const isCorrect = selectedOption === question.correctAnswer;
    if (onAnswerSubmit) {
      onAnswerSubmit(isCorrect, selectedOption);
    }
  };

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="rounded-2xl border border-aurora-border bg-aurora-bg-elevated p-5 sm:p-6 shadow-sm space-y-4 my-4 bubble-card">
      {/* Question Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FA4616] px-2.5 py-1 rounded-full bg-[#FA4616]/10 border border-[#FA4616]/20">
            Check Your Understanding
          </span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-aurora-text-primary leading-relaxed">
          {question.question}
        </h4>
      </div>

      {/* Code snippet if question includes one */}
      {question.code && (
        <pre className="p-4 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs sm:text-sm text-aurora-text-primary overflow-x-auto leading-relaxed">
          <code>{question.code}</code>
        </pre>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctAnswer;

          let optionStyle = 'border-aurora-border bg-aurora-bg-surface/50 text-aurora-text-primary hover:border-aurora-borderStrong hover:bg-aurora-bg-surface';
          let badgeStyle = 'bg-aurora-bg-primary text-aurora-text-secondary border-aurora-border';

          if (isSubmitted) {
            if (isThisCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 font-semibold shadow-sm';
              badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
            } else if (isThisSelected && !isThisCorrect) {
              optionStyle = 'border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-100 font-semibold shadow-sm';
              badgeStyle = 'bg-rose-600 text-white border-rose-600';
            } else {
              optionStyle = 'border-aurora-border/40 opacity-50 text-aurora-text-muted';
            }
          } else if (isThisSelected) {
            optionStyle = 'border-[#FA4616] bg-[#FA4616]/10 text-aurora-text-primary font-semibold shadow-sm ring-1 ring-[#FA4616]/30';
            badgeStyle = 'bg-[#FA4616] text-white border-[#FA4616]';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(idx)}
              className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${optionStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${badgeStyle}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug break-words">{option}</span>
              </div>

              {isSubmitted && (
                <div className="shrink-0 ml-2">
                  {isThisCorrect && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct</span>
                    </span>
                  )}
                  {isThisSelected && !isThisCorrect && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
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

      {/* Action / Result */}
      <div className="pt-2">
        {!isSubmitted ? (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-aurora-text-secondary">
              Select an option above to verify
            </span>
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>Verify Answer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
          }`}>
            <div className="font-bold text-sm sm:text-base mb-1.5 flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">Correctly Analyzed!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span className="text-rose-700 dark:text-rose-300">Incorrect Selection</span>
                </>
              )}
            </div>
            <p className="text-aurora-text-secondary mt-1 text-xs sm:text-sm leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
