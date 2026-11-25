'use client';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'motion/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const reduceMotion = useReducedMotion();
    if (reduceMotion) return <>{children}</>;

    return (
        <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
            {children}
        </ReactLenis>
    );
}
