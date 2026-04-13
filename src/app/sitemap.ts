import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://astalabs.yusrilastaghina.my.id';

  // Core Static SEO routes
  const routes = [
    '',
    '/challenges',
    '/academy',
    '/scoreboard',
    '/boxground',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Boxground specific
  const boxes = ['/boxground/astacorp', '/boxground/crypto-vault'].map((box) => ({
    url: `${baseUrl}${box}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Public challenges/labs that are static/known
  const labs = [
    '/labs/mata-batin',
    '/labs/bocor-halus',
    '/labs/caesar-cipher',
    '/labs/stegano-exif',
    '/labs/sqli-login',
    '/labs/cmd-ping',
    '/labs/ssrf-fetch',
  ].map((lab) => ({
    url: `${baseUrl}${lab}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...boxes, ...labs];
}
