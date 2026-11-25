'use client';
import { motion } from 'motion/react';

// Shared heading for every redesigned section: "01 / about" in mono, then a big title.
export default function SectionHeading({
    index,
    label,
    title,
}: {
    index: string;
    label: string;
    title: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <p className="text-muted font-mono text-xs sm:text-sm">
                <span className="text-accent">{index}</span> / {label}
            </p>
            <h2 className="font-heading mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
                {title}
            </h2>
        </motion.div>
    );
}
