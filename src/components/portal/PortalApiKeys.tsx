import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ApiKeyRecord } from '../../types';
import { safeCopyToClipboard } from '../../utils/clipboard';
import {
  Key,
  Plus,
  Copy,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  AlertCircle,
  X,
  Lock,
} from 'lucide-react';

export const PortalApiKeys: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const { user, createApiKey, revokeApiKey } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'production' | 'sandbox'>('production');
  const [newKeyPerm, setNewKeyPerm] = useState<'full_orchestration' | 'read_telemetry' | 'agent_dispatch_only'>('full_orchestration');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [justGeneratedKey, setJustGeneratedKey] = useState<ApiKeyRecord | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!user) return null;

  const handleCopy = async (text: string, id: string) => {
    await safeCopyToClipboard(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const generated = createApiKey(newKeyName, newKeyEnv, newKeyPerm);
    setJustGeneratedKey(generated);
    setNewKeyName('');
    setIsCreateModalOpen(false);
    setFeedbackMsg('API Key generated successfully.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            API Keys & Developer Integrations
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Authenticate your custom backends, ERP webhooks, and agent orchestrators directly against Artify APIs.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          id="create-api-key-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02] self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New API Key</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
          isLight
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
        }`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Just Generated Key Banner */}
      {justGeneratedKey && (
        <div className={`p-5 rounded-2xl border space-y-3 animate-in fade-in ${
          isLight
            ? 'bg-violet-50 border-violet-200'
            : 'bg-violet-950/40 border-violet-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold flex items-center gap-2 ${
              isLight ? 'text-violet-900' : 'text-white'
            }`}>
              <Key className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <span>Newly Generated Key: {justGeneratedKey.name}</span>
            </span>
            <button
              onClick={() => setJustGeneratedKey(null)}
              className={`text-xs ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-zinc-400 hover:text-white'}`}
            >
              Dismiss
            </button>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
            Please copy this key now. For your security, the full secret will not be displayed again.
          </p>
          <div className={`flex items-center justify-between p-3 rounded-xl border font-mono-code text-xs ${
            isLight
              ? 'bg-white border-violet-200 text-violet-800'
              : 'bg-black/60 border-white/[0.1] text-violet-300'
          }`}>
            <span className="truncate">{justGeneratedKey.maskedKey}</span>
            <button
              onClick={() => handleCopy(justGeneratedKey.maskedKey, 'just-gen')}
              className="ml-3 px-3 py-1 rounded bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-sans font-semibold flex items-center gap-1 shrink-0 shadow-sm"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKeyId === 'just-gen' ? 'Copied' : 'Copy Key'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-[#0c0c14] border-white/[0.08] shadow-xl'
      }`}>
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'border-slate-100' : 'border-white/[0.06]'
        }`}>
          <h2 className={`text-sm font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>Active API Credentials</h2>
          <span className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{user.apiKeys.length} Active Keys</span>
        </div>

        <div className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/[0.04]'}`}>
          {user.apiKeys.map((key) => (
            <div key={key.id} className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
              isLight ? 'hover:bg-slate-50/80' : 'hover:bg-white/[0.02]'
            }`}>
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{key.name}</span>
                  <span
                    className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded-full font-semibold border ${
                      key.environment === 'production'
                        ? isLight
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                        : isLight
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-amber-950/60 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {key.environment}
                  </span>
                </div>
                <div className={`font-mono-code text-xs truncate max-w-md ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  {key.maskedKey}
                </div>
                <div className={`flex flex-wrap items-center gap-3 text-[11px] pt-0.5 ${
                  isLight ? 'text-slate-500' : 'text-zinc-500'
                }`}>
                  <span>Created {key.createdAt}</span>
                  <span>•</span>
                  <span>Last used: {key.lastUsed}</span>
                  <span>•</span>
                  <span className={`capitalize font-mono-code ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>
                    {key.permissions.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(key.maskedKey, key.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border-transparent'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKeyId === key.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Revoke API key "${key.name}"? Active integrations using this key will immediately fail.`)) {
                      revokeApiKey(key.id);
                    }
                  }}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isLight
                      ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-600'
                      : 'bg-rose-950/30 hover:bg-rose-900/50 border border-rose-500/30 text-rose-400 hover:text-rose-200'
                  }`}
                  title="Revoke Key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet Quickstart */}
      <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-[#0c0c14] border-white/[0.08]'
      }`}>
        <div className="flex items-center gap-2">
          <Terminal className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
          <h3 className={`text-xs font-bold font-display uppercase tracking-wider font-mono-code ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            SDK Integration Quickstart
          </h3>
        </div>

        <div className={`p-4 rounded-xl border font-mono-code text-xs overflow-x-auto space-y-1 ${
          isLight
            ? 'bg-slate-900 text-slate-200 border-slate-800'
            : 'bg-black/70 border-white/[0.06] text-zinc-300'
        }`}>
          <div className="text-zinc-500"># Dispatch an autonomous agent action via cURL</div>
          <div>
            <span className="text-violet-400">curl</span> -X POST https://api.artifysols.com/v1/agents/dispatch \
          </div>
          <div className="pl-4">
            -H <span className="text-emerald-300">"Authorization: Bearer art_live_your_key_here"</span> \
          </div>
          <div className="pl-4">
            -H <span className="text-emerald-300">"Content-Type: application/json"</span> \
          </div>
          <div className="pl-4">
            -d <span className="text-amber-300">'{`{"agentId": "reconciliation-sentinel", "action": "reconcile_month", "syncErp": true}'`}</span>
          </div>
        </div>
      </div>

      {/* Create Key Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCreateModalOpen(false);
          }}
        >
          <div className={`relative w-full max-w-md border rounded-2xl shadow-2xl p-6 space-y-5 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0d0d16] border-violet-500/30 text-white'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b ${
              isLight ? 'border-slate-100' : 'border-white/[0.08]'
            }`}>
              <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>Generate API Key</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className={`p-1.5 rounded-lg ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-zinc-400 hover:text-white'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Key Name / Description</label>
                <input
                  type="text"
                  placeholder="e.g. NetSuite-Production-Connector"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  required
                  className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-[#12121e] border-white/[0.1] text-white placeholder-zinc-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Environment</label>
                <select
                  value={newKeyEnv}
                  onChange={(e) => setNewKeyEnv(e.target.value as any)}
                  className={`w-full border rounded-xl px-3 py-2 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#12121e] border-white/[0.1] text-white'
                  }`}
                >
                  <option value="production">Production (Live Workflows)</option>
                  <option value="sandbox">Sandbox / Staging Testing</option>
                </select>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Permissions Scope</label>
                <select
                  value={newKeyPerm}
                  onChange={(e) => setNewKeyPerm(e.target.value as any)}
                  className={`w-full border rounded-xl px-3 py-2 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900'
                      : 'bg-[#12121e] border-white/[0.1] text-white'
                  }`}
                >
                  <option value="full_orchestration">Full Agent Orchestration (Read & Write)</option>
                  <option value="agent_dispatch_only">Agent Dispatch Only (Trigger Workflows)</option>
                  <option value="read_telemetry">Read-Only Telemetry & Analytics</option>
                </select>
              </div>

              <div className={`flex justify-end gap-3 pt-3 border-t ${
                isLight ? 'border-slate-100' : 'border-white/[0.08]'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      : 'bg-white/[0.06] text-zinc-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-md"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
