import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  TrendingUp,
  Megaphone,
  Cpu,
  LineChart,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
} from 'lucide-react';
import { BUSINESS_FUNCTIONS } from '../data/solutionsData';
import { BusinessFunction } from '../types';

interface SolutionsByFunctionProps {
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
}

export const SolutionsByFunction: React.FC<SolutionsByFunctionProps> = ({
  onOpenSolutionBuilder,
  onNavigateToContact,
}) => {
  const [selectedFuncId, setSelectedFuncId] = useState<string>('finance');

  const getFunctionIcon = (name: string) => {
    switch (name) {
      case 'DollarSign': return DollarSign;
      case 'Users': return Users;
      case 'TrendingUp': return TrendingUp;
      case 'Megaphone': return Megaphone;
      case 'Cpu': return Cpu;
      case 'LineChart': return LineChart;
      case 'Headphones': return Headphones;
      default: return Sparkles;
    }
  };

  const selectedFunction =
    BUSINESS_FUNCTIONS.find((f) => f.id === selectedFuncId) || BUSINESS_FUNCTIONS[0];
  const IconComponent = getFunctionIcon(selectedFunction.icon);

  return (
    <section id="functions" className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>SOLUTIONS BY BUSINESS FUNCTION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Intelligence Across Every Function.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Whether transforming a single department or weaving an organization-wide intelligence mesh, we deploy specialized autonomous agents and custom software engineered for each team.
          </p>
        </div>

        {/* Function Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-12">
          {BUSINESS_FUNCTIONS.map((fn) => {
            const FnIcon = getFunctionIcon(fn.icon);
            const isSelected = selectedFuncId === fn.id;

            return (
              <button
                key={fn.id}
                onClick={() => setSelectedFuncId(fn.id)}
                id={`func-tab-${fn.id}`}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between focus:outline-none ${
                  isSelected
                    ? 'bg-[#151522] border-2 border-violet-400 shadow-[0_0_25px_rgba(139,92,246,0.3)] scale-105'
                    : 'bg-[#0a0a0f] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101017]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-violet-600 text-white' : 'bg-white/[0.05] text-zinc-400'
                  }`}
                >
                  <FnIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display leading-tight truncate">
                    {fn.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono-code mt-0.5">
                    {fn.capabilities.length} Capabilities
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Department Showcase Deck */}
        <div className="rounded-3xl bg-[#09090e] border border-white/[0.1] shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Col: Capabilities List */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-violet-400 font-mono-code uppercase tracking-wider">
                    FUNCTIONAL CAPABILITY STACK
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {selectedFunction.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-8">
                {selectedFunction.tagline}
              </p>

              {/* Grid of Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedFunction.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0e0e16] border border-white/[0.06] hover:border-violet-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-white font-display">
                        {cap.title}
                      </h4>
                      <span className="text-[9px] font-mono-code font-bold text-violet-300 bg-violet-950/60 border border-violet-800/40 px-2 py-0.5 rounded">
                        {cap.tag}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Agent Fleet for this Function */}
              <div className="pt-4 border-t border-white/[0.08]">
                <span className="text-[11px] font-bold text-zinc-400 font-mono-code uppercase tracking-wider block mb-2">
                  DEDICATED DIGITAL AGENTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedFunction.agentFleet.map((ag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-zinc-200"
                    >
                      <Bot className="w-3.5 h-3.5 text-violet-400" />
                      <span>{ag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Live Sample Execution Trace */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#060609] border border-white/[0.08] rounded-2xl p-6">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-zinc-300 font-mono-code uppercase tracking-wider">
                    SAMPLE OPERATIONAL TRACE
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono-code">
                    AUTONOMOUS WORKFLOW
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedFunction.sampleWorkflow.map((step, sIdx) => (
                    <div key={sIdx} className="relative pl-6 pb-2">
                      {/* Vertical connector line */}
                      {sIdx !== selectedFunction.sampleWorkflow.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-0 w-[1px] bg-violet-500/30" />
                      )}
                      {/* Dot */}
                      <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#060609]" />
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono-code">
                            {step.step}
                          </span>
                          <span className="text-[10px] font-mono-code text-violet-300 bg-violet-950/40 px-2 py-0.5 rounded">
                            {step.actor}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {step.output}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] mt-6">
                <button
                  onClick={onOpenSolutionBuilder}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 py-3 rounded-xl shadow-lg shadow-violet-600/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configure {selectedFunction.name} AI Blueprint</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
