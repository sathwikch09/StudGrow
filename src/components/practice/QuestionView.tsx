import React from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { Question } from '../../types';

interface QuestionViewProps {
  question: Question;
  selectedAnswer: string | number | null;
  onSelectAnswer: (ans: string | number) => void;
  isSubmitted: boolean;
  isCorrect?: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isSubmitted,
  isCorrect,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Question Header & Prompt */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              question.difficulty === 'Hard'
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                : question.difficulty === 'Medium'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {question.difficulty} Level
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Type: {question.type === 'mcq' ? 'Multiple Choice' : question.type === 'true-false' ? 'True / False' : 'Fill in the Blank'}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-relaxed">
          {question.prompt}
        </h3>
      </div>

      {/* Options depending on question type */}
      {question.type === 'mcq' && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isThisCorrect = isSubmitted && question.correctAnswer === idx;
            const isThisWrong = isSubmitted && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => onSelectAnswer(idx)}
                className={`min-h-[56px] p-4 rounded-2xl border text-left text-sm font-semibold transition-all duration-200 flex items-center justify-between select-none ${
                  isThisCorrect
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                    : isThisWrong
                    ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/30 animate-shake'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25'
                    : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isSelected && !isSubmitted && (
                  <Check className="w-4 h-4 text-white shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'true-false' && (
        <div className="grid grid-cols-2 gap-4">
          {['True', 'False'].map((label, idx) => {
            const isSelected = selectedAnswer === idx;
            const isThisCorrect = isSubmitted && question.correctAnswer === idx;
            const isThisWrong = isSubmitted && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => onSelectAnswer(idx)}
                className={`min-h-[64px] p-4 rounded-2xl border text-base font-bold transition-all flex items-center justify-center gap-2 ${
                  isThisCorrect
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                    : isThisWrong
                    ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 ring-2 ring-rose-500/30'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30'
                    : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500'
                }`}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'fill-blank' && (
        <div className="space-y-3">
          <input
            type="text"
            disabled={isSubmitted}
            value={selectedAnswer !== null ? String(selectedAnswer) : ''}
            onChange={(e) => onSelectAnswer(e.target.value)}
            placeholder="Type your calculated answer here..."
            className="w-full max-w-md p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-base font-bold font-mono text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-[11px] text-slate-400">
            For numbers, enter digits (e.g. 54). For fractions, enter p/q (e.g. 7/12).
          </p>
        </div>
      )}
    </div>
  );
};
