/**
 * Artify Sols Backend — AI Coworkers, Tasks & Approval API Routes
 * /api/v1/ai
 */

import { Router } from 'express';
import { coworkerService } from '../../ai/coworkerService';
import { defaultAiProvider } from '../../ai/provider';
import {
  authenticateToken,
  optionalAuthenticate,
  requirePermission,
  AuthenticatedRequest,
} from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';

const router = Router();

/**
 * GET /api/v1/ai/coworkers
 */
router.get(
  '/coworkers',
  authenticateToken,
  requirePermission('ai.agents.view'),
  (req: AuthenticatedRequest, res) => {
    const companyId = req.user!.role === 'Super Administrator' ? undefined : req.user!.companyId;
    const coworkers = coworkerService.listCoworkers(companyId);
    sendSuccess(res, coworkers);
  }
);

/**
 * GET /api/v1/ai/coworkers/:id
 */
router.get(
  '/coworkers/:id',
  authenticateToken,
  requirePermission('ai.agents.view'),
  (req: AuthenticatedRequest, res) => {
    const coworker = coworkerService.getCoworkerById(req.params.id);
    if (!coworker) {
      sendError(res, 404, ApiErrorCode.RESOURCE_NOT_FOUND, 'AI Coworker not found.');
      return;
    }
    sendSuccess(res, coworker);
  }
);

/**
 * PUT /api/v1/ai/coworkers/:id
 */
router.put(
  '/coworkers/:id',
  authenticateToken,
  requirePermission('ai.agents.configure'),
  (req: AuthenticatedRequest, res) => {
    try {
      const updated = coworkerService.updateCoworker(req.params.id, req.body);
      sendSuccess(res, updated);
    } catch (err: any) {
      sendError(res, 404, ApiErrorCode.RESOURCE_NOT_FOUND, err?.message);
    }
  }
);

/**
 * POST /api/v1/ai/coworkers/:id/execute
 * Triggers an autonomous task execution
 */
router.post(
  '/coworkers/:id/execute',
  authenticateToken,
  requirePermission('ai.agents.execute'),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { title, prompt, priority } = req.body;
      if (!title || !prompt) {
        sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, 'Task title and prompt are required.');
        return;
      }

      const task = await coworkerService.executeCoworkerTask({
        coworkerId: req.params.id,
        companyId: req.user!.companyId,
        title,
        prompt,
        priority,
      });

      sendSuccess(res, task, 201);
    } catch (err: any) {
      sendError(res, 500, ApiErrorCode.AI_EXECUTION_ERROR, err?.message);
    }
  }
);

/**
 * GET /api/v1/ai/tasks
 */
router.get(
  '/tasks',
  authenticateToken,
  requirePermission('ai.tasks.view'),
  (req: AuthenticatedRequest, res) => {
    const companyId = req.user!.role === 'Super Administrator' ? undefined : req.user!.companyId;
    const tasks = coworkerService.listTasks({
      companyId,
      coworkerId: req.query.coworkerId as string,
      status: req.query.status as string,
    });
    sendSuccess(res, tasks);
  }
);

/**
 * POST /api/v1/ai/tasks/:id/approval
 * Approves or Rejects a pending AI action
 */
router.post(
  '/tasks/:id/approval',
  authenticateToken,
  requirePermission('ai.tasks.approve'),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { decision, note } = req.body;
      if (!decision || (decision !== 'approved' && decision !== 'rejected')) {
        sendError(
          res,
          400,
          ApiErrorCode.VALIDATION_ERROR,
          'Field "decision" must be either "approved" or "rejected".'
        );
        return;
      }

      const task = await coworkerService.decideApproval(
        req.params.id,
        decision,
        req.user!.fullName,
        note
      );

      sendSuccess(res, task);
    } catch (err: any) {
      sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, err?.message);
    }
  }
);

/**
 * POST /api/v1/ai/consultant (Interactive Architect Consultant)
 */
router.post('/consultant', optionalAuthenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { problem, industry, fleetSize, timeline, integrations } = req.body;
    if (!problem) {
      sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, 'Problem statement is required.');
      return;
    }

    const systemInstruction = `You are the Principal AI Systems Architect at Artify Solutions (artifysols.com).
Your mission is to formulate an authoritative, multi-agent enterprise architecture for complex enterprise problems.
Always return clean, structured JSON with:
1. "headline": Concise 6-10 word architecture blueprint title.
2. "executiveSummary": 2-3 sentence executive synopsis with projected efficiency gains.
3. "recommendedTier": "Artify Swarm Fleet" | "Artify ReconAI" | "Artify CustomForge".
4. "agentArchitecture": Array of 3-4 specialized agents, each with "name", "role", "model", "sla".
5. "timelinePhases": Array of 3 implementation phases ("phase", "duration", "deliverables").
6. "complianceGuards": Array of 4 security and audit provisions (SOC2, zero-retention, etc.).
7. "estimatedMonthlyRoi": High-impact estimated ROI metric string.`;

    const prompt = `Enterprise Architecture Request:
- Problem: "${problem}"
- Industry: "${industry || 'Enterprise'}"
- Scale / Fleet Size: "${fleetSize || 'Medium'}"
- Timeline: "${timeline || 'Immediate'}"
- Integrations: "${(integrations || []).join(', ')}"`;

    try {
      const textResult = await defaultAiProvider.generateText(prompt, {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
      });
      const parsed = JSON.parse(textResult);
      sendSuccess(res, parsed);
    } catch (err: any) {
      // Fallback structured architecture
      const fallback = {
        headline: `Artify Autonomous Enterprise Mesh for ${industry || 'Enterprise Operations'}`,
        executiveSummary: `Deploys a decentralized swarm of deterministic agents to automate end-to-end workflows with continuous audit compliance and sub-40ms execution SLAs.`,
        recommendedTier: 'Artify Swarm Fleet',
        agentArchitecture: [
          {
            name: 'Ingress & Normalization Agent',
            role: 'High-throughput parsing of unstructured inputs',
            model: 'gemini-3.7-flash (distilled)',
            sla: 'Sub-40ms P99',
          },
          {
            name: 'Deterministic Consensus Agent',
            role: 'Multi-party validation and business rules execution',
            model: 'gemini-3.7-flash',
            sla: 'Zero-tolerance validation',
          },
          {
            name: 'Audit & Compliance Sentinel',
            role: 'Immutable hash generation and SOC2 proof trails',
            model: 'gemini-3.7-flash',
            sla: 'Continuous background verification',
          },
        ],
        timelinePhases: [
          { phase: 'Phase 1: VPC Topology & Ingress Connectors', duration: 'Weeks 1-2', deliverables: ['Private subnet bridge', 'API gateway ingress'] },
          { phase: 'Phase 2: Agent Swarm Fine-Tuning & Sandbox', duration: 'Weeks 3-4', deliverables: ['Domain model distillation', 'Deterministic validation guardrails'] },
          { phase: 'Phase 3: Production Rollout & Telemetry', duration: 'Weeks 5-6', deliverables: ['Live ledger alignment', 'Automated executive dashboards'] },
        ],
        complianceGuards: [
          'SOC2 Type II verifiable cryptographic proof trails',
          'Zero data retention in frontier model inference loops',
          'Role-based granular execution policy boundaries',
          'Air-gapped VPC deployment option with dedicated SLM clusters',
        ],
        estimatedMonthlyRoi: '$85,000+ Operational Savings / Month',
      };
      sendSuccess(res, fallback);
    }
  } catch (err: any) {
    sendError(res, 500, ApiErrorCode.INTERNAL_ERROR, err?.message);
  }
});

export default router;
