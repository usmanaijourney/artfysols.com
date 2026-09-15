import React, { useState } from 'react';
import {
  Layers,
  FileText,
  Plus,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  MoveUp,
  MoveDown,
  Save,
  Check,
  Globe,
  Search,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Upload,
  Copy,
  CheckCircle,
  AlertCircle,
  Code,
  Sliders,
  Settings,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { WebsitePage, HomepageSection, AdminSeoPage, AdminMediaAsset } from '../../data/adminData';

interface CmsManagerProps {
  theme: 'dark' | 'light';
}

export const CmsManager: React.FC<CmsManagerProps> = ({ theme }) => {
  const {
    pages,
    updatePage,
    createPage,
    deletePage,
    homepageSections,
    updateSection,
    toggleSectionEnabled,
    reorderSections,
    seoPages,
    updateSeoPage,
    media,
    addMediaAsset,
    deleteMediaAsset,
    addToast,
  } = useAdmin();

  const isLight = theme === 'light';

  // Sub-tabs: 'pages' | 'sections' | 'seo' | 'media'
  const [activeSubTab, setActiveSubTab] = useState<'pages' | 'sections' | 'seo' | 'media'>('pages');

  // New Page Modal State
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPagePath, setNewPagePath] = useState('');

  // Editing Section Modal State
  const [editingSection, setEditingSection] = useState<HomepageSection | null>(null);

  // New Media Upload State
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [copiedMediaId, setCopiedMediaId] = useState<string | null>(null);

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle || !newPageSlug) return;
    const formattedPath = newPagePath || (newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`);
    createPage({
      title: newPageTitle,
      slug: newPageSlug.replace(/^\//, ''),
      path: formattedPath,
      status: 'draft',
      lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16),
      version: 'v1.0.0',
      metaTitle: `${newPageTitle} — Artify Solutions`,
      metaDescription: `Explore ${newPageTitle} powered by Artify Solutions enterprise platform.`,
      sectionsCount: 1,
    });
    setNewPageTitle('');
    setNewPageSlug('');
    setNewPagePath('');
    setIsAddPageOpen(false);
    addToast('success', 'Page created successfully in Draft mode.');
  };

  const handleMoveSection = (section: HomepageSection, direction: 'up' | 'down') => {
    const sorted = [...homepageSections].sort((a, b) => a.order - b.order);
    const currentIndex = sorted.findIndex((s) => s.id === section.id);
    if (currentIndex < 0) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    // Swap positions
    const temp = sorted[currentIndex];
    sorted[currentIndex] = sorted[targetIndex];
    sorted[targetIndex] = temp;

    // Reassign order
    const updated = sorted.map((s, idx) => ({ ...s, order: idx + 1 }));
    reorderSections(updated);
    addToast('info', `Section order updated: ${section.name}`);
  };

  const handleSaveEditingSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    updateSection(editingSection);
    setEditingSection(null);
    addToast('success', 'Section content updated and propagated to live layout.');
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaName || !newMediaUrl) return;
    addMediaAsset({
      title: newMediaName,
      filename: `${newMediaName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`,
      url: newMediaUrl,
      type: 'image',
      size: '240 KB',
      dimensions: '1200x800',
      tags: ['Website', 'CMS'],
    });
    setNewMediaName('');
    setNewMediaUrl('');
    addToast('success', 'Asset added to media library.');
  };

  const handleCopyUrl = (item: AdminMediaAsset) => {
    navigator.clipboard.writeText(item.url);
    setCopiedMediaId(item.id);
    addToast('info', 'Asset URL copied to clipboard.');
    setTimeout(() => setCopiedMediaId(null), 2000);
  };

  const sortedSections = [...homepageSections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* CMS Header & Sub-navigation */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Website CMS & Visual Architecture
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Govern Artify's live website pages, section ordering, copy, SEO metadata, and cloud media without touching code.
          </p>
        </div>

        {/* Sub-tabs pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/[0.06] self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('pages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'pages'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Pages ({pages.length})
          </button>

          <button
            onClick={() => setActiveSubTab('sections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'sections'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Section Studio ({homepageSections.length})
          </button>

          <button
            onClick={() => setActiveSubTab('seo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'seo'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            SEO ({seoPages.length})
          </button>

          <button
            onClick={() => setActiveSubTab('media')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'media'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Media ({media.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: PAGES MANAGEMENT */}
      {activeSubTab === 'pages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              Showing <span className="text-zinc-200 font-semibold">{pages.length}</span> registered website routes
            </div>
            <button
              onClick={() => setIsAddPageOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Page</span>
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-white/[0.04] bg-white/[0.02] text-zinc-400'}`}>
                  <th className="py-3.5 px-4 font-semibold">Page Title</th>
                  <th className="py-3.5 px-4 font-semibold">URL Path</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Sections</th>
                  <th className="py-3.5 px-4 font-semibold">Last Modified</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {pages.map((p) => (
                  <tr key={p.id} className={`group ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-violet-400" />
                        <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono-code text-zinc-400">
                      {p.path}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 font-mono-code">
                      {p.sectionsCount} blocks
                    </td>
                    <td className="py-3 px-4 text-zinc-500">
                      {p.lastModified}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            updatePage({
                              ...p,
                              status: p.status === 'published' ? 'draft' : 'published',
                            });
                            addToast('info', `Page status changed: ${p.title}`);
                          }}
                          className={`p-1.5 rounded-lg border text-xs ${
                            p.status === 'published'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                          }`}
                          title={p.status === 'published' ? 'Unpublish to Draft' : 'Publish to Live'}
                        >
                          {p.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SECTIONS STUDIO (VISUAL REORDERING & COPY EDITING) */}
      {activeSubTab === 'sections' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              Arranging <span className="text-zinc-200 font-semibold">{sortedSections.length}</span> dynamic landing sections
            </div>
            <span className="text-xs text-emerald-400 font-medium">
              {sortedSections.filter((s) => s.enabled).length} Enabled
            </span>
          </div>

          <div className="space-y-3">
            {sortedSections.map((sec, idx) => (
              <div
                key={sec.id}
                className={`p-4 rounded-xl border transition-all ${
                  !sec.enabled
                    ? isLight ? 'bg-slate-100/70 border-slate-200 opacity-60' : 'bg-white/[0.01] border-white/[0.04] opacity-50'
                    : isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center gap-1 shrink-0 pt-0.5">
                      <button
                        onClick={() => handleMoveSection(sec, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-white/[0.1] text-zinc-400 disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono-code text-zinc-500 font-bold">{sec.order}</span>
                      <button
                        onClick={() => handleMoveSection(sec, 'down')}
                        disabled={idx === sortedSections.length - 1}
                        className="p-1 rounded hover:bg-white/[0.1] text-zinc-400 disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {sec.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 font-mono-code">
                          #{sec.componentKey}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                        {sec.headline}
                      </div>
                      {sec.subheadline && (
                        <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">{sec.subheadline}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => {
                        toggleSectionEnabled(sec.id);
                        addToast('info', `Section ${sec.enabled ? 'disabled' : 'enabled'}: ${sec.name}`);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        sec.enabled
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{sec.enabled ? 'Active on Page' : 'Hidden'}</span>
                    </button>

                    <button
                      onClick={() => setEditingSection({ ...sec })}
                      className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SEO & METADATA CONFIGURATION */}
      {activeSubTab === 'seo' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoPages.map((seo) => (
              <div
                key={seo.id}
                className={`p-5 rounded-2xl border ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-violet-400" />
                    <span className="font-bold text-xs text-white uppercase font-mono-code">
                      {seo.path}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    seo.indexStatus === 'indexed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {seo.indexStatus}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={seo.title}
                      onChange={(e) => updateSeoPage({ ...seo, title: e.target.value })}
                      className={`w-full p-2 rounded-lg border text-xs ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#151522] border-white/[0.08] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={seo.description}
                      onChange={(e) => updateSeoPage({ ...seo, description: e.target.value })}
                      className={`w-full p-2 rounded-lg border text-xs resize-none ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#151522] border-white/[0.08] text-white'
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 truncate max-w-[220px]">Canonical: {seo.canonicalUrl}</span>
                    <button
                      onClick={() => addToast('success', `SEO saved for ${seo.path}`)}
                      className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[11px]"
                    >
                      Save Meta
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MEDIA ASSETS */}
      {activeSubTab === 'media' && (
        <div className="space-y-6">
          {/* Media Upload */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <h3 className={`text-sm font-bold font-display mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Register Cloud Media Asset
            </h3>
            <form onSubmit={handleAddMedia} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newMediaName}
                onChange={(e) => setNewMediaName(e.target.value)}
                placeholder="Asset Label (e.g. Hero Architecture Visual)"
                required
                className={`p-2.5 rounded-xl border text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                }`}
              />
              <input
                type="url"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
                className={`p-2.5 rounded-xl border text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-violet-600/25 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Add Asset to Library</span>
              </button>
            </form>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between group overflow-hidden ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
                }`}
              >
                <div>
                  <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-black/40 relative">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className={`font-semibold text-xs truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 flex items-center justify-between font-mono-code">
                    <span>{item.dimensions || '1200x800'}</span>
                    <span>{item.size}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleCopyUrl(item)}
                    className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
                  >
                    {copiedMediaId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied URL</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      deleteMediaAsset(item.id);
                      addToast('info', `Removed asset: ${item.title}`);
                    }}
                    className="p-1 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE PAGE MODAL */}
      {isAddPageOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0f0f18] border-white/[0.1]'
          }`}>
            <h3 className={`text-base font-bold font-display mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Create New Website Route
            </h3>
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">Page Title</label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="e.g. AI Governance & Compliance"
                  required
                  className={`w-full p-2.5 rounded-xl border text-xs ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">URL Path Slug</label>
                <input
                  type="text"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  placeholder="governance"
                  required
                  className={`w-full p-2.5 rounded-xl border text-xs font-mono-code ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPageOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/25"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SECTION CONTENT MODAL */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl max-h-[90vh] overflow-y-auto ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0f0f18] border-white/[0.1]'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
              <div>
                <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Edit Section: {editingSection.name}
                </h3>
                <span className="text-[10px] text-violet-400 font-mono-code">#{editingSection.componentKey}</span>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveEditingSection} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Section Name</label>
                  <input
                    type="text"
                    value={editingSection.name}
                    onChange={(e) => setEditingSection({ ...editingSection, name: e.target.value })}
                    required
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">CTA Button Label</label>
                  <input
                    type="text"
                    value={editingSection.ctaLabel || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, ctaLabel: e.target.value })}
                    placeholder="e.g. Schedule Executive Briefing"
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Main Headline</label>
                <input
                  type="text"
                  value={editingSection.headline}
                  onChange={(e) => setEditingSection({ ...editingSection, headline: e.target.value })}
                  required
                  className={`w-full p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Supporting Subheadline</label>
                <textarea
                  rows={3}
                  value={editingSection.subheadline || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subheadline: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border resize-none ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/25"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
