import React, { useState } from 'react';
import {
  Server,
  Activity,
  Cpu,
  Database,
  Radio,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  HardDrive,
  ShieldAlert,
  Play,
  Check,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface SystemHealthViewProps {
  theme: 'dark' | 'light';
}

export const SystemHealthView: React.FC<SystemHealthViewProps> = ({ theme }) => {
  const { logAuditEvent } = useAdmin();
  const isLight = theme === 'light';

  const [isSimulatingFailover, setIsSimulatingFailover] = useState(false);
  const [failoverMessage, setFailoverMessage] = useState('');

  const handleSimulateFailover = () => {
    setIsSimulatingFailover(true);
    setTimeout(() => {
      setIsSimulatingFailover(false);
      setFailoverMessage('Autonomous multi-AZ failover drill completed successfully. RTO: 340ms, RPO: 0 data loss.');
      logAuditEvent({
        actorName: 'Super Admin Operator',
        actorEmail: 'admin@artifysols.com',
        actorRole: 'Platform Engineer',
        action: 'FAILOVER_DRILL',
        category: 'system',
        targetResource: 'Multi-AZ Cluster Nodes',
        ipAddress: '127.0.0.1',
        device: 'Admin Console',
        status: 'success',
      });
      setTimeout(() => setFailoverMessage(''), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Autonomous Agent Fleet Health & Telemetry
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Live health telemetry for global distributed clusters, LLM inference nodes, and database read/write replicas.
          </p>
        </div>

        <button
          onClick={handleSimulateFailover}
          disabled={isSimulatingFailover}
          className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-2 transition-all self-start md:self-auto disabled:opacity-40"
        >
          <Play className={`w-3.5 h-3.5 ${isSimulatingFailover ? 'animate-spin' : ''}`} />
          <span>{isSimulatingFailover ? 'Simulating Failover...' : 'Test Disaster Recovery Drill'}</span>
        </button>
      </div>

      {failoverMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{failoverMessage}</span>
        </div>
      )}

      {/* Cluster Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Node 1 */}
        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                US-East (Primary Mesh)
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase">
              Operational
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>CPU Core Utilization</span>
                <span className="font-mono-code text-zinc-200">38%</span>
              </div>
              <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[38%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Memory Allocation</span>
                <span className="font-mono-code text-zinc-200">12.4 GB / 32 GB</span>
              </div>
              <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                <div className="bg-violet-500 h-full w-[40%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Inference Throughput</span>
              <span className="text-zinc-200 font-mono-code font-semibold">1,820 tokens/sec</span>
            </div>
          </div>
        </div>

        {/* Node 2 */}
        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                EU-Central (Frankfurt)
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase">
              Operational
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>CPU Core Utilization</span>
                <span className="font-mono-code text-zinc-200">29%</span>
              </div>
              <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[29%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Memory Allocation</span>
                <span className="font-mono-code text-zinc-200">8.2 GB / 32 GB</span>
              </div>
              <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                <div className="bg-violet-500 h-full w-[26%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Inference Throughput</span>
              <span className="text-zinc-200 font-mono-code font-semibold">1,140 tokens/sec</span>
            </div>
          </div>
        </div>

        {/* Node 3 */}
        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Neural Vector DB & SQL
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase">
              Synchronized
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Connection Pool</span>
                <span className="font-mono-code text-zinc-200">32 / 128 Active</span>
              </div>
              <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[25%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Disk I/O Write Capacity</span>
                <span className="font-mono-code text-zinc-200">14 MB/s</span>
              </div>
              <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[18%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Replication Lag</span>
              <span className="text-emerald-400 font-mono-code font-semibold">&lt; 2 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
