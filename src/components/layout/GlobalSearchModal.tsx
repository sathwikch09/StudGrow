import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, User, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MOCK_SUBJECTS } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const {
    globalSearchOpen,
    setGlobalSearchOpen,
    allStudents,
    openStudentDrawer,
  } = useAppStore();

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(!globalSearchOpen);
      }
      if (e.key === 'Escape' && globalSearchOpen) {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [globalSearchOpen, setGlobalSearchOpen]);

  if (!globalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter items
  const matchedSubjects = MOCK_SUBJECTS.filter(
    (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  );

  const matchedConcepts: Array<{ id: string; title: string; subject: string; difficulty: string }> = [];
  MOCK_SUBJECTS.forEach((s) => {
    s.chapters.forEach((ch) => {
      ch.concepts.forEach((c) => {
        if (c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)) {
          matchedConcepts.push({
            id: c.id,
            title: c.title,
            subject: s.name,
            difficulty: c.difficulty,
          });
        }
      });
    });
  });

  const matchedStudents = allStudents.filter(
    (st) =>
      st.name.toLowerCase().includes(q) ||
      st.rollNumber.includes(q) ||
      st.id.toLowerCase().includes(q)
  );

  const handleSelectConcept = (conceptId: string) => {
    setGlobalSearchOpen(false);
    navigate(`/concept/${conceptId}`);
  };

  const handleSelectSubject = (subjectId: string) => {
    setGlobalSearchOpen(false);
    navigate(`/subjects?highlight=${subjectId}`);
  };

  const handleSelectStudent = (studentId: string) => {
    setGlobalSearchOpen(false);
    openStudentDrawer(studentId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl glass-card rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, concepts, chapters, students..."
            autoFocus
            className="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Concepts Section */}
          {matchedConcepts.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                Concepts ({matchedConcepts.length})
              </p>
              <div className="space-y-1">
                {matchedConcepts.slice(0, 5).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectConcept(c.id)}
                    className="p-2.5 rounded-xl hover:bg-indigo-500/10 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600">
                        {c.title}
                      </span>
                      <span className="text-[10px] text-slate-400">({c.subject})</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subjects Section */}
          {matchedSubjects.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                Subjects ({matchedSubjects.length})
              </p>
              <div className="space-y-1">
                {matchedSubjects.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectSubject(s.id)}
                    className="p-2.5 rounded-xl hover:bg-indigo-500/10 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4" style={{ color: s.color }} />
                      <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600">
                        {s.name} ({s.code})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{s.masteryPercentage}% mastery</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Section */}
          {matchedStudents.length > 0 && (
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                Students ({matchedStudents.length})
              </p>
              <div className="space-y-1">
                {matchedStudents.slice(0, 4).map((st) => (
                  <div
                    key={st.id}
                    onClick={() => handleSelectStudent(st.id)}
                    className="p-2.5 rounded-xl hover:bg-indigo-500/10 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-indigo-500" />
                      <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600">
                        {st.name} (Roll #{st.rollNumber})
                      </span>
                      <span className="text-[10px] text-slate-400">Class {st.classGrade}-{st.section}</span>
                    </div>
                    <span className="text-[10px] text-indigo-500 font-bold">Open Profile →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedConcepts.length === 0 && matchedSubjects.length === 0 && matchedStudents.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              <p>No matching subjects or concepts found for "{query}".</p>
              <p className="text-[11px] mt-1">Try "Fractions", "Cell", "Mathematics", or roll numbers like "08".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
