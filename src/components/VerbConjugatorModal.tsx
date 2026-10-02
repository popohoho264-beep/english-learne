import React, { useState } from 'react';
import {
  X,
  Clock,
  Volume2,
  Search,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { WordItem } from '../types';

interface VerbConjugatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  verbs: WordItem[];
}

export const VerbConjugatorModal: React.FC<VerbConjugatorModalProps> = ({
  isOpen,
  onClose,
  verbs,
}) => {
  const [selectedVerb, setSelectedVerb] = useState<WordItem>(verbs[0] || null);
  const [search, setSearch] = useState('');

  if (!isOpen || !selectedVerb) return null;

  const f = selectedVerb.verbForms || {
    base: selectedVerb.word,
    past: `${selectedVerb.word}ed`,
    pastParticiple: `${selectedVerb.word}ed`,
    thirdPerson: `${selectedVerb.word}s`,
    continuous: `${selectedVerb.word}ing`,
    presentSentence: `I ${selectedVerb.word} every day.`,
    pastSentence: `I ${selectedVerb.word}ed yesterday.`,
    futureSentence: `I will ${selectedVerb.word} tomorrow.`,
  };

  const tenses = [
    { name: 'Present Simple', nameAr: 'المضارع البسيط', formula: 'Subject + V1', ex: f.presentSentence, exAr: f.presentSentenceAr || `أمارس هذا الفعل بانتظام في عادتي اليومية.`, tag: 'Habits & Facts' },
    { name: 'Present Continuous', nameAr: 'المضارع المستمر', formula: 'am/is/are + V-ing', ex: `I am ${f.continuous} right now.`, exAr: `أنا أقوم بهذا الأمر في هذه اللحظة الآن.`, tag: 'Right Now' },
    { name: 'Past Simple', nameAr: 'الماضي البسيط', formula: 'Subject + V2', ex: f.pastSentence, exAr: f.pastSentenceAr || `قمت بهذا الأمر وانتهى في الماضي.`, tag: 'Finished Past' },
    { name: 'Past Continuous', nameAr: 'الماضي المستمر', formula: 'was/were + V-ing', ex: `I was ${f.continuous} when you called.`, exAr: `كنت أقوم بهذا الأمر في الماضي عندما قاطعتني بالاتصال.`, tag: 'Past Interrupted' },
    { name: 'Future Simple (Will)', nameAr: 'المستقبل البسيط', formula: 'will + Base', ex: f.futureSentence, exAr: f.futureSentenceAr || `سأقوم بهذا الأمر في المستقبل غداً.`, tag: 'Future Decisions' },
    { name: 'Future (Going To)', nameAr: 'المستقبل المخطط له', formula: 'am/is/are + going to + Base', ex: `I am going to ${f.base} next week.`, exAr: `أنا أخطط وأنوي القيام بهذا الأمر الأسبوع القادم.`, tag: 'Planned Future' },
    { name: 'Present Perfect', nameAr: 'المضارع التام', formula: 'have/has + V3', ex: `I have ${f.pastParticiple} several times so far.`, exAr: `لقد قمت بهذا الأمر عدة مرات ولأثره صلة بالحاضر.`, tag: 'Experience & Result' },
    { name: 'Past Perfect', nameAr: 'الماضي التام', formula: 'had + V3', ex: `I had already ${f.pastParticiple} before he arrived.`, exAr: `كنت قد أنجزت هذا الأمر بالفعل قبل وصوله.`, tag: 'Earlier Past' },
    { name: 'Future Perfect', nameAr: 'المستقبل التام', formula: 'will have + V3', ex: `By next year, I will have ${f.pastParticiple} completely.`, exAr: `بحلول العام القادم، سأكون قد أتممت هذا الأمر بالكامل.`, tag: 'Completed Future' },
    { name: 'First Conditional', nameAr: 'الشرط الأول', formula: 'If + Present, Will + Base', ex: `If you practice, you will ${f.base} naturally.`, exAr: `إذا تدربت بانتظام، ستقوم بهذا الأمر بكل طلاقة وتلقائية.`, tag: 'Real Possibility' },
  ];

  const filteredVerbs = verbs.filter(
    (v) =>
      v.word.toLowerCase().includes(search.toLowerCase()) ||
      v.arabic.includes(search)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Complete Verb Conjugator Matrix</h3>
              <p className="text-xs text-indigo-200 font-arabic">
                جدول تصريف جميع أزمنة الفعل الإنجليزي في جمل واقعية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verb Selector Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search verbs (e.g. go, eat, improve, travel)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Active: <strong className="text-indigo-600 uppercase">{selectedVerb.word}</strong> ({selectedVerb.arabic})
            </span>
          </div>
        </div>

        {/* Quick Verb Chips */}
        {search && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800/40 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {filteredVerbs.slice(0, 15).map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVerb(v);
                  setSearch('');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  selectedVerb.id === v.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {v.word} ({v.arabic})
              </button>
            ))}
          </div>
        )}

        {/* Tense Conjugation Matrix List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {tenses.map((t, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3 hover:border-indigo-400 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {t.name}
                  </span>
                  <span className="text-[11px] font-arabic text-slate-400">
                    ({t.nameAr})
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                    {t.formula}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  "{t.ex}"
                </p>
                {t.exAr && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic text-right mt-1">
                    {t.exAr}
                  </p>
                )}
              </div>

              <button
                onClick={() => speechService.speak(t.ex)}
                className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors shrink-0"
                title="Listen to tense"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
