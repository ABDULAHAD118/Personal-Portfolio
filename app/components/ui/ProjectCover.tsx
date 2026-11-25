import Image from 'next/image';
import type { Project } from '@/assets/assets';

// Screenshot when we have one; otherwise a generated "terminal" cover so client work still has a visual.
export default function ProjectCover({
    project,
    sizes,
    priority,
}: {
    project: Project;
    sizes: string;
    priority?: boolean;
}) {
    if (project.bgImage) {
        return (
            <Image
                src={project.bgImage}
                alt={`${project.title} screenshot`}
                width={1200}
                height={750}
                sizes={sizes}
                priority={priority}
                className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
        );
    }
    const initials = project.title
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();
    return (
        <div
            className="bg-panel relative grid size-full place-items-center overflow-hidden"
            aria-hidden
        >
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
            <p className="text-muted absolute top-4 left-4 font-mono text-[0.6875rem]">
                <span className="text-accent">●</span> {project.slug}.app
            </p>
            <span className="font-heading text-accent relative text-[clamp(3rem,10vw,7rem)] font-bold tracking-tighter transition-transform duration-700 group-hover:scale-105">
                {initials}
            </span>
            <p className="text-muted absolute right-4 bottom-4 font-mono text-[0.6875rem]">
                client work · BitLogicx
            </p>
        </div>
    );
}
