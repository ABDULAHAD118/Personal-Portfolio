import type { Metadata } from 'next';
import { pageMeta } from '@/app/lib/seo';
import Link from 'next/link';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { experienceData } from '@/assets/assets';
import PageHeader from '../components/ui/PageHeader';
import StackTags from '../components/ui/StackTags';

export const metadata: Metadata = pageMeta(
    'Experience: Full Stack Software Engineer at BitLogicx',
    'Work experience of Abdulahad Hussain: full stack software engineer at BitLogicx building client platforms with Next.js, Vue, AdonisJS and Node.js, plus CI/CD and servers.',
    '/experience'
);

export default function ExperiencePage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'experience' }]}
                title={
                    <>
                        Where I&apos;ve{' '}
                        <span className="text-accent">worked</span>.
                    </>
                }
                intro="From a frontend internship to building enterprise frontend and backend systems full time."
            />

            <ol className="border-line border-t">
                {experienceData.map((job, i) => (
                    <li key={job.slug} className="border-line border-b">
                        <Link
                            href={`/experience/${job.slug}`}
                            className="group hover:bg-panel grid gap-6 px-6 py-12 transition-colors sm:px-10 lg:grid-cols-[13.75rem_1fr_auto] lg:gap-12 lg:px-16"
                        >
                            <div className="font-mono text-sm">
                                <p className="text-accent">{job.period}</p>
                                <p className="text-muted mt-2 flex items-center gap-2">
                                    <Briefcase
                                        className="size-3.5"
                                        aria-hidden
                                    />
                                    {String(i + 1).padStart(2, '0')} · work
                                </p>
                            </div>
                            <div>
                                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                                    {job.role}
                                </h2>
                                <p className="text-muted mt-1">
                                    {job.company} · {job.location}
                                </p>
                                <p className="mt-5 max-w-2xl leading-relaxed">
                                    {job.summary}
                                </p>
                                <StackTags stack={job.stack} className="mt-6" />
                            </div>
                            <span className="text-muted group-hover:text-accent flex items-center gap-2 self-start font-mono text-sm transition-colors">
                                details
                                <ArrowUpRight className="size-4" aria-hidden />
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </main>
    );
}
