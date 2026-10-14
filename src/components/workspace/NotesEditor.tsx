import React, { useState, useEffect } from 'react';
import { Bookmark, Save, Check, FileText } from 'lucide-react';
import { useStudy } from '../../context/StudyContext';
import { TopicItem } from '../../types/roadmap';

interface NotesEditorProps {
  dayNumber: number;
  topic: TopicItem;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ dayNumber, topic }) => {
  const {
    getNote,
    saveNote,
    addBookmark,
    removeBookmark,
    isBookmarked,
    bookmarkedConcepts
  } = useStudy();

  const noteKey = `note-day${dayNumber}-${topic.id}`;
  const [content, setContent] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    setContent(getNote(noteKey));
  }, [noteKey, getNote]);

  const handleSave = () => {
    saveNote(noteKey, content);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const topicIsBookmarked = isBookmarked(topic.id);
  const currentBookmark = bookmarkedConcepts.find(b => b.topicId === topic.id);

  const handleToggleBookmark = () => {
    if (topicIsBookmarked && currentBookmark) {
      removeBookmark(currentBookmark.id);
    } else {
      addBookmark({
        dayNumber,
        topicId: topic.id,
        title: topic.title,
        snippet: topic.summary
      });
    }
  };

  return (
    <div className="rounded-2xl border border-aurora-border bg-aurora-bg-elevated p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#FA4616]" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Personal Notes & Bookmarks
          </h4>
        </div>

        <button
          onClick={handleToggleBookmark}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
            topicIsBookmarked
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
              : 'border-aurora-border text-aurora-text-secondary hover:text-white'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${topicIsBookmarked ? 'fill-amber-400' : ''}`} />
          <span>{topicIsBookmarked ? 'Bookmarked' : 'Bookmark Concept'}</span>
        </button>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Record key interview takeaways, self-explanations, or quick syntax mnemonics for this topic..."
        rows={4}
        className="w-full bg-aurora-bg-surface border border-aurora-border rounded-xl p-3 text-xs text-aurora-text-primary placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] leading-relaxed resize-y"
      />

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-aurora-text-secondary">
          Changes persist across browser refreshes
        </span>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#FA4616] hover:bg-[#E03D0F] text-white shadow-sm shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          {savedStatus ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
