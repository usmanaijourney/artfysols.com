import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Terminal,
  Zap,
  Mic,
  MicOff,
  Radio,
} from 'lucide-react';
import { ConsultantMessage } from '../types';

interface InteractiveAiConsultantProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSolutionToBuild?: (briefData: any) => void;
  messages?: ConsultantMessage[];
  onMessagesChange?: React.Dispatch<React.SetStateAction<ConsultantMessage[]>>;
}

export const InteractiveAiConsultant: React.FC<InteractiveAiConsultantProps> = ({
  isOpen,
  onClose,
  onSelectSolutionToBuild,
  messages: externalMessages,
  onMessagesChange,
}) => {
  const [internalMessages, setInternalMessages] = useState<ConsultantMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello! I am the Artify AI Architectural Advisor. Tell me about your organization, your most time-consuming operational workflows, or what you'd like to automate—and I'll synthesize a custom AI-native architecture blueprint for you.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How can AI automate our multi-entity invoice approval and reconciliation workflow?',
        'We manage 400 real estate properties—how can AI coordinate maintenance and tenant requests?',
        'How would an AI agent workforce connect our NetSuite ERP and Salesforce CRM?',
        'We want an executive conversational BI dashboard to query revenue and inventory in real time.',
      ],
    },
  ]);

  const messages = externalMessages || internalMessages;
  const setMessages = onMessagesChange || setInternalMessages;

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(18);
  const [loadingStageIndex, setLoadingStageIndex] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState('General Enterprise');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize browser Speech Recognition
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript) {
            setInputQuery(currentTranscript);
            setSpeechError(null);
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed') {
            setSpeechError('Microphone permission was denied. Please allow microphone access in your browser.');
          } else if (event.error === 'no-speech') {
            // Normal when user pauses speaking
          } else {
            setSpeechError(`Voice input: ${event.error}`);
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    } catch {
      // Speech recognition not permitted or supported in this mobile webview
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Safe catch
        }
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Voice input is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // Safe catch
      }
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        try {
          recognitionRef.current?.stop();
          setTimeout(() => {
            recognitionRef.current?.start();
            setIsListening(true);
          }, 100);
        } catch (retryErr) {
          setSpeechError('Could not start microphone. Please check browser permissions.');
          setIsListening(false);
        }
      }
    }
  };

  // Turn off listening when closing modal
  useEffect(() => {
    if (!isOpen && isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  }, [isOpen, isListening]);

  const loadingStages = [
    { label: 'Analyzing organizational workflow requirements...', percent: 28 },
    { label: 'Synthesizing autonomous agent workforce topology...', percent: 58 },
    { label: 'Mapping enterprise integrations & security guardrails...', percent: 84 },
    { label: 'Finalizing production architecture blueprint...', percent: 96 },
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingProgress(20);
      setLoadingStageIndex(0);
      interval = setInterval(() => {
        setLoadingStageIndex((prev) => {
          const next = Math.min(prev + 1, loadingStages.length - 1);
          setLoadingProgress(loadingStages[next].percent);
          return next;
        });
      }, 750);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
    }

    const userMsg: ConsultantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          industry: selectedIndustry,
          conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Consultant service temporarily unavailable');
      }

      const data = await response.json();

      const aiMsg: ConsultantMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        architectureBlueprint: data.architectureBlueprint,
        suggestions: data.followUpQuestions || [
          'What is the estimated deployment timeline?',
          'How do we ensure security and human-in-the-loop guardrails?',
          'Can we connect our existing database APIs?',
        ],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const fallbackMsg: ConsultantMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content:
          "Based on your requirements, Artify would engineer a bespoke Multi-Agent Orchestration layer connecting directly to your existing systems. We would provision domain agents with strict tool boundaries, continuous verification, and an executive natural-language interface.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        architectureBlueprint: {
          recommendedAgents: ['Orchestrator Agent', 'Data Bridge Agent', 'Compliance Agent'],
          suggestedIntegrations: ['REST APIs', 'ERP/CRM Connectors', 'SQL Warehouse'],
          estimatedVelocity: '3 - 6 Weeks Production Deployment',
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[88vh] bg-[#09090e] border border-violet-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:px-8 border-b border-white/[0.08] bg-[#0c0c12] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-600/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  Artify AI Architectural Advisor
                </h3>
                <span className="text-[10px] font-mono-code font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  LIVE DEMO
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Explore how Artify engineers custom AI software around your organization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="hidden sm:block text-xs bg-[#151520] border border-white/[0.1] text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-violet-500"
            >
              <option value="General Enterprise">General Enterprise</option>
              <option value="Finance & Accounting">Finance & Accounting</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Construction">Construction</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Logistics & Fleet">Logistics & Fleet</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail & E-Commerce">Retail & E-Commerce</option>
            </select>

            <button
              onClick={onClose}
              id="close-consultant-modal-btn"
              className="p-2 rounded-xl bg-[#151520] hover:bg-[#1f1f30] text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/40 text-violet-300 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl p-5 rounded-2xl ${
                    isUser
                      ? 'bg-violet-600 text-white rounded-tr-sm shadow-lg shadow-violet-600/20'
                      : 'bg-[#101017] border border-white/[0.08] text-zinc-200 rounded-tl-sm shadow-md'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                    {msg.content}
                  </div>

                  {/* Architecture Blueprint Card */}
                  {msg.architectureBlueprint && (
                    <div className="mt-4 p-4 rounded-xl bg-[#08080d] border border-violet-500/30 font-mono-code text-xs">
                      <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>SYNTHESIZED ARCHITECTURAL BLUEPRINT</span>
                      </div>

                      {msg.architectureBlueprint.recommendedAgents && (
                        <div className="mb-2">
                          <span className="text-zinc-500 block text-[10px]">RECOMMENDED AGENTS:</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {msg.architectureBlueprint.recommendedAgents.map((ag: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40 text-violet-200 text-[11px]">
                                {ag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.architectureBlueprint.suggestedIntegrations && (
                        <div className="mb-2">
                          <span className="text-zinc-500 block text-[10px]">INTEGRATIONS:</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {msg.architectureBlueprint.suggestedIntegrations.map((sys: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                                {sys}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.architectureBlueprint.estimatedVelocity && (
                        <div className="text-emerald-400 text-[11px] pt-1">
                          Delivery Velocity: {msg.architectureBlueprint.estimatedVelocity}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Suggestions Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-1.5">
                      <span className="text-[10px] font-mono-code text-zinc-400 block uppercase">
                        Explore Follow-Up Directions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(sug)}
                            className="text-left text-xs font-medium text-violet-300 hover:text-white bg-white/[0.04] hover:bg-violet-900/30 border border-white/[0.06] hover:border-violet-500/40 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-2 text-right ${
                      isUser ? 'text-violet-200' : 'text-zinc-500'
                    } font-mono-code`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3.5 justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/40 text-violet-300 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="max-w-2xl w-full p-5 rounded-2xl bg-[#101017] border border-violet-500/30 text-zinc-200 rounded-tl-sm shadow-xl space-y-4">
                {/* Live Stage Progress Indicator */}
                <div className="space-y-2 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <div className="flex items-center gap-2 text-violet-400">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-400" />
                      <span className="font-semibold">{loadingStages[loadingStageIndex].label}</span>
                    </div>
                    <span className="text-violet-300 text-[11px] font-bold">{loadingProgress}%</span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/[0.06]">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Response Text Skeleton Lines */}
                <div className="space-y-2.5 pt-1">
                  <div className="h-3.5 bg-gradient-to-r from-white/[0.08] via-white/[0.18] to-white/[0.08] rounded animate-pulse w-[92%]" />
                  <div className="h-3.5 bg-gradient-to-r from-white/[0.08] via-white/[0.18] to-white/[0.08] rounded animate-pulse w-[96%]" />
                  <div className="h-3.5 bg-gradient-to-r from-white/[0.08] via-white/[0.18] to-white/[0.08] rounded animate-pulse w-[74%]" />
                </div>

                {/* Architecture Blueprint Skeleton Card */}
                <div className="p-4 rounded-xl bg-[#08080d] border border-violet-500/20 font-mono-code text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-violet-500/40 animate-pulse" />
                      <div className="h-3 w-48 bg-violet-500/20 rounded animate-pulse" />
                    </div>
                    <div className="h-3 w-20 bg-emerald-500/20 rounded animate-pulse" />
                  </div>

                  <div>
                    <div className="h-2.5 w-32 bg-white/[0.06] rounded mb-2 animate-pulse" />
                    <div className="flex flex-wrap gap-1.5">
                      <div className="h-6 w-28 bg-violet-950/60 border border-violet-800/30 rounded animate-pulse" />
                      <div className="h-6 w-32 bg-violet-950/60 border border-violet-800/30 rounded animate-pulse" />
                      <div className="h-6 w-24 bg-violet-950/60 border border-violet-800/30 rounded animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <div className="h-2.5 w-24 bg-white/[0.06] rounded mb-2 animate-pulse" />
                    <div className="flex flex-wrap gap-1.5">
                      <div className="h-6 w-20 bg-zinc-800/80 rounded animate-pulse" />
                      <div className="h-6 w-28 bg-zinc-800/80 rounded animate-pulse" />
                      <div className="h-6 w-24 bg-zinc-800/80 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0c0c12]">
          {/* Active Voice Listening Banner */}
          {isListening && (
            <div className="mb-3 px-4 py-2.5 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-violet-200">
                    Listening to your voice... Speak your workflow requirements naturally
                  </span>
                  {/* Equalizer animation */}
                  <div className="flex items-center gap-1 h-3">
                    <span className="w-0.5 h-3 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-0.5 h-4 bg-violet-300 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-0.5 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    <span className="w-0.5 h-3.5 bg-violet-300 rounded-full animate-bounce [animation-delay:75ms]" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleVoiceInput}
                className="text-[11px] font-mono-code font-bold text-violet-300 hover:text-white bg-violet-800/50 hover:bg-violet-700/60 px-2.5 py-1 rounded-lg transition-colors border border-violet-500/30"
              >
                Done Speaking
              </button>
            </div>
          )}

          {/* Speech Error Banner */}
          {speechError && (
            <div className="mb-3 px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
              <span>{speechError}</span>
              <button
                type="button"
                onClick={() => setSpeechError(null)}
                className="text-red-400 hover:text-white font-bold text-sm ml-2"
              >
                ×
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2.5"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                isListening
                  ? 'Listening... (Speak now)'
                  : 'Describe your workflow, bottleneck, or system you want to build with AI...'
              }
              id="ai-consultant-input-box"
              className={`flex-1 bg-[#151520] border ${
                isListening ? 'border-violet-400 ring-2 ring-violet-500/20' : 'border-white/[0.1]'
              } rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 shadow-inner transition-all`}
            />

            {/* Voice to Text Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              id="ai-consultant-voice-btn"
              title={isListening ? 'Stop listening' : 'Speak your requirements (Voice-to-Text)'}
              aria-label={isListening ? 'Stop microphone' : 'Start voice input'}
              className={`p-3 rounded-xl border transition-all focus:outline-none flex items-center justify-center ${
                isListening
                  ? 'bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-500/30 animate-pulse'
                  : 'bg-[#151520] hover:bg-[#1f1f30] border-white/[0.1] text-zinc-300 hover:text-white'
              }`}
            >
              {isListening ? (
                <Radio className="w-4 h-4 text-red-400 animate-spin" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              id="ai-consultant-submit-btn"
              className="inline-flex items-center justify-center p-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white shadow-lg shadow-violet-600/30 transition-all focus:outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero data retained for public training
            </span>
            <span className="font-mono-code text-[10px]">Powered by Artify Intelligence Engine</span>
          </div>
        </div>

      </div>
    </div>
  );
};
