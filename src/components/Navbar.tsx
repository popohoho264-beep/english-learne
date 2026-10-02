import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  Globe,
  Sun,
  Moon,
  Volume2,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sliders,
  Award,
  Code2,
  Radio,
} from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';
import { speechService } from '../services/speechService';

interface NavbarProps {
  progress: UserProgress;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showArabicHints: boolean;
  setShowArabicHints: (show: boolean) => void;
  voiceAccent: 'US' | 'UK';
  setVoiceAccent: (accent: 'US' | 'UK') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onOpenTestNow: () => void;
  onOpenVoiceStudio: () => void;
  onOpenPlacementTest: () => void;
  onOpenDeveloperDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeTab,
  setActiveTab,
  showArabicHints,
  setShowArabicHints,
  voiceAccent,
  setVoiceAccent,
  isDarkMode,
  setIsDarkMode,
  onOpenTestNow,
  onOpenVoiceStudio,
  onOpenPlacementTest,
  onOpenDeveloperDrawer,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = speechService.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  const currentLvlInfo =
    ALL_CEFR_LEVELS.find((l) => l.level === progress.currentLevel) ||
    ALL_CEFR_LEVELS[0];

  const sentenceMilestone = progress.sentencesSinceLastTest;
  const sentencePercent = Math.min(100, (sentenceMilestone / 10) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-xl tracking-tighter">
                  FP
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                    FluentPulse
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    A1 → PRO
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  إتقان الإنجليزية الواقعية بطلاقة
                </p>
              </div>
            </button>
          </div>

          {/* Quick Stats: Current Level, Streak, XP, 10-Sentence Test Progress */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Level Badge with Placement Test trigger */}
            <button
              onClick={onOpenPlacementTest}
              title="Click to take CEFR Placement Diagnostic"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500 transition-colors"
            >
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded">
                {progress.currentLevel}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {currentLvlInfo.name}
              </span>
              <Award className="w-3.5 h-3.5 text-amber-500 ml-0.5" />
            </button>

            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400 font-semibold text-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{progress.streak} Day Streak</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
              <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              <span>{progress.xp} XP</span>
            </div>

            {/* 10-Sentence Smart Mini-Test Progress Tracker */}
            <button
              onClick={onOpenTestNow}
              title="Mini-Test triggers automatically every 10 sentences!"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors text-xs font-medium text-indigo-700 dark:text-indigo-300"
            >
              <div className="flex flex-col text-left">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>Smart Test</span>
                  <span className="text-indigo-600 dark:text-indigo-400 ml-1">
                    {sentenceMilestone}/10
                  </span>
                </div>
                <div className="w-16 h-1.5 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${sentencePercent}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
            </button>
          </div>

          {/* Controls: Audio Studio, Arabic Hints Toggle, Developer Hub, Dark Mode */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Wave Indicator if speech is active */}
            {isSpeaking && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 animate-pulse text-xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Playing</span>
              </div>
            )}

            {/* Studio Voice Configuration Button */}
            <button
              onClick={onOpenVoiceStudio}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
              title="Studio Voice Over & Audio Overhaul"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Voice Studio</span>
              <span className="font-mono text-[10px] font-bold uppercase">
                {voiceAccent}
              </span>
            </button>

            {/* Arabic Support Toggle */}
            <button
              onClick={() => setShowArabicHints(!showArabicHints)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                showArabicHints
                  ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title={
                showArabicHints
                  ? 'Arabic Support Active'
                  : 'English Immersion Mode'
              }
            >
              <Globe className="w-3.5 h-3.5 text-violet-500" />
              <span className="hidden sm:inline">عربي</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {showArabicHints ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Developer Hub Button */}
            <button
              onClick={onOpenDeveloperDrawer}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Developer Hub & Diagnostics"
            >
              <Code2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
