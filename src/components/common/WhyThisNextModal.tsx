import React from 'react';
import { Sparkles, BrainCircuit, ArrowUpRight, ArrowDownRight, Layers, HelpCircle, X } from 'lucide-react';
import { useAdaptiveStore } from '../../store/useAdaptiveStore';

interface WhyThisNextProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhyThisNextModal: React.FC<WhyThisNextProps> = ({ isOpen, onClose }) => {
  const { adaptiveLogs, lastDecisionReason, activeQuestionDifficulty, isSimplerModeActive } = useAdaptiveStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg glass-card rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-white/10 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Why this next?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                StudGrow Adaptive Engine Decision Explainability
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Decision */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Active Algorithm Assessment</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
            "{lastDecisionReason}"
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold">
              Difficulty: {activeQuestionDifficulty}
            </span>
            {isSimplerModeActive && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold animate-pulse">
                Simpler Visual Scaffold ON
              </span>
            )}
          </div>
        </div>

        {/* Past Adaptive Decision Log */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Recent Adaptive Path History
          </h4>
          <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
            {adaptiveLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-start gap-3 text-xs"
              >
                <div className="mt-0.5">
                  {log.action === 'increase_difficulty' || log.action === 'streak_bonus' ? (
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  ) : log.action === 'switch_to_simpler' ? (
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                      <ArrowDownRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                    <span className="font-semibold uppercase tracking-wide">
                      {log.fromDifficulty} → {log.toDifficulty}
                    </span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{log.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            Got it, continue learning
          </button>
        </div>
      </div>
    </div>
  );
};
