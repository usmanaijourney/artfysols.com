import React from 'react';
import {
  Users,
  Workflow,
  Database,
  Layers,
  Compass,
  Target,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ArtifyDifference: React.FC = () => {
  const analysisChain = [
    { title: 'People', desc: 'Who operates, decides, approves, and executes daily.', icon: Users, color: '#8B5CF6' },
    { title: 'Processes', desc: 'The exact step-by-step handoffs, edge cases, and bottlenecks.', icon: Workflow, color: '#38BDF8' },
    { title: 'Data', desc: 'Where transactions, customer records, and knowledge reside.', icon: Database, color: '#10B981' },
    { title: 'Systems', desc: 'The existing ERP, CRM, banking, and legacy tools in place.', icon: Layers, color: '#F59E0B' },
    { title: 'Decisions', desc: 'The critical judgment calls that steer financial and ops outcomes.', icon: Compass, color: '#EC4899' },
    { title: 'Goals', desc: 'The strategic revenue, margin, and speed targets to conquer.', icon: Target, color: '#14B8A6' },
  ];

  return (
    <section className="py-28 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>THE ARTIFY DIFFERENCE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            We Don’t Start With Software.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
              We Start With Understanding.
            </span>
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Traditional software vendors attempt to force your company into their pre-baked schemas. We work in reverse—mastering your internal dynamics first, then engineering technology around them.
          </p>
        </div>

        {/* Contrast Comparison Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Traditional Software House */}
          <div className="p-8 rounded-3xl bg-[#09090d] border border-red-500/20 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 font-mono-code uppercase tracking-wider mb-4">
              <XCircle className="w-4 h-4" />
              <span>THE TRADITIONAL SOFTWARE APPROACH</span>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 mb-6">
              <span className="text-xs text-red-300 font-mono-code block mb-1">TRADITIONAL QUESTION:</span>
              <p className="text-base font-bold text-white italic">
                "What pre-made application do you want us to build or install?"
              </p>
            </div>

            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Forces your unique operations into generic SaaS templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Requires endless change-management training to fit the tool</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Treats AI as a cosmetic chatbot widget on top of static databases</span>
              </li>
            </ul>
          </div>

          {/* The Artify Approach */}
          <div className="p-8 rounded-3xl bg-[#0d0d14] border-2 border-violet-500/50 relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-400 font-mono-code uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>THE ARTIFY INTELLIGENCE PARADIGM</span>
            </div>

            <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-800/50 mb-6">
              <span className="text-xs text-violet-300 font-mono-code block mb-1">ARTIFY QUESTION:</span>
              <p className="text-base font-bold text-white italic">
                "How does your business actually operate, decide, and win?"
              </p>
            </div>

            <ul className="space-y-3 text-xs text-zinc-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Engineers bespoke AI software around your exact people and processes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero workflow disruption; software adapts seamlessly to your team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>AI acts as an autonomous execution engine embedded in core architecture</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 6-Stage Analysis Chain: People -> Processes -> Data -> Systems -> Decisions -> Goals */}
        <div className="p-8 rounded-3xl bg-[#09090e] border border-white/[0.08]">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-violet-400 font-mono-code uppercase tracking-widest block mb-1">
              THE 6-DIMENSION OPERATIONAL AUDIT
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              We Map Your Operational DNA Before Writing a Single Line of Code
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {analysisChain.map((node, i) => {
              const NodeIcon = node.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#111118] border border-white/[0.06] hover:border-violet-500/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        backgroundColor: `${node.color}15`,
                        color: node.color,
                        border: `1px solid ${node.color}30`,
                      }}
                    >
                      <NodeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-mono-code font-bold text-zinc-500">0{i + 1}</span>
                      <h4 className="text-sm font-bold text-white font-display">{node.title}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {node.desc}
                    </p>
                  </div>

                  {i < analysisChain.length - 1 && (
                    <div className="hidden lg:block pt-3 text-right text-zinc-600 text-xs">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
