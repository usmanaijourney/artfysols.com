/**
 * Artify Sols Backend — In-Memory Multi-Tenant Database Repository
 * Provides transactional state, tenant isolation boundaries, and production seed fixtures.
 */

import crypto from 'crypto';
import {
  Company,
  User,
  Customer,
  ProductServiceItem,
  Subscription,
  ApiKeyRecord,
  ArticleRecord,
  LeadInquiry,
  NotificationRecord,
  AuditLogRecord,
  AiCoworker,
  AiTask,
  PermissionKey,
} from '../types';

export class DatabaseStore {
  public companies: Map<string, Company> = new Map();
  public users: Map<string, User> = new Map();
  public userSessions: Map<string, { userId: string; expiresAt: number }> = new Map();
  public customers: Map<string, Customer> = new Map();
  public products: Map<string, ProductServiceItem> = new Map();
  public subscriptions: Map<string, Subscription> = new Map();
  public apiKeys: Map<string, ApiKeyRecord> = new Map();
  public articles: Map<string, ArticleRecord> = new Map();
  public leads: Map<string, LeadInquiry> = new Map();
  public notifications: Map<string, NotificationRecord> = new Map();
  public auditLogs: AuditLogRecord[] = [];
  public aiCoworkers: Map<string, AiCoworker> = new Map();
  public aiTasks: Map<string, AiTask> = new Map();
  public systemSettings: Record<string, any> = {};

  constructor() {
    this.seedInitialData();
  }

