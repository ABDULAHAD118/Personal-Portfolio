'use client';

import { toolsData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const Tools = () => {
    // Duplicate the tools array twice to create a seamless infinite loop
    const duplicatedTools = [...toolsData, ...toolsData, ...toolsData];

    return (
        <section
            id="tools"
            className="w-full scroll-mt-20 overflow-hidden py-14"
        >
            <motion.p
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-Ovo mb-2 text-center text-lg text-purple-700 dark:text-purple-300"
            >
                Technologies & Environment
            </motion.p>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-Ovo mb-12 text-center text-5xl font-bold"
            >
                Tools I Use
            </motion.h2>

            <div className="relative mx-auto w-full max-w-6xl overflow-hidden py-4">
                {/* Left and Right Gradient Fades */}
                <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-darkTheme" />
                <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-darkTheme" />

                {/* Infinite Marquee Track moving right-to-left */}
                <motion.div
                    className="flex w-max items-center gap-6 sm:gap-8"
                    animate={{ x: ['0%', '-33.333333%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 25,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedTools.map((tool, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.15, y: -4 }}
                            className="hover:bg-lightHover dark:bg-lightHover flex aspect-square w-14 cursor-pointer items-center justify-center rounded-xl border border-gray-300 bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 dark:border-white/20 dark:bg-white/5 sm:w-16"
                        >
                            <Image
                                src={tool}
                                alt="Development Tool"
                                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Tools;
