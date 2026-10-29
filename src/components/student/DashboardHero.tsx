import React, { useState } from 'react';
import { Flame, Star, TrendingUp, Sparkles, BrainCircuit, HelpCircle } from 'lucide-react';
import { MascotOrb } from '../three/MascotOrb';
import { WhyThisNextModal } from '../common/WhyThisNextModal';
import { useAppStore } from '../../store/useAppStore';
import { DEMO_STUDENT } from '../../data/mockData';

export const DashboardHero: React.FC = () => {
  const currentUser = useAppStore((s) => s.currentUser) || DEMO_STUDENT;
  const [whyModalOpen, setWhyModalOpen] = useState(false);

  const student = currentUser as typeof DEMO_STUDENT;

  return (
    <>
      <div className="w-full glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-white/40 dark:border-white/10 shadow-xl mb-6">
        {/* Background ambient glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Left Greeting & Metrics */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adaptive Study Session Active • Class {student.classGrade || 8}{student.section || 'A'}</span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                Welcome back, {student.name?.split(' ')[0] || 'Aarav'}! 👋
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                StudGrow has personalized your study path today. We noticed you found <strong>Fractions Word Problems</strong> tricky yesterday—let's master it step-by-step!
              </p>
            </div>

            {/* Badges / Stats row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              {/* Streak */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Flame className="w-4 h-4 fill-current animate-pulse text-amber-500" />
                <span>{student.streakDays || 14} Day Streak</span>
              </div>

              {/* Level & XP */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                <Star className="w-4 h-4 fill-current text-indigo-500" />
                <span>Level {student.level || 6} ({student.xp || 2840} XP)</span>
              </div>

              {/* Class Rank */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Rank #{student.classRank || 5} in Class</span>
              </div>

              {/* "Why this next?" Trigger */}
              <button
                onClick={() => setWhyModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all hover:scale-105"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Why this next?</span>
              </button>
            </div>
          </div>

          {/* Right Mascot 3D Orb */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            <MascotOrb size={120} />
            <span className="text-[11px] font-semibold text-slate-400 mt-1">
              A.I. Adaptive Companion
            </span>
          </div>
        </div>
      </div>

      <WhyThisNextModal
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
      />
    </>
  );
};
