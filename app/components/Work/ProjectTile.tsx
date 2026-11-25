import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/assets/assets';
import ProjectCover from '../ui/ProjectCover';

export default function ProjectTile({ project }: { project: Project }) {
    return (
        <Link
            href={`/work/${project.slug}`}
            className="group bg-panel border-line hover:border-accent flex h-full flex-col overflow-hidden rounded-2xl border transition-colors"
        >
            <div className="border-line aspect-[16/10] overflow-hidden border-b">
                <ProjectCover
                    project={project}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <p className="text-accent font-mono text-xs">
                    {project.type.toLowerCase()}
                </p>
                <h3 className="font-heading mt-2 flex items-center justify-between gap-3 text-2xl font-semibold tracking-tight">
                    {project.title}
                    <ArrowUpRight
                        className="text-muted group-hover:text-accent size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                    />
                </h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                    {project.summary}
                </p>
            </div>
        </Link>
    );
}
