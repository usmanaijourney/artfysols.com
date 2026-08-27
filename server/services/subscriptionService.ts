/**
 * Artify Sols Backend — Subscriptions, Quotas & API Key Lifecycle Service
 */

import crypto from 'crypto';
import { db } from '../core/db';
import { Subscription, ApiKeyRecord } from '../types';

export class SubscriptionService {
  /**
   * Retrieves subscription for a given company/tenant.
   */
  public getSubscriptionByCompany(companyId: string): Subscription | null {
    for (const sub of db.subscriptions.values()) {
      if (sub.companyId === companyId) {
        return sub;
      }
    }
    return null;
  }

  /**
   * Lists all subscriptions across organizations (Admin only).
   */
  public listAllSubscriptions(): Subscription[] {
    return Array.from(db.subscriptions.values());
  }

  /**
   * Generates a new cryptographically secure API key for a tenant.
   */
  public createApiKey(payload: {
    companyId: string;
    name: string;
    scopes?: string[];
    environment?: 'production' | 'staging' | 'development';
    rateLimitPerMin?: number;
  }): { apiKey: ApiKeyRecord; secretKey: string } {
    const id = db.generateId('key');
    const env = payload.environment || 'production';
    const prefix = env === 'production' ? 'art_live' : 'art_test';
    const randomSecret = crypto.randomBytes(24).toString('hex');
    const secretKey = `${prefix}_${randomSecret}`;
    const keyHash = db.hashPassword(secretKey);
    const keyPrefix = `${prefix}_${randomSecret.substring(0, 6)}`;
    const fullKeyPreview = `${prefix}_••••••••••••${randomSecret.slice(-4)}`;

    const apiKey: ApiKeyRecord = {
      id,
      companyId: payload.companyId,
      name: payload.name,
      keyPrefix,
      keyHash,
      fullKeyPreview,
      scopes: payload.scopes || ['read', 'write', 'agents.execute'],
      environment: env,
      status: 'active',
      rateLimitPerMin: payload.rateLimitPerMin || 600,
      requestsCount: 0,
      createdAt: new Date().toISOString(),
    };

    db.apiKeys.set(id, apiKey);

    // Audit log
    db.auditLogs.push({
      id: db.generateId('aud'),
      companyId: payload.companyId,
      actorId: 'usr_auth',
      actorName: 'API Key Manager',
      actorType: 'user',
      action: 'API_KEY_CREATED',
      resource: 'api_key',
      resourceId: id,
      details: { name: apiKey.name, scopes: apiKey.scopes, environment: apiKey.environment },
      timestamp: new Date().toISOString(),
    });

    return { apiKey, secretKey };
  }

  /**
   * Lists API keys for a tenant (without revealing hashes).
   */
  public listApiKeysByCompany(companyId: string): ApiKeyRecord[] {
    return Array.from(db.apiKeys.values()).filter((k) => k.companyId === companyId);
  }

  /**
   * Revokes an API key.
   */
  public revokeApiKey(keyId: string, companyId: string): boolean {
    const key = db.apiKeys.get(keyId);
    if (!key || key.companyId !== companyId) {
      return false;
    }

    key.status = 'revoked';
    db.apiKeys.set(keyId, key);

    db.auditLogs.push({
      id: db.generateId('aud'),
      companyId,
      actorId: 'usr_auth',
      actorName: 'API Key Manager',
      actorType: 'user',
      action: 'API_KEY_REVOKED',
      resource: 'api_key',
      resourceId: keyId,
      details: { name: key.name },
      timestamp: new Date().toISOString(),
    });

    return true;
  }
}

export const subscriptionService = new SubscriptionService();
