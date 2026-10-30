import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { MobileDrawer } from './MobileDrawer';
import { GlobalSearchModal } from './GlobalSearchModal';
import { StudentDetailDrawer } from '../common/StudentDetailDrawer';
import { ProfileDrawerPages } from '../../pages/student/ProfileDrawerPages';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  return (
    <div
      className="w-full max-w-full min-h-[100dvh] lg:h-[100dvh] overflow-x-hidden lg:overflow-hidden flex flex-col bg-[#F7F8FF] dark:bg-[#0B1020] text-slate-800 dark:text-slate-100 ambient-mesh relative"
    >
      {/* Top Header */}
      <TopBar />

      {/* Main Area: Sidebar + Internal Scrollable Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Collapsible Desktop Sidebar - hidden under 1024px */}
        <div className="hidden lg:flex h-full shrink-0">
          <Sidebar />
        </div>

        {/* Scrollable Workspace Container */}
        <main className="flex-1 w-full max-w-full h-full overflow-y-auto overflow-x-hidden p-3 sm:p-4 lg:p-6 transition-all duration-200 main-scroll-area">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col pb-20 lg:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Slide-in Drawer from Left (< 1024px) */}
      <MobileDrawer />

      {/* Mobile Bottom Navigation (< 1024px) */}
      <MobileNav />

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <StudentDetailDrawer />
      <ProfileDrawerPages />
    </div>
  );
};
