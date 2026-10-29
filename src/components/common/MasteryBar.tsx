import React from 'react';
import { MasteryLevel } from '../../types';

interface MasteryBarProps {
  score: number; // 0-100
  level?: MasteryLevel;
  height?: string;
  showLabel?: boolean;
}

export const MasteryBar: React.FC<MasteryBarProps> = ({
  score,
  level,
  height = 'h-2.5',
  showLabel = true,
}) => {
  // Determine gradient color based on score
  const getGradient = () => {
    if (score >= 90) return 'from-teal-400 to-emerald-500 shadow-teal-500/20';
    if (score >= 75) return 'from-indigo-500 to-violet-600 shadow-indigo-500/20';
    if (score >= 60) return 'from-amber-400 to-orange-500 shadow-amber-500/20';
    return 'from-rose-500 to-pink-500 shadow-rose-500/20';
  };

  const getBadgeColor = () => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10';
    if (score >= 75) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400 bg-amber-500/10';
    return 'text-rose-600 dark:text-rose-400 bg-rose-500/10';
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
          <span className="text-slate-500 dark:text-slate-400">Concept Mastery</span>
          <div className="flex items-center gap-2">
            {level && (
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${getBadgeColor()}`}>
                {level}
              </span>
            )}
            <span className="font-mono-numbers text-slate-800 dark:text-slate-200">
              {Math.round(score)}%
            </span>
          </div>
        </div>
      )}
      <div className={`w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 ${height}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getGradient()} transition-all duration-700 ease-out shadow-sm`}
          style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
        />
      </div>
    </div>
  );
};
