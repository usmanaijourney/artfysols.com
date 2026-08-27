import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ActiveAIProject, PurchasedProduct } from '../../types';
import {
  Zap,
  Activity,
  Bot,
  Clock,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Plus,
  Key,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Server,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Play,
  Copy,
  Terminal,
  Send,
  X,
  Sliders,
  Database,
  Code2,
  FileText,
  Calendar,
  Lock,
} from 'lucide-react';

interface ClientDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenDeployModal: () => void;
  theme?: 'dark' | 'light';
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  onNavigateTab,
  onOpenDeployModal,
  theme = 'dark',
}) => {
  const { user } = useAuth();
  if (!user) return null;

  const isLight = theme === 'light';

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'projects' | 'agents'>('all');

  // Modals & Drawers State
  const [selectedProject, setSelectedProject] = useState<ActiveAIProject | null>(null);
  const [testingAgent, setTestingAgent] = useState<PurchasedProduct | null>(null);
  const [agentTestPrompt, setAgentTestPrompt] = useState('');
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testOutputLog, setTestOutputLog] = useState<{ step: string; detail: string; status: 'ok' | 'active' }[] | null>(null);
  const [selectedAgentDetails, setSelectedAgentDetails] = useState<PurchasedProduct | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [restartingId, setRestartingId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string>('');

  // Calculations for Billing Status
  const totalTokens = user.subscription.monthlyTokenQuota;
  const usedTokens = user.subscription.monthlyTokensUsed;
  const tokenPercentage = Math.min(100, Math.round((usedTokens / totalTokens) * 100));

  const totalConcurrency = user.subscription.agentConcurrencyLimit;
  const activeConcurrency = user.subscription.activeAgentsCount;
  const concurrencyPercentage = Math.min(100, Math.round((activeConcurrency / totalConcurrency) * 100));

  const totalHoursSaved = user.purchasedProducts.reduce(
    (acc, prod) => acc + (prod.monthlyHoursSaved || 0),
    0
  );

  const totalRequests = user.purchasedProducts.reduce(
    (acc, prod) => acc + (prod.requestsThisMonth || 0),
    0
  );

  const activeProjectsList: ActiveAIProject[] = user.activeProjects || [
    {
      id: 'proj-default-1',
      name: 'Autonomous Operations & Reconciliation Layer',
      category: 'Enterprise Integration',
      status: 'in_production',
      stageProgress: 95,
      startDate: '2025-11-01',
      targetLaunchDate: '2026-09-01',
      leadArchitect: user.subscription.dedicatedArchitectName || 'Dr. Elena Rostova',
      description: 'End-to-end continuous optimization of financial transactions and automated multi-agent operational routing.',
      techStack: ['NetSuite ERP', 'Stripe Billing', 'AWS ECS', 'Kafka Streams'],
      assignedAgents: ['Ledger Reconciliation Sentinel', 'Invoice OCR Parser'],
      milestones: [
        { title: 'ERP Schema Synchronization', status: 'completed', completionDate: 'Dec 2025' },
        { title: 'Multi-Agent Validation Sandbox', status: 'completed', completionDate: 'Feb 2026' },
        { title: 'Full Autonomous Enterprise Production', status: 'in_progress', completionDate: 'Target: Sep 2026' },
      ],
      kpis: [
        { label: 'Reconciliation Latency', value: '142ms', trend: '-45% faster' },
        { label: 'Monthly Hours Saved', value: `${totalHoursSaved}h`, trend: '+28%' },
      ],
      liveEndpoint: 'https://api.artifysols.com/v1/finance/reconciliation',
      recentLogs: [
        { timestamp: '14:20:00 UTC', event: 'Autonomous zero-exception matching cycle completed.', status: 'ok' },
        { timestamp: '12:00:00 UTC', event: 'Health check probe returned 200 OK across all containers.', status: 'ok' },
      ],
    },
  ];

  // Filtering
  const filteredProjects = activeProjectsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAgents = user.purchasedProducts.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.assignedAgents.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      a.connectedSystems.some((sys) => sys.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setActionFeedback(`Copied ${label} to clipboard`);
    setTimeout(() => {
      setCopiedKey(null);
      setActionFeedback('');
    }, 3000);
  };

  // Restart Container Simulation
  const handleRestart = (productId: string, productName: string) => {
    setRestartingId(productId);
    setActionFeedback(`Restarting execution container for ${productName}...`);
    setTimeout(() => {
      setRestartingId(null);
      setActionFeedback(`Container for ${productName} restarted successfully (Health: 100% Operational).`);
      setTimeout(() => setActionFeedback(''), 4000);
    }, 1800);
  };

  // Execute Agent Test Simulation
  const handleRunAgentTest = (agent: PurchasedProduct) => {
    setTestingAgent(agent);
    setTestOutputLog(null);
    if (!agentTestPrompt) {
      if (agent.category === 'autonomous_agent') {
        setAgentTestPrompt(`Simulate matching incoming supplier invoice #INV-9824 ($14,250.00) against Purchase Order #PO-88401 and bank feed settlement.`);
      } else if (agent.category === 'bi_dashboard') {
        setAgentTestPrompt(`Synthesize a breakdown of regional shipping margin variance for Q3 2026 grouped by carrier.`);
      } else {
        setAgentTestPrompt(`Execute automated dispatch evaluation on batch #DISP-992 with priority SLA constraints.`);
      }
    }
  };

  const executeSimulation = () => {
    if (!testingAgent) return;
    setIsTestRunning(true);
    setTestOutputLog([
      { step: '1. Ingress & Auth Verification', detail: `Validating license key ${testingAgent.licenseKey.slice(0, 14)}... from authorized origin.`, status: 'ok' },
    ]);

    setTimeout(() => {
      setTestOutputLog((prev) => [
        ...(prev || []),
        { step: '2. Multi-Agent Context Assembly', detail: `Routing prompt payload to [${testingAgent.assignedAgents.join(', ')}] with zero-trust RBAC sandbox.`, status: 'ok' },
      ]);
    }, 600);

    setTimeout(() => {
      setTestOutputLog((prev) => [
        ...(prev || []),
        { step: '3. Real-Time Tool Calling & Execution', detail: `Interrogating connected systems: [${testingAgent.connectedSystems.join(', ')}]. Zero anomalies found.`, status: 'ok' },
      ]);
    }, 1200);

    setTimeout(() => {
      setTestOutputLog((prev) => [
        ...(prev || []),
        { step: '4. Autonomous Synthesis Complete', detail: `Execution finalized in ${testingAgent.telemetry.latencyMs}ms. Return code: 200 SUCCESS (Audit record #EVT-${Math.floor(100000 + Math.random() * 900000)} generated).`, status: 'ok' },
      ]);
      setIsTestRunning(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="client-dashboard-container">
      {/* Toast feedback */}
      {actionFeedback && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-xl animate-in slide-in-from-bottom-3 ${
          isLight
            ? 'bg-slate-900/90 border border-slate-700 text-white'
            : 'bg-violet-950/90 border border-violet-400/50 text-violet-100'
        }`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-400' : 'text-violet-400'}`} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Header Banner: Greeting, Company Name & High-Level Actions */}
      <div className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 shadow-xl transition-all ${
        isLight
          ? 'bg-gradient-to-br from-white via-violet-50/60 to-indigo-50/50 border border-violet-200 text-slate-900 shadow-slate-200/50'
          : 'bg-gradient-to-br from-[#121220] via-[#0d0d16] to-[#151226] border border-violet-500/30 text-white shadow-black/60'
      }`}>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 ${
          isLight ? 'bg-violet-400/10' : 'bg-violet-600/10'
        }`} />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-mono-code uppercase tracking-wider ${
                isLight
                  ? 'bg-violet-100 border border-violet-200 text-violet-800'
                  : 'bg-violet-900/60 border border-violet-400/40 text-violet-300'
              }`}>
                {user.subscription.planName}
              </span>
              <span className={`flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                isLight
                  ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                  : 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Fleet Operational
              </span>
              <span className={`text-[11px] font-mono-code px-2.5 py-0.5 rounded-full border ${
                isLight
                  ? 'text-slate-600 bg-slate-100 border-slate-200'
                  : 'text-zinc-400 bg-white/[0.04] border-white/[0.08]'
              }`}>
                {user.timezone.split(' ')[0]}
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Client Command Center: {user.company}
            </h1>
            <p className={`text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-zinc-300'
            }`}>
              Logged in as <strong className={isLight ? 'text-slate-900' : 'text-white'}>{user.name}</strong> ({user.role}). Currently managing{' '}
              <span className={isLight ? 'text-violet-700 font-semibold' : 'text-violet-300 font-semibold'}>{activeProjectsList.length} active AI projects</span> and{' '}
              <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-300 font-semibold'}>{user.purchasedProducts.length} purchased AI systems</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('seo')}
              id="dashboard-seo-health-btn"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] border ${
                isLight
                  ? 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-900 shadow-sm'
                  : 'bg-emerald-950/40 hover:bg-emerald-950/70 border-emerald-500/30 text-emerald-300'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>SEO Health (94/100)</span>
            </button>
            <button
              onClick={() => onNavigateTab('subscriptions')}
              id="dashboard-billing-overview-btn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all hover:scale-[1.02]"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Billing & Quota Settings</span>
            </button>
            <button
              onClick={onOpenDeployModal}
              id="dashboard-deploy-agent-btn"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] border ${
                isLight
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-sm'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.1] text-zinc-200 hover:text-white'
              }`}
            >
              <Plus className={`w-3.5 h-3.5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <span>Deploy New Solution</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEO HEALTH TELEMETRY QUICK BANNER */}
      <div
        onClick={() => onNavigateTab('seo')}
        className={`p-4 sm:p-5 rounded-2xl border cursor-pointer group transition-all ${
          isLight
            ? 'bg-gradient-to-r from-emerald-50/70 via-white to-violet-50/70 border-slate-200 hover:border-emerald-300 shadow-sm'
            : 'bg-gradient-to-r from-emerald-950/30 via-[#0b0b14] to-violet-950/30 border-white/[0.08] hover:border-emerald-500/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Search Intelligence & SEO Health Dashboard
                </span>
                <span className="text-[10px] font-mono-code font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +155% CTR
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                148.2k Organic Impressions · 34 keywords in Top 3 (#1 Vector RAG) · 48 dynamic sitemap URLs indexed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className={`text-xs font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              Inspect SERP & Rankings
            </span>
            <ChevronRight className="w-4 h-4 text-emerald-500 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* SECTION 1: BILLING STATUS & FLEET TELEMETRY ROW */}
      <section className="space-y-4" aria-labelledby="billing-status-heading">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
            <h2 id="billing-status-heading" className={`text-sm font-bold font-display uppercase tracking-wider ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Billing & Account Quota Status
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('subscriptions')}
            className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
              isLight ? 'text-violet-700 hover:text-violet-900' : 'text-violet-400 hover:text-violet-300'
            }`}
          >
            <span>Manage Plan & Invoices</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Subscription Tier & Renewal */}
          <div className={`p-5 rounded-2xl relative overflow-hidden group transition-all ${
            isLight
              ? 'bg-white border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-md'
              : 'bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Current Plan & Investment</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLight
                  ? 'bg-violet-100 border border-violet-200 text-violet-700'
                  : 'bg-violet-950/60 border border-violet-500/30 text-violet-400'
              }`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-bold font-display ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                ${user.subscription.price.toLocaleString()}
              </span>
              <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                /{user.subscription.billingCycle === 'annual' ? 'yr' : 'mo'}
              </span>
            </div>
            <div className={`mt-3 pt-3 border-t text-[11px] space-y-1 ${
              isLight ? 'border-slate-100 text-slate-600' : 'border-white/[0.04] text-zinc-400'
            }`}>
              <div className="flex items-center justify-between">
                <span>Cycle:</span>
                <span className={`font-medium capitalize ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.subscription.billingCycle} (Auto-Renew)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Next Renewal:</span>
                <span className={`font-mono-code font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{user.subscription.renewsOn}</span>
              </div>
            </div>
          </div>

          {/* Card 2: High-Performance Token Quota */}
          <div className={`p-5 rounded-2xl relative overflow-hidden group transition-all ${
            isLight
              ? 'bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md'
              : 'bg-[#0c0c14] border border-white/[0.08] hover:border-indigo-500/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Monthly LLM Token Pool</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLight
                  ? 'bg-indigo-100 border border-indigo-200 text-indigo-700'
                  : 'bg-indigo-950/60 border border-indigo-500/30 text-indigo-400'
              }`}>
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-bold font-display ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {Math.round(usedTokens / 1_000_000)}M
              </span>
              <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                / {Math.round(totalTokens / 1_000_000)}M ({tokenPercentage}%)
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 mt-3 overflow-hidden ${
              isLight ? 'bg-slate-100' : 'bg-white/[0.06]'
            }`}>
              <div
                className={`h-full rounded-full ${
                  tokenPercentage > 85 ? 'bg-amber-500' : 'bg-gradient-to-r from-violet-500 to-indigo-500'
                }`}
                style={{ width: `${tokenPercentage}%` }}
              />
            </div>
            <div className={`mt-2.5 flex items-center justify-between text-[11px] ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              <span className={`font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Healthy Burn Rate</span>
              <span>Resets in {user.subscription.renewsOn.split('-')[1]}d</span>
            </div>
          </div>

          {/* Card 3: Agent Concurrency Capacity */}
          <div className={`p-5 rounded-2xl relative overflow-hidden group transition-all ${
            isLight
              ? 'bg-white border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-md'
              : 'bg-[#0c0c14] border border-white/[0.08] hover:border-sky-500/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Autonomous Agent Capacity</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLight
                  ? 'bg-sky-100 border border-sky-200 text-sky-700'
                  : 'bg-sky-950/60 border border-sky-500/30 text-sky-400'
              }`}>
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-bold font-display ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {activeConcurrency}
              </span>
              <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                / {totalConcurrency} Max Concurrent
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 mt-3 overflow-hidden ${
              isLight ? 'bg-slate-100' : 'bg-white/[0.06]'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"
                style={{ width: `${concurrencyPercentage}%` }}
              />
            </div>
            <div className={`mt-2.5 flex items-center justify-between text-[11px] ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              <span className={`font-medium ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>{totalConcurrency - activeConcurrency} Slots Available</span>
              <span>Zero Queue Backlog</span>
            </div>
          </div>

          {/* Card 4: Payment Method & Latest Invoice */}
          <div className={`p-5 rounded-2xl relative overflow-hidden group transition-all ${
            isLight
              ? 'bg-white border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md'
              : 'bg-[#0c0c14] border border-white/[0.08] hover:border-emerald-500/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Payment & Ledger</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLight
                  ? 'bg-emerald-100 border border-emerald-200 text-emerald-700'
                  : 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-400'
              }`}>
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded font-mono-code text-xs uppercase font-bold border ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-white/[0.06] border-transparent text-white'
              }`}>
                {user.paymentMethod.brand} •••• {user.paymentMethod.last4}
              </span>
              <span className={`text-[10px] font-mono-code font-semibold ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                Expires {user.paymentMethod.expiry}
              </span>
            </div>
            <div className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] ${
              isLight ? 'border-slate-100' : 'border-white/[0.04]'
            }`}>
              <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Latest Receipt:</span>
              <button
                onClick={() => onNavigateTab('invoices')}
                className={`font-medium flex items-center gap-1 transition-colors ${
                  isLight ? 'text-violet-700 hover:text-violet-900' : 'text-violet-400 hover:text-violet-300'
                }`}
              >
                <span>{user.invoices[0]?.invoiceNumber || 'INV-2026-0882'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTER BAR */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl transition-all ${
        isLight ? 'bg-white border border-slate-200 shadow-sm' : 'bg-[#090912] border border-white/[0.06]'
      }`}>
        <div className="relative w-full sm:w-80">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search active projects, agents, stack..."
            className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs transition-colors focus:outline-none ${
              isLight
                ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-violet-500'
                : 'bg-[#12121e] border border-white/[0.08] text-white placeholder-zinc-500 focus:border-violet-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-sm'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            All Items ({activeProjectsList.length + user.purchasedProducts.length})
          </button>
          <button
            onClick={() => setSelectedCategory('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'projects'
                ? 'bg-violet-600 text-white shadow-sm'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            AI Projects ({activeProjectsList.length})
          </button>
          <button
            onClick={() => setSelectedCategory('agents')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'agents'
                ? 'bg-violet-600 text-white shadow-sm'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            Purchased Agents ({user.purchasedProducts.length})
          </button>
        </div>
      </div>

      {/* SECTION 2: SUMMARY OF ACTIVE AI PROJECTS */}
      {(selectedCategory === 'all' || selectedCategory === 'projects') && (
        <section className="space-y-4" aria-labelledby="active-projects-heading">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 id="active-projects-heading" className={`text-sm font-bold font-display uppercase tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Active AI Projects & Deployment Pipelines
              </h2>
              <span className={`text-[11px] font-mono-code px-2 py-0.5 rounded-full ${
                isLight
                  ? 'bg-violet-100 border border-violet-200 text-violet-800 font-semibold'
                  : 'bg-violet-950/70 border border-violet-500/30 text-violet-300'
              }`}>
                {filteredProjects.length} Managed
              </span>
            </div>
            <button
              onClick={onOpenDeployModal}
              className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                isLight ? 'text-violet-700 hover:text-violet-900' : 'text-violet-400 hover:text-violet-300'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Request New AI Pipeline</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`p-5 rounded-2xl transition-all flex flex-col justify-between space-y-4 group shadow-sm ${
                  isLight
                    ? 'bg-white border border-slate-200 hover:border-violet-300 hover:shadow-md text-slate-900'
                    : 'bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/40 text-white'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Status & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono-code uppercase font-semibold border ${
                      isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                    }`}>
                      {project.category}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-[10px] font-mono-code px-2 py-0.5 rounded-full border font-medium ${
                        project.status === 'in_production'
                          ? isLight
                            ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                            : 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30'
                          : isLight
                          ? 'text-amber-800 bg-amber-50 border-amber-200'
                          : 'text-amber-400 bg-amber-950/50 border-amber-500/30'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {project.status === 'in_production' ? 'In Production' : 'Staging / Validation'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className={`text-sm font-bold font-display transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-violet-700' : 'text-white group-hover:text-violet-300'
                    }`}>
                      {project.name}
                    </h3>
                    <p className={`text-xs line-clamp-2 mt-1 leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-zinc-400'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Progress Bar & Target Date */}
                  <div className="space-y-1.5 pt-1">
                    <div className={`flex items-center justify-between text-[11px] ${
                      isLight ? 'text-slate-600' : 'text-zinc-400'
                    }`}>
                      <span>Deployment Pipeline Progress</span>
                      <span className={`font-mono-code font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{project.stageProgress}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 overflow-hidden ${
                      isLight ? 'bg-slate-100' : 'bg-white/[0.06]'
                    }`}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
                        style={{ width: `${project.stageProgress}%` }}
                      />
                    </div>
                    <div className={`flex items-center justify-between text-[10px] font-mono-code pt-0.5 ${
                      isLight ? 'text-slate-500' : 'text-zinc-500'
                    }`}>
                      <span>Target: {project.targetLaunchDate}</span>
                      <span>Lead: {project.leadArchitect.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className={`flex flex-wrap items-center gap-1.5 pt-2 border-t ${
                    isLight ? 'border-slate-100' : 'border-white/[0.04]'
                  }`}>
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-white/[0.04] border-white/[0.06] text-zinc-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>+{project.techStack.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* KPIs & Action Button */}
                <div className={`pt-3 border-t space-y-3 ${isLight ? 'border-slate-100' : 'border-white/[0.06]'}`}>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {project.kpis.slice(0, 2).map((kpi) => (
                      <div key={kpi.label} className={`p-2 rounded-lg border ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/40 border-white/[0.04]'
                      }`}>
                        <div className={`text-xs font-bold font-mono-code ${isLight ? 'text-slate-900' : 'text-white'}`}>{kpi.value}</div>
                        <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    id={`view-project-${project.id}-btn`}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                      isLight
                        ? 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-700 hover:text-violet-900 font-semibold'
                        : 'bg-violet-950/40 hover:bg-violet-900/60 border-violet-500/30 text-violet-300 hover:text-white'
                    }`}
                  >
                    <span>View Architecture & Milestones</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: QUICK ACCESS TO PURCHASED AI AGENTS & SYSTEMS */}
      {(selectedCategory === 'all' || selectedCategory === 'agents') && (
        <section className="space-y-4" aria-labelledby="purchased-agents-heading">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 id="purchased-agents-heading" className={`text-sm font-bold font-display uppercase tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Quick Access: Purchased AI Agents & Execution Engines
              </h2>
              <span className={`text-[11px] font-mono-code px-2 py-0.5 rounded-full border ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                  : 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300'
              }`}>
                {filteredAgents.length} Ready
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                isLight ? 'text-violet-700 hover:text-violet-900' : 'text-violet-400 hover:text-violet-300'
              }`}
            >
              <span>View Full Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className={`p-5 rounded-2xl transition-all flex flex-col justify-between space-y-4 shadow-sm group ${
                  isLight
                    ? 'bg-white border border-slate-200 hover:border-violet-300 hover:shadow-md'
                    : 'bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/40'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon, Name, Version, Health */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                        isLight
                          ? 'bg-violet-100 border border-violet-200 text-violet-700'
                          : 'bg-violet-950/70 border border-violet-500/30 text-violet-300'
                      }`}>
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-bold font-display ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}>
                            {agent.name}
                          </h3>
                          <span className={`text-[10px] font-mono-code px-1.5 py-0.2 rounded border ${
                            isLight
                              ? 'bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-white/[0.06] text-zinc-400 border-transparent'
                          }`}>
                            {agent.version}
                          </span>
                        </div>
                        <div className={`text-[11px] font-mono-code mt-0.5 ${
                          isLight ? 'text-slate-500' : 'text-zinc-400'
                        }`}>
                          Code: {agent.code} • {agent.environment}
                        </div>
                      </div>
                    </div>

                    <span className={`flex items-center gap-1 text-[10px] font-mono-code px-2 py-0.5 rounded-full shrink-0 font-medium ${
                      isLight
                        ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                        : 'text-emerald-400 bg-emerald-950/50 border border-emerald-500/30'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {agent.telemetry.latencyMs}ms
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isLight ? 'text-slate-600' : 'text-zinc-300'
                  }`}>
                    {agent.description}
                  </p>

                  {/* Assigned Autonomous Agents */}
                  <div className={`p-2.5 rounded-xl space-y-1.5 border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.04]'
                  }`}>
                    <div className={`text-[10px] font-mono-code flex items-center justify-between ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}>
                      <span>Assigned Agent Personas:</span>
                      <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{agent.monthlyHoursSaved}h saved this mo</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {agent.assignedAgents.map((persona) => (
                        <span
                          key={persona}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                            isLight
                              ? 'bg-violet-100 border-violet-200 text-violet-800'
                              : 'bg-violet-950/40 border border-violet-500/30 text-violet-300'
                          }`}
                        >
                          {persona}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connected Systems */}
                  <div className={`flex items-center gap-2 text-[11px] ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}>
                    <span className={`font-mono-code text-[10px] ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>Connected:</span>
                    <div className="flex flex-wrap items-center gap-1">
                      {agent.connectedSystems.slice(0, 3).map((sys) => (
                        <span
                          key={sys}
                          className={`px-1.5 py-0.5 rounded text-[10px] border ${
                            isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-700'
                              : 'bg-white/[0.04] border-transparent text-zinc-300'
                          }`}
                        >
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Action Controls */}
                <div className={`pt-3 border-t flex flex-wrap items-center gap-2 ${
                  isLight ? 'border-slate-100' : 'border-white/[0.06]'
                }`}>
                  <button
                    onClick={() => handleRunAgentTest(agent)}
                    id={`test-agent-${agent.id}-btn`}
                    className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all hover:scale-[1.02]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Test Dispatch</span>
                  </button>

                  <button
                    onClick={() => setSelectedAgentDetails(agent)}
                    id={`view-agent-keys-${agent.id}-btn`}
                    className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-colors border ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900'
                        : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300 hover:text-white'
                    }`}
                  >
                    <Key className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
                    <span>License & API</span>
                  </button>

                  <button
                    onClick={() => handleRestart(agent.id, agent.name)}
                    disabled={restartingId === agent.id}
                    id={`restart-agent-${agent.id}-btn`}
                    className={`p-2 rounded-xl border transition-colors ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-slate-900'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                    title="Restart Container & Clear Cache"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${restartingId === agent.id ? 'animate-spin text-violet-600' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL 1: PROJECT BLUEPRINT & MILESTONES DRAWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className={`relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-xs animate-in zoom-in-95 border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xl'
              : 'bg-[#0c0c16] border-violet-500/40 text-white'
          }`}>
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full font-mono-code text-[10px] uppercase border ${
                  isLight
                    ? 'bg-violet-100 border-violet-200 text-violet-800 font-semibold'
                    : 'bg-violet-950/70 border-violet-500/30 text-violet-300'
                }`}>
                  {selectedProject.category}
                </span>
                <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full border ${
                  isLight
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200 font-semibold'
                    : 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
                }`}>
                  Progress: {selectedProject.stageProgress}%
                </span>
              </div>
              <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {selectedProject.name}
              </h2>
              <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                {selectedProject.description}
              </p>
            </div>

            {/* Architecture Stack & Lead Architect */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
            }`}>
              <div>
                <div className={`text-[10px] font-mono-code uppercase ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Assigned Lead Architect</div>
                <div className={`text-xs font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedProject.leadArchitect}</div>
              </div>
              <div>
                <div className={`text-[10px] font-mono-code uppercase ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Target Full Rollout</div>
                <div className={`text-xs font-bold mt-0.5 font-mono-code ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{selectedProject.targetLaunchDate}</div>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-2.5">
              <h3 className={`text-xs font-bold font-display uppercase tracking-wider ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Pipeline Milestones & Validation Gates
              </h3>
              <div className="space-y-2">
                {selectedProject.milestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white/[0.02] border-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {ms.status === 'completed' ? (
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                      ) : ms.status === 'in_progress' ? (
                        <div className="w-4 h-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border shrink-0 ${isLight ? 'border-slate-300' : 'border-zinc-600'}`} />
                      )}
                      <span className={`font-medium ${
                        ms.status === 'completed'
                          ? isLight ? 'text-slate-400 line-through' : 'text-zinc-500 line-through'
                          : isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {ms.title}
                      </span>
                    </div>
                    {ms.completionDate && (
                      <span className={`text-[10px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{ms.completionDate}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Container Logs */}
            {selectedProject.recentLogs && (
              <div className="space-y-2">
                <h3 className={`text-xs font-bold font-display uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  <Terminal className={`w-3.5 h-3.5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                  <span>Real-Time Audit Log</span>
                </h3>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono-code text-[11px] space-y-1.5 max-h-36 overflow-y-auto text-slate-200">
                  {selectedProject.recentLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-500 shrink-0">{log.timestamp}</span>
                      <span className={log.status === 'ok' ? 'text-emerald-400' : 'text-sky-400'}>
                        {log.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`flex items-center justify-end gap-3 pt-3 border-t ${
              isLight ? 'border-slate-200' : 'border-white/[0.06]'
            }`}>
              <button
                onClick={() => setSelectedProject(null)}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300'
                }`}
              >
                Close Blueprint
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigateTab('products');
                }}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-md shadow-violet-600/30"
              >
                Manage AI Fleet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE AGENT DISPATCH TEST CONSOLE */}
      {testingAgent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className={`relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 text-xs animate-in zoom-in-95 border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xl'
              : 'bg-[#0c0c16] border-violet-500/40 text-white'
          }`}>
            <button
              onClick={() => setTestingAgent(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight
                  ? 'bg-violet-100 border border-violet-200 text-violet-700'
                  : 'bg-violet-950/80 border border-violet-500/40 text-violet-300'
              }`}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Autonomous Dispatch Simulator: {testingAgent.name}
                </h2>
                <p className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Endpoint: {testingAgent.endpointUrl} (Latency: {testingAgent.telemetry.latencyMs}ms)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                Test Prompt / Action Payload:
              </label>
              <textarea
                value={agentTestPrompt}
                onChange={(e) => setAgentTestPrompt(e.target.value)}
                rows={3}
                className={`w-full rounded-xl p-3 text-xs focus:outline-none transition-colors border ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-violet-500'
                    : 'bg-[#12121e] border-white/[0.1] text-white placeholder-zinc-500 focus:border-violet-500'
                }`}
                placeholder="Enter sample business instructions for the autonomous agent fleet..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className={`text-[10px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                Simulates live execution graph across {testingAgent.connectedSystems.join(', ')}
              </div>
              <button
                onClick={executeSimulation}
                disabled={isTestRunning || !agentTestPrompt}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-2"
              >
                {isTestRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Multi-Agent Graph...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Trigger Autonomous Dispatch</span>
                  </>
                )}
              </button>
            </div>

            {/* Execution Graph Output */}
            {testOutputLog && (
              <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
                <div className={`text-xs font-bold flex items-center justify-between ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Telemetry Execution Graph</span>
                  </span>
                  <span className="text-[10px] font-mono-code text-emerald-400">Status: Verified OK</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono-code space-y-2 text-slate-200">
                  {testOutputLog.map((step, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="text-violet-300 font-bold text-[10px]">{step.step}</div>
                      <div className="text-zinc-300 text-[11px] pl-2 border-l border-violet-500/30">{step.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setTestingAgent(null)}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300'
                }`}
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: LICENSE KEY & API QUICK DRAWER */}
      {selectedAgentDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className={`relative w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 text-xs animate-in zoom-in-95 border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-2xl'
              : 'bg-[#0c0c16] border-violet-500/40 text-white'
          }`}>
            <button
              onClick={() => setSelectedAgentDetails(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h2 className={`text-lg font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Credentials & Runtime API: {selectedAgentDetails.name}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Production endpoint and authenticated cryptographic license credentials.
              </p>
            </div>

            {/* License Key */}
            <div className="space-y-1.5">
              <label className={`font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Enterprise License Key:</label>
              <div className={`flex items-center justify-between p-2.5 rounded-xl font-mono-code border ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-violet-800'
                  : 'bg-black/60 border-white/[0.08] text-violet-300'
              }`}>
                <span>{selectedAgentDetails.licenseKey}</span>
                <button
                  onClick={() => handleCopy(selectedAgentDetails.licenseKey, 'License Key')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isLight
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Endpoint */}
            <div className="space-y-1.5">
              <label className={`font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Production Dispatch Endpoint:</label>
              <div className={`flex items-center justify-between p-2.5 rounded-xl font-mono-code border ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-black/60 border-white/[0.08] text-zinc-200'
              }`}>
                <span className="truncate">{selectedAgentDetails.endpointUrl}</span>
                <button
                  onClick={() => handleCopy(selectedAgentDetails.endpointUrl, 'Endpoint URL')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isLight
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* cURL Snippet */}
            <div className="space-y-1.5">
              <label className={`font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Quick Integration cURL:</label>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono-code text-[10px] text-slate-200 overflow-x-auto">
                <pre>
{`curl -X POST ${selectedAgentDetails.endpointUrl} \\
  -H "Authorization: Bearer ${selectedAgentDetails.licenseKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"action": "dispatch", "priority": "high"}'`}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedAgentDetails(null)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
