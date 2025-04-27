import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="fixed z-50 flex w-full items-center justify-between px-5 py-4 lg:px-8 xl:px-[8%]">
                <a href="#top">
                    <Image
                        src={assets.logo}
                        alt="Logo"
                        className="mr-14 w-28 cursor-pointer"
                    />
                </a>
                <ul className="bg-opacity-50 hidden items-center gap-6 rounded-full bg-white px-12 py-3 shadow-sm md:flex lg:gap-8">
                    <li>
                        <a href="#top" className="font-Ovo!">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="font-Ovo!">
                            About me
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="font-Ovo!">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#work" className="font-Ovo!">
                            My Work
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="font-Ovo!">
                            Contact me
                        </a>
                    </li>
                </ul>
                <div>
                    <a
                        href="#contact"
                        className="font-Ovo! ml-4 hidden items-center gap-3 rounded-full border border-gray-500 px-10 py-2.5 lg:flex"
                    >
                        Contact{' '}
                        <Image
                            src={assets.arrow_icon}
                            className="w-3"
                            alt="Arrow Icon"
                        />
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
