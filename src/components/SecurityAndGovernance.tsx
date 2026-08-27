import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  FileCheck2,
  SlidersHorizontal,
  Power,
  CheckCircle2,
  Fingerprint,
} from 'lucide-react';

export const SecurityAndGovernance: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Enterprise Data Isolation',
      desc: 'Your proprietary company data, client records, and documents are never used to train public models. Strict multi-tenant isolation with zero data leakage.',
      color: '#8B5CF6',
    },
    {
      icon: SlidersHorizontal,
      title: 'Autonomous Boundaries & Guardrails',
      desc: 'You define the precise operational limits of every AI agent. Safe actions execute autonomously; high-risk actions require human sign-off.',
      color: '#38BDF8',
    },
    {
      icon: Eye,
      title: 'Full Auditability & Reasoning Traces',
      desc: 'Every single API call, database query, decision step, and generated artifact is logged in tamper-evident logs for total compliance oversight.',
      color: '#10B981',
    },
    {
      icon: Fingerprint,
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Fine-grained departmental permissions. Agents inherit exact security roles ensuring no unauthorized cross-department data exposure.',
      color: '#F59E0B',
    },
    {
      icon: FileCheck2,
      title: 'Regulatory & Industry Compliance',
      desc: 'Architecture designed to support SOC2 Type II, HIPAA, GDPR, ISO 27001, and GLBA data handling standards from day one.',
      color: '#EC4899',
    },
    {
      icon: Power,
      title: 'Instant Human Override & Killswitch',
      desc: 'Real-time human-in-the-loop oversight. Any team lead or executive can pause, adjust, or override autonomous agent actions in one click.',
      color: '#EF4444',
    },
  ];

  return (
    <section className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5 text-violet-400" />
            <span>SECURITY, PRIVACY & GOVERNANCE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Intelligence With Control.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Autonomous where appropriate. Human-controlled where necessary. We engineer enterprise-grade security and strict guardrails into every layer of code.
          </p>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#09090e] border border-white/[0.08] hover:border-violet-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: `${p.color}15`,
                      color: p.color,
                      border: `1px solid ${p.color}30`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {p.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center text-[10px] font-mono-code text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  <span>Enforced at Kernel Level</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