  public generateId(prefix: string = 'art'): string {
    return `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
  }

  public hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private seedInitialData() {
    const now = new Date().toISOString();

    // 1. Primary Tenant: Artify Solutions Enterprise
    const primaryCompany: Company = {
      id: 'org_artify_hq',
      name: 'Artify Solutions HQ',
      slug: 'artify-solutions',
      industry: 'Enterprise AI & Automation Software',
      tier: 'Enterprise',
      status: 'active',
      domain: 'artifysols.com',
      createdAt: now,
      updatedAt: now,
      settings: {
        defaultTimezone: 'Asia/Muscat',
        defaultCurrency: 'USD',
        autoApproveAiDrafts: false,
        maxAiMonthlyBudgetUsd: 5000,
      },
    };

    const clientCompany: Company = {
      id: 'org_apex_logistics',
      name: 'Apex Global Logistics Corp',
      slug: 'apex-logistics',
      industry: 'Freight & Supply Chain Operations',
      tier: 'Growth',
      status: 'active',
      domain: 'apexlogistics.io',
      createdAt: now,
      updatedAt: now,
      settings: {
        defaultTimezone: 'America/New_York',
        defaultCurrency: 'USD',
      },
    };

    this.companies.set(primaryCompany.id, primaryCompany);
    this.companies.set(clientCompany.id, clientCompany);

    // All available permissions for Super Administrator
    const allPermissions: PermissionKey[] = [
      'cms.pages.view',
      'cms.pages.create',
      'cms.pages.update',
      'cms.pages.publish',
      'cms.pages.delete',
      'blog.view',
      'blog.create',
      'blog.update',
      'blog.publish',
      'blog.delete',
      'customers.view',
      'customers.create',
      'customers.update',
      'customers.delete',
      'products.view',
      'products.manage',
      'subscriptions.view',
      'subscriptions.manage',
      'orders.view',
      'orders.manage',
      'payments.view',
      'payments.manage',
      'leads.view',
      'leads.manage',
      'ai.agents.view',
      'ai.agents.create',
      'ai.agents.execute',
      'ai.agents.configure',
      'ai.tasks.view',
      'ai.tasks.approve',
      'ai.tasks.cancel',
      'notifications.send',
      'audit.view',
      'settings.manage',
      'company.manage',
    ];

    // 2. Users / Profiles
    const adminUser: User = {
      id: 'usr_artify_admin',
      companyId: primaryCompany.id,
      email: 'admin@artifysols.com',
      passwordHash: this.hashPassword('ArtifyAdmin2026!'),
      fullName: 'Dr. Sarah Al-Hashimi',
      title: 'VP of AI Architecture & Systems',
      role: 'Super Administrator',
      permissions: allPermissions,
      status: 'active',
      mfaEnabled: true,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const editorialUser: User = {
      id: 'usr_content_lead',
      companyId: primaryCompany.id,
      email: 'editor@artifysols.com',
      passwordHash: this.hashPassword('ArtifyEditor2026!'),
      fullName: 'Marcus Vance',
      title: 'Principal Technical Content Lead',
      role: 'Content Manager',
      permissions: [
        'cms.pages.view',
        'cms.pages.create',
        'cms.pages.update',
        'cms.pages.publish',
        'blog.view',
        'blog.create',
        'blog.update',
        'blog.publish',
        'ai.agents.view',
        'ai.tasks.view',
        'ai.tasks.approve',
        'notifications.send',
      ],
      status: 'active',
      mfaEnabled: false,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const clientUser: User = {
      id: 'usr_apex_lead',
      companyId: clientCompany.id,
      email: 'alex.chen@apexlogistics.io',
      passwordHash: this.hashPassword('ApexClient2026!'),
      fullName: 'Alex Chen',
      title: 'Head of Operations & Logistics',
      role: 'Company Administrator',
      permissions: [
        'subscriptions.view',
        'customers.view',
        'ai.agents.view',
        'ai.agents.execute',
        'audit.view',
      ],
      status: 'active',
      mfaEnabled: true,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(adminUser.id, adminUser);
    this.users.set(editorialUser.id, editorialUser);
    this.users.set(clientUser.id, clientUser);

    // 3. Products & Services Seed
    const seedProducts: ProductServiceItem[] = [
      {
        id: 'prod_recon_ai',
        name: 'Artify ReconAI™',
        slug: 'recon-ai-financial-automation',
        tagline: 'Autonomous Multi-Entity Ledger Reconciliation & Sub-Penny Audit Engine',
        category: 'Autonomous Agents & Finance',
        type: 'product',
        shortDescription:
          'Automates high-throughput multi-currency bank statement parsing, ERP invoice matching, and anomaly resolution with zero human intervention.',
        fullDescription:
          'ReconAI sits directly inside your private VPC to continuously reconcile millions of transactions between NetSuite, SAP, Stripe, and banking APIs with sub-penny precision and SOC2 audit-ready proof trails.',
        pricingType: 'recurring',
        basePriceUsd: 1499,
        features: [
          'Sub-Penny Precision Reconciliation',
          'Autonomous Exception Handling Mesh',
          'SOC2 Type II Audit Trails',
          'Bi-directional ERP Connectors',
        ],
        connectedSystems: ['NetSuite', 'SAP S/4HANA', 'Stripe', 'QuickBooks Enterprise', 'Plaid'],
        status: 'active',
        visibility: 'public',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'prod_customforge',
        name: 'Artify CustomForge™',
        slug: 'custom-enterprise-ai-solutions',
        tagline: 'Bespoke Domain-Specific Model Fine-Tuning & Deployment Platform',
        category: 'Custom AI Solutions',
        type: 'product',
        shortDescription:
          'Custom AI architecture tailored to your unique operational logic, private proprietary data, and internal workflows with guaranteed SLA.',
        fullDescription:
          'End-to-end custom model engineering pipelines including synthetic dataset generation, distillation from frontier models into private SLMs, and air-gapped on-premise inference cluster management.',
        pricingType: 'custom',
        features: [
          'Air-Gapped Private SLM Distillation',
          'Zero Data Retention Guarantee',
          'Sub-40ms Inference Clusters',
          'Bespoke Tool Execution Sandbox',
        ],
        connectedSystems: ['Kubernetes', 'AWS PrivateLink', 'GCP Private Service Connect', 'Snowflake'],
        status: 'active',
        visibility: 'public',
        createdAt: now,
        updatedAt: now,
      },
    ];

    seedProducts.forEach((p) => this.products.set(p.id, p));

    // 4. Subscriptions & API Keys
    const sub1: Subscription = {
      id: 'sub_artify_primary',
      companyId: primaryCompany.id,
      planId: 'plan_enterprise_fleet',
      planName: 'Enterprise Swarm Fleet',
      status: 'active',
      billingCycle: 'annual',
      priceMonthlyUsd: 4999,
      currentPeriodStart: '2026-01-01T00:00:00Z',
      currentPeriodEnd: '2026-12-31T23:59:59Z',
      cancelAtPeriodEnd: false,
      allocatedAgents: 20,
      usedAgents: 8,
      monthlyQueryQuota: 1000000,
      usedQueries: 142850,
      createdAt: now,
      updatedAt: now,
    };

    this.subscriptions.set(sub1.id, sub1);

    const apiKey1: ApiKeyRecord = {
      id: 'key_prod_recon',
      companyId: primaryCompany.id,
      name: 'Production Ingress Key',
      keyPrefix: 'art_live_recon',
      keyHash: this.hashPassword('art_live_recon_9948271649281'),
      fullKeyPreview: 'art_live_recon_••••••••••••9281',
      scopes: ['recon.read', 'recon.write', 'audit.stream'],
      environment: 'production',
      status: 'active',
      rateLimitPerMin: 1200,
      requestsCount: 84320,
      lastUsedAt: now,
      createdAt: now,
    };

    this.apiKeys.set(apiKey1.id, apiKey1);

    // 5. Initial Articles / Blog
    const article1: ArticleRecord = {
      id: 'art_001',
      companyId: primaryCompany.id,
      title:
        'Architecting Autonomous Agent Swarms: How We Reduced Multi-Entity Reconciliation From 14 Days to 90 Seconds',
      slug: 'architecting-autonomous-agent-swarms-financial-reconciliation',
      excerpt:
        'A deep technical breakdown of multi-agent consensus protocols, deterministic validation guards, and vector-backed auditing layers powering high-throughput enterprise ledger alignment.',
      content: `# Architecting Autonomous Agent Swarms\n\nModern financial enterprises operate across dozens of fragmented ledgers...`,
      category: 'Multi-Agent Systems',
      tags: ['Autonomous Agents', 'Financial Architecture', 'Reconciliation', 'SOC2'],
      featuredImage:
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80',
      status: 'published',
      author: {
        name: 'Dr. Sarah Al-Hashimi',
        role: 'VP of AI Architecture',
        type: 'human',
      },
      seo: {
        title: 'Architecting Autonomous Agent Swarms | Artify Solutions',
        description: 'How autonomous agent swarms reduce multi-entity reconciliation from days to seconds.',
        focusKeywords: ['autonomous agent swarms', 'financial reconciliation AI', 'enterprise AI architecture'],
        robots: 'index, follow',
      },
      publishedAt: '2026-08-18T10:00:00Z',
      viewCount: 1420,
      createdAt: now,
      updatedAt: now,
    };

