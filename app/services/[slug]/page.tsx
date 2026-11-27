import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { serviceData, workData } from '@/assets/assets';
import PageHeader from '../../components/ui/PageHeader';
import StackTags from '../../components/ui/StackTags';
import ProjectTile from '../../components/Work/ProjectTile';
import ProcessSection from '../../components/Services/ProcessSection';
import JsonLd from '../../components/ui/JsonLd';
import {
    breadcrumbs,
    byline,
    pageMeta,
    personRef,
    serviceTitles,
} from '../../lib/seo';
import { siteConfig } from '../../lib/site-config';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return serviceData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = serviceData.find((s) => s.slug === slug);
    if (!service) return {};
    const title = serviceTitles[service.slug] ?? `${service.title} services`;
    const description = `${service.description} ${byline}`;
    return pageMeta(title, description, `/services/${service.slug}`);
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const service = serviceData.find((s) => s.slug === slug);
    if (!service) notFound();
    const projects = workData.filter((p) => service.projects.includes(p.slug));

    const url = `${siteConfig.url}/services/${service.slug}`;

    return (
        <main>
            <JsonLd
                data={{
                    '@graph': [
                        {
                            '@type': 'Service',
                            '@id': `${url}#service`,
                            name: serviceTitles[service.slug] ?? service.title,
                            serviceType: service.title,
                            description: service.intro,
                            url,
                            provider: personRef,
                            areaServed: [
                                { '@type': 'Country', name: 'Pakistan' },
                                {
                                    '@type': 'Place',
                                    name: 'Worldwide (remote)',
                                },
                            ],
                            hasOfferCatalog: {
                                '@type': 'OfferCatalog',
                                name: `${service.title} deliverables`,
                                itemListElement: service.deliverables.map(
                                    (d) => ({
                                        '@type': 'Offer',
                                        itemOffered: {
                                            '@type': 'Service',
                                            name: d,
                                        },
                                    })
                                ),
                            },
                        },
                        breadcrumbs([
                            { name: 'Services', path: '/services' },
                            {
                                name: service.title,
                                path: `/services/${service.slug}`,
                            },
                        ]),
                    ],
                }}
            />
            <PageHeader
                path={[
                    { label: 'services', href: '/services' },
                    { label: service.slug },
                ]}
                title={service.title}
                intro={service.intro}
            />

            <div className="border-line grid gap-14 border-t px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-16">
                <section>
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">01</span> / what you get
                    </h2>
                    <ul className="border-line mt-6 border-t">
                        {service.deliverables.map((d) => (
                            <li
                                key={d}
                                className="border-line flex items-center gap-4 border-b py-5 text-lg"
                            >
                                <Check
                                    className="text-accent size-5 shrink-0"
                                    aria-hidden
                                />
                                {d}
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">02</span> / tools I use
                    </h2>
                    <StackTags stack={service.stack} className="mt-6" />
                </section>
            </div>

            {projects.length > 0 && (
                <section className="border-line border-t px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">03</span> / related work
                    </h2>
                    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p) => (
                            <li key={p.slug}>
                                <ProjectTile project={p} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="border-line border-t">
                <ProcessSection />
            </div>
        </main>
    );
}
