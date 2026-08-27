/**
 * Artify Sols Backend — Notifications & Audit Logging API Routes
 * /api/v1/notifications & /api/v1/audit
 */

import { Router } from 'express';
import { notificationService, auditService } from '../../services/notificationService';
import {
  authenticateToken,
  requirePermission,
  AuthenticatedRequest,
} from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';

export const notificationRouter = Router();
export const auditRouter = Router();

/**
 * GET /api/v1/notifications
 */
notificationRouter.get(
  '/',
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    const notifs = notificationService.listNotifications({
      companyId: req.user!.companyId,
      userId: req.user!.id,
    });
    sendSuccess(res, notifs);
  }
);

/**
 * POST /api/v1/notifications/:id/read
 */
notificationRouter.post(
  '/:id/read',
  authenticateToken,
  (req: AuthenticatedRequest, res) => {
    const success = notificationService.markAsRead(req.params.id);
    if (!success) {
      sendError(res, 404, ApiErrorCode.RESOURCE_NOT_FOUND, 'Notification not found.');
      return;
    }
    sendSuccess(res, { message: 'Marked as read.' });
  }
);

/**
 * GET /api/v1/audit
 */
auditRouter.get(
  '/',
  authenticateToken,
  requirePermission('audit.view'),
  (req: AuthenticatedRequest, res) => {
    const { actorType, resource, page, limit } = req.query;
    const companyId = req.user!.role === 'Super Administrator' ? undefined : req.user!.companyId;

    const result = auditService.queryLogs({
      companyId,
      actorType: actorType as string,
      resource: resource as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 50,
    });

    sendSuccess(res, result.logs, 200, {
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 50,
      total: result.total,
    });
  }
);
