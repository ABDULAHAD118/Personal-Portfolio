import { experienceData } from '@/assets/assets';
import { motion } from 'motion/react';

const Experience = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full scroll-mt-20 overflow-hidden px-[12%] py-10"
            id="experience"
        >
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-Ovo mb-2 text-center text-lg"
            >
                My Professional Journey
            </motion.p>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-Ovo text-center text-5xl"
            >
                Experience
            </motion.h2>
            <div className="relative mx-auto mt-8 max-w-4xl space-y-5 md:space-y-8 md:before:absolute md:before:top-2 md:before:bottom-2 md:before:left-1/2 md:before:w-px md:before:bg-gray-300 dark:md:before:bg-white/30">
                {experienceData.map((experience, index) => (
                    <motion.div
                        key={`${experience.company}-${experience.role}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.7 + index * 0.15,
                        }}
                        className={`md:relative md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
                    >
                        <span
                            className={`bg-purple-600 absolute top-4 z-10 hidden h-3 w-3 rounded-full ring-4 ring-white dark:ring-darkBg md:block ${index % 2 === 0 ? '-right-1.5' : '-left-1.5'}`}
                        />
                        <motion.article
                            whileHover={{ y: -4 }}
                            className="group rounded-2xl border-l-4 border-l-purple-500 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-white/5 sm:p-5 md:border-l-0 md:rounded-2xl md:border-l-transparent hover:dark:border-purple-500/30 hover:dark:shadow-purple-500/5 dark:border dark:border-white/10 md:border-gray-200 md:dark:border-white/10"
                        >
                            <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-500/15 dark:text-purple-300 sm:px-3 sm:py-1">
                                    <svg
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {experience.period}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-white/60 sm:px-3 sm:py-1">
                                    <svg
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {experience.location}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300 sm:text-xl">
                                {experience.role}
                            </h3>
                            <p className="mt-1 text-sm font-medium text-gray-500 dark:text-white/50">
                                {experience.company}
                            </p>
                            <p className="mt-2.5 text-sm leading-6 text-gray-600 dark:text-white/70">
                                {experience.summary}
                            </p>
                            <ul className="mt-3 space-y-2">
                                {experience.highlights.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="flex gap-2.5 text-sm leading-6 text-gray-600 dark:text-white/70"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.article>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Experience;
