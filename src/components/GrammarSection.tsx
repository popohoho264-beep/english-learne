import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { GrammarTopic, UserProgress } from '../types';
import { grammarTopics } from '../data/grammarData';
import { speechService } from '../services/speechService';
import { recordMistake } from '../services/storageService';

interface GrammarSectionProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  showArabicHints: boolean;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  progress,
  setProgress,
  showArabicHints,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    grammarTopics[0].id
  );
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const currentTopic =
    grammarTopics.find((t) => t.id === selectedTopicId) || grammarTopics[0];
  const currentExercise = currentTopic.exercise[activeExerciseIndex];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setActiveExerciseIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswerExercise = (index: number) => {
    if (isAnswered || !currentExercise) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isOk = index === currentExercise.correctIndex;
    if (isOk) {
      speechService.speak('Correct! Well done.');
      const mastered = new Set(progress.masteredGrammarIds);
      mastered.add(currentTopic.id);
      setProgress({
        ...progress,
        xp: progress.xp + 20,
        masteredGrammarIds: Array.from(mastered),
      });
    } else {
      speechService.speak('Not quite.');
      const updated = recordMistake(progress, {
        concept: `Grammar: ${currentTopic.title}`,
        userAnswer: currentExercise.options[index],
        correctAnswer: currentExercise.options[currentExercise.correctIndex],
        explanationEn: currentExercise.explanationEn,
        explanationAr: currentExercise.explanationAr,
        similarExample: currentTopic.examples[0]?.en || '',
        similarExampleAr: currentTopic.examples[0]?.ar || '',
      });
      setProgress(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Grammar Topics Navigation */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 px-2">
          CEFR Grammar Topics (قواعد اللغة المتدرجة):
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {grammarTopics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            const isMastered = progress.masteredGrammarIds.includes(topic.id);

            return (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className={`px-4 py-2.5 rounded-2xl text-left border shrink-0 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {topic.level}
                  </span>
                  {isMastered && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-emerald-300' : 'text-emerald-500'
                      }`}
                    />
                  )}
                </div>
                <span className="font-bold text-xs block">{topic.title}</span>
                <span
                  className={`text-[11px] font-arabic block ${
                    isSelected ? 'text-indigo-100' : 'text-slate-400'
                  }`}
                >
                  {topic.titleAr}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grammar Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                {currentTopic.level} Grammar
              </span>
              <span className="text-sm font-arabic text-slate-500">
                {currentTopic.titleAr}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {currentTopic.title}
            </h2>
          </div>

          {/* Formula Badge */}
          <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-mono text-xs font-bold">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">
              Rule Formula:
            </span>
            {currentTopic.formula}
          </div>
        </div>

        {/* Explanation in En & Ar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              English Concept:
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {currentTopic.description}
            </p>
            <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-1">
              {currentTopic.keyPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-violet-50/40 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40 space-y-2 text-right">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider block">
              الشرح باللغة العربية:
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-200 font-arabic leading-relaxed">
              {currentTopic.descriptionAr}
            </p>
            <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 font-arabic space-y-1 pt-1">
              {currentTopic.keyPointsAr.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sentence Examples with Audio */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Sentence Examples (أمثلة عملية في جمل):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTopic.examples.map((ex, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {ex.en}
                  </p>
                  {showArabicHints && (
                    <p className="text-xs text-slate-500 font-arabic text-right mt-1">
                      {ex.ar}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => speechService.speak(ex.en)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Exercise */}
        {currentExercise && (
          <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Practice Exercise
              </span>
              <span className="text-xs text-slate-400">
                Exercise {activeExerciseIndex + 1} of {currentTopic.exercise.length}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {currentExercise.question}
              </h4>
              {showArabicHints && (
                <p className="text-xs text-slate-500 font-arabic text-right">
                  {currentExercise.questionAr}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentExercise.options.map((option, idx) => {
                let btnStyle =
                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200';
                if (isAnswered) {
                  if (idx === currentExercise.correctIndex) {
                    btnStyle =
                      'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle =
                      'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-800 dark:text-rose-200';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswerExercise(idx)}
                    className={`p-3.5 rounded-xl border-2 text-left font-medium text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentExercise.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  selectedOption === currentExercise.correctIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200'
                }`}
              >
                <p className="font-semibold">{currentExercise.explanationEn}</p>
                <p className="font-arabic text-right">{currentExercise.explanationAr}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
