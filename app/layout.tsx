import type { Metadata } from 'next';
import { Outfit, Ovo } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import { siteConfig } from './lib/site-config';
import { generateStructuredData } from './lib/schema';
import './globals.css';

const OutfitFont = Outfit({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
});

const OvoFont = Ovo({
    weight: ['400'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: `${siteConfig.name} Portfolio`,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'technology',
    keywords: siteConfig.keywords,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'profile',
        firstName: siteConfig.givenName,
        lastName: siteConfig.familyName,
        username: 'ABDULAHAD118',
        gender: 'male',
        locale: 'en_US',
        url: '/',
        siteName: siteConfig.siteName,
        title: siteConfig.title,
        description: siteConfig.shortDescription,
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - ${siteConfig.role}`,
                type: 'image/png',
            },
            {
                url: '/abdulahad-hussain.png',
                width: 800,
                height: 800,
                alt: `${siteConfig.name} Profile Photo`,
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.shortDescription,
        creator: '@abdulahadhussain',
        images: ['/opengraph-image'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/profile-img.png', sizes: '192x192', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: [{ url: '/profile-img.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.webmanifest',
    verification: process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : undefined,
    other: {
        'geo.region': `${siteConfig.location.country}-${siteConfig.location.region}`,
        'geo.placename': siteConfig.location.locality,
    },
};

const structuredData = generateStructuredData();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${OutfitFont.className} ${OvoFont.className} dark:bg-darkTheme overflow-x-hidden leading-8 antialiased dark:text-white`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData).replace(
                            /</g,
                            '\\u003c',
                        ),
                    }}
                />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            borderRadius: '12px',
                            background: '#1f2937',
                            color: '#fff',
                            fontSize: '14px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#7c3aed',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
