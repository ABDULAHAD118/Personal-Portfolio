'use client';

import { certificateData } from '@/assets/assets';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';

type Certificate = (typeof certificateData)[number];

function CertificateCard({
    certificate,
    onOpen,
    hidden,
}: {
    certificate: Certificate;
    onOpen: () => void;
    hidden?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onOpen}
            tabIndex={hidden ? -1 : undefined}
            aria-hidden={hidden || undefined}
            aria-label={hidden ? undefined : `View ${certificate.title} certificate`}
            className="group bg-panel border-line hover:border-accent w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-xl border text-left transition-colors sm:w-[320px]"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                    src={certificate.image}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-5">
                <p className="text-accent font-mono text-xs">{certificate.date}</p>
                <h3 className="mt-2 line-clamp-2 min-h-12 leading-6 font-semibold">
                    {certificate.title}
                </h3>
                <p className="text-muted mt-2 text-sm">{certificate.issuer}</p>
            </div>
        </button>
    );
}

const Certificates = () => {
    const [selected, setSelected] = useState<Certificate | null>(null);

    useEffect(() => {
        if (!selected) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelected(null);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [selected]);

    return (
        <>
            <section
                id="certificates"
                className="border-line scroll-mt-20 overflow-hidden border-t py-24 sm:py-32"
            >
                <div className="flex flex-wrap items-end justify-between gap-6 px-6 sm:px-10 lg:px-16">
                    <SectionHeading
                        index="06"
                        label="certificates"
                        title={
                            <>
                                Always <span className="text-accent">learning</span>.
                            </>
                        }
                    />
                    <p className="text-muted font-mono text-xs">
                        {certificateData.length} credentials · click to view
                    </p>
                </div>

                {/* Auto-scrolling strip: the list is rendered twice so the loop is seamless; the copy is hidden from assistive tech. Pauses on hover/focus; scrolls by hand when motion is reduced. */}
                <div className="mt-14 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
                    <div className="hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] flex w-max gap-5 pr-5 motion-safe:animate-marquee">
                        {certificateData.map((c) => (
                            <CertificateCard key={c.title} certificate={c} onOpen={() => setSelected(c)} />
                        ))}
                        {certificateData.map((c) => (
                            <CertificateCard key={`${c.title}-copy`} certificate={c} onOpen={() => setSelected(c)} hidden />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selected.title} certificate preview`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            className="bg-panel border-line relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border shadow-2xl"
                            initial={{ scale: 0.92, y: 25 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.92, y: 25 }}
                            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="border-line flex items-center justify-between gap-4 border-b px-5 py-4">
                                <div>
                                    <h3 className="font-semibold">{selected.title}</h3>
                                    <p className="text-muted text-sm">{selected.issuer}</p>
                                </div>
                                <button
                                    type="button"
                                    autoFocus
                                    onClick={() => setSelected(null)}
                                    className="border-line hover:border-accent flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border text-2xl leading-none transition-colors"
                                    aria-label="Close certificate preview"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="relative min-h-0 flex-1 bg-black/30">
                                <Image
                                    src={selected.image}
                                    alt={`${selected.title} issued by ${selected.issuer}`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="border-line flex justify-end border-t px-5 py-3">
                                <a
                                    href={selected.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-accent text-on-accent rounded-md px-5 py-2 font-mono text-sm transition-opacity hover:opacity-85"
                                >
                                    open original ↗
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Certificates;
