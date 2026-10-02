import { WordItem, CEFRLevel, WordType, ContextMeaning } from '../types';

export function createVerb(
  id: string,
  word: string,
  arabic: string,
  level: CEFRLevel,
  forms: {
    past: string;
    pastParticiple: string;
    thirdPerson: string;
    continuous: string;
    isIrregular?: boolean;
  },
  sentences: {
    present: string;
    past: string;
    future: string;
    presentAr: string;
    pastAr: string;
    futureAr: string;
    negative?: string;
    question?: string;
    negativeAr?: string;
    questionAr?: string;
  },
  category: string,
  difficulty = 1,
  frequency: WordItem['frequency'] = 'Essential',
  contextMeanings?: ContextMeaning[]
): WordItem {
  const isIrreg = forms.isIrregular ?? (forms.past !== `${word}ed`);
  const negSentence = sentences.negative || `I do not ${word} without a clear plan.`;
  const qSentence = sentences.question || `Did you ${word} yesterday?`;
  const negAr = sentences.negativeAr || `أنا لا أقوم بهذا الأمر دون خطة واضحة.`;
  const qAr = sentences.questionAr || `هل قمت بهذا الأمر بالأمس؟`;

  return {
    id,
    word,
    arabic,
    type: 'verb',
    level,
    difficulty,
    frequency,
    category,
    exampleSentence: sentences.present,
    exampleSentenceAr: sentences.presentAr,
    contextMeanings,
    verbForms: {
      base: word,
      past: forms.past,
      pastParticiple: forms.pastParticiple,
      thirdPerson: forms.thirdPerson,
      continuous: forms.continuous,
      isIrregular: isIrreg,
      presentSentence: sentences.present,
      pastSentence: sentences.past,
      futureSentence: sentences.future,
      negativeSentence: negSentence,
      questionSentence: qSentence,
      presentSentenceAr: sentences.presentAr,
      pastSentenceAr: sentences.pastAr,
      futureSentenceAr: sentences.futureAr,
      negativeSentenceAr: negAr,
      questionSentenceAr: qAr,
      contextMeanings,
    },
  };
}

export function createNoun(
  id: string,
  word: string,
  arabic: string,
  level: CEFRLevel,
  plural: string,
  collocations: string[],
  contexts: { en: string; ar: string }[],
  category: string,
  difficulty = 1,
  frequency: WordItem['frequency'] = 'Essential',
  contextMeanings?: ContextMeaning[]
): WordItem {
  return {
    id,
    word,
    arabic,
    type: 'noun',
    level,
    difficulty,
    frequency,
    category,
    exampleSentence: contexts[0]?.en || `The ${word} is an essential concept.`,
    exampleSentenceAr: contexts[0]?.ar || `تعد هذه الكلمة مفهوماً أساسياً.`,
    contextMeanings,
    nounForms: {
      plural,
      isCountable: plural !== word,
      collocations,
      contextSentences: contexts.map(c => c.en),
      contextSentencesAr: contexts.map(c => c.ar),
      contextMeanings,
    },
  };
}
