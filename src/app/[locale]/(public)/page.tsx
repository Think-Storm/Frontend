"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Card from "@/components/features/home/components/card";
import SectionFAQ from "@/components/features/home/components/sectionFAQ";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { GradientButton, Button } from "@/components/ui/button";
import { cardData } from "@/constants/home";
import Link from "next/link";

export default function Landing() {
    const { scrollY } = useScroll();

    const [scrollLimits, setScrollLimits] = useState({
        section2Start: 800,
        maxScale: 1.5,
        maxY: 400,
    });

    useEffect(() => {
        const updateScrollLimits = () => {
            const height = window.innerHeight;
            const width = window.innerWidth;

            const section2Start = height * 0.7;

            const maxScale = width < 640 ? 1.2 : width < 1024 ? 1.3 : 1.5;
            const maxY = height * 0.45;

            setScrollLimits({
                section2Start,
                maxScale,
                maxY,
            });
        };

        updateScrollLimits();
        window.addEventListener("resize", updateScrollLimits);

        return () => window.removeEventListener("resize", updateScrollLimits);
    }, []);

    return (
        <div>
            {/* Section1 */}
            <section className="pt-[64px] relative isolate z-[50] xl:min-h-[120vh] flex items-center justify-center overflow-visible">
                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{
                        filter: useTransform(
                            scrollY,
                            [0, 300, 600],
                            ["brightness(1)", "brightness(0.9)", "brightness(0.8)"]
                        ),
                        opacity: useTransform(scrollY, [0, 300, 500], [1, 0.6, 0]),
                    }}
                >
                    <Image
                        src="/images/bg-home.png"
                        alt="Home background"
                        fill
                        className="object-cover"
                        priority
                        aria-hidden="true"
                    />
                    <Image
                        src="/images/bg-home-pattern.png"
                        alt="Home background"
                        fill
                        className="object-cover"
                        priority
                        aria-hidden="true"
                    />
                </motion.div>

                <div className="w-full h-screen md:h-full max-w-7xl mx-auto my-auto flex flex-col xl:flex-row items-center justify-between xl:gap-20 px-4 sm:px-8">
                    <div className="relative flex flex-col justify-center align-items w-full h-full min-h-[60vh] min-w-md max-w-7xl text-center">
                        <p className="text-gray-500 text-lg lg:text-xl xl:text-2xl mb-2">
                            Always hard to start from scratch?
                        </p>
                        <h2 className="text-4xl min-[520px]:text-5xl font-bold leading-tight">
                            Build a <span className="text-pink-600">Real-world</span>
                            <br />
                            Project{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">Together</span>
                                <div className="absolute inset-0 -top-1 -left-5 w-[115%] h-[130%] -z-10">
                                    <Image
                                        src="/images/home-circle.png"
                                        alt="Purple Circle"
                                        fill
                                        className="object-contain"
                                        priority
                                        aria-hidden="true"
                                    />
                                </div>
                            </span>
                        </h2>
                        <div className="mt-6 flex justify-center">
                            <GradientButton
                                className="p-[3px] rounded-[12px]"
                                textClassName="!bg-black !text-white px-6 py-2"
                            >
                                Get Started
                            </GradientButton>
                        </div>
                        <div className="mt-2 flex justify-center xl:hidden">
                            <GradientButton
                                textBgWhite
                                textClassName="w-[170px] !bg-white !text-black text-sm sm:text-base"
                            >
                                Let&apos;s collaborate!
                            </GradientButton>
                        </div>
                    </div>

                    <div className="relative w-screen min-w-3xl h-[80vh] xl:h-[670px] ml-20 -mt-10 xl:mt-0 md:block hidden">
                        <div className="z-30 absolute hidden xl:block xl:top-1 xl:right-[25%]">
                            <GradientButton
                                textBgWhite
                                textClassName="w-[170px] !bg-white !text-black text-sm sm:text-base"
                            >
                                Let&apos;s collaborate!
                            </GradientButton>
                        </div>
                        <Image
                            src="/images/home-collab.png"
                            alt="Home Collaboration Image"
                            fill
                            className="object-contain xl:object-cover"
                            priority
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </section>

            {/* Section2 */}
            <FadeInWhenVisible>
                <motion.section
                    initial={{ opacity: 0, y: 80, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative z-25 flex flex-col-reverse md:flex-row items-center justify-center gap-12 lg:gap-32 px-6 min-h-[50vh] overflow-hidden"
                >
                    {/* Left Section */}
                    <div className="max-w-2xl text-center md:text-left space-y-6">
                        <Link
                            href="/"
                            className="inline-flex border-b-2 pb-2 items-center justify-center md:justify-start"
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt="Copy Icon"
                                width={15}
                                height={15}
                                className="mx-auto md:mx-0"
                                priority
                            />
                            <p className="text-md md:text-lg text-black font-medium pl-2">ThinkStorm Platform</p>
                        </Link>

                        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-black leading-snug">
                            ThinkStorm is a unique collaborative platform to connect all tech professionals, learners
                            and innovators!
                        </h1>

                        <Button variant="outline" size="lg" className="px-6 py-2">
                            Get Started
                        </Button>
                    </div>

                    {/* Right Section */}
                    <div className="mb-10 md:mb-0">
                        <Image
                            src="/images/home-section2-cloud.png"
                            alt="Cloud Image"
                            width={600}
                            height={600}
                            priority
                        />
                    </div>
                </motion.section>
            </FadeInWhenVisible>
            {/* Section3 */}
            <section className="relative px-6 pt-20 bg-white flex flex-col gap-1 items-center justify-center min-h-[100vh] z-20">
                <motion.div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/bg-home-section3-pattern.png"
                        alt="Section3 background Pattern"
                        fill
                        className="object-cover"
                        priority
                        aria-hidden="true"
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                  w-[150vw] h-[150vh] max-w-[78vw] max-h-[150vh]"
                        animate={{
                            scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src="/images/home-big-ecllipse.png"
                            alt="Eclipse"
                            fill
                            className="object-cover"
                            priority
                            aria-hidden="true"
                        />
                    </motion.div>
                </motion.div>

                <div className="flex flex-col justify-center w-full max-w-2xl lg:max-w-[400px] space-y-6 sm:space-y-8">
                    <div className="flex justify-center items-center gap-3">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Still Thinking?</h3>
                        <Image
                            src="/icons/sparkle.png"
                            alt="Sparkle Icon"
                            width={24}
                            height={20}
                            priority
                            className="mx-0"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-800">
                        Join ThinkStorm adventure and start building{" "}
                        <span className="text-pink-600 font-semibold">projects that make sense</span>{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">right away</span>
                            <div className="absolute inset-0 w-full h-full -z-10">
                                <Image
                                    src="/images/home-section3-circle.png"
                                    alt="Purple Circle"
                                    fill
                                    className="object-contain"
                                    priority
                                    aria-hidden="true"
                                />
                            </div>
                        </span>{" "}
                        with developers
                        <br className="hidden sm:block" />
                        around the world!
                    </div>

                    <div className="flex justify-center">
                        <GradientButton
                            className="text-sm sm:text-base md:text-lg xl:text-xl max-[640px]:!hidden"
                            textBgWhite={true}
                            textClassName="!text-black !bg-white"
                        >
                            Get Started
                        </GradientButton>
                    </div>
                </div>
            </section>
            {/* Section4 */}
            <section className="relative bg-white pb-10 pt-10 lg:pt-22 px-6 min-h-[200vh] md:min-h-[180px] xl:min-h-[150vh] z-10">
                <motion.div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/bg-home-section4.png"
                        alt="Section4 Background"
                        fill
                        className="object-cover"
                        priority
                        aria-hidden="true"
                    />
                </motion.div>

                <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className={`${card.bg} rounded-xl p-6 shadow-md flex flex-col gap-8 h-full pt-25 hover:animate-purpleGlow hover:cursor-pointer`}
                        >
                            <Image
                                src={card.icon}
                                alt="Card Icon"
                                width={30}
                                height={30}
                                className="object-contain"
                                priority
                                aria-hidden="true"
                            />
                            <h3 className="text-3xl font-semibold">{card.title}</h3>
                            <p className="text-md text-gray-700 leading-relaxed">{card.text}</p>
                        </div>
                    ))}
                </div>

                <div className="relative w-full py-24 px-6 md:px-20 overflow-hidden">
                    <div className="relative flex flex-col xl:flex-row z-20 max-w-5xl mx-auto bg-[#1f1c2e] text-white rounded-3xl px-10 py-12 pt-40 shadow-lg">
                        <div className="absolute -top-[10vh] left-[3vw] z-10">
                            <Image src="/images/home-section4-cloud.png" alt="Cloud Image" width={200} height={200} />
                        </div>
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-col max-w-lg">
                                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Who can join ThinkStorm?</h2>
                                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                    ThinkStorm is open to all tech professionals, freelancers, developers, designers,
                                    PMs, and learners eager to collaborate and innovate together.
                                </p>
                            </div>
                            <div className="absolute max-[380px]:hidden min-[570px]:bottom-35 min-[570px]:right-55 max-[570px]:bottom-15 max-[570px]:left-10 items-center z-20">
                                <GradientButton
                                    textBgWhite
                                    textClassName="w-[220px] h-[35px] !bg-white !text-black text-sm sm:text-base"
                                    className=""
                                >
                                    We&apos;re waiting for you!
                                </GradientButton>
                            </div>
                            <div className="absolute -bottom-8 max-[570px]:right-3 min-[570px]:right-7 items-center gap-4 z-10  hidden min-[570px]:block">
                                <Button className="px-10 py-2 text-lg" variant="pink" size="lg">
                                    Join!
                                </Button>
                            </div>
                            <div className="absolute mt-8 flex items-center gap-4 flex-wrap min-[570px]:right-25 -bottom-4 max-[570px]:left-10 z-20 hidden min-[570px]:block">
                                <Image
                                    src="/images/home-section4-avatars.png"
                                    alt="Avatars Image"
                                    width={350}
                                    height={350}
                                    className="object-contain"
                                    priority
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                        <div className="flex h-[80px] min-[570px]:h-[200px] w-full xl:w-[60%] xl:h-full min-x-[60%]"></div>
                    </div>

                    <div className="flex justify-center align-items mt-16 text-center text-2xl md:text-3xl font-medium leading-loose">
                        <span className="text-black relative inline">
                            Explore inspiring projects for
                            <br />
                            education, open-source initiatives, and business
                            <div className="absolute -bottom-5 -right-[5%]">
                                <Image
                                    src="/icons/sparkle3.svg"
                                    alt="Sparkle"
                                    width={30}
                                    height={30}
                                    className="object-contain"
                                    priority
                                    aria-hidden="true"
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </section>
            {/* section5 */}
            <SectionFAQ />
        </div>
    );
}
