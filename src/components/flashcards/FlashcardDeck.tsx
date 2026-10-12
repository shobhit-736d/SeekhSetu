import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  HelpCircle,
  Keyboard,
  Layers
} from 'lucide-react';
import { FlashcardItem, FlashcardMastery } from '../../types/roadmap';
import { useStudy } from '../../context/StudyContext';
import confetti from 'canvas-confetti';

interface FlashcardDeckProps {
  cards: FlashcardItem[];
  title?: string;
  subtitle?: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  title = "Active Recall Flashcard Deck",
  subtitle = "Flip to test your memory and rate your recall mastery."
}) => {
  const { flashcardMastery, updateFlashcardMastery, resetFlashcardDeck } = useStudy();

  const [deck, setDeck] = useState<FlashcardItem[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync deck when input cards change
  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [cards]);

  const currentCard = deck[currentIndex];

  // Calculate mastery distribution in current deck
  const deckMastery = {
    mastered: deck.filter(c => flashcardMastery[c.id] === 'mastered').length,
    familiar: deck.filter(c => flashcardMastery[c.id] === 'familiar').length,
    learning: deck.filter(c => flashcardMastery[c.id] === 'learning').length,
    unfamiliar: deck.filter(c => !flashcardMastery[c.id] || flashcardMastery[c.id] === 'unfamiliar').length
  };

  const masteryPercent = deck.length > 0
    ? Math.round(((deckMastery.mastered * 1 + deckMastery.familiar * 0.7 + deckMastery.learning * 0.3) / deck.length) * 100)
    : 0;

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentIndex, deck.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleRate = useCallback((status: FlashcardMastery) => {
    if (!currentCard) return;
    updateFlashcardMastery(currentCard.id, status);
    // Automatically advance to next card with brief feedback
    handleNext();
  }, [currentCard, updateFlashcardMastery, handleNext]);

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  // Keyboard navigation shortcuts (Space to flip, 1-4 to rate, Arrow keys to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRate('unfamiliar');
        if (e.key === '2') handleRate('learning');
        if (e.key === '3') handleRate('familiar');
        if (e.key === '4') handleRate('mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleRate, isFlipped]);

  if (!cards || cards.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
        <Layers className="w-8 h-8 text-aurora-text-secondary mx-auto mb-2" />
        <h3 className="text-sm font-bold text-white">No flashcards available in this deck</h3>
        <p className="text-xs text-aurora-text-secondary mt-1">
          Explore other study modules to practice active recall.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Deck Header & Studley-Style Mastery Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4 bubble-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-aurora-indigo/15 text-aurora-violet border border-aurora-indigo/30">
                Active Recall Deck
              </span>
              <span className="text-xs sm:text-sm font-semibold text-aurora-text-secondary">
                {deck.length} Study Cards
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-aurora-text-primary mt-1.5">
              {title}
            </h3>
            <p className="text-sm text-aurora-text-secondary mt-0.5">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary transition-colors"
              title="Shuffle Cards"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle</span>
            </button>

            <button
              onClick={() => resetFlashcardDeck(currentCard?.dayNumber)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary hover:text-amber-400 transition-colors"
              title="Reset Mastery Status"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Studley-Style Granular Mastery Progress Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-semibold">
            <span className="text-aurora-text-primary">
              Recall Mastery: <strong className="text-[#FA4616]">{masteryPercent}%</strong>
            </span>
            <div className="flex items-center gap-3 text-xs text-aurora-text-secondary flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> {deckMastery.mastered} Mastered</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1754D8]" /> {deckMastery.familiar} Familiar</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> {deckMastery.learning} Learning</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-500" /> {deckMastery.unfamiliar} New</span>
            </div>
          </div>

          {/* Segmented multi-colored bar */}
          <div className="w-full h-2.5 rounded-full bg-aurora-bg-surface overflow-hidden flex border border-aurora-border/60">
            <div style={{ width: `${(deckMastery.mastered / deck.length) * 100}%` }} className="bg-emerald-400 h-full transition-all duration-300" />
            <div style={{ width: `${(deckMastery.familiar / deck.length) * 100}%` }} className="bg-[#1754D8] h-full transition-all duration-300" />
            <div style={{ width: `${(deckMastery.learning / deck.length) * 100}%` }} className="bg-amber-400 h-full transition-all duration-300" />
            <div style={{ width: `${(deckMastery.unfamiliar / deck.length) * 100}%` }} className="bg-stone-600/50 h-full transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* 3D Flip Flashcard Main Canvas */}
      {!isCompleted && currentCard ? (
        <div className="space-y-4">
          {/* Card Counter & Tag */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-aurora-text-secondary px-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-aurora-text-primary">Card {currentIndex + 1} of {deck.length}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-elevated border border-aurora-border text-aurora-cyan">
                {currentCard.category}
              </span>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-aurora-text-secondary">
              <Keyboard className="w-4 h-4 text-aurora-indigo" />
              <span>Press <kbd className="font-mono text-xs px-1.5 py-0.5 bg-aurora-bg-elevated rounded border border-aurora-border">Space</kbd> to flip</span>
            </span>
          </div>

          {/* 3D Flipping Card Container */}
          <div
            onClick={handleFlip}
            className="w-full min-h-[340px] sm:min-h-[380px] perspective cursor-pointer group select-none"
          >
            <motion.div
              className="relative w-full min-h-[340px] sm:min-h-[380px] rounded-3xl p-6 sm:p-8 border border-aurora-border bg-aurora-bg-elevated/95 hover:border-aurora-indigo/50 transition-colors shadow-2xl flex flex-col justify-between"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* FRONT OF CARD */}
              <div
                className="w-full h-full flex flex-col justify-between"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FA4616] flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>Interview Prompt</span>
                    </span>
                    <span className="text-xs font-semibold text-aurora-text-secondary bg-aurora-bg-surface px-3 py-1 rounded-full border border-aurora-border">
                      Click to reveal answer
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-aurora-text-primary leading-relaxed mt-4">
                    {currentCard.front}
                  </h3>
                </div>

                <div className="pt-6 border-t border-aurora-border/60 flex items-center justify-between text-xs sm:text-sm text-aurora-text-secondary">
                  <span>Current Mastery: <strong className="text-aurora-text-primary capitalize">{flashcardMastery[currentCard.id] || 'Unfamiliar'}</strong></span>
                  <span className="text-[#FA4616] font-semibold group-hover:text-[#E03D0F] transition-colors flex items-center gap-1">
                    <span>Flip card</span>
                    <RotateCcw className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* BACK OF CARD (Rotated 180deg) */}
              <div
                className="absolute inset-0 p-6 sm:p-8 rounded-3xl bg-aurora-bg-surface/95 border border-[#FA4616]/40 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="space-y-3.5 overflow-y-auto max-h-[240px] pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Technical Architecture & Answer</span>
                    </span>
                    <span className="text-xs text-aurora-text-secondary">
                      Press 1-4 to rate
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-aurora-text-primary leading-relaxed">
                    {currentCard.back}
                  </p>

                  {currentCard.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs sm:text-sm text-[#FA4616] overflow-x-auto leading-relaxed">
                      <code>{currentCard.codeSnippet}</code>
                    </pre>
                  )}

                  <div className="p-3 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-xs sm:text-sm text-aurora-text-primary">
                    <strong className="text-[#FA4616]">Associate Key Takeaway: </strong>
                    {currentCard.keyTakeaway}
                  </div>
                </div>

                {/* Rating Bar on Back Face */}
                <div
                  onClick={e => e.stopPropagation()}
                  className="pt-4 border-t border-aurora-border/60"
                >
                  <div className="text-xs font-semibold text-aurora-text-secondary mb-2.5 text-center">
                    How well did you recall this concept?
                  </div>
                  <div className="grid grid-cols-4 gap-2.5">
                    <button
                      onClick={() => handleRate('unfamiliar')}
                      className="px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-500/15 border border-rose-500/40 text-rose-600 dark:text-rose-300 hover:bg-rose-500/25 transition-all flex flex-col items-center gap-0.5"
                    >
                      <span>Again</span>
                      <span className="text-xs opacity-60">[1]</span>
                    </button>
                    <button
                      onClick={() => handleRate('learning')}
                      className="px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-300 hover:bg-amber-500/25 transition-all flex flex-col items-center gap-0.5"
                    >
                      <span>Hard</span>
                      <span className="text-xs opacity-60">[2]</span>
                    </button>
                    <button
                      onClick={() => handleRate('familiar')}
                      className="px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1754D8]/15 border border-[#1754D8]/40 text-[#1754D8] hover:bg-[#1754D8]/25 transition-all flex flex-col items-center gap-0.5"
                    >
                      <span>Good</span>
                      <span className="text-xs opacity-60">[3]</span>
                    </button>
                    <button
                      onClick={() => handleRate('mastered')}
                      className="px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/25 transition-all flex flex-col items-center gap-0.5"
                    >
                      <span>Mastered</span>
                      <span className="text-xs opacity-60">[4]</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] text-[#FCF6F5] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              {isFlipped ? 'Show Question' : 'Flip to Answer'}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-aurora-bg-elevated border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Deck Completed View */
        <div className="p-8 text-center rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-2xl space-y-5 bubble-card">
          <div className="w-16 h-16 rounded-full bg-[#FA4616]/20 border border-[#FA4616] flex items-center justify-center mx-auto text-[#FA4616] shadow-sm">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-aurora-text-primary">
              Deck Review Completed!
            </h3>
            <p className="text-sm text-aurora-text-secondary mt-1">
              You reviewed all {deck.length} flashcards in this session.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border text-sm space-y-2.5">
            <div className="flex items-center justify-between text-emerald-500 dark:text-emerald-400 font-bold">
              <span>Mastered Cards:</span>
              <span>{deckMastery.mastered}</span>
            </div>
            <div className="flex items-center justify-between text-[#1754D8] font-bold">
              <span>Familiar Cards:</span>
              <span>{deckMastery.familiar}</span>
            </div>
            <div className="flex items-center justify-between text-amber-500 dark:text-amber-400 font-bold">
              <span>Learning Cards:</span>
              <span>{deckMastery.learning}</span>
            </div>
            <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 font-bold">
              <span>Unfamiliar:</span>
              <span>{deckMastery.unfamiliar}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
                setIsCompleted(false);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] text-[#FCF6F5] shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#344052] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review Deck Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
