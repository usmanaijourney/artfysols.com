import React, { useState } from 'react';
import {
  Shield,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Database,
  Globe,
  Tag,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminAuditItem } from '../../data/adminData';

interface AuditLogsViewProps {
  theme: 'dark' | 'light';
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ theme }) => {
  const { auditLogs } = useAdmin();
  const isLight = theme === 'light';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLogDetail, setActiveLogDetail] = useState<AdminAuditItem | null>(null);

  const categories = Array.from(new Set(auditLogs.map((l) => l.category)));

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetResource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `artify_audit_logs_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Security, Compliance & Audit Trail
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Cryptographically sealed and immutable audit trail tracking all operator mutations, deployments, and access events.
          </p>
        </div>

        <button
          onClick={handleExportJson}
          className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            isLight ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800' : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Bundle (.json)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor, action, resource..."
            className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`p-2 rounded-xl border text-xs ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
            }`}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className={`rounded-2xl border overflow-hidden ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className={`border-b ${isLight ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-white/[0.04] bg-white/[0.02] text-zinc-400'}`}>
              <th className="py-3.5 px-4 font-semibold">Timestamp</th>
              <th className="py-3.5 px-4 font-semibold">Operator</th>
              <th className="py-3.5 px-4 font-semibold">Action</th>
              <th className="py-3.5 px-4 font-semibold">Target Resource</th>
              <th className="py-3.5 px-4 font-semibold">Category</th>
              <th className="py-3.5 px-4 font-semibold">IP Address</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                onClick={() => setActiveLogDetail(log)}
                className={`cursor-pointer transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}
              >
                <td className="py-3.5 px-4 font-mono-code text-zinc-400 whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3.5 px-4">
                  <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {log.actorName}
                  </div>
                  <div className="text-[10px] text-zinc-500">{log.actorRole}</div>
                </td>
                <td className="py-3.5 px-4 font-mono-code font-semibold text-violet-400">
                  {log.action}
                </td>
                <td className="py-3.5 px-4 text-zinc-300 font-mono-code">
                  {log.targetResource}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code uppercase bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                    {log.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-zinc-500 font-mono-code text-[11px]">
                  {log.ipAddress}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                    log.status === 'success' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {log.status === 'success' ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    <span className="capitalize">{log.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {activeLogDetail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f0f18] border-white/[0.1] text-zinc-100'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
              <h3 className="text-base font-bold font-display">
                Audit Event Record
              </h3>
              <button
                onClick={() => setActiveLogDetail(null)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-zinc-500 block">Operator</span>
                  <span className="font-semibold">{activeLogDetail.actorName}</span> ({activeLogDetail.actorRole})
                </div>
                <div>
                  <span className="text-zinc-500 block">Timestamp</span>
                  <span className="font-mono-code">{activeLogDetail.timestamp}</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block">Action</span>
                <span className="font-mono-code font-bold text-violet-400">{activeLogDetail.action}</span>
              </div>

              <div>
                <span className="text-zinc-500 block">Target Resource</span>
                <span className="font-mono-code text-zinc-300">{activeLogDetail.targetResource}</span>
              </div>

              <div>
                <span className="text-zinc-500 block">Client Origin</span>
                <span className="font-mono-code text-zinc-400">{activeLogDetail.ipAddress} • {activeLogDetail.device}</span>
              </div>

              {activeLogDetail.detailsDiff && (
                <div className={`p-3 rounded-xl font-mono-code text-[11px] ${
                  isLight ? 'bg-slate-100' : 'bg-black/40'
                }`}>
                  <div className="text-zinc-500 mb-1">State Mutation Diff:</div>
                  <pre className="text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(activeLogDetail.detailsDiff, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
