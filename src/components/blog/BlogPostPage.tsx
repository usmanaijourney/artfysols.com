import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Star,
  Share2,
  Heart,
  Bookmark,
  Check,
  Twitter,
  Linkedin,
  Copy,
  BookOpen,
  Sparkles,
  Shield,
  Layers,
  ChevronRight,
  MessageSquare,
  ExternalLink,
  Code2,
  Tag,
  Edit3,
  CheckCircle2,
  Globe,
  ThumbsUp,
  Flame,
  Lightbulb,
  Send,
  User,
  ArrowRight,
  FileText,
  HelpCircle,
  BarChart3,
  Cpu,
  Mail,
  Sun,
  Moon,
  Home,
} from 'lucide-react';
import { BlogPost, BlogCategory, BlogComment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { generateSeoStructuredData } from '../../data/blogData';
import { safeCopyToClipboard } from '../../utils/clipboard';
import { generateBlogPostSeo, generateBlogPostKeywords, updatePageSeo } from '../../utils/seo';

// Crisp X / Twitter brand icon
const XBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Reddit icon
const RedditIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.248a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.492 1.207-.492.937 0 1.699.762 1.699 1.7 0 .524-.236.993-.607 1.306.012.146.018.293.018.441 0 2.25-2.613 4.074-5.836 4.074s-5.836-1.824-5.836-4.074c0-.148.006-.295.018-.441-.371-.313-.607-.782-.607-1.306 0-.938.762-1.7 1.699-1.7.477 0 .899.183 1.207.492 1.194-.856 2.85-1.418 4.674-1.488l.89-4.172a.375.375 0 0 1 .448-.288l2.973.626a1.25 1.25 0 0 1 1.018-.448zM8.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-6.52 3.125a.375.375 0 0 0-.074.526c.71 1.002 1.95 1.599 3.094 1.599s2.384-.597 3.094-1.599a.375.375 0 0 0-.6-.452c-.524.74-1.492 1.176-2.494 1.176s-1.97-.436-2.494-1.176a.375.375 0 0 0-.526-.074z" />
  </svg>
);

// WhatsApp icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.27 15.03 3.81 13.5 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.1 7.42C8.94 7.42 8.68 7.48 8.46 7.72C8.24 7.96 7.62 8.55 7.62 9.75C7.62 10.95 8.5 12.11 8.62 12.27C8.74 12.43 10.3 14.83 12.69 15.86C14.67 16.72 15.08 16.55 15.52 16.51C15.96 16.47 16.94 15.93 17.14 15.37C17.34 14.81 17.34 14.33 17.28 14.23C17.22 14.13 17.06 14.07 16.82 13.95C16.58 13.83 15.4 13.25 15.18 13.17C14.96 13.09 14.8 13.05 14.64 13.29C14.48 13.53 14.02 14.07 13.88 14.23C13.74 14.39 13.6 14.41 13.36 14.29C13.12 14.17 12.35 13.92 11.43 13.1C10.72 12.46 10.24 11.68 10.1 11.44C9.96 11.2 10.08 11.08 10.2 10.96C10.31 10.85 10.45 10.67 10.57 10.53C10.69 10.39 10.73 10.29 10.81 10.13C10.89 9.97 10.85 9.83 10.79 9.71C10.73 9.59 10.27 8.45 10.07 7.97C9.88 7.5 9.68 7.56 9.54 7.56C9.4 7.56 9.24 7.54 9.1 7.42Z" />
  </svg>
);

