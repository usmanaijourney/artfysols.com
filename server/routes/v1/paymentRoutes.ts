/**
 * Artify Sols Backend — Payments & Webhook API Routes
 */

import { Router, Response } from 'express';
import { paymentService } from '../../services/paymentService';
import { authenticateToken, requirePermission, AuthenticatedRequest } from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';
import { db } from '../../core/db';

const router = Router();

/**
 * POST /api/v1/payments/intent
 * Creates a payment intent for purchasing/upgrading subscription tier.
 */
router.post(
  '/intent',
  authenticateToken,
  requirePermission('subscriptions.manage'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { planId, billingCycle, currency } = req.body;
      if (!planId || !billingCycle) {
        sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, 'planId and billingCycle are required.');
        return;
      }

      const intent = await paymentService.createPaymentIntent({
        companyId: req.user!.companyId,
        planId,
        billingCycle,
        currency,
      });

      sendSuccess(res, { paymentIntent: intent }, 201);
    } catch (err: any) {
      sendError(res, 500, ApiErrorCode.INTERNAL_ERROR, err.message);
    }
  }
);

/**
 * POST /api/v1/payments/webhook
 * Public signature-verified webhook receiver for payment gateways (Stripe, LemonSqueezy).
 */
router.post('/webhook', async (req, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string | undefined;
    const result = await paymentService.handleWebhook(req.body, signature);
    sendSuccess(res, result);
  } catch (err: any) {
    sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, err.message);
  }
});

/**
 * GET /api/v1/payments/transactions
 * Lists recent payment transactions and ledger events for tenant.
 */
router.get('/transactions', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  try {
    const companyId = req.user!.companyId;
    const paymentAudits = db.auditLogs.filter(
      (a) => a.companyId === companyId && (a.action === 'PAYMENT_SUCCEEDED' || a.action === 'PAYMENT_INTENT_CREATED')
    );

    sendSuccess(res, { transactions: paymentAudits });
  } catch (err: any) {
    sendError(res, 500, ApiErrorCode.INTERNAL_ERROR, err.message);
  }
});

export default router;
