'use client';
import { motion } from 'motion/react';
import { serviceData } from '@/assets/assets';
import SectionHeading from '../ui/SectionHeading';

const Services = () => {
    return (
        <section
            id="services"
            className="border-line scroll-mt-20 border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                    index="05"
                    label="services"
                    title={
                        <>
                            What I can <span className="text-accent">build</span> for you.
                        </>
                    }
                />
                <p className="text-muted max-w-sm text-sm leading-relaxed">
                    From responsive interfaces to secure APIs and database-backed
                    systems, built with production-focused practices.
                </p>
            </div>

            <ol className="border-line mt-16 border-t">
                {serviceData.map((service, i) => (
                    <motion.li
                        key={service.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="group border-line hover:bg-panel border-b transition-colors"
                    >
                        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 px-2 py-7 sm:gap-x-10 md:grid-cols-[80px_1fr_1.2fr] md:items-center md:px-4">
                            <span className="text-accent font-mono text-sm">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="font-heading text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
                                {service.title}
                            </h3>
                            <p className="text-muted group-hover:text-fg col-start-2 text-sm leading-relaxed transition-colors duration-500 md:col-start-3">
                                {service.description}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </section>
    );
};

export default Services;
