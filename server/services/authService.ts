/**
 * Artify Sols Backend — Authentication & RBAC Authorization Service
 */

import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db } from '../core/db';
import { User, PermissionKey, RoleName, UserSession } from '../types';
import { sendError, ApiErrorCode } from '../core/apiResponse';

export interface AuthenticatedRequest extends Request {
  user?: User;
  sessionToken?: string;
  companyId?: string;
}

export class AuthService {
  /**
   * Generates a cryptographically secure session token.
   */
  public generateSessionToken(): string {
    return `art_sess_${crypto.randomBytes(32).toString('hex')}`;
  }

  /**
   * Authenticates user credentials and returns a secure session.
   */
  public async login(
    email: string,
    password: string,
    reqMeta?: { ip?: string; userAgent?: string }
  ): Promise<{ session: UserSession; user: Omit<User, 'passwordHash'> }> {
    const trimmedEmail = email.trim().toLowerCase();
    const passwordHash = db.hashPassword(password);

    // Find user by email
    let foundUser: User | undefined;
    for (const u of db.users.values()) {
      if (u.email.toLowerCase() === trimmedEmail) {
        foundUser = u;
        break;
      }
    }

    if (!foundUser || foundUser.passwordHash !== passwordHash) {
      throw new Error('Invalid email or password credentials.');
    }

    if (foundUser.status !== 'active') {
      throw new Error(`Account is currently ${foundUser.status}. Please contact system support.`);
    }

    // Create session (24 hour TTL)
    const token = this.generateSessionToken();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    db.userSessions.set(token, {
      userId: foundUser.id,
      expiresAt,
    });

    // Update lastLoginAt
    foundUser.lastLoginAt = new Date().toISOString();
    foundUser.updatedAt = new Date().toISOString();
    db.users.set(foundUser.id, foundUser);

    // Audit log
    db.auditLogs.push({
      id: db.generateId('aud'),
      companyId: foundUser.companyId,
      actorId: foundUser.id,
      actorName: foundUser.fullName,
      actorType: 'user',
      action: 'USER_LOGIN',
      resource: 'auth',
      resourceId: foundUser.id,
      details: { email: foundUser.email, role: foundUser.role },
      ipAddress: reqMeta?.ip,
      userAgent: reqMeta?.userAgent,
      timestamp: new Date().toISOString(),
    });

    const session: UserSession = {
      token,
      userId: foundUser.id,
      companyId: foundUser.companyId,
      email: foundUser.email,
      role: foundUser.role,
      permissions: foundUser.permissions,
      expiresAt,
    };

    const { passwordHash: _, ...sanitizedUser } = foundUser;
    return { session, user: sanitizedUser };
  }

  /**
   * Registers a new tenant organization and primary administrator.
   */
  public async register(payload: {
    email: string;
    password: string;
    fullName: string;
    companyName: string;
    industry?: string;
  }): Promise<{ session: UserSession; user: Omit<User, 'passwordHash'> }> {
    const trimmedEmail = payload.email.trim().toLowerCase();

    // Check for existing user
    for (const u of db.users.values()) {
      if (u.email.toLowerCase() === trimmedEmail) {
        throw new Error('An account with this email address already exists.');
      }
    }

    const now = new Date().toISOString();
    const companyId = db.generateId('org');

    // Create tenant company
    const newCompany = {
      id: companyId,
      name: payload.companyName || 'My Organization',
      slug: (payload.companyName || 'org')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      industry: payload.industry || 'Enterprise Technology',
      tier: 'Growth' as const,
      status: 'active' as const,
      createdAt: now,
      updatedAt: now,
      settings: {
        defaultTimezone: 'UTC',
        defaultCurrency: 'USD',
      },
    };
    db.companies.set(companyId, newCompany);

    // Default permissions for Company Administrator
    const adminPermissions: PermissionKey[] = [
      'cms.pages.view',
      'cms.pages.create',
      'cms.pages.update',
      'blog.view',
      'blog.create',
      'blog.update',
      'customers.view',
      'customers.create',
      'customers.update',
      'products.view',
      'subscriptions.view',
      'subscriptions.manage',
      'ai.agents.view',
      'ai.agents.execute',
      'ai.tasks.view',
      'ai.tasks.approve',
      'notifications.send',
      'audit.view',
      'company.manage',
    ];

    const userId = db.generateId('usr');
    const newUser: User = {
      id: userId,
      companyId,
      email: trimmedEmail,
      passwordHash: db.hashPassword(payload.password),
      fullName: payload.fullName,
      title: 'Company Administrator',
      role: 'Company Administrator',
      permissions: adminPermissions,
      status: 'active',
      mfaEnabled: false,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    };
    db.users.set(userId, newUser);

    // Initial Trial Subscription
    const subId = db.generateId('sub');
    db.subscriptions.set(subId, {
      id: subId,
      companyId,
      planId: 'plan_growth_tier',
      planName: 'Artify Growth Tier (Trial)',
      status: 'trialing',
      billingCycle: 'monthly',
      priceMonthlyUsd: 0,
      currentPeriodStart: now,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      allocatedAgents: 5,
      usedAgents: 1,
      monthlyQueryQuota: 50000,
      usedQueries: 0,
      createdAt: now,
      updatedAt: now,
    });

    return this.login(payload.email, payload.password);
  }

