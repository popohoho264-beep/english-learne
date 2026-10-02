import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Sparkles,
  BookMarked,
  MessageSquare,
  Award,
  TrendingUp,
  Clock,
  Compass,
  Mic,
  Sliders,
} from 'lucide-react';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './services/storageService';
import { fullVocabularyDatabase } from './data/scaledVocabularyBank';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LearnSection } from './components/LearnSection';
import { SentenceTrainer } from './components/SentenceTrainer';
import { VerbTenseTrainer } from './components/VerbTenseTrainer';
import { FluencyTrainer } from './components/FluencyTrainer';
import { VocabularyBrowser } from './components/VocabularyBrowser';
import { GrammarSection } from './components/GrammarSection';
import { ConversationSection } from './components/ConversationSection';
import { ProgressSection } from './components/ProgressSection';
import { MiniTestModal } from './components/MiniTestModal';
import { VoiceStudioModal } from './components/VoiceStudioModal';
import { AudioShadowingModal } from './components/AudioShadowingModal';
import { VerbConjugatorModal } from './components/VerbConjugatorModal';
import { PlacementTestModal } from './components/PlacementTestModal';
import { DeveloperDrawer } from './components/DeveloperDrawer';
import { speechService } from './services/speechService';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showArabicHints, setShowArabicHints] = useState<boolean>(true);
  const [voiceAccent, setVoiceAccent] = useState<'US' | 'UK'>('US');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Modals state
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [isTriggeredByMilestone, setIsTriggeredByMilestone] = useState<boolean>(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState<boolean>(false);
  const [isShadowingOpen, setIsShadowingOpen] = useState<boolean>(false);
  const [shadowingSentence, setShadowingSentence] = useState<string>('I eat breakfast every morning.');
  const [shadowingSentenceAr, setShadowingSentenceAr] = useState<string | undefined>('أنا أتناول الإفطار كل صباح.');
  const [isConjugatorOpen, setIsConjugatorOpen] = useState<boolean>(false);
  const [isPlacementOpen, setIsPlacementOpen] = useState<boolean>(false);
  const [isDevDrawerOpen, setIsDevDrawerOpen] = useState<boolean>(false);

  // Sync dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync voice accent to speech service
  useEffect(() => {
    speechService.setAccent(voiceAccent);
  }, [voiceAccent]);

  // Sync state to localStorage on changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const handleTriggerMiniTest = () => {
    setIsTriggeredByMilestone(true);
    setIsTestModalOpen(true);
  };

  const handleOpenTestManually = () => {
    setIsTriggeredByMilestone(false);
    setIsTestModalOpen(true);
  };

  const handleOpenShadowing = (sentence: string, sentenceAr?: string) => {
    setShadowingSentence(sentence);
    setShadowingSentenceAr(sentenceAr);
    setIsShadowingOpen(true);
  };

  // Nav items
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', labelAr: 'الرئيسية', icon: LayoutDashboard },
    { id: 'learn', label: 'Daily Lesson', labelAr: 'درس اليوم', icon: BookOpen },
    { id: 'vocabulary', label: '1000+ Words', labelAr: 'قاموس المفردات', icon: Layers },
    { id: 'practice', label: 'Sentence Lab', labelAr: 'بناء الجمل', icon: Compass },
    { id: 'verbs', label: 'Verb Tenses', labelAr: 'تدريب الأفعال', icon: Clock },
    { id: 'fluency', label: 'Fluency Mode', labelAr: 'وضع الطلاقة', icon: Sparkles },
    { id: 'grammar', label: 'Grammar', labelAr: 'القواعد', icon: BookMarked },
    { id: 'conversation', label: 'Conversation', labelAr: 'المحادثة', icon: MessageSquare },
    { id: 'progress', label: 'Progress & Review', labelAr: 'التقدم والأخطاء', icon: TrendingUp },
  ];

  const verbsList = fullVocabularyDatabase.filter((w) => w.type === 'verb' && w.verbForms);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        progress={progress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showArabicHints={showArabicHints}
        setShowArabicHints={setShowArabicHints}
        voiceAccent={voiceAccent}
        setVoiceAccent={setVoiceAccent}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenTestNow={handleOpenTestManually}
        onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
        onOpenPlacementTest={() => setIsPlacementOpen(true)}
        onOpenDeveloperDrawer={() => setIsDevDrawerOpen(true)}
      />

      {/* Main Body Container with Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6">
        {/* Navigation Tabs Bar */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-arabic opacity-75 hidden sm:inline ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                  ({tab.labelAr})
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <main className="flex-1">
          {activeTab === 'dashboard' && (
            <Dashboard
              progress={progress}
              setActiveTab={setActiveTab}
              onOpenTestNow={handleOpenTestManually}
              onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
              onOpenPlacementTest={() => setIsPlacementOpen(true)}
              onOpenConjugator={() => setIsConjugatorOpen(true)}
              onOpenShadowing={handleOpenShadowing}
            />
          )}

          {activeTab === 'learn' && (
            <LearnSection
              progress={progress}
              setProgress={setProgress}
              onTriggerMiniTest={handleTriggerMiniTest}
              showArabicHints={showArabicHints}
              onGoToTrainer={() => setActiveTab('practice')}
            />
          )}

          {activeTab === 'vocabulary' && (
            <VocabularyBrowser
              allWords={fullVocabularyDatabase}
              progress={progress}
              setProgress={setProgress}
              showArabicHints={showArabicHints}
            />
          )}

          {activeTab === 'practice' && (
            <SentenceTrainer
              progress={progress}
              setProgress={setProgress}
              onTriggerMiniTest={handleTriggerMiniTest}
              showArabicHints={showArabicHints}
              onOpenShadowing={handleOpenShadowing}
            />
          )}

          {activeTab === 'verbs' && (
            <VerbTenseTrainer
              progress={progress}
              setProgress={setProgress}
              verbs={verbsList}
              onTriggerMiniTest={handleTriggerMiniTest}
              showArabicHints={showArabicHints}
            />
          )}

          {activeTab === 'fluency' && (
            <FluencyTrainer
              progress={progress}
              setProgress={setProgress}
              onTriggerMiniTest={handleTriggerMiniTest}
              showArabicHints={showArabicHints}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarSection
              progress={progress}
              setProgress={setProgress}
              showArabicHints={showArabicHints}
            />
          )}

          {activeTab === 'conversation' && (
            <ConversationSection
              progress={progress}
              setProgress={setProgress}
              onTriggerMiniTest={handleTriggerMiniTest}
              showArabicHints={showArabicHints}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressSection
              progress={progress}
              setProgress={setProgress}
              onOpenTestNow={handleOpenTestManually}
            />
          )}
        </main>
      </div>

      {/* Automatic & Manual 10-Sentence Smart Mini-Test Modal */}
      <MiniTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        progress={progress}
        setProgress={setProgress}
        isTriggeredByMilestone={isTriggeredByMilestone}
      />

      {/* Studio Voice Over Modal */}
      <VoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
        voiceAccent={voiceAccent}
        setVoiceAccent={setVoiceAccent}
      />

      {/* Audio Pronunciation Shadowing Modal */}
      <AudioShadowingModal
        isOpen={isShadowingOpen}
        onClose={() => setIsShadowingOpen(false)}
        targetSentence={shadowingSentence}
        targetSentenceAr={shadowingSentenceAr}
        progress={progress}
        setProgress={setProgress}
      />

      {/* Complete 12-Tense Verb Conjugator Modal */}
      <VerbConjugatorModal
        isOpen={isConjugatorOpen}
        onClose={() => setIsConjugatorOpen(false)}
        verbs={verbsList}
      />

      {/* CEFR Placement Diagnostic Modal */}
      <PlacementTestModal
        isOpen={isPlacementOpen}
        onClose={() => setIsPlacementOpen(false)}
        progress={progress}
        setProgress={setProgress}
      />

      {/* Developer & Diagnostics Hub Drawer */}
      <DeveloperDrawer
        isOpen={isDevDrawerOpen}
        onClose={() => setIsDevDrawerOpen(false)}
        progress={progress}
        setProgress={setProgress}
        onOpenVoiceStudio={() => {
          setIsDevDrawerOpen(false);
          setIsVoiceStudioOpen(true);
        }}
      />
    </div>
  );
}
