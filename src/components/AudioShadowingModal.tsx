import React, { useState } from 'react';
import {
  X,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechService } from '../services/speechService';
import { UserProgress } from '../types';

interface AudioShadowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSentence: string;
  targetSentenceAr?: string;
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
}

export const AudioShadowingModal: React.FC<AudioShadowingModalProps> = ({
  isOpen,
  onClose,
  targetSentence,
  targetSentenceAr,
  progress,
  setProgress,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activeRecInstance, setActiveRecInstance] = useState<{ stop: () => void } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleStartSpeaking = () => {
    setErrorMsg(null);
    setTranscript('');
    setMatchScore(null);
    setIsRecording(true);

    const rec = speechService.startSpeechRecognition(
      (result) => {
        setTranscript(result);
        setIsRecording(false);
        evaluatePronunciation(result);
      },
      (err) => {
        setErrorMsg(err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (rec) {
      setActiveRecInstance(rec);
    } else {
      setIsRecording(false);
      setErrorMsg('Microphone recognition not supported in this browser. Please use Chrome or Edge.');
    }
  };

  const handleStopSpeaking = () => {
    if (activeRecInstance) {
      activeRecInstance.stop();
    }
    setIsRecording(false);
  };

  const evaluatePronunciation = (userSpeech: string) => {
    const cleanTargetWords = targetSentence
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const cleanUserWords = userSpeech
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    if (cleanTargetWords.length === 0) return;

    let matched = 0;
    cleanTargetWords.forEach((word) => {
      if (cleanUserWords.includes(word)) {
        matched++;
      }
    });

    const score = Math.round((matched / cleanTargetWords.length) * 100);
    setMatchScore(score);

    if (score >= 80) {
      speechService.speak('Spot on pronunciation!');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      setProgress({
        ...progress,
        xp: progress.xp + 30,
      });
    } else {
      speechService.speak('Good try! Listen once more and repeat.');
    }
  };

  // Split words for visual comparison
  const targetWords = targetSentence.split(' ');
  const userWordsLower = transcript.toLowerCase().split(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Pronunciation Shadowing Lab
              </h3>
              <p className="text-xs text-slate-500 font-arabic">
                استمع للنطق الأصلي ثم سجل صوتك للمقارنة الفورية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Target Sentence Box */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              Target Sentence to Speak:
            </span>
            <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              "{targetSentence}"
            </p>
            {targetSentenceAr && (
              <p className="text-xs text-slate-500 font-arabic text-right">
                {targetSentenceAr}
              </p>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => speechService.speak(targetSentence, 0.95)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm hover:bg-slate-50"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Normal Speed (1.0x)</span>
              </button>

              <button
                onClick={() => speechService.speak(targetSentence, 0.75)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50"
              >
                <span>🐢 Slow Speed (0.75x)</span>
              </button>
            </div>
          </div>

          {/* Recording Status / Mic Action */}
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <button
              onClick={isRecording ? handleStopSpeaking : handleStartSpeaking}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
                isRecording
                  ? 'bg-rose-600 animate-pulse scale-105'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {isRecording ? 'Listening... Speak now!' : 'Click Microphone & Read Sentence'}
            </span>
          </div>

          {/* Speech Result / Evaluation */}
          {transcript && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                What we heard:
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                "{transcript}"
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {matchScore !== null && (
            <div
              className={`p-4 rounded-2xl border text-center space-y-1 ${
                matchScore >= 80
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm">
                {matchScore >= 80 ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Pronunciation Match: {matchScore}% (+30 XP)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span>Match: {matchScore}% — Good try, practice makes perfect!</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
