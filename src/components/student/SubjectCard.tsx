import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Atom,
  BookOpen,
  Globe,
  Languages,
  Code,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Subject } from '../../types';
import { ProgressRing } from '../common/ProgressRing';

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (subject.id) {
      case 'maths':
        return Calculator;
      case 'science':
        return Atom;
      case 'english':
        return BookOpen;
      case 'social':
        return Globe;
      case 'telugu':
        return Languages;
      case 'cs':
        return Code;
      default:
        return BookOpen;
    }
  };

  const Icon = getIcon();

  return (
    <div
      onClick={() => navigate(`/subjects?highlight=${subject.id}`)}
      className="glass-card glass-card-interactive rounded-3xl p-5 border border-white/60 dark:border-white/10 shadow-md cursor-pointer flex flex-col justify-between select-none relative overflow-hidden group"
    >
      {/* Subject accent light glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: subject.color }}
      />

      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {subject.name}
            </h3>
            <span className="text-[11px] font-mono font-semibold text-slate-400">
              {subject.code}
            </span>
          </div>
        </div>

        {/* Circular Progress */}
        <ProgressRing
          progress={subject.masteryPercentage}
          size={52}
          strokeWidth={5}
          color={subject.color}
        />
      </div>

      {/* Stats and Weak concept banner */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          <strong>{subject.completedChapters}</strong> of {subject.totalChapters} Chapters Done
        </span>

        {subject.weakConceptsCount > 0 ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3" />
            {subject.weakConceptsCount} Weak Spot
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center gap-0.5">
            On Track <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        )}
      </div>
    </div>
  );
};
