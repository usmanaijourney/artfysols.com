/**
 * Artify Sols — Super Admin Ecosystem Master Data
 * Comprehensive fixtures, models, and initial state for governance and operations.
 */

export interface WebsitePage {
  id: string;
  slug: string;
  title: string;
  path: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  version: string;
  views: number;
  metaTitle: string;
  metaDescription: string;
  sectionsCount: number;
}

export interface HomepageSection {
  id: string;
  name: string;
  componentKey: string;
  enabled: boolean;
  order: number;
  headline: string;
  subheadline: string;
  ctaLabel?: string;
  ctaTarget?: string;
  status: 'published' | 'draft' | 'scheduled';
  lastEditedBy: string;
}

export interface WebsiteGlobalConfig {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  announcementBanner: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
    type: 'info' | 'warning' | 'promo';
  };
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    youtube: string;
  };
  footerCopyright: string;
}

export interface AdminCustomer {
  id: string;
  companyName: string;
  domain: string;
  industry: string;
  tier: 'Enterprise' | 'Growth' | 'Startup';
  status: 'active' | 'onboarding' | 'trial' | 'churned';
  mrr: number;
  usersCount: number;
  productsCount: number;
  activeAgentsCount: number;
  renewalDate: string;
  accountManager: string;
  leadSource: string;
  contractStart: string;
  address: string;
  taxNumber: string;
  phone: string;
  email: string;
  onboardingProgress: number;
}

export interface AdminLead {
  id: string;
  refNumber: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  projectBrief: string;
  estimatedBudget: string;
  timeline: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  assignedTo: string;
  createdAt: string;
  notes: { id: string; author: string; text: string; date: string }[];
}

export interface AdminOnboardingItem {
  id: string;
  customerId: string;
  companyName: string;
  currentStage: 'visitor' | 'lead' | 'registered' | 'trial' | 'customer' | 'subscription' | 'onboarding' | 'active';
  progressPct: number;
  assignedArchitect: string;
  startedAt: string;
  targetGoLive: string;
  steps: { id: string; title: string; completed: boolean; completedAt?: string }[];
}

export interface AdminMediaAsset {
  id: string;
  title: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'logo';
  size: string;
  dimensions?: string;
  tags: string[];
  uploadedAt: string;
  usageCount: number;
}

export interface AdminAppRelease {
  id: string;
  platform: 'web' | 'android' | 'ios' | 'desktop';
  appName: string;
  version: string;
  buildNumber: number;
  releaseStatus: 'production' | 'beta' | 'in_review' | 'draft';
  releaseDate: string;
  minOs: string;
  storeUrl: string;
  downloadCount: number;
  releaseNotes: string;
}

export interface AdminNotificationTemplate {
  id: string;
  slug: string;
  name: string;
  category: 'auth' | 'billing' | 'onboarding' | 'ai' | 'lead';
  subject: string;
  bodyPreview: string;
  channels: ('email' | 'in_app' | 'sms')[];
  lastUpdated: string;
  active: boolean;
}

export interface AdminIntegration {
  id: string;
  name: string;
  category: 'payment' | 'email' | 'sms' | 'analytics' | 'cloud' | 'appstore' | 'ai';
  status: 'connected' | 'error' | 'disconnected' | 'configuring';
  icon: string;
  description: string;
  lastSync: string;
  environment: 'live' | 'sandbox';
  configFields: { key: string; label: string; value: string; masked: boolean }[];
}

export interface AdminSeoPage {
  id: string;
  path: string;
  pageName: string;
  title: string;
  description: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogImage: string;
  robots: string;
  indexStatus: 'indexed' | 'noindex';
  score: number;
  issues: string[];
}

export interface AdminAuditItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  category: 'auth' | 'cms' | 'products' | 'billing' | 'ai' | 'system' | 'users';
  targetResource: string;
  targetId?: string;
  ipAddress: string;
  device: string;
  status: 'success' | 'warning' | 'error';
  detailsDiff?: { before?: string; after?: string };
}

export interface AdminRoleDefinition {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  isSystemDefault: boolean;
}

export interface AdminUserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  status: 'active' | 'invited' | 'suspended';
  mfaEnabled: boolean;
  lastLogin: string;
  avatarUrl?: string;
  createdAt: string;
}

// ---------------- SEED DATA ----------------

