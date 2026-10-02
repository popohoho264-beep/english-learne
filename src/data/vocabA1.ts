import { WordItem } from '../types';
import { createVerb, createNoun } from './vocabBase';

export const vocabA1: WordItem[] = [
  // VERBS A1
  createVerb(
    'v_go', 'go', 'يذهب', 'A1',
    { past: 'went', pastParticiple: 'gone', thirdPerson: 'goes', continuous: 'going' },
    {
      present: 'I go to school every day.',
      past: 'I went to school yesterday.',
      future: 'I will go to school tomorrow.',
      presentAr: 'أنا أذهب إلى المدرسة كل يوم.',
      pastAr: 'أنا ذهبت إلى المدرسة بالأمس.',
      futureAr: 'سأذهب إلى المدرسة غداً.'
    },
    'Daily Routine', 1, 'Essential'
  ),
  createVerb(
    'v_eat', 'eat', 'يأكل', 'A1',
    { past: 'ate', pastParticiple: 'eaten', thirdPerson: 'eats', continuous: 'eating' },
    {
      present: 'I eat breakfast at 7 AM.',
      past: 'I ate a delicious apple this morning.',
      future: 'I will eat lunch with my friend tomorrow.',
      presentAr: 'أتناول الإفطار في السابعة صباحاً.',
      pastAr: 'أكلت تفاحة لذيذة هذا الصباح.',
      futureAr: 'سأتناول الغداء مع صديقي غداً.'
    },
    'Food & Health', 1, 'Essential'
  ),
  createVerb(
    'v_drink', 'drink', 'يشرب', 'A1',
    { past: 'drank', pastParticiple: 'drunk', thirdPerson: 'drinks', continuous: 'drinking' },
    {
      present: 'She drinks water every morning.',
      past: 'She drank cold juice after the walk.',
      future: 'She will drink warm tea tonight.',
      presentAr: 'هي تشرب الماء كل صباح.',
      pastAr: 'هي شربت عصيراً بارداً بعد المشي.',
      futureAr: 'هي ستشرب شاياً دافئاً الليلة.'
    },
    'Food & Health', 1, 'Essential'
  ),
  createVerb(
    'v_sleep', 'sleep', 'ينام', 'A1',
    { past: 'slept', pastParticiple: 'slept', thirdPerson: 'sleeps', continuous: 'sleeping' },
    {
      present: 'I sleep eight hours every night.',
      past: 'I slept early last night.',
      future: 'I will sleep after I finish my homework.',
      presentAr: 'أنام ثماني ساعات كل ليلة.',
      pastAr: 'نمت مبكراً الليلة الماضية.',
      futureAr: 'سأنام بعد أن أنهي واجبي المنزلي.'
    },
    'Daily Routine', 1, 'Essential'
  ),
  createVerb(
    'v_read', 'read', 'يقرأ', 'A1',
    { past: 'read', pastParticiple: 'read', thirdPerson: 'reads', continuous: 'reading' },
    {
      present: 'We read simple stories in English.',
      past: 'We read a great book last week.',
      future: 'We will read the new chapter tomorrow.',
      presentAr: 'نحن نقرأ قصصاً بسيطة بالإنجليزية.',
      pastAr: 'قرأنا كتاباً رائعاً الأسبوع الماضي.',
      futureAr: 'سنقرأ الفصل الجديد غداً.'
    },
    'Learning', 1, 'Essential'
  ),
  createVerb(
    'v_write', 'write', 'يكتب', 'A1',
    { past: 'wrote', pastParticiple: 'written', thirdPerson: 'writes', continuous: 'writing' },
    {
      present: 'He writes emails to his colleagues.',
      past: 'He wrote a letter to his mother.',
      future: 'He will write an article next month.',
      presentAr: 'هو يكتب رسائل بريد إلكتروني لزملائه.',
      pastAr: 'كتب رسالة لوالدته.',
      futureAr: 'سيكتب مقالاً الشهر القادم.'
    },
    'Communication', 1, 'Essential'
  ),
  createVerb(
    'v_speak', 'speak', 'يتحدث / يتكلم', 'A1',
    { past: 'spoke', pastParticiple: 'spoken', thirdPerson: 'speaks', continuous: 'speaking' },
    {
      present: 'I speak English with my teacher.',
      past: 'I spoke to the doctor yesterday.',
      future: 'I will speak at the meeting tomorrow.',
      presentAr: 'أتحدث الإنجليزية مع معلمي.',
      pastAr: 'تحدثت مع الطبيب بالأمس.',
      futureAr: 'سأتحدث في الاجتماع غداً.'
    },
    'Communication', 1, 'Essential'
  ),
  createVerb(
    'v_listen', 'listen', 'يستمع', 'A1',
    { past: 'listened', pastParticiple: 'listened', thirdPerson: 'listens', continuous: 'listening' },
    {
      present: 'They listen to English podcasts regularly.',
      past: 'They listened to music on the bus.',
      future: 'They will listen to the audio lesson later.',
      presentAr: 'هم يستمعون إلى بودكاست إنجليزي بانتظام.',
      pastAr: 'استمعوا إلى الموسيقى في الحافلة.',
      futureAr: 'سيستمعون إلى الدرس الصوتي لاحقاً.'
    },
    'Learning', 1, 'Essential'
  ),
  createVerb(
    'v_see', 'see', 'يرى', 'A1',
    { past: 'saw', pastParticiple: 'seen', thirdPerson: 'sees', continuous: 'seeing' },
    {
      present: 'I see a beautiful bird outside.',
      past: 'I saw my friend at the park yesterday.',
      future: 'I will see you at the office tomorrow.',
      presentAr: 'أرى طائراً جميلاً بالخارج.',
      pastAr: 'رأيت صديقي في الحديقة بالأمس.',
      futureAr: 'سأراك في المكتب غداً.'
    },
    'Senses', 1, 'Essential'
  ),
  createVerb(
    'v_buy', 'buy', 'يشتري', 'A1',
    { past: 'bought', pastParticiple: 'bought', thirdPerson: 'buys', continuous: 'buying' },
    {
      present: 'She buys fresh bread every morning.',
      past: 'She bought a warm coat yesterday.',
      future: 'She will buy groceries this afternoon.',
      presentAr: 'هي تشتري خبزاً طازجاً كل صباح.',
      pastAr: 'اشترت معطفاً دافئاً بالأمس.',
      futureAr: 'ستشتري مواد تموينية بعد ظهر اليوم.'
    },
    'Shopping', 1, 'Essential'
  ),
  createVerb(
    'v_work', 'work', 'يعمل', 'A1',
    { past: 'worked', pastParticiple: 'worked', thirdPerson: 'works', continuous: 'working' },
    {
      present: 'I work at a local tech company.',
      past: 'I worked late hours on Monday.',
      future: 'I will work remotely from home tomorrow.',
      presentAr: 'أعمل في شركة تقنية محلية.',
      pastAr: 'عملت لساعات متأخرة يوم الإثنين.',
      futureAr: 'سأعمل عن بُعد من المنزل غداً.'
    },
    'Work & Business', 1, 'Essential'
  ),
  createVerb(
    'v_live', 'live', 'يعيش / يسكن', 'A1',
    { past: 'lived', pastParticiple: 'lived', thirdPerson: 'lives', continuous: 'living' },
    {
      present: 'They live in a quiet neighborhood.',
      past: 'They lived in Cairo five years ago.',
      future: 'They will live abroad next year.',
      presentAr: 'يعيشون في حي هادئ.',
      pastAr: 'عاشوا في القاهرة قبل خمس سنوات.',
      futureAr: 'سيعيشون في الخارج العام القادم.'
    },
    'Home & Family', 1, 'Essential'
  ),

  // NOUNS A1
  createNoun(
    'n_house', 'house', 'منزل / بيت', 'A1', 'houses',
    ['big house', 'clean house', 'move into a house'],
    [
      { en: 'We have a warm and comfortable house.', ar: 'لدينا منزل دافئ ومريح.' },
      { en: 'They bought an old house near the lake.', ar: 'اشتروا بيتاً قديماً بالقرب من البحيرة.' },
      { en: 'Please make yourself at home in our house.', ar: 'تفضل واعتبر نفسك في منزلك في بيتنا.' }
    ],
    'Home & Places', 1, 'Essential'
  ),
  createNoun(
    'n_water', 'water', 'ماء', 'A1', 'water',
    ['fresh water', 'glass of water', 'drink water'],
    [
      { en: 'Drinking clean water is essential for your body.', ar: 'شرب الماء النظيف ضروري لجسدك.' },
      { en: 'He poured a cold glass of water for his guest.', ar: 'سكب كأساً من الماء البارد لضيفه.' },
      { en: 'Always carry a bottle of water during hot days.', ar: 'احمل دائماً زجاجة ماء في الأيام الحارة.' }
    ],
    'Food & Health', 1, 'Essential'
  ),
  createNoun(
    'n_book', 'book', 'كتاب', 'A1', 'books',
    ['good book', 'open a book', 'borrow a book'],
    [
      { en: 'She is reading an interesting book right now.', ar: 'هي تقرأ كتاباً شيقاً في الوقت الحالي.' },
      { en: 'I placed the English grammar book on the table.', ar: 'وضعت كتاب قواعد الإنجليزية على الطاولة.' },
      { en: 'This book contains hundreds of useful examples.', ar: 'يحتوي هذا الكتاب على مئات الأمثلة المفيدة.' }
    ],
    'Learning', 1, 'Essential'
  ),
  createNoun(
    'n_school', 'school', 'مدرسة', 'A1', 'schools',
    ['go to school', 'high school', 'after school'],
    [
      { en: 'The children walk to school together.', ar: 'يمشي الأطفال إلى المدرسة معاً.' },
      { en: 'Our school has a modern library and sports field.', ar: 'مدرستنا بها مكتبة حديثة وملعب رياضي.' },
      { en: 'She teaches mathematics at the public school.', ar: 'هي تدرس الرياضيات في المدرسة الحكومية.' }
    ],
    'Learning', 1, 'Essential'
  ),
  createNoun(
    'n_friend', 'friend', 'صديق', 'A1', 'friends',
    ['best friend', 'close friend', 'make friends'],
    [
      { en: 'A true friend is always there to support you.', ar: 'الصديق الحقيقي يدعمك دائماً.' },
      { en: 'I met my best friend ten years ago.', ar: 'التقيت بأفضل صديق لي قبل عشر سنوات.' },
      { en: 'It is easy to make friends when you are polite.', ar: 'من السهل تكوين صداقات عندما تكون مهذباً.' }
    ],
    'Relationships', 1, 'Essential'
  ),
  createNoun(
    'n_family', 'family', 'عائلة / أسرة', 'A1', 'families',
    ['large family', 'spend time with family', 'family member'],
    [
      { en: 'My family gathers for dinner every Friday.', ar: 'تجتمع عائلتي لتناول العشاء كل جمعة.' },
      { en: 'He loves spending time with his supportive family.', ar: 'هو يحب قضاء الوقت مع عائلته الداعمة.' },
      { en: 'Family comes first in many important decisions.', ar: 'تأتي العائلة أولاً في العديد من القرارات الهامة.' }
    ],
    'Home & Family', 1, 'Essential'
  ),
  createNoun(
    'n_car', 'car', 'سيارة', 'A1', 'cars',
    ['drive a car', 'park a car', 'electric car'],
    [
      { en: 'He drives his car to the city center every day.', ar: 'يقود سيارته إلى مركز المدينة كل يوم.' },
      { en: 'She parked the car in front of the supermarket.', ar: 'أوقفت السيارة أمام السوبرماركت.' },
      { en: 'Modern electric cars are quiet and efficient.', ar: 'السيارات الكهربائية الحديثة هادئة وفعالة.' }
    ],
    'Transportation', 1, 'Essential'
  ),
  createNoun(
    'n_city', 'city', 'مدينة', 'A1', 'cities',
    ['big city', 'visit a city', 'city center'],
    [
      { en: 'This city has great public transport.', ar: 'هذه المدينة تتمتع بوسائل نقل عام رائعة.' },
      { en: 'We spent the weekend exploring the ancient city.', ar: 'قضينا عطلة نهاية الأسبوع في استكشاف المدينة القديمة.' },
      { en: 'Living in a major city can be exciting.', ar: 'العيش في مدينة كبرى يمكن أن يكون مثيراً.' }
    ],
    'Travel & Places', 1, 'Essential'
  ),
  createNoun(
    'n_job', 'job', 'وظيفة / عمل', 'A1', 'jobs',
    ['find a job', 'good job', 'full-time job'],
    [
      { en: 'He is searching for a full-time job in sales.', ar: 'هو يبحث عن وظيفة بدوام كامل في المبيعات.' },
      { en: 'She did a fantastic job on the presentation.', ar: 'لقد قامت بعمل رائع في العرض التقديمي.' },
      { en: 'Having a fulfilling job gives you purpose.', ar: 'امتلاك وظيفة مجزية يمنحك هدفاً.' }
    ],
    'Work & Business', 1, 'Essential'
  ),
  createNoun(
    'n_time', 'time', 'وقت / زمن', 'A1', 'times',
    ['free time', 'on time', 'spend time'],
    [
      { en: 'What time does the train arrive?', ar: 'في أي وقت يصل القطار؟' },
      { en: 'Please arrive on time for the morning interview.', ar: 'يرجى الوصول في الوقت المحدد للمقابلة الصباحية.' },
      { en: 'I spend my free time learning new languages.', ar: 'أقضي وقت فراغي في تعلم لغات جديدة.' }
    ],
    'General', 1, 'Essential'
  )
];
