import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Building2,
  Clock,
  Zap,
} from 'lucide-react';
import { CASE_STUDIES } from '../data/solutionsData';
import { CaseStudy } from '../types';

interface CaseStudiesSectionProps {
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onOpenSolutionBuilder,
  onNavigateToContact,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const selectedCase =
    CASE_STUDIES.find((cs) => cs.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <section className="py-28 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>TRANSFORMATION BLUEPRINTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            What We Can Transform.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Deep architectural blueprints showcasing how Artify replaces fragmented operational toil with custom, multi-agent AI ecosystems.
          </p>
        </div>

        {/* Case Studies Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {CASE_STUDIES.map((cs) => {
            const isSelected = selectedCaseId === cs.id;

            return (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                id={`case-study-tab-${cs.id}`}
                className={`p-4 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between focus:outline-none ${
                  isSelected
                    ? 'bg-[#151522] border-2 border-violet-400 shadow-[0_0_25px_rgba(139,92,246,0.3)] scale-105'
                    : 'bg-[#0a0a0f] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101018]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-code font-bold text-violet-400 uppercase">
                      {cs.industry}
                    </span>
                    <span className="text-[9px] font-mono-code text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded">
                      {cs.timeframe}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display leading-tight mb-1">
                    {cs.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {cs.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Deep Dive */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090e] border border-violet-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Challenge & Solution */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400 font-mono-code uppercase mb-2">
                <span>{selectedCase.clientType}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-4">
                {selectedCase.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-medium">
                {selectedCase.tagline}
              </p>

              {/* Challenge */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 mb-4">
                <span className="text-xs font-bold text-red-400 font-mono-code uppercase block mb-1">
                  THE OPERATIONAL BOTTLENECK:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedCase.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/40 mb-6">
                <span className="text-xs font-bold text-violet-300 font-mono-code uppercase block mb-1">
                  THE ARTIFY AI-NATIVE SOLUTION:
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {selectedCase.solution}
                </p>
              </div>

              {/* Connected Stack */}
              <div className="pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-bold text-zinc-400 font-mono-code uppercase tracking-wider block mb-2">
                  INTEGRATED SYSTEMS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.systemsConnected.map((sys, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#12121c] border border-white/[0.08] text-xs font-mono-code text-zinc-300"
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quantified Outcomes & ROI Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#060609] border border-white/[0.08] rounded-2xl p-6">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-zinc-300 font-mono-code uppercase tracking-wider">
                    MEASURED OPERATIONAL IMPACT
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono-code flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>

                {/* Metrics Stack */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {selectedCase.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0c0c12] border border-white/[0.06]"
                    >
                      <div className="text-2xl font-black text-white font-display">
                        {res.metric}
                      </div>
                      <div className="text-xs text-violet-300 font-medium mt-0.5">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-zinc-300 leading-relaxed font-mono-code">
                  <span className="text-emerald-400 font-bold block mb-1">DEPLOYMENT TIMELINE:</span>
                  Completed from initial Discovery to 100% production rollout in {selectedCase.timeframe}.
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] mt-6">
                <button
                  onClick={onNavigateToContact}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 py-3 rounded-xl shadow-lg shadow-violet-600/30 transition-all"
                >
                  <span>Request Similar Architecture Blueprint</span>
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
