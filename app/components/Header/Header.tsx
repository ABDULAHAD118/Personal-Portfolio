'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { professionalStats } from '@/assets/assets';
import { heroStack } from '@/app/lib/content';

// three.js is heavy and browser-only: load it after the page, never on the server.
const HeroScene = dynamic(() => import('../three/HeroScene'), { ssr: false });

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function TypedWord({ words }: { words: string[] }) {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [length, setLength] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const word = words[index];

    useEffect(() => {
        if (reduceMotion) return;
        const done = !deleting && length === word.length;
        const empty = deleting && length === 0;
        const timer = setTimeout(
            () => {
                if (done) setDeleting(true);
                else if (empty) {
                    setDeleting(false);
                    setIndex((i) => (i + 1) % words.length);
                } else setLength((l) => l + (deleting ? -1 : 1));
            },
            done ? 1600 : deleting ? 40 : 90,
        );
        return () => clearTimeout(timer);
    }, [length, deleting, word, words.length, reduceMotion]);

    return (
        <span className="text-glow">
            {reduceMotion ? words[0] : word.slice(0, length)}
            <span className="bg-accent ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse align-middle" />
        </span>
    );
}

const Header = () => {
    const reduceMotion = useReducedMotion();
    const sceneRef = useRef<HTMLDivElement>(null);
    const sceneVisible = useInView(sceneRef);

    return (
        <header
            id="top"
            className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-16"
        >
            {/* Glow behind the scene: also the fallback when 3D is off or still loading. */}
            <div
                aria-hidden
                className="from-accent/40 via-glow/10 absolute top-1/2 right-[-10%] -z-10 size-[min(90vw,720px)] -translate-y-1/2 rounded-full bg-radial to-transparent to-70% blur-2xl"
            />
            <div
                ref={sceneRef}
                aria-hidden
                className="absolute inset-0 -z-10 opacity-40 md:left-[45%] md:opacity-100"
            >
                {!reduceMotion && <HeroScene active={sceneVisible} />}
            </div>

            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="max-w-2xl">
                    <motion.p
                        {...fadeUp(0.1)}
                        className="text-muted flex items-center gap-2 font-mono text-xs sm:text-sm"
                    >
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>
                        Available for work · Lahore, PK
                    </motion.p>

                    <motion.h1
                        {...fadeUp(0.2)}
                        className="font-heading mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-7xl lg:text-8xl"
                    >
                        Abdulahad
                        <br />
                        <span className="from-accent to-glow bg-gradient-to-r bg-clip-text text-transparent">
                            Hussain.
                        </span>
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.35)}
                        className="mt-6 font-mono text-sm sm:text-lg"
                    >
                        <span className="text-accent">{'>'}</span> Full Stack
                        Engineer building with <TypedWord words={heroStack} />
                    </motion.p>

                    <motion.p
                        {...fadeUp(0.45)}
                        className="text-muted mt-5 max-w-xl text-base sm:text-lg"
                    >
                        I build scalable, high-performance web applications, from
                        clean interfaces to the APIs and cloud backends behind
                        them.
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.55)}
                        className="mt-9 flex flex-wrap gap-3"
                    >
                        <a
                            href="#contact"
                            className="bg-accent rounded-full px-7 py-3 text-sm font-medium text-white shadow-[0_0_32px_-6px_var(--color-accent)] transition-transform hover:-translate-y-0.5"
                        >
                            Let&apos;s work together →
                        </a>
                        <a
                            href="/Abdulahad-Hussain-Resume.pdf"
                            download
                            className="border-line hover:border-accent bg-panel/40 rounded-full border px-7 py-3 text-sm font-medium backdrop-blur transition-colors"
                        >
                            Download resume ↓
                        </a>
                    </motion.div>
                </div>

                <motion.dl
                    {...fadeUp(0.7)}
                    className="border-line mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4"
                >
                    {professionalStats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse">
                            <dt className="text-muted text-xs leading-5">
                                {stat.label}
                            </dt>
                            <dd className="font-heading text-3xl font-semibold">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </motion.dl>
            </div>
        </header>
    );
};

export default Header;
