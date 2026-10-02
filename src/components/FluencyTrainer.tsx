import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Volume2,
  RefreshCw,
} from 'lucide-react';
import { UserProgress } from '../types';
import { evaluateSentence, SentenceEvaluationResult } from '../services/aiService';
import { speechService } from '../services/speechService';
import { addTrainedSentence } from '../services/storageService';

interface FluencyPrompt {
  targetWord: string;
  arabicMeaning: string;
  level: string;
  promptQuestion: string;
  promptQuestionAr: string;
  exampleAnswer: string;
}

const FLUENCY_PROMPTS: FluencyPrompt[] = [
  {
    targetWord: 'improve',
    arabicMeaning: 'يحسن / يطور',
    level: 'A2',
    promptQuestion: 'What is one specific skill or habit you want to improve this month, and why?',
    promptQuestionAr: 'ما هي المهارة أو العادة المحددة التي ترغب في تحسينها هذا الشهر ولماذا؟',
    exampleAnswer: 'I want to improve my English speaking because I want to travel abroad.',
  },
  {
    targetWord: 'decide',
    arabicMeaning: 'يقرر',
    level: 'A2',
    promptQuestion: 'How do you usually decide what to do on weekends?',
    promptQuestionAr: 'كيف تقرر عادةً ما الذي ستفعله في عطلة نهاية الأسبوع؟',
    exampleAnswer: 'I usually decide on Friday night after checking the weather.',
  },
  {
    targetWord: 'achieve',
    arabicMeaning: 'يحقق / ينجز',
    level: 'B1',
    promptQuestion: 'What is a major goal you hope to achieve in the next two years?',
    promptQuestionAr: 'ما هو الهدف الرئيسي الذي تأمل في تحقيقه في السنتين القادمتين؟',
    exampleAnswer: 'I hope to achieve real fluency in English to secure a remote position.',
  },
  {
    targetWord: 'avoid',
    arabicMeaning: 'يتجنب / يتفادى',
    level: 'B1',
    promptQuestion: 'What is a bad habit you actively try to avoid in your daily life?',
    promptQuestionAr: 'ما هي العادة السيئة التي تحاول جاهداً تجنبها في حياتك اليومية؟',
    exampleAnswer: 'I try to avoid looking at my phone late at night.',
  },
  {
    targetWord: 'negotiate',
    arabicMeaning: 'يتفاوض',
    level: 'B2',
    promptQuestion: 'In what situations is it most important to negotiate calmly and professionally?',
    promptQuestionAr: 'في أي المواقف يكون التفاوض بهدوء واحترافية أمراً حاسماً؟',
    exampleAnswer: 'It is essential to negotiate calmly when discussing salaries or deadlines.',
  },
  {
    targetWord: 'articulate',
    arabicMeaning: 'يعبر بوضوح واقتدار',
    level: 'C1',
    promptQuestion: 'Why is the ability to articulate thoughts clearly vital for effective leadership?',
    promptQuestionAr: 'لماذا تعد القدرة على التعبير عن الأفكار بوضوح أمراً حيوياً للقيادة الفعالة؟',
    exampleAnswer: 'Leaders who articulate their vision clearly inspire unified action across teams.',
  },
];

interface FluencyTrainerProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onTriggerMiniTest: () => void;
  showArabicHints: boolean;
}

export const FluencyTrainer: React.FC<FluencyTrainerProps> = ({
  progress,
  setProgress,
  onTriggerMiniTest,
  showArabicHints,
}) => {
  const [promptIndex, setPromptIndex] = useState(0);
  const [userText, setUserText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<SentenceEvaluationResult | null>(null);

  const currentPrompt = FLUENCY_PROMPTS[promptIndex % FLUENCY_PROMPTS.length];

  const handleNextPrompt = () => {
    setPromptIndex((i) => i + 1);
    setUserText('');
    setResult(null);
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setResult(null);

    const evalResult = await evaluateSentence(
      userText,
      currentPrompt.promptQuestion,
      currentPrompt.targetWord,
      progress.currentLevel
    );

    setResult(evalResult);
    setIsEvaluating(false);

    if (evalResult.isCorrect) {
      speechService.speak('Good job!');
      const { updated, triggerMiniTest } = addTrainedSentence(
        progress,
        undefined,
        evalResult.score >= 85 ? 30 : 20
      );
      setProgress(updated);
      if (triggerMiniTest) onTriggerMiniTest();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-slate-800 text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fluency Mode: Active Production
            </span>
          </div>
          <h2 className="text-2xl font-bold">Don't Just Memorize — Produce English!</h2>
          <p className="text-xs text-slate-400 font-arabic mt-0.5">
            اكتب إجابتك بالإنجليزية مستخدماً الكلمة المستهدفة وسيقوم المعلم الذكي بتقييمها وتصحيحها فورياً.
          </p>
        </div>

        <button
          onClick={handleNextPrompt}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Next Prompt (سؤال آخر)</span>
        </button>
      </div>

      {/* Target Word Card & Active Prompt */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Target Word Highlight */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              W
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Target Word ({currentPrompt.level})
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>"{currentPrompt.targetWord}"</span>
                <span className="text-slate-500 font-arabic text-base font-normal">
                  = {currentPrompt.arabicMeaning}
                </span>
              </h3>
            </div>
          </div>
          <button
            onClick={() => speechService.speak(currentPrompt.targetWord)}
            className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* The Open Question */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Production Task:
          </span>
          <p className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {currentPrompt.promptQuestion}
          </p>
          {showArabicHints && (
            <p className="text-xs text-slate-500 font-arabic text-right">
              {currentPrompt.promptQuestionAr}
            </p>
          )}
        </div>

        {/* Text Input Form */}
        <form onSubmit={handleEvaluate} className="space-y-4">
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            rows={3}
            placeholder={`Write your answer in English using "${currentPrompt.targetWord}"...`}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 text-slate-900 dark:text-white text-base focus:outline-none transition-colors"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Aim for a complete sentence with correct punctuation.
            </span>
            <button
              type="submit"
              disabled={isEvaluating || !userText.trim()}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                userText.trim() && !isEvaluating
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-95'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isEvaluating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Evaluate Sentence</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Evaluation Output Result */}
        {result && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {result.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {result.isCorrect ? 'Well Done!' : 'Needs Refinement'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Score: {result.score}/100
              </span>
            </div>

            {/* Feedback in En & Ar */}
            <div className="space-y-1">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {result.feedbackEn}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic text-right">
                {result.feedbackAr}
              </p>
            </div>

            {/* Corrected version */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5">
                  Ideal Polished Sentence:
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  "{result.correctedSentence}"
                </p>
              </div>
              <button
                onClick={() => speechService.speak(result.correctedSentence)}
                className="p-1 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Better Alternative */}
            {result.betterAlternative && (
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
                    Native Phrasing Tip:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    "{result.betterAlternative}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
