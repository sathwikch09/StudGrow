import React, { useState } from 'react';
import { Dumbbell, Plus, Calendar, Clock, CheckCircle2, Send } from 'lucide-react';
import { MOCK_SUBJECTS } from '../../data/mockData';

export const AssignmentManager: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedClass, setSelectedClass] = useState('8A');
  const [selectedConcept, setSelectedConcept] = useState('c-frac-3');
  const [difficultyMode, setDifficultyMode] = useState('Adaptive (AI Driven)');
  const [dueDate, setDueDate] = useState('2026-11-05');
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  const existingAssignments = [
    {
      id: 'asg-1',
      title: 'Fraction Word Problems Intensive Scaffolding',
      targetClass: 'Class 8A',
      concept: 'Word Problems on Fractions',
      dueDate: '02 Nov 2026',
      submissions: 28,
      total: 42,
      status: 'Active',
    },
    {
      id: 'asg-2',
      title: 'Linear Equations Diagnostic Speed Test',
      targetClass: 'Class 8A',
      concept: 'Balancing Linear Equations',
      dueDate: '25 Oct 2026',
      submissions: 41,
      total: 42,
      status: 'Completed',
    },
  ];

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setAssignedSuccess(true);
    setTimeout(() => {
      setAssignedSuccess(false);
      setTitle('');
    }, 3000);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Adaptive Assignment & Practice Builder
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Push targeted practice tests with custom deadlines directly to student dashboards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form: Create Assignment */}
        <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Plus className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">
              Create New Test Assignment
            </h3>
          </div>

          <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Assignment Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Weekend Rational Numbers Quiz"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target Class & Section
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="8A">Class 8 - Section A</option>
                <option value="8B">Class 8 - Section B</option>
                <option value="9A">Class 9 - Section A</option>
                <option value="10B">Class 10 - Section B</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target Concept
              </label>
              <select
                value={selectedConcept}
                onChange={(e) => setSelectedConcept(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="c-frac-3">Word Problems on Fractions (Weak spot)</option>
                <option value="c-frac-1">Equivalent Fractions & Simplification</option>
                <option value="c-frac-2">Addition of Unlike Fractions</option>
                <option value="c-lin-1">Balancing Linear Equations</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Difficulty Engine Mode
              </label>
              <select
                value={difficultyMode}
                onChange={(e) => setDifficultyMode(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="Adaptive (AI Driven)">Adaptive (Auto-scales per student)</option>
                <option value="Strictly Easy">Strictly Easy (Foundation reinforcement)</option>
                <option value="Strictly Hard">Strictly Hard (Olympiad Challenge)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Deadline Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              />
            </div>

            {assignedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Practice test assigned to all 42 students!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish & Notify Class</span>
            </button>
          </form>
        </div>

        {/* Existing Assigned Tests List */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">
              Live & Past Class Assignments
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Synchronized with Student Portals
            </span>
          </div>

          <div className="space-y-3">
            {existingAssignments.map((asg) => (
              <div
                key={asg.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {asg.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400">
                      Target: {asg.targetClass} • Concept: <strong>{asg.concept}</strong>
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      asg.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/40 dark:border-slate-700 text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Due: {asg.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {asg.submissions}/{asg.total}
                    </span>
                    <span>Submissions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
