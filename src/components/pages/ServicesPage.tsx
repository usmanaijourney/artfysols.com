import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Cpu,
  Layers,
  Shield,
  Workflow,
  CheckCircle2,
  Database,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';
import { updatePageSeo } from '../../utils/seo';

interface ServicesPageProps {
  onOpenConsultant: () => void;
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
  onNavigateToAiSolutions: () => void;
  theme?: 'dark' | 'light';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenConsultant,
  onOpenSolutionBuilder,
  onNavigateToContact,
  onNavigateToAiSolutions,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  React.useEffect(() => {
    updatePageSeo({
      title: 'Enterprise AI Services & Architecture Engineering',
      description: 'Custom AI strategy, autonomous agent development, enterprise RAG vector systems, and mission-critical legacy system integration services.',
      canonicalUrl: 'https://artifysols.com/services',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      id: 'custom-agent-dev',
      title: 'Autonomous AI Agent Engineering',
      tagline: 'Multi-Agent Digital Workforces Tailored to Your Core Operations',
      description: 'We architect, fine-tune, and deploy autonomous agent swarms that execute multi-step cross-functional workflows across your ERP, CRM, and communications stack.',
      icon: Bot,
      deliverables: [
        'Hierarchical Agent Architecture (Lead, Worker, Validator)',
        'Native Tool Calling & Secure API Connectors',
        'Stateful Episodic & Long-Term Vector Memory',
        'Human-in-the-Loop Approval Escalation Workflows',
      ],
      timeframe: '2-4 Weeks to Production',
    },
    {
      id: 'enterprise-rag',
      title: 'Enterprise Knowledge & Neural RAG Systems',
      tagline: 'Private, Grounded Vector Search for Dispersed Corporate Data',
      description: 'Transform millions of unstructured PDFs, tickets, CAD schematics, and databases into a secure, zero-hallucination conversational intelligence engine.',
      icon: Layers,
      deliverables: [
        'Hybrid Dense-Sparse Vector Indexing Pipeline',
        'Cross-Encoder Neural Re-Ranking Engine',
        'Document-Level RBAC & Active Directory ACL Sync',
        'Line-by-Line Clickable Source Attribution',
      ],
      timeframe: '1-3 Weeks to Production',
    },
    {
      id: 'integration-mesh',
      title: 'Real-Time Event Mesh & Legacy Integration',
      tagline: 'Zero-Latency Data Pipeline Linking Monoliths to Modern AI',
      description: 'Eliminate brittle point-to-point scripts. We build self-healing event pipelines connecting SAP, NetSuite, Salesforce, and Postgres with sub-10ms latency.',
      icon: Cpu,
      deliverables: [
        'Sub-10ms Real-Time Event Dispatchers',
        'Self-Healing Schema Transformation Adapters',
        'Automated Dead-Letter Queue Recovery',
        'End-to-End FIPS 140-2 Cryptographic Envelopes',
      ],
      timeframe: '2-3 Weeks to Production',
    },
    {
      id: 'model-finetuning',
      title: 'Domain Model Fine-Tuning & Private Cloud Hosting',
      tagline: 'Small Language Models (SLMs) Distilled for Your Private Cloud',
      description: 'Train and host custom 3B–70B parameter models on your proprietary datasets, cutting inference costs by 90% while keeping data completely private.',
      icon: Terminal,
      deliverables: [
        'Proprietary Synthetic Dataset Curation & Cleaning',
        'Supervised Fine-Tuning (SFT) & DPO Alignment',
        'High-Throughput vLLM Serving on Private VPC',
        '100% Client Ownership of Weights and Training Code',
      ],
      timeframe: '3-5 Weeks to Production',
    },
    {
      id: 'security-governance',
      title: 'AI Security, Governance & Red-Teaming Audits',
      tagline: 'Continuous Defense Against Jailbreaks, PII Leakage & Drift',
      description: 'Deploy AI with complete compliance. We provide real-time zero-trust security proxies, automated red-teaming, and SOC2/HIPAA audit ledgers.',
      icon: Shield,
      deliverables: [
        'Real-Time PII De-Identification & Masking Gateway',
        'Adversarial Prompt Injection & Jailbreak Shields',
        '50,000+ Attack Vector Red-Teaming Vulnerability Scans',
        'Cryptographically Signed Immutable Audit Trails',
      ],
      timeframe: '1-2 Weeks to Production',
    },
    {
      id: 'ai-strategy-audit',
      title: 'AI Strategy, ROI Modeling & Architecture Blueprinting',
      tagline: 'Executive Roadmap from Operational Audit to Production ROI',
      description: 'We audit your department workflows, calculate exact ROI potential, identify high-impact automation targets, and deliver complete technical specs.',
      icon: Zap,
      deliverables: [
        'Comprehensive Process & Data Readiness Audit',
        'Multi-Quarter Phased Implementation Roadmap',
        'Model Selection & Compute Cost Optimization Plan',
        'Executive Architecture Blueprint & Technical Spec',
      ],
      timeframe: '1 Week Sprint',
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050505] text-[#F5F5F5]'
      } transition-colors duration-300 pt-28 sm:pt-36 pb-24`}
    >
      <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Enterprise Engineering</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-white">
            Enterprise AI Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            From initial workflow discovery to mission-critical multi-agent deployment, we build custom artificial intelligence systems that transform how companies operate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-7 rounded-2xl bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-violet-400 mt-1 font-mono-code">
                    {srv.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono-code block mb-1">
                      KEY DELIVERABLES:
                    </span>
                    {srv.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono-code">{srv.timeframe}</span>
                  <button
                    onClick={onNavigateToContact}
                    className="font-bold text-violet-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Engage Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-950/80 via-[#100c1e] to-indigo-950/80 border border-violet-500/30 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
            Need a Turnkey Product Instead of Custom Services?
          </h2>
          <p className="mt-2 text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
            Explore our pre-engineered AI product suite including Artify Swarm™, Neural RAG™, and CommandBI™.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToAiSolutions}
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm flex items-center gap-2"
            >
              <span>Explore AI Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-bold text-sm border border-white/10"
            >
              <span>Contact Architecture Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
