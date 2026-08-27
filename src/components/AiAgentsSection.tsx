import React, { useState, useEffect } from 'react';
import {
  Bot,
  Layers,
  Cpu,
  ArrowDown,
  Shield,
  Activity,
  CheckCircle2,
  Database,
  Terminal,
  Zap,
  DollarSign,
  Users,
  TrendingUp,
  Megaphone,
  Headphones,
  LineChart,
} from 'lucide-react';
import { AGENT_WORKFORCE } from '../data/solutionsData';
import { AgentProfile } from '../types';

export const AiAgentsSection: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile>(AGENT_WORKFORCE[0]);
  const [activeTab, setActiveTab] = useState<'agents' | 'architecture'>('agents');
  const [simulatedExecutionStep, setSimulatedExecutionStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedExecutionStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const businessSystemsList = [
    { name: 'ERP Platforms', desc: 'SAP, NetSuite, Dynamics', color: '#8B5CF6' },
    { name: 'CRM Systems', desc: 'Salesforce, HubSpot', color: '#38BDF8' },
    { name: 'Accounting & Banking', desc: 'QuickBooks, Plaid, Stripe', color: '#10B981' },
    { name: 'Email & Documents', desc: 'M365, Google Workspace, DocuSign', color: '#F59E0B' },
    { name: 'Databases & Warehouses', desc: 'PostgreSQL, Snowflake, BigQuery', color: '#EC4899' },
    { name: 'Cloud & Custom APIs', desc: 'AWS, Azure, REST, Webhooks', color: '#14B8A6' },
  ];

  return (
    <section id="ai-agents" className="py-28 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>AI AGENTS & DIGITAL WORKFORCE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Meet Your Digital Workforce.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal mb-4">
            Imagine having a team that works 24/7 across every operational pillar—independently intelligent, rigorously controlled, and seamlessly orchestrated.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400">
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-violet-300">An AI Finance Analyst</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-sky-300">An AI HR Assistant</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-emerald-300">An AI Sales Researcher</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-amber-300">An AI Customer Support Agent</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-pink-300">An AI Operations Coordinator</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-indigo-300">An AI Reporting Analyst</span>
          </div>
        </div>

        {/* 3-Tier Interactive Agent Orchestration Flow */}
        <div className="mb-16 p-8 rounded-3xl bg-[#0b0b10] border border-white/[0.08] shadow-2xl relative">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono-code">
              MULTI-AGENT SYSTEM TOPOLOGY
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 font-display">
              Autonomous Execution Architecture
            </h3>
          </div>

          {/* Tier 1: Artify AI Orchestrator */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/80 via-[#13131c] to-indigo-950/80 border-2 border-violet-500/50 shadow-[0_0_35px_rgba(139,92,246,0.3)] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-center gap-2 text-violet-300 text-xs font-bold font-mono-code uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                <span>CENTRAL SUPERVISOR</span>
              </div>
              <h4 className="text-xl font-extrabold text-white font-display">
                ARTIFY AI ORCHESTRATOR
              </h4>
              <p className="text-xs text-zinc-300 mt-1 max-w-md mx-auto">
                Deconstructs high-level business goals, assigns sub-tasks to specialized agents, verifies policy guardrails, and aggregates outcomes.
              </p>
            </div>
          </div>

          {/* Animated Connecting Traces */}
          <div className="flex justify-center my-3 text-violet-400 animate-bounce">
            <ArrowDown className="w-6 h-6" />
          </div>

          {/* Tier 2: Specialized Agents Carousel / Grid */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold text-zinc-400 font-mono-code uppercase tracking-wider">
                SPECIALIZED DOMAIN AGENTS (CLICK TO INSPECT PERMISSIONS & TOOLS)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {AGENT_WORKFORCE.map((agent) => {
                const isSelected = selectedAgent.id === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    id={`agent-tab-${agent.id}`}
                    className={`p-3 rounded-xl text-left transition-all duration-200 focus:outline-none flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#181824] border-2 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.35)] scale-105'
                        : 'bg-[#0d0d12] border border-white/[0.08] hover:border-violet-500/30 hover:bg-[#121218]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 rounded-md bg-violet-500/20 text-violet-300 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[13px] sm:text-sm font-bold text-white font-display leading-tight truncate">
                        {agent.name.split(' ')[0]} Agent
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {agent.department.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Connecting Traces */}
          <div className="flex justify-center my-3 text-sky-400 animate-bounce">
            <ArrowDown className="w-6 h-6" />
          </div>

          {/* Tier 3: Business Systems & Integrations */}
          <div>
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold text-zinc-400 font-mono-code uppercase tracking-wider">
                CONNECTED ENTERPRISE BUSINESS SYSTEMS
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {businessSystemsList.map((sys, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#09090d] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Database className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-xs font-bold text-zinc-200">{sys.name}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono-code">{sys.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Agent Inspector Panel */}
        <div className="p-8 rounded-2xl bg-[#0c0c12] border border-violet-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    {selectedAgent.name}
                  </h3>
                  <span className="text-[11px] font-bold font-mono-code text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded">
                    {selectedAgent.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-violet-300 font-medium mt-0.5">
                  Role: {selectedAgent.role} • Department: {selectedAgent.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono-code text-zinc-300">
              <div className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <span className="text-zinc-500 block text-[10px]">THROUGHPUT</span>
                <span className="font-bold text-white">{selectedAgent.throughput}</span>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <span className="text-zinc-500 block text-[10px]">SUPERVISION LEVEL</span>
                <span className="font-bold text-violet-300">Human-In-The-Loop</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tool Access */}
            <div className="p-5 rounded-xl bg-[#08080c] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono-code mb-3">
                <Zap className="w-4 h-4 text-violet-400" />
                <span>PROVISIONED TOOLS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-zinc-300 bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-md"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Strict Permissions & Boundaries */}
            <div className="p-5 rounded-xl bg-[#08080c] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono-code mb-3">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>SECURITY & ACCESS BOUNDARIES</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedAgent.permissions}
              </p>
            </div>

            {/* Live Sample Telemetry / Action Log */}
            <div className="p-5 rounded-xl bg-[#08080c] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono-code mb-3">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>LAST AUTONOMOUS TELEMETRY TRACE</span>
              </div>
              <p className="text-xs text-emerald-300/90 font-mono-code leading-relaxed bg-emerald-950/20 p-2.5 rounded border border-emerald-800/30">
                "{selectedAgent.sampleAction}"
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
