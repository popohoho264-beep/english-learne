import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI:', err);
  }
}

// 1. Evaluate learner sentence (Fluency Mode / Sentence Creation)
app.post('/api/ai/evaluate-sentence', async (req, res) => {
  const { sentence, prompt, targetWord, level = 'A1' } = req.body;

  if (!sentence || typeof sentence !== 'string') {
    return res.status(400).json({ error: 'Sentence is required' });
  }

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are an expert English language coach evaluating an ESL learner's sentence.
Learner CEFR Level: ${level}
Target Vocabulary/Concept: ${targetWord || 'General fluency'}
Prompt given to learner: ${prompt || 'Write a sentence'}
Learner's submission: "${sentence}"

Analyze the sentence for:
1. Grammatical accuracy
2. Vocabulary usage & naturalness
3. Punctuation & spelling
4. CEFR appropriateness

Respond ONLY in valid JSON matching this schema:
{
  "isCorrect": boolean,
  "score": number (0-100),
  "feedbackEn": "Clear constructive feedback in simple English",
  "feedbackAr": "شرح لطيف ومبسط باللغة العربية مع توضيح أي أخطاء",
  "correctedSentence": "The ideal, most natural version",
  "betterAlternative": "An alternative natural way a native speaker would say this",
  "grammarNotes": ["list of brief key takeaways"]
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      }
    } catch (e) {
      console.error('Gemini evaluate error, falling back:', e);
    }
  }

  // Smart local heuristic fallback
  const trimmed = sentence.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const startsWithCapital = /^[A-Z]/.test(trimmed);
  const endsWithPunctuation = /[.!?]$/.test(trimmed);
  const lengthOk = words.length >= 3;

  const score = Math.min(100, Math.max(50, 60 + (startsWithCapital ? 10 : 0) + (endsWithPunctuation ? 10 : 0) + (lengthOk ? 20 : 0)));
  const isCorrect = score >= 75;

  return res.json({
    isCorrect,
    score,
    feedbackEn: isCorrect
      ? 'Good sentence construction! Keep practicing natural collocations and varied tenses.'
      : 'Good attempt! Remember to start with a capital letter, end with punctuation, and verify subject-verb agreement.',
    feedbackAr: isCorrect
      ? 'محاولة رائعة! الجملة مفهومة ومبنية بشكل جيد. استمر في التدرب على استخدام الأزمنة المختلفة.'
      : 'محاولة جيدة! تذكر أن تبدأ بحرف كبير وتنتهي بنقطة، وتأكد من توافق الفعل مع الفاعل.',
    correctedSentence: startsWithCapital && endsWithPunctuation ? trimmed : `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}${endsWithPunctuation ? '' : '.'}`,
    betterAlternative: targetWord ? `I regularly use ${targetWord} in my daily routine.` : 'Native speakers often keep the sentence direct and concise.',
    grammarNotes: [
      'Check subject-verb agreement (e.g. He goes vs They go)',
      'Keep word order: Subject + Verb + Object',
    ],
  });
});