export const INITIAL_WEBSITE_PAGES: WebsitePage[] = [
  {
    id: 'page-home',
    slug: 'home',
    title: 'Homepage & Ecosystem Overview',
    path: '/',
    status: 'published',
    lastModified: '2026-08-28 14:22',
    version: 'v4.2.1',
    views: 48920,
    metaTitle: 'Artify Solutions — Enterprise AI Products & Autonomous Systems',
    metaDescription: 'Artify Solutions transforms business operations with autonomous AI agent swarms and enterprise event meshes.',
    sectionsCount: 16,
  },
  {
    id: 'page-ai-solutions',
    slug: 'ai-solutions',
    title: 'AI Solutions Suite & Product Grid',
    path: '/ai-solutions',
    status: 'published',
    lastModified: '2026-08-27 10:15',
    version: 'v3.8.0',
    views: 29400,
    metaTitle: 'AI Solutions Built for the Next Generation of Business',
    metaDescription: 'Explore the complete Artify Solutions AI product suite, autonomous agent swarms, and enterprise neural RAG engines.',
    sectionsCount: 5,
  },
  {
    id: 'page-services',
    slug: 'services',
    title: 'Enterprise Services & Consulting',
    path: '/services',
    status: 'published',
    lastModified: '2026-08-25 18:30',
    version: 'v2.6.4',
    views: 14200,
    metaTitle: 'Enterprise AI Strategy, Architecture & Custom Development',
    metaDescription: 'Tailored enterprise AI implementation packages, solution blueprints, and dedicated engineering sprints.',
    sectionsCount: 6,
  },
  {
    id: 'page-industries',
    slug: 'industries',
    title: 'Industry Solutions Matrix',
    path: '/industries',
    status: 'published',
    lastModified: '2026-08-22 09:45',
    version: 'v2.1.0',
    views: 11850,
    metaTitle: 'Autonomous AI Solutions by Industry | Artify Solutions',
    metaDescription: 'Domain-specific autonomous agent architectures for logistics, fintech, healthcare, manufacturing, and real estate.',
    sectionsCount: 7,
  },
  {
    id: 'page-case-studies',
    slug: 'case-studies',
    title: 'Enterprise Case Studies & Results',
    path: '/case-studies',
    status: 'published',
    lastModified: '2026-08-20 16:10',
    version: 'v3.0.1',
    views: 18600,
    metaTitle: 'Enterprise AI Case Studies & Quantified ROI | Artify Solutions',
    metaDescription: 'Documented production case studies showing multi-million dollar savings and sub-minute reconciliation.',
    sectionsCount: 4,
  },
  {
    id: 'page-about',
    slug: 'about',
    title: 'About Artify & Vision',
    path: '/about',
    status: 'published',
    lastModified: '2026-08-19 11:20',
    version: 'v2.4.0',
    views: 9450,
    metaTitle: 'About Artify Solutions | AI-Native Enterprise Architecture',
    metaDescription: 'Artify Solutions is a premier AI-native software house engineering bespoke enterprise platforms.',
    sectionsCount: 5,
  },
  {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact & Solution Brief',
    path: '/contact',
    status: 'published',
    lastModified: '2026-08-28 08:30',
    version: 'v3.5.0',
    views: 22100,
    metaTitle: 'Schedule an AI Architectural Consultation | Artify Solutions',
    metaDescription: 'Connect with Artify Solutions architects to build an adaptive AI platform for your enterprise.',
    sectionsCount: 3,
  },
  {
    id: 'page-blog',
    slug: 'blog',
    title: 'Intelligence Hub / Blog',
    path: '/blog',
    status: 'published',
    lastModified: '2026-08-28 17:00',
    version: 'v4.0.0',
    views: 38200,
    metaTitle: 'Artify Intelligence Hub | Technical AI Research & Insights',
    metaDescription: 'Engineering breakdowns, multi-agent benchmarks, and security whitepapers.',
    sectionsCount: 4,
  },
  {
    id: 'page-privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy & Data Security',
    path: '/privacy-policy',
    status: 'published',
    lastModified: '2026-07-15 12:00',
    version: 'v1.3.0',
    views: 3100,
    metaTitle: 'Enterprise Privacy & Zero-Retention Security Policy',
    metaDescription: 'Our commitment to data sovereignty, SOC2 Type II isolation, and zero unauthorized retention.',
    sectionsCount: 2,
  },
  {
    id: 'page-terms',
    slug: 'terms',
    title: 'Master Service Agreement & Terms',
    path: '/terms',
    status: 'published',
    lastModified: '2026-07-15 12:00',
    version: 'v1.2.0',
    views: 2400,
    metaTitle: 'Master Service Agreement & Terms of Service',
    metaDescription: 'Legal terms governing Artify Solutions licenses, cloud deployments, and enterprise service levels.',
    sectionsCount: 2,
  },
];

