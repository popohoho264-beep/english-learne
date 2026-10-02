import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Flame,
  Zap,
  BookOpen,
  Lock,
  Unlock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';
import { resolveMistake } from '../services/storageService';
import { speechService } from '../services/speechService';

interface ProgressSectionProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onOpenTestNow: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  progress,
  setProgress,
  onOpenTestNow,
}) => {
  const currentLvlIdx = ALL_CEFR_LEVELS.findIndex(
    (l) => l.level === progress.currentLevel
  );
  const nextLvl = ALL_CEFR_LEVELS[currentLvlIdx + 1];

  const totalTests = progress.testScores.length;
  const avgScore =
    totalTests > 0
      ? Math.round(
          progress.testScores.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0) /
            totalTests
        )
      : 95;

  const handleResolveMistake = (id: string, exampleEn: string) => {
    speechService.speak(exampleEn);
    const updated = resolveMistake(progress, id);
    setProgress(updated);
  };

  return (
    <div className="space-y-6">
      {/* Level Progression Hierarchy Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              CEFR Mastery Path
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Demonstrated Performance Unlocking
            </h2>
            <p className="text-xs text-slate-500 font-arabic mt-0.5">
              لا يمكن الانتقال للمستوى التالي إلا بعد إثبات الكفاءة وجمع نقاط الخبرة المطلوبة.
            </p>
          </div>

          {nextLvl && (
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-semibold uppercase block">
                Next Milestone:
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {nextLvl.level} ({nextLvl.name})
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block">
                Requires {nextLvl.requiredXP} XP ({Math.max(0, nextLvl.requiredXP - progress.xp)} XP remaining)
              </span>
            </div>
          )}
        </div>

        {/* Level Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
          {ALL_CEFR_LEVELS.map((lvl, idx) => {
            const isUnlocked = progress.unlockedLevels.includes(lvl.level);
            const isCurrent = progress.currentLevel === lvl.level;

            return (
              <div
                key={lvl.level}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20'
                    : isUnlocked
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {isUnlocked ? (
                    <Unlock className={`w-3 h-3 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-400" />
                  )}
                  <span className="text-xs font-black">{lvl.level}</span>
                </div>
                <span className="text-[11px] font-bold block line-clamp-1">{lvl.name}</span>
                <span className="text-[10px] opacity-75 font-arabic block">{lvl.nameAr}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPI Cards: Mastered, Accuracy, Streak, Sentences Trained */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Vocabulary Mastered */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Vocab Mastered</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            {progress.masteredWordIds.length}
          </span>
          <span className="text-xs text-slate-500 font-arabic block">
            كلمة تم إتقانها وتثبيتها
          </span>
        </div>

        {/* Overall Accuracy */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Accuracy Rate</span>
            <span className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            {avgScore}%
          </span>
          <span className="text-xs text-slate-500 font-arabic block">
            معدل الدقة في الاختبارات
          </span>
        </div>

        {/* Sentences Trained */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Sentences Built</span>
            <span className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            {progress.sentencesTrainedCount}
          </span>
          <span className="text-xs text-slate-500 font-arabic block">
            جملة واقعية تم بناؤها
          </span>
        </div>

        {/* Daily Streak */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Daily Streak</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Flame className="w-4 h-4 fill-amber-500" />
            </span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            {progress.streak} Days
          </span>
          <span className="text-xs text-slate-500 font-arabic block">
            أيام متواصلة من الممارسة
          </span>
        </div>
      </div>

      {/* Intelligent Error System: Weak Areas & Mistake Recovery Bank */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Intelligent Error System (بنك تصحيح الأخطاء)
              </h3>
              <p className="text-xs text-slate-500 font-arabic">
                كل خطأ ترتكبه يُسجل هنا مع الشرح بالعربية ومثال مماثل لتثبيته في الذاكرة.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {progress.mistakes.filter((m) => !m.resolved).length} Pending Review
          </span>
        </div>

        {progress.mistakes.filter((m) => !m.resolved).length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <Sparkles className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
            <span>Clean slate! No unresolved mistakes found. Keep practicing!</span>
          </div>
        ) : (
          <div className="space-y-3">
            {progress.mistakes
              .filter((m) => !m.resolved)
              .slice(0, 10)
              .map((mistake) => (
                <div
                  key={mistake.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                        {mistake.concept}
                      </span>
                      <span className="text-[11px] text-slate-400">• {mistake.date}</span>
                    </div>

                    <div className="text-xs text-slate-700 dark:text-slate-200">
                      <span className="text-slate-400">Your answer: </span>
                      <span className="line-through text-rose-500 font-medium">"{mistake.userAnswer}"</span>
                      <span className="text-slate-400 mx-2">→ Correct: </span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">"{mistake.correctAnswer}"</strong>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic text-right">
                      {mistake.explanationAr}
                    </p>
                  </div>

                  <button
                    onClick={() => handleResolveMistake(mistake.id, mistake.correctAnswer)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Mastered Now (+15 XP)</span>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
