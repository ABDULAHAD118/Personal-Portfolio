import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import CertificateLog from './CertificateLog';

const Certificates = () => {
    return (
        <section
            id="certificates"
            className="border-line scroll-mt-20 border-t px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
        >
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                    index="06"
                    label="certificates"
                    title={
                        <>
                            Always <span className="text-accent">learning</span>
                            .
                        </>
                    }
                />
                <Link
                    href="/certificates"
                    className="text-muted hover:text-fg flex items-center gap-2 font-mono text-sm transition-colors"
                >
                    all certificates
                    <ArrowUpRight className="size-4" aria-hidden />
                </Link>
            </div>
            <div className="mt-16">
                <CertificateLog />
            </div>
        </section>
    );
};

export default Certificates;
