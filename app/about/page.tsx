import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowUpRight,
    CodeXml,
    Download,
    FolderGit2,
    GraduationCap,
} from 'lucide-react';
import { infoList, professionalStats } from '@/assets/assets';
import portrait from '@/assets/portrait.jpg';
import PageHeader from '../components/ui/PageHeader';
import Tools from '../components/Tools/Tools';

export const metadata: Metadata = {
    title: 'About',
    description:
        'About Abdulahad Hussain, a full stack software engineer in Lahore, Pakistan working across frontend, backend, databases and deployment.',
    alternates: { canonical: '/about' },
};

const infoIcons = [CodeXml, GraduationCap, FolderGit2];

export default function AboutPage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'about' }]}
                title={
                    <>
                        I like owning the{' '}
                        <span className="text-accent">whole stack</span>.
                    </>
                }
            />

            <section className="border-line grid gap-14 border-t px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[minmax(280px,400px)_1fr] lg:gap-20 lg:px-16">
                <div className="border-line bg-panel mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl border lg:sticky lg:top-28 lg:self-start">
                    <Image
                        src={portrait}
                        alt="Portrait of Abdulahad Hussain"
                        sizes="(min-width: 1024px) 400px, 90vw"
                        placeholder="blur"
                        className="aspect-[4/5] w-full object-cover"
                        priority
                    />
                    <p className="text-muted border-line border-t px-4 py-3 font-mono text-xs">
                        <span className="text-accent">●</span> Lahore, Pakistan
                    </p>
                </div>

                <div>
                    <div className="space-y-5 text-lg leading-relaxed sm:text-xl">
                        <p>
                            I&apos;m a full stack software engineer based in
                            Lahore, Pakistan, working across frontend, backend,
                            databases and deployment.
                        </p>
                        <p className="text-muted">
                            I build responsive interfaces, RESTful APIs,
                            authentication systems and production-ready
                            applications with a focus on performance and
                            scalability. At BitLogicx that has meant 15+ REST
                            APIs, a 30% improvement in API performance, and
                            deployment workflows that cut delivery time by 40%.
                        </p>
                        <p className="text-muted">
                            I studied Computer Science at UET Lahore and started
                            out as a frontend intern, where I finished first
                            among the participants. Since then I&apos;ve moved
                            down the stack into APIs, databases and DevOps, and
                            I enjoy being the person who can take a feature from
                            the database to the pixel.
                        </p>
                    </div>

                    <dl className="border-line mt-12 grid grid-cols-2 border-t border-l sm:grid-cols-4">
                        {professionalStats.map((s) => (
                            <div
                                key={s.label}
                                className="border-line flex flex-col border-r border-b p-5"
                            >
                                <dt className="text-muted text-xs leading-snug">
                                    {s.label}
                                </dt>
                                <dd className="font-heading text-accent order-first text-4xl font-bold">
                                    {s.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <dl className="border-line mt-12 border-t font-mono text-sm">
                        {infoList.map((item, i) => {
                            const Icon = infoIcons[i];
                            return (
                                <div
                                    key={item.title}
                                    className="border-line grid gap-1 border-b py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
                                >
                                    <dt className="text-accent flex items-center gap-2">
                                        {Icon && (
                                            <Icon
                                                className="size-4"
                                                aria-hidden
                                            />
                                        )}
                                        {item.title.toLowerCase()}
                                    </dt>
                                    <dd className="text-muted">
                                        {item.description}
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>

                    <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
                        <a
                            href="/Abdulahad-Hussain-Resume.pdf"
                            className="bg-accent text-on-accent flex items-center gap-2 rounded-md px-4 py-2 transition-opacity hover:opacity-90"
                        >
                            resume.pdf
                            <Download className="size-4" aria-hidden />
                        </a>
                        <Link
                            href="/experience"
                            className="border-line hover:border-accent flex items-center gap-2 rounded-md border px-4 py-2 transition-colors"
                        >
                            experience
                            <ArrowUpRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            <Tools />
        </main>
    );
}
