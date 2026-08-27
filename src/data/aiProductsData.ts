import { AiProductItem, AiProductCategoryType } from '../types';

export interface ProductCategoryOption {
  id: AiProductCategoryType;
  label: string;
  count: number;
  description: string;
}

export const AI_PRODUCT_CATEGORIES: ProductCategoryOption[] = [
  {
    id: 'all',
    label: 'All Products',
    count: 8,
    description: 'The complete Artify Solutions AI enterprise product ecosystem.',
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    count: 1,
    description: 'Autonomous digital workers executing complex multi-step cross-functional goals.',
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    count: 1,
    description: 'Self-healing event-driven pipelines orchestrating enterprise workflows with zero lag.',
  },
  {
    id: 'generative-ai',
    label: 'Generative AI',
    count: 1,
    description: 'Production vector search, grounded knowledge synthesis, and private document reasoning.',
  },
  {
    id: 'business-intelligence',
    label: 'Business Intelligence',
    count: 1,
    description: 'Conversational BI querying ERPs, databases, and spreadsheets in plain English.',
  },
  {
    id: 'ai-customer-experience',
    label: 'AI Customer Experience',
    count: 1,
    description: '24/7 empathetic autonomous support resolving inquiries with full CRM system access.',
  },
  {
    id: 'ai-productivity',
    label: 'AI Productivity',
    count: 1,
    description: 'Multimodal vision, automated invoice/spec extraction, and workspace acceleration.',
  },
  {
    id: 'custom-ai-solutions',
    label: 'Custom AI Solutions',
    count: 2,
    description: 'Domain-tailored Small Language Models, bespoke agent swarms, and SOC2 governance.',
  },
];

