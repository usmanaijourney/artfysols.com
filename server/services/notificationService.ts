/**
 * Artify Sols Backend — Notifications & Audit Logging Services
 */

import { db } from '../core/db';
import { NotificationRecord, AuditLogRecord } from '../types';

export class NotificationService {
  /**
   * Sends or broadcasts a new notification.
   */
  public createNotification(payload: Omit<NotificationRecord, 'id' | 'createdAt' | 'isRead'>): NotificationRecord {
    const id = db.generateId('notif');
    const now = new Date().toISOString();

    const notif: NotificationRecord = {
      ...payload,
      id,
      isRead: false,
      createdAt: now,
    };

    db.notifications.set(id, notif);
    return notif;
  }

  /**
   * Lists notifications for a company/user.
   */
  public listNotifications(options?: {
    companyId?: string;
    userId?: string;
    unreadOnly?: boolean;
    limit?: number;
  }): NotificationRecord[] {
    let all = Array.from(db.notifications.values());

    if (options?.companyId) {
      all = all.filter((n) => !n.companyId || n.companyId === options.companyId);
    }
    if (options?.userId) {
      all = all.filter((n) => !n.userId || n.userId === options.userId);
    }
    if (options?.unreadOnly) {
      all = all.filter((n) => !n.isRead);
    }

    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return all.slice(0, options?.limit || 50);
  }

  /**
   * Marks a notification as read.
   */
  public markAsRead(id: string): boolean {
    const notif = db.notifications.get(id);
    if (!notif) return false;
    notif.isRead = true;
    db.notifications.set(id, notif);
    return true;
  }
}

export class AuditService {
  /**
   * Logs a security or operational event.
   */
  public log(event: Omit<AuditLogRecord, 'id' | 'timestamp'>): AuditLogRecord {
    const record: AuditLogRecord = {
      ...event,
      id: db.generateId('aud'),
      timestamp: new Date().toISOString(),
    };

    db.auditLogs.unshift(record);

    // Keep memory audit log capped at 2000 entries
    if (db.auditLogs.length > 2000) {
      db.auditLogs.pop();
    }

    return record;
  }

  /**
   * Queries audit logs with filtering.
   */
  public queryLogs(options?: {
    companyId?: string;
    actorType?: string;
    resource?: string;
    page?: number;
    limit?: number;
  }): { logs: AuditLogRecord[]; total: number } {
    let all = [...db.auditLogs];

    if (options?.companyId) {
      all = all.filter((l) => l.companyId === options.companyId);
    }
    if (options?.actorType) {
      all = all.filter((l) => l.actorType === options.actorType);
    }
    if (options?.resource) {
      all = all.filter((l) => l.resource === options.resource);
    }

    const page = options?.page || 1;
    const limit = options?.limit || 50;
    const startIndex = (page - 1) * limit;

    return { logs: all.slice(startIndex, startIndex + limit), total: all.length };
  }
}

export const notificationService = new NotificationService();
export const auditService = new AuditService();
