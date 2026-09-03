# Artify Sols Backend — AI Platform & Coworker Architecture

## 1. Architecture Overview
The Artify AI Platform isolates decision-making AI models from raw database mutations. All operations are executed through an explicit, permission-checked tool sandbox.

```text
       ┌───────────────────────────────┐
       │   Scheduler / User Request    │
       └──────────────┬────────────────┘
                      ▼
       ┌───────────────────────────────┐
       │     AI Coworker Service       │
       │   (Loads Tenant Policy & Tools)│
       └──────────────┬────────────────┘
                      ▼
       ┌───────────────────────────────┐
       │    Gemini 3.7 Flash Provider  │
       │   (Multimodal LLM Reasoning)  │
       └──────────────┬────────────────┘
                      ▼
       ┌───────────────────────────────┐
       │   Sandboxed Tool Executor     │
       │  (RBAC + Tenant Isolation)    │
       └──────────────┬────────────────┘
                      ▼
            Approval Policy Check
           ┌──────────┴──────────┐
           ▼                     ▼
      [AUTO_EXECUTE]      [APPROVAL_REQUIRED]
           │                     │
      Update DB             Queue in Task State
      & CMS                 Wait for Human Sign-off
```

---

## 2. Coworker Governance Profiles

### Artify Content Manager (`ai_coworker_content_mgr`)
- **Role**: Digital Content & SEO Strategist.
- **Tools**: `searchArticles()`, `searchWebsite()`, `createDraft()`, `updateDraft()`, `submitForApproval()`, `publishArticle()`.
- **Policy**:
  - `createDraft`: `AUTO`
  - `publishArticle`: `APPROVAL_REQUIRED`

### Artify Financial Auditor AI (`ai_coworker_recon_auditor`)
- **Role**: Autonomous Multi-Currency Ledger Reconciliation Sentinel.
- **Tools**: `getProducts()`, `getSEOData()`, `createNotification()`.
- **Policy**:
  - `flagDiscrepancy`: `AUTO`
  - `modifySubscription`: `APPROVAL_REQUIRED`
