import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { ActiveAIProject, PurchasedProduct } from '../../types';
import {
  Activity,
  Bot,
  Server,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Key,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Clock,
  Terminal,
  ChevronRight,
  UserCheck,
  Zap,
} from 'lucide-react';

interface QuickAccessWidgetProps {
  theme?: 'dark' | 'light';
  className?: string;
}

export const QuickAccessWidget: React.FC<QuickAccessWidgetProps> = ({
  theme = 'dark',
  className = '',
}) => {
  const {
    user,
    isAuthenticated,
    openPortal,
    openAuthModal,
    loginAsDemo,
  } = useAuth();

  const isLight = theme === 'light';

  // Active view: 'project' or 'deployment'
  const [activeView, setActiveView] = useState<'project' | 'deployment'>('project');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [selectedDeploymentIndex, setSelectedDeploymentIndex] = useState<number>(0);

  // Widget state
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');

  // If user is not authenticated or not logged in, render preview card
  if (!user) {
    return (
      <section
        id="quick-access-widget"
        aria-label="Client Portal Quick Access"
        className={`w-[92%] sm:w-[88%] max-w-7xl mx-auto my-8 relative z-20 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
            isLight
              ? 'bg-gradient-to-r from-violet-50/90 via-white/95 to-indigo-50/90 border-violet-200/80 shadow-violet-500/5 text-slate-900'
              : 'bg-gradient-to-r from-[#0d0d18]/95 via-[#0b0b14]/98 to-[#0d0d1a]/95 border-violet-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-[1px] shadow-lg shadow-violet-600/20 shrink-0">
                <div
                  className={`w-full h-full rounded-[15px] flex items-center justify-center ${
                    isLight ? 'bg-violet-100 text-violet-700' : 'bg-[#0e0e1a] text-violet-400'
                  }`}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider font-mono-code text-violet-500">
                    Artify Client Portal
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                      isLight
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-mono-code'
                        : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400 font-mono-code'
                    }`}
                  >
                    Live Telemetry Ready
                  </span>
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-bold font-display tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Active AI Project & Deployment Quick Access
                </h3>
                <p
                  className={`text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-zinc-400'
                  }`}
                >
                  Log in to instantly inspect your dedicated autonomous agent fleets, monitor live SLA
                  latency, review stage milestones, and launch your private Client Portal telemetry.
                </p>
              </div>
            </div>

            {/* Actions for Guest / Evaluator */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => openAuthModal('login')}
                id="qa-guest-login-btn"
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Sign In to Portal</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => loginAsDemo('enterprise')}
                id="qa-guest-demo-btn"
                className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.12] text-zinc-200 hover:text-white'
                }`}
                title="Log in with pre-configured Enterprise demo account"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Demo Preview</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // User is logged in: Extract active projects and deployments
  const activeProjects: ActiveAIProject[] = (user.activeProjects && user.activeProjects.length > 0)
    ? user.activeProjects
    : [
        {
          id: 'proj-fallback-1',
          name: 'Autonomous Operations & Reconciliation Layer',
          category: 'Enterprise Integration',
          status: 'in_production',
          stageProgress: 96,
          startDate: '2025-11-01',
          targetLaunchDate: '2026-09-01',
          leadArchitect: user.subscription.dedicatedArchitectName || 'Dr. Elena Rostova (Principal AI Architect)',
          description:
            'End-to-end continuous optimization of financial transactions, carrier EDI manifests, and automated multi-agent operational routing.',
          techStack: ['NetSuite ERP', 'SAP S/4HANA', 'AWS ECS', 'Kafka Event Mesh'],
          assignedAgents: ['Ledger Reconciliation Sentinel', 'Invoice OCR Parser', 'Variance Auditor'],
          milestones: [
            { title: 'ERP Synchronization', status: 'completed', completionDate: 'Nov 2025' },
            { title: 'Autonomous Multi-Agent Loop', status: 'completed', completionDate: 'Jan 2026' },
            { title: 'Global Multi-Region Production Scale', status: 'in_progress', completionDate: 'Target: Sep 2026' },
          ],
          kpis: [
            { label: 'Latency', value: '88ms', trend: '-52% faster' },
            { label: 'Hours Saved/mo', value: '530h', trend: '+34%' },
            { label: 'Accuracy SLA', value: '99.98%', trend: '+0.4%' },
          ],
          liveEndpoint: 'https://apex-recon.artifysols.com/v1/reconcile',
          recentLogs: [
            { timestamp: '14:20:00 UTC', event: 'Autonomous zero-exception matching cycle completed.', status: 'ok' },
            { timestamp: '12:00:00 UTC', event: 'Health check probe returned 200 OK across all containers.', status: 'ok' },
          ],
        },
      ];

  const currentProject = activeProjects[selectedProjectIndex] || activeProjects[0];

  const purchasedProducts: PurchasedProduct[] = (user.purchasedProducts && user.purchasedProducts.length > 0)
    ? user.purchasedProducts
    : [
        {
          id: 'prod-fallback-1',
          name: 'Autonomous Invoice & PO Reconciliation Engine',
          code: 'ART-REC-01',
          category: 'autonomous_agent',
          version: 'v3.4.1',
          description: 'Autonomous financial ledger comparing transactions across banking, ERP, and supplier portals.',
          purchaseDate: '2025-10-18',
          purchaseType: 'subscription_included',
          licenseKey: 'ART-LIC-9932-8419-XAPX-2026',
          status: 'deployed_active',
          environment: 'AWS us-east-1',
          endpointUrl: 'https://apex-recon.artifysols.com/v1/reconcile',
          connectedSystems: ['NetSuite ERP', 'Stripe Billing', 'JPMorgan Chase SFTP'],
          uptime: '99.98%',
          requestsThisMonth: 142890,
          monthlyHoursSaved: 340,
          assignedAgents: ['Ledger Reconciliation Sentinel', 'Invoice OCR Parser'],
          telemetry: {
            health: '100% Operational',
            latencyMs: 142,
            errorRate: '0.002%',
            lastSynced: 'Just now',
          },
        },
      ];

  const currentDeployment = purchasedProducts[selectedDeploymentIndex] || purchasedProducts[0];

  // Copy helper
  const handleCopyEndpoint = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Simulated ping
  const handlePingEndpoint = () => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      const latency = Math.floor(Math.random() * 40) + 75;
      setPingResult(`HTTP 200 OK • Latency: ${latency}ms`);
      setLastRefreshedTime('Just now');
      setTimeout(() => setPingResult(null), 4000);
    }, 700);
  };

  return (
    <section
      id="homepage-quick-access-widget"
      aria-label="Client Portal Quick Access Widget"
      className={`w-[92%] sm:w-[88%] max-w-7xl mx-auto my-6 sm:my-8 relative z-30 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
          isLight
            ? 'bg-white/95 border-violet-200/90 shadow-violet-600/10 text-slate-900'
            : 'bg-[#0c0c16]/95 border-violet-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white'
        }`}
      >
        {/* Glow Decor */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Bar: Identity, Live Pill, Mode Switcher & Minimize */}
        <div
          className={`px-5 sm:px-7 py-4 border-b flex flex-wrap items-center justify-between gap-4 transition-colors ${
            isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-white/[0.02] border-white/[0.08]'
          }`}
        >
          {/* User Info & Organization */}
          <div className="flex items-center gap-3">
            {/* Live Indicator Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-[1px] shadow-md shadow-violet-600/25">
                <div
                  className={`w-full h-full rounded-[11px] flex items-center justify-center font-bold text-sm text-white ${
                    isLight ? 'bg-violet-600' : 'bg-[#10101c]'
                  }`}
                >
                  {user.name.slice(0, 1)}
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c0c16] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-500 font-mono-code">
                  Quick Access • Client Portal
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-emerald-950/70 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  Active Fleet SLA
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <h4
                  className={`text-sm sm:text-base font-bold font-display ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {user.name}
                </h4>
                <span className={`text-xs ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>•</span>
                <span
                  className={`text-xs font-medium truncate max-w-[200px] sm:max-w-xs ${
                    isLight ? 'text-slate-600' : 'text-zinc-400'
                  }`}
                >
                  {user.company}
                </span>
                <span
                  className={`hidden sm:inline-block text-[10px] uppercase font-mono-code px-2 py-0.5 rounded-md border ${
                    isLight
                      ? 'bg-violet-100 border-violet-200 text-violet-800'
                      : 'bg-violet-950/70 border-violet-500/40 text-violet-300'
                  }`}
                >
                  {user.subscription.planName.split(' ')[0]} Plan
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Tab Switcher & Portal Launch */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Switcher Pill */}
            <div
              className={`p-1 rounded-xl border flex items-center gap-1 ${
                isLight ? 'bg-slate-200/80 border-slate-300/80' : 'bg-black/40 border-white/[0.08]'
              }`}
            >
              <button
                onClick={() => {
                  setActiveView('project');
                  if (isMinimized) setIsMinimized(false);
                }}
                id="qa-tab-project-btn"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'project'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Active Project</span>
                {activeProjects.length > 1 && (
                  <span className="text-[10px] opacity-80 font-mono-code ml-0.5">
                    ({activeProjects.length})
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveView('deployment');
                  if (isMinimized) setIsMinimized(false);
                }}
                id="qa-tab-deployment-btn"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'deployment'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Live Deployment</span>
                {purchasedProducts.length > 1 && (
                  <span className="text-[10px] opacity-80 font-mono-code ml-0.5">
                    ({purchasedProducts.length})
                  </span>
                )}
              </button>
            </div>

            {/* Open in Client Portal Full Button */}
            <button
              onClick={() => openPortal(activeView === 'project' ? 'overview' : 'products')}
              id="qa-open-portal-btn"
              className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 hover:shadow-violet-600/40 transition-all flex items-center gap-1.5 group"
              title="Open full Client Portal experience"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Launch Client Portal</span>
              <span className="sm:hidden">Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Minimize / Expand Toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              id="qa-toggle-minimize-btn"
              className={`p-1.5 rounded-lg border transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
              title={isMinimized ? 'Expand Quick Access Widget' : 'Minimize Widget'}
              aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. Main Content Area (Collapsible) */}
        <AnimatePresence initial={false}>
          {!isMinimized && (
            <motion.div
              key="widget-expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* VIEW 1: ACTIVE AI PROJECT */}
              {activeView === 'project' && (
                <div className="p-5 sm:p-7">
                  {/* If multiple projects exist, allow selector */}
                  {activeProjects.length > 1 && (
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
                      <span className={`text-[11px] font-mono-code shrink-0 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                        Active Projects:
                      </span>
                      {activeProjects.map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedProjectIndex(idx)}
                          className={`text-xs px-3 py-1 rounded-lg border transition-all whitespace-nowrap ${
                            selectedProjectIndex === idx
                              ? isLight
                                ? 'bg-violet-100 border-violet-400 text-violet-900 font-bold'
                                : 'bg-violet-600/30 border-violet-500 text-violet-200 font-bold'
                              : isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                              : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
                          }`}
                        >
                          {p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}...
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Project Overview Hero Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left 8 Cols: Project Details, Progress & Agents */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Name & Status Badges */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider font-mono-code px-2.5 py-1 rounded-full border ${
                              currentProject.status === 'in_production'
                                ? isLight
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                  : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                                : isLight
                                ? 'bg-amber-50 border-amber-300 text-amber-800'
                                : 'bg-amber-950/80 border-amber-500/40 text-amber-400'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>
                              {currentProject.status === 'in_production'
                                ? 'Live in Production'
                                : 'Validation Phase'}
                            </span>
                          </span>

                          <span
                            className={`text-[11px] font-medium font-mono-code px-2.5 py-1 rounded-full border ${
                              isLight
                                ? 'bg-slate-100 border-slate-200 text-slate-700'
                                : 'bg-white/[0.05] border-white/[0.08] text-zinc-300'
                            }`}
                          >
                            {currentProject.category}
                          </span>

                          <span
                            className={`text-[11px] font-mono-code ${
                              isLight ? 'text-slate-500' : 'text-zinc-500'
                            }`}
                          >
                            Target Launch: {currentProject.targetLaunchDate}
                          </span>
                        </div>

                        <h3
                          className={`text-xl sm:text-2xl font-bold font-display tracking-tight leading-snug ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {currentProject.name}
                        </h3>

                        <p
                          className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-zinc-400'
                          }`}
                        >
                          {currentProject.description}
                        </p>
                      </div>

                      {/* Stage Progress Bar */}
                      <div
                        className={`p-4 rounded-2xl border ${
                          isLight
                            ? 'bg-slate-50 border-slate-200/80'
                            : 'bg-white/[0.02] border-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 text-violet-500" />
                            <span className="font-bold font-mono-code">
                              Deployment & Validation Progress
                            </span>
                          </div>
                          <span className="font-bold font-mono-code text-violet-500 text-sm">
                            {currentProject.stageProgress}%
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div
                          className={`w-full h-2.5 rounded-full overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-white/[0.08]'
                          }`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${currentProject.stageProgress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400"
                          />
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-zinc-400">
                          <span>
                            {currentProject.milestones?.filter((m) => m.status === 'completed').length || 3} of{' '}
                            {currentProject.milestones?.length || 4} Milestones Completed
                          </span>
                          <span className="font-mono-code text-violet-400">
                            Lead Architect: {currentProject.leadArchitect.split(' ')[0]}{' '}
                            {currentProject.leadArchitect.split(' ')[1] || ''}
                          </span>
                        </div>
                      </div>

                      {/* Assigned Fleet & Tech Stack Badges */}
                      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                            Fleet Agents:
                          </span>
                          {currentProject.assignedAgents.map((agent) => (
                            <span
                              key={agent}
                              className={`px-2 py-0.5 rounded-md border text-[11px] font-medium flex items-center gap-1 ${
                                isLight
                                  ? 'bg-violet-50 border-violet-200 text-violet-800'
                                  : 'bg-violet-950/40 border-violet-500/30 text-violet-300'
                              }`}
                            >
                              <Bot className="w-3 h-3 text-violet-400" />
                              <span>{agent}</span>
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                            Integrations:
                          </span>
                          {currentProject.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded-md border text-[11px] font-mono-code ${
                                isLight
                                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right 4 Cols: Live KPIs & Action Box */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* KPIs 3-Stack Box */}
                      <div
                        className={`p-4 rounded-2xl border ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 shadow-sm'
                            : 'bg-white/[0.03] border-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                          <span className="text-xs font-bold uppercase tracking-wider font-mono-code text-violet-500">
                            Telemetry Metrics
                          </span>
                          <span className={`text-[10px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                            {lastRefreshedTime}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {currentProject.kpis.map((kpi) => (
                            <div key={kpi.label} className="flex items-center justify-between">
                              <div>
                                <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                                  {kpi.label}
                                </div>
                                <div
                                  className={`text-lg font-bold font-mono-code ${
                                    isLight ? 'text-slate-900' : 'text-white'
                                  }`}
                                >
                                  {kpi.value}
                                </div>
                              </div>
                              {kpi.trend && (
                                <span
                                  className={`text-[11px] font-mono-code font-bold px-2 py-0.5 rounded ${
                                    kpi.trend.includes('+') || kpi.trend.includes('faster') || kpi.trend.includes('High')
                                      ? isLight
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                                      : isLight
                                      ? 'bg-slate-100 text-slate-700'
                                      : 'bg-white/[0.06] text-zinc-300'
                                  }`}
                                >
                                  {kpi.trend}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direct Project Action Buttons inside Portal Context */}
                      <div className="space-y-2">
                        <button
                          onClick={() => openPortal('project-status')}
                          id="qa-project-view-metrics-dashboard-btn"
                          className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all flex items-center justify-center gap-2 group"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Project Status Dashboard (Live Telemetry)</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => openPortal('overview')}
                            id="qa-project-view-dashboard-btn"
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                              isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300 hover:text-white'
                            }`}
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-violet-400" />
                            <span>Portal Overview</span>
                          </button>

                          <button
                            onClick={() => openPortal('ai-coworkers')}
                            id="qa-project-view-fleet-btn"
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                              isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300 hover:text-white'
                            }`}
                          >
                            <Bot className="w-3.5 h-3.5 text-indigo-400" />
                            <span>AI Fleet ({currentProject.assignedAgents.length})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: LIVE DEPLOYMENT */}
              {activeView === 'deployment' && (
                <div className="p-5 sm:p-7">
                  {/* Selector if multiple products deployed */}
                  {purchasedProducts.length > 1 && (
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
                      <span className={`text-[11px] font-mono-code shrink-0 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                        Deployed Systems:
                      </span>
                      {purchasedProducts.map((prod, idx) => (
                        <button
                          key={prod.id}
                          onClick={() => setSelectedDeploymentIndex(idx)}
                          className={`text-xs px-3 py-1 rounded-lg border transition-all whitespace-nowrap ${
                            selectedDeploymentIndex === idx
                              ? isLight
                                ? 'bg-violet-100 border-violet-400 text-violet-900 font-bold'
                                : 'bg-violet-600/30 border-violet-500 text-violet-200 font-bold'
                              : isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                              : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
                          }`}
                        >
                          {prod.name.split(' ')[0]} {prod.name.split(' ')[1] || ''}...
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left 8 Cols: Deployment Status, Endpoint & Integrations */}
                    <div className="lg:col-span-8 space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider font-mono-code px-2.5 py-1 rounded-full border ${
                              isLight
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{currentDeployment.telemetry?.health || '100% Operational'}</span>
                          </span>

                          <span
                            className={`text-[11px] font-mono-code px-2.5 py-1 rounded-full border ${
                              isLight
                                ? 'bg-slate-100 border-slate-200 text-slate-700'
                                : 'bg-white/[0.05] border-white/[0.08] text-zinc-300'
                            }`}
                          >
                            Environment: {currentDeployment.environment}
                          </span>

                          <span
                            className={`text-[11px] font-mono-code ${
                              isLight ? 'text-slate-500' : 'text-zinc-500'
                            }`}
                          >
                            Version: {currentDeployment.version}
                          </span>
                        </div>

                        <h3
                          className={`text-xl sm:text-2xl font-bold font-display tracking-tight ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {currentDeployment.name}
                        </h3>

                        <p
                          className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-zinc-400'
                          }`}
                        >
                          {currentDeployment.description}
                        </p>
                      </div>

                      {/* Live Ingress Endpoint Box with Copy and Ping test */}
                      <div
                        className={`p-4 rounded-2xl border ${
                          isLight
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-white/[0.03] border-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold font-mono-code text-violet-500">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>Ingress Endpoint & API Gateway</span>
                          </div>

                          {pingResult ? (
                            <span className="text-[11px] font-mono-code text-emerald-400 font-bold animate-in fade-in">
                              {pingResult}
                            </span>
                          ) : (
                            <span className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                              Uptime: {currentDeployment.uptime}
                            </span>
                          )}
                        </div>

                        <div
                          className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border font-mono-code text-xs ${
                            isLight
                              ? 'bg-white border-slate-200 text-slate-800'
                              : 'bg-black/50 border-white/[0.08] text-zinc-200'
                          }`}
                        >
                          <span className="truncate">{currentDeployment.endpointUrl}</span>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleCopyEndpoint(currentDeployment.endpointUrl)}
                              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                isLight
                                  ? 'hover:bg-slate-100 border-slate-200 text-slate-700'
                                  : 'hover:bg-white/[0.1] border-white/[0.08] text-zinc-300'
                              }`}
                              title="Copy endpoint URL"
                            >
                              {copiedText === currentDeployment.endpointUrl ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              onClick={handlePingEndpoint}
                              disabled={isPinging}
                              className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-all disabled:opacity-50"
                              title="Send live test health probe to endpoint"
                            >
                              <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
                              <span>{isPinging ? 'Pinging...' : 'Test Probe'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Connected Systems Pill */}
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                            Connected ERP / Hubs:
                          </span>
                          {currentDeployment.connectedSystems.map((sys) => (
                            <span
                              key={sys}
                              className={`text-[10px] font-mono-code px-2 py-0.5 rounded-md border ${
                                isLight
                                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                              }`}
                            >
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right 4 Cols: Deployment 4-Grid Telemetry & Portal Actions */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* Telemetry 4-Grid Box */}
                      <div
                        className={`p-4 rounded-2xl border ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 shadow-sm'
                            : 'bg-white/[0.03] border-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                          <span className="text-xs font-bold uppercase tracking-wider font-mono-code text-violet-500">
                            Live Telemetry SLA
                          </span>
                          <span className={`text-[10px] font-mono-code text-emerald-400 font-bold`}>
                            99.98% Coherence
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className={`text-[11px] block ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                              Latency
                            </span>
                            <span
                              className={`text-lg font-bold font-mono-code ${
                                isLight ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              {currentDeployment.telemetry?.latencyMs || 142}ms
                            </span>
                          </div>

                          <div>
                            <span className={`text-[11px] block ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                              Error Rate
                            </span>
                            <span
                              className={`text-lg font-bold font-mono-code ${
                                isLight ? 'text-emerald-700' : 'text-emerald-400'
                              }`}
                            >
                              {currentDeployment.telemetry?.errorRate || '0.001%'}
                            </span>
                          </div>

                          <div>
                            <span className={`text-[11px] block ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                              Requests / Mo
                            </span>
                            <span
                              className={`text-base font-bold font-mono-code ${
                                isLight ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              {(currentDeployment.requestsThisMonth || 142000).toLocaleString()}
                            </span>
                          </div>

                          <div>
                            <span className={`text-[11px] block ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                              Hours Saved
                            </span>
                            <span
                              className={`text-base font-bold font-mono-code ${
                                isLight ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              {currentDeployment.monthlyHoursSaved || 340}h / mo
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Direct Deployment Action Buttons in Portal Context */}
                      <div className="space-y-2">
                        <button
                          onClick={() => openPortal('products')}
                          id="qa-deployment-manage-portal-btn"
                          className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all flex items-center justify-center gap-2 group"
                        >
                          <Server className="w-3.5 h-3.5" />
                          <span>Manage Deployment in Portal</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => openPortal('apikeys')}
                            id="qa-deployment-apikeys-btn"
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                              isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300 hover:text-white'
                            }`}
                          >
                            <Key className="w-3.5 h-3.5 text-amber-400" />
                            <span>API Keys</span>
                          </button>

                          <button
                            onClick={() => openPortal('seo')}
                            id="qa-deployment-seo-btn"
                            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                              isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300 hover:text-white'
                            }`}
                          >
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                            <span>SERP & SEO</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Bottom Shortcuts Ribbon: 1-Click to Key ClientPortal Contexts */}
              <div
                className={`px-5 sm:px-7 py-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs transition-colors ${
                  isLight
                    ? 'bg-slate-100/70 border-slate-200 text-slate-600'
                    : 'bg-black/30 border-white/[0.06] text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono-code font-bold uppercase text-[10px] text-violet-500">
                    Client Portal Shortcuts:
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-5 flex-wrap font-medium">
                  <button
                    onClick={() => openPortal('overview')}
                    id="qa-shortcut-overview"
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'hover:text-violet-700' : 'hover:text-violet-300'
                    }`}
                  >
                    <LayoutDashboard className="w-3 h-3 text-violet-400" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => openPortal('ai-coworkers')}
                    id="qa-shortcut-coworkers"
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'hover:text-violet-700' : 'hover:text-violet-300'
                    }`}
                  >
                    <Bot className="w-3 h-3 text-violet-400" />
                    <span>AI Coworker Fleet</span>
                  </button>

                  <button
                    onClick={() => openPortal('products')}
                    id="qa-shortcut-products"
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'hover:text-violet-700' : 'hover:text-violet-300'
                    }`}
                  >
                    <Server className="w-3 h-3 text-violet-400" />
                    <span>AI Systems ({user.purchasedProducts.length})</span>
                  </button>

                  <button
                    onClick={() => openPortal('subscriptions')}
                    id="qa-shortcut-billing"
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'hover:text-violet-700' : 'hover:text-violet-300'
                    }`}
                  >
                    <CreditCard className="w-3 h-3 text-violet-400" />
                    <span>Subscriptions</span>
                  </button>

                  <button
                    onClick={() => openPortal('apikeys')}
                    id="qa-shortcut-keys"
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'hover:text-violet-700' : 'hover:text-violet-300'
                    }`}
                  >
                    <Key className="w-3 h-3 text-violet-400" />
                    <span>API Keys</span>
                  </button>

                  <button
                    onClick={() => openPortal('seo')}
                    id="qa-shortcut-seo"
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'hover:text-violet-700' : 'hover:text-violet-300'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3 text-violet-400" />
                    <span>SEO Health</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
