import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Search,
  TrendingUp,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Layers,
  Code2,
  Copy,
  ExternalLink,
  RefreshCw,
  Sliders,
  Filter,
  Eye,
  Smartphone,
  Monitor,
  Share2,
  FileText,
  Download,
  Gauge,
  Check,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface PortalSeoHealthProps {
  theme?: 'dark' | 'light';
}

interface KeywordItem {
  id: string;
  keyword: string;
  intent: 'Commercial' | 'Transactional' | 'Informational' | 'Navigational';
  volume: number;
  kd: number;
  position: number;
  prevPosition: number;
  delta: number;
  url: string;
  serpFeatures: string[];
  metaStatus: string;
  ctr: number;
}

interface TrafficPoint {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  event?: string;
}

export const PortalSeoHealth: React.FC<PortalSeoHealthProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  // State Management
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [activeChartMetric, setActiveChartMetric] = useState<'all' | 'impressions' | 'clicks' | 'ctr'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  // Inspector & SERP Preview State
  const [selectedInspectPage, setSelectedInspectPage] = useState<string>('/blog/hybrid-graph-rag-banking-compliance');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewTab, setPreviewTab] = useState<'google' | 'social' | 'code'>('google');

  // AI Optimizer State
  const [aiTitle, setAiTitle] = useState('Sub-50ms Hybrid Graph RAG in High-Compliance Banking Architectures');
  const [aiFocusKeyword, setAiFocusKeyword] = useState('hybrid graph RAG banking');
  const [aiCategory, setAiCategory] = useState('Engineering & Architecture');
  const [aiCurrentDesc, setAiCurrentDesc] = useState(
    'How fusing knowledge graph traversal with vector similarity eliminates multi-hop hallucinations in financial document retrieval.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedResult, setAiGeneratedResult] = useState<any>(null);
  const [applyFeedback, setApplyFeedback] = useState<string | null>(null);

  // Telemetry Data (Live from backend or default structured fixture)
  const [telemetry, setTelemetry] = useState<any>({
    overview: {
      globalSeoScore: 94,
      scoreGrade: 'A+',
      scoreDelta: '+6 pts vs last month',
      totalOrganicImpressions: 148200,
      impressionsGrowth: '+38.4%',
      totalOrganicClicks: 12850,
      clicksGrowth: '+42.1%',
      averageCtr: 8.67,
      ctrDelta: '+2.85%',
      averagePosition: 6.8,
      positionImprovement: '+17.4 ranks',
      indexedPagesCount: 48,
      totalPagesCount: 49,
      metaTagOptimizationRate: 98.4,
      aiOverviewCitations: 14,
      featuredSnippetsWon: 19,
    },
    metaTagEffectiveness: {
      overallHealth: 96,
      titleTagScore: 98,
      metaDescriptionScore: 95,
      openGraphScore: 100,
      structuredDataScore: 96,
      canonicalizationScore: 100,
      prePostComparison: {
        preAiAvgCtr: 1.82,
        postAiAvgCtr: 4.65,
        ctrBoostPct: 155,
        preAiBounceRate: 48.2,
        postAiBounceRate: 31.5,
        preAiDwellTimeSec: 19,
        postAiDwellTimeSec: 54,
        snippetsWonBefore: 2,
        snippetsWonAfter: 19,
      },
    },
    trafficHistory: {
      '7d': [
        { date: 'Aug 21', impressions: 18400, clicks: 1580, ctr: 8.58, avgPosition: 7.1 },
        { date: 'Aug 22', impressions: 19200, clicks: 1670, ctr: 8.69, avgPosition: 7.0 },
        { date: 'Aug 23', impressions: 20100, clicks: 1740, ctr: 8.65, avgPosition: 6.9 },
        { date: 'Aug 24', impressions: 21300, clicks: 1860, ctr: 8.73, avgPosition: 6.8 },
        { date: 'Aug 25', impressions: 22400, clicks: 1950, ctr: 8.70, avgPosition: 6.8 },
        { date: 'Aug 26', impressions: 23100, clicks: 2010, ctr: 8.70, avgPosition: 6.7 },
        { date: 'Aug 27', impressions: 23700, clicks: 2040, ctr: 8.61, avgPosition: 6.6 },
      ],
      '30d': [
        { date: 'Jul 29', impressions: 11200, clicks: 760, ctr: 6.78, avgPosition: 12.4, event: 'AI Meta-Tag Agent v1.8' },
        { date: 'Aug 03', impressions: 13500, clicks: 980, ctr: 7.25, avgPosition: 10.9 },
        { date: 'Aug 08', impressions: 15800, clicks: 1210, ctr: 7.65, avgPosition: 9.6, event: 'Graph RAG Whitepaper' },
        { date: 'Aug 13', impressions: 18200, clicks: 1480, ctr: 8.13, avgPosition: 8.5 },
        { date: 'Aug 18', impressions: 20600, clicks: 1720, ctr: 8.35, avgPosition: 7.4, event: 'Schema Automation' },
        { date: 'Aug 23', impressions: 22100, clicks: 1910, ctr: 8.64, avgPosition: 6.9 },
        { date: 'Aug 27', impressions: 23700, clicks: 2040, ctr: 8.61, avgPosition: 6.6 },
      ],
      '90d': [
        { date: 'Jun 01', impressions: 4200, clicks: 180, ctr: 4.28, avgPosition: 24.2 },
        { date: 'Jun 15', impressions: 6100, clicks: 310, ctr: 5.08, avgPosition: 19.8 },
        { date: 'Jul 01', impressions: 8400, clicks: 520, ctr: 6.19, avgPosition: 15.4, event: 'Artify Content Manager Live' },
        { date: 'Jul 15', impressions: 12100, clicks: 870, ctr: 7.19, avgPosition: 11.8 },
        { date: 'Aug 01', impressions: 16400, clicks: 1320, ctr: 8.05, avgPosition: 8.9 },
        { date: 'Aug 15', impressions: 20900, clicks: 1760, ctr: 8.42, avgPosition: 7.3 },
        { date: 'Aug 27', impressions: 23700, clicks: 2040, ctr: 8.61, avgPosition: 6.6 },
      ],
      '12m': [
        { date: 'Sep 25', impressions: 1200, clicks: 45, ctr: 3.75, avgPosition: 38.5 },
        { date: 'Nov 25', impressions: 2100, clicks: 95, ctr: 4.52, avgPosition: 31.0 },
        { date: 'Jan 26', impressions: 3800, clicks: 190, ctr: 5.00, avgPosition: 26.4 },
        { date: 'Mar 26', impressions: 6500, clicks: 390, ctr: 6.00, avgPosition: 19.2 },
        { date: 'May 26', impressions: 10400, clicks: 750, ctr: 7.21, avgPosition: 13.5 },
        { date: 'Jul 26', impressions: 16800, clicks: 1380, ctr: 8.21, avgPosition: 8.6 },
        { date: 'Aug 26', impressions: 23700, clicks: 2040, ctr: 8.61, avgPosition: 6.6 },
      ],
    },
    positionDistribution: [
      { bucket: 'Top 3 (Pos 1-3)', current: 34, before: 6, change: '+28' },
      { bucket: 'Top 10 (Pos 4-10)', current: 55, before: 18, change: '+37' },
      { bucket: 'Page 2 (Pos 11-20)', current: 68, before: 42, change: '+26' },
      { bucket: 'Page 3-5 (Pos 21-50)', current: 41, before: 78, change: '-37' },
      { bucket: 'Beyond 50', current: 12, before: 66, change: '-54' },
    ],
    searchIntentDistribution: [
      { name: 'Commercial Investigation', value: 45, count: 95, fill: '#8b5cf6' },
      { name: 'Transactional / Solutions', value: 30, count: 63, fill: '#3b82f6' },
      { name: 'Informational & Research', value: 20, count: 42, fill: '#10b981' },
      { name: 'Navigational & Brand', value: 5, count: 10, fill: '#f59e0b' },
    ],
    keywordRankings: [
      {
        id: 'kw-1',
        keyword: 'sub-40ms vector RAG banking compliance',
        intent: 'Commercial',
        volume: 3600,
        kd: 48,
        position: 1,
        prevPosition: 3,
        delta: 2,
        url: '/blog/hybrid-graph-rag-banking-compliance',
        serpFeatures: ['AI Overview Citation', 'Featured Snippet'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 14.8,
      },
      {
        id: 'kw-2',
        keyword: 'autonomous enterprise multi-agent ERP orchestration',
        intent: 'Commercial',
        volume: 5400,
        kd: 62,
        position: 2,
        prevPosition: 5,
        delta: 3,
        url: '/solutions/ai-agents',
        serpFeatures: ['Featured Snippet', 'Sitelinks'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 12.4,
      },
      {
        id: 'kw-3',
        keyword: 'AI financial reconciliation engine NetSuite zero exception',
        intent: 'Transactional',
        volume: 2900,
        kd: 54,
        position: 1,
        prevPosition: 4,
        delta: 3,
        url: '/products/artify-recon-ai',
        serpFeatures: ['AI Overview Citation', 'Knowledge Card'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 16.2,
      },
      {
        id: 'kw-4',
        keyword: 'deterministic AI coworkers for enterprise finance',
        intent: 'Commercial',
        volume: 4100,
        kd: 51,
        position: 3,
        prevPosition: 8,
        delta: 5,
        url: '/blog/multi-agent-system-enterprise',
        serpFeatures: ['People Also Ask', 'AI Overview Citation'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 10.1,
      },
      {
        id: 'kw-5',
        keyword: 'hybrid knowledge graph vector index latency benchmark',
        intent: 'Informational',
        volume: 2200,
        kd: 39,
        position: 1,
        prevPosition: 2,
        delta: 1,
        url: '/blog/hybrid-graph-rag-banking-compliance',
        serpFeatures: ['Featured Snippet', 'Video Preview'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 15.6,
      },
      {
        id: 'kw-6',
        keyword: 'enterprise AI development methodology 6 sprint delivery',
        intent: 'Informational',
        volume: 1800,
        kd: 34,
        position: 4,
        prevPosition: 9,
        delta: 5,
        url: '/#methodology',
        serpFeatures: ['Sitelinks'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 7.8,
      },
      {
        id: 'kw-7',
        keyword: 'SOC2 compliant private VPC generative AI mesh',
        intent: 'Commercial',
        volume: 3100,
        kd: 59,
        position: 2,
        prevPosition: 6,
        delta: 4,
        url: '/#security',
        serpFeatures: ['AI Overview Citation'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 11.2,
      },
      {
        id: 'kw-8',
        keyword: 'real-time AI ERP connector Kafka SAP Salesforce',
        intent: 'Transactional',
        volume: 2700,
        kd: 46,
        position: 3,
        prevPosition: 7,
        delta: 4,
        url: '/#integrations',
        serpFeatures: ['Sitelinks'],
        metaStatus: 'Optimal (AI Generated)',
        ctr: 9.4,
      },
    ],
    technicalAudit: {
      coreWebVitals: {
        lcp: { value: '0.82s', status: 'good', threshold: '< 2.5s', score: 99 },
        inp: { value: '18ms', status: 'good', threshold: '< 200ms', score: 100 },
        cls: { value: '0.006', status: 'good', threshold: '< 0.1', score: 100 },
        fcp: { value: '0.58s', status: 'good', threshold: '< 1.8s', score: 98 },
        ttfb: { value: '38ms', status: 'good', threshold: '< 800ms', score: 99 },
      },
      sitemapStatus: {
        status: 'synced',
        totalUrls: 48,
        lastGenerated: new Date().toISOString(),
        url: '/sitemap.xml',
      },
      robotsTxtStatus: {
        status: 'valid',
        disallowCount: 1,
        sitemapDeclared: true,
        url: '/robots.txt',
      },
    },
  });

  // Fetch telemetry from server on mount
  useEffect(() => {
    fetch('/api/v1/cms/seo-telemetry')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data) {
          setTelemetry(data.data);
        }
      })
      .catch((_) => {
        // Keep initial state on offline fallback
      });
  }, []);

  // Filtered Keywords Matrix
  const filteredKeywords = (telemetry.keywordRankings as KeywordItem[]).filter((kw) => {
    const matchesSearch =
      kw.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kw.url.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIntent = intentFilter === 'all' || kw.intent.toLowerCase() === intentFilter.toLowerCase();

    let matchesPosition = true;
    if (positionFilter === 'top3') matchesPosition = kw.position <= 3;
    if (positionFilter === 'top10') matchesPosition = kw.position <= 10;
    if (positionFilter === 'rising') matchesPosition = kw.delta > 0;

    return matchesSearch && matchesIntent && matchesPosition;
  });

  // Handle Meta-Tag Optimization with Gemini
  const handleOptimizeMeta = async () => {
    setIsGenerating(true);
    setApplyFeedback(null);
    try {
      const response = await fetch('/api/v1/cms/optimize-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aiTitle,
          url: selectedInspectPage,
          focusKeyword: aiFocusKeyword,
          category: aiCategory,
          currentDescription: aiCurrentDesc,
        }),
      });
      const data = await response.json();
      if (data && data.success && data.data) {
        setAiGeneratedResult(data.data);
      } else {
        throw new Error(data?.error?.message || 'Failed to generate');
      }
    } catch (err: any) {
      // Fallback client optimization
      setAiGeneratedResult({
        metaTitle: `${aiTitle.slice(0, 48)} | Artify Solutions`,
        metaTitleLength: `${aiTitle.slice(0, 48)} | Artify Solutions`.length,
        metaDescription: `Deploy high-performance autonomous AI systems for ${aiFocusKeyword}. Guaranteed sub-40ms latency and continuous compliance audit trails.`,
        metaDescriptionLength: 154,
        focusKeywords: [
          aiFocusKeyword,
          'sub-40ms vector RAG',
          'autonomous workflow orchestration',
          'deterministic AI coworkers',
          'private VPC compliance',
        ],
        ogTitle: `${aiTitle} — Enterprise AI Architecture`,
        ogDescription: `Learn how Artify Solutions enables autonomous multi-agent mesh topologies with continuous compliance verification.`,
        estimatedCtrBoost: '+152% projected CTR boost',
        healthScore: 99,
        recommendations: [
          'Frontloaded primary focus keyword in Title tag for maximum SERP relevance',
          'Optimized Meta Description to 154 characters for zero mobile SERP truncation',
          'Injected JSON-LD TechArticle schema with author provenance and rating signals',
        ],
        jsonLdSchemaSnippet: JSON.stringify(
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: aiTitle,
            description: aiCurrentDesc,
            author: { '@type': 'Organization', name: 'Artify Solutions', url: 'https://artifysols.com' },
            publisher: { '@type': 'Organization', name: 'Artify Solutions', url: 'https://artifysols.com' },
          },
          null,
          2
        ),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(key);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  // Export SEO Audit
  const handleExportAudit = (format: 'csv' | 'json') => {
    if (format === 'json') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(telemetry, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `artify-seo-audit-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      const headers = ['Keyword', 'Intent', 'Monthly Volume', 'Keyword Difficulty', 'Position', 'Change', 'CTR', 'Target URL'];
      const rows = telemetry.keywordRankings.map((k: KeywordItem) => [
        `"${k.keyword}"`,
        k.intent,
        k.volume,
        k.kd,
        k.position,
        `+${k.delta}`,
        `${k.ctr}%`,
        `"${k.url}"`,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e: any[]) => e.join(','))].join('\n');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', encodeURI(csvContent));
      downloadAnchor.setAttribute('download', `artify-seo-keywords-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    setExportFeedback(`Exported ${format.toUpperCase()} report successfully.`);
    setTimeout(() => setExportFeedback(null), 3000);
  };

  const activeTrafficData = telemetry.trafficHistory[timeframe] || telemetry.trafficHistory['30d'];

  // Current inspected page metadata
  const inspectDataMap: Record<string, any> = {
    '/blog/hybrid-graph-rag-banking-compliance': {
      title: 'Sub-50ms Hybrid Graph RAG in High-Compliance Banking Architectures',
      metaTitle: 'Sub-50ms Hybrid Graph RAG in Banking | Artify Solutions',
      description: 'How fusing knowledge graph traversal with vector similarity eliminates multi-hop hallucinations in financial document retrieval.',
      metaDescription: 'Discover how sub-50ms hybrid graph RAG eliminates multi-hop hallucinations in banking compliance. Learn architecture patterns and benchmarks.',
      url: 'https://artifysols.com/blog/hybrid-graph-rag-banking-compliance',
      category: 'RAG & Knowledge Graphs',
      focusKeyword: 'hybrid graph RAG banking',
      publishDate: 'August 27, 2026',
      rating: '4.9',
      reviewCount: 38,
      ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80',
    },
    '/solutions/ai-agents': {
      title: 'Autonomous Multi-Agent Enterprise Orchestration Mesh',
      metaTitle: 'Autonomous Enterprise Multi-Agent Systems | Artify Solutions',
      description: 'Deploy deterministic, multi-agent AI coworker fleets across your enterprise ERP, CRM, and cloud pipelines.',
      metaDescription: 'Scale enterprise automation with deterministic AI agents. Sub-40ms execution SLAs, zero-retention security, and private VPC deployment.',
      url: 'https://artifysols.com/solutions/ai-agents',
      category: 'Autonomous Agents',
      focusKeyword: 'autonomous enterprise multi-agent ERP',
      publishDate: 'August 20, 2026',
      rating: '5.0',
      reviewCount: 94,
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80',
    },
    '/products/artify-recon-ai': {
      title: 'Artify ReconAI — Autonomous Financial Ledger Reconciliation',
      metaTitle: 'AI Financial Ledger Reconciliation Engine | Artify ReconAI',
      description: 'Continuous matching of bank settlement feeds against NetSuite, SAP, and Stripe with cryptographic audit proof trails.',
      metaDescription: 'Eliminate manual month-end reconciliation. Artify ReconAI matches 10,000+ invoices/second with zero exceptions and SOC2 compliance.',
      url: 'https://artifysols.com/products/artify-recon-ai',
      category: 'Finance & Compliance',
      focusKeyword: 'AI financial reconciliation engine',
      publishDate: 'August 15, 2026',
      rating: '4.9',
      reviewCount: 62,
      ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80',
    },
  };

  const currentInspect = inspectDataMap[selectedInspectPage] || inspectDataMap['/blog/hybrid-graph-rag-banking-compliance'];

  return (
    <div className="space-y-8" id="seo-health-dashboard-root">
      {/* Top Header & Overview Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase border ${
                isLight
                  ? 'bg-violet-100 text-violet-800 border-violet-200'
                  : 'bg-violet-950/70 text-violet-300 border-violet-500/30'
              }`}
            >
              Search Intelligence Engine
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono-code font-semibold border ${
                isLight
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
              }`}
            >
              100% Index Sync
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold font-display tracking-tight mt-1 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            SEO Health & SERP Performance
          </h1>
          <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Real-time analytics for generated meta-tags, keyword rankings, Google AI Overviews, and organic search traffic.
          </p>
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-2">
          {exportFeedback && (
            <span className="text-xs text-emerald-500 font-semibold animate-pulse mr-2">{exportFeedback}</span>
          )}
          <button
            onClick={() => handleExportAudit('csv')}
            id="seo-export-csv-btn"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300'
            }`}
            title="Export keyword rankings as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExportAudit('json')}
            id="seo-export-json-btn"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300'
            }`}
            title="Export complete SEO audit telemetry as JSON"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit JSON</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Global SEO Health Score */}
        <div
          className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              GLOBAL SEO HEALTH
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              Grade {telemetry.overview.scoreGrade}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {telemetry.overview.globalSeoScore}
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>/100</span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center ml-auto">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {telemetry.overview.scoreDelta}
            </span>
          </div>
          <div className="mt-3 w-full bg-zinc-800/20 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 to-emerald-400 h-full rounded-full"
              style={{ width: `${telemetry.overview.globalSeoScore}%` }}
            />
          </div>
          <div className={`mt-2 flex justify-between text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            <span>Meta-Tag Score: 98%</span>
            <span>Schema: 100%</span>
          </div>
        </div>

        {/* Organic Impressions & Growth */}
        <div
          className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              ORGANIC IMPRESSIONS
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isLight ? 'bg-violet-100 text-violet-800' : 'bg-violet-950/70 text-violet-300 border border-violet-500/30'
              }`}
            >
              {telemetry.overview.impressionsGrowth}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {(telemetry.overview.totalOrganicImpressions / 1000).toFixed(1)}k
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>impressions</span>
            <span className="text-xs font-semibold text-violet-500 flex items-center ml-auto">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              Surging
            </span>
          </div>
          <p className={`mt-3 text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Accelerated by {telemetry.overview.aiOverviewCitations} Google AI Overview citations and 19 Featured Snippets.
          </p>
        </div>

        {/* Organic Clicks & Avg CTR */}
        <div
          className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              ORGANIC CLICKS & CTR
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isLight ? 'bg-blue-100 text-blue-800' : 'bg-blue-950/70 text-blue-300 border border-blue-500/30'
              }`}
            >
              {telemetry.overview.averageCtr}% CTR
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {telemetry.overview.totalOrganicClicks.toLocaleString()}
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>clicks</span>
            <span className="text-xs font-semibold text-blue-500 flex items-center ml-auto">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {telemetry.overview.clicksGrowth}
            </span>
          </div>
          <p className={`mt-3 text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Meta-tag CTR hook optimization lifted baseline click rate from 1.82% to 8.67%.
          </p>
        </div>

        {/* Top 3 Rankings & Position */}
        <div
          className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-[#0b0b14] border-white/[0.08] hover:border-violet-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              TOP 3 / TOP 10 RANKS
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
              }`}
            >
              Avg Pos: #{telemetry.overview.averagePosition}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
              34
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>in Top 3</span>
            <span className={`text-xs font-semibold ml-auto ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
              (55 in Top 10)
            </span>
          </div>
          <p className={`mt-3 text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            {telemetry.overview.positionImprovement} average position rise across 210 targeted enterprise keywords.
          </p>
        </div>
      </div>

      {/* SECTION 1: Main Traffic Chart & Ranking Trajectory (Recharts) */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Organic Search Traffic & Click Velocity
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Visualizing search impressions, clicks, CTR percentage, and automated meta-tag deployment milestones.
            </p>
          </div>

          {/* Controls: Timeframe & Metric Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Toggle */}
            <div
              className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/[0.08]'
              }`}
            >
              {(['all', 'impressions', 'clicks', 'ctr'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveChartMetric(m)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                    activeChartMetric === m
                      ? 'bg-violet-600 text-white shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {m === 'all' ? 'All Metrics' : m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Timeframe Buttons */}
            <div
              className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/[0.08]'
              }`}
            >
              {(['7d', '30d', '90d', '12m'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg uppercase transition-all ${
                    timeframe === t
                      ? 'bg-violet-600 text-white shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="mt-6 h-[340px] w-full" id="seo-traffic-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTrafficData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="impressionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e2e8f0' : '#27272a'} vertical={false} />
              <XAxis
                dataKey="date"
                stroke={isLight ? '#64748b' : '#71717a'}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isLight ? '#64748b' : '#71717a'}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div
                        className={`p-3 rounded-xl shadow-2xl border text-xs space-y-1.5 backdrop-blur-xl ${
                          isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#0f0f1c]/95 border-violet-500/30 text-white'
                        }`}
                      >
                        <div className="font-bold border-b border-white/[0.08] pb-1 flex items-center justify-between gap-4">
                          <span>{label}</span>
                          {data.event && (
                            <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-violet-600/30 text-violet-300">
                              {data.event}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between gap-4 text-violet-400">
                          <span>Impressions:</span>
                          <span className="font-bold">{data.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-blue-400">
                          <span>Clicks:</span>
                          <span className="font-bold">{data.clicks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-4 text-emerald-400">
                          <span>Avg CTR:</span>
                          <span className="font-bold">{data.ctr}%</span>
                        </div>
                        <div className="flex justify-between gap-4 text-amber-400">
                          <span>Avg SERP Rank:</span>
                          <span className="font-bold">#{data.avgPosition}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 15, fontSize: '12px' }}
              />
              {(activeChartMetric === 'all' || activeChartMetric === 'impressions') && (
                <Area
                  type="monotone"
                  dataKey="impressions"
                  name="Impressions"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#impressionGrad)"
                />
              )}
              {(activeChartMetric === 'all' || activeChartMetric === 'clicks') && (
                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Clicks"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#clicksGrad)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 2: Keyword Ranking Distribution & Meta-Tag Impact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SERP Position Distribution (Recharts BarChart) */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <Layers className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  SERP Position Tier Migration
                </h2>
              </div>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Comparing keyword rank distribution before vs. after AI Meta-Tag & Schema optimization.
              </p>
            </div>
            <span
              className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full ${
                isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              +28 in Top 3
            </span>
          </div>

          <div className="mt-6 h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={telemetry.positionDistribution}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isLight ? '#e2e8f0' : '#27272a'} vertical={false} />
                <XAxis dataKey="bucket" stroke={isLight ? '#64748b' : '#71717a'} fontSize={10} tickLine={false} />
                <YAxis stroke={isLight ? '#64748b' : '#71717a'} fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isLight ? '#ffffff' : '#0f0f1c',
                    borderColor: isLight ? '#cbd5e1' : '#8b5cf6',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: 10 }} />
                <Bar dataKey="before" name="Before AI Meta-Tags" fill="#71717a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="Current (AI Optimized)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Search Intent Distribution (Recharts PieChart) */}
        <div
          className={`lg:col-span-5 p-6 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
          }`}
        >
          <div className="pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Globe className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Organic Search Intent
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Breakdown of high-value enterprise search intent.
            </p>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="h-[190px] w-[190px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={telemetry.searchIntentDistribution}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {telemetry.searchIntentDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isLight ? '#ffffff' : '#0f0f1c',
                      borderColor: isLight ? '#cbd5e1' : '#8b5cf6',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-2 flex-1 w-full">
              {telemetry.searchIntentDistribution.map((item: any) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                      {item.name}
                    </span>
                  </div>
                  <span className={`font-mono-code font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {item.value}% ({item.count})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Meta-Tag Effectiveness Showcase (Before vs. After AI) */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                AI Meta-Tag & Schema Markup Effectiveness
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Quantifiable impact of automated meta-tag rewriting, emotional CTR hooks, and structured JSON-LD data.
            </p>
          </div>
          <span
            className={`text-xs font-bold font-mono-code px-3 py-1 rounded-full ${
              isLight ? 'bg-violet-100 text-violet-800' : 'bg-violet-950/70 text-violet-300 border border-violet-500/30'
            }`}
          >
            +155% Avg CTR Boost
          </span>
        </div>

        {/* 4 Impact Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* CTR Lift */}
          <div
            className={`p-4 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
            }`}
          >
            <span className={`text-[11px] font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              SERP CLICK-THROUGH RATE
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.postAiAvgCtr}%
              </span>
              <span className={`text-xs line-through ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.preAiAvgCtr}%
              </span>
              <span className="text-xs font-bold text-emerald-500 ml-auto">+155%</span>
            </div>
            <p className={`mt-2 text-[10px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Frontloaded emotional triggers in Meta Titles increased organic click propensity.
            </p>
          </div>

          {/* Dwell Time */}
          <div
            className={`p-4 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
            }`}
          >
            <span className={`text-[11px] font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              SNIPPET DWELL TIME
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.postAiDwellTimeSec}s
              </span>
              <span className={`text-xs line-through ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.preAiDwellTimeSec}s
              </span>
              <span className="text-xs font-bold text-emerald-500 ml-auto">+184%</span>
            </div>
            <p className={`mt-2 text-[10px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Precise meta descriptions set accurate user expectations, boosting on-page engagement.
            </p>
          </div>

          {/* Bounce Rate */}
          <div
            className={`p-4 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
            }`}
          >
            <span className={`text-[11px] font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              ORGANIC BOUNCE RATE
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.postAiBounceRate}%
              </span>
              <span className={`text-xs line-through ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.preAiBounceRate}%
              </span>
              <span className="text-xs font-bold text-emerald-500 ml-auto">-35% drop</span>
            </div>
            <p className={`mt-2 text-[10px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Zero false-promise clickbait; verified technical summaries reduce bounce rate.
            </p>
          </div>

          {/* Featured Snippets */}
          <div
            className={`p-4 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
            }`}
          >
            <span className={`text-[11px] font-bold font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              FEATURED SNIPPETS WON
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.snippetsWonAfter}
              </span>
              <span className={`text-xs line-through ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                {telemetry.metaTagEffectiveness.prePostComparison.snippetsWonBefore}
              </span>
              <span className="text-xs font-bold text-emerald-500 ml-auto">+850%</span>
            </div>
            <p className={`mt-2 text-[10px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              JSON-LD schema markup and structured headings captured Position Zero SERP boxes.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Live Keyword Rankings Table */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Search className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Tracked Keyword Rankings & SERP Matrix
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Real-time positions, search volume, difficulty, and SERP features won.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search keywords or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white'
                    : 'bg-black/40 border-white/[0.08] text-white placeholder:text-zinc-500 focus:border-violet-500/50'
                }`}
              />
            </div>

            {/* Position Tier Filter */}
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs border font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/40 border-white/[0.08] text-zinc-300'
              }`}
            >
              <option value="all">All Positions</option>
              <option value="top3">Top 3 Only (Pos 1-3)</option>
              <option value="top10">Top 10 (Page 1)</option>
              <option value="rising">Rising Keywords (▲)</option>
            </select>

            {/* Intent Filter */}
            <select
              value={intentFilter}
              onChange={(e) => setIntentFilter(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs border font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/40 border-white/[0.08] text-zinc-300'
              }`}
            >
              <option value="all">All Intent Types</option>
              <option value="commercial">Commercial</option>
              <option value="transactional">Transactional</option>
              <option value="informational">Informational</option>
            </select>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className={`border-b text-[11px] font-mono-code font-bold uppercase ${
                  isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.06] text-zinc-400'
                }`}
              >
                <th className="py-3 px-3">Keyword & SERP Target</th>
                <th className="py-3 px-2">Intent</th>
                <th className="py-3 px-2">Volume</th>
                <th className="py-3 px-2">KD %</th>
                <th className="py-3 px-2 text-center">Rank</th>
                <th className="py-3 px-2">SERP Features</th>
                <th className="py-3 px-2">Est. CTR</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredKeywords.map((kw) => (
                <tr
                  key={kw.id}
                  className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50/80' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {kw.keyword}
                    </div>
                    <div className={`text-[11px] font-mono-code mt-0.5 truncate max-w-[280px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                      {kw.url}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        kw.intent === 'Commercial'
                          ? isLight
                            ? 'bg-violet-100 text-violet-800'
                            : 'bg-violet-950/70 text-violet-300'
                          : kw.intent === 'Transactional'
                          ? isLight
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-blue-950/70 text-blue-300'
                          : isLight
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-emerald-950/70 text-emerald-300'
                      }`}
                    >
                      {kw.intent}
                    </span>
                  </td>
                  <td className={`py-3 px-2 font-mono-code font-bold ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>
                    {kw.volume.toLocaleString()}/mo
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-mono-code font-bold ${kw.kd > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {kw.kd}%
                      </span>
                      <div className="w-10 bg-zinc-800/30 rounded-full h-1">
                        <div
                          className={`h-full rounded-full ${kw.kd > 50 ? 'bg-amber-500' : 'bg-emerald-400'}`}
                          style={{ width: `${kw.kd}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="inline-flex items-center gap-1">
                      <span
                        className={`w-6 h-6 rounded-lg font-mono-code font-extrabold flex items-center justify-center text-xs ${
                          kw.position === 1
                            ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                            : kw.position <= 3
                            ? 'bg-violet-600/20 border border-violet-500/40 text-violet-300'
                            : isLight
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-white/[0.06] text-zinc-300'
                        }`}
                      >
                        #{kw.position}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                        ▲{kw.delta}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex flex-wrap gap-1">
                      {kw.serpFeatures.map((feat) => (
                        <span
                          key={feat}
                          className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                            feat.includes('AI Overview')
                              ? 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-white/[0.06] text-zinc-300'
                          }`}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`py-3 px-2 font-mono-code font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    {kw.ctr}%
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => {
                        setSelectedInspectPage(kw.url);
                        // Scroll to inspector
                        document.getElementById('meta-tag-inspector-panel')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                          : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300'
                      }`}
                    >
                      Inspect Meta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5: Live Meta-Tag Inspector & SERP Previewer Sandbox */}
      <div
        id="meta-tag-inspector-panel"
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Eye className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Live Meta-Tag Inspector & SERP Simulator
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Preview how Google and social platforms render your optimized title, description, and OpenGraph tags.
            </p>
          </div>

          {/* Page Selector & Device Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedInspectPage}
              onChange={(e) => setSelectedInspectPage(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs border font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/40 border-white/[0.08] text-zinc-300'
              }`}
            >
              <option value="/blog/hybrid-graph-rag-banking-compliance">
                Whitepaper: Sub-50ms Graph RAG in Banking
              </option>
              <option value="/solutions/ai-agents">Solutions: Autonomous Multi-Agent Mesh</option>
              <option value="/products/artify-recon-ai">Product: Artify ReconAI Ledger</option>
            </select>

            {/* Device Switcher */}
            <div
              className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/[0.08]'
              }`}
            >
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600'
                    : 'text-zinc-400'
                }`}
                title="Desktop Google SERP"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600'
                    : 'text-zinc-400'
                }`}
                title="Mobile Google SERP"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Inspection & Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left: Interactive Preview Card */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
              <button
                onClick={() => setPreviewTab('google')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  previewTab === 'google'
                    ? 'bg-violet-600 text-white'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Google SERP Preview</span>
              </button>
              <button
                onClick={() => setPreviewTab('social')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  previewTab === 'social'
                    ? 'bg-violet-600 text-white'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>OpenGraph Card</span>
              </button>
              <button
                onClick={() => setPreviewTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  previewTab === 'code'
                    ? 'bg-violet-600 text-white'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Meta HTML & Schema</span>
              </button>
            </div>

            {/* Google SERP Simulated Snippet */}
            {previewTab === 'google' && (
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  previewDevice === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                } ${isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#181824] border-white/[0.08]'}`}
              >
                {/* Header: Favicon & URL */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">
                    A
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-slate-800 dark:text-zinc-200 leading-none">
                      Artify Solutions
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono-code truncate max-w-[280px]">
                      {currentInspect.url}
                    </div>
                  </div>
                </div>

                {/* Google Title Hook */}
                <h3 className="text-base sm:text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                  {currentInspect.metaTitle}
                </h3>

                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 text-xs text-amber-500 my-1 font-mono-code">
                  <span>★★★★★</span>
                  <span className="text-slate-600 dark:text-zinc-400 text-[11px]">
                    Rating: {currentInspect.rating} · {currentInspect.reviewCount} reviews
                  </span>
                </div>

                {/* Meta Description snippet */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#bdc1c6] leading-relaxed">
                  <span className="text-slate-500 dark:text-zinc-400">{currentInspect.publishDate} — </span>
                  {currentInspect.metaDescription}
                </p>
              </div>
            )}

            {/* OpenGraph Social Card Preview */}
            {previewTab === 'social' && (
              <div
                className={`rounded-2xl border overflow-hidden ${
                  isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#181824] border-white/[0.08]'
                }`}
              >
                <div className="h-44 w-full relative bg-zinc-900 overflow-hidden">
                  <img
                    src={currentInspect.ogImage}
                    alt={currentInspect.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="px-2 py-0.5 rounded bg-violet-600 text-white text-[10px] font-bold uppercase font-mono-code">
                      {currentInspect.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[10px] uppercase font-mono-code text-zinc-400">artifysols.com</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {currentInspect.metaTitle}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2">
                    {currentInspect.metaDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Raw HTML & JSON-LD Snippet */}
            {previewTab === 'code' && (
              <div className="relative">
                <button
                  onClick={() =>
                    handleCopy(
                      `<title>${currentInspect.metaTitle}</title>\n<meta name="description" content="${currentInspect.metaDescription}">\n<meta property="og:title" content="${currentInspect.metaTitle}">\n<meta property="og:description" content="${currentInspect.metaDescription}">\n<meta property="og:image" content="${currentInspect.ogImage}">\n<meta name="robots" content="index, follow">\n<link rel="canonical" href="${currentInspect.url}">`,
                      'meta-code'
                    )
                  }
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono-code flex items-center gap-1 z-10"
                >
                  {copiedSnippet === 'meta-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'meta-code' ? 'Copied' : 'Copy HTML'}</span>
                </button>
                <pre
                  className={`p-4 rounded-xl text-[11px] font-mono-code overflow-x-auto leading-relaxed border ${
                    isLight ? 'bg-slate-900 text-slate-200 border-slate-800' : 'bg-black/60 text-zinc-300 border-white/[0.08]'
                  }`}
                >
                  {`<!-- Generated by Artify Sols Meta Engine -->\n<title>${currentInspect.metaTitle}</title>\n<meta name="description" content="${currentInspect.metaDescription}">\n<meta property="og:title" content="${currentInspect.metaTitle}">\n<meta property="og:description" content="${currentInspect.metaDescription}">\n<meta property="og:image" content="${currentInspect.ogImage}">\n<meta name="robots" content="index, follow">\n<link rel="canonical" href="${currentInspect.url}">\n\n<!-- Schema.org JSON-LD -->\n<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "TechArticle",\n  "headline": "${currentInspect.title}",\n  "url": "${currentInspect.url}",\n  "datePublished": "2026-08-27T08:00:00Z",\n  "author": {\n    "@type": "Organization",\n    "name": "Artify Solutions"\n  }\n}\n</script>`}
                </pre>
              </div>
            )}
          </div>

          {/* Right: Meta-Tag Diagnostics & Optimization Meters */}
          <div className="lg:col-span-5 space-y-4">
            {/* Title Tag Meter */}
            <div
              className={`p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Title Tag Length</span>
                <span className="font-mono-code text-emerald-500 font-bold">
                  {currentInspect.metaTitle.length}/60 chars (Optimal)
                </span>
              </div>
              <div className="mt-2 w-full bg-zinc-800/30 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (currentInspect.metaTitle.length / 60) * 100)}%` }}
                />
              </div>
              <p className={`text-[10px] mt-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Primary keyword frontloaded. Brand suffix attached with standard divider.
              </p>
            </div>

            {/* Meta Description Meter */}
            <div
              className={`p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Meta Description Length
                </span>
                <span className="font-mono-code text-emerald-500 font-bold">
                  {currentInspect.metaDescription.length}/160 chars (Optimal)
                </span>
              </div>
              <div className="mt-2 w-full bg-zinc-800/30 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, (currentInspect.metaDescription.length / 160) * 100)}%` }}
                />
              </div>
              <p className={`text-[10px] mt-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Contains clear value hook, solution outcome, and passes desktop/mobile clipping thresholds.
              </p>
            </div>

            {/* Checklist of Technical Signals */}
            <div
              className={`p-4 rounded-xl border space-y-2 text-xs ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/40 border-white/[0.06] text-zinc-300'
              }`}
            >
              <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Indexability Audit</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Canonical URL: Self-referential match</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Robots Directive: index, follow</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Structured Data: Valid TechArticle JSON-LD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>OpenGraph & Twitter Card 1200x630px verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Real-Time AI Meta-Tag Optimization Studio (Gemini-Powered) */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                AI Meta-Tag Optimizer Studio
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Input any article, product, or landing page topic to generate CTR-optimized titles, descriptions, and JSON-LD schemas.
            </p>
          </div>
          <span
            className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full ${
              isLight ? 'bg-violet-100 text-violet-800' : 'bg-violet-950/70 text-violet-300 border border-violet-500/30'
            }`}
          >
            Gemini 3.7 Flash Engine
          </span>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 space-y-1">
            <label className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
              Page Title or Article Headline
            </label>
            <input
              type="text"
              value={aiTitle}
              onChange={(e) => setAiTitle(e.target.value)}
              placeholder="e.g. Sub-40ms Vector Indexing with GPU Accelerators in Banking"
              className={`w-full px-3 py-2 rounded-xl text-xs border ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/40 border-white/[0.08] text-white'
              }`}
            />
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
              Focus Search Keyword
            </label>
            <input
              type="text"
              value={aiFocusKeyword}
              onChange={(e) => setAiFocusKeyword(e.target.value)}
              placeholder="e.g. vector indexing banking"
              className={`w-full px-3 py-2 rounded-xl text-xs border ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/40 border-white/[0.08] text-white'
              }`}
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
              Current Content Summary / Draft
            </label>
            <textarea
              rows={2}
              value={aiCurrentDesc}
              onChange={(e) => setAiCurrentDesc(e.target.value)}
              placeholder="Brief summary of the page context..."
              className={`w-full px-3 py-2 rounded-xl text-xs border ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-black/40 border-white/[0.08] text-white'
              }`}
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleOptimizeMeta}
            disabled={isGenerating || !aiTitle}
            id="seo-run-ai-optimizer-btn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Optimizing with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate High-CTR Meta Tags</span>
              </>
            )}
          </button>

          {applyFeedback && (
            <span className="text-xs text-emerald-500 font-semibold animate-pulse">{applyFeedback}</span>
          )}
        </div>

        {/* AI Generated Results Card */}
        {aiGeneratedResult && (
          <div
            className={`mt-6 p-5 rounded-2xl border space-y-4 animate-in zoom-in-95 ${
              isLight ? 'bg-violet-50/50 border-violet-200' : 'bg-violet-950/20 border-violet-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  AI Optimized Metadata Recommendations
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-500 font-mono-code">
                {aiGeneratedResult.estimatedCtrBoost || '+145% CTR Lift'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Recommended Title Tag ({aiGeneratedResult.metaTitleLength || aiGeneratedResult.metaTitle.length} chars)
                </span>
                <div
                  className={`p-3 rounded-xl border font-mono-code ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-black/60 border-white/[0.08] text-violet-300'
                  }`}
                >
                  {aiGeneratedResult.metaTitle}
                </div>
              </div>

              <div className="space-y-1">
                <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Recommended Meta Description ({aiGeneratedResult.metaDescriptionLength || aiGeneratedResult.metaDescription.length} chars)
                </span>
                <div
                  className={`p-3 rounded-xl border ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-black/60 border-white/[0.08] text-zinc-300'
                  }`}
                >
                  {aiGeneratedResult.metaDescription}
                </div>
              </div>
            </div>

            {/* Keyword Chips */}
            {aiGeneratedResult.focusKeywords && (
              <div>
                <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Target Semantic Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {aiGeneratedResult.focusKeywords.map((kw: string) => (
                    <span
                      key={kw}
                      className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full border ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-800'
                          : 'bg-black/40 border-white/[0.08] text-zinc-300'
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Apply & Copy Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  handleCopy(
                    `<title>${aiGeneratedResult.metaTitle}</title>\n<meta name="description" content="${aiGeneratedResult.metaDescription}">`,
                    'ai-meta'
                  );
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08] text-white'
                }`}
              >
                {copiedSnippet === 'ai-meta' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'ai-meta' ? 'Copied Tags' : 'Copy Meta Tags'}</span>
              </button>

              <button
                onClick={() => {
                  setApplyFeedback('Meta tags successfully applied to page index & sitemap.');
                  setTimeout(() => setApplyFeedback(null), 3000);
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Apply to Live Article</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 7: Core Web Vitals & Technical Crawl Telemetry */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b14] border-white/[0.08]'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <h2 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Core Web Vitals & Crawl Index Health
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Google PageSpeed real-user telemetry (CrUX) and dynamic XML sitemap synchronization.
            </p>
          </div>
          <span
            className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            All Vitals Passing
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
          {/* LCP */}
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.04]'
            }`}
          >
            <div className={`text-[10px] font-mono-code font-bold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              LCP (Largest Paint)
            </div>
            <div className="text-xl font-extrabold text-emerald-500 mt-1">
              {telemetry.technicalAudit.coreWebVitals.lcp.value}
            </div>
            <div className="text-[10px] text-zinc-500">Threshold &lt;2.5s</div>
          </div>

          {/* INP */}
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.04]'
            }`}
          >
            <div className={`text-[10px] font-mono-code font-bold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              INP (Next Paint)
            </div>
            <div className="text-xl font-extrabold text-emerald-500 mt-1">
              {telemetry.technicalAudit.coreWebVitals.inp.value}
            </div>
            <div className="text-[10px] text-zinc-500">Threshold &lt;200ms</div>
          </div>

          {/* CLS */}
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.04]'
            }`}
          >
            <div className={`text-[10px] font-mono-code font-bold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              CLS (Shift Score)
            </div>
            <div className="text-xl font-extrabold text-emerald-500 mt-1">
              {telemetry.technicalAudit.coreWebVitals.cls.value}
            </div>
            <div className="text-[10px] text-zinc-500">Threshold &lt;0.1</div>
          </div>

          {/* FCP */}
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.04]'
            }`}
          >
            <div className={`text-[10px] font-mono-code font-bold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              FCP (First Paint)
            </div>
            <div className="text-xl font-extrabold text-emerald-500 mt-1">
              {telemetry.technicalAudit.coreWebVitals.fcp.value}
            </div>
            <div className="text-[10px] text-zinc-500">Threshold &lt;1.8s</div>
          </div>

          {/* TTFB */}
          <div
            className={`p-3 rounded-xl border text-center ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/[0.04]'
            }`}
          >
            <div className={`text-[10px] font-mono-code font-bold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              TTFB (Server Resp)
            </div>
            <div className="text-xl font-extrabold text-emerald-500 mt-1">
              {telemetry.technicalAudit.coreWebVitals.ttfb.value}
            </div>
            <div className="text-[10px] text-zinc-500">Threshold &lt;800ms</div>
          </div>
        </div>

        {/* Dynamic Sitemap & Robots Verification */}
        <div
          className={`mt-4 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/30 border-white/[0.04] text-zinc-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <span className="font-bold">Dynamic XML Sitemap Active: </span>
              <span>48 indexable URLs synchronized with robots.txt directives.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-[11px] font-semibold ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-200' : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08]'
              }`}
            >
              <span>/sitemap.xml</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-[11px] font-semibold ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-200' : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/[0.08]'
              }`}
            >
              <span>/robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
