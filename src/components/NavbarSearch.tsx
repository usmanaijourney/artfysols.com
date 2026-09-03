/**
 * Artify Sols — Global Navbar Unified Search Engine & Command Palette
 * Allows instant, multi-faceted keyword search across AI Products, Services, Blog Posts, and Industries.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Sparkles,
  Bot,
  Layers,
  Cpu,
  Shield,
  Zap,
  Terminal,
  FileText,
  Building2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  ChevronRight,
  CornerDownLeft,
  CheckCircle2,
  ExternalLink,
  History,
  Command,
} from 'lucide-react';
import { AI_PRODUCTS } from '../data/aiProductsData';
import { ENTERPRISE_SERVICES, EnterpriseServiceItem } from '../data/servicesData';
import { getStoredBlogPosts, INITIAL_BLOG_POSTS } from '../data/blogData';
import { INDUSTRIES_DATA } from '../data/solutionsData';
import { AiProductItem, BlogPost, Industry } from '../types';
import { safeGetLocalStorage, safeSetLocalStorage } from '../utils/storage';

export type SearchCategoryFilter = 'all' | 'products' | 'services' | 'blog' | 'industries';

export interface SearchResultItem {
  id: string;
  type: 'product' | 'service' | 'blog' | 'industry';
  title: string;
  subtitle: string;
  description: string;
  category: string;
  icon: string;
  badge?: string;
  meta?: string;
  tags?: string[];
  rawItem: AiProductItem | EnterpriseServiceItem | BlogPost | Industry;
}

interface NavbarSearchProps {
  theme: 'dark' | 'light';
  onSelectProduct?: (product: AiProductItem) => void;
  onNavigateToServices?: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToIndustries?: () => void;
  onNavigateToAiSolutions?: () => void;
  onOpenConsultant?: () => void;
  onOpenSolutionBuilder?: () => void;
  className?: string;
  isMobileCompact?: boolean;
}

const ICONS_MAP: Record<string, React.ElementType> = {
  Bot,
  Layers,
  Cpu,
  Shield,
  Zap,
  Terminal,
  FileText,
  Building2,
  BookOpen,
  TrendingUp,
  Sparkles,
};

const POPULAR_QUICK_SEARCHES = [
  'Autonomous Agents',
  'Enterprise RAG',
  'Financial Reconciliation',
  'Zero Data Retention',
  'Healthcare Workflows',
  'ERP Integration',
  'Small Language Models',
  'SOC2 Governance',
];

export const NavbarSearch: React.FC<NavbarSearchProps> = ({
  theme,
  onSelectProduct,
  onNavigateToServices,
  onNavigateToBlog,
  onNavigateToIndustries,
  onNavigateToAiSolutions,
  onOpenConsultant,
  onOpenSolutionBuilder,
  className = '',
  isMobileCompact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchCategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = safeGetLocalStorage('artify_recent_searches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

  // Build the comprehensive Unified Search Index
  const searchIndex = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. AI Products
    AI_PRODUCTS.forEach((prod) => {
      items.push({
        id: `prod-${prod.id}`,
        type: 'product',
        title: prod.name,
        subtitle: prod.tagline,
        description: prod.shortDescription,
        category: prod.categoryLabel,
        icon: prod.icon || 'Bot',
        badge: prod.badge || 'AI Engine',
        meta: prod.uptime || '99.99% SLA',
        tags: [
          prod.category,
          prod.categoryLabel,
          ...(prod.features?.map((f) => f.title) || []),
          ...(prod.connectedSystems || []),
        ],
        rawItem: prod,
      });
    });

    // 2. Enterprise Services
    ENTERPRISE_SERVICES.forEach((srv) => {
      items.push({
        id: `srv-${srv.id}`,
        type: 'service',
        title: srv.title,
        subtitle: srv.tagline,
        description: srv.description,
        category: srv.category,
        icon: srv.icon || 'Layers',
        badge: srv.badge || 'Service',
        meta: srv.timeframe,
        tags: [...srv.tags, ...srv.deliverables],
        rawItem: srv,
      });
    });

    // 3. Blog Posts & Research Whitepapers
    let blogPosts: BlogPost[] = [];
    try {
      blogPosts = getStoredBlogPosts();
      if (!blogPosts || blogPosts.length === 0) {
        blogPosts = INITIAL_BLOG_POSTS;
      }
    } catch (e) {
      blogPosts = INITIAL_BLOG_POSTS;
    }

    blogPosts.forEach((post) => {
      items.push({
        id: `blog-${post.id}`,
        type: 'blog',
        title: post.title,
        subtitle: `${post.category} • By ${post.author.name}`,
        description: post.excerpt,
        category: post.category,
        icon: 'FileText',
        badge: post.type || 'Whitepaper',
        meta: post.readTime,
        tags: [...post.tags, ...(post.keyTakeaways || []), post.category],
        rawItem: post,
      });
    });

    // 4. Industries & Solutions
    INDUSTRIES_DATA.forEach((ind) => {
      items.push({
        id: `ind-${ind.id}`,
        type: 'industry',
        title: `${ind.name} AI Solutions`,
        subtitle: ind.tagline,
        description: ind.description,
        category: 'Industry Architecture',
        icon: 'Building2',
        badge: 'Industry Mesh',
        meta: `${ind.coreAgents.length} Agents`,
        tags: [ind.name, ...ind.coreAgents, ...ind.connectedSystems, ...(ind.keyWorkflows.map((w) => w.title))],
        rawItem: ind,
      });
    });

    return items;
  }, []);

  // Filtered & Ranked Search Results
  const filteredResults = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();

    let list = searchIndex;

    // Apply category tab filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'products') list = list.filter((item) => item.type === 'product');
      else if (activeFilter === 'services') list = list.filter((item) => item.type === 'service');
      else if (activeFilter === 'blog') list = list.filter((item) => item.type === 'blog');
      else if (activeFilter === 'industries') list = list.filter((item) => item.type === 'industry');
    }

    if (!q) {
      return list.slice(0, 8);
    }

    // Tokenized keyword scoring
    const queryTokens = q.split(/\s+/).filter(Boolean);

    const scored = list
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle.toLowerCase();
        const descLower = item.description.toLowerCase();
        const catLower = item.category.toLowerCase();
        const tagsLower = (item.tags || []).map((t) => t.toLowerCase());

        // Exact full query match in title
        if (titleLower.includes(q)) score += 100;
        if (titleLower.startsWith(q)) score += 50;

        // Subtitle & category matches
        if (subtitleLower.includes(q)) score += 40;
        if (catLower.includes(q)) score += 30;

        // Description matches
        if (descLower.includes(q)) score += 20;

        // Token matches
        queryTokens.forEach((token) => {
          if (titleLower.includes(token)) score += 25;
          if (subtitleLower.includes(token)) score += 15;
          if (descLower.includes(token)) score += 10;
          if (tagsLower.some((t) => t.includes(token))) score += 15;
        });

        return { item, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);

    return scored;
  }, [searchIndex, query, activeFilter]);

  // Counts by category
  const categoryCounts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matchesItem = (item: SearchResultItem) => {
      if (!q) return true;
      const text = `${item.title} ${item.subtitle} ${item.description} ${item.category} ${(item.tags || []).join(' ')}`.toLowerCase();
      return text.includes(q);
    };

    return {
      all: searchIndex.filter(matchesItem).length,
      products: searchIndex.filter((i) => i.type === 'product' && matchesItem(i)).length,
      services: searchIndex.filter((i) => i.type === 'service' && matchesItem(i)).length,
      blog: searchIndex.filter((i) => i.type === 'blog' && matchesItem(i)).length,
      industries: searchIndex.filter((i) => i.type === 'industry' && matchesItem(i)).length,
    };
  }, [searchIndex, query]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / slash)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is already typing in another input/textarea
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !isInput && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-search-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      safeSetLocalStorage('artify_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    safeSetLocalStorage('artify_recent_searches', JSON.stringify([]));
  };

  // Handle result selection & dynamic navigation
  const handleSelectResult = (result: SearchResultItem) => {
    if (query.trim()) {
      saveRecentSearch(query.trim());
    }

    setIsOpen(false);

    if (result.type === 'product') {
      const prod = result.rawItem as AiProductItem;
      if (onSelectProduct) {
        onSelectProduct(prod);
      } else {
        window.location.hash = `#ai-solutions/${prod.slug}`;
      }
    } else if (result.type === 'service') {
      if (onNavigateToServices) {
        onNavigateToServices();
      } else {
        window.location.hash = '#services';
      }
    } else if (result.type === 'blog') {
      const post = result.rawItem as BlogPost;
      window.location.hash = `#blog-${post.slug}`;
      if (onNavigateToBlog) {
        onNavigateToBlog();
      }
    } else if (result.type === 'industry') {
      if (onNavigateToIndustries) {
        onNavigateToIndustries();
      } else {
        window.location.hash = '#industries-page';
      }
    }
  };

  // Handle keyboard arrows and Enter
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectResult(filteredResults[selectedIndex]);
      }
    }
  };

  // Helper to highlight matching words
  const highlightMatch = (text: string, highlightQuery: string) => {
    if (!highlightQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${highlightQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightQuery.trim().toLowerCase() ? (
            <mark
              key={i}
              className={`rounded px-0.5 font-bold ${
                isLight ? 'bg-violet-200 text-violet-950' : 'bg-violet-500/30 text-violet-200'
              }`}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      {/* Search Bar Trigger / Button in Navbar */}
      {isMobileCompact ? (
        <button
          onClick={() => setIsOpen(true)}
          id="mobile-nav-search-trigger"
          className={`p-2 rounded-xl border transition-all active:scale-95 focus:outline-none flex items-center justify-center ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#121217] hover:bg-[#1a1a24] border-white/[0.1] text-zinc-300 hover:text-white'
          }`}
          aria-label="Search AI products, services, and whitepapers"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4 text-violet-400" />
        </button>
      ) : (
        <div className={`relative ${className}`}>
          <button
            onClick={() => setIsOpen(true)}
            id="desktop-nav-search-bar"
            className={`group flex items-center justify-between gap-2.5 sm:gap-3 pl-3 pr-2.5 py-1.5 rounded-full border text-xs transition-all duration-200 shadow-sm focus:outline-none w-44 lg:w-52 xl:w-64 ${
              isLight
                ? 'bg-slate-100/90 hover:bg-white border-slate-200/90 text-slate-600 hover:border-violet-400/60 hover:shadow-violet-500/10'
                : 'bg-[#101017]/80 hover:bg-[#151522] border-white/[0.08] text-zinc-400 hover:border-violet-500/40 hover:text-zinc-200 hover:shadow-[0_0_15px_rgba(120,34,255,0.15)]'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-violet-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate text-[12px] font-medium select-none">
                Search products, blogs...
              </span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <kbd
                className={`text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded border transition-colors shadow-inner ${
                  isLight
                    ? 'bg-white border-slate-300/80 text-slate-600'
                    : 'bg-[#1a1a26] border-white/[0.1] text-zinc-400 group-hover:text-violet-300'
                }`}
              >
                ⌘K
              </kbd>
            </div>
          </button>
        </div>
      )}

      {/* Global Spotlight / Command Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 sm:pt-20 overflow-y-auto animate-in fade-in duration-200">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            id="global-search-palette"
            className={`relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all animate-in zoom-in-95 slide-in-from-top-4 duration-200 ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-slate-900/20 text-slate-900'
                : 'bg-[#0b0b13] border-white/[0.14] shadow-[0_30px_90px_rgba(0,0,0,0.95)] text-white'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Universal Search"
          >
            {/* Search Input Bar Header */}
            <div
              className={`p-3.5 sm:p-4 border-b flex items-center gap-3 ${
                isLight ? 'border-slate-100 bg-slate-50/70' : 'border-white/[0.08] bg-[#0f0f1a]/80'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>

              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleListKeyDown}
                  placeholder="Search 8 AI products, 6 services, whitepapers, 14 industries..."
                  className={`w-full bg-transparent text-sm sm:text-base font-medium outline-none pr-8 ${
                    isLight ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-zinc-500'
                  }`}
                  id="search-palette-input"
                  autoComplete="off"
                  spellCheck="false"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setSelectedIndex(0);
                      inputRef.current?.focus();
                    }}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors`}
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`px-2 py-1 rounded-lg border text-[11px] font-mono-code font-bold transition-all ${
                  isLight
                    ? 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
                    : 'bg-[#181824] border-white/[0.1] text-zinc-400 hover:text-white'
                }`}
                title="Close (Esc)"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Chips Bar */}
            <div
              className={`px-4 py-2.5 border-b flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs ${
                isLight ? 'border-slate-100 bg-white' : 'border-white/[0.05] bg-[#0c0c16]'
              }`}
            >
              {[
                { id: 'all', label: 'All Results', count: categoryCounts.all },
                { id: 'products', label: 'AI Products', count: categoryCounts.products },
                { id: 'services', label: 'Services', count: categoryCounts.services },
                { id: 'blog', label: 'Blog & Insights', count: categoryCounts.blog },
                { id: 'industries', label: 'Industries', count: categoryCounts.industries },
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveFilter(tab.id as SearchCategoryFilter);
                      setSelectedIndex(0);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : isLight
                        ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                        : 'text-zinc-400 bg-[#161622] hover:bg-[#1f1f30] hover:text-zinc-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] font-mono-code px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isLight
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-black/40 text-zinc-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Results Body */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 scrollbar-thin max-h-[55vh]"
            >
              {/* Quick suggestions & Recent searches when query is empty */}
              {!query.trim() && (
                <div className="space-y-4 mb-3">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between px-2 mb-2">
                        <span className="text-[11px] font-bold font-mono-code uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                          <History className="w-3 h-3" />
                          Recent Searches
                        </span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {recentSearches.map((term, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setQuery(term);
                              setSelectedIndex(0);
                            }}
                            className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                              isLight
                                ? 'bg-slate-50 border-slate-200 hover:border-violet-400 text-slate-700'
                                : 'bg-[#12121c] border-white/[0.08] hover:border-violet-500/40 text-zinc-300'
                            }`}
                          >
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="px-2 mb-2">
                      <span className="text-[11px] font-bold font-mono-code uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Popular Topics
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-2">
                      {POPULAR_QUICK_SEARCHES.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setQuery(term);
                            setSelectedIndex(0);
                          }}
                          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 hover:border-violet-400 hover:bg-violet-50 text-slate-700'
                              : 'bg-[#12121c] border-white/[0.08] hover:border-violet-500/40 hover:bg-violet-950/30 text-zinc-300 hover:text-white'
                          }`}
                        >
                          <TrendingUp className="w-3 h-3 text-violet-400" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="px-2 pt-2 border-t border-white/[0.05]">
                    <span className="text-[11px] font-mono-code text-zinc-500 uppercase tracking-wider block mb-2">
                      Suggested AI Solutions & Articles
                    </span>
                  </div>
                </div>
              )}

              {/* Filtered Result Cards */}
              {filteredResults.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-display">No matching results found</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    We couldn't find anything matching &quot;{query}&quot;. Try searching for &quot;Agents&quot;, &quot;RAG&quot;, &quot;Financial&quot;, or &quot;Services&quot;.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    {onOpenConsultant && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenConsultant();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-violet-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-violet-600/30"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Ask AI Architecture Advisor</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const IconComponent = ICONS_MAP[item.icon] || Bot;
                  const isSelected = selectedIndex === index;

                  const badgeColor =
                    item.type === 'product'
                      ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                      : item.type === 'service'
                      ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                      : item.type === 'blog'
                      ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

                  const typeLabel =
                    item.type === 'product'
                      ? 'AI PRODUCT'
                      : item.type === 'service'
                      ? 'ENTERPRISE SERVICE'
                      : item.type === 'blog'
                      ? 'RESEARCH BLOG'
                      : 'INDUSTRY SOLUTION';

                  return (
                    <div
                      key={item.id}
                      data-search-index={index}
                      onClick={() => handleSelectResult(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-150 flex items-start gap-3 sm:gap-3.5 ${
                        isSelected
                          ? isLight
                            ? 'bg-violet-50/90 border-violet-400 shadow-md ring-1 ring-violet-400/50'
                            : 'bg-[#151524] border-violet-500/60 shadow-[0_4px_25px_rgba(120,34,255,0.18)] ring-1 ring-violet-500/40'
                          : isLight
                          ? 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-50'
                          : 'bg-[#0f0f18]/60 border-white/[0.04] hover:bg-[#121220]'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform ${
                          isSelected ? 'scale-105 bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-600/30' : 'bg-violet-600/20 text-violet-400 border-violet-500/30'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-[9px] font-bold font-mono-code px-1.5 py-0.5 rounded border uppercase ${badgeColor}`}>
                            {typeLabel}
                          </span>
                          <span className="text-[10px] font-medium text-zinc-400 font-mono-code">
                            {item.category}
                          </span>
                          {item.meta && (
                            <span className="text-[10px] text-zinc-500 font-mono-code ml-auto shrink-0">
                              {item.meta}
                            </span>
                          )}
                        </div>

                        <h4
                          className={`text-sm sm:text-base font-bold font-display leading-tight truncate ${
                            isSelected ? (isLight ? 'text-violet-950' : 'text-violet-200') : isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {highlightMatch(item.title, query)}
                        </h4>

                        <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed mt-0.5">
                          {highlightMatch(item.subtitle, query)}
                        </p>
                      </div>

                      {/* Right Action Hint */}
                      <div className="shrink-0 flex items-center self-center text-xs font-semibold">
                        <span
                          className={`flex items-center gap-1 transition-transform ${
                            isSelected ? 'translate-x-1 text-violet-400' : 'text-zinc-600'
                          }`}
                        >
                          <span className="hidden sm:inline text-[11px]">Inspect</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Palette Footer Shortcuts */}
            <div
              className={`p-3 px-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-code ${
                isLight ? 'border-slate-100 bg-slate-50 text-slate-600' : 'border-white/[0.06] bg-[#090910] text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-3 text-[11px] flex-wrap">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/[0.1] text-zinc-300">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/[0.1] text-zinc-300">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/[0.1] text-zinc-300">↵</kbd>
                  <span>to select</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/[0.1] text-zinc-300">ESC</kbd>
                  <span>to close</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenSolutionBuilder && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenSolutionBuilder();
                    }}
                    className="text-[11px] text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Run Blueprint Wizard</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
