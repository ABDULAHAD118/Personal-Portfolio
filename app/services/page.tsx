import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Layers } from 'lucide-react';
import { serviceData } from '@/assets/assets';
import { serviceIcons } from '../lib/service-icons';
import PageHeader from '../components/ui/PageHeader';
import StackTags from '../components/ui/StackTags';
import ProcessSection from '../components/Services/ProcessSection';

export const metadata: Metadata = {
    title: 'Services',
    description:
        'Full stack, frontend, backend and mobile app development services by Abdulahad Hussain.',
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'services' }]}
                title={
                    <>
                        What I can <span className="text-accent">build</span>{' '}
                        for you.
                    </>
                }
                intro="From responsive interfaces to secure APIs and database-backed systems, built with production-focused practices."
            />

            <ul className="border-line grid border-t md:grid-cols-2">
                {serviceData.map((s, i) => {
                    const Icon = serviceIcons[i] ?? Layers;
                    return (
                        <li
                            key={s.slug}
                            className="border-line border-b md:odd:border-r"
                        >
                            <Link
                                href={`/services/${s.slug}`}
                                className="group hover:bg-panel flex h-full flex-col px-6 py-12 transition-colors sm:px-10 lg:px-16"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="border-line group-hover:border-accent group-hover:text-accent grid size-12 place-items-center rounded-lg border transition-colors">
                                        <Icon className="size-6" aria-hidden />
                                    </span>
                                    <span className="text-accent font-mono text-sm">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <h2 className="font-heading mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    {s.title}
                                </h2>
                                <p className="text-muted mt-3 leading-relaxed">
                                    {s.description}
                                </p>
                                <StackTags
                                    stack={s.stack.slice(0, 5)}
                                    className="mt-6"
                                />
                                <span className="text-muted group-hover:text-accent mt-8 flex items-center gap-2 font-mono text-sm transition-colors">
                                    see details
                                    <ArrowUpRight
                                        className="size-4"
                                        aria-hidden
                                    />
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <ProcessSection />
        </main>
    );
}
