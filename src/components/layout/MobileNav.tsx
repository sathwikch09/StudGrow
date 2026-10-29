import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  BarChart3,
  CalendarCheck,
  HelpCircle,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MobileNav: React.FC = () => {
  const currentRole = useAppStore((s) => s.currentRole);

  const studentItems = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/practice', label: 'Practice', icon: Dumbbell },
    { to: '/progress', label: 'Progress', icon: BarChart3 },
    { to: '/exams', label: 'Exams', icon: CalendarCheck },
    { to: '/doubts', label: 'Doubts', icon: HelpCircle },
  ];

  const teacherItems = [
    { to: '/teacher', label: 'Overview', icon: LayoutDashboard },
    { to: '/teacher/heatmap', label: 'Heatmap', icon: BarChart3 },
    { to: '/teacher/assignments', label: 'Assign', icon: Dumbbell },
    { to: '/teacher/doubts', label: 'Doubts', icon: HelpCircle },
    { to: '/teacher/exams', label: 'Marks', icon: CalendarCheck },
  ];

  const items = currentRole === 'teacher' ? teacherItems : studentItems;

  return (
    <nav className="md:hidden h-16 w-full glass-card border-t border-slate-200/80 dark:border-slate-800/80 px-2 flex items-center justify-around shrink-0 z-40 select-none">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/' || item.to === '/teacher'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
