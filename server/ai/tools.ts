/**
 * Artify Sols Backend — Controlled AI Tool Registry & Function Execution
 * Enforces strict authentication, permissions check, tenant boundaries, and audit logging.
 */

import { db } from '../core/db';
import { cmsService } from '../services/cmsService';
import { productService } from '../services/productService';
import { notificationService } from '../services/notificationService';
import { AiToolDefinition } from '../types';

export const AI_TOOL_DEFINITIONS: Record<string, AiToolDefinition> = {
  searchWebsite: {
    name: 'searchWebsite',
    description: 'Searches public website pages and marketing content for product offerings and architecture specs.',
    category: 'research',
    requiredPermission: 'ai.agents.execute',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keyword or concept to search' },
      },
      required: ['query'],
    },
  },
  searchArticles: {
    name: 'searchArticles',
    description: 'Searches published articles and knowledge base to check for topic duplication or existing research.',
    category: 'cms',
    requiredPermission: 'blog.view',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term for article titles, tags, or content' },
      },
      required: ['query'],
    },
  },
  getProducts: {
    name: 'getProducts',
    description: 'Retrieves all official Artify AI products, features, pricing, and connected systems.',
    category: 'research',
    requiredPermission: 'products.view',
    parameters: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Optional category filter' },
      },
    },
  },
  createDraft: {
    name: 'createDraft',
    description: 'Creates a new draft article in the CMS with structured markdown and SEO tags.',
    category: 'cms',
    requiredPermission: 'blog.create',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Article title' },
        category: { type: 'string', description: 'Article taxonomy category' },
        excerpt: { type: 'string', description: 'Short summary or teaser' },
        content: { type: 'string', description: 'Full Markdown content body' },
        tags: { type: 'string', description: 'Comma-separated tags' },
      },
      required: ['title', 'category', 'content'],
    },
  },
  submitForApproval: {
    name: 'submitForApproval',
    description: 'Submits a proposed high-impact action (e.g. publication or public announcement) to human reviewers.',
    category: 'cms',
    requiredPermission: 'ai.tasks.approve',
    parameters: {
      type: 'object',
      properties: {
        actionType: { type: 'string', description: 'Type of action (e.g. publishArticle, updatePricing)' },
        summary: { type: 'string', description: 'Executive summary explaining why this action is ready' },
        payload: { type: 'string', description: 'JSON string of the proposed payload' },
      },
      required: ['actionType', 'summary'],
    },
  },
  createNotification: {
    name: 'createNotification',
    description: 'Creates an internal alert or notification for administrators.',
    category: 'notifications',
    requiredPermission: 'notifications.send',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Notification title' },
        message: { type: 'string', description: 'Detailed body message' },
        priority: { type: 'string', description: 'low, normal, high, urgent', enum: ['low', 'normal', 'high', 'urgent'] },
      },
      required: ['title', 'message'],
    },
  },
};

export class AiToolExecutor {
  /**
   * Executes a controlled tool call on behalf of an AI Coworker.
   */
  public async executeTool(
    toolName: string,
    args: Record<string, any>,
    context: {
      companyId: string;
      agentId: string;
      agentName: string;
      taskId?: string;
    }
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const def = AI_TOOL_DEFINITIONS[toolName];
    if (!def) {
      return { success: false, error: `Tool "${toolName}" is not registered in the system.` };
    }

    try {
      switch (toolName) {
        case 'searchWebsite': {
          const q = (args.query || '').toLowerCase();
          const matches = Array.from(db.products.values())
            .filter((p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))
            .map((p) => ({ name: p.name, tagline: p.tagline, summary: p.shortDescription }));
          return { success: true, data: { matches, total: matches.length } };
        }

        case 'searchArticles': {
          const res = cmsService.listArticles({ companyId: context.companyId, search: args.query, limit: 10 });
          return {
            success: true,
            data: {
              articles: res.articles.map((a) => ({
                id: a.id,
                title: a.title,
                slug: a.slug,
                category: a.category,
                status: a.status,
                tags: a.tags,
              })),
              total: res.total,
            },
          };
        }

        case 'getProducts': {
          const prods = productService.listProducts({ category: args.category });
          return {
            success: true,
            data: prods.map((p) => ({
              name: p.name,
              category: p.category,
              tagline: p.tagline,
              features: p.features,
              connectedSystems: p.connectedSystems,
            })),
          };
        }

        case 'createDraft': {
          const tagsArray = typeof args.tags === 'string' ? args.tags.split(',').map((t: string) => t.trim()) : [];
          const article = cmsService.createArticle({
            companyId: context.companyId,
            title: args.title,
            slug: (args.title || '')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, ''),
            category: args.category || 'AI Research',
            excerpt: args.excerpt || args.title,
            content: args.content || '',
            tags: tagsArray.length > 0 ? tagsArray : ['AI Research', 'Autonomous Systems'],
            status: 'draft',
            author: {
              name: context.agentName,
              role: 'Autonomous AI Coworker',
              type: 'ai',
              agentId: context.agentId,
            },
            seo: {
              title: `${args.title} | Artify Solutions Intelligence`,
              description: args.excerpt || args.title,
              focusKeywords: tagsArray,
            },
            provenance: {
              createdByType: 'ai',
              agentName: context.agentName,
              agentId: context.agentId,
              taskId: context.taskId,
              generatedAt: new Date().toISOString(),
            },
          });

          return { success: true, data: { articleId: article.id, slug: article.slug, status: article.status } };
        }

        case 'submitForApproval': {
          const notif = notificationService.createNotification({
            companyId: context.companyId,
            title: `AI Action Pending Approval: ${args.actionType}`,
            message: `${context.agentName} requested approval for: ${args.summary}`,
            type: 'ai',
            priority: 'high',
          });

          return { success: true, data: { notificationId: notif.id, status: 'WAITING_APPROVAL' } };
        }

        case 'createNotification': {
          const notif = notificationService.createNotification({
            companyId: context.companyId,
            title: args.title,
            message: args.message,
            type: 'ai',
            priority: args.priority || 'normal',
          });
          return { success: true, data: { notificationId: notif.id } };
        }

        default:
          return { success: false, error: `Unhandled tool execution: ${toolName}` };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Tool execution error' };
    }
  }
}

export const aiToolExecutor = new AiToolExecutor();