export const AI_PRODUCTS: AiProductItem[] = [
  {
    id: 'swarm',
    name: 'Artify Swarm™',
    slug: 'autonomous-agent-swarm',
    category: 'ai-agents',
    categoryLabel: 'AI Agents & Digital Workforce',
    tagline: 'Multi-Agent Autonomous Workforce Orchestrator',
    shortDescription: 'Deploy autonomous agent swarms that coordinate across ERP, CRM, and communication channels to plan, execute, and verify complex business operations.',
    longDescription: 'Artify Swarm™ transforms static software tools into an active, collaborative digital workforce. Rather than forcing human operators to bridge siloed enterprise systems, Swarm deploys specialized hierarchical agents (Planning, Execution, Verification) that communicate via semantic message buses, autonomously solving complex operational tickets.',
    icon: 'Bot',
    badge: 'Flagship Platform',
    status: 'general-availability',
    rating: 4.98,
    uptime: '99.99%',
    problem: {
      title: 'Human Teams Trapped in Repetitive Cross-System Copy-Pasting',
      summary: 'Enterprise teams spend 40%+ of their working hours manually reconciling data across disconnected ERPs, CRMs, email inboxes, and spreadsheets.',
      points: [
        'Siloed systems cannot communicate or make autonomous multi-step decisions.',
        'Manual data re-entry causes costly latency, missed SLAs, and operational fatigue.',
        'Traditional RPA breaks instantly whenever a UI element or data format changes slightly.',
        'Lack of real-time multi-agent verification leads to unchecked hallucinations or error propagation.',
      ],
    },
    solution: {
      title: 'Autonomous Swarm Intelligence with Dual-Layer Verification',
      summary: 'Artify Swarm assigns specialized LLM/SLM worker nodes with tool-use permissions, dynamic memory, and deterministic audit rails.',
      points: [
        'Dynamic Agent Allocation: Automatically provisions lead orchestrators, research workers, and validator nodes for every task.',
        'Native Tool Calling: Safe read/write execution against Salesforce, NetSuite, SAP, Postgres, and Slack.',
        'Human-in-the-Loop Safeguards: Automatic risk-scoring pauses high-value actions for instant manager sign-off.',
        'Continuous Audit Trails: Cryptographically signed telemetry logs for every agent reasoning token and API payload.',
      ],
    },
    features: [
      {
        title: 'Hierarchical Multi-Agent Graph',
        description: 'Lead orchestrator delegates sub-tasks to specialized sub-agents with bidirectional feedback loops.',
        icon: 'Network',
        metric: '< 450ms Orchestration Overhead',
      },
      {
        title: 'Deep System Integration Bus',
        description: 'Bi-directional connectors for 120+ enterprise protocols, REST/GraphQL APIs, webhooks, and SQL databases.',
        icon: 'Cpu',
        metric: '120+ Native Connectors',
      },
      {
        title: 'Stateful Memory & Vector Context',
        description: 'Episodic and long-term organizational memory ensures agents retain customer history and company operating guidelines.',
        icon: 'Database',
        metric: 'Zero Context Drift',
      },
      {
        title: 'Autonomous Self-Correction',
        description: 'When an API throws an exception or schema mismatch, validator agents retry with alternative parsing strategies.',
        icon: 'ShieldCheck',
        metric: '99.4% Autonomous Recovery',
      },
    ],
    benefits: [
      {
        title: '85% Reduction in Manual Data Entry',
        description: 'Eliminates repetitive ticket triage, invoice matching, and ledger re-keying across all connected departments.',
        value: '85% Time Saved',
      },
      {
        title: 'Zero SLA Misses',
        description: 'Agents process inbound events 24/7/365 with deterministic sub-second queue response times.',
        value: '< 3s Event Latency',
      },
      {
        title: 'Elastic Workforce Scaling',
        description: 'Handle 10x spikes during quarter-end closes or holiday surges without hiring temporary contractors.',
        value: '10x Elastic Capacity',
      },
      {
        title: 'Complete Regulatory Traceability',
        description: 'Every step is tracked in an immutable execution log for SOC2, HIPAA, and ISO27001 compliance.',
        value: '100% Audit Readiness',
      },
    ],
    useCases: [
      {
        industry: 'Finance & Accounting',
        scenario: 'Multi-Entity Invoice & Ledger Reconciliation',
        outcome: 'Autonomously matches 10,000+ line items against bank statements and POs with sub-penny precision.',
        timeToValue: '2 Weeks to Production',
      },
      {
        industry: 'Supply Chain & Logistics',
        scenario: 'Autonomous Bill of Lading & Customs Triage',
        outcome: 'Ingests shipping manifests, validates HS customs codes, and updates warehouse ERPs before cargo lands.',
        timeToValue: '10 Days to Production',
      },
      {
        industry: 'Real Estate & Property',
        scenario: '24/7 Tenant Ticket & Contractor Dispatch',
        outcome: 'Diagnoses plumbing/HVAC requests, checks vendor insurance, issues POs, and schedules technicians.',
        timeToValue: '14 Days to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Event Ingestion & Intent Parse',
        phase: 'Input',
        description: 'Inbound webhook, email, or ERP change event is ingested and decomposed into semantic intent.',
        output: 'Structured Goal State Vector',
      },
      {
        step: 2,
        title: 'Dynamic Agent Swarm Assembly',
        phase: 'AI Processing',
        description: 'Lead Orchestrator assigns tasks to Domain Specialist, Context Fetcher, and Policy Sentinel.',
        output: 'DAG Execution Plan',
      },
      {
        step: 3,
        title: 'Tool Invocation & Knowledge Query',
        phase: 'Intelligent Decision',
        description: 'Agents query internal databases and retrieve schemas to draft required API mutations.',
        output: 'Validated Draft Payloads',
      },
      {
        step: 4,
        title: 'Security & Policy Guard Check',
        phase: 'Action',
        description: 'Independent validation node checks RBAC permissions and financial spending thresholds.',
        output: 'Signed Cryptographic Execution Ticket',
      },
      {
        step: 5,
        title: 'System Mutation & Telemetry Confirmation',
        phase: 'Results',
        description: 'Updates downstream databases, notifies stakeholders in Slack/Teams, and closes ticket.',
        output: 'Complete Audit Log & Closed State',
      },
    ],
    techStack: [
      {
        layer: 'Agent Orchestration Engine',
        technologies: ['LangGraph Enterprise', 'Custom Actor-Model Runtime', 'Distributed Async Worker Pool'],
      },
      {
        layer: 'Grounding & Intelligence',
        technologies: ['Gemini 2.5 Pro / Flash', 'Claude 3.7 Sonnet', 'Artify Distilled Domain SLMs'],
      },
      {
        layer: 'Security & Governance',
        technologies: ['AES-256 GCM Data Encryption', 'Zero-Trust RBAC Proxy', 'OpenTelemetry Telemetry Stream'],
      },
    ],
    connectedSystems: ['Salesforce', 'NetSuite ERP', 'SAP S/4HANA', 'Workday', 'HubSpot', 'Jira', 'Slack', 'PostgreSQL', 'Snowflake'],
    metrics: [
      { label: 'Autonomous Resolution Rate', value: '94.2%' },
      { label: 'Average Execution Time', value: '1.8s' },
      { label: 'System Uptime SLA', value: '99.99%' },
      { label: 'Annual Hours Recovered', value: '4,200+' },
    ],
    demoCapabilities: ['Live Swarm Simulation', 'Multi-Agent Debate Viewer', 'Instant Payload Verifier'],
    cta: {
      primary: 'Deploy Artify Swarm™',
      secondary: 'Schedule Swarm Architecture Review',
    },
  },
  {
    id: 'neural-rag',
    name: 'Artify Neural RAG™',
    slug: 'neural-rag-knowledge-engine',
    category: 'generative-ai',
    categoryLabel: 'Generative AI & Enterprise Knowledge',
    tagline: 'Enterprise Multi-Modal Knowledge & Vector Intelligence Core',
    shortDescription: 'Unify internal documentation, PDFs, code repos, contracts, and audio records into an accurate, citation-backed conversational intelligence engine.',
    longDescription: 'Artify Neural RAG™ turns fragmented company files into a single, hallucination-resistant truth engine. Combining hybrid sparse-dense vector retrieval, semantic re-ranking, and dynamic chunking, it provides employees and customers with instantaneous, verifiable answers backed by exact line-item citations.',
    icon: 'Layers',
    badge: 'Enterprise Intelligence',
    status: 'general-availability',
    rating: 4.96,
    uptime: '99.98%',
    problem: {
      title: 'Institutional Knowledge Lost in Massive Document Silos',
      summary: 'Knowledge workers waste an average of 9.3 hours per week searching for information scattered across Google Drive, SharePoint, Notion, and Jira.',
      points: [
        'Standard semantic search returns irrelevant chunks without understanding business context.',
        'Generic LLMs hallucinate when asked specific legal, medical, or engineering questions.',
        'No enterprise-grade access control: employees might accidentally query confidential payroll docs.',
        'Stale vector indexes require costly manual rebuilds when files are updated.',
      ],
    },
    solution: {
      title: 'Hybrid Multi-Stage Vector Graph with Strict Document RBAC',
      summary: 'Artify Neural RAG combines BM25 keyword matching, dense vector embeddings, and cross-encoder re-ranking with document-level security.',
      points: [
        'Multi-Vector Hybrid Retrieval: Pinpoint exact clauses in 1,000-page contracts with 99.8% precision.',
        'Source-Grounded Citations: Every answer highlights the exact paragraph, timestamp, or table queried.',
        'Zero Data Leakage: Integrates with Active Directory & Okta so users only search files they have permissions to view.',
        'Real-Time Incremental Indexing: File changes in Drive or SharePoint are vectorized within 500ms.',
      ],
    },
    features: [
      {
        title: 'Multi-Modal Parsing Engine',
        description: 'Parses complex tables, charts, scanned OCR PDFs, diagrams, and video transcripts flawlessly.',
        icon: 'FileSearch',
        metric: '100% OCR & Layout Accuracy',
      },
      {
        title: 'Cross-Encoder Re-Ranking',
        description: 'Ranks top 50 retrieved candidate chunks to surface the mathematically most relevant context.',
        icon: 'Sparkles',
        metric: '99.8% Precision @ 5',
      },
      {
        title: 'Role-Based Document Filtering',
        description: 'Applies real-time security ACLs at the vector query level before answers are synthesized.',
        icon: 'Lock',
        metric: 'Zero Cross-Tenant Leakage',
      },
      {
        title: 'Anti-Hallucination Guardrails',
        description: 'Automated verification layer checks every generated claim against retrieved source text.',
        icon: 'ShieldCheck',
        metric: '0.02% Hallucination Rate',
      },
    ],
    benefits: [
      {
        title: 'Instant Institutional Knowledge',
        description: 'New hires and senior engineers find answers in 2 seconds instead of waiting days for colleague replies.',
        value: '90% Search Time Saved',
      },
      {
        title: '100% Verifiable Citations',
        description: 'Auditors and lawyers can click directly to the exact page, paragraph, or spreadsheet cell.',
        value: 'Line-by-Line Citations',
      },
      {
        title: 'Private & Air-Gapped Deployable',
        description: 'Deploy on your private AWS VPC, Azure Cloud, or on-premise GPU clusters with zero third-party telemetry.',
        value: '100% Private Cloud',
      },
      {
        title: 'Dynamic Continuous Indexing',
        description: 'Updates automatically when files are modified, keeping answers 100% synchronized with live records.',
        value: '< 500ms Sync Latency',
      },
    ],
    useCases: [
      {
        industry: 'Legal & Compliance',
        scenario: 'M&A Due Diligence & Contract Risk Analysis',
        outcome: 'Scans 15,000 lease and supplier contracts in 4 hours, flagging non-standard indemnification clauses.',
        timeToValue: '5 Days to Deployment',
      },
      {
        industry: 'Healthcare & Biotech',
        scenario: 'Clinical Protocol & Drug Trial Retrieval',
        outcome: 'Surfaces dosage guidelines and contraindications from FDA dossiers with zero citation errors.',
        timeToValue: '14 Days to Deployment',
      },
      {
        industry: 'Manufacturing & Engineering',
        scenario: 'Machine Maintenance & Schematic Assistant',
        outcome: 'Field technicians query troubleshooting steps for 40-year-old heavy equipment via voice or mobile.',
        timeToValue: '1 Week to Deployment',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Document Ingestion & Chunking',
        phase: 'Input',
        description: 'Ingests PDF, DOCX, Notion, SQL, or audio and applies layout-aware semantic chunking.',
        output: 'Hierarchical Chunk Nodes',
      },
      {
        step: 2,
        title: 'Hybrid Embedding & Metadata Tagging',
        phase: 'AI Processing',
        description: 'Generates dense vector embeddings + sparse tokens enriched with user permission ACLs.',
        output: 'Enriched Vector Index',
      },
      {
        step: 3,
        title: 'User Query & Hybrid Retrieval',
        phase: 'Intelligent Decision',
        description: 'Combines vector search and BM25, passing top results through a neural cross-encoder re-ranker.',
        output: 'Top Ranked Context Chunks',
      },
      {
        step: 4,
        title: 'Grounded Answer Synthesis',
        phase: 'Action',
        description: 'Synthesizes clear narrative answers with strict instruction to cite source document IDs and pages.',
        output: 'Draft Response with Annotations',
      },
      {
        step: 5,
        title: 'Citation Verification & Output',
        phase: 'Results',
        description: 'Verifies every claim against the ground truth text before rendering in UI or API.',
        output: 'Verified Response + Clickable References',
      },
    ],
    techStack: [
      {
        layer: 'Vector Storage & Indexing',
        technologies: ['Qdrant Enterprise', 'pgvector', 'Pinecone', 'Milvus'],
      },
      {
        layer: 'Embedding & Re-Ranking Models',
        technologies: ['Text-Embedding-004', 'BGE-M3 Multilingual', 'Cohere Rerank v3'],
      },
      {
        layer: 'Inference & Generation',
        technologies: ['Gemini 2.5 Pro', 'Llama 3.3 70B Private VPC', 'Mistral Large'],
      },
    ],
    connectedSystems: ['Google Drive', 'SharePoint', 'Confluence', 'Notion', 'Zendesk', 'GitHub', 'S3 / GCS', 'Box', 'Local File Servers'],
    metrics: [
      { label: 'Retrieval Accuracy (P@5)', value: '99.8%' },
      { label: 'Average Query Latency', value: '< 650ms' },
      { label: 'Document Formats Supported', value: '60+' },
      { label: 'Hallucination Mitigation', value: '99.98%' },
    ],
    demoCapabilities: ['Live Document Ingestion Test', 'Multi-Source Cross-Citation', 'Permission ACL Inspector'],
    cta: {
      primary: 'Test Neural RAG™',
      secondary: 'Schedule Knowledge Architecture Consult',
    },
  },
  {
    id: 'mesh',
    name: 'Artify Mesh™',
    slug: 'realtime-orchestration-mesh',
    category: 'ai-automation',
    categoryLabel: 'AI Automation & Real-Time Mesh',
    tagline: 'Zero-Latency System Integration & Real-Time Event Pipeline',
    shortDescription: 'An intelligent real-time data mesh that links legacy databases, modern microservices, and external APIs into a unified autonomous event backbone.',
    longDescription: 'Artify Mesh™ bridges legacy enterprise monoliths and modern cloud AI infrastructure. Using stateful streaming pipelines and predictive edge routing, Mesh normalizes messy data streams, triggers autonomous workflows in sub-milliseconds, and heals broken schemas without manual IT intervention.',
    icon: 'Cpu',
    badge: 'Real-Time Backbone',
    status: 'general-availability',
    rating: 4.97,
    uptime: '99.999%',
    problem: {
      title: 'Legacy Enterprise Stacks Choked by Brittle Middleware',
      summary: 'Custom point-to-point integrations break whenever an endpoint upgrades, creating costly IT backlogs and siloed business units.',
      points: [
        'Legacy ERPs lack modern webhooks, forcing slow polling jobs that bottleneck operations.',
        'Brittle Zapier or custom scripts fail silently when payload structures change.',
        'High latency prevents real-time fraud detection and instant logistics re-routing.',
        'Complex compliance requirements make data sharing between departments risky.',
      ],
    },
    solution: {
      title: 'Self-Healing AI-Powered Streaming Mesh',
      summary: 'Artify Mesh delivers sub-millisecond event routing, automatic schema translation, and AI anomaly detection across all enterprise data flows.',
      points: [
        'Autonomous Schema Adaptation: LLM-powered parsers translate unexpected JSON/XML schemas on the fly.',
        'Sub-10ms Event Dispatch: Distributed edge nodes process millions of events per second with zero drop.',
        'Bi-Directional State Sync: Keeps Salesforce, SAP, and Postgres in permanent real-time coherence.',
        'Automated Dead-Letter Queue Healing: Detects API errors, formats valid retry payloads, and reconciles transactions.',
      ],
    },
    features: [
      {
        title: 'Predictive Event Dispatcher',
        description: 'Anticipates downstream workload bottlenecks and dynamically balances queue throughput.',
        icon: 'Zap',
        metric: '< 10ms End-to-End Latency',
      },
      {
        title: 'Zero-Code Schema Transformer',
        description: 'Translates legacy EDI/COBOL formats into modern OpenAPI specs automatically.',
        icon: 'Workflow',
        metric: '100% Schema Compatibility',
      },
      {
        title: 'Self-Healing Retry Loops',
        description: 'Analyzes third-party API rate limits and status codes to safely reschedule transaction bursts.',
        icon: 'RefreshCw',
        metric: '99.999% Message Delivery',
      },
      {
        title: 'Zero-Trust Payload Cryptography',
        description: 'End-to-end envelope encryption protects sensitive PII data in transit and at rest.',
        icon: 'Lock',
        metric: 'FIPS 140-2 Validated',
      },
    ],
    benefits: [
      {
        title: 'Eliminate Integration Maintenance',
        description: 'Engineering teams spend zero time fixing broken webhooks or manual API schema changes.',
        value: '95% Less IT Maintenance',
      },
      {
        title: 'Real-Time Operational Reactivity',
        description: 'Inventory, orders, and accounting events trigger downstream actions in milliseconds rather than overnight batches.',
        value: 'Real-Time Sync',
      },
      {
        title: '99.999% Carrier-Grade Reliability',
        description: 'Distributed fault-tolerant clusters survive cloud regional outages without data loss.',
        value: 'Zero Message Loss',
      },
      {
        title: 'Unified Observability Dashboard',
        description: 'Monitor every packet, retry, and transformation across your entire company in one screen.',
        value: '100% Pipeline Visibility',
      },
    ],
    useCases: [
      {
        industry: 'Retail & E-Commerce',
        scenario: 'Omnichannel Real-Time Inventory Harmonization',
        outcome: 'Synchronizes inventory across Shopify, Amazon, and physical warehouse POS in 8ms, ending overselling.',
        timeToValue: '7 Days to Production',
      },
      {
        industry: 'Fintech & Banking',
        scenario: 'Instant Transaction Fraud & AML Scoring',
        outcome: 'Scores 10,000 card swipes per second through AI anomaly models with 1.2ms latency.',
        timeToValue: '14 Days to Production',
      },
      {
        industry: 'Telecommunications',
        scenario: 'Network Outage Self-Triage & Auto-Dispatch',
        outcome: 'Correlates cell tower telemetry and auto-dispatches repair crews before customers notice outages.',
        timeToValue: '10 Days to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Event Producer Ingestion',
        phase: 'Input',
        description: 'Ingests real-time stream from Kafka, RabbitMQ, Webhooks, CDC databases, or legacy sockets.',
        output: 'Raw Telemetry Stream',
      },
      {
        step: 2,
        title: 'AI Schema Normalization',
        phase: 'AI Processing',
        description: 'Inspects headers and payload structure, converting disparate formats into unified canonical models.',
        output: 'Normalized Event Objects',
      },
      {
        step: 3,
        title: 'Rule & Anomaly Evaluation',
        phase: 'Intelligent Decision',
        description: 'Runs real-time business logic rules and AI anomaly detection models in sub-milliseconds.',
        output: 'Routing Directive & Risk Score',
      },
      {
        step: 4,
        title: 'Fan-Out Multi-Destination Dispatch',
        phase: 'Action',
        description: 'Broadcasts authenticated payloads to downstream ERP, CRM, microservices, and databases.',
        output: 'Synchronous System Mutations',
      },
      {
        step: 5,
        title: 'Verification & Observability Log',
        phase: 'Results',
        description: 'Records latency metrics and cryptographic receipts into distributed telemetry trace log.',
        output: 'Complete Telemetry Receipt',
      },
    ],
    techStack: [
      {
        layer: 'Event Streaming & Messaging',
        technologies: ['Apache Kafka', 'Redpanda', 'RabbitMQ', 'gRPC / HTTP/2'],
      },
      {
        layer: 'Real-Time Edge Processing',
        technologies: ['Rust High-Performance Workers', 'Go Microservices', 'Wasm Edge Plugins'],
      },
      {
        layer: 'Observability & Monitoring',
        technologies: ['OpenTelemetry', 'Prometheus', 'Grafana Enterprise', 'ClickHouse'],
      },
    ],
    connectedSystems: ['SAP S/4HANA', 'Oracle ERP', 'Salesforce', 'Stripe', 'Twilio', 'Postgres CDC', 'AWS SQS/SNS', 'Azure Service Bus'],
    metrics: [
      { label: 'Max Throughput per Node', value: '250k events/sec' },
      { label: 'P99 Latency', value: '< 8.4ms' },
      { label: 'Uptime Reliability', value: '99.999%' },
      { label: 'Auto-Recovered Schema Drift', value: '100%' },
    ],
    demoCapabilities: ['Live Real-Time Event Simulator', 'Schema Morphing Visualizer', 'Dead-Letter Auto-Healer'],
    cta: {
      primary: 'Explore Artify Mesh™',
      secondary: 'Talk to Integration Specialists',
    },
  },
  {
    id: 'command-bi',
    name: 'Artify CommandBI™',
    slug: 'conversational-bi-analytics',
    category: 'business-intelligence',
    categoryLabel: 'Business Intelligence & Natural Language Analytics',
    tagline: 'Executive Real-Time Natural Language Analytics & Forecasting Hub',
    shortDescription: 'Query multi-million row databases, financial ledgers, and live operational metrics in plain English. Get instant charts, predictive forecasts, and root-cause analysis.',
    longDescription: 'Artify CommandBI™ eliminates the traditional business intelligence bottleneck. Instead of waiting weeks for data engineers to build custom dashboards, executives and managers simply ask natural language questions ("Why did gross margins drop in EMEA last month?") and receive interactive charts, SQL lineage, and predictive models instantly.',
    icon: 'TrendingUp',
    badge: 'Executive BI',
    status: 'general-availability',
    rating: 4.95,
    uptime: '99.97%',
    problem: {
      title: 'Executives Starved for Timely Insights by Dashboard Backlogs',
      summary: 'Data analytics teams spend 70% of their bandwidth modifying minor Tableau/PowerBI filters rather than driving strategic strategy.',
      points: [
        'Building a new dashboard requires 2-4 weeks of data pipeline engineering.',
        'Existing static dashboards only show what happened, not WHY it happened or what will happen next.',
        'Non-technical managers struggle with complex SQL or ambiguous metric definitions.',
        'Discrepancies between department dashboards lead to conflicting executive meetings.',
      ],
    },
    solution: {
      title: 'Autonomous Semantic Text-to-SQL Engine with Statistical Explanations',
      summary: 'CommandBI translates human questions into optimized, schema-validated SQL queries with instant visualization and deep root-cause debriefs.',
      points: [
        'Semantic Data Dictionary: Understands your company-specific terminology, fiscal calendars, and revenue definitions.',
        'Safe Read-Only Query Sandbox: Generates parameterized SQL that executes with zero risk of database mutation.',
        'Automatic Statistical Decomposition: Drills down into outliers, cohort churn, and operational bottlenecks automatically.',
        'Predictive Monte Carlo Projections: Simulates forward-looking forecasts with statistical confidence bands.',
      ],
    },
    features: [
      {
        title: 'Zero-Hallucination Text-to-SQL',
        description: 'Synthesizes enterprise-grade SQL queries with visible execution plans and transparent data lineage.',
        icon: 'Code',
        metric: '99.6% First-Try SQL Accuracy',
      },
      {
        title: 'Auto-Generated Reactive Visuals',
        description: 'Selects the mathematically ideal chart type (Sankey, Heatmap, Waterfall, Multi-Axis) automatically.',
        icon: 'BarChart3',
        metric: 'Instant Dynamic Rendering',
      },
      {
        title: 'Root-Cause Narrative Synthesis',
        description: 'Explains the variance drivers behind metric fluctuations in crisp executive prose.',
        icon: 'Sparkles',
        metric: 'Deep Driver Attribution',
      },
      {
        title: 'Automated Anomaly Sentinel',
        description: 'Monitors revenue, churn, and conversion 24/7, alerting executives before small issues compound.',
        icon: 'BellRing',
        metric: 'Proactive Alerting',
      },
    ],
    benefits: [
      {
        title: '10x Faster Time to Decision',
        description: 'Answer complex ad-hoc operational questions in 3 seconds instead of waiting for bi-weekly sprint reviews.',
        value: '3-Second Answers',
      },
      {
        title: 'Democratize Company Data Access',
        description: 'Empower marketing, operations, and sales managers to explore data safely without knowing SQL.',
        value: 'Zero SQL Required',
      },
      {
        title: 'Unified Single Source of Truth',
        description: 'Centralized semantic layer guarantees everyone calculates CAC, LTV, and EBITDA using the exact same formula.',
        value: '100% Metric Consistency',
      },
      {
        title: 'Proactive Revenue Protection',
        description: 'Detects sudden drops in regional conversion or supply shortages before monthly accounting reports arrive.',
        value: 'Real-Time Anomaly Guard',
      },
    ],
    useCases: [
      {
        industry: 'Executive Leadership & Board',
        scenario: 'Board Meeting Instant Ad-Hoc Interrogation',
        outcome: 'Live answering of board member scenarios during meetings with interactive waterfall chart generation.',
        timeToValue: 'Immediate',
      },
      {
        industry: 'SaaS & Enterprise Tech',
        scenario: 'Customer Retention & Cohort Churn Forecasting',
        outcome: 'Identifies accounts with decreasing seat usage and predicts churn risk 60 days before contract renewal.',
        timeToValue: '7 Days to Production',
      },
      {
        industry: 'Hospitality & Travel',
        scenario: 'Dynamic Yield & Room Rate Optimization',
        outcome: 'Correlates regional event calendars, weather, and historical bookings to recommend daily pricing adjustments.',
        timeToValue: '10 Days to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Natural Language Query Submission',
        phase: 'Input',
        description: 'User enters or speaks query: "Compare Q2 gross margin by product line against target and explain variance."',
        output: 'Raw Semantic Question',
      },
      {
        step: 2,
        title: 'Semantic Schema Alignment',
        phase: 'AI Processing',
        description: 'Maps business terms to exact database tables, column aliases, joins, and fiscal calendar definitions.',
        output: 'Semantic Query Plan',
      },
      {
        step: 3,
        title: 'Deterministic SQL Synthesis & Execution',
        phase: 'Intelligent Decision',
        description: 'Generates secure parameterized SQL, executes against data warehouse (Snowflake/BigQuery), and fetches result set.',
        output: 'Optimized Result Matrix',
      },
      {
        step: 4,
        title: 'Statistical Decomposition & Chart Selection',
        phase: 'Action',
        description: 'Computes standard deviations, variance attributions, and automatically formats the optimal visual representation.',
        output: 'Interactive Chart & Statistical Vectors',
      },
      {
        step: 5,
        title: 'Executive Debrief & Lineage Presentation',
        phase: 'Results',
        description: 'Presents interactive visualization with narrative executive takeaways and clickable SQL proof.',
        output: 'Complete BI Dashboard Artifact',
      },
    ],
    techStack: [
      {
        layer: 'Semantic Layer & Text-to-SQL',
        technologies: ['Custom Semantic Graph Compiler', 'Gemini 2.5 Pro Schema Parser', 'DuckDB In-Memory OLAP'],
      },
      {
        layer: 'Data Warehouse Connectors',
        technologies: ['Snowflake', 'Google BigQuery', 'PostgreSQL', 'AWS Redshift', 'Databricks'],
      },
      {
        layer: 'Data Visualization Engine',
        technologies: ['D3.js', 'Recharts High-Performance', 'WebGL Chart Shaders'],
      },
    ],
    connectedSystems: ['Snowflake', 'BigQuery', 'PostgreSQL', 'Salesforce Data Cloud', 'Google Sheets', 'NetSuite', 'Stripe Sigma'],
    metrics: [
      { label: 'Text-to-SQL Precision', value: '99.6%' },
      { label: 'Average Query Execution', value: '1.2s' },
      { label: 'Data Sources Supported', value: '35+' },
      { label: 'Ad-hoc Ticket Reduction', value: '-82%' },
    ],
    demoCapabilities: ['Interactive Query Playground', 'Live SQL Lineage Viewer', 'Monte Carlo Simulation Toggle'],
    cta: {
      primary: 'Try CommandBI™ Demo',
      secondary: 'Book Enterprise BI Assessment',
    },
  },
  {
    id: 'cx-flow',
    name: 'Artify CX Flow™',
    slug: 'ai-customer-experience-agent',
    category: 'ai-customer-experience',
    categoryLabel: 'AI Customer Experience & Support',
    tagline: 'Autonomous Omnichannel Customer & Tenant Resolution Engine',
    shortDescription: 'Empathetic, brand-aligned AI agents that resolve 80%+ of Tier 1 & 2 support tickets across Voice, Chat, WhatsApp, and Email with direct CRM execution.',
    longDescription: 'Artify CX Flow™ elevates customer support from frustrating scripted chatbots to intelligent, autonomous problem-solvers. CX Flow understands complex emotional nuances, retrieves real-time customer account state, issues refunds, reschedules appointments, and escalates edge cases with structured summary briefs.',
    icon: 'MessageSquare',
    badge: '24/7 Omnichannel',
    status: 'general-availability',
    rating: 4.98,
    uptime: '99.99%',
    problem: {
      title: 'Customers Frustrated by Static Chatbots & Long Queue Times',
      summary: '84% of consumers report negative experiences with traditional menu-driven chatbots that cannot actually solve their problems.',
      points: [
        'Old-school chatbots give generic FAQ links instead of taking real system actions.',
        'Human support teams burn out answering the same 20 repetitive tier-1 questions.',
        'Long wait times during peak hours damage customer retention and online reviews.',
        'Siloed channels mean customers have to repeat their story when moving from chat to phone.',
      ],
    },
    solution: {
      title: 'Action-Oriented AI Support with Full CRM & Order Execution',
      summary: 'CX Flow combines conversational empathy with safe backend API execution, autonomously resolving complex customer requests.',
      points: [
        'Direct Action Execution: Process returns, update shipping addresses, and upgrade subscriptions instantly.',
        'Voice, WhatsApp & Web Omnichannel: Unified conversation history across all touchpoints.',
        'Sentiment-Aware Escalation: Detects frustration and seamlessly transfers to human agents with full context briefs.',
        'Multi-Lingual Fluency: Speaks 45+ languages natively with real-time accent normalization.',
      ],
    },
    features: [
      {
        title: 'Action-Enabled Backend Tools',
        description: 'Connects directly to Stripe, Shopify, Zendesk, and custom databases to perform actual customer transactions.',
        icon: 'Zap',
        metric: 'Sub-3s Resolution Time',
      },
      {
        title: 'Ultra-Low Latency Voice Agent',
        description: 'Natural bidirectional voice conversation with sub-400ms voice synthesis and realistic breathing pauses.',
        icon: 'PhoneCall',
        metric: '< 380ms Voice Latency',
      },
      {
        title: 'Omnichannel State Synchronization',
        description: 'Customer starts on WhatsApp and calls on the phone—agent picks up the exact sentence without hesitation.',
        icon: 'Share2',
        metric: '100% Cross-Channel Memory',
      },
      {
        title: 'Automated Post-Call Summarization',
        description: 'Auto-logs CRM notes, tags sentiment, and generates QA scorecards for every single interaction.',
        icon: 'ClipboardCheck',
        metric: '100% CRM Logging Compliance',
      },
    ],
    benefits: [
      {
        title: '80% Tier 1 & 2 Auto-Resolution',
        description: 'Free human support staff to handle complex strategic enterprise customer relationships.',
        value: '80% Autonomous Resolution',
      },
      {
        title: 'Instant 24/7 Response Time',
        description: 'Zero queue hold times, even during Black Friday spikes or unexpected service interruptions.',
        value: 'Zero Hold Time',
      },
      {
        title: '40% Reduction in Support OPEX',
        description: 'Scale customer volume dramatically without having to double support headcount.',
        value: '-40% Cost per Ticket',
      },
      {
        title: '+35 Net Promoter Score (NPS)',
        description: 'Delight customers with fast, accurate, and empathetic resolutions on their channel of choice.',
        value: '+35 NPS Improvement',
      },
    ],
    useCases: [
      {
        industry: 'E-Commerce & Retail',
        scenario: 'Order Tracking, Address Mod, & Instant Exchanges',
        outcome: 'Resolves 84% of WISMO (Where Is My Order) tickets without human intervention.',
        timeToValue: '5 Days to Production',
      },
      {
        industry: 'Property Management & Real Estate',
        scenario: 'After-Hours Emergency Triage & Maintenance Scheduling',
        outcome: 'Dispatches emergency plumbers for burst pipes and schedules routine repairs seamlessly.',
        timeToValue: '1 Week to Production',
      },
      {
        industry: 'Financial Services & Insurance',
        scenario: 'Claim Status Check & Policy Verification',
        outcome: 'Guides policyholders through initial claims filing with document upload assistance.',
        timeToValue: '12 Days to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Omnichannel Inbound Contact',
        phase: 'Input',
        description: 'Customer initiates request via Voice, Web Chat, WhatsApp, SMS, or Email.',
        output: 'Inbound Stream & Caller ID',
      },
      {
        step: 2,
        title: 'Customer Authentication & Context Fetch',
        phase: 'AI Processing',
        description: 'Retrieves customer profile, purchase history, and open tickets from CRM/ERP in 100ms.',
        output: 'Unified Customer Profile',
      },
      {
        step: 3,
        title: 'Intent Classification & Policy Verification',
        phase: 'Intelligent Decision',
        description: 'Understands problem and determines business policy (e.g. 30-day return window check).',
        output: 'Approved Action Blueprint',
      },
      {
        step: 4,
        title: 'Safe API Transaction Execution',
        phase: 'Action',
        description: 'Executes approved actions: generates return shipping label, processes refund, or changes booking.',
        output: 'Executed Backend Transaction',
      },
      {
        step: 5,
        title: 'Follow-Up Confirmation & CRM Logging',
        phase: 'Results',
        description: 'Sends confirmation via SMS/Email, logs detailed notes in CRM, and closes ticket.',
        output: 'Updated Ticket & Satisfied Customer',
      },
    ],
    techStack: [
      {
        layer: 'Voice Synthesis & Speech-to-Text',
        technologies: ['Deepgram Nova-2', 'Cartesia Sonic Voice', 'ElevenLabs Realtime', 'WebRTC Pipeline'],
      },
      {
        layer: 'Conversational LLM & Guardrails',
        technologies: ['Gemini 2.5 Flash', 'Claude 3.5 Haiku', 'NeMo Guardrails'],
      },
      {
        layer: 'Telephony & Omnichannel Gateways',
        technologies: ['Twilio Flex', 'LiveKit WebRTC Cloud', 'Meta WhatsApp Cloud API'],
      },
    ],
    connectedSystems: ['Zendesk', 'Salesforce Service Cloud', 'Shopify Plus', 'HubSpot', 'Intercom', 'Gorgias', 'Stripe', 'Twilio'],
    metrics: [
      { label: 'Autonomous Resolution Rate', value: '82.4%' },
      { label: 'Voice Response Latency', value: '< 380ms' },
      { label: 'CSAT Customer Satisfaction', value: '4.88 / 5' },
      { label: 'Languages Supported', value: '45+' },
    ],
    demoCapabilities: ['Interactive Voice Call Test', 'Live Ticket Resolution Simulator', 'Sentiment Drift Monitor'],
    cta: {
      primary: 'Launch CX Flow™ Demo',
      secondary: 'Schedule CX Solution Architecture Call',
    },
  },
  {
    id: 'vision-iq',
    name: 'Artify VisionIQ™',
    slug: 'multimodal-vision-auditor',
    category: 'ai-productivity',
    categoryLabel: 'AI Productivity & Multimodal Vision',
    tagline: 'Visual Inspection, Blueprint Parsing & Document Telemetry Core',
    shortDescription: 'Turn complex engineering drawings, architectural blueprints, medical scans, and drone imagery into structured digital data and automated quality audits.',
    longDescription: 'Artify VisionIQ™ brings computer vision and spatial reasoning to mission-critical enterprise workflows. From parsing complex CAD/BIM drawings to detecting surface defects in manufacturing lines and auditing job site compliance, VisionIQ operates with superhuman visual precision.',
    icon: 'Scan',
    badge: 'Multimodal Vision',
    status: 'general-availability',
    rating: 4.96,
    uptime: '99.98%',
    problem: {
      title: 'Visual Assets and Physical Audits Trapped in Manual Review',
      summary: 'Engineers, inspectors, and estimators spend thousands of hours manually counting elements on blueprints or inspecting physical defects.',
      points: [
        'Manual takeoff estimations on construction blueprints take days and are prone to human counting error.',
        'Physical manufacturing inspections fail to catch micro-defects at high conveyor speeds.',
        'Scanned handwritten invoices and receipts fail traditional OCR systems.',
        'Jobsite safety audits rely on spot-checks that miss dangerous OSHA violations.',
      ],
    },
    solution: {
      title: 'Deep Multimodal Spatial Vision with Sub-Millimeter Precision',
      summary: 'VisionIQ combines modern Vision-Language Models with specialized edge detection networks to audit images, video streams, and CAD schematics.',
      points: [
        'Blueprint Spec & Quantity Takeoff: Extracts every door, window, conduit, and fixture from PDF drawings into Excel in seconds.',
        'Edge Defect Detection: Analyzes 60 FPS manufacturing video to flag 0.1mm micro-fractures.',
        'Handwritten Document Reconstruction: Transcribes crumpled receipts, clinical charts, and field logs with 99.7% accuracy.',
        'Site Safety Surveillance: Flags missing PPE, restricted zone breaches, and spill hazards in real time.',
      ],
    },
    features: [
      {
        title: 'High-Resolution Blueprint Parser',
        description: 'Deconstructs vector and raster architectural drawings, outputting structured Bill of Materials (BOM).',
        icon: 'Layers',
        metric: '99.4% Extraction Precision',
      },
      {
        title: '60 FPS Real-Time Edge Processing',
        description: 'Runs on lightweight on-premise NVIDIA edge hardware for zero-latency physical quality inspection.',
        icon: 'Eye',
        metric: '16ms Frame Processing',
      },
      {
        title: 'Spatial Coordinate Mapping',
        description: 'Extracts exact bounding boxes, pixel areas, and 3D bounding volumes with real-world dimension conversion.',
        icon: 'Maximize2',
        metric: 'Sub-Millimeter Calibration',
      },
      {
        title: 'Automated Anomaly Highlighting',
        description: 'Overlays visual heatmaps and defect callouts directly onto the original image for human inspector review.',
        icon: 'Sparkles',
        metric: 'Instant Visual Diffing',
      },
    ],
    benefits: [
      {
        title: '90% Faster Estimating & Bidding',
        description: 'Complete commercial construction bids and material takeoffs in hours rather than weeks.',
        value: '90% Time Saved',
      },
      {
        title: 'Zero Production Line Escapes',
        description: 'Catch defective components before they leave the factory floor, avoiding costly product recalls.',
        value: '99.98% Defect Capture',
      },
      {
        title: '100% Safety Compliance Audit',
        description: 'Automated documentation of safety gear and site conditions for regulatory inspection defense.',
        value: '100% OSHA Audit Ready',
      },
      {
        title: 'Seamless ERP Bill-of-Materials Sync',
        description: 'Directly pushes extracted quantities and item codes into Procore, Autodesk, or SAP.',
        value: 'Zero Manual Re-Keying',
      },
    ],
    useCases: [
      {
        industry: 'Construction & Engineering',
        scenario: 'Automated Quantity Takeoff from PDF Blueprints',
        outcome: 'Counts 4,500 electrical fixtures and pipe lengths across 80 sheets in 3 minutes with 99.8% accuracy.',
        timeToValue: '3 Days to Production',
      },
      {
        industry: 'Advanced Manufacturing',
        scenario: 'High-Speed Surface Defect & Weld Quality Inspection',
        outcome: 'Audits precision automotive parts at 120 units/minute, flagging micro-cracks under 0.2mm.',
        timeToValue: '10 Days to Production',
      },
      {
        industry: 'Insurance & Claims',
        scenario: 'Automotive & Property Damage Assessment',
        outcome: 'Analyzes photo uploads of vehicle collisions, generating repair estimates and parts lists automatically.',
        timeToValue: '7 Days to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'High-Res Visual Upload or Stream',
        phase: 'Input',
        description: 'Receives high-resolution PDF blueprints, drone imagery, or 4K video feeds from production lines.',
        output: 'Normalized Image Frame Matrix',
      },
      {
        step: 2,
        title: 'Multi-Scale Feature & OCR Extraction',
        phase: 'AI Processing',
        description: 'Applies vision models to segment layers, recognize visual symbols, and extract text/dimensions.',
        output: 'Spatial Feature Vectors & Text Tokens',
      },
      {
        step: 3,
        title: 'Spatial Geometry & Semantic Parsing',
        phase: 'Intelligent Decision',
        description: 'Correlates drawing legends with spatial symbols to calculate counts, areas, and specifications.',
        output: 'Structured Bill of Materials',
      },
      {
        step: 4,
        title: 'Anomaly & Compliance Rule Verification',
        phase: 'Action',
        description: 'Cross-checks extracted measurements against engineering tolerances and safety building codes.',
        output: 'Flagged Anomalies & Approved Specs',
      },
      {
        step: 5,
        title: 'Structured Export & Visual Heatmap Overlay',
        phase: 'Results',
        description: 'Outputs Excel/CSV BOM and interactive UI with clickable visual bounding box overlays.',
        output: 'Exportable BOM & Annotated Visuals',
      },
    ],
    techStack: [
      {
        layer: 'Vision Models & Spatial Encoders',
        technologies: ['Gemini 2.5 Pro Vision', 'YOLOv11 Enterprise', 'Segment Anything 2 (SAM-2)'],
      },
      {
        layer: 'Edge Acceleration & Inference',
        technologies: ['NVIDIA TensorRT', 'ONNX Runtime', 'CUDA High-Throughput Pipelines'],
      },
      {
        layer: 'CAD & Document Parsing',
        technologies: ['PyMuPDF Vector Engine', 'OpenCV', 'GDAL Spatial Geometry'],
      },
    ],
    connectedSystems: ['Procore', 'Autodesk Construction Cloud', 'PlanGrid', 'SAP S/4HANA', 'Siemens MindSphere', 'AWS S3', 'Azure Blob'],
    metrics: [
      { label: 'Symbol Extraction Accuracy', value: '99.4%' },
      { label: 'Takeoff Processing Speed', value: '3s / Sheet' },
      { label: 'Inspection Frame Rate', value: 'Up to 60 FPS' },
      { label: 'Defect Catch Rate', value: '99.98%' },
    ],
    demoCapabilities: ['Blueprint Takeoff Scanner', 'Defect Heatmap Simulator', 'OCR Spec Extractor'],
    cta: {
      primary: 'Test VisionIQ™',
      secondary: 'Schedule Multimodal Vision Review',
    },
  },
  {
    id: 'compliance-guard',
    name: 'Artify ComplianceGuard™',
    slug: 'ai-governance-audit-core',
    category: 'custom-ai-solutions',
    categoryLabel: 'Custom AI Solutions & Security Governance',
    tagline: 'Continuous AI Security, Red-Teaming & Audit Sentinel',
    shortDescription: 'Enterprise AI security and governance platform providing real-time prompt injection defense, PII masking, data loss prevention, and automated regulatory compliance.',
    longDescription: 'Artify ComplianceGuard™ allows enterprises to deploy AI models with complete confidence. Guard acts as an intelligent firewall sitting between enterprise users, AI models, and internal data stores—inspecting every prompt and response for PII, toxic content, intellectual property leaks, and malicious adversarial attacks in sub-milliseconds.',
    icon: 'Shield',
    badge: 'Enterprise Security',
    status: 'general-availability',
    rating: 4.99,
    uptime: '99.999%',
    problem: {
      title: 'Enterprise AI Adoption Blocked by Security and Regulatory Fears',
      summary: 'Chief Information Security Officers (CISOs) are forced to block employee AI usage due to risks of data leakage and unmonitored shadow AI.',
      points: [
        'Employees accidentally paste proprietary source code or customer credit card details into AI tools.',
        'Adversarial prompt injection attacks can trick LLMs into exposing confidential database records.',
        'EU AI Act, SOC2, and HIPAA require strict auditing of all automated algorithmic decisions.',
        'Model drift and unmonitored bias create immense brand and legal liability.',
      ],
    },
    solution: {
      title: 'Zero-Trust AI Gateway with Real-Time Cryptographic Audit Trails',
      summary: 'ComplianceGuard provides automated PII tokenization, sub-millisecond red-teaming defenses, and tamper-proof cryptographic audit ledgers.',
      points: [
        'Dynamic PII Masking: Detects SSNs, names, addresses, and credit cards, replacing them with reversible surrogate tokens.',
        'Adversarial Jailbreak Shield: Neutralizes indirect prompt injections, system prompt extraction, and jailbreak attempts.',
        'Real-Time Model Drift Telemetry: Monitors latency, toxicity, output variance, and cost across all deployed models.',
        'SOC2 / HIPAA / EU AI Act Reports: One-click export of compliance dossiers for external auditor sign-off.',
      ],
    },
    features: [
      {
        title: 'Zero-Latency Security Proxy',
        description: 'Intercepts incoming prompts and outgoing generations in under 12 milliseconds without slowing UX.',
        icon: 'ShieldAlert',
        metric: '< 12ms Proxy Latency',
      },
      {
        title: 'Reversible PII De-Identification',
        description: 'Replaces sensitive patient/customer identifiers before sending to external LLM APIs.',
        icon: 'Lock',
        metric: '100% PII Redaction',
      },
      {
        title: 'Automated Red-Teaming Suite',
        description: 'Continuously bombards your AI endpoints with 50,000+ synthetic attack vectors to discover vulnerabilities.',
        icon: 'Terminal',
        metric: 'Continuous Vulnerability Scan',
      },
      {
        title: 'Cryptographic Decision Ledger',
        description: 'Stores cryptographically signed records of all inputs, outputs, and system actions for tamper-proof auditing.',
        icon: 'Database',
        metric: 'Immutable Audit Trail',
      },
    ],
    benefits: [
      {
        title: 'Unblock Enterprise AI Deployment',
        description: 'Satisfy rigorous CISO and risk committee requirements, accelerating AI project approvals from months to days.',
        value: '10x Faster CISO Sign-Off',
      },
      {
        title: 'Zero Data Leakage to Third Parties',
        description: 'Ensure customer PII and proprietary trade secrets never leave your private corporate perimeter.',
        value: '100% DLP Protection',
      },
      {
        title: 'Guaranteed Regulatory Compliance',
        description: 'Stay ahead of EU AI Act, HIPAA, SOC2 Type II, and ISO 42001 regulations automatically.',
        value: 'Audit-Ready Always',
      },
      {
        title: 'Centralized Cost & Rate-Limit Control',
        description: 'Manage token quotas, routing budgets, and model fallback policies across the entire company.',
        value: '30% Token Cost Reduction',
      },
    ],
    useCases: [
      {
        industry: 'Healthcare & Life Sciences',
        scenario: 'HIPAA-Compliant Patient Record Processing',
        outcome: 'Sanitizes patient health records before passing to diagnostic AI models with 100% PHI redaction.',
        timeToValue: '3 Days to Production',
      },
      {
        industry: 'Banking & Financial Institutions',
        scenario: 'Credit Card & Account Security Firewall',
        outcome: 'Blocks prompt injection attempts and customer account number leakage across 2 million daily queries.',
        timeToValue: '5 Days to Production',
      },
      {
        industry: 'Legal & Intellectual Property',
        scenario: 'Trade Secret & NDA Leak Prevention',
        outcome: 'Prevents internal engineering teams from pasting unreleased patents or copyrighted source code into public LLMs.',
        timeToValue: '1 Week to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Prompt Interception at Gateway',
        phase: 'Input',
        description: 'Employee or API client submits request to AI proxy gateway before reaching any model.',
        output: 'Raw Inbound Request',
      },
      {
        step: 2,
        title: 'PII Detection & Tokenization',
        phase: 'AI Processing',
        description: 'Identifies 80+ PII/PHI categories and replaces them with secure cryptographic tokens.',
        output: 'Sanitized Safe Payload',
      },
      {
        step: 3,
        title: 'Adversarial Jailbreak & Injection Scan',
        phase: 'Intelligent Decision',
        description: 'Evaluates payload against 50,000+ jailbreak embeddings and semantic heuristic rules.',
        output: 'Security Threat Score (Pass/Block)',
      },
      {
        step: 4,
        title: 'Target Model Forwarding & Output Audit',
        phase: 'Action',
        description: 'Forwards safe prompt to target LLM, then audits model response for toxic content or leaked secrets.',
        output: 'Audited Model Generation',
      },
      {
        step: 5,
        title: 'De-Tokenization & Immutable Ledger Record',
        phase: 'Results',
        description: 'Restores user-specific tokens on response stream and logs signed cryptographic telemetry hash.',
        output: 'Safe Response + Compliance Receipt',
      },
    ],
    techStack: [
      {
        layer: 'High-Speed Security Gateway',
        technologies: ['Envoy Proxy Custom Filter', 'Rust Wasm Security Modules', 'Redis Cluster Cache'],
      },
      {
        layer: 'PII & Redaction Core',
        technologies: ['Microsoft Presidio Extended', 'Named Entity Recognition (NER)', 'Artify Tokenizer'],
      },
      {
        layer: 'Audit & Compliance Storage',
        technologies: ['TimescaleDB', 'Amazon QLDB / Immutable S3 Object Lock', 'OpenSearch'],
      },
    ],
    connectedSystems: ['Okta', 'Azure Active Directory', 'AWS IAM', 'Datadog', 'Splunk', 'CrowdStrike', 'Palo Alto Networks', 'OpenAI', 'Anthropic', 'Google Vertex'],
    metrics: [
      { label: 'Proxy Inspection Latency', value: '< 12ms' },
      { label: 'PII Detection Rate', value: '99.99%' },
      { label: 'Jailbreak Attack Block Rate', value: '99.8%' },
      { label: 'Compliance Standards Covered', value: 'SOC2, HIPAA, EU AI Act, ISO42001' },
    ],
    demoCapabilities: ['Live PII Tokenizer Demo', 'Prompt Injection Defense Arena', 'Compliance Dossier Generator'],
    cta: {
      primary: 'Explore ComplianceGuard™',
      secondary: 'Schedule Enterprise Security Audit',
    },
  },
  {
    id: 'custom-forge',
    name: 'Artify CustomForge™',
    slug: 'custom-enterprise-ai-solutions',
    category: 'custom-ai-solutions',
    categoryLabel: 'Custom AI Solutions & Model Engineering',
    tagline: 'Bespoke Domain-Specific Model Fine-Tuning & Deployment Platform',
    shortDescription: 'Custom AI architecture tailored to your unique operational logic, private proprietary data, and internal proprietary workflows with guaranteed SLA.',
    longDescription: 'Artify CustomForge™ is our high-touch AI engineering platform. When off-the-shelf models are too generic, too expensive, or legally prohibited from accessing your proprietary data, CustomForge engineers bespoke Small Language Models (SLMs), fine-tunes domain weights, and delivers private on-premise AI systems built exclusively for your business.',
    icon: 'Terminal',
    badge: 'Bespoke Engineering',
    status: 'general-availability',
    rating: 4.99,
    uptime: '99.99%',
    problem: {
      title: 'Off-The-Shelf AI Models Fail to Understand Domain-Specific Nuances',
      summary: 'Public LLMs are trained on general internet data and fail to perform proprietary engineering calculations, specific insurance formulas, or niche legal tasks.',
      points: [
        'Public frontier models cost hundreds of thousands per month at scale.',
        'High latency makes real-time industrial robotics and edge processing impossible.',
        'Legal regulations prevent transmitting sensitive internal IP to third-party model providers.',
        'Generic models hallucinate heavily when working with proprietary taxonomies and codes.',
      ],
    },
    solution: {
      title: 'Domain-Specialized Distilled Models Engineered for Your Stack',
      summary: 'Artify engineers custom 3B–70B parameter models trained on your verified data, running in your private cloud with 10x lower latency and 90% lower inference costs.',
      points: [
        'Proprietary Synthetic Dataset Curation: Cleans, structures, and enriches your historical data for supervised fine-tuning (SFT).',
        'Direct Preference Optimization (DPO): Aligns model outputs to match your senior subject matter experts.',
        'Private Infrastructure Deployment: Runs on your own AWS/GCP VPC or local air-gapped on-premise hardware.',
        'Permanent IP Ownership: You own 100% of the model weights, training scripts, and dataset artifacts.',
      ],
    },
    features: [
      {
        title: 'Bespoke Weight Fine-Tuning',
        description: 'Full fine-tuning and LoRA/QLoRA parameter-efficient adaptation on proprietary corporate datasets.',
        icon: 'Cpu',
        metric: '99.8% Domain Task Accuracy',
      },
      {
        title: '10x Faster Inference Latency',
        description: 'Quantized 4-bit and 8-bit vLLM deployments delivering token generation speeds up to 180 tokens/sec.',
        icon: 'Zap',
        metric: '180 tokens / second',
      },
      {
        title: '90% Cost Reduction at Scale',
        description: 'Replace expensive frontier API calls with self-hosted private models that scale to millions of tokens for pennies.',
        metric: '-90% Inference OPEX',
      },
      {
        title: '100% Air-Gapped Deployment',
        description: 'Deploy inside defense, banking, or medical air-gapped server environments with zero internet access.',
        icon: 'Lock',
        metric: 'Zero Internet Egress',
      },
    ],
    benefits: [
      {
        title: 'Total Intellectual Property Ownership',
        description: 'Your trained model is your company’s proprietary digital asset that can never be shut down or revoked by external vendors.',
        value: '100% IP Ownership',
      },
      {
        title: 'Deterministic Domain Precision',
        description: 'Eliminates generic fluff and forces the model to follow your exact company coding and compliance standards.',
        value: 'Domain Grounded',
      },
      {
        title: 'Dramatically Lower Operational Costs',
        description: 'Drastically reduce annual token bills compared to recurring public frontier LLM API subscriptions.',
        value: '90% Cost Savings',
      },
      {
        title: 'Sub-100ms Edge Response Times',
        description: 'Deploy on factory floor edge servers, hospital bedside tablets, or mobile apps without cloud lag.',
        value: '< 100ms Latency',
      },
    ],
    useCases: [
      {
        industry: 'Precision Manufacturing',
        scenario: 'Proprietary CNC & CAD Toolpath Optimization',
        outcome: 'Distilled 7B model generates custom G-code toolpaths 8x faster than traditional CAM software.',
        timeToValue: '3 Weeks to Production',
      },
      {
        industry: 'Quantitative Hedge Funds',
        scenario: 'High-Frequency News & SEC Filing Alpha Extraction',
        outcome: 'Custom sub-10ms model scores earnings calls and 8-K filings for algorithmic trading signals.',
        timeToValue: '4 Weeks to Production',
      },
      {
        industry: 'Defense & Aerospace',
        scenario: 'Air-Gapped Flight Telemetry Diagnostic Assistant',
        outcome: 'Runs fully offline inside aircraft maintenance hangars with zero external network connectivity.',
        timeToValue: '6 Weeks to Production',
      },
    ],
    workflow: [
      {
        step: 1,
        title: 'Dataset Extraction & Sanitization',
        phase: 'Input',
        description: 'Ingests historical enterprise data, structures multi-turn conversations, and cleans proprietary datasets.',
        output: 'Curated Training Corpus',
      },
      {
        step: 2,
        title: 'Synthetic Data Augmentation & Verification',
        phase: 'AI Processing',
        description: 'Generates thousands of edge-case training pairs reviewed by enterprise subject matter experts.',
        output: 'High-Fidelity Fine-Tuning Dataset',
      },
      {
        step: 3,
        title: 'Supervised Fine-Tuning & Alignment (DPO)',
        phase: 'Intelligent Decision',
        description: 'Trains base open-weights model on dedicated GPU clusters with Direct Preference Optimization.',
        output: 'Trained Model Weights',
      },
      {
        step: 4,
        title: 'Quantization & High-Throughput vLLM Serving',
        phase: 'Action',
        description: 'Quantizes weights to FP8/INT4 and deploys into private customer Kubernetes cluster with auto-scaling.',
        output: 'Dedicated Private Inference Endpoint',
      },
      {
        step: 5,
        title: 'Continuous Evaluation & Drift Monitoring',
        phase: 'Results',
        description: 'Monitors real-world performance against baseline benchmarks and schedules automated retraining sprints.',
        output: 'Continuous Enterprise Model Cycle',
      },
    ],
    techStack: [
      {
        layer: 'Model Foundations & Fine-Tuning',
        technologies: ['Llama 3.3', 'Qwen 2.5', 'Mistral Large', 'DeepSeek-R1 Distilled', 'Axolotl / Unsloth'],
      },
      {
        layer: 'Inference Acceleration & Serving',
        technologies: ['vLLM High-Throughput Engine', 'TGI (Text Generation Inference)', 'NVIDIA TensorRT-LLM'],
      },
      {
        layer: 'Private Cloud Infrastructure',
        technologies: ['Kubernetes (EKS / GKE)', 'KServe', 'NVIDIA H100 / A100 GPU Clusters', 'Ray Distributed Compute'],
      },
    ],
    connectedSystems: ['Private AWS VPC', 'Google Cloud Platform', 'Microsoft Azure Confidential Compute', 'On-Premise NVIDIA DGX', 'Kubernetes'],
    metrics: [
      { label: 'Domain Task Accuracy', value: '99.8%' },
      { label: 'Inference Speed', value: '180 tokens/sec' },
      { label: 'Cost Reduction vs Frontier APIs', value: '88% – 93%' },
      { label: 'Model Weights Ownership', value: '100% Client-Owned' },
    ],
    demoCapabilities: ['Model Benchmark Comparator', 'Cost-At-Scale Calculator', 'Private Deployment Blueprint'],
    cta: {
      primary: 'Request Custom AI Proposal',
      secondary: 'Schedule Custom Model Engineering Session',
    },
  },
];

// Helper Functions for Data-Driven Product Architecture
export function getAiProducts(): AiProductItem[] {
  return AI_PRODUCTS;
}

export function getAiProductBySlug(slug: string): AiProductItem | undefined {
  return AI_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getAiProductsByCategory(category: AiProductCategoryType): AiProductItem[] {
  if (category === 'all') return AI_PRODUCTS;
  return AI_PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedAiProducts(): AiProductItem[] {
  return AI_PRODUCTS.slice(0, 4);
}
