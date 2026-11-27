import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import * as si from 'simple-icons';
import { workData } from '@/assets/assets';
import PageHeader from '../../components/ui/PageHeader';
import ProjectCover from '../../components/ui/ProjectCover';
import StackTags from '../../components/ui/StackTags';
import TechIcon from '../../components/ui/TechIcon';
import DemoVideo from '../../components/Education/DemoVideo';
import AppScreens from '../../components/Education/AppScreens';
import JsonLd from '../../components/ui/JsonLd';
import { breadcrumbs, pageMeta, personRef } from '../../lib/seo';
import { siteConfig } from '../../lib/site-config';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return workData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = workData.find((p) => p.slug === slug);
    if (!project) return {};
    const title = `${project.title}: ${project.type} built with ${project.stack.slice(0, 3).join(', ')}`;
    return pageMeta(
        title,
        project.summary,
        `/work/${project.slug}`,
        project.bgImage
    );
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const index = workData.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();
    const project = workData[index];
    const prev = workData[(index - 1 + workData.length) % workData.length];
    const next = workData[(index + 1) % workData.length];
    const host = project.url
        ? new URL(project.url).host
        : `${project.slug}.app`;

    const url = `${siteConfig.url}/work/${project.slug}`;
    const mobile = project.type.includes('Mobile');

    return (
        <main>
            <JsonLd
                data={{
                    '@graph': [
                        {
                            '@type': mobile
                                ? 'MobileApplication'
                                : 'WebApplication',
                            '@id': `${url}#app`,
                            name: project.title,
                            description: project.summary,
                            url,
                            applicationCategory: mobile
                                ? 'LifestyleApplication'
                                : 'BusinessApplication',
                            operatingSystem: mobile ? 'Android' : 'Web browser',
                            keywords: project.stack.join(', '),
                            author: personRef,
                            ...(project.bgImage && {
                                image: `${siteConfig.url}${project.bgImage}`,
                            }),
                            ...(project.url && { sameAs: project.url }),
                            ...(project.repo && {
                                codeRepository: project.repo,
                            }),
                        },
                        ...(project.demo
                            ? [
                                  {
                                      '@type': 'VideoObject',
                                      name: `${project.title} app demo`,
                                      description: project.summary,
                                      thumbnailUrl: `${siteConfig.url}${project.demo.poster}`,
                                      contentUrl: `${siteConfig.url}${project.demo.video}`,
                                      uploadDate: project.demo.uploadDate,
                                      duration: `PT${project.demo.durationSec}S`,
                                      author: personRef,
                                  },
                              ]
                            : []),
                        breadcrumbs([
                            { name: 'Work', path: '/work' },
                            {
                                name: project.title,
                                path: `/work/${project.slug}`,
                            },
                        ]),
                    ],
                }}
            />
            <PageHeader
                path={[
                    { label: 'work', href: '/work' },
                    { label: project.slug },
                ]}
                title={project.title}
                intro={project.summary}
            >
                <div className="flex flex-wrap gap-3 font-mono text-sm">
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-accent text-on-accent flex items-center gap-2 rounded-md px-4 py-2 transition-opacity hover:opacity-90"
                        >
                            {project.type === 'Mobile App'
                                ? 'download app'
                                : 'visit live site'}
                            <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                    )}
                    {project.repo && (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="border-line hover:border-accent flex items-center gap-2 rounded-md border px-4 py-2 transition-colors"
                        >
                            <TechIcon icon={si.siGithub} className="size-4" />
                            source code
                        </a>
                    )}
                    {!project.url && !project.repo && (
                        <span className="border-line text-muted rounded-md border px-4 py-2">
                            private client project
                        </span>
                    )}
                </div>
            </PageHeader>

            <div className="px-6 sm:px-10 lg:px-16">
                <figure className="animate-rise border-line bg-panel overflow-hidden rounded-2xl border [animation-delay:300ms]">
                    <div className="border-line flex items-center gap-3 border-b px-4 py-2.5">
                        <span className="flex gap-1.5" aria-hidden>
                            <span className="bg-line size-2.5 rounded-full" />
                            <span className="bg-line size-2.5 rounded-full" />
                            <span className="bg-line size-2.5 rounded-full" />
                        </span>
                        <span className="text-muted bg-bg truncate rounded px-3 py-0.5 font-mono text-xs">
                            {host}
                        </span>
                    </div>
                    <div className="group aspect-[16/9] overflow-hidden">
                        <ProjectCover
                            project={project}
                            sizes="(min-width: 1024px) 90vw, 100vw"
                            priority
                        />
                    </div>
                </figure>
            </div>

            <div className="grid gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:px-16">
                <div>
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">01</span> / overview
                    </h2>
                    <div className="mt-6 space-y-5 text-lg leading-relaxed sm:text-xl">
                        {project.overview.map((para) => (
                            <p key={para}>{para}</p>
                        ))}
                    </div>

                    <h2 className="text-muted mt-16 font-mono text-sm">
                        <span className="text-accent">02</span> / features
                    </h2>
                    <ul className="border-line mt-6 border-t">
                        {project.features.map((f, i) => (
                            <li
                                key={f}
                                className="border-line flex gap-5 border-b py-4"
                            >
                                <span className="text-accent font-mono text-sm">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>

                    {project.responsibilities && (
                        <>
                            <h2 className="text-muted mt-16 font-mono text-sm">
                                <span className="text-accent">03</span> / my
                                role
                            </h2>
                            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                {project.responsibilities.map((r) => (
                                    <li
                                        key={r}
                                        className="bg-panel border-line flex gap-3 rounded-xl border p-4 text-sm leading-relaxed"
                                    >
                                        <ArrowRight
                                            className="text-accent mt-[0.4em] size-4 shrink-0"
                                            aria-hidden
                                        />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <dl className="bg-panel border-line divide-line divide-y rounded-2xl border font-mono text-sm">
                        <div className="p-5">
                            <dt className="text-muted text-xs">type</dt>
                            <dd className="mt-1">{project.type}</dd>
                        </div>
                        <div className="p-5">
                            <dt className="text-muted text-xs">role</dt>
                            <dd className="mt-1">{project.role}</dd>
                        </div>
                        <div className="p-5">
                            <dt className="text-muted text-xs">stack</dt>
                            <dd className="mt-3">
                                <StackTags stack={project.stack} />
                            </dd>
                        </div>
                    </dl>
                </aside>
            </div>

            {project.demo && (
                <section className="grid gap-14 px-6 pb-20 sm:px-10 sm:pb-28 lg:px-16">
                    <div className="grid items-center gap-10 md:grid-cols-[17rem_1fr] lg:gap-16">
                        <figure className="mx-auto w-full max-w-[17rem]">
                            <DemoVideo
                                src={project.demo.video}
                                poster={project.demo.poster}
                            />
                        </figure>
                        <div>
                            <h2 className="text-muted font-mono text-sm">
                                <span className="text-accent">
                                    {project.responsibilities ? '04' : '03'}
                                </span>{' '}
                                / app demo
                            </h2>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
                                A walkthrough of the app on a real phone:
                                scanning a leaf, reading the diagnosis, asking
                                the chatbot and checking market prices.
                            </p>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-muted font-mono text-sm">
                            <span className="text-accent">
                                {project.responsibilities ? '05' : '04'}
                            </span>{' '}
                            / screens
                        </h2>
                        <div className="mt-6">
                            <AppScreens />
                        </div>
                    </div>
                </section>
            )}

            <nav
                aria-label="More projects"
                className="border-line grid border-t sm:grid-cols-2"
            >
                <Link
                    href={`/work/${prev.slug}`}
                    className="group border-line hover:bg-panel px-6 py-10 transition-colors sm:border-r sm:px-10 lg:px-16"
                >
                    <span className="text-muted flex items-center gap-2 font-mono text-xs">
                        <ArrowLeft
                            className="size-3.5 transition-transform group-hover:-translate-x-1"
                            aria-hidden
                        />
                        previous
                    </span>
                    <span className="font-heading mt-2 block text-2xl font-semibold sm:text-3xl">
                        {prev.title}
                    </span>
                </Link>
                <Link
                    href={`/work/${next.slug}`}
                    className="group border-line hover:bg-panel border-t px-6 py-10 text-right transition-colors sm:border-t-0 sm:px-10 lg:px-16"
                >
                    <span className="text-muted flex items-center justify-end gap-2 font-mono text-xs">
                        next
                        <ArrowRight
                            className="size-3.5 transition-transform group-hover:translate-x-1"
                            aria-hidden
                        />
                    </span>
                    <span className="font-heading mt-2 block text-2xl font-semibold sm:text-3xl">
                        {next.title}
                    </span>
                </Link>
            </nav>
        </main>
    );
}
