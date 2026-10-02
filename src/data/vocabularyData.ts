import { fullVocabularyDatabase } from './scaledVocabularyBank';
import { WordItem, CEFRLevel, WordType } from '../types';

export const ALL_CEFR_LEVELS: {
  level: CEFRLevel;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  requiredXP: number;
  minSentences: number;
}[] = [
  {
    level: 'A1',
    name: 'Beginner',
    nameAr: 'مبتدئ أساسي',
    description: 'Basic daily words, simple present, basic survival communication.',
    descriptionAr: 'الكلمات اليومية البسيطة، زمن المضارع البسيط، وبدايات التحدث.',
    requiredXP: 0,
    minSentences: 0,
  },
  {
    level: 'A2',
    name: 'Elementary',
    nameAr: 'مبتدئ متقدم',
    description: 'Routine tasks, past tenses, expanding everyday conversation.',
    descriptionAr: 'المهام الروتينية، الماضي البسيط والمستمر، وتوسيع المحادثات اليومية.',
    requiredXP: 300,
    minSentences: 25,
  },
  {
    level: 'B1',
    name: 'Intermediate',
    nameAr: 'متوسط',
    description: 'Travel situations, opinions, expressing reasons and plans.',
    descriptionAr: 'مواقف السفر، التعبير عن الآراء والأسباب والخطط المستقبلية.',
    requiredXP: 800,
    minSentences: 60,
  },
  {
    level: 'B2',
    name: 'Upper Intermediate',
    nameAr: 'فوق المتوسط',
    description: 'Professional and technical topics, complex sentences, spontaneous speech.',
    descriptionAr: 'المواضيع المهنية والتقنية، الجمل المركبة والمعقدة، والتحدث بطلاقة عفوية.',
    requiredXP: 1600,
    minSentences: 120,
  },
  {
    level: 'C1',
    name: 'Advanced',
    nameAr: 'متقدم',
    description: 'Nuanced discourse, academic English, flexible structural control.',
    descriptionAr: 'الحوارات المعقدة، الإنجليزية الأكاديمية والمهنية، والتحكم اللغوي المرن.',
    requiredXP: 2600,
    minSentences: 200,
  },
  {
    level: 'C2',
    name: 'Mastery',
    nameAr: 'إتقان تام',
    description: 'Native-like precision, subtle distinctions, idiomatic mastery.',
    descriptionAr: 'دقة قريبة من المتحدث الأصلي، فهم الفروق اللغوية الدقيقة، والتراكيب البلاغية.',
    requiredXP: 4000,
    minSentences: 300,
  },
  {
    level: 'PRO',
    name: 'Professional / Elite',
    nameAr: 'نخبة المحترفين',
    description: 'Executive negotiations, rhetoric, leadership, and publication-ready eloquence.',
    descriptionAr: 'مفاوضات القيادة التنفيذية، البلاغة الإقناعية، والأسلوب اللغوي الرفيع.',
    requiredXP: 6000,
    minSentences: 450,
  }
];

export const vocabularyDatabase = fullVocabularyDatabase;

export function getWordsByLevel(level: CEFRLevel): WordItem[] {
  return vocabularyDatabase.filter(w => w.level === level);
}

export function getVerbs(): WordItem[] {
  return vocabularyDatabase.filter(w => w.type === 'verb' && w.verbForms);
}

export function getNouns(): WordItem[] {
  return vocabularyDatabase.filter(w => w.type === 'noun');
}

export function getDailyLessonWords(level: CEFRLevel, dateStr?: string): WordItem[] {
  const wordsInLevel = getWordsByLevel(level);
  if (wordsInLevel.length === 0) return vocabularyDatabase.slice(0, 8);

  // Deterministic daily selection based on date seed
  const today = dateStr || new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }
  const startIndex = Math.abs(hash) % Math.max(1, wordsInLevel.length - 8);

  const verbs = wordsInLevel.filter(w => w.type === 'verb').slice(0, 3);
  const nouns = wordsInLevel.filter(w => w.type === 'noun').slice(0, 3);
  const others = wordsInLevel.filter(w => w.type !== 'verb' && w.type !== 'noun').slice(0, 2);

  const combined = [...verbs, ...nouns, ...others];
  if (combined.length < 8) {
    return wordsInLevel.slice(startIndex, startIndex + 8);
  }
  return combined;
}

export function searchVocabulary(query: string, level?: CEFRLevel, type?: WordType | 'all'): WordItem[] {
  const cleanQ = query.trim().toLowerCase();
  return vocabularyDatabase.filter(item => {
    if (level && item.level !== level) return false;
    if (type && type !== 'all' && item.type !== type) return false;
    if (!cleanQ) return true;
    return (
      item.word.toLowerCase().includes(cleanQ) ||
      item.arabic.includes(cleanQ) ||
      item.category.toLowerCase().includes(cleanQ) ||
      (item.exampleSentence && item.exampleSentence.toLowerCase().includes(cleanQ))
    );
  });
}
