/**
 * Artify Sols Backend — Core Type Definitions & Schemas
 * Multi-Tenant, RBAC, CMS, Business Platform, and AI Coworker Types
 */

export type RoleName =
  | 'Super Administrator'
  | 'System Administrator'
  | 'Company Administrator'
  | 'Manager'
  | 'Content Manager'
  | 'Marketing Manager'
  | 'Sales Manager'
  | 'Finance Manager'
  | 'AI Manager'
  | 'Support User'
  | 'Employee'
  | 'Customer'
  | 'Read Only';

export type PermissionKey =
  | 'cms.pages.view'
  | 'cms.pages.create'
  | 'cms.pages.update'
  | 'cms.pages.publish'
  | 'cms.pages.delete'
  | 'blog.view'
  | 'blog.create'
  | 'blog.update'
  | 'blog.publish'
  | 'blog.delete'
  | 'customers.view'
  | 'customers.create'
  | 'customers.update'
  | 'customers.delete'
  | 'products.view'
  | 'products.manage'
  | 'subscriptions.view'
  | 'subscriptions.manage'
  | 'orders.view'
  | 'orders.manage'
  | 'payments.view'
  | 'payments.manage'
  | 'leads.view'
  | 'leads.manage'
  | 'ai.agents.view'
  | 'ai.agents.create'
  | 'ai.agents.execute'
  | 'ai.agents.configure'
  | 'ai.tasks.view'
  | 'ai.tasks.approve'
  | 'ai.tasks.cancel'
  | 'notifications.send'
  | 'audit.view'
  | 'settings.manage'
  | 'company.manage';

export interface Company {
  id: string;
  name: string;
  slug: string;
  industry: string;
  tier: 'Growth' | 'Enterprise' | 'Custom';
  status: 'active' | 'suspended' | 'trial';
  domain?: string;
  createdAt: string;
  updatedAt: string;
  settings: Record<string, any>;
}

export interface User {
  id: string;
  companyId: string;
  email: string;
  passwordHash: string;
  fullName: string;
  title: string;
  role: RoleName;
  permissions: PermissionKey[];
  avatarUrl?: string;
  status: 'active' | 'invited' | 'disabled';
  mfaEnabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  token: string;
  userId: string;
  companyId: string;
  email: string;
  role: RoleName;
  permissions: PermissionKey[];
  expiresAt: number;
}

export interface Customer {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  tier: 'Enterprise' | 'Mid-Market' | 'Startup';
  status: 'active' | 'lead' | 'churned';
  assignedRep?: string;
  notes?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  type: 'product' | 'service';
  shortDescription: string;
  fullDescription: string;
  pricingType: 'recurring' | 'one_time' | 'custom';
  basePriceUsd?: number;
  features: string[];
  connectedSystems: string[];
  status: 'active' | 'draft' | 'archived';
  visibility: 'public' | 'private' | 'enterprise_only';
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  companyId: string;
  planId: string;
  planName: string;
  status: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'expired';
  billingCycle: 'monthly' | 'annual';
  priceMonthlyUsd: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  allocatedAgents: number;
  usedAgents: number;
  monthlyQueryQuota: number;
  usedQueries: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKeyRecord {
  id: string;
  companyId: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  fullKeyPreview: string; // for display only on creation
  scopes: string[];
  environment: 'production' | 'staging' | 'development';
  status: 'active' | 'revoked';
  rateLimitPerMin: number;
  requestsCount: number;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export type ContentStatus =
  | 'draft'
  | 'in_review'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'archived';

export interface ArticleRecord {
  id: string;
  companyId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: ContentStatus;
  author: {
    name: string;
    role: string;
    type: 'human' | 'ai';
    agentId?: string;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl?: string;
    focusKeywords: string[];
    robots?: string;
  };
  provenance?: {
    createdByType: 'human' | 'ai';
    agentName?: string;
    agentId?: string;
    modelUsed?: string;
    taskId?: string;
    generatedAt?: string;
    reviewedBy?: string;
    approvedAt?: string;
  };
  publishedAt?: string;
  scheduledAt?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadInquiry {
  id: string;
  referenceToken: string;
  name: string;
  email: string;
  companyName: string;
  industry: string;
  projectBrief: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRecord {
  id: string;
  companyId?: string;
  userId?: string;
  title: string;
  message: string;
  type: 'system' | 'ai' | 'billing' | 'security' | 'lead';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  companyId: string;
  actorId: string;
  actorName: string;
  actorType: 'user' | 'ai_coworker' | 'system' | 'api_key';
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export type AiApprovalPolicy = 'AUTO' | 'APPROVAL_REQUIRED' | 'DRAFT_ONLY' | 'DISABLED';

export interface AiCoworker {
  id: string;
  companyId: string;
  name: string;
  role: string;
  department: string;
  avatarUrl: string;
  description: string;
  systemInstructions: string;
  status: 'active' | 'paused' | 'disabled';
  model: string;
  temperature: number;
  assignedTools: string[];
  approvalPolicy: Record<string, AiApprovalPolicy>; // toolName -> policy
  schedule?: {
    cronExpression: string;
    timezone: string;
    enabled: boolean;
    nextRunAt?: string;
    lastRunAt?: string;
  };
  metrics: {
    totalTasksExecuted: number;
    successfulTasks: number;
    failedTasks: number;
    pendingApprovals: number;
    estimatedCostUsd: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type AiTaskStatus =
  | 'QUEUED'
  | 'RUNNING'
  | 'WAITING_APPROVAL'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface AiTask {
  id: string;
  companyId: string;
  coworkerId: string;
  coworkerName: string;
  taskType: string;
  title: string;
  prompt: string;
  priority: 'low' | 'medium' | 'high';
  status: AiTaskStatus;
  scheduledTime?: string;
  startedAt?: string;
  completedAt?: string;
  result?: any;
  error?: string;
  approvalData?: {
    toolName: string;
    proposedPayload: any;
    status: 'pending' | 'approved' | 'rejected';
    decidedBy?: string;
    decidedAt?: string;
    decisionNote?: string;
  };
  executionLogs: Array<{
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'action';
    message: string;
    metadata?: any;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface AiToolDefinition {
  name: string;
  description: string;
  category: 'research' | 'cms' | 'analytics' | 'notifications' | 'communication';
  requiredPermission: PermissionKey;
  parameters: {
    type: 'object';
    properties: Record<
      string,
      {
        type: string;
        description: string;
        enum?: string[];
      }
    >;
    required?: string[];
  };
}
