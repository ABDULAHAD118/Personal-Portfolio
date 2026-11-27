import { socials } from '@/app/lib/content';
import { siteConfig } from '@/app/lib/site-config';
import { ArrowUp } from 'lucide-react';
import TechIcon from '../ui/TechIcon';

const Footer = () => {
    return (
        <footer className="border-line mt-24 border-t">
            <div className="flex flex-col gap-10 px-6 py-14 sm:px-10 lg:px-16 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-accent font-mono text-xs">
                        {'// got an idea?'}
                    </p>
                    <a
                        href={siteConfig.emailUrl}
                        className="font-heading hover:text-accent mt-3 block text-xl font-semibold break-all transition-colors sm:text-3xl"
                    >
                        {siteConfig.email}
                    </a>
                </div>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {socials.map((s) => (
                        <li key={s.href}>
                            <a
                                href={s.href}
                                target="_blank"
                                rel="me noreferrer"
                                className="text-muted hover:text-fg flex items-center gap-2 text-sm transition-colors"
                            >
                                <TechIcon icon={s.icon} className="size-4" />
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-line text-muted flex items-center justify-between border-t px-6 pt-6 pb-20 font-mono text-xs sm:pr-28 sm:pb-6 sm:pl-10 lg:pl-16">
                <p>
                    © {new Date().getFullYear()} {siteConfig.name}
                </p>
                <a href="#top" className="hover:text-fg flex items-center gap-1.5 transition-colors">
                    back to top
                    <ArrowUp className="size-3.5" aria-hidden />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
