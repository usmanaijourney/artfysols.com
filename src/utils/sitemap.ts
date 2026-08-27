import { INITIAL_BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogData';
import { AI_PRODUCTS, AI_PRODUCT_CATEGORIES } from '../data/aiProductsData';
import { BlogPost, AiProductItem } from '../types';

export const DEFAULT_BASE_URL = 'https://artifysols.com';

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  type: 'core' | 'product' | 'article' | 'category' | 'portal';
  title?: string;
  category?: string;
  image?: {
    loc: string;
    title?: string;
    caption?: string;
  };
}

/**
 * Normalizes an ISO date string to YYYY-MM-DD for standard sitemap compliance.
 */
export function formatSitemapDate(dateInput?: string | number | Date): string {
  if (!dateInput) {
    return new Date().toISOString().split('T')[0];
  }
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toISOString().split('T')[0];
    }
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Escapes XML special characters.
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Compiles a full structured list of all canonical URL entries across the Artify Solutions platform.
 * Automatically synchronizes with all blog posts, product catalog items, and enterprise category hubs.
 */
export function getSitemapUrlList(
  customBaseUrl?: string,
  options?: {
    customBlogPosts?: BlogPost[];
    customProducts?: AiProductItem[];
  }
): SitemapUrlEntry[] {
  const baseUrl = (customBaseUrl || (typeof window !== 'undefined' ? window.location.origin : DEFAULT_BASE_URL)).replace(/\/+$/, '');
  const blogPosts = options?.customBlogPosts || INITIAL_BLOG_POSTS;
  const products = options?.customProducts || AI_PRODUCTS;
  const currentDate = formatSitemapDate();

  const entries: SitemapUrlEntry[] = [];

  // 1. Core Top-Level Landing Pages (Priority 1.0 - 0.9)
  entries.push(
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0,
      type: 'core',
      title: 'Artify Solutions | AI-Native Enterprise Software & Autonomous Systems',
      image: {
        loc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=85',
        title: 'Artify Solutions Enterprise AI Platform',
        caption: 'Autonomous agent swarms, hybrid vector RAG, and custom enterprise AI engineering.',
      },
    },
    {
      loc: `${baseUrl}/ai-solutions`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.95,
      type: 'core',
      title: 'AI Solutions Suite & Autonomous Agent Catalog',
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9,
      type: 'core',
      title: 'Intelligence Feed & Enterprise AI Engineering Research',
    },
    {
      loc: `${baseUrl}/case-studies`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.85,
      type: 'core',
      title: 'Enterprise Case Studies & Digital Transformation Proofs',
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.85,
      type: 'core',
      title: 'AI Architecture & Custom Engineering Services',
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      type: 'core',
      title: 'About Artify Solutions | AI Architects & Mission',
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      type: 'core',
      title: 'Request AI Project Brief & Architect Consultation',
    },
    {
      loc: `${baseUrl}/portal`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
      type: 'portal',
      title: 'Client Collaboration Portal & Telemetry Hub',
    }
  );

  // 2. Dynamic AI Products Detail Routes (Priority 0.9)
  products.forEach((product) => {
    const productCover =
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=85';

    entries.push({
      loc: `${baseUrl}/ai-solutions/${product.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9,
      type: 'product',
      title: `${product.name} - ${product.tagline}`,
      category: product.categoryLabel,
      image: {
        loc: productCover,
        title: product.name,
        caption: product.shortDescription,
      },
    });
  });

  // 3. Dynamic Blog Post Detail Routes (Priority 0.85)
  blogPosts.forEach((post) => {
    // Only index published posts in public sitemap
    if (post.status !== 'draft') {
      const lastModDate = formatSitemapDate(post.lastModified || post.publishDate);
      const postImage = post.coverImage || post.seo?.ogImage;

      entries.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: 0.85,
        type: 'article',
        title: post.title,
        category: post.category,
        image: postImage
          ? {
              loc: postImage,
              title: post.title,
              caption: post.excerpt,
            }
          : undefined,
      });
    }
  });

  // 4. Product Category Hubs (Priority 0.75)
  AI_PRODUCT_CATEGORIES.forEach((cat) => {
    if (cat.id !== 'all') {
      entries.push({
        loc: `${baseUrl}/ai-solutions?category=${encodeURIComponent(cat.id)}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.75,
        type: 'category',
        title: `${cat.label} AI Products`,
        category: cat.label,
      });
    }
  });

  // 5. Blog Category Hubs (Priority 0.75)
  BLOG_CATEGORIES.forEach((cat) => {
    if (cat !== 'All') {
      entries.push({
        loc: `${baseUrl}/blog?category=${encodeURIComponent(cat)}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.75,
        type: 'category',
        title: `${cat} Research Articles`,
        category: cat,
      });
    }
  });

  return entries;
}

/**
 * Generates standards-compliant XML Sitemap string for Google, Bing, Yandex, DuckDuckGo.
 * Includes Image sitemap extensions (<image:image>) for rich image search indexing.
 */
export function generateSitemapXml(
  customBaseUrl?: string,
  options?: {
    customBlogPosts?: BlogPost[];
    customProducts?: AiProductItem[];
  }
): string {
  const entries = getSitemapUrlList(customBaseUrl, options);

  const xmlUrls = entries
    .map((entry) => {
      let imageXml = '';
      if (entry.image?.loc) {
        imageXml = `
    <image:image>
      <image:loc>${escapeXml(entry.image.loc)}</image:loc>${
          entry.image.title ? `\n      <image:title>${escapeXml(entry.image.title)}</image:title>` : ''
        }${
          entry.image.caption ? `\n      <image:caption>${escapeXml(entry.image.caption)}</image:caption>` : ''
        }
    </image:image>`;
      }

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${
        entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''
      }${
        entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : ''
      }${
        entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(2)}</priority>` : ''
      }${imageXml}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>`;
}

/**
 * Generates robots.txt content referencing the dynamic XML sitemap.
 */
export function generateRobotsTxt(customBaseUrl?: string): string {
  const baseUrl = (customBaseUrl || (typeof window !== 'undefined' ? window.location.origin : DEFAULT_BASE_URL)).replace(/\/+$/, '');

  return `# Robots.txt for Artify Solutions (artifysols.com)
User-agent: *
Allow: /
Disallow: /api/
Disallow: /portal/admin/

# Search Engine Sitemap Index
Sitemap: ${baseUrl}/sitemap.xml
`;
}
