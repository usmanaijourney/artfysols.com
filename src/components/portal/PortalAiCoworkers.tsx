import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Play,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Eye,
  Check,
  X,
  FileCode,
  Sliders,
  DollarSign,
  Activity,
  Terminal,
} from 'lucide-react';

interface Coworker {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  status: 'active' | 'idle' | 'paused' | 'disabled';
  model: string;
  temperature: number;
  assignedTools: string[];
  scheduleCron?: string;
  metrics: {
    totalTasksExecuted: number;
    successfulTasks: number;
    failedTasks: number;
    pendingApprovals: number;
    estimatedCostUsd: number;
  };
  lastRunAt?: string;
}

interface AiTask {
  id: string;
  coworkerId: string;
  coworkerName: string;
  title: string;
  prompt: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'QUEUED' | 'RUNNING' | 'WAITING_APPROVAL' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  approvalData?: {
    toolName: string;
    proposedPayload: any;
    status: string;
  };
  result?: any;
  error?: string;
  executionLogs: Array<{ timestamp: string; level: string; message: string }>;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

interface PortalAiCoworkersProps {
  theme: 'dark' | 'light';
  token: string | null;
}

export const PortalAiCoworkers: React.FC<PortalAiCoworkersProps> = ({ theme, token }) => {
  const isLight = theme === 'light';

  const [coworkers, setCoworkers] = useState<Coworker[]>([]);
  const [tasks, setTasks] = useState<AiTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [selectedCoworkerId, setSelectedCoworkerId] = useState<string>('ai_coworker_content_mgr');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPrompt, setTaskPrompt] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [activeTab, setActiveTab] = useState<'fleet' | 'tasks' | 'launchpad'>('fleet');
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState<AiTask | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchFleetData = async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const [coworkersRes, tasksRes] = await Promise.all([
        fetch('/api/v1/ai/coworkers', { headers }),
        fetch('/api/v1/ai/tasks', { headers }),
      ]);

      if (coworkersRes.ok) {
        const cData = await coworkersRes.json();
        if (cData.data) setCoworkers(cData.data);
      }

