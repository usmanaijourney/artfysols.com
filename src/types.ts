export interface Industry {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  coreAgents: string[];
  keyWorkflows: { title: string; desc: string; impact: string }[];
  connectedSystems: string[];
  metrics: { label: string; value: string }[];
}

export type AiProductCategoryType =
  | 'all'
  | 'ai-automation'
  | 'ai-agents'
  | 'generative-ai'
  | 'business-intelligence'
  | 'ai-customer-experience'
  | 'ai-productivity'
  | 'custom-ai-solutions';

export interface AiProductWorkflowStep {
  step: number;
  title: string;
  phase: string;
  description: string;
  output: string;
}

export interface AiProductFeature {
  title: string;
  description: string;
  icon?: string;
  metric?: string;
}

export interface AiProductUseCase {
  industry: string;
  scenario: string;
  outcome: string;
  timeToValue: string;
}

export interface AiProductBenefit {
  title: string;
  description: string;
  value?: string;
}

export interface AiProductTechLayer {
  layer: string;
  technologies: string[];
}

export interface AiProductItem {
  id: string;
  name: string;
  slug: string;
  category: AiProductCategoryType;
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  badge?: string;
  status: 'available' | 'enterprise-preview' | 'general-availability';
  rating?: number;
  uptime?: string;
  problem: {
    title: string;
    summary: string;
    points: string[];
  };
  solution: {
    title: string;
    summary: string;
    points: string[];
  };
  features: AiProductFeature[];
  benefits: AiProductBenefit[];
  useCases: AiProductUseCase[];
  workflow: AiProductWorkflowStep[];
  techStack: AiProductTechLayer[];
  connectedSystems: string[];
  metrics: { label: string; value: string }[];
  demoCapabilities?: string[];
  cta: {
    primary: string;
    secondary: string;
  };
}

export type AppRoute =
  | 'home'
  | 'ai-solutions'
  | 'ai-product-detail'
  | 'product-detail'
  | 'services'
  | 'industries'
  | 'case-studies'
  | 'about'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'privacy'
  | 'privacy-policy'
  | 'terms';

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  icon: string;
  status: 'active' | 'analyzing' | 'orchestrating' | 'standby';
  tools: string[];
  permissions: string;
  sampleAction: string;
  throughput: string;
}

export interface BusinessFunction {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  capabilities: { title: string; description: string; tag: string }[];
  agentFleet: string[];
  sampleWorkflow: { step: string; actor: string; output: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category?: string;
  description?: string;
  architecture?: string[];
  agents?: string[];
  kpis?: { label: string; value: string }[];
  highlight?: string;
  industry?: string;
  timeframe?: string;
  tagline?: string;
  clientType?: string;
  challenge?: string;
  solution?: string;
  systemsConnected?: string[];
  results?: { metric: string; label: string }[];
}

export interface MethodologyStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface IntegrationCategory {
  category: string;
  description: string;
  items: { name: string; type: string; status: string }[];
}

export interface EnterpriseIntegration {
  id: string;
  name: string;
  category: 'erp' | 'crm' | 'collaboration' | 'cloud' | 'finance' | 'custom';
  protocol: string;
  logo: string;
  tagline: string;
}

export interface GeneratedBlueprint {
  goal: string;
  department: string;
  industry: string;
  currentStack: string;
  suggestedAgents: string[];
  architectureSummary: string;
  estimatedTimeToValue: string;
  recommendedPipelines: string[];
}

export interface ProjectBriefSubmission {
  name: string;
  company: string;
  email: string;
  phone?: string;
  industry: string;
  projectDescription: string;
  currentTools?: string;
  timeline: string;
}

export interface ConsultantMessage {
  id: string;
  role?: 'user' | 'agent' | 'system' | 'assistant';
  sender?: 'user' | 'agent';
  content?: string;
  text?: string;
  timestamp: string;
  suggestedActions?: string[];
  suggestedArchitecture?: string[];
  architectureBlueprint?: any;
  suggestions?: string[];
}

export interface ArtifyProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface ArtifyProductPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'annual' | 'one_time';
  trialDays: number;
  features: string[];
  limits?: { [key: string]: string | number };
  recommended?: boolean;
}

