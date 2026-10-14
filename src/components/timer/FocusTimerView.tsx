import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { allDays } from '../../data/roadmapData';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Coffee,
  Maximize2,
  Minimize2,
  Clock,
  Calendar,
  Flame,
  Award
} from 'lucide-react';

export const FocusTimerView: React.FC = () => {
  const {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    completeTimerSession,
    setTimerTargetMinutes,
    setTimerMode,
    studySessions,
    todayStudyMinutes,
    weekStudyMinutes,
    dailyGoalMinutes,
    setDailyGoalMinutes,
    selectedDayNumber,
    setSelectedDayNumber
  } = useStudy();

  const [distractionFree, setDistractionFree] = useState(false);

  const remainingSeconds = Math.max(0, timerState.targetMinutes * 60 - timerState.elapsedSeconds);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progressPercent = Math.min(
    100,
    (timerState.elapsedSeconds / (timerState.targetMinutes * 60)) * 100
  );

  const dailyGoalPercent = Math.min(100, Math.round((todayStudyMinutes / dailyGoalMinutes) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Distraction Free Fullscreen Modal Mode */}
      <AnimatePresence>
        {distractionFree && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-aurora-bg-primary flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setDistractionFree(false)}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-aurora-bg-elevated border border-aurora-border text-xs sm:text-sm font-semibold text-aurora-text-secondary hover:text-aurora-text-primary transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit Distraction-Free Mode</span>
            </button>

            <div className="text-center space-y-6 max-w-lg w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FA4616]/15 border border-[#FA4616]/30 text-[#FA4616] text-xs sm:text-sm font-bold">
                <Timer className="w-4 h-4" />
                <span>Deep Focus Arena • Day {selectedDayNumber}</span>
              </div>

              <div className="font-mono text-7xl sm:text-9xl font-black text-aurora-text-primary tracking-tight drop-shadow-2xl">
                {timeDisplay}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-aurora-bg-surface rounded-full h-3 overflow-hidden border border-aurora-border">
                <div
                  className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 pt-4">
                {!timerState.isRunning ? (
                  <button
                    onClick={() => startTimer(selectedDayNumber)}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Start Session</span>
                  </button>
                ) : timerState.isPaused ? (
                  <button
                    onClick={resumeTimer}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Resume Focus</span>
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  onClick={completeTimerSession}
                  className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-aurora-bg-elevated border border-aurora-border text-aurora-text-primary hover:border-[#FA4616]"
                >
                  Log Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card bubble-card">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA4616]/15 text-[#FA4616] text-xs font-bold border border-[#FA4616]/30 mb-2">
            <Timer className="w-4 h-4 text-[#FA4616]" />
            Precision Study Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-aurora-text-primary tracking-tight">
            Focus Timer & Session Tracker
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary mt-1.5 leading-relaxed">
            Real timestamp elapsed tracking. Paused time is never logged as focused study.
          </p>
        </div>

        <button
          onClick={() => setDistractionFree(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary hover:border-[#FA4616] transition-all self-start md:self-center"
        >
          <Maximize2 className="w-4 h-4 text-[#FA4616]" />
          <span>Distraction-Free Mode</span>
        </button>
      </div>

      {/* Main Grid: Left Timer Clock + Right Session Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timer Hero Player */}
        <div className="lg:col-span-2 p-8 sm:p-10 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card flex flex-col items-center justify-center text-center space-y-6 bubble-card">
          {/* Day Selector Tag */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <span className="text-aurora-text-secondary">Tagged Day:</span>
            <select
              value={selectedDayNumber}
              onChange={e => setSelectedDayNumber(Number(e.target.value))}
              disabled={timerState.isRunning}
              className="bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs sm:text-sm rounded-lg px-3 py-1.5 outline-none disabled:opacity-50 font-semibold"
            >
              {allDays.map(d => (
                <option key={d.dayNumber} value={d.dayNumber}>
                  Day {d.dayNumber}: {d.title}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1.5 rounded-xl bg-aurora-bg-surface border border-aurora-border gap-1.5">
            <button
              onClick={() => setTimerMode('study')}
              disabled={timerState.isRunning}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                timerState.mode === 'study'
                  ? 'bg-[#FA4616] text-white shadow-sm'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary'
              } disabled:opacity-50`}
            >
              Focus Session
            </button>
            <button
              onClick={() => setTimerMode('break')}
              disabled={timerState.isRunning}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                timerState.mode === 'break'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary'
              } disabled:opacity-50`}
            >
              <Coffee className="w-4 h-4" />
              <span>Refresh Break</span>
            </button>
          </div>

          {/* Clock Display */}
          <div className="font-mono text-6xl sm:text-8xl font-black text-aurora-text-primary tracking-tight drop-shadow-lg my-2">
            {timeDisplay}
          </div>

          {/* Target presets */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {[15, 25, 45, 60, 90].map(mins => (
              <button
                key={mins}
                onClick={() => setTimerTargetMinutes(mins)}
                disabled={timerState.isRunning}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
                  timerState.targetMinutes === mins
                    ? 'bg-[#FA4616]/15 border-[#FA4616] text-[#FA4616]'
                    : 'border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface'
                } disabled:opacity-50`}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md bg-aurora-bg-surface rounded-full h-2.5 overflow-hidden border border-aurora-border/60">
            <div
              className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 pt-2">
            {!timerState.isRunning ? (
              <button
                onClick={() => startTimer(selectedDayNumber)}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Focus</span>
              </button>
            ) : timerState.isPaused ? (
              <button
                onClick={resumeTimer}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={completeTimerSession}
              disabled={timerState.elapsedSeconds < 60}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary hover:border-[#FA4616] transition-all disabled:opacity-40"
              title="Save current progress and end session"
            >
              Save & Log
            </button>

            <button
              onClick={resetTimer}
              className="p-3 rounded-xl border border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary hover:bg-aurora-bg-surface transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Goals & Session History */}
        <div className="space-y-6">
          {/* Daily Goal Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3.5 bubble-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                Daily Study Goal
              </h3>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FA4616]">
                {todayStudyMinutes} / {dailyGoalMinutes}m
              </span>
            </div>

            <div className="w-full bg-aurora-bg-surface rounded-full h-2.5 overflow-hidden border border-aurora-border/60">
              <div
                className="h-full bg-gradient-to-r from-[#FA4616] to-[#ED7649] transition-all duration-300"
                style={{ width: `${dailyGoalPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-aurora-text-secondary pt-1 font-medium">
              <span>Goal completion: {dailyGoalPercent}%</span>
              <div className="flex items-center gap-1.5">
                {[60, 120, 180].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setDailyGoalMinutes(mins)}
                    className={`px-2 py-0.5 rounded border text-xs font-bold ${
                      dailyGoalMinutes === mins
                        ? 'bg-[#FA4616]/15 border-[#FA4616] text-[#FA4616]'
                        : 'border-aurora-border text-aurora-text-secondary hover:text-aurora-text-primary'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logged Sessions List */}
          <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3.5 bubble-card">
            <div className="flex items-center justify-between border-b border-aurora-border/60 pb-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
                Session History ({studySessions.length})
              </h3>
              <span className="text-xs text-aurora-text-secondary font-medium">
                Weekly: {(weekStudyMinutes / 60).toFixed(1)}h
              </span>
            </div>

            {studySessions.length === 0 ? (
              <div className="py-8 text-center text-sm text-aurora-text-secondary">
                No sessions logged yet. Complete a focus session to record study time.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {studySessions.map(sess => (
                  <div
                    key={sess.id}
                    className="p-3 rounded-xl bg-aurora-bg-surface/80 border border-aurora-border flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-semibold text-aurora-text-primary">
                        {sess.topicTitle || `Study Session (Day ${sess.dayNumber})`}
                      </div>
                      <div className="text-xs text-aurora-text-secondary mt-0.5">
                        {new Date(sess.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {sess.type}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#FA4616]">
                      +{sess.durationMinutes}m
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
