import React, { useState } from 'react';
import { Code, Lightbulb, Eye, EyeOff } from 'lucide-react';
import { CodingChallengeItem } from '../../types/roadmap';

export const CodingChallenge: React.FC<{ challenge: CodingChallengeItem }> = ({ challenge }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number | null>(null);

  return (
    <div className="my-6 rounded-2xl border border-aurora-border bg-aurora-bg-elevated p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-[#FA4616]">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                {challenge.title}
              </h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                challenge.difficulty === 'Easy'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : challenge.difficulty === 'Medium'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-xs text-aurora-text-secondary mt-1">
              {challenge.description}
            </p>
          </div>
        </div>
      </div>

      {/* Starter Code */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-aurora-text-secondary mb-1.5">
          Starter Code
        </div>
        <pre className="p-3.5 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs text-aurora-text-primary overflow-x-auto">
          <code>{challenge.starterCode}</code>
        </pre>
      </div>

      {/* Test Cases */}
      {challenge.testCases && challenge.testCases.length > 0 && (
        <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border/60">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#FA4616] mb-2">
            Target Test Cases
          </div>
          <div className="space-y-1.5">
            {challenge.testCases.map((tc, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-aurora-text-secondary gap-1">
                <span>Input: <strong className="text-white">{tc.input}</strong></span>
                <span className="text-emerald-400">Expected: {tc.output}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hints Accordion */}
      {challenge.hints && challenge.hints.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Progressive Hints</span>
          </div>
          <div className="space-y-1.5">
            {challenge.hints.map((hint, idx) => {
              const isRevealed = revealedHintIndex !== null && revealedHintIndex >= idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-aurora-border/60 bg-aurora-bg-surface/60 p-2.5 text-xs"
                >
                  {isRevealed ? (
                    <div className="text-aurora-text-primary">
                      <strong className="text-amber-400">Hint {idx + 1}: </strong>
                      {hint}
                    </div>
                  ) : (
                    <button
                      onClick={() => setRevealedHintIndex(idx)}
                      className="text-aurora-text-secondary hover:text-white font-medium flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reveal Hint {idx + 1}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Solution Reveal */}
      <div className="pt-2 border-t border-aurora-border/60">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 text-xs font-bold text-[#FA4616] hover:text-primary-hover transition-colors"
        >
          {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showSolution ? 'Hide Verified Solution' : 'View Verified Solution & Architecture'}</span>
        </button>

        {showSolution && (
          <div className="mt-3 space-y-3">
            <pre className="p-3.5 rounded-xl bg-aurora-bg-primary border border-emerald-500/30 font-mono text-xs text-emerald-200 overflow-x-auto">
              <code>{challenge.solution}</code>
            </pre>
            <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border/60 text-xs text-aurora-text-secondary leading-relaxed">
              <strong className="text-white">Solution Reasoning: </strong>
              {challenge.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
