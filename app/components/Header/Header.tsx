'use client';
import Image from 'next/image';
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'motion/react';
import portrait from '@/assets/portrait.jpg';
import { professionalStats } from '@/assets/assets';
import { siteConfig } from '@/app/lib/site-config';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// Photo card that tilts toward the cursor; the badge sits on a higher 3D layer so it moves with depth.
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
                <div className="border-line relative aspect-[4/5] overflow-hidden rounded-[28px] border">
                    <Image
                        src={portrait}
                        alt={`${siteConfig.name}, ${siteConfig.role}`}
                        placeholder="blur"
                        priority
                        sizes="(min-width: 1024px) 420px, 90vw"
                        className="size-full object-cover"
                    />
                </div>
                <div
                    style={{ transform: 'translateZ(60px)' }}
                    className="bg-panel/90 border-line absolute -bottom-5 -left-4 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur"
                >
                    <p className="text-muted font-mono text-[11px] leading-4">
                        currently at
                    </p>
                    <p className="text-sm leading-5 font-medium">
                        {siteConfig.company.name}
                    </p>
                </div>
                <div
                    style={{ transform: 'translateZ(40px)' }}
                    className="bg-fg text-bg absolute top-4 right-4 rounded-full px-3 py-1.5 font-mono text-[11px]"
                >
                    {siteConfig.location.locality}, PK
                </div>
            </motion.div>
        </div>
    );
}

const Header = () => {
    return (
        <header
            id="top"
            className="flex min-h-svh items-center pt-28 pb-20"
        >
            <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_400px] lg:gap-20">
                <div>
                    <motion.p
                        {...fadeUp(0.1)}
                        className="text-muted font-mono text-xs sm:text-sm"
                    >
                        {siteConfig.role}
                    </motion.p>

                    <motion.h1
                        {...fadeUp(0.2)}
                        className="font-heading mt-4 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl"
                    >
                        Abdulahad
                        <br />
                        Hussain<span className="text-accent">.</span>
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.3)}
                        className="text-muted mt-6 max-w-lg text-lg leading-relaxed"
                    >
                        I build web apps end to end, from the interface people
                        click on to the APIs and databases behind it. Mostly
                        React, Next.js, Vue and Node.js.
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.4)}
                        className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
                    >
                        <a
                            href="#contact"
                            className="bg-fg text-bg rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
                        >
                            Get in touch
                        </a>
                        <a
                            href="/Abdulahad-Hussain-Resume.pdf"
                            download
                            className="decoration-line hover:decoration-fg text-sm font-medium underline underline-offset-4 transition-colors"
                        >
                            Download resume
                        </a>
                    </motion.div>

                    <motion.dl
                        {...fadeUp(0.5)}
                        className="border-line mt-14 grid max-w-xl grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4"
                    >
                        {professionalStats.map((stat) => (
                            <div key={stat.label} className="flex flex-col-reverse">
                                <dt className="text-muted text-xs leading-5">
                                    {stat.label}
                                </dt>
                                <dd className="font-heading text-2xl font-semibold">
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
                    className="mx-auto w-full max-w-[280px] sm:max-w-[340px] max-lg:order-first lg:max-w-none"
                >
                    <PortraitCard />
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
