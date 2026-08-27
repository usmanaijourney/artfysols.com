import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { updatePageSeo } from '../../utils/seo';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  theme?: 'dark' | 'light';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const isPrivacy = type === 'privacy';

  React.useEffect(() => {
    updatePageSeo({
      title: isPrivacy ? 'Privacy & Data Governance Policy' : 'Terms of Service & Enterprise SLA',
      description: isPrivacy
        ? 'Artify Solutions enterprise data privacy protocols, zero-data-retention options, and cryptographic protection standards.'
        : 'Artify Solutions standard terms of service, deployment SLAs, and intellectual property ownership provisions.',
      canonicalUrl: `https://artifysols.com/${isPrivacy ? 'privacy-policy' : 'terms'}`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050505] text-[#F5F5F5]'
      } transition-colors duration-300 pt-28 sm:pt-36 pb-24`}
    >
      <div className="w-[92%] sm:w-[88%] max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0c14] border border-white/[0.08]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center">
              {isPrivacy ? <Lock className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-xs font-bold text-violet-400 font-mono-code uppercase">
                LEGAL & COMPLIANCE
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-white font-display">
                {isPrivacy ? 'Privacy & Data Governance Policy' : 'Terms of Service & Enterprise SLA'}
              </h1>
            </div>
          </div>

          <div className="text-xs font-mono-code text-zinc-500 mb-8 pb-4 border-b border-white/[0.08]">
            Effective Date: January 1, 2026 • Version 3.4 • SOC2 / GDPR / HIPAA Aligned
          </div>

          {isPrivacy ? (
            <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">
                  1. Zero Data Retention & Private Cloud Perimeter
                </h3>
                <p>
                  Artify Solutions does not use customer confidential data, database entries, API payloads, or employee prompts to train foundation public AI models. All enterprise customer deployments operate within tenant-isolated VPC perimeters with optional zero-data-retention (ZDR) flags enabled by default.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">
                  2. Dynamic PII & PHI De-Identification
                </h3>
                <p>
                  Before any semantic query or document chunk is processed by reasoning engines, our automated tokenizer detects, masks, and replaces Personally Identifiable Information (PII) and Protected Health Information (PHI) with reversible cryptographic tokens.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">
                  3. Cryptographic Audit Telemetry
                </h3>
                <p>
                  All multi-agent actions, tool invocations, and database mutations produce cryptographically signed OpenTelemetry trace receipts stored in tamper-proof append-only storage for SOC2 Type II, HIPAA, and ISO 27001 regulatory compliance.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">
                  1. Intellectual Property & Model Weights Ownership
                </h3>
                <p>
                  Enterprise clients retain 100% ownership of all proprietary data, fine-tuned model weights, synthetic training sets, and custom agent workflow definitions created during custom engagements with Artify Solutions.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">
                  2. Service Level Agreement (SLA) & High-Availability
                </h3>
                <p>
                  Production multi-agent swarms, RAG endpoints, and streaming meshes are backed by a 99.99% monthly uptime guarantee with sub-10ms edge routing SLAs across multi-cloud failover regions.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">
                  3. Autonomous Action Boundaries & Human-in-the-Loop
                </h3>
                <p>
                  Customers configure granular role-based access control (RBAC) and financial authorization thresholds. High-impact system actions require signed human-in-the-loop approvals before final write mutations occur.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
