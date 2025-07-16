"use client";

import Image from "next/image";
import { Button, GradientButton } from "@/components/ui/button";
import { cardData } from "@/constants/home";
import Card from "@/components/features/home/components/card";
import { useScroll, motion, useTransform } from "framer-motion";
import SectionFAQ from "@/components/features/home/components/sectionFAQ";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { useEffect, useState } from "react";

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

            const section2Start = height * 0.98;

            const maxScale = width < 640 ? 1.2 : width < 1024 ? 1.3 : 1.5;
            const maxY = height * 0.73;

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
        <>
            {/* Section1 */}
            <section className="relative isolate z-[50] min-h-[100vh] flex items-center justify-center overflow-visible">
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
                </motion.div>

                <motion.div
                    className="relative z-10 px-4 text-center w-full pointer-events-none"
                    style={{
                        y: useTransform(scrollY, [0, scrollLimits.section2Start], [0, scrollLimits.maxY]),
                        scale: useTransform(scrollY, [0, scrollLimits.section2Start], [1, scrollLimits.maxScale]),
                        opacity: useTransform(
                            scrollY,
                            [0, scrollLimits.section2Start * 0.8, scrollLimits.section2Start],
                            [1, 0.8, 0.2]
                        ),
                    }}
                >
                    <motion.h1
                        className="font-extrabold tracking-tight text-white absolute left-1/2 -translate-x-1/2 w-full
                                    text-[28px]
                                    min-[1887px]:text-[80px]
                                    min-[1720px]:text-[75px]
                                    min-[1520px]:text-[70px]
                                    min-[1400px]:text-[65px]
                                    min-[1280px]:text-[60px]
                                    min-[1024px]:text-[55px]
                                    min-[880px]:text-[50px]
                                    min-[768px]:text-[45px]
                                    min-[640px]:text-[40px] 
                                    max-w-[75%]
                                    min-[1520px]:max-w-[100%]
                                    min-[1400px]:max-w-[60%]
                                    min-[1280px]:max-w-[60%]
                                    min-[1024px]:max-w-[60%]
                                    min-[755px]:max-w-[60%]
                                    min-[640px]:max-w-[75%]"
                        style={{
                            opacity: useTransform(scrollY, [0, 150], [1, 0]),
                        }}
                    >
                        LET’S START YOUR DEVELOPER JOURNEY.
                    </motion.h1>

                    <motion.h1
                        className="overflow-x-auto font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-500 to-orange-400 bg-clip-text text-transparent absolute left-1/2 -translate-x-1/2 text-center px-4 break-words
                                    text-[20px]
                                    min-[1887px]:text-[80px]
                                    min-[1720px]:text-[75px]
                                    min-[1520px]:text-[60px]
                                    min-[1400px]:text-[55px]
                                    min-[1280px]:text-[50px]
                                    min-[1024px]:text-[45px]
                                    min-[880px]:text-[35px]
                                    min-[768px]:text-[30px]
                                    min-[640px]:text-[25px]
                                    max-w-[100%]
                                    min-[1887px]:max-w-[70%]
                                    min-[1720px]:max-w-[70%]
                                    min-[1520px]:max-w-[65%]
                                    min-[1400px]:max-w-[50%]
                                    min-[1280px]:max-w-[45%]
                                    min-[1024px]:max-w-[50%]
                                    min-[768px]:max-w-[45%]
                                    min-[640px]:max-w-[60%]
  "
                        style={{
                            opacity: useTransform(scrollY, [150, 300], [0, 1]),
                        }}
                    >
                        LET’S START YOUR DEVELOPER JOURNEY.
                    </motion.h1>

                    <motion.p
                        className="mx-auto text-white/90 mt-[26vh] mb-[60px]
                                    text-[20px]
                                    min-[1520px]:text-[30px]
                                    min-[1400px]:text-[24px]
                                    min-[1024px]:text-[22px]
                                    min-[640px]:text-[20px]
                                    max-w-[70%]
                                    min-[1520px]:max-w-[100%]
                                    min-[1024px]:max-w-[100%]
                                    min-[768px]:max-w-[60%]
                                    min-[640px]:max-w-[60%]"
                        style={{
                            opacity: useTransform(scrollY, [0, 100, 200], [1, 0.7, 0]),
                        }}
                    >
                        The leading collaboration platform to grow your career and shape your future.
                    </motion.p>

                    <motion.div
                        className="mt-8 flex items-center justify-center"
                        style={{
                            y: useTransform(scrollY, [0, 300, 600], [0, 60, 150]),
                            opacity: useTransform(scrollY, [0, 100, 200], [1, 0.7, 0]),
                            scale: useTransform(scrollY, [0, 300, 600], [1, 1.05, 1.1]),
                        }}
                    >
                        <GradientButton
                            className="flex items-center justify-center pointer-events-auto"
                            textClassName="text-[20px]
                                    min-[1720px]:text-[27px] min-[1720px]:py-6
                                    min-[1400px]:text-[23px] min-[1400px]:py-5
                                    min-[1024px]:text-[21px] min-[1024px]:py-4
                                    min-[640px]:text-[20px] min-[640px]:py-3
                                    "
                        >
                            Coming Soon!
                        </GradientButton>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section2 */}
            <FadeInWhenVisible>
                <motion.section
                    initial={{ opacity: 0, y: 80, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="px-6 flex flex-col lg:flex-row items-center justify-center gap-10 bg-white
                        pt-[8vh]
                        min-[1887px]:pt-[28vh]
                        min-[1720px]:pt-[25vh]
                        min-[1520px]:pt-[18vh]
                        min-[1400px]:pt-[16vh]
                        min-[1280px]:pt-[15vh]
                        min-[1024px]:pt-[11vh]
                        min-[880px]:pt-[7vh]
                        min-[768px]:pt-[6vh]
                        min-[640px]:pt-[5vh]
                        min-[470px]:pt-[-3vh]
                        min-[350px]:pt-[4vh]"
                >
                    {/* Text Contents */}
                    <div className="order-last lg:order-none max-w-2xl">
                        <h2 className="text-sm font-semibold text-gray-600 mb-2">About</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-8">
                            Create inspiring projects for education, open-source initiatives, or profit-driven purposes.
                        </h3>
                        <p className="text-gray-700 mb-6 text-[19px]">
                            ThinkStorm is the premier platform for creating projects with millions of developers
                            worldwide, learning new programming languages, and innovating to inspire by building the
                            world of tomorrow.
                        </p>
                        <ul className="text-gray-700 space-y-2 mb-6">
                            <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Explore and discover project ideas from around the world.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Create your own project and collaborate with others.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>→</span>
                                <span>Build your own developer portfolio and advance your career.</span>
                            </li>
                        </ul>
                        <Button className="z-51" variant="secondary" size="lg">
                            Learn more
                        </Button>
                    </div>
                    <div className="order-first lg:order-none lg:max-w-2xl max-w-xl lg:block hidden">
                        <Image
                            src="/images/home-project-illustration.png"
                            alt="Project illustration"
                            width={400}
                            height={300}
                        />
                    </div>
                </motion.section>
            </FadeInWhenVisible>
            {/* Section3 */}
            <FadeInWhenVisible>
                <section className="px-6 pt-20 bg-white flex flex-col lg:flex-row gap-10 items-center justify-center">
                    {/* Left Side */}
                    <FadeInWhenVisible delay={0.1}>
                        <div className="lg:w-full space-y-6 lg:max-w-[450px] max-w-2xl">
                            <h2 className="text-sm font-semibold text-gray-600">Services</h2>
                            <h3 className="text-3xl md:text-4xl font-bold mb-8">
                                It’s always hard to start from scratch on your own
                            </h3>
                            <p className="text-gray-700 text-[19px]">
                                Have you watched the entire YouTube tutorial for the programming languages you want to
                                learn? Are you feeling frustrated with the meaningless projects you’ve completed?
                            </p>
                            <GradientButton>Coming Soon!</GradientButton>
                        </div>
                    </FadeInWhenVisible>
                    {/* Right Side Cards */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-[600px] max-w-2xl">
                        {cardData.map((card, idx) => (
                            <FadeInWhenVisible delay={0.1 + idx * 0.15} key={idx}>
                                <div key={idx} className="space-y-2">
                                    <Card
                                        emoji={card.emoji}
                                        title={card.title}
                                        description={card.description}
                                        learnmoreLink={card.learnmoreLink}
                                    />
                                </div>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </section>
            </FadeInWhenVisible>
            {/* Section4 - FAQ */}
            <SectionFAQ />
        </>
    );
}
