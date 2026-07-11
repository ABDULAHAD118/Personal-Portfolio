import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
    return (
        <footer className="mt-20">
            <div className="text-center">
                <Image
                    src={isDarkMode ? assets.logo_dark : assets.logo}
                    alt="Abdulahad Hussain"
                    className="mx-auto mb-2 w-36"
                />
                <a
                    href="mailto:abdulahadhussain60@gmail.com"
                    className="mx-auto flex w-max items-center gap-2"
                >
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
                </a>
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
                            rel="me noreferrer"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/abdulahad018/"
                            target="_blank"
                            rel="me noreferrer"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/abdulahadhussain8/"
                            target="_blank"
                            rel="me noreferrer"
                        >
                            Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
