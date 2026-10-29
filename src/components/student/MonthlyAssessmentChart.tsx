import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { BarChart2 } from 'lucide-react';
import { MOCK_MONTHLY_ASSESSMENTS } from '../../data/mockData';

export const MonthlyAssessmentChart: React.FC = () => {
  return (
    <div className="w-full glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Assessment Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your scores vs. Class 8A Average over time
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-indigo-600" />
            <span className="text-slate-600 dark:text-slate-300">You (86%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-teal-400" />
            <span className="text-slate-600 dark:text-slate-300">Class Avg (74%)</span>
          </div>
        </div>
      </div>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_MONTHLY_ASSESSMENTS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="studentColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="classColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="studentScore"
              name="Your Score"
              stroke="#4F46E5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#studentColor)"
            />
            <Area
              type="monotone"
              dataKey="classAverage"
              name="Class Average"
              stroke="#14B8A6"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#classColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
