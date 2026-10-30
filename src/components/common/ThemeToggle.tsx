import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 touch-manipulation"
      title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};
