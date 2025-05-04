import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Services = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div className="w-full scroll-mt-20 px-[12%] py-10" id="services">
            <h4 className="font-Ovo mb-2 text-center text-lg">What I Offer</h4>
            <h2 className="font-Ovo text-center text-5xl">My Services</h2>
            <p className="font-Ovo mx-auto mt-5 mb-12 max-w-2xl text-center">
                I am a passionate Full Stack Web Developer from Pakistan with
                over 3 years of professional experience building dynamic and
                user-centric web applications. I specialize in creating
                responsive and user-friendly web applications using the latest
                technologies and best practices.
            </p>
            <div className="grid-cols-auto my-10 grid gap-6">
                {serviceData.map(
                    ({ icon, title, description, link }, index) => (
                        <div
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
                            <a
                                href={link}
                                className="mt-5 flex items-center gap-2 text-sm"
                            >
                                Read More{' '}
                                <Image
                                    src={assets.right_arrow}
                                    alt="Right Arrow"
                                    className="w-4"
                                />
                            </a>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Services;
