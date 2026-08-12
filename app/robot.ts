import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/actions/'], // Keep Google out of private member areas
    },
    sitemap: 'https://srilanka-dunks.vercel.app/sitemap.xml',
  };
}