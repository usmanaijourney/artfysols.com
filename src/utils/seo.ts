import { useEffect } from 'react';
import { BlogPost, AiProductItem } from '../types';

export interface SeoProductDetails {
  brand?: string;
  category?: string;
  availability?: 'InStock' | 'PreOrder' | 'OnlineOnly' | string;
  price?: string | number;
  currency?: string;
  rating?: number;
  ratingCount?: number;
  sku?: string;
  uptime?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[] | string;
  canonicalUrl?: string;
  author?: string;
  robots?: string;
  
  // Open Graph / Facebook / LinkedIn / Discord / Slack
  ogType?: 'website' | 'article' | 'product' | 'profile';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;

  // Article Specific (for Open Graph)
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];

  // Product Specific (for Open Graph & Rich Snippets)
  product?: SeoProductDetails;

  // Twitter Cards
  twitterCard?: 'summary_large_image' | 'summary' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;

  // Structured Data (Schema.org JSON-LD)
  jsonLd?: Record<string, any> | Array<Record<string, any>> | string;
  jsonLdId?: string;
}

const DEFAULT_BASE_URL = 'https://artifysols.com';
const DEFAULT_SITE_NAME = 'Artify Solutions';
const DEFAULT_TWITTER_HANDLE = '@artifysols';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=85';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

// Category-to-search-intent keyword mapping dictionaries for enterprise discovery
const CATEGORY_SEARCH_INTENT_MAP: Record<string, string[]> = {
  // Blog Post Categories
  'Multi-Agent Systems': [
    'autonomous agent orchestration',
    'multi-agent swarms architecture',
    'deterministic agent coordination',
    'AI agent fleet deployment',
    'agentic workflow automation',
    'LLM agent memory systems',
    'sandboxed tool execution',
  ],
  'Enterprise Architecture': [
    'enterprise AI architecture',
    'VPC isolated AI deployment',
    'zero data retention AI',
    'private enterprise LLM',
    'SOC2 compliant AI infrastructure',
    'microservices AI middleware',
    'hybrid cloud AI models',
  ],
  'Autonomous Finance': [
    'autonomous ledger reconciliation',
    'AI financial close automation',
    'continuous invoice OCR audit',
    'deterministic cash flow prediction',
    'ERP AI connectors NetSuite SAP',
    'sub-penny audit trail algorithms',
  ],
  'RAG & Knowledge Graphs': [
    'enterprise vector RAG governance',
    'hybrid graph RAG retrieval',
    'chunking strategies for enterprise docs',
    'sub-50ms vector search',
    'semantic document indexing',
    'hallucination prevention guardrails',
  ],
  'Business Case Studies': [
    'enterprise AI ROI case study',
    'business process automation metrics',
    'operational overhead reduction AI',
    'digital transformation AI roadmap',
    'custom enterprise software deployment',
  ],
  'Compliance & Governance': [
    'AI governance frameworks',
    'deterministic AI auditing',
    'EU AI Act compliance architecture',
    'enterprise model observability',
    'privacy-preserving machine learning',
  ],

  // Product Categories
  'Autonomous Agents': [
    'autonomous agent workforce',
    'self-directing AI task workers',
    'agent swarm management platform',
    'multi-agent decision engines',
    'autonomous business logic execution',
  ],
  'Intelligent Automation': [
    'intelligent process automation IPA',
    'self-healing enterprise workflows',
    'autonomous error recovery pipelines',
    'ERP API orchestration bots',
    'no-code AI workflow orchestrator',
  ],
  'Enterprise RAG & Data': [
    'private enterprise RAG engine',
    'zero-leakage document AI',
    'conversational enterprise knowledge base',
    'multi-modal vector search system',
    'proprietary document intelligence',
  ],
  'Industry AI Systems': [
    'vertical industry AI software',
    'bespoke enterprise AI models',
    'domain-specific autonomous agents',
    'custom AI ERP integrations',
    'high-compliance industry AI',
  ],
  'Conversational Intelligence': [
    'action-capable conversational AI',
    'enterprise AI support concierge',
    'conversational business intelligence BI',
    'voice daily field logs AI',
    'natural language database query',
  ],
};

const CORE_PLATFORM_KEYWORDS = [
  'Artify Solutions',
  'Enterprise AI Systems',
  'Autonomous Agent Fleets',
  'Deterministic AI Automation',
  'Custom AI Software Engineering',
];

