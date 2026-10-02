import React, { useState } from 'react';
import {
  Volume2,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Shuffle,
  ChevronRight,
} from 'lucide-react';
import { WordItem, UserProgress } from '../types';
import { speechService } from '../services/speechService';
import { addTrainedSentence } from '../services/storageService';

interface VerbTenseTrainerProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  verbs: WordItem[];
  onTriggerMiniTest: () => void;
  showArabicHints: boolean;
}

export const VerbTenseTrainer: React.FC<VerbTenseTrainerProps> = ({
  progress,
  setProgress,
  verbs,
  onTriggerMiniTest,
  showArabicHints,
}) => {
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState<'study' | 'quiz'>('study');
  const [targetTense, setTargetTense] = useState<'past' | 'future'>('past');
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; messageAr: string } | null>(null);

  const currentVerb = verbs[selectedVerbIndex] || verbs[0];
  const forms = currentVerb?.verbForms;

  // Next random verb
  const handleRandomVerb = () => {
    const nextIdx = Math.floor(Math.random() * verbs.length);
    setSelectedVerbIndex(nextIdx);
    setIsAnswered(false);
    setSelectedQuizOption(null);
    setFeedback(null);
  };

  const startQuizForTense = (tense: 'past' | 'future') => {
    if (!forms) return;
    setTargetTense(tense);
    setPracticeMode('quiz');
    setIsAnswered(false);
    setSelectedQuizOption(null);
    setFeedback(null);

    const correct = tense === 'past' ? forms.pastSentence : forms.futureSentence;
    // Generate distractors
    const wrong1 = forms.presentSentence;
    const wrong2 = tense === 'past' ? forms.futureSentence : forms.pastSentence;
    const wrong3 = `I ${tense === 'past' ? forms.base : forms.past} tomorrow.`;

    const options = [correct, wrong1, wrong2, wrong3].sort(() => 0.5 - Math.random());
    setQuizOptions(options);
  };

  const handleSelectQuizOption = (opt: string) => {
    if (isAnswered || !forms) return;
    setSelectedQuizOption(opt);
    setIsAnswered(true);

    const correct = targetTense === 'past' ? forms.pastSentence : forms.futureSentence;
    const isOk = opt === correct;

    if (isOk) {
      speechService.speak('Correct! Well done.');
      setFeedback({
        isCorrect: true,
        message: `Great! You correctly formed the ${targetTense} tense.`,
        messageAr: `ممتاز! قمت باختيار صيغة زمن ${targetTense === 'past' ? 'الماضي' : 'المستقبل'} الصحيحة.`,
      });
      // Increment sentence counter & check 10-sentence milestone
      const { updated, triggerMiniTest } = addTrainedSentence(progress, currentVerb.id, 15);
      setProgress(updated);
      if (triggerMiniTest) onTriggerMiniTest();
    } else {
      speechService.speak('Incorrect. Try again next time.');
      setFeedback({
        isCorrect: false,
        message: `The correct ${targetTense} tense sentence is: "${correct}"`,
        messageAr: `الصيغة الصحيحة لزمن ${targetTense === 'past' ? 'الماضي' : 'المستقبل'} هي: "${correct}"`,
      });
    }
  };

  if (!forms) return null;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
              CEFR {currentVerb.level}
            </span>
            <span className="text-xs text-slate-400">تدريب الأفعال الثلاثية (حاضر، ماضي، مستقبل)</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <span>{currentVerb.word.toUpperCase()}</span>
            <span className="text-slate-400 font-arabic text-xl">= {currentVerb.arabic}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Base: <span className="text-slate-200">{forms.base}</span> • Past: <span className="text-slate-200">{forms.past}</span> • Past Participle: <span className="text-slate-200">{forms.pastParticiple}</span>
          </p>
        </div>

        <button
          onClick={handleRandomVerb}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors self-start sm:self-center"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Next Verb (فعل آخر)</span>
        </button>
      </div>

      {/* 3 Tenses Comparative Study Cards (Present, Past, Future) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Present Simple */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-400 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                Present (الحاضر)
              </span>
              <button
                onClick={() => speechService.speak(forms.presentSentence)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {forms.presentSentence}
            </p>
            {showArabicHints && forms.presentSentenceAr && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-2 text-right">
                {forms.presentSentenceAr}
              </p>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
            Form: <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{forms.base} / {forms.thirdPerson}</span>
          </div>
        </div>

        {/* 2. Past Simple */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-violet-400 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                Past (الماضي)
              </span>
              <button
                onClick={() => speechService.speak(forms.pastSentence)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {forms.pastSentence}
            </p>
            {showArabicHints && forms.pastSentenceAr && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-2 text-right">
                {forms.pastSentenceAr}
              </p>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Form: <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{forms.past}</span>
            </span>
            <button
              onClick={() => startQuizForTense('past')}
              className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Practice Past →
            </button>
          </div>
        </div>

        {/* 3. Future Simple */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Future (المستقبل)
              </span>
              <button
                onClick={() => speechService.speak(forms.futureSentence)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {forms.futureSentence}
            </p>
            {showArabicHints && forms.futureSentenceAr && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-2 text-right">
                {forms.futureSentenceAr}
              </p>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Form: <span className="font-mono font-medium text-slate-700 dark:text-slate-300">will + {forms.base}</span>
            </span>
            <button
              onClick={() => startQuizForTense('future')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Practice Future →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Negative and Question Structure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Negative */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-rose-400 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Negative Sentence (صيغة النفي)
              </span>
              <button
                onClick={() => forms.negativeSentence && speechService.speak(forms.negativeSentence)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              "{forms.negativeSentence || `I do not ${forms.base} often.`}"
            </p>
            {showArabicHints && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1.5 text-right">
                {forms.negativeSentenceAr || `أنا لا أقوم بهذا الفعل كثيراً.`}
              </p>
            )}
          </div>
        </div>

        {/* Question */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Question Sentence (صيغة الاستفهام)
              </span>
              <button
                onClick={() => forms.questionSentence && speechService.speak(forms.questionSentence)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              "{forms.questionSentence || `Do you ${forms.base} every day?`}"
            </p>
            {showArabicHints && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1.5 text-right">
                {forms.questionSentenceAr || `هل تقوم بهذا الفعل كل يوم؟`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Context Meanings if available */}
      {currentVerb.contextMeanings && currentVerb.contextMeanings.length > 0 && (
        <div className="p-5 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
            Contextual Meanings & Usages (المعاني بحسب سياق الاستخدام):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentVerb.contextMeanings.map((c, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">[{c.context}]</span>
                  <span className="font-arabic font-medium text-slate-700 dark:text-slate-300">{c.meaningAr}</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">"{c.exampleEn}"</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic text-right">"{c.exampleAr}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Transformation Challenge Section */}
      {practiceMode === 'quiz' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Transformation Challenge: Change to {targetTense === 'past' ? 'Past' : 'Future'} Tense
              </h3>
            </div>
            <button
              onClick={() => setPracticeMode('study')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Close Drill
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-400 font-semibold uppercase block mb-1">
              Original Sentence (Present):
            </span>
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
              "{forms.presentSentence}"
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-500 font-semibold">
              Select the correct {targetTense} form:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quizOptions.map((opt, i) => {
                let btnClass = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-500';
                if (isAnswered) {
                  const correct = targetTense === 'past' ? forms.pastSentence : forms.futureSentence;
                  if (opt === correct) {
                    btnClass = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                  } else if (opt === selectedQuizOption) {
                    btnClass = 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-800 dark:text-rose-200';
                  } else {
                    btnClass = 'opacity-40 border-slate-200 dark:border-slate-800';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => handleSelectQuizOption(opt)}
                    className={`p-3.5 rounded-2xl border-2 text-left text-sm font-medium transition-all ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl border ${feedback.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'}`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                <span>{feedback.message}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-arabic text-right">
                {feedback.messageAr}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
