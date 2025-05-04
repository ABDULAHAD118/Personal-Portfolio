import { assets, infoList, toolsData } from '@/assets/assets';
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
            <motion.h4
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.3,
                }}
                className="font-Ovo mb-2 text-center text-lg"
            >
                Introduction
            </motion.h4>
            <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                }}
                className="font-Ovo text-center text-5xl"
            >
                About me
            </motion.h2>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                }}
                className="my-20 flex w-full flex-col items-center gap-20 lg:flex-row"
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
                        alt="User Image"
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
                    <p className="font-Ovo mb-10 max-w-2xl">
                        I am an experienced Full Stack Developer with over a
                        decade of expertise in building scalable, user-centric
                        applications. I have collaborated with prestigious
                        organizations, delivering end-to-end solutions that
                        drive growth and success.
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
                                        alt={title}
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
                    <motion.h4
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 1.3,
                        }}
                        className="font-Ovo my-6 text-gray-700 dark:text-white/80"
                    >
                        Tool I Use
                    </motion.h4>
                    <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 1.5,
                        }}
                        className="flex items-center gap-3 sm:gap-5"
                    >
                        {toolsData.map((tool, index) => (
                            <motion.li
                                whileHover={{ scale: 1.1 }}
                                key={index}
                                className="hover:bg-lightHover! flex aspect-square w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-400 duration-500 hover:-translate-y-1 sm:w-14"
                            >
                                <Image
                                    src={tool}
                                    alt="Tool"
                                    className="w-5 sm:w-7"
                                />
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default About;