export interface KeywordGeneratorOptions {
  category?: string;
  tags?: string[];
  title?: string;
  description?: string;
  industry?: string;
  type?: 'product' | 'article' | 'page' | 'category';
  features?: Array<{ title: string; description?: string } | string>;
  connectedSystems?: string[];
  customKeywords?: string[];
  maxKeywords?: number;
}

/**
 * Clean and normalize a keyword candidate (lowercase, trimmed, punctuation filtered)
 */
function cleanKeywordCandidate(term: string): string {
  return term
    .replace(/[^\w\s\-\.]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Intelligent Dynamic Meta-Keyword Generator Utility.
 * Auto-populates high-intent search terms based on product tags, blog categories,
 * industry terminology, connected integrations, and long-tail combinations.
 */
export function generateDynamicKeywords(options: KeywordGeneratorOptions): string[] {
  const {
    category,
    tags = [],
    title,
    description,
    industry,
    type = 'article',
    features = [],
    connectedSystems = [],
    customKeywords = [],
    maxKeywords = 18,
  } = options;

  const keywordPool: string[] = [];

  // 1. Add Custom Explicit Keywords
  if (customKeywords && customKeywords.length > 0) {
    keywordPool.push(...customKeywords);
  }

  // 2. Add Direct Tags
  tags.forEach((tag) => {
    if (tag && tag.trim()) {
      keywordPool.push(tag.trim());
      // Generate Long-Tail variant: e.g. "multi-agent systems" -> "enterprise multi-agent systems"
      if (!tag.toLowerCase().includes('enterprise') && !tag.toLowerCase().includes('ai')) {
        keywordPool.push(`Enterprise ${tag.trim()}`);
      }
    }
  });

  // 3. Add Category & Associated High-Intent Search Clusters
  if (category) {
    keywordPool.push(category);
    keywordPool.push(`${category} AI Software`);
    keywordPool.push(`Enterprise ${category}`);

    // Match with Category Intent Map
    const matchedCluster =
      CATEGORY_SEARCH_INTENT_MAP[category] ||
      Object.entries(CATEGORY_SEARCH_INTENT_MAP).find(([key]) =>
        category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())
      )?.[1];

    if (matchedCluster) {
      keywordPool.push(...matchedCluster);
    }
  }

  // 4. Extract Key Concepts from Title
  if (title) {
    const cleanTitle = cleanKeywordCandidate(title);
    keywordPool.push(cleanTitle);

    // If title has a colon/dash, split into distinct sub-phrases
    const subPhrases = title.split(/[:|\-–—]/).map((s) => s.trim()).filter((s) => s.length > 3);
    subPhrases.forEach((phrase) => {
      if (phrase.length < 40) {
        keywordPool.push(phrase);
      }
    });
  }

  // 5. Industry-Specific Discoverability Terms
  if (industry) {
    keywordPool.push(`${industry} AI Automation`);
    keywordPool.push(`Custom AI for ${industry}`);
    keywordPool.push(`Autonomous ${industry} Software`);
  }

  // 6. Connected Systems & Tech Integration Terms
  if (connectedSystems && connectedSystems.length > 0) {
    connectedSystems.forEach((sys) => {
      if (sys) {
        keywordPool.push(`${sys} AI Integration`);
        keywordPool.push(`Autonomous ${sys} Automation`);
      }
    });
  }

  // 7. Extract Feature Concepts (for Products)
  if (features && features.length > 0) {
    features.slice(0, 5).forEach((feat) => {
      const featTitle = typeof feat === 'string' ? feat : feat.title;
      if (featTitle) {
        keywordPool.push(featTitle.trim());
      }
    });
  }

  // 8. Type-Specific Modifiers
  if (type === 'product') {
    keywordPool.push('Enterprise AI Product');
    keywordPool.push('SOC2 Compliant AI Software');
    keywordPool.push('Autonomous Agent Deployment');
  } else if (type === 'article') {
    keywordPool.push('AI Engineering Research');
    keywordPool.push('Enterprise AI Architecture Guide');
    keywordPool.push('Autonomous Systems Best Practices');
  }

  // 9. Core Platform Pillars
  keywordPool.push(...CORE_PLATFORM_KEYWORDS);

  // Deduplicate case-insensitively, filter empty/short terms, and preserve ranking
  const seen = new Set<string>();
  const uniqueKeywords: string[] = [];

  for (const item of keywordPool) {
    if (!item) continue;
    const normalized = cleanKeywordCandidate(item);
    const lower = normalized.toLowerCase();
    
    // Discard single-character or overly trivial terms
    if (lower.length < 3) continue;

    if (!seen.has(lower)) {
      seen.add(lower);
      uniqueKeywords.push(normalized);
    }

    if (uniqueKeywords.length >= maxKeywords) {
      break;
    }
  }

  return uniqueKeywords;
}

/**
 * Generates dynamic meta keywords specifically tuned for a Blog Post.
 */
export function generateBlogPostKeywords(post: BlogPost): string[] {
  return generateDynamicKeywords({
    type: 'article',
    category: post.category,
    tags: post.tags,
    title: post.title,
    description: post.excerpt,
    customKeywords: post.seo?.focusKeywords,
    maxKeywords: 20,
  });
}

/**
 * Generates dynamic meta keywords specifically tuned for an AI Product.
 */
export function generateProductKeywords(product: AiProductItem): string[] {
  const industries = (product.useCases || []).map((u) => u.industry);
  const primaryIndustry = industries[0];

  return generateDynamicKeywords({
    type: 'product',
    category: product.categoryLabel,
    title: `${product.name} ${product.tagline}`,
    description: product.shortDescription,
    features: product.features,
    connectedSystems: product.connectedSystems,
    industry: primaryIndustry,
    tags: [
      product.name,
      product.categoryLabel,
      product.uptime ? `${product.uptime} SLA` : 'Enterprise SLA',
      ...industries,
      ...(product.demoCapabilities || []),
    ],
    maxKeywords: 22,
  });
}

/**
 * Generates dynamic meta keywords for a Category Hub / Feed.
 */
export function generateCategoryKeywords(categoryName: string, kind: 'blog' | 'product' = 'blog'): string[] {
  return generateDynamicKeywords({
    type: kind === 'blog' ? 'article' : 'product',
    category: categoryName,
    title: `${categoryName} Enterprise Solutions & Research`,
    maxKeywords: 16,
  });
}

/**
 * Helper to update or create a <meta> element with name or property.
 */
export function setMetaTag(
  attributeName: 'name' | 'property' | 'http-equiv',
  attributeValue: string,
  content: string | undefined | null
): HTMLMetaElement | null {
  if (typeof document === 'undefined') return null;

  const selector = `meta[${attributeName}="${attributeValue}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (content === undefined || content === null || content.trim() === '') {
    if (element) {
      element.remove();
    }
    return null;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
  return element;
}

/**
 * Helper to update or create the canonical <link rel="canonical" href="...">
 */
export function setCanonicalLink(href: string | undefined | null): HTMLLinkElement | null {
  if (typeof document === 'undefined') return null;

  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!href) {
    if (element) {
      element.remove();
    }
    return null;
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
  return element;
}

/**
 * Helper to inject or update a Schema.org JSON-LD script tag.
 */
export function setJsonLdScript(
  schemaData: Record<string, any> | Array<Record<string, any>> | string | undefined | null,
  scriptId = 'dynamic-seo-jsonld'
): HTMLScriptElement | null {
  if (typeof document === 'undefined') return null;

  let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!schemaData) {
    if (scriptElement) {
      scriptElement.remove();
    }
    return null;
  }

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = scriptId;
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }

  const jsonContent =
    typeof schemaData === 'string' ? schemaData : JSON.stringify(schemaData, null, 2);
  scriptElement.textContent = jsonContent;
  return scriptElement;
}

/**
 * Main utility function to inject and update dynamic meta tags into document <head>.
 * Returns a teardown function that can restore previous tags when navigating away.
 */
export function updatePageSeo(config: SeoConfig): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  // Backup original title
  const originalTitle = document.title;

  // 1. Format & Set Document Title
  const formattedTitle = config.title.includes(DEFAULT_SITE_NAME)
    ? config.title
    : `${config.title} | ${DEFAULT_SITE_NAME} - Enterprise AI Products & Autonomous Systems`;
  document.title = formattedTitle;

  // 2. Canonical URL & Base URL
  const origin = typeof window !== 'undefined' ? window.location.origin : DEFAULT_BASE_URL;
  const canonicalHref = config.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : origin);
  setCanonicalLink(canonicalHref);

  // 3. Standard Search Engine Meta Tags
  setMetaTag('name', 'description', config.description);
  
  const keywordsStr = Array.isArray(config.keywords)
    ? config.keywords.join(', ')
    : config.keywords;
  setMetaTag('name', 'keywords', keywordsStr);
  
  setMetaTag('name', 'author', config.author || DEFAULT_SITE_NAME);
  setMetaTag('name', 'robots', config.robots || DEFAULT_ROBOTS);

  // 4. OpenGraph (Facebook, LinkedIn, Discord, Slack, iMessage)
  const ogTitle = config.ogTitle || formattedTitle;
  const ogDesc = config.ogDescription || config.description;
  const ogType = config.ogType || 'website';
  const ogImage = config.ogImage || DEFAULT_OG_IMAGE;
  const ogUrl = config.ogUrl || canonicalHref;
  const ogSiteName = config.ogSiteName || DEFAULT_SITE_NAME;
  const ogLocale = config.ogLocale || 'en_US';

  setMetaTag('property', 'og:title', ogTitle);
  setMetaTag('property', 'og:description', ogDesc);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:url', ogUrl);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:image:secure_url', ogImage.startsWith('https://') ? ogImage : undefined);
  setMetaTag('property', 'og:image:alt', config.ogImageAlt || ogTitle);
  setMetaTag('property', 'og:image:width', config.ogImageWidth ? String(config.ogImageWidth) : '1200');
  setMetaTag('property', 'og:image:height', config.ogImageHeight ? String(config.ogImageHeight) : '630');
  setMetaTag('property', 'og:site_name', ogSiteName);
  setMetaTag('property', 'og:locale', ogLocale);

  // 5. Article Specific Meta Tags (when ogType === 'article')
  if (ogType === 'article') {
    setMetaTag('property', 'article:published_time', config.publishedTime);
    setMetaTag('property', 'article:modified_time', config.modifiedTime || config.publishedTime);
    setMetaTag('property', 'article:author', config.author || DEFAULT_SITE_NAME);
    setMetaTag('property', 'article:section', config.section);

    // Remove existing article:tag tags before re-adding
    const existingTags = document.querySelectorAll('meta[property="article:tag"]');
    existingTags.forEach((tag) => tag.remove());

    if (config.tags && config.tags.length > 0) {
      config.tags.forEach((tag) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.setAttribute('content', tag);
        document.head.appendChild(meta);
      });
    }
  } else {
    // Clean up article meta tags if switching to non-article
    setMetaTag('property', 'article:published_time', null);
    setMetaTag('property', 'article:modified_time', null);
    setMetaTag('property', 'article:author', null);
    setMetaTag('property', 'article:section', null);
    document.querySelectorAll('meta[property="article:tag"]').forEach((t) => t.remove());
  }

  // 6. Product Specific Meta Tags (when ogType === 'product' or product metadata provided)
  if (config.product) {
    setMetaTag('property', 'product:brand', config.product.brand || DEFAULT_SITE_NAME);
    setMetaTag('property', 'product:category', config.product.category || config.section);
    setMetaTag('property', 'product:availability', config.product.availability || 'InStock');
    if (config.product.price) {
      setMetaTag('property', 'product:price:amount', String(config.product.price));
      setMetaTag('property', 'product:price:currency', config.product.currency || 'USD');
    }
  } else {
    setMetaTag('property', 'product:brand', null);
    setMetaTag('property', 'product:category', null);
    setMetaTag('property', 'product:availability', null);
    setMetaTag('property', 'product:price:amount', null);
    setMetaTag('property', 'product:price:currency', null);
  }

  // 7. Twitter Card Meta Tags
  setMetaTag('name', 'twitter:card', config.twitterCard || 'summary_large_image');
  setMetaTag('name', 'twitter:site', config.twitterSite || DEFAULT_TWITTER_HANDLE);
  setMetaTag('name', 'twitter:creator', config.twitterCreator || config.twitterSite || DEFAULT_TWITTER_HANDLE);
  setMetaTag('name', 'twitter:title', config.twitterTitle || ogTitle);
  setMetaTag('name', 'twitter:description', config.twitterDescription || ogDesc);
  setMetaTag('name', 'twitter:image', config.twitterImage || ogImage);
  setMetaTag('name', 'twitter:image:alt', config.twitterImageAlt || config.ogImageAlt || ogTitle);

  // 8. JSON-LD Structured Data
  const jsonLdId = config.jsonLdId || 'dynamic-seo-jsonld';
  if (config.jsonLd) {
    setJsonLdScript(config.jsonLd, jsonLdId);
  } else {
    setJsonLdScript(null, jsonLdId);
  }

  // Teardown / Cleanup callback
  return () => {
    document.title = originalTitle;
    setJsonLdScript(null, jsonLdId);
  };
}

/**
 * Generates comprehensive SEO config and structured data for an individual Blog Post.
 */
export function generateBlogPostSeo(
  post: BlogPost,
  options?: {
    currentRating?: number;
    ratingCount?: number;
    baseUrl?: string;
  }
): SeoConfig {
  const baseUrl = options?.baseUrl || (typeof window !== 'undefined' ? window.location.origin : DEFAULT_BASE_URL);
  const postUrl = post.seo?.canonicalUrl || `${baseUrl}/blog/${post.slug}`;
  const coverImage = post.coverImage || post.seo?.ogImage || DEFAULT_OG_IMAGE;
  const ratingValue = (options?.currentRating || post.rating || 4.9).toFixed(1);
  const ratingCount = options?.ratingCount || post.ratingCount || 128;
  const publishIso = post.publishDate ? new Date(post.publishDate).toISOString() : new Date().toISOString();
  const modifiedIso = post.lastModified ? new Date(post.lastModified).toISOString() : publishIso;

  const keywordsList = generateBlogPostKeywords(post);

  // Generate Schema.org Graph (BlogPosting/TechArticle + BreadcrumbList + Organization)
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': post.seo?.schemaType || 'TechArticle',
        '@id': `${postUrl}#article`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          name: DEFAULT_SITE_NAME,
          url: baseUrl,
        },
        headline: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        image: {
          '@type': 'ImageObject',
          url: coverImage,
          width: 1200,
          height: 630,
        },
        datePublished: publishIso,
        dateModified: modifiedIso,
        articleSection: post.category,
        keywords: keywordsList.join(', '),
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
          image: post.author.avatar,
          worksFor: {
            '@type': 'Organization',
            name: DEFAULT_SITE_NAME,
            url: baseUrl,
          },
        },
        publisher: {
          '@type': 'Organization',
          name: DEFAULT_SITE_NAME,
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/favicon.svg`,
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ratingValue,
          bestRating: '5.0',
          worstRating: '1.0',
          ratingCount: ratingCount,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Intelligence Feed',
            item: `${baseUrl}#blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: keywordsList,
    canonicalUrl: postUrl,
    author: post.author.name,
    ogType: 'article',
    ogTitle: post.seo?.ogTitle || post.seo?.metaTitle || post.title,
    ogDescription: post.seo?.ogDescription || post.seo?.metaDescription || post.excerpt,
    ogImage: coverImage,
    ogImageAlt: post.title,
    publishedTime: publishIso,
    modifiedTime: modifiedIso,
    section: post.category,
    tags: post.tags,
    twitterCard: post.seo?.twitterCard || 'summary_large_image',
    twitterTitle: post.seo?.metaTitle || post.title,
    twitterDescription: post.seo?.metaDescription || post.excerpt,
    twitterImage: post.seo?.twitterImage || coverImage,
    twitterImageAlt: post.title,
    robots: post.seo?.robotsDirective || DEFAULT_ROBOTS,
    jsonLd: schemaGraph,
    jsonLdId: 'article-jsonld-schema',
  };
}

