import React, { useState } from 'react';
import {
  Globe,
  Share2,
  Code2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  ExternalLink,
  Smartphone,
  Monitor,
  Eye,
  Tag,
  Shield,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { ArticleSeoMetadata, BlogPost } from '../../types';
import { generateSeoStructuredData } from '../../data/blogData';

interface SeoMetaEditorProps {
  seo: ArticleSeoMetadata;
  onChange: (updatedSeo: ArticleSeoMetadata) => void;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  type: string;
  authorName: string;
  theme: 'dark' | 'light';
}

export const SeoMetaEditor: React.FC<SeoMetaEditorProps> = ({
  seo,
  onChange,
  title,
  excerpt,
  content,
  slug,
  category,
  type,
  authorName,
  theme,
}) => {
  const isLight = theme === 'light';
  const [serpView, setSerpView] = useState<'desktop' | 'mobile'>('desktop');
  const [socialView, setSocialView] = useState<'twitter' | 'linkedin'>('twitter');
  const [keywordInput, setKeywordInput] = useState('');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Computed values
  const metaTitle = seo.metaTitle ?? (title || 'Untitled Article | Artify Solutions');
  const metaDesc = seo.metaDescription ?? (excerpt || 'Read the latest research from Artify Solutions.');
  const canonicalUrl = seo.canonicalUrl ?? (typeof window !== 'undefined' ? `${window.location.origin}#blog-${slug || 'preview'}` : `https://artifysols.com#blog-${slug || 'preview'}`);
  const focusKeywords = seo.focusKeywords ?? ['AI Agents', 'Enterprise'];
  const robotsDirective = seo.robotsDirective ?? 'index, follow';
  const schemaType = seo.schemaType ?? (type === 'News' ? 'NewsArticle' : 'TechArticle');
  const ogTitle = seo.ogTitle ?? metaTitle;
  const ogDesc = seo.ogDescription ?? metaDesc;
  const twitterCard = seo.twitterCard ?? 'summary_large_image';

  // Calculate SEO Health Score
  const checks = [
    {
      id: 'title_length',
      label: 'Meta Title Length (50-60 chars)',
      passed: metaTitle.length >= 40 && metaTitle.length <= 65,
      current: `${metaTitle.length} chars`,
      recommendation: 'Target between 50 to 60 characters for optimal SERP display.',
    },
    {
      id: 'desc_length',
      label: 'Meta Description Length (140-160 chars)',
      passed: metaDesc.length >= 120 && metaDesc.length <= 165,
      current: `${metaDesc.length} chars`,
      recommendation: 'Target between 140 to 160 characters to maximize click-through rate.',
    },
    {
      id: 'focus_keywords',
      label: 'Focus Keywords Configured',
      passed: focusKeywords.length > 0,
      current: `${focusKeywords.length} tags`,
      recommendation: 'Add at least 2 target search queries for contextual indexing.',
    },
    {
      id: 'keyword_in_title',
      label: 'Keyword in Title',
      passed: focusKeywords.some((k) => metaTitle.toLowerCase().includes(k.toLowerCase())),
      current: focusKeywords.some((k) => metaTitle.toLowerCase().includes(k.toLowerCase())) ? 'Present' : 'Missing',
      recommendation: 'Include at least one focus keyword in the meta title.',
    },
    {
      id: 'canonical_set',
      label: 'Canonical URL Defined',
      passed: canonicalUrl.startsWith('http'),
      current: canonicalUrl.startsWith('http') ? 'Configured' : 'Incomplete',
      recommendation: 'Specify canonical URL to prevent duplicate content penalties.',
    },
    {
      id: 'schema_type',
      label: 'Schema.org JSON-LD Structured Data',
      passed: Boolean(schemaType),
      current: schemaType,
      recommendation: 'Structured markup enables Google Rich Snippets & Knowledge Graph cards.',
    },
  ];

  const passedChecksCount = checks.filter((c) => c.passed).length;
  const seoScore = Math.round((passedChecksCount / checks.length) * 100);

  const handleUpdate = (patch: Partial<ArticleSeoMetadata>) => {
    onChange({
      ...seo,
      metaTitle,
      metaDescription: metaDesc,
      focusKeywords,
      canonicalUrl,
      robotsDirective,
      schemaType,
      ogTitle,
      ogDescription: ogDesc,
      twitterCard,
      seoScore,
      ...patch,
    });
  };

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    const clean = keywordInput.trim().replace(/^,+|,+$/g, '');
    if (!focusKeywords.includes(clean)) {
      const updated = [...focusKeywords, clean];
      handleUpdate({ focusKeywords: updated });
    }
    setKeywordInput('');
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updated = focusKeywords.filter((k) => k !== keyword);
    handleUpdate({ focusKeywords: updated });
  };

  // Mock post object for Schema generation
  const mockPost: BlogPost = {
    id: 'preview',
    slug: slug || 'preview-article',
    title: metaTitle,
    excerpt: metaDesc,
    content: content || 'Article content...',
    category: category as any,
    type: type as any,
    author: {
      name: authorName || 'Artify Staff Editor',
      role: 'Staff Writer',
      avatar: 'AS',
    },
    publishDate: new Date().toISOString(),
    readTime: '5 min read',
    tags: focusKeywords,
    views: 0,
    likes: 0,
    seo: {
      metaTitle,
      metaDescription: metaDesc,
      canonicalUrl,
      focusKeywords,
      schemaType,
    },
  };

  const structuredDataJson = generateSeoStructuredData(mockPost);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(structuredDataJson);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner: SEO Health Score & Audit */}
      <div
        className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          isLight
            ? 'bg-gradient-to-r from-violet-50 to-indigo-50/60 border-violet-200 shadow-sm'
            : 'bg-gradient-to-r from-violet-950/30 to-indigo-950/20 border-violet-500/30'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div
              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold font-mono-code border shadow-inner ${
                seoScore >= 90
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : seoScore >= 70
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              }`}
            >
              <span className="text-lg leading-tight">{seoScore}</span>
              <span className="text-[9px] uppercase tracking-wider opacity-80">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">SEO & Discovery Readiness</h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  seoScore >= 90
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : seoScore >= 70
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {seoScore >= 90 ? 'Excellent' : seoScore >= 70 ? 'Good' : 'Needs Optimization'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Passing {passedChecksCount} of {checks.length} automated search engine quality checks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full md:w-auto text-[11px]">
          {checks.map((check) => (
            <div
              key={check.id}
              className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                check.passed
                  ? isLight
                    ? 'bg-white/80 border-emerald-200 text-emerald-800'
                    : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                  : isLight
                  ? 'bg-white/80 border-amber-200 text-amber-800'
                  : 'bg-amber-950/20 border-amber-500/20 text-amber-300'
              }`}
            >
              {check.passed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              )}
              <span className="truncate">{check.label.split('(')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) & Live Previews (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Meta Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <span>SEO Meta Title</span>
                <span className="text-violet-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono-code ${
                    metaTitle.length >= 50 && metaTitle.length <= 60
                      ? 'text-emerald-500 font-bold'
                      : metaTitle.length > 60
                      ? 'text-rose-400'
                      : isLight
                      ? 'text-slate-400'
                      : 'text-zinc-500'
                  }`}
                >
                  {metaTitle.length} / 60 chars
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdate({ metaTitle: `${title} | Artify Solutions` })}
                  className="text-[10px] text-violet-400 hover:underline flex items-center gap-0.5"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  Auto-fill
                </button>
              </div>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => handleUpdate({ metaTitle: e.target.value })}
              placeholder="e.g. Architecting Autonomous Agent Swarms | Artify Solutions"
              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                  : 'bg-zinc-900/90 border-white/[0.1] text-zinc-100 focus:border-violet-500'
              }`}
            />
            {/* Progress bar gauge */}
            <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  metaTitle.length >= 50 && metaTitle.length <= 60
                    ? 'bg-emerald-500'
                    : metaTitle.length > 60
                    ? 'bg-rose-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (metaTitle.length / 60) * 100)}%` }}
              />
            </div>
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <span>SEO Meta Description</span>
                <span className="text-violet-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono-code ${
                    metaDesc.length >= 140 && metaDesc.length <= 160
                      ? 'text-emerald-500 font-bold'
                      : metaDesc.length > 160
                      ? 'text-rose-400'
                      : isLight
                      ? 'text-slate-400'
                      : 'text-zinc-500'
                  }`}
                >
                  {metaDesc.length} / 160 chars
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdate({ metaDescription: excerpt })}
                  className="text-[10px] text-violet-400 hover:underline flex items-center gap-0.5"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  Use Excerpt
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => handleUpdate({ metaDescription: e.target.value })}
              placeholder="Provide a concise 140-160 character summary that invites searchers to click..."
              className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none transition-all resize-none ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                  : 'bg-zinc-900/90 border-white/[0.1] text-zinc-100 focus:border-violet-500'
              }`}
            />
            {/* Progress bar gauge */}
            <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  metaDesc.length >= 140 && metaDesc.length <= 160
                    ? 'bg-emerald-500'
                    : metaDesc.length > 160
                    ? 'bg-rose-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (metaDesc.length / 160) * 100)}%` }}
              />
            </div>
          </div>

          {/* Focus Keywords */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-violet-400" />
                <span>Focus Keywords & Search Queries</span>
              </label>
              <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                Press Enter to add tag
              </span>
            </div>

            <div
              className={`p-2.5 rounded-xl border flex flex-wrap items-center gap-1.5 min-h-[44px] ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-zinc-900/90 border-white/[0.1]'
              }`}
            >
              {focusKeywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-500/10 border border-violet-500/30 text-violet-400"
                >
                  <span>{kw}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddKeyword();
                  }
                }}
                placeholder={focusKeywords.length === 0 ? 'Type keyword and hit Enter...' : '+ add keyword'}
                className={`flex-1 min-w-[140px] px-2 py-0.5 text-xs bg-transparent outline-none ${
                  isLight ? 'text-slate-900 placeholder:text-slate-400' : 'text-zinc-100 placeholder:text-zinc-600'
                }`}
              />
            </div>
          </div>

          {/* Canonical URL & Robots Directives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Canonical URL</span>
              </label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => handleUpdate({ canonicalUrl: e.target.value })}
                placeholder="https://artifysols.com#blog-slug"
                className={`w-full px-3 py-2 rounded-xl text-xs border outline-none font-mono-code ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                    : 'bg-zinc-900/90 border-white/[0.1] text-zinc-100 focus:border-violet-500'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Robots Directives</span>
              </label>
              <select
                value={robotsDirective}
                onChange={(e) => handleUpdate({ robotsDirective: e.target.value as any })}
                className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                    : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                }`}
              >
                <option value="index, follow">index, follow (Standard Public Indexing)</option>
                <option value="noindex, nofollow">noindex, nofollow (Private / Draft)</option>
                <option value="noindex, follow">noindex, follow (Pass Link Juice Only)</option>
              </select>
            </div>
          </div>

          {/* Schema.org Structured Data Type */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-violet-400" />
                <span>Schema.org JSON-LD Entity Type</span>
              </label>
              <button
                type="button"
                onClick={handleCopySchema}
                className="text-[11px] text-violet-400 hover:underline flex items-center gap-1"
              >
                {copiedSchema ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSchema ? 'Copied JSON-LD!' : 'Copy Schema Code'}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['TechArticle', 'NewsArticle', 'BlogPosting', 'Report'] as const).map((sType) => (
                <button
                  key={sType}
                  type="button"
                  onClick={() => handleUpdate({ schemaType: sType })}
                  className={`p-2 rounded-xl border text-xs font-semibold transition-all text-center ${
                    schemaType === sType
                      ? 'bg-violet-600 text-white border-violet-500 shadow-sm'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-zinc-900 border-white/[0.08] text-zinc-400 hover:bg-white/[0.04]'
                  }`}
                >
                  {sType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live SERP & Social Previews */}
        <div className="lg:col-span-5 space-y-5">
          {/* Google SERP Card Preview */}
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-white/[0.1]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold">Google SERP Preview</span>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg border border-slate-200 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSerpView('desktop')}
                  className={`p-1 rounded text-xs transition-colors ${
                    serpView === 'desktop'
                      ? 'bg-violet-600 text-white'
                      : isLight
                      ? 'text-slate-600'
                      : 'text-zinc-400'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setSerpView('mobile')}
                  className={`p-1 rounded text-xs transition-colors ${
                    serpView === 'mobile'
                      ? 'bg-violet-600 text-white'
                      : isLight
                      ? 'text-slate-600'
                      : 'text-zinc-400'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Google Search Result Box */}
            <div
              className={`p-3.5 rounded-xl font-sans ${
                isLight ? 'bg-slate-50 border border-slate-200' : 'bg-black/60 border border-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center text-[8px] font-bold text-white">
                  A
                </div>
                <div className="min-w-0 text-[11px] leading-tight">
                  <div className="font-semibold text-slate-800 dark:text-zinc-200 truncate">
                    Artify Solutions
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                    https://artifysols.com › research › {slug || 'preview'}
                  </div>
                </div>
              </div>

              <div className="text-sm font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1 mb-1">
                {metaTitle}
              </div>

              <div className="text-xs text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 leading-relaxed">
                {metaDesc}
              </div>
            </div>
          </div>

          {/* Social OpenGraph / Twitter Card Preview */}
          <div
            className={`p-4 rounded-2xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-white/[0.1]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold">Social Card Preview</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSocialView('twitter')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    socialView === 'twitter'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : isLight
                      ? 'text-slate-600'
                      : 'text-zinc-400'
                  }`}
                >
                  X / Twitter
                </button>
                <button
                  type="button"
                  onClick={() => setSocialView('linkedin')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    socialView === 'linkedin'
                      ? 'bg-[#0A66C2] text-white'
                      : isLight
                      ? 'text-slate-600'
                      : 'text-zinc-400'
                  }`}
                >
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Social Preview Visual Card */}
            <div
              className={`rounded-xl border overflow-hidden ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/60 border-white/[0.06]'
              }`}
            >
              {/* Graphic Banner Mockup */}
              <div className="h-32 bg-gradient-to-br from-violet-900 via-indigo-950 to-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-violet-500/20 blur-xl pointer-events-none" />
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-bold tracking-wider uppercase font-mono-code">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    <span>Artify Intelligence Hub</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white font-mono-code">
                    {category}
                  </span>
                </div>
                <div className="z-10">
                  <div className="text-xs font-extrabold text-white line-clamp-2 leading-tight drop-shadow-sm">
                    {title || 'Article Title'}
                  </div>
                </div>
              </div>

              <div className="p-3 space-y-1">
                <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono-code uppercase">
                  artifysols.com • {readTimeEstimate(content)}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-zinc-100 line-clamp-1">
                  {metaTitle}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 line-clamp-2 leading-snug">
                  {metaDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function readTimeEstimate(content: string): string {
  const words = (content || '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
