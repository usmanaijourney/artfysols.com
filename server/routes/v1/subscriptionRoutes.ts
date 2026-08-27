/**
 * Artify Sols Backend — Subscriptions & API Keys API Routes
 * /api/v1/subscriptions & /api/v1/api-keys
 */

import { Router } from 'express';
import { subscriptionService } from '../../services/subscriptionService';
import {
  authenticateToken,
  requirePermission,
  AuthenticatedRequest,
} from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';

export const subscriptionRouter = Router();
export const apiKeyRouter = Router();

/**
 * GET /api/v1/subscriptions/current
 */
subscriptionRouter.get(
  '/current',
  authenticateToken,
  requirePermission('subscriptions.view'),
  (req: AuthenticatedRequest, res) => {
    const sub = subscriptionService.getSubscriptionByCompany(req.user!.companyId);
    if (!sub) {
      sendError(res, 404, ApiErrorCode.RESOURCE_NOT_FOUND, 'No active subscription found.');
      return;
    }
    sendSuccess(res, sub);
  }
);

/**
 * GET /api/v1/api-keys
 */
apiKeyRouter.get(
  '/',
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    const keys = subscriptionService.listApiKeysByCompany(req.user!.companyId);
    sendSuccess(res, keys);
  }
);

/**
 * POST /api/v1/api-keys
 */
apiKeyRouter.post(
  '/',
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    try {
      const { name, scopes, environment, rateLimitPerMin } = req.body;
      if (!name) {
        sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, 'Key name is required.');
        return;
      }

      const result = subscriptionService.createApiKey({
        companyId: req.user!.companyId,
        name,
        scopes,
        environment,
        rateLimitPerMin,
      });

      sendSuccess(res, result, 201);
    } catch (err: any) {
      sendError(res, 500, ApiErrorCode.INTERNAL_ERROR, err?.message);
    }
  }
);

/**
 * DELETE /api/v1/api-keys/:id
 */
apiKeyRouter.delete(
  '/:id',
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    const success = subscriptionService.revokeApiKey(req.params.id, req.user!.companyId);
    if (!success) {
      sendError(res, 404, ApiErrorCode.RESOURCE_NOT_FOUND, 'API key not found or already revoked.');
      return;
    }
    sendSuccess(res, { message: 'API key revoked successfully.' });
  }
);
