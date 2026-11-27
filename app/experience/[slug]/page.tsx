import type { Metadata } from 'next';
import { pageMeta } from '@/app/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { experienceData, workData } from '@/assets/assets';
import PageHeader from '../../components/ui/PageHeader';
import StackTags from '../../components/ui/StackTags';
import ProjectTile from '../../components/Work/ProjectTile';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return experienceData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const job = experienceData.find((e) => e.slug === slug);
    if (!job) return {};
    return pageMeta(
        `${job.role} at ${job.company}`,
        job.summary,
        `/experience/${job.slug}`
    );
}

export default async function ExperienceDetailPage({ params }: Props) {
    const { slug } = await params;
    const job = experienceData.find((e) => e.slug === slug);
    if (!job) notFound();
    // Client projects were all delivered at BitLogicx.
    const projects =
        job.slug === 'bitlogicx'
            ? workData.filter((p) => p.kind === 'client')
            : [];

    return (
        <main>
            <PageHeader
                path={[
                    { label: 'experience', href: '/experience' },
                    { label: job.slug },
                ]}
                title={job.role}
                intro={job.summary}
            >
                <dl className="text-muted flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
                    <div className="flex gap-2">
                        <dt className="text-accent">at</dt>
                        <dd className="text-fg">{job.company}</dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="text-accent">when</dt>
                        <dd>{job.period}</dd>
                    </div>
                    <div className="flex gap-2">
                        <dt className="text-accent">where</dt>
                        <dd>{job.location}</dd>
                    </div>
                </dl>
            </PageHeader>

            <div className="border-line grid gap-14 border-t px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-16">
                <section>
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">01</span> / what I did
                    </h2>
                    <ul className="border-line mt-6 border-t">
                        {job.highlights.map((h, i) => (
                            <li
                                key={h}
                                className="border-line flex gap-5 border-b py-5 text-lg leading-relaxed"
                            >
                                <span className="text-accent font-mono text-sm leading-8">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span>{h}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">02</span> / stack
                    </h2>
                    <StackTags stack={job.stack} className="mt-6" />
                </section>
            </div>

            {projects.length > 0 && (
                <section className="border-line border-t px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">03</span> / projects here
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

            <div className="border-line border-t px-6 py-10 sm:px-10 lg:px-16">
                <Link
                    href="/experience"
                    className="hover:text-accent inline-flex items-center gap-2 font-mono text-sm transition-colors"
                >
                    all experience
                    <ArrowRight className="size-4" aria-hidden />
                </Link>
            </div>
        </main>
    );
}
