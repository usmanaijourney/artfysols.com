# Artify Sols Backend — Database Architecture & Schema Specification

## 1. Overview
The Artify Sols backend database is designed as a normalized, multi-tenant relational system with Row Level Security (RLS) policies for PostgreSQL and Supabase. Every tenant-sensitive entity enforces strict isolation boundaries via `company_id`.

---

## 2. Entity Relational Hierarchy

```text
companies (Tenants)
   ├── users / profiles
   ├── role_permissions (RBAC)
   ├── sessions (Cryptographic Bearer Sessions)
   ├── subscriptions & quotas
   ├── api_keys
   ├── articles (CMS & Blog)
   ├── ai_coworkers (Autonomous Persistent Agents)
   ├── ai_tasks (Execution Traces & Logs)
   ├── audit_logs (Immutable Event Ledger)
   ├── notifications
   └── background_jobs (Scheduler & Queues)
```

---

## 3. Core Tables Specification

### `companies`
- `id` (VARCHAR(64), PK): Unique identifier (`org_artify_hq`, `org_...`).
- `name` (VARCHAR(255)): Official organization/corporate name.
- `slug` (VARCHAR(255), UNIQUE): Tenant URL slug.
- `tier` (VARCHAR(50)): `starter` | `growth` | `enterprise` | `custom`.
- `status` (VARCHAR(50)): `active` | `suspended` | `trial` | `canceled`.
- `settings` (JSONB): Tenant-specific feature flags and configuration.

### `users`
- `id` (VARCHAR(64), PK): `usr_...`
- `company_id` (VARCHAR(64), FK -> companies.id)
- `email` (VARCHAR(255), UNIQUE)
- `password_hash` (VARCHAR(255)): SHA-256 / bcrypt hash.
- `full_name` (VARCHAR(255))
- `role` (VARCHAR(100)): Primary assigned role.
- `status` (VARCHAR(50)): `active` | `inactive` | `pending_verification`.

### `subscriptions`
- `id` (VARCHAR(64), PK): `sub_...`
- `company_id` (VARCHAR(64), FK -> companies.id)
- `plan_id` (VARCHAR(50)): `starter` | `growth` | `enterprise`.
- `billing_cycle` (VARCHAR(20)): `monthly` | `annual`.
- `token_usage_current` / `token_usage_limit` (BIGINT)
- `api_calls_current` / `api_calls_limit` (BIGINT)
- `coworkers_active` / `coworkers_limit` (INTEGER)

### `ai_coworkers`
- `id` (VARCHAR(64), PK): e.g. `ai_coworker_content_mgr`.
- `company_id` (VARCHAR(64), FK -> companies.id)
- `name` (VARCHAR(255))
- `role` (VARCHAR(255))
- `model` (VARCHAR(100)): `gemini-3.7-flash`.
- `assigned_tools` (JSONB): List of permissible sandbox tool codes.
- `approval_policy` (JSONB): Mapping of tool actions to `AUTO` | `APPROVAL_REQUIRED`.
- `schedule_cron` (VARCHAR(100)): Cron pattern for autonomous invocation.
- `metrics` (JSONB): Aggregated execution counts, latency, and cost in USD.

### `ai_tasks`
- `id` (VARCHAR(64), PK): `task_...`
- `company_id` (VARCHAR(64), FK -> companies.id)
- `coworker_id` (VARCHAR(64), FK -> ai_coworkers.id)
- `status` (VARCHAR(50)): `QUEUED` | `RUNNING` | `WAITING_APPROVAL` | `COMPLETED` | `FAILED`.
- `approval_data` (JSONB): Proposed payload when human approval is required.
- `execution_logs` (JSONB): Timestamped trace logs for real-time observability.

---

## 4. Row Level Security (RLS) Implementation
All tenant tables have RLS enabled. Queries executed through Supabase or PostgreSQL connection pools verify the JWT claim:

```sql
CREATE POLICY tenant_isolation_articles ON public.articles
    USING (status = 'published' OR company_id = auth_company_id() OR current_setting('request.jwt.claim.role', true) = 'Super Administrator');
```

Refer to `/server/core/schema.sql` for the complete production DDL script.
