# Artify Sols — Backend Platform Architecture & Master Specification

## 1. System Overview
**Artify Sols Backend** is a production-grade, modular, multi-tenant enterprise backend engineered in TypeScript and Node.js. It serves as the unified orchestration layer connecting:
- **Artify Sols Corporate Web Platform & Marketing Experience**
- **Client & Telemetry Portal**
- **Autonomous AI Coworker Fleet (Artify Content Manager, ReconAI Auditor)**
- **CMS & Search Engine Intelligence Feeds**
- **Subscriptions, Invoices & API Key Quota Management**
- **Future Artify ERP Ecosystem (Finance, HR, Payroll, Inventory, CRM)**

---

## 2. Directory & Module Structure

```text
/server
├── types/
│   └── index.ts                 # Master TypeScript schemas (Company, User, Product, Article, AI Coworker, etc.)
├── core/
│   ├── apiResponse.ts           # Standardized envelopes { success, data, error, meta: { requestId } }
│   └── db.ts                    # In-memory transactional multi-tenant repository with seed fixtures
├── services/
│   ├── authService.ts           # Authentication, password hashing, session tokens & RBAC middleware
│   ├── cmsService.ts            # Article management, revisions, SEO metadata & publication lifecycle
│   ├── productService.ts        # Products, services, connected systems & features
│   ├── subscriptionService.ts   # Subscriptions, plan limits, usage quotas & cryptographic API keys
│   ├── leadService.ts           # Contact briefs, lead scoring & reference token verification
│   └── notificationService.ts   # Multi-channel notification dispatcher & security audit logs
├── ai/
│   ├── provider.ts              # Pluggable AI Provider abstraction (Google Gemini 3.7 Flash)
│   ├── tools.ts                 # Sandboxed tool registry with permission & tenant security checks
│   └── coworkerService.ts       # AI Coworkers, task execution queue & human approval policies
└── routes/
    └── v1/
        ├── authRoutes.ts         # /api/v1/auth/*
        ├── cmsRoutes.ts          # /api/v1/cms/* & /api/v1/articles/*
        ├── productRoutes.ts      # /api/v1/products/* & /api/v1/services/*
        ├── subscriptionRoutes.ts # /api/v1/subscriptions/* & /api/v1/api-keys/*
        ├── leadRoutes.ts         # /api/v1/leads/*
        ├── notificationRoutes.ts # /api/v1/notifications/* & /api/v1/audit/*
        ├── aiRoutes.ts           # /api/v1/ai/coworkers/*, /tasks/*, /approvals/*, /consultant
        ├── systemRoutes.ts       # /api/v1/system/health, /status
        └── index.ts              # Master API v1 router
```

---

## 3. Security, Authentication & Multi-Tenancy
- **Session Tokens**: Cryptographically secure tokens generated via `crypto.randomBytes(32)` with 24-hour TTL.
- **Tenant Isolation**: Every tenant-sensitive record (`articles`, `subscriptions`, `api_keys`, `ai_tasks`, `audit_logs`) enforces strict `companyId` boundaries.
- **Granular RBAC**: 30+ declarative permission keys (`cms.pages.publish`, `ai.agents.execute`, `subscriptions.manage`) evaluated on backend middleware.
- **Audit Logging**: All security, auth, publication, and AI actions are stored with actor provenance, resource IDs, and timestamps.

---

## 4. AI Coworker Governance & Human-in-the-Loop
- **Tool Sandbox**: AI models cannot execute arbitrary queries or shell commands; all actions flow through strongly-typed, authorized tool handlers (`searchArticles`, `createDraft`, `submitForApproval`).
- **Approval Engine**: Public-facing actions (e.g. `publishArticle`) pause task execution and transition to `WAITING_APPROVAL` status until explicitly reviewed by an authorized human editor.
- **Cost & Quota Controls**: Execution tokens and estimated costs are tracked on each coworker profile with configurable monthly thresholds.

---

## 5. API v1 Endpoints Reference

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/login` | POST | Authenticates user and returns session | No |
| `/api/v1/auth/register` | POST | Registers new tenant organization & admin | No |
| `/api/v1/auth/me` | GET | Returns current user profile & tenant info | Yes |
| `/api/v1/cms/articles` | GET | Lists published or draft articles | Optional |
| `/api/v1/cms/articles` | POST | Creates new article draft | Yes (`blog.create`) |
| `/api/v1/cms/articles/:id/publish` | POST | Publishes approved article | Yes (`blog.publish`) |
| `/api/v1/products` | GET | Lists enterprise products & services | No |
| `/api/v1/subscriptions/current` | GET | Retrieves current organization subscription | Yes (`subscriptions.view`) |
| `/api/v1/api-keys` | GET / POST | Manages tenant API keys | Yes |
| `/api/v1/leads` | POST | Submits project brief inquiry | No |
| `/api/v1/ai/coworkers` | GET | Lists registered AI Coworkers | Yes (`ai.agents.view`) |
| `/api/v1/ai/coworkers/:id/execute` | POST | Triggers autonomous AI task | Yes (`ai.agents.execute`) |
| `/api/v1/ai/tasks/:id/approval` | POST | Approves or rejects pending AI action | Yes (`ai.tasks.approve`) |
| `/api/v1/ai/consultant` | POST | AI architecture reasoning engine | No |
| `/api/v1/system/health` | GET | Deep system diagnostics & telemetry | No |
