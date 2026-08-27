import React from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  Server,
  FileCode,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  Cpu,
  Info,
  Clock,
  Terminal,
} from 'lucide-react';

interface AboutPartnerAccessSectionProps {
  onOpenPartnerModal: () => void;
  onNavigateToContact: () => void;
  theme?: 'dark' | 'light';
}

export const AboutPartnerAccessSection: React.FC<AboutPartnerAccessSectionProps> = ({
  onOpenPartnerModal,
  onNavigateToContact,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <section
      id="partner-access-policy"
      className={`py-20 border-t relative overflow-hidden transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-slate-50/50 via-white to-slate-50/80 border-slate-200'
          : 'bg-gradient-to-b from-[#08080e] via-[#050508] to-[#0a0a10] border-white/[0.08]'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5 text-violet-400" />
            <span>ENTERPRISE BACKEND GOVERNANCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white">
            Backend & Client Portal Access Policy
          </h2>

          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            The Artify Solutions Client Portal, autonomous agent orchestrator, and real-time backend APIs (<code className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 font-mono-code text-xs">/api/v1/*</code>) are strictly reserved for contracted enterprise partners and active clients.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Protected Infrastructure */}
          <div
            className={`p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between ${
              isLight
                ? 'bg-white border-slate-200 hover:border-violet-300 shadow-lg shadow-slate-200/50'
                : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/40'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center mb-5">
                <Server className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-violet-400 block mb-1">
                ISOLATED ARCHITECTURE
              </span>
              <h3 className="text-xl font-bold text-white font-display mb-3">
                Restricted Execution Runtime
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                To guarantee zero noisy-neighbor degradation and maintain sub-40ms agentic reasoning, all coworker swarms execute inside isolated tenant VPCs with dedicated vector storage.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-violet-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Memory Pools</span>
            </div>
          </div>

          {/* Card 2: Role-Based Control */}
          <div
            className={`p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between ${
              isLight
                ? 'bg-white border-slate-200 hover:border-violet-300 shadow-lg shadow-slate-200/50'
                : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/40'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mb-5">
                <Key className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                ZERO-TRUST PROTOCOL
              </span>
              <h3 className="text-xl font-bold text-white font-display mb-3">
                Cryptographic RBAC Scoping
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Every backend request requires verified SHA-256 session tokens (<code className="px-1.5 py-0.5 rounded bg-white/5 font-mono-code text-[11px]">art_sess_...</code>). Roles are enforced at the API gateway layer with real-time audit logging.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>SOC2 Type II Aligned</span>
            </div>
          </div>

          {/* Card 3: Credential Request Process */}
          <div
            className={`p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between ${
              isLight
                ? 'bg-white border-slate-200 hover:border-violet-300 shadow-lg shadow-slate-200/50'
                : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/40'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                PARTNER ONBOARDING
              </span>
              <h3 className="text-xl font-bold text-white font-display mb-3">
                How to Request Credentials
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Prospective enterprise partners and authorized operators must request credentials through our <strong>Strategic Contact Brief</strong> form. Verification is typically completed within 24 business hours.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>24hr Domain Verification SLA</span>
            </div>
          </div>
        </div>

        {/* Action Banner / CTA Row */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
            isLight
              ? 'bg-gradient-to-r from-violet-50 via-slate-50 to-indigo-50 border-slate-200'
              : 'bg-gradient-to-r from-violet-950/40 via-[#0c0c16] to-indigo-950/30 border-white/[0.1]'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold font-mono-code uppercase text-violet-400">
                  Ready to Deploy Agent Swarms?
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Request Your Enterprise Partner Access & API Keys
              </h3>
              <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Fill out the project brief with your corporate domain, integration targets, and workload requirements. Our engineering team will provision your staging sandbox and dispatch your credentials.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={onOpenPartnerModal}
                id="about-view-access-doc-btn"
                className={`px-5 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.12] text-zinc-200 hover:text-white'
                }`}
              >
                <FileCode className="w-4 h-4 text-violet-400" />
                <span>Read Governance Docs</span>
              </button>

              <button
                onClick={onNavigateToContact}
                id="about-request-partner-access-btn"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Credentials via Contact</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
