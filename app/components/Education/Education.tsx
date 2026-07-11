import ScrollReveal from '../ScrollReveal/ScrollReveal';
import { motion } from 'motion/react';

const Education = () => {
    return (
        <section
            id="education"
            className="w-full scroll-mt-20 px-[12%] py-16"
        >
            <ScrollReveal direction="up">
                <p className="font-Ovo mb-2 text-center text-lg">
                    Academic Background
                </p>
                <h2 className="font-Ovo text-center text-5xl">Education</h2>
            </ScrollReveal>
            <ScrollReveal direction="left" className="mx-auto max-w-3xl">
                <motion.article
                    className="hover:bg-lightHover dark:hover:bg-darkHover mt-12 rounded-2xl border border-gray-300 bg-white/60 p-8 shadow-sm transition-colors dark:border-white/20 dark:bg-white/5 sm:p-10"
                    whileHover={{ y: -6 }}
                >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-purple-700 uppercase dark:text-purple-300">
                                Degree completed
                            </p>
                            <h3 className="text-2xl font-semibold">
                                Bachelor of Science in Computer Science
                            </h3>
                            <p className="mt-2 text-lg text-gray-700 dark:text-white/85">
                                University of Engineering and Technology,
                                Lahore
                            </p>
                        </div>
                        <span className="w-max rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800 dark:bg-purple-400/15 dark:text-purple-200">
                            Completed
                        </span>
                    </div>
                    <p className="mt-6 leading-7 text-gray-600 dark:text-white/70">
                        Built a strong foundation in software engineering,
                        algorithms, databases, web development, and problem
                        solving, supported by practical full-stack and AI-based
                        projects.
                    </p>
                </motion.article>
            </ScrollReveal>
        </section>
    );
};

export default Education;
