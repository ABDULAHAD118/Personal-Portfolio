import { siteConfig } from './site-config';

export function generateStructuredData() {
    const personId = `${siteConfig.url}/#person`;
    const imageId = `${siteConfig.url}/#profile-image`;
    const profilePageId = `${siteConfig.url}/#profilepage`;
    const websiteId = `${siteConfig.url}/#website`;
    const webpageId = `${siteConfig.url}/#webpage`;
    const breadcrumbId = `${siteConfig.url}/#breadcrumb`;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': personId,
                name: siteConfig.name,
                givenName: siteConfig.givenName,
                familyName: siteConfig.familyName,
                alternateName: siteConfig.alternateName,
                url: siteConfig.url,
                image: {
                    '@id': imageId,
                },
                jobTitle: siteConfig.role,
                description: siteConfig.shortDescription,
                email: siteConfig.emailUrl,
                nationality: {
                    '@type': 'Country',
                    name: siteConfig.location.countryName,
                },
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: siteConfig.location.locality,
                    addressRegion: siteConfig.location.region,
                    addressCountry: siteConfig.location.country,
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
            },
            {
                '@type': 'ImageObject',
                '@id': imageId,
                url: siteConfig.profileImage,
                contentUrl: siteConfig.profileImage,
                width: {
                    '@type': 'QuantitativeValue',
                    value: 800,
                },
                height: {
                    '@type': 'QuantitativeValue',
                    value: 800,
                },
                caption: `${siteConfig.name} - ${siteConfig.role}`,
                representativeOfPage: true,
            },
            {
                '@type': 'ProfilePage',
                '@id': profilePageId,
                url: siteConfig.url,
                name: `${siteConfig.name} - ${siteConfig.role} Portfolio`,
                description: siteConfig.description,
                inLanguage: 'en-US',
                mainEntity: {
                    '@id': personId,
                },
                primaryImageOfPage: {
                    '@id': imageId,
                },
                image: {
                    '@id': imageId,
                },
                breadcrumb: {
                    '@id': breadcrumbId,
                },
            },
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: siteConfig.url,
                name: siteConfig.name,
                alternateName: [
                    `${siteConfig.name} Portfolio`,
                    'abdulahadhussain.tech',
                ],
                publisher: {
                    '@id': personId,
                },
                copyrightHolder: {
                    '@id': personId,
                },
                inLanguage: 'en-US',
                potentialAction: {
                    '@type': 'ReadAction',
                    target: [siteConfig.url],
                },
            },
            {
                '@type': 'WebPage',
                '@id': webpageId,
                url: siteConfig.url,
                name: siteConfig.title,
                isPartOf: {
                    '@id': websiteId,
                },
                about: {
                    '@id': personId,
                },
                primaryImageOfPage: {
                    '@id': imageId,
                },
                inLanguage: 'en-US',
            },
            {
                '@type': 'BreadcrumbList',
                '@id': breadcrumbId,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: siteConfig.url,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Portfolio',
                        item: `${siteConfig.url}/#portfolio`,
                    },
                ],
            },
        ],
    };
}
