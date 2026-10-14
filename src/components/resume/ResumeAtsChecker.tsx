import React, { useState } from 'react';
import { AtsScoringService } from '../../services/atsScoringService';
import { ApiService } from '../../services/apiService';
import { AtsScoreBreakdown, ResumeProfile } from '../../types/placement';
import { useStudy } from '../../context/StudyContext';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Layers,
  Award,
  Zap,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface ResumeAtsCheckerProps {
  onLoadIntoBuilder: (profile: ResumeProfile) => void;
}

export const ResumeAtsChecker: React.FC<ResumeAtsCheckerProps> = ({ onLoadIntoBuilder }) => {
  const {
    activeResume,
    saveResumeProfile,
    setLatestAtsScore,
    showToast,
    setIsAiDrawerOpen,
    setAiCurrentContext
  } = useStudy();

  const [fileName, setFileName] = useState<string>('sample_developer_resume.pdf');
  const [resumeText, setResumeText] = useState<string>(
    `${activeResume?.personalInfo.fullName}\n${activeResume?.personalInfo.email} | ${activeResume?.personalInfo.phone}\n${activeResume?.personalInfo.linkedin} | ${activeResume?.personalInfo.github}\n\nPROFESSIONAL SUMMARY\n${activeResume?.summary}\n\nTECHNICAL SKILLS\nLanguages: ${activeResume?.skills.languages.join(', ')}\nFrameworks: ${activeResume?.skills.frameworks.join(', ')}\nDatabases & Cloud: ${activeResume?.skills.databasesAndCloud.join(', ')}\n\nWORK EXPERIENCE\n${activeResume?.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}\n\nPROJECTS\n${activeResume?.projects.map(p => `${p.title} (${p.techStack.join(', ')})\n${p.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}\n\nEDUCATION\n${activeResume?.education.map(ed => `${ed.degree}, ${ed.institution} (${ed.grade})`).join('\n')}`
  );
  const [jobDescription, setJobDescription] = useState<string>(
    'Seeking a Full Stack Software Engineer proficient in React, Node.js, TypeScript, PostgreSQL, REST APIs, Git, and cloud services with a track record of optimizing application performance and scalable architectures.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AtsScoreBreakdown | null>(() => {
    return AtsScoringService.analyzeResumeText(resumeText, jobDescription);
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [improvedDraft, setImprovedDraft] = useState<{
    profile: ResumeProfile;
    projectedScore: number;
  } | null>(null);

  // File Upload Handler (PDF/DOCX/TXT)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File exceeds 10MB limit. Please upload a smaller document.', 'warning');
      return;
    }

    setFileName(file.name);
    setIsAnalyzing(true);
    showToast(`Parsing ${file.name} with ATS engine...`, 'info');

    // 1. Try uploading to backend with server-side PDF/DOCX document parser
    try {
      const uploadRes = await ApiService.uploadResume(file, jobDescription);
      if (uploadRes && uploadRes.evaluation) {
        const text = uploadRes.rawText || uploadRes.evaluation.rawText || '';
        if (text && text.trim().length > 20) {
          setResumeText(text);
        }
        const evalBreakdown = uploadRes.evaluation;
        setAnalysisResult(evalBreakdown);
        const score = uploadRes.atsScore || evalBreakdown.overallScore || 75;
        setLatestAtsScore(score);
        setIsAnalyzing(false);
        showToast(`Resume evaluated! ATS Score: ${score}/100`, 'success');
        return;
      }
    } catch (uploadErr) {
      console.warn('Backend resume parser fallback:', uploadErr);
    }

    // 2. Client-side fallback for TXT or when offline
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      // Clean readable text
      const extracted = content.replace(/[^\x20-\x7E\t\r\n]/g, ' ').replace(/\s+/g, ' ').slice(0, 10000).trim();
      const textToScore = extracted.length > 30 ? extracted : resumeText;
      if (extracted.length > 30) {
        setResumeText(extracted);
      }

      const scoreBreakdown = AtsScoringService.analyzeResumeText(textToScore, jobDescription);
      setAnalysisResult(scoreBreakdown);
      setLatestAtsScore(scoreBreakdown.overallScore);
      setIsAnalyzing(false);
      showToast(`Resume parsed! ATS Score: ${scoreBreakdown.overallScore}/100`, 'success');
    };

    reader.onerror = () => {
      setIsAnalyzing(false);
      showToast('Could not read file. Ensure it is not corrupted.', 'warning');
    };

    reader.readAsText(file);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const score = AtsScoringService.analyzeResumeText(resumeText, jobDescription);
      setAnalysisResult(score);
      setLatestAtsScore(score.overallScore);
      setIsAnalyzing(false);
      showToast(`ATS Score updated: ${score.overallScore}/100`, 'info');
    }, 300);
  };

  // Workflow Step: "Improve My Resume" to Target 80+ Score
  const handleImproveResume = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      if (!activeResume) return;
      const { improvedProfile, projectedScore } =
        AtsScoringService.generateImprovedResumeDraft(activeResume, jobDescription);

      setImprovedDraft({ profile: improvedProfile, projectedScore });
      setIsOptimizing(false);
      showToast(`AI Optimization Complete! Projected ATS Score: ${projectedScore}/100`, 'success');
    }, 800);
  };

  const handleAcceptImprovedDraft = () => {
    if (!improvedDraft) return;
    saveResumeProfile(improvedDraft.profile);
    setLatestAtsScore(improvedDraft.projectedScore);
    onLoadIntoBuilder(improvedDraft.profile);
    showToast('Improved resume loaded into Resume Builder for editing & download!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Upload and Target JD Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#FA4616]" />
              Upload Existing Resume (PDF / DOCX / TXT)
            </h3>
            <span className="text-[10px] text-aurora-text-secondary">Max 5MB</span>
          </div>

          <label className="border-2 border-dashed border-aurora-border hover:border-[#FA4616] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-aurora-bg-surface/50 hover:bg-aurora-bg-surface transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#FA4616]/10 border border-[#FA4616]/20 flex items-center justify-center text-[#FA4616] group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs sm:text-sm font-bold text-white">
                Drag & Drop or <span className="text-[#FA4616] underline">Browse File</span>
              </p>
              <p className="text-[11px] text-aurora-text-secondary">
                Currently loaded: <span className="text-white font-mono">{fileName}</span>
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Edit Raw Text Trigger */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-aurora-text-secondary">Parsed Resume Text:</span>
              <button
                onClick={handleRunAnalysis}
                className="text-[#FA4616] font-bold text-[11px] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Re-analyze
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] leading-relaxed font-mono"
            />
          </div>
        </div>

        {/* Target Job Description Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Target Job Description (Optional Matching)
            </h3>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Keyword Scanner
            </span>
          </div>

          <p className="text-xs text-aurora-text-secondary leading-relaxed">
            Paste the job posting requirements below. The ATS engine will scan for missing technical keywords and calculate your exact Match Rate.
          </p>

          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste target job description from LinkedIn, Indeed, or campus portal..."
            rows={7}
            className="w-full p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] leading-relaxed font-mono"
          />

          <button
            onClick={handleRunAnalysis}
            className="w-full py-2.5 rounded-xl bg-aurora-bg-surface hover:bg-[#FA4616] hover:text-white border border-aurora-border text-xs font-bold text-aurora-text-primary transition-all text-center shadow-sm"
          >
            Calculate Compatibility Against Job Description
          </button>
        </div>
      </div>

      {/* Analysis Scorecards */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Hero Scorecard Banner */}
          <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 bubble-card">
            <div className="flex items-center gap-5">
              {/* Circular Gauge */}
              <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-aurora-bg-surface"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      analysisResult.overallScore >= 80
                        ? 'text-emerald-400'
                        : analysisResult.overallScore >= 60
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }
                    strokeDasharray={`${analysisResult.overallScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-mono font-extrabold text-white">
                    {analysisResult.overallScore}
                  </span>
                  <span className="block text-[9px] font-bold text-aurora-text-secondary uppercase">
                    / 100
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-display font-extrabold text-white">
                    ATS Compatibility Rating
                  </h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                    analysisResult.overallScore >= 80
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}>
                    {analysisResult.overallScore >= 80 ? 'Highly Compatible' : 'Needs Optimization'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed max-w-xl">
                  {analysisResult.overallScore >= 80
                    ? 'Excellent job! Your resume format, keyword density, and action verbs align well with automated ATS screeners.'
                    : 'Your resume has good foundation, but missing industry keywords and weak metric quantification are reducing your screener pass rate.'}
                </p>
              </div>
            </div>

            {/* "Improve My Resume to 80+" Action */}
            <div className="flex flex-col gap-2 self-start md:self-center">
              <button
                onClick={handleImproveResume}
                disabled={isOptimizing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span>{isOptimizing ? 'Rewriting with AI...' : 'Improve Resume to Target 80+'}</span>
              </button>
              <span className="text-[11px] text-aurora-text-secondary text-center">
                AI rewrites bullets with action verbs & metrics
              </span>
            </div>
          </div>

          {/* Improved Draft Banner if generated */}
          {improvedDraft && (
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>AI Optimized Draft Generated! Projected ATS Score: {improvedDraft.projectedScore}/100</span>
                </div>
                <button
                  onClick={handleAcceptImprovedDraft}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <span>Accept Draft & Open in Resume Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-aurora-text-secondary leading-relaxed">
                We re-anchored your experience bullets with quantified metric increases (+35% latency reduction), inserted high-value missing keywords, and synthesized an executive summary.
              </p>
            </div>
          )}

          {/* 4 Category Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Section Completeness */}
            <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-aurora-text-secondary">
                <span>SECTION STRUCTURE</span>
                <span className="font-mono text-white">{analysisResult.sectionCompleteness.score}/20</span>
              </div>
              <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${(analysisResult.sectionCompleteness.score / 20) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-aurora-text-secondary">{analysisResult.sectionCompleteness.feedback}</p>
            </div>

            {/* 2. Skills & Keywords */}
            <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-aurora-text-secondary">
                <span>KEYWORD DENSITY</span>
                <span className="font-mono text-white">{analysisResult.skillsAndKeywords.score}/25</span>
              </div>
              <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1754D8] h-full rounded-full"
                  style={{ width: `${(analysisResult.skillsAndKeywords.score / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-aurora-text-secondary">{analysisResult.skillsAndKeywords.feedback}</p>
            </div>

            {/* 3. Action Verbs & Impact */}
            <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-aurora-text-secondary">
                <span>MEASURABLE IMPACT</span>
                <span className="font-mono text-white">{analysisResult.actionVerbsAndImpact.score}/25</span>
              </div>
              <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#FA4616] h-full rounded-full"
                  style={{ width: `${(analysisResult.actionVerbsAndImpact.score / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-aurora-text-secondary">{analysisResult.actionVerbsAndImpact.feedback}</p>
            </div>

            {/* 4. Formatting & Readability */}
            <div className="p-4 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-aurora-text-secondary">
                <span>FORMAT & LENGTH</span>
                <span className="font-mono text-white">{analysisResult.formattingAndReadability.score}/15</span>
              </div>
              <div className="w-full bg-aurora-bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${(analysisResult.formattingAndReadability.score / 15) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-aurora-text-secondary">{analysisResult.formattingAndReadability.feedback}</p>
            </div>
          </div>

          {/* Actionable Recommendations List */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              Priority Fixes to Boost Score Past 85+
            </h4>
            <div className="space-y-3">
              {analysisResult.recommendations.map(rec => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border flex items-start gap-3 text-xs leading-relaxed"
                >
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase mt-0.5 ${
                    rec.priority === 'Critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {rec.priority}
                  </span>
                  <div className="space-y-0.5">
                    <strong className="text-white block">{rec.title}</strong>
                    <p className="text-aurora-text-secondary">{rec.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
