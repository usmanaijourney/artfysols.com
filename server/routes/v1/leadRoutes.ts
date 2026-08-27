/**
 * Artify Sols Backend — Leads & Inquiries API Routes
 * /api/v1/leads
 */

import { Router } from 'express';
import { leadService } from '../../services/leadService';
import {
  authenticateToken,
  requirePermission,
  AuthenticatedRequest,
} from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';

const router = Router();

/**
 * POST /api/v1/leads (Public Inquiries)
 */
router.post('/', (req, res) => {
  try {
    const { name, email, companyName, industry, projectBrief, source } = req.body;
    if (!name || !email || !companyName || !projectBrief) {
      sendError(
        res,
        400,
        ApiErrorCode.VALIDATION_ERROR,
        'Name, email, company name, and project brief are required.'
      );
      return;
    }

    const lead = leadService.createLead({
      name,
      email,
      companyName,
      industry,
      projectBrief,
      source,
    });

    sendSuccess(
      res,
      {
        success: true,
        referenceToken: lead.referenceToken,
        message: 'Project brief submitted successfully. Our AI engineering team will contact you within 24 hours.',
      },
      201
    );
  } catch (err: any) {
    sendError(res, 500, ApiErrorCode.INTERNAL_ERROR, err?.message);
  }
});

/**
 * GET /api/v1/leads (Internal CRM Lead Management)
 */
router.get(
  '/',
  authenticateToken,
  requirePermission('leads.view'),
  (req: AuthenticatedRequest, res) => {
    const { status, search, page, limit } = req.query;
    const result = leadService.listLeads({
      status: status as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20,
    });

    sendSuccess(res, result.leads, 200, {
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20,
      total: result.total,
    });
  }
);

export default router;
