import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  BarChart3,
  CalendarCheck,
  Library,
  HelpCircle,
  Repeat,
  GraduationCap,
  Flame,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { DEMO_STUDENT } from '../../data/mockData';

export const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
    language,
    currentRole,
  } = useAppStore();

  const t = translations[language];

  const studentNavItems = [
    { to: '/', label: t.navDashboard, icon: LayoutDashboard },
    { to: '/subjects', label: t.navSubjects, icon: BookOpen },
    { to: '/practice', label: t.navPractice, icon: Dumbbell },
    { to: '/progress', label: t.navProgress, icon: BarChart3 },
    { to: '/exams', label: t.navExams, icon: CalendarCheck },
    { to: '/library', label: t.navLibrary, icon: Library },
    { to: '/doubts', label: t.navDoubts, icon: HelpCircle },
    { to: '/revision', label: t.navRevision, icon: Repeat },
  ];

  const teacherNavItems = [
    { to: '/teacher', label: 'Teacher Dashboard', icon: LayoutDashboard },
    { to: '/teacher/heatmap', label: 'Concept Heatmap', icon: BarChart3 },
    { to: '/teacher/assignments', label: 'Assign Tests', icon: Dumbbell },
    { to: '/teacher/doubts', label: 'Doubts Inbox', icon: HelpCircle },
    { to: '/teacher/exams', label: 'Exams & Marks', icon: CalendarCheck },
    { to: '/teacher/review', label: 'Content Review', icon: ShieldCheck },
  ];

  const navItems = currentRole === 'teacher' ? teacherNavItems : studentNavItems;

  return (
    <aside
      className={`h-full glass-card border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 flex flex-col justify-between shrink-0 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation links */}
      <div className="p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/' || item.to === '/teacher'}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-indigo-600 dark:hover:text-indigo-400'
                } ${sidebarCollapsed ? 'justify-center' : ''}`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User Status & Collapse */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
        {/* Streak summary pill if student */}
        {currentRole === 'student' && !sidebarCollapsed && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-current animate-bounce" />
              <span className="font-bold text-amber-700 dark:text-amber-400">
                14-Day Streak
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
              +150 XP
            </span>
          </div>
        )}

        {/* Faculty badge if teacher */}
        {currentRole === 'teacher' && !sidebarCollapsed && (
          <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2 text-xs">
            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-bold text-purple-700 dark:text-purple-300 truncate">Dr. Sunita Rao</p>
              <p className="text-[10px] text-slate-400">Classes: 8A, 8B, 9A</p>
            </div>
          </div>
        )}

        {/* Collapse toggle button */}
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-semibold">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
