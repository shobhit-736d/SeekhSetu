import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLoadingScreenProps {
  onComplete: () => void;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    // Fast, responsive startup progress
    const timer1 = setTimeout(() => setProgress(75), 80);
    const timer2 = setTimeout(() => setProgress(100), 200);
    const timer3 = setTimeout(() => {
      onComplete();
    }, 280);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-aurora-bg-primary text-aurora-text-primary select-none transition-colors duration-200"
      >
        <div className="relative z-10 max-w-xs w-full text-center space-y-5">
          {/* SeekhSetu Brand Emblem */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-aurora-bg-elevated border border-aurora-border p-2 shadow-sm flex items-center justify-center">
            <img
              src="/brand/favicon_dark.png"
              alt="SeekhSetu Logo"
              className="w-10 h-10 object-contain hidden dark:block"
            />
            <img
              src="/brand/favicon_light.png"
              alt="SeekhSetu Logo"
              className="w-10 h-10 object-contain block dark:hidden"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold font-display tracking-tight text-aurora-text-primary">
              Seekh<span className="text-[#FA4616]">Setu</span>
            </h1>
            <p className="text-xs text-aurora-text-secondary tracking-wide">
              Placement Preparation Operating System
            </p>
          </div>

          {/* Minimalist Progress Indicator */}
          <div className="w-full bg-aurora-bg-surface rounded-full h-1.5 overflow-hidden border border-aurora-border">
            <motion.div
              className="h-full bg-[#FA4616] rounded-full"
              initial={{ width: '20%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
