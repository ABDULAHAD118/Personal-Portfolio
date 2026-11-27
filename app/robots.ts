import type { MetadataRoute } from 'next';
import { siteConfig } from './lib/site-config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/', disallow: ['/api/'] },
            // Named so AI search tools (ChatGPT, Claude, Perplexity, Gemini) can read and cite the site.
            {
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-SearchBot',
                    'PerplexityBot',
                    'Google-Extended',
                    'Applebot-Extended',
                ],
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}
