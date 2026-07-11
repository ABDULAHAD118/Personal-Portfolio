'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ReactNode, useRef } from 'react';

type Direction = 'up' | 'left' | 'right';

const offsets = {
    up: { x: 0, y: 70 },
    left: { x: -100, y: 20 },
    right: { x: 100, y: 20 },
};

const ScrollReveal = ({
    children,
    direction = 'up',
    className = '',
}: {
    children: ReactNode;
    direction?: Direction;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 24,
        mass: 0.35,
    });
    const opacity = useTransform(smoothProgress, [0, 0.35, 0.8], [0, 0.5, 1]);
    const x = useTransform(
        smoothProgress,
        [0, 0.8],
        [offsets[direction].x, 0],
    );
    const y = useTransform(
        smoothProgress,
        [0, 0.8],
        [offsets[direction].y, 0],
    );

    return (
        <motion.div ref={ref} style={{ opacity, x, y }} className={className}>
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
