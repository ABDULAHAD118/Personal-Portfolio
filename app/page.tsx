'use client';
import About from './components/About/About';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Header />
            <About />
        </div>
    );
}
