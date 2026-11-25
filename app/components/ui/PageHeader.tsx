import Link from 'next/link';

// Top of every inner page: a "~/work/bite-savor" breadcrumb, a big title and an optional intro.
export default function PageHeader({
    path,
    title,
    intro,
    children,
}: {
    path: { label: string; href?: string }[];
    title: React.ReactNode;
    intro?: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <header className="relative isolate overflow-hidden px-6 pt-36 pb-16 sm:px-10 sm:pt-44 sm:pb-20 lg:px-16">
            <div
                aria-hidden
                className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_0%,black,transparent_70%)]"
            />
            <nav
                aria-label="Breadcrumb"
                className="animate-rise text-muted font-mono text-xs sm:text-sm"
            >
                <Link href="/" className="hover:text-fg transition-colors">
                    ~
                </Link>
                {path.map((p) => (
                    <span key={p.label}>
                        <span className="text-accent">/</span>
                        {p.href ? (
                            <Link
                                href={p.href}
                                className="hover:text-fg transition-colors"
                            >
                                {p.label}
                            </Link>
                        ) : (
                            <span className="text-fg" aria-current="page">
                                {p.label}
                            </span>
                        )}
                    </span>
                ))}
            </nav>
            <h1 className="animate-rise font-heading mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] font-bold tracking-tight [animation-delay:80ms]">
                {title}
            </h1>
            {intro && (
                <p className="animate-rise text-muted mt-6 max-w-2xl text-lg leading-relaxed [animation-delay:160ms]">
                    {intro}
                </p>
            )}
            {children && (
                <div className="animate-rise mt-8 [animation-delay:240ms]">
                    {children}
                </div>
            )}
        </header>
    );
}
