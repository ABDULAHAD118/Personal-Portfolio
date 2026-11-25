import type { Metadata } from 'next';
import { certificateData } from '@/assets/assets';
import PageHeader from '../components/ui/PageHeader';
import CertificateBook from '../components/Certificates/CertificateBook';

export const metadata: Metadata = {
    title: 'Certificates',
    description:
        'Certificates and internships completed by Abdulahad Hussain, from IBM, Meta, Google, MongoDB and more.',
    alternates: { canonical: '/certificates' },
};

// "IBM · Coursera" -> "IBM"; internships keep their company name.
const issuers = Object.entries(
    certificateData.reduce<Record<string, number>>((acc, c) => {
        const name = c.issuer.split(' · ')[0];
        acc[name] = (acc[name] ?? 0) + 1;
        return acc;
    }, {})
).sort((a, b) => b[1] - a[1]);

export default function CertificatesPage() {
    return (
        <main>
            <PageHeader
                path={[{ label: 'certificates' }]}
                title={
                    <>
                        Always <span className="text-accent">learning</span>.
                    </>
                }
                intro={`${certificateData.length} certificates and internships. Flip through the book, or jump to any entry from the contents page.`}
            >
                <ul className="flex flex-wrap gap-2 font-mono text-xs">
                    {issuers.map(([name, count]) => (
                        <li
                            key={name}
                            className="border-line bg-panel rounded-md border px-2.5 py-1"
                        >
                            {name} <span className="text-accent">×{count}</span>
                        </li>
                    ))}
                </ul>
            </PageHeader>
            <section className="border-line border-t px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
                <CertificateBook />
            </section>
        </main>
    );
}
