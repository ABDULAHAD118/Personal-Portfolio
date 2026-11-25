'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experienceData } from '@/assets/assets';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { slideIn } from '@/app/lib/motion';

const entries = experienceData.map((e) => ({
    href: `/experience/${e.slug}`,
    period: e.period,
    title: e.role,
    org: `${e.company} · ${e.location}`,
    summary: e.summary,
    highlights: e.highlights,
}));

const Experience = () => {
    const listRef = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ['start 75%', 'end 60%'],
    });
    // The line fills in as you scroll through the timeline.
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

    return (
        <section
            id="experience"
            className="border-line scroll-mt-20 overflow-x-clip border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <SectionHeading
                        index="03"
                        label="experience"
                        title={
                            <>
                                Where I&apos;ve{' '}
                                <span className="text-accent">worked</span>.
                            </>
                        }
                    />
                </div>

                <ol ref={listRef} className="relative">
                    <div
                        aria-hidden
                        className="bg-line absolute top-2 bottom-2 left-[5px] w-px"
                    />
                    <motion.div
                        aria-hidden
                        style={{ scaleY: fill }}
                        className="bg-accent absolute top-2 bottom-2 left-[5px] w-px origin-top"
                    />

                    {entries.map((entry) => (
                        <motion.li
                            key={entry.title}
                            {...slideIn('right')}
                            className="relative scroll-mt-28 pb-14 pl-10 last:pb-0"
                        >
                            <span
                                aria-hidden
                                className="border-accent bg-bg absolute top-1.5 left-0 size-[11px] rounded-full border-2"
                            />
                            <p className="flex flex-wrap items-center gap-3 font-mono text-xs">
                                <span className="text-accent">
                                    {entry.period}
                                </span>
                            </p>
                            <h3 className="font-heading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                                {entry.title}
                            </h3>
                            <p className="text-muted mt-1 text-sm">
                                {entry.org}
                            </p>
                            <p className="mt-4 leading-relaxed">
                                {entry.summary}
                            </p>
                            {entry.highlights.length > 0 && (
                                <ul className="text-muted mt-4 space-y-2 text-sm leading-relaxed">
                                    {entry.highlights.map((h) => (
                                        <li key={h} className="flex gap-3">
                                            <span className="text-accent font-mono">
                                                →
                                            </span>
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Link
                                href={entry.href}
                                className="hover:text-accent mt-5 inline-flex items-center gap-2 font-mono text-sm transition-colors"
                            >
                                details
                                <ArrowUpRight className="size-4" aria-hidden />
                            </Link>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Experience;
