import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ExamsPage: React.FC = () => {
  const exams = useAppStore((s) => s.exams);
  const navigate = useNavigate();

  const upcoming = exams.filter((e) => e.status === 'upcoming');
  const past = exams.filter((e) => e.status === 'completed');

  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          Exams, Tests & Timetable
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Official school assessments schedule with syllabus breakdowns
        </p>
      </div>

      {/* Upcoming Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Upcoming Assessments ({upcoming.length})
          </h2>
        </div>

        <div className="space-y-4">
          {upcoming.map((ex) => (
            <div
              key={ex.id}
              className={`p-5 rounded-2xl border transition-all ${
                ex.isUrgent
                  ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-500/30'
                  : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">
                      {ex.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono">
                      {ex.subjectName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 font-mono">
                    <span>Date: {ex.date}</span>
                    <span>•</span>
                    <span>Duration: {ex.durationMinutes} mins</span>
                    <span>•</span>
                    <span>Total Marks: {ex.totalMarks}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold font-mono flex items-center gap-1.5 ${
                      ex.daysRemaining <= 3
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {ex.daysRemaining} days remaining
                  </span>
                  <button
                    onClick={() => navigate('/practice?concept=c-frac-3')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
                  >
                    Start Revision
                  </button>
                </div>
              </div>

              {/* Syllabus */}
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Assigned Syllabus:
                </span>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {ex.syllabus.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Completed Section */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Past Results & Score Cards ({past.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {past.map((ex) => (
            <div
              key={ex.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">{ex.title}</h4>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Conducted on {ex.date} • Class Avg: {ex.classAverage}/{ex.totalMarks}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  {ex.scoredMarks}/{ex.totalMarks}
                </span>
                <span className="block text-[10px] font-bold text-slate-400">Grade: {ex.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
