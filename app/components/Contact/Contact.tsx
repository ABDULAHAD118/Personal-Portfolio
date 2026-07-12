import { assets, serviceData } from '@/assets/assets';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [isSending, setIsSending] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
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
                toast.success('Message sent successfully!', { id: loadingToast });
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
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 1,
            }}
            className="w-full scroll-mt-20 bg-[url(/footer-bg-color.png)] bg-[length:90%_auto] bg-center bg-no-repeat px-[12%] py-10 dark:bg-none"
            id="contact"
        >
            <motion.h4
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.3,
                }}
                className="font-Ovo mb-2 text-center text-lg"
            >
                Connect With Me
            </motion.h4>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                }}
                className="font-Ovo text-center text-5xl"
            >
                Get In Touch
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.7,
                }}
                className="font-Ovo mx-auto mt-5 mb-12 max-w-2xl text-center"
            >
                {`I'd`} love to hear from you! If you have any questions,
                comments or feedback, please use the form below.
            </motion.p>
            <motion.form
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.9,
                }}
                className="mx-auto max-w-2xl"
                onSubmit={onSubmit}
            >
                <div className="grid-cols-auto mt-10 mb-8 grid gap-6">
                    <motion.input
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 1.1,
                        }}
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        className="dark:bg-darkHover/30 flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90"
                        required
                    />
                    <motion.input
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 1.1,
                        }}
                        type="email"
                        name="email"
                        className="dark:bg-darkHover/30 flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90"
                        placeholder="Enter Your Email"
                        required
                    />
                </div>
                <motion.select
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 1.2,
                    }}
                    name="service"
                    className="dark:bg-darkHover/30 mb-6 w-full rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90"
                    required
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select a Service
                    </option>
                    {serviceData.map(({ title }) => (
                        <option key={title} value={title}>
                            {title}
                        </option>
                    ))}
                </motion.select>
                <motion.textarea
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    name="message"
                    placeholder="Enter Your Message"
                    className="dark:bg-darkHover/30 mb-6 w-full rounded-md border-[0.5px] border-gray-400 bg-white p-4 outline-none dark:border-white/90"
                    rows={6}
                    required
                ></motion.textarea>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    transition={{
                        duration: 0.3,
                    }}
                    type="submit"
                    disabled={isSending}
                    className="dark:hover:bg-darkHover mx-auto flex w-max cursor-pointer items-center justify-between gap-2 rounded-full bg-black/80 px-8 py-3 text-white duration-500 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-[0.5px] dark:bg-transparent"
                >
                    {isSending ? 'Sending...' : 'Submit Now'}{' '}
                    <Image
                        src={assets.right_arrow_white}
                        alt="Arrow Icon"
                        className="w-4"
                    />
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default Contact;
