import type { Metadata } from 'next';
import Education from '../components/Education/Education';
import PageHeader from '../components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Education',
    description:
        'Abdulahad Hussain studied B.Sc. Computer Science at UET Lahore, with an AI-based final year project.',
    alternates: { canonical: '/education' },
};

export default function EducationPage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'education' }]}
                title={
                    <>
                        Where I <span className="text-accent">studied</span>.
                    </>
                }
                intro="Computer Science at UET Lahore, alongside a full-time engineering job and an AI final year project."
            />
            <Education page />
        </main>
    );
}
