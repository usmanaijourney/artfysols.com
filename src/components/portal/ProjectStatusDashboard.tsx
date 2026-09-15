import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ActiveAIProject } from '../../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  Activity,
  BarChart3,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Cpu,
  Server,
  Zap,
  ShieldCheck,
  Terminal,
  Sliders,
  Download,
  Search,
  ArrowUpRight,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Database,
  Sparkles,
  Globe,
  ChevronRight,
  TrendingUp,
  Radio,
  Gauge,
  Info,
} from 'lucide-react';

interface ProjectStatusDashboardProps {
  theme?: 'dark' | 'light';
  onNavigateTab?: (tab: string) => void;
}

interface AgentPerformanceMetric {
  id: string;
  name: string;
  role: string;
  category: string;
  status: 'operational' | 'active_sync' | 'optimizing';
  pod: string;
  region: string;
  throughput: number; // tasks/min
  capacity: number; // max SLA tasks/min
  latency: number; // avg response time in ms
  p99Latency: number; // p99 response time in ms
  accuracy: number; // percentage, e.g. 99.98
  errorRate: number; // percentage, e.g. 0.002
  hoursSaved: number; // monthly hours
  tokensProcessed: number; // millions
  lastAction: string;
}

const INITIAL_AGENT_METRICS: AgentPerformanceMetric[] = [
  {
    id: 'agent-1',
    name: 'Freight Sentinel',
    role: 'Autonomous Multimodal Logistics Router',
    category: 'Predictive Logistics',
    status: 'operational',
    pod: 'aws-us-east-1a-pod-1',
    region: 'AWS us-east-1 (N. Virginia)',
    throughput: 1480,
    capacity: 2200,
    latency: 72,
    p99Latency: 124,
    accuracy: 99.98,
    errorRate: 0.001,
    hoursSaved: 165,
    tokensProcessed: 48.2,
    lastAction: 'Rerouted 42 Rotterdam freight containers around rail strike',
  },
  {
    id: 'agent-2',
    name: 'Lead Time Forecaster',
    role: 'Deep Supply Chain Horizon Predictor',
    category: 'Predictive Logistics',
    status: 'operational',
    pod: 'aws-us-east-1a-pod-2',
    region: 'AWS us-east-1 (N. Virginia)',
    throughput: 1120,
    capacity: 1800,
    latency: 94,
    p99Latency: 146,
    accuracy: 99.94,
    errorRate: 0.003,
    hoursSaved: 120,
    tokensProcessed: 36.4,
    lastAction: 'Synthesized 72-hour material shortage risk matrix',
  },
  {
    id: 'agent-3',
    name: 'Ledger Reconciliation Sentinel',
    role: 'Zero-Touch Enterprise ERP Matcher',
    category: 'Finance & Accounting',
    status: 'operational',
    pod: 'aws-us-east-1b-pod-1',
    region: 'AWS us-east-1 (N. Virginia)',
    throughput: 1860,
    capacity: 2500,
    latency: 68,
    p99Latency: 112,
    accuracy: 99.99,
    errorRate: 0.000,
    hoursSaved: 195,
    tokensProcessed: 64.1,
    lastAction: 'Reconciled 3,420 NetSuite invoices with Chase SFTP ledger',
  },
  {
    id: 'agent-4',
    name: 'Invoice OCR Parser',
    role: 'Multi-Modal Computer Vision Ingestion',
    category: 'Document Intelligence',
    status: 'active_sync',
    pod: 'gcp-europe-west2-pod-1',
    region: 'GCP europe-west2 (London)',
    throughput: 890,
    capacity: 1500,
    latency: 118,
    p99Latency: 178,
    accuracy: 99.91,
    errorRate: 0.004,
    hoursSaved: 85,
    tokensProcessed: 28.6,
    lastAction: 'Parsed 184 bilingual bills of lading with OCR bbox extraction',
  },
  {
    id: 'agent-5',
    name: 'Variance Auditor Bot',
    role: 'Automated Tax & Line Item Inspector',
    category: 'Finance & Accounting',
    status: 'operational',
    pod: 'gcp-europe-west2-pod-2',
    region: 'GCP europe-west2 (London)',
    throughput: 740,
    capacity: 1200,
    latency: 82,
    p99Latency: 135,
    accuracy: 99.96,
    errorRate: 0.002,
    hoursSaved: 70,
    tokensProcessed: 19.8,
    lastAction: 'Flagged $14,200 tariff discrepancy on incoming EU customs docket',
  },
  {
    id: 'agent-6',
    name: 'Carrier EDI Protocol Scout',
    role: 'Real-Time Telematics & Vessel Tracker',
    category: 'Predictive Logistics',
    status: 'optimizing',
    pod: 'aws-us-east-1b-pod-2',
    region: 'AWS us-east-1 (N. Virginia)',
    throughput: 620,
    capacity: 1000,
    latency: 88,
    p99Latency: 142,
    accuracy: 99.88,
    errorRate: 0.005,
    hoursSaved: 55,
    tokensProcessed: 15.2,
    lastAction: 'Polled Maersk & Hapag-Lloyd EDI streams with zero dropped frames',
  },
];