      if (tasksRes.ok) {
        const tData = await tasksRes.json();
        if (tData.data) setTasks(tData.data);
      }
    } catch (err) {
      console.error('Failed to load AI coworker fleet data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleetData();
    const interval = setInterval(fetchFleetData, 12000);
    return () => clearInterval(interval);
  }, [token]);

  const handleExecuteTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskPrompt) {
      setActionMessage({ type: 'error', text: 'Please provide both a task title and prompt instructions.' });
      return;
    }

    try {
      setExecuting(true);
      setActionMessage(null);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/v1/ai/coworkers/${selectedCoworkerId}/execute`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: taskTitle,
          prompt: taskPrompt,
          priority: taskPriority,
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setActionMessage({
          type: 'success',
          text: `Task "${taskTitle}" queued & executed successfully. State: ${resData.data.status}`,
        });
        setTaskTitle('');
        setTaskPrompt('');
        fetchFleetData();
        setActiveTab('tasks');
      } else {
        setActionMessage({
          type: 'error',
          text: resData.error?.message || 'Failed to dispatch AI coworker task.',
        });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err?.message || 'Network error executing AI task.' });
    } finally {
      setExecuting(false);
    }
  };

  const handleApprovalDecision = async (taskId: string, decision: 'approved' | 'rejected') => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/v1/ai/tasks/${taskId}/approval`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          decision,
          note: `Decided via Client Portal at ${new Date().toISOString()}`,
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setActionMessage({
          type: 'success',
          text: `Task successfully ${decision === 'approved' ? 'approved & published to live CMS' : 'rejected'}.`,
        });
        setSelectedTaskForDetails(null);
        fetchFleetData();
      } else {
        setActionMessage({ type: 'error', text: resData.error?.message || 'Approval decision failed.' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err?.message || 'Approval action failed.' });
    }
  };

  const handleApplyPreset = (presetType: string) => {
    if (presetType === 'whitepaper') {
      setSelectedCoworkerId('ai_coworker_content_mgr');
      setTaskTitle('High-Throughput Vector Retrieval & Graph RAG Architecture');
      setTaskPrompt(
        'Research emerging graph RAG topologies, analyze our existing CMS publications for content overlap, and formulate a technical whitepaper with benchmark latencies and code examples.'
      );
    } else if (presetType === 'recon') {
      setSelectedCoworkerId('ai_coworker_recon_auditor');
      setTaskTitle('Deterministic Multi-Tenant Payment Reconciliation Audit');
      setTaskPrompt(
        'Cross-verify all webhook ledger events against customer subscription tiers, verify token quotas, and generate an anomaly report.'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Banner */}
      <div
        className={`p-6 rounded-3xl border relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border-violet-200'
            : 'bg-gradient-to-r from-violet-950/40 via-purple-950/20 to-[#0c0c14] border-violet-500/20'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  AI Coworker Fleet & Autonomous Tasks
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Gemini 3.7 Flash</span>
                </span>
              </div>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Governed autonomous agents executing research, CMS authoring, and deterministic finance workflows with human-in-the-loop approvals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={fetchFleetData}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border-white/[0.08]'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Fleet</span>
            </button>
            <button
              onClick={() => setActiveTab('launchpad')}
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-violet-600/30 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Launch AI Task</span>
            </button>
          </div>
        </div>

        {/* Global Fleet Telemetry KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-violet-500/20">
          <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/[0.06]'}`}>
            <div className="text-[11px] text-zinc-400 font-medium">Active Coworkers</div>
            <div className={`text-lg font-bold font-display mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {coworkers.filter((c) => c.status === 'active').length} / {coworkers.length || 2}
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/[0.06]'}`}>
            <div className="text-[11px] text-zinc-400 font-medium">Completed Tasks</div>
            <div className={`text-lg font-bold font-display mt-0.5 ${isLight ? 'text-slate-900' : 'text-emerald-400'}`}>
              {tasks.filter((t) => t.status === 'COMPLETED').length}
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/[0.06]'}`}>
            <div className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Pending Approvals</span>
            </div>
            <div className={`text-lg font-bold font-display mt-0.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
              {tasks.filter((t) => t.status === 'WAITING_APPROVAL').length}
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white/70 border-slate-200' : 'bg-black/40 border-white/[0.06]'}`}>
            <div className="text-[11px] text-zinc-400 font-medium">SLA Reliability</div>
            <div className={`text-lg font-bold font-display mt-0.5 ${isLight ? 'text-slate-900' : 'text-violet-300'}`}>
              99.98%
            </div>
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-medium ${
            actionMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{actionMessage.text}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="p-1 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'fleet'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Active Coworkers ({coworkers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'tasks'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Task Queue & Logs ({tasks.length})</span>
          {tasks.filter((t) => t.status === 'WAITING_APPROVAL').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('launchpad')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'launchpad'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Task Launchpad</span>
        </button>
      </div>

      {/* TAB 1: FLEET OVERVIEW */}
      {activeTab === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {coworkers.map((coworker) => (
            <div
              key={coworker.id}
              className={`p-6 rounded-3xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                  : 'bg-[#09090e] border-white/[0.08] hover:border-violet-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {coworker.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-violet-400 font-medium">{coworker.role}</span>
                      <span className="text-[10px] text-zinc-500">•</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono-code">
                        {coworker.department}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active</span>
                </span>
              </div>

              <p className={`text-xs mt-3.5 leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                {coworker.description}
              </p>

              {/* Technical Specifications */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-zinc-500 block">Model & Engine</span>
                  <span className={`font-mono-code font-semibold ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>
                    {coworker.model}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block">Schedule Trigger</span>
                  <span className={`font-mono-code font-semibold ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>
                    {coworker.scheduleCron || 'Manual / API'}
                  </span>
                </div>
              </div>

              {/* Assigned Tools */}
              <div className="mt-3.5">
                <span className="text-[11px] text-zinc-500 block mb-1.5">Assigned Sandboxed Tools:</span>
                <div className="flex flex-wrap gap-1.5">
                  {coworker.assignedTools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono-code text-zinc-300"
                    >
                      {tool}()
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <div className="text-[11px] text-zinc-500">
                  Tasks: <span className="text-white font-bold">{coworker.metrics.totalTasksExecuted}</span> | Pending:{' '}
                  <span className="text-amber-400 font-bold">{coworker.metrics.pendingApprovals}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCoworkerId(coworker.id);
                    setActiveTab('launchpad');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3 h-3" />
                  <span>Dispatch Task</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: TASK QUEUE & EXECUTION LOGS */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#09090e] border-white/[0.08]'}`}>
              <Bot className="w-10 h-10 text-zinc-500 mx-auto mb-3 opacity-50" />
              <h4 className="text-sm font-bold text-white">No Autonomous Tasks Executed Yet</h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                Trigger a research or finance reconciliation task using the launchpad tab above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    task.status === 'WAITING_APPROVAL'
                      ? 'border-amber-500/40 bg-amber-500/5'
                      : isLight
                      ? 'bg-white border-slate-200'
                      : 'bg-[#09090e] border-white/[0.08]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          task.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : task.status === 'WAITING_APPROVAL'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : task.status === 'RUNNING'
                            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30 animate-pulse'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {task.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4" />}
                        {task.status === 'WAITING_APPROVAL' && <Clock className="w-4 h-4" />}
                        {task.status === 'RUNNING' && <Activity className="w-4 h-4" />}
                        {task.status === 'FAILED' && <AlertCircle className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {task.title}
                          </h4>
                          <span
                            className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full font-bold uppercase ${
                              task.status === 'COMPLETED'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : task.status === 'WAITING_APPROVAL'
                                ? 'bg-amber-500/20 text-amber-300'
                                : task.status === 'RUNNING'
                                ? 'bg-violet-500/20 text-violet-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Agent: <span className="text-violet-400 font-semibold">{task.coworkerName}</span> •{' '}
                          {new Date(task.createdAt).toLocaleTimeString()} ({new Date(task.createdAt).toLocaleDateString()})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {task.status === 'WAITING_APPROVAL' && (
                        <button
                          onClick={() => setSelectedTaskForDetails(task)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-md shadow-amber-500/20 transition-all"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Review & Approve</span>
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedTaskForDetails(selectedTaskForDetails?.id === task.id ? null : task)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                          isLight
                            ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border-white/[0.08]'
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5 text-violet-400" />
                        <span>{selectedTaskForDetails?.id === task.id ? 'Hide Trace' : 'View Trace'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Trace & Execution Logs Drawer */}
                  {selectedTaskForDetails?.id === task.id && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono-code text-[11px] text-zinc-300 space-y-1.5 max-h-60 overflow-y-auto">
                        <div className="text-zinc-500 text-[10px] pb-1 border-b border-white/[0.08] flex items-center justify-between">
                          <span>EXECUTION AUDIT TRACE — TASK {task.id}</span>
                          <span>PRIORITY: {task.priority.toUpperCase()}</span>
                        </div>
                        {task.executionLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-zinc-600 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                            <span
                              className={`shrink-0 font-bold ${
                                log.level === 'action'
                                  ? 'text-violet-400'
                                  : log.level === 'warn'
                                  ? 'text-amber-400'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {log.level.toUpperCase()}:
                            </span>
                            <span className="text-zinc-200">{log.message}</span>
                          </div>
                        ))}
                      </div>

                      {/* Approval Data Action Bar */}
                      {task.status === 'WAITING_APPROVAL' && task.approvalData && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4" />
                              <span>Human Governance Approval Required</span>
                            </div>
                            <p className="text-[11px] text-zinc-300 mt-1">
                              Action: Publish article &ldquo;{task.approvalData.proposedPayload.title}&rdquo; to live website CMS.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => handleApprovalDecision(task.id, 'rejected')}
                              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all"
                            >
                              Reject Draft
                            </button>
                            <button
                              onClick={() => handleApprovalDecision(task.id, 'approved')}
                              className="flex-1 sm:flex-initial px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1 transition-all"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve & Publish</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TASK LAUNCHPAD */}
      {activeTab === 'launchpad' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#09090e] border-white/[0.08]'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/[0.06]">
            <div>
              <h3 className={`text-lg font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Dispatch Autonomous Coworker Task
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Formulate instructions for the sandboxed AI agent. All actions strictly adhere to your company&apos;s governance policies.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-500">Presets:</span>
              <button
                type="button"
                onClick={() => handleApplyPreset('whitepaper')}
                className="px-2.5 py-1 rounded-lg bg-violet-600/10 hover:bg-violet-600/20 text-violet-300 border border-violet-500/20 text-[11px] font-semibold"
              >
                Whitepaper Research
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('recon')}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold"
              >
                Ledger Audit
              </button>
            </div>
          </div>

          <form onSubmit={handleExecuteTask} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Assign Coworker</label>
                <select
                  value={selectedCoworkerId}
                  onChange={(e) => setSelectedCoworkerId(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/50 border-white/[0.08] text-white'
                  }`}
                >
                  {coworkers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Task Priority</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/50 border-white/[0.08] text-white'
                  }`}
                >
                  <option value="low">Low Priority (Batch/Off-Peak)</option>
                  <option value="medium">Medium Priority (Standard SLA)</option>
                  <option value="high">High Priority (Immediate Dispatch)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Task Title / Objective</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g., Autonomous Reconciliation & Whitepaper Generation"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/50 border-white/[0.08] text-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Execution Instructions & Constraints</label>
              <textarea
                rows={4}
                value={taskPrompt}
                onChange={(e) => setTaskPrompt(e.target.value)}
                placeholder="Specify requirements, data sources to search, desired sections, and governance constraints..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium outline-none resize-none ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/50 border-white/[0.08] text-white'
                }`}
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by SOC2 Type II Sandboxed Tool Boundaries</span>
              </div>

              <button
                type="submit"
                disabled={executing}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
              >
                {executing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Task Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Execute Task Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
