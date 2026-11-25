'use client';
import { useRef } from 'react';
import Link from 'next/link';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from 'motion/react';
import { workData, type Project } from '@/assets/assets';
import { socials } from '@/app/lib/content';
import { ArrowUpRight } from 'lucide-react';
import TechIcon from '../ui/TechIcon';
import SectionHeading from '../ui/SectionHeading';
import ProjectCover from '../ui/ProjectCover';

// Client work leads on the home page.
const featured = workData
    .filter((p) => p.featured)
    .sort((a, b) => Number(a.kind !== 'client') - Number(b.kind !== 'client'));

function ProjectCard({
    project,
    index,
    total,
    progress,
}: {
    project: Project;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const reduceMotion = useReducedMotion();
    // Cards further back in the stack shrink a little as the next ones slide over them.
    const scale = useTransform(
        progress,
        [index / total, 1],
        [1, 1 - (total - 1 - index) * 0.04]
    );
    const number = String(index + 1).padStart(2, '0');

    return (
        <div
            className="sticky pb-10"
            style={{ top: `calc(6rem + ${index * 1.5}rem)` }}
        >
            <motion.article
                style={{ scale: reduceMotion ? 1 : scale }}
                className="bg-panel border-line origin-top overflow-hidden rounded-2xl border shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)]"
            >
                <div className="border-line text-muted flex items-center justify-between border-b px-5 py-3 font-mono text-xs">
                    <span>
                        <span className="text-accent">{number}</span> /{' '}
                        {String(total).padStart(2, '0')}
                    </span>
                    <span>{project.type.toLowerCase()}</span>
                </div>

                <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10">
                    <div>
                        <h3 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
                            {project.title}
                        </h3>
                        <p className="text-muted mt-4 leading-relaxed">
                            {project.summary}
                        </p>
                        <Link
                            href={`/work/${project.slug}`}
                            className="hover:text-accent mt-6 inline-flex items-center gap-2 font-mono text-sm transition-colors"
                        >
                            read case study
                            <ArrowUpRight className="size-4" aria-hidden />
                        </Link>
                    </div>

                    <Link
                        href={`/work/${project.slug}`}
                        aria-label={`${project.title} case study`}
                        className="border-line group block aspect-[16/10] overflow-hidden rounded-xl border"
                    >
                        <ProjectCover
                            project={project}
                            sizes="(min-width: 768px) 55vw, 90vw"
                        />
                    </Link>
                </div>
            </motion.article>
        </div>
    );
}

const Work = () => {
    const stackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: stackRef,
        offset: ['start start', 'end end'],
    });
    const github = socials.find((s) => s.label === 'GitHub')!;

    return (
        <section
            id="work"
            className="border-line scroll-mt-20 border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                    index="02"
                    label="work"
                    title={
                        <>
                            Things I&apos;ve{' '}
                            <span className="text-accent">shipped</span>.
                        </>
                    }
                />
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
                    <Link
                        href="/work"
                        className="hover:text-accent flex items-center gap-2 transition-colors"
                    >
                        all {workData.length} projects
                        <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                    <a
                        href={github.href}
                        target="_blank"
                        rel="me noreferrer"
                        className="text-muted hover:text-fg flex items-center gap-2 transition-colors"
                    >
                        <TechIcon icon={github.icon} className="size-4" />
                        github
                    </a>
                </div>
            </div>

            <div ref={stackRef} className="mt-16">
                {featured.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={i}
                        total={featured.length}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
};

export default Work;
