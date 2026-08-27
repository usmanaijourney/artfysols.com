import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStatement } from './components/TrustStatement';
import { WhatWeBuild } from './components/WhatWeBuild';
import { AiAgentsSection } from './components/AiAgentsSection';
import { AiOrchestration } from './components/AiOrchestration';
import { IndustryExplorer } from './components/IndustryExplorer';
import { SolutionsByFunction } from './components/SolutionsByFunction';
import { ArtifyDifference } from './components/ArtifyDifference';
import { DevelopmentMethodology } from './components/DevelopmentMethodology';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AiCommandCenter } from './components/AiCommandCenter';
import { IntegrationsEcosystem } from './components/IntegrationsEcosystem';
import { SecurityAndGovernance } from './components/SecurityAndGovernance';
import { HumanPlusAi } from './components/HumanPlusAi';
import { CustomizationShowcase } from './components/CustomizationShowcase';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TechnologyStack } from './components/TechnologyStack';
import { AboutAndVision } from './components/AboutAndVision';
import { ContactAndBrief } from './components/ContactAndBrief';
import { Footer } from './components/Footer';
import { InteractiveAiConsultant } from './components/InteractiveAiConsultant';
import { SolutionBuilderWizard } from './components/SolutionBuilderWizard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/portal/AuthModal';
import { ClientPortal } from './components/portal/ClientPortal';
import { BlogPage } from './components/blog/BlogPage';
import { BlogPreviewSection } from './components/BlogPreviewSection';
import { AiSolutionsPage } from './components/solutions/AiSolutionsPage';
import { AiProductDetailPage } from './components/solutions/AiProductDetailPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { IndustriesPage } from './components/pages/IndustriesPage';
import { CaseStudiesPage } from './components/pages/CaseStudiesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { SitemapModal } from './components/SitemapModal';
import { Bot, Sparkles, ArrowRight, MessageSquare, Zap, Cpu, Layers } from 'lucide-react';
import { playHoverSound } from './utils/soundEffects';
import { safeGetLocalStorage, safeSetLocalStorage } from './utils/storage';
import { ConsultantMessage, AiProductItem, AppRoute } from './types';
import { AI_PRODUCTS, getAiProductBySlug } from './data/aiProductsData';
import { updatePageSeo } from './utils/seo';

