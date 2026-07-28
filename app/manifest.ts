import type { MetadataRoute } from 'next';
import { siteConfig } from './lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${siteConfig.name} | ${siteConfig.role}`,
        short_name: siteConfig.givenName,
        description: siteConfig.shortDescription,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#11001f',
        lang: 'en',
        categories: ['portfolio', 'technology', 'developer', 'software engineering'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/profile-img.png',
                sizes: '800x800',
                type: 'image/png',
            },
        ],
    };
}
