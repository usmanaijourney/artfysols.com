# Artify Sols Backend — Role-Based Access Control (RBAC) Specification

## 1. Standard Roles Hierarchy

1. **Super Administrator** (`role_super_admin`):
   - Full global privileges across all tenants, CMS, AI Coworkers, and Billing.
2. **Company Administrator** (`role_company_admin`):
   - Administrative authority within their tenant organization (manage users, subscriptions, API keys, AI Coworkers).
3. **Content Manager** (`role_content_mgr`):
   - Author, edit, review, and publish articles; review AI-generated drafts.
4. **AI Manager** (`role_ai_mgr`):
   - Configure AI Coworker parameters, review task traces, and approve pending agent actions.
5. **Employee / Standard User** (`role_employee`):
   - Read-only access to company dashboard and active AI systems.

---

## 2. Granular Permission Matrix

| Permission Code | Description | Super Admin | Company Admin | Content Manager | AI Manager |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `cms.pages.view` | View CMS pages & sections | Yes | Yes | Yes | Yes |
| `cms.pages.create` | Create CMS page draft | Yes | Yes | Yes | No |
| `cms.pages.publish` | Publish CMS page to live | Yes | Yes | Yes | No |
| `blog.view` | View articles & drafts | Yes | Yes | Yes | Yes |
| `blog.create` | Create new article draft | Yes | Yes | Yes | No |
| `blog.publish` | Publish approved article | Yes | Yes | Yes | No |
| `subscriptions.view` | View subscription & quotas | Yes | Yes | No | No |
| `subscriptions.manage`| Upgrade/cancel subscription | Yes | Yes | No | No |
| `ai.agents.view` | View AI coworker fleet | Yes | Yes | Yes | Yes |
| `ai.agents.configure` | Update coworker prompts/tools| Yes | Yes | No | Yes |
| `ai.agents.execute` | Trigger autonomous task | Yes | Yes | Yes | Yes |
| `ai.tasks.view` | View task logs & queue | Yes | Yes | Yes | Yes |
| `ai.tasks.approve` | Approve/Reject AI actions | Yes | Yes | Yes | Yes |
| `audit.view` | View immutable audit ledger| Yes | Yes | No | No |
