import React, { useState } from 'react';
import { Layers, Lock, Unlock, SkipForward, Sliders, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MOCK_SUBJECTS } from '../../data/mockData';

export const ConceptHeatmap: React.FC = () => {
  const { allStudents, openStudentDrawer } = useAppStore();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [overrideModalOpen, setOverrideModalOpen] = useState(false);
  const [overrideStudentId, setOverrideStudentId] = useState<string | null>(null);
  const [overrideDifficulty, setOverrideDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [isLocked, setIsLocked] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  // Extract concepts
  const concepts = [
    { id: 'c-frac-1', title: 'Equivalent Fractions', chapter: 'Rational Numbers' },
    { id: 'c-frac-2', title: 'Fraction Addition', chapter: 'Rational Numbers' },
    { id: 'c-frac-3', title: 'Word Problems (Fractions)', chapter: 'Rational Numbers' },
    { id: 'c-lin-1', title: 'Balancing Equations', chapter: 'Linear Equations' },
    { id: 'c-cell-1', title: 'Plant vs Animal Cells', chapter: 'Cell Biology' },
  ];

  // Helper to generate realistic student mastery for each concept
  const getStudentConceptScore = (studentIndex: number, conceptId: string) => {
    if (conceptId === 'c-frac-3') {
      // Word problems - generally lower for demo realism
      return [48, 88, 82, 75, 71, 64, 52, 60, 42, 38][studentIndex % 10];
    }
    if (conceptId === 'c-frac-1') {
      return [92, 96, 90, 88, 85, 80, 78, 82, 70, 65][studentIndex % 10];
    }
    return [78, 84, 80, 76, 82, 75, 70, 74, 62, 58][studentIndex % 10];
  };

  const handleCellClick = (studentId: string, conceptId: string) => {
    setSelectedConcept(conceptId);
    setOverrideStudentId(studentId);
    setOverrideModalOpen(true);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Concept Mastery Matrix & Heatmap
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Student × Concept competency grid with teacher lock, skip, and difficulty overrides
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-300">Mastered (80%+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-400" />
            <span className="text-slate-600 dark:text-slate-300">Learning (60-79%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-rose-500" />
            <span className="text-slate-600 dark:text-slate-300">Needs Help (&lt;60%)</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="p-3 text-left font-bold text-slate-600 dark:text-slate-300 w-48">
                Student
              </th>
              {concepts.map((c) => (
                <th key={c.id} className="p-3 text-center font-bold text-slate-600 dark:text-slate-300">
                  <div className="font-semibold text-slate-800 dark:text-white">{c.title}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{c.chapter}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {allStudents.slice(0, 10).map((st, sIdx) => (
              <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td
                  onClick={() => openStudentDrawer(st.id)}
                  className="p-3 font-semibold text-slate-800 dark:text-slate-200 cursor-pointer hover:text-indigo-600"
                >
                  <div className="flex items-center gap-2">
                    <img src={st.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span>{st.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">#{st.rollNumber}</span>
                  </div>
                </td>

                {concepts.map((c) => {
                  const score = getStudentConceptScore(sIdx, c.id);
                  const isRed = score < 60;
                  const isYellow = score >= 60 && score < 80;

                  return (
                    <td key={c.id} className="p-2 text-center">
                      <button
                        onClick={() => handleCellClick(st.id, c.id)}
                        title="Click to override adaptive difficulty or lock concept"
                        className={`w-full py-2 px-1 rounded-xl font-mono font-bold text-xs transition-transform hover:scale-105 shadow-sm ${
                          isRed
                            ? 'bg-rose-500 text-white shadow-rose-500/20'
                            : isYellow
                            ? 'bg-amber-400 text-amber-950 shadow-amber-400/20'
                            : 'bg-emerald-500 text-white shadow-emerald-500/20'
                        }`}
                      >
                        {score}%
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Override / Lock Modal */}
      {overrideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  Teacher Adaptive Control Override
                </h3>
              </div>
              <button
                onClick={() => setOverrideModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Directly override AI adaptive behavior for this student and concept.
            </p>

            {/* Difficulty Override */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Force Question Difficulty:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setOverrideDifficulty(d)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      overrideDifficulty === d
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Lock / Skip Toggles */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Lock Concept for Student
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isLocked}
                  onChange={(e) => setIsLocked(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <SkipForward className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Mark Concept as Skipped (Advance Student)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isSkipped}
                  onChange={(e) => setIsSkipped(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setOverrideModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Adaptive Override saved: Difficulty set to ${overrideDifficulty}, Locked: ${isLocked}, Skipped: ${isSkipped}`);
                  setOverrideModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Apply Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
