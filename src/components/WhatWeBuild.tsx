import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  Layers,
  LayoutDashboard,
  Smartphone,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  MessageSquare,
  Zap,
} from 'lucide-react';

interface WhatWeBuildProps {
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
}

interface CapabilityItem {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  sampleQuery?: string;
  badge: string;
  color: string;
}

export const WhatWeBuild: React.FC<WhatWeBuildProps> = ({
  onOpenSolutionBuilder,
  onNavigateToContact,
}) => {
  const [selectedCapability, setSelectedCapability] = useState<string>('agents');

  const capabilities: CapabilityItem[] = [
    {
      id: 'ai-native-software',
      icon: Cpu,
      title: 'AI-Native Software',
      tagline: 'Intelligence embedded at the atomic architecture level',
      description:
        'Software where artificial intelligence is not a tacked-on widget or simple API wrapper. AI is baked directly into the data models, state machines, and real-time computation layers.',
      features: [
        'Context-aware state engines that adapt UI dynamically to user behavior',
        'Continuous predictive pre-fetching and semantic caching',
        'Self-healing data pipelines that detect schema drift automatically',
        'High-density, distraction-free modern responsive interfaces',
      ],
      badge: 'Core Architecture',
      color: '#8B5CF6',
    },
    {
      id: 'agents',
      icon: Bot,
      title: 'Autonomous AI Agents',
      tagline: 'Goal-seeking digital team members operating 24/7',
      description:
        'Intelligent multi-agent workforces capable of reasoning through complex objectives, selecting tools, performing operations, and maintaining strict safety boundaries.',
      features: [
        'Understand multi-step operational objectives in natural language',
        'Direct tool use: SQL querying, API posting, document parsing, email drafting',
        'Strict guardrails: zero unauthorized actions without human-in-the-loop sign-off',
        'Autonomous exception escalation with contextual briefing dossiers',
      ],
      badge: 'Autonomous Workforce',
      color: '#38BDF8',
    },
    {
      id: 'automation',
      icon: Workflow,
      title: 'Intelligent Automation',
      tagline: 'Transform repetitive toil into self-driving business loops',
      description:
        'End-to-end transformation of high-volume, repetitive human workflows into robust cognitive pipelines with sub-second execution.',
      features: [
        'Touchless Invoice & Receipt Processing (3-way PO matching)',
        'Multi-entity Payroll validation & tax compliance checks',
        'Automated Procurement & vendor change order audits',
        'Intelligent customer intake, KYC, and document compliance',
      ],
      badge: 'Zero-Touch Ops',
      color: '#10B981',
    },
    {
      id: 'custom-platforms',
      icon: Layers,
      title: 'Custom Business Platforms',
      tagline: 'Bespoke ERPs, CRMs, and operating systems for your exact model',
      description:
        'We build complete end-to-end enterprise software tailored strictly around how your teams, data, and customers actually interact.',
      features: [
        'Custom ERP & Finance Operating Platforms',
        'Specialized CRM & Pipeline Intelligence Systems',
        'People Operations & HR Management Systems',
        'Field Operations & Resource Scheduling Platforms',
      ],
      badge: 'Bespoke Platforms',
      color: '#F59E0B',
    },
    {
      id: 'ai-dashboards',
      icon: LayoutDashboard,
      title: 'Conversational AI Dashboards',
      tagline: 'Turn static business data into interactive decision systems',
      description:
        'Stop waiting weeks for BI reports. Converse with your entire data lake in natural language and receive instant, verified answers backed by source citations.',
      features: [
        'Instant natural language variance analysis ("Why did OPEX spike?")',
        'Predictive customer churn & revenue risk sentinel',
        'Automated CEO & Board-level presentation generation',
        'Real-time anomaly identification across multi-department databases',
      ],
      sampleQuery: '"Show me why expenses increased this month and which vendor contracts are expiring."',
      badge: 'Conversational BI',
      color: '#EC4899',
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'AI-Powered Mobile Applications',
      tagline: 'Executive decision power & field intelligence in your pocket',
      description:
        'Extend your enterprise AI systems to smartphones and tablets with offline-first sync, voice assistants, and rapid approval flows.',
      features: [
        'Executive Mobile Command: real-time KPI alerts & conversational voice queries',
        'One-Tap Approval Flows for purchase orders, hires, and change requests',
        'Field Operations: voice-dictated daily logs with auto-photo defect tagging',
        'Push Alerts triggered by predictive risk sentinels',
      ],
      badge: 'Mobile Native',
      color: '#14B8A6',
    },
  ];

  const currentItem = capabilities.find((c) => c.id === selectedCapability) || capabilities[0];
  const Icon = currentItem.icon;

  return (
    <section id="what-we-build" className="py-28 bg-[#050505] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span>WHAT WE BUILD</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Intelligence, Engineered.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            From individual autonomous AI agents to complete enterprise operating ecosystems, we build the bespoke technology layer your organization needs to outperform.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {capabilities.map((item) => {
            const ItemIcon = item.icon;
            const isSelected = selectedCapability === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCapability(item.id)}
                id={`capability-card-${item.id}`}
                className={`group relative p-7 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#111117] border-2 border-violet-500/80 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
                    : 'bg-[#0a0a0e] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0f0f15]'
                }`}
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <ItemIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-400 font-mono-code bg-white/[0.05] px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-violet-300 mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  {item.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex items-center text-xs font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                    <span>Inspect deep architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Capability Deep-Dive Interactive Drawer */}
        <div className="p-8 rounded-2xl bg-[#0c0c11] border border-violet-500/30 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-widest font-mono-code mb-2">
                <Icon className="w-4 h-4" />
                <span>ARCHITECTURAL SPOTLIGHT: {currentItem.title}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 font-display">
                {currentItem.tagline}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {currentItem.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentItem.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-start gap-2 text-xs text-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenSolutionBuilder}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 px-5 py-2.5 rounded-lg shadow-lg shadow-violet-600/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Build Solution in This Category</span>
                </button>
                <button
                  onClick={onNavigateToContact}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white bg-[#16161f] border border-white/[0.1] px-4 py-2.5 rounded-lg transition-colors"
                >
                  <span>Request Custom Briefing</span>
                </button>
              </div>
            </div>

            {/* Right side live interactive simulation */}
            <div className="lg:col-span-5 bg-[#070709] border border-white/[0.1] rounded-xl p-5 font-mono-code text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] text-zinc-400">artify-kernel-v2.8</span>
                </div>
                <span className="text-[10px] text-emerald-400">ONLINE</span>
              </div>

              <div className="space-y-2.5 text-[11px] leading-relaxed">
                <div className="text-zinc-400 flex items-center gap-2">
                  <span className="text-violet-400">system:</span>
                  <span>Mounting {currentItem.title} intelligence pipeline...</span>
                </div>
                <div className="p-2.5 rounded bg-violet-950/30 border border-violet-800/40 text-violet-200">
                  <span className="text-zinc-400 font-bold block mb-1">EXECUTION POLICY:</span>
                  <span>Autonomous where appropriate • Human-controlled where necessary</span>
                </div>
                <div className="text-zinc-300">
                  <span className="text-sky-400">telemetry:</span> latency: 1.4ms | throughput: 4,200 req/s | safety_check: PASSED
                </div>
                {currentItem.sampleQuery && (
                  <div className="mt-3 p-3 rounded bg-[#121218] border border-white/[0.08]">
                    <span className="text-zinc-500 text-[10px] block">SAMPLE NATURAL LANGUAGE INPUT:</span>
                    <span className="text-emerald-300 italic">{currentItem.sampleQuery}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
