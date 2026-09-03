/**
 * Artify Sols Backend — Background Job Queue & Autonomous Scheduler Engine
 * Executes recurring cron tasks and background AI coworker runs server-side.
 */

import { db } from '../core/db';
import { CoworkerService } from '../ai/coworkerService';

export interface BackgroundJob {
  id: string;
  name: string;
  type: 'AI_COWORKER_RECURRING' | 'SEO_SYNC' | 'SUBSCRIPTION_RENEWAL' | 'AUDIT_PRUNING';
  cronSchedule?: string;
  intervalMs?: number;
  lastRunAt?: string;
  nextRunAt?: string;
  status: 'idle' | 'running' | 'failed';
  failureCount: number;
  payload?: any;
}

export class BackgroundScheduler {
  private jobs: Map<string, BackgroundJob> = new Map();
  private intervalTimer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private coworkerService: CoworkerService;

  constructor() {
    this.coworkerService = new CoworkerService();
    this.registerDefaultJobs();
  }

  /**
   * Registers default recurring scheduled system jobs.
   */
  private registerDefaultJobs() {
    // 1. Content Manager Weekly Technical Deep-Dive
    this.jobs.set('job_content_weekly_research', {
      id: 'job_content_weekly_research',
      name: 'Artify Content Manager — Autonomous Research & CMS Draft Generation',
      type: 'AI_COWORKER_RECURRING',
      cronSchedule: '0 9 * * 1', // Weekly
      intervalMs: 1000 * 60 * 60 * 24 * 7,
      status: 'idle',
      failureCount: 0,
      payload: {
        coworkerId: 'ai_coworker_content_mgr',
        companyId: 'org_artify_hq',
        title: 'Deterministic State Verification in Autonomous Enterprise AI',
        prompt: 'Generate an authoritative whitepaper covering mathematical state verification, zero-exception reconciliation, and sub-40ms vector RAG graph traversal.',
      },
    });

    // 2. Financial Reconciliation Anomaly Scan
    this.jobs.set('job_finance_recon_scan', {
      id: 'job_finance_recon_scan',
      name: 'Financial Auditor AI — Continuous Ledger Anomaly Scan',
      type: 'AI_COWORKER_RECURRING',
      intervalMs: 1000 * 60 * 60 * 12, // Every 12 hours
      status: 'idle',
      failureCount: 0,
      payload: {
        coworkerId: 'ai_coworker_recon_auditor',
        companyId: 'org_artify_hq',
        title: 'Bi-Daily Multi-Currency Ledger Reconciliation',
        prompt: 'Scan internal ledger entries, match webhook transactions against payment intent IDs, and flag discrepancies exceeding $0.00.',
      },
    });
  }

  /**
   * Starts the background scheduler loop.
   */
  public start(pollIntervalMs: number = 30000) {
    if (this.isRunning) return;
    this.isRunning = true;

    console.log(`[Scheduler] Background Job Engine started (polling every ${pollIntervalMs / 1000}s).`);

    this.intervalTimer = setInterval(() => {
      this.tick();
    }, pollIntervalMs);
  }

  /**
   * Stops the background scheduler loop.
   */
  public stop() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
    this.isRunning = false;
    console.log('[Scheduler] Background Job Engine stopped.');
  }

  /**
   * Internal tick verifying job execution schedules.
   */
  private async tick() {
    const now = Date.now();

    for (const job of this.jobs.values()) {
      if (job.status === 'running') continue;

      const lastRun = job.lastRunAt ? new Date(job.lastRunAt).getTime() : 0;
      const interval = job.intervalMs || 1000 * 60 * 60 * 24;

      if (now - lastRun >= interval) {
        this.runJob(job);
      }
    }
  }

  /**
   * Executes a background job asynchronously.
   */
  public async runJob(job: BackgroundJob): Promise<void> {
    job.status = 'running';
    job.lastRunAt = new Date().toISOString();

    try {
      if (job.type === 'AI_COWORKER_RECURRING' && job.payload) {
        console.log(`[Scheduler] Executing scheduled AI job: "${job.name}"...`);
        await this.coworkerService.executeCoworkerTask({
          coworkerId: job.payload.coworkerId,
          companyId: job.payload.companyId,
          title: job.payload.title,
          prompt: job.payload.prompt,
          priority: 'medium',
        });
      }
      job.status = 'idle';
      job.failureCount = 0;
    } catch (err: any) {
      job.status = 'failed';
      job.failureCount += 1;
      console.error(`[Scheduler] Error running job "${job.id}":`, err?.message || err);
    }
  }

  /**
   * Lists all background jobs and status.
   */
  public listJobs(): BackgroundJob[] {
    return Array.from(this.jobs.values());
  }
}

export const backgroundScheduler = new BackgroundScheduler();
