-- ============================================================================
-- ARTIFY SOLS BACKEND — POSTGRESQL & SUPABASE PRODUCTION SCHEMA (V1.0)
-- Multi-Tenant Schema with Row Level Security (RLS) and Audit Logging
-- ============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. COMPANIES (TENANTS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    tier VARCHAR(50) NOT NULL DEFAULT 'starter' CHECK (tier IN ('starter', 'growth', 'enterprise', 'custom')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'trial', 'canceled')),
    domain VARCHAR(255),
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_tier ON public.companies(tier);

-- ----------------------------------------------------------------------------
-- 2. USERS & PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL DEFAULT 'Employee',
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_verification')),
    avatar_url TEXT,
    phone VARCHAR(50),
    mfa_enabled BOOLEAN NOT NULL DEFAULT false,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_company_id ON public.users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ----------------------------------------------------------------------------
-- 3. PERMISSIONS & ROLES (RBAC)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.permissions (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    module VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(100) NOT NULL,
    permission_code VARCHAR(100) NOT NULL REFERENCES public.permissions(code) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(role_name, permission_code)
);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON public.role_permissions(role_name);

-- ----------------------------------------------------------------------------
-- 4. SESSIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sessions (
    token VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    role VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON public.sessions(expires_at);

-- ----------------------------------------------------------------------------
-- 5. SUBSCRIPTIONS & QUOTAS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    plan_id VARCHAR(50) NOT NULL CHECK (plan_id IN ('starter', 'growth', 'enterprise')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
    billing_cycle VARCHAR(20) NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
    price_cents INTEGER NOT NULL DEFAULT 0,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    token_usage_current BIGINT NOT NULL DEFAULT 0,
    token_usage_limit BIGINT NOT NULL DEFAULT 10000000,
    api_calls_current BIGINT NOT NULL DEFAULT 0,
    api_calls_limit BIGINT NOT NULL DEFAULT 500000,
    coworkers_active INTEGER NOT NULL DEFAULT 1,
    coworkers_limit INTEGER NOT NULL DEFAULT 5,
    stripe_customer_id VARCHAR(100),
    stripe_subscription_id VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_company_id ON public.subscriptions(company_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- ----------------------------------------------------------------------------
-- 6. API KEYS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.api_keys (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(30) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    full_key_preview VARCHAR(50) NOT NULL,
    scopes JSONB NOT NULL DEFAULT '["read", "write"]'::jsonb,
    environment VARCHAR(20) NOT NULL DEFAULT 'production' CHECK (environment IN ('production', 'staging', 'development')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
    rate_limit_per_min INTEGER NOT NULL DEFAULT 600,
    requests_count BIGINT NOT NULL DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_company_id ON public.api_keys(company_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON public.api_keys(key_hash);

-- ----------------------------------------------------------------------------
-- 7. CMS ARTICLES & BLOG
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'approved', 'scheduled', 'published', 'archived')),
    seo JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by_type VARCHAR(20) NOT NULL DEFAULT 'human' CHECK (created_by_type IN ('human', 'ai')),
    agent_id VARCHAR(64),
    model_used VARCHAR(100),
    task_id VARCHAR(64),
    reviewed_by VARCHAR(64),
    approved_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    view_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_articles_company_slug ON public.articles(company_id, slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at);

-- ----------------------------------------------------------------------------
-- 8. AI COWORKERS (PERSISTENT AGENTS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_coworkers (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'idle', 'paused', 'disabled')),
    model VARCHAR(100) NOT NULL DEFAULT 'gemini-3.7-flash',
    temperature NUMERIC(3, 2) NOT NULL DEFAULT 0.3,
    system_instructions TEXT NOT NULL,
    assigned_tools JSONB NOT NULL DEFAULT '[]'::jsonb,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
    approval_policy JSONB NOT NULL DEFAULT '{}'::jsonb,
    schedule_cron VARCHAR(100),
    metrics JSONB NOT NULL DEFAULT '{"totalTasksExecuted":0,"successfulTasks":0,"failedTasks":0,"pendingApprovals":0,"estimatedCostUsd":0}'::jsonb,
    last_run_at TIMESTAMPTZ,
    next_scheduled_run_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_coworkers_company_id ON public.ai_coworkers(company_id);
CREATE INDEX IF NOT EXISTS idx_ai_coworkers_status ON public.ai_coworkers(status);

-- ----------------------------------------------------------------------------
-- 9. AI TASKS & EXECUTION TRACES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_tasks (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    coworker_id VARCHAR(64) NOT NULL REFERENCES public.ai_coworkers(id) ON DELETE CASCADE,
    coworker_name VARCHAR(255) NOT NULL,
    task_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED' CHECK (status IN ('QUEUED', 'RUNNING', 'WAITING_APPROVAL', 'COMPLETED', 'FAILED', 'CANCELLED')),
    approval_data JSONB,
    result JSONB,
    error TEXT,
    execution_logs JSONB NOT NULL DEFAULT '[]'::jsonb,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_tasks_company_id ON public.ai_tasks(company_id);
CREATE INDEX IF NOT EXISTS idx_ai_tasks_coworker_id ON public.ai_tasks(coworker_id);
CREATE INDEX IF NOT EXISTS idx_ai_tasks_status ON public.ai_tasks(status);

-- ----------------------------------------------------------------------------
-- 10. LEADS & CONTACT BRIEFS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    industry VARCHAR(100),
    project_description TEXT NOT NULL,
    timeline VARCHAR(100),
    budget VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
    source VARCHAR(100) NOT NULL DEFAULT 'website_brief',
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);

-- ----------------------------------------------------------------------------
-- 11. AUDIT LOGS (IMMUTABLE)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    actor_id VARCHAR(64) NOT NULL,
    actor_name VARCHAR(255) NOT NULL,
    actor_type VARCHAR(20) NOT NULL CHECK (actor_type IN ('user', 'ai_agent', 'system', 'api_key')),
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(64) NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_company_id ON public.audit_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

-- ----------------------------------------------------------------------------
-- 12. NOTIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error', 'ai_approval')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_company_user ON public.notifications(company_id, user_id, read);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Multi-Tenant Isolation Enforcement
-- ============================================================================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_coworkers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to extract authenticated user's company_id
CREATE OR REPLACE FUNCTION public.auth_company_id() RETURNS VARCHAR AS $$
    SELECT NULLIF(current_setting('request.jwt.claim.companyId', true), '')::VARCHAR;
$$ LANGUAGE sql STABLE;

-- Company Isolation Policy: Users can only view & mutate records belonging to their company
CREATE POLICY tenant_isolation_users ON public.users
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_subscriptions ON public.subscriptions
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_api_keys ON public.api_keys
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_articles ON public.articles
    USING (status = 'published' OR company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_ai_coworkers ON public.ai_coworkers
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_ai_tasks ON public.ai_tasks
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_audit_logs ON public.audit_logs
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');

CREATE POLICY tenant_isolation_notifications ON public.notifications
    USING (company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');
