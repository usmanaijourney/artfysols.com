import React from 'react';
import { XCircle, CheckCircle2, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

export const TrustStatement: React.FC = () => {
  return (
    <section className="relative py-20 bg-[#070709] border-y border-white/[0.06] overflow-hidden">
      <div className="w-full px-[5%] relative z-10">
        <div className="w-full text-center">
          
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sliders className="w-3.5 h-3.5 text-violet-400" />
            <span>The Foundational Principle</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 font-display">
            Technology Should Adapt to Your Business.{' '}
            <span className="block text-zinc-400 font-medium text-2xl sm:text-4xl mt-2">
              Not the other way around.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Every organization has unique processes, data, people, challenges, and goals. Artify Solutions creates technology specifically around those realities.
          </p>

          {/* Contrast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            <div className="p-5 rounded-2xl bg-[#0d0d12] border border-red-500/20 hover:border-red-500/40 transition-colors">
              <div className="flex items-center gap-2.5 text-red-400 text-sm font-bold mb-2">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>No Rigid Templates</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We never force your operational workflows into off-the-shelf software constraints or generic cookie-cutter apps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0d0d12] border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2.5 text-amber-400 text-sm font-bold mb-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>No Unnecessary Bloat</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero legacy baggage, convoluted multi-level menus, or feature creep. Every line of code serves your strategic bottom line.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0d0d12] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold mb-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% Bespoke Architecture</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Engineered specifically for your proprietary taxonomy, internal security rules, and data structures from day one.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
