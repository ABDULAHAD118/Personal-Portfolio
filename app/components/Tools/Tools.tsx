'use client';
import { techStack } from '@/app/lib/content';
import { motion } from 'motion/react';
import SectionHeading from '../ui/SectionHeading';
import { slideIn } from '@/app/lib/motion';
import TechSphere from './TechSphere';

const Tools = () => {
    return (
        <section
            id="tools"
            className="border-line scroll-mt-20 overflow-hidden border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                <div>
                    <SectionHeading
                        index="05"
                        label="stack"
                        title={
                            <>
                                Tools I{' '}
                                <span className="text-accent">reach for</span>.
                            </>
                        }
                    />
                    <p className="text-muted mt-6 max-w-md leading-relaxed">
                        Languages, frameworks, databases and the tooling I use
                        day to day to design, build and ship.
                    </p>
                    <p className="text-muted mt-8 hidden font-mono text-xs lg:block">
                        {'// drag the sphere to spin it'}
                    </p>
                    <ul className="sr-only">
                        {techStack.map((t) => (
                            <li key={t.name}>{t.name}</li>
                        ))}
                    </ul>
                </div>
                <motion.div
                    {...slideIn('right')}
                    className="mx-auto w-full max-w-[35rem]"
                >
                    <TechSphere items={techStack} />
                </motion.div>
            </div>
        </section>
    );
};

export default Tools;
