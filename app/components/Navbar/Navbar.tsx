import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';

const Navbar = ({
    isDarkMode,
    setDarkMode,
}: {
    isDarkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
    const [isScroll, setIsScroll] = useState(false);
    const sideMenuRef = useRef<HTMLUListElement | null>(null);
    const openMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = 'translateX(-16rem)';
        }
    };
    const closeMenu = () => {
        if (sideMenuRef.current) {
            sideMenuRef.current.style.transform = 'translateX(16rem)';
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (scrollY > 50) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        });
    }, []);

    return (
        <>
            <div className="fixed top-0 right-0 -z-12 w-11/10 translate-y-[-80%] dark:hidden">
                <Image src={assets.header_bg_color} alt="" className="w-full" />
            </div>
            <nav
                className={`fixed z-50 flex w-full items-center justify-between px-5 py-4 lg:px-8 xl:px-[8%] ${isScroll ? 'dark:bg-darkTheme bg-white/50 shadow-sm backdrop-blur-lg dark:shadow-white/20' : ''}`}
            >
                <a href="#top">
                    <Image
                        src={isDarkMode ? assets.logo_dark : assets.logo}
                        alt="Logo"
                        className="mr-14 w-28 cursor-pointer"
                    />
                </a>
                <ul
                    className={`hidden items-center gap-6 rounded-full px-12 py-3 md:flex lg:gap-8 ${isScroll ? '' : 'bg-white/50 shadow-sm dark:border dark:border-white/50 dark:bg-transparent'}`}
                >
                    <li>
                        <a href="#top" className="font-Ovo">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="font-Ovo">
                            About me
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="font-Ovo">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#work" className="font-Ovo">
                            My Work
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="font-Ovo">
                            Contact me
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-4">
                    <button
                        className="cursor-pointer"
                        onClick={() => setDarkMode(!isDarkMode)}
                    >
                        <Image
                            src={
                                isDarkMode ? assets.sun_icon : assets.moon_icon
                            }
                            alt=""
                            className="w-6"
                        />
                    </button>
                    <a
                        href="#contact"
                        className="font-Ovo ml-4 hidden items-center gap-3 rounded-full border border-gray-500 px-10 py-2.5 lg:flex dark:border-white/50"
                    >
                        Contact{' '}
                        <Image
                            src={
                                isDarkMode
                                    ? assets.arrow_icon_dark
                                    : assets.arrow_icon
                            }
                            className="w-3"
                            alt="Arrow Icon"
                        />
                    </a>
                    <button
                        className="ml-3 block cursor-pointer md:hidden"
                        onClick={openMenu}
                    >
                        <Image
                            src={
                                isDarkMode
                                    ? assets.menu_white
                                    : assets.menu_black
                            }
                            alt="Menu Icon"
                            className="w-6"
                        />
                    </button>
                </div>
                {/* Mobile Menu  */}
                <ul
                    ref={sideMenuRef}
                    className="dark:bg-darkHover fixed top-0 -right-64 bottom-0 z-50 flex h-screen w-64 flex-col gap-4 bg-rose-50 px-10 py-20 transition duration-500 md:hidden dark:text-white"
                >
                    <div className="absolute top-6 right-6" onClick={closeMenu}>
                        <Image
                            src={
                                isDarkMode
                                    ? assets.close_white
                                    : assets.close_black
                            }
                            alt="Close Icon"
                            className="w-5 cursor-pointer"
                        />
                    </div>
                    <li>
                        <a href="#top" onClick={closeMenu} className="font-Ovo">
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            onClick={closeMenu}
                            className="font-Ovo"
                        >
                            About me
                        </a>
                    </li>
                    <li>
                        <a
                            href="#services"
                            onClick={closeMenu}
                            className="font-Ovo"
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#work"
                            onClick={closeMenu}
                            className="font-Ovo"
                        >
                            My Work
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            onClick={closeMenu}
                            className="font-Ovo"
                        >
                            Contact me
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
