import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Eye,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { MOCK_SUBJECTS } from '../../data/mockData';
import { speakText, stopSpeaking } from '../../services/tts';
import { useAppStore } from '../../store/useAppStore';

export const ConceptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const language = useAppStore((s) => s.language);

  // Find concept
  let matchedConcept = MOCK_SUBJECTS[0].chapters[0].concepts[2]; // fallback to Word Problems
  for (const s of MOCK_SUBJECTS) {
    for (const ch of s.chapters) {
      for (const c of ch.concepts) {
        if (c.id === id) {
          matchedConcept = c;
        }
      }
    }
  }

  const [activeTab, setActiveTab] = useState<'basic' | 'detailed' | 'visual' | 'example'>('basic');
  const [isSimplerMode, setIsSimplerMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const textToRead = isSimplerMode
        ? matchedConcept.explanations.simpler
        : activeTab === 'basic'
        ? matchedConcept.explanations.basic
        : activeTab === 'detailed'
        ? matchedConcept.explanations.detailed
        : activeTab === 'example'
        ? `${matchedConcept.explanations.example.scenario}. Solution: ${matchedConcept.explanations.example.solution}`
        : matchedConcept.explanations.visual.steps.join('. ');

      speakText(textToRead, language, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 select-none animate-fade-in pb-12">
      {/* Top Header Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">
                Concept Masterclass
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Estimated: {matchedConcept.estimatedMinutes} mins</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {matchedConcept.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {matchedConcept.summary}
            </p>
          </div>

          {/* Read Aloud & Adaptive Scaffolding Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleToggleReadAloud}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-500'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-500" />}
              <span>{isSpeaking ? 'Stop Audio' : 'Read Aloud (TTS)'}</span>
            </button>

            <button
              onClick={() => setIsSimplerMode(!isSimplerMode)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all ${
                isSimplerMode
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimplerMode ? 'Normal View' : 'Explain Simpler'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Explanation Modes Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 px-2 overflow-x-auto horizontal-scroll-row touch-pan-x snap-x scrollbar-none">
        {[
          { key: 'basic', label: '1. Basic Concept', icon: BookOpen },
          { key: 'detailed', label: '2. Detailed Theory', icon: Layers },
          { key: 'visual', label: '3. Visual Model', icon: Eye },
          { key: 'example', label: '4. Real-Life Example', icon: Lightbulb },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any);
                setIsSimplerMode(false);
              }}
              className={`min-h-[44px] shrink-0 snap-start touch-manipulation flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                isActive && !isSimplerMode
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Body Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-lg space-y-6">
        {/* If Simpler Mode is Active */}
        {isSimplerMode ? (
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>StudGrow Adaptive Simpler Scaffolding</span>
            </div>
            <p className="text-base text-slate-800 dark:text-slate-100 leading-relaxed">
              {matchedConcept.explanations.simpler}
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'basic' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Fundamental Concept
                </h3>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  {matchedConcept.explanations.basic}
                </p>
              </div>
            )}

            {activeTab === 'detailed' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Formal Mathematical & Scientific Principles
                </h3>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                  {matchedConcept.explanations.detailed}
                </p>
              </div>
            )}

            {activeTab === 'visual' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    Step-by-Step Visual Representation
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {matchedConcept.explanations.visual.caption}
                  </p>
                </div>

                {/* Interactive visual step cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedConcept.explanations.visual.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-[11px]">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'example' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Real-World Scenario Walkthrough
                </h3>
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2 text-xs md:text-sm">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
                    Scenario Story:
                  </span>
                  <p className="text-slate-800 dark:text-slate-200">
                    "{matchedConcept.explanations.example.scenario}"
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs md:text-sm">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 block">
                    Step-by-Step Solution:
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
                    {matchedConcept.explanations.example.solution}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Key Takeaways Box */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Key Points to Remember
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {matchedConcept.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Big Start Practice Test Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 dark:border-slate-800">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Ready to test your understanding with adaptive questions?
          </p>

          <button
            onClick={() => navigate(`/practice?concept=${matchedConcept.id}`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>START PRACTICE TEST</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
