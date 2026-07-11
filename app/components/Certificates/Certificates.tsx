'use client';

import { certificateData } from '@/assets/assets';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

type Certificate = (typeof certificateData)[number];

const Certificates = () => {
    const [selectedCertificate, setSelectedCertificate] =
        useState<Certificate | null>(null);
    const [showAll, setShowAll] = useState(false);
    const visibleCertificates = showAll
        ? certificateData
        : certificateData.slice(0, 6);

    useEffect(() => {
        if (!selectedCertificate) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedCertificate(null);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [selectedCertificate]);

    return (
        <>
            <section
                id="certificates"
                className="w-full scroll-mt-20 px-[12%] py-16"
            >
                <ScrollReveal direction="up">
                    <p className="font-Ovo mb-2 text-center text-lg">
                        Verified Credentials
                    </p>
                    <h2 className="font-Ovo text-center text-5xl">
                        Certificates
                    </h2>
                    <p className="font-Ovo mx-auto mt-5 mb-12 max-w-2xl text-center">
                        Professional credentials and focused coursework that
                        support my full-stack, backend, database, and AI skills.
                    </p>
                </ScrollReveal>
                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {visibleCertificates.map((certificate, index) => (
                            <ScrollReveal
                                key={certificate.title}
                                direction={index % 2 === 0 ? 'left' : 'right'}
                                className="h-full"
                            >
                                <motion.button
                                    layout
                                    type="button"
                                    onClick={() =>
                                        setSelectedCertificate(certificate)
                                    }
                                    aria-label={`View ${certificate.title} certificate`}
                                    className="group h-full w-full cursor-pointer overflow-hidden rounded-xl border border-gray-300 bg-white text-left shadow-sm dark:border-white/20 dark:bg-white/5"
                                    whileHover={{ y: -8, scale: 1.01 }}
                                >
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <Image
                                    src={certificate.image}
                                    alt={`${certificate.title} issued by ${certificate.issuer}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                    {certificate.date}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold leading-6">
                                    {certificate.title}
                                </h3>
                                <div className="mt-3 flex items-end justify-between gap-4">
                                    <p className="text-sm text-gray-600 dark:text-white/70">
                                        {certificate.issuer}
                                    </p>
                                    <span className="shrink-0 text-sm font-medium transition group-hover:translate-x-1">
                                        View →
                                    </span>
                                </div>
                            </div>
                                </motion.button>
                            </ScrollReveal>
                        ))}
                    </AnimatePresence>
                </div>
                <ScrollReveal direction="up">
                    <motion.button
                        type="button"
                        onClick={() => setShowAll((current) => !current)}
                        className="hover:bg-lightHover dark:hover:bg-darkHover mx-auto mt-12 flex cursor-pointer items-center gap-2 rounded-full border border-gray-500 px-8 py-3 transition-colors dark:border-white/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        aria-expanded={showAll}
                    >
                        {showAll ? 'Show less' : 'View 6 more'}
                        <motion.span animate={{ rotate: showAll ? 180 : 0 }}>
                            ↓
                        </motion.span>
                    </motion.button>
                </ScrollReveal>
            </section>

            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedCertificate.title} certificate preview`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCertificate(null)}
                    >
                        <motion.div
                            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-darkTheme"
                            initial={{ scale: 0.92, y: 25 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.92, y: 25 }}
                            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-white/20">
                                <div>
                                    <h3 className="font-semibold">
                                        {selectedCertificate.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-white/65">
                                        {selectedCertificate.issuer}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCertificate(null)}
                                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-2xl leading-none transition hover:bg-gray-100 dark:border-white/30 dark:hover:bg-white/10"
                                    aria-label="Close certificate preview"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="relative min-h-0 flex-1 bg-gray-100 dark:bg-black/30">
                                <Image
                                    src={selectedCertificate.image}
                                    alt={`${selectedCertificate.title} full certificate`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="flex justify-end border-t border-gray-200 px-5 py-3 dark:border-white/20">
                                <a
                                    href={selectedCertificate.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full bg-black px-5 py-2 text-sm text-white transition hover:bg-black/75 dark:border dark:border-white/40 dark:bg-transparent"
                                >
                                    Open original credential
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
