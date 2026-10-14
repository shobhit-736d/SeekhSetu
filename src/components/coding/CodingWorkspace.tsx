import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import {
  CodingQuestion,
  SupportedLanguage,
  CodeExecutionResult
} from '../../types/placement';
import { CodeExecutionService } from '../../services/codeExecutionService';
import { useStudy } from '../../context/StudyContext';
import {
  ArrowLeft,
  Play,
  Send,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileText,
  History,
  Cpu,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check
} from 'lucide-react';

interface CodingWorkspaceProps {
  question: CodingQuestion;
  onBack: () => void;
}

export const CodingWorkspace: React.FC<CodingWorkspaceProps> = ({ question, onBack }) => {
  const {
    recordCodingSubmission,
    bookmarkedCodingQuestions,
    toggleBookmarkCodingQuestion,
    codingSubmissions,
    setIsAiDrawerOpen,
    setAiCurrentContext
  } = useStudy();

  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState<string>(question.starterTemplates.javascript);

  // Left Pane Active Tab
  const [activeLeftTab, setActiveLeftTab] = useState<'description' | 'hints' | 'solution' | 'submissions'>('description');

  // Bottom Console Active Tab
  const [activeConsoleTab, setActiveConsoleTab] = useState<'testcases' | 'runOutput' | 'submissionResults'>('testcases');

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<CodeExecutionResult | null>(null);
  const [submissionResult, setSubmissionResult] = useState<CodeExecutionResult | null>(null);

  // Active Testcase Index for tab
  const [activeTestcaseIdx, setActiveTestcaseIdx] = useState(0);

  // Revealed hints
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});

  // Copy code feedback
  const [copiedSolution, setCopiedSolution] = useState(false);

  // Sync starter template when language changes
  useEffect(() => {
    setCode(question.starterTemplates[language] || '');
  }, [language, question]);

  // Sync AI current context so the global doubt assistant is instantly aware of current code!
  useEffect(() => {
    setAiCurrentContext({
      page: 'coding',
      problemTitle: question.title,
      subtopic: question.topic,
      currentCode: code,
      language
    });
  }, [question, code, language, setAiCurrentContext]);

  const isBookmarked = bookmarkedCodingQuestions.includes(question.id);
  const pastSubmissions = codingSubmissions.filter(s => s.questionId === question.id);

  // Handle Run Code (Sample Test Cases)
  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveConsoleTab('runOutput');

    try {
      const result = await CodeExecutionService.executeCode(question, code, language, false);
      setRunResult(result);
    } catch (err: any) {
      setRunResult({
        status: 'Runtime Error',
        error: err.message || 'Execution failed',
        testCasesPassed: 0,
        totalTestCases: question.testCases.filter(t => !t.isHidden).length
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Handle Submit Solution (Sample + Hidden Test Cases)
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setActiveConsoleTab('submissionResults');

    try {
      const result = await CodeExecutionService.executeCode(question, code, language, true);
      setSubmissionResult(result);

      // Record in persistent storage
      recordCodingSubmission({
        questionId: question.id,
        questionTitle: question.title,
        difficulty: question.difficulty,
        topic: question.topic,
        language,
        code,
        status: result.status as any,
        runtimeMs: result.runtimeMs || 0,
        memoryKb: result.memoryKb || 0,
        testCasesPassed: result.testCasesPassed,
        totalTestCases: result.totalTestCases
      });

      if (result.status === 'Accepted') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setSubmissionResult({
        status: 'Runtime Error',
        error: err.message || 'Submission error',
        testCasesPassed: 0,
        totalTestCases: question.testCases.length
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetStarter = () => {
    if (window.confirm('Reset code to starter template? Your unsaved edits will be discarded.')) {
      setCode(question.starterTemplates[language]);
    }
  };

  const handleCopySolution = () => {
    const solCode = question.solution.code[language] || '';
    navigator.clipboard.writeText(solCode);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  const toggleHint = (idx: number) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] min-h-[700px] rounded-2xl border border-aurora-border bg-aurora-bg-primary overflow-hidden shadow-2xl">
      {/* Top Navbar */}
      <div className="px-4 py-2.5 bg-aurora-bg-elevated border-b border-aurora-border flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-surface transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Problem List</span>
          </button>

          <div className="h-4 w-[1px] bg-aurora-border" />

          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-aurora-text-primary tracking-tight">
              {question.title}
            </h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              question.difficulty === 'Easy'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : question.difficulty === 'Medium'
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
            }`}>
              {question.difficulty}
            </span>
          </div>

          <button
            onClick={() => toggleBookmarkCodingQuestion(question.id)}
            className="text-aurora-text-secondary hover:text-[#FA4616] p-1 transition-colors"
            title="Bookmark Problem"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-[#FA4616]" />
            ) : (
              <Bookmark className="w-4 h-4 opacity-50 hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Ask AI Contextual Coach */}
          <button
            onClick={() => {
              setAiCurrentContext({
                page: 'coding',
                problemTitle: question.title,
                subtopic: question.topic,
                currentCode: code,
                language
              });
              setIsAiDrawerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FA4616]/10 hover:bg-[#FA4616]/20 border border-[#FA4616]/30 text-[#FA4616] text-xs font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Coach</span>
          </button>

          {/* Language Selector */}
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as SupportedLanguage)}
            className="px-3 py-1.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs font-bold text-aurora-text-primary outline-none focus:border-[#FA4616]"
          >
            <option value="javascript">JavaScript (ES6)</option>
            <option value="python">Python 3</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++ 20</option>
            <option value="sql">SQL Query</option>
          </select>

          {/* Reset Template */}
          <button
            onClick={handleResetStarter}
            className="p-2 rounded-xl text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-surface transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Run Code */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-elevated border border-aurora-border text-xs font-bold text-aurora-text-primary transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 text-emerald-400 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          {/* Submit Solution */}
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid (Left Problem Info, Right Monaco Editor) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-aurora-border overflow-hidden">
        {/* Left Pane: Tabs (Description, Hints, Solution, Submissions) */}
        <div className="flex flex-col h-full bg-aurora-bg-secondary/40 overflow-hidden">
          {/* Left Tabs Header */}
          <div className="px-3 pt-2 bg-aurora-bg-surface/60 border-b border-aurora-border flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveLeftTab('description')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-bold transition-colors ${
                activeLeftTab === 'description'
                  ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                  : 'text-aurora-text-secondary hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setActiveLeftTab('hints')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-bold transition-colors ${
                activeLeftTab === 'hints'
                  ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                  : 'text-aurora-text-secondary hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Hints ({question.hints.length})</span>
            </button>

            <button
              onClick={() => setActiveLeftTab('solution')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-bold transition-colors ${
                activeLeftTab === 'solution'
                  ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                : 'text-aurora-text-secondary hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Editorial & Approach</span>
            </button>

            <button
              onClick={() => setActiveLeftTab('submissions')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-bold transition-colors ${
                activeLeftTab === 'submissions'
                  ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                  : 'text-aurora-text-secondary hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Submissions ({pastSubmissions.length})</span>
            </button>
          </div>

          {/* Left Tab Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs sm:text-sm">
            {/* Description Tab */}
            {activeLeftTab === 'description' && (
              <div className="space-y-4">
                <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-aurora-text-primary whitespace-pre-line">
                  {question.description}
                </div>

                {/* Example Cases */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-extrabold text-xs text-aurora-text-primary uppercase tracking-wider">
                    Examples
                  </h4>
                  {question.testCases.filter(tc => !tc.isHidden).map((tc, idx) => (
                    <div
                      key={tc.id}
                      className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border font-mono text-xs space-y-1.5"
                    >
                      <div className="text-aurora-text-secondary">
                        <strong className="text-white">Example {idx + 1}:</strong>
                      </div>
                      <div className="text-aurora-text-secondary">
                        <span className="text-aurora-text-primary font-bold">Input:</span> {tc.input}
                      </div>
                      <div className="text-aurora-text-secondary">
                        <span className="text-emerald-400 font-bold">Output:</span> {tc.expectedOutput}
                      </div>
                      {tc.explanation && (
                        <div className="text-[11px] text-aurora-text-secondary/80 font-sans pt-1 border-t border-aurora-border/60">
                          <strong>Explanation:</strong> {tc.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2 pt-2">
                  <h4 className="font-extrabold text-xs text-aurora-text-primary uppercase tracking-wider">
                    Constraints
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-aurora-text-secondary font-mono">
                    {question.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Hints Tab */}
            {activeLeftTab === 'hints' && (
              <div className="space-y-3">
                <p className="text-xs text-aurora-text-secondary">
                  Try solving the problem yourself first. Click to progressively reveal conceptual hints:
                </p>
                {question.hints.map((hint, idx) => {
                  const isRevealed = !!revealedHints[idx];
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border transition-all"
                    >
                      <button
                        onClick={() => toggleHint(idx)}
                        className="w-full flex items-center justify-between text-xs font-bold text-aurora-text-primary text-left"
                      >
                        <span className="flex items-center gap-2">
                          <Lightbulb className={`w-3.5 h-3.5 ${isRevealed ? 'text-amber-400' : 'text-aurora-text-secondary'}`} />
                          Hint {idx + 1}
                        </span>
                        <span className="text-[11px] text-[#FA4616]">
                          {isRevealed ? 'Hide' : 'Reveal'}
                        </span>
                      </button>
                      {isRevealed && (
                        <div className="mt-2.5 pt-2.5 border-t border-aurora-border text-xs text-aurora-text-secondary leading-relaxed">
                          {hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Solution Tab */}
            {activeLeftTab === 'solution' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                  <h4 className="font-bold text-sm text-[#FA4616] flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Optimal Approach
                  </h4>
                  <p className="text-xs text-aurora-text-secondary leading-relaxed">
                    {question.solution.approach}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                    <span className="text-[10px] font-bold text-aurora-text-secondary uppercase">Time Complexity</span>
                    <p className="text-xs font-mono font-bold text-emerald-400 mt-1">{question.solution.timeComplexity}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                    <span className="text-[10px] font-bold text-aurora-text-secondary uppercase">Space Complexity</span>
                    <p className="text-xs font-mono font-bold text-blue-400 mt-1">{question.solution.spaceComplexity}</p>
                  </div>
                </div>

                {/* Solution Code Snippet */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-aurora-text-secondary">
                      Optimal Code ({language})
                    </span>
                    <button
                      onClick={handleCopySolution}
                      className="flex items-center gap-1 text-[11px] text-[#FA4616] hover:underline"
                    >
                      {copiedSolution ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSolution ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{question.solution.code[language] || '// Solution for this language available on request.'}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeLeftTab === 'submissions' && (
              <div className="space-y-3">
                {pastSubmissions.length === 0 ? (
                  <div className="p-8 text-center text-aurora-text-secondary">
                    You have not submitted any solutions for this problem yet. Click Submit to run test cases.
                  </div>
                ) : (
                  pastSubmissions.map(sub => (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-extrabold ${sub.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {sub.status}
                          </span>
                          <span className="text-[11px] text-aurora-text-secondary font-mono">
                            {sub.language}
                          </span>
                        </div>
                        <div className="text-[10px] text-aurora-text-secondary mt-1 flex items-center gap-2">
                          <span>{new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span>•</span>
                          <span>Passed: {sub.testCasesPassed}/{sub.totalTestCases}</span>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs text-aurora-text-secondary">
                        <div>{sub.runtimeMs} ms</div>
                        <div className="text-[10px]">{Math.round(sub.memoryKb / 1024)} MB</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Monaco Code Editor + Bottom Console */}
        <div className="flex flex-col h-full bg-aurora-bg-primary overflow-hidden">
          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[350px] relative">
            <Editor
              height="100%"
              language={language === 'sql' ? 'sql' : language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={val => setCode(val || '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: '"JetBrains Mono", Consolas, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                automaticLayout: true,
                tabSize: 2
              }}
            />
          </div>

          {/* Bottom Console Tabs & Output Area */}
          <div className="h-64 border-t border-aurora-border bg-aurora-bg-elevated flex flex-col">
            {/* Console Tabs */}
            <div className="px-3 pt-2 bg-aurora-bg-surface/80 border-b border-aurora-border flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveConsoleTab('testcases')}
                  className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-colors ${
                    activeConsoleTab === 'testcases'
                      ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                      : 'text-aurora-text-secondary hover:text-white'
                  }`}
                >
                  Testcases
                </button>

                <button
                  onClick={() => setActiveConsoleTab('runOutput')}
                  className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-colors ${
                    activeConsoleTab === 'runOutput'
                      ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                      : 'text-aurora-text-secondary hover:text-white'
                  }`}
                >
                  Run Output {runResult && `(${runResult.status})`}
                </button>

                <button
                  onClick={() => setActiveConsoleTab('submissionResults')}
                  className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-colors ${
                    activeConsoleTab === 'submissionResults'
                      ? 'bg-aurora-bg-elevated text-aurora-text-primary border-t-2 border-[#FA4616]'
                      : 'text-aurora-text-secondary hover:text-white'
                  }`}
                >
                  Submission Result {submissionResult && `(${submissionResult.status})`}
                </button>
              </div>

              {/* Status Badge in Console */}
              {(runResult || submissionResult) && (
                <div className="text-[11px] font-mono text-aurora-text-secondary pr-2">
                  {(submissionResult || runResult)?.runtimeMs} ms
                </div>
              )}
            </div>

            {/* Console Content */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3">
              {/* Tab 1: Test Cases Inputs */}
              {activeConsoleTab === 'testcases' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {question.testCases.filter(tc => !tc.isHidden).map((tc, idx) => (
                      <button
                        key={tc.id}
                        onClick={() => setActiveTestcaseIdx(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeTestcaseIdx === idx
                            ? 'bg-aurora-bg-surface text-white border border-[#FA4616]'
                            : 'bg-aurora-bg-primary text-aurora-text-secondary hover:text-white'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {question.testCases[activeTestcaseIdx] && (
                    <div className="space-y-2 pt-1">
                      <div>
                        <span className="text-[10px] text-aurora-text-secondary uppercase">Input:</span>
                        <div className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-aurora-text-primary mt-1">
                          {question.testCases[activeTestcaseIdx].input}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-aurora-text-secondary uppercase">Expected Output:</span>
                        <div className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-emerald-400 mt-1">
                          {question.testCases[activeTestcaseIdx].expectedOutput}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Run Code Output */}
              {activeConsoleTab === 'runOutput' && (
                <div>
                  {!runResult ? (
                    <div className="text-aurora-text-secondary pt-6 text-center">
                      Click "Run Code" above to execute solution against sample test cases.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {runResult.status === 'Accepted' ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> All Sample Cases Passed
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> {runResult.status}
                          </span>
                        )}
                        <span className="text-aurora-text-secondary text-[11px]">
                          ({runResult.testCasesPassed}/{runResult.totalTestCases} passed in {runResult.runtimeMs}ms)
                        </span>
                      </div>

                      {runResult.error && (
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                          {runResult.error}
                        </div>
                      )}

                      {runResult.details?.map(d => (
                        <div
                          key={d.caseNumber}
                          className={`p-3 rounded-lg border ${d.passed ? 'bg-aurora-bg-surface border-aurora-border' : 'bg-rose-500/10 border-rose-500/30'} space-y-1`}
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold">Case {d.caseNumber}</span>
                            <span className={d.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {d.passed ? 'PASSED' : 'FAILED'}
                            </span>
                          </div>
                          <div><span className="text-aurora-text-secondary">Input:</span> {d.input}</div>
                          <div><span className="text-aurora-text-secondary">Expected:</span> <span className="text-emerald-400">{d.expected}</span></div>
                          <div><span className="text-aurora-text-secondary">Actual:</span> <span className={d.passed ? 'text-emerald-400' : 'text-rose-400'}>{d.actual}</span></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Submission Results */}
              {activeConsoleTab === 'submissionResults' && (
                <div>
                  {!submissionResult ? (
                    <div className="text-aurora-text-secondary pt-6 text-center">
                      Click "Submit" to test your solution against all sample and hidden test cases.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissionResult.status === 'Accepted' ? (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Accepted!</span>
                          </div>
                          <p className="text-xs text-aurora-text-secondary">
                            Your solution passed all {submissionResult.totalTestCases} test cases (including hidden corner cases).
                          </p>
                          <div className="flex items-center gap-6 pt-2 font-mono text-xs">
                            <div>
                              <span className="text-aurora-text-secondary">Runtime: </span>
                              <strong className="text-emerald-400">{submissionResult.runtimeMs} ms</strong>
                            </div>
                            <div>
                              <span className="text-aurora-text-secondary">Memory: </span>
                              <strong className="text-blue-400">{Math.round((submissionResult.memoryKb || 0) / 1024)} MB</strong>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                            <XCircle className="w-5 h-5" />
                            <span>{submissionResult.status}</span>
                          </div>
                          <p className="text-xs text-aurora-text-secondary">
                            Passed {submissionResult.testCasesPassed} of {submissionResult.totalTestCases} test cases.
                          </p>
                          {submissionResult.error && (
                            <pre className="p-2 rounded bg-black/40 text-rose-300 text-xs overflow-x-auto">
                              {submissionResult.error}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
