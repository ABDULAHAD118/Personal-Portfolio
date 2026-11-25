'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { certificateData } from '@/assets/assets';

type Certificate = (typeof certificateData)[number];

// Dates read like "June - September 2025"; the last month and year is when it was earned.
const earned = (c: Certificate) => {
    const m = c.date.match(/([A-Za-z]+)\s+(\d{4})$/);
    return m ? new Date(`${m[1]} 1, ${m[2]}`).getTime() : 0;
};

// A stable fake commit hash per certificate, purely decorative.
const hash = (s: string) => {
    let h = 5381;
    for (const ch of s) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
    return h.toString(16).padStart(7, '0').slice(0, 7);
};

const log = [...certificateData].sort((a, b) => earned(b) - earned(a));

export default function CertificateLog() {
    const [active, setActive] = useState(0);
    const previewRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const cert = log[active];

    const select = (i: number, scroll = false) => {
        setActive(i);
        // On narrow screens the preview sits above the list, so bring it into view after a tap.
        if (scroll && window.matchMedia('(max-width: 1023px)').matches) {
            previewRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="bg-panel border-line overflow-hidden rounded-2xl border lg:order-first">
                <div className="border-line text-muted flex items-center justify-between gap-4 border-b px-4 py-3 font-mono text-xs">
                    <span>
                        <span className="text-accent">$</span> git log
                        --credentials
                    </span>
                    <span>{log.length} commits</span>
                </div>
                <ol className="py-2 font-mono text-[13px]">
                    {log.map((c, i) => {
                        const selected = i === active;
                        return (
                            <li key={c.title}>
                                <button
                                    type="button"
                                    onClick={() => select(i, true)}
                                    onMouseEnter={() => select(i)}
                                    onFocus={() => select(i)}
                                    aria-pressed={selected}
                                    className={`relative grid w-full cursor-pointer items-baseline grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-2.5 text-left transition-colors sm:grid-cols-[auto_1fr_auto] ${
                                        selected ? 'bg-bg' : 'hover:bg-bg/60'
                                    }`}
                                >
                                    <span
                                        aria-hidden
                                        className={`bg-accent absolute inset-y-1 left-0 w-0.5 rounded-full transition-opacity ${
                                            selected
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    />
                                    <span className="text-accent">
                                        {hash(c.title)}
                                    </span>
                                    <span
                                        className={`min-w-0 ${selected ? 'text-fg' : 'text-muted'}`}
                                    >
                                        {i === 0 && (
                                            <span className="mr-2 text-emerald-600 dark:text-emerald-400">
                                                (HEAD)
                                            </span>
                                        )}
                                        {c.title}
                                    </span>
                                    <span className="text-muted col-start-2 text-[11px] sm:col-start-3 sm:text-xs">
                                        {c.date.replace(/^.*-\s*/, '')}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>

            <div
                ref={previewRef}
                className="max-lg:order-first lg:sticky lg:top-28 lg:self-start"
            >
                <div className="relative [perspective:1400px]">
                    {/* Two offset sheets behind the preview make it read as a stack of certificates. */}
                    <div
                        aria-hidden
                        className="bg-panel border-line absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-2xl border opacity-60"
                    />
                    <div
                        aria-hidden
                        className="bg-panel border-line absolute inset-0 translate-x-2 translate-y-2 rotate-1 rounded-2xl border opacity-80"
                    />
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.a
                            key={cert.title}
                            href={cert.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${cert.title} certificate`}
                            initial={
                                reduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, rotateY: -18, x: 40 }
                            }
                            animate={{ opacity: 1, rotateY: 0, x: 0 }}
                            exit={
                                reduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, rotateY: 18, x: -40 }
                            }
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group border-line relative block aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]"
                        >
                            <Image
                                src={cert.image}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 40vw, 90vw"
                                className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        </motion.a>
                    </AnimatePresence>
                </div>
                <div className="mt-8" aria-live="polite">
                    <p className="text-accent font-mono text-xs">
                        {hash(cert.title)} · {cert.date}
                    </p>
                    <h3 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                        {cert.title}
                    </h3>
                    <p className="text-muted mt-1 text-sm">{cert.issuer}</p>
                    <a
                        href={cert.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accent mt-4 inline-flex items-center gap-2 font-mono text-sm transition-colors"
                    >
                        open certificate
                        <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                </div>
            </div>
        </div>
    );
}
