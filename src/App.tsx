import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/student/DashboardPage';
import { SubjectsPage } from './pages/student/SubjectsPage';
import { ConceptDetailPage } from './pages/student/ConceptDetailPage';
import { PracticePage } from './pages/student/PracticePage';
import { ProgressPage } from './pages/student/ProgressPage';
import { ExamsPage } from './pages/student/ExamsPage';
import { LibraryPage } from './pages/student/LibraryPage';
import { DoubtsPage } from './pages/student/DoubtsPage';
import { RevisionPage } from './pages/student/RevisionPage';
import { TeacherPortalPage } from './pages/teacher/TeacherPortalPage';
import { useAppStore } from './store/useAppStore';
import { useOfflineStore } from './store/useOfflineStore';
import { initDatabase, saveConceptsToOfflineStorage } from './services/db';
import { MOCK_SUBJECTS } from './data/mockData';

export function App() {
  const currentUser = useAppStore((s) => s.currentUser);
  const checkPendingCount = useOfflineStore((s) => s.checkPendingCount);

  // Initialize IndexedDB and preload offline concept content
  useEffect(() => {
    async function setupStorage() {
      try {
        await initDatabase();
        const allConcepts = MOCK_SUBJECTS.flatMap((s) =>
          s.chapters.flatMap((ch) => ch.concepts)
        );
        await saveConceptsToOfflineStorage(allConcepts);
        await checkPendingCount();
      } catch (err) {
        console.error('Storage initialization failed:', err);
      }
    }
    setupStorage();
  }, [checkPendingCount]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Shell */}
        <Route
          path="/"
          element={currentUser ? <AppShell /> : <Navigate to="/login" replace />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="concept/:id" element={<ConceptDetailPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="doubts" element={<DoubtsPage />} />
          <Route path="revision" element={<RevisionPage />} />
          
          {/* Teacher Portal Master */}
          <Route path="teacher/*" element={<TeacherPortalPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
