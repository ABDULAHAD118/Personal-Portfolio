'use client';
import { useSyncExternalStore } from 'react';

// The <html> "dark" class is the single source of truth; it's set before hydration by the inline script in layout.tsx.
const subscribe = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
};

export function useTheme() {
    const isDarkMode = useSyncExternalStore(
        subscribe,
        () => document.documentElement.classList.contains('dark'),
        () => true,
    );

    const toggleTheme = () => {
        const dark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch {}
    };

    return { isDarkMode, toggleTheme };
}

