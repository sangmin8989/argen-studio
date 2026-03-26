import type { MetadataRoute } from 'next';
import { portfolios } from '@/data/portfolios';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://argen.co.kr';

  const portfolioUrls = portfolios.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...portfolioUrls,
  ];
}
