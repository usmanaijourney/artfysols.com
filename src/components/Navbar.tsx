import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Building2,
  Workflow,
  Sun,
  Moon,
  Lock,
  LayoutDashboard,
  LogIn,
  FileText,
  ChevronRight,
  ChevronDown,
  Sliders,
  Terminal,
  Info,
  TrendingUp,
  MessageSquare,
  Scan,
  BookOpen,
  Mail,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AiProductItem } from '../types';
import { AI_PRODUCTS } from '../data/aiProductsData';
import { NavbarSearch } from './NavbarSearch';

interface NavbarProps {
  onOpenSolutionBuilder: () => void;
  onOpenConsultant: () => void;
  onNavigateToContact: () => void;
  onNavigateToBlog?: () => void;
  onNavigateToAiSolutions?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToIndustries?: () => void;
  onNavigateToCaseStudies?: () => void;
  onNavigateToAbout?: () => void;
  onSelectProduct?: (product: AiProductItem) => void;
  activeRoute?: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const PRODUCT_ICONS: Record<string, React.ElementType> = {
  Bot,
  Layers,
  Cpu,
  TrendingUp,
  MessageSquare,
  Scan,
  Shield,
  Terminal,
};

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSolutionBuilder,
  onOpenConsultant,
  onNavigateToContact,
  onNavigateToBlog,
  onNavigateToAiSolutions,
  onNavigateToServices,
  onNavigateToIndustries,
  onNavigateToCaseStudies,
  onNavigateToAbout,
  onSelectProduct,
  activeRoute = 'home',
  theme,
  onToggleTheme,
}) => {
  const { user, openPortal, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile side menu is active
  useEffect(() => {
    if (sideMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSideMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [sideMenuOpen]);

  const handleRouteClick = (e: React.MouseEvent, routeAction?: () => void) => {
    if (routeAction) {
      e.preventDefault();
      routeAction();
      setSideMenuOpen(false);
      setSolutionsDropdownOpen(false);
    }
  };

  const handleProductSelect = (product: AiProductItem) => {
    if (onSelectProduct) {
      onSelectProduct(product);
      setSideMenuOpen(false);
      setSolutionsDropdownOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-slate-900/5 py-2.5 sm:py-3'
            : 'bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[5%] xl:px-[7%] flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            if (activeRoute !== 'home' && onNavigateToAbout) {
              // Navigate back to home
              window.location.hash = 'hero';
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none shrink-0"
          id="brand-logo"
        >
          <div className="relative w-9 h-9 sm:w-[40px] sm:h-[40px] rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-[1px] shadow-lg shadow-violet-600/30 group-hover:shadow-violet-500/50 transition-all duration-300">
            <div className={`w-full h-full ${isLight ? 'bg-white' : 'bg-[#09090c]'} rounded-[13px] flex items-center justify-center`}>
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-violet-500"></span>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className={`text-[17px] sm:text-[20px] font-bold tracking-tight font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                ARTIFY
              </span>
              <span className="text-[17px] sm:text-[20px] font-bold tracking-tight bg-gradient-to-r from-[#7822ff] via-[#6432f8] to-[#4f46e5] bg-clip-text text-transparent font-display">
                SOLUTIONS
              </span>
            </div>
            <span
              className={`text-[10px] sm:text-[12px] font-['Georgia',_serif] italic font-normal tracking-wide -mt-0.5 bg-gradient-to-r ${
                isLight
                  ? 'from-violet-700 via-indigo-600 to-sky-600'
                  : 'from-violet-400 via-indigo-300 to-sky-400'
              } bg-clip-text text-transparent`}
            >
              AI Powered Future Solutions
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (>= 768px) with AI Solutions Mega Dropdown */}
        <nav
          aria-label="Main Navigation"
          className={`hidden md:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3.5 border rounded-full px-3 sm:px-4 lg:px-5 xl:px-6 py-2 backdrop-blur-md shadow-inner transition-all duration-200 ${
            isLight
              ? 'bg-slate-100/90 border-slate-200/90'
              : 'bg-[#0d0d12]/75 border-white/[0.08]'
          }`}
        >
          {/* AI Solutions Dropdown Trigger */}
          <div className="static" ref={dropdownRef}>
            <button
              onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              id="nav-ai-solutions-dropdown-btn"
              className={`text-xs lg:text-[13px] xl:text-[13.5px] font-semibold px-3 lg:px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeRoute === 'ai-solutions' || activeRoute === 'product-detail'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : solutionsDropdownOpen
                  ? isLight
                    ? 'bg-slate-200 text-slate-950'
                    : 'bg-white/[0.1] text-white'
                  : isLight
                  ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>AI Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* AI Solutions Mega Dropdown Menu */}
            {solutionsDropdownOpen && (
              <div
                id="nav-menu-container"
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
                className={`absolute top-full mt-2 sm:mt-2.5 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] max-w-7xl max-h-[calc(100vh-5.5rem)] overflow-y-auto p-5 sm:p-7 rounded-2xl sm:rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-200 animate-in fade-in zoom-in-95 z-50 ${
                  isLight
                    ? 'bg-white/98 border-slate-200/90 shadow-slate-900/15 text-slate-900'
                    : 'bg-[#0c0c14]/98 border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-white'
                }`}
              >
                {/* Mega Menu Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/[0.08] gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-400 font-mono-code">
                      ENTERPRISE AI PRODUCT SUITE
                    </span>
                    <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono-code">
                      8 Autonomous Engines
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <button
                      onClick={(e) => handleRouteClick(e, onNavigateToAiSolutions)}
                      className="font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Full Solutions Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4-Column Product Grid in Expanded Mega Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
                  {AI_PRODUCTS.map((prod) => {
                    const Icon = PRODUCT_ICONS[prod.icon] || Bot;
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleProductSelect(prod)}
                        className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                          isLight
                            ? 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-violet-400 hover:shadow-md'
                            : 'bg-[#11111a]/60 border-white/[0.05] hover:bg-[#161624] hover:border-violet-500/40 hover:shadow-[0_4px_20px_rgba(120,34,255,0.12)]'
                        } group`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-violet-600/30 transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold font-mono-code text-violet-400/90 uppercase">
                              {prod.categoryLabel}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[13px] font-bold font-display group-hover:text-violet-300 transition-colors">
                              {prod.name}
                            </span>
                            {prod.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 font-mono-code shrink-0">
                                {prod.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mt-1">
                            {prod.tagline}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[10.5px]">
                          <span className="text-zinc-400 font-mono-code">
                            {prod.uptime || '99.99% SLA'}
                          </span>
                          <span className="text-violet-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            <span>Inspect</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dropdown Footer with Architecture CTA */}
                <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-zinc-400 text-[11px] font-mono-code flex-wrap">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      SOC2 Type II Certified
                    </span>
                    <span>•</span>
                    <span>Private VPC Isolation</span>
                    <span>•</span>
                    <span>Zero Data Retention</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        setSolutionsDropdownOpen(false);
                        onOpenConsultant();
                      }}
                      className="px-3 py-1.5 rounded-lg border border-white/[0.1] hover:border-violet-400/50 hover:bg-white/[0.04] text-zinc-300 hover:text-white font-medium text-[11.5px] transition-all"
                    >
                      AI Architecture Advisor
                    </button>
                    <button
                      onClick={() => {
                        setSolutionsDropdownOpen(false);
                        onOpenSolutionBuilder();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold flex items-center gap-1.5 text-[11.5px] shadow-md shadow-violet-600/30 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run Solution Blueprint Wizard</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Services Link */}
          <button
            onClick={(e) => handleRouteClick(e, onNavigateToServices)}
            className={`text-xs lg:text-[13px] xl:text-[13.5px] font-medium px-3 lg:px-3.5 xl:px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeRoute === 'services'
                ? 'bg-violet-600 text-white shadow-md'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Services
          </button>

          {/* Industries Link */}
          <button
            onClick={(e) => handleRouteClick(e, onNavigateToIndustries)}
            className={`text-xs lg:text-[13px] xl:text-[13.5px] font-medium px-3 lg:px-3.5 xl:px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeRoute === 'industries'
                ? 'bg-violet-600 text-white shadow-md'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Industries
          </button>

          {/* Case Studies Link */}
          <button
            onClick={(e) => handleRouteClick(e, onNavigateToCaseStudies)}
            className={`text-xs lg:text-[13px] xl:text-[13.5px] font-medium px-3 lg:px-3.5 xl:px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeRoute === 'case-studies'
                ? 'bg-violet-600 text-white shadow-md'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Case Studies
          </button>

          {/* About Link */}
          <button
            onClick={(e) => handleRouteClick(e, onNavigateToAbout)}
            className={`text-xs lg:text-[13px] xl:text-[13.5px] font-medium px-3 lg:px-3.5 xl:px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeRoute === 'about'
                ? 'bg-violet-600 text-white shadow-md'
                : isLight
                ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            About
          </button>

          {/* Blog & News Link */}
          <button
            onClick={(e) => handleRouteClick(e, onNavigateToBlog)}
            className={`text-xs lg:text-[13px] xl:text-[13.5px] font-semibold px-3.5 lg:px-4 xl:px-4.5 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeRoute === 'blog'
                ? 'bg-violet-600 text-white shadow-md'
                : isLight
                ? 'text-violet-900 bg-violet-200/80 hover:bg-violet-300'
                : 'text-violet-200 bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span>Blog & News</span>
          </button>
        </nav>

        {/* Desktop Right Controls (>= 768px) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
          {/* Universal AI Search Bar with ⌘K */}
          <NavbarSearch
            theme={theme}
            onSelectProduct={handleProductSelect}
            onNavigateToServices={onNavigateToServices}
            onNavigateToBlog={onNavigateToBlog}
            onNavigateToIndustries={onNavigateToIndustries}
            onNavigateToAiSolutions={onNavigateToAiSolutions}
            onOpenConsultant={onOpenConsultant}
            onOpenSolutionBuilder={onOpenSolutionBuilder}
          />

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            id="nav-theme-toggle-btn"
            className={`flex items-center justify-center p-2 rounded-lg border transition-all shadow-sm focus:outline-none ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-[#131318] hover:bg-[#1c1c24] border-white/[0.08] text-zinc-300 hover:text-white'
            }`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-violet-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* AI Interactive Demo */}
          <button
            onClick={onOpenConsultant}
            id="nav-interactive-ai-btn"
            className={`hidden xl:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all shadow-sm ${
              isLight
                ? 'text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-200'
                : 'text-zinc-300 hover:text-white bg-[#131318] hover:bg-[#1c1c24] border-white/[0.08]'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>AI Advisor</span>
          </button>

          {/* Contact / Build With AI Button */}
          <button
            onClick={(e) => handleRouteClick(e, onNavigateToContact)}
            id="nav-build-with-ai-btn"
            className={`group relative inline-flex items-center gap-1.5 text-xs font-semibold px-3 lg:px-3.5 py-2 rounded-lg border shadow-sm transition-all active:scale-[0.98] ${
              activeRoute === 'contact'
                ? 'bg-violet-600 text-white border-violet-500 shadow-md'
                : isLight
                ? 'text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-200'
                : 'text-zinc-200 hover:text-white bg-[#131318] hover:bg-[#1c1c24] border-white/[0.1]'
            }`}
          >
            <span>Talk to Us</span>
            <ArrowRight className="w-3.5 h-3.5 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Client Portal / Login Button */}
          {user ? (
            <button
              onClick={() => openPortal('overview')}
              id="nav-client-portal-btn"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-semibold shadow-md transition-all group ${
                isLight
                  ? 'bg-violet-50 hover:bg-violet-100 border-violet-300 text-slate-900 shadow-violet-200'
                  : 'bg-[#151522] hover:bg-violet-950/70 border-violet-500/40 text-white shadow-violet-950/30 hover:border-violet-400/60'
              }`}
              title="Open Client Portal & Dashboard"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-inner">
                {user.name.slice(0, 1)}
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-[11px] font-bold truncate max-w-[90px] ${isLight ? 'text-slate-800' : 'text-zinc-100 group-hover:text-violet-200'}`}>
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-[9px] text-violet-500 dark:text-violet-400 font-mono-code leading-none">
                  Portal
                </span>
              </div>
              <LayoutDashboard className="w-3.5 h-3.5 text-violet-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              id="nav-client-login-btn"
              className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 border border-violet-400/30 px-3.5 py-2 rounded-lg shadow-md shadow-violet-600/30 hover:shadow-violet-600/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Client & Executive Login"
            >
              <LogIn className="w-3.5 h-3.5 text-violet-200" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Header Controls (< 768px) */}
        <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Search Button */}
          <NavbarSearch
            theme={theme}
            isMobileCompact={true}
            onSelectProduct={handleProductSelect}
            onNavigateToServices={onNavigateToServices}
            onNavigateToBlog={onNavigateToBlog}
            onNavigateToIndustries={onNavigateToIndustries}
            onNavigateToAiSolutions={onNavigateToAiSolutions}
            onOpenConsultant={onOpenConsultant}
            onOpenSolutionBuilder={onOpenSolutionBuilder}
          />

          {user ? (
            <button
              onClick={() => openPortal('overview')}
              id="mobile-nav-quick-portal"
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border shadow-sm ${
                isLight
                  ? 'bg-violet-50 border-violet-200 text-violet-800'
                  : 'bg-violet-950/70 border-violet-500/40 text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px]">Portal</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              id="mobile-nav-quick-login"
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 px-2.5 py-1.5 rounded-lg shadow-sm shadow-violet-600/30"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="text-[11px]">Login</span>
            </button>
          )}

          {/* Hamburger Trigger Button */}
          <button
            onClick={() => setSideMenuOpen(true)}
            id="mobile-hamburger-btn"
            className={`p-2 rounded-xl border transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/40 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                : 'bg-[#121217] hover:bg-[#1a1a24] border-white/[0.1] text-zinc-200 hover:text-white'
            }`}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-current" />
          </button>
        </div>
      </div>

      {/* Hamburger-Style Side Navigation Drawer (< 768px) */}
      {sideMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSideMenuOpen(false)}
            aria-hidden="true"
          />

          <aside
            id="mobile-side-nav-drawer"
            className={`fixed inset-y-0 right-0 z-50 w-[86vw] max-w-[360px] flex flex-col justify-between shadow-2xl transition-transform transform translate-x-0 border-l animate-in slide-in-from-right duration-300 ease-out ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#09090f] border-white/[0.1] text-zinc-100'
            }`}
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 ${
              isLight ? 'border-slate-100 bg-slate-50/50' : 'border-white/[0.08] bg-[#0d0d16]/50'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-600/30 text-white font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className={`text-base font-bold tracking-tight font-display ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      ARTIFY
                    </span>
                    <span className="text-base font-bold tracking-tight bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent font-display">
                      SOLUTIONS
                    </span>
                  </div>
                  <span className={`text-[10px] block font-['Georgia',_serif] italic ${isLight ? 'text-violet-700' : 'text-violet-400'}`}>
                    AI-Native Enterprise Engineering
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSideMenuOpen(false)}
                id="close-side-nav-btn"
                className={`p-2 rounded-xl border transition-all active:scale-95 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-[#151520] hover:bg-[#1f1f2e] border-white/[0.1] text-zinc-300 hover:text-white'
                }`}
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {/* Universal Search in Drawer */}
              <div>
                <NavbarSearch
                  theme={theme}
                  className="w-full"
                  onSelectProduct={(p) => {
                    setSideMenuOpen(false);
                    handleProductSelect(p);
                  }}
                  onNavigateToServices={() => {
                    setSideMenuOpen(false);
                    onNavigateToServices?.();
                  }}
                  onNavigateToBlog={() => {
                    setSideMenuOpen(false);
                    onNavigateToBlog?.();
                  }}
                  onNavigateToIndustries={() => {
                    setSideMenuOpen(false);
                    onNavigateToIndustries?.();
                  }}
                  onNavigateToAiSolutions={() => {
                    setSideMenuOpen(false);
                    onNavigateToAiSolutions?.();
                  }}
                  onOpenConsultant={() => {
                    setSideMenuOpen(false);
                    onOpenConsultant();
                  }}
                  onOpenSolutionBuilder={() => {
                    setSideMenuOpen(false);
                    onOpenSolutionBuilder();
                  }}
                />
              </div>

              {/* Navigation Items */}
              <div className="space-y-1">
                {/* AI Solutions Accordion */}
                <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between p-3 text-left font-semibold text-xs text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span>AI Solutions & Products</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileProductsOpen && (
                    <div className="p-2 pt-0 space-y-1 border-t border-white/[0.06] bg-black/30">
                      <button
                        onClick={(e) => handleRouteClick(e, onNavigateToAiSolutions)}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-violet-400 hover:bg-violet-600/20"
                      >
                        → All AI Solutions Overview
                      </button>
                      {AI_PRODUCTS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleProductSelect(p)}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-white/[0.06] flex items-center justify-between"
                        >
                          <span>{p.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono-code">{p.categoryLabel}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Services */}
                <button
                  onClick={(e) => handleRouteClick(e, onNavigateToServices)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span>Enterprise Services</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>

                {/* Industries */}
                <button
                  onClick={(e) => handleRouteClick(e, onNavigateToIndustries)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-violet-400" />
                    <span>Industry Solutions (14 Sectors)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>

                {/* Case Studies */}
                <button
                  onClick={(e) => handleRouteClick(e, onNavigateToCaseStudies)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-violet-400" />
                    <span>Case Studies & Architectures</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>

                {/* About */}
                <button
                  onClick={(e) => handleRouteClick(e, onNavigateToAbout)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-violet-400" />
                    <span>About & Security</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </button>

                {/* Blog */}
                <button
                  onClick={(e) => handleRouteClick(e, onNavigateToBlog)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold bg-violet-600/20 text-violet-300 border border-violet-500/30"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-violet-400" />
                    <span>Blog & Research</span>
                  </div>
                  <span className="text-[10px] font-mono-code bg-violet-500/40 px-2 py-0.5 rounded">NEW</span>
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="pt-2">
                <button
                  onClick={onToggleTheme}
                  id="drawer-theme-toggle-btn"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-[#12121a] text-zinc-200 text-xs font-semibold"
                >
                  <div className="flex items-center gap-2.5">
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-violet-600" />}
                    <span>{theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-white/[0.08] space-y-2.5 bg-[#0d0d16]/70">
              <button
                onClick={() => {
                  setSideMenuOpen(false);
                  onOpenSolutionBuilder();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/[0.1] bg-[#151520] text-zinc-200 text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Interactive Solution Wizard</span>
              </button>

              <button
                onClick={(e) => handleRouteClick(e, onNavigateToContact)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-violet-600 text-white font-semibold text-xs shadow-lg shadow-violet-600/30"
              >
                <span>Talk to Artify Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