export const INITIAL_HOMEPAGE_SECTIONS: HomepageSection[] = [
  {
    id: 'sec-hero',
    name: 'Hero Section & Orbiting Network',
    componentKey: 'Hero',
    enabled: true,
    order: 1,
    headline: 'Software should adapt your business, not your business adapt software.',
    subheadline: 'Bespoke enterprise AI swarms, neural financial engines, and autonomous workflows engineered natively around your operational DNA.',
    ctaLabel: 'Build Architecture Brief',
    ctaTarget: '#contact',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-featured-products',
    name: 'Featured AI Products Ribbon',
    componentKey: 'FeaturedProducts',
    enabled: true,
    order: 2,
    headline: 'Enterprise AI Product Suite',
    subheadline: 'Explore our top enterprise-ready autonomous AI products engineered for mission-critical operations.',
    ctaLabel: 'View All 8 AI Products',
    ctaTarget: '#ai-solutions',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-trust',
    name: 'Trust Statement & Architecture Metric Badges',
    componentKey: 'TrustStatement',
    enabled: true,
    order: 3,
    headline: 'Engineered for Zero Data Leakage & Sub-Second Determinism',
    subheadline: 'Every model runs inside dedicated private VPC ingress layers with verified cryptographic provenance.',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-what-we-build',
    name: 'What We Build (Architectural Pillars)',
    componentKey: 'WhatWeBuild',
    enabled: true,
    order: 4,
    headline: 'Beyond Commoditized Wrappers: Bespoke Enterprise Systems',
    subheadline: 'From autonomous reconciliation engines to air-gapped SLMs and cross-departmental coordination swarms.',
    ctaLabel: 'Explore Capabilities',
    ctaTarget: '#ai-solutions',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-ai-agents',
    name: 'AI Agents & Fleets Showcase',
    componentKey: 'AiAgentsSection',
    enabled: true,
    order: 5,
    headline: 'Your 24/7 Autonomous Workforce',
    subheadline: 'Multi-agent coordination fleets that perceive, plan, verify, and execute complex business actions across ERPs and databases.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-orchestration',
    name: 'AI Orchestration & Event Mesh',
    componentKey: 'AiOrchestration',
    enabled: true,
    order: 6,
    headline: 'Deterministic Human-in-the-Loop Orchestration',
    subheadline: 'Real-time telemetry, threshold approval gates, and mathematical correctness checks on every automated action.',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-industries',
    name: 'Industries Matrix Explorer',
    componentKey: 'IndustryExplorer',
    enabled: true,
    order: 7,
    headline: 'Tailored for High-Complexity Domains',
    subheadline: 'Pre-trained domain knowledge graphs for logistics, finance, healthcare, supply chain, and multi-entity enterprises.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-functions',
    name: 'Solutions by Business Function',
    componentKey: 'SolutionsByFunction',
    enabled: true,
    order: 8,
    headline: 'Automating Every Core Enterprise Department',
    subheadline: 'Finance, Operations, Sales, Legal, IT & DevOps powered by specialized agent fleets.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-difference',
    name: 'The Artify Difference',
    componentKey: 'ArtifyDifference',
    enabled: true,
    order: 9,
    headline: 'Why Global Enterprises Choose Artify Solutions',
    subheadline: 'Air-gapped security, complete IP ownership, custom fine-tuning, and dedicated solutions engineering.',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-methodology',
    name: '6-Phase Engineering Methodology',
    componentKey: 'DevelopmentMethodology',
    enabled: true,
    order: 10,
    headline: 'From Architectural Discovery to Production Swarms in 6 Sprints',
    subheadline: 'Rigorous architectural roadmap with clear milestone deliverables and guaranteed uptime SLAs.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-before-after',
    name: 'Before vs. After Transformation Slider',
    componentKey: 'BeforeAfterSlider',
    enabled: true,
    order: 11,
    headline: 'The Operational Shift',
    subheadline: 'Compare fragmented manual workflows against continuous autonomous multi-agent execution.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-command-center',
    name: 'AI Command Center Interactive Preview',
    componentKey: 'AiCommandCenter',
    enabled: true,
    order: 12,
    headline: 'Complete Telemetry & Agent Fleet Observability',
    subheadline: 'Live streaming audit logs, latency tracking, approval queues, and error budgets in one unified pane.',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-integrations',
    name: 'Integrations Ecosystem Matrix',
    componentKey: 'IntegrationsEcosystem',
    enabled: true,
    order: 13,
    headline: 'Connects Directly into Your Existing Software Stack',
    subheadline: 'Native connectors for SAP, NetSuite, Salesforce, Snowflake, Stripe, PostgreSQL, Slack, and legacy REST/SOAP APIs.',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-security',
    name: 'Security & Enterprise Governance',
    componentKey: 'SecurityAndGovernance',
    enabled: true,
    order: 14,
    headline: 'Zero Trust. SOC2 Type II. Total Data Sovereignty.',
    subheadline: 'Private model weights, ephemeral processing, immutable hash-chained audit ledgers, and role-based access control.',
    status: 'published',
    lastEditedBy: 'Dr. Sarah Al-Hashimi',
  },
  {
    id: 'sec-case-studies',
    name: 'Case Studies Showcase',
    componentKey: 'CaseStudiesSection',
    enabled: true,
    order: 15,
    headline: 'Real World Impact & Quantified ROI',
    subheadline: 'How our clients eliminate weeks of administrative backlog and accelerate revenue cycles.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
  {
    id: 'sec-blog-preview',
    name: 'Blog & Research Preview',
    componentKey: 'BlogPreviewSection',
    enabled: true,
    order: 16,
    headline: 'Latest AI Research & Insights',
    subheadline: 'Deep dives from our principal architects and engineering teams.',
    status: 'published',
    lastEditedBy: 'Marcus Vance',
  },
];

export const INITIAL_WEBSITE_CONFIG: WebsiteGlobalConfig = {
  siteName: 'Artify Solutions',
  tagline: 'AI Powered Future Solutions',
  contactEmail: 'contact@artifysols.com',
  contactPhone: '+1 (415) 890-3490',
  address: '100 Innovation Boulevard, Suite 800, San Francisco, CA 94107',
  announcementBanner: {
    enabled: true,
    text: '🚀 Artify v4.0 Autonomous Agent Fleets now live with Gemini 3.8 Flash & Sub-Penny Reconciliation',
    linkText: 'Explore New Capabilities',
    linkUrl: '#ai-solutions',
    type: 'promo',
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/company/artifysols',
    twitter: 'https://twitter.com/artifysols',
    github: 'https://github.com/artifysols',
    youtube: 'https://youtube.com/@artifysols',
  },
  footerCopyright: '© 2026 Artify Solutions Inc. All rights reserved. Enterprise AI Platform.',
};

export const INITIAL_ADMIN_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'cust-apex-01',
    companyName: 'Apex Global Logistics Corp',
    domain: 'apexlogistics.io',
    industry: 'Freight & Supply Chain Operations',
    tier: 'Enterprise',
    status: 'active',
    mrr: 7800,
    usersCount: 28,
    productsCount: 3,
    activeAgentsCount: 14,
    renewalDate: '2027-01-15',
    accountManager: 'Liam Harrison',
    leadSource: 'Solution Builder Wizard',
    contractStart: '2026-01-15',
    address: '450 Harbor Way, Long Beach, CA 90802',
    taxNumber: 'US-95-8849201',
    phone: '+1 (562) 555-0194',
    email: 'admin@apexlogistics.io',
    onboardingProgress: 100,
  },
  {
    id: 'cust-finmatrix-02',
    companyName: 'FinMatrix Capital Partners',
    domain: 'finmatrix.com',
    industry: 'Financial Services & Asset Management',
    tier: 'Growth',
    status: 'active',
    mrr: 3450,
    usersCount: 12,
    productsCount: 2,
    activeAgentsCount: 8,
    renewalDate: '2026-11-20',
    accountManager: 'Dr. Sarah Al-Hashimi',
    leadSource: 'Interactive AI Consultant',
    contractStart: '2025-11-20',
    address: '140 Wall Street, Floor 32, New York, NY 10005',
    taxNumber: 'US-13-4492018',
    phone: '+1 (212) 555-0143',
    email: 'marcus@finmatrix.com',
    onboardingProgress: 100,
  },
  {
    id: 'cust-omnicare-03',
    companyName: 'OmniCare Health Systems',
    domain: 'omnicarehealth.org',
    industry: 'Healthcare & Clinical Diagnostics',
    tier: 'Enterprise',
    status: 'onboarding',
    mrr: 12500,
    usersCount: 45,
    productsCount: 4,
    activeAgentsCount: 22,
    renewalDate: '2027-04-01',
    accountManager: 'Liam Harrison',
    leadSource: 'Executive Referral',
    contractStart: '2026-04-01',
    address: '880 Medical Center Parkway, Boston, MA 02115',
    taxNumber: 'US-04-1192837',
    phone: '+1 (617) 555-0188',
    email: 'tech@omnicarehealth.org',
    onboardingProgress: 75,
  },
  {
    id: 'cust-zenith-04',
    companyName: 'Zenith Real Estate Group',
    domain: 'zenithproperties.com',
    industry: 'Commercial Real Estate & Property',
    tier: 'Growth',
    status: 'trial',
    mrr: 0,
    usersCount: 6,
    productsCount: 1,
    activeAgentsCount: 3,
    renewalDate: '2026-09-15',
    accountManager: 'Elena Rostova',
    leadSource: 'Direct Website Contact',
    contractStart: '2026-08-15',
    address: '1200 Brickell Ave, Miami, FL 33131',
    taxNumber: 'US-59-9928172',
    phone: '+1 (305) 555-0177',
    email: 'operations@zenithproperties.com',
    onboardingProgress: 50,
  },
  {
    id: 'cust-aerotech-05',
    companyName: 'AeroTech Dynamics GmbH',
    domain: 'aerotech-dynamics.de',
    industry: 'Aerospace & Precision Manufacturing',
    tier: 'Enterprise',
    status: 'active',
    mrr: 15400,
    usersCount: 60,
    productsCount: 5,
    activeAgentsCount: 30,
    renewalDate: '2027-02-28',
    accountManager: 'Dr. Sarah Al-Hashimi',
    leadSource: 'Inbound RFQ',
    contractStart: '2026-02-28',
    address: 'Kaiser-Wilhelm-Ring 24, 50672 Cologne, Germany',
    taxNumber: 'DE-812-993847',
    phone: '+49 221 555 0192',
    email: 'ai-lead@aerotech-dynamics.de',
    onboardingProgress: 100,
  },
];

