export type VoiceAccent = 'US' | 'UK' | 'AU';
export type VoiceGender = 'female' | 'male';
export type GeminiVoiceName = 'Charon' | 'Zephyr' | 'Fenrir' | 'Puck' | 'Kore' | 'Aoede';

export interface VoiceSettings {
  accent: VoiceAccent;
  gender: VoiceGender;
  speed: number; // 0.75, 0.92, 1.0, 1.25
  useAiVoice: boolean;
  geminiVoice: GeminiVoiceName;
  preferredVoiceURI?: string;
  calmMode: boolean;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private settings: VoiceSettings = {
    accent: 'US',
    gender: 'male',
    speed: 0.92, // Calm, comfortable, clear tempo for language learning
    useAiVoice: true,
    geminiVoice: 'Charon', // Calm, gentle, articulate male voice with zero harsh effects
    calmMode: true,
  };
  private isSpeakingState = false;
  private listeners: ((speaking: boolean, text: string) => void)[] = [];
  private audioCache = new Map<string, string>();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Warm up voices
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.getBrowserVoices();
      }
    }
  }

  public getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    if (this.settings.gender === 'male' && (this.settings.geminiVoice === 'Kore' || this.settings.geminiVoice === 'Aoede')) {
      this.settings.geminiVoice = 'Charon';
    } else if (this.settings.gender === 'female' && (this.settings.geminiVoice === 'Charon' || this.settings.geminiVoice === 'Puck' || this.settings.geminiVoice === 'Fenrir')) {
      this.settings.geminiVoice = 'Aoede';
    }
  }

  public setAccent(accent: VoiceAccent) {
    this.settings.accent = accent;
  }

  public setGender(gender: VoiceGender) {
    this.settings.gender = gender;
    this.settings.geminiVoice = gender === 'female' ? 'Aoede' : 'Charon';
  }

  public setRate(rate: number) {
    this.settings.speed = Math.max(0.6, Math.min(1.5, rate));
  }

  public onSpeakingChange(cb: (speaking: boolean, text: string) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isSpeakingState = speaking;
    this.listeners.forEach(cb => cb(speaking, text));
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public async speak(text: string, overrideSpeed?: number, onEnd?: () => void): Promise<void> {
    const clean = text.trim();
    if (!clean) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();
    const effectiveSpeed = overrideSpeed || this.settings.speed;
    this.notify(true, clean);

    const finish = () => {
      this.notify(false, '');
      if (onEnd) onEnd();
    };

    // 1. Try Studio AI Voice Over if enabled
    if (this.settings.useAiVoice) {
      const cacheKey = `${clean}_${this.settings.geminiVoice}_${effectiveSpeed.toFixed(2)}`;
      let base64 = this.audioCache.get(cacheKey);

      if (!base64) {
        try {
          const res = await fetch('/api/ai/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: clean,
              voice: this.settings.geminiVoice,
              speed: effectiveSpeed,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            base64 = data.audioBase64;
            if (base64) this.audioCache.set(cacheKey, base64);
          }
        } catch (e) {
          // fallback to browser voice below
        }
      }

      if (base64) {
        try {
          const audio = new Audio(`data:audio/wav;base64,${base64}`);
          this.currentAudio = audio;
          audio.playbackRate = effectiveSpeed >= 1.2 ? 1.15 : 1.0;
          audio.onended = finish;
          audio.onerror = () => {
            this.speakBrowser(clean, effectiveSpeed, finish);
          };
          await audio.play();
          return;
        } catch (err) {
          // Playback blocked or failed, fall to browser synth
        }
      }
    }

    // 2. High-quality Browser Speech Synthesis Fallback
    this.speakBrowser(clean, effectiveSpeed, finish);
  }

  private speakBrowser(text: string, speed: number, onEnd: () => void): void {
    if (!this.synth) {
      onEnd();
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed || 0.90;
    // For a calm, gentle, warm male voice (morih ratb), pitch 0.88 gives a deep, relaxed, natural tone
    utterance.pitch = this.settings.gender === 'male' ? 0.88 : 1.05;

    let targetLang = 'en-US';
    if (this.settings.accent === 'UK') targetLang = 'en-GB';
    if (this.settings.accent === 'AU') targetLang = 'en-AU';
    utterance.lang = targetLang;

    const voices = this.getBrowserVoices();
    const matchingVoice = this.pickBestVoice(voices, targetLang, this.settings.gender, this.settings.preferredVoiceURI);
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = onEnd;
    utterance.onerror = onEnd;

    this.synth.speak(utterance);
  }

  public getBrowserVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  private pickBestVoice(
    voices: SpeechSynthesisVoice[],
    targetLang: string,
    gender: VoiceGender,
    preferredURI?: string
  ): SpeechSynthesisVoice | undefined {
    if (voices.length === 0) return undefined;

    // 1. If preferred voice URI is specified and available, use it directly
    if (preferredURI) {
      const exact = voices.find(v => v.voiceURI === preferredURI);
      if (exact) return exact;
    }

    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const candidateVoices = englishVoices.length > 0 ? englishVoices : voices;

    const isMale = gender.toLowerCase() === 'male';

    // Discard lists based on gender.
    // CRITICAL: In Google Chrome, 'Google US English' is a FEMALE voice!
    // It must NEVER be selected when isMale is true!
    const femaleKeywords = [
      'female', 'woman', 'girl',
      'google us english', // 100% Female in Chrome
      'samantha', 'victoria', 'karen', 'zira', 'susan', 'catherine',
      'moira', 'hazel', 'jenny', 'aria', 'ava', 'emma', 'ana',
      'stephanie', 'michelle', 'linda', 'amy', 'mary', 'heera',
      'fiona', 'tessa', 'veena', 'alice', 'agnes', 'kathy', 'allison',
      'serena', 'sangeeta', 'yuri', 'mei-jia', 'sin-ji',
      'en-us-x-sfg#female', 'en-gb-x-rjs#female', 'female_1', 'female_2'
    ];

    const maleKeywords = [
      'guy', 'ryan', 'christopher', 'alex', 'daniel', 'oliver', 'evan',
      'nathan', 'david', 'mark', 'george', 'tom', 'arthur', 'fred',
      'bruce', 'brian', 'richard', 'james', 'google uk english male', 'male'
    ];

    let bestVoice: SpeechSynthesisVoice | undefined = undefined;
    let highestScore = -9999;

    for (const v of candidateVoices) {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      let score = 0;

      // Filter incompatible gender
      if (isMale) {
        // Disqualify any voice with a female keyword
        if (femaleKeywords.some(fn => name.includes(fn))) {
          continue;
        }
      } else {
        if (maleKeywords.some(mn => name.includes(mn))) {
          continue;
        }
      }

      // Language alignment
      if (lang === targetLang.toLowerCase()) {
        score += 30;
      } else if (lang.startsWith('en')) {
        score += 15;
      }

      // Calm, gentle, clear male voices rankings (Morih & Ratb)
      if (isMale) {
        if (name.includes('google uk english male') || (name.includes('uk english') && name.includes('male'))) {
          score += 90; // Genuine Chrome male voice!
        } else if (name.includes('guy')) {
          score += 85; // Microsoft Guy Online (Natural) - very calm, gentle, soft
        } else if (name.includes('ryan')) {
          score += 80; // Microsoft Ryan Online (Natural) - calm, gentle, crystal clear
        } else if (name.includes('christopher')) {
          score += 80; // Microsoft Christopher Natural - soothing, calm
        } else if (name.includes('daniel')) {
          score += 75; // Daniel (Apple / Android) - refined calm male
        } else if (name.includes('oliver')) {
          score += 75; // Oliver (Apple / British) - calm, articulate male
        } else if (name.includes('alex')) {
          score += 70; // Alex (Apple) - natural clear male
        } else if (name.includes('evan') || name.includes('nathan')) {
          score += 65;
        } else if (name.includes('david')) {
          score += 60; // Microsoft David
        } else if (name.includes('mark') || name.includes('george')) {
          score += 55;
        } else if (name.includes('male')) {
          score += 40;
        }
      } else {
        if (name.includes('jenny')) score += 65;
        else if (name.includes('aria')) score += 60;
        else if (name.includes('samantha')) score += 50;
      }

      // Quality badges (Natural, Neural, Enhanced, Studio)
      if (name.includes('natural')) score += 40;
      if (name.includes('neural')) score += 35;
      if (name.includes('online')) score += 30;
      if (name.includes('enhanced')) score += 30;
      if (name.includes('premium')) score += 25;

      // Penalize robotic synthesizers
      if (name.includes('espeak')) score -= 80;
      if (name.includes('compact')) score -= 30;

      if (score > highestScore) {
        highestScore = score;
        bestVoice = v;
      }
    }

    // Fallback: If no explicit male voice passed filters, find any voice that is NOT female
    if (!bestVoice && isMale) {
      bestVoice = candidateVoices.find(v => !femaleKeywords.some(fn => v.name.toLowerCase().includes(fn)));
    }

    return bestVoice || candidateVoices[0];
  }

  public stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.notify(false, '');
  }

  // Speech Recognition for pronunciation shadowing & speaking practice
  public startSpeechRecognition(
    onResult: (transcript: string) => void,
    onError?: (error: string) => void,
    onEnd?: () => void
  ): { stop: () => void } | null {
    if (typeof window === 'undefined') return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      if (onError) onError('Speech Recognition is not supported in this browser. Please use Chrome or Edge.');
      return null;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = this.settings.accent === 'UK' ? 'en-GB' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        if (onError) onError(event.error || 'Microphone error');
      };

      recognition.onend = () => {
        if (onEnd) onEnd();
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch (e) {
            // ignore
          }
        },
      };
    } catch (err) {
      if (onError) onError('Could not access microphone.');
      return null;
    }
  }
}

export const speechService = new SpeechService();
