import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/labs/*/api/'],
    },
    sitemap: 'https://astalabs.yusrilastaghina.my.id/sitemap.xml',
  };
}