export const INITIAL_ADMIN_LEADS: AdminLead[] = [
  {
    id: 'lead-art-01',
    refNumber: 'LD-2026-9812',
    name: 'David K. Vance',
    email: 'd.vance@vanguardlogistics.com',
    phone: '+1 (312) 555-0199',
    company: 'Vanguard Freight Network',
    industry: 'Logistics & Transportation',
    projectBrief: 'We operate 650 distribution hubs and need an autonomous agent swarm to cross-check delivery bills of lading against supplier claims in NetSuite.',
    estimatedBudget: '$50,000 - $100,000 / yr',
    timeline: 'Within 30 days',
    status: 'proposal',
    priority: 'urgent',
    source: 'Website Contact Page',
    assignedTo: 'Liam Harrison',
    createdAt: '2026-08-28 09:14',
    notes: [
      {
        id: 'n-1',
        author: 'Liam Harrison',
        text: 'Conducted 45-minute discovery call. Scope involves NetSuite REST connector + OCR parsing for bilingual bills of lading.',
        date: '2026-08-28 11:30',
      },
    ],
  },
  {
    id: 'lead-art-02',
    refNumber: 'LD-2026-9813',
    name: 'Elena Rostova',
    email: 'e.rostova@aurorafinance.eu',
    phone: '+41 22 555 0122',
    company: 'Aurora Private Wealth Management',
    industry: 'Fintech & Wealth Advisory',
    projectBrief: 'Seeking on-premise air-gapped SLM deployment to summarize private equity due diligence memos without sending data to external APIs.',
    estimatedBudget: '$100,000+ / yr',
    timeline: 'Q4 2026',
    status: 'qualified',
    priority: 'high',
    source: 'Interactive AI Consultant',
    assignedTo: 'Dr. Sarah Al-Hashimi',
    createdAt: '2026-08-27 15:45',
    notes: [
      {
        id: 'n-2',
        author: 'Dr. Sarah Al-Hashimi',
        text: 'Evaluated compliance requirements for Swiss FINMA regulations. CustomForge private inference cluster requested.',
        date: '2026-08-27 17:10',
      },
    ],
  },
  {
    id: 'lead-art-03',
    refNumber: 'LD-2026-9814',
    name: 'Tariq Mansoor',
    email: 'tariq@gulfretailholding.com',
    phone: '+971 4 555 0184',
    company: 'Gulf Retail Conglomerate',
    industry: 'Retail & E-Commerce',
    projectBrief: 'Need an autonomous customer experience fleet across WhatsApp, Mobile App, and Web with real-time stock availability verification.',
    estimatedBudget: '$30,000 - $50,000 / yr',
    timeline: 'Immediate (Next 14 Days)',
    status: 'contacted',
    priority: 'high',
    source: 'Solution Builder Wizard',
    assignedTo: 'Liam Harrison',
    createdAt: '2026-08-26 14:10',
    notes: [],
  },
  {
    id: 'lead-art-04',
    refNumber: 'LD-2026-9815',
    name: 'Sarah Chen-Miller',
    email: 's.chen@pacificbiomed.com',
    phone: '+1 (415) 555-0144',
    company: 'Pacific BioMed Labs',
    industry: 'Healthcare & Life Sciences',
    projectBrief: 'Evaluating automated clinical trial participant screening and HIPAA compliant data pipeline validation.',
    estimatedBudget: '$75,000 / yr',
    timeline: '60-90 Days',
    status: 'new',
    priority: 'medium',
    source: 'Whitepaper Download',
    assignedTo: 'Dr. Sarah Al-Hashimi',
    createdAt: '2026-08-28 16:30',
    notes: [],
  },
  {
    id: 'lead-art-05',
    refNumber: 'LD-2026-9799',
    name: 'Markus Weber',
    email: 'm.weber@bavaria-engineering.de',
    phone: '+49 89 555 0166',
    company: 'Bavaria Engineering Systems',
    industry: 'Industrial Automation',
    projectBrief: 'Connected factory anomaly detection and predictive maintenance alerts via edge IoT sensors.',
    estimatedBudget: '$120,000 / yr',
    timeline: 'Completed Pilot',
    status: 'converted',
    priority: 'high',
    source: 'Executive Referral',
    assignedTo: 'Dr. Sarah Al-Hashimi',
    createdAt: '2026-08-10 10:00',
    notes: [
      {
        id: 'n-3',
        author: 'Dr. Sarah Al-Hashimi',
        text: 'Successfully converted to Enterprise Fleet tier! Tenant provisioned as cust-aerotech-05.',
        date: '2026-08-25 09:00',
      },
    ],
  },
];

