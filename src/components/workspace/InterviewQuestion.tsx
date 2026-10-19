import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquareCode, Check, HelpCircle } from 'lucide-react';
import { InterviewQnA } from '../../types/roadmap';

export const InterviewQuestion: React.FC<{ qna: InterviewQnA }> = ({ qna }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-aurora-border bg-aurora-bg-surface/70 hover:border-aurora-indigo/40 transition-all overflow-hidden mb-3">
      {/* Header clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start justify-between p-4 text-left gap-3 group"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-1.5 rounded-lg bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20 mt-0.5 flex-shrink-0">
            <MessageSquareCode className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20">
                {qna.difficulty}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                {qna.frequency}
              </span>
            </div>
            <h5 className="text-xs sm:text-sm font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug">
              {qna.question}
            </h5>
          </div>
        </div>

        <div className="p-1 text-aurora-text-secondary group-hover:text-aurora-text-primary transition-colors">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-[#FA4616]' : ''
            }`}
          />
        </div>
      </button>

      {/* Expandable Answer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-aurora-border/60 bg-aurora-bg-elevated/60"
          >
            <div className="p-4 space-y-3 text-xs leading-relaxed">
              <div className="text-aurora-text-primary whitespace-pre-line">
                {qna.answer}
              </div>

              {qna.keyPoints && qna.keyPoints.length > 0 && (
                <div className="pt-2 border-t border-aurora-border/60">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FA4616] mb-2">
                    Key Points to State to the Interviewer
                  </div>
                  <ul className="space-y-1.5">
                    {qna.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-aurora-text-secondary">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
