'use client';
import { useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from 'motion/react';
import { navLinks } from '@/app/lib/content';
import { useTheme } from '@/app/lib/use-theme';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, 'change', (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setScrolled(y > 40);
        setHidden(y > prev && y > 200 && !menuOpen);
    });

    return (
        <>
            <motion.header
                animate={{ y: hidden ? '-110%' : '0%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-12"
            >
                <nav
                    aria-label="Primary navigation"
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-colors duration-300 sm:px-4 ${
                        scrolled
                            ? 'border-line bg-panel/70 backdrop-blur-xl'
                            : 'border-transparent'
                    }`}
                >
                    <a
                        href="#top"
                        aria-label="Abdulahad Hussain, back to top"
                        className="font-mono text-sm font-medium tracking-tight"
                    >
                        <span className="text-accent">&lt;</span>
                        Abdulahad
                        <span className="text-accent"> /&gt;</span>
                    </a>

                    <ul className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="text-muted hover:text-fg rounded-lg px-3 py-1.5 text-sm transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={
                                isDarkMode
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }
                            className="border-line hover:border-accent grid size-9 cursor-pointer place-items-center rounded-full border transition-colors"
                        >
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <a
                            href="#contact"
                            className="bg-accent text-on-accent hidden rounded-md px-4 py-1.5 font-mono text-xs font-medium transition-opacity hover:opacity-85 sm:block"
                        >
                            hire-me
                        </a>
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={menuOpen}
                            className="border-line grid size-9 cursor-pointer place-items-center rounded-full border md:hidden"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                                <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-bg/95 fixed inset-0 z-[60] flex flex-col px-6 pt-6 backdrop-blur-xl md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
                    >
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            autoFocus
                            aria-label="Close navigation menu"
                            className="border-line ml-auto grid size-9 cursor-pointer place-items-center rounded-full border"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        <ul className="mt-12 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="font-heading flex items-baseline gap-3 py-2 text-4xl font-semibold"
                                    >
                                        <span className="text-accent font-mono text-sm">
                                            0{i + 1}
                                        </span>
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
);

const MoonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
);

export default Navbar;