function MainAppContent() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = safeGetLocalStorage('artify_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  // Dynamic Route State
  const [activeRoute, setActiveRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#ai-solutions/')) return 'product-detail';
      if (hash === '#ai-solutions') return 'ai-solutions';
      if (hash === '#services') return 'services';
      if (hash === '#industries-page') return 'industries';
      if (hash === '#case-studies-page') return 'case-studies';
      if (hash === '#about-page') return 'about';
      if (hash === '#contact-page') return 'contact';
      if (hash === '#privacy-policy') return 'privacy';
      if (hash === '#terms') return 'terms';
      if (hash.startsWith('#blog')) return 'blog';
    }
    return 'home';
  });

  const [activeProductSlug, setActiveProductSlug] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#ai-solutions/')) {
      return window.location.hash.replace('#ai-solutions/', '');
    }
    return AI_PRODUCTS[0].slug;
  });

  const { isPortalOpen, isAuthModalOpen } = useAuth();

  // Listen to hash changes for browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;

      if (hash.startsWith('#ai-solutions/')) {
        const slug = hash.replace('#ai-solutions/', '');
        setActiveProductSlug(slug);
        setActiveRoute('product-detail');
      } else if (hash === '#ai-solutions') {
        setActiveRoute('ai-solutions');
        updatePageSeo({
          title: 'AI Solutions Built for the Next Generation of Business',
          description: 'Explore the full Artify Solutions AI product suite, autonomous agent swarms, and enterprise neural RAG engines.',
          canonicalUrl: 'https://artifysols.com/ai-solutions',
        });
      } else if (hash === '#services') {
        setActiveRoute('services');
      } else if (hash === '#industries-page') {
        setActiveRoute('industries');
      } else if (hash === '#case-studies-page') {
        setActiveRoute('case-studies');
      } else if (hash === '#about-page') {
        setActiveRoute('about');
      } else if (hash === '#contact-page') {
        setActiveRoute('contact');
      } else if (hash === '#privacy-policy') {
        setActiveRoute('privacy');
      } else if (hash === '#terms') {
        setActiveRoute('terms');
      } else if (hash.startsWith('#blog')) {
        setActiveRoute('blog');
      } else if (
        hash === '' ||
        hash === '#hero' ||
        hash === '#what-we-build' ||
        hash === '#ai-agents' ||
        hash === '#orchestration' ||
        hash === '#industries' ||
        hash === '#functions' ||
        hash === '#methodology' ||
        hash === '#command-center' ||
        hash === '#about' ||
        hash === '#contact'
      ) {
        setActiveRoute('home');
        updatePageSeo({
          title: 'Artify Solutions - Enterprise AI Products & Autonomous Systems Architecture',
          description: 'Artify Solutions transforms business operations with autonomous AI agent swarms, hybrid neural RAG engines, and real-time enterprise event meshes.',
          canonicalUrl: 'https://artifysols.com',
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'light') {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
        safeSetLocalStorage('artify_theme', 'light');
      } else {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
        safeSetLocalStorage('artify_theme', 'dark');
      }
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [builderInitialIndustry, setBuilderInitialIndustry] = useState<string | undefined>(undefined);
  const [prefilledBrief, setPrefilledBrief] = useState<any>(null);
  const [isHoveringLauncher, setIsHoveringLauncher] = useState(false);
  const [consultantMessages, setConsultantMessages] = useState<ConsultantMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello! I am the Artify AI Architectural Advisor. Tell me about your organization, your most time-consuming operational workflows, or what you'd like to automate—and I'll synthesize a custom AI-native architecture blueprint for you.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How can AI automate our multi-entity invoice approval and reconciliation workflow?',
        'We manage 400 real estate properties—how can AI coordinate maintenance and tenant requests?',
        'How would an AI agent workforce connect our NetSuite ERP and Salesforce CRM?',
        'We want an executive conversational BI dashboard to query revenue and inventory in real time.',
      ],
    },
  ]);

  const handleOpenSolutionBuilder = (industryId?: string) => {
    setBuilderInitialIndustry(industryId);
    setIsBuilderOpen(true);
  };

  const navigateToRoute = (route: AppRoute, hash: string) => {
    setActiveRoute(route);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: AiProductItem) => {
    setActiveProductSlug(product.slug);
    setActiveRoute('product-detail');
    window.location.hash = `#ai-solutions/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductBySlug = (slug: string) => {
    const prod = getAiProductBySlug(slug);
    if (prod) {
      handleSelectProduct(prod);
    } else {
      setActiveProductSlug(slug);
      setActiveRoute('product-detail');
      window.location.hash = `#ai-solutions/${slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToContact = (customBrief?: any) => {
    if (customBrief) {
      setPrefilledBrief(customBrief);
    }
    if (activeRoute === 'home') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigateToRoute('contact', '#contact-page');
  };

  const handleNavigateToCapabilities = () => {
    navigateToRoute('ai-solutions', '#ai-solutions');
  };

  const handleCompleteBrief = (brief: any) => {
    setPrefilledBrief(brief);
    handleNavigateToContact();
  };

  // If Client Portal is open, display the Client Portal
  if (isPortalOpen) {
    return (
      <div className={theme === 'light' ? 'theme-light' : 'theme-dark'}>
        <ClientPortal theme={theme} onToggleTheme={handleToggleTheme} />
        {isAuthModalOpen && <AuthModal theme={theme} />}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === 'light'
          ? 'theme-light bg-[#F8FAFC] text-slate-900'
          : 'theme-dark bg-[#050505] text-[#F5F5F5]'
      } selection:bg-violet-600 selection:text-white relative transition-colors duration-300`}
    >
      {/* Global Sticky Navigation with Mega-Menu */}
      <Navbar
        onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
        onOpenConsultant={() => setIsConsultantOpen(true)}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToAiSolutions={() => navigateToRoute('ai-solutions', '#ai-solutions')}
        onNavigateToServices={() => navigateToRoute('services', '#services')}
        onNavigateToIndustries={() => navigateToRoute('industries', '#industries-page')}
        onNavigateToCaseStudies={() => navigateToRoute('case-studies', '#case-studies-page')}
        onNavigateToAbout={() => navigateToRoute('about', '#about-page')}
        onNavigateToBlog={() => navigateToRoute('blog', '#blog')}
        onSelectProduct={handleSelectProduct}
        activeRoute={activeRoute}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Multi-Page Dynamic Switch */}
      <main>
        {activeRoute === 'ai-solutions' && (
          <AiSolutionsPage
            onSelectProduct={handleSelectProduct}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
            onNavigateToContact={handleNavigateToContact}
            theme={theme}
          />
        )}

        {activeRoute === 'product-detail' && (
          <AiProductDetailPage
            productSlug={activeProductSlug}
            onBackToSolutions={() => navigateToRoute('ai-solutions', '#ai-solutions')}
            onSelectProduct={handleSelectProduct}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
            onNavigateToContact={handleNavigateToContact}
            theme={theme}
          />
        )}

        {activeRoute === 'services' && (
          <ServicesPage
            onOpenConsultant={() => setIsConsultantOpen(true)}
            onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
            onNavigateToContact={handleNavigateToContact}
            onNavigateToAiSolutions={() => navigateToRoute('ai-solutions', '#ai-solutions')}
            theme={theme}
          />
        )}

        {activeRoute === 'industries' && (
          <IndustriesPage
            onOpenSolutionBuilder={(id) => handleOpenSolutionBuilder(id)}
            onNavigateToContact={handleNavigateToContact}
            theme={theme}
          />
        )}

        {activeRoute === 'case-studies' && (
          <CaseStudiesPage
            onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
            onNavigateToContact={handleNavigateToContact}
            theme={theme}
          />
        )}

        {activeRoute === 'about' && (
          <AboutPage
            onNavigateToContact={handleNavigateToContact}
            onNavigateToAiSolutions={() => navigateToRoute('ai-solutions', '#ai-solutions')}
            theme={theme}
          />
        )}

        {activeRoute === 'contact' && (
          <ContactPage
            prefilledBrief={prefilledBrief}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            theme={theme}
          />
        )}

        {activeRoute === 'privacy' && <LegalPage type="privacy" theme={theme} />}

        {activeRoute === 'terms' && <LegalPage type="terms" theme={theme} />}

        {activeRoute === 'blog' && (
          <BlogPage
            theme={theme}
            onBackToHome={() => navigateToRoute('home', '#hero')}
            onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {activeRoute === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
              onOpenConsultant={() => setIsConsultantOpen(true)}
              onNavigateToCapabilities={handleNavigateToCapabilities}
              onNavigateToContact={handleNavigateToContact}
            />

            {/* 2. Featured AI Products Showcase Ribbon on Homepage */}
            <section className="py-20 border-b border-white/[0.06] bg-black/40">
              <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Enterprise Product Suite</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
                      Featured AI Solutions
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
                      Explore our top enterprise-ready autonomous AI products engineered for mission-critical operations.
                    </p>
                  </div>

                  <button
                    onClick={() => navigateToRoute('ai-solutions', '#ai-solutions')}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 self-start md:self-auto transition-all"
                  >
                    <span>View All 8 AI Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {AI_PRODUCTS.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="p-6 rounded-2xl bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 font-mono-code">
                            {product.categoryLabel}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 font-mono-code">
                            {product.uptime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white font-display group-hover:text-violet-300 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-violet-400/90 font-mono-code mt-1">
                          {product.tagline}
                        </p>
                        <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-300 font-mono-code">
                          {product.metrics[0]?.value}
                        </span>
                        <span className="text-violet-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Trust Statement */}
            <TrustStatement />

            {/* 4. What We Build */}
            <WhatWeBuild
              onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
              onNavigateToContact={handleNavigateToContact}
            />

            {/* 5. AI Agents */}
            <AiAgentsSection />

            {/* 6. AI Orchestration */}
            <AiOrchestration />

            {/* 7. Industries Matrix */}
            <IndustryExplorer
              onOpenSolutionBuilder={(id) => handleOpenSolutionBuilder(id)}
              onNavigateToContact={handleNavigateToContact}
            />

            {/* 8. Solutions by Business Function */}
            <SolutionsByFunction
              onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
              onNavigateToContact={handleNavigateToContact}
            />

            {/* 9. The Artify Difference */}
            <ArtifyDifference />

            {/* 10. Development Methodology */}
            <DevelopmentMethodology onNavigateToContact={handleNavigateToContact} />

            {/* 11. Before / After Comparison */}
            <BeforeAfterSlider />

            {/* 12. AI Command Center */}
            <AiCommandCenter />

            {/* 13. Integrations Ecosystem */}
            <IntegrationsEcosystem />

            {/* 14. Security & Governance */}
            <SecurityAndGovernance />

            {/* 15. Human + AI Collaboration */}
            <HumanPlusAi />

            {/* 16. Customization Showcase */}
            <CustomizationShowcase />

            {/* 17. Case Studies */}
            <CaseStudiesSection
              onOpenSolutionBuilder={() => handleOpenSolutionBuilder()}
              onNavigateToContact={handleNavigateToContact}
            />

            {/* 18. Technology Stack */}
            <TechnologyStack />

            {/* 19. Blog Preview */}
            <BlogPreviewSection
              onNavigateToBlog={() => navigateToRoute('blog', '#blog')}
            />

            {/* 20. About & Vision */}
            <AboutAndVision onNavigateToContact={handleNavigateToContact} />

            {/* 21. Contact & Brief */}
            <ContactAndBrief prefilledBrief={prefilledBrief} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateToBlog={() => navigateToRoute('blog', '#blog')}
        onNavigateToAiSolutions={() => navigateToRoute('ai-solutions', '#ai-solutions')}
        onNavigateToServices={() => navigateToRoute('services', '#services')}
        onNavigateToIndustries={() => navigateToRoute('industries', '#industries-page')}
        onNavigateToCaseStudies={() => navigateToRoute('case-studies', '#case-studies-page')}
        onNavigateToAbout={() => navigateToRoute('about', '#about-page')}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToLegal={(type) => navigateToRoute(type, `#${type === 'privacy' ? 'privacy-policy' : 'terms'}`)}
        onSelectProduct={handleSelectProduct}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Dynamic XML Sitemap Inspector Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onNavigateToProduct={(slug) => {
          setIsSitemapOpen(false);
          handleSelectProductBySlug(slug);
        }}
        onNavigateToBlog={(slug) => {
          setIsSitemapOpen(false);
          navigateToRoute('blog', `#blog/${slug}`);
        }}
      />

      {/* Interactive AI Consultant Modal */}
      <InteractiveAiConsultant
        isOpen={isConsultantOpen}
        onClose={() => setIsConsultantOpen(false)}
        messages={consultantMessages}
        onMessagesChange={setConsultantMessages}
      />

      {/* Solution Builder Wizard Modal */}
      <SolutionBuilderWizard
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        initialIndustryId={builderInitialIndustry}
        onCompleteBrief={handleCompleteBrief}
      />

      {/* Auth Modal */}
      <AuthModal theme={theme} />

      {/* Floating Quick Action Launcher */}
      <div
        className="fixed bottom-6 right-6 z-40 flex items-center"
        onMouseEnter={() => {
          setIsHoveringLauncher(true);
          playHoverSound();
        }}
        onMouseLeave={() => setIsHoveringLauncher(false)}
      >
        {isHoveringLauncher && !isConsultantOpen && (
          <div
            onClick={() => setIsConsultantOpen(true)}
            className="absolute bottom-full right-0 mb-3.5 w-80 sm:w-[340px] p-4 rounded-2xl bg-[#0c0c14]/95 border border-violet-500/30 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(139,92,246,0.2)] text-left cursor-pointer transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 z-50 group/card"
          >
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-violet-300">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white font-display">Artify AI Advisor</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{consultantMessages.length > 1 ? 'Active Session' : 'Ready'}</span>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {consultantMessages.length > 1 ? (
                <>
                  <div className="text-[10px] uppercase font-mono-code tracking-wider text-violet-300/90 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-violet-400" />
                    <span>Latest AI Blueprint Response</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-normal line-clamp-3 leading-relaxed">
                    {[...consultantMessages].reverse().find((m) => m.role === 'assistant')?.content ||
                      consultantMessages[0].content}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                    Describe your business workflow to synthesize a custom AI-native architecture in seconds.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-violet-300 bg-violet-950/40 border border-violet-700/30 px-2.5 py-1 rounded-lg font-mono-code w-full">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span className="truncate">"Automate multi-entity reconciliation"</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-medium text-violet-300 group-hover/card:text-violet-200">
              <span>{consultantMessages.length > 1 ? 'Resume conversation' : 'Launch interactive demo'}</span>
              <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover/card:translate-x-1" />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsConsultantOpen(true)}
          id="floating-ai-demo-btn"
          className="group flex items-center gap-2.5 hover:gap-3 px-4 hover:px-5 py-3 rounded-full bg-[#111118]/90 hover:bg-[#181824] border border-violet-500/40 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-violet-400"
          title="Open Artify AI Demo"
        >
          <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-600/40 shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Bot className="w-[17px] h-[17px]" />
          </div>
          <span className="text-xs font-bold font-display whitespace-nowrap tracking-tight group-hover:tracking-wide transition-all duration-300">
            Test AI Demo
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse -ml-0.5 shrink-0" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
