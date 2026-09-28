import { certificateData, serviceData, workData } from '@/assets/assets';
import { siteConfig } from './site-config';

export function generateStructuredData() {
    const personId = `${siteConfig.url}/#person`;
    const imageId = `${siteConfig.url}/#profile-image`;
    const profilePageId = `${siteConfig.url}/#profilepage`;
    const websiteId = `${siteConfig.url}/#website`;
    const webpageId = `${siteConfig.url}/#webpage`;
    const breadcrumbId = `${siteConfig.url}/#breadcrumb`;
    const navId = `${siteConfig.url}/#navigation`;
    const servicesListId = `${siteConfig.url}/#services-list`;
    const projectsListId = `${siteConfig.url}/#projects-list`;

    // Map projects (SoftwareApplication / WebApplication)
    const projectEntities = workData.map((project, index) => {
        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {
            '@type': 'WebApplication',
            '@id': `${siteConfig.url}/#project-${slug}`,
            name: project.title,
            description: `${project.title} - ${project.description} developed by ${siteConfig.name}`,
            url: project.url,
            applicationCategory: 'WebApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            author: {
                '@id': personId,
            },
            creator: {
                '@id': personId,
            },
            image: `${siteConfig.url}${project.bgImage}`,
            position: index + 1,
        };
    });

    // Map services
    const serviceEntities = serviceData.map((service, index) => {
        const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {
            '@type': 'Service',
            '@id': `${siteConfig.url}/#service-${slug}`,
            name: service.title,
            description: service.description,
            serviceType: service.title,
            provider: {
                '@id': personId,
            },
            areaServed: {
                '@type': 'AdministrativeArea',
                name: 'Worldwide',
            },
            position: index + 1,
        };
    });

    // Map certifications
    const credentialEntities = certificateData.map((cert) => {
        const slug = cert.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {
            '@type': 'EducationalOccupationalCredential',
            '@id': `${siteConfig.url}/#credential-${slug}`,
            name: cert.title,
            credentialCategory: 'Certificate',
            recognizedBy: {
                '@type': 'Organization',
                name: cert.issuer,
            },
            url: cert.href.startsWith('http')
                ? cert.href
                : `${siteConfig.url}${cert.href}`,
        };
    });

    const navItems = [
        { name: 'Home', url: `${siteConfig.url}/#top` },
        { name: 'About me', url: `${siteConfig.url}/#about` },
        { name: 'Education', url: `${siteConfig.url}/#education` },
        { name: 'Experience', url: `${siteConfig.url}/#experience` },
        { name: 'Services', url: `${siteConfig.url}/#services` },
        { name: 'My Work', url: `${siteConfig.url}/#work` },
        { name: 'Certificates', url: `${siteConfig.url}/#certificates` },
        { name: 'Contact me', url: `${siteConfig.url}/#contact` },
    ];

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
                knowsLanguage: [
                    {
                        '@type': 'Language',
                        name: 'English',
                        alternateName: 'en',
                    },
                    {
                        '@type': 'Language',
                        name: 'Urdu',
                        alternateName: 'ur',
                    },
                ],
                hasOccupation: {
                    '@type': 'Occupation',
                    name: siteConfig.role,
                    occupationalCategory: '15-1254.00',
                    skills: siteConfig.knowsAbout.join(', '),
                    description: siteConfig.description,
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Professional Inquiries',
                    email: siteConfig.email,
                    availableLanguage: ['English', 'Urdu'],
                },
                hasCredential: credentialEntities.map((cred) => ({
                    '@id': cred['@id'],
                })),
                makesOffer: serviceEntities.map((serv) => ({
                    '@id': serv['@id'],
                })),
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
                        name: 'About',
                        item: `${siteConfig.url}/#about`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Experience',
                        item: `${siteConfig.url}/#experience`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 4,
                        name: 'Services',
                        item: `${siteConfig.url}/#services`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 5,
                        name: 'Projects',
                        item: `${siteConfig.url}/#work`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 6,
                        name: 'Certificates',
                        item: `${siteConfig.url}/#certificates`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 7,
                        name: 'Contact',
                        item: `${siteConfig.url}/#contact`,
                    },
                ],
            },
            {
                '@type': 'ItemList',
                '@id': projectsListId,
                name: 'Featured Projects',
                description: `Software applications and web projects developed by ${siteConfig.name}`,
                itemListElement: projectEntities,
            },
            {
                '@type': 'ItemList',
                '@id': servicesListId,
                name: 'Services Offered',
                description: `Software engineering and development services offered by ${siteConfig.name}`,
                itemListElement: serviceEntities,
            },
            ...projectEntities,
            ...serviceEntities,
            ...credentialEntities,
            {
                '@type': 'SiteNavigationElement',
                '@id': navId,
                name: 'Portfolio Navigation',
                hasPart: navItems.map((item, idx) => ({
                    '@type': 'WebPage',
                    position: idx + 1,
                    name: item.name,
                    url: item.url,
                })),
            },
        ],
    };
}
