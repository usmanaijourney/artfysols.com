# Artify Sols Backend — REST API Reference (v1)

## 1. Base URL & Authentication
- **Base URL**: `/api/v1`
- **Authentication**: Bearer Token in `Authorization: Bearer <session_token>` header.
- **Envelope Standard**:
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "timestamp": "2026-08-28T04:00:00.000Z",
    "requestId": "req_..."
  }
}
```

---

## 2. Authentication Endpoints (`/api/v1/auth`)

### `POST /api/v1/auth/login`
Authenticates a user and issues a bearer session token.
- **Request Body**:
  ```json
  { "email": "user@example.com", "password": "SecurePassword123" }
  ```
- **Response (200)**: Returns user profile, company info, and session token.

### `POST /api/v1/auth/register`
Registers an enterprise organization and primary Super Admin account.
- **Request Body**:
  ```json
  { "companyName": "Acme Corp", "fullName": "Jane Doe", "email": "jane@acme.com", "password": "..." }
  ```

### `GET /api/v1/auth/me`
Retrieves current session context, user roles, and permissions.

---

## 3. CMS & Knowledge Engine (`/api/v1/cms` & `/api/v1/articles`)

### `GET /api/v1/articles`
Lists published articles (public) or tenant drafts (if authenticated).

### `POST /api/v1/articles`
Creates a new draft article. Requires `blog.create` permission.

### `POST /api/v1/articles/:id/publish`
Publishes an approved draft article to the live site. Requires `blog.publish`.

---

## 4. AI Coworker Fleet & Tasks (`/api/v1/ai`)

### `GET /api/v1/ai/coworkers`
Lists active AI coworkers in the tenant fleet. Requires `ai.agents.view`.

### `POST /api/v1/ai/coworkers/:id/execute`
Dispatches an autonomous AI coworker task with specified objectives.
- **Request Body**:
  ```json
  {
    "title": "Deterministic Finance Whitepaper",
    "prompt": "Research sub-40ms vector RAG and analyze our existing CMS coverage.",
    "priority": "high"
  }
  ```

### `GET /api/v1/ai/tasks`
Lists all queued, running, and completed tasks for the tenant.

### `POST /api/v1/ai/tasks/:id/approval`
Human-in-the-loop governance approval/rejection for actions requiring sign-off.
- **Request Body**:
  ```json
  { "decision": "approved", "note": "Reviewed by Lead Architect" }
  ```

### `POST /api/v1/ai/consultant`
Interactive enterprise architecture diagnostic tool.

---

## 5. Payments & Webhooks (`/api/v1/payments`)

### `POST /api/v1/payments/intent`
Creates a payment intent for purchasing/upgrading subscription tier.

### `POST /api/v1/payments/webhook`
Public endpoint receiving verified webhook payloads from Stripe or LemonSqueezy.

---

## 6. Subscriptions & API Keys (`/api/v1/subscriptions` & `/api/v1/api-keys`)

### `GET /api/v1/subscriptions/current`
Returns subscription plan details, token quotas, and active coworker limits.

### `POST /api/v1/api-keys`
Issues a cryptographically hashed API key (`art_live_...` or `art_test_...`).

### `DELETE /api/v1/api-keys/:id`
Revokes an API key.
