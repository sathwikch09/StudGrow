import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, MessageSquare, Send, User, Clock } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const DoubtsInbox: React.FC = () => {
  const { doubts, answerDoubt, openStudentDrawer } = useAppStore();
  const [selectedDoubtId, setSelectedDoubtId] = useState<string>(doubts[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [repliedNotice, setRepliedNotice] = useState(false);

  const selectedDoubt = doubts.find((d) => d.id === selectedDoubtId) || doubts[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedDoubt) return;

    answerDoubt(selectedDoubt.id, replyText);
    setReplyText('');
    setRepliedNotice(true);
    setTimeout(() => setRepliedNotice(false), 2500);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Student Doubts & Concept Queries
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Personalized educator explanations to unblock student questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Doubts List */}
        <div className="glass-card rounded-3xl p-4 border border-white/40 dark:border-white/10 shadow-lg space-y-2 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500">
            <span>Incoming Inquiries ({doubts.length})</span>
          </div>

          {doubts.map((d) => {
            const isSelected = d.id === selectedDoubtId;
            return (
              <div
                key={d.id}
                onClick={() => setSelectedDoubtId(d.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                  isSelected
                    ? 'bg-indigo-500/10 border-indigo-500/40 ring-2 ring-indigo-500/20'
                    : 'bg-white/80 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-white">
                    {d.studentName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      d.status === 'Answered'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600 animate-pulse'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
                  {d.subjectName}: {d.conceptTitle}
                </p>
                <p className="text-slate-500 dark:text-slate-400 line-clamp-2">
                  {d.questionText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Doubt Details & Reply Editor */}
        <div className="md:col-span-2 glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg flex flex-col justify-between">
          {selectedDoubt ? (
            <div className="space-y-4">
              {/* Question header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 dark:text-white text-base">
                        {selectedDoubt.studentName}
                      </h3>
                      <button
                        onClick={() => openStudentDrawer(selectedDoubt.studentId)}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                      >
                        (Roll #{selectedDoubt.studentId.slice(-2)} Profile)
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">
                      Posted: {selectedDoubt.createdAt} • Subject: <strong>{selectedDoubt.subjectName}</strong>
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    selectedDoubt.status === 'Answered'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {selectedDoubt.status}
                </span>
              </div>

              {/* Doubt content */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Concept: {selectedDoubt.conceptTitle}
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                  "{selectedDoubt.questionText}"
                </p>
              </div>

              {/* Existing Reply if already answered */}
              {selectedDoubt.teacherReply && (
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-indigo-600 dark:text-indigo-400 font-bold">
                    <span>Your Previous Answer ({selectedDoubt.teacherReply.repliedAt})</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedDoubt.teacherReply.replyText}
                  </p>
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Write Teacher Clarification / Hint:
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Provide an encouraging, step-by-step clarification for the student..."
                  className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />

                {repliedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Clarification dispatched directly to student!</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Explanation</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
              Select a doubt to respond.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
