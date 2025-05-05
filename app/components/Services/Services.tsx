import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const Services = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 1,
            }}
            className="w-full scroll-mt-20 px-[12%] py-10"
            id="services"
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
                What I Offer
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
                My Services
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
                I am a passionate Full Stack Web Developer from Pakistan with
                over 3 years of professional experience building dynamic and
                user-centric web applications. I specialize in creating
                responsive and user-friendly web applications using the latest
                technologies and best practices.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.9,
                }}
                className="grid-cols-auto my-10 grid gap-6"
            >
                {serviceData.map(({ icon, title, description }, index) => (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        key={index}
                        className="hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer rounded-lg border border-gray-400 px-8 py-12 duration-500 hover:-translate-y-1 hover:shadow-black dark:hover:shadow-white"
                    >
                        <Image src={icon} alt="Icon" className="w-10" />
                        <h3 className="my-4 text-lg text-gray-700 dark:text-white">
                            {title}
                        </h3>
                        <p className="text-sm leading-5 text-gray-600 dark:text-white/80">
                            {description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Services;