interface BlogPostPageProps {
  post: BlogPost;
  theme: 'dark' | 'light';
  onBackToHub: () => void;
  onBackToHome?: () => void;
  onSelectRelatedPost: (post: BlogPost) => void;
  onEditPost?: (post: BlogPost) => void;
  allPosts?: BlogPost[];
  onOpenSolutionBuilder?: () => void;
  onOpenConsultant?: () => void;
  onToggleTheme?: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  theme,
  onBackToHub,
  onBackToHome,
  onSelectRelatedPost,
  onEditPost,
  allPosts = [],
  onOpenSolutionBuilder,
  onOpenConsultant,
  onToggleTheme,
}) => {
  const { user } = useAuth();
  const isAuthorizedEditor = Boolean(
    user && (user.role === 'editor' || user.role === 'super_admin' || user.role === 'admin' || user.role === 'support_agent')
  );

  const isLight = theme === 'light';

  const handleGoHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      onBackToHub();
      if (typeof window !== 'undefined') {
        window.location.hash = '#hero';
      }
    }
  };

  // Interaction State
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  // Rating State
  const initialRating = post.rating || 4.9;
  const initialRatingCount = post.ratingCount || 142;
  const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [ratingCount, setRatingCount] = useState<number>(initialRatingCount);
  const [userRating, setUserRating] = useState<number>(post.userRating || 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(Boolean(post.userRating));

  // Reactions state
  const [reactionCounts, setReactionCounts] = useState<{ [key: string]: number }>({
    insightful: 48,
    helpful: 89,
    gamechanger: 34,
  });
  const [activeReactions, setActiveReactions] = useState<{ [key: string]: boolean }>({});

  // Comments state
  const [comments, setComments] = useState<BlogComment[]>(() => {
    if (post.comments && post.comments.length > 0) return post.comments;
    return [
      {
        id: 'c-1',
        authorName: 'Marcus Lindqvist',
        authorRole: 'Enterprise Chief Architect @ GlobalNordic',
        authorAvatar: 'ML',
        date: '2 days ago',
        content:
          'The dual-verification consensus architecture is remarkable. We were facing severe latency when parsing cross-border VAT invoices, and this deterministic fallback approach resolved our compliance bottlenecks completely.',
        likes: 19,
      },
      {
        id: 'c-2',
        authorName: 'Dr. Priya Ramesh',
        authorRole: 'Head of Machine Learning @ FinVector Corp',
        authorAvatar: 'PR',
        date: '4 days ago',
        content:
          'Crucial observation regarding the Cosine Agreement Index (>0.994). Setting strict validation thresholds on ledger mutations is what separates production-ready enterprise systems from toy AI demos.',
        likes: 14,
      },
    ];
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentName, setNewCommentName] = useState(user?.name || '');
  const [newCommentRole, setNewCommentRole] = useState(
    user?.company ? `${user.role} @ ${user.company}` : 'Enterprise AI Leader'
  );
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // SEO Inspector modal / drawer
  const [showSeoInspector, setShowSeoInspector] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Copy code snippet helper
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLikesCount(post.likes || 0);
    setHasLiked(false);
    setIsBookmarked(false);
    setUserRating(post.userRating || 0);
    setRatingSubmitted(Boolean(post.userRating));
    setShowSeoInspector(false);
  }, [post.id]);

  // Dynamically inject full meta-tags (OpenGraph, Twitter Cards, Canonical, Keywords, JSON-LD Schema)
  useEffect(() => {
    const seoConfig = generateBlogPostSeo(post, {
      currentRating,
      ratingCount,
    });
    const cleanupSeo = updatePageSeo(seoConfig);

    return () => {
      cleanupSeo();
    };
  }, [post, currentRating, ratingCount]);

  // Track window scroll progress and active headings
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Check which section is in view
      const headings = document.querySelectorAll('h2[id], h3[id]');
      let currentId = '';
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 140) {
          currentId = heading.id;
        }
      });
      if (currentId) setActiveSectionId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute Share URL
  const getArticleShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}#blog-${post.slug}`;
    }
    return `https://artifysols.com#blog-${post.slug}`;
  };

  const handleCopyLink = async () => {
    const url = getArticleShareUrl();
    await safeCopyToClipboard(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleShareTwitter = () => {
    const url = getArticleShareUrl();
    const text = `Essential read: "${post.title}" by ${post.author.name} via @ArtifySolutions`;
    const hashtags = (post.tags || []).slice(0, 3).map((t) => t.replace(/\s+/g, '')).join(',');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags || 'AI,EnterpriseAI')}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareLinkedIn = () => {
    const url = getArticleShareUrl();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  const handleShareFacebook = () => {
    const url = getArticleShareUrl();
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareReddit = () => {
    const url = getArticleShareUrl();
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`;
    window.open(redditUrl, '_blank', 'noopener,noreferrer,width=700,height=600');
  };

  const handleShareWhatsApp = () => {
    const url = getArticleShareUrl();
    const text = `*${post.title}*\n${post.excerpt}\n\nRead more: ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareEmail = () => {
    const url = getArticleShareUrl();
    const subject = `Recommended Reading: ${post.title}`;
    const body = `Hi,\n\nI thought you might find this technical research paper from Artify Solutions valuable:\n\n"${post.title}"\n${post.excerpt}\n\nRead the full paper here: ${url}\n\nBest regards,`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleNativeShare = async () => {
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
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleRate = (score: number) => {
    setUserRating(score);
    setRatingSubmitted(true);
    const newTotal = ratingCount + 1;
    const newAverage = Number(((currentRating * ratingCount + score) / newTotal).toFixed(1));
    setCurrentRating(newAverage);
    setRatingCount(newTotal);
  };

  const handleToggleReaction = (key: string) => {
    setActiveReactions((prev) => {
      const wasActive = Boolean(prev[key]);
      setReactionCounts((counts) => ({
        ...counts,
        [key]: wasActive ? counts[key] - 1 : counts[key] + 1,
      }));
      return { ...prev, [key]: !wasActive };
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: BlogComment = {
      id: `c-${Date.now()}`,
      authorName: newCommentName.trim() || 'Enterprise Architect',
      authorRole: newCommentRole.trim() || 'Verified Reader',
      authorAvatar: (newCommentName.trim() || 'EA').substring(0, 2).toUpperCase(),
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  // Find related articles (same category or general)
  const relatedPosts = useMemo(() => {
    return allPosts
      .filter((p) => p.id !== post.id && (p.category === post.category || p.type === post.type))
      .slice(0, 3);
  }, [allPosts, post]);

  // Extract table of contents items from content
  const tableOfContents = useMemo(() => {
    const lines = post.content.split('\n');
    const items: { id: string; title: string; level: number }[] = [];
    lines.forEach((line) => {
      if (line.startsWith('### ')) {
        const title = line.replace('### ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        items.push({ id, title, level: 3 });
      } else if (line.startsWith('#### ')) {
        const title = line.replace('#### ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        items.push({ id, title, level: 4 });
      }
    });
    return items;
  }, [post.content]);

  // Word count & estimate calculations
  const wordCount = useMemo(() => {
    return post.content.trim().split(/\s+/).length;
  }, [post.content]);

  // Render markdown-like text lines with rich syntax highlighting & anchors
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    let insideCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeIdxCounter = 0;

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (insideCodeBlock) {
          const currentCode = codeBuffer.join('\n');
          const snippetIdx = codeIdxCounter++;
          elements.push(
            <div
              key={`code-${idx}`}
              className={`relative group rounded-xl my-6 border overflow-hidden font-mono-code text-xs leading-relaxed ${
                isLight
                  ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-md'
                  : 'bg-[#08080d] text-violet-200 border-violet-500/20 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/[0.06] text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-violet-400" />
                  <span>Architecture Specification / Pseudocode</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(currentCode);
                    setCopiedCodeIdx(snippetIdx);
                    setTimeout(() => setCopiedCodeIdx(null), 2000);
                  }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
                >
                  {copiedCodeIdx === snippetIdx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code>{currentCode}</code>
              </pre>
            </div>
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
        const title = line.replace('### ', '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2
            key={`h2-${idx}`}
            id={id}
            className={`text-2xl sm:text-3xl font-bold font-display mt-10 mb-4 tracking-tight scroll-mt-24 flex items-center gap-2.5 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
            <span>{title}</span>
          </h2>
        );
        return;
      }

      if (line.startsWith('#### ')) {
        const title = line.replace('#### ', '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3
            key={`h3-${idx}`}
            id={id}
            className={`text-lg sm:text-xl font-bold font-display mt-7 mb-3 scroll-mt-24 flex items-center gap-2 ${
              isLight ? 'text-violet-950' : 'text-violet-300'
            }`}
          >
            <ChevronRight className="w-4 h-4 text-violet-500 flex-shrink-0" />
            <span>{title}</span>
          </h3>
        );
        return;
      }

      if (line.startsWith('---')) {
        elements.push(
          <hr
            key={`hr-${idx}`}
            className={`my-10 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}
          />
        );
        return;
      }

      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`quote-${idx}`}
            className={`p-5 my-6 rounded-r-2xl border-l-4 italic text-base leading-relaxed ${
              isLight
                ? 'bg-violet-50/70 border-violet-600 text-slate-800 shadow-sm'
                : 'bg-violet-950/20 border-violet-500 text-violet-200 shadow-inner'
            }`}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
              <div>{line.replace('> ', '')}</div>
            </div>
          </blockquote>
        );
        return;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li
            key={`li-${idx}`}
            className={`ml-6 list-disc my-2 text-base leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            {line.substring(2)}
          </li>
        );
        return;
      }

      // Render Markdown Tables
      if (line.startsWith('|') && line.endsWith('|')) {
        elements.push(
          <div
            key={`tbl-line-${idx}`}
            className={`font-mono-code text-xs sm:text-sm py-1.5 px-3 border-x border-b first:border-t first:rounded-t-lg last:rounded-b-lg overflow-x-auto ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800 first:bg-slate-100 first:font-bold'
                : 'bg-zinc-950/40 border-white/[0.08] text-zinc-300 first:bg-white/[0.05] first:font-bold'
            }`}
          >
            {line}
          </div>
        );
        return;
      }

      if (line.trim() === '') {
        return;
      }

      elements.push(
        <p
          key={`p-${idx}`}
          className={`text-base sm:text-lg leading-relaxed my-4 ${
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
    <article
      id="artify-blog-post-page"
      className={`min-h-screen pt-20 sm:pt-24 transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060609] text-zinc-100'
      }`}
    >
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Sub-Navigation Header */}
      <header
        className={`sticky top-[66px] sm:top-[72px] z-30 backdrop-blur-xl border-b transition-colors ${
          isLight
            ? 'bg-white/90 border-slate-200 shadow-sm'
            : 'bg-[#060609]/90 border-white/[0.08] shadow-lg shadow-black/20'
        }`}
      >
        <div className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
          {/* Left: Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHub}
              id="back-to-hub-btn"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Hub</span>
            </button>

            {/* Breadcrumb Nav: Home > Blog > Article Title */}
            <nav
              aria-label="Header Breadcrumb Navigation"
              className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400"
            >
              <button
                type="button"
                onClick={handleGoHome}
                id="header-breadcrumb-home"
                className={`flex items-center gap-1 font-medium transition-colors hover:underline ${
                  isLight ? 'text-slate-600 hover:text-violet-700' : 'text-zinc-400 hover:text-violet-400'
                }`}
              >
                <Home className="w-3 h-3 text-violet-400" />
                <span>Home</span>
              </button>
              <ChevronRight className={`w-3 h-3 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`} />
              <button
                type="button"
                onClick={onBackToHub}
                id="header-breadcrumb-blog"
                className={`font-medium transition-colors hover:underline ${
                  isLight ? 'text-slate-600 hover:text-violet-700' : 'text-zinc-400 hover:text-violet-400'
                }`}
              >
                <span>Blog</span>
              </button>
              <ChevronRight className={`w-3 h-3 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`} />
              <span
                className={`truncate max-w-[200px] lg:max-w-[280px] font-semibold ${
                  isLight ? 'text-violet-700' : 'text-violet-400'
                }`}
                title={post.title}
              >
                {post.title}
              </span>
            </nav>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2">
            {/* SEO Inspector Button (Authorized Editors Only) */}
            {isAuthorizedEditor && (
              <button
                type="button"
                onClick={() => setShowSeoInspector(true)}
                id="toggle-seo-inspector-btn"
                title="Inspect Search Engine Meta Tags & JSON-LD Schema (Editor Only)"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">SEO & Schema</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  {post.seo?.seoScore || 92}/100
                </span>
              </button>
            )}

            {/* Editor Edit Post Button */}
            {isAuthorizedEditor && onEditPost && (
              <button
                type="button"
                onClick={() => onEditPost(post)}
                id="edit-current-post-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isLight
                    ? 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100'
                    : 'bg-violet-950/40 border-violet-500/30 text-violet-300 hover:bg-violet-900/60'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-violet-400" />
                <span className="hidden sm:inline">Edit Article</span>
              </button>
            )}

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2 rounded-lg border text-xs transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                }`}
                title="Toggle visual theme"
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Consultation CTA */}
            {onOpenConsultant && (
              <button
                type="button"
                onClick={onOpenConsultant}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-sm shadow-violet-600/30 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Advisor</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Editorial Draft Mode Alert (If applicable) */}
      {post.status === 'draft' && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2.5 text-xs text-amber-300">
          <div className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>
                Draft Preview Mode — This post is unlisted and pending final editorial signoff.
              </span>
            </div>
            {isAuthorizedEditor && onEditPost && (
              <button
                type="button"
                onClick={() => onEditPost(post)}
                className="underline font-bold text-amber-200 hover:text-amber-100"
              >
                Open in Composer & Publish
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Container - 90% Width Layout */}
      <main className="w-full py-6 sm:py-10">
        {/* Article Hero Header Top Section (90% Width) */}
        <section className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto mb-8 text-left">
          {/* In-Page Breadcrumb Navigation Trail: Home > Blog > Article Title */}
          <nav
            aria-label="Breadcrumb Trail"
            id="article-main-breadcrumb-trail"
            className={`flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs mb-6 px-4 py-2.5 rounded-xl border max-w-full overflow-hidden ${
              isLight
                ? 'bg-slate-100/90 border-slate-200 text-slate-600 shadow-xs'
                : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={handleGoHome}
              id="article-breadcrumb-home-link"
              className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:underline ${
                isLight ? 'text-slate-600 hover:text-violet-700' : 'text-zinc-400 hover:text-violet-300'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-violet-400" />
              <span>Home</span>
            </button>

            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`} />

            <button
              type="button"
              onClick={onBackToHub}
              id="article-breadcrumb-blog-link"
              className={`inline-flex items-center gap-1 font-medium transition-colors hover:underline ${
                isLight ? 'text-slate-600 hover:text-violet-700' : 'text-zinc-400 hover:text-violet-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              <span>Blog</span>
            </button>

            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-600'}`} />

            <span
              aria-current="page"
              id="article-breadcrumb-current-title"
              className={`font-semibold truncate max-w-[200px] sm:max-w-[340px] md:max-w-[540px] lg:max-w-[720px] ${
                isLight ? 'text-slate-900' : 'text-zinc-200'
              }`}
              title={post.title}
            >
              {post.title}
            </span>
          </nav>

          {/* Badges & Topic Strip */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border ${
                isLight
                  ? 'bg-violet-100 text-violet-800 border-violet-200'
                  : 'bg-violet-950/80 text-violet-300 border-violet-500/40 shadow-sm'
              }`}
            >
              {post.category}
            </span>

            <span
              className={`px-3 py-1 rounded-md text-xs font-medium border ${
                isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/[0.05] text-zinc-300 border-white/[0.08]'
              }`}
            >
              {post.type}
            </span>

            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Peer-Reviewed Architecture</span>
            </span>
          </div>

          {/* H1 Main Title */}
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-[1.25] tracking-tight mb-4 max-w-4xl ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {post.title}
          </h1>

          {/* Excerpt / Subtitle */}
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-6 max-w-4xl ${
              isLight ? 'text-slate-600' : 'text-zinc-300'
            }`}
          >
            {post.excerpt}
          </p>

          {/* Author & Publication Metadata Strip */}
          <div
            className={`p-4 sm:p-6 rounded-2xl border transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-[#0b0b12] border-white/[0.08] shadow-md'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-bold font-display flex items-center justify-center text-sm shadow-md ring-2 ring-violet-500/20">
                  {post.author.avatar || post.author.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base">
                    <span className={isLight ? 'text-slate-900' : 'text-white'}>
                      {post.author.name}
                    </span>
                    <span title="Verified Author" className="inline-flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">{post.author.role}</p>
                </div>
              </div>

              {/* Rich Stats: Visits, Ratings, Date, Reading Time */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                {/* Visits */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300"
                  title="Total live article reads"
                >
                  <Eye className="w-3.5 h-3.5 text-violet-400" />
                  <span className="font-mono-code font-bold">
                    {(post.views || 4820).toLocaleString()}
                  </span>
                  <span className="text-zinc-400">visits</span>
                </div>

                {/* Rating */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300"
                  title="Community Rating"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-mono-code font-bold">{currentRating}</span>
                  <span className="text-zinc-400">({ratingCount})</span>
                </div>

                {/* Read Time */}
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime || '7 min read'}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Cover Image Showcase - 90% Browser Width Cover */}
        {(post.coverImage || post.coverGradient) && (
          <section className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto mb-10" id="article-cover-image-showcase">
            <div
              className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-2xl group transition-all duration-300 ${
                isLight
                  ? 'border-slate-200 bg-slate-100'
                  : 'border-white/[0.08] bg-[#0c0c14] shadow-violet-950/20'
              }`}
            >
              {post.coverImage ? (
                <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] max-h-[580px] lg:max-h-[640px] w-full overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30 pointer-events-none" />

                  {/* High-Tech Badge Strip on Image Bottom */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span>{post.category} • Technical Intelligence</span>
                    </div>

                    <span className="hidden sm:inline-block text-xs font-mono-code text-zinc-200 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-lg">
                      90% Viewport Cover Showcase
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className={`aspect-[21/9] lg:aspect-[24/9] max-h-[580px] w-full bg-gradient-to-br ${
                    post.coverGradient || 'from-violet-950 via-slate-900 to-indigo-950'
                  } flex items-center justify-center p-8 text-center`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
                      <Cpu className="w-8 h-8 text-violet-300" />
                    </div>
                    <p className="text-sm text-zinc-200 font-semibold tracking-wide">
                      {post.category} • Architecture Research
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Floating / Sticky Social Sharing Bar (90% Width) */}
        <section className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto mb-10">
          <div
            className={`flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border ${
              isLight
                ? 'bg-slate-100/90 border-slate-200'
                : 'bg-zinc-900/60 border-white/[0.08]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-violet-400" />
                <span>Share Insight:</span>
              </span>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-1.5">
                {/* Twitter / X */}
                <button
                  type="button"
                  onClick={handleShareTwitter}
                  id="share-twitter-btn"
                  title="Share on X / Twitter"
                  className="p-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition-transform hover:scale-105"
                >
                  <XBrandIcon className="w-3.5 h-3.5" />
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  id="share-linkedin-btn"
                  title="Share on LinkedIn"
                  className="p-2 rounded-lg bg-[#0077b5] text-white hover:bg-[#00669c] transition-transform hover:scale-105"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  id="share-whatsapp-btn"
                  title="Share via WhatsApp"
                  className="p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-transform hover:scale-105"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </button>

                {/* Reddit */}
                <button
                  type="button"
                  onClick={handleShareReddit}
                  id="share-reddit-btn"
                  title="Submit to Reddit"
                  className="p-2 rounded-lg bg-[#FF4500] text-white hover:bg-[#E03D00] transition-transform hover:scale-105"
                >
                  <RedditIcon className="w-3.5 h-3.5" />
                </button>

                {/* Email */}
                <button
                  type="button"
                  onClick={handleShareEmail}
                  id="share-email-btn"
                  title="Share via Email"
                  className={`p-2 rounded-lg border text-xs transition-transform hover:scale-105 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-700'
                      : 'bg-white/10 border-white/10 text-zinc-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>

                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  id="copy-link-btn"
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    copiedLink
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : isLight
                      ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      : 'bg-white/10 border-white/10 text-zinc-200 hover:bg-white/20'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-violet-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Like & Bookmark Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLike}
                id="like-post-btn"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  hasLiked
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 shadow-sm'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-rose-50 hover:text-rose-600'
                    : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08] hover:text-rose-400'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likesCount}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                id="bookmark-post-btn"
                title={isBookmarked ? 'Saved in reading list' : 'Bookmark this research'}
                className={`p-2 rounded-lg border text-xs transition-all ${
                  isBookmarked
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-amber-50 hover:text-amber-600'
                    : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Content Layout Grid (Article Body + Sticky Sidebar) */}
        <div className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Main Article Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Executive Summary / Key Takeaways Box (SEO Rich Featured Snippet) */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div
                className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
                  isLight
                    ? 'bg-gradient-to-br from-violet-50/90 via-indigo-50/50 to-slate-50 border-violet-200/80 shadow-sm'
                    : 'bg-gradient-to-br from-violet-950/30 via-indigo-950/20 to-black border-violet-500/30 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-violet-600 text-white shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2
                      className={`text-lg font-bold font-display ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Executive Summary & Key Takeaways
                    </h2>
                    <p className="text-xs text-zinc-400">Core architectural conclusions</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className={isLight ? 'text-slate-700' : 'text-zinc-200'}>
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formatted Article Body */}
            <div className="prose prose-invert max-w-none">
              {renderFormattedContent(post.content)}
            </div>

            {/* Interactive Rating & Reader Feedback Widget */}
            <section
              id="article-rating-section"
              className={`p-6 sm:p-8 rounded-2xl border transition-colors my-10 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0c0c14] border-white/[0.08] shadow-lg'
              }`}
            >
              <div className="text-center max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
                <h3
                  className={`text-xl font-bold font-display mb-1 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Rate this Research Paper
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Help our engineering research team prioritize high-impact enterprise topics.
                </p>

                {/* 5-Star Rating Buttons */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-2 transition-transform hover:scale-125 focus:outline-none"
                      title={`Rate ${star} out of 5 stars`}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || userRating || 0) >= star
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : isLight
                            ? 'text-slate-300'
                            : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {ratingSubmitted ? (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      Thank you! Your rating of {userRating}/5 was recorded ({currentRating} average
                      across {ratingCount} readers).
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">
                    Currently rated <strong className="text-amber-400">{currentRating} / 5.0</strong>{' '}
                    by {ratingCount} enterprise architects
                  </p>
                )}

                {/* Reaction Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-6 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => handleToggleReaction('insightful')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                      activeReactions['insightful']
                        ? 'bg-violet-600 text-white border-violet-600 shadow-md'
                        : isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>Insightful</span>
                    <span className="font-mono-code font-bold">{reactionCounts['insightful']}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleReaction('helpful')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                      activeReactions['helpful']
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Helpful</span>
                    <span className="font-mono-code font-bold">{reactionCounts['helpful']}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleReaction('gamechanger')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                      activeReactions['gamechanger']
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                        : isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>Game Changer</span>
                    <span className="font-mono-code font-bold">
                      {reactionCounts['gamechanger']}
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* Author Spotlight Box */}
            <section
              className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0a0a10] border-white/[0.08]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-bold font-display text-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  {post.author.avatar || post.author.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`text-lg font-bold font-display flex items-center gap-1.5 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      <span>Written by {post.author.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    </h3>
                  </div>
                  <p className="text-xs text-violet-400 font-semibold mb-2">{post.author.role}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {post.author.bio ||
                      'Pioneering distributed AI systems and deterministic enterprise workflows at Artify Solutions.'}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-zinc-500">Topics:</span>
                    {(post.tags || []).slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-[11px] border ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reader Discussion & Verified Comments Section */}
            <section
              id="comments-section"
              className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#0a0a10] border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-violet-400" />
                  <h3
                    className={`text-xl font-bold font-display ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Architectural Discussion ({comments.length})
                  </h3>
                </div>
                <span className="text-xs text-zinc-400">Moderated & Verified</span>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mb-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    placeholder="Your Name / Handle"
                    required
                    className={`px-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-600 focus:bg-white'
                        : 'bg-white/[0.03] border-white/[0.08] text-white focus:border-violet-500 focus:bg-white/[0.06]'
                    }`}
                  />
                  <input
                    type="text"
                    value={newCommentRole}
                    onChange={(e) => setNewCommentRole(e.target.value)}
                    placeholder="Role & Organization (e.g. Lead Architect @ ACME)"
                    className={`px-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-600 focus:bg-white'
                        : 'bg-white/[0.03] border-white/[0.08] text-white focus:border-violet-500 focus:bg-white/[0.06]'
                    }`}
                  />
                </div>
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Contribute architectural thoughts, edge cases, or implementation questions..."
                  rows={3}
                  required
                  className={`w-full p-3.5 rounded-xl text-xs border outline-none transition-all resize-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-600 focus:bg-white'
                      : 'bg-white/[0.03] border-white/[0.08] text-white focus:border-violet-500 focus:bg-white/[0.06]'
                  }`}
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">
                    Peer-reviewed enterprise knowledge network
                  </span>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/30 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Comment</span>
                  </button>
                </div>
                {commentSubmitted && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Your comment has been published to the discussion stream.</span>
                  </div>
                )}
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white/[0.02] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          {comment.authorAvatar || 'EA'}
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-zinc-200">
                            {comment.authorName}
                          </div>
                          {comment.authorRole && (
                            <div className="text-[11px] text-violet-400 font-medium">
                              {comment.authorRole}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-zinc-500">{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-10">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Right Sidebar (4 Columns on Desktop) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents Box */}
            {tableOfContents.length > 0 && (
              <div
                className={`p-5 rounded-2xl border sticky top-20 transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-[#0a0a10] border-white/[0.08] shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <h3
                    className={`text-sm font-bold font-display uppercase tracking-wider ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Table of Contents
                  </h3>
                </div>

                <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                  {tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className={`block text-xs py-1.5 px-2.5 rounded-lg transition-all ${
                        activeSectionId === item.id
                          ? isLight
                            ? 'bg-violet-100 text-violet-900 font-bold border-l-2 border-violet-600 pl-3'
                            : 'bg-violet-950/60 text-violet-300 font-bold border-l-2 border-violet-500 pl-3'
                          : isLight
                          ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                      } ${item.level === 4 ? 'ml-3 text-[11px]' : ''}`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Architecture Advisor Callout Card */}
            <div
              className={`p-6 rounded-2xl border transition-colors ${
                isLight
                  ? 'bg-gradient-to-br from-indigo-50 via-violet-50 to-white border-violet-200 shadow-sm'
                  : 'bg-gradient-to-br from-violet-950/40 via-indigo-950/30 to-[#0c0c14] border-violet-500/30 shadow-xl'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-3 shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <h4
                className={`text-base font-bold font-display mb-1.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Deploy This Architecture
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Artify Solutions designs and executes custom autonomous agent swarms tailored to
                your enterprise tech stack.
              </p>
              <div className="space-y-2">
                {onOpenSolutionBuilder && (
                  <button
                    type="button"
                    onClick={onOpenSolutionBuilder}
                    className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Solution Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {onOpenConsultant && (
                  <button
                    type="button"
                    onClick={onOpenConsultant}
                    className={`w-full py-2 px-4 rounded-xl border text-xs font-semibold transition-all ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    Consult AI Architectural Advisor
                  </button>
                )}
              </div>
            </div>

            {/* SEO Telemetry & Schema Snippet Card (Shown to Authorized Editors Only) */}
            {isAuthorizedEditor && (
              <div
                id="editor-seo-telemetry-card"
                className={`p-5 rounded-2xl border transition-colors ${
                  isLight
                    ? 'bg-emerald-50/60 border-emerald-200 shadow-sm'
                    : 'bg-[#0a0a10] border-emerald-500/25 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>SEO & Crawler Telemetry</span>
                  </div>
                  <span className="text-[10px] font-mono-code font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Index: Valid
                  </span>
                </div>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span className={isLight ? 'text-slate-600' : 'text-zinc-400'}>Structured Schema:</span>
                    <span className="font-mono-code text-violet-400 font-bold">
                      {post.seo?.schemaType || 'TechArticle'} + Rating
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isLight ? 'text-slate-600' : 'text-zinc-400'}>Word Count:</span>
                    <span className={`font-mono-code font-bold ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>
                      {wordCount} words
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isLight ? 'text-slate-600' : 'text-zinc-400'}>Focus Keywords:</span>
                    <span className={`font-mono-code text-[11px] ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>
                      {(post.seo?.focusKeywords || post.tags || []).slice(0, 2).join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-500/10">
                    <span className={isLight ? 'text-slate-600' : 'text-zinc-400'}>SEO Score:</span>
                    <span className="text-emerald-400 font-bold font-mono-code">
                      {post.seo?.seoScore || 94}/100
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSeoInspector(true)}
                  id="view-full-schema-btn"
                  className="w-full mt-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>View Full JSON-LD Schema</span>
                </button>
              </div>
            )}
          </aside>
        </div>

        {/* Related Articles Section (90% Width) */}
        {relatedPosts.length > 0 && (
          <section className="w-[94%] sm:w-[90%] max-w-[1800px] mx-auto mt-16 sm:mt-24 pt-12 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated For You</span>
                </div>
                <h2
                  className={`text-2xl sm:text-3xl font-bold font-display ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Related Research & Technical Deep Dives
                </h2>
              </div>
              <button
                type="button"
                onClick={onBackToHub}
                className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => onSelectRelatedPost(relatedPost)}
                  className={`group rounded-2xl border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-violet-300 hover:shadow-lg'
                      : 'bg-[#0b0b12] border-white/[0.08] hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/20'
                  }`}
                >
                  {/* Related Post Cover Image Thumbnail */}
                  {relatedPost.coverImage ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-violet-600 text-white shadow-sm">
                        {relatedPost.category}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`h-24 w-full bg-gradient-to-br ${
                        relatedPost.coverGradient || 'from-violet-950 to-indigo-950'
                      } flex items-center justify-center p-3`}
                    >
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/40 backdrop-blur-sm text-violet-300 border border-white/10">
                        {relatedPost.category}
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono-code">
                          <Clock className="w-3 h-3" />
                          <span>{relatedPost.readTime}</span>
                        </span>
                        <span className="text-[11px] text-zinc-500">{relatedPost.publishDate}</span>
                      </div>

                      <h3
                        className={`text-base font-bold font-display mb-2 line-clamp-2 transition-colors ${
                          isLight
                            ? 'text-slate-900 group-hover:text-violet-700'
                            : 'text-white group-hover:text-violet-300'
                        }`}
                      >
                        {relatedPost.title}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-[10px] flex items-center justify-center">
                          {relatedPost.author.avatar || relatedPost.author.name.substring(0, 2)}
                        </div>
                        <span className="text-zinc-400 text-[11px]">{relatedPost.author.name}</span>
                      </div>

                      <span className="text-violet-400 font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read Deep Dive</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* SEO & JSON-LD Schema Inspector Modal */}
      {showSeoInspector && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setShowSeoInspector(false)}
        >
          <div
            className={`w-full max-w-2xl max-h-[85vh] rounded-2xl border p-6 flex flex-col shadow-2xl overflow-hidden ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0d0d16] border-white/[0.1]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold font-display text-base text-zinc-100">
                  Search Engine Meta Tags & JSON-LD Structured Data
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSeoInspector(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                  HTML Header Directives
                </div>
                <div>
                  <strong className="text-zinc-300">Title Tag:</strong>{' '}
                  <span className="text-violet-300">{post.seo?.metaTitle || post.title}</span>
                </div>
                <div>
                  <strong className="text-zinc-300">Meta Description:</strong>{' '}
                  <span className="text-zinc-400">{post.seo?.metaDescription || post.excerpt}</span>
                </div>
                <div>
                  <strong className="text-zinc-300">Canonical URL:</strong>{' '}
                  <span className="text-emerald-400 font-mono-code">
                    {post.seo?.canonicalUrl || getArticleShareUrl()}
                  </span>
                </div>
                <div>
                  <strong className="text-zinc-300">Robots Directive:</strong>{' '}
                  <span className="font-mono-code text-zinc-300">index, follow</span>
                </div>
                <div>
                  <strong className="text-zinc-300">Dynamic XML Sitemap:</strong>{' '}
                  <span className="font-mono-code text-emerald-400">Included in /sitemap.xml (Priority: 0.85, Weekly)</span>
                </div>
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1.5">
                    <strong className="text-zinc-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Auto-Generated Meta Keywords ({generateBlogPostKeywords(post).length})</span>
                    </strong>
                    <span className="text-[10px] text-zinc-500 font-mono-code">Derived from tags & category</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {generateBlogPostKeywords(post).map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-violet-950/60 border border-violet-500/30 text-violet-300 font-mono-code"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Schema.org JSON-LD (Rich Google Snippet)</span>
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await safeCopyToClipboard(
                        generateSeoStructuredData({
                          ...post,
                          rating: currentRating,
                          ratingCount: ratingCount,
                        })
                      );
                      setCopiedSchema(true);
                      setTimeout(() => setCopiedSchema(false), 2000);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 text-[11px] font-semibold"
                  >
                    {copiedSchema ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSchema ? 'Copied' : 'Copy JSON-LD'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl font-mono-code text-[11px] bg-black/60 border border-white/[0.08] text-violet-200 overflow-x-auto max-h-64 leading-relaxed">
                  <code>
                    {generateSeoStructuredData({
                      ...post,
                      rating: currentRating,
                      ratingCount: ratingCount,
                    })}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
