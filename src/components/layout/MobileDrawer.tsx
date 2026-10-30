import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  BarChart3,
  CalendarCheck,
  Library,
  HelpCircle,
  Repeat,
  FileText,
  Calendar,
  User,
  Moon,
  Sun,
  Globe,
  LogOut,
  GraduationCap,
  ShieldCheck,
  Flame,
  Award,
  Check,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { Language } from '../../types';
import { DEMO_STUDENT } from '../../data/mockData';

export const MobileDrawer: React.FC = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    currentUser,
    currentRole,
    language,
    setLanguage,
    isDarkMode,
    toggleDarkMode,
    openStudentDrawer,
    openProfileDrawer,
    logout,
  } = useAppStore();

  const t = translations[language];
  const student = (currentUser as typeof DEMO_STUDENT) || DEMO_STUDENT;

  const handleClose = () => {
    setMobileMenuOpen(false);
  };

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
    { to: '/teacher', label: 'Class Overview', icon: LayoutDashboard },
    { to: '/teacher/heatmap', label: 'Concept Heatmap', icon: BarChart3 },
    { to: '/teacher/assignments', label: 'Assign Tests', icon: Dumbbell },
    { to: '/teacher/doubts', label: 'Doubts Inbox', icon: HelpCircle },
    { to: '/teacher/exams', label: 'Exams & Marks', icon: CalendarCheck },
    { to: '/teacher/review', label: 'Content Review', icon: ShieldCheck },
  ];

  const navItems = currentRole === 'teacher' ? teacherNavItems : studentNavItems;

  return (
    <>
      {/* Dark overlay backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-in drawer container */}
      <aside
        aria-label="Mobile Navigation Menu"
        className={`fixed top-0 left-0 bottom-0 w-[84vw] max-w-xs bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out border-r border-slate-200 dark:border-slate-800 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                StudGrow
              </span>
              <p className="text-[10px] text-slate-400 font-semibold">Adaptive Learning</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Profile Header */}
        <div className="p-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 shrink-0">
          {currentRole === 'student' ? (
            <div
              onClick={() => {
                handleClose();
                openStudentDrawer(student.id);
              }}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <img
                src={student.avatar}
                alt=""
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
              />
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="font-bold text-slate-800 dark:text-white text-xs truncate">
                  {student.name}
                </p>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  Class {student.classGrade}{student.section} • Roll #{student.rollNumber}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-bold">
                  <span className="text-amber-500 flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-current" />
                    {student.streakDays}d
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Rank #{student.classRank}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="font-bold text-slate-800 dark:text-white text-xs truncate">
                  Dr. Sunita Rao
                </p>
                <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold truncate">
                  Faculty Member • Math & Science
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Main Links */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/' || item.to === '/teacher'}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold min-h-[44px] transition-all touch-manipulation ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Student Profile Quick Links */}
          {currentRole === 'student' && (
            <div className="space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Student Profile
              </p>
              <button
                onClick={() => {
                  handleClose();
                  openStudentDrawer(student.id);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] touch-manipulation text-left"
              >
                <User className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>My Account Record</span>
              </button>
              <button
                onClick={() => {
                  handleClose();
                  openProfileDrawer('report-cards');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] touch-manipulation text-left"
              >
                <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Term Report Cards</span>
              </button>
              <button
                onClick={() => {
                  handleClose();
                  openProfileDrawer('attendance');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] touch-manipulation text-left"
              >
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Attendance Heatmap</span>
              </button>
            </div>
          )}

          {/* Preferences: Dark Mode & Language */}
          <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Preferences
            </p>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 min-h-[44px]">
              <div className="flex items-center gap-2.5">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isDarkMode ? 'Dark Theme' : 'Light Theme'}
                </span>
              </div>
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="min-h-[44px] flex items-center touch-manipulation"
              >
                <div
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    isDarkMode ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transition-transform" />
                </div>
              </button>
            </div>

            {/* Language Selector */}
            <div className="px-1 space-y-1.5">
              <div className="flex items-center gap-2 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Language (భాష / भाषा)</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'te', label: 'తెలుగు' },
                  { code: 'hi', label: 'हिन्दी' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code as Language)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] touch-manipulation ${
                      language === l.code
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Logout */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => {
              handleClose();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs min-h-[44px] hover:bg-rose-500/20 active:scale-98 transition-all touch-manipulation"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
