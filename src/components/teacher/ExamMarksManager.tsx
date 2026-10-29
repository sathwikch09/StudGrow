import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle2, TrendingUp, Save } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ExamMarksManager: React.FC = () => {
  const { exams, scheduleExam, allStudents, updateStudentMarks } = useAppStore();

  const [examTitle, setExamTitle] = useState('');
  const [examSubject, setExamSubject] = useState('maths');
  const [examDate, setExamDate] = useState('2026-11-10');
  const [examDuration, setExamDuration] = useState(90);
  const [examTotalMarks, setExamTotalMarks] = useState(80);
  const [examSyllabus, setExamSyllabus] = useState('Chapter 3: Quadrilaterals & Geometry');
  const [examScheduledNotice, setExamScheduledNotice] = useState(false);

  // Student Marks editor state
  const [marksState, setMarksState] = useState<Record<string, number>>(
    Object.fromEntries(allStudents.map((s) => [s.id, s.monthlyAverageScore]))
  );
  const [marksSavedNotice, setMarksSavedNotice] = useState(false);

  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) return;

    const subjectName = examSubject === 'maths' ? 'Mathematics' : examSubject === 'science' ? 'Science' : 'English';

    scheduleExam({
      title: examTitle,
      subjectId: examSubject,
      subjectName,
      date: examDate,
      durationMinutes: Number(examDuration),
      totalMarks: Number(examTotalMarks),
      syllabus: [examSyllabus],
    });

    setExamScheduledNotice(true);
    setExamTitle('');
    setTimeout(() => setExamScheduledNotice(false), 3000);
  };

  const handleSaveMarks = () => {
    Object.entries(marksState).forEach(([studentId, score]) => {
      updateStudentMarks(studentId, score);
    });
    setMarksSavedNotice(true);
    setTimeout(() => setMarksSavedNotice(false), 3000);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Exam Scheduling & Monthly Assessment Grade Entry
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Scheduling updates student countdowns; marks directly recalibrate class standings and charts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schedule New Exam Form */}
        <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Plus className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">
              Schedule Exam / Unit Test
            </h3>
          </div>

          <form onSubmit={handleScheduleExam} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Exam Title
              </label>
              <input
                type="text"
                required
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="e.g. Quadrilaterals Unit Test"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Subject
              </label>
              <select
                value={examSubject}
                onChange={(e) => setExamSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="maths">Mathematics</option>
                <option value="science">General Science</option>
                <option value="english">English Language</option>
                <option value="social">Social Science</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Exam Date
                </label>
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  required
                  value={examDuration}
                  onChange={(e) => setExamDuration(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Syllabus Topics
              </label>
              <input
                type="text"
                required
                value={examSyllabus}
                onChange={(e) => setExamSyllabus(e.target.value)}
                placeholder="e.g. Parallelogram properties, Rhombus diagonals"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none"
              />
            </div>

            {examScheduledNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Exam scheduled & countdown pushed to student portal!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule & Dispatch Alert</span>
            </button>
          </form>
        </div>

        {/* Right: Enter Assessment Marks for Class */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                Enter October Monthly Assessment Scores
              </h3>
              <p className="text-[11px] text-slate-400">
                Updating values immediately updates the student's rank and chart trajectory.
              </p>
            </div>

            <button
              onClick={handleSaveMarks}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Update Ranks</span>
            </button>
          </div>

          {marksSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Marks recorded! Class rankings and trajectories updated successfully.</span>
            </div>
          )}

          <div className="max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Student</th>
                  <th className="p-3 text-center">Current Score</th>
                  <th className="p-3 text-center">New Score Entry (/100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-slate-600">
                      #{st.rollNumber}
                    </td>
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <img src={st.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span>{st.name}</span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-indigo-600">
                      {st.monthlyAverageScore}%
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={marksState[st.id] ?? st.monthlyAverageScore}
                        onChange={(e) =>
                          setMarksState({
                            ...marksState,
                            [st.id]: Number(e.target.value),
                          })
                        }
                        className="w-20 p-1.5 rounded-lg text-center font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
