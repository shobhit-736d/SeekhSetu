import React from 'react';
import { Timer, Play, Pause, RotateCcw, Maximize2, Coffee } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';

export const CompactFocusTimer: React.FC = () => {
  const {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setTimerTargetMinutes,
    setTimerMode,
    setActiveTab,
    selectedDayNumber
  } = useStudy();

  const remainingSeconds = Math.max(0, timerState.targetMinutes * 60 - timerState.elapsedSeconds);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progressPercent = Math.min(
    100,
    (timerState.elapsedSeconds / (timerState.targetMinutes * 60)) * 100
  );

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border flex flex-col justify-between bubble-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FA4616]/15 text-[#FA4616] border border-[#FA4616]/30">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
              Focus Engine
            </h3>
            <p className="text-xs text-aurora-text-secondary">
              Day {selectedDayNumber} Tagged
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('timer')}
          className="text-aurora-text-secondary hover:text-aurora-text-primary p-1.5 rounded-lg hover:bg-aurora-bg-surface transition-colors"
          title="Open Fullscreen Focus Mode"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="my-5 text-center">
        <div className="font-mono text-5xl sm:text-6xl font-black text-aurora-text-primary tracking-tight">
          {timeDisplay}
        </div>
        <div className="text-xs font-semibold text-[#1754D8] mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1.5">
          {timerState.mode === 'study' ? (
            <span>Focused Study Session</span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <Coffee className="w-3.5 h-3.5" /> Quick Refresh Break
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-aurora-bg-surface rounded-full h-2 mt-3.5 overflow-hidden border border-aurora-border/50">
          <div
            className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {[25, 45, 60].map(mins => (
          <button
            key={mins}
            onClick={() => {
              setTimerMode('study');
              setTimerTargetMinutes(mins);
            }}
            disabled={timerState.isRunning}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${
              timerState.targetMinutes === mins && timerState.mode === 'study'
                ? 'bg-[#FA4616]/20 border-[#FA4616] text-[#FA4616]'
                : 'border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
            } disabled:opacity-50`}
          >
            {mins}m
          </button>
        ))}
        <button
          onClick={() => setTimerMode(timerState.mode === 'study' ? 'break' : 'study')}
          disabled={timerState.isRunning}
          className="px-2 py-1 text-[11px] font-semibold rounded-lg border border-aurora-border text-aurora-text-secondary hover:text-white disabled:opacity-50"
        >
          {timerState.mode === 'study' ? 'Break' : 'Study'}
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {!timerState.isRunning ? (
          <button
            onClick={() => startTimer(selectedDayNumber)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-[#FA4616] text-white shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#344052] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Session</span>
          </button>
        ) : timerState.isPaused ? (
          <button
            onClick={resumeTimer}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume</span>
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause</span>
          </button>
        )}

        <button
          onClick={resetTimer}
          className="p-2 rounded-xl border border-aurora-border text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-surface transition-colors"
          title="Reset timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
