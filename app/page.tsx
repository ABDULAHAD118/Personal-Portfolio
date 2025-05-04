'use client';
import { useEffect, useState } from 'react';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import Work from './components/Work/Work';

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        if (
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('theme');
        }
    }, [isDarkMode]);
    return (
        <div>
            <Navbar isDarkMode={isDarkMode} setDarkMode={setIsDarkMode} />
            <Header isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <Services isDarkMode={isDarkMode} />
            <Work isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}
