import React, { useState } from 'react';
import {
  Rocket,
  Smartphone,
  Globe,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  History,
  Plus,
  RotateCcw,
  ExternalLink,
  GitCommit,
  Tag,
  Download,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminAppRelease } from '../../data/adminData';

interface ReleasesManagerProps {
  theme: 'dark' | 'light';
}

export const ReleasesManager: React.FC<ReleasesManagerProps> = ({ theme }) => {
  const { releases, createRelease, updateRelease, addToast } = useAdmin();
  const isLight = theme === 'light';

  // Add Release Modal
  const [isAddReleaseOpen, setIsAddReleaseOpen] = useState(false);
  const [newAppName, setNewAppName] = useState('');
  const [newPlatform, setNewPlatform] = useState<'web' | 'android' | 'ios' | 'desktop'>('web');
  const [newVersion, setNewVersion] = useState('v1.0.0');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName || !newVersion) return;

    createRelease({
      appName: newAppName,
      platform: newPlatform,
      version: newVersion,
      buildNumber: Math.floor(Math.random() * 1000) + 100,
      releaseStatus: 'production',
      releaseDate: new Date().toISOString().slice(0, 10),
      minOs: newPlatform === 'android' ? 'Android 11+' : newPlatform === 'ios' ? 'iOS 15+' : 'Modern Browsers',
      storeUrl: 'https://artifysols.com/apps',
      releaseNotes: newNotes || 'General performance enhancements and adaptive agent orchestrations.',
    });

    setNewAppName('');
    setNewVersion('');
    setNewNotes('');
    setIsAddReleaseOpen(false);
    addToast('success', `Release build ${newVersion} created.`);
  };

  const handlePromoteOrRollback = (rel: AdminAppRelease) => {
    const nextStatus = rel.releaseStatus === 'production' ? 'draft' : 'production';
    updateRelease({
      ...rel,
      releaseStatus: nextStatus,
    });
    addToast(nextStatus === 'production' ? 'success' : 'warning', `Release ${rel.appName} ${rel.version} status: ${nextStatus}.`);
  };

  const getPlatformIcon = (platform: AdminAppRelease['platform']) => {
    switch (platform) {
      case 'web':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'android':
      case 'ios':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'desktop':
        return <Monitor className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Cross-Platform App Releases & Deployments
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Manage build pipelines, version tagging, production rollouts, and instant rollbacks for Web, Android, and iOS client distributions.
          </p>
        </div>

        <button
          onClick={() => setIsAddReleaseOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/25 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Stage New Release</span>
        </button>
      </div>

      {/* Releases Table */}
      <div className={`rounded-2xl border overflow-hidden ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className={`border-b ${isLight ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-white/[0.04] bg-white/[0.02] text-zinc-400'}`}>
              <th className="py-3.5 px-4 font-semibold">Application</th>
              <th className="py-3.5 px-4 font-semibold">Platform</th>
              <th className="py-3.5 px-4 font-semibold">Version & Build</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Deployed Date</th>
              <th className="py-3.5 px-4 font-semibold">Downloads</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {releases.map((rel) => (
              <tr key={rel.id} className={`group ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                <td className="py-3.5 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/[0.06]">
                      {getPlatformIcon(rel.platform)}
                    </div>
                    <div>
                      <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{rel.appName}</div>
                      <div className="text-[10px] text-zinc-500 line-clamp-1">{rel.releaseNotes}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 capitalize text-zinc-400 font-mono-code">{rel.platform}</td>
                <td className="py-3.5 px-4 font-mono-code">
                  <span className="font-semibold text-violet-400">{rel.version}</span>
                  <span className="text-zinc-500 text-[10px] ml-1">#{rel.buildNumber}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    rel.releaseStatus === 'production'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {rel.releaseStatus}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-zinc-400">{rel.releaseDate}</td>
                <td className="py-3.5 px-4 font-mono-code text-zinc-300">
                  {rel.downloadCount.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handlePromoteOrRollback(rel)}
                    className="px-2.5 py-1 rounded-lg border border-white/[0.08] hover:bg-white/[0.05] text-zinc-300 text-xs font-medium"
                    title="Toggle Release Promotion"
                  >
                    {rel.releaseStatus === 'production' ? 'Archive' : 'Promote'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE RELEASE MODAL */}
      {isAddReleaseOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0f0f18] border-white/[0.1]'
          }`}>
            <h3 className={`text-base font-bold font-display mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Stage Application Release
            </h3>
            <form onSubmit={handleCreateRelease} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Application Name</label>
                <input
                  type="text"
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  placeholder="e.g. Artify Enterprise ERP Core"
                  required
                  className={`w-full p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  >
                    <option value="web">Web Cloud</option>
                    <option value="android">Android APK</option>
                    <option value="ios">iOS TestFlight</option>
                    <option value="desktop">Desktop Electron</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Version Tag</label>
                  <input
                    type="text"
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    placeholder="v3.5.0"
                    required
                    className={`w-full p-2.5 rounded-xl border font-mono-code ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Changelog / Release Notes</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key architectural changes and fixes..."
                  className={`w-full p-2.5 rounded-xl border resize-none ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddReleaseOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-md shadow-violet-600/25"
                >
                  Publish Build
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
