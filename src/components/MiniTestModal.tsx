import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Volume2,
  ArrowRight,
  Bookmark,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestQuestion, UserProgress, MistakeRecord } from '../types';
import { speechService } from '../services/speechService';
import { recordMistake } from '../services/storageService';
import { fullVocabularyDatabase } from '../data/scaledVocabularyBank';

interface MiniTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  isTriggeredByMilestone?: boolean;
}

export const MiniTestModal: React.FC<MiniTestModalProps> = ({
  isOpen,
  onClose,
  progress,
  setProgress,
  isTriggeredByMilestone = false,
}) => {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [userTextInput, setUserTextInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Generate 5 dynamic, varied test questions based on the learner's current level and weak words
  useEffect(() => {
    if (!isOpen) return;

    const level = progress.currentLevel;
    const levelWords = fullVocabularyDatabase.filter((w) => w.level === level);
    const pool = levelWords.length > 5 ? levelWords : fullVocabularyDatabase.slice(0, 30);

    // Pick 5 random words
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const w1 = shuffled[0] || pool[0];
    const w2 = shuffled[1] || pool[1];
    const w3 = shuffled[2] || pool[2];
    const w4 = shuffled[3] || pool[3];
    const w5 = shuffled[4] || pool[4];

    const generated: TestQuestion[] = [
      // 1. Multiple Choice / Choose the correct answer
      {
        id: 'q1',
        type: 'multiple_choice',
        promptEn: `Choose the correct meaning of the word "${w1.word}":`,
        promptAr: `اختر المعنى الصحيح لكلمة "${w1.word}":`,
        targetWord: w1.word,
        options: [
          w1.arabic,
          w2.arabic,
          w3.arabic,
          w4.arabic,
        ].sort(() => 0.5 - Math.random()),
        correctAnswer: w1.arabic,
        explanationEn: `"${w1.word}" means "${w1.arabic}". Example: ${w1.exampleSentence}`,
        explanationAr: `كلمة "${w1.word}" تعني "${w1.arabic}". مثال: "${w1.exampleSentence}" (${w1.exampleSentenceAr || ''})`,
        level,
      },
      // 2. Fill in the blank
      {
        id: 'q2',
        type: 'fill_blank',
        promptEn: `Complete the sentence with the appropriate word:\n"${(w2.exampleSentence || `I use this ${w2.word} daily.`).replace(new RegExp('\\b' + w2.word + '\\b', 'i'), '_____')}"`,
        promptAr: `أكمل الفراغ بالكلمة المناسبة للسياق (${w2.exampleSentenceAr || w2.arabic}):`,
        targetWord: w2.word,
        options: [w2.word, w3.word, w4.word, w5.word].sort(
          () => 0.5 - Math.random()
        ),
        correctAnswer: w2.word,
        explanationEn: `"${w2.word}" is the only word that grammatically and contextually fits this sentence.`,
        explanationAr: `"${w2.word}" (${w2.arabic}) هي الكلمة الصحيحة التي تناسب سياق الجملة.`,
        level,
      },
      // 3. Choose the correct tense (Present / Past / Future)
      {
        id: 'q3',
        type: 'choose_tense',
        promptEn: `What tense is used in this sentence?\n"${
          w3.verbForms?.pastSentence || `I visited the city yesterday.`
        }"`,
        promptAr: `ما هو الزمن المستخدم في هذه الجملة؟\n(${w3.verbForms?.pastSentenceAr || 'حدث تم وانتهى بالأمس'})`,
        targetWord: w3.word,
        options: ['Present Tense (المضارع)', 'Past Tense (الماضي)', 'Future Tense (المستقبل)', 'Continuous (المستمر)'],
        correctAnswer: 'Past Tense (الماضي)',
        explanationEn: `The sentence describes a completed past action using the past form.`,
        explanationAr: `الجملة تعبر عن حدث انتهى في الماضي باستخدام التصريف الثاني للفعل.`,
        level,
      },
      // 4. Build a sentence (word scramble reordering)
      {
        id: 'q4',
        type: 'build_sentence',
        promptEn: `Arrange the words in the correct grammatical order:`,
        promptAr: `رتب الكلمات التالية لتكوين جملة سليمة قواعدياً:${w4.exampleSentenceAr ? `\nالمعنى المطلوب: "${w4.exampleSentenceAr}"` : ''}`,
        correctAnswer: w4.exampleSentence || 'I study English every day.',
        sentenceWords: (w4.exampleSentence || 'I study English every day.')
          .replace(/[.!?]/g, '')
          .split(' ')
          .sort(() => 0.5 - Math.random()),
        explanationEn: `Standard English sentence structure follows Subject + Verb + Object.`,
        explanationAr: `الترتيب الطبيعي للجملة في الإنجليزية هو الفاعل ثم الفعل ثم المفعول به.`,
        level,
      },
      // 5. Correct the mistake / Choose the correct verb form
      {
        id: 'q5',
        type: 'choose_verb',
        promptEn: `Select the correct form to complete the sentence: "Yesterday, she _____ a great book."`,
        promptAr: `اختر التصريف الصحيح للفعل في الماضي:`,
        options: ['read', 'reads', 'is reading', 'will read'],
        correctAnswer: 'read',
        explanationEn: `With "Yesterday", we must use the past tense of the verb.`,
        explanationAr: `مع كلمة Yesterday يجب استخدام صيغة الماضي البسيط (read).`,
        level,
      },
    ];

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setReorderedWords([]);
    setAvailableWords(generated[0]?.sentenceWords || []);
    setUserTextInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsCompleted(false);
  }, [isOpen, progress.currentLevel]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    checkAnswer(opt);
  };

  const handleAddWordTile = (word: string, index: number) => {
    if (isAnswered) return;
    const newReordered = [...reorderedWords, word];
    setReorderedWords(newReordered);

    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);

    if (newAvailable.length === 0) {
      const sentenceAttempt = newReordered.join(' ');
      checkAnswer(sentenceAttempt);
    }
  };

  const handleRemoveWordTile = (index: number) => {
    if (isAnswered) return;
    const removed = reorderedWords[index];
    const newReordered = [...reorderedWords];
    newReordered.splice(index, 1);
    setReorderedWords(newReordered);
    setAvailableWords([...availableWords, removed]);
  };

  const checkAnswer = (answer: string) => {
    if (!currentQ) return;
    const cleanUser = answer.trim().toLowerCase().replace(/[.!?]/g, '');
    const cleanTarget = currentQ.correctAnswer
      .trim()
      .toLowerCase()
      .replace(/[.!?]/g, '');

    const correct = cleanUser === cleanTarget;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore((s) => s + 1);
      speechService.speak('Excellent!');
    } else {
      // Record in Intelligent Error System
      const updatedProg = recordMistake(progress, {
        wordId: currentQ.targetWord,
        concept: `${currentQ.type.replace('_', ' ')} (${progress.currentLevel})`,
        userAnswer: answer,
        correctAnswer: currentQ.correctAnswer,
        explanationEn: currentQ.explanationEn,
        explanationAr: currentQ.explanationAr,
        similarExample: currentQ.similarExample || currentQ.explanationEn,
        similarExampleAr: currentQ.explanationAr,
      });
      setProgress(updatedProg);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      const nextQ = questions[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setReorderedWords([]);
      setAvailableWords(nextQ.sentenceWords || []);
      setUserTextInput('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // Completed Test
      setIsCompleted(true);
      const earnedXP = score * 20 + 50;
      const updatedProg: UserProgress = {
        ...progress,
        xp: progress.xp + earnedXP,
        sentencesSinceLastTest: 0,
        testScores: [
          {
            date: new Date().toISOString().slice(0, 10),
            type: 'Smart Mini-Test',
            score: score + (isCorrect ? 1 : 0),
            total: questions.length,
          },
          ...progress.testScores,
        ],
      };
      setProgress(updatedProg);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isTriggeredByMilestone
                  ? '🎯 10-Sentence Milestone Test!'
                  : 'Smart Fluency Mini-Test'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                اختبار ذكي لقياس تثبيت المفردات والقواعد
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Line */}
        {!isCompleted && (
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
            <div
              className="bg-indigo-600 h-1.5 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isCompleted && currentQ ? (
            <div className="space-y-6">
              {/* Question Count & Type */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {currentQ.type.replace('_', ' ')}
                </span>
              </div>

              {/* Prompt En & Ar */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {currentQ.promptEn}
                  </h4>
                  <button
                    onClick={() => speechService.speak(currentQ.promptEn)}
                    className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-lg transition-colors shrink-0"
                    title="Listen"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                {currentQ.promptAr && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-arabic text-right">
                    {currentQ.promptAr}
                  </p>
                )}
              </div>

              {/* Multiple Choice & Fill blank Options */}
              {currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((option, idx) => {
                    let btnStyle =
                      'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30';

                    if (isAnswered) {
                      if (option === currentQ.correctAnswer) {
                        btnStyle =
                          'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                      } else if (option === selectedOption) {
                        btnStyle =
                          'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300';
                      } else {
                        btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(option)}
                        className={`p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && option === currentQ.correctAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                        {isAnswered &&
                          option === selectedOption &&
                          option !== currentQ.correctAnswer && (
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Build Sentence Tiles */}
              {currentQ.type === 'build_sentence' && (
                <div className="space-y-4">
                  {/* Selected Words Area */}
                  <div className="min-h-16 p-3 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border-2 border-dashed border-indigo-300 dark:border-indigo-900/60 flex flex-wrap gap-2 items-center">
                    {reorderedWords.length === 0 ? (
                      <span className="text-xs text-slate-400 italic">
                        Click words below in correct grammatical order...
                      </span>
                    ) : (
                      reorderedWords.map((w, idx) => (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleRemoveWordTile(idx)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm hover:bg-indigo-700 transition-colors"
                        >
                          {w}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Words Pool */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {availableWords.map((w, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAddWordTile(w, idx)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors shadow-sm"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Intelligent Error System Feedback Banner */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-2xl border ${
                    isCorrect
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Excellent! Correct Answer (+20 XP)</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        <span>Needs Attention - Added to Mistake Bank</span>
                      </>
                    )}
                  </div>

                  {/* English Explanation */}
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-1">
                    {currentQ.explanationEn}
                  </p>

                  {/* Arabic Detailed Rule Explanation */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-arabic text-right leading-relaxed pt-1 border-t border-slate-200/60 dark:border-slate-800/80 mt-1">
                    {currentQ.explanationAr}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Test Completed View */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-white shadow-xl">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Mini-Test Completed!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-arabic mt-1">
                  أحسنت! تدريبك المستمر يبني طلاقتك الحقيقية خطوة بخطوة.
                </p>
              </div>

              <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {score}/{questions.length}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">
                    Score
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                <div>
                  <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    +{score * 20 + 50}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">
                    XP Earned
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          {!isCompleted ? (
            <button
              disabled={!isAnswered}
              onClick={handleNext}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                isAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>
                {currentIndex + 1 === questions.length
                  ? 'Finish Test'
                  : 'Continue'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-colors"
            >
              Back to Training
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
