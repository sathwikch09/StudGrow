import React, { useState } from 'react';
import { HelpCircle, Send, CheckCircle2, Clock, MessageSquare, Plus, User } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const DoubtsPage: React.FC = () => {
  const { doubts, addDoubt, currentUser } = useAppStore();

  const [subjectId, setSubjectId] = useState('maths');
  const [conceptTitle, setConceptTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [postedNotice, setPostedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const subjectName = subjectId === 'maths' ? 'Mathematics' : subjectId === 'science' ? 'Science' : 'English';

    addDoubt({
      studentId: currentUser ? currentUser.id : 'STU-8042',
      studentName: currentUser ? currentUser.name : 'Aarav Sharma',
      subjectId,
      subjectName,
      conceptTitle: conceptTitle.trim() || 'General Query',
      questionText: questionText.trim(),
    });

    setPostedNotice(true);
    setQuestionText('');
    setConceptTitle('');
    setTimeout(() => setPostedNotice(false), 3000);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          Ask a Doubt & Teacher Mentorship
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Get direct, step-by-step guidance from your teachers whenever you get stuck
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ask Form */}
        <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Plus className="w-5 h-5 text-indigo-500" />
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Ask a New Question
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Select Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="maths">Mathematics (Dr. Sunita Rao)</option>
                <option value="science">General Science (Dr. Sunita Rao)</option>
                <option value="english">English (Mr. David Paul)</option>
                <option value="social">Social Science</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Concept or Chapter Name
              </label>
              <input
                type="text"
                required
                value={conceptTitle}
                onChange={(e) => setConceptTitle(e.target.value)}
                placeholder="e.g. Word Problems on Fractions"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Your Doubt / Question Description
              </label>
              <textarea
                rows={4}
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Describe what step or term confused you..."
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-normal"
              />
            </div>

            {postedNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Doubt sent to teacher! You will be notified when replied.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Question</span>
            </button>
          </form>
        </div>

        {/* Doubts List */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Your Questions & Teacher Responses ({doubts.length})
            </h2>
            <span className="text-xs text-slate-400 font-medium">Live sync</span>
          </div>

          <div className="space-y-4">
            {doubts.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-3 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase">
                      {d.subjectName}
                    </span>
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm mt-1">
                      {d.conceptTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400">{d.createdAt}</p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      d.status === 'Answered'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600 animate-pulse'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  "{d.questionText}"
                </p>

                {d.teacherReply ? (
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 space-y-1">
                    <div className="flex justify-between items-center text-indigo-700 dark:text-indigo-300 font-bold text-[11px]">
                      <span>Reply from {d.teacherReply.teacherName}</span>
                      <span>{d.teacherReply.repliedAt}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {d.teacherReply.replyText}
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    ⏳ Waiting for teacher review. Usually answered within 2-4 hours.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
