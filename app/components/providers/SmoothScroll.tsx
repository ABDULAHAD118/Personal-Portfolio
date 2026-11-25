'use client';
import { ReactLenis } from 'lenis/react';
import { MotionConfig, useReducedMotion } from 'motion/react';

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const reduceMotion = useReducedMotion();
    if (reduceMotion)
        return <MotionConfig reducedMotion="user">{children}</MotionConfig>;

    return (
        <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ReactLenis>
    );
}
