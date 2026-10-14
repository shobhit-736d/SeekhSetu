import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';
import { getDayByNumber, allDays } from '../../data/roadmapData';
import {
  Flame,
  Star,
  Bookmark,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Square,
  ArrowRight,
  Trash2,
  Plus,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const RevisionCenterView: React.FC = () => {
  const {
    starredDays,
    toggleStarDay,
    bookmarkedConcepts,
    removeBookmark,
    incorrectQuestions,
    removeIncorrectQuestion,
    revisionTasks,
    addRevisionTask,
    toggleRevisionTask,
    deleteRevisionTask,
    notes,
    weakTopics,
    navigateToDay
  } = useStudy();

  const [activeTab, setActiveTab] = useState<'all' | 'starred' | 'bookmarks' | 'incorrect' | 'tasks' | 'notes'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDay, setNewTaskDay] = useState(1);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addRevisionTask({
      title: newTaskTitle.trim(),
      dayNumber: newTaskDay,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      completed: false,
      priority: 'high'
    });

    setNewTaskTitle('');
  };

  const starredDayObjects = starredDays
    .map(num => getDayByNumber(num))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-aurora-bg-elevated border border-aurora-border shadow-aurora-card bubble-card">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-300 text-xs font-bold border border-amber-500/30 mb-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            Spaced Repetition Headquarters
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-aurora-text-primary tracking-tight">
            Revision Center & Priority Backlog
          </h1>
          <p className="text-sm sm:text-base text-aurora-text-secondary mt-1.5 leading-relaxed">
            Revisit bookmarked concepts, analyze incorrect quiz items, review saved notes, and target weak subjects before interviews.
          </p>
        </div>

        {/* Quick summary pill */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary">
            {starredDays.length} Starred Days • {bookmarkedConcepts.length} Bookmarks • {incorrectQuestions.length} Incorrect Qs
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar border-b border-aurora-border/60">
        {[
          { id: 'all', label: 'Overview' },
          { id: 'starred', label: `Starred Days (${starredDays.length})` },
          { id: 'bookmarks', label: `Bookmarks (${bookmarkedConcepts.length})` },
          { id: 'incorrect', label: `Incorrect Queue (${incorrectQuestions.length})` },
          { id: 'tasks', label: `Tasks (${revisionTasks.length})` },
          { id: 'notes', label: `Saved Notes (${Object.keys(notes).length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-aurora-bg-elevated text-[#FA4616] border border-[#FA4616]/40 shadow-sm'
                : 'text-aurora-text-secondary hover:text-aurora-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Grid or Tab Content */}
      {(activeTab === 'all' || activeTab === 'tasks') && (
        <div className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-4 bubble-card">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider">
              Revision Schedule & Action Items
            </h3>
          </div>

          {/* New Task Form */}
          <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              placeholder="Add revision task (e.g. Re-solve Two Pointers Container with Water)..."
              className="flex-1 bg-aurora-bg-surface border border-aurora-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616]"
            />
            <select
              value={newTaskDay}
              onChange={e => setNewTaskDay(Number(e.target.value))}
              className="bg-aurora-bg-surface border border-aurora-border text-aurora-text-primary text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none font-medium"
            >
              {allDays.map(d => (
                <option key={d.dayNumber} value={d.dayNumber}>
                  Day {d.dayNumber}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-md shadow-orange-500/20 transition-all whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </form>

          {/* Tasks List */}
          <div className="space-y-2.5">
            {revisionTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs sm:text-sm"
              >
                <button
                  onClick={() => toggleRevisionTask(task.id)}
                  className="flex items-center gap-3 text-left flex-1 min-w-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-aurora-text-secondary flex-shrink-0" />
                  )}
                  <span className={`truncate ${task.completed ? 'line-through text-aurora-text-secondary' : 'text-aurora-text-primary font-medium'}`}>
                    {task.title}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-aurora-bg-elevated border border-aurora-border text-[#FA4616]">
                    Day {task.dayNumber}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateToDay(task.dayNumber, task.topicId)}
                    className="p-1.5 text-aurora-text-secondary hover:text-[#FA4616] transition-colors"
                    title="Open study workspace"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRevisionTask(task.id)}
                    className="p-1.5 text-aurora-text-secondary hover:text-red-400 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Starred Days Section */}
      {(activeTab === 'all' || activeTab === 'starred') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Priority Starred Days ({starredDays.length})</span>
            </h3>
          </div>

          {starredDayObjects.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-secondary">
              No starred days yet. Click the star icon on any roadmap card to pin key days here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {starredDayObjects.map(day => (
                <div
                  key={day.dayNumber}
                  onClick={() => navigateToDay(day.dayNumber)}
                  className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border hover:border-aurora-indigo/50 cursor-pointer transition-all group bubble-card"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-surface text-[#FA4616] border border-aurora-border">
                      Day {day.dayNumber}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleStarDay(day.dayNumber);
                      }}
                      className="text-amber-400 p-1"
                    >
                      <Star className="w-4 h-4 fill-amber-400" />
                    </button>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-aurora-text-primary group-hover:text-[#FA4616] transition-colors">
                    {day.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-aurora-text-secondary line-clamp-2 mt-1.5 leading-relaxed">
                    {day.primaryObjective}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookmarked Concepts Section */}
      {(activeTab === 'all' || activeTab === 'bookmarks') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#FA4616]" />
              <span>Bookmarked Lessons ({bookmarkedConcepts.length})</span>
            </h3>
          </div>

          {bookmarkedConcepts.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-secondary">
              No bookmarked concepts yet. Bookmark topics inside the workspace to review them quickly.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedConcepts.map(bm => (
                <div
                  key={bm.id}
                  className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border flex flex-col justify-between bubble-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-aurora-bg-surface text-aurora-violet border border-aurora-border">
                        Day {bm.dayNumber}
                      </span>
                      <button
                        onClick={() => removeBookmark(bm.id)}
                        className="text-aurora-text-secondary hover:text-red-400 p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-aurora-text-primary mb-1">
                      {bm.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-aurora-text-secondary line-clamp-2 leading-relaxed">
                      {bm.snippet}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-aurora-border/60 flex items-center justify-between">
                    <span className="text-xs text-aurora-text-secondary">
                      Saved {new Date(bm.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => navigateToDay(bm.dayNumber, bm.topicId)}
                      className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-aurora-indigo hover:text-aurora-cyan transition-colors"
                    >
                      <span>Go to Lesson</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Incorrect Questions Review Queue */}
      {(activeTab === 'all' || activeTab === 'incorrect') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Incorrect Answers Queue ({incorrectQuestions.length})</span>
            </h3>
            <span className="text-xs text-aurora-text-secondary">
              Targeted Error Correction
            </span>
          </div>

          {incorrectQuestions.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-secondary">
              Zero mistakes currently logged! Take quizzes in the Practice Arena or Day Assessments.
            </div>
          ) : (
            <div className="space-y-3.5">
              {incorrectQuestions.map(item => (
                <div
                  key={item.questionId}
                  className="p-5 sm:p-6 rounded-2xl bg-aurora-bg-elevated border border-red-500/30 space-y-3.5 bubble-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-300 border border-red-500/30">
                      Day {item.dayNumber} • {item.topicTitle}
                    </span>
                    <button
                      onClick={() => removeIncorrectQuestion(item.questionId)}
                      className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Mastered & Clear</span>
                    </button>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-aurora-text-primary">
                    {item.question}
                  </h4>

                  {item.code && (
                    <pre className="p-4 rounded-xl bg-aurora-bg-primary border border-aurora-border font-mono text-xs sm:text-sm text-aurora-text-primary overflow-x-auto leading-relaxed">
                      <code>{item.code}</code>
                    </pre>
                  )}

                  <div className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border/60 text-xs sm:text-sm text-aurora-text-secondary leading-relaxed">
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                      Correct Answer: {item.options[item.correctAnswer]}
                    </div>
                    <div>
                      {item.explanation}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => navigateToDay(item.dayNumber)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-aurora-indigo hover:text-aurora-cyan transition-colors"
                    >
                      <span>Review Day {item.dayNumber} Material</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Notes Section */}
      {(activeTab === 'all' || activeTab === 'notes') && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-bold text-aurora-text-primary uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-aurora-indigo" />
              <span>Saved Personal Notes ({Object.keys(notes).length})</span>
            </h3>
          </div>

          {Object.keys(notes).length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-aurora-bg-elevated border border-aurora-border text-sm text-aurora-text-secondary">
              No personal notes saved yet. Write notes in any topic workspace!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(notes).map(([key, val]) => (
                <div
                  key={key}
                  className="p-5 rounded-xl bg-aurora-bg-elevated border border-aurora-border space-y-2 bubble-card"
                >
                  <div className="text-xs font-mono font-bold text-[#FA4616]">
                    {key}
                  </div>
                  <p className="text-xs sm:text-sm text-aurora-text-primary whitespace-pre-wrap leading-relaxed">
                    {val}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
