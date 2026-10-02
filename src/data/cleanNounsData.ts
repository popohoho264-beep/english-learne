import { WordItem, CEFRLevel, ContextMeaning } from '../types';

export interface CleanNounDef {
  word: string;
  arabic: string;
  level: CEFRLevel;
  plural: string;
  collocations: string[];
  category: string;
  diff: number;
  ex: string;
  exAr: string;
  contexts?: { en: string; ar: string }[];
}

export const CLEAN_NOUNS: CleanNounDef[] = [
  // ===================== A1 NOUNS =====================
  {
    word: 'time',
    arabic: 'وقت / زمن',
    level: 'A1',
    plural: 'time',
    collocations: ['free time', 'on time', 'spend time', 'take your time'],
    category: 'Daily Life',
    diff: 1,
    ex: 'Take your time to understand each word.',
    exAr: 'خذ وقتك لتفهم كل كلمة جيداً.',
    contexts: [
      { en: 'Do you have free time this evening?', ar: 'هل لديك وقت فراغ هذا المساء؟' },
      { en: 'He arrived at the meeting on time.', ar: 'وصل إلى الاجتماع في الوقت المحدد.' }
    ]
  },
  {
    word: 'morning',
    arabic: 'صباح',
    level: 'A1',
    plural: 'mornings',
    collocations: ['early morning', 'good morning', 'this morning'],
    category: 'Time',
    diff: 1,
    ex: 'I wake up at six every morning.',
    exAr: 'أستيقظ في السادسة كل صباح.',
    contexts: [
      { en: 'The fresh morning air is energizing.', ar: 'هواء الصباح النقي ينعش النشاط.' },
      { en: 'We have our team briefing in the morning.', ar: 'لدينا اجتماع عمل صباحاً.' }
    ]
  },
  {
    word: 'night',
    arabic: 'ليل / ليلة',
    level: 'A1',
    plural: 'nights',
    collocations: ['good night', 'late at night', 'last night'],
    category: 'Time',
    diff: 1,
    ex: 'Have a peaceful and restful night.',
    exAr: 'أتمنى لك ليلة هادئة ومريحة.',
    contexts: [
      { en: 'I finished the book last night.', ar: 'أنهيت قراءة الكتاب الليلة الماضية.' },
      { en: 'Do not drink coffee late at night.', ar: 'لا تشرب القهوة في وقت متأخر من الليل.' }
    ]
  },
  {
    word: 'family',
    arabic: 'عائلة / أسرة',
    level: 'A1',
    plural: 'families',
    collocations: ['close family', 'family dinner', 'family members'],
    category: 'People',
    diff: 1,
    ex: 'My family supports my English learning journey.',
    exAr: 'عائلتي تدعمني في مسيرة تعلم اللغة الإنجليزية.',
    contexts: [
      { en: 'We have dinner together as a family.', ar: 'نتناول العشاء معاً كأسرة واحدة.' },
      { en: 'Family is the most important part of my life.', ar: 'العائلة هي أهم جزء في حياتي.' }
    ]
  },
  {
    word: 'friend',
    arabic: 'صديق',
    level: 'A1',
    plural: 'friends',
    collocations: ['best friend', 'close friend', 'make friends'],
    category: 'Social',
    diff: 1,
    ex: 'A good friend is a great treasure.',
    exAr: 'الصديق الوفي كنز ثمين.',
    contexts: [
      { en: 'I study English with my best friend.', ar: 'أذاكر الإنجليزية مع صديقي المقرب.' },
      { en: 'It is easy to make friends when you travel.', ar: 'من السهل تكوين صداقات عندما تسافر.' }
    ]
  },
  {
    word: 'water',
    arabic: 'ماء',
    level: 'A1',
    plural: 'water',
    collocations: ['cold water', 'drink water', 'bottle of water'],
    category: 'Food & Health',
    diff: 1,
    ex: 'Drinking clean water is essential for your body.',
    exAr: 'شرب الماء النقي أمر ضروري لصحة جسمك.',
    contexts: [
      { en: 'Please bring me a glass of cold water.', ar: 'من فضلك أحضر لي كأساً من الماء البارد.' },
      { en: 'Drink plenty of water during exercise.', ar: 'اشرب الكثير من الماء أثناء ممارسة الرياضة.' }
    ]
  },
  {
    word: 'coffee',
    arabic: 'قهوة',
    level: 'A1',
    plural: 'coffees',
    collocations: ['hot coffee', 'cup of coffee', 'morning coffee'],
    category: 'Food & Health',
    diff: 1,
    ex: 'I enjoy a hot cup of coffee while studying.',
    exAr: 'أستمتع بفنجان قهوة ساخن أثناء المذاكرة.',
    contexts: [
      { en: 'Would you like some coffee or tea?', ar: 'هل ترغب في بعض القهوة أم الشاي؟' },
      { en: 'The aroma of fresh coffee fills the room.', ar: 'رائحة القهوة الطازجة تملأ المكان.' }
    ]
  },
  {
    word: 'food',
    arabic: 'طعام / أكل',
    level: 'A1',
    plural: 'food',
    collocations: ['healthy food', 'traditional food', 'fresh food'],
    category: 'Food & Health',
    diff: 1,
    ex: 'Eating healthy food keeps your mind sharp.',
    exAr: 'تناول الطعام الصحي يحافظ على يقظة عقلك ونشاطه.',
    contexts: [
      { en: 'My mother prepares delicious home-cooked food.', ar: 'تعد أمي طعاماً منزلياً لذيذاً.' },
      { en: 'Good food brings people together.', ar: 'الطعام الطيب يجمع الناس حول المائدة.' }
    ]
  },
  {
    word: 'house',
    arabic: 'منزل / بيت',
    level: 'A1',
    plural: 'houses',
    collocations: ['big house', 'at house', 'clean the house'],
    category: 'Home & Places',
    diff: 1,
    ex: 'They live in a beautiful and peaceful house.',
    exAr: 'يعيشون في منزل جميل وهادئ.',
    contexts: [
      { en: 'We renovated the old house last summer.', ar: 'جددنا المنزل القديم الصيف الماضي.' },
      { en: 'Welcome to our humble house.', ar: 'أهلاً وسهلاً بكم في منزلنا المتواضع.' }
    ]
  },
  {
    word: 'room',
    arabic: 'غرفة / حجرة',
    level: 'A1',
    plural: 'rooms',
    collocations: ['living room', 'quiet room', 'clean room'],
    category: 'Home & Places',
    diff: 1,
    ex: 'My study room is quiet and organized.',
    exAr: 'غرفة دراستي هادئة ومرتبة.',
    contexts: [
      { en: 'The hotel room has a stunning view.', ar: 'تتمتع غرفة الفندق بإطلالة رائعة.' },
      { en: 'Please keep your room tidy.', ar: 'يرجى الحفاظ على نظافة وترتيب غرفتك.' }
    ]
  },
  {
    word: 'door',
    arabic: 'باب',
    level: 'A1',
    plural: 'doors',
    collocations: ['front door', 'open the door', 'lock the door'],
    category: 'Home & Places',
    diff: 1,
    ex: 'Remember to lock the front door at night.',
    exAr: 'تذكر أن تقفل الباب الأمامي في الليل.',
    contexts: [
      { en: 'Someone knocked gently on the door.', ar: 'طرق شخص ما الباب برفق.' },
      { en: 'The door opened automatically.', ar: 'فتح الباب تلقائياً.' }
    ]
  },
  {
    word: 'window',
    arabic: 'نافذة / شباك',
    level: 'A1',
    plural: 'windows',
    collocations: ['open the window', 'big window', 'look out the window'],
    category: 'Home & Places',
    diff: 1,
    ex: 'Fresh morning breeze enters through the window.',
    exAr: 'نسيم الصباح العليل يدخل من النافذة.',
    contexts: [
      { en: 'She looked out the window at the rain.', ar: 'نظرت من النافذة إلى تساقط المطر.' },
      { en: 'Please close the window; it is windy outside.', ar: 'أغلق النافذة من فضلك؛ فالجو عاصف بالخارج.' }
    ]
  },
  {
    word: 'car',
    arabic: 'سيارة',
    level: 'A1',
    plural: 'cars',
    collocations: ['drive a car', 'electric car', 'park the car'],
    category: 'Travel & Transport',
    diff: 1,
    ex: 'He drives an electric car to work.',
    exAr: 'يقود سيارة كهربائية إلى العمل.',
    contexts: [
      { en: 'Where did you park the car?', ar: 'أين أوقفت السيارة؟' },
      { en: 'Cars should yield to pedestrians.', ar: 'يجب أن تعطي السيارات الأولوية للمشاة.' }
    ]
  },
  {
    word: 'book',
    arabic: 'كتاب',
    level: 'A1',
    plural: 'books',
    collocations: ['read a book', 'good book', 'grammar book'],
    category: 'Learning',
    diff: 1,
    ex: 'Reading a good book expands your perspective.',
    exAr: 'قراءة كتاب قيم توسع آفاق فكرك.',
    contexts: [
      { en: 'This English book contains clear explanations.', ar: 'يحتوي كتاب الإنجليزية هذا على شروحات واضحة.' },
      { en: 'I always carry a notebook in my bag.', ar: 'أحمل دائماً دفتراً في حقيبتي.' }
    ]
  },
  {
    word: 'city',
    arabic: 'مدينة',
    level: 'A1',
    plural: 'cities',
    collocations: ['big city', 'capital city', 'city center'],
    category: 'Places & Geography',
    diff: 1,
    ex: 'Public transportation in this city is very efficient.',
    exAr: 'وسائل النقل العام في هذه المدينة فعالة للغاية.',
    contexts: [
      { en: 'Cairo is a historic and vibrant city.', ar: 'القاهرة مدينة تاريخية مفعمة بالحيوية.' },
      { en: 'We visited several coastal cities last summer.', ar: 'زرنا عدة مدن ساحلية الصيف الماضي.' }
    ]
  },
  {
    word: 'money',
    arabic: 'مال / نقود',
    level: 'A1',
    plural: 'money',
    collocations: ['save money', 'spend money', 'pocket money'],
    category: 'Daily Life',
    diff: 1,
    ex: 'Learning to budget your money is an essential skill.',
    exAr: 'تعلم إدارة وتوفير أموالك مهارة أساسية في الحياة.',
    contexts: [
      { en: 'He saved enough money to start his project.', ar: 'ادخر ما يكفي من المال لبدء مشروعه.' },
      { en: 'Invest money in learning and self-growth.', ar: 'استثمر المال في التعلم والتطوير الذاتي.' }
    ]
  },

  // ===================== A2 NOUNS =====================
  {
    word: 'journey',
    arabic: 'رحلة / مسار',
    level: 'A2',
    plural: 'journeys',
    collocations: ['long journey', 'safe journey', 'learning journey'],
    category: 'Travel & Growth',
    diff: 2,
    ex: 'Mastering English is a wonderful personal journey.',
    exAr: 'إتقان اللغة الإنجليزية رحلة شخصية رائعة.',
    contexts: [
      { en: 'We wish you a very safe and pleasant journey.', ar: 'نتمنى لك رحلة آمنة وممتعة للغاية.' },
      { en: 'Every journey begins with a single step.', ar: 'تبدأ كل رحلة بخطوة واحدة.' }
    ]
  },
  {
    word: 'health',
    arabic: 'صحة / عافية',
    level: 'A2',
    plural: 'health',
    collocations: ['good health', 'mental health', 'health care'],
    category: 'Health & Wellness',
    diff: 2,
    ex: 'Regular exercise and balanced nutrition protect your health.',
    exAr: 'ممارسة الرياضة بانتظام والتغذية المتوازنة تحميان صحتك.',
    contexts: [
      { en: 'Sufficient sleep is vital for mental health.', ar: 'النوم الكافي ضروري جداً للصحة النفسية.' },
      { en: 'Good health is the foundation of happiness.', ar: 'الصحة والعافية هما أساس السعادة.' }
    ]
  },
  {
    word: 'opinion',
    arabic: 'رأي / وجهة نظر',
    level: 'A2',
    plural: 'opinions',
    collocations: ['in my opinion', 'express an opinion', 'second opinion'],
    category: 'Communication',
    diff: 2,
    ex: 'In my honest opinion, consistency is the key to fluency.',
    exAr: 'في رأيي الصادق، الاستمرار هو المفتاح الحقيقي للطلاقة.',
    contexts: [
      { en: 'Everyone has the right to share their opinion politely.', ar: 'لكل شخص الحق في التعبير عن رأيه بكل احترام.' },
      { en: 'I would like to hear your opinion on this matter.', ar: 'أود أن أسمع رأيك في هذا الأمر.' }
    ]
  },
  {
    word: 'solution',
    arabic: 'حل / مخرج من مشكلة',
    level: 'A2',
    plural: 'solutions',
    collocations: ['smart solution', 'find a solution', 'practical solution'],
    category: 'Problem Solving',
    diff: 2,
    ex: 'We found a smart and practical solution to the issue.',
    exAr: 'وجدنا حلاً ذكياً وعملياً للمشكلة.',
    contexts: [
      { en: 'Collaboration leads to creative solutions.', ar: 'التعاون يقود إلى حلول إبداعية.' },
      { en: 'Focus on the solution rather than the obstacle.', ar: 'ركز على الحل بدلاً من التركيز على العائق.' }
    ]
  },
  {
    word: 'schedule',
    arabic: 'جدول زمني / مواعيد',
    level: 'A2',
    plural: 'schedules',
    collocations: ['busy schedule', 'flexible schedule', 'study schedule'],
    category: 'Organization',
    diff: 2,
    ex: 'Setting a daily study schedule helps build positive habits.',
    exAr: 'تحديد جدول دراسي يومي يساعد في بناء عادات إيجابية.',
    contexts: [
      { en: 'Check your weekly schedule on the calendar.', ar: 'راجع جدولك الأسبوعي في التقويم.' },
      { en: 'Despite his busy schedule, he practices English daily.', ar: 'رغم جدول مواعيده الحافل، فهو يمارس الإنجليزية يومياً.' }
    ]
  },
  {
    word: 'conversation',
    arabic: 'محادثة / حوار',
    level: 'A2',
    plural: 'conversations',
    collocations: ['have a conversation', 'real conversation', 'casual conversation'],
    category: 'Communication',
    diff: 2,
    ex: 'Having real conversations builds genuine speaking confidence.',
    exAr: 'إجراء محادثات واقعية يبني ثقة حقيقية في التحدث.',
    contexts: [
      { en: 'We had an insightful conversation about cultural diversity.', ar: 'أجرينا محادثة ثرية حول التنوع الثقافي.' },
      { en: 'Practice short conversations every single day.', ar: 'تدرب على محادثات قصيرة كل يوم.' }
    ]
  },

  // ===================== B1 NOUNS =====================
  {
    word: 'opportunity',
    arabic: 'فرصة سانحة',
    level: 'B1',
    plural: 'opportunities',
    collocations: ['great opportunity', 'miss an opportunity', 'career opportunity'],
    category: 'Growth & Career',
    diff: 3,
    ex: 'Fluency in English unlocks unprecedented global career opportunities.',
    exAr: 'الطلاقة في الإنجليزية تفتح فرصاً مهنية عالمية غير مسبوقة.',
    contexts: [
      { en: 'Do not hesitate; seize this valuable opportunity.', ar: 'لا تتردد؛ بل اغتنم هذه الفرصة القيمة.' },
      { en: 'Every difficulty hides a promising opportunity.', ar: 'كل صعوبة تخفي في طياتها فرصة واعدة.' }
    ]
  },
  {
    word: 'challenge',
    arabic: 'تحدي',
    level: 'B1',
    plural: 'challenges',
    collocations: ['face a challenge', 'major challenge', 'overcome a challenge'],
    category: 'Mind & Growth',
    diff: 3,
    ex: 'Embrace every learning challenge with enthusiasm and grit.',
    exAr: 'استقبل كل تحدٍ تعليمي بحماس وعزيمة قوية.',
    contexts: [
      { en: 'Our team overcame a major technical challenge.', ar: 'تغلب فريقنا على تحدٍ تقني كبير.' },
      { en: 'Language learning is an exciting mental challenge.', ar: 'تعلم اللغات تحدٍ ذهني ممتع ومحفز.' }
    ]
  },
  {
    word: 'confidence',
    arabic: 'ثقة بالنفس',
    level: 'B1',
    plural: 'confidence',
    collocations: ['build confidence', 'self-confidence', 'speak with confidence'],
    category: 'Mind & Growth',
    diff: 3,
    ex: 'Practicing realistic sentences builds authentic self-confidence.',
    exAr: 'ممارسة الجمل الواقعية تبني ثقة حقيقية بالنفس.',
    contexts: [
      { en: 'She expressed her perspective with great confidence.', ar: 'عبرت عن وجهة نظرها بثقة عالية.' },
      { en: 'Confidence grows through repeated small victories.', ar: 'تنمو الثقة من خلال الانتصارات والخطوات الصغيرة المتتالية.' }
    ]
  },
  {
    word: 'strategy',
    arabic: 'استراتيجية / خطة مدروسة',
    level: 'B1',
    plural: 'strategies',
    collocations: ['effective strategy', 'study strategy', 'long-term strategy'],
    category: 'Planning',
    diff: 3,
    ex: 'An effective learning strategy saves time and accelerates fluency.',
    exAr: 'الاستراتيجية التعليمية الفعالة توفر الوقت وتسرع الوصول إلى الطلاقة.',
    contexts: [
      { en: 'The company devised a competitive digital strategy.', ar: 'وضعت الشركة استراتيجية رقمية تنافسية.' },
      { en: 'Spaced repetition is a proven memorization strategy.', ar: 'التكرار المتباعد استراتيجية حفظ مثبتة علمياً.' }
    ]
  },

  // ===================== B2 & C1 NOUNS =====================
  {
    word: 'methodology',
    arabic: 'منهجية علمية مدروسة',
    level: 'B2',
    plural: 'methodologies',
    collocations: ['research methodology', 'rigorous methodology', 'adopt a methodology'],
    category: 'Science & Education',
    diff: 4,
    ex: 'Our platform adopts a communicative and scientific language methodology.',
    exAr: 'تعتمد منصتنا منهجية لغوية علمية وتواصلية متقدمة.',
    contexts: [
      { en: 'The researchers explained their experimental methodology clearly.', ar: 'شرح الباحثون منهجيتهم التجريبية بوضوح تام.' },
      { en: 'A solid methodology guarantees reproducible results.', ar: 'تضمن المنهجية الرصينة نتائج دقيقة وموثوقة.' }
    ]
  },
  {
    word: 'perspective',
    arabic: 'منظور / وجهة نظر شمولية',
    level: 'B2',
    plural: 'perspectives',
    collocations: ['broader perspective', 'different perspective', 'fresh perspective'],
    category: 'Mind & Philosophy',
    diff: 4,
    ex: 'Learning new languages provides a broader perspective on global cultures.',
    exAr: 'تعلم لغات جديدة يمنحك منظوراً أوسع وأشمل للثقافات العالمية.',
    contexts: [
      { en: 'Travel offers a fresh perspective on life priorities.', ar: 'يتيح السفر منظوراً جديداً لأولويات الحياة.' },
      { en: 'We should listen to diverse perspectives before deciding.', ar: 'ينبغي لنا الاستماع إلى وجهات نظر متنوعة قبل اتخاذ القرار.' }
    ]
  },
  {
    word: 'integrity',
    arabic: 'نزاهة واستقامة أخلاقية',
    level: 'C1',
    plural: 'integrity',
    collocations: ['moral integrity', 'professional integrity', 'act with integrity'],
    category: 'Ethics & Leadership',
    diff: 5,
    ex: 'Authentic leaders inspire others by demonstrating unwavering moral integrity.',
    exAr: 'يلهم القادة الحقيقيون الآخرين من خلال التحلي بنزاهة واستقامة لا تتزعزع.',
    contexts: [
      { en: 'Academic integrity requires citing every referenced source.', ar: 'تتطلب النزاهة الأكاديمية توثيق كل مصدر تم الرجوع إليه.' },
      { en: 'Her spotless professional integrity gained widespread respect.', ar: 'نالت نزاهتها المهنية الخالصة احتراماً واسعاً.' }
    ]
  },
  {
    word: 'epiphany',
    arabic: 'إشراقة إدراك مفاجئة / وحي فكري',
    level: 'C1',
    plural: 'epiphanies',
    collocations: ['sudden epiphany', 'experience an epiphany', 'moment of epiphany'],
    category: 'Mind & Wisdom',
    diff: 5,
    ex: 'He experienced an inspiring epiphany that reshaped his entire life vision.',
    exAr: 'راودته إشراقة إدراك ملهمة أعادت صياغة رؤيته للحياة بالكامل.',
    contexts: [
      { en: 'In a moment of epiphany, the mathematical solution became obvious.', ar: 'في لحظة إدراك مفاجئة، أصبح الحل الرياضي بديهياً وواضحاً.' },
      { en: 'Many great discoveries begin with an unexpected epiphany.', ar: 'تبدأ العديد من الاكتشافات العظيمة بإشراقة فكرية غير متوقعة.' }
    ]
  },
  {
    word: 'equanimity',
    arabic: 'رباطة الجأش / هدوء النفس وسكينتها',
    level: 'PRO',
    plural: 'equanimity',
    collocations: ['mental equanimity', 'face adversity with equanimity', 'serene equanimity'],
    category: 'Wisdom & Leadership',
    diff: 5,
    ex: 'A seasoned diplomat navigates turbulent geopolitical crises with serene equanimity.',
    exAr: 'يدير الدبلوماسي المحنك الأزمات الجيوسياسية المضطربة برباطة جأش وهدوء وسكينة تامة.',
    contexts: [
      { en: 'Maintaining inner equanimity under severe pressure is true mastery.', ar: 'الحفاظ على السكينة الداخلية تحت الضغط الشديد قمة الاتزان والحكمة.' },
      { en: 'She accepted both triumph and setback with dignified equanimity.', ar: 'استقبلت كلاً من النجاح والتعثر برباطة جأش كريمة وهادئة.' }
    ]
  },
  {
    word: 'mother',
    arabic: 'أم / والدة',
    level: 'A1',
    plural: 'mothers',
    collocations: ['loving mother', 'working mother', 'mother and child'],
    category: 'Family',
    diff: 1,
    ex: 'My mother prepares healthy, warm meals with love every day.',
    exAr: 'تعد أمي وجبات صحية ودافئة بكل محبة كل يوم.',
    contexts: [
      { en: 'A mother\'s encouragement builds lifelong self-confidence.', ar: 'تشجيع الأم يبني ثقة بالنفس تدوم طوال العمر.' },
      { en: 'She is a dedicated and loving mother of three.', ar: 'إنها أم متفانية ومحبة لأطفالها الثلاثة.' }
    ]
  },
  {
    word: 'father',
    arabic: 'أب / والد',
    level: 'A1',
    plural: 'fathers',
    collocations: ['proud father', 'wise father', 'father figure'],
    category: 'Family',
    diff: 1,
    ex: 'My father is a kind, hardworking person who values education.',
    exAr: 'أبي شخص طيب القلب ومجد في عمله ويقدر العلم والمعرفة.',
    contexts: [
      { en: 'My father taught me the importance of honesty and perseverance.', ar: 'علمني والدي أهمية الصدق والمثابرة في الحياة.' },
      { en: 'He takes great joy in being an attentive father.', ar: 'يسعد كثيراً بكونه أباً مهتماً وراعياً لأسرته.' }
    ]
  },
  {
    word: 'brother',
    arabic: 'أخ',
    level: 'A1',
    plural: 'brothers',
    collocations: ['older brother', 'younger brother', 'brotherly support'],
    category: 'Family',
    diff: 1,
    ex: 'I practice speaking English with my older brother every evening.',
    exAr: 'أتدرب على التحدث بالإنجليزية مع أخي الأكبر كل مساء.',
    contexts: [
      { en: 'My brother studies computer engineering at the national university.', ar: 'يدرس أخي هندسة الحاسوب في الجامعة الوطنية.' },
      { en: 'Brothers stand by each other in challenging times.', ar: 'يقف الإخوة إلى جانب بعضهم البعض في الأوقات الصعبة.' }
    ]
  },
  {
    word: 'sister',
    arabic: 'أخت',
    level: 'A1',
    plural: 'sisters',
    collocations: ['older sister', 'younger sister', 'close sister'],
    category: 'Family',
    diff: 1,
    ex: 'My sister is a talented designer who speaks three languages.',
    exAr: 'أختي مصممة موهوبة وتتحدث ثلاث لغات بطلاقة.',
    contexts: [
      { en: 'I borrowed an insightful English book from my sister.', ar: 'استعرت كتاباً مفيداً باللغة الإنجليزية من أختي.' },
      { en: 'We celebrated my sister\'s academic graduation yesterday.', ar: 'احتفلنا بتخرج أختي الأكاديمي بالأمس.' }
    ]
  },
  {
    word: 'child',
    arabic: 'طفل',
    level: 'A1',
    plural: 'children',
    collocations: ['young child', 'happy child', 'curious child'],
    category: 'Family & People',
    diff: 1,
    ex: 'The curious child asks thoughtful questions about everything around him.',
    exAr: 'يطرح الطفل الفضولي أسئلة ذكية عن كل ما يحيط به.',
    contexts: [
      { en: 'Every child deserves an inspiring learning environment.', ar: 'يستحق كل طفل بيئة تعليمية ملهمة ومحفزة.' },
      { en: 'Children acquire new languages quickly through interactive play.', ar: 'يكتسب الأطفال اللغات الجديدة بسرعة عبر اللعب التفاعلي.' }
    ]
  },
  {
    word: 'student',
    arabic: 'طالب / متعلم',
    level: 'A1',
    plural: 'students',
    collocations: ['diligent student', 'university student', 'language student'],
    category: 'Education',
    diff: 1,
    ex: 'Every diligent student makes steady progress through consistent practice.',
    exAr: 'يحقق كل طالب مجتهد تقدماً ثابتاً من خلال الممارسة المنتظمة.',
    contexts: [
      { en: 'The students participated actively in the classroom debate.', ar: 'شارك الطلاب بفاعلية في مناقشة الفصل الدراسي.' },
      { en: 'She is an ambitious university student pursuing medical studies.', ar: 'إنها طالبة جامعية طموحة تدرس الطب.' }
    ]
  },
  {
    word: 'teacher',
    arabic: 'معلم / أستاذ',
    level: 'A1',
    plural: 'teachers',
    collocations: ['English teacher', 'experienced teacher', 'dedicated teacher'],
    category: 'Education',
    diff: 1,
    ex: 'Our English teacher explains difficult grammar with crystal clarity.',
    exAr: 'يشرح معلم اللغة الإنجليزية القواعد الصعبة بوضوح فائق وسلاسة.',
    contexts: [
      { en: 'An inspiring teacher leaves a positive mark on students\' lives.', ar: 'يترك المعلم الملهم أثراً إيجابياً في حياة طلابه.' },
      { en: 'We expressed our sincere gratitude to the dedicated teacher.', ar: 'أعربنا عن امتناننا الصادق للمعلم المتفاني.' }
    ]
  },
  {
    word: 'table',
    arabic: 'طاولة / مائدة',
    level: 'A1',
    plural: 'tables',
    collocations: ['dining table', 'study table', 'wooden table'],
    category: 'Home & Daily',
    diff: 1,
    ex: 'Dinner is served on the wooden dining table in the kitchen.',
    exAr: 'العشاء جاهز على مائدة الطعام الخشبية في المطبخ.',
    contexts: [
      { en: 'Keep your study table neat and free of clutter.', ar: 'حافظ على ترتيب طاولة دراستك ونظافتها لتساعدك على التركيز.' },
      { en: 'Both negotiators sat down at the table to reach an agreement.', ar: 'جلس المفاوضون إلى الطاولة للتوصل إلى اتفاق مشترك.' }
    ]
  },
  {
    word: 'chair',
    arabic: 'كرسي',
    level: 'A1',
    plural: 'chairs',
    collocations: ['comfortable chair', 'desk chair', 'empty chair'],
    category: 'Home & Daily',
    diff: 1,
    ex: 'Pull up a comfortable chair and join our English conversation.',
    exAr: 'اسحب كرسياً مريحاً وانضم إلى محادثتنا باللغة الإنجليزية.',
    contexts: [
      { en: 'An ergonomic chair prevents fatigue during long study sessions.', ar: 'الكرسي المريح يمنع التعب والإجهاد أثناء جلسات الدراسة الطويلة.' },
      { en: 'He was elected as the new committee chair.', ar: 'تم انتخابه رئيساً جديداً للجنة.' }
    ]
  },
  {
    word: 'phone',
    arabic: 'هاتف / جوال',
    level: 'A1',
    plural: 'phones',
    collocations: ['smart phone', 'answer the phone', 'phone call'],
    category: 'Technology',
    diff: 1,
    ex: 'I use my smartphone to listen to English audio lessons every morning.',
    exAr: 'أستخدم هاتفي الذكي للاستماع إلى الدروس الصوتية بالإنجليزية كل صباح.',
    contexts: [
      { en: 'Please silence your phone during the listening test.', ar: 'يرجى وضع هاتفك في الوضع الصامت أثناء اختبار الاستماع.' },
      { en: 'She received an important phone call regarding her application.', ar: 'تلقت مكالمة هاتفية مهمة بخصوص طلب تقديمها.' }
    ]
  },
  {
    word: 'computer',
    arabic: 'حاسوب / كمبيوتر',
    level: 'A1',
    plural: 'computers',
    collocations: ['laptop computer', 'desktop computer', 'computer screen'],
    category: 'Technology',
    diff: 1,
    ex: 'A computer is a powerful learning tool when used with discipline.',
    exAr: 'يعد الحاسوب أداة تعليمية قوية وفعالة عند استخدامه بانضباط.',
    contexts: [
      { en: 'He writes professional English reports on his laptop computer.', ar: 'يكتب تقارير مهنية باللغة الإنجليزية على حاسوبه المحمول.' },
      { en: 'Modern computers allow interactive language simulations.', ar: 'تتيح الحواسيب الحديثة محاكاة تفاعلية لممارسة اللغات.' }
    ]
  },
  {
    word: 'bread',
    arabic: 'خبز',
    level: 'A1',
    plural: 'bread',
    collocations: ['fresh bread', 'warm bread', 'slice of bread'],
    category: 'Food',
    diff: 1,
    ex: 'The neighborhood bakery produces fresh, warm bread early every morning.',
    exAr: 'ينتج المخبز المحلي خبزاً طازجاً ودافئاً في الصباح الباكر كل يوم.',
    contexts: [
      { en: 'Whole grain bread is a wholesome source of energy.', ar: 'خبز الحبوب الكاملة مصدر مغذٍ وصحي للطاقة.' },
      { en: 'We enjoyed soup with fresh bread for lunch.', ar: 'استمتعنا بتناول الحساء مع الخبز الطازج على وجبة الغداء.' }
    ]
  },
  {
    word: 'milk',
    arabic: 'حليب',
    level: 'A1',
    plural: 'milk',
    collocations: ['fresh milk', 'warm milk', 'glass of milk'],
    category: 'Food & Drinks',
    diff: 1,
    ex: 'A glass of warm milk helps soothe the mind before a restful sleep.',
    exAr: 'كوب من الحليب الدافئ يساعد على تهدئة الذهن والنوم الهادئ والمريح.',
    contexts: [
      { en: 'Fresh milk provides essential calcium for healthy bones.', ar: 'يوفر الحليب الطازج الكالسيوم الأساسي لصحة العظام.' },
      { en: 'She added a dash of cold milk to her morning coffee.', ar: 'أضافت القليل من الحليب البارد إلى قهوتها الصباحية.' }
    ]
  },
  {
    word: 'day',
    arabic: 'يوم',
    level: 'A1',
    plural: 'days',
    collocations: ['sunny day', 'every day', 'day by day'],
    category: 'Time',
    diff: 1,
    ex: 'Today is a wonderful sunny day to take a walk and review new words.',
    exAr: 'اليوم يوم مشمس ورائع للمشي ومراجعة الكلمات الجديدة في الهواء الطلق.',
    contexts: [
      { en: 'Practicing ten minutes every day is better than studying once a week.', ar: 'التدرب لمدة عشر دقائق كل يوم خير من المذاكرة لمرة واحدة في الأسبوع.' },
      { en: 'Day by day, your speaking skills will grow stronger.', ar: 'يوماً بعد يوم، ستصبح مهاراتك في التحدث أكثر قوة وثقة.' }
    ]
  },
  {
    word: 'week',
    arabic: 'أسبوع',
    level: 'A1',
    plural: 'weeks',
    collocations: ['last week', 'next week', 'busy week'],
    category: 'Time',
    diff: 1,
    ex: 'I dedicate five hours each week to focused English conversation drills.',
    exAr: 'أخصص خمس ساعات كل أسبوع لتدريبات المحادثة المركزة في اللغة الإنجليزية.',
    contexts: [
      { en: 'We successfully reached our weekly study goals.', ar: 'حققنا أهدافنا الدراسية الأسبوعية بنجاح وتميز.' },
      { en: 'I have a very busy work schedule next week.', ar: 'لدي جدول أعمال حافل بالمهام في الأسبوع القادم.' }
    ]
  },
  {
    word: 'month',
    arabic: 'شهر',
    level: 'A1',
    plural: 'months',
    collocations: ['this month', 'next month', 'in a month'],
    category: 'Time',
    diff: 1,
    ex: 'You will achieve noticeable fluency gains within just one month of daily drill.',
    exAr: 'ستحقق قفزة ملحوظة في طلاقتك خلال شهر واحد فقط من التدريب اليومي.',
    contexts: [
      { en: 'She read three English books in a single month.', ar: 'قرأت ثلاثة كتب باللغة الإنجليزية في شهر واحد.' },
      { en: 'Plan your learning milestones at the start of each month.', ar: 'خطط لمحطات وأهداف تعلمك في مطلع كل شهر.' }
    ]
  },
  {
    word: 'year',
    arabic: 'سنة / عام',
    level: 'A1',
    plural: 'years',
    collocations: ['new year', 'last year', 'year after year'],
    category: 'Time',
    diff: 1,
    ex: 'A single year of disciplined learning can transform your international career.',
    exAr: 'عام واحد من التعلم المنضبط كفيل بإحداث تحول جذري في مسارك المهني والدولي.',
    contexts: [
      { en: 'She lived in London for an entire year to hone her accent.', ar: 'عاشت في لندن لعام كامل لصقل لكنتها وطلاقتها.' },
      { en: 'Happy New Year! May this year bring you fluency and success.', ar: 'عام جديد مبارك! عسى أن يحمل لك هذا العام الطلاقة والنجاح.' }
    ]
  },
  {
    word: 'hand',
    arabic: 'يد',
    level: 'A1',
    plural: 'hands',
    collocations: ['right hand', 'left hand', 'helping hand'],
    category: 'Body & Life',
    diff: 1,
    ex: 'Always wash your hands thoroughly with soap and warm water before meals.',
    exAr: 'اغسل يديك دائماً جيداً بالماء الدافئ والصابون قبل تناول الطعام.',
    contexts: [
      { en: 'Raise your hand if you know the answer to the question.', ar: 'ارفع يدك إذا كنت تعرف الإجابة الصحيحة على السؤال.' },
      { en: 'He offered a warm helping hand to his new classmate.', ar: 'مد يد العون والمساعدة الودية لزميله الجديد في الفصل.' }
    ]
  },
  {
    word: 'problem',
    arabic: 'مشكلة / مسألة',
    level: 'A2',
    plural: 'problems',
    collocations: ['solve a problem', 'major problem', 'practical problem'],
    category: 'Mind & Growth',
    diff: 2,
    ex: 'Break any complex problem down into small, actionable steps.',
    exAr: 'قسّم أي مشكلة معقدة إلى خطوات صغيرة قابلة للحل والتنفيذ.',
    contexts: [
      { en: 'We worked together to solve the grammatical problem.', ar: 'عملنا معاً لحل المسألة النحوية المعقدة.' },
      { en: 'Viewing problems as learning opportunities accelerates maturity.', ar: 'النظر إلى المشكلات كفرص للتعلم يسرع من النضج واكتساب الخبرة.' }
    ]
  },
  {
    word: 'reason',
    arabic: 'سبب / دافع / عقل',
    level: 'A2',
    plural: 'reasons',
    collocations: ['good reason', 'main reason', 'stand to reason'],
    category: 'Mind & Logic',
    diff: 2,
    ex: 'The main reason to study English is to connect with people and cultures.',
    exAr: 'السبب الرئيسي لدراسة الإنجليزية هو التواصل مع الناس وثقافات العالم.',
    contexts: [
      { en: 'Give me one solid reason why this solution is superior.', ar: 'أعطني سبباً وجيهاً وقوياً يوضح تفوق هذا الحل.' },
      { en: 'For that reason, we chose a structured daily routine.', ar: 'لهذا السبب بالذات، اخترنا جدولاً يومياً منظماً ومحكماً.' }
    ]
  },
  {
    word: 'result',
    arabic: 'نتيجة / محصلة',
    level: 'A2',
    plural: 'results',
    collocations: ['test results', 'positive result', 'as a result'],
    category: 'Achievement',
    diff: 2,
    ex: 'Your examination results reflected the high quality of your daily effort.',
    exAr: 'عكست نتائج اختبارك الجودة العالية لجهدك اليومي ومثابرتك.',
    contexts: [
      { en: 'As a result of daily practice, his vocabulary expanded dramatically.', ar: 'ونتيجة للممارسة اليومية، اتسعت حصيلته اللغوية بشكل لافت.' },
      { en: 'Consistent discipline produces dependable results.', ar: 'الانضباط المستمر يثمر نتائج موثوقة ومبهرة.' }
    ]
  },
  {
    word: 'habit',
    arabic: 'عادة سلوكية',
    level: 'A2',
    plural: 'habits',
    collocations: ['good habit', 'daily habit', 'break a habit'],
    category: 'Daily Routine',
    diff: 2,
    ex: 'Reading fifteen pages of English every morning is an empowering lifelong habit.',
    exAr: 'قراءة خمس عشرة صفحة بالإنجليزية كل صباح عادة ملهمة تثري الحياة.',
    contexts: [
      { en: 'Building a constructive study habit takes consistent daily commitment.', ar: 'بناء عادة دراسية بناءة يتطلب التزاماً يومياً صادقاً.' },
      { en: 'Replace counterproductive habits with active language listening.', ar: 'استبدل العادات غير المجدية بالاستماع الفعال لمقاطع اللغة الإنجليزية.' }
    ]
  },
  {
    word: 'language',
    arabic: 'لغة',
    level: 'A2',
    plural: 'languages',
    collocations: ['foreign language', 'body language', 'native language'],
    category: 'Communication',
    diff: 2,
    ex: 'English is a global bridge language that opens doors to worldwide cooperation.',
    exAr: 'اللغة الإنجليزية لغة تواصل عالمية تفتح آفاق التعاون بين شعوب العالم.',
    contexts: [
      { en: 'Learning a second language expands how your brain processes ideas.', ar: 'تعلم لغة ثانية يوسع ويعزز طريقة معالجة عقلك للأفكار والمفاهيم.' },
      { en: 'Body language conveys subtle emotional nuances in conversation.', ar: 'تنقل لغة الجسد فروقاً عاطفية وتعبيرية دقيقة أثناء الحوار.' }
    ]
  },
  {
    word: 'culture',
    arabic: 'ثقافة / حضارة',
    level: 'A2',
    plural: 'cultures',
    collocations: ['rich culture', 'diverse cultures', 'cultural exchange'],
    category: 'Society',
    diff: 2,
    ex: 'Mastering English gives you direct access to the rich culture and literature of the world.',
    exAr: 'يمنحك إتقان الإنجليزية وصولاً مباشراً إلى ثقافة العالم وآدابه العريقة.',
    contexts: [
      { en: 'Cultural awareness prevents misunderstandings in international teams.', ar: 'الوعي الثقافي يمنع سوء الفهم في فرق العمل الدولية متعددة الجنسيات.' },
      { en: 'Literature serves as a mirror reflecting the soul of a culture.', ar: 'يعمل الأدب كمرآة عاكسة لروح الثقافة وحضارتها.' }
    ]
  },
  {
    word: 'future',
    arabic: 'مستقبل',
    level: 'A2',
    plural: 'futures',
    collocations: ['bright future', 'near future', 'future generations'],
    category: 'Time & Growth',
    diff: 2,
    ex: 'Invest in your language and professional competencies for a brighter future.',
    exAr: 'استثمر في كفاءتك اللغوية والمهنية من أجل مستقبل مشرق ومزدهر.',
    contexts: [
      { en: 'The future belongs to those who embrace continuous self-education.', ar: 'المستقبل ملك لأولئك الذين يقبلون على التعلم الذاتي المستمر بشغف.' },
      { en: 'We look toward the future with genuine optimism and confidence.', ar: 'نتطلع إلى المستقبل بتفاؤل صادق وثقة راسخة.' }
    ]
  }
];

export function getCleanNounsList(): WordItem[] {
  return CLEAN_NOUNS.map((n) => ({
    id: `n_${n.word}`,
    word: n.word,
    arabic: n.arabic,
    type: 'noun',
    level: n.level,
    difficulty: n.diff,
    frequency: n.diff <= 2 ? 'Essential' : n.diff <= 4 ? 'Very High' : 'High',
    category: n.category,
    exampleSentence: n.ex,
    exampleSentenceAr: n.exAr,
    nounForms: {
      plural: n.plural,
      isCountable: n.plural !== n.word,
      collocations: n.collocations,
      contextSentences: n.contexts?.map(c => c.en) || [n.ex],
      contextSentencesAr: n.contexts?.map(c => c.ar) || [n.exAr],
    },
  }));
}