export const INITIAL_ONBOARDING_PIPELINE: AdminOnboardingItem[] = [
  {
    id: 'onb-01',
    customerId: 'cust-omnicare-03',
    companyName: 'OmniCare Health Systems',
    currentStage: 'onboarding',
    progressPct: 75,
    assignedArchitect: 'Liam Harrison',
    startedAt: '2026-08-01',
    targetGoLive: '2026-09-15',
    steps: [
      { id: 's-1', title: 'Contract & MSA Execution', completed: true, completedAt: '2026-08-01' },
      { id: 's-2', title: 'Dedicated Private VPC & BAA Signed', completed: true, completedAt: '2026-08-05' },
      { id: 's-3', title: 'FHIR / HL7 Diagnostic Feed Connected', completed: true, completedAt: '2026-08-18' },
      { id: 's-4', title: 'Autonomous Triage Agent Configuration', completed: true, completedAt: '2026-08-25' },
      { id: 's-5', title: 'Clinical Staff User Training & Sandbox Testing', completed: false },
      { id: 's-6', title: 'Final Production Deployment & SLA Sign-off', completed: false },
    ],
  },
  {
    id: 'onb-02',
    customerId: 'cust-zenith-04',
    companyName: 'Zenith Real Estate Group',
    currentStage: 'trial',
    progressPct: 50,
    assignedArchitect: 'Elena Rostova',
    startedAt: '2026-08-15',
    targetGoLive: '2026-09-30',
    steps: [
      { id: 's-1', title: 'Trial Sandbox Provisioning', completed: true, completedAt: '2026-08-15' },
      { id: 's-2', title: 'Property Management ERP Data Sync', completed: true, completedAt: '2026-08-20' },
      { id: 's-3', title: 'Tenant Query Agent Calibration', completed: false },
      { id: 's-4', title: 'Conversion Review Meeting', completed: false },
    ],
  },
  {
    id: 'onb-03',
    customerId: 'lead-art-01-conv',
    companyName: 'Vanguard Freight Network',
    currentStage: 'subscription',
    progressPct: 30,
    assignedArchitect: 'Liam Harrison',
    startedAt: '2026-08-28',
    targetGoLive: '2026-10-01',
    steps: [
      { id: 's-1', title: 'Commercial Proposal Finalization', completed: true, completedAt: '2026-08-28' },
      { id: 's-2', title: 'Payment Setup & Enterprise Invoicing', completed: false },
      { id: 's-3', title: 'VPC Gateway Provisioning', completed: false },
      { id: 's-4', title: 'Ledger Reconciliation Swarm Deployment', completed: false },
    ],
  },
];

export const INITIAL_MEDIA_ASSETS: AdminMediaAsset[] = [
  {
    id: 'med-01',
    title: 'Artify Primary Ecosystem Emblem',
    filename: 'artify-logo-vector.svg',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    type: 'logo',
    size: '42 KB',
    dimensions: '512x512',
    tags: ['branding', 'logo', 'vector', 'dark-mode'],
    uploadedAt: '2026-01-10',
    usageCount: 18,
  },
  {
    id: 'med-02',
    title: 'Autonomous Swarm Orchestration Blueprint',
    filename: 'swarm-orchestration-mesh.png',
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80',
    type: 'image',
    size: '1.2 MB',
    dimensions: '1920x1080',
    tags: ['architecture', 'hero', 'diagram', 'rag'],
    uploadedAt: '2026-05-14',
    usageCount: 12,
  },
  {
    id: 'med-03',
    title: 'Financial Reconciliation Engine Telemetry UI',
    filename: 'reconciliation-dashboard-screenshot.png',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    size: '840 KB',
    dimensions: '1600x900',
    tags: ['product', 'screenshot', 'finance', 'analytics'],
    uploadedAt: '2026-06-20',
    usageCount: 9,
  },
  {
    id: 'med-04',
    title: 'Enterprise AI Governance Whitepaper 2026',
    filename: 'artify-enterprise-governance-2026.pdf',
    url: '#',
    type: 'document',
    size: '4.8 MB',
    tags: ['whitepaper', 'compliance', 'soc2', 'security'],
    uploadedAt: '2026-07-02',
    usageCount: 24,
  },
];

