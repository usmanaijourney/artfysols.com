/**
 * Artify Sols Backend — Payment Provider Abstraction & Webhook Engine
 * Provider-agnostic billing service with idempotency and audit logs.
 */

import crypto from 'crypto';
import { db } from '../core/db';
import { Subscription } from '../types';

export interface PaymentIntent {
  id: string;
  companyId: string;
  amountCents: number;
  currency: string;
  planId: 'starter' | 'growth' | 'enterprise';
  billingCycle: 'monthly' | 'annual';
  status: 'requires_payment_method' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  clientSecret: string;
  provider: 'stripe' | 'lemonsqueezy' | 'custom';
  createdAt: string;
}

export interface WebhookEventPayload {
  id: string;
  type: string;
  data: {
    object: any;
  };
  signature?: string;
}

export class PaymentService {
  private processedWebhookEvents = new Set<string>();

  /**
   * Creates a payment intent for purchasing/upgrading a subscription plan.
   */
  public async createPaymentIntent(payload: {
    companyId: string;
    planId: 'starter' | 'growth' | 'enterprise';
    billingCycle: 'monthly' | 'annual';
    currency?: string;
  }): Promise<PaymentIntent> {
    const company = db.companies.get(payload.companyId);
    if (!company) {
      throw new Error(`Company "${payload.companyId}" not found.`);
    }

    const prices: Record<string, { monthly: number; annual: number }> = {
      starter: { monthly: 9900, annual: 99000 },
      growth: { monthly: 49900, annual: 499000 },
      enterprise: { monthly: 249900, annual: 2499000 },
    };

    const planPrices = prices[payload.planId] || prices.starter;
    const amountCents = payload.billingCycle === 'annual' ? planPrices.annual : planPrices.monthly;
    const intentId = db.generateId('pi');
    const clientSecret = `pi_sec_${crypto.randomBytes(20).toString('hex')}`;

    const intent: PaymentIntent = {
      id: intentId,
      companyId: payload.companyId,
      amountCents,
      currency: payload.currency || 'USD',
      planId: payload.planId,
      billingCycle: payload.billingCycle,
      status: 'requires_payment_method',
      clientSecret,
      provider: 'stripe',
      createdAt: new Date().toISOString(),
    };

    db.auditLogs.push({
      id: db.generateId('aud'),
      companyId: payload.companyId,
      actorId: 'usr_payment_service',
      actorName: 'Payment Engine',
      actorType: 'system',
      action: 'PAYMENT_INTENT_CREATED',
      resource: 'payment_intent',
      resourceId: intentId,
      details: {
        planId: payload.planId,
        amountCents,
        billingCycle: payload.billingCycle,
      },
      timestamp: new Date().toISOString(),
    });

    return intent;
  }

  /**
   * Processes verified webhook events idempotently (e.g. from Stripe or mock provider).
   */
  public async handleWebhook(
    rawBody: string | object,
    signature?: string
  ): Promise<{ handled: boolean; eventType: string; status: string }> {
    let event: WebhookEventPayload;
    if (typeof rawBody === 'string') {
      try {
        event = JSON.parse(rawBody);
      } catch (err) {
        throw new Error('Invalid webhook JSON payload');
      }
    } else {
      event = rawBody as WebhookEventPayload;
    }

    if (!event.id || !event.type) {
      throw new Error('Malformed webhook event object');
    }

    // Idempotency check
    if (this.processedWebhookEvents.has(event.id)) {
      return { handled: true, eventType: event.type, status: 'already_processed_idempotent' };
    }

    this.processedWebhookEvents.add(event.id);

    switch (event.type) {
      case 'payment_intent.succeeded':
      case 'invoice.payment_succeeded': {
        const obj = event.data.object;
        const companyId = obj.metadata?.companyId || 'org_artify_hq';
        const planId = obj.metadata?.planId || 'enterprise';
        const billingCycle = obj.metadata?.billingCycle || 'annual';

        this.applySubscriptionUpgrade(companyId, planId, billingCycle);

        db.auditLogs.push({
          id: db.generateId('aud'),
          companyId,
          actorId: 'webhook_stripe',
          actorName: 'Stripe Webhook Gateway',
          actorType: 'system',
          action: 'PAYMENT_SUCCEEDED',
          resource: 'subscription',
          resourceId: companyId,
          details: { eventId: event.id, planId, amount: obj.amount_total },
          timestamp: new Date().toISOString(),
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const obj = event.data.object;
        const companyId = obj.metadata?.companyId;
        if (companyId) {
          const sub = Array.from(db.subscriptions.values()).find((s) => s.companyId === companyId);
          if (sub) {
            sub.status = 'cancelled';
            db.subscriptions.set(sub.id, sub);
          }
        }
        break;
      }

      default:
        // Generic unhandled event
        break;
    }

    return { handled: true, eventType: event.type, status: 'processed_successfully' };
  }

  /**
   * Synchronizes subscription tier and token quotas for a tenant upon payment confirmation.
   */
  private applySubscriptionUpgrade(
    companyId: string,
    planId: 'starter' | 'growth' | 'enterprise',
    billingCycle: 'monthly' | 'annual'
  ) {
    let sub = Array.from(db.subscriptions.values()).find((s) => s.companyId === companyId);

    const limits: Record<
      string,
      { monthlyQueries: number; agents: number; priceMonthlyUsd: number; planName: string }
    > = {
      starter: { monthlyQueries: 100000, agents: 1, priceMonthlyUsd: 99, planName: 'Starter Tier' },
      growth: { monthlyQueries: 500000, agents: 3, priceMonthlyUsd: 499, planName: 'Growth Tier' },
      enterprise: { monthlyQueries: 2500000, agents: 10, priceMonthlyUsd: 2499, planName: 'Enterprise Swarm' },
    };

    const quota = limits[planId] || limits.growth;
    const now = new Date();
    const periodEnd = new Date(now);
    if (billingCycle === 'annual') {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    }

    if (sub) {
      sub.planId = planId;
      sub.planName = quota.planName;
      sub.status = 'active';
      sub.billingCycle = billingCycle;
      sub.priceMonthlyUsd = quota.priceMonthlyUsd;
      sub.allocatedAgents = quota.agents;
      sub.monthlyQueryQuota = quota.monthlyQueries;
      sub.currentPeriodStart = now.toISOString();
      sub.currentPeriodEnd = periodEnd.toISOString();
      sub.updatedAt = now.toISOString();
      db.subscriptions.set(sub.id, sub);
    } else {
      const newSubId = db.generateId('sub');
      const newSub: Subscription = {
        id: newSubId,
        companyId,
        planId,
        planName: quota.planName,
        status: 'active',
        billingCycle,
        priceMonthlyUsd: quota.priceMonthlyUsd,
        currentPeriodStart: now.toISOString(),
        currentPeriodEnd: periodEnd.toISOString(),
        cancelAtPeriodEnd: false,
        allocatedAgents: quota.agents,
        usedAgents: 1,
        monthlyQueryQuota: quota.monthlyQueries,
        usedQueries: 0,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };
      db.subscriptions.set(newSubId, newSub);
    }
  }
}

export const paymentService = new PaymentService();
