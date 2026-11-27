import {
    certificateData,
    educationData,
    serviceData,
    workData,
} from '@/assets/assets';
import { siteConfig } from './site-config';
import { personRef, serviceTitles } from './seo';

const imageId = `${siteConfig.url}/#profile-image`;
const websiteId = `${siteConfig.url}/#website`;

// On every page: who Abdulahad is and the site itself. Page-specific data lives on each page.
export function generateStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                ...personRef,
                name: siteConfig.name,
                givenName: siteConfig.givenName,
                familyName: siteConfig.familyName,
                alternateName: siteConfig.alternateName,
                url: siteConfig.url,
                image: { '@id': imageId },
                jobTitle: siteConfig.role,
                description: siteConfig.description,
                email: siteConfig.email,
                telephone: siteConfig.phone,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: siteConfig.location.locality,
                    addressRegion: siteConfig.location.region,
                    addressCountry: siteConfig.location.country,
                },
                nationality: {
                    '@type': 'Country',
                    name: siteConfig.location.countryName,
                },
                alumniOf: {
                    '@type': 'CollegeOrUniversity',
                    name: siteConfig.alumniOf.name,
                    sameAs: siteConfig.alumniOf.sameAs,
                },
                worksFor: {
                    '@type': 'Organization',
                    name: siteConfig.company.name,
                },
                sameAs: siteConfig.socialLinks,
                knowsAbout: siteConfig.knowsAbout,
                knowsLanguage: ['English', 'Urdu'],
                hasOccupation: {
                    '@type': 'Occupation',
                    name: siteConfig.role,
                    occupationalCategory: '15-1254.00',
                    skills: siteConfig.knowsAbout.join(', '),
                    occupationLocation: {
                        '@type': 'City',
                        name: siteConfig.location.locality,
                    },
                },
                hasCredential: [
                    {
                        '@type': 'EducationalOccupationalCredential',
                        name: educationData.degree,
                        credentialCategory: 'degree',
                        recognizedBy: {
                            '@type': 'CollegeOrUniversity',
                            name: siteConfig.alumniOf.name,
                        },
                    },
                    ...certificateData.map((c) => ({
                        '@type': 'EducationalOccupationalCredential',
                        name: c.title,
                        credentialCategory: 'certificate',
                        recognizedBy: {
                            '@type': 'Organization',
                            name: c.issuer,
                        },
                        url: c.href.startsWith('http')
                            ? c.href
                            : `${siteConfig.url}${c.href}`,
                    })),
                ],
                makesOffer: serviceData.map((s) => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@id': `${siteConfig.url}/services/${s.slug}#service`,
                    },
                })),
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Hiring and project enquiries',
                    email: siteConfig.email,
                    telephone: siteConfig.phone,
                    url: `${siteConfig.url}/contact`,
                    availableLanguage: ['English', 'Urdu'],
                },
            },
            {
                '@type': 'ImageObject',
                '@id': imageId,
                url: siteConfig.profileImage,
                contentUrl: siteConfig.profileImage,
                width: 675,
                height: 900,
                caption: `${siteConfig.name}, ${siteConfig.role}`,
            },
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: siteConfig.url,
                name: siteConfig.name,
                // Google picks the site name shown in results from these; no domain, so it never falls back to it.
                alternateName: [
                    `${siteConfig.name} Portfolio`,
                    'Abdul Ahad Hussain',
                ],
                description: siteConfig.description,
                publisher: personRef,
                inLanguage: 'en',
            },
        ],
    };
}

// Home page only: the profile page, with every project and service linked to its own page.
export function homeStructuredData() {
    return {
        '@graph': [
            {
                '@type': 'ProfilePage',
                '@id': `${siteConfig.url}/#profilepage`,
                url: siteConfig.url,
                name: siteConfig.title,
                description: siteConfig.description,
                isPartOf: { '@id': websiteId },
                mainEntity: personRef,
                primaryImageOfPage: { '@id': imageId },
                inLanguage: 'en',
            },
            {
                '@type': 'ItemList',
                name: `Projects by ${siteConfig.name}`,
                itemListElement: workData.map((p, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: p.title,
                    url: `${siteConfig.url}/work/${p.slug}`,
                })),
            },
            {
                '@type': 'ItemList',
                name: `Services offered by ${siteConfig.name}`,
                itemListElement: serviceData.map((s, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: serviceTitles[s.slug] ?? s.title,
                    url: `${siteConfig.url}/services/${s.slug}`,
                })),
            },
        ],
    };
}