export const INITIAL_APP_RELEASES: AdminAppRelease[] = [
  {
    id: 'app-web-01',
    platform: 'web',
    appName: 'Artify Web Ecosystem & Client Portal',
    version: '4.2.0',
    buildNumber: 4201,
    releaseStatus: 'production',
    releaseDate: '2026-08-28',
    minOs: 'Modern Web Browsers (Chrome 120+, Safari 17+, Firefox 125+)',
    storeUrl: 'https://artifysols.com',
    downloadCount: 142800,
    releaseNotes: 'Integrated Super Admin control layer, real-time Gemini 3.8 Flash model switching, and automated invoice PDF exports.',
  },
  {
    id: 'app-android-01',
    platform: 'android',
    appName: 'Artify Executive Command (Android)',
    version: '2.8.4',
    buildNumber: 284,
    releaseStatus: 'production',
    releaseDate: '2026-08-15',
    minOs: 'Android 12.0+ (API Level 31)',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.artifysols.executive',
    downloadCount: 18500,
    releaseNotes: 'Push notification latency cut to under 250ms for human-in-the-loop task authorizations. Biometric fingerprint authentication.',
  },
  {
    id: 'app-ios-01',
    platform: 'ios',
    appName: 'Artify Mobile Sentinel (iOS)',
    version: '2.8.5',
    buildNumber: 285,
    releaseStatus: 'production',
    releaseDate: '2026-08-18',
    minOs: 'iOS 17.0+ / iPadOS 17.0+',
    storeUrl: 'https://apps.apple.com/app/artify-executive-command/id99482910',
    downloadCount: 24300,
    releaseNotes: 'Live Activity widgets for active agent tasks on iPhone Dynamic Island. Support for zero-touch FaceID approval.',
  },
  {
    id: 'app-desktop-01',
    platform: 'desktop',
    appName: 'Artify Local Gateway Agent (Daemon)',
    version: '1.4.0',
    buildNumber: 1402,
    releaseStatus: 'beta',
    releaseDate: '2026-08-22',
    minOs: 'macOS 14+ (Apple Silicon), Ubuntu 22.04 LTS, Windows 11 Enterprise',
    storeUrl: 'https://artifysols.com/downloads/desktop-agent',
    downloadCount: 6200,
    releaseNotes: 'Secure localhost daemon for on-premise air-gapped database bridging and local ERP extraction without external port forwarding.',
  },
];

export const INITIAL_NOTIFICATION_TEMPLATES: AdminNotificationTemplate[] = [
  {
    id: 'tpl-01',
    slug: 'welcome_customer',
    name: 'Customer Welcome & Tenant Provisioning',
    category: 'onboarding',
    subject: 'Welcome to Artify Solutions — Your Enterprise AI Platform is Provisioned',
    bodyPreview: 'Dear {{contact_name}}, your dedicated environment at {{tenant_domain}} is ready for access...',
    channels: ['email', 'in_app'],
    lastUpdated: '2026-08-10',
    active: true,
  },
  {
    id: 'tpl-02',
    slug: 'ai_approval_required',
    name: 'AI Human-in-the-Loop Approval Dispatch',
    category: 'ai',
    subject: 'Action Required: AI Coworker {{agent_name}} requests authorization for {{action_type}}',
    bodyPreview: '{{agent_name}} has completed {{task_title}} and requires your manual approval before executing...',
    channels: ['email', 'in_app', 'sms'],
    lastUpdated: '2026-08-20',
    active: true,
  },
  {
    id: 'tpl-03',
    slug: 'subscription_renewal_warning',
    name: 'Upcoming Subscription Renewal Notice (14 Days)',
    category: 'billing',
    subject: 'Upcoming Renewal for your Artify {{plan_name}} Tier',
    bodyPreview: 'Your subscription is scheduled to renew on {{renewal_date}} for ${{amount}}...',
    channels: ['email', 'in_app'],
    lastUpdated: '2026-07-15',
    active: true,
  },
  {
    id: 'tpl-04',
    slug: 'lead_assigned',
    name: 'Internal Lead Assignment Alert',
    category: 'lead',
    subject: 'New High-Priority Enterprise Lead Assigned: {{company_name}}',
    bodyPreview: 'A new lead {{ref_number}} (Estimated Budget: {{budget}}) has been assigned to you...',
    channels: ['email', 'in_app'],
    lastUpdated: '2026-08-01',
    active: true,
  },
  {
    id: 'tpl-05',
    slug: 'system_incident_broadcast',
    name: 'System Maintenance & Incident Broadcast',
    category: 'auth',
    subject: 'Notice: Scheduled Maintenance on Artify Ingress Mesh',
    bodyPreview: 'Scheduled maintenance will take place on {{start_time}}. No disruption to live VPC agents is expected...',
    channels: ['email', 'in_app'],
    lastUpdated: '2026-06-25',
    active: true,
  },
];

