import { siteConfig } from './site-config';

// Search-facing titles for the service pages, written around what clients type into Google.
export const serviceTitles: Record<string, string> = {
    'full-stack': 'Hire a Full Stack Developer: Next.js, React & Node.js',
    frontend: 'Frontend Developer for Hire: React, Next.js & Vue',
    backend: 'Backend & REST API Development: Node.js, Express, AdonisJS',
    'mobile-app': 'React Native Mobile App Development (Android & iOS)',
    devops: 'DevOps & Deployment: Docker, CI/CD, Nginx & Cloud Servers',
    'ai-integration':
        'AI Integration & Chatbot Development: OpenAI, Gemini, LangChain',
    dashboards: 'Admin Panel & Dashboard Development',
    maintenance: 'Website Performance Optimisation & Maintenance',
    saas: 'SaaS Development: Multi-tenant Web Applications',
    cms: 'Custom CMS Development for Websites',
    ecommerce: 'E-commerce & Online Ordering App Development',
    'api-integrations': 'API & Third-party Integration Development',
};

// Appended to page descriptions so every page says who and where, for local and remote searches.
export const byline = `By ${siteConfig.name}, full stack developer in Lahore, Pakistan, working with clients worldwide.`;

export const personRef = { '@id': `${siteConfig.url}/#person` };

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '' }, ...items].map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${siteConfig.url}${item.path}`,
    })),
});

// Title, description, canonical URL and link-preview tags in one place, so they never disagree.
// A page that sets openGraph replaces the root one, so the preview image has to be set here too.
export const pageMeta = (
    title: string,
    description: string,
    path: string,
    image = '/opengraph-image'
) => ({
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        url: path,
        images: [image],
    },
    twitter: {
        card: 'summary_large_image' as const,
        title: `${title} | ${siteConfig.name}`,
        description,
        images: [image],
    },
});
