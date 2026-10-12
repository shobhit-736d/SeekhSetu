import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { codingQuestionsList } from '../../data/codingQuestionsData';
import { CodingQuestion } from '../../types/placement';
import { useStudy } from '../../context/StudyContext';
import {
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Search,
  Flame,
  ArrowRight,
  Sparkles,
  Trophy
} from 'lucide-react';

interface CodingProblemListProps {
  onSelectProblem: (problem: CodingQuestion) => void;
}

export const CodingProblemList: React.FC<CodingProblemListProps> = ({ onSelectProblem }) => {
  const {
    solvedCodingQuestions,
    bookmarkedCodingQuestions,
    toggleBookmarkCodingQuestion,
    setIsAiDrawerOpen,
    setAiCurrentContext
  } = useStudy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved' | 'Bookmarked'>('All');

  const topics: Array<{ label: string; value: string; icon?: any }> = [
    { label: 'All Topics', value: 'All' },
    { label: 'Arrays', value: 'Arrays' },
    { label: 'Strings', value: 'Strings' },
    { label: 'Linked Lists', value: 'Linked Lists' },
    { label: 'Stacks & Queues', value: 'Stacks & Queues' },
    { label: 'Trees & Graphs', value: 'Trees & Graphs' },
    { label: 'Dynamic Programming', value: 'Dynamic Programming' },
    { label: 'Sorting & Searching', value: 'Sorting & Searching' },
    { label: 'SQL & Databases', value: 'SQL & Databases' }
  ];

  // Daily Challenge pick
  const dailyChallenge = codingQuestionsList[2] || codingQuestionsList[0];

  const filteredQuestions = useMemo(() => {
    return codingQuestionsList.filter(q => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesTag = q.tags.some(t => t.toLowerCase().includes(query));
        const matchesCompany = q.companies.some(c => c.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTag && !matchesCompany) return false;
      }

      // Topic
      if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;

      // Difficulty
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;

      // Status
      const isSolved = solvedCodingQuestions.includes(q.id);
      const isBookmarked = bookmarkedCodingQuestions.includes(q.id);
      if (statusFilter === 'Solved' && !isSolved) return false;
      if (statusFilter === 'Unsolved' && isSolved) return false;
      if (statusFilter === 'Bookmarked' && !isBookmarked) return false;

      return true;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty, statusFilter, solvedCodingQuestions, bookmarkedCodingQuestions]);

  const solvedCount = solvedCodingQuestions.length;
  const easySolved = codingQuestionsList.filter(q => q.difficulty === 'Easy' && solvedCodingQuestions.includes(q.id)).length;
  const medSolved = codingQuestionsList.filter(q => q.difficulty === 'Medium' && solvedCodingQuestions.includes(q.id)).length;
  const hardSolved = codingQuestionsList.filter(q => q.difficulty === 'Hard' && solvedCodingQuestions.includes(q.id)).length;

  const totalEasy = codingQuestionsList.filter(q => q.difficulty === 'Easy').length;
  const totalMed = codingQuestionsList.filter(q => q.difficulty === 'Medium').length;
  const totalHard = codingQuestionsList.filter(q => q.difficulty === 'Hard').length;

  return (
    <div className="space-y-6">
      {/* Daily Challenge Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-aurora-bg-elevated via-aurora-bg-surface to-aurora-bg-elevated border border-[#FA4616]/30 p-6 sm:p-7 shadow-lg bubble-card">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FA4616]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA4616]/15 border border-[#FA4616]/30 text-[#FA4616] text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>Daily Coding Challenge • +50 Placement XP</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-aurora-text-primary tracking-tight">
              {dailyChallenge.title}
            </h2>
            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
              Frequently asked in technical interviews at {dailyChallenge.companies.slice(0, 3).join(', ')}. Master Kadane’s dynamic approach in under 25 minutes.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                dailyChallenge.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : dailyChallenge.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {dailyChallenge.difficulty}
              </span>
              <span className="text-[11px] font-semibold text-aurora-text-secondary px-2.5 py-0.5 rounded-full bg-aurora-bg-primary border border-aurora-border">
                {dailyChallenge.topic}
              </span>
              <span className="text-[11px] text-aurora-text-secondary">
                Acceptance: {dailyChallenge.acceptanceRate}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectProblem(dailyChallenge)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-sm shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#344052] transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <span>Solve Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards: LeetCode Style Problem Progress */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-aurora-text-secondary mb-1">
            <span>TOTAL SOLVED</span>
            <Trophy className="w-4 h-4 text-[#FA4616]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-aurora-text-primary font-mono">
            {solvedCount} <span className="text-sm font-normal text-aurora-text-secondary">/ {codingQuestionsList.length}</span>
          </div>
          <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#FA4616] h-full rounded-full transition-all"
              style={{ width: `${Math.round((solvedCount / codingQuestionsList.length) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
            <span>EASY</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
              {Math.round((easySolved / (totalEasy || 1)) * 100)}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
            {easySolved} <span className="text-sm font-normal text-aurora-text-secondary">/ {totalEasy}</span>
          </div>
          <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${Math.round((easySolved / (totalEasy || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
            <span>MEDIUM</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20">
              {Math.round((medSolved / (totalMed || 1)) * 100)}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
            {medSolved} <span className="text-sm font-normal text-aurora-text-secondary">/ {totalMed}</span>
          </div>
          <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.round((medSolved / (totalMed || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-rose-400 mb-1">
            <span>HARD</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-rose-500/10 border border-rose-500/20">
              {Math.round((hardSolved / (totalHard || 1)) * 100)}%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
            {hardSolved} <span className="text-sm font-normal text-aurora-text-secondary">/ {totalHard}</span>
          </div>
          <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full"
              style={{ width: `${Math.round((hardSolved / (totalHard || 1)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search problem title, company (Google, Amazon, TCS), or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary focus:border-[#FA4616] outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary outline-none focus:border-[#FA4616]"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary outline-none focus:border-[#FA4616]"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
              <option value="Bookmarked">Bookmarked</option>
            </select>

            <button
              onClick={() => {
                setAiCurrentContext({ page: 'coding' });
                setIsAiDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/30 text-[#FA4616] hover:bg-[#FA4616]/20 text-xs font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Coach</span>
            </button>
          </div>
        </div>

        {/* Topic Horizontal Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {topics.map(t => (
            <button
              key={t.value}
              onClick={() => setSelectedTopic(t.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopic === t.value
                  ? 'bg-[#FA4616] text-white font-bold shadow-sm'
                  : 'bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface/80 border border-aurora-border'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Table List */}
      <div className="rounded-2xl border border-aurora-border bg-aurora-bg-elevated overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-aurora-border bg-aurora-bg-surface/70 text-aurora-text-secondary text-[11px] uppercase tracking-wider font-bold">
                <th className="py-3 px-4 w-12 text-center">Status</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Acceptance</th>
                <th className="py-3 px-4">Companies</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aurora-border/60">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-aurora-text-secondary">
                    No coding questions match your current filters. Try clearing search or topic.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const isSolved = solvedCodingQuestions.includes(q.id);
                  const isBookmarked = bookmarkedCodingQuestions.includes(q.id);

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-aurora-bg-surface/50 transition-colors group"
                    >
                      {/* Solved Status */}
                      <td className="py-3.5 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-aurora-border/80 mx-auto" />
                        )}
                      </td>

                      {/* Title & Tags */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectProblem(q)}
                            className="font-bold text-aurora-text-primary hover:text-[#FA4616] text-left transition-colors"
                          >
                            {idx + 1}. {q.title}
                          </button>
                          <button
                            onClick={() => toggleBookmarkCodingQuestion(q.id)}
                            className="text-aurora-text-secondary hover:text-[#FA4616] transition-colors p-0.5"
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-[#FA4616]" />
                            ) : (
                              <Bookmark className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                            )}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {q.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] text-aurora-text-secondary bg-aurora-bg-surface px-1.5 py-0.2 rounded border border-aurora-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-3.5 px-4 text-aurora-text-secondary font-medium">
                        {q.topic}
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                          q.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : q.difficulty === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Acceptance */}
                      <td className="py-3.5 px-4 text-aurora-text-secondary font-mono text-xs">
                        {q.acceptanceRate}%
                      </td>

                      {/* Companies */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {q.companies.slice(0, 2).map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] font-medium text-aurora-text-secondary bg-aurora-bg-surface px-1.5 py-0.5 rounded border border-aurora-border/60"
                            >
                              {c}
                            </span>
                          ))}
                          {q.companies.length > 2 && (
                            <span className="text-[10px] text-aurora-text-secondary self-center">
                              +{q.companies.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectProblem(q)}
                          className="px-3.5 py-1.5 rounded-xl bg-aurora-bg-surface hover:bg-[#FA4616] hover:text-white border border-aurora-border text-xs font-bold text-aurora-text-primary transition-all shadow-sm"
                        >
                          Solve
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
