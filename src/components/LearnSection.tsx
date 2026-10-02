import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Flame,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react';
import { UserProgress, WordItem } from '../types';
import { getDailyLessonWords } from '../data/vocabularyData';
import { speechService } from '../services/speechService';
import { addTrainedSentence } from '../services/storageService';

interface LearnSectionProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onTriggerMiniTest: () => void;
  showArabicHints: boolean;
  onGoToTrainer: () => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({
  progress,
  setProgress,
  onTriggerMiniTest,
  showArabicHints,
  onGoToTrainer,
}) => {
  const dailyWords = getDailyLessonWords(progress.currentLevel);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);

  const currentWord: WordItem = dailyWords[activeWordIndex] || dailyWords[0];
  const forms = currentWord.verbForms;

  const handleCompleteWord = (index: number) => {
    if (!completedIndices.includes(index)) {
      setCompletedIndices([...completedIndices, index]);
      const { updated, triggerMiniTest } = addTrainedSentence(
        progress,
        currentWord.id,
        15
      );
      setProgress(updated);
      if (triggerMiniTest) onTriggerMiniTest();
    }

    if (activeWordIndex + 1 < dailyWords.length) {
      setActiveWordIndex(activeWordIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Lesson Hero Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Today's Guided Lesson • CEFR {progress.currentLevel}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Daily Fluency Drill: 8 Core Words in Sentences
          </h2>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            خطة يومية متوازنة: 3 أفعال + 3 أسماء + مفردات وتعبيرات يومية مدمجة في جمل واقعية.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-black text-indigo-600 dark:text-indigo-400">
              {completedIndices.length}/{dailyWords.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* 8-Step Daily Timeline Stepper */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {dailyWords.map((word, idx) => {
          const isDone = completedIndices.includes(idx);
          const isCurrent = activeWordIndex === idx;

          return (
            <button
              key={word.id}
              onClick={() => setActiveWordIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl border text-left shrink-0 transition-all ${
                isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold uppercase">
                  {word.type}
                </span>
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <span className="text-sm font-bold block">{word.word}</span>
              <span className="text-[11px] font-arabic opacity-80 block">
                {word.arabic}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Daily Word Showcase Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Main Word Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-xl">
              {currentWord.word.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {currentWord.word}
                </h3>
                <button
                  onClick={() => speechService.speak(currentWord.word)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-base text-slate-600 dark:text-slate-300 font-arabic mt-0.5 font-medium">
                {currentWord.arabic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
              CEFR {currentWord.level}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
              {currentWord.type}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              {currentWord.frequency}
            </span>
          </div>
        </div>

        {/* Primary Example Sentence */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
              Natural Sentence Context:
            </span>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              "{currentWord.exampleSentence}"
            </p>
            {showArabicHints && currentWord.exampleSentenceAr && (
              <p className="text-xs text-slate-500 font-arabic text-right mt-1.5">
                {currentWord.exampleSentenceAr}
              </p>
            )}
          </div>
          <button
            onClick={() => speechService.speak(currentWord.exampleSentence)}
            className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-xl transition-colors shrink-0"
            title="Listen to sentence"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Verb Tenses or Noun Contexts */}
        {forms && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Natural Tenses: Present, Past, Future:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Present */}
              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700">
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase block mb-1">
                  Present
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  "{forms.presentSentence}"
                </p>
                {showArabicHints && forms.presentSentenceAr && (
                  <p className="text-[11px] text-slate-500 font-arabic text-right mt-1">
                    {forms.presentSentenceAr}
                  </p>
                )}
              </div>

              {/* Past */}
              <div className="p-3.5 rounded-2xl bg-violet-50 dark:bg-slate-800/80 border border-violet-100 dark:border-slate-700">
                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase block mb-1">
                  Past ({forms.past})
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  "{forms.pastSentence}"
                </p>
                {showArabicHints && forms.pastSentenceAr && (
                  <p className="text-[11px] text-slate-500 font-arabic text-right mt-1">
                    {forms.pastSentenceAr}
                  </p>
                )}
              </div>

              {/* Future */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block mb-1">
                  Future (will {forms.base})
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  "{forms.futureSentence}"
                </p>
                {showArabicHints && forms.futureSentenceAr && (
                  <p className="text-[11px] text-slate-500 font-arabic text-right mt-1">
                    {forms.futureSentenceAr}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Noun Collocations */}
        {currentWord.nounForms && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Collocations in Everyday English:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentWord.nounForms.collocations.map((col, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step Completion Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onGoToTrainer}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Open Sentence Builder Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleCompleteWord(activeWordIndex)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <span>Master & Next Word</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
