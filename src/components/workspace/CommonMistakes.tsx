import React from 'react';
import { AlertTriangle, CheckCircle2, Bug } from 'lucide-react';
import { DebuggingExercise } from '../../types/roadmap';

export const CommonMistakes: React.FC<{ exercises: DebuggingExercise[] }> = ({ exercises }) => {
  if (!exercises || exercises.length === 0) return null;

  return (
    <div className="my-6 space-y-4">
      <div className="flex items-center gap-2">
        <Bug className="w-4 h-4 text-amber-500 dark:text-amber-400" />
        <h4 className="text-xs font-bold text-aurora-text-primary uppercase tracking-wider">
          Common Pitfalls & Debugging Labs
        </h4>
      </div>

      <div className="space-y-4">
        {exercises.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-aurora-border bg-aurora-bg-elevated p-4 sm:p-5 overflow-hidden"
          >
            <div className="text-xs font-bold text-aurora-text-primary mb-3">
              {item.title}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Broken Code */}
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 dark:bg-red-950/20 p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-semibold mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Buggy Anti-Pattern</span>
                  </div>
                  <pre className="text-xs font-mono text-red-700 dark:text-red-200 overflow-x-auto whitespace-pre-wrap">
                    <code>{item.brokenCode}</code>
                  </pre>
                </div>
              </div>

              {/* Fixed Code */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Fixed Production Code</span>
                  </div>
                  <pre className="text-xs font-mono text-emerald-700 dark:text-emerald-200 overflow-x-auto whitespace-pre-wrap">
                    <code>{item.fixedCode}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Bug Explanation */}
            <div className="mt-3 p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border/60 text-xs text-aurora-text-secondary">
              <strong className="text-amber-700 dark:text-amber-300">Why this fails: </strong>
              {item.bugExplanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
