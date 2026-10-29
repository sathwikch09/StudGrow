import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';
import { Hint } from '../../types';

interface HintPanelProps {
  hints: Hint[];
  hintsUsedCount: number;
  onUseHint: () => void;
  disabled?: boolean;
}

export const HintPanel: React.FC<HintPanelProps> = ({
  hints,
  hintsUsedCount,
  onUseHint,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableCount = hints.length;
  const canUnlockNext = hintsUsedCount < availableCount;

  return (
    <div className="w-full rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-4 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Lightbulb className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300">
              Adaptive Progressive Hints ({hintsUsedCount} of {availableCount} used)
            </h4>
            <p className="text-[10px] text-amber-600 dark:text-amber-400">
              Hints guide your thinking step-by-step without blocking you
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canUnlockNext && (
            <button
              onClick={() => {
                onUseHint();
                setIsOpen(true);
              }}
              disabled={disabled}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {hintsUsedCount === 0
                  ? 'Get Hint 1 (Nudge)'
                  : hintsUsedCount === 1
                  ? 'Get Hint 2 (Clue)'
                  : 'Get Hint 3 (Near Solution)'}
              </span>
            </button>
          )}

          {hintsUsedCount > 0 && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-xl text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 transition-colors"
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Revealed hints list */}
      {isOpen && hintsUsedCount > 0 && (
        <div className="mt-3 pt-3 border-t border-amber-500/20 space-y-2">
          {hints.slice(0, hintsUsedCount).map((hint, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200 dark:border-amber-900 text-xs shadow-sm animate-fade-in"
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                <span>
                  {hint.type === 'nudge'
                    ? '💡 Level 1: Gentle Nudge'
                    : hint.type === 'clue'
                    ? '🔍 Level 2: Key Clue'
                    : '🎯 Level 3: Near-Solution Step'}
                </span>
                <span className="text-slate-400">-{hint.xpPenalty} XP bonus</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                {hint.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
