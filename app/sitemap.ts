
import type { MetadataRoute } from 'next';

const baseUrl = 'https://srilankadunks.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    {
      path: '',
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      path: '/about',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/training',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      path: '/camps',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      path: '/camps/upcoming',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/athletes',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      path: '/leaderboard',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      path: '/vertical-jump-test',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      path: '/join',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/community',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      path: '/contact',
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      path: '/free-program',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/resources',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      path: '/start-here',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return publicPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
