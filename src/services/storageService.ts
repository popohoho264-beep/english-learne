import { UserProgress, CEFRLevel, MistakeRecord } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';

const STORAGE_KEY = 'fluentpulse_user_progress_v2';

const INITIAL_PROGRESS: UserProgress = {
  currentLevel: 'A1',
  unlockedLevels: ['A1'],
  xp: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  sentencesTrainedCount: 0,
  sentencesSinceLastTest: 0,
  masteredWordIds: [],
  learningWordIds: [],
  bookmarkedWordIds: [],
  masteredGrammarIds: [],
  mistakes: [],
  testScores: [],
  dailyGoalSentences: 15,
  dailySentencesCompletedToday: 0,
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);

    // Calculate streak
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        parsed.streak = (parsed.streak || 0) + 1;
      } else if (diffDays > 1) {
        parsed.streak = 1;
      }
      parsed.lastActiveDate = today;
      parsed.dailySentencesCompletedToday = 0;
    }

    return { ...INITIAL_PROGRESS, ...parsed };
  } catch (e) {
    console.error('Error loading progress:', e);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function addTrainedSentence(
  progress: UserProgress,
  wordId?: string,
  xpEarned = 10
): { updated: UserProgress; triggerMiniTest: boolean } {
  const newCount = progress.sentencesTrainedCount + 1;
  const newSinceTest = progress.sentencesSinceLastTest + 1;
  const triggerMiniTest = newSinceTest >= 10;

  const newDaily = progress.dailySentencesCompletedToday + 1;
  const newXP = progress.xp + xpEarned;

  const learningIds = new Set(progress.learningWordIds);
  if (wordId) learningIds.add(wordId);

  // Check if eligible to unlock next level
  const unlocked = new Set(progress.unlockedLevels);
  for (const lvl of ALL_CEFR_LEVELS) {
    if (newXP >= lvl.requiredXP && newCount >= lvl.minSentences) {
      unlocked.add(lvl.level);
    }
  }

  const updated: UserProgress = {
    ...progress,
    sentencesTrainedCount: newCount,
    sentencesSinceLastTest: triggerMiniTest ? 0 : newSinceTest,
    dailySentencesCompletedToday: newDaily,
    xp: newXP,
    learningWordIds: Array.from(learningIds),
    unlockedLevels: Array.from(unlocked),
  };

  saveUserProgress(updated);
  return { updated, triggerMiniTest };
}

export function recordMistake(
  progress: UserProgress,
  mistake: Omit<MistakeRecord, 'id' | 'date' | 'reviewedCount' | 'resolved'>
): UserProgress {
  const newRecord: MistakeRecord = {
    ...mistake,
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    date: new Date().toISOString().slice(0, 10),
    reviewedCount: 0,
    resolved: false,
  };

  const updated: UserProgress = {
    ...progress,
    mistakes: [newRecord, ...progress.mistakes.slice(0, 99)], // keep top 100 mistakes
  };

  saveUserProgress(updated);
  return updated;
}

export function resolveMistake(progress: UserProgress, mistakeId: string): UserProgress {
  const updatedMistakes = progress.mistakes.map(m =>
    m.id === mistakeId ? { ...m, resolved: true, reviewedCount: m.reviewedCount + 1 } : m
  );

  const updated: UserProgress = {
    ...progress,
    xp: progress.xp + 15,
    mistakes: updatedMistakes,
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleWordMastery(progress: UserProgress, wordId: string): UserProgress {
  const mastered = new Set(progress.masteredWordIds);
  const learning = new Set(progress.learningWordIds);

  if (mastered.has(wordId)) {
    mastered.delete(wordId);
    learning.add(wordId);
  } else {
    mastered.add(wordId);
    learning.delete(wordId);
  }

  const updated: UserProgress = {
    ...progress,
    masteredWordIds: Array.from(mastered),
    learningWordIds: Array.from(learning),
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleBookmark(progress: UserProgress, wordId: string): UserProgress {
  const bookmarks = new Set(progress.bookmarkedWordIds);
  if (bookmarks.has(wordId)) {
    bookmarks.delete(wordId);
  } else {
    bookmarks.add(wordId);
  }

  const updated: UserProgress = {
    ...progress,
    bookmarkedWordIds: Array.from(bookmarks),
  };

  saveUserProgress(updated);
  return updated;
}
