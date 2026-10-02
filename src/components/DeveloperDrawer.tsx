import React, { useState } from 'react';
import {
  X,
  Code2,
  Database,
  Cpu,
  Download,
  Upload,
  RotateCcw,
  Unlock,
  CheckCircle2,
  Sparkles,
  Sliders,
  Volume2,
} from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';
import { fullVocabularyDatabase } from '../data/scaledVocabularyBank';
import { speechService } from '../services/speechService';

interface DeveloperDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onOpenVoiceStudio: () => void;
}

export const DeveloperDrawer: React.FC<DeveloperDrawerProps> = ({
  isOpen,
  onClose,
  progress,
  setProgress,
  onOpenVoiceStudio,
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Database stats
  const totalWords = fullVocabularyDatabase.length;
  const verbsCount = fullVocabularyDatabase.filter((w) => w.type === 'verb').length;
  const nounsCount = fullVocabularyDatabase.filter((w) => w.type === 'noun').length;
  const otherCount = totalWords - verbsCount - nounsCount;

  const handleUnlockAllLevels = () => {
    const allLvlNames: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'PRO'];
    setProgress({
      ...progress,
      unlockedLevels: allLvlNames,
      xp: Math.max(progress.xp, 6500),
    });
    speechService.speak('All CEFR levels successfully unlocked for development and testing.');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fluentpulse_progress_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setProgress(parsed);
          setImportStatus('Progress JSON imported successfully!');
        } catch (err) {
          setImportStatus('Invalid JSON format.');
        }
      };
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all progress to initial A1 state?')) {
      localStorage.removeItem('fluentpulse_user_progress_v2');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-sm">Developer & Architecture Hub</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                FluentPulse Engine v2.0 • CEFR A1-PRO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700 dark:text-slate-300">
          {/* Database Metrics */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
              <Database className="w-4 h-4" />
              <span>Vocabulary Architecture Metrics</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">Total Seeded</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{totalWords} Words</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">Active Verbs</span>
                <span className="text-xl font-black text-violet-600 dark:text-violet-400">{verbsCount} Verbs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">Active Nouns</span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{nounsCount} Nouns</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">Other Modifiers</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">{otherCount} Words</span>
              </div>
            </div>
          </div>

          {/* Quick Voice Studio Access */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-500" />
                Voice Over & Accent Overhaul
              </span>
              <button
                onClick={onOpenVoiceStudio}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
              >
                Configure Voice
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Customize speech rate (0.75x slow, 1.0x normal, 1.25x fast), voice gender (Emma / Alex), and Gemini Studio TTS engine.
            </p>
          </div>

          {/* Development Action Shortcuts */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Testing & Level Control:
            </span>

            <button
              onClick={handleUnlockAllLevels}
              className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 flex items-center justify-between font-bold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Unlock className="w-4 h-4 text-indigo-500" />
                <span>Unlock All CEFR Levels (A1 → PRO)</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase">Dev Override</span>
            </button>
          </div>

          {/* State Export / Import */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Data Backup & Sync (JSON):
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleExportData}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Progress</span>
              </button>

              <label className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors text-center">
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold text-center">
                {importStatus}
              </p>
            )}
          </div>

          {/* Hard Reset */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleResetData}
              className="w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Progress & Cache</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
