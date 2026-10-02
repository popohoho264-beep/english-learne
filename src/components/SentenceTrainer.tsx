import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
  Globe,
  Award,
  Mic,
} from 'lucide-react';
import { CEFRLevel, UserProgress } from '../types';
import { speechService } from '../services/speechService';
import { addTrainedSentence, recordMistake } from '../services/storageService';

interface SentenceItem {
  id: string;
  level: CEFRLevel;
  textEn: string;
  textAr: string;
  focusGrammar: string;
  focusGrammarAr: string;
}

const CEFR_SENTENCES: SentenceItem[] = [
  // A1
  {
    id: 's_a1_1',
    level: 'A1',
    textEn: 'I eat breakfast every morning.',
    textAr: 'أتناول الإفطار كل صباح.',
    focusGrammar: 'Present Simple routine',
    focusGrammarAr: 'المضارع البسيط للروتين اليومي',
  },
  {
    id: 's_a1_2',
    level: 'A1',
    textEn: 'She drinks warm milk before bed.',
    textAr: 'تشرب الحليب الدافئ قبل النوم.',
    focusGrammar: '3rd person singular (-s)',
    focusGrammarAr: 'إضافة s مع المفرد الغائب',
  },
  {
    id: 's_a1_3',
    level: 'A1',
    textEn: 'They live in a beautiful house near the park.',
    textAr: 'يعيشون في منزل جميل بالقرب من الحديقة.',
    focusGrammar: 'Basic subject + verb + object',
    focusGrammarAr: 'تركيب الجملة الأساسي',
  },
  {
    id: 's_a1_4',
    level: 'A1',
    textEn: 'We speak English in our classroom every day.',
    textAr: 'نتحدث الإنجليزية في فصلنا الدراسي كل يوم.',
    focusGrammar: 'Present Simple with we',
    focusGrammarAr: 'المضارع البسيط مع ضمير الجمع we',
  },
  {
    id: 's_a1_5',
    level: 'A1',
    textEn: 'He does not drink coffee late at night.',
    textAr: 'هو لا يشرب القهوة في وقت متأخر من الليل.',
    focusGrammar: 'Present Simple negative with does not',
    focusGrammarAr: 'صيغة النفي في المضارع البسيط',
  },

  // A2
  {
    id: 's_a2_1',
    level: 'A2',
    textEn: 'I usually eat breakfast before going to school.',
    textAr: 'عادة ما أتناول وجبة الإفطار قبل الذهاب إلى المدرسة.',
    focusGrammar: 'Adverbs of frequency + prepositional phrases',
    focusGrammarAr: 'ظروف التكرار وحروف الجر',
  },
  {
    id: 's_a2_2',
    level: 'A2',
    textEn: 'Yesterday she visited her grandparents after finishing work.',
    textAr: 'بالأمس زارت جديها بعد أن أنهت عملها.',
    focusGrammar: 'Past Simple sequential actions',
    focusGrammarAr: 'الماضي البسيط للأحداث المتتابعة',
  },
  {
    id: 's_a2_3',
    level: 'A2',
    textEn: 'We are going to travel to London next summer.',
    textAr: 'نحن نخطط للسفر إلى لندن في الصيف القادم.',
    focusGrammar: 'Future intentions with be going to',
    focusGrammarAr: 'التعبير عن الخطط المستقبلية بـ going to',
  },
  {
    id: 's_a2_4',
    level: 'A2',
    textEn: 'She did not go to the meeting because she felt unwell.',
    textAr: 'لم تذهب إلى الاجتماع لأنها شعرت بالتعب والإعياء.',
    focusGrammar: 'Past Simple negative with reason clause',
    focusGrammarAr: 'النفي في الماضي البسيط مع جملة السبب',
  },

  // B1
  {
    id: 's_b1_1',
    level: 'B1',
    textEn: 'I usually eat breakfast before school because it helps me concentrate.',
    textAr: 'أتناول الإفطار عادة قبل المدرسة لأنه يساعدني على التركيز.',
    focusGrammar: 'Subordinating conjunctions of cause (because)',
    focusGrammarAr: 'أدوات ربط الأسباب والعلل',
  },
  {
    id: 's_b1_2',
    level: 'B1',
    textEn: 'If I have enough free time this evening, I will practice English speaking.',
    textAr: 'إذا كان لدي وقت فراغ كافٍ هذا المساء، فسأتدرب على التحدث بالإنجليزية.',
    focusGrammar: 'First Conditional real possibility',
    focusGrammarAr: 'الجملة الشرطية الأولى للاحتمالات الحقيقية',
  },
  {
    id: 's_b1_3',
    level: 'B1',
    textEn: 'She has worked as a dedicated software designer for five years.',
    textAr: 'لقد عملت كمصممة برمجيات متفانية لمدة خمس سنوات.',
    focusGrammar: 'Present Perfect duration with for',
    focusGrammarAr: 'المضارع التام مع for لقياس المدة المستمرة',
  },
  {
    id: 's_b1_4',
    level: 'B1',
    textEn: 'Although the exam was challenging, we prepared thoroughly and passed.',
    textAr: 'على الرغم من صعوبة الامتحان، إلا أننا استعددنا جيداً ونجحنا بتفوق.',
    focusGrammar: 'Contrast conjunctions (Although)',
    focusGrammarAr: 'أدوات الاستدراك والتناقض',
  },

  // B2
  {
    id: 's_b2_1',
    level: 'B2',
    textEn: 'Although I was running late, I still managed to have breakfast before leaving.',
    textAr: 'على الرغم من أنني كنت متأخراً، إلا أنني تمكنت من تناول الإفطار قبل المغادرة.',
    focusGrammar: 'Concessive clauses (Although) + collocations',
    focusGrammarAr: 'جمل التناقض والاستدراك (Although)',
  },
  {
    id: 's_b2_2',
    level: 'B2',
    textEn: 'The innovative project was successfully implemented despite numerous technical obstacles.',
    textAr: 'تم تنفيذ المشروع المبتكر بنجاح على الرغم من العقبات التقنية العديدة.',
    focusGrammar: 'Passive Voice + prepositional phrase (despite)',
    focusGrammarAr: 'المبني للمجهول مع despite',
  },
  {
    id: 's_b2_3',
    level: 'B2',
    textEn: 'Not only did they finish the report early, but they also exceeded all expectations.',
    textAr: 'لم يقتصر الأمر على إنهائهم التقرير مبكراً فحسب، بل فاقوا أيضاً كافة التوقعات.',
    focusGrammar: 'Inversion with negative adverbs (Not only)',
    focusGrammarAr: 'أسلوب التوكيد بالتقديم والتأخير',
  },

  // C1
  {
    id: 's_c1_1',
    level: 'C1',
    textEn: 'Despite having very little time in the morning, I have developed the habit of eating a nutritious breakfast before starting my day.',
    textAr: 'على الرغم من ضيق الوقت الشديد في الصباح، فقد طوّرت عادة تناول إفطار مغذٍ قبل بدء يومي.',
    focusGrammar: 'Advanced participial opening + present perfect habit',
    focusGrammarAr: 'التراكيب المتقدمة والأسلوب البلاغي المتزن',
  },
  {
    id: 's_c1_2',
    level: 'C1',
    textEn: 'Had we known about the market disruption earlier, we would have diversified our investment portfolio.',
    textAr: 'لو كنا على دراية باضطراب السوق في وقت أبكر، لكنا قد نوّعنا محفظتنا الاستثمارية.',
    focusGrammar: 'Inverted Third Conditional without if',
    focusGrammarAr: 'الشرطية الثالثة المتقدمة بدون if',
  },

  // C2
  {
    id: 's_c2_1',
    level: 'C2',
    textEn: 'Under no circumstances should linguistic accuracy be compromised for the sake of conversational expedience.',
    textAr: 'لا ينبغي تحت أي ظرف من الظروف التهاون في الدقة اللغوية لأجل مجرد سرعة الحديث.',
    focusGrammar: 'Strict negative prepositional inversion',
    focusGrammarAr: 'صيغة النفي التوكيدي المتقدمة في المستوى الاحترافي',
  },

  // PRO
  {
    id: 's_pro_1',
    level: 'PRO',
    textEn: 'Rarely does an executive demonstrate such unwavering integrity while orchestrating major organizational transformation.',
    textAr: 'نادراً ما يُظهر مسؤول تنفيذي نزاهة ثابتة كهذه أثناء قيادة تحول تنظيمي شامل.',
    focusGrammar: 'Advanced negative inversion for rhetorical emphasis',
    focusGrammarAr: 'التقديم والتأخير البلاغي للتوكيد في الإنجليزية الاحترافية',
  },
];

