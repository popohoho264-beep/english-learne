import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Volume2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Globe,
  Lightbulb,
} from 'lucide-react';
import { ConversationScenario, UserProgress } from '../types';
import { conversationScenarios } from '../data/conversationData';
import { sendConversationMessage, ConversationTurnResult } from '../services/aiService';
import { speechService } from '../services/speechService';
import { addTrainedSentence } from '../services/storageService';

interface ConversationSectionProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onTriggerMiniTest: () => void;
  showArabicHints: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  textArHint?: string;
  correction?: {
    hasMistake: boolean;
    corrected: string | null;
    arabicExplanation: string | null;
  };
}

export const ConversationSection: React.FC<ConversationSectionProps> = ({
  progress,
  setProgress,
  onTriggerMiniTest,
  showArabicHints,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario>(
    conversationScenarios[0]
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_init',
      sender: 'ai',
      text: conversationScenarios[0].initialMessage,
      textArHint: conversationScenarios[0].initialMessageAr,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>(
    conversationScenarios[0].targetVocabulary
  );

  const handleSelectScenario = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: `m_init_${scenario.id}`,
        sender: 'ai',
        text: scenario.initialMessage,
        textArHint: scenario.initialMessageAr,
      },
    ]);
    setInputMessage('');
    setSuggestedKeywords(scenario.targetVocabulary);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = inputMessage.trim();
    if (!cleanText || isSending) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: cleanText,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsSending(true);

    // Call server/AI conversation endpoint
    const historyPayload = newHistory.map((m) => ({
      sender: m.sender,
      content: m.text,
    }));

    const response: ConversationTurnResult = await sendConversationMessage(
      selectedScenario.description,
      selectedScenario.topic,
      progress.currentLevel,
      historyPayload
    );

    const aiMsg: ChatMessage = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: response.replyEn,
      textArHint: response.replyArHint,
      correction: response.correction,
    };

    setMessages([...newHistory, aiMsg]);
    setIsSending(false);
    if (response.suggestedKeywords && response.suggestedKeywords.length > 0) {
      setSuggestedKeywords(response.suggestedKeywords);
    }

    // Play teacher reply audio
    speechService.speak(response.replyEn);

    // Increment sentence training counter & check mini-test
    const { updated, triggerMiniTest } = addTrainedSentence(
      progress,
      undefined,
      25
    );
    setProgress(updated);
    if (triggerMiniTest) onTriggerMiniTest();
  };

  return (
    <div className="space-y-6">
      {/* Scenarios Carousel */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 px-2">
          Choose a Conversation Scenario:
        </span>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {conversationScenarios.map((sc) => {
            const isSelected = selectedScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className={`p-3 rounded-2xl border text-left shrink-0 min-w-56 transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{sc.avatar}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                    {sc.level}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {sc.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-arabic line-clamp-1 mt-0.5">
                  {sc.titleAr}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Room */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-[520px]">
        {/* Scenario Header */}
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedScenario.avatar}</span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {selectedScenario.title}
              </h3>
              <p className="text-xs text-slate-500 font-arabic">
                {selectedScenario.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectScenario(selectedScenario)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Restart conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                  <button
                    onClick={() => speechService.speak(m.text)}
                    className={`p-1 rounded-md transition-colors ${
                      m.sender === 'user'
                        ? 'text-indigo-200 hover:text-white'
                        : 'text-slate-400 hover:text-indigo-600'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Arabic Support Hint for Teacher Reply */}
                {showArabicHints && m.textArHint && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-arabic text-right mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    {m.textArHint}
                  </p>
                )}
              </div>

              {/* Gentle Correction Banner if learner made a mistake in previous turn */}
              {m.correction?.hasMistake && m.correction.corrected && (
                <div className="mt-1.5 max-w-[85%] p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Friendly Correction: </span>
                    <span>"{m.correction.corrected}"</span>
                    {m.correction.arabicExplanation && (
                      <p className="text-[11px] font-arabic text-right mt-0.5 text-amber-700 dark:text-amber-300">
                        {m.correction.arabicExplanation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>Teacher is thinking and replying...</span>
            </div>
          )}
        </div>

        {/* Target Words Suggestions */}
        {suggestedKeywords.length > 0 && (
          <div className="pt-2 pb-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
              Suggested Words:
            </span>
            {suggestedKeywords.map((word, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputMessage((prev) => `${prev} ${word}`.trim())}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition-colors shrink-0"
              >
                + {word}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your response in English (e.g. Yes, I usually...)"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-600"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
