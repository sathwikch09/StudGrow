import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, BrainCircuit, RotateCcw } from 'lucide-react';
import { Question, QuestionDifficulty } from '../../types';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  question: Question;
  xpEarned: number;
  decisionReason: string;
  nextDifficulty: QuestionDifficulty;
  onNextQuestion: () => void;
  onTrySimilar: () => void;
  onOpenWhyModal: () => void;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  isCorrect,
  question,
  xpEarned,
  decisionReason,
  nextDifficulty,
  onNextQuestion,
  onTrySimilar,
  onOpenWhyModal,
}) => {
  return (
    <div
      className={`w-full rounded-3xl p-6 border shadow-xl select-none animate-fade-in ${
        isCorrect
          ? 'bg-emerald-500/10 dark:bg-emerald-950/20 border-emerald-500/30'
          : 'bg-rose-500/10 dark:bg-rose-950/20 border-rose-500/30'
      }`}
    >
      {/* Header status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
              isCorrect ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-rose-500 shadow-rose-500/30'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-extrabold text-slate-800 dark:text-white">
                {isCorrect ? 'Brilliant! Correct Answer' : 'Almost there! Let’s understand why'}
              </h4>
              {isCorrect && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono">
                  +{xpEarned} XP
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isCorrect
                ? 'Your reasoning was spot on. Stepping your practice up!'
                : 'Mistakes are where the brain grows! Here is the clear breakdown:'}
            </p>
          </div>
        </div>

        {/* Adaptive Decision Pill with Click to open Why modal */}
        <button
          onClick={onOpenWhyModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm hover:scale-105 transition-transform"
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Why this next step?</span>
        </button>
      </div>

      {/* Explanation Box */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs mb-5">
        <div>
          <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
            Correct Solution & Reasoning:
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {question.explanation.whyCorrect}
          </p>
        </div>

        {/* Step by step */}
        {question.explanation.stepByStep && question.explanation.stepByStep.length > 0 && (
          <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              Step-by-step breakdown:
            </span>
            <ol className="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
              {question.explanation.stepByStep.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Common mistake alert if wrong */}
        {!isCorrect && question.explanation.commonMistake && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
            <strong>Watch out: </strong> {question.explanation.commonMistake}
          </div>
        )}
      </div>

      {/* Adaptive decision explanation notice */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <strong>System Decision:</strong> {decisionReason} (Next: <strong>{nextDifficulty}</strong>)
        </p>

        <div className="flex items-center gap-2">
          {!isCorrect && (
            <button
              onClick={onTrySimilar}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try a Similar Question</span>
            </button>
          )}

          <button
            onClick={onNextQuestion}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