// 2. Interactive Conversation Mode Endpoint
app.post('/api/ai/conversation', async (req, res) => {
  const { scenario, topic, level = 'A1', messages = [] } = req.body;

  const lastUserMsg = messages[messages.length - 1]?.content || '';

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are an encouraging, friendly English teacher conversing with an English learner.
CEFR Level: ${level}
Topic / Scenario: ${topic || 'Daily Life'} - ${scenario || 'Casual conversation'}
Conversation History:
${JSON.stringify(messages, null, 2)}

Your task:
1. Reply naturally in 1-3 sentences tailored to CEFR level ${level}.
2. Check the learner's last message ("${lastUserMsg}") for any English mistakes.
3. Provide a brief Arabic translation/hint for your reply so the learner understands without giving up thinking in English.
4. Suggest 2-3 useful words or phrases the learner can use in their next reply.

Return ONLY JSON:
{
  "replyEn": "Teacher's response in English (suitable for ${level})",
  "replyArHint": "ملاحظة أو ترجمة ملخصة لمساعدتك على فهم الرد",
  "correction": {
    "hasMistake": boolean,
    "learnerOriginal": "${lastUserMsg}",
    "corrected": "Corrected version or null if clean",
    "arabicExplanation": "شرح بسيط للخطأ بالعربي أو null"
  },
  "suggestedKeywords": ["word1", "word2", "word3"]
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (text) {
        return res.json(JSON.parse(text));
      }
    } catch (e) {
      console.error('Gemini conversation error:', e);
    }
  }

  // Fallback conversation responses
  const fallbacks: Record<string, { replyEn: string; replyArHint: string; suggestedKeywords: string[] }> = {
    school: {
      replyEn: "That sounds interesting! What is your favorite subject at school or university, and why do you like it?",
      replyArHint: "يبدو ذلك ممتعاً! ما هي مادتك المفضلة ولماذا تحبها؟",
      suggestedKeywords: ["subject", "teacher", "learn", "study"],
    },
    travel: {
      replyEn: "Traveling is a great way to see the world! Where is the next place you would love to visit?",
      replyArHint: "السفر طريقة رائعة لاستكشاف العالم! ما هو المكان التالي الذي ترغب في زيارته؟",
      suggestedKeywords: ["airport", "visit", "country", "ticket"],
    },
    work: {
      replyEn: "Work life can be busy! What projects or tasks are you currently focusing on this week?",
      replyArHint: "بيئة العمل تكون حافلة! ما هي المشاريع أو المهام التي تركز عليها هذا الأسبوع؟",
      suggestedKeywords: ["meeting", "project", "deadline", "colleague"],
    },
    default: {
      replyEn: "I understand! Tell me more about that. How often do you do this in your everyday life?",
      replyArHint: "أفهمك جيداً! أخبرني أكثر عن ذلك، كم مرة تفعل ذلك في حياتك اليومية؟",
      suggestedKeywords: ["usually", "often", "practice", "enjoy"],
    },
  };

  const key = (topic && fallbacks[topic.toLowerCase()]) ? topic.toLowerCase() : 'default';
  const choice = fallbacks[key];

  return res.json({
    replyEn: choice.replyEn,
    replyArHint: choice.replyArHint,
    correction: {
      hasMistake: false,
      learnerOriginal: lastUserMsg,
      corrected: lastUserMsg,
      arabicExplanation: null,
    },
    suggestedKeywords: choice.suggestedKeywords,
  });
});

function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const dataSize = pcmBuffer.length;
  const fileSize = dataSize + 36;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);

  header.write('RIFF', 0);
  header.writeUInt32LE(fileSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// 3. Studio AI Voice Over Endpoint (TTS)
app.post('/api/ai/tts', async (req, res) => {
  const { text, voice = 'Charon', speed = 0.90 } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required for TTS' });
  }

  if (ai) {
    try {
      // Valid Gemini TTS voice names:
      // 'Charon' = Calm, gentle, articulate male voice (default)
      // 'Fenrir' = Deep, warm, soothing baritone male voice
      // 'Zephyr' = Warm, peaceful voice
      // 'Puck'   = Brisk male voice
      // 'Aoede'  = Gentle female voice
      // 'Kore'   = Bright female voice
      const validVoices = ['Charon', 'Fenrir', 'Zephyr', 'Puck', 'Aoede', 'Kore'];
      const chosenVoice = validVoices.includes(voice) ? voice : 'Charon';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: text.slice(0, 320),
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: chosenVoice },
            },
          },
        },
      });

      const pcmBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (pcmBase64) {
        const pcmBuffer = Buffer.from(pcmBase64, 'base64');
        const wavBuffer = pcmToWav(pcmBuffer, 24000);
        const audioBase64 = wavBuffer.toString('base64');
        return res.json({ audioBase64, format: 'audio/wav', voice: chosenVoice });
      }
    } catch (err) {
      console.warn('Gemini TTS error, client will use enhanced browser speech:', err);
    }
  }

  return res.status(503).json({ error: 'AI TTS unavailable, use browser voice' });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`FluentPulse server running at http://localhost:${PORT}`);
  });
}

startServer();