export const INITIAL_INTEGRATIONS: AdminIntegration[] = [
  {
    id: 'int-stripe',
    name: 'Stripe Corporate Billing & Invoicing',
    category: 'payment',
    status: 'connected',
    icon: 'CreditCard',
    description: 'Processes credit cards, ACH transfers, multi-currency corporate invoicing, and automated recurring billing.',
    lastSync: '2 minutes ago',
    environment: 'live',
    configFields: [
      { key: 'STRIPE_PUBLIC_KEY', label: 'Publishable Key', value: 'pk_live_51P882910401928374', masked: true },
      { key: 'STRIPE_WEBHOOK_SECRET', label: 'Webhook Endpoint Secret', value: 'whsec_9948271649201928', masked: true },
    ],
  },
  {
    id: 'int-resend',
    name: 'Resend / Enterprise SMTP Relay',
    category: 'email',
    status: 'connected',
    icon: 'Mail',
    description: 'Transaction and broadcast email delivery with dedicated DKIM, SPF, and DMARC verified sender domains.',
    lastSync: '5 minutes ago',
    environment: 'live',
    configFields: [
      { key: 'RESEND_API_KEY', label: 'API Key', value: 're_894829103918291', masked: true },
      { key: 'FROM_EMAIL', label: 'Sender Address', value: 'notifications@artifysols.com', masked: false },
    ],
  },
  {
    id: 'int-gemini',
    name: 'Google Cloud Gemini Enterprise API',
    category: 'ai',
    status: 'connected',
    icon: 'Bot',
    description: 'Primary foundation model layer powering autonomous coworker swarms with Gemini 3.8 Flash, 2.5 Flash, and Embeddings.',
    lastSync: 'Real-time (Active Socket)',
    environment: 'live',
    configFields: [
      { key: 'GEMINI_PROJECT_ID', label: 'GCP Project ID', value: 'artify-enterprise-ai-prod', masked: false },
      { key: 'DEFAULT_MODEL', label: 'Primary Engine', value: 'gemini-3.8-flash', masked: false },
    ],
  },
  {
    id: 'int-twilio',
    name: 'Twilio SMS & WhatsApp Business API',
    category: 'sms',
    status: 'connected',
    icon: 'MessageSquare',
    description: 'Dispatches emergency human-in-the-loop approvals, MFA verification tokens, and WhatsApp notification alerts.',
    lastSync: '18 minutes ago',
    environment: 'live',
    configFields: [
      { key: 'TWILIO_ACCOUNT_SID', label: 'Account SID', value: 'AC994829104819283', masked: true },
      { key: 'WHATSAPP_NUMBER', label: 'WhatsApp Business Number', value: '+1 (415) 890-3490', masked: false },
    ],
  },
  {
    id: 'int-ga4',
    name: 'Google Analytics 4 & Tag Manager',
    category: 'analytics',
    status: 'connected',
    icon: 'BarChart2',
    description: 'Gathers anonymous visitor metrics, conversion event funnels, and enterprise acquisition channel attribution.',
    lastSync: '10 minutes ago',
    environment: 'live',
    configFields: [
      { key: 'GA_MEASUREMENT_ID', label: 'Measurement ID', value: 'G-ARTIFY2026X', masked: false },
    ],
  },
  {
    id: 'int-gcp-storage',
    name: 'Google Cloud Storage Buckets (Digital Assets)',
    category: 'cloud',
    status: 'connected',
    icon: 'HardDrive',
    description: 'High-availability object storage for digital assets, customer contracts, and exported audit packages.',
    lastSync: '1 hour ago',
    environment: 'live',
    configFields: [
      { key: 'BUCKET_NAME', label: 'Bucket Name', value: 'artify-assets-prod-us-central1', masked: false },
    ],
  },
];

export const INITIAL_SEO_PAGES: AdminSeoPage[] = [
  {
    id: 'seo-home',
    path: '/',
    pageName: 'Homepage',
    title: 'Artify Solutions — Enterprise AI Products & Autonomous Systems Architecture',
    description: 'Artify Solutions transforms business operations with autonomous AI agent swarms, hybrid neural RAG engines, and real-time enterprise event meshes.',
    focusKeyword: 'enterprise AI products',
    canonicalUrl: 'https://artifysols.com',
    ogImage: 'https://artifysols.com/og-artify-preview.png',
    robots: 'index, follow',
    indexStatus: 'indexed',
    score: 96,
    issues: ['Add additional internal anchor links from case study highlights.'],
  },
  {
    id: 'seo-solutions',
    path: '/ai-solutions',
    pageName: 'AI Solutions Suite',
    title: 'AI Solutions Built for the Next Generation of Business | Artify',
    description: 'Explore the full Artify Solutions AI product suite, autonomous agent swarms, and enterprise neural RAG engines.',
    focusKeyword: 'autonomous AI agent swarms',
    canonicalUrl: 'https://artifysols.com/ai-solutions',
    ogImage: 'https://artifysols.com/og-ai-solutions.png',
    robots: 'index, follow',
    indexStatus: 'indexed',
    score: 94,
    issues: [],
  },
  {
    id: 'seo-services',
    path: '/services',
    pageName: 'Services Page',
    title: 'Enterprise AI Strategy, Architecture & Custom Development',
    description: 'Tailored enterprise AI implementation packages, solution blueprints, and dedicated engineering sprints.',
    focusKeyword: 'enterprise AI implementation consulting',
    canonicalUrl: 'https://artifysols.com/services',
    ogImage: 'https://artifysols.com/og-services.png',
    robots: 'index, follow',
    indexStatus: 'indexed',
    score: 91,
    issues: ['Meta description length could be expanded by 18 characters for optimal SERP display.'],
  },
  {
    id: 'seo-blog',
    path: '/blog',
    pageName: 'Intelligence Hub / Blog',
    title: 'Artify Intelligence Hub | Technical AI Research & Insights',
    description: 'Engineering breakdowns, multi-agent benchmarks, and security whitepapers written by senior enterprise AI architects.',
    focusKeyword: 'AI architecture research',
    canonicalUrl: 'https://artifysols.com/blog',
    ogImage: 'https://artifysols.com/og-blog.png',
    robots: 'index, follow',
    indexStatus: 'indexed',
    score: 98,
    issues: [],
  },
];

