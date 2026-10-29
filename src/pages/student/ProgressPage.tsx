import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Award, Flame } from 'lucide-react';
import { MOCK_SUBJECTS } from '../../data/mockData';
import { useAdaptiveStore } from '../../store/useAdaptiveStore';

export const ProgressPage: React.FC = () => {
  const conceptMastery = useAdaptiveStore((s) => s.conceptMastery);

  const subjectData = MOCK_SUBJECTS.map((s) => ({
    name: s.name.split(' ')[0],
    fullName: s.name,
    mastery: s.masteryPercentage,
    color: s.color,
  }));

  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          Comprehensive Learning Progress & Analytics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Continuous assessment based on your adaptive problem solving
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <p className="text-xs text-slate-400 font-semibold">Overall Mastery</p>
          <p className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            82.5%
          </p>
          <p className="text-[11px] text-emerald-500 font-bold mt-1">↑ 5.2% this month</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <p className="text-xs text-slate-400 font-semibold">Active Streak</p>
          <p className="text-2xl font-extrabold font-mono text-amber-500 mt-1 flex items-center gap-1">
            14 Days <Flame className="w-5 h-5 fill-current" />
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Personal record: 21 days</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <p className="text-xs text-slate-400 font-semibold">Total XP Earned</p>
          <p className="text-2xl font-extrabold font-mono text-slate-800 dark:text-white mt-1">
            2,840 XP
          </p>
          <p className="text-[11px] text-indigo-500 font-bold mt-1">Level 6 Scholar</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <p className="text-xs text-slate-400 font-semibold">Class Standing</p>
          <p className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            Rank #5
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Top 12% in Class 8A</p>
        </div>
      </div>

      {/* Subject-Wise Competency Chart */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Subject Mastery Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluated across chapters and daily practice tests
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-full">
            All 6 Subjects
          </span>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="mastery" radius={[8, 8, 0, 0]}>
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strong vs Weak Concepts Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Concepts */}
        <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold">Strong Concepts (Mastered)</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Concepts where you answered with &gt;85% accuracy and fast completion
          </p>

          <div className="space-y-2 pt-2">
            {[
              { name: 'Equivalent Fractions & Simplification', subject: 'Maths', score: 92 },
              { name: 'Cell Membrane & Plant Cell Wall', subject: 'Science', score: 88 },
              { name: 'Balancing Linear Equations', subject: 'Maths', score: 85 },
            ].map((c, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.subject}</p>
                </div>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {c.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Concepts (Need Help) */}
        <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold">Recommended for Revision</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Targeted topics where extra practice will boost your overall grade
          </p>

          <div className="space-y-2 pt-2">
            {[
              { name: 'Word Problems on Fractions', subject: 'Maths', score: 48, status: 'Needs Help' },
              { name: 'Addition of Unlike Fractions', subject: 'Maths', score: 68, status: 'Learning' },
            ].map((c, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.subject} • {c.status}</p>
                </div>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                  {c.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