interface SentenceTrainerProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onTriggerMiniTest: () => void;
  showArabicHints: boolean;
  onOpenShadowing?: (sentence: string, sentenceAr?: string) => void;
}

export const SentenceTrainer: React.FC<SentenceTrainerProps> = ({
  progress,
  setProgress,
  onTriggerMiniTest,
  showArabicHints,
  onOpenShadowing,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [scrambledPool, setScrambledPool] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Filter sentences suited for current CEFR level or lower
  const availableSentences = CEFR_SENTENCES.filter((s) => {
    const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'PRO'];
    const userLvlIdx = levels.indexOf(progress.currentLevel);
    const sentLvlIdx = levels.indexOf(s.level);
    return sentLvlIdx <= Math.max(0, userLvlIdx);
  });

  const currentSentence =
    availableSentences[currentIndex % availableSentences.length] ||
    CEFR_SENTENCES[0];

  useEffect(() => {
    if (!currentSentence) return;
    const words = currentSentence.textEn
      .replace(/[.!?]/g, '')
      .split(' ')
      .filter(Boolean);
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setScrambledPool(shuffled);
    setPlacedWords([]);
    setIsCompleted(false);
    setIsCorrect(null);
  }, [currentIndex, currentSentence]);

  const handleAddWord = (word: string, index: number) => {
    if (isCompleted) return;
    const newPlaced = [...placedWords, word];
    setPlacedWords(newPlaced);

    const newPool = [...scrambledPool];
    newPool.splice(index, 1);
    setScrambledPool(newPool);

    if (newPool.length === 0) {
      checkSentence(newPlaced);
    }
  };

  const handleRemoveWord = (index: number) => {
    if (isCompleted) return;
    const removed = placedWords[index];
    const newPlaced = [...placedWords];
    newPlaced.splice(index, 1);
    setPlacedWords(newPlaced);
    setScrambledPool([...scrambledPool, removed]);
  };

  const checkSentence = (words: string[]) => {
    const userStr = words.join(' ').toLowerCase();
    const targetStr = currentSentence.textEn
      .replace(/[.!?]/g, '')
      .toLowerCase();

    const ok = userStr === targetStr;
    setIsCorrect(ok);
    setIsCompleted(true);

    if (ok) {
      speechService.speak(currentSentence.textEn);
      // Increment sentence progress counter & check 10-sentence mini-test trigger!
      const { updated, triggerMiniTest } = addTrainedSentence(
        progress,
        currentSentence.id,
        20
      );
      setProgress(updated);
      if (triggerMiniTest) {
        onTriggerMiniTest();
      }
    } else {
      speechService.speak('Almost there! Review word order.');
      const updated = recordMistake(progress, {
        concept: `Sentence Building: ${currentSentence.focusGrammar}`,
        userAnswer: words.join(' '),
        correctAnswer: currentSentence.textEn,
        explanationEn: `Standard word order required for: "${currentSentence.textEn}"`,
        explanationAr: `الترتيب الصحيح هو: "${currentSentence.textEn}". ${currentSentence.focusGrammarAr}`,
        similarExample: currentSentence.textEn,
        similarExampleAr: currentSentence.textAr,
      });
      setProgress(updated);
    }
  };

  const handleReset = () => {
    const words = currentSentence.textEn
      .replace(/[.!?]/g, '')
      .split(' ')
      .filter(Boolean);
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setScrambledPool(shuffled);
    setPlacedWords([]);
    setIsCompleted(false);
    setIsCorrect(null);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % availableSentences.length);
  };

  return (
    <div className="space-y-6">
      {/* Title & Level Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              {currentSentence.level} Progressive Sentence
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {currentSentence.focusGrammar}
            </span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Sentence Construction Lab
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Milestone progress until test */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>
              Milestone: {progress.sentencesSinceLastTest}/10 Sentences
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Sentence Board */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Arabic Translation Aid (Conditional or Toggleable) */}
        <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-arabic text-base font-semibold">
            <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              {showArabicHints
                ? currentSentence.textAr
                : 'اضغط لإظهار المعنى بالعربية عند الحاجة'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => speechService.speak(currentSentence.textEn, 0.75)}
              className="px-2 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
              title="Listen Slow (0.75x)"
            >
              🐢 Slow
            </button>
            <button
              onClick={() => speechService.speak(currentSentence.textEn, 0.95)}
              className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              title="Listen to full sentence"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            {onOpenShadowing && (
              <button
                onClick={() => onOpenShadowing(currentSentence.textEn, currentSentence.textAr)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 transition-colors shadow-sm"
                title="Speak & Compare Pronunciation"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Speak</span>
              </button>
            )}
          </div>
        </div>

        {/* Construction Drop Zone */}
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Click words below to build the sentence:
          </span>
          <div className="min-h-24 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
            {placedWords.length === 0 ? (
              <span className="text-sm text-slate-400 italic">
                Build sentence here... (رتب الكلمات في هذا المربع)
              </span>
            ) : (
              placedWords.map((word, idx) => (
                <button
                  key={idx}
                  disabled={isCompleted}
                  onClick={() => handleRemoveWord(idx)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Scrambled Word Pool */}
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Available Word Tiles:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {scrambledPool.map((word, idx) => (
              <button
                key={idx}
                disabled={isCompleted}
                onClick={() => handleAddWord(word, idx)}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 transition-all shadow-sm"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Banner */}
        {isCompleted && (
          <div
            className={`p-4 rounded-2xl border ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Brilliant! Natural sentence formed (+20 XP)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>Incorrect word order. Let's study the difference:</span>
                </>
              )}
            </div>

            <p className="text-sm font-semibold mt-1">
              "{currentSentence.textEn}"
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-arabic text-right mt-1">
              {currentSentence.focusGrammarAr}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset (إعادة ترتيب)</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <span>Next Sentence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
