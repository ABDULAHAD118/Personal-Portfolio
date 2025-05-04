import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';

interface FormDataEventTarget extends EventTarget {
    reset: () => void;
}

interface FormSubmitEvent extends FormEvent<HTMLFormElement> {
    target: FormDataEventTarget;
}

const Contact = ({ isDarkMode }: { isDarkMode: boolean }) => {
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
        <div
            className="w-full scroll-mt-20 bg-[url(/footer-bg-color.png)] bg-[length:90%_auto] bg-center bg-no-repeat px-[12%] py-10 dark:bg-none"
            id="contact"
        >
            <h4 className="font-Ovo mb-2 text-center text-lg">
                Connect With Me
            </h4>
            <h2 className="font-Ovo text-center text-5xl">Get In Touch</h2>
            <p className="font-Ovo mx-auto mt-5 mb-12 max-w-2xl text-center">
                {`I'd`} love to hear from you! If you have any questions,
                comments or feedback, please use the form below.
            </p>
            <form className="mx-auto max-w-2xl" onSubmit={onSubmit}>
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
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        className="dark:bg-darkHover/30 flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        className="dark:bg-darkHover/30 flex-1 rounded-md border-[0.5px] border-gray-400 bg-white p-3 outline-none dark:border-white/90"
                        placeholder="Enter Your Email"
                        required
                    />
                </div>
                <textarea
                    name="message"
                    placeholder="Enter Your Message"
                    className="dark:bg-darkHover/30 mb-6 w-full rounded-md border-[0.5px] border-gray-400 bg-white p-4 outline-none dark:border-white/90"
                    rows={6}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="dark:hover:bg-darkHover mx-auto flex w-max cursor-pointer items-center justify-between gap-2 rounded-full bg-black/80 px-8 py-3 text-white duration-500 hover:bg-black dark:border-[0.5px] dark:bg-transparent"
                >
                    Submit Now{' '}
                    <Image
                        src={assets.right_arrow_white}
                        alt="Arrow Icon"
                        className="w-4"
                    />
                </button>
                <p className="mt-4">{result}</p>
            </form>
        </div>
    );
};

export default Contact;
