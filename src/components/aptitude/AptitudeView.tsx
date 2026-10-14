import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { aptitudeQuestionsBank } from '../../data/aptitudeQuestionsData';
import { AptitudeCategory, AptitudeQuestion } from '../../types/placement';
import { useStudy } from '../../context/StudyContext';
import { AptitudeMockTestModal } from './AptitudeMockTestModal';
import {
  Brain,
  Calculator,
  Compass,
  BookOpen,
  PieChart,
  Puzzle,
  Building2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Clock,
  Trophy,
  Filter,
  Sparkles,
  Zap,
  RotateCcw,
  Search
} from 'lucide-react';

export const AptitudeView: React.FC = () => {
  const {
    aptitudeAttempts,
    recordAptitudeAttempt,
    setIsAiDrawerOpen,
    setAiCurrentContext
  } = useStudy();

  const [selectedCategory, setSelectedCategory] = useState<AptitudeCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Practice state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  // Mock Test Modal State
  const [mockModalConfig, setMockModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    category: string;
    questions: AptitudeQuestion[];
    duration: number;
  }>({
    isOpen: false,
    title: '',
    category: '',
    questions: [],
    duration: 15
  });

  const categories: Array<{ label: string; value: AptitudeCategory | 'All'; icon: any }> = [
    { label: 'All Modules', value: 'All', icon: Brain },
    { label: 'Quantitative Aptitude', value: 'Quantitative Aptitude', icon: Calculator },
    { label: 'Logical Reasoning', value: 'Logical Reasoning', icon: Compass },
    { label: 'Verbal Ability', value: 'Verbal Ability', icon: BookOpen },
    { label: 'Data Interpretation', value: 'Data Interpretation', icon: PieChart },
    { label: 'Puzzles & Analytical', value: 'Puzzles & Analytical', icon: Puzzle },
    { label: 'Company Mock Tests', value: 'Company Mock Test', icon: Building2 }
  ];

  const filteredQuestions = useMemo(() => {
    return aptitudeQuestionsBank.filter(q => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = q.question.toLowerCase().includes(query);
        const matchesTopic = q.subtopic.toLowerCase().includes(query);
        const matchesComp = (q.company || '').toLowerCase().includes(query);
        if (!matchesQ && !matchesTopic && !matchesComp) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (checkedAnswers[qId]) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleResetAnswer = (qId: string) => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setCheckedAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setExpandedExplanations(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleCheckAnswer = (q: AptitudeQuestion) => {
    const selected = selectedAnswers[q.id];
    if (selected === undefined) return;

    setCheckedAnswers(prev => ({ ...prev, [q.id]: true }));
    setExpandedExplanations(prev => ({ ...prev, [q.id]: true }));

    const isCorrect = selected === q.correctAnswer;
    recordAptitudeAttempt({
      category: q.category,
      subtopic: q.subtopic,
      totalQuestions: 1,
      score: isCorrect ? 1 : 0,
      accuracy: isCorrect ? 100 : 0,
      timeSpentSeconds: 45,
      incorrectQuestionIds: isCorrect ? [] : [q.id]
    });
  };

  const handleLaunchMock = (title: string, category: AptitudeCategory, filterSubtopic?: string) => {
    let testQs = aptitudeQuestionsBank.filter(q => q.category === category);
    if (filterSubtopic) {
      testQs = testQs.filter(q => q.subtopic.includes(filterSubtopic));
    }
    if (testQs.length < 3) {
      testQs = aptitudeQuestionsBank.slice(0, 5);
    }

    setMockModalConfig({
      isOpen: true,
      title,
      category,
      questions: testQs,
      duration: 10
    });
  };

  // Performance calculations from saved attempts
  const totalAttempts = aptitudeAttempts.length;
  const avgAccuracy = totalAttempts > 0
    ? Math.round(aptitudeAttempts.reduce((acc, a) => acc + a.accuracy, 0) / totalAttempts)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] dark:text-blue-400 text-xs font-semibold">
              <Brain className="w-3.5 h-3.5" />
              <span>Campus Placement Aptitude Accelerator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
              Aptitude & Reasoning Portal
            </h1>
            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
              Master Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Company-Style Placement Tests (TCS NQT, Infosys, Wipro, Accenture) with speed shortcut formulas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleLaunchMock('TCS NQT Full Cognitive Mock', 'Company Mock Test')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4" />
              <span>Start Timed Mock Test</span>
            </button>
          </div>
        </div>

        {/* Quick Performance Strip with clean semantic colors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-aurora-border">
          <div className="p-3 rounded-xl bg-aurora-bg-surface/50 border border-aurora-border/60">
            <span className="text-[11px] font-semibold text-aurora-text-secondary uppercase tracking-wider">Tests Attempted</span>
            <div className="text-xl font-bold font-mono text-aurora-text-primary mt-1">{totalAttempts}</div>
          </div>
          <div className="p-3 rounded-xl bg-aurora-bg-surface/50 border border-aurora-border/60">
            <span className="text-[11px] font-semibold text-aurora-text-secondary uppercase tracking-wider">Average Accuracy</span>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{avgAccuracy}%</div>
          </div>
          <div className="p-3 rounded-xl bg-aurora-bg-surface/50 border border-aurora-border/60">
            <span className="text-[11px] font-semibold text-aurora-text-secondary uppercase tracking-wider">Bank Scope</span>
            <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">{aptitudeQuestionsBank.length} Questions</div>
          </div>
          <div className="p-3 rounded-xl bg-aurora-bg-surface/50 border border-aurora-border/60">
            <span className="text-[11px] font-semibold text-aurora-text-secondary uppercase tracking-wider">Shortcut Formulas</span>
            <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">100% Covered</div>
          </div>
        </div>
      </div>

      {/* Featured Company Placement Mock Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary">
          High-Yield Company Placement Simulators
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'TCS NQT Cognitive Mock', company: 'TCS NQT', duration: '15 mins', qCount: '15 Qs', color: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/20' },
            { title: 'Infosys Pseudo-code & Logic', company: 'Infosys', duration: '15 mins', qCount: '12 Qs', color: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20' },
            { title: 'Wipro NLTH Quantitative', company: 'Wipro', duration: '15 mins', qCount: '14 Qs', color: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20' },
            { title: 'Accenture Critical Reasoning', company: 'Accenture', duration: '12 mins', qCount: '10 Qs', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' }
          ].map((mock, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl bg-aurora-bg-elevated border ${mock.border} shadow-sm space-y-3 transition-colors`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${mock.color}`}>{mock.company}</span>
                <span className="text-[11px] text-aurora-text-secondary flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {mock.duration}
                </span>
              </div>
              <h4 className="font-bold text-sm text-aurora-text-primary tracking-tight">{mock.title}</h4>
              <button
                onClick={() => handleLaunchMock(mock.title, 'Company Mock Test')}
                className="w-full py-2.5 rounded-xl bg-aurora-bg-surface hover:bg-[#FA4616] hover:text-white border border-aurora-border text-xs font-semibold text-aurora-text-primary transition-colors text-center"
              >
                Launch Simulator
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Categories & Filter Bar */}
      <div className="p-4 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3 shadow-sm">
        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map(c => {
            const Icon = c.icon;
            const isSelected = selectedCategory === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'bg-aurora-bg-surface text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface/80 border border-aurora-border'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Difficulty Filter */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-aurora-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by topic, formula, question text, or company..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-semibold text-aurora-text-primary outline-none focus:border-[#FA4616] transition-colors"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button
              onClick={() => {
                setAiCurrentContext({ page: 'aptitude' });
                setIsAiDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/30 text-[#FA4616] hover:bg-[#FA4616]/20 text-xs font-semibold transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Formula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modernized Question Cards List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-aurora-text-secondary rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
            No aptitude questions match your current category and search filter.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const userSelected = selectedAnswers[q.id];
            const isChecked = !!checkedAnswers[q.id];
            const isCorrect = userSelected === q.correctAnswer;
            const isExpanded = !!expandedExplanations[q.id];

            return (
              <div
                key={q.id}
                className="p-5 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-5 transition-colors"
              >
                {/* Question Header & Metadata Bar */}
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-aurora-border/60 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-extrabold text-[#FA4616] uppercase tracking-wider bg-[#FA4616]/10 px-2.5 py-0.5 rounded-lg border border-[#FA4616]/20">
                      Question {idx + 1} of {filteredQuestions.length}
                    </span>
                    <span className="text-xs font-semibold text-aurora-text-secondary">
                      {q.subtopic}
                    </span>
                    {q.company && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                        {q.company}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isChecked && (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
                      }`}>
                        {isCorrect ? 'Solved • Correct' : 'Attempted • Incorrect'}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                {/* Question Statement */}
                <div className="text-base sm:text-lg font-medium text-aurora-text-primary leading-relaxed whitespace-pre-line">
                  {q.question}
                </div>

                {/* Modern Answer Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userSelected === optIdx;
                    let cardStyle = 'bg-aurora-bg-surface/50 border-aurora-border text-aurora-text-primary hover:border-aurora-borderStrong hover:bg-aurora-bg-surface';
                    let badgeStyle = 'bg-aurora-bg-primary text-aurora-text-secondary border-aurora-border';

                    if (isChecked) {
                      if (optIdx === q.correctAnswer) {
                        cardStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-semibold shadow-sm';
                        badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                      } else if (isSelected && !isCorrect) {
                        cardStyle = 'bg-rose-500/10 border-rose-500 text-rose-950 dark:text-rose-100 font-semibold shadow-sm';
                        badgeStyle = 'bg-rose-600 text-white border-rose-600';
                      } else {
                        cardStyle = 'bg-aurora-bg-surface/30 border-aurora-border/40 text-aurora-text-muted opacity-60';
                      }
                    } else if (isSelected) {
                      cardStyle = 'bg-[#FA4616]/10 border-[#FA4616] text-aurora-text-primary font-semibold shadow-sm ring-1 ring-[#FA4616]/30';
                      badgeStyle = 'bg-[#FA4616] text-white border-[#FA4616]';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isChecked}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`group p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border transition-colors ${badgeStyle}`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span className="leading-snug break-words">{opt}</span>
                        </div>
                        {isChecked && optIdx === q.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />
                        )}
                        {isChecked && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Question Action & Solution Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-aurora-border/60">
                  <div className="flex items-center gap-3">
                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckAnswer(q)}
                        disabled={userSelected === undefined}
                        className="px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-semibold text-xs sm:text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Correct Answer (+1)
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </span>
                        )}

                        <button
                          onClick={() => handleResetAnswer(q.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-xs text-aurora-text-secondary hover:text-aurora-text-primary transition-colors"
                          title="Try this question again"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="text-xs text-[#FA4616] font-semibold hover:underline flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>{isExpanded ? 'Hide Solution' : 'View Solution & Shortcut Trick'}</span>
                  </button>
                </div>

                {/* Structured Solution & Speed Trick Panel */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-3.5 text-xs sm:text-sm leading-relaxed transition-all">
                    <div>
                      <div className="font-bold text-aurora-text-primary mb-1">
                        Step-by-Step Explanation:
                      </div>
                      <p className="text-aurora-text-secondary whitespace-pre-line leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>

                    {q.formula && (
                      <div className="p-3 rounded-xl bg-aurora-bg-elevated border border-aurora-border font-mono text-xs text-amber-700 dark:text-amber-300">
                        <strong className="text-aurora-text-primary font-sans mr-2">Formula:</strong> {q.formula}
                      </div>
                    )}

                    {q.shortcutTrick && (
                      <div className="p-3 rounded-xl bg-[#FA4616]/10 border border-[#FA4616]/20 text-aurora-text-primary text-xs leading-relaxed">
                        <strong className="text-[#FA4616] mr-1.5">⚡ 5-Second Speed Trick:</strong> {q.shortcutTrick}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Timed Mock Test Modal */}
      {mockModalConfig.isOpen && (
        <AptitudeMockTestModal
          testTitle={mockModalConfig.title}
          category={mockModalConfig.category}
          questions={mockModalConfig.questions}
          durationMinutes={mockModalConfig.duration}
          onClose={() => setMockModalConfig(prev => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
};