    this.articles.set(article1.id, article1);

    // 6. Production AI Coworkers Registry
    const coworkerContentManager: AiCoworker = {
      id: 'ai_coworker_content_mgr',
      companyId: primaryCompany.id,
      name: 'Artify Content Manager',
      role: 'Autonomous Technical Content & Marketing Strategist',
      department: 'Marketing & Technical Documentation',
      avatarUrl:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=400&q=80',
      description:
        'Continuously analyzes enterprise AI trends, researches whitepapers, identifies content gaps, drafts technical guides, optimizes SEO, and prepares publishing queues with human oversight.',
      systemInstructions: `You are the lead Technical Content Manager for Artify Solutions. You research, structure, write, and optimize enterprise-grade articles on autonomous multi-agent systems, deterministic AI pipelines, and financial ledger automation. Never fabricate unverifiable claims. Always output structured, validated content.`,
      status: 'active',
      model: 'gemini-3.7-flash',
      temperature: 0.3,
      assignedTools: [
        'searchWebsite',
        'searchArticles',
        'getProducts',
        'getSEOData',
        'createDraft',
        'updateDraft',
        'submitForApproval',
        'createNotification',
      ],
      approvalPolicy: {
        searchWebsite: 'AUTO',
        searchArticles: 'AUTO',
        getProducts: 'AUTO',
        getSEOData: 'AUTO',
        createDraft: 'AUTO',
        updateDraft: 'AUTO',
        submitForApproval: 'AUTO',
        publishArticle: 'APPROVAL_REQUIRED',
        deleteArticle: 'APPROVAL_REQUIRED',
      },
      schedule: {
        cronExpression: '0 9 * * 1', // Every Monday at 9:00 AM
        timezone: 'Asia/Muscat',
        enabled: true,
        nextRunAt: '2026-09-01T05:00:00Z',
        lastRunAt: '2026-08-25T05:00:00Z',
      },
      metrics: {
        totalTasksExecuted: 14,
        successfulTasks: 13,
        failedTasks: 1,
        pendingApprovals: 2,
        estimatedCostUsd: 0.48,
      },
      createdAt: now,
      updatedAt: now,
    };

