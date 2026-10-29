import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Dumbbell,
  HelpCircle,
  CalendarCheck,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { TeacherDashboard } from '../../components/teacher/TeacherDashboard';
import { ConceptHeatmap } from '../../components/teacher/ConceptHeatmap';
import { AssignmentManager } from '../../components/teacher/AssignmentManager';
import { DoubtsInbox } from '../../components/teacher/DoubtsInbox';
import { ExamMarksManager } from '../../components/teacher/ExamMarksManager';
import { ContentReviewPage } from './ContentReviewPage';

export const TeacherPortalPage: React.FC = () => {
  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      {/* Top Teacher Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { to: '/teacher', label: 'Class Overview', icon: LayoutDashboard, end: true },
          { to: '/teacher/heatmap', label: 'Concept Heatmap & Overrides', icon: BarChart3 },
          { to: '/teacher/assignments', label: 'Assign Practice Tests', icon: Dumbbell },
          { to: '/teacher/doubts', label: 'Student Doubts Inbox', icon: HelpCircle },
          { to: '/teacher/exams', label: 'Exams & Grade Entry', icon: CalendarCheck },
          { to: '/teacher/review', label: 'Curriculum & Question Review', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex items-center gap-2 py-3 px-3.5 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Sub-Routes */}
      <Routes>
        <Route path="" element={<TeacherDashboard />} />
        <Route path="heatmap" element={<ConceptHeatmap />} />
        <Route path="assignments" element={<AssignmentManager />} />
        <Route path="doubts" element={<DoubtsInbox />} />
        <Route path="exams" element={<ExamMarksManager />} />
        <Route path="review" element={<ContentReviewPage />} />
      </Routes>
    </div>
  );
};