interface DeploymentEventLog {
  id: string;
  timestamp: string;
  agent: string;
  message: string;
  status: 'success' | 'info' | 'warning';
}

const INITIAL_EVENT_LOGS: DeploymentEventLog[] = [
  {
    id: 'log-1',
    timestamp: '15:24:02 UTC',
    agent: 'Ledger Reconciliation Sentinel',
    message: 'Continuous batch reconciliation completed: 840 ERP transactions posted to general ledger.',
    status: 'success',
  },
  {
    id: 'log-2',
    timestamp: '15:23:45 UTC',
    agent: 'Freight Sentinel',
    message: 'Canary cluster probe validated: 0 dropped packets across Pacific route buffer.',
    status: 'info',
  },
  {
    id: 'log-3',
    timestamp: '15:23:18 UTC',
    agent: 'Invoice OCR Parser',
    message: 'Self-tuning confidence threshold adjusted from 0.94 to 0.97 for high-density tables.',
    status: 'info',
  },
  {
    id: 'log-4',
    timestamp: '15:22:50 UTC',
    agent: 'Carrier EDI Protocol Scout',
    message: 'Auto-scaling pod spawned on aws-us-east-1b to handle afternoon batch ingestion spike.',
    status: 'success',
  },
  {
    id: 'log-5',
    timestamp: '15:22:12 UTC',
    agent: 'Variance Auditor Bot',
    message: 'Cryptographic SOC1 audit snapshot captured and synced to immutable S3 vault.',
    status: 'success',
  },
];