    const coworkerAuditor: AiCoworker = {
      id: 'ai_coworker_recon_auditor',
      companyId: primaryCompany.id,
      name: 'Artify Financial Auditor AI',
      role: 'Continuous Ledger Verification & Anomaly Watcher',
      department: 'Finance & Compliance',
      avatarUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=400&q=80',
      description:
        'Monitors journal entries, cross-checks invoice hashes against bank settlement feeds, and raises deterministic alerts for out-of-balance transactions.',
      systemInstructions: `You are the lead compliance verification agent for Artify Solutions. You rigorously audit financial records, verifying math, dates, and authorization hashes with zero margin of error.`,
      status: 'active',
      model: 'gemini-3.7-flash',
      temperature: 0.1,
      assignedTools: ['getProducts', 'createNotification', 'submitForApproval'],
      approvalPolicy: {
        getProducts: 'AUTO',
        createNotification: 'AUTO',
        submitForApproval: 'AUTO',
      },
      metrics: {
        totalTasksExecuted: 88,
        successfulTasks: 88,
        failedTasks: 0,
        pendingApprovals: 0,
        estimatedCostUsd: 1.12,
      },
      createdAt: now,
      updatedAt: now,
    };

    this.aiCoworkers.set(coworkerContentManager.id, coworkerContentManager);
    this.aiCoworkers.set(coworkerAuditor.id, coworkerAuditor);

    // 7. Seed AI Task with pending approval
    const task1: AiTask = {
      id: 'task_001_rag_bench',
      companyId: primaryCompany.id,
      coworkerId: coworkerContentManager.id,
      coworkerName: coworkerContentManager.name,
      taskType: 'ARTICLE_DRAFT_AND_SEO',
      title: 'Research & Draft Guide: Sub-50ms Hybrid Graph RAG in High-Compliance Banking',
      prompt:
        'Conduct research on hybrid vector-graph indexing for banking regulations and draft an enterprise architectural whitepaper.',
      priority: 'high',
      status: 'WAITING_APPROVAL',
      startedAt: '2026-08-27T08:00:00Z',
      completedAt: '2026-08-27T08:02:15Z',
      approvalData: {
        toolName: 'publishArticle',
        proposedPayload: {
          title: 'Sub-50ms Hybrid Graph RAG in High-Compliance Banking Architectures',
          slug: 'hybrid-graph-rag-banking-compliance',
          category: 'RAG & Knowledge Graphs',
          summary:
            'How fusing knowledge graph traversal with vector similarity eliminates multi-hop hallucinations in financial document retrieval.',
        },
        status: 'pending',
      },
      executionLogs: [
        {
          timestamp: '2026-08-27T08:00:01Z',
          level: 'info',
          message: 'Task initialized by weekly schedule trigger (Asia/Muscat).',
        },
        {
          timestamp: '2026-08-27T08:00:15Z',
          level: 'action',
          message: 'Executing tool: searchArticles(query="RAG banking")',
        },
        {
          timestamp: '2026-08-27T08:01:40Z',
          level: 'action',
          message: 'Executing tool: createDraft(title="Sub-50ms Hybrid Graph RAG...")',
        },
        {
          timestamp: '2026-08-27T08:02:15Z',
          level: 'warn',
          message: 'Action "publishArticle" requires human approval under company policy. Pausing task.',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    this.aiTasks.set(task1.id, task1);

    // 8. Seed Audit Log
    this.auditLogs.push({
      id: 'aud_seed_01',
      companyId: primaryCompany.id,
      actorId: adminUser.id,
      actorName: adminUser.fullName,
      actorType: 'user',
      action: 'SYSTEM_INITIALIZED',
      resource: 'platform',
      details: { version: '3.0.0-enterprise', engine: 'Artify Sols Core Engine' },
      timestamp: now,
    });
  }
}

// Global Singleton Database Instance
export const db = new DatabaseStore();
