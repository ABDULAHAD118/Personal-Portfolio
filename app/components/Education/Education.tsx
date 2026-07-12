import { motion } from 'motion/react';

const Education = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full scroll-mt-20 px-[12%] py-10"
            id="education"
        >
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-Ovo mb-2 text-center text-lg"
            >
                Academic Background
            </motion.p>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-Ovo text-center text-5xl"
            >
                Education
            </motion.h2>
            <motion.article
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="hover:bg-lightHover dark:hover:bg-darkHover mx-auto mt-8 max-w-3xl rounded-2xl border border-gray-300 bg-white/60 p-8 shadow-sm transition-colors dark:border-white/20 dark:bg-white/5 sm:p-10"
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
                            University of Engineering and Technology, Lahore
                        </p>
                    </div>
                    <span className="w-max rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800 dark:bg-purple-400/15 dark:text-purple-200">
                        Completed
                    </span>
                </div>
                <p className="mt-6 leading-7 text-gray-600 dark:text-white/70">
                    Built a strong foundation in software engineering, algorithms,
                    databases, web development, and problem solving, supported by
                    practical full-stack and AI-based projects.
                </p>
            </motion.article>
        </motion.div>
    );
};

export default Education;
