'use client';
import { useEffect, useState } from 'react';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Certificates from './components/Certificates/Certificates';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import Work from './components/Work/Work';

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const prefersDarkMode =
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);

        const animationFrame = requestAnimationFrame(() => {
            setIsDarkMode(prefersDarkMode);
        });

        return () => cancelAnimationFrame(animationFrame);
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
        <>
            <Navbar isDarkMode={isDarkMode} setDarkMode={setIsDarkMode} />
            <main>
                <Header />
                <About isDarkMode={isDarkMode} />
                <Education />
                <Experience />
                <Services />
                <Work isDarkMode={isDarkMode} />
                <Certificates />
                <Contact />
            </main>
            <Footer isDarkMode={isDarkMode} />
        </>
    );
}
