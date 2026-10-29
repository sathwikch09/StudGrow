import { create } from 'zustand';
import {
  QuestionDifficulty,
  MasteryLevel,
  AdaptiveLog,
  Question,
} from '../types';
import { MOCK_SUBJECTS } from '../data/mockData';

interface ConceptMasteryState {
  conceptId: string;
  score: number;
  level: MasteryLevel;
  currentDifficulty: QuestionDifficulty;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  totalAnswered: number;
  totalCorrect: number;
}

interface AdaptiveState {
  conceptMastery: Record<string, ConceptMasteryState>;
  adaptiveLogs: AdaptiveLog[];
  revisionQuestionIds: string[];
  activeConceptId: string;
  activeQuestionDifficulty: QuestionDifficulty;
  lastDecisionReason: string;
  isSimplerModeActive: boolean;
  challengeModeUnlocked: boolean;

  // Actions
  initConcept: (conceptId: string) => void;
  recordAnswer: (params: {
    conceptId: string;
    question: Question;
    isCorrect: boolean;
    hintsUsedCount: number;
    timeSpentSeconds: number;
  }) => {
    newDifficulty: QuestionDifficulty;
    decisionReason: string;
    scoreChange: number;
    shouldSwitchToSimpler: boolean;
  };
  getConceptState: (conceptId: string) => ConceptMasteryState;
  getRevisionQuestions: () => Question[];
  removeRevisionQuestion: (questionId: string) => void;
  resetConceptAdaptiveState: (conceptId: string) => void;
}

const computeMasteryLevel = (score: number): MasteryLevel => {
  if (score >= 90) return 'Mastered';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Learning';
  return 'Needs Help';
};

