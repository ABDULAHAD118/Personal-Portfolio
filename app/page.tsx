'use client';
import { useEffect } from 'react';
import About from './components/About/About';
import Tools from './components/Tools/Tools';
import Contact from './components/Contact/Contact';
import Certificates from './components/Certificates/Certificates';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Header from './components/Header/Header';
import Services from './components/Services/Services';
import Work from './components/Work/Work';
import JsonLd from './components/ui/JsonLd';
import { homeStructuredData } from './lib/schema';

export default function Home() {
    useEffect(() => {
        if (!window.location.hash) {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <main>
            <JsonLd data={homeStructuredData()} />
            <Header />
            <About />
            <Work />
            <Experience />
            <Education />
            <Tools />
            <Services />
            <Certificates />
            <Contact />
        </main>
    );
}
