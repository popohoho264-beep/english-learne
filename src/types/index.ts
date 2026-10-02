export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'PRO';

export type WordType = 'verb' | 'noun' | 'adjective' | 'adverb' | 'expression';

export interface ContextMeaning {
  context: string;
  meaningAr: string;
  exampleEn: string;
  exampleAr: string;
}

export interface VerbForms {
  base: string;
  thirdPerson: string;
  continuous: string;
  past: string;
  pastParticiple: string;
  isIrregular?: boolean;
  presentSentence: string;
  pastSentence: string;
  futureSentence: string;
  negativeSentence?: string;
  questionSentence?: string;
  presentSentenceAr?: string;
  pastSentenceAr?: string;
  futureSentenceAr?: string;
  negativeSentenceAr?: string;
  questionSentenceAr?: string;
  contextMeanings?: ContextMeaning[];
}

export interface NounForms {
  plural: string;
  isCountable: boolean;
  collocations: string[];
  contextSentences: string[];
  contextSentencesAr?: string[];
  contextMeanings?: ContextMeaning[];
}

export interface WordItem {
  id: string;
  word: string;
  arabic: string;
  type: WordType;
  level: CEFRLevel;
  phonetic?: string;
  difficulty: number; // 1-5
  frequency: 'Essential' | 'Very High' | 'High' | 'Common' | 'Advanced';
  category: string;
  exampleSentence: string;
  exampleSentenceAr?: string;
  verbForms?: VerbForms;
  nounForms?: NounForms;
  contextMeanings?: ContextMeaning[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  titleAr: string;
  level: CEFRLevel;
  description: string;
  descriptionAr: string;
  formula: string;
  keyPoints: string[];
  keyPointsAr: string[];
  examples: {
    en: string;
    ar: string;
    highlightWord?: string;
    tenseLabel?: string;
  }[];
  exercise: {
    question: string;
    questionAr: string;
    options: string[];
    correctIndex: number;
    explanationEn: string;
    explanationAr: string;
  }[];
}

export interface ConversationScenario {
  id: string;
  topic: string;
  topicAr: string;
  level: CEFRLevel;
  title: string;
  titleAr: string;
  description: string;
  avatar: string;
  initialMessage: string;
  initialMessageAr: string;
  targetVocabulary: string[];
}

export interface MistakeRecord {
  id: string;
  wordId?: string;
  concept: string;
  userAnswer: string;
  correctAnswer: string;
  explanationEn: string;
  explanationAr: string;
  similarExample: string;
  similarExampleAr: string;
  date: string;
  reviewedCount: number;
  resolved: boolean;
}

export interface UserProgress {
  currentLevel: CEFRLevel;
  unlockedLevels: CEFRLevel[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  sentencesTrainedCount: number;
  sentencesSinceLastTest: number;
  masteredWordIds: string[];
  learningWordIds: string[];
  bookmarkedWordIds: string[];
  masteredGrammarIds: string[];
  mistakes: MistakeRecord[];
  testScores: {
    date: string;
    type: string;
    score: number;
    total: number;
  }[];
  dailyGoalSentences: number;
  dailySentencesCompletedToday: number;
}

export type TestType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'translate_word'
  | 'build_sentence'
  | 'choose_tense'
  | 'en_to_ar'
  | 'ar_to_en'
  | 'correct_mistake'
  | 'choose_verb'
  | 'create_sentence';

export interface TestQuestion {
  id: string;
  type: TestType;
  promptEn: string;
  promptAr?: string;
  targetWord?: string;
  options?: string[];
  correctAnswer: string;
  sentenceWords?: string[]; // For sentence reordering
  explanationEn: string;
  explanationAr: string;
  similarExample?: string;
  level: CEFRLevel;
}
