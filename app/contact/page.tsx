import type { Metadata } from 'next';
import Contact from '../components/Contact/Contact';
import PageHeader from '../components/ui/PageHeader';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Abdulahad Hussain about a project, a role or a question.',
    alternates: { canonical: '/contact' },
};

const faqs = [
    {
        q: 'Are you available for new work?',
        a: 'Yes. I work full time at BitLogicx and take on freelance projects and full-time opportunities alongside it.',
    },
    {
        q: 'How soon will you reply?',
        a: 'Usually within a day. For anything urgent, email me directly.',
    },
    {
        q: 'Do you work remotely?',
        a: 'Yes. I am based in Lahore, Pakistan and work with teams and clients in any time zone.',
    },
    {
        q: 'What do you need to give an estimate?',
        a: 'A short description of the goal, who will use it, any designs you have and your timeline.',
    },
];

export default function ContactPage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'contact' }]}
                title={
                    <>
                        Let&apos;s build something{' '}
                        <span className="text-accent">together</span>.
                    </>
                }
            />
            <Contact page />
            <section className="border-line border-t px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                <h2 className="text-muted font-mono text-sm">
                    <span className="text-accent">?</span> / common questions
                </h2>
                <dl className="border-line mt-8 grid border-t md:grid-cols-2">
                    {faqs.map((f) => (
                        <div
                            key={f.q}
                            className="border-line border-b py-6 md:odd:border-r md:odd:pr-10 md:even:pl-10"
                        >
                            <dt className="font-heading text-xl font-semibold">
                                {f.q}
                            </dt>
                            <dd className="text-muted mt-2 leading-relaxed">
                                {f.a}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>
        </main>
    );
}