export const ProjectStatusDashboard: React.FC<ProjectStatusDashboardProps> = ({
  theme = 'dark',
  onNavigateTab,
}) => {
  const { user } = useAuth();
  const isLight = theme === 'light';

  // Active Project Selection
  const activeProjects: ActiveAIProject[] = useMemo(() => {
    if (user?.activeProjects && user.activeProjects.length > 0) {
      return user.activeProjects;
    }
    return [
      {
        id: 'proj-apex-01',
        name: 'Autonomous Operations & Multimodal Logistics Routing Layer',
        category: 'Predictive Logistics',
        status: 'in_production',
        stageProgress: 96,
        startDate: '2025-11-01',
        targetLaunchDate: '2026-09-01',
        leadArchitect: 'Dr. Elena Rostova (Principal AI Architect)',
        description:
          'End-to-end continuous optimization of cross-border freight schedules, customs declarations, and autonomous multi-agent operational routing.',
        techStack: ['NetSuite ERP', 'SAP S/4HANA', 'AWS ECS', 'Kafka Event Mesh'],
        assignedAgents: ['Freight Sentinel', 'Lead Time Forecaster', 'Ledger Reconciliation Sentinel'],
        milestones: [
          { title: 'Global Carrier EDI Protocol Integration', status: 'completed', completionDate: 'Nov 2025' },
          { title: 'Customs Manifest Automated Extraction', status: 'completed', completionDate: 'Jan 2026' },
          { title: 'Autonomous Multi-Facility Dispatch Rollout', status: 'completed', completionDate: 'May 2026' },
          { title: 'Global Multi-Region Production Scale', status: 'in_progress', completionDate: 'Target: Sep 2026' },
        ],
        kpis: [
          { label: 'Dispatch Latency', value: '88ms', trend: '-52% faster' },
          { label: 'Monthly Hours Saved', value: '530h', trend: '+34%' },
          { label: 'Routing Accuracy', value: '99.98%', trend: '+0.4%' },
        ],
        liveEndpoint: 'https://apex-recon.artifysols.com/v1/reconcile',
      },
      {
        id: 'proj-apex-02',
        name: 'Enterprise Supply Chain Anomaly Scout',
        category: 'Autonomous Agent Fleet',
        status: 'validation_phase',
        stageProgress: 78,
        startDate: '2026-03-15',
        targetLaunchDate: '2026-10-30',
        leadArchitect: 'Dr. Elena Rostova (Principal AI Architect)',
        description:
          'Deep neural predictive system flagging port delays and material shortage risks 72 hours before assembly line impact.',
        techStack: ['Project44 Telemetry', 'Snowflake Data Cloud', 'PyTorch Embeddings'],
        assignedAgents: ['Material Buffer Forecaster', 'Port Congestion Scout'],
        milestones: [
          { title: 'AIS Maritime Live Ingestion Bridge', status: 'completed', completionDate: 'Apr 2026' },
          { title: 'Predictive Stockout Model Fine-Tuning', status: 'completed', completionDate: 'Jun 2026' },
          { title: 'Real-Time ERP Automated Alert Trigger', status: 'in_progress', completionDate: 'Target: Oct 2026' },
        ],
        kpis: [
          { label: 'Forecast Horizon', value: '72 Hours Ahead', trend: 'High Confidence' },
          { label: 'Prevented Stockouts', value: '14 Events', trend: 'Saved $1.2M' },
        ],
        liveEndpoint: 'https://apex-bi.artifysols.com/v1/analytics',
      },
    ];
  }, [user]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(activeProjects[0]?.id || 'proj-apex-01');
  const currentProject = useMemo(() => {
    return activeProjects.find((p) => p.id === selectedProjectId) || activeProjects[0];
  }, [activeProjects, selectedProjectId]);

  // Real-Time Metrics & Telemetry State
  const [metrics, setMetrics] = useState<AgentPerformanceMetric[]>(INITIAL_AGENT_METRICS);
  const [eventLogs, setEventLogs] = useState<DeploymentEventLog[]>(INITIAL_EVENT_LOGS);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastFetchedTime, setLastFetchedTime] = useState<string>('Just now');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<'off' | '5s' | '10s' | '30s'>('10s');
  const [activeChartMetric, setActiveChartMetric] = useState<'throughput' | 'latency' | 'accuracy' | 'hoursSaved'>('throughput');
  const [agentSearch, setAgentSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'operational' | 'active_sync' | 'optimizing'>('all');
  const [isTestingProbe, setIsTestingProbe] = useState<boolean>(false);
  const [probeResult, setProbeResult] = useState<string | null>(null);
  const [copiedEndpoint, setCopiedEndpoint] = useState<boolean>(false);

  // Fetch real-time deployment metrics simulation
  const fetchRealTimeMetrics = useCallback(() => {
    setIsFetching(true);
    setTimeout(() => {
      // Apply slight realistic jitter to emulate live streaming cluster telemetry
      setMetrics((prevMetrics) =>
        prevMetrics.map((agent) => {
          const jitterThroughput = Math.round((Math.random() - 0.48) * 40);
          const jitterLatency = Math.round((Math.random() - 0.5) * 6);
          const newThroughput = Math.max(300, agent.throughput + jitterThroughput);
          const newLatency = Math.max(45, agent.latency + jitterLatency);
          const newP99 = Math.round(newLatency * 1.6);
          return {
            ...agent,
            throughput: newThroughput,
            latency: newLatency,
            p99Latency: newP99,
          };
        })
      );

      // Append new event log
      const agentNames = INITIAL_AGENT_METRICS.map((a) => a.name);
      const randomAgent = agentNames[Math.floor(Math.random() * agentNames.length)];
      const now = new Date();
      const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(
        now.getUTCMinutes()
      ).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;

      const sampleEvents = [
        'Telemetry ping returned 200 OK across cluster mesh.',
        'Adaptive batch optimizer adjusted task concurrency window.',
        'Zero variance reconciliation batch verified with cryptographic hash.',
        'Inference cache hit rate sustained at 94.2%.',
        'Load balanced across worker nodes with sub-80ms mean latency.',
      ];
      const randomMsg = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];

      const newLog: DeploymentEventLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        agent: randomAgent,
        message: randomMsg,
        status: 'success',
      };

      setEventLogs((prev) => [newLog, ...prev.slice(0, 14)]);
      setLastFetchedTime(timeStr);
      setIsFetching(false);
    }, 600);
  }, []);

  // Polling effect based on autoRefreshInterval
  useEffect(() => {
    if (autoRefreshInterval === 'off') return;
    const intervalMs = autoRefreshInterval === '5s' ? 5000 : autoRefreshInterval === '10s' ? 10000 : 30000;
    const timer = setInterval(() => {
      fetchRealTimeMetrics();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [autoRefreshInterval, fetchRealTimeMetrics]);

  // Handle synthetic test probe across fleet
  const handleTriggerTestProbe = () => {
    setIsTestingProbe(true);
    setProbeResult(null);
    setTimeout(() => {
      setIsTestingProbe(false);
      setProbeResult('Synthetic benchmark probe completed: 6/6 agent pods responded with average latency of 68.4ms. Zero packet loss, 100% SLA coherence.');
      fetchRealTimeMetrics();
      setTimeout(() => setProbeResult(null), 6000);
    }, 1200);
  };

  // Handle copy endpoint
  const handleCopyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  // Filtered agent list
  const filteredAgents = useMemo(() => {
    return metrics.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
        agent.role.toLowerCase().includes(agentSearch.toLowerCase()) ||
        agent.category.toLowerCase().includes(agentSearch.toLowerCase());
      const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [metrics, agentSearch, statusFilter]);

  // Aggregate high-level fleet statistics
  const totalFleetThroughput = useMemo(() => {
    return metrics.reduce((acc, a) => acc + a.throughput, 0);
  }, [metrics]);

  const meanFleetLatency = useMemo(() => {
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, a) => acc + a.latency, 0);
    return Math.round(sum / metrics.length);
  }, [metrics]);

  const fleetP99Latency = useMemo(() => {
    if (metrics.length === 0) return 0;
    return Math.max(...metrics.map((a) => a.p99Latency));
  }, [metrics]);

  const totalMonthlyHours = useMemo(() => {
    return metrics.reduce((acc, a) => acc + a.hoursSaved, 0);
  }, [metrics]);

  // Chart data preparation
  const chartData = useMemo(() => {
    return metrics.map((agent) => ({
      name: agent.name.replace(' Sentinel', '').replace(' Forecaster', '').replace(' Parser', ''),
      fullName: agent.name,
      throughput: agent.throughput,
      capacity: agent.capacity,
      latency: agent.latency,
      p99Latency: agent.p99Latency,
      accuracy: agent.accuracy,
      hoursSaved: agent.hoursSaved,
      pod: agent.pod,
    }));
  }, [metrics]);

  // Export Telemetry JSON
  const handleExportTelemetry = () => {
    const data = {
      project: currentProject,
      generatedAt: new Date().toISOString(),
      fleetSummary: {
        totalThroughputReqPerMin: totalFleetThroughput,
        meanLatencyMs: meanFleetLatency,
        p99LatencyMs: fleetP99Latency,
        totalMonthlyHoursSaved: totalMonthlyHours,
        activeAgentsCount: metrics.length,
      },
      agents: metrics,
      recentLogs: eventLogs,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `artify-telemetry-${currentProject.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12" id="project-status-dashboard-container">
      {/* Top Banner & Telemetry Stream Control Header */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-[#0d0d15] border-white/[0.08] shadow-2xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono-code bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE TELEMETRY STREAM</span>
              </span>
              <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Cluster: aws-us-east-1a • Mesh: artify-prod-cluster-9
              </span>
            </div>
            <h1 className={`text-2xl font-bold font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Project Status & Agent Performance Dashboard
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-3xl ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Real-time telemetry and deployment metrics visualizing autonomous AI agent throughput, execution latency, and SLA compliance across your dedicated enterprise infrastructure.
            </p>
          </div>

          {/* Action & Polling Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Auto-refresh interval selector */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs font-semibold ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-[#151522] border-white/[0.08] text-zinc-300'
            }`}>
              <span className="px-2 text-[10px] font-mono-code uppercase opacity-70">Sync:</span>
              {(['5s', '10s', '30s', 'off'] as const).map((interval) => (
                <button
                  key={interval}
                  onClick={() => setAutoRefreshInterval(interval)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code transition-all ${
                    autoRefreshInterval === interval
                      ? 'bg-violet-600 text-white font-bold shadow-sm'
                      : isLight
                      ? 'hover:bg-slate-200 text-slate-600'
                      : 'hover:bg-white/[0.06] text-zinc-400'
                  }`}
                >
                  {interval.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={fetchRealTimeMetrics}
              disabled={isFetching}
              id="dashboard-fetch-telemetry-btn"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                  : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.1] text-white'
              }`}
              title="Fetch latest metrics now"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-400 ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Syncing...' : 'Fetch Live Metrics'}</span>
            </button>

            {/* Benchmark Probe Button */}
            <button
              onClick={handleTriggerTestProbe}
              disabled={isTestingProbe}
              id="dashboard-benchmark-fleet-btn"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/30 transition-all active:scale-95"
              title="Trigger synthetic latency and load test across active agents"
            >
              <Activity className={`w-3.5 h-3.5 ${isTestingProbe ? 'animate-pulse' : ''}`} />
              <span>{isTestingProbe ? 'Probing Fleet...' : 'Benchmark Fleet'}</span>
            </button>

            {/* Export Telemetry */}
            <button
              onClick={handleExportTelemetry}
              className={`p-2 rounded-xl border transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.1] text-zinc-300'
              }`}
              title="Export Telemetry JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Selector & Status Snapshot */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Active Project:
            </span>
            {activeProjects.map((project) => {
              const isSelected = project.id === currentProject.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-500 shadow-sm font-semibold'
                      : isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{project.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-code ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/[0.08] text-zinc-400'
                  }`}>
                    {project.stageProgress}%
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Last sync: <span className="font-semibold text-violet-500">{lastFetchedTime}</span>
            </span>
            <span className={`h-3 w-[1px] ${isLight ? 'bg-slate-300' : 'bg-white/20'}`} />
            <span className="flex items-center gap-1 text-[11px] font-mono-code text-emerald-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS 1.3 Mesh</span>
            </span>
          </div>
        </div>

        {/* Probe Feedback Banner */}
        {probeResult && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span className="font-mono-code">{probeResult}</span>
          </div>
        )}
      </div>

      {/* High-Level Executive KPI HUD (4-Card Bento Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Fleet Agents */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Active AI Fleet
            </span>
            <div className="w-8 h-8 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {metrics.length} / {metrics.length}
            </span>
            <span className="text-xs text-emerald-500 font-mono-code font-semibold">100% Operational</span>
          </div>
          <div className={`mt-2 text-xs flex items-center justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span>0 Degraded • 0 Throttled</span>
            <span className="text-emerald-500 font-medium">All Pods Healthy</span>
          </div>
        </div>

        {/* KPI 2: Real-Time Aggregate Throughput */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Fleet Throughput
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalFleetThroughput.toLocaleString()}
            </span>
            <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>tasks/min</span>
          </div>
          <div className={`mt-2 text-xs flex items-center justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span className="text-emerald-500 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.8% vs base
            </span>
            <span className="font-mono-code">Peak: 6,400</span>
          </div>
        </div>

        {/* KPI 3: Fleet Mean & P99 Latency */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Execution Latency
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {meanFleetLatency}
            </span>
            <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>ms mean</span>
          </div>
          <div className={`mt-2 text-xs flex items-center justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span className="font-mono-code text-amber-500">P99: {fleetP99Latency}ms</span>
            <span className="text-emerald-500 font-medium">SLA &lt; 250ms</span>
          </div>
        </div>

        {/* KPI 4: Monthly Value & Hours Saved */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Autonomous Impact
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalMonthlyHours}
            </span>
            <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>hrs saved/mo</span>
          </div>
          <div className={`mt-2 text-xs flex items-center justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <span className="text-emerald-500 font-medium">SLA: 99.98% Coherence</span>
            <span className="font-mono-code">Zero Exceptions</span>
          </div>
        </div>
      </div>

      {/* Selected Project Full Architecture & Milestone Overview */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[11px] font-mono-code uppercase font-bold px-2 py-0.5 rounded ${
                currentProject.status === 'in_production'
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                {currentProject.status === 'in_production' ? 'Production Canary Stage 4/4' : 'Validation Testing Phase'}
              </span>
              <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Lead Architect: {currentProject.leadArchitect}
              </span>
            </div>
            <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {currentProject.name}
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-3xl ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              {currentProject.description}
            </p>
          </div>

          {/* Live Production Endpoint */}
          {currentProject.liveEndpoint && (
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
            }`}>
              <div>
                <div className={`text-[10px] uppercase font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Live Microservice Endpoint
                </div>
                <div className={`font-mono-code font-semibold truncate max-w-[220px] sm:max-w-xs ${isLight ? 'text-violet-700' : 'text-violet-300'}`}>
                  {currentProject.liveEndpoint}
                </div>
              </div>
              <button
                onClick={() => handleCopyEndpoint(currentProject.liveEndpoint!)}
                className={`p-2 rounded-lg border transition-all ${
                  copiedEndpoint
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-white/[0.08] hover:bg-white/[0.12] border-white/[0.1] text-white'
                }`}
                title="Copy live endpoint URL"
              >
                {copiedEndpoint ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Project Stage Progress Bar & Tech Stack */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress bar */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                Deployment Completion Progress
              </span>
              <span className="font-mono-code font-bold text-violet-500">
                {currentProject.stageProgress}%
              </span>
            </div>
            <div className={`w-full h-2.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-white/[0.08]'}`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 transition-all duration-500"
                style={{ width: `${currentProject.stageProgress}%` }}
              />
            </div>
            {/* Milestones list */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentProject.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {m.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className={`truncate ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>{m.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono-code shrink-0 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                    {m.completionDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Enterprise Stack */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/[0.05]'
          }`}>
            <div className={`text-xs font-bold font-mono-code uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
              Connected Systems & Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentProject.techStack.map((tech, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-mono-code px-2.5 py-1 rounded-lg border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-[#151522] border-white/[0.08] text-zinc-300'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className={`text-[11px] leading-relaxed pt-2 border-t ${
              isLight ? 'border-slate-200 text-slate-600' : 'border-white/[0.06] text-zinc-400'
            }`}>
              Container cluster auto-provisions across AWS VPC & GCP multi-region ingress with zero cross-tenant latency.
            </div>
          </div>
        </div>
      </div>

      {/* RECHARTS BAR CHART SECTION: Real-Time AI Agent Performance */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-violet-500" />
              <h2 className={`text-lg font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                AI Agent Performance Telemetry (Recharts Bar Chart)
              </h2>
            </div>
            <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Interactive multi-metric comparison of autonomous agents deployed across your project cluster.
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border text-xs font-semibold ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#151522] border-white/[0.08]'
          }`}>
            <button
              onClick={() => setActiveChartMetric('throughput')}
              id="chart-metric-throughput-btn"
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeChartMetric === 'throughput'
                  ? 'bg-violet-600 text-white font-bold shadow-sm'
                  : isLight
                  ? 'hover:bg-slate-200 text-slate-700'
                  : 'hover:bg-white/[0.06] text-zinc-400'
              }`}
            >
              Task Throughput (Tasks/min)
            </button>

            <button
              onClick={() => setActiveChartMetric('latency')}
              id="chart-metric-latency-btn"
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeChartMetric === 'latency'
                  ? 'bg-violet-600 text-white font-bold shadow-sm'
                  : isLight
                  ? 'hover:bg-slate-200 text-slate-700'
                  : 'hover:bg-white/[0.06] text-zinc-400'
              }`}
            >
              Execution Latency (ms)
            </button>

            <button
              onClick={() => setActiveChartMetric('accuracy')}
              id="chart-metric-accuracy-btn"
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeChartMetric === 'accuracy'
                  ? 'bg-violet-600 text-white font-bold shadow-sm'
                  : isLight
                  ? 'hover:bg-slate-200 text-slate-700'
                  : 'hover:bg-white/[0.06] text-zinc-400'
              }`}
            >
              Accuracy SLA (%)
            </button>

            <button
              onClick={() => setActiveChartMetric('hoursSaved')}
              id="chart-metric-hours-btn"
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeChartMetric === 'hoursSaved'
                  ? 'bg-violet-600 text-white font-bold shadow-sm'
                  : isLight
                  ? 'hover:bg-slate-200 text-slate-700'
                  : 'hover:bg-white/[0.06] text-zinc-400'
              }`}
            >
              Monthly Hours Saved
            </button>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="mt-6 w-full h-[360px]" id="recharts-bar-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
            >
              <defs>
                <linearGradient id="barGradViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="barGradCapacity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity={0.25} />
                </linearGradient>
                <linearGradient id="barGradLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="barGradP99" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#D97706" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="barGradHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.65} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isLight ? '#E2E8F0' : 'rgba(255,255,255,0.08)'}
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke={isLight ? '#64748B' : '#A1A1AA'}
                fontSize={11}
                tickLine={false}
                dy={8}
                interval={0}
              />

              {activeChartMetric === 'throughput' && (
                <>
                  <YAxis
                    stroke={isLight ? '#64748B' : '#A1A1AA'}
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `${val} req`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-xl ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12121c] border-white/[0.12] text-white'
                        }`}>
                          <div className="font-bold text-sm mb-1">{data.fullName}</div>
                          <div className="text-[10px] font-mono-code text-violet-400 mb-2">{data.pod}</div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Active Throughput:</span>
                              <span className="font-bold text-violet-400 font-mono-code">{data.throughput} req/min</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Peak Capacity Ceiling:</span>
                              <span className="font-bold text-sky-400 font-mono-code">{data.capacity} req/min</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Cluster Utilization:</span>
                              <span className="font-bold font-mono-code">
                                {Math.round((data.throughput / data.capacity) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
                  />
                  <Bar
                    dataKey="throughput"
                    name="Current Throughput (tasks/min)"
                    fill="url(#barGradViolet)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="capacity"
                    name="Peak SLA Capacity (tasks/min)"
                    fill="url(#barGradCapacity)"
                    radius={[6, 6, 0, 0]}
                  />
                </>
              )}

              {activeChartMetric === 'latency' && (
                <>
                  <YAxis
                    stroke={isLight ? '#64748B' : '#A1A1AA'}
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `${val}ms`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-xl ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12121c] border-white/[0.12] text-white'
                        }`}>
                          <div className="font-bold text-sm mb-1">{data.fullName}</div>
                          <div className="text-[10px] font-mono-code text-emerald-400 mb-2">{data.pod}</div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Average Latency:</span>
                              <span className="font-bold text-emerald-400 font-mono-code">{data.latency} ms</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">P99 Latency:</span>
                              <span className="font-bold text-amber-400 font-mono-code">{data.p99Latency} ms</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Target SLA Ceiling:</span>
                              <span className="font-mono-code text-rose-400">&lt; 150 ms</span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                  <ReferenceLine
                    y={150}
                    stroke="#EF4444"
                    strokeDasharray="4 4"
                    label={{
                      value: 'Target SLA Ceiling (150ms)',
                      fill: '#EF4444',
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                  <Bar
                    dataKey="latency"
                    name="Mean Latency (ms)"
                    fill="url(#barGradLatency)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="p99Latency"
                    name="P99 Latency (ms)"
                    fill="url(#barGradP99)"
                    radius={[6, 6, 0, 0]}
                  />
                </>
              )}

              {activeChartMetric === 'accuracy' && (
                <>
                  <YAxis
                    domain={[99.5, 100]}
                    stroke={isLight ? '#64748B' : '#A1A1AA'}
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-xl ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12121c] border-white/[0.12] text-white'
                        }`}>
                          <div className="font-bold text-sm mb-1">{data.fullName}</div>
                          <div className="text-[10px] font-mono-code text-violet-400 mb-2">{data.pod}</div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Autonomous Accuracy:</span>
                              <span className="font-bold text-violet-400 font-mono-code">{data.accuracy}%</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">SLA Minimum:</span>
                              <span className="font-bold text-emerald-400 font-mono-code">99.50%</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Delta over SLA:</span>
                              <span className="font-bold text-emerald-400 font-mono-code">
                                +{(data.accuracy - 99.5).toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                  <ReferenceLine
                    y={99.5}
                    stroke="#10B981"
                    strokeDasharray="4 4"
                    label={{
                      value: 'Guaranteed 99.50% Minimum SLA',
                      fill: '#10B981',
                      fontSize: 10,
                      position: 'top',
                    }}
                  />
                  <Bar
                    dataKey="accuracy"
                    name="Accuracy / Success Rate (%)"
                    fill="url(#barGradViolet)"
                    radius={[6, 6, 0, 0]}
                  />
                </>
              )}

              {activeChartMetric === 'hoursSaved' && (
                <>
                  <YAxis
                    stroke={isLight ? '#64748B' : '#A1A1AA'}
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `${val}h`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-xl ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12121c] border-white/[0.12] text-white'
                        }`}>
                          <div className="font-bold text-sm mb-1">{data.fullName}</div>
                          <div className="text-[10px] font-mono-code text-indigo-400 mb-2">{data.pod}</div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Monthly Hours Saved:</span>
                              <span className="font-bold text-indigo-400 font-mono-code">{data.hoursSaved} hours</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-zinc-400">Equivalent Operator Time:</span>
                              <span className="font-bold text-zinc-300 font-mono-code">
                                {(data.hoursSaved / 160).toFixed(1)} Full-Time Staff
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
                  <Bar
                    dataKey="hoursSaved"
                    name="Operator Hours Saved (hrs/month)"
                    fill="url(#barGradHours)"
                    radius={[6, 6, 0, 0]}
                  />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance Detailed High-Level Matrix */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className={`text-lg font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Agent Fleet Telemetry Matrix & Status Table
            </h2>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Detailed runtime metrics, error rates, and cluster pods for each active coworker.
            </p>
          </div>

          {/* Search & Status Filter */}
          <div className="flex items-center gap-2.5">
            <div className={`relative flex items-center rounded-xl border text-xs px-2.5 py-1.5 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.08]'
            }`}>
              <Search className="w-3.5 h-3.5 text-zinc-400 mr-2" />
              <input
                type="text"
                value={agentSearch}
                onChange={(e) => setAgentSearch(e.target.value)}
                placeholder="Filter agents..."
                className="bg-transparent border-none outline-none text-xs w-28 sm:w-36 placeholder:text-zinc-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className={`p-1.5 rounded-xl border text-xs font-semibold outline-none ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#151522] border-white/[0.08] text-white'
              }`}
            >
              <option value="all">All Statuses</option>
              <option value="operational">Operational</option>
              <option value="active_sync">Active Sync</option>
              <option value="optimizing">Optimizing</option>
            </select>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-[11px] font-mono-code uppercase ${
                isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.06] text-zinc-400'
              }`}>
                <th className="pb-3 font-semibold">Agent Name & Role</th>
                <th className="pb-3 font-semibold">Pod / Cluster Node</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Throughput</th>
                <th className="pb-3 font-semibold text-right">Mean Latency</th>
                <th className="pb-3 font-semibold text-right">Accuracy</th>
                <th className="pb-3 font-semibold text-right">Error Rate</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredAgents.map((agent) => (
                <tr
                  key={agent.id}
                  className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-xs shrink-0">
                        {agent.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {agent.name}
                        </div>
                        <div className={`text-[11px] truncate max-w-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                          {agent.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 pr-4 font-mono-code text-[11px]">
                    <div className={isLight ? 'text-slate-700' : 'text-zinc-300'}>{agent.pod}</div>
                    <div className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>{agent.region}</div>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase ${
                      agent.status === 'operational'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : agent.status === 'active_sync'
                        ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20'
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        agent.status === 'operational' ? 'bg-emerald-500' : agent.status === 'active_sync' ? 'bg-sky-500' : 'bg-amber-500'
                      }`} />
                      <span>{agent.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 pr-4 text-right font-mono-code font-bold text-violet-500">
                    {agent.throughput.toLocaleString()} <span className="text-[10px] font-normal opacity-70">req/m</span>
                  </td>

                  <td className="py-3.5 pr-4 text-right font-mono-code">
                    <span className={agent.latency < 100 ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>
                      {agent.latency}ms
                    </span>
                    <span className={`text-[10px] block ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>P99: {agent.p99Latency}ms</span>
                  </td>

                  <td className="py-3.5 pr-4 text-right font-mono-code font-bold text-emerald-500">
                    {agent.accuracy}%
                  </td>

                  <td className="py-3.5 pr-4 text-right font-mono-code text-[11px] text-zinc-400">
                    {agent.errorRate.toFixed(3)}%
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        fetchRealTimeMetrics();
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono-code transition-all ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                          : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300 hover:text-white'
                      }`}
                      title="Probe agent health"
                    >
                      Ping Node
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-Time Live Telemetry Event Stream */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d0d15] border-white/[0.08]'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Live Telemetry Audit Log & Event Stream
            </h3>
          </div>
          <span className="text-[10px] font-mono-code text-emerald-500 animate-pulse">
            ● Streaming real-time events
          </span>
        </div>

        <div className={`mt-3 font-mono-code text-xs rounded-xl p-4 max-h-56 overflow-y-auto space-y-2 border ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/50 border-white/[0.04] text-zinc-300'
        }`}>
          {eventLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-2.5 leading-relaxed text-[11px]">
              <span className={`shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>[{log.timestamp}]</span>
              <span className="font-bold text-violet-500 dark:text-violet-400 shrink-0">{log.agent}:</span>
              <span className={log.status === 'warning' ? 'text-amber-400' : isLight ? 'text-slate-700' : 'text-zinc-300'}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
