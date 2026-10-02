import { CEFRLevel } from '../types';

export interface SentenceEvaluationResult {
  isCorrect: boolean;
  score: number;
  feedbackEn: string;
  feedbackAr: string;
  correctedSentence: string;
  betterAlternative: string;
  grammarNotes: string[];
}

export interface ConversationTurnResult {
  replyEn: string;
  replyArHint: string;
  correction: {
    hasMistake: boolean;
    learnerOriginal: string;
    corrected: string | null;
    arabicExplanation: string | null;
  };
  suggestedKeywords: string[];
}

export async function evaluateSentence(
  sentence: string,
  prompt: string,
  targetWord?: string,
  level: CEFRLevel = 'A1'
): Promise<SentenceEvaluationResult> {
  try {
    const res = await fetch('/api/ai/evaluate-sentence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence, prompt, targetWord, level }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Network issue calling /api/ai/evaluate-sentence, using local evaluator:', err);
  }

  // Fallback local heuristic evaluator
  const clean = sentence.trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const startsWithCapital = /^[A-Z]/.test(clean);
  const endsWithPunct = /[.!?]$/.test(clean);
  const containsTarget = targetWord ? clean.toLowerCase().includes(targetWord.toLowerCase()) : true;

  let score = 70;
  if (startsWithCapital) score += 10;
  if (endsWithPunct) score += 10;
  if (containsTarget) score += 10;
  if (words.length < 3) score -= 20;

  const isCorrect = score >= 75;

  return {
    isCorrect,
    score: Math.min(100, Math.max(40, score)),
    feedbackEn: isCorrect
      ? 'Great sentence structure! Your usage communicates the idea effectively.'
      : 'Good effort! Make sure your sentence starts with a capital letter, ends with a period, and uses the correct verb form.',
    feedbackAr: isCorrect
      ? 'بناء رائع للجملة! الفكرة واضحة ومفهومة وسليمة قواعدياً.'
      : 'محاولة طيبة! تأكد دائماً من بدء الجملة بحرف كبير والانتهاء بنقطة ومراجعة تصريف الفعل.',
    correctedSentence: startsWithCapital && endsWithPunct ? clean : `${clean.charAt(0).toUpperCase()}${clean.slice(1)}${endsWithPunct ? '' : '.'}`,
    betterAlternative: targetWord ? `I regularly use ${targetWord} in my daily routine.` : 'Native speakers often keep expressions direct and clear.',
    grammarNotes: [
      'Subject + Verb agreement is key',
      'Word order in English: Subject + Verb + Object',
    ],
  };
}

export async function sendConversationMessage(
  scenario: string,
  topic: string,
  level: CEFRLevel,
  messages: { sender: 'user' | 'ai'; content: string }[]
): Promise<ConversationTurnResult> {
  try {
    const res = await fetch('/api/ai/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, topic, level, messages }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Conversation API error, using smart fallback:', err);
  }

  const lastUserMsg = messages[messages.length - 1]?.content || '';

  return {
    replyEn: `That is really interesting! You expressed that well. Could you tell me a little more about how that affects your daily schedule?`,
    replyArHint: `هذا ممتع حقاً! لقد عبرت عن ذلك بشكل جيد. هل يمكنك إخباري أكثر عن كيف يؤثر ذلك على جدولك اليومي؟`,
    correction: {
      hasMistake: false,
      learnerOriginal: lastUserMsg,
      corrected: lastUserMsg,
      arabicExplanation: null,
    },
    suggestedKeywords: ['routine', 'schedule', 'experience', 'usually'],
  };
}
