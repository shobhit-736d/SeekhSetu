import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { allFlashcards } from '../../data/flashcardsData';

export const ActiveRecallDeckWidget: React.FC = () => {
  const {
    navigateToDay,
    setActiveWorkspaceViewMode,
    flashcardMastery
  } = useStudy();

  const decks = [
    { module: 'javascript', name: 'JavaScript Engine & TDZ', dayNumber: 1, category: 'JavaScript' },
    { module: 'react', name: 'React Fiber & Hooks', dayNumber: 7, category: 'React' },
    { module: 'node', name: 'Node.js Libuv & Streams', dayNumber: 12, category: 'Node.js' },
    { module: 'sql', name: 'PostgreSQL ACID & Joins', dayNumber: 17, category: 'SQL' },
    { module: 'dsa', name: 'Two Pointers & Sliding Window', dayNumber: 21, category: 'DSA' },
    { module: 'interview-hr', name: 'UMPIRE & STAR Strategy', dayNumber: 29, category: 'Interview' }
  ];

  const handleLaunchDeck = (dayNumber: number) => {
    navigateToDay(dayNumber);
    setActiveWorkspaceViewMode('flashcards');
  };

  return (
    <div className="p-6 rounded-3xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FA4616]/10 text-[#FA4616] border border-[#FA4616]/20">
              Active Recall
            </span>
            <h3 className="text-base sm:text-lg font-display font-extrabold text-aurora-text-primary tracking-tight">
              Active Recall Flashcard Decks
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-aurora-text-secondary mt-1">
            Test cognitive retrieval and transition concepts from unfamiliar to mastered
          </p>
        </div>

        <button
          onClick={() => handleLaunchDeck(1)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FA4616] hover:text-[#FA4616]/80 transition-colors"
        >
          <span>All Decks</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map(deck => {
          const cardsInDeck = allFlashcards.filter(c => c.dayNumber === deck.dayNumber);
          const masteredCount = cardsInDeck.filter(c => flashcardMastery[c.id] === 'mastered').length;
          const familiarCount = cardsInDeck.filter(c => flashcardMastery[c.id] === 'familiar').length;
          const pct = cardsInDeck.length > 0 ? Math.round(((masteredCount + familiarCount * 0.7) / cardsInDeck.length) * 100) : 0;

          return (
            <div
              key={deck.module}
              onClick={() => handleLaunchDeck(deck.dayNumber)}
              className="p-5 rounded-2xl bg-aurora-bg-surface/80 border border-aurora-border hover:border-[#FA4616]/40 hover:bg-aurora-bg-surface transition-all cursor-pointer group flex flex-col justify-between bubble-card shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-elevated border border-aurora-border text-[#1754D8]">
                    Day {deck.dayNumber}
                  </span>
                  <span className="text-xs font-semibold text-aurora-text-secondary">
                    {cardsInDeck.length || 6} Cards
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors leading-snug">
                  {deck.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-aurora-border/60">
                <div className="flex items-center justify-between text-xs text-aurora-text-secondary mb-1.5">
                  <span>Recall Mastery</span>
                  <strong className="text-aurora-text-primary font-bold">{pct}%</strong>
                </div>

                <div className="w-full bg-aurora-bg-primary rounded-full h-2 overflow-hidden border border-aurora-border/40">
                  <div
                    className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2.5 text-xs font-bold text-[#FA4616] group-hover:text-primary-hover">
                  <span>Review Deck</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