export interface ArtifyProduct {
  id: string;
  name: string;
  slug: string;
  category: 'ai_software' | 'ai_agents' | 'accounting_software' | 'business_automation' | 'erp_solutions' | 'analytics' | 'productivity_tools' | 'custom_software';
  categoryLabel: string;
  type: 'saas_application' | 'autonomous_agent_fleet' | 'intelligence_engine' | 'api_platform';
  version: string;
  badge?: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  connectedSystems: string[];
  assignedAgents: string[];
  plans: ArtifyProductPlan[];
  pricingModel: 'subscription' | 'one_time' | 'hybrid';
  trialAvailable: boolean;
  trialDays: number;
  rating: number;
  reviewsCount: number;
  uptime: string;
  faqs: { question: string; answer: string }[];
  requirements: string[];
  status: 'active' | 'beta' | 'coming_soon';
}

export interface ArtifyService {
  id: string;
  name: string;
  slug: string;
  category: 'ai_consulting' | 'ai_implementation' | 'business_automation' | 'erp_consulting' | 'software_development' | 'custom_ai_solutions' | 'data_analytics' | 'ai_agent_development';
  categoryLabel: string;
  pricingModel: 'one_time' | 'recurring' | 'quote_based' | 'subscription_based';
  startingPrice: number;
  priceUnit: string;
  tagline: string;
  description: string;
  deliverables: string[];
  estimatedTimeline: string;
  availability: 'immediate' | 'next_sprint' | 'custom_booking' | 'limited_slots';
  recommendedFor: string;
  technologies: string[];
  status: 'active' | 'limited_slots';
}

export interface OrderItem {
  id: string;
  productId?: string;
  serviceId?: string;
  planId?: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  billingCycle?: 'monthly' | 'annual' | 'one_time';
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  userId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  tax: number;
  total: number;
  currency: string;
  status: 'completed' | 'processing' | 'pending' | 'cancelled' | 'refunded' | 'failed';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  receiptUrl?: string;
}

export interface CustomerPayment {
  id: string;
  transactionId: string;
  orderId: string;
  subscriptionId?: string;
  date: string;
  amount: number;
  currency: string;
  paymentMethod: {
    type: 'card' | 'paypal' | 'bank_transfer' | 'invoice';
    brand?: 'visa' | 'mastercard' | 'amex';
    last4?: string;
    email?: string;
  };
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  description: string;
  receiptNumber: string;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  orderId?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  date?: string;
  period?: string;
  downloadUrl?: string;
  amount: number;
  subtotal: number;
  tax: number;
  discount: number;
  currency: string;
  status: 'paid' | 'open' | 'overdue' | 'void';
  paymentMethod: string;
  description: string;
  billingTo: {
    name: string;
    company: string;
    email: string;
    address: string;
    taxNumber?: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
}

export interface TicketMessage {
  id: string;
  sender: 'customer' | 'support_agent' | 'ai_assistant';
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  attachments?: { name: string; url: string; size: string }[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  subject: string;
  category: 'technical' | 'billing' | 'agent_orchestration' | 'feature_request' | 'security' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedAgent?: string;
  messages: TicketMessage[];
}

export interface CustomerNotification {
  id: string;
  userId: string;
  type: 'purchase' | 'subscription' | 'renewal' | 'payment' | 'security' | 'announcement';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface SecurityEvent {
  id: string;
  type: 'login' | 'password_change' | 'mfa_enabled' | 'api_key_created' | 'email_updated' | 'session_revoked';
  description: string;
  timestamp: string;
  ip: string;
  location: string;
  status: 'success' | 'warning' | 'alert';
}

export interface UserSubscription {
  planId: 'starter' | 'growth' | 'enterprise' | 'custom';
  planName: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused';
  billingCycle: 'monthly' | 'annual';
  price: number;
  startDate: string;
  renewsOn: string;
  trialEndsOn?: string;
  autoRenew: boolean;
  agentConcurrencyLimit: number;
  monthlyTokenQuota: number;
  monthlyTokensUsed: number;
  activeAgentsCount: number;
  dedicatedArchitectName?: string;
  addOns: {
    id: string;
    name: string;
    price: number;
    enabled: boolean;
  }[];
}

export interface PurchasedProduct {
  id: string;
  name: string;
  code: string;
  category: 'autonomous_agent' | 'orchestration_layer' | 'bi_dashboard' | 'custom_solution' | 'integration_hub' | 'ai_software' | 'accounting_software';
  version: string;
  description: string;
  purchaseDate: string;
  purchaseType: 'subscription_included' | 'one_time_license' | 'custom_build';
  licenseKey: string;
  status: 'deployed_active' | 'updating' | 'standby' | 'provisioning';
  environment: 'AWS us-east-1' | 'GCP europe-west2' | 'Azure On-Premise' | 'Cloud Run Ingress';
  endpointUrl: string;
  connectedSystems: string[];
  uptime: string;
  requestsThisMonth: number;
  monthlyHoursSaved: number;
  assignedAgents: string[];
  docsUrl?: string;
  telemetry: {
    health: '100% Operational' | 'Degraded' | 'Maintenance';
    latencyMs: number;
    errorRate: string;
    lastSynced: string;
  };
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  period: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  description: string;
  downloadUrl?: string;
  items: {
    description: string;
    qty: number;
    amount: number;
  }[];
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  keyPrefix: string;
  maskedKey: string;
  environment: 'production' | 'sandbox';
  createdAt: string;
  lastUsed: string;
  permissions: 'full_orchestration' | 'read_telemetry' | 'agent_dispatch_only';
}

export interface ProjectMilestone {
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  completionDate?: string;
}

export interface ActiveAIProject {
  id: string;
  name: string;
  category: 'Enterprise Integration' | 'Autonomous Agent Fleet' | 'Custom LLM Fine-Tuning' | 'Real-Time Analytics' | 'Predictive Logistics';
  status: 'in_production' | 'in_development' | 'validation_phase' | 'architectural_scoping';
  stageProgress: number;
  startDate: string;
  targetLaunchDate: string;
  leadArchitect: string;
  description: string;
  techStack: string[];
  assignedAgents: string[];
  milestones: ProjectMilestone[];
  kpis: { label: string; value: string; trend?: string }[];
  liveEndpoint?: string;
  recentLogs?: { timestamp: string; event: string; status: 'ok' | 'info' | 'warning' }[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  country: string;
  timezone: string;
  role: 'customer' | 'editor' | 'admin' | 'super_admin' | 'finance_manager' | 'support_agent' | string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  memberSince: string;
  
  // Business Information
  company: string;
  jobTitle?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  businessAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  taxNumber?: string;
  
  // Legacy / Direct helpers
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    taxId?: string;
  };
  paymentMethod: {
    brand: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiry: string;
  };
  