export const INITIAL_AUDIT_LOGS: AdminAuditItem[] = [
  {
    id: 'aud-001',
    timestamp: '2026-08-28 17:42:10 UTC',
    actorName: 'Dr. Sarah Al-Hashimi',
    actorEmail: 'admin@artifysols.com',
    actorRole: 'Super Administrator',
    action: 'SECTION_VISIBILITY_UPDATED',
    category: 'cms',
    targetResource: 'HomepageSection: sec-featured-products',
    ipAddress: '198.51.100.44',
    device: 'Chrome 128 (macOS Sonoma)',
    status: 'success',
    detailsDiff: { before: 'enabled: false', after: 'enabled: true' },
  },
  {
    id: 'aud-002',
    timestamp: '2026-08-28 16:30:15 UTC',
    actorName: 'Marcus Vance',
    actorEmail: 'editor@artifysols.com',
    actorRole: 'Content Manager',
    action: 'ARTICLE_PUBLISHED',
    category: 'cms',
    targetResource: 'Article: art_001',
    ipAddress: '192.168.1.1',
    device: 'Chrome 127 (macOS)',
    status: 'success',
    detailsDiff: { before: 'status: scheduled', after: 'status: published' },
  },
  {
    id: 'aud-003',
    timestamp: '2026-08-28 15:10:02 UTC',
    actorName: 'Dr. Sarah Al-Hashimi',
    actorEmail: 'admin@artifysols.com',
    actorRole: 'Super Administrator',
    action: 'AI_APPROVAL_GRANTED',
    category: 'ai',
    targetResource: 'AiTask: task_001_rag_bench',
    ipAddress: '198.51.100.44',
    device: 'Chrome 128 (macOS Sonoma)',
    status: 'success',
    detailsDiff: { before: 'status: WAITING_APPROVAL', after: 'status: COMPLETED' },
  },
  {
    id: 'aud-004',
    timestamp: '2026-08-28 11:22:45 UTC',
    actorName: 'Liam Harrison',
    actorEmail: 'liam@artifysols.com',
    actorRole: 'Sales Manager',
    action: 'LEAD_STATUS_TRANSITIONED',
    category: 'users',
    targetResource: 'Lead: LD-2026-9812',
    ipAddress: '172.56.21.9',
    device: 'Firefox 128 (Linux)',
    status: 'success',
    detailsDiff: { before: 'status: qualified', after: 'status: proposal' },
  },
  {
    id: 'aud-005',
    timestamp: '2026-08-28 09:05:00 UTC',
    actorName: 'System Security Engine',
    actorEmail: 'system@artifysols.com',
    actorRole: 'System Daemon',
    action: 'SESSION_REVOCATION_SWEEP',
    category: 'system',
    targetResource: 'SessionTable',
    ipAddress: '127.0.0.1',
    device: 'Node Runtime Cluster (Cloud Run)',
    status: 'success',
    detailsDiff: { before: 'expired_sessions: 4', after: 'purged: 4' },
  },
];

export const INITIAL_ROLES_PERMISSIONS: AdminRoleDefinition[] = [
  {
    id: 'role-superadmin',
    name: 'Super Administrator',
    description: 'Complete unrestricted control over the entire Artify Platform, multi-tenant databases, AI orchestration, billing, and system configuration.',
    userCount: 2,
    isSystemDefault: true,
    permissions: [
      'all.unrestricted',
      'cms.pages.manage',
      'cms.sections.manage',
      'blog.articles.manage',
      'products.services.manage',
      'customers.clients.manage',
      'leads.crm.manage',
      'onboarding.manage',
      'subscriptions.billing.manage',
      'media.library.manage',
      'analytics.traffic.view',
      'seo.serp.manage',
      'apps.releases.manage',
      'notifications.broadcast.manage',
      'ai.models.coworkers.manage',
      'ai.approvals.override',
      'integrations.credentials.manage',
      'security.rbac.users.manage',
      'audit.logs.view_all',
      'system.health.diagnostics',
      'settings.ecosystem.manage',
    ],
  },
  {
    id: 'role-content-mgr',
    name: 'Content & Marketing Manager',
    description: 'Manages website content, marketing articles, blog research publications, media library assets, and SEO metadata.',
    userCount: 4,
    isSystemDefault: true,
    permissions: [
      'cms.pages.manage',
      'cms.sections.manage',
      'blog.articles.manage',
      'media.library.manage',
      'seo.serp.manage',
      'analytics.traffic.view',
      'ai.models.coworkers.view',
    ],
  },
  {
    id: 'role-sales-mgr',
    name: 'Sales & Customer Manager',
    description: 'Manages leads CRM pipeline, client onboarding tracking, customer 360 directory, and commercial proposals.',
    userCount: 5,
    isSystemDefault: true,
    permissions: [
      'customers.clients.manage',
      'leads.crm.manage',
      'onboarding.manage',
      'subscriptions.billing.view',
      'analytics.traffic.view',
    ],
  },
  {
    id: 'role-ai-specialist',
    name: 'AI Operations & Solutions Engineer',
    description: 'Configures AI models, monitors agent swarms, inspects latency/token usage, and processes pending tool approvals.',
    userCount: 3,
    isSystemDefault: true,
    permissions: [
      'ai.models.coworkers.manage',
      'ai.approvals.override',
      'products.services.manage',
      'system.health.diagnostics',
      'audit.logs.view_all',
    ],
  },
  {
    id: 'role-read-only',
    name: 'Executive Read Only',
    description: 'Read-only visibility into executive metrics, traffic analytics, customer accounts, and audit ledgers.',
    userCount: 2,
    isSystemDefault: true,
    permissions: [
      'analytics.traffic.view',
      'customers.clients.view',
      'audit.logs.view_all',
      'system.health.diagnostics',
    ],
  },
];

export const INITIAL_ADMIN_USERS: AdminUserAccount[] = [
  {
    id: 'usr_art_admin_01',
    name: 'Dr. Sarah Al-Hashimi',
    email: 'admin@artifysols.com',
    role: 'Super Administrator',
    company: 'Artify Solutions HQ',
    status: 'active',
    mfaEnabled: true,
    lastLogin: 'Just now (Active)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-11-01',
  },
  {
    id: 'usr_art_editor_01',
    name: 'Marcus Vance',
    email: 'editor@artifysols.com',
    role: 'Content & Marketing Manager',
    company: 'Artify Solutions HQ',
    status: 'active',
    mfaEnabled: true,
    lastLogin: '1 hour ago',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10',
  },
  {
    id: 'usr_art_sales_01',
    name: 'Liam Harrison',
    email: 'liam@artifysols.com',
    role: 'Sales & Customer Manager',
    company: 'Artify Solutions HQ',
    status: 'active',
    mfaEnabled: true,
    lastLogin: '3 hours ago',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15',
  },
  {
    id: 'usr_art_ai_eng_01',
    name: 'Elena Rostova',
    email: 'elena.rostova@artifysols.com',
    role: 'AI Operations & Solutions Engineer',
    company: 'Artify Solutions HQ',
    status: 'active',
    mfaEnabled: false,
    lastLogin: 'Yesterday at 18:20',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01',
  },
];
