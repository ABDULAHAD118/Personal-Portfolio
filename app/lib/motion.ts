// Scroll-in animation used across sections: slides in from one side as it enters the viewport.
// Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
export const slideIn = (from: 'left' | 'right', delay = 0) => ({
    initial: { opacity: 0, x: from === 'left' ? -80 : 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});
