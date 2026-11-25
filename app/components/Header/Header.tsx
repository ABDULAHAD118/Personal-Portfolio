'use client';
import Image from 'next/image';
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'motion/react';
import portrait from '@/assets/portrait.png';
import { professionalStats } from '@/assets/assets';
import { siteConfig } from '@/app/lib/site-config';
import { heroStack } from '@/app/lib/content';
import { ArrowUpRight, Download } from 'lucide-react';
import TechIcon from '../ui/TechIcon';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// Small editor-style card with the same facts the old tags showed.
function CodeCard() {
    const k = 'text-code-key';
    const str = 'text-code-string';
    return (
        <div className="bg-panel/95 border-line w-[15.625rem] overflow-hidden rounded-xl border font-mono text-[11px] leading-5 shadow-2xl backdrop-blur sm:w-[17.5rem] sm:text-xs">
            <div className="border-line text-muted flex items-center justify-between border-b px-3 py-1.5">
                <span>about.ts</span>
                <span className="text-accent">●</span>
            </div>
            <pre className="px-3 py-2.5">
                <span className="text-muted">const</span> me = {'{'}
                {'\n  '}
                <span className={k}>role</span>: <span className={str}>&quot;Full Stack&quot;</span>,
                {'\n  '}
                <span className={k}>company</span>: <span className={str}>&quot;{siteConfig.company.name}&quot;</span>,
                {'\n  '}
                <span className={k}>based</span>: <span className={str}>&quot;{siteConfig.location.locality}, PK&quot;</span>,
                {'\n  '}
                <span className={k}>openToWork</span>: <span className="text-accent">true</span>,
                {'\n'}
                {'};'}
            </pre>
        </div>
    );
}

// Photo card that tilts toward the cursor; the code card sits on a higher 3D layer so it moves with depth.
function PortraitCard() {
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const spring = { stiffness: 150, damping: 18 };
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), spring);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), spring);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            onPointerMove={onMove}
            onPointerLeave={reset}
            className="[perspective:1200px]"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative"
            >
                <div className="border-line bg-portrait relative aspect-[4/5] overflow-hidden rounded-2xl border">
                    <Image
                        src={portrait}
                        alt={`${siteConfig.name}, ${siteConfig.role}`}
                        placeholder="blur"
                        quality={90}
                        priority
                        sizes="(min-width: 1024px) 440px, 80vw"
                        className="size-full object-cover"
                    />
                </div>
                <div
                    style={{ transform: 'translateZ(70px)' }}
                    className="absolute -bottom-20 -left-4 sm:-bottom-10 sm:-left-16"
                >
                    <CodeCard />
                </div>
            </motion.div>
        </div>
    );
}

const Header = () => {
    return (
        <header
            className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-24 sm:px-10 lg:px-16"
        >
            <div
                aria-hidden
                className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]"
            />

            <div className="grid w-full items-center gap-28 sm:gap-20 lg:grid-cols-[1fr_minmax(21.25rem,27.5rem)] lg:gap-16">
                <div>
                    <motion.p
                        {...fadeUp(0.1)}
                        className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm"
                    >
                        <span>{'// full stack software engineer'}</span>
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-current" />
                            open to work
                        </span>
                    </motion.p>

                    <motion.h1
                        {...fadeUp(0.2)}
                        className="font-heading mt-5 text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] font-bold tracking-tight"
                    >
                        Abdulahad
                        <br />
                        Hussain
                        <span
                            aria-hidden
                            className="bg-accent ml-2 inline-block h-[0.75em] w-[0.38em] align-baseline motion-safe:animate-blink"
                        />
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.3)}
                        className="text-muted mt-7 max-w-xl text-lg leading-relaxed"
                    >
                        I design and build web apps end to end: the interface
                        people use, the APIs behind it, and the infrastructure
                        that keeps it fast.
                    </motion.p>

                    <motion.p
                        {...fadeUp(0.35)}
                        className="mt-5 flex flex-wrap gap-2 font-mono text-xs"
                    >
                        {heroStack.map((tech) => (
                            <span
                                key={tech.name}
                                className="border-line text-muted flex items-center gap-1.5 rounded-md border px-2 py-1"
                            >
                                <TechIcon icon={tech.icon} className="size-3.5" />
                                {tech.name}
                            </span>
                        ))}
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.45)}
                        className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
                    >
                        <a
                            href="#contact"
                            className="bg-accent text-on-accent flex items-center gap-2 rounded-md px-6 py-3 font-mono text-sm font-medium transition-opacity hover:opacity-85"
                        >
                            ./contact-me
                            <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                        <a
                            href="/Abdulahad-Hussain-Resume.pdf"
                            download
                            className="hover:text-accent flex items-center gap-2 font-mono text-sm transition-colors"
                        >
                            <Download className="size-4" aria-hidden />
                            resume.pdf
                        </a>
                    </motion.div>

                    <motion.dl
                        {...fadeUp(0.55)}
                        className="border-line mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4"
                    >
                        {professionalStats.map((stat) => (
                            <div key={stat.label} className="flex flex-col-reverse justify-end">
                                <dt className="text-muted font-mono text-[11px] leading-4">
                                    {stat.label}
                                </dt>
                                <dd className="font-heading text-3xl font-semibold">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto w-full max-w-[18.75rem] sm:max-w-[22.5rem] max-lg:order-first lg:max-w-none"
                >
                    <PortraitCard />
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
