import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Header = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div className="mx-auto flex h-screen w-11/12 max-w-3xl flex-col items-center justify-center gap-4 text-center">
            <div>
                <Image
                    src={assets.profile_img}
                    alt=""
                    className="w-32 rounded-full"
                />
            </div>
            <h3 className="font-Ovo mb-3 flex items-center gap-2 text-xl md:text-2xl">
                {`Hi! I'm Abdulahad Hussain`}
                <Image src={assets.hand_icon} alt="" className="w-6" />
            </h3>
            <h1 className="lg:tet-[66px] font-Ovo text-3xl sm:text-6xl">
                Full Stack Web Developer
            </h1>
            <p className="font-Ovo mx-auto max-w-2xl">
                I am a passionate Full Stack Web Developer from Pakistan with
                over 3 years of professional experience building dynamic and
                user-centric web applications.
            </p>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                <a
                    href="#contact"
                    className="flex items-center gap-2 rounded-full border border-white bg-black px-10 py-3 text-white dark:bg-transparent"
                >
                    Contact me
                    <Image
                        src={assets.right_arrow_white}
                        alt=""
                        className="w-4"
                    />
                </a>
                <a
                    href="/Abdulahad-Hussain-Resume.pdf"
                    download
                    className="flex items-center gap-2 rounded-full border border-gray-500 px-10 py-3 dark:bg-white dark:text-black"
                >
                    My Resume
                    <Image src={assets.download_icon} alt="" className="w-4" />
                </a>
            </div>
        </div>
    );
};

export default Header;
