import React, { useState } from 'react';
import {
  Users,
  Award,
  AlertTriangle,
  HelpCircle,
  Search,
  Filter,
  Eye,
  Settings,
  ChevronRight,
  TrendingUp,
  UserPlus,
  X,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const TeacherDashboard: React.FC = () => {
  const { allStudents, openStudentDrawer, doubts, addStudent } = useAppStore();
  const [selectedClass, setSelectedClass] = useState('8A');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Student Modal State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newRollNumber, setNewRollNumber] = useState('');
  const [newGrade, setNewGrade] = useState<number>(8);
  const [newSection, setNewSection] = useState('A');
  const [newDob, setNewDob] = useState('15/06/2012');
  const [newParentName, setNewParentName] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('+91 ');
  const [newEmail, setNewEmail] = useState('');
  const [newAddress, setNewAddress] = useState('Hyderabad, Telangana');
  const [newMonthlyScore, setNewMonthlyScore] = useState<number>(75);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [addSuccessNotice, setAddSuccessNotice] = useState<string | null>(null);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
  ];

  const openDoubtsCount = doubts.filter((d) => d.status === 'Open').length;

  const filteredStudents = allStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.includes(searchQuery) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const studentsNeedingHelp = allStudents.filter((s) => s.monthlyAverageScore < 70);

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newRollNumber.trim()) return;

    // Extract PIN from DD/MM/YYYY (first two digits of DD + two digits of MM)
    const cleanedDob = newDob.replace(/[^0-9]/g, '');
    const pin = cleanedDob.length >= 4 ? cleanedDob.slice(0, 4) : '1234';

    addStudent({
      name: newStudentName.trim(),
      rollNumber: newRollNumber.trim().padStart(2, '0'),
      classGrade: newGrade,
      section: newSection,
      dob: newDob,
      pinHash: pin,
      parentName: newParentName.trim() || 'Parent / Guardian',
      parentContact: newParentPhone.trim() || '+91 98480 00000',
      email: newEmail.trim() || `${newStudentName.toLowerCase().replace(/\s+/g, '.')}@studgrow.edu`,
      address: newAddress.trim(),
      avatar: sampleAvatars[selectedAvatarIndex],
      streakDays: 1,
      xp: 250,
      level: 1,
      classRank: allStudents.length + 1,
      attendancePercentage: 96,
      monthlyAverageScore: Number(newMonthlyScore) || 75,
    });

    setAddSuccessNotice(`Student "${newStudentName}" enrolled with Roll #${newRollNumber} and PIN: ${pin}!`);
    setTimeout(() => {
      setAddSuccessNotice(null);
      setIsAddStudentOpen(false);
      setNewStudentName('');
      setNewRollNumber('');
      setNewParentName('');
      setNewEmail('');
    }, 2000);
  };

  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      {/* Header & Class Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono">
              Faculty Workspace
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Dr. Sunita Rao</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">
            Class Performance Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time adaptive learning analytics, individual student oversight & enrollment
          </p>
        </div>

        {/* Top Actions: Add Student & Class Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Student</span>
          </button>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500">Active Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
            >
              <option value="8A">Class 8 - Section A ({allStudents.length} Students)</option>
              <option value="8B">Class 8 - Section B (38 Students)</option>
              <option value="9A">Class 9 - Section A (40 Students)</option>
              <option value="10B">Class 10 - Section B (36 Students)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-xs font-bold">Total Enrolled</span>
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-slate-800 dark:text-white">
            {allStudents.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">94% average attendance</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="text-xs font-bold">Class Average</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-slate-800 dark:text-white">
            78.4%
          </p>
          <p className="text-[11px] text-emerald-500 mt-1">↑ 4.2% from last month</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <span className="text-xs font-bold">Need Attention</span>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-slate-800 dark:text-white">
            {studentsNeedingHelp.length} Students
          </p>
          <p className="text-[11px] text-amber-500 mt-1">Word Problems concept weak</p>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-md">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-2">
            <span className="text-xs font-bold">Open Doubts</span>
            <HelpCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-slate-800 dark:text-white">
            {openDoubtsCount} Pending
          </p>
          <p className="text-[11px] text-purple-500 mt-1">Awaiting teacher replies</p>
        </div>
      </div>

      {/* Actionable "Students Who Need Help" List */}
      {studentsNeedingHelp.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">
                Action Alert: Students Needing Support in Fraction Word Problems
              </h3>
            </div>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
              Adaptive system suggests 1-on-1 scaffolding or prerequisite review
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {studentsNeedingHelp.map((st) => (
              <div
                key={st.id}
                onClick={() => openStudentDrawer(st.id)}
                className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-200 dark:border-amber-900 flex items-center justify-between text-xs cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <img src={st.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{st.name}</p>
                    <p className="text-[10px] text-slate-400">Roll #{st.rollNumber} • Avg: {st.monthlyAverageScore}%</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 hover:underline">
                  Inspect →
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student List Table */}
      <div className="glass-card rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Students Roster ({filteredStudents.length})
              </h3>
            </div>
            <button
              onClick={() => setIsAddStudentOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold hover:bg-indigo-100"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Student</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, roll, or ID..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Roll No</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Student ID</th>
                <th className="p-3.5 text-center">Class Rank</th>
                <th className="p-3.5 text-center">Monthly Avg</th>
                <th className="p-3.5 text-center">Attendance</th>
                <th className="p-3.5 text-center">Streak</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((st) => (
                <tr
                  key={st.id}
                  onClick={() => openStudentDrawer(st.id)}
                  className="hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="p-3.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                    #{st.rollNumber}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 flex items-center gap-2.5">
                    <img src={st.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span>{st.name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 dark:text-slate-400">
                    {st.id}
                  </td>
                  <td className="p-3.5 text-center font-bold">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      #{st.classRank}
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        st.monthlyAverageScore >= 85
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : st.monthlyAverageScore >= 70
                          ? 'bg-indigo-500/10 text-indigo-600'
                          : 'bg-rose-500/10 text-rose-600'
                      }`}
                    >
                      {st.monthlyAverageScore}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-mono text-slate-600 dark:text-slate-400">
                    {st.attendancePercentage}%
                  </td>
                  <td className="p-3.5 text-center font-mono font-bold text-amber-500">
                    {st.streakDays}d 🔥
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStudentDrawer(st.id);
                      }}
                      className="p-1.5 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 transition-colors"
                      title="Inspect Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl max-h-[90vh] glass-card rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 dark:border-white/10 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-base">
                    Enroll New Student to StudGrow
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adds student to class roster, generates login PIN, and initializes adaptive profile
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleAddStudentSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
              {addSuccessNotice && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{addSuccessNotice}</span>
                </div>
              )}

              {/* Avatar Selection */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Choose Student Avatar:
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {sampleAvatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      onClick={() => setSelectedAvatarIndex(i)}
                      className={`w-11 h-11 rounded-2xl object-cover cursor-pointer border-2 transition-all shrink-0 ${
                        selectedAvatarIndex === i
                          ? 'border-indigo-600 scale-105 ring-2 ring-indigo-500/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Name & Roll */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="e.g. Priyanka Sen"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRollNumber}
                    onChange={(e) => setNewRollNumber(e.target.value)}
                    placeholder="e.g. 43"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Class & Section */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Class Grade
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={6}>Class 6</option>
                    <option value={7}>Class 7</option>
                    <option value={8}>Class 8</option>
                    <option value={9}>Class 9</option>
                    <option value={10}>Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Section
                  </label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
              </div>

              {/* DOB and Computed PIN */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Date of Birth (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    required
                    value={newDob}
                    onChange={(e) => setNewDob(e.target.value)}
                    placeholder="15/06/2012"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-mono font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Login PIN (Auto: DDMM)
                  </label>
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono font-bold">
                    {newDob.replace(/[^0-9]/g, '').slice(0, 4) || '1234'}
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                    placeholder="e.g. Ramesh Sen"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Parent Contact Phone
                  </label>
                  <input
                    type="text"
                    value={newParentPhone}
                    onChange={(e) => setNewParentPhone(e.target.value)}
                    placeholder="+91 98480 12345"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-mono font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Initial Score */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Baseline Diagnostic Average Score (%):
                </label>
                <input
                  type="number"
                  min={20}
                  max={100}
                  value={newMonthlyScore}
                  onChange={(e) => setNewMonthlyScore(Number(e.target.value))}
                  className="w-32 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-mono font-bold focus:outline-none"
                />
              </div>

              {/* Footer Submit */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
