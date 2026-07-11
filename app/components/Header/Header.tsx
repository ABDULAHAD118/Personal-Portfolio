import { assets, professionalStats } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const Header = () => {
    return (
        <header
            id="top"
            className="mx-auto flex min-h-screen w-11/12 max-w-3xl scroll-mt-20 flex-col items-center justify-center gap-4 py-24 text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
                <Image
                    src={assets.profile_img}
                    alt="Portrait of Abdulahad Hussain"
                    className="w-32 rounded-full"
                />
            </motion.div>
            <motion.h3
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.3,
                }}
                className="font-Ovo mb-3 flex items-center gap-2 text-xl md:text-2xl"
            >
                {`Hi! I'm Abdulahad Hussain`}
                <Image src={assets.hand_icon} alt="" className="w-6" />
            </motion.h3>
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                }}
                className="lg:tet-[66px] font-Ovo text-3xl sm:text-6xl"
            >
                Full-Stack Web Developer
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.7,
                }}
                className="font-Ovo mx-auto max-w-2xl"
            >
                I build scalable, high-performance web applications with
                React, Next.js, Vue, Nuxt, Node.js, and modern backend systems.
            </motion.p>
            <motion.div
                className="mt-3 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.85 }}
            >
                {professionalStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="rounded-xl border border-gray-300 bg-white/50 px-3 py-3 backdrop-blur-sm dark:border-white/20 dark:bg-white/5"
                        initial={{ scale: 0.85, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.08 }}
                        whileHover={{ y: -4, scale: 1.03 }}
                    >
                        <p className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                            {stat.value}
                        </p>
                        <p className="text-xs leading-4 text-gray-600 dark:text-white/70">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                <motion.a
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 1,
                    }}
                    href="#contact"
                    className="flex items-center gap-2 rounded-full border border-white bg-black px-10 py-3 text-white dark:bg-transparent"
                >
                    Contact me
                    <Image
                        src={assets.right_arrow_white}
                        alt=""
                        className="w-4"
                    />
                </motion.a>
                <motion.a
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 1.2,
                    }}
                    href="/Abdulahad-Hussain-Resume.pdf"
                    download
                    className="flex items-center gap-2 rounded-full border border-gray-500 px-10 py-3 dark:bg-white dark:text-black"
                >
                    My Resume
                    <Image src={assets.download_icon} alt="" className="w-4" />
                </motion.a>
            </div>
        </header>
    );
};

export default Header;
