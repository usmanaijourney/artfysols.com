import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Shield,
  Layers,
  Activity,
  Server,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Plus,
  RefreshCw,
  Sparkles,
  Search,
  Filter,
  Eye,
  GitBranch,
  Database,
  Radio,
  Sliders,
  Bell,
  Cpu,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';

interface SuperAdminDashboardProps {
  theme: 'dark' | 'light';
  onNavigateTab: (tab: string) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ theme, onNavigateTab }) => {
  const { customers, leads, onboarding, releases, integrations, auditLogs, adminUsers, pages, addToast } = useAdmin();
  const { user } = useAuth();
  const isLight = theme === 'light';

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Compute live aggregates
  const totalMrr = customers.reduce((acc, c) => acc + c.mrr, 0);
  const activeClientsCount = customers.filter(c => c.status === 'active').length;
  const activeIntegrationsCount = integrations.filter(i => i.status === 'connected').length;
  const pendingLeadsCount = leads.filter(l => l.status === 'new' || l.status === 'contacted').length;
  const publishedPagesCount = pages.filter(p => p.status === 'published').length;
  const activePipelinesCount = onboarding.filter(p => p.currentStage !== 'active').length;

  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('success', 'Ecosystem telemetry synchronized with all nodes.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Ecosystem Status & Quick Actions */}
      <div className={`p-6 rounded-2xl border relative overflow-hidden ${
        isLight
          ? 'bg-gradient-to-r from-violet-50/80 via-white to-amber-50/50 border-slate-200 shadow-sm'
          : 'bg-gradient-to-r from-violet-950/25 via-[#0d0d16] to-amber-950/20 border-white/[0.08] shadow-2xl'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ecosystem Operational • 99.98% SLA</span>
              </span>
              <span className="text-xs text-zinc-400 font-mono-code">US-East & EU-Central Mesh</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Artify Control Center & Governance
            </h1>
            <p className={`text-sm mt-1 max-w-2xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Central command for enterprise software customization, autonomous agent fleets, multi-tenant client deployments, and CMS content pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRefreshTelemetry}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-[#12121c] hover:bg-[#181824] border-white/[0.08] text-zinc-300'
              }`}
              title="Refresh Telemetry Stream"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-violet-400' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <button
              onClick={() => onNavigateTab('cms')}
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New CMS Section</span>
            </button>

            <button
              onClick={() => onNavigateTab('clients')}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-[#151522] hover:bg-[#1d1d2f] border-white/[0.1] text-zinc-200'
              }`}
            >
              <Users className="w-4 h-4 text-violet-400" />
              <span>View Clients ({customers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Enterprise MRR
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ${(totalMrr).toLocaleString()}
            </span>
            <span className="text-xs text-emerald-500 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.8%
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-2 flex items-center justify-between">
            <span>{activeClientsCount} contracted organizations</span>
            <span className="font-mono-code">ARR: ${(totalMrr * 12 / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Active Fleets & Agents */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Active AI Fleets
            </span>
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              34 Agents
            </span>
            <span className="text-xs text-emerald-500 font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" /> 100% Ok
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-2 flex items-center justify-between">
            <span>Concurrency across 5 fleets</span>
            <span className="font-mono-code text-violet-400">12ms latency</span>
          </div>
        </div>

        {/* Onboarding & Leads */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Pipelines & Briefs
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {pendingLeadsCount} Pending Leads
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-2 flex items-center justify-between">
            <span>{activePipelinesCount} onboarding projects live</span>
            <button
              onClick={() => onNavigateTab('clients')}
              className="text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-1"
            >
              <span>Review</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CMS & Web Governance */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              CMS Platform
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {publishedPagesCount} Pages Live
            </span>
            <span className="text-xs text-blue-500 font-semibold">
              v3.4.1 Production
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-2 flex items-center justify-between">
            <span>{activeIntegrationsCount} active data connectors</span>
            <button
              onClick={() => onNavigateTab('cms')}
              className="text-blue-500 hover:text-blue-400 font-semibold flex items-center gap-1"
            >
              <span>CMS</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols): Active Client Status & Onboarding Roadmap */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Enterprise Customers */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div>
                <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Enterprise Client Ecosystem
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Organizations utilizing Artify custom ERPs, autonomous agent swarms, and bespoke APIs.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('clients')}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
              >
                <span>Manage All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${isLight ? 'border-slate-100 text-slate-400' : 'border-white/[0.04] text-zinc-500'}`}>
                    <th className="pb-3 font-semibold">Client Org</th>
                    <th className="pb-3 font-semibold">Industry</th>
                    <th className="pb-3 font-semibold">Tier</th>
                    <th className="pb-3 font-semibold">MRR</th>
                    <th className="pb-3 font-semibold">Agents</th>
                    <th className="pb-3 font-semibold">Onboarding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {customers.map((c) => (
                    <tr key={c.id} className={`group ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                      <td className="py-3 font-medium">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                            isLight ? 'bg-violet-100 text-violet-700' : 'bg-violet-950/60 border border-violet-700/30 text-violet-300'
                          }`}>
                            {c.companyName.charAt(0)}
                          </div>
                          <div>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.companyName}</div>
                            <div className="text-[10px] text-zinc-400">{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-zinc-400">{c.industry}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          {c.tier}
                        </span>
                      </td>
                      <td className="py-3 font-mono-code font-semibold text-emerald-500">
                        ${c.mrr.toLocaleString()}
                      </td>
                      <td className="py-3 text-zinc-300 font-mono-code">{c.activeAgentsCount}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{c.onboardingProgress}%</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Onboarding Pipelines */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
              <div>
                <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Custom Solution Delivery Pipelines
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Tracking bespoke deployment stages from architectural scoping to live cutover.
                </p>
              </div>
              <span className="text-xs text-zinc-400 font-mono-code">
                {onboarding.length} Enterprise Pipelines
              </span>
            </div>

            <div className="space-y-4">
              {onboarding.map((pipe) => {
                const completedSteps = pipe.steps.filter(s => s.completed).length;
                const progressPct = pipe.progressPct || Math.round((completedSteps / pipe.steps.length) * 100);

                return (
                  <div key={pipe.id} className={`p-4 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/[0.05]'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {pipe.companyName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 font-mono-code">
                          Target: {pipe.targetGoLive}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400">
                        Lead Architect: <span className="text-zinc-200 font-medium">{pipe.assignedArchitect}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/[0.08] h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-violet-600 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    {/* Steps list */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      {pipe.steps.map((step) => (
                        <div
                          key={step.id}
                          className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                            step.completed
                              ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                              : isLight ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white/[0.01] border-white/[0.04] text-zinc-500'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-zinc-500 shrink-0" />
                          )}
                          <span className="truncate">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Live System Health & Audit Trail */}
        <div className="lg:col-span-4 space-y-6">
          {/* System Telemetry & Cluster Load */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-violet-400" />
                <h3 className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Cluster Telemetry
                </h3>
              </div>
              <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Healthy
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>API Gateway Throughput</span>
                  <span className="font-mono-code text-zinc-200">14,280 req/min</span>
                </div>
                <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-violet-500 h-full w-[42%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>Neural Vector DB P99 Latency</span>
                  <span className="font-mono-code text-emerald-400">8.4 ms</span>
                </div>
                <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[24%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>LLM Token Processing Queue</span>
                  <span className="font-mono-code text-zinc-200">22% Capacity</span>
                </div>
                <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[22%]" />
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">Autonomous Failover</span>
                <span className="text-emerald-400 font-mono-code font-semibold">Enabled (Multi-AZ)</span>
              </div>
            </div>
          </div>

          {/* Quick CMS Page Status */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <h3 className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  CMS Routes
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('cms')}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold"
              >
                Open CMS
              </button>
            </div>

            <div className="space-y-2">
              {pages.slice(0, 5).map((page) => (
                <div
                  key={page.id}
                  className={`p-2 rounded-lg flex items-center justify-between text-xs ${
                    isLight ? 'bg-slate-50' : 'bg-white/[0.02]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className={`font-semibold truncate ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                      {page.title}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono-code truncate">{page.path}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    page.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {page.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Governance & Audit Trail */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-400" />
                <h3 className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Audit Log
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('audit')}
                className="text-[11px] text-violet-400 hover:text-violet-300 font-semibold"
              >
                All Logs
              </button>
            </div>

            <div className="space-y-2.5">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                      {log.actorName}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono-code">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-tight">
                    {log.action}: <span className="text-violet-400">{log.targetResource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
