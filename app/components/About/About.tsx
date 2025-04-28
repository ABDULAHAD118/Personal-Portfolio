import { assets, infoList, toolsData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <div className="w-full scroll-mt-20 px-[12%] py-10" id="about">
            <h4 className="font-Ovo! mb-2 text-center text-lg">Introduction</h4>
            <h2 className="font-Ovo! text-center text-5xl">About me</h2>
            <div className="my-20 flex w-full flex-col items-center gap-20 lg:flex-row">
                <div className="w-64 max-w-none rounded-3xl sm:w-80">
                    <Image
                        src={assets.user_image}
                        alt="User Image"
                        className="w-full rounded-3xl"
                    />
                </div>
                <div className="flex-1">
                    <p className="font-Ovo! mb-10 max-w-2xl">
                        I am an experienced Full Stack Developer with over a
                        decade of expertise in building scalable, user-centric
                        applications. I have collaborated with prestigious
                        organizations, delivering end-to-end solutions that
                        drive growth and success.
                    </p>
                    <ul className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
                        {infoList.map(
                            ({ icon, iconDark, title, description }, index) => (
                                <li
                                    key={index}
                                    className="hover:bg-lightHover! cursor-pointer rounded-xl border-[0.5px] border-gray-400 p-6 duration-500 hover:-translate-y-1 hover:shadow-black"
                                >
                                    <Image
                                        src={icon}
                                        alt={title}
                                        className="mt-3 w-7"
                                    />
                                    <h3 className="my-4 font-semibold text-gray-700">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {description}
                                    </p>
                                </li>
                            )
                        )}
                    </ul>
                    <h4 className="font-Ovo! my-6 text-gray-700">Tool I Use</h4>
                    <ul className="flex items-center gap-3 sm:gap-5">
                        {toolsData.map((tool, index) => (
                            <li
                                key={index}
                                className="hover:bg-lightHover! flex aspect-square w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-400 duration-500 hover:-translate-y-1 sm:w-14"
                            >
                                <Image
                                    src={tool}
                                    alt="Tool"
                                    className="w-5 sm:w-7"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
