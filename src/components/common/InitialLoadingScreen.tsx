import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coffee, Plane, Zap } from 'lucide-react';

interface InitialLoadingScreenProps {
  onComplete: () => void;
}

const FUNNY_QUIPS = [
  "☕ Infusing 500mg of emergency caffeine directly into the V8 Event Loop...",
  "✈️ Calibrating landing gear for high-salary job offer trajectory...",
  "🦆 Rubber duck is currently peer-reviewing your architecture...",
  "🐛 Bribing edge-case bugs with cookies so they stay hidden...",
  "⚡ Teaching React Fiber how to break the sound barrier...",
  "🚀 Packing 30 days of Full Stack wizardry into your associate brain...",
  "🎯 Aligning CSS flexbox so elements don't randomly fly away...",
  "✨ Almost ready for takeoff! Fasten your seatbelt..."
];

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(12);
  const [quipIndex, setQuipIndex] = useState(0);

  useEffect(() => {
    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 400);
          return 100;
        }
        const jump = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + jump, 100);
      });
    }, 180);

    // Rotate funny quips
    const quipInterval = setInterval(() => {
      setQuipIndex(prev => (prev + 1) % FUNNY_QUIPS.length);
    }, 650);

    return () => {
      clearInterval(progressInterval);
      clearInterval(quipInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#121111] text-[#FCF6F5] select-none"
      >
        {/* Ambient floating bubbles behind loader */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#FA4616]/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#1754D8]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-md w-full text-center space-y-6">
          {/* Animated Cartoon Pilot / Airplane Mascot */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-2, 3, -2]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut'
            }}
            className="relative w-36 h-36 mx-auto flex items-center justify-center"
          >
            {/* Pulsing Bubble Halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FA4616]/30 to-[#1754D8]/30 blur-md animate-ping" style={{ animationDuration: '3s' }} />
            
            {/* Mascot Container */}
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-[#1C1A1A] to-[#2A2424] border-2 border-[#FA4616] p-3 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              <motion.div
                animate={{ y: [-3, 3, -3], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute top-2 right-3 text-amber-400"
              >
                <Sparkles className="w-4 h-4 text-[#FA4616]" />
              </motion.div>

              {/* SeekhSetu Logo Emblem */}
              <img
                src="/brand/favicon_dark.png"
                alt="SeekhSetu Mascot"
                className="w-20 h-20 rounded-2xl object-cover shadow-lg transform -rotate-3 hover:rotate-0 transition-transform"
              />

              {/* Sparkles */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-2 left-3 text-amber-300"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FA4616]/15 border border-[#FA4616]/30 text-[#FA4616] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Bridge to Success • Full Stack Track</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              SeekhSetu
            </h2>
            <p className="text-sm font-semibold text-[#FA4616] tracking-wide">
              Learn Today Lead Tomorrow
            </p>
          </div>

          {/* Funny Speech Bubble Quip */}
          <div className="min-h-[56px] flex items-center justify-center px-4 py-3 rounded-2xl bg-[#1C1A1A] border border-white/10 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.p
                key={quipIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm font-medium text-amber-200/90 leading-snug"
              >
                {FUNNY_QUIPS[quipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="w-full bg-[#242020] rounded-full h-3 p-0.5 overflow-hidden border border-white/10 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FA4616] via-[#ED7649] to-[#1754D8] rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15 }}
              >
                {/* Little bubbly tip on progress bar */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />
              </motion.div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] px-1">
              <span>Checking fuel & brain cells...</span>
              <span className="font-bold text-[#FA4616]">{progress}%</span>
            </div>
          </div>

          {/* Fast Skip Button */}
          <div className="pt-2">
            <button
              onClick={onComplete}
              className="text-xs font-semibold text-[#A8A29E] hover:text-white underline underline-offset-4 transition-colors"
            >
              Skip countdown & enter SeekhSetu →
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
