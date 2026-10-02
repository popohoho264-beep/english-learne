import { GrammarTopic } from '../types';

export const grammarTopics: GrammarTopic[] = [
  {
    id: 'g_present_simple',
    title: 'Present Simple',
    titleAr: 'المضارع البسيط',
    level: 'A1',
    formula: 'Subject + Verb(s/es) + Object',
    description: 'Used for daily routines, permanent habits, and universal facts.',
    descriptionAr: 'يُستخدم للتعبير عن العادات اليومية، الروتين المتكرر، والحقائق العلمية الثابتة.',
    keyPoints: [
      'Add -s or -es with he, she, it (e.g. He speaks, She watches)',
      'Use "do/does" for questions and "do not / does not" for negatives',
      'Keywords: always, usually, often, sometimes, never, every day'
    ],
    keyPointsAr: [
      'نضيف s أو es مع المفرد الغائب (He, She, It)',
      'نستخدم do/does في السؤال، و don\'t / doesn\'t في النفي',
      'الكلمات الدالة: always, usually, often, sometimes, every day'
    ],
    examples: [
      { en: 'I drink water every morning.', ar: 'أنا أشرب الماء كل صباح.', highlightWord: 'drink' },
      { en: 'She works at an international hospital.', ar: 'هي تعمل في مستشفى دولي.', highlightWord: 'works' },
      { en: 'The sun rises in the east.', ar: 'تشرق الشمس من الشرق (حقيقة علمية).', highlightWord: 'rises' },
      { en: 'They do not drink coffee at night.', ar: 'هم لا يشربون القهوة في الليل.', highlightWord: 'do not drink' }
    ],
    exercise: [
      {
        question: 'Sarah _____ to the gym three times a week.',
        questionAr: 'سارة _____ إلى النادي الرياضي ثلاث مرات أسبوعياً.',
        options: ['go', 'goes', 'going', 'is go'],
        correctIndex: 1,
        explanationEn: 'With singular third-person subjects (Sarah = she), add "-es" to "go" -> "goes".',
        explanationAr: 'مع الفاعل المفرد الغائب (Sarah تعادل she)، نضيف es للفعل go فيصبح goes.'
      },
      {
        question: '_____ you live in this city?',
        questionAr: 'هل _____ في هذه المدينة؟',
        options: ['Does', 'Do', 'Are', 'Is'],
        correctIndex: 1,
        explanationEn: 'Use "Do" as an auxiliary verb with "you" in the present simple.',
        explanationAr: 'نستخدم Do مع الضمير you في تكوين السؤال في زمن المضارع البسيط.'
      }
    ]
  },
  {
    id: 'g_present_continuous',
    title: 'Present Continuous',
    titleAr: 'المضارع المستمر',
    level: 'A1',
    formula: 'Subject + am/is/are + Verb-ing',
    description: 'Used for actions happening right now at the moment of speaking or temporary situations.',
    descriptionAr: 'يُستخدم للأفعال التي تحدث الآن في لحظة الكلام أو للأوضاع المؤقتة.',
    keyPoints: [
      'I + am, He/She/It + is, You/We/They + are',
      'Stative verbs (like, know, want) are rarely used in continuous tenses',
      'Keywords: now, right now, at the moment, look!, listen!'
    ],
    keyPointsAr: [
      'I تأخذ am، المفرد يأخذ is، الجمع و you تأخذ are + الفعل مضافاً له ing',
      'أفعال الشعور والإدراك (like, know, want) لا تأتي غالباً في المستمر',
      'الكلمات الدالة: now, at the moment, right now, look, listen'
    ],
    examples: [
      { en: 'I am reading an English book right now.', ar: 'أنا أقرأ كتاباً إنجليزياً في الوقت الحالي.', highlightWord: 'am reading' },
      { en: 'Listen! Someone is knocking on the door.', ar: 'استمع! شخص ما يطرق على الباب.', highlightWord: 'is knocking' },
      { en: 'They are studying for their exams this week.', ar: 'هم يدرسون لامتحاناتهم هذا الأسبوع.', highlightWord: 'are studying' }
    ],
    exercise: [
      {
        question: 'Look! The baby _____ right now.',
        questionAr: 'انظر! الطفل الرضيع _____ الآن.',
        options: ['sleep', 'sleeps', 'is sleeping', 'was sleeping'],
        correctIndex: 2,
        explanationEn: 'The action is happening right now, so we use "is + sleeping".',
        explanationAr: 'الحدث يقع الآن أمامنا، لذلك نستخدم is sleeping (المضارع المستمر).'
      }
    ]
  },
  {
    id: 'g_past_simple',
    title: 'Past Simple',
    titleAr: 'الماضي البسيط',
    level: 'A2',
    formula: 'Subject + Verb-2 (ed / irregular) + Object',
    description: 'Used for finished actions that happened at a specific point in the past.',
    descriptionAr: 'يُستخدم للتعبير عن أفعال بدأت وانتهت تماماً في وقت محدد في الماضي.',
    keyPoints: [
      'Regular verbs add -ed (play -> played), irregular verbs change (go -> went, eat -> ate)',
      'Use "did" for questions and "did not + base verb" for negatives',
      'Keywords: yesterday, last week, in 2020, two days ago'
    ],
    keyPointsAr: [
      'الأفعال المنتظمة تأخذ ed، والأفعال الشاذة تتغير (go -> went)',
      'نستخدم did للسؤال و did not + الفعل المجرد للنفي',
      'الكلمات الدالة: yesterday, last week, two days ago, in 2022'
    ],
    examples: [
      { en: 'I went to London last summer.', ar: 'ذهبت إلى لندن الصيف الماضي.', highlightWord: 'went' },
      { en: 'She did not see the movie yesterday.', ar: 'هي لم تشاهد الفيلم بالأمس.', highlightWord: 'did not see' },
      { en: 'Did you finish your homework?', ar: 'هل أنهيت واجبك المنزلي؟', highlightWord: 'Did you finish' }
    ],
    exercise: [
      {
        question: 'We _____ delicious dinner at that new restaurant last night.',
        questionAr: 'نحن _____ عشاءً لذيذاً في ذلك المطعم الجديد الليلة الماضية.',
        options: ['eat', 'ate', 'eaten', 'eating'],
        correctIndex: 1,
        explanationEn: '"Last night" indicates past simple, so use the past form "ate".',
        explanationAr: 'كلمة last night تدل على الماضي البسيط، لذا نستخدم التصريف الثاني ate.'
      }
    ]
  },
  {
    id: 'g_future_forms',
    title: 'Future (Will vs Going To)',
    titleAr: 'المستقبل (Will مقابل Going To)',
    level: 'A2',
    formula: 'Will + Base Verb / Be + going to + Base Verb',
    description: 'Will is used for spontaneous decisions and promises; Going to is for prior plans and visible evidence.',
    descriptionAr: 'Will للقرارات العفوية الفورية والوعود؛ Going to للخطط المسبقة والتنبؤات القائمة على دليل.',
    keyPoints: [
      'Spontaneous: "The phone is ringing. I will answer it!"',
      'Pre-planned: "I am going to visit my grandmother next Friday."',
      'Evidence: "Look at those dark clouds! It is going to rain."'
    ],
    keyPointsAr: [
      'القرارات الفورية: "سأجيب على الهاتف الآن!" -> Will',
      'الخطط والنوايا المسبقة: "أنا أخطط لزيارة جدتي" -> Going to',
      'التنبؤ بدليل مرئي: "غيوم سوداء، إنها ستمطر" -> Going to'
    ],
    examples: [
      { en: 'I will help you with those heavy bags.', ar: 'سأساعدك في حمل تلك الحقائب الثقيلة (قرار فوري).', highlightWord: 'will help' },
      { en: 'We are going to travel to Spain next month.', ar: 'نحن مسافرون إلى إسبانيا الشهر القادم (خطة محجوزة).', highlightWord: 'are going to travel' }
    ],
    exercise: [
      {
        question: 'Don\'t worry! I _____ call you as soon as I arrive.',
        questionAr: 'لا تقلق! أنا _____ بك فور وصولي.',
        options: ['will', 'am going', 'was', 'did'],
        correctIndex: 0,
        explanationEn: 'A promise or immediate reassurance uses "will".',
        explanationAr: 'الوعد أو التطمين الفوري نستخدم معه will.'
      }
    ]
  },
  {
    id: 'g_present_perfect',
    title: 'Present Perfect',
    titleAr: 'المضارع التام',
    level: 'B1',
    formula: 'Subject + have/has + Past Participle (V3)',
    description: 'Connects past experiences with the present moment, or describes unfinished time periods.',
    descriptionAr: 'يربط بين حدث في الماضي وأثره في الحاضر، أو للحديث عن تجارب الحياة دون تحديد وقت.',
    keyPoints: [
      'Have with I/you/we/they; Has with he/she/it',
      'For (duration: for 5 years) vs Since (starting point: since 2018)',
      'Keywords: already, yet, just, ever, never, recently, so far'
    ],
    keyPointsAr: [
      'have مع الجمع و I، و has مع المفرد + التصريف الثالث للفعل V3',
      'for للمدة الزمنية، since لنقطة البداية المحددة',
      'الكلمات الدالة: already, yet, just, ever, never, since, for'
    ],
    examples: [
      { en: 'I have lived in this city for five years.', ar: 'لقد عشت في هذه المدينة لخمس سنوات (وما زلت أعيش فيها).', highlightWord: 'have lived' },
      { en: 'Have you ever tried Japanese sushi?', ar: 'هل سبق لك تجربة السوشي الياباني في حياتك؟', highlightWord: 'Have you ever tried' },
      { en: 'She has already finished her report.', ar: 'لقد أنهت تقريرها بالفعل.', highlightWord: 'has already finished' }
    ],
    exercise: [
      {
        question: 'He _____ three cups of tea so far today.',
        questionAr: 'هو _____ ثلاثة أكواب شاي حتى الآن اليوم.',
        options: ['drank', 'has drunk', 'drinks', 'is drinking'],
        correctIndex: 1,
        explanationEn: '"So far today" describes an unfinished time period with a present connection, requiring Present Perfect.',
        explanationAr: 'عبارة so far today تدل على فترة زمنية لم تنتهِ بعد ذات صلة بالحاضر، فنستخدم has drunk.'
      }
    ]
  },
  {
    id: 'g_conditionals',
    title: 'Conditionals (1st & 2nd)',
    titleAr: 'الجمل الشرطية (الأولى والثانية)',
    level: 'B1',
    formula: '1st: If + Present, Will + Verb | 2nd: If + Past, Would + Verb',
    description: '1st conditional is for real future possibilities; 2nd conditional is for hypothetical/unreal situations.',
    descriptionAr: 'الحالة الأولى للاحتمالات الحقيقية في المستقبل؛ الحالة الثانية للمواقف الخيالية أو غير الواقعية.',
    keyPoints: [
      '1st: If you study hard, you will pass the exam. (Realistic)',
      '2nd: If I had a million dollars, I would travel the world. (Hypothetical)'
    ],
    keyPointsAr: [
      'الحالة 1: If + مضارع بسيط -> will + المصدر (احتمال حقيقي)',
      'الحالة 2: If + ماضي بسيط -> would + المصدر (تخيل وافتراض)'
    ],
    examples: [
      { en: 'If it rains tomorrow, we will stay at home.', ar: 'إذا أمطرت غداً، سنبقى في المنزل.', highlightWord: 'rains ... will stay' },
      { en: 'If I were you, I would take that great opportunity.', ar: 'لو كنت مكانك، لاغتنمت تلك الفرصة العظيمة.', highlightWord: 'were ... would take' }
    ],
    exercise: [
      {
        question: 'If you _____ practice speaking every day, your fluency will improve rapidly.',
        questionAr: 'إذا _____ ممارسة التحدث يومياً، ستتحسن طلاقتك سريعاً.',
        options: ['practiced', 'practice', 'will practice', 'practicing'],
        correctIndex: 1,
        explanationEn: 'In the First Conditional, use Present Simple after "if".',
        explanationAr: 'في الجملة الشرطية الأولى، نستخدم زمن المضارع البسيط بعد if.'
      }
    ]
  },
  {
    id: 'g_passive_voice',
    title: 'Passive Voice',
    titleAr: 'المبني للمجهول',
    level: 'B2',
    formula: 'Subject + Be (appropriate tense) + Past Participle (V3)',
    description: 'Focuses on the action and the recipient, rather than who performed the action.',
    descriptionAr: 'يركز على الحدث والمفعول به بدلاً من الفاعل، ويستخدم بكثرة في الأخبار والسياقات الأكاديمية.',
    keyPoints: [
      'Present: The letter is written.',
      'Past: The bridge was built in 1995.',
      'Future: The new project will be launched next month.'
    ],
    keyPointsAr: [
      'المضارع: is / are + V3',
      'الماضي: was / were + V3',
      'المستقبل: will be + V3'
    ],
    examples: [
      { en: 'English is spoken by millions of people across the globe.', ar: 'يتم التحدث بالإنجليزية بواسطة ملايين الأشخاص حول العالم.', highlightWord: 'is spoken' },
      { en: 'The innovative app was developed by talented programmers.', ar: 'تم تطوير التطبيق المبتكر بواسطة مبرمجين موهوبين.', highlightWord: 'was developed' }
    ],
    exercise: [
      {
        question: 'All safety guidelines must _____ followed strictly.',
        questionAr: 'يجب أن _____ جميع إرشادات السلامة بدقة.',
        options: ['be', 'been', 'being', 'are'],
        correctIndex: 0,
        explanationEn: 'Modal passive is formed with Modal + "be" + Past Participle -> "must be followed".',
        explanationAr: 'صيغة المبني للمجهول مع الأفعال الناقصة هي must + be + التصريف الثالث.'
      }
    ]
  },
  {
    id: 'g_advanced_inversion',
    title: 'Inversion for Emphasis',
    titleAr: 'التقديم والتأخير للبلاغة والتوكيد',
    level: 'C1',
    formula: 'Negative/Limiting Adverb + Auxiliary Verb + Subject + Main Verb',
    description: 'Used in formal and advanced English to emphasize dramatic or rare events.',
    descriptionAr: 'يُستخدم في الإنجليزية المتقدمة والرسمية لإضفاء طابع بلاغي وتوكيدي قوي.',
    keyPoints: [
      'Hardly had I arrived when the phone rang.',
      'Not only did she pass, but she also achieved the highest mark.',
      'Never have I seen such dedication.'
    ],
    keyPointsAr: [
      'نبدأ بظرف نفي مثل (Never, Rarely, Seldom, Not only)',
      'نقلب ترتيب الجملة كالسؤال: نضع الفعل المساعد قبل الفاعل',
      'مثال: Never have I seen (وليس Never I have seen)'
    ],
    examples: [
      { en: 'Seldom have I encountered such extraordinary eloquence.', ar: 'نادراً ما صادفت مثل هذه الفصاحة الاستثنائية.', highlightWord: 'Seldom have I encountered' },
      { en: 'Not only did they succeed, but they also inspired everyone.', ar: 'لم يقتصر الأمر على نجاحهم، بل ألهموا الجميع أيضاً.', highlightWord: 'Not only did they succeed' }
    ],
    exercise: [
      {
        question: 'Rarely _____ such profound empathy in modern leadership.',
        questionAr: 'نادراً ما _____ مثل هذا التعاطف العميق في القيادة الحديثة.',
        options: ['we see', 'do we see', 'we are seeing', 'we saw'],
        correctIndex: 1,
        explanationEn: 'After the limiting adverb "Rarely", inversion is mandatory: auxiliary "do" + subject "we" + verb "see".',
        explanationAr: 'بعد كلمة Rarely للبلاغة، يجب تقديم الفعل المساعد على الفاعل: do we see.'
      }
    ]
  }
];
