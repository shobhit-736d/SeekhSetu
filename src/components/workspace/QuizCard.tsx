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
      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctAnswer;

          let optionStyle = 'border-aurora-border bg-aurora-bg-surface text-aurora-text-secondary hover:border-aurora-indigo/50 hover:text-aurora-text-primary';

          if (isSubmitted) {
            if (isThisCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 font-semibold';
            } else if (isThisSelected && !isThisCorrect) {
              optionStyle = 'border-red-500 bg-red-500/15 text-red-600 dark:text-red-300';
            } else {
              optionStyle = 'border-aurora-border/40 opacity-50 text-aurora-text-secondary';
            }
          } else if (isThisSelected) {
            optionStyle = 'border-[#FA4616] bg-[#FA4616]/15 text-aurora-text-primary shadow-sm font-semibold';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(idx)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all ${optionStyle}`}
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

      {/* Action / Result */}
      <div className="pt-2">
        {!isSubmitted ? (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-aurora-text-secondary">
              Select an option above to submit
            </span>
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] text-[#FCF6F5] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052] transition-all disabled:opacity-40 disabled:pointer-events-none hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              <span>Verify Answer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
              : 'bg-red-500/10 border-red-500/40 text-red-800 dark:text-red-200'
          }`}>
            <div className="font-bold text-sm sm:text-base mb-1.5 flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Correctly Analyzed!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400">Incorrect Selection</span>
                </>
              )}
            </div>
            <p className="text-aurora-text-secondary mt-1 text-sm leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
