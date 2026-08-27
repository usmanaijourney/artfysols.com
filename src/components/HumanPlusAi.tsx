import React from 'react';
import {
  Users,
  Bot,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  HeartHandshake,
  Cpu,
} from 'lucide-react';

export const HumanPlusAi: React.FC = () => {
  const humanStrengths = [
    'Make high-stakes strategic & moral decisions',
    'Build trust, client relationships & culture',
    'Set enterprise vision, thesis & direction',
    'Apply nuanced creative judgment in ambiguous situations',
    'Conduct high-touch partnership negotiations',
  ];

  const aiStrengths = [
    'Eliminates 85%+ of repetitive administrative toil',
    'Analyzes millions of data points across all systems in seconds',
    'Executes multi-step workflows with zero latency',
    'Detects subtle financial and operational anomalies 24/7',
    'Generates verified board reports and forecasts instantly',
  ];

  return (
    <section className="py-28 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-violet-400" />
            <span>THE SYMBIOTIC ENTERPRISE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            AI Doesn't Replace Your Business.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
              It Amplifies It.
            </span>
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            We don't engineer technology to displace human leadership. We engineer intelligent systems that liberate your people from administrative friction, elevating their capacity to lead, create, and grow.
          </p>
        </div>

        {/* 2-Column Symbiosis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Humans */}
          <div className="p-8 rounded-3xl bg-[#09090e] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono-code font-bold text-violet-400 uppercase tracking-widest">
                  YOUR HUMAN TALENT
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Strategic Leadership & Relationships
                </h3>
              </div>
            </div>

            <div className="space-y-3.5">
              {humanStrengths.map((st, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Workforce */}
          <div className="p-8 rounded-3xl bg-[#0d0d14] border-2 border-violet-500/50 relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-300 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono-code font-bold text-sky-400 uppercase tracking-widest">
                  ARTIFY DIGITAL WORKFORCE
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Speed, Scale & Zero-Touch Execution
                </h3>
              </div>
            </div>

            <div className="space-y-3.5">
              {aiStrengths.map((st, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
