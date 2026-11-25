'use client';
import { useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { certificateData } from '@/assets/assets';

type Certificate = (typeof certificateData)[number];

// Dates read like "June - September 2025"; the last month and year is when it was earned.
const earned = (c: Certificate) => {
    const m = c.date.match(/([A-Za-z]+)\s+(\d{4})$/);
    return m ? new Date(`${m[1]} 1, ${m[2]}`).getTime() : 0;
};
const certs = [...certificateData].sort((a, b) => earned(b) - earned(a));
const years = certs.map((c) => new Date(earned(c)).getFullYear()).filter(Boolean);
const pad = (n: number) => String(n).padStart(2, '0');
// Spread 0 is the title page + contents; spread k (1..n) is certificate k-1.
const LAST = certs.length;

const mdQuery = '(min-width: 768px)';
const subscribe = (cb: () => void) => {
    const mq = window.matchMedia(mdQuery);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
};
const useTwoPages = () =>
    useSyncExternalStore(subscribe, () => window.matchMedia(mdQuery).matches, () => true);

type Flip = { to: number; dir: 1 | -1 };

export default function CertificateBook() {
    const twoPages = useTwoPages();
    const reduceMotion = useReducedMotion();
    const [spread, setSpread] = useState(0);
    const [flip, setFlip] = useState<Flip | null>(null);
    const touchX = useRef<number | null>(null);

    const goTo = (to: number) => {
        if (flip || to === spread || to < 0 || to > LAST) return;
        if (reduceMotion) setSpread(to);
        else setFlip({ to, dir: to > spread ? 1 : -1 });
    };
    const finish = () => {
        if (!flip) return;
        setSpread(flip.to);
        setFlip(null);
    };

    // What sits underneath the turning leaf.
    const baseLeft = flip && flip.dir === -1 ? flip.to : spread;
    const baseRight = flip && flip.dir === 1 ? flip.to : spread;
    const current = flip ? flip.to : spread;

    const left = (s: number) => (s === 0 ? <TitlePage /> : <DetailsPage index={s - 1} />);
    const right = (s: number) => (s === 0 ? <ContentsPage onOpen={goTo} /> : <ImagePage index={s - 1} />);
    const single = (s: number) => (s === 0 ? <ContentsPage onOpen={goTo} withTitle /> : <SinglePage index={s - 1} />);

    return (
        <div>
            <div
                role="region"
                aria-roledescription="book"
                aria-label="Certificates book. Use the left and right arrow keys to turn pages."
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') goTo(spread + 1);
                    if (e.key === 'ArrowLeft') goTo(spread - 1);
                }}
                onPointerDown={(e) => {
                    if (e.pointerType !== 'mouse') touchX.current = e.clientX;
                }}
                onPointerUp={(e) => {
                    if (touchX.current === null) return;
                    const dx = e.clientX - touchX.current;
                    touchX.current = null;
                    if (Math.abs(dx) > 50) goTo(spread + (dx < 0 ? 1 : -1));
                }}
                className="focus-visible:outline-accent mx-auto max-w-5xl rounded-[20px] outline-offset-4 focus-visible:outline-2"
            >
                {/* Leather cover with stitching */}
                <div className="rounded-[20px] bg-[#2b1d14] p-2.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] sm:p-3.5">
                    <div className="rounded-[14px] border border-dashed border-[#c98a5a]/40 p-1.5 sm:p-2">
                        <div
                            className={`relative [perspective:2400px] ${
                                twoPages ? 'grid aspect-[16/10] grid-cols-2' : 'aspect-[3/4.4]'
                            }`}
                        >
                            {twoPages ? (
                                <>
                                    <Page side="left" onClick={() => goTo(spread - 1)} disabled={spread === 0}>
                                        {left(baseLeft)}
                                    </Page>
                                    <Page side="right" onClick={() => goTo(spread + 1)} disabled={spread === LAST}>
                                        {right(baseRight)}
                                    </Page>
                                    {flip && (
                                        <Leaf
                                            key={`${spread}-${flip.to}`}
                                            dir={flip.dir}
                                            half
                                            front={flip.dir === 1 ? right(spread) : left(spread)}
                                            back={flip.dir === 1 ? left(flip.to) : right(flip.to)}
                                            onDone={finish}
                                        />
                                    )}
                                    {/* spine */}
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-[linear-gradient(to_right,transparent,rgb(0_0_0/0.18)_45%,rgb(0_0_0/0.28)_50%,rgb(0_0_0/0.18)_55%,transparent)]"
                                    />
                                </>
                            ) : (
                                <>
                                    <Page side="single" onClick={() => goTo(spread + 1)} disabled={spread === LAST}>
                                        {single(flip && flip.dir === 1 ? flip.to : spread)}
                                    </Page>
                                    {flip && (
                                        <Leaf
                                            key={`${spread}-${flip.to}`}
                                            dir={flip.dir}
                                            front={single(flip.dir === 1 ? spread : flip.to)}
                                            onDone={finish}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mx-auto mt-8 flex max-w-5xl items-center justify-between gap-4 font-mono text-sm">
                <button
                    type="button"
                    onClick={() => goTo(spread - 1)}
                    disabled={spread === 0}
                    className="border-line hover:border-accent flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ArrowLeft className="size-4" aria-hidden />
                    <span className="max-sm:sr-only">prev</span>
                </button>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => goTo(0)}
                        disabled={spread === 0}
                        className="text-muted hover:text-fg flex cursor-pointer items-center gap-1.5 transition-colors disabled:cursor-default disabled:opacity-40"
                    >
                        <BookOpen className="size-4" aria-hidden />
                        contents
                    </button>
                    <span className="text-muted" aria-live="polite">
                        {current === 0 ? (
                            <span className="sr-only">Contents</span>
                        ) : (
                            <>
                                <span className="text-accent">{pad(current)}</span> / {pad(LAST)}
                                <span className="sr-only">: {certs[current - 1].title}</span>
                            </>
                        )}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => goTo(spread + 1)}
                    disabled={spread === LAST}
                    className="border-line hover:border-accent flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <span className="max-sm:sr-only">next</span>
                    <ArrowRight className="size-4" aria-hidden />
                </button>
            </div>
            {/* Warm the next certificate image so the turn doesn't reveal a blank page. */}
            {spread < LAST && (
                <div aria-hidden className="pointer-events-none fixed size-px overflow-hidden opacity-0">
                    <Image
                        src={certs[spread].image}
                        alt=""
                        fill
                        loading="eager"
                        sizes={twoPages ? '(min-width: 1024px) 460px, 45vw' : '90vw'}
                    />
                </div>
            )}
        </div>
    );
}

function Page({
    side,
    children,
    onClick,
    disabled,
}: {
    side: 'left' | 'right' | 'single';
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
}) {
    const radius = side === 'left' ? 'rounded-l-lg' : side === 'right' ? 'rounded-r-lg' : 'rounded-lg';
    return (
        <div
            onClick={(e) => {
                // Links and buttons inside a page do their own thing.
                if ((e.target as HTMLElement).closest('a,button')) return;
                if (!disabled) onClick();
            }}
            className={`group bg-panel relative h-full overflow-hidden ${radius} ${disabled ? '' : 'cursor-pointer'}`}
        >
            <PaperShade side={side} />
            {children}
            {!disabled && side !== 'left' && (
                // page curl in the corner, grows on hover
                <span
                    aria-hidden
                    className="absolute right-0 bottom-0 size-5 bg-[linear-gradient(315deg,#2b1d14_50%,color-mix(in_oklab,var(--color-panel),black_14%)_50%)] shadow-[-2px_-2px_6px_rgb(0_0_0/0.12)] transition-[width,height] duration-300 group-hover:size-9"
                />
            )}
        </div>
    );
}

// Darkening toward the spine so the two pages read as curved paper.
function PaperShade({ side }: { side: 'left' | 'right' | 'single' }) {
    const g =
        side === 'left'
            ? 'bg-[linear-gradient(to_left,rgb(0_0_0/0.10),transparent_14%)]'
            : side === 'right'
              ? 'bg-[linear-gradient(to_right,rgb(0_0_0/0.10),transparent_14%)]'
              : 'bg-[linear-gradient(to_right,rgb(0_0_0/0.08),transparent_8%)]';
    return <div aria-hidden className={`pointer-events-none absolute inset-0 ${g}`} />;
}

function Leaf({
    dir,
    half,
    front,
    back,
    onDone,
}: {
    dir: 1 | -1;
    half?: boolean;
    front: React.ReactNode;
    back?: React.ReactNode;
    onDone: () => void;
}) {
    // Two-page: forward turns the right page over the spine, backward turns the left page.
    // Single page: forward lifts the page off to the left, backward lays the previous one back down.
    const forward = dir === 1;
    const from = half ? 0 : forward ? 0 : -180;
    const to = half ? (forward ? -180 : 180) : forward ? -180 : 0;
    const position = half ? (forward ? 'left-1/2 w-1/2' : 'left-0 w-1/2') : 'inset-x-0';
    const origin = half ? (forward ? 'left center' : 'right center') : 'left center';
    const frontSide = half ? (forward ? 'right' : 'left') : 'single';
    const backSide = half ? (forward ? 'left' : 'right') : 'single';

    return (
        <motion.div
            initial={{ rotateY: from }}
            animate={{ rotateY: to }}
            transition={{ duration: 0.85, ease: [0.45, 0.05, 0.25, 1] }}
            onAnimationComplete={onDone}
            style={{ transformOrigin: origin, transformStyle: 'preserve-3d' }}
            className={`absolute inset-y-0 z-10 ${position}`}
        >
            <div className="bg-panel absolute inset-0 overflow-hidden rounded-lg [backface-visibility:hidden]">
                <PaperShade side={frontSide} />
                {front}
            </div>
            <div className="bg-panel absolute inset-0 overflow-hidden rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <PaperShade side={backSide} />
                {back}
            </div>
        </motion.div>
    );
}

function PageNumber({ n, align }: { n: number; align: 'left' | 'right' }) {
    return (
        <span
            className={`text-muted absolute bottom-4 font-mono text-[11px] sm:bottom-5 ${
                align === 'left' ? 'left-5 sm:left-7' : 'right-9 sm:right-11'
            }`}
        >
            {n}
        </span>
    );
}

function TitlePage() {
    return (
        <div className="flex h-full flex-col justify-between p-6 sm:p-10">
            <p className="text-accent font-mono text-xs">{'// credentials'}</p>
            <div>
                <h3 className="font-heading text-3xl leading-tight font-bold tracking-tight lg:text-5xl">
                    Certificates
                    <br />& Credentials
                </h3>
                <p className="text-muted mt-4 text-sm lg:text-base">Abdulahad Hussain</p>
            </div>
            <div className="border-line text-muted flex items-center justify-between border-t pt-4 font-mono text-xs">
                <span>
                    {certs.length} entries · {Math.min(...years)} to {Math.max(...years)}
                </span>
                <span className="text-accent">turn the page →</span>
            </div>
        </div>
    );
}

function ContentsPage({ onOpen, withTitle }: { onOpen: (spread: number) => void; withTitle?: boolean }) {
    return (
        <div className="flex h-full flex-col p-5 sm:p-8 lg:p-10">
            {withTitle && (
                <div className="mb-5">
                    <p className="text-accent font-mono text-xs">{'// credentials'}</p>
                    <h3 className="font-heading mt-2 text-2xl font-bold tracking-tight">Certificates & Credentials</h3>
                </div>
            )}
            <p className="text-muted font-mono text-xs tracking-widest uppercase">Contents</p>
            <ol className="mt-3 flex flex-1 flex-col justify-between lg:mt-4">
                {certs.map((c, i) => (
                    <li key={c.title}>
                        <button
                            type="button"
                            onClick={() => onOpen(i + 1)}
                            className="group/row hover:text-accent flex w-full cursor-pointer items-baseline gap-2 text-left text-[11px] leading-5 transition-colors lg:text-[13px] lg:leading-6"
                        >
                            <span className="text-accent font-mono">{pad(i + 1)}</span>
                            <span className="truncate">{c.title}</span>
                            <span
                                aria-hidden
                                className="border-line group-hover/row:border-accent mb-1 min-w-4 flex-1 border-b border-dotted"
                            />
                            <span className="text-muted font-mono">{(i + 1) * 2}</span>
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function DetailsPage({ index }: { index: number }) {
    const c = certs[index];
    return (
        <div className="relative flex h-full flex-col p-6 sm:p-10">
            <p className="text-muted font-mono text-xs">
                No. <span className="text-accent">{pad(index + 1)}</span> / {pad(certs.length)}
            </p>
            <div className="my-auto">
                <p className="text-accent font-mono text-xs">{c.date}</p>
                <h3 className="font-heading mt-3 text-2xl leading-tight font-bold tracking-tight lg:text-4xl">
                    {c.title}
                </h3>
                <p className="text-muted mt-3 lg:text-lg">{c.issuer}</p>
                <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent mt-6 inline-flex items-center gap-2 font-mono text-sm transition-colors"
                >
                    open original
                    <ArrowUpRight className="size-4" aria-hidden />
                </a>
            </div>
            {/* rubber stamp */}
            <div
                aria-hidden
                className="border-accent/60 text-accent/70 absolute right-8 bottom-12 grid size-20 rotate-[-14deg] place-items-center rounded-full border-2 border-double font-mono text-[10px] leading-tight tracking-widest uppercase lg:size-24"
            >
                <span className="text-center">
                    verified
                    <br />
                    {new Date(earned(c)).getFullYear()}
                </span>
            </div>
            <PageNumber n={(index + 1) * 2} align="left" />
        </div>
    );
}

function ImagePage({ index }: { index: number }) {
    const c = certs[index];
    return (
        <div className="relative flex h-full items-center justify-center p-6 sm:p-10">
            <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${c.title} certificate`}
                className="relative block w-full rotate-[0.6deg] bg-white p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] transition-transform hover:rotate-0"
            >
                <span className="relative block aspect-[1.414/1]">
                    <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 460px, 45vw" className="object-contain" />
                </span>
                {/* photo corners */}
                <span aria-hidden className="bg-accent/70 absolute -top-2 -left-3 h-4 w-10 -rotate-[30deg]" />
                <span aria-hidden className="bg-accent/70 absolute -right-3 -bottom-2 h-4 w-10 -rotate-[30deg]" />
            </a>
            <PageNumber n={(index + 1) * 2 + 1} align="right" />
        </div>
    );
}

function SinglePage({ index }: { index: number }) {
    const c = certs[index];
    return (
        <div className="relative flex h-full flex-col p-5">
            <p className="text-muted font-mono text-xs">
                No. <span className="text-accent">{pad(index + 1)}</span> / {pad(certs.length)}
            </p>
            <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${c.title} certificate`}
                className="relative mt-5 block bg-white p-1 shadow-[0_14px_30px_-14px_rgb(0_0_0/0.55)]"
            >
                <span className="relative block aspect-[1.414/1]">
                    <Image src={c.image} alt="" fill sizes="90vw" className="object-contain" />
                </span>
            </a>
            <p className="text-accent mt-6 font-mono text-xs">{c.date}</p>
            <h3 className="font-heading mt-2 text-xl leading-tight font-bold tracking-tight">{c.title}</h3>
            <p className="text-muted mt-1 text-sm">{c.issuer}</p>
            <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent mt-4 inline-flex items-center gap-2 font-mono text-sm"
            >
                open original
                <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <PageNumber n={index + 2} align="right" />
        </div>
    );
}
