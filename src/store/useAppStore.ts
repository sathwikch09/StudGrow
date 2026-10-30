import { create } from 'zustand';
import {
  Student,
  Teacher,
  Role,
  Language,
  Doubt,
  Exam,
  LibraryResource,
} from '../types';
import {
  DEMO_STUDENT,
  DEMO_TEACHER,
  MOCK_DOUBTS,
  MOCK_EXAMS,
  MOCK_LIBRARY,
  CLASS_STUDENTS
} from '../data/mockData';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'exam' | 'assignment' | 'doubt' | 'achievement';
}

interface AppState {
  currentUser: Student | Teacher | null;
  currentRole: Role;
  isDarkMode: boolean;
  liteMode: boolean;
  dyslexiaFont: boolean;
  language: Language;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  activeProfileDrawer: string | null;
  activeStudentDrawerId: string | null;
  globalSearchOpen: boolean;
  notificationsOpen: boolean;
  notifications: NotificationItem[];
  doubts: Doubt[];
  exams: Exam[];
  library: LibraryResource[];
  allStudents: Student[];

  // Actions
  loginAsStudent: (student: Student) => void;
  loginAsTeacher: (teacher: Teacher) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  toggleLiteMode: () => void;
  toggleDyslexiaFont: () => void;
  setLanguage: (lang: Language) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  openProfileDrawer: (drawerName: string) => void;
  closeProfileDrawer: () => void;
  openStudentDrawer: (studentId: string) => void;
  closeStudentDrawer: () => void;
  setGlobalSearchOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  markNotificationRead: (id: string) => void;
  addDoubt: (doubt: Omit<Doubt, 'id' | 'createdAt' | 'status'>) => void;
  answerDoubt: (doubtId: string, replyText: string) => void;
  scheduleExam: (exam: Omit<Exam, 'id' | 'daysRemaining' | 'status' | 'isUrgent'>) => void;
  updateStudentMarks: (studentId: string, newScore: number) => void;
  addStudent: (student: Omit<Student, 'id' | 'totalStudentsInClass' | 'rankTrend'>) => void;
}

