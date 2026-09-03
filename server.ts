import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateSitemapXml, generateRobotsTxt, getSitemapUrlList } from "./src/utils/sitemap";
import v1Router from "./server/routes/v1";
import { backgroundScheduler } from "./server/core/scheduler";

dotenv.config();

const distPath = path.join(process.cwd(), "dist");

function getBaseUrl(req: express.Request): string {
  const protocol = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
  const host = req.headers["x-forwarded-host"] || req.headers.host || "artifysols.com";
  return `${protocol}://${host}`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust upstream proxy (Railway, Cloud Run, Cloudflare, etc.)
  app.set("trust proxy", true);

  // Enforce Security Headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  app.use(express.json());

  // Mount Master Modular API v1
  app.use("/api/v1", v1Router);

  // Dynamic XML Sitemap for search engine indexers (Google, Bing, Yandex, etc.)
  app.get(["/sitemap.xml", "/api/sitemap.xml"], (req, res) => {
    try {
      const baseUrl = getBaseUrl(req);
      const sitemapXml = generateSitemapXml(baseUrl);
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=14400"); // Cache 1hr, CDN 4hr
      res.status(200).send(sitemapXml);
    } catch (err: any) {
      console.error("Error generating sitemap:", err);
      res.status(500).send("Error generating sitemap XML");
    }
  });

  // Dynamic robots.txt
  app.get(["/robots.txt", "/api/robots.txt"], (req, res) => {
    try {
      const baseUrl = getBaseUrl(req);
      const robots = generateRobotsTxt(baseUrl);
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400"); // Cache 24hr
      res.status(200).send(robots);
    } catch (err: any) {
      console.error("Error generating robots.txt:", err);
      res.status(500).send("User-agent: *\nAllow: /\n");
    }
  });

  // Structured Sitemap URL list JSON API
  app.get("/api/sitemap", (req, res) => {
    try {
      const baseUrl = getBaseUrl(req);
      const urls = getSitemapUrlList(baseUrl);
      res.json({
        success: true,
        baseUrl,
        total: urls.length,
        urls,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to compile sitemap URLs" });
    }
  });

  // Fast Health check endpoints for Railway / cloud orchestrators
  app.get(["/health", "/api/health"], (req, res) => {
    res.status(200).json({
      status: "ok",
      company: "Artify Solutions",
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      timestamp: new Date().toISOString(),
    });
  });

  // AI Architecture Consultant API
  app.post("/api/ai-consultant", async (req, res) => {
    try {
      const { query, industry, department } = req.body;

      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query is required." });
      }

      const prompt = `You are the Principal AI Architect at Artify Solutions (artifysols.com), a premier AI-native software house specializing in custom artificial intelligence, autonomous agent orchestration, and enterprise automation.
          
Client Question / Scenario: "${query}"
Context - Target Industry: "${industry || 'General Enterprise'}", Department: "${department || 'Cross-Functional'}"

Provide a crisp, authoritative, visionary response structured in 3 clear sections:
1. 💡 **Strategic Diagnosis**: How AI can fundamentally transform this problem (not as a generic chatbot, but as an architectural system).
2. 🤖 **Recommended AI Agents & Architecture**: Specifically name 2-3 specialized autonomous agents (e.g., 'Reconciliation Sentinel', 'Spec Extractor Agent') and how they coordinate.
3. ⚡ **Integration & ROI Velocity**: How it connects to their existing stack and expected operational impact.

Keep your response punchy, precise, and professional. Avoid buzzwords and clichés.`;

      try {
        const { defaultAiProvider } = await import("./server/ai/provider");
        const reply = await defaultAiProvider.generateText(prompt, {
          temperature: 0.7,
        });

        return res.json({
          reply,
          mode: "live-gemini",
          timestamp: new Date().toISOString(),
        });
      } catch (apiErr: any) {
        console.warn("AI generation fallback activated:", apiErr?.message);
      }

      // Intelligent Fallback Knowledge Base Engine
      const normalized = query.toLowerCase();
      let reply = "";

      if (normalized.includes("accounting") || normalized.includes("finance") || normalized.includes("invoice") || normalized.includes("reconcil")) {
        reply = `### 💡 Strategic Diagnosis\nFor finance and accounting, we replace manual month-end fire drills with **Continuous Autonomous Reconciliation**. Instead of waiting for bank statements, intelligence runs every second.\n\n### 🤖 Recommended Architecture & Agent Fleet\n* **Ledger Reconciliation Agent**: Continuously compares transactions across banks, Stripe, and ERP ledgers with sub-penny fuzzy matching.\n* **Invoice OCR & PO Matching Agent**: Extracts multi-page PDF line items, matches against purchase orders, and routes exceptions.\n* **Cash Flow & Variance Sentinel**: Real-time forecasting and instant conversational debriefs on OPEX deltas.\n\n### ⚡ Integration & Impact\nNative bi-directional connectors for NetSuite, QuickBooks, and SAP S/4HANA. Delivers **99.4% automated match rate** and shrinks month-end closes from 12 days to 1.5 days.`;
      } else if (normalized.includes("hr") || normalized.includes("hire") || normalized.includes("recruit") || normalized.includes("employee") || normalized.includes("payroll")) {
        reply = `### 💡 Strategic Diagnosis\nWe engineer an **Autonomous Employee Lifecycle Layer** that automates everything from talent screening to multi-jurisdiction payroll compliance without sacrificing the human touch.\n\n### 🤖 Recommended Architecture & Agent Fleet\n* **Talent Scout & Screener AI**: Evaluates candidate portfolios and resumes against deep job rubrics with bias-masked evaluation.\n* **Onboarding & IT Provisioning Concierge**: Collects compliance docs, configures SSO, and schedules intro briefings 24/7.\n* **Payroll Audit Agent**: Cross-verifies timesheets, commissions, and tax withholdings before single-click disbursement.\n\n### ⚡ Integration & Impact\nConnects directly with Workday, BambooHR, and DocuSign. Achieves **85% reduction in administrative overhead** and zero compliance errors.`;
      } else if (normalized.includes("sales") || normalized.includes("lead") || normalized.includes("crm") || normalized.includes("pipeline")) {
        reply = `### 💡 Strategic Diagnosis\nWe replace manual CRM data entry and cold generic outreach with **Signal-Driven Account Intelligence** that equips sales reps with real-time buying signals.\n\n### 🤖 Recommended Architecture & Agent Fleet\n* **Intent Signal Hunter**: Scans company filings, hiring sprees, and tech stack shifts to identify ready-to-buy enterprise accounts.\n* **CRM Scribe & Note Synthesizer**: Transcribes sales meetings and automatically updates deal stages and action items in Salesforce.\n* **Deal Strategist AI**: Delivers custom battlecards and tailored pitch collateral before every prospect call.\n\n### ⚡ Integration & Impact\nIntegrates seamlessly with Salesforce, HubSpot, and LinkedIn Sales Navigator. Delivers **4x increase in sales rep pipeline capacity**.`;
      } else if (normalized.includes("construction") || normalized.includes("field") || normalized.includes("building") || normalized.includes("contract")) {
        reply = `### 💡 Strategic Diagnosis\nWe connect site telemetry and mobile voice updates directly to your master contract and BIM drawings, eliminating change order disputes.\n\n### 🤖 Recommended Architecture & Agent Fleet\n* **Voice Daily Log Bot**: Allows field supers to speak natural notes; automatically structures weather, labor hours, and safety logs into Procore.\n* **Change Order Auditor**: Cross-references field claims against original specs and material delivery receipts in real time.\n* **Material Buffer Optimizer**: Predicts supply chain delays and dispatches purchase orders before critical-path bottlenecks.\n\n### ⚡ Integration & Impact\nDirect bridge to Procore, Autodesk Construction Cloud, and WhatsApp field bots. Cuts budget overrun risk by **14%**.`;
      } else if (normalized.includes("support") || normalized.includes("customer") || normalized.includes("ticket")) {
        reply = `### 💡 Strategic Diagnosis\nWe deploy an **Action-Capable Support Layer** that doesn't just answer questions—it executes changes inside your databases and systems safely.\n\n### 🤖 Recommended Architecture & Agent Fleet\n* **Autonomous Resolution Agent**: Resolves order modifications, refunds, and technical issues with live API tool access.\n* **Enterprise Knowledge Graph RAG**: Synthesizes engineering docs, Slack history, and resolved tickets for grounded answers.\n* **Human Escalation Sentinel**: Bundles ticket summaries and suggested next steps when human empathy or complex judgment is needed.\n\n### ⚡ Integration & Impact\nConnects with Zendesk, Intercom, and Shopify. Resolves **84%+ of tickets autonomously** with sub-2-second response times.`;
      } else {
        reply = `### 💡 Strategic Diagnosis\nAt Artify, we don't force your operations into generic SaaS templates. We engineer a bespoke AI intelligence layer that mirrors your exact workflows, data models, and team dynamics.\n\n### 🤖 Recommended Architecture & Agent Fleet\n* **Central AI Orchestrator**: Coordinates tasks across specialized departmental agents with sandboxed tool execution.\n* **Domain Knowledge Graph**: Continuously ingests your internal documentation, emails, and database records.\n* **Autonomous Action Pipeline**: Converts manual approvals and repetitive calculations into self-driving business workflows.\n\n### ⚡ Integration & Impact\nConnects to your existing ERPs, databases, and APIs without rip-and-replace. Deployment typically completes in 4 to 8 weeks with immediate compound ROI.`;
      }

      return res.json({
        reply,
        mode: "knowledge-engine",
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("AI Consultant endpoint error:", err);
      return res.status(500).json({ error: "Internal AI processing error" });
    }
  });

  // Brief submission endpoint
  app.post("/api/brief-submit", (req, res) => {
    const { name, company, email, phone, industry, challenge, blueprint } = req.body;
    console.log(`[Project Brief Received] From: ${name} (${company} - ${email}) - Industry: ${industry}`);
    res.json({
      success: true,
      message: "Project brief successfully received. An Artify Solutions Principal Architect will contact you within 24 hours.",
      referenceId: `ART-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      receivedAt: new Date().toISOString(),
    });
  });

  // Vite middleware for development vs static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Artify Solutions Server active on http://0.0.0.0:${PORT}`);
    backgroundScheduler.start();
  });
}

startServer();
