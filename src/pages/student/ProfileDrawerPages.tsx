import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  User,
  Key,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Award,
  Calendar,
  Shield,
  HelpCircle,
  Clock,
  Layers,
  BookOpen,
  GraduationCap,
  Download,
  CheckCircle2,
  Lock,
  Upload,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import {
  DEMO_STUDENT,
  MOCK_REPORT_CARD,
  MOCK_REVIEWS,
  MOCK_BEHAVIOUR,
  MOCK_DISCIPLINE,
  MOCK_SUBJECTS,
} from '../../data/mockData';

export const ProfileDrawerPages: React.FC = () => {
  const { activeProfileDrawer, closeProfileDrawer, currentUser } = useAppStore();
  const navigate = useNavigate();

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinSuccessNotice, setPinSuccessNotice] = useState(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(currentUser?.avatar || DEMO_STUDENT.avatar);
  const [avatarSuccessNotice, setAvatarSuccessNotice] = useState(false);

  if (!activeProfileDrawer) return null;

  const student = (currentUser as typeof DEMO_STUDENT) || DEMO_STUDENT;

  const avatarList = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
  ];

  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4 && newPin.length !== 8) {
      alert('PIN must be DDMM (4 digits) or DDMMYYYY (8 digits)');
      return;
    }
    setPinSuccessNotice(true);
    setTimeout(() => {
      setPinSuccessNotice(false);
      closeProfileDrawer();
    }, 2000);
  };

  const handleSaveAvatar = () => {
    setAvatarSuccessNotice(true);
    setTimeout(() => {
      setAvatarSuccessNotice(false);
      closeProfileDrawer();
    }, 1800);
  };

  const handleDownloadPDF = () => {
    alert(`Generating official PDF report card for ${student.name} (Term: ${MOCK_REPORT_CARD.term}). Download initiated.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="w-full max-w-2xl max-h-[85vh] glass-card rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 dark:border-white/10 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {activeProfileDrawer === 'pin' ? (
                <Key className="w-5 h-5" />
              ) : activeProfileDrawer === 'avatar' ? (
                <ImageIcon className="w-5 h-5" />
              ) : activeProfileDrawer === 'report-cards' ? (
                <FileText className="w-5 h-5" />
              ) : activeProfileDrawer === 'teachers' ? (
                <GraduationCap className="w-5 h-5" />
              ) : (
                <Layers className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white capitalize">
                {activeProfileDrawer.replace('-', ' ')}
              </h2>
              <p className="text-xs text-slate-400">
                Official Student Record • {student.name}
              </p>
            </div>
          </div>

          <button
            onClick={closeProfileDrawer}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 text-xs">
          {/* 1. Change PIN */}
          {activeProfileDrawer === 'pin' && (
            <form onSubmit={handlePinChange} className="space-y-4 max-w-md mx-auto">
              <p className="text-slate-500 dark:text-slate-400">
                Your login PIN is typically your Date of Birth in <strong>DDMM</strong> format (e.g. 1405 for 14th May).
              </p>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Current PIN
                </label>
                <input
                  type="password"
                  required
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="Enter current 4-digit PIN"
                  maxLength={8}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  New PIN (DDMM or DDMMYYYY)
                </label>
                <input
                  type="password"
                  required
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Enter new PIN"
                  maxLength={8}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {pinSuccessNotice && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>PIN updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30"
              >
                Update PIN
              </button>
            </form>
          )}

          {/* 2. Change Avatar */}
          {activeProfileDrawer === 'avatar' && (
            <div className="space-y-4">
              <p className="text-slate-500 dark:text-slate-400">
                Choose an illustrated student avatar from our gallery or enter a custom photo:
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {avatarList.map((url, idx) => {
                  const isSelected = selectedAvatarUrl === url;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedAvatarUrl(url)}
                      className={`cursor-pointer rounded-2xl p-1 border-2 transition-all ${
                        isSelected
                          ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-105'
                          : 'border-transparent hover:scale-102 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="w-full aspect-square rounded-xl object-cover" />
                    </div>
                  );
                })}
              </div>

              {avatarSuccessNotice && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Avatar changed successfully!</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSaveAvatar}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/30"
                >
                  Save Chosen Avatar
                </button>
              </div>
            </div>
          )}

          {/* 3. Report Cards with PDF */}
          {activeProfileDrawer === 'report-cards' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    {MOCK_REPORT_CARD.term} Examination Card ({MOCK_REPORT_CARD.academicYear})
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Class 8A • Overall: <strong>{MOCK_REPORT_CARD.overallGrade} ({MOCK_REPORT_CARD.percentage}%)</strong>
                  </p>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">Scored</th>
                      <th className="p-2.5 text-center">Max</th>
                      <th className="p-2.5 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {MOCK_REPORT_CARD.marks.map((m, i) => (
                      <tr key={i}>
                        <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">{m.subject}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">{m.scoredMarks}</td>
                        <td className="p-2.5 text-center font-mono">{m.maxMarks}</td>
                        <td className="p-2.5 text-center font-bold">{m.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500">
                <strong>Remarks: </strong> "{MOCK_REPORT_CARD.teacherRemarks}"
              </div>
            </div>
          )}

          {/* 4. Teachers list */}
          {activeProfileDrawer === 'teachers' && (
            <div className="space-y-3">
              <p className="text-slate-500 dark:text-slate-400">
                Your assigned subject educators for Class 8A:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Dr. Sunita Rao', subject: 'Mathematics & Science', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256' },
                  { name: 'Mr. David Paul', subject: 'English Language', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256' },
                  { name: 'Mrs. Lakshmi Devi', subject: 'Social Science & Telugu', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256' },
                  { name: 'Mr. Sandeep Roy', subject: 'Computer Science', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256' },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{t.name}</p>
                        <p className="text-[10px] text-slate-400">{t.subject}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        closeProfileDrawer();
                        navigate('/doubts');
                      }}
                      className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-500/20"
                    >
                      Ask Doubt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Chapters & Subjects */}
          {(activeProfileDrawer === 'chapters' || activeProfileDrawer === 'subjects') && (
            <div className="space-y-3">
              <p className="text-slate-500 dark:text-slate-400">
                Browse through all registered subjects and curriculum chapters:
              </p>
              <div className="space-y-2">
                {MOCK_SUBJECTS.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      closeProfileDrawer();
                      navigate(`/subjects?highlight=${s.id}`);
                    }}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{s.name} ({s.code})</span>
                    </div>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      {s.completedChapters}/{s.totalChapters} Ch ({s.masteryPercentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
