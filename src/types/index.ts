export type Role = 'student' | 'teacher';

export type Language = 'en' | 'te' | 'hi';

export type MasteryLevel = 'Needs Help' | 'Learning' | 'Good' | 'Mastered';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionType = 'mcq' | 'true-false' | 'fill-blank';

export interface Student {
  id: string; // e.g. "STU-8042"
  rollNumber: string; // e.g. "08"
  name: string;
  avatar: string;
  classGrade: number; // 6 to 10
  section: string; // "A" | "B"
  dob: string; // "14/05/2012" -> PIN: "1405" or "14052012"
  pinHash: string; // "1405"
  parentName: string;
  parentContact: string;
  email: string;
  address: string;
  streakDays: number;
  xp: number;
  level: number;
  classRank: number;
  totalStudentsInClass: number;
  rankTrend: 'up' | 'down' | 'same';
  attendancePercentage: number;
  monthlyAverageScore: number;
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  assignedClasses: string[]; // e.g. ["8A", "8B", "9A"]
  email: string;
  role: 'teacher';
}

export interface Subject {
  id: string; // "maths", "science", "english", "social", "telugu", "cs"
  name: string;
  code: string;
  color: string;
  accentColor: string;
  iconName: string;
  totalChapters: number;
  completedChapters: number;
  masteryPercentage: number;
  weakConceptsCount: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  classGrade: number;
  order: number;
  concepts: Concept[];
  isLocked?: boolean;
}

export interface Concept {
  id: string;
  chapterId: string;
  subjectId: string;
  title: string;
  estimatedMinutes: number;
  difficulty: QuestionDifficulty;
  masteryScore: number; // 0 - 100
  masteryLevel: MasteryLevel;
  prerequisiteConceptId?: string;
  summary: string;
  explanations: {
    basic: string;
    detailed: string;
    visual: {
      diagramType: 'fractions' | 'atom' | 'geometry' | 'photosynthesis' | 'solar-system' | 'flowchart' | 'generic';
      caption: string;
      steps: string[];
    };
    example: {
      scenario: string;
      solution: string;
    };
    simpler: string;
  };
  keyTakeaways: string[];
  questions: Question[];
  isLockedByTeacher?: boolean;
}

export interface Hint {
  level: 1 | 2 | 3;
  type: 'nudge' | 'clue' | 'near-solution';
  text: string;
  xpPenalty: number;
}

export interface Question {
  id: string;
  conceptId: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  prompt: string;
  options?: string[]; // For MCQ
  correctAnswer: string | number; // Exact text or index
  hints: Hint[];
  explanation: {
    whyCorrect: string;
    commonMistake: string;
    stepByStep: string[];
  };
  tags: string[];
}

export interface AdaptiveLog {
  id: string;
  timestamp: string;
  conceptId: string;
  action: 'increase_difficulty' | 'decrease_difficulty' | 'switch_to_simpler' | 'challenge_mode' | 'streak_bonus';
  fromDifficulty: QuestionDifficulty;
  toDifficulty: QuestionDifficulty;
  reason: string;
}

export interface Exam {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  date: string; // ISO string e.g. "2026-11-02"
  daysRemaining: number;
  durationMinutes: number;
  totalMarks: number;
  syllabus: string[];
  isUrgent: boolean; // < 3 days
  status: 'upcoming' | 'completed';
  scoredMarks?: number;
  classAverage?: number;
  grade?: string;
}

export interface MonthlyAssessment {
  month: string; // e.g. "July", "August", "September", "October"
  studentScore: number;
  classAverage: number;
}

export interface Doubt {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  conceptTitle: string;
  questionText: string;
  imageUrl?: string;
  createdAt: string;
  status: 'Open' | 'Answered';
  teacherReply?: {
    teacherName: string;
    replyText: string;
    repliedAt: string;
  };
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late' | 'holiday';
}

export interface Review {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  subject: string;
  date: string;
  rating: number; // 1-5
  comment: string;
  category: 'Academics' | 'Attitude' | 'Participation' | 'Effort';
}

export interface BehaviourRecord {
  id: string;
  date: string;
  points: number; // +5, +10, etc.
  title: string;
  category: 'Helping Peer' | 'Active Participation' | 'Consistent Practice' | 'Leadership';
  awardedBy: string;
}

export interface DisciplineRecord {
  id: string;
  date: string;
  issue: string;
  status: 'Resolved' | 'Under Review';
  actionTaken: string;
  teacherName: string;
}

export interface ReportCard {
  term: 'Term 1' | 'Mid-Term' | 'Term 2' | 'Annual';
  academicYear: string;
  marks: {
    subject: string;
    maxMarks: number;
    scoredMarks: number;
    grade: string;
    remarks: string;
  }[];
  totalMarks: number;
  percentage: number;
  overallGrade: string;
  teacherRemarks: string;
  attendanceDays: number;
  totalWorkingDays: number;
}

export interface LibraryResource {
  id: string;
  title: string;
  type: 'ebook' | 'notes' | 'video' | 'paper';
  subjectId: string;
  subjectName: string;
  classGrade: number;
  fileSize?: string;
  duration?: string;
  downloadsCount: number;
  isOfflineCached?: boolean;
}

export interface OfflineSyncEvent {
  id: string; // device generated uuid
  studentId: string;
  questionId: string;
  conceptId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  hintsUsedCount: number;
  timeSpentSeconds: number;
  timestamp: string;
  synced: boolean;
}

export type SyncStatus = 'online' | 'offline' | 'syncing' | 'synced' | 'error';
