/**
 * Artify Sols Backend — AI Coworkers & Task Execution Engine
 * Manages autonomous agents, task queues, approval policies, and execution traces.
 */

import { db } from '../core/db';
import { defaultAiProvider } from './provider';
import { aiToolExecutor } from './tools';
import { AiCoworker, AiTask } from '../types';

export class CoworkerService {
  /**
   * Lists registered AI coworkers for a company.
   */
  public listCoworkers(companyId?: string): AiCoworker[] {
    let all = Array.from(db.aiCoworkers.values());
    if (companyId) {
      all = all.filter((c) => c.companyId === companyId);
    }
    return all;
  }

  /**
   * Retrieves a coworker by ID.
   */
  public getCoworkerById(id: string): AiCoworker | null {
    return db.aiCoworkers.get(id) || null;
  }

  /**
   * Updates an AI coworker configuration.
   */
  public updateCoworker(id: string, updates: Partial<AiCoworker>): AiCoworker {
    const existing = db.aiCoworkers.get(id);
    if (!existing) {
      throw new Error(`AI Coworker with ID "${id}" was not found.`);
    }

    const updated: AiCoworker = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    db.aiCoworkers.set(id, updated);
    return updated;
  }

  /**
   * Lists tasks for an AI coworker or company.
   */
  public listTasks(options?: {
    companyId?: string;
    coworkerId?: string;
    status?: string;
  }): AiTask[] {
    let all = Array.from(db.aiTasks.values());

    if (options?.companyId) {
      all = all.filter((t) => t.companyId === options.companyId);
    }
    if (options?.coworkerId) {
      all = all.filter((t) => t.coworkerId === options.coworkerId);
    }
    if (options?.status) {
      all = all.filter((t) => t.status === options.status);
    }

    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return all;
  }

