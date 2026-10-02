import React from 'react';
import {
  Flame,
  Zap,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { UserProgress } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';

interface DashboardProps {
  progress: UserProgress;
  setActiveTab: (tab: string) => void;
  onOpenTestNow: () => void;
  onOpenVoiceStudio?: () => void;
  onOpenPlacementTest?: () => void;
  onOpenConjugator?: () => void;
  onOpenShadowing?: (sentence: string, sentenceAr?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  setActiveTab,
  onOpenTestNow,
  onOpenVoiceStudio,
  onOpenPlacementTest,
  onOpenConjugator,
  onOpenShadowing,
}) => {
  const currentLvlInfo =
    ALL_CEFR_LEVELS.find((l) => l.level === progress.currentLevel) ||
    ALL_CEFR_LEVELS[0];

  const sentencesLeftForTest = Math.max(0, 10 - progress.sentencesSinceLastTest);
  const pendingMistakes = progress.mistakes.filter((m) => !m.resolved);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 dark:bg-slate-900/90 text-white border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>
              {progress.streak} Day Streak • Level {progress.currentLevel} ({currentLvlInfo.name})
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Master Real English Fluency Through Everyday Sentences.
          </h1>

          <p className="text-sm text-slate-300 font-arabic leading-relaxed">
            المنهج الطبيعي المعتمد: ربط 1000+ كلمة بأفعالها الثلاثية (حاضر، ماضي، مستقبل) وجملها العملية، مع دعم ذكي باللغة العربية عند الحاجة.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('learn')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-xs text-white shadow-sm flex items-center gap-2 transition-colors"
            >
              <span>Start Daily Lesson (ابدأ درس اليوم)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-xs text-slate-200 transition-colors"
            >
              Sentence Lab (بناء الجمل)
            </button>
          </div>
        </div>
      </div>

      {/* 10-Sentence Smart Mini-Test Reminder Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center font-bold text-lg text-indigo-600 dark:text-indigo-400 shrink-0">
            🎯
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Automatic Milestone Trigger
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {sentencesLeftForTest === 0
                ? 'Mini-Test Ready! Click to Test Now'
                : `${sentencesLeftForTest} more sentences until your next Smart Mini-Test`}
            </h3>
            <p className="text-xs text-slate-500 font-arabic">
              بعد كل 10 جمل، يُجري التطبيق اختباراً تلقائياً يقيس تثبيت المفردات وتصريف الأفعال.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenTestNow}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shrink-0 transition-colors"
        >
          {sentencesLeftForTest === 0 ? 'Take Test Now' : 'Launch Test Early'}
        </button>
      </div>

      {/* Primary Feature Launchpads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Daily Lesson */}
        <div
          onClick={() => setActiveTab('learn')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Daily Lesson
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1">
              8 كلمات مفتاحية يومياً مدمجة بأمثلة وتصريفات.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
            <span>Learn Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 2. Verb Tenses Trainer */}
        <div
          onClick={() => setActiveTab('verbs')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-violet-500 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Verb Tense Mastery
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1">
              حاضر، ماضي، مستقبل لكل فعل مع التحويل التفاعلي.
            </p>
          </div>
          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1">
            <span>Train Verbs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 3. Fluency Mode */}
        <div
          onClick={() => setActiveTab('fluency')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Fluency Mode
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1">
              الإنتاج الفعلي للإنجليزي مع تقييم ذكي فوري.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span>Produce English</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 4. Realistic Conversations */}
        <div
          onClick={() => setActiveTab('conversation')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Conversation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1">
              حوارات واقعية (سفر، عمل، مدرسة) مع تصحيح مباشر.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <span>Start Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Advanced Studio Tools Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {onOpenShadowing && (
          <div
            onClick={() => onOpenShadowing("I usually eat breakfast before school because it helps me concentrate.", "أتناول الإفطار عادة قبل المدرسة لأنه يساعدني على التركيز.")}
            className="p-4 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">🎙️</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Audio Shadowing Lab
                </h4>
                <p className="text-[11px] text-slate-500 font-arabic">
                  تحدث بصوتك وقارن نطقك بالذكاء الاصطناعي
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-500" />
          </div>
        )}

        {onOpenConjugator && (
          <div
            onClick={onOpenConjugator}
            className="p-4 rounded-3xl bg-violet-50/60 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/60 flex items-center justify-between cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">⏱️</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  12-Tense Verb Matrix
                </h4>
                <p className="text-[11px] text-slate-500 font-arabic">
                  جدول تصريف جميع الأزمنة لكل فعل
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-violet-500" />
          </div>
        )}

        {onOpenPlacementTest && (
          <div
            onClick={onOpenPlacementTest}
            className="p-4 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">🎯</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Placement Diagnostic
                </h4>
                <p className="text-[11px] text-slate-500 font-arabic">
                  اختبار تحديد المستوى المعتمد A1-PRO
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500" />
          </div>
        )}
      </div>

      {/* Bottom Grid: Mistake recovery bank & Database stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mistake Recovery Widget */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Weak Areas & Mistake Bank (الأخطاء قيد المراجعة)
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('progress')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All ({pendingMistakes.length}) →
            </button>
          </div>

          {pendingMistakes.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-7 h-7 mx-auto text-emerald-500 mb-2" />
              <span>Great job! No unresolved mistakes right now.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {pendingMistakes.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                      {m.concept}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      Correct: <strong className="text-emerald-600">"{m.correctAnswer}"</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className="px-3 py-1 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold hover:border-emerald-500 shrink-0"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 1000+ Words Library Quick Access */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                1000+ Lexicon Explorer
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-arabic leading-relaxed">
              ابحث في قاعدة بيانات الكلمات الشاملة، استمع للنطق الصوتي لكل كلمة وجملة، وتحقق من تصريفاتها.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('vocabulary')}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Open 1000+ Words Browser →
          </button>
        </div>
      </div>
    </div>
  );
};
