import { WordItem, CEFRLevel, WordType } from '../types';
import { getCleanVerbsList } from './cleanVerbsData';
import { getCleanNounsList } from './cleanNounsData';
import { curatedVerbs } from './rawVerbs';
import { curatedNouns } from './rawNouns';

export function generateCleanLexicon(): WordItem[] {
  const wordMap = new Map<string, WordItem>();

  // 1. High-fidelity verified clean verbs (priority 1)
  const cleanVerbs = getCleanVerbsList();
  for (const v of cleanVerbs) {
    wordMap.set(v.word.toLowerCase(), v);
  }

  // 2. High-fidelity verified clean nouns (priority 1)
  const cleanNouns = getCleanNounsList();
  for (const n of cleanNouns) {
    if (!wordMap.has(n.word.toLowerCase())) {
      wordMap.set(n.word.toLowerCase(), n);
    }
  }

  // 3. Curated nouns with full contexts and collocations
  for (const cn of curatedNouns) {
    if (!wordMap.has(cn.word.toLowerCase())) {
      wordMap.set(cn.word.toLowerCase(), cn);
    }
  }

  // 4. Curated verbs with full conjugations
  for (const cv of curatedVerbs) {
    if (!wordMap.has(cv.word.toLowerCase())) {
      wordMap.set(cv.word.toLowerCase(), cv);
    }
  }

  return Array.from(wordMap.values());
}

export const fullVocabularyDatabase: WordItem[] = generateCleanLexicon();
