import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle2, Clock, Zap, ArrowRight, Repeat, BookOpen, Sparkles } from 'lucide-react';
import { MasteryBar } from '../common/MasteryBar';
import { triggerConfettiCelebration } from '../common/ConfettiCelebration';
import { Concept } from '../../types';

interface PracticeResultsProps {
  score: number;
  totalQuestions: number;
  accuracy: number;
  totalTimeSeconds: number;
  xpEarned: number;
  concept: Concept;
  newMasteryScore: number;
  onRetry: () => void;
}

export const PracticeResults: React.FC<PracticeResultsProps> = ({
  score,
  totalQuestions,
  accuracy,
  totalTimeSeconds,
  xpEarned,
  concept,
  newMasteryScore,
  onRetry,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (accuracy >= 70) {
      triggerConfettiCelebration();
    }
  }, [accuracy]);

  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = totalTimeSeconds % 60;

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-2xl text-center select-none animate-fade-in space-y-6">
      {/* Trophy Badge */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-4xl shadow-xl shadow-amber-500/30 animate-bounce">
        <Trophy className="w-10 h-10" />
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Session Completed!
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
          {accuracy >= 80 ? 'Mastery Milestone Achieved!' : 'Great Practice Effort!'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          StudGrow has updated your adaptive profile and scheduled targeted retention for this topic.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] text-slate-400 font-semibold">Score</p>
          <p className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
            {score}/{totalQuestions}
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] text-slate-400 font-semibold">Accuracy</p>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            {Math.round(accuracy)}%
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] text-slate-400 font-semibold">Time Spent</p>
          <p className="text-xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-0.5">
            {minutes}m {seconds}s
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-[11px] text-slate-400 font-semibold">XP Earned</p>
          <p className="text-xl font-bold font-mono text-amber-500 mt-0.5">
            +{xpEarned}
          </p>
        </div>
      </div>

      {/* Mastery Bar Progress Animation */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-left space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {concept.title}
          </span>
          <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {Math.round(newMasteryScore)}% Mastery
          </span>
        </div>
        <MasteryBar score={newMasteryScore} height="h-3" showLabel={false} />
        <p className="text-[11px] text-slate-400">
          {newMasteryScore >= 85
            ? '🔥 You have reached Good to Mastered status on this concept!'
            : '💡 Continue practicing to advance from Learning to Mastered status.'}
        </p>
      </div>

      {/* Buttons: Next concept / Revise weak / Retry */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate('/revision')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
        >
          <Repeat className="w-4 h-4 text-amber-500" />
          <span>Revise Weak Concepts</span>
        </button>

        <button
          onClick={onRetry}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold transition-all border border-indigo-200 dark:border-indigo-800"
        >
          <span>Practice Again</span>
        </button>

        <button
          onClick={() => navigate('/subjects')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
        >
          <span>Next Concept</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
