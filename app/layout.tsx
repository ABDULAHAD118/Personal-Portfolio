import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import { siteConfig } from './lib/site-config';
import { generateStructuredData } from './lib/schema';
import './globals.css';

import SmoothScroll from './components/providers/SmoothScroll';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';

// Runs before paint: dark by default, light only if the visitor chose it (read by app/lib/use-theme.ts).
const themeScript = `try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch(e){}`;

const grotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-grotesk',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
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
                width: 675,
                height: 900,
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
        apple: [
            { url: '/profile-img.png', sizes: '180x180', type: 'image/png' },
        ],
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
        <html
            lang="en"
            className={`dark ${grotesk.variable} ${inter.variable} ${jetbrains.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="overflow-x-hidden font-sans leading-8 antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData).replace(
                            /</g,
                            '\\u003c'
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
                                primary: '#ff8a3d',
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
                <SmoothScroll>
                    <div id="top" />
                    <Navbar />
                    {children}
                    <Footer />
                    <Chatbot />
                </SmoothScroll>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
