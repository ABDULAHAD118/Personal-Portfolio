import { experienceData } from '@/assets/assets';
import { motion } from 'motion/react';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const Experience = () => {
    return (
        <section
            id="experience"
            className="w-full scroll-mt-20 px-[12%] py-16"
        >
            <ScrollReveal direction="up">
                <p className="font-Ovo mb-2 text-center text-lg">
                    My Professional Journey
                </p>
                <h2 className="font-Ovo text-center text-5xl">Experience</h2>
            </ScrollReveal>
            <div className="relative mx-auto mt-14 max-w-4xl before:absolute before:top-2 before:bottom-2 before:left-3 before:w-px before:bg-gray-300 md:before:left-1/2 dark:before:bg-white/30">
                {experienceData.map((experience, index) => (
                    <ScrollReveal
                        key={`${experience.company}-${experience.role}`}
                        direction={index % 2 === 0 ? 'left' : 'right'}
                        className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${index % 2 === 0 ? 'md:pr-10' : 'md:ml-auto md:pl-10'}`}
                    >
                        <span
                            className={`bg-darkHover absolute top-2 z-10 h-3 w-3 rounded-full ring-4 ring-white dark:ring-white ${index % 2 === 0 ? 'left-1.75 md:right-[-6px] md:left-auto' : 'left-1.75 md:left-[-6px]'}`}
                        />
                        <motion.article
                            whileHover={{ y: -6 }}
                            className="hover:bg-lightHover dark:hover:bg-darkHover rounded-xl border border-gray-300 bg-white/60 p-6 shadow-sm transition-colors dark:border-white/20 dark:bg-white/5"
                        >
                            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                {experience.period}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold">
                                {experience.role}
                            </h3>
                            <p className="font-medium text-gray-700 dark:text-white/90">
                                {experience.company}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white/60">
                                {experience.location}
                            </p>
                            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-white/75">
                                {experience.summary}
                            </p>
                            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-600 dark:text-white/75">
                                {experience.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-700 dark:bg-purple-300" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default Experience;
