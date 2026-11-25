'use client';
import { useRef } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'motion/react';
import { serviceData } from '@/assets/assets';
import Link from 'next/link';
import { ArrowUpRight, Layers } from 'lucide-react';
import { serviceIcons } from '@/app/lib/service-icons';
import SectionHeading from '../ui/SectionHeading';

const Services = () => {
    const reduceMotion = useReducedMotion();
    return (
        <section
            id="services"
            className="border-line scroll-mt-20 border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                    index="06"
                    label="services"
                    title={
                        <>
                            What I can{' '}
                            <span className="text-accent">build</span> for you.
                        </>
                    }
                />
                <p className="text-muted max-w-sm text-sm leading-relaxed">
                    From responsive interfaces to secure APIs and
                    database-backed systems, built with production-focused
                    practices.
                </p>
            </div>

            <ol className="border-line mt-16 overflow-x-clip border-t">
                {serviceData.map((service, i) => (
                    <ServiceRow
                        key={service.slug}
                        service={service}
                        index={i}
                        reduceMotion={!!reduceMotion}
                    />
                ))}
            </ol>
        </section>
    );
};

// Each row is pushed off to the right and slides in as you scroll, landing in
// place when it reaches the middle of the screen.
function ServiceRow({
    service,
    index,
    reduceMotion,
}: {
    service: (typeof serviceData)[number];
    index: number;
    reduceMotion: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });
    const x = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const Icon = serviceIcons[index] ?? Layers;

    return (
        <motion.li
            ref={ref}
            style={reduceMotion ? undefined : { x, opacity }}
            className="group border-line hover:bg-panel border-b transition-colors"
        >
            <Link
                href={`/services/${service.slug}`}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 px-2 py-7 sm:gap-x-10 md:grid-cols-[48px_1fr_1.2fr_auto] md:items-center md:px-4"
            >
                <span className="text-accent font-mono text-sm">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading flex items-center gap-4 text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
                    <span className="border-line group-hover:border-accent group-hover:text-accent grid size-10 shrink-0 place-items-center rounded-lg border transition-colors sm:size-12">
                        <Icon className="size-5 sm:size-6" aria-hidden />
                    </span>
                    {service.title}
                </h3>
                <p className="text-muted group-hover:text-fg col-start-2 text-sm leading-relaxed transition-colors duration-500 md:col-start-3">
                    {service.description}
                </p>
                <ArrowUpRight
                    className="text-muted group-hover:text-accent hidden size-5 transition-colors md:block"
                    aria-hidden
                />
            </Link>
        </motion.li>
    );
}

export default Services;
