import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
interface FormDataEventTarget extends EventTarget {
    reset: () => void;
}
interface FormSubmitEvent extends FormEvent<HTMLFormElement> {
    target: FormDataEventTarget;
}

const Contact = () => {
    const [result, setResult] = useState('');

    const onSubmit = async (event: FormSubmitEvent): Promise<void> => {
        event.preventDefault();
        setResult('Sending....');
        const formData = new FormData(event.target as HTMLFormElement);

        formData.append('access_key', 'b06d4454-5db9-4a51-b7f4-af6e03cab169');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setResult('Form Submitted Successfully');
            event.target.reset();
        } else {
            console.log('Error', data);
            setResult(data.message);
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
                    <input
                        type="hidden"
                        name="subject"
                        value="📢 Contact Request via Portfolio – Check it Out!"
                    />
                    <input
                        type="hidden"
                        name="from_name"
                        value="Contact Gateway – Abdulahad Hussain"
                    />
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
                    className="dark:hover:bg-darkHover mx-auto flex w-max cursor-pointer items-center justify-between gap-2 rounded-full bg-black/80 px-8 py-3 text-white duration-500 hover:bg-black dark:border-[0.5px] dark:bg-transparent"
                >
                    Submit Now{' '}
                    <Image
                        src={assets.right_arrow_white}
                        alt="Arrow Icon"
                        className="w-4"
                    />
                </motion.button>
                <p className="mt-4">{result}</p>
            </motion.form>
        </motion.div>
    );
};

export default Contact;
