import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Layers,
  Clock,
  PlayCircle,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_SUBJECTS } from '../../data/mockData';
import { useAdaptiveStore } from '../../store/useAdaptiveStore';

export const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('highlight') || 'maths';

  const [selectedGrade, setSelectedGrade] = useState<number>(8);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubject);
  const [expandedChapterId, setExpandedChapterId] = useState<string>('math-ch1');

  const getConceptState = useAdaptiveStore((s) => s.getConceptState);

  const activeSubject = MOCK_SUBJECTS.find((s) => s.id === selectedSubjectId) || MOCK_SUBJECTS[0];

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      {/* Header & Grade filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
            Curriculum & Learning Paths
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structured CBSE / State syllabus with adaptive concept breakdowns
          </p>
        </div>

        {/* Grade Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          {[6, 7, 8, 9, 10].map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Class {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {MOCK_SUBJECTS.map((s) => {
          const isSelected = s.id === activeSubject.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSubjectId(s.id);
                if (s.chapters.length > 0) {
                  setExpandedChapterId(s.chapters[0].id);
                }
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-indigo-500/50 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/60 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-white'
              }`}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span>{s.name}</span>
              <span className="text-[10px] font-mono text-slate-400">({s.masteryPercentage}%)</span>
            </button>
          );
        })}
      </div>

      {/* Chapters & Concepts List */}
      <div className="space-y-4">
        {activeSubject.chapters.length > 0 ? (
          activeSubject.chapters.map((ch) => {
            const isExpanded = expandedChapterId === ch.id;
            return (
              <div
                key={ch.id}
                className="glass-card rounded-3xl border border-white/40 dark:border-white/10 shadow-md overflow-hidden"
              >
                {/* Chapter Accordion Bar */}
                <div
                  onClick={() => setExpandedChapterId(isExpanded ? '' : ch.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold font-mono text-xs">
                      Ch {ch.order}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-white">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {ch.concepts.length} Concepts • Class {ch.classGrade}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500">
                      {isExpanded ? 'Hide Concepts' : 'Show Concepts'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Concepts list */}
                {isExpanded && (
                  <div className="p-5 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800/80">
                    {ch.concepts.map((concept) => {
                      const dynamicState = getConceptState(concept.id);
                      const isWeak = dynamicState.level === 'Needs Help';

                      return (
                        <div
                          key={concept.id}
                          className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-shadow"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                {concept.title}
                              </h4>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  dynamicState.level === 'Mastered'
                                    ? 'bg-emerald-500/10 text-emerald-600'
                                    : dynamicState.level === 'Good'
                                    ? 'bg-indigo-500/10 text-indigo-600'
                                    : dynamicState.level === 'Learning'
                                    ? 'bg-amber-500/10 text-amber-600'
                                    : 'bg-rose-500/10 text-rose-600 flex items-center gap-1'
                                }`}
                              >
                                {isWeak && <AlertCircle className="w-3 h-3" />}
                                {dynamicState.level} ({dynamicState.score}%)
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
                              {concept.summary}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 font-mono">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {concept.estimatedMinutes} mins
                              </span>
                              <span>•</span>
                              <span>Difficulty: {concept.difficulty}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => navigate(`/concept/${concept.id}`)}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
                            >
                              <PlayCircle className="w-4 h-4 text-indigo-500" />
                              <span>Learn</span>
                            </button>
                            <button
                              onClick={() => navigate(`/practice?concept=${concept.id}`)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all hover:scale-105"
                            >
                              <Dumbbell className="w-4 h-4" />
                              <span>Practice</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center glass-card rounded-3xl">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              Curriculum Modules Loading
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Chapters for {activeSubject.name} (Class {selectedGrade}) are being populated by your teacher.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
