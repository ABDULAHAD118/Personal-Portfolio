'use client';
import { useEffect } from 'react';
import { useTheme } from './lib/use-theme';
import About from './components/About/About';
import Tools from './components/Tools/Tools';
import Contact from './components/Contact/Contact';
import Certificates from './components/Certificates/Certificates';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import Work from './components/Work/Work';
import Chatbot from './components/Chatbot/Chatbot';

export default function Home() {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (!window.location.hash) {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Header />
                <About />
                <Work />
                <Tools />
                <Education />
                <Experience />
                <Services />
                <Certificates />
                <Contact />
            </main>
            <Footer />
            <Chatbot isDarkMode={isDarkMode} />
        </>
    );
}
