/**
 * Artify Sols Backend — Authentication & User Profile API Routes
 * /api/v1/auth
 */

import { Router } from 'express';
import {
  authService,
  authenticateToken,
  AuthenticatedRequest,
} from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';
import { db } from '../../core/db';

const router = Router();

/**
 * POST /api/v1/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, 'Email and password are required.');
      return;
    }

    const result = await authService.login(email, password, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    sendSuccess(res, result);
  } catch (err: any) {
    sendError(res, 401, ApiErrorCode.UNAUTHORIZED, err?.message || 'Login failed.');
  }
});

/**
 * POST /api/v1/auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, companyName, industry } = req.body;
    if (!email || !password || !fullName || !companyName) {
      sendError(
        res,
        400,
        ApiErrorCode.VALIDATION_ERROR,
        'Email, password, fullName, and companyName are required fields.'
      );
      return;
    }

    const result = await authService.register({
      email,
      password,
      fullName,
      companyName,
      industry,
    });

    sendSuccess(res, result, 201);
  } catch (err: any) {
    sendError(res, 400, ApiErrorCode.RESOURCE_CONFLICT, err?.message || 'Registration failed.');
  }
});

/**
 * GET /api/v1/auth/me
 */
router.get('/me', authenticateToken, (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    sendError(res, 401, ApiErrorCode.UNAUTHORIZED, 'Not authenticated.');
    return;
  }

  const company = db.companies.get(req.user.companyId);
  const { passwordHash: _, ...sanitizedUser } = req.user;

  sendSuccess(res, {
    user: sanitizedUser,
    company: company || null,
  });
});

/**
 * POST /api/v1/auth/logout
 */
router.post('/logout', (req: AuthenticatedRequest, res) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token) {
    authService.logout(token);
  }
  sendSuccess(res, { message: 'Logged out successfully.' });
});

export default router;
