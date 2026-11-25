import type { MetadataRoute } from 'next';
import { experienceData, serviceData, workData } from '@/assets/assets';
import { siteConfig } from './lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        '',
        '/about',
        '/work',
        '/experience',
        '/services',
        '/certificates',
        '/contact',
        ...workData.map((p) => `/work/${p.slug}`),
        ...experienceData.map((e) => `/experience/${e.slug}`),
        ...serviceData.map((s) => `/services/${s.slug}`),
    ];
    return paths.map((path) => ({
        url: `${siteConfig.url}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : path.split('/').length > 2 ? 0.6 : 0.8,
    }));
}
