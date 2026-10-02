import { WordItem, CEFRLevel } from '../types';
import { createNoun } from './vocabBase';

interface RawNounDef {
  word: string;
  arabic: string;
  level: CEFRLevel;
  plural: string;
  collocations: string[];
  contexts: { en: string; ar: string }[];
  category: string;
  diff: number;
}

const nounDefinitions: RawNounDef[] = [
  // A1
  {
    word: 'morning', arabic: 'صباح', level: 'A1', plural: 'mornings',
    collocations: ['early morning', 'good morning', 'this morning'],
    contexts: [
      { en: 'I wake up at six every morning.', ar: 'أستيقظ في السادسة كل صباح.' },
      { en: 'The fresh morning air is energizing.', ar: 'هواء الصباح النقي منعش ومحفز للنشاط.' },
      { en: 'We have our team briefing in the morning.', ar: 'لدينا إيجاز لفريق العمل في الصباح.' }
    ],
    category: 'Time', diff: 1
  },
  {
    word: 'door', arabic: 'باب', level: 'A1', plural: 'doors',
    collocations: ['front door', 'open the door', 'lock the door'],
    contexts: [
      { en: 'Please remember to lock the front door.', ar: 'يرجى تذكر قفل الباب الأمامي.' },
      { en: 'Someone knocked gently on the classroom door.', ar: 'طرق شخص ما برفق على باب الفصل.' },
      { en: 'The automatic doors opened as we approached.', ar: 'فتحت الأبواب التلقائية عند اقترابنا.' }
    ],
    category: 'Home & Places', diff: 1
  },
  {
    word: 'money', arabic: 'مال / نقود', level: 'A1', plural: 'money',
    collocations: ['save money', 'spend money', 'pocket money'],
    contexts: [
      { en: 'Learning to budget your money is important.', ar: 'تعلم إدارة وتوفير أموالك أمر مهم.' },
      { en: 'He saved enough money to buy a computer.', ar: 'ادخر ما يكفي من المال لشراء حاسوب.' },
      { en: 'Time is more valuable than money.', ar: 'الوقت أثمن من المال.' }
    ],
    category: 'Daily Life', diff: 1
  },

  // A2
  {
    word: 'journey', arabic: 'رحلة / مسار', level: 'A2', plural: 'journeys',
    collocations: ['long journey', 'safe journey', 'start a journey'],
    contexts: [
      { en: 'They embarked on a memorable train journey across the mountains.', ar: 'انطلقوا في رحلة قطار لا تُنسى عبر الجبال.' },
      { en: 'We wish you a very safe and pleasant journey.', ar: 'نتمنى لك رحلة آمنة وممتعة للغاية.' },
      { en: 'Learning English is a rewarding personal journey.', ar: 'تعلم الإنجليزية رحلة شخصية مجزية.' }
    ],
    category: 'Travel', diff: 2
  },
  {
    word: 'health', arabic: 'صحة', level: 'A2', plural: 'health',
    collocations: ['good health', 'mental health', 'health care'],
    contexts: [
      { en: 'Regular exercise contributes to long-term health.', ar: 'الرياضة المنتظمة تسهم في الصحة طويلة الأمد.' },
      { en: 'Proper sleep is fundamental for mental health.', ar: 'النوم السليم أساسي للصحة النفسية.' },
      { en: 'Eating fresh vegetables boosts your overall health.', ar: 'تناول الخضروات الطازجة يعزز صحتك العامة.' }
    ],
    category: 'Food & Health', diff: 2
  },
  {
    word: 'opinion', arabic: 'رأي / وجهة نظر', level: 'A2', plural: 'opinions',
    collocations: ['in my opinion', 'express an opinion', 'second opinion'],
    contexts: [
      { en: 'In my honest opinion, daily practice is key.', ar: 'في رأيي الصادق، الممارسة اليومية هي المفتاح.' },
      { en: 'Everyone is welcome to express their opinion politely.', ar: 'الجميع مرحب بهم للتعبير عن آرائهم بكل احترام.' },
      { en: 'He sought a professional second opinion before surgery.', ar: 'طلب رأياً طبياً ثانياً قبل الجراحة.' }
    ],
    category: 'Communication', diff: 2
  },

  // B1
  {
    word: 'opportunity', arabic: 'فرصة', level: 'B1', plural: 'opportunities',
    collocations: ['great opportunity', 'miss an opportunity', 'career opportunity'],
    contexts: [
      { en: 'This scholarship is a life-changing opportunity.', ar: 'هذه المنحة الدراسية فرصة تغير مجرى الحياة.' },
      { en: 'Do not hesitate or you might miss this great opportunity.', ar: 'لا تتردد وإلا قد تفوت هذه الفرصة العظيمة.' },
      { en: 'Fluency in English unlocks global career opportunities.', ar: 'الطلاقة في الإنجليزية تفتح فرصاً مهنية عالمية.' }
    ],
    category: 'Growth', diff: 3
  },
  {
    word: 'challenge', arabic: 'تحدي', level: 'B1', plural: 'challenges',
    collocations: ['face a challenge', 'major challenge', 'accept a challenge'],
    contexts: [
      { en: 'Every obstacle presents an exciting new challenge.', ar: 'كل عقبة تمثل تحدياً جديداً ومثيراً.' },
      { en: 'Our team faced a major technical challenge last quarter.', ar: 'واجه فريقنا تحدياً تقنياً كبيراً الربع الماضي.' },
      { en: 'She accepted the challenge and completed the marathon.', ar: 'قبلت التحدي وأكملت الماراثون.' }
    ],
    category: 'Mind & Growth', diff: 3
  },
  {
    word: 'environment', arabic: 'بيئة', level: 'B1', plural: 'environments',
    collocations: ['protect the environment', 'work environment', 'natural environment'],
    contexts: [
      { en: 'We must adopt renewable energy to protect our environment.', ar: 'يجب أن نعتمد الطاقة المتجددة لحماية بيئتنا.' },
      { en: 'A positive learning environment accelerates student progress.', ar: 'البيئة التعليمية الإيجابية تسرع تقدم الطلاب.' },
      { en: 'Rare wildlife thrives in this protected natural environment.', ar: 'تزدهر الحياة البرية النادرة في هذه البيئة الطبيعية المحمية.' }
    ],
    category: 'Science & Society', diff: 3
  },

  // B2
  {
    word: 'perspective', arabic: 'منظور / وجهة نظر شاملة', level: 'B2', plural: 'perspectives',
    collocations: ['broader perspective', 'different perspective', 'gain perspective'],
    contexts: [
      { en: 'Traveling abroad gives you a much broader cultural perspective.', ar: 'السفر للخارج يمنحك منظوراً ثقافياً أوسع بكثير.' },
      { en: 'Listening carefully allows us to understand different perspectives.', ar: 'الاستماع باهتمام يتيح لنا فهم وجهات النظر المختلفة.' },
      { en: 'Historical records put current events into perspective.', ar: 'تضع السجلات التاريخية الأحداث الحالية في نصابها الصحيح.' }
    ],
    category: 'Mind & Thought', diff: 4
  },
  {
    word: 'initiative', arabic: 'مبادرة', level: 'B2', plural: 'initiatives',
    collocations: ['take the initiative', 'community initiative', 'strategic initiative'],
    contexts: [
      { en: 'Proactive employees always take the initiative to solve problems.', ar: 'الموظفون الاستباقيون يأخذون دائماً المبادرة لحل المشاكل.' },
      { en: 'The clean energy initiative reduced municipal emissions.', ar: 'خفضت مبادرة الطاقة النظيفة انبعاثات البلدية.' },
      { en: 'Leadership launched a bold strategic initiative for growth.', ar: 'أطلقت القيادة مبادرة استراتيجية جريئة للنمو.' }
    ],
    category: 'Business & Society', diff: 4
  },

  // C1
  {
    word: 'paradigm', arabic: 'نموذج فكري / نمط منهجي', level: 'C1', plural: 'paradigms',
    collocations: ['paradigm shift', 'dominant paradigm', 'new paradigm'],
    contexts: [
      { en: 'Artificial intelligence represents a fundamental paradigm shift.', ar: 'يمثل الذكاء الاصطناعي تحولاً جوهرياً في النموذج الفكري.' },
      { en: 'Scientists challenged the dominant medical paradigm.', ar: 'تحدى العلماء النموذج الطبي السائد.' },
      { en: 'A new educational paradigm prioritizes individualized learning.', ar: 'يقدم النموذج التعليمي الجديد أولوية للتعلم الفردي.' }
    ],
    category: 'Academic & Science', diff: 5
  },
  {
    word: 'resilience', arabic: 'المرونة النفسية / القدرة على الصمود', level: 'C1', plural: 'resilience',
    collocations: ['demonstrate resilience', 'mental resilience', 'economic resilience'],
    contexts: [
      { en: 'The community demonstrated extraordinary resilience after the storm.', ar: 'أظهر المجتمع قدرة استثنائية على الصمود بعد العاصفة.' },
      { en: 'Mental resilience enables individuals to thrive under stress.', ar: 'المرونة النفسية تمكن الأفراد من الازدهار تحت وطأة الضغوط.' },
      { en: 'Diversification is the bedrock of economic resilience.', ar: 'التنوع هو حجر الزاوية للمرونة الاقتصادية.' }
    ],
    category: 'Psychology & Leadership', diff: 5
  },

  // C2 & PRO
  {
    word: 'quintessence', arabic: 'جوهر الشيء / خلاصة النقاء والكمال', level: 'C2', plural: 'quintessences',
    collocations: ['quintessence of', 'true quintessence'],
    contexts: [
      { en: 'Her graceful hospitality was the quintessence of diplomacy.', ar: 'كانت ضيافتها الراقية تجسيداً لجوهر الدبلوماسية وخلاصتها.' },
      { en: 'The symphony captures the quintessence of romantic longing.', ar: 'تجسد السيمفونية خلاصة الشوق الرومانسي في أسمى صوره.' }
    ],
    category: 'Arts & Literature', diff: 5
  },
  {
    word: 'catalyst', arabic: 'حافز / عامل محفز للتغيير', level: 'PRO', plural: 'catalysts',
    collocations: ['catalyst for change', 'economic catalyst', 'powerful catalyst'],
    contexts: [
      { en: 'Technological disruption acts as a catalyst for systemic change.', ar: 'يعمل التطور التقني كعامل محفز للتغيير المنهجي الشامل.' },
      { en: 'Transparent policies were the catalyst for renewed foreign investment.', ar: 'كانت السياسات الشفافة الحافز الأساسي لتجدد الاستثمار الأجنبي.' }
    ],
    category: 'Strategy & Leadership', diff: 5
  }
];

export const curatedNouns: WordItem[] = nounDefinitions.map(d =>
  createNoun(
    `n_${d.word}`,
    d.word,
    d.arabic,
    d.level,
    d.plural,
    d.collocations,
    d.contexts,
    d.category,
    d.diff,
    d.diff <= 2 ? 'Essential' : 'High'
  )
);
