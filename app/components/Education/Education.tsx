'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { slideIn } from '@/app/lib/motion';
import {
    ArrowRight,
    ArrowUpRight,
    ChartLine,
    ClipboardList,
    GraduationCap,
    History,
    Languages,
    MapPin,
    MessagesSquare,
    Mic,
    Play,
    ScanLine,
    Sprout,
    Store,
    Volume2,
} from 'lucide-react';
import { siGithub } from 'simple-icons';
import TechIcon from '../ui/TechIcon';
import StackTags from '../ui/StackTags';
import DemoVideo from './DemoVideo';
import { educationData as edu } from '@/assets/assets';
import SectionHeading from '../ui/SectionHeading';

// Degree card plus the final year project. Used as a home section and on /education.
export default function Education({ page = false }: { page?: boolean }) {
    return (
        <section
            id="education"
            className={`border-line scroll-mt-20 overflow-x-clip px-6 sm:px-10 lg:px-16 ${
                page ? 'pb-20 sm:pb-28' : 'border-t py-24 sm:py-32'
            }`}
        >
            <div
                className={`grid gap-14 lg:gap-20 ${page ? '' : 'lg:grid-cols-[1fr_1.4fr]'}`}
            >
                {!page && (
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <SectionHeading
                            index="04"
                            label="education"
                            title={
                                <>
                                    Where I{' '}
                                    <span className="text-accent">studied</span>
                                    .
                                </>
                            }
                        />
                        <Link
                            href="/education"
                            className="text-muted hover:text-fg mt-8 inline-flex items-center gap-2 font-mono text-sm transition-colors"
                        >
                            details
                            <ArrowUpRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                )}

                <div className="grid gap-6">
                    <motion.article
                        {...slideIn('right')}
                        className="bg-panel border-line rounded-2xl border p-6 sm:p-8"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                            <span className="text-accent">{edu.period}</span>
                            <span className="text-muted flex items-center gap-1.5">
                                <MapPin className="size-3.5" aria-hidden />
                                {edu.location}
                            </span>
                        </div>
                        <div className="mt-6 flex items-start gap-4">
                            <span className="border-line text-accent grid size-12 shrink-0 place-items-center rounded-lg border">
                                <GraduationCap className="size-6" aria-hidden />
                            </span>
                            <div>
                                <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                                    {edu.degree}
                                </h3>
                                <p className="text-muted mt-1">{edu.school}</p>
                            </div>
                        </div>
                        <p className="mt-6 leading-relaxed">{edu.summary}</p>
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {edu.focus.map((f) => (
                                <li
                                    key={f}
                                    className="border-line rounded-md border px-2.5 py-1 font-mono text-xs"
                                >
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </motion.article>

                    <motion.article
                        {...slideIn('left')}
                        className="border-line rounded-2xl border border-dashed p-6 sm:p-8"
                    >
                        <p className="text-muted flex items-center gap-2 font-mono text-xs">
                            <Sprout
                                className="text-accent size-4"
                                aria-hidden
                            />
                            {edu.project.label.toLowerCase()}
                        </p>
                        <h3 className="font-heading mt-4 text-2xl font-semibold tracking-tight">
                            {edu.project.title}
                        </h3>
                        <p className="text-muted mt-2 leading-relaxed">
                            {edu.project.summary}
                        </p>
                        {!page && (
                            <Link
                                href="/education#demo"
                                className="hover:text-accent mt-4 inline-flex items-center gap-2 font-mono text-xs transition-colors"
                            >
                                <Play
                                    className="text-accent size-3.5"
                                    aria-hidden
                                />
                                watch the app demo
                            </Link>
                        )}
                        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                            {edu.project.highlights.map((h) => (
                                <li key={h} className="flex gap-3">
                                    <ArrowRight
                                        className="text-accent mt-[0.4em] size-4 shrink-0"
                                        aria-hidden
                                    />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </motion.article>

                    {page && <ProjectDetails />}
                </div>
            </div>
        </section>
    );
}

// Same order as educationData.project.features.
const featureIcons = [
    ScanLine,
    ClipboardList,
    History,
    MessagesSquare,
    Mic,
    Volume2,
    Store,
    ChartLine,
    MapPin,
    Languages,
];

// Full write-up of the final year project, only on /education.
function ProjectDetails() {
    const p = edu.project;
    return (
        <div className="mt-10 grid gap-16">
            <section className="grid items-start gap-10 md:grid-cols-[1fr_auto] lg:gap-16">
                <div>
                    <h2 className="text-muted font-mono text-sm">
                        <span className="text-accent">01</span> / overview
                    </h2>
                    <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed">
                        {p.overview.map((t) => (
                            <p key={t}>{t}</p>
                        ))}
                    </div>
                </div>
                <figure
                    id="demo"
                    className="mx-auto w-full max-w-[17rem] scroll-mt-28"
                >
                    <DemoVideo src={p.demo.video} poster={p.demo.poster} />
                    <figcaption className="text-muted mt-3 flex items-center justify-center gap-2 font-mono text-xs">
                        <Play className="text-accent size-3.5" aria-hidden />
                        app demo · 4:28
                    </figcaption>
                </figure>
            </section>

            <section>
                <h2 className="text-muted font-mono text-sm">
                    <span className="text-accent">02</span> / how it fits
                    together
                </h2>
                <ol className="mt-6 grid gap-4 md:grid-cols-3">
                    {p.parts.map((part, i) => (
                        <li
                            key={part.name}
                            className="bg-panel border-line flex flex-col rounded-2xl border p-6"
                        >
                            <span className="text-accent font-mono text-xs">
                                0{i + 1}
                            </span>
                            <h3 className="font-heading mt-3 text-xl font-semibold">
                                {part.name}
                            </h3>
                            <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">
                                {part.text}
                            </p>
                            <a
                                href={part.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-fg mt-5 inline-flex items-center gap-2 font-mono text-xs transition-colors"
                            >
                                <TechIcon
                                    icon={siGithub}
                                    className="size-3.5"
                                />
                                source
                                <ArrowUpRight
                                    className="size-3.5"
                                    aria-hidden
                                />
                            </a>
                        </li>
                    ))}
                </ol>
            </section>

            <section>
                <h2 className="text-muted font-mono text-sm">
                    <span className="text-accent">03</span> / features
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {p.features.map((f, i) => {
                        const Icon = featureIcons[i] ?? Sprout;
                        return (
                            <li
                                key={f.title}
                                className="border-line hover:border-accent flex gap-4 rounded-2xl border p-5 transition-colors"
                            >
                                <span className="border-line text-accent grid size-10 shrink-0 place-items-center rounded-lg border">
                                    <Icon className="size-5" aria-hidden />
                                </span>
                                <div>
                                    <h3 className="font-heading font-semibold">
                                        {f.title}
                                    </h3>
                                    <p className="text-muted mt-1.5 text-sm leading-relaxed">
                                        {f.text}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section>
                <h2 className="text-muted font-mono text-sm">
                    <span className="text-accent">04</span> / stack
                </h2>
                <StackTags stack={p.stack} className="mt-6" />
            </section>
        </div>
    );
}
