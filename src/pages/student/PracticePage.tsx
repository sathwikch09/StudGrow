import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Flame,
  Clock,
  Sparkles,
  BrainCircuit,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { QuestionView } from '../../components/practice/QuestionView';
import { HintPanel } from '../../components/practice/HintPanel';
import { AnswerFeedback } from '../../components/practice/AnswerFeedback';
import { PracticeResults } from '../../components/practice/PracticeResults';
import { WhyThisNextModal } from '../../components/common/WhyThisNextModal';
import { triggerConfettiCelebration } from '../../components/common/ConfettiCelebration';
import { useAdaptiveStore } from '../../store/useAdaptiveStore';
import { useOfflineStore } from '../../store/useOfflineStore';
import { useAppStore } from '../../store/useAppStore';
import { MOCK_SUBJECTS } from '../../data/mockData';
import { Question, QuestionDifficulty } from '../../types';

export const PracticePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const conceptParam = searchParams.get('concept') || 'c-frac-1';
  const navigate = useNavigate();

  const {
    conceptMastery,
    initConcept,
    recordAnswer,
    activeQuestionDifficulty,
    lastDecisionReason,
  } = useAdaptiveStore();

  const { recordOfflineAnswer } = useOfflineStore();
  const currentUser = useAppStore((s) => s.currentUser);

  // Find concept questions
  let matchedConcept = MOCK_SUBJECTS[0].chapters[0].concepts[0];
  for (const s of MOCK_SUBJECTS) {
    for (const ch of s.chapters) {
      for (const c of ch.concepts) {
        if (c.id === conceptParam) {
          matchedConcept = c;
        }
      }
    }
  }

  // State
  const [questionList, setQuestionList] = useState<Question[]>(matchedConcept.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [xpEarnedThisQuestion, setXpEarnedThisQuestion] = useState(0);
  const [nextDifficultyState, setNextDifficultyState] = useState<QuestionDifficulty>('Easy');
  const [decisionReasonState, setDecisionReasonState] = useState('');
  const [whyModalOpen, setWhyModalOpen] = useState(false);

  // Overall session metrics
  const [sessionScore, setSessionScore] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(true);

  useEffect(() => {
    initConcept(conceptParam);
    setQuestionList(matchedConcept.questions);
    setCurrentIndex(0);
    setSessionScore(0);
    setTotalXpEarned(0);
    setIsFinished(false);
  }, [conceptParam]);

  useEffect(() => {
    let interval: any;
    if (timerEnabled && !isFinished) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerEnabled, isFinished]);

  const currentQuestion = questionList[currentIndex] || questionList[0];
  const totalQuestions = questionList.length;

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isSubmitted) return;

    const timeSpent = Math.max(1, Math.floor((Date.now() - questionStartTime) / 1000));

    // Verify answer
    let correct = false;
    if (currentQuestion.type === 'fill-blank') {
      correct = String(selectedAnswer).trim().toLowerCase() === String(currentQuestion.correctAnswer).trim().toLowerCase();
    } else {
      correct = Number(selectedAnswer) === Number(currentQuestion.correctAnswer);
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      triggerConfettiCelebration();
    }

    // Adaptive Engine calculation
    const adaptiveResult = recordAnswer({
      conceptId: matchedConcept.id,
      question: currentQuestion,
      isCorrect: correct,
      hintsUsedCount,
      timeSpentSeconds: timeSpent,
    });

    setNextDifficultyState(adaptiveResult.newDifficulty);
    setDecisionReasonState(adaptiveResult.decisionReason);

    const xpGained = correct ? Math.max(5, (currentQuestion.difficulty === 'Hard' ? 20 : 12) - hintsUsedCount * 2) : 2;
    setXpEarnedThisQuestion(xpGained);
    setTotalXpEarned((prev) => prev + xpGained);

    if (correct) {
      setSessionScore((prev) => prev + 1);
    }

    // Record to offline queue / IDB
    recordOfflineAnswer({
      studentId: currentUser ? currentUser.id : 'STU-8042',
      questionId: currentQuestion.id,
      conceptId: matchedConcept.id,
      userAnswer: selectedAnswer,
      isCorrect: correct,
      hintsUsedCount,
      timeSpentSeconds: timeSpent,
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setHintsUsedCount(0);
      setQuestionStartTime(Date.now());
    } else {
      setIsFinished(true);
    }
  };

  const handleTrySimilar = () => {
    // Reset current question attempt without penalty
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setHintsUsedCount(0);
    setQuestionStartTime(Date.now());
  };

  const handleUseHint = () => {
    if (hintsUsedCount < currentQuestion.hints.length) {
      setHintsUsedCount((prev) => prev + 1);
    }
  };

  const dynamicConceptState = conceptMastery[matchedConcept.id] || {
    score: 50,
    level: 'Learning',
    currentDifficulty: 'Easy',
    consecutiveCorrect: 0,
  };

  if (isFinished) {
    const accuracy = (sessionScore / totalQuestions) * 100;
    return (
      <PracticeResults
        score={sessionScore}
        totalQuestions={totalQuestions}
        accuracy={accuracy}
        totalTimeSeconds={timerSeconds}
        xpEarned={totalXpEarned}
        concept={matchedConcept}
        newMasteryScore={dynamicConceptState.score}
        onRetry={() => {
          setCurrentIndex(0);
          setSessionScore(0);
          setTotalXpEarned(0);
          setSelectedAnswer(null);
          setIsSubmitted(false);
          setIsFinished(false);
          setTimerSeconds(0);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 select-none animate-fade-in pb-12">
      {/* Top Session Progress Bar */}
      <div className="glass-card rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-white">
              {matchedConcept.title}
            </span>
            <p className="text-[11px] text-slate-400">
              Question {currentIndex + 1} of {totalQuestions}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono font-bold">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-amber-500" />
              <span>{dynamicConceptState.consecutiveCorrect} Streak</span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                {Math.floor(timerSeconds / 60)}:
                {String(timerSeconds % 60).padStart(2, '0')}
              </span>
            </div>

            {/* Why This Next Pill */}
            <button
              onClick={() => setWhyModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20 text-xs"
              title="Click to understand why this question was selected"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Why this?</span>
            </button>
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-xl space-y-6">
        <QuestionView
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={(ans) => !isSubmitted && setSelectedAnswer(ans)}
          isSubmitted={isSubmitted}
          isCorrect={isCorrect}
        />

        {/* Submit Answer Button (shown before submit) */}
        {!isSubmitted && (
          <div className="flex justify-end pt-2">
            <button
              disabled={selectedAnswer === null}
              onClick={handleSubmitAnswer}
              className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Check Answer
            </button>
          </div>
        )}

        {/* Progressive Hint Panel */}
        {!isSubmitted && currentQuestion.hints.length > 0 && (
          <HintPanel
            hints={currentQuestion.hints}
            hintsUsedCount={hintsUsedCount}
            onUseHint={handleUseHint}
            disabled={isSubmitted}
          />
        )}

        {/* Answer Feedback (After submit) */}
        {isSubmitted && (
          <AnswerFeedback
            isCorrect={isCorrect}
            question={currentQuestion}
            xpEarned={xpEarnedThisQuestion}
            decisionReason={decisionReasonState || lastDecisionReason}
            nextDifficulty={nextDifficultyState}
            onNextQuestion={handleNextQuestion}
            onTrySimilar={handleTrySimilar}
            onOpenWhyModal={() => setWhyModalOpen(true)}
          />
        )}
      </div>

      <WhyThisNextModal
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
      />
    </div>
  );
};
