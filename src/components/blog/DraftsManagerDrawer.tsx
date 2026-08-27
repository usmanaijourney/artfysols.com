import React, { useState } from 'react';
import {
  X,
  FileText,
  Clock,
  Sparkles,
  Edit3,
  Trash2,
  Send,
  Eye,
  Copy,
  Search,
  CheckCircle2,
  Layers,
  Tag,
  ShieldCheck,
  Globe,
  AlertTriangle,
  FolderOpen,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface DraftsManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drafts: BlogPost[];
  onEditDraft: (draft: BlogPost) => void;
  onPublishDraft: (draft: BlogPost) => void;
  onDeleteDraft: (draftId: string) => void;
  onDuplicateDraft: (draft: BlogPost) => void;
  onCreateNew: () => void;
  onPreviewDraft: (draft: BlogPost) => void;
  theme: 'dark' | 'light';
}

export const DraftsManagerDrawer: React.FC<DraftsManagerDrawerProps> = ({
  isOpen,
  onClose,
  drafts,
  onEditDraft,
  onPublishDraft,
  onDeleteDraft,
  onDuplicateDraft,
  onCreateNew,
  onPreviewDraft,
  theme,
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const isEditor = Boolean(
    user && (user.role === 'editor' || user.role === 'super_admin' || user.role === 'admin' || user.role === 'support_agent')
  );

  const filteredDrafts = drafts.filter((draft) => {
    const matchesSearch =
      draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      draft.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || draft.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyMarkdown = (draft: BlogPost) => {
    const text = `# ${draft.title}\n\n**Author:** ${draft.author.name} (${draft.author.role})\n**Category:** ${draft.category}\n**Read Time:** ${draft.readTime}\n\n## Excerpt\n${draft.excerpt}\n\n---\n\n${draft.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(draft.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-900 shadow-slate-300/50'
            : 'bg-zinc-950 border-white/[0.1] text-zinc-100 shadow-black/80'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between gap-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-zinc-900/80 border-white/[0.08]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Editorial Drafts Desk</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono-code font-bold bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  {drafts.length} {drafts.length === 1 ? 'Draft' : 'Drafts'}
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Manage unpublished articles, whitepapers, and SEO configurations before publishing live.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onCreateNew();
              }}
              id="drafts-desk-new-article-btn"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Draft</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-lg border transition-colors ${
                isLight
                  ? 'hover:bg-slate-100 border-slate-200 text-slate-500'
                  : 'hover:bg-white/[0.08] border-white/[0.08] text-zinc-400'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div
          className={`px-6 py-3 border-b flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-100/70 border-slate-200'
              : 'bg-white/[0.02] border-white/[0.06]'
          }`}
        >
          <div className="relative w-full sm:w-72">
            <Search
              className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-zinc-500'
              }`}
            />
            <input
              type="text"
              placeholder="Search drafts by title, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8.5 pr-3 py-1.5 rounded-lg text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                  : 'bg-black/40 border-white/[0.1] text-zinc-100 focus:border-violet-500'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'AI Research & Insights', 'Security & Governance', 'Engineering & Architecture'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-sm'
                    : isLight
                    ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    : 'bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Drafts List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredDrafts.length === 0 ? (
            <div
              className={`text-center py-16 px-4 rounded-xl border border-dashed ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-500'
                  : 'bg-white/[0.01] border-white/[0.08] text-zinc-500'
              }`}
            >
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-40 text-violet-400" />
              <h3 className="text-sm font-bold mb-1">No Drafts Found</h3>
              <p className="text-xs max-w-sm mx-auto mb-4">
                {searchQuery
                  ? 'No drafts match your current search query or category filter.'
                  : 'Your editorial workspace currently has no active drafts.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCreateNew();
                }}
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Your First Draft</span>
              </button>
            </div>
          ) : (
            filteredDrafts.map((draft) => {
              const wordCount = draft.content.trim().split(/\s+/).length;
              const seoScore = draft.seo?.seoScore || 85;

              return (
                <div
                  key={draft.id}
                  className={`p-5 rounded-xl border transition-all hover:border-violet-500/50 group ${
                    isLight
                      ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                      : 'bg-zinc-900/60 border-white/[0.08] hover:bg-zinc-900/90'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono-code">
                          Draft
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-600'
                              : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                          }`}
                        >
                          {draft.type}
                        </span>
                        <span className="text-[11px] text-violet-400 font-medium">
                          {draft.category}
                        </span>

                        {/* SEO Health Badge */}
                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-code font-bold border ${
                            seoScore >= 90
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : seoScore >= 75
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          }`}
                        >
                          <Globe className="w-2.5 h-2.5" />
                          <span>SEO Score: {seoScore}/100</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => {
                          onClose();
                          onEditDraft(draft);
                        }}
                        className={`text-base font-bold transition-colors cursor-pointer group-hover:text-violet-400 ${
                          isLight ? 'text-slate-900' : 'text-zinc-100'
                        }`}
                      >
                        {draft.title}
                      </h3>

                      <p
                        className={`text-xs line-clamp-2 ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}
                      >
                        {draft.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1">
                        <span className={`flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                          <Clock className="w-3 h-3 text-violet-400" />
                          <span>{draft.publishDate}</span>
                        </span>
                        <span className={`flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                          <FileText className="w-3 h-3 text-indigo-400" />
                          <span>~{wordCount} words ({draft.readTime})</span>
                        </span>
                        <span className={`flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Author: {draft.author.name}</span>
                        </span>
                        {draft.seo?.focusKeywords && draft.seo.focusKeywords.length > 0 && (
                          <span className={`hidden sm:flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                            <Tag className="w-3 h-3 text-amber-400" />
                            <span>Keywords: {draft.seo.focusKeywords.slice(0, 2).join(', ')}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onPreviewDraft(draft);
                        }}
                        title="Preview Draft"
                        className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
                          isLight
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyMarkdown(draft)}
                        title="Copy Markdown"
                        className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
                          copiedId === draft.id
                            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                            : isLight
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300'
                        }`}
                      >
                        {copiedId === draft.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onDuplicateDraft(draft)}
                        title="Duplicate Draft"
                        className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
                          isLight
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onEditDraft(draft);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit & SEO</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onPublishDraft(draft)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Live</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete the draft "${draft.title}"?`)) {
                            onDeleteDraft(draft.id);
                          }
                        }}
                        title="Delete Draft"
                        className={`p-2 rounded-lg border text-xs transition-colors ${
                          isLight
                            ? 'hover:bg-rose-50 border-slate-200 text-rose-600'
                            : 'hover:bg-rose-950/30 border-white/[0.08] text-rose-400'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3.5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isLight
              ? 'bg-white border-slate-200 text-slate-500'
              : 'bg-zinc-900/80 border-white/[0.08] text-zinc-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-400" />
            <span>
              {isEditor
                ? 'Registered Editorial Desk Mode Active'
                : 'Sign in with an Editor account for direct one-click publishing'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>
              Drafts are securely persisted in local storage with automatic recovery.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
