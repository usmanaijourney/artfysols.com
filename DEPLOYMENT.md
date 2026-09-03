# Artify Sols Backend — Production Deployment Guide

## 1. Supported Deployment Environments

### A. Google Cloud Run (Recommended Containerized Hosting)
- Build command: `npm run build`
- Start command: `node dist/server.cjs` (or `npm start`)
- Ingress: Port `3000` (or `$PORT` mapped by Dockerfile).

### B. Vercel Serverless Deployment
- Entry point: `api/index.ts`
- Static build output directory: `dist`
- Routing: Configured via `vercel.json` with SPA rewrite fallback.

---

## 2. Production Environment Variables

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | Yes | Ingress listener port | `3000` |
| `GEMINI_API_KEY` | Yes | Google Gemini API Secret | `AIzaSy...` |
| `DATABASE_URL` | Optional | PostgreSQL connection string | `postgresql://user:pass@host:5432/artify` |
| `SUPABASE_URL` | Optional | Supabase Project URL | `https://xyz.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Supabase Admin Secret Key | `eyJ...` |
| `STRIPE_SECRET_KEY` | Optional | Stripe Secret Key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Optional | Stripe Webhook Signing Secret | `whsec_...` |

---

## 3. Database Initialization & Migrations
To initialize your Supabase or PostgreSQL database:
1. Connect to your database console.
2. Execute the DDL migration script located at `/server/core/schema.sql`.
3. Verify RLS policies are enabled on all tables.
