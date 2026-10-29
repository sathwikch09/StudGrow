import React from 'react';
import { Target, CheckCircle2, Award, Zap, Shield, Sparkles } from 'lucide-react';

export const DailyGoalsBadges: React.FC = () => {
  const goals = [
    { label: 'Complete 10 Practice Questions', current: 8, target: 10, done: false },
    { label: 'Revise 1 Weak Concept', current: 1, target: 1, done: true },
    { label: '15 Minutes Adaptive Study', current: 14, target: 15, done: false },
  ];

  const badges = [
    { name: '14-Day Streak', icon: '🔥', desc: 'Consistency Champion', color: 'from-amber-500 to-orange-500' },
    { name: 'Fractions Pioneer', icon: '➗', desc: 'Mastered 3 Chapters', color: 'from-indigo-500 to-purple-500' },
    { name: 'Speed Solver', icon: '⚡', desc: '5 Qs under 15s', color: 'from-teal-400 to-emerald-500' },
    { name: 'Peer Helper', icon: '🤝', desc: 'Helped in Science Lab', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
      {/* Daily Goals */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Daily Study Goals
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2 of 3 completed today
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-500/10 px-2.5 py-1 rounded-full">
            +50 Bonus XP
          </span>
        </div>

        <div className="space-y-3">
          {goals.map((g, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-semibold ${g.done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {g.label}
                </span>
                <span className="font-mono text-slate-500 text-[11px]">
                  {g.current}/{g.target}
                </span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    g.done ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${Math.min(100, (g.current / g.target) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked Badges */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Earned Badges
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showcasing effort & milestones
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full">
            4 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 flex items-center gap-2.5 hover:scale-102 transition-transform"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${b.color} flex items-center justify-center text-lg shadow-sm shrink-0`}>
                {b.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {b.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
