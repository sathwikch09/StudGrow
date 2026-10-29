import React, { useState } from 'react';
import {
  X,
  Award,
  Calendar,
  Flame,
  Star,
  FileText,
  MessageSquare,
  ShieldAlert,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import {
  MOCK_REPORT_CARD,
  MOCK_REVIEWS,
  MOCK_BEHAVIOUR,
  MOCK_DISCIPLINE,
  MOCK_DOUBTS,
} from '../../data/mockData';

export const StudentDetailDrawer: React.FC = () => {
  const { activeStudentDrawerId, closeStudentDrawer, allStudents } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'report' | 'reviews' | 'behaviour'>('overview');

  if (!activeStudentDrawerId) return null;

  const student = allStudents.find((s) => s.id === activeStudentDrawerId) || allStudents[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {student.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">
                  Roll #{student.rollNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                ID: {student.id} • Class {student.classGrade}-{student.section}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                <span className="flex items-center gap-1 text-amber-500">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {student.streakDays} Day Streak
                </span>
                <span className="flex items-center gap-1 text-indigo-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Level {student.level} ({student.xp} XP)
                </span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Rank #{student.classRank} of {student.totalStudentsInClass}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={closeStudentDrawer}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-900/50">
          {[
            { key: 'overview', label: 'Overview', icon: GraduationCap },
            { key: 'report', label: 'Report Card', icon: FileText },
            { key: 'attendance', label: 'Attendance', icon: Calendar },
            { key: 'reviews', label: 'Teacher Reviews', icon: MessageSquare },
            { key: 'behaviour', label: 'Behaviour & Points', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-all ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick metrics grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Average</p>
                  <p className="text-2xl font-bold font-mono-numbers text-indigo-600 dark:text-indigo-400 mt-1">
                    {student.monthlyAverageScore}%
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Attendance</p>
                  <p className="text-2xl font-bold font-mono-numbers text-emerald-600 dark:text-emerald-400 mt-1">
                    {student.attendancePercentage}%
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Class Rank</p>
                  <p className="text-2xl font-bold font-mono-numbers text-amber-600 dark:text-amber-400 mt-1">
                    #{student.classRank}
                  </p>
                </div>
              </div>

              {/* Bio & Contact details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Personal & Guardian Details
                </h3>
                <div className="grid grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>DOB: <strong>{student.dob}</strong> (PIN: {student.pinHash})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <span>Parent: {student.parentContact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-500" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span className="truncate">{student.address}</span>
                  </div>
                </div>
              </div>

              {/* Active Doubts */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">
                  Recent Doubts Asked
                </h3>
                <div className="space-y-2">
                  {MOCK_DOUBTS.map((d) => (
                    <div
                      key={d.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-xs"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{d.subjectName}: {d.conceptTitle}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'Answered' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {d.status}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{d.questionText}</p>
                      {d.teacherReply && (
                        <div className="mt-2 pl-3 border-l-2 border-indigo-500 text-slate-500 dark:text-slate-400 italic">
                          Reply from {d.teacherReply.teacherName}: "{d.teacherReply.replyText}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-base">
                    {MOCK_REPORT_CARD.term} Report Card ({MOCK_REPORT_CARD.academicYear})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Attendance: {MOCK_REPORT_CARD.attendanceDays}/{MOCK_REPORT_CARD.totalWorkingDays} days
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    Grade: {MOCK_REPORT_CARD.overallGrade} ({MOCK_REPORT_CARD.percentage}%)
                  </span>
                </div>
              </div>

              {/* Table of marks */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="p-3">Subject</th>
                      <th className="p-3 text-center">Max</th>
                      <th className="p-3 text-center">Scored</th>
                      <th className="p-3 text-center">Grade</th>
                      <th className="p-3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {MOCK_REPORT_CARD.marks.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{m.subject}</td>
                        <td className="p-3 text-center font-mono">{m.maxMarks}</td>
                        <td className="p-3 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">{m.scoredMarks}</td>
                        <td className="p-3 text-center font-bold">{m.grade}</td>
                        <td className="p-3 text-slate-500 dark:text-slate-400">{m.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">Class Teacher Remarks:</span>
                "{MOCK_REPORT_CARD.teacherRemarks}"
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Monthly Attendance Heatmap (October 2026)
                </h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  {student.attendancePercentage}% Present
                </span>
              </div>

              {/* 30-Day Heatmap grid */}
              <div className="grid grid-cols-7 gap-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-[10px] font-bold text-slate-400">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => {
                  const isAbsent = i === 12 || i === 24;
                  const isWeekend = i % 7 === 5 || i % 7 === 6;
                  return (
                    <div
                      key={i}
                      title={`Oct ${i + 1}: ${isWeekend ? 'Weekend' : isAbsent ? 'Absent' : 'Present'}`}
                      className={`h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-transform hover:scale-110 ${
                        isWeekend
                          ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400'
                          : isAbsent
                          ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                          : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500/30 border border-emerald-500/40" />
                  <span>Present (26 days)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-500" />
                  <span>Absent (2 days)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-800" />
                  <span>Weekend / Holiday</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                Teacher Feedback & Observations
              </h3>
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={rev.teacherAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{rev.teacherName}</p>
                        <p className="text-[10px] text-slate-400">{rev.subject} • {rev.date}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'behaviour' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Positive Points Log
                </h3>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 font-bold text-xs">
                  +45 Points Awarded
                </span>
              </div>
              <div className="space-y-2.5">
                {MOCK_BEHAVIOUR.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{b.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{b.category} • by {b.awardedBy} ({b.date})</p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">
                      +{b.points} pts
                    </span>
                  </div>
                ))}
              </div>

              {/* Discipline Records */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Discipline Records</span>
                </h3>
                {MOCK_DISCIPLINE.map((d) => (
                  <div key={d.id} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
                    <div className="flex justify-between items-center text-amber-700 dark:text-amber-400 font-bold mb-1">
                      <span>{d.issue}</span>
                      <span>{d.status}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{d.actionTaken} ({d.date})</p>
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
