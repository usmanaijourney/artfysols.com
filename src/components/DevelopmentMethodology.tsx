import React, { useState } from 'react';
import {
  Compass,
  Map,
  Layers,
  Code2,
  Network,
  Cpu,
  Rocket,
  RefreshCw,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/solutionsData';

interface DevelopmentMethodologyProps {
  onNavigateToContact: () => void;
}

export const DevelopmentMethodology: React.FC<DevelopmentMethodologyProps> = ({
  onNavigateToContact,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (num: string) => {
    switch (num) {
      case '01': return Compass;
      case '02': return Map;
      case '03': return Layers;
      case '04': return Code2;
      case '05': return Network;
      case '06': return Cpu;
      case '07': return Rocket;
      case '08': return RefreshCw;
      default: return Sparkles;
    }
  };

  const currentStep = METHODOLOGY_STEPS[activeStepIndex] || METHODOLOGY_STEPS[0];
  const StepIcon = getStepIcon(currentStep.number);

  return (
    <section id="methodology" className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Rocket className="w-3.5 h-3.5 text-violet-400" />
            <span>DEVELOPMENT METHODOLOGY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            From Idea to Intelligence.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            A rigorous 8-stage engineering process designed to deliver zero-downtime, fully custom AI software in weeks, not years.
          </p>
        </div>

        {/* 8-Step Timeline Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const Icon = getStepIcon(step.number);
            const isSelected = activeStepIndex === idx;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                id={`methodology-step-${step.number}`}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between h-32 focus:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-b from-violet-950/80 to-[#12121c] border-2 border-violet-400 shadow-[0_0_25px_rgba(139,92,246,0.35)] scale-105'
                    : 'bg-[#0a0a0f] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101018]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code font-bold text-violet-400">
                    {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-violet-300' : 'text-zinc-500'}`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display leading-tight truncate">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono-code mt-1">
                    {step.duration}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Deck */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090e] border border-violet-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Detailed Overview */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                  <StepIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-violet-400 font-mono-code uppercase tracking-wider">
                    PHASE {currentStep.number} OF 08 • TIMELINE: {currentStep.duration}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {currentStep.title} — {currentStep.tagline}
                  </h3>
                </div>
              </div>

              <p className="text-base text-zinc-300 leading-relaxed mb-6 font-normal">
                {currentStep.description}
              </p>

              {/* Deliverables checklist */}
              <div className="mb-8">
                <span className="text-xs font-bold text-zinc-400 font-mono-code uppercase tracking-wider block mb-3">
                  CORE DELIVERABLES IN THIS PHASE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStep.deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={onNavigateToContact}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 px-5 py-2.5 rounded-lg shadow-lg shadow-violet-600/30 transition-all"
                >
                  <span>Initiate Discovery Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono-code">
                  <Clock className="w-3.5 h-3.5" /> Fixed Milestone Deliverables
                </span>
              </div>
            </div>

            {/* Right: Architectural Milestone Box */}
            <div className="lg:col-span-5 bg-[#060609] border border-white/[0.08] rounded-2xl p-6 font-mono-code text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-zinc-400">
                <span className="text-violet-400 font-bold">STAGE_ENGINEERING_CRITERIA</span>
                <span className="text-emerald-400">SOC2 COMPLIANT</span>
              </div>

              <div className="space-y-3 text-[11px] leading-relaxed text-zinc-300">
                <div className="p-3 rounded-lg bg-violet-950/20 border border-violet-800/30">
                  <span className="text-zinc-500 block text-[10px] uppercase">Methodology Principle:</span>
                  <span className="text-white font-medium">
                    No black boxes. You own 100% of the deployed architecture, training weights, data pipelines, and custom code.
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Data Privacy Perimeter:</span>
                    <span className="text-emerald-400">Zero Public Data Leak</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Integration Latency:</span>
                    <span className="text-sky-400">&lt; 50ms sync</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Human Override SLA:</span>
                    <span className="text-violet-300">Instant Killswitch</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
