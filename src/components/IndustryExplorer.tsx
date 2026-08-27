import React, { useState } from 'react';
import {
  Landmark,
  Stethoscope,
  HardHat,
  Building2,
  ShoppingBag,
  Factory,
  GraduationCap,
  Hotel,
  Briefcase,
  ShieldCheck,
  Truck,
  Zap,
  Film,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/solutionsData';
import { Industry } from '../types';

interface IndustryExplorerProps {
  onOpenSolutionBuilder: (industryId?: string) => void;
  onNavigateToContact: () => void;
}

export const IndustryExplorer: React.FC<IndustryExplorerProps> = ({
  onOpenSolutionBuilder,
  onNavigateToContact,
}) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('finance');

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return Landmark;
      case 'Stethoscope': return Stethoscope;
      case 'HardHat': return HardHat;
      case 'Building2': return Building2;
      case 'ShoppingBag': return ShoppingBag;
      case 'Factory': return Factory;
      case 'GraduationCap': return GraduationCap;
      case 'Hotel': return Hotel;
      case 'Briefcase': return Briefcase;
      case 'ShieldCheck': return ShieldCheck;
      case 'Truck': return Truck;
      case 'Zap': return Zap;
      case 'Film': return Film;
      default: return Sparkles;
    }
  };

  const selectedIndustry =
    INDUSTRIES_DATA.find((ind) => ind.id === selectedIndustryId) || INDUSTRIES_DATA[0];

  const IconComponent = getIndustryIcon(selectedIndustry.icon);

  return (
    <section id="industries" className="py-28 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-violet-400" />
            <span>INDUSTRY INTELLIGENCE MATRIX</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            AI Has No Industry Limit.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Our architecture is designed to adapt to your organization—not the other way around. Select an industry to explore bespoke AI agents, autonomous workflows, and integration stacks.
          </p>
        </div>

        {/* Industry Chips / Carousel */}
        <div className="flex flex-wrap gap-2.5 mb-12 pb-2">
          {INDUSTRIES_DATA.map((ind) => {
            const IndIcon = getIndustryIcon(ind.icon);
            const isSelected = selectedIndustryId === ind.id;

            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustryId(ind.id)}
                id={`industry-btn-${ind.id}`}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 scale-105'
                    : 'bg-[#0e0e14] text-zinc-300 border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#14141d]'
                }`}
              >
                <IndIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Industry Display Deck */}
        <div className="rounded-3xl bg-[#0b0b10] border border-violet-500/30 shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Col: Overview & Core Agents */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-violet-400 uppercase tracking-widest font-mono-code">
                      INDUSTRY BLUEPRINT
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {selectedIndustry.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-violet-300 mb-3">
                  {selectedIndustry.tagline}
                </p>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {selectedIndustry.description}
                </p>

                {/* Core Agents */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-zinc-400 font-mono-code uppercase tracking-wider block mb-3">
                    DEPLOYED DOMAIN AGENTS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustry.coreAgents.map((ag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-200"
                      >
                        <Cpu className="w-3 h-3 text-violet-400" />
                        <span>{ag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Systems */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-zinc-400 font-mono-code uppercase tracking-wider block mb-3">
                    CONNECTED ECOSYSTEM
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustry.connectedSystems.map((sys, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#13131c] border border-white/[0.06] text-[11px] font-mono-code text-zinc-300"
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.08]">
                {selectedIndustry.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/[0.02]">
                    <div className="text-lg font-black text-white font-display">{m.value}</div>
                    <div className="text-[10px] text-zinc-400 font-medium leading-tight mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: High-Impact Autonomous Workflows */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-zinc-300 font-mono-code uppercase tracking-wider">
                    REPRESENTATIVE AUTONOMOUS WORKFLOWS
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono-code flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Production-Grade
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {selectedIndustry.keyWorkflows.map((wf, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#0e0e15] border border-white/[0.08] hover:border-violet-500/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-base font-bold text-white font-display">
                          {wf.title}
                        </h4>
                        <span className="text-[11px] font-bold font-mono-code text-violet-300 bg-violet-950/60 border border-violet-800/40 px-2.5 py-0.5 rounded-full shrink-0">
                          {wf.impact}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {wf.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA bar */}
              <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <div className="text-xs font-bold text-white">
                    Need an AI solution engineered for {selectedIndustry.name}?
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    We architect around your specific compliance, telemetry, and team workflows.
                  </div>
                </div>

                <button
                  onClick={() => onOpenSolutionBuilder(selectedIndustry.id)}
                  id={`builder-cta-${selectedIndustry.id}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 px-4 py-2.5 rounded-lg shadow-md shadow-violet-600/30 transition-all shrink-0"
                >
                  <span>Build For This Industry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
