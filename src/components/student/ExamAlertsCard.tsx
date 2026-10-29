import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, Calendar, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ExamAlertsCard: React.FC = () => {
  const exams = useAppStore((s) => s.exams);
  const navigate = useNavigate();

  const upcomingExams = exams.filter((e) => e.status === 'upcoming');
  const completedExams = exams.filter((e) => e.status === 'completed');

  const urgentExam = upcomingExams.find((e) => e.daysRemaining <= 3);

  return (
    <div className="w-full space-y-4">
      {/* Urgent Alert Banner (< 3 days) */}
      {urgentExam && (
        <div className="w-full rounded-3xl p-4 bg-gradient-to-r from-rose-500/15 via-orange-500/15 to-amber-500/15 border border-rose-500/30 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center animate-bounce shadow-md shadow-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Urgent Exam Alert ({urgentExam.daysRemaining} Days Left)
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                {urgentExam.title} is coming up on {urgentExam.date}!
              </h4>
            </div>
          </div>

          <button
            onClick={() => navigate('/practice?concept=c-frac-3')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all hover:scale-105 shrink-0"
          >
            Start Revising Now
          </button>
        </div>
      )}

      {/* Main Exams List Card */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg select-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Upcoming Exams & Quizzes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Synchronized with school term timetable
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/exams')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            All Exams <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Exams List */}
        <div className="space-y-3">
          {upcomingExams.map((ex) => (
            <div
              key={ex.id}
              className={`p-4 rounded-2xl border transition-all ${
                ex.isUrgent
                  ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-500/30'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {ex.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {ex.subjectName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 font-mono">
                    <span>Date: {ex.date}</span>
                    <span>•</span>
                    <span>Duration: {ex.durationMinutes} mins</span>
                    <span>•</span>
                    <span>Total: {ex.totalMarks} Marks</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-extrabold font-mono flex items-center gap-1 ${
                      ex.daysRemaining <= 3
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {ex.daysRemaining} days left
                  </span>
                  <button
                    onClick={() => navigate(`/practice?concept=c-frac-1`)}
                    className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Revise
                  </button>
                </div>
              </div>

              {/* Syllabus pills */}
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800">
                {ex.syllabus.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Recent results preview */}
          {completedExams.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recently Completed Assessment Results
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {completedExams.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{ex.subjectName}</p>
                      <p className="text-[10px] text-slate-400">Class Avg: {ex.classAverage}/{ex.totalMarks}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        {ex.scoredMarks}/{ex.totalMarks}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-400">Grade: {ex.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
