import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <div className="mt-20">
            <div className="text-center">
                <Image
                    src={isDarkMode ? assets.logo_dark : assets.logo}
                    alt="Logo"
                    className="mx-auto mb-2 w-36"
                />
                <div className="mx-auto flex w-max items-center gap-2">
                    <Image
                        src={
                            isDarkMode
                                ? assets.mail_icon_dark
                                : assets.mail_icon
                        }
                        alt="Mail Icon"
                        className="w-6"
                    />
                    abdulahadhussain60@gmail.com
                </div>
            </div>
            <div className="mx-[10%] mt-12 items-center justify-between border-t border-gray-400 py-6 text-center sm:flex">
                <p>
                    &copy; {new Date().getFullYear()} Abdulahad. All rights
                    reserved.
                </p>
                <ul className="mt-4 flex items-center justify-center gap-10 sm:mt-0">
                    <li>
                        <a
                            href="https://github.com/ABDULAHAD118"
                            target="_blank"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/abdulahad018/"
                            target="_blank"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/abdulahadhussain8/"
                            target="_blank"
                        >
                            Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
