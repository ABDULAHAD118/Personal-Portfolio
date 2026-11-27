import type { Metadata } from 'next';
import { pageMeta } from '@/app/lib/seo';
import Education from '../components/Education/Education';
import PageHeader from '../components/ui/PageHeader';

export const metadata: Metadata = pageMeta(
    'Education: Computer Science at UET Lahore',
    'Abdulahad Hussain studied B.Sc. Computer Science at UET Lahore. His final year project, Zabaan-e-Kissan, is an Urdu AI app for crop disease detection and market prices.',
    '/education'
);

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
