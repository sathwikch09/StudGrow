import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { MasteryBar } from '../common/MasteryBar';
import { useAdaptiveStore } from '../../store/useAdaptiveStore';

export const ContinueLearningCard: React.FC = () => {
  const navigate = useNavigate();
  const getConceptState = useAdaptiveStore((s) => s.getConceptState);
  const fracState = getConceptState('c-frac-3');

  return (
    <div className="w-full glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Continue Where You Left Off
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Focus Concept
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Word Problems on Fractions (Multi-Step & Remainder)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mathematics • Chapter 1: Rational Numbers & Operations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/concept/c-frac-3')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 hover:scale-105"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Resume Lesson</span>
          </button>
          <button
            onClick={() => navigate('/practice?concept=c-frac-3')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
          >
            <span>Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Estimated time */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <MasteryBar
          score={fracState.score}
          level={fracState.level}
          showLabel={true}
        />
        <div className="flex justify-between items-center text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Estimated: 15 mins remaining
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer" onClick={() => navigate('/concept/c-frac-3')}>
            Switch to Visual Scaffold →
          </span>
        </div>
      </div>
    </div>
  );
};
