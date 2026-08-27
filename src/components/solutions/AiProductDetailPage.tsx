import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Zap,
  Activity,
  Bot,
  Terminal,
  Database,
  Lock,
  Workflow,
  Clock,
  TrendingUp,
  Share2,
  ChevronRight,
  Home,
  MessageSquare,
  Scan,
  Calendar,
  Building2,
} from 'lucide-react';
import { AiProductItem } from '../../types';
import { AI_PRODUCTS, getAiProductBySlug } from '../../data/aiProductsData';
import { updatePageSeo, generateProductSeo } from '../../utils/seo';

interface AiProductDetailPageProps {
  productSlug: string;
  onBackToSolutions: () => void;
  onSelectProduct: (product: AiProductItem) => void;
  onOpenConsultant: () => void;
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
  theme?: 'dark' | 'light';
}

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Layers,
  Cpu,
  TrendingUp,
  MessageSquare,
  Scan,
  Shield,
  Terminal,
};

export const AiProductDetailPage: React.FC<AiProductDetailPageProps> = ({
  productSlug,
  onBackToSolutions,
  onSelectProduct,
  onOpenConsultant,
  onOpenSolutionBuilder,
  onNavigateToContact,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const product = getAiProductBySlug(productSlug) || AI_PRODUCTS[0];
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    'Initializing secure multi-tenant execution environment...',
    'Loading verified domain neural embeddings & schema models...',
    'Sub-10ms event telemetry bus connected: 0 anomalies detected.',
  ]);

  // Update SEO metadata dynamically (OpenGraph, Twitter Cards, Product Schema, Canonical)
  useEffect(() => {
    if (product) {
      const cleanupSeo = updatePageSeo(generateProductSeo(product));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return () => {
        cleanupSeo();
      };
    }
  }, [product]);

  // Simulated node execution ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev % product.workflow.length) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [product]);

  const IconComponent = ICON_MAP[product.icon] || Bot;
  const relatedProducts = AI_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050505] text-[#F5F5F5]'
      } transition-colors duration-300`}
    >
      {/* 1. Sticky Breadcrumb Navigation Bar */}
      <div
        className={`border-b sticky top-20 z-20 backdrop-blur-md transition-colors ${
          isLight
            ? 'bg-slate-100/90 border-slate-200'
            : 'bg-[#0a0a10]/85 border-white/[0.08]'
        }`}
      >
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb links */}
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <button
              onClick={onBackToSolutions}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <button
              onClick={onBackToSolutions}
              className="hover:text-white transition-colors"
            >
              AI Solutions
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-violet-400 font-bold">{product.name}</span>
          </div>

          <button
            onClick={onBackToSolutions}
            id="back-to-all-products-btn"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All AI Products</span>
          </button>
        </div>
      </div>

      {/* 2. Product Hero */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-white/[0.06]">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Product Info & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Badge & Category */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider font-mono-code">
                  <IconComponent className="w-4 h-4 text-violet-400" />
                  <span>{product.categoryLabel}</span>
                </div>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/[0.06] text-white border border-white/10">
                    {product.badge}
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono-code bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SLA {product.uptime}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg sm:text-2xl font-semibold text-violet-400 mt-2 font-mono-code">
                  {product.tagline}
                </p>
              </div>

              {/* Long Description */}
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                {product.longDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onNavigateToContact}
                  id="product-hero-deploy-btn"
                  className="px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-violet-600/30 transition-all duration-200 active:scale-95 flex items-center gap-2.5 group"
                >
                  <span>{product.cta.primary}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenConsultant}
                  id="product-hero-consultant-btn"
                  className="px-7 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-sm sm:text-base border border-white/10 transition-all duration-200 active:scale-95 flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-violet-400" />
                  <span>{product.cta.secondary}</span>
                </button>
              </div>

              {/* Metrics Ribbon */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/[0.08]">
                {product.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0e0e16] border border-white/[0.06]">
                    <div className="text-xl sm:text-2xl font-bold text-white font-display">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono-code truncate mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Interactive Execution Node Simulator */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0b0b12] border border-violet-500/40 p-6 shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-bold font-mono-code text-zinc-400 ml-2">
                      LIVE SYSTEM ARTIFACT
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                    RUNNING
                  </span>
                </div>

                {/* Workflow Simulation Step */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#12121d] border border-violet-500/30">
                    <div className="flex items-center justify-between text-xs font-mono-code text-violet-300 mb-1.5">
                      <span>PHASE {activeWorkflowStep} / {product.workflow.length}</span>
                      <span className="text-emerald-400 font-bold">
                        {product.workflow[activeWorkflowStep - 1]?.phase}
                      </span>
                    </div>
                    <div className="text-base font-bold text-white font-display">
                      {product.workflow[activeWorkflowStep - 1]?.title}
                    </div>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                      {product.workflow[activeWorkflowStep - 1]?.description}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] font-mono-code text-zinc-400 flex items-center justify-between">
                      <span>Artifact Produced:</span>
                      <span className="text-emerald-300 font-bold truncate max-w-[200px]">
                        {product.workflow[activeWorkflowStep - 1]?.output}
                      </span>
                    </div>
                  </div>

                  {/* Connected Systems Grid */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono-code block mb-2">
                      CONNECTED DATA STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.connectedSystems.map((sys, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 font-mono-code"
                        >
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cryptographic Verification Active</span>
                  </span>
                  <span className="font-mono-code text-[11px] text-violet-400">
                    Latency &lt; 14ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Problem & Solution Breakdown */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Problem Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0e0910] border border-red-500/30 relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span>The Challenge</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                {product.problem.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {product.problem.summary}
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                {product.problem.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#090e12] border border-emerald-500/30 relative shadow-xl shadow-emerald-950/10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span>The Artify Solution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                {product.solution.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {product.solution.summary}
              </p>
              <ul className="space-y-3 text-sm text-zinc-200">
                {product.solution.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Capabilities & Features */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Core Architectural Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Engineered for Enterprise Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-display mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {feat.metric && (
                  <div className="mt-5 pt-3 border-t border-white/[0.06] text-xs font-bold text-violet-300 font-mono-code">
                    {feat.metric}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works (Visual Workflow) */}
      <section className="py-24 border-b border-white/[0.06] bg-black/20">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Workflow className="w-3.5 h-3.5" />
              <span>Execution Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              How {product.name} Works
            </h2>
            <p className="mt-2 text-zinc-400 text-base">
              A transparent, deterministic reasoning loop: from unstructured input to verified business outcome.
            </p>
          </div>

          {/* 5-Step Pipeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {product.workflow.map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-[#0e0e16] border border-white/[0.08] hover:border-violet-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-violet-400 font-mono-code">
                      STEP 0{st.step}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 bg-white/[0.05] px-2 py-0.5 rounded">
                      {st.phase}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white font-display mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono-code text-emerald-400">
                  → {st.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Real-World Use Cases */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Proven Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Enterprise Use Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#0c0c14] border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-violet-400 font-mono-code uppercase">
                    {uc.industry}
                  </span>
                  <h4 className="text-xl font-bold text-white font-display mt-2 mb-3">
                    {uc.scenario}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {uc.outcome}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <span>Deployment Speed:</span>
                  <span className="font-bold text-emerald-400 font-mono-code">
                    {uc.timeToValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technology Stack & Security Layers */}
      <section className="py-24 border-b border-white/[0.06] bg-black/20">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Under The Hood</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Enterprise Technology Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.techStack.map((stack, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0c14] border border-white/[0.08]"
              >
                <h4 className="text-base font-bold text-white font-display mb-4">
                  {stack.layer}
                </h4>
                <ul className="space-y-2">
                  {stack.technologies.map((t, tIdx) => (
                    <li
                      key={tIdx}
                      className="text-xs font-mono-code text-zinc-300 bg-white/[0.04] px-3 py-2 rounded-lg border border-white/[0.06] flex items-center gap-2"
                    >
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Related AI Products */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold font-display text-white">
              More From The Artify AI Ecosystem
            </h3>
            <button
              onClick={onBackToSolutions}
              className="text-xs font-bold text-violet-400 hover:text-white flex items-center gap-1"
            >
              <span>View All 8 Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="p-6 rounded-2xl bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/40 cursor-pointer transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-xs font-bold text-violet-400 font-mono-code mb-1">
                  {p.categoryLabel}
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  {p.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                  {p.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-400 mt-4">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Conversion CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="w-[92%] sm:w-[88%] max-w-5xl mx-auto text-center relative z-10">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-violet-950/80 via-[#100c1e] to-indigo-950/80 border border-violet-500/30">
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-display tracking-tight leading-tight">
              Ready to Deploy {product.name}?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Talk directly with our AI architects to evaluate your data stack, schedule a custom sandbox proof-of-concept, and integrate seamlessly.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onNavigateToContact}
                id="product-footer-contact-btn"
                className="px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base shadow-xl shadow-violet-600/40 transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>Talk to Artify Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSolutionBuilder}
                id="product-footer-wizard-btn"
                className="px-8 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-base border border-white/10 transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-violet-400" />
                <span>Synthesize Custom Blueprint</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
