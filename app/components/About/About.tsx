'use client';
import { motion } from 'motion/react';
import { infoList } from '@/assets/assets';
import Link from 'next/link';
import { ArrowUpRight, CodeXml, FolderGit2, GraduationCap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const infoIcons = [CodeXml, GraduationCap, FolderGit2];

const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const About = () => {
    return (
        <section
            id="about"
            className="border-line scroll-mt-20 border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                <SectionHeading
                    index="01"
                    label="about"
                    title={
                        <>
                            I like owning
                            <br />
                            the <span className="text-accent">whole stack</span>
                            .
                        </>
                    }
                />

                <div>
                    <motion.p
                        {...reveal(0.1)}
                        className="text-lg leading-relaxed sm:text-xl"
                    >
                        I&apos;m a full stack software engineer based in Lahore,
                        Pakistan, working across frontend, backend, databases
                        and deployment.
                    </motion.p>
                    <motion.p
                        {...reveal(0.2)}
                        className="text-muted mt-5 leading-relaxed"
                    >
                        I build responsive interfaces, RESTful APIs,
                        authentication systems and production-ready applications
                        with a focus on performance and scalability. At work
                        that has meant 15+ REST APIs, a 30% improvement in API
                        performance, and deployment workflows that cut delivery
                        time by 40%.
                    </motion.p>

                    <dl className="border-line mt-12 border-t font-mono text-sm">
                        {infoList.map((item, i) => {
                            const Icon = infoIcons[i];
                            return (
                                <motion.div
                                    key={item.title}
                                    {...reveal(0.25 + i * 0.08)}
                                    className="border-line grid gap-1 border-b py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
                                >
                                    <dt className="text-accent flex items-center gap-2">
                                        {Icon && (
                                            <Icon
                                                className="size-4"
                                                aria-hidden
                                            />
                                        )}
                                        {item.title.toLowerCase()}
                                    </dt>
                                    <dd className="text-muted">
                                        {item.description}
                                    </dd>
                                </motion.div>
                            );
                        })}
                    </dl>
                    <Link
                        href="/about"
                        className="hover:text-accent mt-8 inline-flex items-center gap-2 font-mono text-sm transition-colors"
                    >
                        more about me
                        <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default About;
