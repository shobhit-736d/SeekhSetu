import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  elevatorPitchFrameworks,
  starMethodTemplates,
  topHrQuestionsBank,
  groupDiscussionTopics,
  emailWritingExercises
} from '../../data/communicationData';
import { useStudy } from '../../context/StudyContext';
import { ApiService } from '../../services/apiService';
import {
  Mic,
  MicOff,
  Sparkles,
  MessageSquare,
  Star,
  Users,
  Mail,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Send,
  ChevronDown,
  ChevronUp,
  Volume2
} from 'lucide-react';

export const CommunicationView: React.FC = () => {
  const { showToast, setIsAiDrawerOpen, setAiCurrentContext } = useStudy();

  const [activeModule, setActiveModule] = useState<
    'pitch' | 'star' | 'hr' | 'gd' | 'email'
  >('pitch');

  // ==========================================
  // 1. ELEVATOR PITCH & SPEECH RECORDER STATE
  // ==========================================
  const [selectedPitchId, setSelectedPitchId] = useState(elevatorPitchFrameworks[0].id);
  const [isRecording, setIsRecording] = useState(false);
  const [pitchTranscript, setPitchTranscript] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const activePitch = elevatorPitchFrameworks.find(p => p.id === selectedPitchId) || elevatorPitchFrameworks[0];

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + ' ';
        }
        setPitchTranscript(currentText.trim());
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      showToast('Speech recognition not supported in this browser. You can type your response below.', 'warning');
      return;
    }

    if (isRecording) {
      // Stop recording
      recognitionRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      showToast('Speech recorded and transcribed!', 'success');
    } else {
      // Start recording
      setPitchTranscript('');
      setRecordingSeconds(0);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        timerRef.current = setInterval(() => {
          setRecordingSeconds(prev => prev + 1);
        }, 1000);
      } catch (err) {
        showToast('Could not access microphone. Please check permissions.', 'warning');
      }
    }
  };

  // Metrics from transcript
  const wordsCount = pitchTranscript.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(0.1, recordingSeconds / 60);
  const wordsPerMinute = recordingSeconds > 3 ? Math.round(wordsCount / minutes) : 0;

  // Detect filler words
  const detectedFillers = activePitch.fillerWords.filter(f =>
    new RegExp(`\\b${f}\\b`, 'i').test(pitchTranscript)
  );

  // ==========================================
  // 2. STAR METHOD STUDIO STATE
  // ==========================================
  const [selectedStarId, setSelectedStarId] = useState(starMethodTemplates[0].id);
  const [starDraft, setStarDraft] = useState({
    situation: '',
    task: '',
    action: '',
    result: ''
  });
  const [showStarModel, setShowStarModel] = useState(false);

  const activeStar = starMethodTemplates.find(s => s.id === selectedStarId) || starMethodTemplates[0];

  // ==========================================
  // 3. HR QUESTIONS STATE
  // ==========================================
  const [expandedHrId, setExpandedHrId] = useState<string | null>(topHrQuestionsBank[0].id);

  // ==========================================
  // 4. EMAIL WRITING STATE
  // ==========================================
  const [selectedEmailId, setSelectedEmailId] = useState(emailWritingExercises[0].id);
  const [userEmailText, setUserEmailText] = useState('');
  const [showEmailModel, setShowEmailModel] = useState(false);

  const activeEmail = emailWritingExercises.find(e => e.id === selectedEmailId) || emailWritingExercises[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card relative overflow-hidden bubble-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Campus Interview & Verbal Communication Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
              Communication & Interview Mastery
            </h1>
            <p className="text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
              Master 60-second elevator pitches with speech analysis, behavioral questions with the STAR method, high-frequency HR rounds, and corporate email writing.
            </p>
          </div>

          <button
            onClick={() => {
              setAiCurrentContext({ page: 'interview' });
              setIsAiDrawerOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start md:self-center"
          >
            <Sparkles className="w-4 h-4" />
            <span>Practice with AI Interviewer</span>
          </button>
        </div>
      </div>

      {/* Navigation Module Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border">
        {[
          { id: 'pitch', label: 'Elevator Pitch & Voice Studio', icon: Mic },
          { id: 'star', label: 'STAR Method Studio', icon: Star },
          { id: 'hr', label: 'Top HR Questions & Answers', icon: MessageSquare },
          { id: 'gd', label: 'Group Discussion Masterclass', icon: Users },
          { id: 'email', label: 'Corporate Email Drills', icon: Mail }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#FA4616] text-white shadow-sm'
                  : 'text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-surface'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Module 1: Elevator Pitch Practice & Voice Recording */}
      {activeModule === 'pitch' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Pitch Framework & Spoken Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pitch Selector */}
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white">Select Practice Framework</h3>
                <span className="text-[10px] font-bold text-[#FA4616] uppercase">Target Duration: {activePitch.targetDuration}s</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {elevatorPitchFrameworks.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPitchId(p.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      selectedPitchId === p.id
                        ? 'bg-[#FA4616]/15 border-[#FA4616] text-white shadow-sm'
                        : 'bg-aurora-bg-surface border-aurora-border text-aurora-text-secondary hover:text-white'
                    }`}
                  >
                    <div>{p.title}</div>
                    <div className="text-[10px] font-normal text-aurora-text-secondary mt-0.5">{p.targetRole}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Model Script Breakdown */}
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-aurora-text-secondary">
                Recommended 4-Step Narrative Flow
              </h4>
              <div className="space-y-2.5">
                {activePitch.structure.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs leading-relaxed space-y-1">
                    <span className="font-bold text-[#FA4616] block">{step.section}</span>
                    <p className="text-white italic">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Recording / Spoken Input Studio */}
            <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-white">Live Spoken-Response Recorder</h4>
                  <p className="text-xs text-aurora-text-secondary">Speak your self-introduction. We transcribe in real-time and analyze pace and filler words.</p>
                </div>
                {isRecording && (
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span>{recordingSeconds}s</span>
                  </div>
                )}
              </div>

              {/* Record Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleRecording}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                    isRecording
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#344052]'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? 'Stop Recording' : 'Start Microphone Recording'}</span>
                </button>

                {pitchTranscript && (
                  <button
                    onClick={() => {
                      setPitchTranscript('');
                      setRecordingSeconds(0);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-aurora-bg-surface text-aurora-text-secondary hover:text-white text-xs font-bold border border-aurora-border"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Transcription Area (Editable) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-aurora-text-secondary">
                  Live Transcription & Answer Text:
                </label>
                <textarea
                  value={pitchTranscript}
                  onChange={e => setPitchTranscript(e.target.value)}
                  placeholder="Your spoken words will appear here automatically. You can also type or edit directly..."
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] leading-relaxed"
                />

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!pitchTranscript.trim()) {
                        showToast('Please record or enter a speech response first.', 'warning');
                        return;
                      }
                      try {
                        await ApiService.saveCommunicationSession({
                          module: 'pitch',
                          title: activePitch.title,
                          promptOrQuestion: activePitch.targetRole,
                          userResponse: pitchTranscript,
                          feedback: `Pace: ${wordsPerMinute} WPM, Fillers: ${detectedFillers.length}`,
                          score: Math.min(100, Math.max(50, Math.round(100 - detectedFillers.length * 8))),
                          durationSeconds: recordingSeconds
                        });
                        showToast('Communication practice recorded to your account!', 'success');
                      } catch (err: any) {
                        showToast(err.message || 'Failed to save communication record', 'warning');
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FA4616] hover:bg-[#e03d12] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Practice Record</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Real-Time Feedback Card */}
          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-5">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#FA4616]" />
                Speech Analytics & Feedback
              </h4>

              {/* Words Per Minute Pace Meter */}
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-aurora-text-secondary">Speaking Pace</span>
                  <span className="font-mono font-bold text-white">{wordsPerMinute} WPM</span>
                </div>
                <div className="w-full bg-aurora-bg-primary h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      wordsPerMinute >= 120 && wordsPerMinute <= 160
                        ? 'bg-emerald-500'
                        : wordsPerMinute > 160
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (wordsPerMinute / 180) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-aurora-text-secondary">
                  {wordsPerMinute === 0
                    ? 'Start speaking to measure your words per minute.'
                    : wordsPerMinute >= 120 && wordsPerMinute <= 155
                    ? '🎯 Ideal conversational pace (120–150 WPM).'
                    : wordsPerMinute > 155
                    ? '⚠️ Speaking too rapidly. Pause between phrases.'
                    : 'ℹ️ Slightly slow pace. Maintain continuous momentum.'}
                </p>
              </div>

              {/* Filler Words Detected */}
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-aurora-text-secondary">Filler Words Count</span>
                  <span className={`font-mono ${detectedFillers.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {detectedFillers.length} detected
                  </span>
                </div>
                {detectedFillers.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {detectedFillers.map((f, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        "{f}"
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Clean articulation! No excessive fillers.
                  </p>
                )}
              </div>

              {/* Key Elements Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-aurora-text-secondary uppercase">Essential Elements Checklist</span>
                <div className="space-y-1.5">
                  {activePitch.keyElementsToCheck.map((elem, i) => {
                    const isMentioned = pitchTranscript.length > 20;
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs text-aurora-text-secondary">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isMentioned ? 'text-emerald-400' : 'text-aurora-border'}`} />
                        <span>{elem}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module 2: STAR Method Studio */}
      {activeModule === 'star' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Form Wizard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selector */}
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <h4 className="font-extrabold text-sm text-white">Select Behavioral Scenario</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {starMethodTemplates.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStarId(s.id);
                      setShowStarModel(false);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      selectedStarId === s.id
                        ? 'bg-[#FA4616]/15 border-[#FA4616] text-white shadow-sm'
                        : 'bg-aurora-bg-surface border-aurora-border text-aurora-text-secondary hover:text-white'
                    }`}
                  >
                    <div>{s.category}</div>
                    <div className="text-[11px] font-normal text-aurora-text-secondary mt-0.5 line-clamp-1">{s.prompt}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Statement */}
            <div className="p-5 rounded-2xl bg-[#FA4616]/10 border border-[#FA4616]/30 text-white space-y-1">
              <span className="text-[10px] font-bold text-[#FA4616] uppercase tracking-wider">Interview Prompt</span>
              <p className="text-sm sm:text-base font-bold">{activeStar.prompt}</p>
            </div>

            {/* Interactive 4-Box STAR Editor */}
            <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-5">
              <h4 className="font-extrabold text-sm text-white">Draft Your STAR Response</h4>

              {/* S: Situation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FA4616]">S — Situation (What was the context & timeline?)</span>
                </div>
                <textarea
                  value={starDraft.situation}
                  onChange={e => setStarDraft({ ...starDraft, situation: e.target.value })}
                  placeholder={activeStar.guide.situation}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
                />
              </div>

              {/* T: Task */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-400">T — Task (What was your personal responsibility?)</span>
                </div>
                <textarea
                  value={starDraft.task}
                  onChange={e => setStarDraft({ ...starDraft, task: e.target.value })}
                  placeholder={activeStar.guide.task}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
                />
              </div>

              {/* A: Action */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">A — Action (What exact steps and tools did you use?)</span>
                </div>
                <textarea
                  value={starDraft.action}
                  onChange={e => setStarDraft({ ...starDraft, action: e.target.value })}
                  placeholder={activeStar.guide.action}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
                />
              </div>

              {/* R: Result */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">R — Result (Quantify the outcome & lasting impact)</span>
                </div>
                <textarea
                  value={starDraft.result}
                  onChange={e => setStarDraft({ ...starDraft, result: e.target.value })}
                  placeholder={activeStar.guide.result}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setShowStarModel(!showStarModel)}
                  className="text-xs font-bold text-[#FA4616] hover:underline"
                >
                  {showStarModel ? 'Hide Model Benchmark Answer' : 'Compare with 10/10 Model Benchmark'}
                </button>

                <button
                  onClick={() => showToast('STAR draft saved to your preparation notebook!', 'success')}
                  className="px-5 py-2 rounded-xl bg-[#FA4616] text-white text-xs font-bold shadow-md"
                >
                  Save STAR Draft
                </button>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Model Answer Reference */}
          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Benchmark Model Answer
              </h4>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <strong className="text-[#FA4616] block mb-1">Situation:</strong>
                  <p className="text-aurora-text-secondary">{activeStar.sampleModelAnswer.situation}</p>
                </div>
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <strong className="text-blue-400 block mb-1">Task:</strong>
                  <p className="text-aurora-text-secondary">{activeStar.sampleModelAnswer.task}</p>
                </div>
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <strong className="text-amber-400 block mb-1">Action:</strong>
                  <p className="text-aurora-text-secondary">{activeStar.sampleModelAnswer.action}</p>
                </div>
                <div className="p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border">
                  <strong className="text-emerald-400 block mb-1">Result:</strong>
                  <p className="text-aurora-text-secondary">{activeStar.sampleModelAnswer.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module 3: Top HR Interview Questions */}
      {activeModule === 'hr' && (
        <div className="space-y-4">
          {topHrQuestionsBank.map(hr => {
            const isExpanded = expandedHrId === hr.id;
            return (
              <div
                key={hr.id}
                className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-sm space-y-4 transition-all bubble-card"
              >
                <div
                  onClick={() => setExpandedHrId(isExpanded ? null : hr.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#FA4616] uppercase tracking-wider">HR Interview Essential</span>
                    <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5">{hr.question}</h4>
                  </div>
                  <div className="p-2 rounded-xl bg-aurora-bg-surface text-aurora-text-secondary">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-aurora-border/60 text-xs sm:text-sm">
                    {/* Interviewer Intent */}
                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                      <strong>Interviewer Intent:</strong> {hr.intent}
                    </div>

                    {/* Model Answer */}
                    <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                      <strong className="text-emerald-400 block font-bold">Recommended Model Answer:</strong>
                      <p className="text-aurora-text-primary leading-relaxed italic">{hr.modelAnswer}</p>
                    </div>

                    {/* Dos & Don'ts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                        <strong className="text-emerald-400 text-xs uppercase block">DOs:</strong>
                        <ul className="space-y-1 text-xs text-aurora-text-secondary list-disc list-inside">
                          {hr.dosAndDonts.dos.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>
                      <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                        <strong className="text-rose-400 text-xs uppercase block">DON'Ts:</strong>
                        <ul className="space-y-1 text-xs text-aurora-text-secondary list-disc list-inside">
                          {hr.dosAndDonts.donts.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Module 4: Group Discussion Topics */}
      {activeModule === 'gd' && (
        <div className="space-y-6">
          {groupDiscussionTopics.map(gd => (
            <div
              key={gd.id}
              className="p-5 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 shadow-sm bubble-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FA4616] uppercase">{gd.category}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-aurora-bg-surface border border-aurora-border text-aurora-text-secondary">
                  GD Topic Matrix
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white">{gd.topic}</h3>
              <p className="text-xs text-aurora-text-secondary leading-relaxed">{gd.overview}</p>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <strong className="text-emerald-400 text-xs uppercase block">Key Arguments FOR (Pros):</strong>
                  <ul className="space-y-1.5 text-xs text-aurora-text-secondary list-disc list-inside">
                    {gd.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                  <strong className="text-rose-400 text-xs uppercase block">Key Arguments AGAINST (Cons):</strong>
                  <ul className="space-y-1.5 text-xs text-aurora-text-secondary list-disc list-inside">
                    {gd.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>

              {/* Opening & Concluding Remarks */}
              <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2 text-xs">
                <div>
                  <strong className="text-amber-400 block mb-0.5">Impactful Opening Line:</strong>
                  <p className="text-white italic">{gd.openingRemarks}</p>
                </div>
                <div className="pt-2 border-t border-aurora-border/60">
                  <strong className="text-blue-400 block mb-0.5">Consensus Closing Statement:</strong>
                  <p className="text-white italic">{gd.closingRemarks}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Module 5: Corporate Email Drills */}
      {activeModule === 'email' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Scenario Selector */}
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <h4 className="font-extrabold text-sm text-white">Select Workplace Scenario</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {emailWritingExercises.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEmailId(e.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      selectedEmailId === e.id
                        ? 'bg-[#FA4616]/15 border-[#FA4616] text-white shadow-sm'
                        : 'bg-aurora-bg-surface border-aurora-border text-aurora-text-secondary hover:text-white'
                    }`}
                  >
                    <div>{e.scenario}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-2 text-xs">
              <span className="font-bold text-[#FA4616] uppercase">Exercise Prompt</span>
              <p className="text-white leading-relaxed">{activeEmail.prompt}</p>
            </div>

            {/* Email Drafting Area */}
            <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4">
              <h4 className="font-extrabold text-sm text-white">Draft Your Professional Email</h4>
              <textarea
                value={userEmailText}
                onChange={e => setUserEmailText(e.target.value)}
                placeholder="Subject: ...\n\nDear ...\n\n[Write your email here]"
                rows={8}
                className="w-full p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm text-white placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] leading-relaxed font-mono"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowEmailModel(!showEmailModel)}
                  className="text-xs font-bold text-[#FA4616] hover:underline"
                >
                  {showEmailModel ? 'Hide Model Email' : 'View Executive Model Template'}
                </button>
                <button
                  onClick={() => showToast('Email draft validated! High professional clarity.', 'success')}
                  className="px-5 py-2.5 rounded-xl bg-[#FA4616] text-white text-xs font-bold shadow-md"
                >
                  Grade My Email
                </button>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Model Template & Criteria */}
          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 text-xs">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FA4616]" />
                Model Template & Rubric
              </h4>
              <div className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border whitespace-pre-line text-aurora-text-secondary font-mono leading-relaxed text-[11px]">
                {activeEmail.modelTemplate}
              </div>
              <div className="space-y-1.5 pt-2">
                <strong className="text-white block">Evaluation Criteria:</strong>
                {activeEmail.evaluationCriteria.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-aurora-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
