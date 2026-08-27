import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Sparkles,
  BookOpen,
  Filter,
  PlusCircle,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Radio,
  Share2,
  Bookmark,
  Check,
  ChevronRight,
  ArrowLeft,
  Mail,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Heart,
  Bot,
  Sun,
  Moon,
  Linkedin,
  Copy,
  FolderOpen,
  Edit3,
  Globe,
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../../types';
import {
  BLOG_CATEGORIES,
  getStoredBlogPosts,
  saveStoredBlogPosts,
  getStoredBlogDrafts,
  saveStoredBlogDrafts,
} from '../../data/blogData';
import { BlogPostPage } from './BlogPostPage';
import { CreateArticleModal } from './CreateArticleModal';
import { DraftsManagerDrawer } from './DraftsManagerDrawer';
import { useAuth } from '../../context/AuthContext';
import { updatePageSeo, generateCategoryKeywords, generateDynamicKeywords } from '../../utils/seo';

// Crisp X / Twitter brand icon component
const XBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface BlogPageProps {
  theme: 'dark' | 'light';
  onBackToHome: () => void;
  onOpenSolutionBuilder?: () => void;
  onOpenConsultant?: () => void;
  onToggleTheme?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  theme,
  onBackToHome,
  onOpenSolutionBuilder,
  onOpenConsultant,
  onToggleTheme,
}) => {
  const { user, openAuthModal } = useAuth();
  const isEditor = Boolean(
    user && (user.role === 'editor' || user.role === 'super_admin' || user.role === 'admin' || user.role === 'support_agent')
  );

  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [drafts, setDrafts] = useState<BlogPost[]>(() => getStoredBlogDrafts());
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDraftsDrawerOpen, setIsDraftsDrawerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const isLight = theme === 'light';

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      // Type check
      const matchesType =
        selectedType === 'All' || post.type === selectedType;

      // Search check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [posts, selectedCategory, selectedType, searchQuery]);

  // Featured post (first featured or top post)
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Handle URL hash changes for deep linking to individual articles
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash.startsWith('#blog-')) {
        const slug = hash.replace('#blog-', '');
        const found =
          posts.find((p) => p.slug === slug || p.id === slug) ||
          drafts.find((d) => d.slug === slug || d.id === slug);
        if (found) {
          setActivePost(found);
        }
      } else if (hash === '#blog' && activePost) {
        setActivePost(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [posts, drafts]);

  // Update SEO metadata for the Blog Hub Feed when no individual post is active
  useEffect(() => {
    if (!activePost) {
      const isFiltered = selectedCategory !== 'All';
      const dynamicKeywords = isFiltered
        ? generateCategoryKeywords(selectedCategory, 'blog')
        : generateDynamicKeywords({
            type: 'article',
            title: 'Artify Solutions Intelligence Feed & Engineering Research',
            customKeywords: [
              'Enterprise AI Blog',
              'Autonomous Agent Research',
              'AI Engineering Articles',
              'Business Automation Case Studies',
              'Artify Solutions Intelligence',
            ],
            tags: BLOG_CATEGORIES.filter((c) => c !== 'All'),
          });

      const cleanup = updatePageSeo({
        title: isFiltered
          ? `${selectedCategory} Articles & Engineering Research | Artify Solutions`
          : 'Intelligence Feed & Research Articles | Artify Solutions',
        description: isFiltered
          ? `Explore technical articles, architectural guides, and engineering research on ${selectedCategory} by Artify Solutions.`
          : 'Read the latest deep dives on autonomous multi-agent swarms, deterministic financial architectures, vector RAG governance, and enterprise AI engineering.',
        keywords: dynamicKeywords,
        canonicalUrl: typeof window !== 'undefined' ? `${window.location.origin}/blog` : 'https://artifysols.com/blog',
        ogType: 'website',
        ogTitle: isFiltered
          ? `${selectedCategory} - Artify Solutions Intelligence Feed`
          : 'Artify Solutions Intelligence Feed & Engineering Research',
        ogDescription: isFiltered
          ? `Read curated engineering research on ${selectedCategory} and enterprise AI systems.`
          : 'Deep dives into autonomous agent fleets, deterministic finance, and enterprise AI architecture.',
        twitterCard: 'summary_large_image',
      });
      return () => cleanup();
    }
  }, [activePost, selectedCategory]);

  const handleOpenReader = (post: BlogPost) => {
    // Increment view counter if published
    if (post.status !== 'draft') {
      const updated = posts.map((p) =>
        p.id === post.id ? { ...p, views: (p.views || 0) + 1 } : p
      );
      setPosts(updated);
      saveStoredBlogPosts(updated);
      setActivePost({ ...post, views: (post.views || 0) + 1 });
    } else {
      setActivePost(post);
    }
    if (typeof window !== 'undefined') {
      window.location.hash = `#blog-${post.slug}`;
    }
  };

  const handleLikePost = (postId: string) => {
    const updated = posts.map((p) =>
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updated);
    saveStoredBlogPosts(updated);
  };

  // Publish a new or edited post live
  const handlePublishNewPost = (newPost: BlogPost) => {
    // Check if updating existing published post
    const existingIndex = posts.findIndex((p) => p.id === newPost.id);
    let updatedPosts: BlogPost[];
    if (existingIndex >= 0) {
      updatedPosts = [...posts];
      updatedPosts[existingIndex] = newPost;
    } else {
      updatedPosts = [newPost, ...posts];
    }
    setPosts(updatedPosts);
    saveStoredBlogPosts(updatedPosts);

    // If it was a draft, remove from drafts list
    const updatedDrafts = drafts.filter((d) => d.id !== newPost.id);
    setDrafts(updatedDrafts);
    saveStoredBlogDrafts(updatedDrafts);

    setEditingPost(null);
    handleOpenReader(newPost);
  };

  // Draft Management Handlers
  const handleSaveDraft = (draft: BlogPost) => {
    const existingIndex = drafts.findIndex((d) => d.id === draft.id);
    let updatedDrafts: BlogPost[];
    if (existingIndex >= 0) {
      updatedDrafts = [...drafts];
      updatedDrafts[existingIndex] = draft;
    } else {
      updatedDrafts = [draft, ...drafts];
    }
    setDrafts(updatedDrafts);
    saveStoredBlogDrafts(updatedDrafts);
  };

  const handleDeleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter((d) => d.id !== draftId);
    setDrafts(updatedDrafts);
    saveStoredBlogDrafts(updatedDrafts);
  };

  const handleDuplicateDraft = (draft: BlogPost) => {
    const duplicated: BlogPost = {
      ...draft,
      id: `draft-${Date.now()}`,
      title: `${draft.title} (Copy)`,
      slug: `${draft.slug}-copy`,
      publishDate: `Draft (Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    handleSaveDraft(duplicated);
  };

  const handleEditDraft = (draft: BlogPost) => {
    setEditingPost(draft);
    setIsCreateOpen(true);
  };

  const handleEditPublishedPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreateOpen(true);
  };

  const handleCreateNewArticle = () => {
    setEditingPost(null);
    setIsCreateOpen(true);
  };

  const handlePublishDraft = (draft: BlogPost) => {
    const published: BlogPost = {
      ...draft,
      status: 'published',
      publishDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      views: 1,
    };
    handlePublishNewPost(published);
    setIsDraftsDrawerOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  // If a post is active, render full-page BlogPostPage
  if (activePost) {
    return (
      <div className={`min-h-screen ${isLight ? 'theme-light' : 'theme-dark'}`}>
        <BlogPostPage
          post={activePost}
          theme={theme}
          onBackToHub={() => {
            setActivePost(null);
            if (typeof window !== 'undefined') {
              window.location.hash = '#blog';
            }
          }}
          onBackToHome={onBackToHome}
          onSelectRelatedPost={(p) => handleOpenReader(p)}
          onEditPost={handleEditPublishedPost}
          allPosts={posts}
          onOpenSolutionBuilder={onOpenSolutionBuilder}
          onOpenConsultant={onOpenConsultant}
          onToggleTheme={onToggleTheme}
        />

        {/* Author / Create Article Modal */}
        <CreateArticleModal
          isOpen={isCreateOpen}
          onClose={() => {
            setIsCreateOpen(false);
            setEditingPost(null);
          }}
          onPublish={handlePublishNewPost}
          onSaveDraft={handleSaveDraft}
          initialPost={editingPost}
          theme={theme}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-20 sm:pt-24 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050505] text-zinc-100'
      } selection:bg-violet-600 selection:text-white transition-colors duration-300`}
      id="artify-blog-page"
    >
      {/* Blog Page Sub-Header Bar (Positions cleanly underneath global Navbar) */}
      <header
        className={`sticky top-[66px] sm:top-[72px] z-30 border-b backdrop-blur-xl transition-colors duration-200 ${
          isLight
            ? 'bg-white/90 border-slate-200 shadow-sm'
            : 'bg-[#050505]/90 border-white/[0.08] shadow-2xl shadow-black/80'
        }`}
      >
        <div className="w-full px-6 lg:px-[8%] py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToHome}
              id="blog-back-to-home-btn"
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span
                className={`text-xs sm:text-sm font-bold font-display tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Intelligence Dispatch & Research
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Drafts Desk Button */}
            <button
              type="button"
              onClick={() => setIsDraftsDrawerOpen(true)}
              id="open-drafts-desk-btn"
              title="Open Editorial Drafts Desk"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                drafts.length > 0
                  ? isLight
                    ? 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100 shadow-sm'
                    : 'bg-violet-950/40 border-violet-500/30 text-violet-300 hover:bg-violet-900/60'
                  : isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.08]'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden sm:inline">Drafts Desk</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono-code font-bold bg-violet-500/20 text-violet-300">
                {drafts.length}
              </span>
            </button>

            {/* Editor Account Status / Switch Badge */}
            {user ? (
              <div
                className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs ${
                  isEditor
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                    : isLight
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isEditor ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="font-semibold">{user.name}</span>
                <span className="text-[10px] font-mono-code uppercase px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-bold">
                  {user.role}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span>Editor Sign In</span>
              </button>
            )}

            <button
              onClick={handleCreateNewArticle}
              id="open-create-article-btn"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-violet-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Composer & SEO</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Blog Body Container */}
      <main className="w-full px-6 lg:px-[8%] py-10 space-y-12">
        {/* Hero Section Banner */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono-code uppercase font-semibold">
            <Radio className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>Articles, Engineering Research & News Feed</span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Engineering the Next Wave of Enterprise Intelligence.
          </h1>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Discover deep dives into autonomous multi-agent swarms, deterministic financial architectures, enterprise ERP modernization, and Artify product releases.
          </p>
        </div>

        {/* Live News Ticker / Bulletin Ribbon */}
        <div
          className={`p-3 rounded-xl border flex items-center gap-3 overflow-hidden ${
            isLight
              ? 'bg-violet-50/80 border-violet-200 text-slate-900'
              : 'bg-violet-950/20 border-violet-500/20 text-zinc-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold font-mono-code text-violet-500 shrink-0 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Latest News:</span>
          </div>
          <div className="truncate text-xs text-zinc-300">
            <span
              onClick={() => handleOpenReader(posts[1] || posts[0])}
              className="cursor-pointer hover:underline text-violet-400 font-semibold inline-flex items-center gap-1"
            >
              Artify Kernel V3.0 is live with dual-engine model routing and real-time agent memory mesh
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Spotlight Featured Article Card */}
        {featuredPost && (
          <div
            onClick={() => handleOpenReader(featuredPost)}
            id="featured-article-card"
            className={`group relative rounded-2xl sm:rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.005] ${
              isLight
                ? 'bg-gradient-to-br from-white via-violet-50/40 to-indigo-50/30 border-slate-200 shadow-xl hover:shadow-2xl hover:border-violet-300'
                : 'bg-gradient-to-br from-[#0c0c14] via-[#10101c] to-[#0a0a0f] border-violet-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-400/50'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Content Side */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Top Badge & Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 text-white font-mono-code text-[11px] font-bold uppercase shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Featured Deep Dive</span>
                      </span>
                      <span
                        className={`text-xs font-mono-code px-2.5 py-0.5 rounded-full border ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                        }`}
                      >
                        {featuredPost.category}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-3 text-xs ${
                        isLight ? 'text-slate-500' : 'text-zinc-400'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-violet-400" />
                        <span>{featuredPost.publishDate}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-violet-400" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h2
                    className={`text-2xl sm:text-3xl lg:text-3xl font-bold font-display tracking-tight mb-4 group-hover:text-violet-400 transition-colors leading-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {featuredPost.title}
                  </h2>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isLight ? 'text-slate-600' : 'text-zinc-300'
                    }`}
                  >
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Author and Read CTA */}
                <div
                  className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isLight ? 'border-slate-200' : 'border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                      {featuredPost.author.avatar}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-bold ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {featuredPost.author.name}
                      </div>
                      <div
                        className={`text-[11px] ${
                          isLight ? 'text-violet-700 font-medium' : 'text-violet-400'
                        }`}
                      >
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-violet-500 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Deep Dive</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Right Visual Image Side */}
              <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden bg-black/40">
                {featuredPost.coverImage ? (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      featuredPost.coverGradient || 'from-violet-950 via-slate-900 to-indigo-950'
                    } flex items-center justify-center p-6`}
                  >
                    <Sparkles className="w-10 h-10 text-violet-400 opacity-60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none lg:bg-gradient-to-r lg:from-black/50 lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-300 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 font-mono-code">
                    {featuredPost.type}
                  </span>
                  <span className="text-[10px] text-zinc-400">Research Brief</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls & Search Bar */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-600/30'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-[#12121a] border-white/[0.08] text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isLight ? 'text-slate-400' : 'text-zinc-500'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, tags, authors..."
                className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs border focus:outline-none focus:border-violet-500 transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                    : 'bg-[#12121a] border-white/[0.1] text-white placeholder-zinc-500'
                }`}
              />
            </div>
          </div>

          {/* Secondary Type Filters: All, Articles, News, Case Studies, Whitepapers */}
          <div className="flex items-center gap-2 pt-1">
            <span
              className={`text-xs font-mono-code uppercase mr-1 ${
                isLight ? 'text-slate-500' : 'text-zinc-500'
              }`}
            >
              Filter Type:
            </span>
            {['All', 'Article', 'News', 'Case Study', 'Whitepaper'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-medium transition-all ${
                  selectedType === t
                    ? isLight
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-black font-bold'
                    : isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                {t === 'All' ? 'All Publications' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div
              className={`text-xs font-mono-code uppercase font-semibold ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              Showing {filteredPosts.length} Publications
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div
              className={`p-12 text-center rounded-2xl border ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-[#0e0e16] border-white/[0.08] text-zinc-400'
              }`}
            >
              <BookOpen className="w-8 h-8 text-violet-400 mx-auto mb-3 opacity-60" />
              <h3
                className={`text-base font-bold mb-1 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                No articles matching your filters
              </h3>
              <p className="text-xs max-w-sm mx-auto mb-4">
                Try searching for a different keyword, selecting "All" categories, or publish your own article.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleOpenReader(post)}
                  className={`group rounded-2xl border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-xl'
                      : 'bg-[#0d0d14] border-white/[0.08] hover:border-violet-500/40 hover:bg-[#10101c] shadow-lg'
                  }`}
                >
                  {/* Article Card Cover Image */}
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`font-mono-code uppercase px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md ${
                            post.type === 'News'
                              ? 'bg-sky-500 text-white'
                              : post.type === 'Case Study'
                              ? 'bg-emerald-600 text-white'
                              : post.type === 'Whitepaper'
                              ? 'bg-amber-600 text-white'
                              : 'bg-violet-600 text-white'
                          }`}
                        >
                          {post.type}
                        </span>
                      </div>
                      <span className="absolute bottom-2 right-3 text-[10px] text-zinc-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded font-mono-code">
                        {post.readTime}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`h-24 w-full bg-gradient-to-br ${
                        post.coverGradient || 'from-violet-950 to-indigo-950'
                      } flex items-center justify-between p-4`}
                    >
                      <span
                        className={`font-mono-code uppercase px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          post.type === 'News'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : post.type === 'Case Study'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : post.type === 'Whitepaper'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        }`}
                      >
                        {post.type}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono-code">{post.readTime}</span>
                    </div>
                  )}

                  <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Metadata if no image */}
                      {!post.coverImage && (
                        <div className="flex items-center justify-between gap-2 text-[11px] mb-2">
                          <span className="text-violet-400 font-semibold font-mono-code">
                            {post.category}
                          </span>
                          <span
                            className={`flex items-center gap-1 ${
                              isLight ? 'text-slate-500' : 'text-zinc-500'
                            }`}
                          >
                            <Clock className="w-3 h-3 text-violet-400" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3
                        className={`text-lg font-bold font-display tracking-tight leading-snug line-clamp-2 group-hover:text-violet-400 transition-colors ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        className={`text-xs leading-relaxed line-clamp-3 mt-2 ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer Author & Reactions */}
                    <div
                      className={`mt-4 pt-4 border-t flex items-center justify-between ${
                        isLight ? 'border-slate-100' : 'border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-400/30 flex items-center justify-center text-[10px] font-bold text-violet-300">
                          {post.author.avatar}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-semibold truncate ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {post.author.name}
                          </div>
                          <div
                            className={`text-[10px] truncate ${
                              isLight ? 'text-slate-500' : 'text-zinc-500'
                            }`}
                          >
                            {post.publishDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isEditor && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPublishedPost(post);
                            }}
                            title="Edit Article & SEO"
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isLight
                                ? 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100'
                                : 'bg-violet-950/40 border-violet-500/30 text-violet-300 hover:bg-violet-900/60'
                            }`}
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = `${window.location.origin}${window.location.pathname}#blog-${post.slug}`;
                            const text = `Read "${post.title}" via @ArtifySolutions`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer,width=600,height=450');
                          }}
                          title="Share on X / Twitter"
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-black hover:bg-slate-100'
                              : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <XBrandIcon className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const url = `${window.location.origin}${window.location.pathname}#blog-${post.slug}`;
                            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer,width=600,height=600');
                          }}
                          title="Share on LinkedIn"
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-[#0A66C2] hover:bg-blue-50/50'
                              : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-sky-400 hover:bg-sky-500/10'
                          }`}
                        >
                          <Linkedin className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-1 text-xs text-violet-500 font-bold ml-1 group-hover:translate-x-1 transition-transform">
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Engineering Briefing Subscription Card */}
        <div
          className={`p-8 sm:p-10 rounded-2xl border relative overflow-hidden ${
            isLight
              ? 'bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-600 text-white shadow-xl'
              : 'bg-gradient-to-br from-violet-950/80 via-indigo-950/50 to-[#0c0c14] border-violet-500/30 shadow-2xl'
          }`}
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-mono-code uppercase font-semibold">
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Weekly Engineering Dispatch</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Get Artificial Intelligence Architecture Briefings Delivered Weekly.
            </h2>

            <p className="text-xs sm:text-sm text-violet-100 leading-relaxed">
              Join 12,000+ enterprise CTOs, engineering directors, and AI architects receiving our curated breakdowns on agentic workflows, model benchmarks, and security guardrails.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-white/20 border border-white/30 text-white text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-300" />
                <span>You are subscribed to the Artify Intelligence Briefing. Welcome aboard!</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your corporate email address..."
                  required
                  className="flex-1 rounded-xl px-4 py-3 text-xs bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs transition-all shadow-md shrink-0"
                >
                  Subscribe to Briefing
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Author / Create Article Modal */}
      <CreateArticleModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingPost(null);
        }}
        onPublish={handlePublishNewPost}
        onSaveDraft={handleSaveDraft}
        initialPost={editingPost}
        theme={theme}
      />

      {/* Drafts Manager Drawer */}
      <DraftsManagerDrawer
        isOpen={isDraftsDrawerOpen}
        onClose={() => setIsDraftsDrawerOpen(false)}
        drafts={drafts}
        onEditDraft={handleEditDraft}
        onPublishDraft={handlePublishDraft}
        onDeleteDraft={handleDeleteDraft}
        onDuplicateDraft={handleDuplicateDraft}
        onCreateNew={() => {
          setEditingPost(null);
          setIsCreateOpen(true);
        }}
        onPreviewDraft={handleOpenReader}
        theme={theme}
      />
    </div>
  );
};
