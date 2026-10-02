import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Sparkles,
  Check,
  Play,
  Sliders,
  Radio,
  User,
  ShieldCheck,
  Feather,
} from 'lucide-react';
import { speechService, VoiceSettings, VoiceAccent, VoiceGender, GeminiVoiceName } from '../services/speechService';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceAccent: 'US' | 'UK';
  setVoiceAccent: (a: 'US' | 'UK') => void;
}

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  voiceAccent,
  setVoiceAccent,
}) => {
  const [settings, setSettings] = useState<VoiceSettings>(speechService.getSettings());
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSettings(speechService.getSettings());
      const voices = speechService.getBrowserVoices();
      setAvailableVoices(voices.filter(v => v.lang.startsWith('en')));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdate = (partial: Partial<VoiceSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    speechService.updateSettings(partial);
    if (partial.accent && (partial.accent === 'US' || partial.accent === 'UK')) {
      setVoiceAccent(partial.accent);
    }
  };

  const handleTestVoice = (speedOverride?: number) => {
    setIsPlayingTest(true);
    const sampleText =
      'Hello! I am your English teacher. Notice this calm, gentle, and clear male voice designed for your fluency.';

    speechService.speak(sampleText, speedOverride, () => {
      setIsPlayingTest(false);
    });
  };

  const maleBrowserVoices = availableVoices.filter(v => {
    const name = v.name.toLowerCase();
    const isFemale = [
      'female', 'woman', 'girl', 'google us english', 'samantha', 'victoria',
      'karen', 'zira', 'susan', 'catherine', 'moira', 'hazel', 'jenny', 'aria',
      'ava', 'emma', 'ana', 'heera', 'fiona', 'tessa', 'veena'
    ].some(fn => name.includes(fn));
    return !isFemale;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-emerald-400">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Calm & Clean Voice Settings</h3>
              <p className="text-xs text-slate-400 font-arabic">
                صوت رجالي هادئ، لطيف، واضح ونقي بدون مؤثرات زائدة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Controls */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Quality Guarantee Notice */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
              <span className="font-bold block">Clean & Calibrated Acoustics:</span>
              نبرة هادئة ومتزنة (Calme & Latif)، بدون صدى وبنطق مخارج حروف واضحة جداً لتسهيل الفهم والتعلم.
            </div>
          </div>

          {/* 1. Voice Style & Character */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              1. Voice Character & Tone (اختيار صوت ونبرة المعلق):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: Charon (Calm & Gentle Male) - Default */}
              <button
                type="button"
                onClick={() => handleUpdate({ gender: 'male', geminiVoice: 'Charon' })}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  settings.gender === 'male' && settings.geminiVoice === 'Charon'
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🌿</span>
                  {settings.gender === 'male' && settings.geminiVoice === 'Charon' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                      Calm Active
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Calm Teacher (Charon)</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">موصى به</span>
                </h4>
                <p className="text-xs text-slate-500 font-arabic mt-1">
                  صوت رجالي هادئ، رزين ولطيف بنطق واضح ونقي
                </p>
              </button>

              {/* Option B: Zephyr (Warm & Natural Male) */}
              <button
                type="button"
                onClick={() => handleUpdate({ gender: 'male', geminiVoice: 'Zephyr' })}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  settings.gender === 'male' && settings.geminiVoice === 'Zephyr'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">☕</span>
                  {settings.gender === 'male' && settings.geminiVoice === 'Zephyr' && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Warm Mentor (Zephyr)
                </h4>
                <p className="text-xs text-slate-500 font-arabic mt-1">
                  صوت رجالي دافئ، متزن وسلس ومريح للأذن
                </p>
              </button>

              {/* Option C: Fenrir (Deep Baritone Male) */}
              <button
                type="button"
                onClick={() => handleUpdate({ gender: 'male', geminiVoice: 'Fenrir' })}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  settings.gender === 'male' && settings.geminiVoice === 'Fenrir'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🎙️</span>
                  {settings.gender === 'male' && settings.geminiVoice === 'Fenrir' && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Deep Voice (Fenrir)
                </h4>
                <p className="text-xs text-slate-500 font-arabic mt-1">
                  صوت رجالي عميق ووقور مناسب للخطابة
                </p>
              </button>

              {/* Option D: Aoede (Gentle Female Voice) */}
              <button
                type="button"
                onClick={() => handleUpdate({ gender: 'female', geminiVoice: 'Aoede' })}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  settings.gender === 'female'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">🌸</span>
                  {settings.gender === 'female' && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Gentle Female (Aoede)
                </h4>
                <p className="text-xs text-slate-500 font-arabic mt-1">
                  صوت نسائي هادئ ولطيف وواضح
                </p>
              </button>
            </div>
          </div>

          {/* 2. Accent Selector */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              2. English Accent (اللهجة):
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'US', label: 'American (US)', flag: '🇺🇸' },
                { id: 'UK', label: 'British (UK)', flag: '🇬🇧' },
                { id: 'AU', label: 'Australian', flag: '🇦🇺' },
              ].map((acc) => {
                const isSelected = settings.accent === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleUpdate({ accent: acc.id as VoiceAccent })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl block mb-1">{acc.flag}</span>
                    <span className="text-xs font-bold block">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Speaking Pace / Speed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                3. Speaking Pace (سرعة القراءة الهادئة):
              </span>
              <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {settings.speed <= 0.8
                  ? 'Slow (0.75x)'
                  : settings.speed <= 0.95
                  ? 'Calm & Clear (0.92x)'
                  : settings.speed <= 1.05
                  ? 'Standard (1.0x)'
                  : 'Fast (1.25x)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { val: 0.75, label: '🐢 Slow 0.75x', desc: 'للمبتدئين والمفردات الصعبة' },
                { val: 0.92, label: '🌿 Calm 0.92x', desc: 'سرعة هادئة ومريحة وواضحة جداً' },
                { val: 1.05, label: '⚡ Natural 1.0x', desc: 'السرعة التخاطبية العادية' },
              ].map((sp) => {
                const isSelected = Math.abs(settings.speed - sp.val) < 0.05;
                return (
                  <button
                    key={sp.val}
                    type="button"
                    onClick={() => handleUpdate({ speed: sp.val })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 dark:text-white block">
                      {sp.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-arabic block mt-0.5">
                      {sp.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. AI Studio Voice Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Studio AI Ultra-Clean Synthesis
                </span>
                <span className="text-[11px] text-slate-500 font-arabic">
                  توليد صوتي ذكي ونقي خالي من أي تشويش أو مؤثرات زائدة
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ useAiVoice: !settings.useAiVoice })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.useAiVoice ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                  settings.useAiVoice ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 5. System Male Voices (Browser Detected) */}
          {maleBrowserVoices.length > 0 && (
            <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Select Installed Male Voice (أصوات النظام الرجالية):</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  {maleBrowserVoices.length} Male Voices Found
                </span>
              </label>
              <select
                value={settings.preferredVoiceURI || ''}
                onChange={(e) => handleUpdate({ preferredVoiceURI: e.target.value || undefined })}
                className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="">Auto Best Calm Male Voice (الاختيار الذكي التلقائي)</option>
                {maleBrowserVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    👨 {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Test Audio Button */}
          <div className="pt-1">
            <button
              type="button"
              disabled={isPlayingTest}
              onClick={() => handleTestVoice()}
              className="w-full py-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-200 dark:border-emerald-800"
            >
              <Play className={`w-4 h-4 ${isPlayingTest ? 'animate-spin' : ''}`} />
              <span>
                {isPlayingTest
                  ? 'Playing Calm Audio Sample...'
                  : 'Listen to Voice Sample (استمع لنبرة الصوت الهادئة والواضحة)'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-arabic">
            تم ضبط الصوت على: {settings.geminiVoice} (هادئ ولطيف)
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all"
          >
            Apply & Save (تطبيق)
          </button>
        </div>
      </div>
    </div>
  );
};
