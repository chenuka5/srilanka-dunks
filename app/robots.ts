
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/login',
        '/signup',
        '/thank-you',
        '/api/',
        '/actions/',
      ],
    },
    sitemap: 'https://srilankadunks.com/sitemap.xml',
  };
}
