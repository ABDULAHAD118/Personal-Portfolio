import type { Metadata } from 'next';
import { workData } from '@/assets/assets';
import PageHeader from '../components/ui/PageHeader';
import ProjectTile from '../components/Work/ProjectTile';

export const metadata: Metadata = {
    title: 'Work',
    description:
        'Projects by Abdulahad Hussain: personal full stack, backend and mobile apps, plus client work built at BitLogicx.',
    alternates: { canonical: '/work' },
};

const groups = [
    {
        kind: 'client',
        label: 'client work',
        note: 'Built with the team at BitLogicx.',
    },
    {
        kind: 'personal',
        label: 'personal projects',
        note: 'Designed, built and shipped on my own.',
    },
] as const;

export default function WorkPage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'work' }]}
                title={
                    <>
                        Things I&apos;ve{' '}
                        <span className="text-accent">shipped</span>.
                    </>
                }
                intro={`${workData.length} projects across client platforms, full stack products, backend services and mobile apps. Open any of them for the full story.`}
            />
            {groups.map((g) => {
                const items = workData.filter((p) => p.kind === g.kind);
                return (
                    <section
                        key={g.kind}
                        className="border-line border-t px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
                    >
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <h2 className="font-mono text-sm">
                                <span className="text-accent">
                                    {String(items.length).padStart(2, '0')}
                                </span>{' '}
                                / {g.label}
                            </h2>
                            <p className="text-muted text-sm">{g.note}</p>
                        </div>
                        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((p) => (
                                <li key={p.slug}>
                                    <ProjectTile project={p} />
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}
        </main>
    );
}
