import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Database,
  LineChart,
  FileText,
  AlertTriangle,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface ExecutionStep {
  step: number;
  title: string;
  agent: string;
  duration: string;
  status: 'pending' | 'running' | 'completed';
  output: string;
  icon: any;
}

export const AiOrchestration: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps: ExecutionStep[] = [
    {
      step: 1,
      title: 'Retrieve Financial Data',
      agent: 'Data Gateway Agent',
      duration: '320ms',
      status: currentStepIndex >= 0 ? (currentStepIndex === 0 ? 'running' : 'completed') : 'pending',
      output: 'Pulled 8,420 GL line items from NetSuite, Stripe merchant ledger, and 3 regional bank feeds via Plaid.',
      icon: Database,
    },
    {
      step: 2,
      title: 'Analyze Transactions',
      agent: 'Ledger Audit Agent',
      duration: '410ms',
      status: currentStepIndex >= 1 ? (currentStepIndex === 1 ? 'running' : 'completed') : 'pending',
      output: 'Classified OPEX, COGS, and CAPEX entries. Verified 99.8% transaction integrity against signed contracts.',
      icon: Cpu,
    },
    {
      step: 3,
      title: 'Compare Historical Periods',
      agent: 'Time-Series Variance Agent',
      duration: '280ms',
      status: currentStepIndex >= 2 ? (currentStepIndex === 2 ? 'running' : 'completed') : 'pending',
      output: 'Compared August against July and YoY baseline. Computed +12.4% MoM revenue delta and +3.1% gross margin expansion.',
      icon: LineChart,
    },
    {
      step: 4,
      title: 'Identify Anomalies',
      agent: 'Anomaly & Fraud Sentinel',
      duration: '520ms',
      status: currentStepIndex >= 3 ? (currentStepIndex === 3 ? 'running' : 'completed') : 'pending',
      output: 'Isolated $46,200 GPU compute spike on Aug 14 and flagged 1 duplicate cloud software renewal ($4,200) for review.',
      icon: AlertTriangle,
    },
    {
      step: 5,
      title: 'Analyze Cash Flow & Runway',
      agent: 'Treasury Forecaster',
      duration: '390ms',
      status: currentStepIndex >= 4 ? (currentStepIndex === 4 ? 'running' : 'completed') : 'pending',
      output: 'Simulated 18-month liquidity curve under 3 market volatility scenarios. Projected cash runway at 28.4 months.',
      icon: LineChart,
    },
    {
      step: 6,
      title: 'Generate Charts & Visuals',
      agent: 'Chart Synthesizer Agent',
      duration: '450ms',
      status: currentStepIndex >= 5 ? (currentStepIndex === 5 ? 'running' : 'completed') : 'pending',
      output: 'Rendered interactive waterfall chart, OPEX distribution tree map, and revenue trajectory models.',
      icon: Sparkles,
    },
    {
      step: 7,
      title: 'Prepare Executive Briefing',
      agent: 'Executive Scribe Agent',
      duration: '600ms',
      status: currentStepIndex >= 6 ? (currentStepIndex === 6 ? 'running' : 'completed') : 'pending',
      output: 'Synthesized 3-point key driver summary, action items for CFO, and formatted board-ready executive PDF.',
      icon: FileText,
    },
    {
      step: 8,
      title: 'Deliver to CEO Device',
      agent: 'Executive Dispatcher',
      duration: '150ms',
      status: currentStepIndex >= 7 ? (currentStepIndex === 7 ? 'running' : 'completed') : 'pending',
      output: 'Delivered interactive conversational report to CEO Mobile app & Slack channel in 3.12 seconds total execution time.',
      icon: Send,
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev >= 7 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStep = steps[currentStepIndex] || steps[0];
  const StepIcon = activeStep.icon;

  return (
    <section id="orchestration" className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>CROSS-AGENT ORCHESTRATION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            One Intelligence Layer.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
              Your Entire Business.
            </span>
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Specialized AI agents work in concert while remaining strictly bounded. A single natural-language directive triggers a choreographed chain of autonomous reasoning, verification, and execution.
          </p>
        </div>

        {/* Live Simulation Card */}
        <div className="rounded-3xl bg-[#09090e] border border-white/[0.1] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Bar: Prompt & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-white/[0.08] gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0 mt-1">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-violet-400 font-mono-code uppercase tracking-wider block mb-1">
                  CEO DIRECTIVE (NATURAL LANGUAGE TRIGGER)
                </span>
                <p className="text-lg sm:text-xl font-bold text-white font-display">
                  "Prepare this month's financial performance report and explain the major changes."
                </p>
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-[#13131c] border border-white/[0.08] rounded-xl p-1.5 font-mono-code text-xs">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
                id="orchestration-play-pause-btn"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>
              <button
                onClick={() => setCurrentStepIndex(0)}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors"
                title="Restart Orchestration Sequence"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <span className="px-2 text-zinc-400 text-[11px]">
                Step {currentStepIndex + 1} of 8
              </span>
            </div>
          </div>

          {/* 8-Step Interactive Progress Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
            {steps.map((st, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <button
                  key={st.step}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(idx);
                  }}
                  id={`orchestration-step-${st.step}`}
                  className={`p-3 sm:p-3.5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between min-h-[128px] relative ${
                    isCurrent
                      ? 'bg-violet-950/60 border-2 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                      : isPast
                      ? 'bg-[#101017] border border-emerald-500/30'
                      : 'bg-[#0b0b10] border border-white/[0.05] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-bold font-mono-code text-zinc-400">
                      0{st.step}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
                    ) : null}
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                      {st.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-zinc-400 font-mono-code truncate mt-1.5 font-medium">
                      {st.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Real-Time Execution Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0e0e16] border border-violet-500/40 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-violet-600/30 text-violet-300 flex items-center justify-center">
                  <StepIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-violet-400 font-mono-code uppercase">
                      ACTIVE ORCHESTRATION NODE #{activeStep.step}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                      AUTONOMOUS
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white font-display mt-0.5">
                    {activeStep.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm font-mono-code text-zinc-300">
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  Assigned: <strong className="text-white">{activeStep.agent}</strong>
                </span>
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  Execution: <strong className="text-violet-300">{activeStep.duration}</strong>
                </span>
              </div>
            </div>

            {/* Step Output */}
            <div className="bg-[#08080c] border border-white/[0.06] rounded-xl p-5 font-mono-code text-sm text-zinc-200">
              <span className="text-zinc-400 text-xs block mb-1.5 font-bold">
                EXECUTION TELEMETRY & SYSTEM ARTIFACT GENERATED:
              </span>
              <p className="text-emerald-300 leading-relaxed text-base">
                "{activeStep.output}"
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-sm text-zinc-300 gap-2">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero manual compilation • Verified against source ledgers</span>
              </span>
              <span className="text-violet-400 font-semibold font-mono-code">
                Total Pipeline Time: ~3.1s
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
