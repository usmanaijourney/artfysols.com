import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  FileText,
  Tag,
  User,
  Clock,
  Layers,
  HelpCircle,
  Eye,
  Edit3,
  CheckCircle2,
  Lock,
  ShieldCheck,
  LogIn,
  AlertCircle,
  Award,
  Key,
  Globe,
  Save,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
import { BlogPost, BlogCategory, ArticleSeoMetadata } from '../../types';
import { BLOG_CATEGORIES } from '../../data/blogData';
import { useAuth } from '../../context/AuthContext';
import { SeoMetaEditor } from './SeoMetaEditor';

const CURATED_COVER_PRESETS = [
  {
    name: 'Neural AI Core',
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Cloud Datacenter',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Cyber Mesh',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Quantum Circuit',
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Code Engine',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Data Hologram',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
  },
];

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newPost: BlogPost) => void;
  onSaveDraft?: (draft: BlogPost) => void;
  initialPost?: BlogPost | null;
  theme: 'dark' | 'light';
}

export const CreateArticleModal: React.FC<CreateArticleModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  onSaveDraft,
  initialPost,
  theme,
}) => {
  const { user, openAuthModal, loginAsDemo } = useAuth();

  // An authorized editor can be an editor, super_admin, admin, or support_agent
  const isAuthorizedEditor = Boolean(
    user && (user.role === 'editor' || user.role === 'super_admin' || user.role === 'admin' || user.role === 'support_agent')
  );

  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'preview'>('content');
  
  // Content fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BlogCategory>('AI Research & Insights');
  const [type, setType] = useState<'Article' | 'News' | 'Case Study' | 'Whitepaper'>('Article');
  const [authorName, setAuthorName] = useState(user?.name || 'Artify Staff Editor');
  const [authorRole, setAuthorRole] = useState(user?.jobTitle || 'Lead AI Systems Architect');
  const [readTime, setReadTime] = useState('5 min read');
  const [tagsInput, setTagsInput] = useState('AI Agents, Architecture, Enterprise');
  const [takeawaysInput, setTakeawaysInput] = useState(
    'Autonomous agents streamline high-complexity workflows.\nDeterministic security layers prevent prompt injections.'
  );

  // SEO metadata state
  const [seo, setSeo] = useState<ArticleSeoMetadata>({
    metaTitle: '',
    metaDescription: '',
    focusKeywords: ['AI Agents', 'Enterprise'],
    canonicalUrl: '',
    robotsDirective: 'index, follow',
    schemaType: 'TechArticle',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isAutoSaved, setIsAutoSaved] = useState(false);

  // Auto slug generation helper
  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  // Populate when opening modal or changing initialPost
  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title || '');
      setSlug(initialPost.slug || '');
      setIsCustomSlug(Boolean(initialPost.slug));
      setCoverImage(initialPost.coverImage || '');
      setExcerpt(initialPost.excerpt || '');
      setContent(initialPost.content || '');
      setCategory(initialPost.category || 'AI Research & Insights');
      setType(initialPost.type || 'Article');
      setAuthorName(initialPost.author?.name || user?.name || 'Artify Staff Editor');
      setAuthorRole(initialPost.author?.role || user?.jobTitle || 'Lead AI Systems Architect');
      setReadTime(initialPost.readTime || '5 min read');
      setTagsInput(initialPost.tags ? initialPost.tags.join(', ') : 'AI Agents, Architecture');
      setTakeawaysInput(
        initialPost.keyTakeaways ? initialPost.keyTakeaways.join('\n') : ''
      );
      if (initialPost.seo) {
        setSeo(initialPost.seo);
      } else {
        setSeo({
          metaTitle: initialPost.title,
          metaDescription: initialPost.excerpt,
          focusKeywords: initialPost.tags || ['AI Agents'],
          canonicalUrl: `https://artifysols.com#blog-${initialPost.slug}`,
          robotsDirective: 'index, follow',
          schemaType: initialPost.type === 'News' ? 'NewsArticle' : 'TechArticle',
          ogImage: initialPost.coverImage,
          twitterImage: initialPost.coverImage,
        });
      }
      setLastSavedTime(initialPost.lastModified || 'Saved');
    } else {
      // Reset to defaults
      setTitle('');
      setSlug('');
      setIsCustomSlug(false);
      setCoverImage('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80');
      setExcerpt('');
      setContent('');
      setCategory('AI Research & Insights');
      setType('Article');
      setAuthorName(user?.name || 'Artify Staff Editor');
      setAuthorRole(user?.jobTitle || 'Lead AI Systems Architect');
      setReadTime('5 min read');
      setTagsInput('AI Agents, Architecture, Enterprise');
      setTakeawaysInput(
        'Autonomous agents streamline high-complexity workflows.\nDeterministic security layers prevent prompt injections.'
      );
      setSeo({
        metaTitle: '',
        metaDescription: '',
        focusKeywords: ['AI Agents', 'Enterprise'],
        canonicalUrl: '',
        robotsDirective: 'index, follow',
        schemaType: 'TechArticle',
      });
      setLastSavedTime(null);
    }
  }, [initialPost, isOpen, user]);

  // Synchronize author fields when user logs in
  useEffect(() => {
    if (user && !initialPost) {
      setAuthorName(user.name || `${user.firstName} ${user.lastName}`);
      setAuthorRole(user.jobTitle || (user.role === 'editor' ? 'Lead AI Research Editor' : 'AI Systems Architect'));
    }
  }, [user, initialPost]);

  // Automatically update slug if user hasn't typed a custom slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isCustomSlug) {
      setSlug(formatSlug(val));
    }
    // Prepopulate SEO Title if empty
    if (!seo.metaTitle || seo.metaTitle === `${title} | Artify Solutions`) {
      setSeo((prev) => ({
        ...prev,
        metaTitle: `${val.trim()} | Artify Solutions`,
      }));
    }
  };

  const handleExcerptChange = (val: string) => {
    setExcerpt(val);
    // Prepopulate SEO Description if empty
    if (!seo.metaDescription || seo.metaDescription === excerpt) {
      setSeo((prev) => ({
        ...prev,
        metaDescription: val.trim(),
      }));
    }
  };

  // Recalculate reading time on content change
  const handleContentChange = (val: string) => {
    setContent(val);
    const words = val.trim().split(/\s+/).filter(Boolean).length;
    const estMin = Math.max(1, Math.ceil(words / 200));
    setReadTime(`${estMin} min read`);
  };

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const buildPostObject = (status: 'published' | 'draft'): BlogPost => {
    const finalSlug = slug.trim() || formatSlug(title) || `article-${Date.now()}`;
    const initials = (authorName || user?.name || 'ED')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const keyTakeaways = takeawaysInput
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const nowFormatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      id: initialPost?.id || `${status === 'draft' ? 'draft' : 'post'}-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category === 'All' ? 'AI Research & Insights' : category,
      type,
      author: {
        name: authorName.trim() || user?.name || 'Verified Research Editor',
        role: authorRole.trim() || user?.jobTitle || 'AI Systems Architect',
        avatar: user?.avatarUrl || initials,
        bio: `${user?.company ? `${user?.company} • ` : ''}Verified contributor to Artify Solutions Intelligence & Research.`,
      },
      publishDate: status === 'draft' ? `Draft (Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})` : nowFormatted,
      lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      draftSavedAt: new Date().toISOString(),
      readTime: readTime.trim() || '5 min read',
      tags: tags.length > 0 ? tags : ['AI', 'Enterprise'],
      featured: initialPost?.featured || false,
      coverImage: coverImage.trim() || undefined,
      coverGradient: initialPost?.coverGradient || 'from-violet-900/60 via-indigo-950/70 to-zinc-950/60',
      views: initialPost?.views || (status === 'draft' ? 0 : 1),
      likes: initialPost?.likes || 0,
      claps: initialPost?.claps || 0,
      bookmarksCount: initialPost?.bookmarksCount || 0,
      keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
      status,
      seo: {
        ...seo,
        metaTitle: seo.metaTitle?.trim() || `${title.trim()} | Artify Solutions`,
        metaDescription: seo.metaDescription?.trim() || excerpt.trim(),
        canonicalUrl: seo.canonicalUrl?.trim() || (typeof window !== 'undefined' ? `${window.location.origin}#blog-${finalSlug}` : `https://artifysols.com#blog-${finalSlug}`),
        focusKeywords: seo.focusKeywords && seo.focusKeywords.length > 0 ? seo.focusKeywords : tags,
        schemaType: seo.schemaType || (type === 'News' ? 'NewsArticle' : 'TechArticle'),
        robotsDirective: status === 'draft' ? 'noindex, follow' : (seo.robotsDirective || 'index, follow'),
      },
    };
  };

  const handleSaveAsDraft = () => {
    if (!title.trim()) {
      setErrorMsg('Please enter at least a title to save this draft.');
      return;
    }
    setErrorMsg('');
    const draftPost = buildPostObject('draft');
    if (onSaveDraft) {
      onSaveDraft(draftPost);
    }
    setIsAutoSaved(true);
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setTimeout(() => setIsAutoSaved(false), 2500);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setErrorMsg('You must sign in as a registered editor before publishing.');
      return;
    }

    if (!isAuthorizedEditor) {
      setErrorMsg('Your account requires registered Editor permissions. Sign in as an Editor or Administrator.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please enter an article title.');
      return;
    }
    if (!excerpt.trim()) {
      setErrorMsg('Please provide a brief executive excerpt.');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Please author the article content or news dispatch.');
      return;
    }

    setErrorMsg('');
    const publishedPost = buildPostObject('published');
    onPublish(publishedPost);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${
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
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">
                  {initialPost?.status === 'draft'
                    ? 'Edit Article Draft'
                    : initialPost
                    ? 'Edit Published Article & SEO'
                    : 'Editorial Composer & SEO Studio'}
                </h2>
                {initialPost?.status === 'draft' && (
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono-code font-bold uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    Draft
                  </span>
                )}
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Author peer-reviewed research, configure meta tags, generate JSON-LD schema, and manage drafts.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-black/30">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'content'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'seo'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>SEO & Meta</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 ml-1 rounded-lg border transition-colors ${
                isLight
                  ? 'hover:bg-slate-200 border-slate-300 text-slate-500'
                  : 'hover:bg-white/[0.08] border-white/[0.08] text-zinc-400'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Registered Editor Verification Status Banner */}
          {!user ? (
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isLight
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 sm:mt-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>Editor Authentication Required for Public Publishing</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/30 uppercase font-mono-code font-semibold">
                      Registered Only
                    </span>
                  </div>
                  <p className={`text-[11px] mt-0.5 ${isLight ? 'text-amber-800' : 'text-zinc-400'}`}>
                    You can save drafts locally anytime. Publishing live to the knowledge base requires verified editor status.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In as Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo('editor')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                    isLight
                      ? 'bg-white border-amber-300 text-amber-900 hover:bg-amber-100'
                      : 'bg-black/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/30'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>1-Click Editor Demo</span>
                </button>
              </div>
            </div>
          ) : !isAuthorizedEditor ? (
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isLight
                  ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">
                    Signed In as {user.name} ({user.role})
                  </div>
                  <p className={`text-[11px] mt-0.5 ${isLight ? 'text-rose-700' : 'text-zinc-400'}`}>
                    Your client account does not have registered Editor privileges to publish live. Switch to an Editor profile or save as Draft.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => loginAsDemo('editor')}
                className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Switch to Registered Editor</span>
              </button>
            </div>
          ) : (
            <div
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                isLight
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold flex items-center gap-1.5 truncate">
                    <span>Verified Registered Editor:</span>
                    <span className="text-violet-400 font-semibold">{user.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 uppercase font-mono-code font-bold">
                      {user.role}
                    </span>
                  </div>
                  <div className={`text-[10px] truncate ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {user.jobTitle || 'Editorial Staff'} • {user.email} • Direct Publication Privileges Active
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono-code text-emerald-400 font-bold shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized</span>
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: CONTENT & STRUCTURE */}
          {activeTab === 'content' && (
            <form onSubmit={handlePublishSubmit} className="space-y-4">
              {/* Title & Slug */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Article Title <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Distributed Consensus Protocols in Autonomous Financial Schedulers"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none font-semibold transition-all ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                        : 'bg-zinc-900/90 border-white/[0.1] text-zinc-100 focus:border-violet-500'
                    }`}
                  />
                </div>

                {/* Slug Customizer */}
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono-code shrink-0 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                    https://artifysols.com#blog-
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(formatSlug(e.target.value));
                      setIsCustomSlug(true);
                    }}
                    placeholder="article-slug"
                    className={`flex-1 px-2.5 py-1 rounded-lg text-xs font-mono-code border outline-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-zinc-900 border-white/[0.08] text-zinc-300'
                    }`}
                  />
                  {isCustomSlug && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomSlug(false);
                        setSlug(formatSlug(title));
                      }}
                      className="text-[10px] text-violet-400 hover:underline shrink-0"
                    >
                      Reset to Auto
                    </button>
                  )}
                </div>
              </div>

              {/* Article Cover Image Section */}
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.06]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
                    <span>Featured Article Cover Image</span>
                    <span className="text-[10px] text-zinc-500 font-normal">(OG / Social & Header Visual)</span>
                  </label>
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove Image</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => {
                      setCoverImage(e.target.value);
                      if (!seo.ogImage || seo.ogImage === coverImage) {
                        setSeo((prev) => ({
                          ...prev,
                          ogImage: e.target.value,
                          twitterImage: e.target.value,
                        }));
                      }
                    }}
                    placeholder="https://images.unsplash.com/photo-... or custom high-res URL"
                    className={`flex-1 w-full px-3 py-2 rounded-lg text-xs font-mono border outline-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                    }`}
                  />
                </div>

                {/* Preset Wallpapers Selector */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-zinc-400 font-medium">Quick 1-Click Curated Presets:</div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {CURATED_COVER_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setCoverImage(preset.url);
                          setSeo((prev) => ({
                            ...prev,
                            ogImage: preset.url,
                            twitterImage: preset.url,
                          }));
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                          coverImage === preset.url
                            ? 'bg-violet-600 border-violet-500 text-white shadow-sm'
                            : isLight
                            ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            : 'bg-zinc-800/80 border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Live Preview Thumbnail */}
                {coverImage && (
                  <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-lg overflow-hidden border border-white/10 bg-black/40">
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono-code text-white border border-white/20">
                      Live Cover Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Type, Category & Read Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Publication Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                    }`}
                  >
                    <option value="Article">Technical Article</option>
                    <option value="News">Company News / Dispatch</option>
                    <option value="Case Study">Enterprise Case Study</option>
                    <option value="Whitepaper">Architecture Whitepaper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Hub Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BlogCategory)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                    }`}
                  >
                    {BLOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                    }`}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold">
                    Executive Summary / Excerpt <span className="text-violet-400">*</span>
                  </label>
                  <span className={`text-[10px] font-mono-code ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                    {excerpt.length} chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => handleExcerptChange(e.target.value)}
                  placeholder="Provide a high-level 2-3 sentence overview explaining the breakthrough or case study results..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                      : 'bg-zinc-900/90 border-white/[0.1] text-zinc-100 focus:border-violet-500'
                  }`}
                />
              </div>

              {/* Content Body */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold">
                    Article Body (Markdown Supported) <span className="text-violet-400">*</span>
                  </label>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className={`font-mono-code ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                      {content.trim() ? content.trim().split(/\s+/).length : 0} words
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setContent((prev) =>
                          prev +
                          '\n\n### New Section Header\nExplain key architectural milestones and benchmark tables here.\n\n- Milestone 1\n- Milestone 2\n'
                        )
                      }
                      className="text-violet-400 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>+ Add Template Section</span>
                    </button>
                  </div>
                </div>
                <textarea
                  rows={9}
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="### Executive Overview&#10;Write comprehensive markdown content including headers, code blocks, diagrams, and findings..."
                  className={`w-full px-4 py-3 rounded-xl text-xs font-mono border outline-none leading-relaxed transition-all ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-violet-500 shadow-sm'
                      : 'bg-zinc-900/90 border-white/[0.1] text-zinc-100 focus:border-violet-500'
                  }`}
                />
              </div>

              {/* Author and Key Takeaways */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Dr. Devon Vance"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                          : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Author Professional Title</label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Principal AI Systems Architect"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                          : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Autonomous Agents, ERP, Security, Latency"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                          : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">
                    Key Takeaways (One bullet per line)
                  </label>
                  <textarea
                    rows={6}
                    value={takeawaysInput}
                    onChange={(e) => setTakeawaysInput(e.target.value)}
                    placeholder="Enter key executive takeaways here, one per line..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        : 'bg-zinc-900 border-white/[0.1] text-zinc-100'
                    }`}
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: SEO & META TAGS SUITE */}
          {activeTab === 'seo' && (
            <SeoMetaEditor
              seo={seo}
              onChange={setSeo}
              title={title}
              excerpt={excerpt}
              content={content}
              slug={slug || formatSlug(title)}
              category={category}
              type={type}
              authorName={authorName}
              theme={theme}
            />
          )}

          {/* TAB 3: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div
              className={`p-6 rounded-2xl border space-y-6 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-white/[0.08]'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 font-mono-code">
                  {type}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  {category} • {readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {title || 'Untitled Article Preview'}
              </h1>

              {/* Cover Image in Live Preview */}
              {coverImage && (
                <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-white/10 shadow-md">
                  <img
                    src={coverImage}
                    alt={title || 'Cover Preview'}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[11px] font-mono-code text-zinc-200 border border-white/10">
                    {category} • Cover Preview
                  </span>
                </div>
              )}

              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                {excerpt || 'Your article excerpt summary will appear here.'}
              </p>

              {/* Author card preview */}
              <div
                className={`p-4 rounded-xl border flex items-center gap-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-sm">
                  {(authorName || 'ED').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold">{authorName || 'Artify Staff Editor'}</div>
                  <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                    {authorRole || 'Lead AI Systems Architect'}
                  </div>
                </div>
              </div>

              {/* Formatted body preview */}
              <div className="border-t border-slate-200 dark:border-white/[0.08] pt-4">
                <div className="text-xs font-mono text-violet-400 mb-2 uppercase font-bold tracking-wider">
                  Raw Content Stream
                </div>
                <div
                  className={`p-4 rounded-xl font-mono text-xs whitespace-pre-wrap ${
                    isLight ? 'bg-slate-100 text-slate-800' : 'bg-black/60 text-zinc-300'
                  }`}
                >
                  {content || 'Author markdown body in the Content tab to preview formatting.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Draft & Publish Actions */}
        <div
          className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-zinc-900/80 border-white/[0.08]'
          }`}
        >
          {/* Status & Auto-save indicator */}
          <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
            {isAutoSaved ? (
              <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                <Check className="w-4 h-4" />
                <span>Draft Saved Successfully</span>
              </span>
            ) : lastSavedTime ? (
              <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                <span>Last saved: {lastSavedTime}</span>
              </span>
            ) : (
              <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                <FileText className="w-3.5 h-3.5" />
                <span>New Article Composer</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Save as Draft Button */}
            <button
              type="button"
              onClick={handleSaveAsDraft}
              id="save-article-draft-btn"
              className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                  : 'bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.1] text-zinc-300'
              }`}
            >
              <Save className="w-3.5 h-3.5 text-violet-400" />
              <span>Save as Draft</span>
            </button>

            {/* Publish Live Button */}
            <button
              type="button"
              onClick={handlePublishSubmit}
              id="publish-article-live-btn"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-500/20 flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
