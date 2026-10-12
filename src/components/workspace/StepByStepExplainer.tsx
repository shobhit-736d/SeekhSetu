import React, { useState } from 'react';
import { ChevronRight, ListOrdered } from 'lucide-react';

interface StepItem {
  step: number;
  title: string;
  description: string;
  codeSnippet?: string;
}

export const StepByStepExplainer: React.FC<{ steps: StepItem[] }> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-6 p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="w-4 h-4 text-[#FA4616]" />
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          Step-by-Step Architectural Trace
        </h4>
      </div>

      {/* Stepper tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-4 border-b border-aurora-border/60">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeStep === idx
                ? 'bg-[#FA4616] text-[#FCF6F5] shadow-sm'
                : 'text-aurora-text-secondary hover:text-white bg-aurora-bg-surface'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px] font-bold">
              {s.step}
            </span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Active step content */}
      <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border/60">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FA4616] mb-1">
          <span>Phase {steps[activeStep].step}:</span>
          <span>{steps[activeStep].title}</span>
        </div>
        <p className="text-xs text-aurora-text-secondary leading-relaxed">
          {steps[activeStep].description}
        </p>

        {steps[activeStep].codeSnippet && (
          <pre className="mt-3 p-3 rounded-lg bg-aurora-bg-primary text-xs font-mono text-aurora-text-primary overflow-x-auto">
            <code>{steps[activeStep].codeSnippet}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
