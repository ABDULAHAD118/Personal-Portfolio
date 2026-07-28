import {
    assets,
    infoList,
} from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const About = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 1,
            }}
            className="w-full scroll-mt-20 px-[12%] py-10"
            id="about"
        >
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.3,
                }}
                className="font-Ovo mb-2 text-center text-lg text-purple-700 dark:text-purple-300"
            >
                Introduction
            </motion.p>
            <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                }}
                className="font-Ovo text-center text-5xl font-bold"
            >
                About me
            </motion.h2>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                }}
                className="my-14 flex w-full flex-col items-center gap-16 lg:flex-row"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="w-64 max-w-none rounded-3xl sm:w-80"
                >
                    <Image
                        src={assets.user_image}
                        alt="Abdulahad Hussain - Full Stack Software Engineer"
                        className="w-full rounded-3xl"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.8,
                    }}
                    className="flex-1"
                >
                    <p className="font-Ovo mb-10 max-w-2xl text-gray-700 dark:text-white/80">
                        I am a full-stack software engineer based in Lahore,
                        Pakistan, with hands-on experience across frontend,
                        backend, databases, and deployment workflows. I build
                        responsive interfaces, RESTful APIs, authentication
                        systems, and production-ready applications with a focus
                        on performance and scalability. My professional work
                        includes 15+ REST APIs, a 30% improvement in API
                        performance, and deployment workflows that reduced
                        delivery time by 40%.
                    </p>
                    <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1,
                        }}
                        className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3"
                    >
                        {infoList.map(
                            ({ icon, iconDark, title, description }, index) => (
                                <motion.li
                                    whileHover={{ scale: 1.05 }}
                                    key={index}
                                    className="hover:bg-lightHover dark:hover:bg-darkHover/50 cursor-pointer rounded-xl border-[0.5px] border-gray-400 p-6 duration-500 hover:-translate-y-1 hover:shadow-black dark:border-white dark:hover:shadow-white"
                                >
                                    <Image
                                        src={isDarkMode ? iconDark : icon}
                                        alt={`${title} icon`}
                                        className="mt-3 w-7"
                                    />
                                    <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-white/80">
                                        {description}
                                    </p>
                                </motion.li>
                            )
                        )}
                    </motion.ul>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default About;
