'use client';
import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { ChevronDown, Mail, MapPin, Send } from 'lucide-react';
import { serviceData } from '@/assets/assets';
import { siteConfig } from '@/app/lib/site-config';
import { socials } from '@/app/lib/content';
import TechIcon from '../ui/TechIcon';
import SectionHeading from '../ui/SectionHeading';

const field =
    'bg-panel border-line placeholder:text-muted/70 focus:border-accent w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors';
const label = 'text-muted mb-2 block font-mono text-xs';

const Contact = ({ page = false }: { page?: boolean }) => {
    const [isSending, setIsSending] = useState(false);

    const onSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setIsSending(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            service: formData.get('service') as string,
            message: formData.get('message') as string,
        };

        const loadingToast = toast.loading('Sending your message...');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Message sent successfully!', {
                    id: loadingToast,
                });
                form.reset();
            } else {
                toast.error(data.message || 'Something went wrong.', {
                    id: loadingToast,
                });
            }
        } catch {
            toast.error('Something went wrong. Please try again.', {
                id: loadingToast,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section
            id="contact"
            className={`border-line scroll-mt-20 border-t px-6 sm:px-10 lg:px-16 ${page ? 'border-t-0 pb-20 sm:pb-24' : 'py-24 sm:py-32'}`}
        >
            <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                <div>
                    {!page && (
                        <SectionHeading
                            index="07"
                            label="contact"
                            title={
                                <>
                                    Let&apos;s build
                                    <br />
                                    something{' '}
                                    <span className="text-accent">
                                        together
                                    </span>
                                    .
                                </>
                            }
                        />
                    )}
                    <p
                        className={`text-muted max-w-md leading-relaxed ${page ? 'text-lg' : 'mt-6'}`}
                    >
                        Have a project, a role or just a question? Send a
                        message and I&apos;ll get back to you, usually within a
                        day.
                    </p>

                    <ul className="border-line mt-10 border-t font-mono text-sm">
                        <li className="border-line border-b py-4">
                            <a
                                href={siteConfig.emailUrl}
                                className="hover:text-accent flex items-center gap-3 break-all transition-colors"
                            >
                                <Mail
                                    className="text-accent size-4 shrink-0"
                                    aria-hidden
                                />
                                {siteConfig.email}
                            </a>
                        </li>
                        <li className="border-line text-muted flex items-center gap-3 border-b py-4">
                            <MapPin
                                className="text-accent size-4 shrink-0"
                                aria-hidden
                            />
                            Lahore, Pakistan · remote friendly
                        </li>
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="me noreferrer"
                                className="border-line text-muted hover:border-accent hover:text-fg flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors"
                            >
                                <TechIcon icon={s.icon} className="size-3.5" />
                                {s.label.toLowerCase()}
                            </a>
                        ))}
                    </div>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={onSubmit}
                    className="bg-panel/50 border-line rounded-2xl border p-5 sm:p-8"
                >
                    <p className="text-muted mb-6 font-mono text-xs">
                        <span className="text-accent">$</span> send-message --to
                        abdulahad
                    </p>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="contact-name" className={label}>
                                name
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                autoComplete="name"
                                placeholder="Your name"
                                className={field}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className={label}>
                                email
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="you@company.com"
                                className={field}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="contact-service" className={label}>
                            service
                        </label>
                        <div className="relative">
                            <select
                                id="contact-service"
                                name="service"
                                className={`${field} appearance-none pr-10`}
                                required
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select a service
                                </option>
                                {serviceData.map(({ title }) => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
                                aria-hidden
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="contact-message" className={label}>
                            message
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            placeholder="Tell me a bit about what you need..."
                            className={`${field} resize-y`}
                            rows={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSending}
                        className="bg-accent text-on-accent mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 font-mono text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        {isSending ? 'sending...' : 'send message'}
                        <Send className="size-4" aria-hidden />
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
