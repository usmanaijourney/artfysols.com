/**
 * Artify Sols Backend — Leads, Contact Briefs & Inquiries Service
 */

import crypto from 'crypto';
import { db } from '../core/db';
import { LeadInquiry } from '../types';

export class LeadService {
  /**
   * Generates a cryptographic reference token for client verification.
   */
  public generateReferenceToken(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let token = 'ART-';
    for (let i = 0; i < 8; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  /**
   * Submits a new project inquiry or contact brief.
   */
  public createLead(payload: {
    name: string;
    email: string;
    companyName: string;
    industry?: string;
    projectBrief: string;
    source?: string;
  }): LeadInquiry {
    const id = db.generateId('lead');
    const referenceToken = this.generateReferenceToken();
    const now = new Date().toISOString();

    const lead: LeadInquiry = {
      id,
      referenceToken,
      name: payload.name,
      email: payload.email,
      companyName: payload.companyName,
      industry: payload.industry || 'Enterprise',
      projectBrief: payload.projectBrief,
      status: 'new',
      priority: 'high',
      source: payload.source || 'Website Brief Form',
      notes: [`Inquiry received automatically on ${now}`],
      createdAt: now,
      updatedAt: now,
    };

    db.leads.set(id, lead);

    // Create internal system notification
    const notifId = db.generateId('notif');
    db.notifications.set(notifId, {
      id: notifId,
      title: `New Enterprise Inquiry: ${lead.companyName}`,
      message: `${lead.name} submitted a project brief: "${lead.projectBrief.substring(0, 100)}..."`,
      type: 'lead',
      priority: 'high',
      isRead: false,
      actionUrl: `/admin/leads/${lead.id}`,
      createdAt: now,
    });

    return lead;
  }

  /**
   * Lists all incoming leads with filtering.
   */
  public listLeads(options?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): { leads: LeadInquiry[]; total: number } {
    let all = Array.from(db.leads.values());

    if (options?.status) {
      all = all.filter((l) => l.status === options.status);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      all = all.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.companyName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.referenceToken.toLowerCase().includes(q)
      );
    }

    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const startIndex = (page - 1) * limit;

    return { leads: all.slice(startIndex, startIndex + limit), total: all.length };
  }

  /**
   * Updates lead status or notes.
   */
  public updateLead(id: string, updates: Partial<LeadInquiry>): LeadInquiry {
    const existing = db.leads.get(id);
    if (!existing) {
      throw new Error(`Lead with ID "${id}" was not found.`);
    }

    const updated: LeadInquiry = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    db.leads.set(id, updated);
    return updated;
  }
}

export const leadService = new LeadService();
