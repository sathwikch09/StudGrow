import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, CheckCircle2, Dumbbell, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAdaptiveStore } from '../../store/useAdaptiveStore';

export const RevisionPage: React.FC = () => {
  const navigate = useNavigate();
  const { getRevisionQuestions, removeRevisionQuestion } = useAdaptiveStore();

  const revisionQuestions = getRevisionQuestions();

  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          Targeted Revision & Error Vault
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Automatically aggregated list of questions answered incorrectly during practice
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Repeat className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Items Requiring Review ({revisionQuestions.length})
            </h2>
          </div>

          {revisionQuestions.length > 0 && (
            <button
              onClick={() => navigate('/practice?concept=c-frac-3')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Start Full Revision Session
            </button>
          )}
        </div>

        {revisionQuestions.length > 0 ? (
          <div className="space-y-3">
            {revisionQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      q.difficulty === 'Hard'
                        ? 'bg-rose-500/10 text-rose-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                  <button
                    onClick={() => removeRevisionQuestion(q.id)}
                    className="text-slate-400 hover:text-emerald-500 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Mastered</span>
                  </button>
                </div>

                <p className="font-bold text-slate-800 dark:text-white text-sm">
                  {q.prompt}
                </p>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">Key takeaway:</strong> {q.explanation.whyCorrect}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => navigate(`/practice?concept=${q.conceptId}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-100 transition-colors"
                  >
                    <span>Practice Similar Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 dark:text-white text-base">
              All Clear! No Pending Errors
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Any questions you miss during practice tests will automatically appear here for reinforcement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
