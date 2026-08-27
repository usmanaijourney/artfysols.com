import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Bot,
  Filter,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Zap,
  Activity,
  ArrowUpRight,
  Database,
  RefreshCw,
  Workflow,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { AiProductItem, AiProductCategoryType } from '../../types';
import { AI_PRODUCTS, AI_PRODUCT_CATEGORIES } from '../../data/aiProductsData';
import { ProductCard } from './ProductCard';
import { updatePageSeo, generateCategoryKeywords, generateDynamicKeywords } from '../../utils/seo';

interface AiSolutionsPageProps {
  onSelectProduct: (product: AiProductItem) => void;
  onOpenConsultant: () => void;
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
  theme?: 'dark' | 'light';
}

export const AiSolutionsPage: React.FC<AiSolutionsPageProps> = ({
  onSelectProduct,
  onOpenConsultant,
  onOpenSolutionBuilder,
  onNavigateToContact,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [selectedCategory, setSelectedCategory] = useState<AiProductCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return AI_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.features.some((f) => f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)) ||
        product.useCases.some((u) => u.scenario.toLowerCase().includes(q) || u.industry.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Update SEO metadata for the AI Solutions overview
  React.useEffect(() => {
    const isFiltered = selectedCategory !== 'all';
    const activeCatObj = AI_PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory);
    const categoryLabel = activeCatObj?.label || selectedCategory;

    const dynamicKeywords = isFiltered
      ? generateCategoryKeywords(categoryLabel, 'product')
      : generateDynamicKeywords({
          type: 'product',
          title: 'Artify Solutions Enterprise AI Product Ecosystem',
          customKeywords: [
            'Enterprise AI Products',
            'Autonomous Agent Fleet Platform',
            'AI Automation Solutions',
            'Enterprise Generative RAG',
            'Conversational ERP Intelligence',
            'Artify Solutions Suite',
          ],
          tags: AI_PRODUCT_CATEGORIES.map((c) => c.label),
        });

    const cleanup = updatePageSeo({
      title: isFiltered
        ? `${categoryLabel} AI Products & Enterprise Systems | Artify Solutions`
        : 'AI Solutions Suite & Autonomous Agents | Artify Solutions',
      description: isFiltered
        ? `Explore enterprise-grade ${categoryLabel} products engineered by Artify Solutions for high-throughput, private cloud deployment.`
        : 'Explore Artify Solutions enterprise AI ecosystem: Autonomous Agent Fleets, Self-Healing Automation Pipelines, Private Generative RAG, and Conversational ERP Intelligence.',
      keywords: dynamicKeywords,
      canonicalUrl: typeof window !== 'undefined' ? `${window.location.origin}/ai-solutions` : 'https://artifysols.com/ai-solutions',
      ogType: 'website',
      ogTitle: isFiltered
        ? `${categoryLabel} - Artify Solutions AI Ecosystem`
        : 'Artify Solutions - Enterprise AI Product Ecosystem',
      ogDescription: isFiltered
        ? `Production-ready ${categoryLabel} AI systems engineered for enterprise workloads.`
        : 'Production-ready AI systems engineered to run directly on enterprise infrastructure with deterministic precision.',
      twitterCard: 'summary_large_image',
    });
    return () => cleanup();
  }, [selectedCategory]);

  const scrollToProducts = () => {
    const el = document.getElementById('our-ai-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050505] text-[#F5F5F5]'
      } transition-colors duration-300`}
    >
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden border-b border-white/[0.06]">
        {/* Dynamic Neural Particle / Ambient Grid Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full blur-[140px] ${
              isLight ? 'bg-violet-300/30' : 'bg-violet-600/15'
            }`}
          />
          <div
            className={`absolute bottom-0 right-10 w-[500px] h-[400px] rounded-full blur-[120px] ${
              isLight ? 'bg-indigo-200/40' : 'bg-indigo-600/10'
            }`}
          />
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>The Artify AI Product Ecosystem</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.1] max-w-5xl mx-auto">
            AI Solutions Built for the{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Next Generation of Business
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Artify Solutions engineers intelligent, production-ready AI products and autonomous systems
            designed to automate complex workflows, unlock institutional data, and transform enterprises.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToProducts}
              id="hero-explore-products-btn"
              className="px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-violet-600/30 transition-all duration-200 active:scale-95 flex items-center gap-2.5 group"
            >
              <span>Explore AI Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenConsultant}
              id="hero-talk-to-experts-btn"
              className={`px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base border transition-all duration-200 active:scale-95 flex items-center gap-2.5 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                  : 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-violet-500/40'
              }`}
            >
              <Bot className="w-4 h-4 text-violet-400" />
              <span>Talk to Our AI Experts</span>
            </button>
          </div>

          {/* Ecosystem Telemetry Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div
              className={`p-4 rounded-xl border text-left ${
                isLight
                  ? 'bg-white/80 border-slate-200'
                  : 'bg-[#0d0d14]/70 border-white/[0.06]'
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white font-display">8+</div>
              <div className="text-xs text-zinc-400 font-mono-code mt-0.5">Enterprise AI Engines</div>
            </div>
            <div
              className={`p-4 rounded-xl border text-left ${
                isLight
                  ? 'bg-white/80 border-slate-200'
                  : 'bg-[#0d0d14]/70 border-white/[0.06]'
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">99.99%</div>
              <div className="text-xs text-zinc-400 font-mono-code mt-0.5">Production SLA Uptime</div>
            </div>
            <div
              className={`p-4 rounded-xl border text-left ${
                isLight
                  ? 'bg-white/80 border-slate-200'
                  : 'bg-[#0d0d14]/70 border-white/[0.06]'
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-violet-400 font-display">&lt; 10ms</div>
              <div className="text-xs text-zinc-400 font-mono-code mt-0.5">Streaming Latency</div>
            </div>
            <div
              className={`p-4 rounded-xl border text-left ${
                isLight
                  ? 'bg-white/80 border-slate-200'
                  : 'bg-[#0d0d14]/70 border-white/[0.06]'
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-display">120+</div>
              <div className="text-xs text-zinc-400 font-mono-code mt-0.5">Enterprise Connectors</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AI Product Ecosystem Section */}
      <section id="our-ai-products" className="py-24 relative">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>Production-Ready Modular Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
                Our AI Products
              </h2>
              <p
                className={`text-base sm:text-lg max-w-2xl mt-2 leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Explore our full suite of autonomous digital workers, neural knowledge engines, real-time integration meshes, and domain models.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="w-full md:w-80 relative shrink-0">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, features, use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search-ai-products-input"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                    : 'bg-[#0f0f18] border-white/10 text-white placeholder:text-zinc-500 focus:border-violet-500/50'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* 3. Product Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {AI_PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`filter-category-${cat.id}`}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? isLight
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                        : 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                      : isLight
                      ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      : 'bg-[#0c0c14] text-zinc-300 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 4. Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  theme={theme}
                />
              ))}
            </div>
          ) : (
            <div
              className={`p-12 rounded-2xl border text-center max-w-xl mx-auto ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0e0e16] border-white/[0.08]'
              }`}
            >
              <Search className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold font-display">No AI Products Found</h3>
              <p className="text-sm text-zinc-400 mt-2">
                No products match "{searchQuery}" under the selected category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-6 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Enterprise Architecture Comparison */}
      <section className="py-20 border-t border-white/[0.06] bg-black/20">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineered For Scale</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight">
              Why Artify AI Products Outperform Traditional Software
            </h2>
            <p className={`mt-3 text-base ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Compare legacy static automation with Artify's dynamic agentic reasoning loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-7 rounded-2xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c14] border-white/[0.08]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Legacy RPA & Scripts</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Brittle click-macro scripts that break whenever web interfaces update or unexpected exceptions occur.
              </p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2 text-red-400">✕ Zero semantic comprehension</li>
                <li className="flex items-center gap-2 text-red-400">✕ High maintenance costs</li>
                <li className="flex items-center gap-2 text-red-400">✕ Cannot handle unstructured files</li>
              </ul>
            </div>

            <div
              className={`p-7 rounded-2xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0c0c14] border-white/[0.08]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Generic Wrapper Chatbots</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Basic OpenAI API wrappers without grounding, fine-tuned memory, or safe enterprise write-permissions.
              </p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2 text-amber-400">⚠ Hallucinations on complex facts</li>
                <li className="flex items-center gap-2 text-amber-400">⚠ No system action execution</li>
                <li className="flex items-center gap-2 text-amber-400">⚠ Data privacy compliance risks</li>
              </ul>
            </div>

            <div className="p-7 rounded-2xl border border-violet-500/40 bg-gradient-to-b from-violet-950/40 to-[#0c0c14] relative overflow-hidden shadow-xl shadow-violet-950/20">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-4 shadow-md shadow-violet-600/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">Artify AI Products</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Autonomous agent swarms, hybrid vector RAG, and sub-millisecond event meshes with deterministic validation.
              </p>
              <ul className="space-y-2 text-xs text-zinc-200">
                <li className="flex items-center gap-2 text-emerald-400">✓ 99.8% precision with dual verification</li>
                <li className="flex items-center gap-2 text-emerald-400">✓ Safe read/write execution against 120+ ERPs</li>
                <li className="flex items-center gap-2 text-emerald-400">✓ 100% private cloud or on-premise deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Conversion CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="w-[92%] sm:w-[88%] max-w-5xl mx-auto relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-violet-950/80 via-[#100c1e] to-indigo-950/80 border border-violet-500/30 text-center relative overflow-hidden shadow-2xl">
            {/* Ambient Lighting */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Customization Available</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-white font-display tracking-tight max-w-3xl mx-auto leading-tight">
                Ready to Deploy Next-Generation AI in Your Organization?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                Schedule a 30-minute architecture review. We will evaluate your workflows, review security protocols, and synthesize a tailored AI deployment blueprint.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onNavigateToContact}
                  id="solutions-cta-talk-btn"
                  className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base shadow-xl shadow-violet-600/40 transition-all duration-200 active:scale-95 flex items-center gap-2 group"
                >
                  <span>Talk to Artify Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenSolutionBuilder}
                  id="solutions-cta-wizard-btn"
                  className="px-8 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-base border border-white/10 transition-all duration-200 active:scale-95 flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-violet-400" />
                  <span>Build Solution Blueprint</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
