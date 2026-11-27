import type { MetadataRoute } from 'next';
import { experienceData, serviceData, workData } from '@/assets/assets';
import { siteConfig } from './lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        '',
        '/about',
        '/work',
        '/experience',
        '/education',
        '/services',
        '/certificates',
        '/contact',
        ...workData.map((p) => `/work/${p.slug}`),
        ...experienceData.map((e) => `/experience/${e.slug}`),
        ...serviceData.map((s) => `/services/${s.slug}`),
    ];
    // Video sitemap entries, so Google finds the demo videos and not just their pages.
    const videos = Object.fromEntries(
        workData.flatMap((p) =>
            p.demo
                ? [
                      [
                          `/work/${p.slug}`,
                          [
                              {
                                  title: `${p.title} app demo`,
                                  description: p.summary,
                                  thumbnail_loc: `${siteConfig.url}${p.demo.poster}`,
                                  content_loc: `${siteConfig.url}${p.demo.video}`,
                                  duration: p.demo.durationSec,
                                  publication_date: p.demo.uploadDate,
                              },
                          ],
                      ],
                  ]
                : []
        )
    );
    return paths.map((path) => ({
        url: `${siteConfig.url}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : path.split('/').length > 2 ? 0.6 : 0.8,
        ...(videos[path] && { videos: videos[path] }),
    }));
}