export const useAppStore = create<AppState>((set, get) => {
  // Read persisted theme
  const savedDark = localStorage.getItem('studgrow_dark') === 'true';
  const savedLite = localStorage.getItem('studgrow_lite') === 'true';
  const savedDyslexia = localStorage.getItem('studgrow_dyslexia') === 'true';
  const savedLang = (localStorage.getItem('studgrow_lang') as Language) || 'en';

  if (savedDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    currentUser: null,
    currentRole: 'student',
    isDarkMode: savedDark,
    liteMode: savedLite,
    dyslexiaFont: savedDyslexia,
    language: savedLang,
    sidebarCollapsed: false,
    mobileMenuOpen: false,
    activeProfileDrawer: null,
    activeStudentDrawerId: null,
    globalSearchOpen: false,
    notificationsOpen: false,
    allStudents: CLASS_STUDENTS,
    notifications: [
      {
        id: 'n1',
        title: 'Exam Alert: Mathematics Mid-Term',
        message: 'Mathematics Mid-Term is scheduled in 2 days! Revise Rational Numbers & Equations.',
        time: '10m ago',
        isRead: false,
        type: 'exam'
      },
      {
        id: 'n2',
        title: 'New Adaptive Challenge Available',
        message: 'Ready for Level 2 Fraction Word Problems? 50 bonus XP awaits!',
        time: '2h ago',
        isRead: false,
        type: 'assignment'
      },
      {
        id: 'n3',
        title: 'Doubt Answered by Dr. Sunita Rao',
        message: 'Your question regarding "1/4 of the remainder" has been explained.',
        time: '1d ago',
        isRead: true,
        type: 'doubt'
      }
    ],
    doubts: MOCK_DOUBTS,
    exams: MOCK_EXAMS,
    library: MOCK_LIBRARY,

    loginAsStudent: (student) => {
      set({ currentUser: student, currentRole: 'student' });
    },

    loginAsTeacher: (teacher) => {
      set({ currentUser: teacher, currentRole: 'teacher' });
    },

    logout: () => {
      set({ currentUser: null });
    },

    toggleDarkMode: () => {
      const next = !get().isDarkMode;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('studgrow_dark', String(next));
      set({ isDarkMode: next });
    },

    toggleLiteMode: () => {
      const next = !get().liteMode;
      localStorage.setItem('studgrow_lite', String(next));
      set({ liteMode: next });
    },

    toggleDyslexiaFont: () => {
      const next = !get().dyslexiaFont;
      localStorage.setItem('studgrow_dyslexia', String(next));
      set({ dyslexiaFont: next });
    },

    setLanguage: (lang) => {
      localStorage.setItem('studgrow_lang', lang);
      set({ language: lang });
    },

    toggleSidebar: () => {
      set({ sidebarCollapsed: !get().sidebarCollapsed });
    },

    setSidebarCollapsed: (collapsed) => {
      set({ sidebarCollapsed: collapsed });
    },

    setMobileMenuOpen: (open) => {
      set({ mobileMenuOpen: open });
    },

    toggleMobileMenu: () => {
      set({ mobileMenuOpen: !get().mobileMenuOpen });
    },

    openProfileDrawer: (drawerName) => {
      set({ activeProfileDrawer: drawerName });
    },

    closeProfileDrawer: () => {
      set({ activeProfileDrawer: null });
    },

    openStudentDrawer: (studentId) => {
      set({ activeStudentDrawerId: studentId });
    },

    closeStudentDrawer: () => {
      set({ activeStudentDrawerId: null });
    },

    setGlobalSearchOpen: (open) => {
      set({ globalSearchOpen: open });
    },

    setNotificationsOpen: (open) => {
      set({ notificationsOpen: open });
    },

    markNotificationRead: (id) => {
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        )
      }));
    },

    addDoubt: (doubtData) => {
      const newDoubt: Doubt = {
        ...doubtData,
        id: `d-${Date.now()}`,
        createdAt: 'Just now',
        status: 'Open',
      };
      set((state) => ({ doubts: [newDoubt, ...state.doubts] }));
    },

    answerDoubt: (doubtId, replyText) => {
      set((state) => ({
        doubts: state.doubts.map((d) =>
          d.id === doubtId
            ? {
                ...d,
                status: 'Answered',
                teacherReply: {
                  teacherName: 'Dr. Sunita Rao',
                  replyText,
                  repliedAt: 'Just now',
                },
              }
            : d
        ),
      }));
    },

    scheduleExam: (examData) => {
      const newExam: Exam = {
        ...examData,
        id: `ex-${Date.now()}`,
        daysRemaining: Math.max(1, Math.ceil((new Date(examData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
        status: 'upcoming',
        isUrgent: Math.ceil((new Date(examData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 3,
      };
      set((state) => ({
        exams: [newExam, ...state.exams],
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: `New Exam: ${newExam.title}`,
            message: `Scheduled on ${newExam.date}. Syllabus updated.`,
            time: 'Just now',
            isRead: false,
            type: 'exam',
          },
          ...state.notifications,
        ],
      }));
    },

    updateStudentMarks: (studentId, newScore) => {
      set((state) => ({
        allStudents: state.allStudents.map((s) =>
          s.id === studentId ? { ...s, monthlyAverageScore: newScore } : s
        ),
      }));
    },

    addStudent: (studentData) => {
      const newId = `STU-${studentData.classGrade}${Math.floor(1000 + Math.random() * 9000).toString().slice(1)}`;
      const newStudent: Student = {
        ...studentData,
        id: newId,
        totalStudentsInClass: get().allStudents.length + 1,
        rankTrend: 'same',
      };
      set((state) => ({
        allStudents: [newStudent, ...state.allStudents],
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: `Student Enrolled: ${newStudent.name}`,
            message: `Roll #${newStudent.rollNumber} added to Class ${newStudent.classGrade}${newStudent.section}. PIN: ${newStudent.pinHash}`,
            time: 'Just now',
            isRead: false,
            type: 'achievement',
          },
          ...state.notifications,
        ],
      }));
    },
  };
});
