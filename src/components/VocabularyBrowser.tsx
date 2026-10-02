import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Volume2,
  Bookmark,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { WordItem, CEFRLevel, WordType, UserProgress } from '../types';
import { ALL_CEFR_LEVELS } from '../data/vocabularyData';
import { speechService } from '../services/speechService';
import { toggleWordMastery, toggleBookmark } from '../services/storageService';

interface VocabularyBrowserProps {
  allWords: WordItem[];
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  showArabicHints: boolean;
}

export const VocabularyBrowser: React.FC<VocabularyBrowserProps> = ({
  allWords,
  progress,
  setProgress,
  showArabicHints,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<WordType | 'all'>('all');
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);

  // Filter words
  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allWords.filter((item) => {
      if (selectedLevel !== 'ALL' && item.level !== selectedLevel) return false;
      if (selectedType !== 'all' && item.type !== selectedType) return false;
      if (!q) return true;
      return (
        item.word.toLowerCase().includes(q) ||
        item.arabic.includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.exampleSentence && item.exampleSentence.toLowerCase().includes(q))
      );
    });
  }, [allWords, searchQuery, selectedLevel, selectedType]);

  const handleToggleMastery = (e: React.MouseEvent, wordId: string) => {
    e.stopPropagation();
    const updated = toggleWordMastery(progress, wordId);
    setProgress(updated);
  };

  const handleToggleBookmark = (e: React.MouseEvent, wordId: string) => {
    e.stopPropagation();
    const updated = toggleBookmark(progress, wordId);
    setProgress(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Total Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Structured Vocabulary Database
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            1000+ English Verbs & Nouns
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic mt-1">
            كل كلمة مربوطة بجمل واقعية وأمثلة واضحة للتصريفات والاستخدام اليومي.
          </p>
        </div>

        {/* Mastered Counter */}
        <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div>
            <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400">
              {progress.masteredWordIds.length}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Mastered
            </span>
          </div>
          <div className="w-px h-7 bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="block text-xl font-black text-indigo-600 dark:text-indigo-400">
              {allWords.length}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Total Database
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in English or Arabic (ابحث بالإنجليزي أو العربي)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 shadow-sm transition-colors"
          />
        </div>

        {/* CEFR Level filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedLevel('ALL')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedLevel === 'ALL'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            All Levels
          </button>
          {ALL_CEFR_LEVELS.map((lvl) => (
            <button
              key={lvl.level}
              onClick={() => setSelectedLevel(lvl.level)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedLevel === lvl.level
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {lvl.level}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          {(['all', 'verb', 'noun'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedType === t
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {t === 'all' ? 'All Types' : `${t}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.slice(0, 120).map((item) => {
          const isExpanded = expandedWordId === item.id;
          const isMastered = progress.masteredWordIds.includes(item.id);
          const isBookmarked = progress.bookmarkedWordIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => setExpandedWordId(isExpanded ? null : item.id)}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                isMastered
                  ? 'border-emerald-300 dark:border-emerald-900/60'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {item.word}
                    </h3>
                    <span className="text-base text-slate-600 dark:text-slate-300 font-arabic">
                      {item.arabic}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(item.word);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                    {item.level}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase">
                    {item.type}
                  </span>
                  <button
                    onClick={(e) => handleToggleBookmark(e, item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-400 hover:text-amber-500'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleToggleMastery(e, item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isMastered
                        ? 'text-emerald-500 fill-emerald-500'
                        : 'text-slate-400 hover:text-emerald-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Example sentence */}
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    "{item.exampleSentence}"
                  </p>
                  {showArabicHints && item.exampleSentenceAr && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic text-right mt-1">
                      {item.exampleSentenceAr}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speechService.speak(item.exampleSentence);
                  }}
                  className="p-1 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Expanded Details: Tenses for verbs, Contexts for nouns */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in text-xs">
                  {item.verbForms && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pb-1 border-b border-slate-100 dark:border-slate-800">
                        <span>
                          Forms: <strong className="font-mono text-slate-800 dark:text-slate-200">{item.verbForms.base}</strong> • <strong className="font-mono text-slate-800 dark:text-slate-200">{item.verbForms.thirdPerson}</strong> • <strong className="font-mono text-slate-800 dark:text-slate-200">{item.verbForms.continuous}</strong> • <strong className="font-mono text-slate-800 dark:text-slate-200">{item.verbForms.past}</strong> • <strong className="font-mono text-slate-800 dark:text-slate-200">{item.verbForms.pastParticiple}</strong>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.verbForms.isIrregular ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                          {item.verbForms.isIrregular ? 'Irregular (شاذ)' : 'Regular (منتظم)'}
                        </span>
                      </div>

                      {/* 3 Core Tenses Cards with Arabic Translations */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 space-y-1">
                          <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase block">
                            Present (الحاضر)
                          </span>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            "{item.verbForms.presentSentence}"
                          </p>
                          {showArabicHints && item.verbForms.presentSentenceAr && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-arabic text-right mt-1 pt-1 border-t border-sky-200/50 dark:border-slate-700/60">
                              {item.verbForms.presentSentenceAr}
                            </p>
                          )}
                        </div>

                        <div className="p-3 rounded-2xl bg-violet-50 dark:bg-slate-800/80 border border-violet-100 dark:border-slate-700 space-y-1">
                          <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300 uppercase block">
                            Past (الماضي: {item.verbForms.past})
                          </span>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            "{item.verbForms.pastSentence}"
                          </p>
                          {showArabicHints && item.verbForms.pastSentenceAr && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-arabic text-right mt-1 pt-1 border-t border-violet-200/50 dark:border-slate-700/60">
                              {item.verbForms.pastSentenceAr}
                            </p>
                          )}
                        </div>

                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 space-y-1">
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase block">
                            Future (المستقبل)
                          </span>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            "{item.verbForms.futureSentence}"
                          </p>
                          {showArabicHints && item.verbForms.futureSentenceAr && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-arabic text-right mt-1 pt-1 border-t border-emerald-200/50 dark:border-slate-700/60">
                              {item.verbForms.futureSentenceAr}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Negative and Question Structure */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-2.5 rounded-2xl bg-rose-50/70 dark:bg-slate-800/60 border border-rose-100 dark:border-slate-700">
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase block mb-0.5">
                            Negative (النفي)
                          </span>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            "{item.verbForms.negativeSentence}"
                          </p>
                          {showArabicHints && item.verbForms.negativeSentenceAr && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic text-right mt-0.5">
                              {item.verbForms.negativeSentenceAr}
                            </p>
                          )}
                        </div>

                        <div className="p-2.5 rounded-2xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-100 dark:border-slate-700">
                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase block mb-0.5">
                            Question (السؤال)
                          </span>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            "{item.verbForms.questionSentence}"
                          </p>
                          {showArabicHints && item.verbForms.questionSentenceAr && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic text-right mt-0.5">
                              {item.verbForms.questionSentenceAr}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Context-aware Multiple Meanings */}
                      {item.contextMeanings && item.contextMeanings.length > 0 && (
                        <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                          <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase block">
                            Context-Aware Meanings (فروق المعاني بحسب السياق):
                          </span>
                          <div className="space-y-1">
                            {item.contextMeanings.map((c, idx) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] py-1 border-b border-indigo-100/50 dark:border-indigo-900/30 last:border-0">
                                <div>
                                  <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1.5">[{c.context}]:</span>
                                  <span className="text-slate-800 dark:text-slate-200 font-medium">"{c.exampleEn}"</span>
                                </div>
                                <div className="text-slate-600 dark:text-slate-300 font-arabic text-right sm:text-left mt-0.5 sm:mt-0">
                                  <span>{c.meaningAr}</span> • <span className="opacity-80 font-normal">"{c.exampleAr}"</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {item.nounForms && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-100 dark:border-slate-800">
                        <span>
                          Plural (الجمع):{' '}
                          <strong className="font-mono text-slate-900 dark:text-slate-100">
                            {item.nounForms.plural}
                          </strong>
                        </span>
                        <span>
                          Category: <strong className="text-slate-800 dark:text-slate-200">{item.category}</strong>
                        </span>
                      </div>

                      {/* Collocations */}
                      {item.nounForms.collocations.length > 0 && (
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Common Everyday Collocations (متلازمات شائعة):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.nounForms.collocations.map((col, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px] border border-slate-200/60 dark:border-slate-700"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Context Sentences with Arabic */}
                      {item.nounForms.contextSentences && item.nounForms.contextSentences.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Real Sentences in Action (جمل واقعية إضافية):
                          </span>
                          <div className="space-y-2">
                            {item.nounForms.contextSentences.map((sEn, idx) => {
                              const sAr = item.nounForms?.contextSentencesAr?.[idx];
                              return (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 flex flex-col justify-between"
                                >
                                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    "{sEn}"
                                  </p>
                                  {showArabicHints && sAr && (
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-arabic text-right mt-1">
                                      {sAr}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Expand Toggle indicator */}
              <div className="flex justify-center mt-2 text-slate-400">
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredWords.length > 120 && (
        <div className="text-center py-4 text-xs font-semibold text-slate-400">
          Showing 120 of {filteredWords.length} words. Use search to find specific words.
        </div>
      )}
    </div>
  );
};