/**
 * Generates comprehensive SEO config and structured data for an individual Product Detail Page.
 */
export function generateProductSeo(
  product: AiProductItem,
  options?: {
    baseUrl?: string;
  }
): SeoConfig {
  const baseUrl = options?.baseUrl || (typeof window !== 'undefined' ? window.location.origin : DEFAULT_BASE_URL);
  const productUrl = `${baseUrl}/ai-solutions/${product.slug}`;
  const productTitle = `${product.name} - ${product.tagline}`;
  const productDesc = product.longDescription || product.shortDescription;

  // Selected featured image or category-themed enterprise graphic
  const productImage = DEFAULT_OG_IMAGE;

  const keywordsList = generateProductKeywords(product);

  // Generate Schema.org Graph (SoftwareApplication / Product + BreadcrumbList + Organization)
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'Product'],
        '@id': `${productUrl}#software`,
        name: product.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cloud Native, VPC Private, Multi-Tenant Kubernetes',
        description: productDesc,
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: DEFAULT_SITE_NAME,
            url: baseUrl,
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (product.rating || 4.9).toFixed(1),
          ratingCount: 84,
          bestRating: '5.0',
          worstRating: '1.0',
        },
        brand: {
          '@type': 'Brand',
          name: DEFAULT_SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: DEFAULT_SITE_NAME,
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/favicon.svg`,
          },
        },
        featureList: (product.features || []).map((f) => `${f.title}: ${f.description}`).join(' | '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': productUrl,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${productUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Solutions Suite',
            item: `${baseUrl}#ai-solutions`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return {
    title: productTitle,
    description: product.shortDescription,
    keywords: keywordsList,
    canonicalUrl: productUrl,
    author: DEFAULT_SITE_NAME,
    ogType: 'product',
    ogTitle: `${product.name} | Enterprise AI Suite`,
    ogDescription: product.shortDescription,
    ogImage: productImage,
    ogImageAlt: `${product.name} - ${product.tagline}`,
    section: product.categoryLabel,
    tags: keywordsList.slice(0, 8),
    product: {
      brand: DEFAULT_SITE_NAME,
      category: product.categoryLabel,
      availability: 'InStock',
      rating: product.rating || 4.9,
      uptime: product.uptime || '99.99%',
    },
    twitterCard: 'summary_large_image',
    twitterTitle: `${product.name} - ${product.tagline}`,
    twitterDescription: product.shortDescription,
    twitterImage: productImage,
    twitterImageAlt: product.name,
    robots: DEFAULT_ROBOTS,
    jsonLd: schemaGraph,
    jsonLdId: `product-jsonld-${product.slug}`,
  };
}

