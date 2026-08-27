/**
 * Artify Sols Backend — System Health, Settings & Diagnostics Routes
 * /api/v1/system
 */

import { Router } from 'express';
import { db } from '../../core/db';
import { sendSuccess } from '../../core/apiResponse';

const router = Router();

/**
 * GET /api/v1/system/health
 */
router.get('/health', (req, res) => {
  const memory = process.memoryUsage();

  sendSuccess(res, {
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '3.0.0-enterprise',
    diagnostics: {
      activeTenants: db.companies.size,
      registeredUsers: db.users.size,
      activeSessions: db.userSessions.size,
      totalArticles: db.articles.size,
      totalProducts: db.products.size,
      activeAiCoworkers: Array.from(db.aiCoworkers.values()).filter((c) => c.status === 'active').length,
      heapUsedMb: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
    },
  });
});

export default router;
