/**
 * SEO helpers — per-route meta, OG, sitemap/robots.
 * Used by PageMeta (react-helmet-async) for per-route title, description, OG.
 */

export const siteConfig = {
  name: 'Thrisen',
  description: 'Personal and professional portfolio with interactive split-screen bridge.',
  baseUrl: import.meta.env.VITE_BASE_URL ?? 'https://thrisen.example.com',
  defaultOgImage: '/globe.svg',
} as const;

export type RouteMeta = {
  title: string;
  description: string;
  ogImage?: string;
  path: string;
};

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Thrisen — Choose your path',
    description: 'Explore the personal or professional side. Start your journey.',
    path: '/',
  },
  '/personal': {
    title: 'Personal — Thrisen',
    description: 'Blog, health journey, and social.',
    path: '/personal',
  },
  '/professional': {
    title: 'Professional — Thrisen',
    description: 'About, skills, projects, and contact.',
    path: '/professional',
  },
};

export function getCanonicalUrl(path: string): string {
  const base = siteConfig.baseUrl.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function getOgImageUrl(relativePath?: string): string {
  const path = relativePath ?? siteConfig.defaultOgImage;
  return path.startsWith('http') ? path : `${siteConfig.baseUrl}${path}`;
}

/** Optional JSON-LD for WebSite on home (Phase 4.4). */
export function getWebSiteJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
  });
}
