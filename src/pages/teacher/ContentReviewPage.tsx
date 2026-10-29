import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Edit3, Filter } from 'lucide-react';
import { MOCK_SUBJECTS } from '../../data/mockData';

export const ContentReviewPage: React.FC = () => {
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set(['q-eq-1', 'q-add-1']));
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingQuestions = [
    {
      id: 'q-rev-101',
      concept: 'Word Problems on Fractions',
      subject: 'Mathematics',
      prompt: 'If 3/4 of a vessel contains water and 1/3 of it evaporates, what fraction of the total capacity is left?',
      options: ['1/2', '5/12', '1/4', '7/12'],
      correctAnswer: '1/2',
      difficulty: 'Medium',
      author: 'AI Curriculum Generator v2',
      status: 'Pending Review',
    },
    {
      id: 'q-rev-102',
      concept: 'Plant vs Animal Cells',
      subject: 'Science',
      prompt: 'Why do human cheek cells burst when kept in distilled water, whereas onion peel cells swell but remain intact?',
      options: ['Cell Wall Presence', 'Vacuole size', 'Chlorophyll', 'Mitochondria'],
      correctAnswer: 'Cell Wall Presence',
      difficulty: 'Hard',
      author: 'Peer Educator (Mr. David Paul)',
      status: 'Pending Review',
    },
  ];

  const handleApprove = (id: string) => {
    const next = new Set(approvedIds);
    next.add(id);
    setApprovedIds(next);
    setActionNotice('Question approved for student adaptive practice!');
    setTimeout(() => setActionNotice(null), 2500);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Curriculum & Question Quality Assurance
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Faculty oversight: verify clarity, age-appropriateness, and pedagogical correctness before publishing to students
        </p>
      </div>

      {actionNotice && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="space-y-4">
        {pendingQuestions.map((q) => {
          const isApproved = approvedIds.has(q.id);

          return (
            <div
              key={q.id}
              className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono">
                    {q.subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Concept: <strong>{q.concept}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Author: {q.author}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isApproved
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {isApproved ? 'Approved & Live' : 'Under Review'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  "{q.prompt}"
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl border text-[11px] font-medium ${
                        opt === q.correctAnswer
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt} {opt === q.correctAnswer && '(Correct Answer)'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                <button
                  onClick={() => alert(`Feedback sent to author: Suggest minor rephrasing for Class 8.`)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Request Edits
                </button>
                <button
                  onClick={() => handleApprove(q.id)}
                  disabled={isApproved}
                  className={`px-5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ${
                    isApproved
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isApproved ? 'Approved' : 'Approve for Adaptive Bank'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
