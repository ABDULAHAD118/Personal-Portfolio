'use client';
import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const AUTO_SPIN = 0.003;

// Evenly spread points on a unit sphere (Fibonacci sphere).
function spherePoints(n: number) {
    return Array.from({ length: n }, (_, i) => {
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = GOLDEN_ANGLE * i;
        return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });
}

export default function TechSphere({ items }: { items: string[] }) {
    const reduceMotion = useReducedMotion();
    const boxRef = useRef<HTMLDivElement>(null);
    const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const inView = useInView(boxRef);
    const state = useRef({ ax: 0.3, ay: 0, vx: 0, vy: AUTO_SPIN, drag: null as null | { x: number; y: number } });

    useEffect(() => {
        const points = spherePoints(items.length);
        const s = state.current;
        let frame = 0;

        const render = () => {
            const box = boxRef.current;
            if (!box) return;
            const radius = box.offsetWidth * 0.38;
            const [cx, sx, cy, sy] = [Math.cos(s.ax), Math.sin(s.ax), Math.cos(s.ay), Math.sin(s.ay)];
            points.forEach((p, i) => {
                const el = tagRefs.current[i];
                if (!el) return;
                // Rotate around Y, then X.
                const x = p.x * cy + p.z * sy;
                const z1 = -p.x * sy + p.z * cy;
                const y = p.y * cx - z1 * sx;
                const z = p.y * sx + z1 * cx;
                const depth = (z + 1) / 2; // 0 = back, 1 = front
                el.style.transform = `translate(-50%, -50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${0.55 + depth * 0.55})`;
                el.style.opacity = String(0.2 + depth * 0.8);
                el.style.zIndex = String(Math.round(depth * 100));
            });
        };

        const tick = () => {
            if (!s.drag) {
                // Ease back to the slow automatic spin after a drag.
                s.vx *= 0.95;
                s.vy += (AUTO_SPIN - s.vy) * 0.03;
            }
            s.ax += s.vx;
            s.ay += s.vy;
            render();
            frame = requestAnimationFrame(tick);
        };

        render();
        if (inView && !reduceMotion) frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [items.length, inView, reduceMotion]);

    const onDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        state.current.drag = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: React.PointerEvent) => {
        const s = state.current;
        if (!s.drag) return;
        s.vy = (e.clientX - s.drag.x) * 0.004;
        s.vx = -(e.clientY - s.drag.y) * 0.004;
        s.drag = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => {
        state.current.drag = null;
    };

    return (
        <div
            ref={boxRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            aria-hidden
            className="relative aspect-square w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
            <div className="border-line absolute inset-[12%] rounded-full border border-dashed" />
            {items.map((item, i) => (
                <span
                    key={item}
                    ref={(el) => {
                        tagRefs.current[i] = el;
                    }}
                    className="absolute top-1/2 left-1/2 font-mono text-sm whitespace-nowrap will-change-transform sm:text-base"
                >
                    <span className="text-accent">#</span>
                    {item}
                </span>
            ))}
        </div>
    );
}
