import type { Metadata } from 'next';
import { Outfit, Ovo } from 'next/font/google';
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
    metadataBase: new URL('https://abdulahadhussain.tech'),
    title: {
        default: 'Abdulahad Hussain | Full-Stack Web Developer',
        template: '%s | Abdulahad Hussain',
    },
    description:
        'Portfolio of Abdulahad Hussain, a full-stack web developer in Lahore building scalable applications with React, Next.js, Vue, Node.js and AdonisJS.',
    applicationName: 'Abdulahad Hussain Portfolio',
    authors: [{ name: 'Abdulahad Hussain', url: '/' }],
    creator: 'Abdulahad Hussain',
    publisher: 'Abdulahad Hussain',
    category: 'technology',
    keywords: [
        'Abdulahad Hussain',
        'full-stack web developer',
        'full stack developer Lahore',
        'Next.js developer Pakistan',
        'React developer',
        'Node.js developer',
        'Vue.js developer',
        'AdonisJS developer',
        'backend developer',
        'frontend developer',
        'TypeScript developer',
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'profile',
        locale: 'en_PK',
        url: '/',
        siteName: 'Abdulahad Hussain Portfolio',
        title: 'Abdulahad Hussain | Full-Stack Web Developer',
        description:
            'Full-stack developer building scalable React, Next.js, Vue and Node.js applications in Lahore, Pakistan.',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Abdulahad Hussain - Full-Stack Web Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Abdulahad Hussain | Full-Stack Web Developer',
        description:
            'Full-stack developer building scalable React, Next.js, Vue and Node.js applications.',
        images: ['/twitter-image'],
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
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
    manifest: '/manifest.webmanifest',
    verification: process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : undefined,
    other: {
        'geo.region': 'PK-PB',
        'geo.placename': 'Lahore',
    },
};

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfilePage',
            '@id': 'https://abdulahadhussain.tech/#profile-page',
            url: 'https://abdulahadhussain.tech',
            name: 'Abdulahad Hussain - Full-Stack Web Developer',
            description:
                'Professional portfolio of Abdulahad Hussain, a full-stack web developer in Lahore, Pakistan.',
            mainEntity: { '@id': 'https://abdulahadhussain.tech/#person' },
        },
        {
            '@type': 'Person',
            '@id': 'https://abdulahadhussain.tech/#person',
            name: 'Abdulahad Hussain',
            url: 'https://abdulahadhussain.tech',
            jobTitle: 'Full-Stack Web Developer',
            email: 'mailto:abdulahadhussain60@gmail.com',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lahore',
                addressCountry: 'PK',
            },
            worksFor: {
                '@type': 'Organization',
                name: 'BitLogicx',
            },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'University of Engineering and Technology, Lahore',
            },
            sameAs: [
                'https://github.com/ABDULAHAD118',
                'https://www.linkedin.com/in/abdulahad018/',
                'https://www.instagram.com/abdulahadhussain8/',
            ],
            knowsAbout: [
                'Full-stack web development',
                'React',
                'Next.js',
                'Vue.js',
                'Nuxt',
                'Node.js',
                'AdonisJS',
                'TypeScript',
                'MongoDB',
                'MySQL',
                'Redis',
                'Docker',
                'REST APIs',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://abdulahadhussain.tech/#website',
            url: 'https://abdulahadhussain.tech',
            name: 'Abdulahad Hussain Portfolio',
            inLanguage: 'en',
            publisher: { '@id': 'https://abdulahadhussain.tech/#person' },
        },
    ],
};

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
                {children}
            </body>
        </html>
    );
}
