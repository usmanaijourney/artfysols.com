import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Heart,
  Sparkles,
  ArrowLeft,
  Check,
  Twitter,
  Linkedin,
  Copy,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  MessageSquare,
  ExternalLink,
  Globe,
  Code2,
  Tag,
  Edit3,
  CheckCircle2,
} from 'lucide-react';
import { BlogPost } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { generateSeoStructuredData } from '../../data/blogData';
import { safeCopyToClipboard } from '../../utils/clipboard';

interface ArticleReaderModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onLikePost?: (id: string) => void;
  onSelectRelatedPost?: (post: BlogPost) => void;
  onEditPost?: (post: BlogPost) => void;
  allPosts?: BlogPost[];
  onOpenSolutionBuilder?: () => void;
  onOpenConsultant?: () => void;
}

// Crisp X / Twitter brand icon component
const XBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  post,
  isOpen,
  onClose,
  theme,
  onLikePost,
  onSelectRelatedPost,
  onEditPost,
  allPosts = [],
  onOpenSolutionBuilder,
  onOpenConsultant,
}) => {
  const { user } = useAuth();
  const isAuthorizedEditor = Boolean(
    user && (user.role === 'editor' || user.role === 'super_admin' || user.role === 'admin' || user.role === 'support_agent')
  );

  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSeoInspector, setShowSeoInspector] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Sync document head title & meta tags when reading
  useEffect(() => {
    if (isOpen && post) {
      const prevTitle = document.title;
      document.title = post.seo?.metaTitle || `${post.title} | Artify Solutions`;
      return () => {
        document.title = prevTitle;
      };
    }
  }, [isOpen, post]);

  useEffect(() => {
    if (post) {
      setLikesCount(post.likes);
      setHasLiked(false);
      setIsBookmarked(false);
      setScrollProgress(0);
      setShowSeoInspector(false);
    }
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  const getArticleShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}#blog-${post?.slug || ''}`;
    }
    return `https://artifysolutions.com#blog-${post?.slug || ''}`;
  };

  const handleCopyLink = async () => {
    const url = getArticleShareUrl();
    await safeCopyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    if (!post) return;
    const url = getArticleShareUrl();
    const text = `Insightful technical read: "${post.title}" by ${post.author.name} via @ArtifySolutions`;
    const hashtags = 'AI,EnterpriseArchitecture,MachineLearning,TechInnovation';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareLinkedIn = () => {
    if (!post) return;
    const url = getArticleShareUrl();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  const handleNativeShare = async () => {
    if (!post) return;
    const url = getArticleShareUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleLike = () => {
    if (!hasLiked && post) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
      if (onLikePost) {
        onLikePost(post.id);
      }
    }
  };

  if (!isOpen || !post) return null;

  const isLight = theme === 'light';

  // Find 2 related articles
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.type === post.type))
    .slice(0, 2);

  // Render markdown-like text lines cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    let insideCodeBlock = false;
    let codeBuffer: string[] = [];

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (insideCodeBlock) {
          elements.push(
            <pre
              key={`code-${idx}`}
              className={`p-4 rounded-xl font-mono text-xs overflow-x-auto my-5 border leading-relaxed ${
                isLight
                  ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-sm'
                  : 'bg-[#08080d] text-violet-200 border-violet-500/20 shadow-inner'
              }`}
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          insideCodeBlock = false;
        } else {
          insideCodeBlock = true;
        }
        return;
      }

      if (insideCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${idx}`}
            className={`text-xl font-bold font-display mt-8 mb-3 tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      if (line.startsWith('#### ')) {
        elements.push(
          <h4
            key={`h4-${idx}`}
            className={`text-base font-bold font-display mt-6 mb-2 flex items-center gap-2 ${
              isLight ? 'text-violet-900' : 'text-violet-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>{line.replace('#### ', '')}</span>
          </h4>
        );
        return;
      }

      if (line.startsWith('---')) {
        elements.push(
          <hr
            key={`hr-${idx}`}
            className={`my-8 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}
          />
        );
        return;
      }

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`quote-${idx}`}
            className={`p-4 my-5 rounded-r-xl border-l-4 italic text-sm ${
              isLight
                ? 'bg-violet-50/70 border-violet-600 text-slate-800'
                : 'bg-violet-950/20 border-violet-500 text-violet-200'
            }`}
          >
            {line.replace('> ', '')}
          </blockquote>
        );
        return;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li
            key={`li-${idx}`}
            className={`ml-5 list-disc my-1.5 text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            {line.substring(2)}
          </li>
        );
        return;
      }

      if (line.trim() === '') {
        return;
      }

      elements.push(
        <p
          key={`p-${idx}`}
          className={`text-sm leading-relaxed my-3 ${
            isLight ? 'text-slate-700' : 'text-zinc-300'
          }`}
        >
          {line}
        </p>
      );
    });

    return elements;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      id="article-reader-modal"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-colors duration-200 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.15)]'
            : 'bg-[#0b0b12] border-violet-500/30 text-zinc-100 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(139,92,246,0.15)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Reading Progress Bar */}
        <div className="w-full bg-transparent h-1 absolute top-0 left-0 z-20">
          <div
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Top Bar */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-4 border-b shrink-0 ${
            isLight ? 'border-slate-100 bg-slate-50/80' : 'border-white/[0.08] bg-[#0d0d16]'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="article-reader-back-btn"
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  : 'bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span
              className={`text-[11px] font-mono-code uppercase px-2.5 py-0.5 rounded-full border ${
                post.type === 'News'
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                  : post.type === 'Case Study'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : post.type === 'Whitepaper'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-violet-500/10 border-violet-500/30 text-violet-400'
              }`}
            >
              {post.type} • {post.category}
            </span>
          </div>

          {/* Top Bar Action & Social Share Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* SEO & Meta Tag Inspector Button */}
            <button
              onClick={() => setShowSeoInspector(!showSeoInspector)}
              id="top-seo-inspector-btn"
              title="Inspect SEO & Meta Tags"
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                showSeoInspector
                  ? 'bg-violet-600 border-violet-500 text-white shadow-sm'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-violet-600'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.1] hover:text-violet-400'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden lg:inline font-medium">SEO & Meta</span>
            </button>

            {/* Quick Edit for Editors */}
            {onEditPost && isAuthorizedEditor && (
              <button
                onClick={() => {
                  onClose();
                  onEditPost(post);
                }}
                id="top-edit-article-btn"
                title="Edit Article & SEO Settings"
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                  isLight
                    ? 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100'
                    : 'bg-violet-950/40 border-violet-500/30 text-violet-300 hover:bg-violet-900/60'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden lg:inline font-medium">Edit in Composer</span>
              </button>
            )}

            {/* Share to X / Twitter */}
            <button
              onClick={handleShareTwitter}
              id="top-share-twitter-btn"
              title="Share on X / Twitter"
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-black hover:border-slate-300'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.1] hover:text-white'
              }`}
              aria-label="Share on X / Twitter"
            >
              <XBrandIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Post</span>
            </button>

            {/* Share to LinkedIn */}
            <button
              onClick={handleShareLinkedIn}
              id="top-share-linkedin-btn"
              title="Share on LinkedIn"
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-[#0A66C2] hover:bg-blue-50/50 hover:border-blue-200'
                  : 'bg-white/[0.04] border-white/[0.08] text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30'
              }`}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">LinkedIn</span>
            </button>

            {/* Copy Article Link */}
            <button
              onClick={handleCopyLink}
              id="top-share-copy-btn"
              title="Copy Article Link"
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-semibold'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              id="top-bookmark-btn"
              title="Bookmark this post"
              className={`p-2 rounded-lg border text-xs transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              id="article-reader-close-btn"
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
              }`}
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEO & Meta Tags Inspector Panel */}
        {showSeoInspector && (
          <div
            className={`border-b p-5 space-y-4 animate-in slide-in-from-top-3 duration-200 shrink-0 ${
              isLight
                ? 'bg-gradient-to-r from-violet-50 via-slate-50 to-indigo-50/50 border-slate-200'
                : 'bg-gradient-to-r from-zinc-950 via-[#0e0e18] to-zinc-950 border-white/[0.08]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono-code text-violet-400">
                  Live SEO & Search Engine Meta Configuration
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const schema = generateSeoStructuredData(post);
                    navigator.clipboard.writeText(schema);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 border-violet-500/30"
                >
                  {copiedSchema ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSchema ? 'Copied JSON-LD!' : 'Copy JSON-LD Schema'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSeoInspector(false)}
                  className={`p-1 rounded-lg border text-xs ${
                    isLight ? 'hover:bg-slate-200 border-slate-200' : 'hover:bg-white/[0.08] border-white/[0.08]'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Meta Title */}
              <div
                className={`p-3 rounded-xl border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-black/40 border-white/[0.06]'
                }`}
              >
                <div className="text-[10px] uppercase font-mono-code font-bold text-violet-400 mb-1">
                  Meta Title Tag
                </div>
                <div className="font-semibold line-clamp-2">
                  {post.seo?.metaTitle || post.title}
                </div>
                <div className={`text-[10px] mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                  Length: {(post.seo?.metaTitle || post.title).length} chars
                </div>
              </div>

              {/* Meta Description */}
              <div
                className={`p-3 rounded-xl border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-black/40 border-white/[0.06]'
                }`}
              >
                <div className="text-[10px] uppercase font-mono-code font-bold text-violet-400 mb-1">
                  Meta Description
                </div>
                <div className="line-clamp-2 leading-relaxed">
                  {post.seo?.metaDescription || post.excerpt}
                </div>
                <div className={`text-[10px] mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                  Length: {(post.seo?.metaDescription || post.excerpt).length} chars
                </div>
              </div>

              {/* Canonical, Robots & Schema */}
              <div
                className={`p-3 rounded-xl border space-y-1 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-black/40 border-white/[0.06]'
                }`}
              >
                <div className="text-[10px] uppercase font-mono-code font-bold text-violet-400">
                  Indexing Directives
                </div>
                <div className="truncate font-mono-code text-[11px]">
                  <span className="opacity-60">Schema: </span>
                  <span className="text-emerald-400 font-bold">
                    {post.seo?.schemaType || (post.type === 'News' ? 'NewsArticle' : 'TechArticle')}
                  </span>
                </div>
                <div className="truncate font-mono-code text-[11px]">
                  <span className="opacity-60">Robots: </span>
                  <span>{post.seo?.robotsDirective || 'index, follow'}</span>
                </div>
                <div className="truncate font-mono-code text-[11px]">
                  <span className="opacity-60">Canonical: </span>
                  <span className="text-sky-400">
                    {post.seo?.canonicalUrl || `https://artifysols.com#blog-${post.slug}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Article Body */}
        <div
          className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 space-y-8"
          onScroll={handleScroll}
        >
          {/* Article Header & Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span
                className={`flex items-center gap-1.5 ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span>{post.publishDate}</span>
              </span>
              <span className="text-zinc-500">•</span>
              <span
                className={`flex items-center gap-1.5 ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                <span>{post.readTime}</span>
              </span>
              <span className="text-zinc-500">•</span>
              <span
                className={`flex items-center gap-1.5 ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                <span>{post.views.toLocaleString()} Readers</span>
              </span>
            </div>

            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-display leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {post.title}
            </h1>

            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isLight ? 'text-slate-600 font-medium' : 'text-zinc-300 font-light'
              }`}
            >
              {post.excerpt}
            </p>

            {/* Author Profile Bar & Quick Share */}
            <div
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white/[0.02] border-white/[0.08]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 p-[1px] shadow-md shadow-violet-600/30 flex items-center justify-center">
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center font-bold text-xs ${
                      isLight ? 'bg-white text-violet-700' : 'bg-[#0d0d16] text-violet-300'
                    }`}
                  >
                    {post.author.avatar}
                  </div>
                </div>
                <div>
                  <div
                    className={`text-sm font-bold font-display ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {post.author.name}
                  </div>
                  <div
                    className={`text-xs ${isLight ? 'text-violet-700 font-medium' : 'text-violet-400'}`}
                  >
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Tags & Quick Share Icons */}
              <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] font-mono-code px-2.5 py-1 rounded-md border ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-700'
                          : 'bg-black/30 border-white/[0.08] text-zinc-300'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-500/20">
                  <span className={`text-[11px] font-mono-code hidden sm:inline ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                    Share:
                  </span>
                  <button
                    onClick={handleShareTwitter}
                    title="Share on X / Twitter"
                    className={`p-1.5 rounded-lg border text-xs transition-all ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-black'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:bg-white/[0.1] hover:text-white'
                    }`}
                  >
                    <XBrandIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleShareLinkedIn}
                    title="Share on LinkedIn"
                    className={`p-1.5 rounded-lg border text-xs transition-all ${
                      isLight
                        ? 'bg-white border-slate-200 text-[#0A66C2] hover:bg-blue-50/50'
                        : 'bg-white/[0.04] border-white/[0.08] text-sky-400 hover:bg-sky-500/10'
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways Callout Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div
              className={`p-5 rounded-xl border shadow-sm ${
                isLight
                  ? 'bg-gradient-to-br from-violet-50/80 to-indigo-50/50 border-violet-200 text-slate-900'
                  : 'bg-gradient-to-br from-violet-950/30 to-indigo-950/20 border-violet-500/30 text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono-code text-violet-500">
                  Key Architectural Takeaways
                </h3>
              </div>
              <ul className="space-y-2">
                {post.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-violet-600/20 text-violet-500 font-mono-code text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <span className={isLight ? 'text-slate-800' : 'text-zinc-200'}>
                      {takeaway}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Body Text */}
          <div className="prose max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Dedicated Social Share Banner & Claps */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight
                ? 'bg-slate-50/90 border-slate-200 text-slate-900'
                : 'bg-gradient-to-r from-[#0d0d16] via-[#12101f] to-[#0d0d16] border-violet-500/20 text-zinc-100'
            }`}
            id="article-social-share-section"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold font-display flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-violet-500" />
                  <span>Share this Technical Insight</span>
                </h4>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Help your engineering peers stay ahead in modern AI architectures.
                </p>
              </div>

              {/* Reaction counter */}
              <button
                onClick={handleLike}
                id="article-like-btn"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  hasLiked
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 shadow-md shadow-rose-500/20'
                    : isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600'
                    : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-rose-950/30 hover:border-rose-500/40 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500' : ''}`} />
                <span>{likesCount} Reactions</span>
              </button>
            </div>

            {/* Social Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {/* X / Twitter Button */}
              <button
                onClick={handleShareTwitter}
                id="share-article-twitter-btn"
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                  isLight
                    ? 'bg-white hover:bg-black hover:text-white border-slate-200 hover:border-black text-slate-800 shadow-sm'
                    : 'bg-black/50 hover:bg-white hover:text-black border-white/[0.12] hover:border-white text-zinc-200 shadow-sm'
                }`}
              >
                <XBrandIcon className="w-3.5 h-3.5" />
                <span>Post on X / Twitter</span>
              </button>

              {/* LinkedIn Button */}
              <button
                onClick={handleShareLinkedIn}
                id="share-article-linkedin-btn"
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                  isLight
                    ? 'bg-white hover:bg-[#0A66C2] hover:text-white border-slate-200 hover:border-[#0A66C2] text-[#0A66C2] shadow-sm'
                    : 'bg-[#0A66C2]/15 hover:bg-[#0A66C2] hover:text-white border-[#0A66C2]/30 hover:border-[#0A66C2] text-sky-400 shadow-sm'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>Share on LinkedIn</span>
              </button>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                id="share-article-copy-btn"
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-bold'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-sm'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-zinc-200 shadow-sm'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-violet-400" />
                    <span>Copy Article Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action CTA: Build with Artify Solutions */}
          <div
            className={`p-6 rounded-2xl border relative overflow-hidden ${
              isLight
                ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 text-white shadow-xl'
                : 'bg-gradient-to-r from-violet-950/90 via-indigo-950/80 to-[#0d0d16] border-violet-500/30 shadow-2xl'
            }`}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-mono-code font-bold uppercase">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Enterprise Implementation</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Ready to deploy intelligent AI architectures in your business?
                </h3>
                <p className="text-xs text-violet-100 leading-relaxed">
                  Our engineering team designs custom autonomous agent fleets and conversational BI data fabrics adapted to your exact stack.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {onOpenSolutionBuilder && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSolutionBuilder();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white text-violet-950 font-bold text-xs hover:bg-violet-50 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Launch Solution Wizard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {onOpenConsultant && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultant();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-violet-900/60 border border-white/20 text-white font-semibold text-xs hover:bg-violet-900 transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-violet-300" />
                    <span>AI Demo Advisor</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3
                className={`text-sm font-bold uppercase tracking-wider font-mono-code ${
                  isLight ? 'text-slate-800' : 'text-zinc-300'
                }`}
              >
                Recommended Deep Dives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectRelatedPost) {
                        onSelectRelatedPost(rel);
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] group ${
                      isLight
                        ? 'bg-slate-50 hover:bg-white border-slate-200 hover:border-violet-300 shadow-sm'
                        : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] hover:border-violet-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono-code mb-2">
                      <span className="text-violet-400 uppercase">{rel.category}</span>
                      <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>
                        {rel.readTime}
                      </span>
                    </div>
                    <h4
                      className={`text-xs font-bold line-clamp-2 mb-1.5 group-hover:text-violet-400 transition-colors ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {rel.title}
                    </h4>
                    <p
                      className={`text-[11px] line-clamp-2 ${
                        isLight ? 'text-slate-600' : 'text-zinc-400'
                      }`}
                    >
                      {rel.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
