import React, { useState } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CEFRLevel, UserProgress } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';
import { speechService } from '../services/speechService';

interface PlacementQuestion {
  level: CEFRLevel;
  question: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // A1
  {
    level: 'A1',
    question: 'Every morning, she _____ to work by train.',
    questionAr: 'كل صباح، هي _____ إلى العمل بالقطار.',
    options: ['go', 'goes', 'going', 'is go'],
    correctIndex: 1,
    explanation: 'Singular subject "she" requires "-es" in Present Simple.',
  },
  // A2
  {
    level: 'A2',
    question: 'We _____ a wonderful vacation in Italy last summer.',
    questionAr: 'نحن _____ إجازة رائعة في إيطاليا الصيف الماضي.',
    options: ['have', 'had', 'having', 'will have'],
    correctIndex: 1,
    explanation: '"Last summer" requires the past simple tense form "had".',
  },
  // B1
  {
    level: 'B1',
    question: 'I have lived in this bustling city _____ five years.',
    questionAr: 'لقد عشت في هذه المدينة الصاخبة _____ خمس سنوات.',
    options: ['since', 'for', 'during', 'from'],
    correctIndex: 1,
    explanation: '"For" is used for periods/duration of time with Present Perfect.',
  },
  // B1
  {
    level: 'B1',
    question: 'If you study consistently, you _____ fluent in English.',
    questionAr: 'إذا درست بانتظام، _____ طليقاً بالإنجليزية.',
    options: ['become', 'will become', 'became', 'would become'],
    correctIndex: 1,
    explanation: 'First conditional formula: If + present simple -> will + base verb.',
  },
  // B2
  {
    level: 'B2',
    question: 'Although the weather was terrible, the flight _____ on time.',
    questionAr: 'على الرغم من سوء الأحوال الجوية، _____ الرحلة في الوقت المحدد.',
    options: ['departed', 'was departing', 'has departed', 'departs'],
    correctIndex: 0,
    explanation: 'Past narrative sequence uses simple past "departed".',
  },
  // B2
  {
    level: 'B2',
    question: 'The new environmental policy _____ by parliament yesterday.',
    questionAr: 'السياسة البيئية الجديدة _____ من قبل البرلمان بالأمس.',
    options: ['approved', 'was approved', 'has approved', 'is approved'],
    correctIndex: 1,
    explanation: 'Passive past voice requires "was/were + past participle".',
  },
  // C1
  {
    level: 'C1',
    question: 'Rarely _____ such exceptional dedication in a novice engineer.',
    questionAr: 'نادراً ما _____ مثل هذا التفاني الاستثنائي لدى مهندس مبتدئ.',
    options: ['we see', 'have we seen', 'we have seen', 'we saw'],
    correctIndex: 1,
    explanation: 'Negative inversion requires auxiliary verb before subject ("have we seen").',
  },
  // C1
  {
    level: 'C1',
    question: 'His arguments were so compelling that they served to _____ all doubt.',
    questionAr: 'كانت حججه مقنعة لدرجة أنها عملت على _____ كل شك.',
    options: ['dispel', 'distort', 'deprecate', 'defer'],
    correctIndex: 0,
    explanation: '"Dispel" means to drive away or eliminate doubt or rumors.',
  },
  // C2
  {
    level: 'C2',
    question: 'Her meticulous analysis served as the _____ of academic rigor.',
    questionAr: 'كان تحليلها الدقيق بمثابة _____ الصرامة الأكاديمية ونموذجها الأسمى.',
    options: ['anachronism', 'epitome', 'parody', 'pretext'],
    correctIndex: 1,
    explanation: '"Epitome" designates a person or thing that is a perfect example of a quality.',
  },
  // PRO
  {
    level: 'PRO',
    question: 'The CEO handled the hostile takeover bid with admirable _____.',
    questionAr: 'تعامل الرئيس التنفيذي مع محاولة الاستحواذ بـ _____ ورباطة جأش تحظى بالإعجاب.',
    options: ['equivocation', 'equanimity', 'enmity', 'ebullience'],
    correctIndex: 1,
    explanation: '"Equanimity" denotes calm, composure, and emotional balance under tension.',
  },
];

interface PlacementTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
}

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  isOpen,
  onClose,
  progress,
  setProgress,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = PLACEMENT_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isOk = idx === currentQ.correctIndex;
    if (isOk) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Finished
      setIsFinished(true);
      calculateAssignedLevel(score + (selectedOpt === currentQ.correctIndex ? 1 : 0));
    }
  };

  const calculateAssignedLevel = (finalScore: number) => {
    let assigned: CEFRLevel = 'A1';
    let earnedXP = 200;

    if (finalScore >= 9) {
      assigned = 'PRO';
      earnedXP = 6200;
    } else if (finalScore >= 8) {
      assigned = 'C2';
      earnedXP = 4200;
    } else if (finalScore >= 7) {
      assigned = 'C1';
      earnedXP = 2800;
    } else if (finalScore >= 5) {
      assigned = 'B2';
      earnedXP = 1700;
    } else if (finalScore >= 3) {
      assigned = 'B1';
      earnedXP = 900;
    } else if (finalScore >= 2) {
      assigned = 'A2';
      earnedXP = 400;
    }

    const allLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'PRO'];
    const idx = allLevels.indexOf(assigned);
    const unlocked = allLevels.slice(0, idx + 1);

    setProgress({
      ...progress,
      currentLevel: assigned,
      unlockedLevels: unlocked,
      xp: Math.max(progress.xp, earnedXP),
    });

    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    speechService.speak(`Congratulations! Your certified placement level is ${assigned}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-800 to-violet-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm">CEFR Level Placement Diagnostic</h3>
              <p className="text-[11px] text-indigo-200 font-arabic">
                اختبار تحديد المستوى المعتمد من A1 حتى PRO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!isFinished && (
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
            <div
              className="bg-indigo-600 h-1.5 transition-all"
              style={{ width: `${((currentIdx + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Question Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {!isFinished ? (
            <>
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
                <span>Question {currentIdx + 1} of {PLACEMENT_QUESTIONS.length}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold">
                  Target: {currentQ.level}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentQ.question}
                </h4>
                <p className="text-xs text-slate-500 font-arabic text-right">
                  {currentQ.questionAr}
                </p>
              </div>

              <div className="space-y-2">
                {currentQ.options.map((opt, i) => {
                  let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
                  if (isAnswered) {
                    if (i === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (i === selectedOpt) {
                      btnStyle = 'bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-200';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleSelect(i)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left font-medium text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && i === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  {currentQ.explanation}
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-xl">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Placement Diagnostic Complete!
                </h3>
                <p className="text-xs text-slate-500 font-arabic mt-1">
                  تم تحديد مستواك المعتمد وفتح جميع المراحل المؤهل لها فوراً.
                </p>
              </div>

              <div className="inline-block p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase block">
                  Assigned CEFR Level
                </span>
                <span className="text-3xl font-black text-slate-900 dark:text-white block mt-0.5">
                  {progress.currentLevel}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          {!isFinished ? (
            <button
              disabled={!isAnswered}
              onClick={handleNext}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                isAnswered
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
            >
              Start Training on Level {progress.currentLevel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
