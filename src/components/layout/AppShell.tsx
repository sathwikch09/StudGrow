import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { GlobalSearchModal } from './GlobalSearchModal';
import { StudentDetailDrawer } from '../common/StudentDetailDrawer';
import { ProfileDrawerPages } from '../../pages/student/ProfileDrawerPages';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col bg-[#F7F8FF] dark:bg-[#0B1020] text-slate-800 dark:text-slate-100 ambient-mesh"
    >
      {/* Top Header */}
      <TopBar />

      {/* Main Area: Sidebar + Internal Scrollable Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Collapsible Desktop Sidebar */}
        <div className="hidden md:flex h-full">
          <Sidebar />
        </div>

        {/* Scrollable Workspace Container */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 md:p-6 transition-all duration-200">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col pb-16 md:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <StudentDetailDrawer />
      <ProfileDrawerPages />
    </div>
  );
};