  subscription: UserSubscription;
  purchasedProducts: PurchasedProduct[];
  activeProjects?: ActiveAIProject[];
  orders: CustomerOrder[];
  payments: CustomerPayment[];
  invoices: (CustomerInvoice | InvoiceRecord)[];
  tickets: SupportTicket[];
  notifications: CustomerNotification[];
  sessions: SecuritySession[];
  securitySessions?: SecuritySession[];
  securityEvents: SecurityEvent[];
  apiKeys: ApiKeyRecord[];
  
  // Preferences
  notificationPreferences?: {
    productUpdates: boolean;
    billingAlerts: boolean;
    securityAlerts: boolean;
    marketingEmails: boolean;
  };
}

export type BlogCategory =
  | 'All'
  | 'AI Research & Insights'
  | 'Enterprise Case Studies'
  | 'Product Updates & News'
  | 'Autonomous Agents'
  | 'Security & Governance'
  | 'Engineering & Architecture';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  verified?: boolean;
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  date: string;
  content: string;
  likes: number;
}

export interface ArticleSeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterImage?: string;
  ogType?: 'article' | 'website' | 'news';
  twitterCard?: 'summary_large_image' | 'summary';
  robotsDirective?: 'index, follow' | 'noindex, nofollow' | 'noindex, follow';
  schemaType?: 'TechArticle' | 'NewsArticle' | 'BlogPosting' | 'Report';
  structuredDataSnippet?: string;
  seoScore?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  type: 'Article' | 'News' | 'Case Study' | 'Whitepaper';
  author: BlogAuthor;
  publishDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  coverGradient?: string;
  views: number;
  likes: number;
  claps?: number;
  bookmarksCount?: number;
  rating?: number;
  ratingCount?: number;
  userRating?: number;
  commentsCount?: number;
  comments?: BlogComment[];
  keyTakeaways?: string[];
  relatedTopics?: string[];
  status?: 'published' | 'draft' | 'archived';
  lastModified?: string;
  draftSavedAt?: string;
  seo?: ArticleSeoMetadata;
}

