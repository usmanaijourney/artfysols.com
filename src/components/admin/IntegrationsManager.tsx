import React, { useState } from 'react';
import {
  Cable,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Play,
  Key,
  Database,
  Lock,
  Cloud,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Server,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminIntegration } from '../../data/adminData';

interface IntegrationsManagerProps {
  theme: 'dark' | 'light';
}

export const IntegrationsManager: React.FC<IntegrationsManagerProps> = ({ theme }) => {
  const { integrations, updateIntegration, testIntegration, addToast } = useAdmin();
  const isLight = theme === 'light';

  const [testingId, setTestingId] = useState<string | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<AdminIntegration | null>(null);

  const handleTestConnection = async (item: AdminIntegration) => {
    setTestingId(item.id);
    try {
      const res = await testIntegration(item.id);
      if (res.success) {
        addToast('success', `${item.name} connection test passed in ${res.latency}ms.`);
      } else {
        addToast('error', `${item.name} connection test failed.`);
      }
    } catch {
      addToast('error', `Failed to execute probe test for ${item.name}`);
    } finally {
      setTestingId(null);
    }
  };

  const handleToggleEnvironment = (item: AdminIntegration) => {
    const nextEnv = item.environment === 'live' ? 'sandbox' : 'live';
    updateIntegration({
      ...item,
      environment: nextEnv,
      lastSync: 'Just now',
    });
    addToast('info', `Switched ${item.name} to ${nextEnv.toUpperCase()} environment.`);
  };

  const handleToggleStatus = (item: AdminIntegration) => {
    const nextStatus = item.status === 'connected' ? 'disconnected' : 'connected';
    updateIntegration({
      ...item,
      status: nextStatus,
      lastSync: 'Just now',
    });
    addToast(nextStatus === 'connected' ? 'success' : 'warning', `${item.name} connector is now ${nextStatus}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Enterprise Connectors & API Mesh
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Audit live connections to ERP ledgers, Stripe billing, messaging gateways, Pinecone vector stores, and multi-cloud VPCs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 font-mono-code bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            {integrations.filter((i) => i.status === 'connected').length} of {integrations.length} Connectors Live
          </span>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isLight ? 'bg-violet-100 text-violet-700' : 'bg-violet-950/60 border border-violet-700/30 text-violet-300'
                  }`}>
                    <Cable className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {item.name}
                    </h3>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono-code">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  item.status === 'connected'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : item.status === 'error'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}>
                  {item.status}
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Environment:</span>
                  <button
                    onClick={() => handleToggleEnvironment(item)}
                    className="font-mono-code text-[11px] font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
                  >
                    {item.environment.toUpperCase()}
                  </button>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>Last Probed:</span>
                  <span className="font-mono-code text-zinc-200">{item.lastSync}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
              <button
                onClick={() => handleTestConnection(item)}
                disabled={testingId === item.id}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingId === item.id ? 'animate-spin text-violet-400' : ''}`} />
                <span>Probe Test</span>
              </button>

              <button
                onClick={() => handleToggleStatus(item)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  item.status === 'connected'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                }`}
              >
                {item.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
