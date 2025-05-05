import { assets, workData } from '@/assets/assets';
import Image from 'next/image';
import { motion } from 'motion/react';

const Work = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 1,
            }}
            className="w-full scroll-mt-20 px-[12%] py-10"
            id="work"
        >
            <motion.h4
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.3,
                }}
                className="font-Ovo mb-2 text-center text-lg"
            >
                My Portfolio
            </motion.h4>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                }}
                className="font-Ovo text-center text-5xl"
            >
                My Latest Work
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.7,
                }}
                className="font-Ovo mx-auto mt-5 mb-12 max-w-2xl text-center"
            >
                Welcome to my web development portfolio! Explore a collection of
                projects showcasing my expertise in full stack development.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.9,
                }}
                className="grid-cols-auto my-10 grid gap-5 dark:text-black"
            >
                {workData.map((project, index) => (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="group relative aspect-square cursor-pointer rounded-lg bg-cover bg-center bg-no-repeat"
                        key={index}
                        style={{ backgroundImage: `url(${project.bgImage})` }}
                    >
                        <div className="absolute bottom-5 left-1/2 flex w-10/12 -translate-x-1/2 items-center justify-between rounded-md bg-white px-5 py-3 duration-500 group-hover:bottom-7">
                            <div>
                                <h2 className="font-semibold">
                                    {project.title}
                                </h2>
                                <p className="text-sm text-gray-700">
                                    {project.description}
                                </p>
                            </div>
                            <a
                                href={project.url}
                                target="_blank"
                                className="flex aspect-square w-9 items-center justify-center rounded-full border border-black shadow-[2px_2px_0_#000] transition group-hover:bg-lime-300"
                            >
                                <Image
                                    src={assets.send_icon}
                                    alt="Send Icon"
                                    className="w-5"
                                />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 1.1,
                }}
                href="https://github.com/ABDULAHAD118"
                target="_blank"
                className="hover:bg-lightHover dark:hover:bg-darkHover mx-auto my-20 flex w-max items-center justify-center gap-2 rounded-full border-[0.5px] border-gray-700 px-10 py-3 text-gray-700 duration-500 dark:border-white dark:text-white"
            >
                Visit Other Project{' '}
                <Image
                    src={
                        isDarkMode
                            ? assets.right_arrow_bold_dark
                            : assets.right_arrow_bold
                    }
                    alt="Send Icon"
                    className="w-4"
                />
            </motion.a>
        </motion.div>
    );
};

export default Work;