/**
 * Generates default high-level SEO config for the Artify Solutions platform.
 */
export function generateDefaultPlatformSeo(): SeoConfig {
  return {
    title: 'Artify Solutions | AI-Native Software & Intelligent Automation',
    description: "Artify Solutions builds AI-native software, autonomous agent swarms, business automation and fully customized digital solutions designed around your organization's unique workflows.",
    keywords: [
      'AI software development',
      'AI solutions company',
      'autonomous agents',
      'enterprise AI automation',
      'custom AI systems',
      'deterministic workflows',
      'Artify Solutions',
    ],
    canonicalUrl: DEFAULT_BASE_URL,
    ogType: 'website',
    ogTitle: 'Artify Solutions | Enterprise AI Software & Automation',
    ogDescription: 'Your Business. Reimagined by AI. We engineer intelligent software systems that understand your business, automate processes, and connect your data.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Artify Solutions | Enterprise AI Software & Automation',
    twitterDescription: 'Bespoke AI solutions, autonomous agent orchestration, and enterprise software engineering.',
    twitterImage: DEFAULT_OG_IMAGE,
    robots: DEFAULT_ROBOTS,
  };
}

/**
 * Custom React Hook to declaratively manage dynamic SEO tags.
 */
export function useDynamicSeo(config: SeoConfig | null | undefined): void {
  useEffect(() => {
    if (!config) return;
    const cleanup = updatePageSeo(config);
    return () => {
      cleanup();
    };
  }, [
    config?.title,
    config?.description,
    config?.canonicalUrl,
    config?.ogImage,
    config?.ogType,
    config?.publishedTime,
    config?.modifiedTime,
    JSON.stringify(config?.keywords),
    JSON.stringify(config?.tags),
    JSON.stringify(config?.product),
  ]);
}

/**
 * Custom React Hook for Blog Post pages.
 */
export function useBlogPostSeo(
  post: BlogPost | null | undefined,
  currentRating?: number,
  ratingCount?: number
): void {
  useEffect(() => {
    if (!post) return;
    const config = generateBlogPostSeo(post, { currentRating, ratingCount });
    const cleanup = updatePageSeo(config);
    return () => {
      cleanup();
    };
  }, [post?.id, post?.slug, post?.title, post?.lastModified, currentRating, ratingCount]);
}

/**
 * Custom React Hook for Product Detail pages.
 */
export function useProductSeo(product: AiProductItem | null | undefined): void {
  useEffect(() => {
    if (!product) return;
    const config = generateProductSeo(product);
    const cleanup = updatePageSeo(config);
    return () => {
      cleanup();
    };
  }, [product?.id, product?.slug, product?.name]);
}
