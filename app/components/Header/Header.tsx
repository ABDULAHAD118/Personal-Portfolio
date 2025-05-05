import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const Header = () => {
    return (
        <div className="mx-auto flex h-screen w-11/12 max-w-3xl flex-col items-center justify-center gap-4 text-center">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
                <Image
                    src={assets.profile_img}
                    alt=""
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
                Full Stack Web Developer
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
                I am a passionate Full Stack Web Developer from Pakistan with
                over 3 years of professional experience building dynamic and
                user-centric web applications.
            </motion.p>
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
        </div>
    );
};

export default Header;
