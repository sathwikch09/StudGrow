import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  QrCode,
  KeyRound,
  User,
  GraduationCap,
  Delete,
  CheckCircle2,
  Camera,
  Upload,
  AlertCircle,
  Eye,
  EyeOff,
  Languages,
  BookOpen,
  BrainCircuit,
  Zap,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Hero3DScene } from '../components/three/Hero3DScene';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { useAppStore } from '../store/useAppStore';
import { DEMO_STUDENT, DEMO_TEACHER, CLASS_STUDENTS } from '../data/mockData';
import { Student, Language } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsStudent, loginAsTeacher, language, setLanguage } = useAppStore();

  // Selected portal: 'student' | 'teacher'
  const [selectedPortal, setSelectedPortal] = useState<'student' | 'teacher'>('student');

  // Student login sub-modes: 'pin' | 'qr' | 'avatar'
  const [studentMethod, setStudentMethod] = useState<'pin' | 'qr' | 'avatar'>('pin');

  // PIN inputs - starts empty so student enters roll no and PIN
  const [rollNumber, setRollNumber] = useState('');
  const [pin, setPin] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');

  // Avatar Login
  const [selectedAvatarStudent, setSelectedAvatarStudent] = useState<Student>(DEMO_STUDENT);

  // Welcome state animation
  const [welcomeUser, setWelcomeUser] = useState<string | null>(null);

  // On-screen PIN Pad click
  const handlePinPadClick = (digit: string) => {
    if (pin.length < 8) {
      setPin((prev) => prev + digit);
    }
  };

  const handlePinDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handlePinClear = () => {
    setPin('');
  };

  // Perform login validation
  const executeStudentLogin = (student: Student) => {
    setWelcomeUser(student.name);
    setTimeout(() => {
      loginAsStudent(student);
      navigate('/');
    }, 1100);
  };

  const handleStudentPinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!rollNumber.trim()) {
      setErrorMessage('Please enter your Roll Number (e.g. 08).');
      return;
    }

    if (!pin) {
      setErrorMessage('Please enter your 4-digit PIN (Date of Birth DDMM).');
      return;
    }

    // Find student by roll number
    const matched = CLASS_STUDENTS.find(
      (s) =>
        s.rollNumber === rollNumber.trim() ||
        s.id.toLowerCase() === rollNumber.trim().toLowerCase()
    );

    if (!matched) {
      setErrorMessage(`Student with Roll #${rollNumber} not found. (Demo student is Roll 08)`);
      return;
    }

    // Check PIN (DOB: DDMM)
    if (
      pin === matched.pinHash ||
      pin === matched.pinHash + '2012' ||
      pin === '1405' ||
      pin === '1234'
    ) {
      executeStudentLogin(matched);
    } else {
      const remaining = attemptsRemaining - 1;
      setAttemptsRemaining(remaining);
      setErrorMessage(
        remaining > 0
          ? `Incorrect PIN. Tip: Student's Date of Birth DDMM (e.g. 1405 for Aarav). ${remaining} attempts remaining.`
          : 'Too many attempts. Please request a teacher reset.'
      );
    }
  };

  const handleDemoQrScan = () => {
    executeStudentLogin(DEMO_STUDENT);
  };

  const handleTeacherLogin = () => {
    setWelcomeUser(DEMO_TEACHER.name);
    setTimeout(() => {
      loginAsTeacher(DEMO_TEACHER);
      navigate('/teacher');
    }, 1100);
  };

  const handleAutofillDemo = () => {
    setRollNumber('08');
    setPin('1405');
    setErrorMessage('');
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col lg:flex-row bg-[#F7F8FF] dark:bg-[#0B1020] ambient-mesh select-none">
      {/* Top Floating Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <option value="en">English (EN)</option>
          <option value="te">తెలుగు (TE)</option>
          <option value="hi">हिन्दी (HI)</option>
        </select>
        <ThemeToggle />
      </div>

      {/* Left Column: StudGrow Brand Hero + 3D Scene */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative flex-col justify-between p-10 overflow-hidden bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-transparent border-r border-slate-200/50 dark:border-slate-800/50">
        {/* Prominent Header with Logo & Brand Name */}
        <div className="relative z-20 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-3xl tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                StudGrow
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                Classes 6–10
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Adaptive Learning & Continuous Mastery Platform
            </p>
          </div>
        </div>

        {/* 3D Scene in Center */}
        <div className="flex-1 w-full relative flex items-center justify-center py-4">
          <Hero3DScene />
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-20 space-y-3 max-w-lg">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Real-Time Adaptive Pace</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <BrainCircuit className="w-4 h-4 text-indigo-500" />
              <span>3-Tier Progressive Hints</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>Explainable AI ("Why this next?")</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span>Offline First & PWA Storage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Login Container */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-2xl relative my-auto">
          {/* Welcome overlay on successful auth */}
          {welcomeUser && (
            <div className="absolute inset-0 z-50 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl shadow-xl shadow-teal-500/30 mb-4 animate-bounce">
                🎉
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                Welcome back, {welcomeUser}!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Loading your personalized dashboard...
              </p>
            </div>
          )}

          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                StudGrow
              </span>
              <p className="text-[10px] text-slate-400 font-semibold">Adaptive Learning Platform</p>
            </div>
          </div>

          {/* STEP 1: PORTAL SELECTION (Student vs Teacher) */}
          <div className="mb-5 space-y-1.5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Select Portal
            </p>
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setSelectedPortal('student');
                  setErrorMessage('');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                  selectedPortal === 'student'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md ring-1 ring-indigo-500/20'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Student Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPortal('teacher');
                  setErrorMessage('');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                  selectedPortal === 'teacher'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md ring-1 ring-purple-500/20'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Teacher Portal</span>
              </button>
            </div>
          </div>

          {/* STUDENT PORTAL FLOW */}
          {selectedPortal === 'student' && (
            <div className="space-y-4 animate-fade-in">
              {/* Student Login Method Switcher */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex gap-1.5">
                  {[
                    { key: 'pin', label: 'Roll + PIN' },
                    { key: 'qr', label: 'Scan QR' },
                    { key: 'avatar', label: 'Avatar (6-7)' },
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => {
                        setStudentMethod(m.key as any);
                        setErrorMessage('');
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        studentMethod === m.key
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Quick Autofill Demo Button */}
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100"
                  title="Autofill Roll 08 & PIN 1405"
                >
                  Autofill Demo
                </button>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Student Method 1: Roll No + PIN Pad */}
              {studentMethod === 'pin' && (
                <form onSubmit={handleStudentPinSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Student Roll Number:
                    </label>
                    <input
                      type="text"
                      required
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. 08 (or STU-8042)"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold font-mono text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* PIN Display */}
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        PIN (Date of Birth DDMM):
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {attemptsRemaining} attempts left
                      </span>
                    </div>

                    <div className="h-11 w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-3 h-3 rounded-full transition-all ${
                            pin.length > i
                              ? 'bg-indigo-600 scale-125 shadow-sm shadow-indigo-600/40'
                              : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Large Numeric PIN Pad */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                      <button
                        key={digit}
                        type="button"
                        onClick={() => handlePinPadClick(digit)}
                        className="h-11 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-base font-bold font-mono text-slate-800 dark:text-white shadow-sm transition-transform active:scale-95"
                      >
                        {digit}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handlePinClear}
                      className="h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-500"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePinPadClick('0')}
                      className="h-11 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-base font-bold font-mono text-slate-800 dark:text-white shadow-sm transition-transform active:scale-95"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={handlePinDelete}
                      className="h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center text-slate-500"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-102 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Log In to Student Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Student Method 2: Scan QR */}
              {studentMethod === 'qr' && (
                <div className="space-y-4 text-center">
                  <div className="w-44 h-44 mx-auto rounded-3xl border-2 border-dashed border-indigo-500/50 bg-indigo-500/5 flex flex-col items-center justify-center p-4 relative group">
                    <QrCode className="w-14 h-14 text-indigo-500 animate-pulse mb-2" />
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      Scan Student ID Card QR
                    </p>
                    <span className="absolute inset-x-4 top-1/2 h-0.5 bg-indigo-500/60 shadow-lg animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleDemoQrScan}
                      className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-102 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Instant Hackathon Demo QR Scan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => alert('Simulated camera access: scanning image stream...')}
                      className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Open Device Camera</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Student Method 3: Avatar Login */}
              {studentMethod === 'avatar' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    1. Tap your photo avatar, then enter your 4-digit secret PIN:
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    {CLASS_STUDENTS.slice(0, 4).map((st) => {
                      const isSelected = selectedAvatarStudent.id === st.id;
                      return (
                        <div
                          key={st.id}
                          onClick={() => setSelectedAvatarStudent(st)}
                          className={`p-1.5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'border-indigo-600 ring-2 ring-indigo-500/30 bg-indigo-500/10'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={st.avatar}
                            alt=""
                            className="w-12 h-12 mx-auto rounded-xl object-cover mb-1"
                          />
                          <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">
                            {st.name.split(' ')[0]}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Enter PIN for {selectedAvatarStudent.name.split(' ')[0]}:
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="e.g. 1405"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => executeStudentLogin(selectedAvatarStudent)}
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 transition-all hover:scale-102"
                  >
                    Log In as {selectedAvatarStudent.name.split(' ')[0]}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TEACHER PORTAL FLOW */}
          {selectedPortal === 'teacher' && (
            <div className="space-y-4 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center shadow-inner">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Teacher & Faculty Portal
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect class competency heatmaps, manage overrides, add students, and grade exams
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1.5">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {DEMO_TEACHER.name}
                </p>
                <p className="text-slate-400 font-mono">{DEMO_TEACHER.email}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[10px]">
                    Mathematics & Science
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                    Classes: 8A, 8B, 9A, 10B
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTeacherLogin}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition-all hover:scale-102 flex items-center justify-center gap-2"
              >
                <span>Log In as Dr. Sunita Rao (Teacher)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Info Footer */}
          <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Demo: Aarav Sharma (Roll 08, PIN 1405)</span>
            <span className="text-indigo-500 font-semibold font-mono">v1.0 Demo Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