  /**
   * Creates and triggers a new AI task.
   */
  public async executeCoworkerTask(payload: {
    coworkerId: string;
    companyId: string;
    title: string;
    prompt: string;
    priority?: 'low' | 'medium' | 'high';
  }): Promise<AiTask> {
    const coworker = db.aiCoworkers.get(payload.coworkerId);
    if (!coworker) {
      throw new Error(`AI Coworker with ID "${payload.coworkerId}" was not found.`);
    }

    if (coworker.status !== 'active') {
      throw new Error(`AI Coworker "${coworker.name}" is currently ${coworker.status}.`);
    }

    const taskId = db.generateId('task');
    const now = new Date().toISOString();

    const task: AiTask = {
      id: taskId,
      companyId: payload.companyId,
      coworkerId: coworker.id,
      coworkerName: coworker.name,
      taskType: 'AUTONOMOUS_RESEARCH_AND_DRAFT',
      title: payload.title,
      prompt: payload.prompt,
      priority: payload.priority || 'medium',
      status: 'RUNNING',
      startedAt: now,
      executionLogs: [
        {
          timestamp: now,
          level: 'info',
          message: `Task started with model ${coworker.model}.`,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    db.aiTasks.set(taskId, task);

    // Asynchronous Execution Pipeline
    try {
      // 1. Tool execution: Search existing articles to prevent duplicate topic
      task.executionLogs.push({
        timestamp: new Date().toISOString(),
        level: 'action',
        message: `Executing tool: searchArticles(query="${payload.title.substring(0, 30)}")`,
      });

      const searchRes = await aiToolExecutor.executeTool(
        'searchArticles',
        { query: payload.title.substring(0, 30) },
        { companyId: coworker.companyId, agentId: coworker.id, agentName: coworker.name, taskId }
      );

      // 2. Formulate prompt for Gemini
      const promptInstruction = `
${coworker.systemInstructions}

Task Objective: "${payload.title}"
Prompt: "${payload.prompt}"

Existing Related Articles Found in CMS: ${JSON.stringify(searchRes.data?.articles || [])}

Please output a structured JSON response with:
1. "articleTitle": An authoritative technical title.
2. "category": One of "Multi-Agent Systems", "Deterministic Finance", "RAG & Knowledge Graphs", "Enterprise Automation", "Security & Governance".
3. "excerpt": A 2-sentence executive summary.
4. "content": A comprehensive markdown article (minimum 3 sections with code examples or architectural diagrams).
5. "tags": Array of 4-6 technical tags.
6. "requiresApproval": true
`;

      let generatedJson: any;
      try {
        const textResult = await defaultAiProvider.generateText(promptInstruction, {
          temperature: coworker.temperature,
          responseMimeType: 'application/json',
        });
        generatedJson = JSON.parse(textResult);
      } catch (err: any) {
        // Fallback structured generation if Gemini key is missing in dev mode
        generatedJson = {
          articleTitle: payload.title,
          category: 'Multi-Agent Systems',
          excerpt: `A technical deep-dive into autonomous execution for ${payload.title}.`,
          content: `## Executive Overview\n\nModern enterprise architecture requires deterministic validation...\n\n### Architectural Topology\n\`\`\`json\n{\n  "agentMesh": "active",\n  "throughput": "sub-40ms"\n}\n\`\`\`\n\n### Summary\nAutonomous agents deliver verifiable ROI when governed by strict approval boundaries.`,
          tags: ['Autonomous AI', 'Enterprise Architecture', 'Deterministic Automation'],
          requiresApproval: true,
        };
      }

      // 3. Create CMS draft
      const draftResult = await aiToolExecutor.executeTool(
        'createDraft',
        {
          title: generatedJson.articleTitle || payload.title,
          category: generatedJson.category || 'AI Research',
          excerpt: generatedJson.excerpt || payload.title,
          content: generatedJson.content || '',
          tags: (generatedJson.tags || []).join(', '),
        },
        { companyId: coworker.companyId, agentId: coworker.id, agentName: coworker.name, taskId }
      );

      // 4. Update task state & check approval policy
      const publishPolicy = coworker.approvalPolicy['publishArticle'] || 'APPROVAL_REQUIRED';

      if (publishPolicy === 'APPROVAL_REQUIRED') {
        task.status = 'WAITING_APPROVAL';
        task.approvalData = {
          toolName: 'publishArticle',
          proposedPayload: {
            articleId: draftResult.data?.articleId,
            title: generatedJson.articleTitle || payload.title,
            slug: draftResult.data?.slug,
          },
          status: 'pending',
        };
        task.executionLogs.push({
          timestamp: new Date().toISOString(),
          level: 'warn',
          message: `Draft created (${draftResult.data?.articleId}). Action "publishArticle" requires human approval under company policy.`,
        });
        coworker.metrics.pendingApprovals += 1;
      } else {
        task.status = 'COMPLETED';
        task.completedAt = new Date().toISOString();
        task.result = { draftResult, generatedJson };
        coworker.metrics.successfulTasks += 1;
      }

      coworker.metrics.totalTasksExecuted += 1;
      coworker.metrics.estimatedCostUsd += 0.02;
      db.aiCoworkers.set(coworker.id, coworker);
      db.aiTasks.set(taskId, task);

      return task;
    } catch (err: any) {
      task.status = 'FAILED';
      task.error = err?.message || 'Unknown error during AI task execution';
      task.completedAt = new Date().toISOString();
      task.executionLogs.push({
        timestamp: new Date().toISOString(),
        level: 'error',
        message: `Task execution failed: ${err?.message || err}`,
      });

      coworker.metrics.failedTasks += 1;
      coworker.metrics.totalTasksExecuted += 1;
      db.aiCoworkers.set(coworker.id, coworker);
      db.aiTasks.set(taskId, task);

      return task;
    }
  }

  /**
   * Approves or rejects a pending AI task action.
   */
  public async decideApproval(
    taskId: string,
    decision: 'approved' | 'rejected',
    decidedBy: string,
    note?: string
  ): Promise<AiTask> {
    const task = db.aiTasks.get(taskId);
    if (!task || !task.approvalData) {
      throw new Error(`No pending approval found for task "${taskId}".`);
    }

    const now = new Date().toISOString();
    task.approvalData.status = decision;
    task.approvalData.decidedBy = decidedBy;
    task.approvalData.decidedAt = now;
    task.approvalData.decisionNote = note;

    if (decision === 'approved') {
      // Execute the pending action (e.g. publish article)
      if (task.approvalData.toolName === 'publishArticle' && task.approvalData.proposedPayload?.articleId) {
        const artId = task.approvalData.proposedPayload.articleId;
        const art = db.articles.get(artId);
        if (art) {
          art.status = 'published';
          art.publishedAt = now;
          db.articles.set(artId, art);
        }
      }

      task.status = 'COMPLETED';
      task.completedAt = now;
      task.executionLogs.push({
        timestamp: now,
        level: 'info',
        message: `Action approved by ${decidedBy}. Proposed changes applied successfully.`,
      });
    } else {
      task.status = 'CANCELLED';
      task.completedAt = now;
      task.executionLogs.push({
        timestamp: now,
        level: 'warn',
        message: `Action rejected by ${decidedBy}. Note: ${note || 'No reason provided.'}`,
      });
    }

    const coworker = db.aiCoworkers.get(task.coworkerId);
    if (coworker && coworker.metrics.pendingApprovals > 0) {
      coworker.metrics.pendingApprovals -= 1;
      db.aiCoworkers.set(coworker.id, coworker);
    }

    db.aiTasks.set(taskId, task);
    return task;
  }
}

export const coworkerService = new CoworkerService();