  /**
   * Verifies an active session token.
   */
  public verifyToken(token: string): User | null {
    const session = db.userSessions.get(token);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      db.userSessions.delete(token);
      return null;
    }

    const user = db.users.get(session.userId);
    if (!user || user.status !== 'active') return null;

    return user;
  }

  /**
   * Logs out a session token.
   */
  public logout(token: string): void {
    db.userSessions.delete(token);
  }
}

export const authService = new AuthService();

/**
 * Express Middleware: Authenticates Bearer session token.
 */
export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

  if (!token) {
    sendError(res, 401, ApiErrorCode.UNAUTHORIZED, 'Authentication token is required.');
    return;
  }

  const user = authService.verifyToken(token);
  if (!user) {
    sendError(res, 401, ApiErrorCode.UNAUTHORIZED, 'Invalid or expired session token.');
    return;
  }

  req.user = user;
  req.sessionToken = token;
  req.companyId = user.companyId;
  next();
}

/**
 * Express Middleware: Optional Token Extractor (does not block if anonymous).
 */
export function optionalAuthenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

  if (token) {
    const user = authService.verifyToken(token);
    if (user) {
      req.user = user;
      req.sessionToken = token;
      req.companyId = user.companyId;
    }
  }
  next();
}

/**
 * Express Middleware: Enforces Granular Permission.
 */
export function requirePermission(permission: PermissionKey) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, ApiErrorCode.UNAUTHORIZED, 'Authentication required.');
      return;
    }

    // Super Administrator bypass
    if (req.user.role === 'Super Administrator') {
      next();
      return;
    }

    if (!req.user.permissions.includes(permission)) {
      sendError(
        res,
        403,
        ApiErrorCode.FORBIDDEN,
        `Permission denied. Required privilege: "${permission}"`
      );
      return;
    }

    next();
  };
}

/**
 * Express Middleware: Enforces Role.
 */
export function requireRole(allowedRoles: RoleName[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, ApiErrorCode.UNAUTHORIZED, 'Authentication required.');
      return;
    }

    if (req.user.role === 'Super Administrator' || allowedRoles.includes(req.user.role)) {
      next();
      return;
    }

    sendError(
      res,
      403,
      ApiErrorCode.FORBIDDEN,
      `Forbidden. This endpoint requires one of the following roles: ${allowedRoles.join(', ')}`
    );
  };
}

/**
 * Express Middleware: Enforces Tenant Isolation boundary.
 */
export function enforceTenantIsolation(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    sendError(res, 401, ApiErrorCode.UNAUTHORIZED, 'Authentication required.');
    return;
  }

  // Super Administrator can inspect across tenants
  if (req.user.role === 'Super Administrator') {
    next();
    return;
  }

  const requestedCompanyId = req.params.companyId || req.query.companyId || req.body.companyId;
  if (requestedCompanyId && requestedCompanyId !== req.user.companyId) {
    sendError(
      res,
      403,
      ApiErrorCode.TENANT_ISOLATION_ERROR,
      'Access denied: You cannot access resources outside of your organization tenant.'
    );
    return;
  }

  next();
}
