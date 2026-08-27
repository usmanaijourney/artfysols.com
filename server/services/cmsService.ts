/**
 * Artify Sols Backend — CMS & Article Publishing Service
 * Handles article authoring, SEO metadata, revisions, status lifecycle, and scheduled publishing.
 */

import { db } from '../core/db';
import { ArticleRecord, ContentStatus } from '../types';

export class CmsService {
  /**
   * Retrieves all articles with optional tenant and status filters.
   */
  public listArticles(options?: {
    companyId?: string;
    status?: ContentStatus;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): { articles: ArticleRecord[]; total: number } {
    let all = Array.from(db.articles.values());

    if (options?.companyId) {
      all = all.filter((a) => a.companyId === options.companyId);
    }
    if (options?.status) {
      all = all.filter((a) => a.status === options.status);
    }
    if (options?.category && options.category !== 'All') {
      all = all.filter((a) => a.category.toLowerCase() === options.category!.toLowerCase());
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      all = all.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort newest first
    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginated = all.slice(startIndex, startIndex + limit);

    return { articles: paginated, total: all.length };
  }

  /**
   * Finds an article by slug or ID.
   */
  public getArticleBySlugOrId(identifier: string): ArticleRecord | null {
    for (const a of db.articles.values()) {
      if (a.id === identifier || a.slug === identifier) {
        return a;
      }
    }
    return null;
  }

  /**
   * Creates a new article draft or publication.
   */
  public createArticle(
    payload: Omit<ArticleRecord, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>
  ): ArticleRecord {
    const id = db.generateId('art');
    const now = new Date().toISOString();

    const slug =
      payload.slug ||
      payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const article: ArticleRecord = {
      ...payload,
      id,
      slug,
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    db.articles.set(id, article);

    // Audit log
    db.auditLogs.push({
      id: db.generateId('aud'),
      companyId: payload.companyId,
      actorId: payload.author.agentId || 'usr_cms',
      actorName: payload.author.name,
      actorType: payload.author.type === 'ai' ? 'ai_coworker' : 'user',
      action: 'ARTICLE_CREATED',
      resource: 'cms_article',
      resourceId: id,
      details: { title: article.title, status: article.status, category: article.category },
      timestamp: now,
    });

    return article;
  }

  /**
   * Updates an existing article.
   */
  public updateArticle(id: string, updates: Partial<ArticleRecord>): ArticleRecord {
    const existing = db.articles.get(id);
    if (!existing) {
      throw new Error(`Article with ID "${id}" was not found.`);
    }

    const updated: ArticleRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    db.articles.set(id, updated);
    return updated;
  }

  /**
   * Publishes an article immediately.
   */
  public publishArticle(id: string, reviewerName?: string): ArticleRecord {
    const article = db.articles.get(id);
    if (!article) {
      throw new Error(`Article with ID "${id}" was not found.`);
    }

    const now = new Date().toISOString();
    article.status = 'published';
    article.publishedAt = now;
    article.updatedAt = now;

    if (article.provenance) {
      article.provenance.reviewedBy = reviewerName || 'Human Editor';
      article.provenance.approvedAt = now;
    }

    db.articles.set(id, article);

    db.auditLogs.push({
      id: db.generateId('aud'),
      companyId: article.companyId,
      actorId: 'usr_approver',
      actorName: reviewerName || 'Editorial Approver',
      actorType: 'user',
      action: 'ARTICLE_PUBLISHED',
      resource: 'cms_article',
      resourceId: id,
      details: { title: article.title, slug: article.slug },
      timestamp: now,
    });

    return article;
  }

  /**
   * Deletes an article.
   */
  public deleteArticle(id: string): boolean {
    const existing = db.articles.get(id);
    if (!existing) return false;
    db.articles.delete(id);
    return true;
  }
}

export const cmsService = new CmsService();
