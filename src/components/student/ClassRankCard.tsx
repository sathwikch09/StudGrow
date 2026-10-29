import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DEMO_STUDENT } from '../../data/mockData';

export const ClassRankCard: React.FC = () => {
  const { allStudents, currentUser, openStudentDrawer } = useAppStore();

  const student = (currentUser as typeof DEMO_STUDENT) || DEMO_STUDENT;

  // Sort students by monthly average score descending
  const sortedStudents = [...allStudents].sort(
    (a, b) => b.monthlyAverageScore - a.monthlyAverageScore
  );

  return (
    <div className="w-full glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Class 8A Standings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Friendly monthly progress & peer learning
            </p>
          </div>
        </div>

        {/* Current Student's Rank Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
          <span className="text-xs font-bold">Your Rank:</span>
          <span className="text-sm font-extrabold font-mono">
            #{student.classRank} of {student.totalStudentsInClass}
          </span>
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      </div>

      {/* Leaderboard Top 8 List */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {sortedStudents.slice(0, 8).map((st, index) => {
          const isCurrentUser = st.id === student.id;
          const rank = index + 1;

          return (
            <div
              key={st.id}
              onClick={() => openStudentDrawer(st.id)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs group ${
                isCurrentUser
                  ? 'bg-indigo-500/15 dark:bg-indigo-500/25 border-indigo-500/40 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank number badge */}
                <div
                  className={`w-6 h-6 rounded-lg font-bold font-mono text-[11px] flex items-center justify-center ${
                    rank === 1
                      ? 'bg-amber-400 text-amber-950 shadow-sm'
                      : rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : rank === 3
                      ? 'bg-amber-700/30 text-amber-900 dark:text-amber-200'
                      : 'text-slate-400'
                  }`}
                >
                  {rank === 1 ? <Crown className="w-3.5 h-3.5 text-amber-900" /> : rank}
                </div>

                <img
                  src={st.avatar}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                />

                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-bold transition-colors ${
                        isCurrentUser
                          ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600'
                      }`}
                    >
                      {st.name} {isCurrentUser && '(You)'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Roll #{st.rollNumber}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {st.streakDays}d streak • Level {st.level}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono-numbers font-bold text-slate-700 dark:text-slate-300">
                  {st.monthlyAverageScore}%
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
        <span>Click any student roll to view their profile</span>
        <span className="text-indigo-500 font-semibold cursor-pointer" onClick={() => openStudentDrawer(student.id)}>
          View Your Full Record →
        </span>
      </div>
    </div>
  );
};
