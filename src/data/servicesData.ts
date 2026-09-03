/**
 * Artify Sols — Enterprise AI Services Data
 */

export interface EnterpriseServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  deliverables: string[];
  timeframe: string;
  badge?: string;
  tags: string[];
}

export const ENTERPRISE_SERVICES: EnterpriseServiceItem[] = [
  {
    id: 'custom-agent-dev',
    title: 'Autonomous AI Agent Engineering',
    tagline: 'Multi-Agent Digital Workforces Tailored to Your Core Operations',
    description:
      'We architect, fine-tune, and deploy autonomous agent swarms that execute multi-step cross-functional workflows across your ERP, CRM, and communications stack.',
    category: 'Engineering & Development',
    icon: 'Bot',
    deliverables: [
      'Hierarchical Agent Architecture (Lead, Worker, Validator)',
      'Native Tool Calling & Secure API Connectors',
      'Stateful Episodic & Long-Term Vector Memory',
      'Human-in-the-Loop Approval Escalation Workflows',
    ],
    timeframe: '2-4 Weeks to Production',
    badge: 'Flagship Service',
    tags: ['Autonomous Agents', 'Swarm', 'ERP Automation', 'Tool Calling', 'State Machines'],
  },
  {
    id: 'enterprise-rag',
    title: 'Enterprise Knowledge & Neural RAG Systems',
    tagline: 'Private, Grounded Vector Search for Dispersed Corporate Data',
    description:
      'Transform millions of unstructured PDFs, tickets, CAD schematics, and databases into a secure, zero-hallucination conversational intelligence engine.',
    category: 'Information Retrieval',
    icon: 'Layers',
    deliverables: [
      'Hybrid Dense-Sparse Vector Indexing Pipeline',
      'Cross-Encoder Neural Re-Ranking Engine',
      'Document-Level RBAC & Active Directory ACL Sync',
      'Line-by-Line Clickable Source Attribution',
    ],
    timeframe: '1-3 Weeks to Production',
    badge: 'Popular',
    tags: ['Neural RAG', 'Vector Search', 'Zero Hallucination', 'Document AI', 'Enterprise Search'],
  },
  {
    id: 'integration-mesh',
    title: 'Real-Time Event Mesh & Legacy Integration',
    tagline: 'Zero-Latency Data Pipeline Linking Monoliths to Modern AI',
    description:
      'Eliminate brittle point-to-point scripts. We build self-healing event pipelines connecting SAP, NetSuite, Salesforce, and Postgres with sub-10ms latency.',
    category: 'Enterprise Integration',
    icon: 'Cpu',
    deliverables: [
      'Sub-10ms Real-Time Event Dispatchers',
      'Self-Healing Schema Transformation Adapters',
      'Automated Dead-Letter Queue Recovery',
      'End-to-End FIPS 140-2 Cryptographic Envelopes',
    ],
    timeframe: '2-3 Weeks to Production',
    tags: ['Event Mesh', 'SAP Integration', 'NetSuite', 'Salesforce', 'Sub-10ms SLA'],
  },
  {
    id: 'model-finetuning',
    title: 'Domain Model Fine-Tuning & Private Cloud Hosting',
    tagline: 'Small Language Models (SLMs) Distilled for Your Private Cloud',
    description:
      'Train and host custom 3B–70B parameter models on your proprietary datasets, cutting inference costs by 90% while keeping data completely private.',
    category: 'Model Engineering',
    icon: 'Terminal',
    deliverables: [
      'Proprietary Synthetic Dataset Curation & Cleaning',
      'Supervised Fine-Tuning (SFT) & DPO Alignment',
      'High-Throughput vLLM Serving on Private VPC',
      '100% Client Ownership of Weights and Training Code',
    ],
    timeframe: '3-5 Weeks to Production',
    tags: ['Fine-Tuning', 'Small Language Models', 'SLM', 'vLLM', 'Private VPC', 'DPO'],
  },
  {
    id: 'security-governance',
    title: 'AI Security, Governance & Red-Teaming Audits',
    tagline: 'Continuous Defense Against Jailbreaks, PII Leakage & Drift',
    description:
      'Deploy AI with complete compliance. We provide real-time zero-trust security proxies, automated red-teaming, and SOC2/HIPAA audit ledgers.',
    category: 'Security & Compliance',
    icon: 'Shield',
    deliverables: [
      'Real-Time PII De-Identification & Masking Gateway',
      'Adversarial Prompt Injection & Jailbreak Shields',
      '50,000+ Attack Vector Red-Teaming Vulnerability Scans',
      'Cryptographically Signed Immutable Audit Trails',
    ],
    timeframe: '1-2 Weeks to Production',
    badge: 'Enterprise Security',
    tags: ['SOC2', 'HIPAA', 'Red Teaming', 'Zero-Trust Proxy', 'Prompt Injection Defense', 'Audit Trails'],
  },
  {
    id: 'ai-strategy-audit',
    title: 'AI Strategy, ROI Modeling & Architecture Blueprinting',
    tagline: 'Executive Roadmap from Operational Audit to Production ROI',
    description:
      'We audit your department workflows, calculate exact ROI potential, identify high-impact automation targets, and deliver complete technical specs.',
    category: 'Advisory & Strategy',
    icon: 'Zap',
    deliverables: [
      'Comprehensive Process & Data Readiness Audit',
      'Multi-Quarter Phased Implementation Roadmap',
      'Model Selection & Compute Cost Optimization Plan',
      'Executive Architecture Blueprint & Technical Spec',
    ],
    timeframe: '1 Week Sprint',
    tags: ['AI Strategy', 'ROI Modeling', 'Process Audit', 'Architecture Blueprint'],
  },
];
