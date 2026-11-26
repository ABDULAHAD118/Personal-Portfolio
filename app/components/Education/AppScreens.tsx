'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
    ChartLine,
    ClipboardList,
    Leaf,
    MessagesSquare,
    Sprout,
} from 'lucide-react';

// Files live in /public/education/screens as `${lang}-${key}.jpg`.
const SCREENS = [
    { key: 'detection', label: 'Disease detection', icon: Leaf },
    { key: 'scan', label: 'Scan result', icon: ClipboardList },
    { key: 'chat', label: 'AI chat', icon: MessagesSquare },
    { key: 'prices', label: 'Market prices', icon: ChartLine },
    { key: 'crop', label: 'Crop details', icon: Sprout },
];
const LANGS = [
    { key: 'en', label: 'English' },
    { key: 'ur', label: 'اردو' },
] as const;

export default function AppScreens() {
    const [lang, setLang] = useState<(typeof LANGS)[number]['key']>('en');

    return (
        <div>
            <div
                role="group"
                aria-label="Screenshot language"
                className="border-line inline-flex rounded-lg border p-1"
            >
                {LANGS.map((l) => (
                    <button
                        key={l.key}
                        type="button"
                        onClick={() => setLang(l.key)}
                        aria-pressed={lang === l.key}
                        lang={l.key}
                        className={`cursor-pointer rounded-md px-4 py-1.5 text-sm transition-colors ${
                            lang === l.key
                                ? 'bg-accent text-on-accent'
                                : 'text-muted hover:text-fg'
                        }`}
                    >
                        {l.label}
                    </button>
                ))}
            </div>

            {/* Scrolls sideways on small screens, five across on large ones */}
            <ul className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
                {SCREENS.map((s) => (
                    <li
                        key={s.key}
                        className="w-[11.5rem] shrink-0 snap-start lg:w-auto"
                    >
                        <div className="border-line bg-panel rounded-[1.75rem] border p-1.5 shadow-[0_24px_50px_-28px_rgb(0_0_0/0.6)]">
                            <Image
                                src={`/education/screens/${lang}-${s.key}.jpg`}
                                alt={`${s.label} screen of the Zabaan-e-Kissan app in ${lang === 'en' ? 'English' : 'Urdu'}`}
                                width={720}
                                height={1600}
                                sizes="(min-width: 1024px) 18vw, 11.5rem"
                                className="w-full rounded-[1.4rem]"
                            />
                        </div>
                        <p className="text-muted mt-3 flex items-center gap-2 font-mono text-xs">
                            <s.icon
                                className="text-accent size-3.5"
                                aria-hidden
                            />
                            {s.label.toLowerCase()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