export const useAdaptiveStore = create<AdaptiveState>((set, get) => ({
  conceptMastery: {
    'c-frac-1': {
      conceptId: 'c-frac-1',
      score: 92,
      level: 'Mastered',
      currentDifficulty: 'Medium',
      consecutiveCorrect: 4,
      consecutiveWrong: 0,
      totalAnswered: 12,
      totalCorrect: 11,
    },
    'c-frac-2': {
      conceptId: 'c-frac-2',
      score: 68,
      level: 'Learning',
      currentDifficulty: 'Medium',
      consecutiveCorrect: 1,
      consecutiveWrong: 0,
      totalAnswered: 8,
      totalCorrect: 5,
    },
    'c-frac-3': {
      conceptId: 'c-frac-3',
      score: 48,
      level: 'Needs Help',
      currentDifficulty: 'Easy',
      consecutiveCorrect: 0,
      consecutiveWrong: 2,
      totalAnswered: 6,
      totalCorrect: 2,
    },
  },
  adaptiveLogs: [
    {
      id: 'log-1',
      timestamp: 'Today, 10:14 AM',
      conceptId: 'c-frac-3',
      action: 'switch_to_simpler',
      fromDifficulty: 'Medium',
      toDifficulty: 'Easy',
      reason: '2 consecutive incorrect attempts on Word Problems. System adapted to simpler visual steps and lowered difficulty to Easy.',
    },
    {
      id: 'log-2',
      timestamp: 'Today, 10:25 AM',
      conceptId: 'c-frac-1',
      action: 'increase_difficulty',
      fromDifficulty: 'Easy',
      toDifficulty: 'Medium',
      reason: '3 consecutive correct answers without hints! Increased difficulty to Medium to foster growth.',
    },
  ],
  revisionQuestionIds: ['q-wp-4', 'q-add-4'],
  activeConceptId: 'c-frac-3',
  activeQuestionDifficulty: 'Easy',
  lastDecisionReason: 'Difficulty set to Easy with visual hints based on recent practice in Word Problems.',
  isSimplerModeActive: false,
  challengeModeUnlocked: false,

  initConcept: (conceptId: string) => {
    const existing = get().conceptMastery[conceptId];
    if (!existing) {
      set((state) => ({
        activeConceptId: conceptId,
        conceptMastery: {
          ...state.conceptMastery,
          [conceptId]: {
            conceptId,
            score: 50,
            level: 'Needs Help',
            currentDifficulty: 'Easy',
            consecutiveCorrect: 0,
            consecutiveWrong: 0,
            totalAnswered: 0,
            totalCorrect: 0,
          },
        },
      }));
    } else {
      set({
        activeConceptId: conceptId,
        activeQuestionDifficulty: existing.currentDifficulty,
      });
    }
  },

  recordAnswer: ({ conceptId, question, isCorrect, hintsUsedCount, timeSpentSeconds }) => {
    const current = get().conceptMastery[conceptId] || {
      conceptId,
      score: 50,
      level: 'Needs Help' as MasteryLevel,
      currentDifficulty: 'Easy' as QuestionDifficulty,
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      totalAnswered: 0,
      totalCorrect: 0,
    };

    let nextDifficulty: QuestionDifficulty = current.currentDifficulty;
    let decisionReason = '';
    let scoreDelta = 0;
    let switchToSimpler = false;
    let challengeUnlocked = false;

    let newConsecutiveCorrect = isCorrect ? current.consecutiveCorrect + 1 : 0;
    let newConsecutiveWrong = !isCorrect ? current.consecutiveWrong + 1 : 0;

    if (isCorrect) {
      // Calculate positive score
      const hintDeduction = hintsUsedCount * 2;
      scoreDelta = Math.max(4, (question.difficulty === 'Hard' ? 14 : question.difficulty === 'Medium' ? 10 : 7) - hintDeduction);
      
      // Fast answer bonus
      if (timeSpentSeconds < 15 && hintsUsedCount === 0) {
        scoreDelta += 4;
        challengeUnlocked = true;
      }

      // Step up difficulty if 2 consecutive correct
      if (newConsecutiveCorrect >= 2) {
        if (current.currentDifficulty === 'Easy') {
          nextDifficulty = 'Medium';
          decisionReason = `Great job! 2 consecutive correct answers. Increasing difficulty from Easy to Medium.`;
        } else if (current.currentDifficulty === 'Medium') {
          nextDifficulty = 'Hard';
          decisionReason = `Superb mastery! Stepping up difficulty to Hard for an advanced challenge.`;
        } else {
          nextDifficulty = 'Hard';
          decisionReason = `Outstanding streak at Hard difficulty! Challenge bonus awarded.`;
        }
      } else {
        decisionReason = `Correct answer! Kept at ${current.currentDifficulty} to consolidate mastery.`;
      }
    } else {
      // Wrong answer
      scoreDelta = question.difficulty === 'Hard' ? -4 : -6;
      
      // Add to revision list
      const revList = Array.from(new Set([...get().revisionQuestionIds, question.id]));
      set({ revisionQuestionIds: revList });

      if (newConsecutiveWrong >= 2) {
        switchToSimpler = true;
        if (current.currentDifficulty === 'Hard') {
          nextDifficulty = 'Medium';
          decisionReason = `2 incorrect answers in a row. Stepping down to Medium and offering guided hints.`;
        } else if (current.currentDifficulty === 'Medium') {
          nextDifficulty = 'Easy';
          decisionReason = `2 incorrect answers. Stepping down to Easy and activating simpler visual breakdown.`;
        } else {
          nextDifficulty = 'Easy';
          decisionReason = `Need extra support. Recommending a review of the prerequisite lesson.`;
        }
      } else {
        decisionReason = `Not quite right. Reviewing the step-by-step reasoning below before the next question.`;
      }
    }

    const newScore = Math.min(100, Math.max(0, current.score + scoreDelta));
    const newLevel = computeMasteryLevel(newScore);

    const updatedConceptState: ConceptMasteryState = {
      conceptId,
      score: newScore,
      level: newLevel,
      currentDifficulty: nextDifficulty,
      consecutiveCorrect: newConsecutiveCorrect,
      consecutiveWrong: newConsecutiveWrong,
      totalAnswered: current.totalAnswered + 1,
      totalCorrect: current.totalCorrect + (isCorrect ? 1 : 0),
    };

    const newLog: AdaptiveLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      conceptId,
      action: isCorrect
        ? newConsecutiveCorrect >= 2
          ? 'increase_difficulty'
          : 'streak_bonus'
        : newConsecutiveWrong >= 2
        ? 'switch_to_simpler'
        : 'decrease_difficulty',
      fromDifficulty: current.currentDifficulty,
      toDifficulty: nextDifficulty,
      reason: decisionReason,
    };

    set((state) => ({
      conceptMastery: {
        ...state.conceptMastery,
        [conceptId]: updatedConceptState,
      },
      adaptiveLogs: [newLog, ...state.adaptiveLogs.slice(0, 20)],
      activeQuestionDifficulty: nextDifficulty,
      lastDecisionReason: decisionReason,
      isSimplerModeActive: switchToSimpler,
      challengeModeUnlocked: challengeUnlocked,
    }));

    return {
      newDifficulty: nextDifficulty,
      decisionReason,
      scoreChange: scoreDelta,
      shouldSwitchToSimpler: switchToSimpler,
    };
  },

  getConceptState: (conceptId: string) => {
    return (
      get().conceptMastery[conceptId] || {
        conceptId,
        score: 50,
        level: 'Needs Help',
        currentDifficulty: 'Easy',
        consecutiveCorrect: 0,
        consecutiveWrong: 0,
        totalAnswered: 0,
        totalCorrect: 0,
      }
    );
  },

  getRevisionQuestions: () => {
    const revIds = new Set(get().revisionQuestionIds);
    const results: Question[] = [];
    for (const sub of MOCK_SUBJECTS) {
      for (const ch of sub.chapters) {
        for (const c of ch.concepts) {
          for (const q of c.questions) {
            if (revIds.has(q.id)) {
              results.push(q);
            }
          }
        }
      }
    }
    return results;
  },

  removeRevisionQuestion: (questionId: string) => {
    set((state) => ({
      revisionQuestionIds: state.revisionQuestionIds.filter((id) => id !== questionId),
    }));
  },

  resetConceptAdaptiveState: (conceptId: string) => {
    set((state) => ({
      conceptMastery: {
        ...state.conceptMastery,
        [conceptId]: {
          conceptId,
          score: 50,
          level: 'Needs Help',
          currentDifficulty: 'Easy',
          consecutiveCorrect: 0,
          consecutiveWrong: 0,
          totalAnswered: 0,
          totalCorrect: 0,
        },
      },
    }));
  },
}));
