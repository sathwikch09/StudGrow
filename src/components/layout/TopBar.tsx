import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  BookOpen,
  User,
  Key,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Award,
  Calendar,
  Shield,
  HelpCircle,
  Clock,
  Layers,
  GraduationCap,
  LogOut,
  Globe,
  Check,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { SyncIndicator } from '../common/SyncIndicator';
import { ThemeToggle } from '../common/ThemeToggle';
import { Language } from '../../types';
import { DEMO_STUDENT } from '../../data/mockData';

export const TopBar: React.FC = () => {
  const {
    currentUser,
    currentRole,
    toggleSidebar,
    toggleMobileMenu,
    setGlobalSearchOpen,
    notifications,
    notificationsOpen,
    setNotificationsOpen,
    markNotificationRead,
    openProfileDrawer,
    openStudentDrawer,
    language,
    setLanguage,
    logout,
  } = useAppStore();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleHamburgerClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      toggleMobileMenu();
    } else {
      toggleSidebar();
    }
  };

  const handleProfileItemClick = (key: string) => {
    setProfileDropdownOpen(false);
    if (key === 'account') {
      openStudentDrawer(currentUser ? currentUser.id : DEMO_STUDENT.id);
    } else {
      openProfileDrawer(key);
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full max-w-full glass-card border-b border-slate-200/80 dark:border-slate-800/80 px-2 sm:px-4 flex items-center justify-between shrink-0 select-none pt-[env(safe-area-inset-top)]">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-1 sm:gap-2.5 min-w-0">
        <button
          onClick={handleHamburgerClick}
          aria-label="Toggle navigation menu"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all touch-manipulation shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent truncate">
              StudGrow
            </span>
            {/* Hide "Classes 6-10" badge under 640px */}
            <span className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              Classes 6–10
            </span>
          </div>
        </div>

        {/* Global Search Button - Desktop only */}
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="hidden lg:flex items-center gap-2 ml-4 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 text-xs w-64 justify-between transition-colors min-h-[44px] touch-manipulation"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search subjects, concepts...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Single row that fits all screens */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* 1. Sync Dot/Icon */}
        <SyncIndicator />

        {/* 2. Language Globe Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => {
              setLangMenuOpen(!langMenuOpen);
              setProfileDropdownOpen(false);
            }}
            aria-label="Select Language"
            title="Language"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation"
          >
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-36 glass-card rounded-2xl shadow-xl p-1.5 border border-slate-200 dark:border-slate-800 z-50 animate-fade-in text-xs">
              {[
                { code: 'en', label: 'English' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'hi', label: 'हिन्दी' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code as Language);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-bold min-h-[40px] touch-manipulation ${
                    language === l.code
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{l.label}</span>
                  {language === l.code && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell - on larger screens only */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative touch-manipulation"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-slate-800 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-xs text-slate-800 dark:text-white">
                  Notifications ({unreadCount} new)
                </span>
                <span className="text-[10px] text-indigo-500 font-semibold cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                      n.isRead
                        ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-500'
                        : 'bg-indigo-500/10 dark:bg-indigo-500/20 text-slate-800 dark:text-slate-100 font-medium'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{n.title}</span>
                      <span>{n.time}</span>
                    </div>
                    <p className="text-[11px] leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Dark Mode Toggle */}
        <ThemeToggle />

        {/* 4. Profile Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setLangMenuOpen(false);
            }}
            aria-label="Profile Menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation"
          >
            <img
              src={currentUser?.avatar || DEMO_STUDENT.avatar}
              alt=""
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
            />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 glass-card rounded-2xl shadow-2xl p-2 border border-slate-200 dark:border-slate-800 z-50 animate-fade-in text-xs max-h-[85vh] overflow-y-auto">
              {/* User Header */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 mb-2">
                <p className="font-bold text-slate-800 dark:text-white">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {currentRole === 'student' ? `Class ${(currentUser as any)?.classGrade || 8} • Roll #${(currentUser as any)?.rollNumber || '08'}` : 'Faculty Member'}
                </p>
              </div>

              {/* Profile Items */}
              <div className="space-y-0.5">
                {[
                  { key: 'account', label: '1. My Account', icon: User },
                  { key: 'pin', label: '2. Change Password / PIN', icon: Key },
                  { key: 'avatar', label: '3. Change Avatar', icon: ImageIcon },
                  { key: 'report-cards', label: '4. Report Cards (PDF)', icon: FileText },
                  { key: 'reviews', label: '5. Reviews & Feedback', icon: MessageSquare },
                  { key: 'behaviour', label: '6. Behaviour Points', icon: Award },
                  { key: 'attendance', label: '7. Attendance Heatmap', icon: Calendar },
                  { key: 'discipline', label: '8. Discipline Records', icon: Shield },
                  { key: 'doubts', label: '9. Doubts & Answers', icon: HelpCircle },
                  { key: 'exams', label: '10. Exams & Schedule', icon: Clock },
                  { key: 'tests', label: '11. Practice Tests', icon: Layers },
                  { key: 'library', label: '12. Library Resources', icon: BookOpen },
                  { key: 'teachers', label: '13. My Teachers', icon: GraduationCap },
                  { key: 'chapters', label: '14. Chapters & Progress', icon: Layers },
                  { key: 'subjects', label: '15. All Subjects', icon: BookOpen },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleProfileItemClick(item.key)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left min-h-[44px] touch-manipulation"
                    >
                      <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-bold min-h-[44px] touch-manipulation"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>16. Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
