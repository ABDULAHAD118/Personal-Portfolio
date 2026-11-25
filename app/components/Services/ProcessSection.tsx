import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { workProcess } from '@/app/lib/content';

export default function ProcessSection() {
    return (
        <section className="px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
            <h2 className="text-muted font-mono text-sm">
                <span className="text-accent">$</span> how a project runs
            </h2>
            <ol className="border-line bg-line mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
                {workProcess.map((p, i) => (
                    <li key={p.step} className="bg-bg p-6 sm:p-8">
                        <p className="text-accent font-mono text-sm">
                            {String(i + 1).padStart(2, '0')}.{p.step}()
                        </p>
                        <p className="text-muted mt-4 leading-relaxed">
                            {p.text}
                        </p>
                    </li>
                ))}
            </ol>
            <Link
                href="/contact"
                className="bg-accent text-on-accent mt-10 inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-sm transition-opacity hover:opacity-90"
            >
                start a project
                <ArrowUpRight className="size-4" aria-hidden />
            </Link>
        </section>
    );
}
