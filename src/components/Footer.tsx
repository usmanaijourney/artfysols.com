import React from 'react';
import {
  Bot,
  Sparkles,
  ArrowUp,
  Globe,
  Mail,
  ShieldCheck,
  Activity,
  Layers,
  LayoutDashboard,
  Lock,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AI_PRODUCTS } from '../data/aiProductsData';
import { AiProductItem } from '../types';

interface FooterProps {
  onNavigateToBlog?: () => void;
  onNavigateToAiSolutions?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToIndustries?: () => void;
  onNavigateToCaseStudies?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToLegal?: (type: 'privacy' | 'terms') => void;
  onSelectProduct?: (product: AiProductItem) => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToBlog,
  onNavigateToAiSolutions,
  onNavigateToServices,
  onNavigateToIndustries,
  onNavigateToCaseStudies,
  onNavigateToAbout,
  onNavigateToContact,
  onNavigateToLegal,
  onSelectProduct,
  onOpenSitemap,
}) => {
  const { user, openPortal, openAuthModal } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030305] border-t border-white/[0.08] pt-20 pb-12 text-zinc-400 text-xs">
      <div className="w-full px-[5%] max-w-7xl mx-auto">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-[1px]">
                <div className="w-full h-full bg-[#09090c] rounded-[11px] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-white font-display">
                  ARTIFY
                </span>
                <span className="text-base font-bold bg-gradient-to-r from-[#7822ff] via-[#6432f8] to-[#4f46e5] bg-clip-text text-transparent font-display">
                  SOLUTIONS
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-zinc-200">
              Your Business. Reimagined by AI.
            </p>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Artify Solutions is an enterprise AI product and solutions house engineering autonomous agent swarms, hybrid neural RAG engines, sub-10ms event integration meshes, and domain intelligence.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-zinc-300 font-mono-code">
                <Globe className="w-3.5 h-3.5 text-violet-400" /> artifysols.com
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300 font-mono-code">
                <Mail className="w-3.5 h-3.5 text-violet-400" /> contact@artifysols.com
              </span>
            </div>
          </div>

          {/* AI Products Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase font-mono-code tracking-wider">
                AI Products
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              {AI_PRODUCTS.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                    className="text-left text-zinc-400 hover:text-white transition-colors flex items-center justify-between w-full"
                  >
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={onNavigateToAiSolutions}
                  className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
                >
                  <span>All 8 Products</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Verticals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono-code tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateToServices}
                  className="text-left hover:text-white transition-colors"
                >
                  Enterprise Services
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToIndustries}
                  className="text-left hover:text-white transition-colors"
                >
                  Industries Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToCaseStudies}
                  className="text-left hover:text-white transition-colors"
                >
                  Case Studies & Blueprints
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToAbout}
                  className="text-left hover:text-white transition-colors"
                >
                  About & Security
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToBlog}
                  className="text-left text-violet-400 hover:text-violet-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Blog & Research</span>
                  <span className="text-[9px] bg-violet-500/20 text-violet-300 px-1 rounded font-mono-code">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToContact}
                  className="text-left hover:text-white transition-colors"
                >
                  Talk to Artify Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Client Portal Col */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono-code tracking-wider">
              Client Portal
            </h4>
            <ul className="space-y-2 text-xs">
              {user ? (
                <>
                  <li>
                    <button
                      onClick={() => openPortal('overview')}
                      className="text-left text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <LayoutDashboard className="w-3 h-3" />
                      <span>Portal Dashboard</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openPortal('subscriptions')}
                      className="text-left hover:text-white transition-colors"
                    >
                      Subscriptions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openPortal('products')}
                      className="text-left hover:text-white transition-colors"
                    >
                      Deployed Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openPortal('invoices')}
                      className="text-left hover:text-white transition-colors"
                    >
                      Billing & Invoices
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="text-left text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Client Login</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="text-left hover:text-white transition-colors"
                    >
                      Register Organization
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        if (onNavigateToAbout) onNavigateToAbout();
                        setTimeout(() => {
                          const el = document.getElementById('partner-access-policy');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-left hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Partner Access Policy</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Architecture & Telemetry */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono-code tracking-wider">
              System Telemetry
            </h4>
            <div className="p-3 rounded-xl bg-[#0a0a0f] border border-white/[0.06] space-y-2 text-[11px] font-mono-code">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300">Nodes: <strong>Active</strong></span>
              </div>
              <div className="text-zinc-400">
                SLA: <span className="text-emerald-400 font-bold">99.99%</span>
              </div>
              <div className="text-zinc-400">
                Isolation: <span className="text-violet-400 font-bold">SOC2 VPC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© {new Date().getFullYear()} Artify Solutions. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => onNavigateToLegal && onNavigateToLegal('privacy')}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateToLegal && onNavigateToLegal('terms')}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenSitemap && onOpenSitemap()}
              className="hover:text-violet-400 transition-colors underline-offset-2 hover:underline font-mono-code flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Sitemap (XML)
            </button>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-scroll-top-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-white/[0.08] hover:text-white hover:border-white/[0.2] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
