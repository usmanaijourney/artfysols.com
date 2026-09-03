# Artify Sols Backend — AI Security & Defense Model

## 1. Threat Model & Boundaries

1. **Untrusted Data Ingestion**:
   - Web search results, user prompt briefs, uploaded documents, and competitor content are treated strictly as **DATA**, never as instructions.
   - LLM system instructions are hard-sandboxed on the server-side (`server/ai/provider.ts`) and cannot be overridden by user prompts.

2. **No Direct Database or Shell Access**:
   - The AI agent has ZERO direct SQL, filesystem, network socket, or process execution privileges.
   - All mutations flow through validated TypeScript tool handlers (`server/ai/tools.ts`).

3. **Multi-Tenant Guard**:
   - Every tool call requires a valid execution context (`companyId`, `agentId`, `taskId`).
   - Query filters explicitly enforce `record.companyId === context.companyId`.

4. **Human-in-the-Loop Safeguard**:
   - Publicly visible actions (e.g. `publishArticle`) or financial modifications are blocked by `APPROVAL_REQUIRED` policies unless explicitly pre-authorized by an administrator.

5. **Token Quota Enforcement**:
   - Every execution tracks estimated token count and cost in USD.
   - Tenants exceeding their plan limit are throttled immediately to prevent financial exhaustion.
