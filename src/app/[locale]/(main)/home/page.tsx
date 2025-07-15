"use client";

import Image from "next/image";
import { Button, GradientButton } from "../../../../components/ui/button";
import { cardData } from "@/constants/home";
import Card from "@/components/features/home/components/card";
import { useScroll, motion, useTransform } from "framer-motion";
import SectionFAQ from "@/components/features/home/components/sectionFAQ";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";

export default function Home() {
    const { scrollY } = useScroll();

    const whiteToTransparent = useTransform(scrollY, [0, 300], [1, 0]);
    const showGradient = useTransform(scrollY, [100, 300], [0, 1]);

    const scale = useTransform(scrollY, [0, 300, 600], [1, 1.3, 1.5]);
    const y = useTransform(
        scrollY,
        [0, 50, 100, 200, 250, 300, 400, 500, 600],
        [0, 60, 90, 240, 280, 310, 350, 390, 450]
    );
    const opacity = useTransform(scrollY, [0, 400, 700], [1, 0.6, 0]);
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
                            ["blur(0px) brightness(1)", "blur(6px) brightness(0.9)", "blur(14px) brightness(0.8)"]
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
                    className="relative z-50 px-4 text-center"
                    style={{
                        y: useTransform(scrollY, [0, 300, 900], [0, 250, 570]),
                        scale: useTransform(scrollY, [0, 300, 900], [1, 1.5, 2]),
                        opacity: useTransform(scrollY, [0, 800, 950], [1, 1, 0]),
                    }}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-extrabold tracking-tight text-white absolute left-1/2 -translate-x-1/2 w-full"
                        style={{
                            opacity: useTransform(scrollY, [0, 150], [1, 0]),
                        }}
                    >
                        LET’S START YOUR DEVELOPER JOURNEY.
                    </motion.h1>

                    <motion.h1
                        className="overflow-visible text-4xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-500 to-orange-400 bg-clip-text text-transparent absolute left-1/2 -translate-x-1/2 w-full"
                        style={{
                            opacity: useTransform(scrollY, [150, 300], [0, 1]),
                        }}
                    >
                        LET’S START YOUR DEVELOPER JOURNEY.
                    </motion.h1>

                    <motion.p
                        className="text-md md:text-xl max-w-3xl mx-auto text-white/90 mt-[170px] mb-[60px]"
                        style={{
                            y: useTransform(scrollY, [0, 300, 600], [0, 80, 150]),
                            opacity: useTransform(scrollY, [0, 400, 650], [1, 0.6, 0]),
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
                        <GradientButton>Join The Waitlist</GradientButton>
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
                    className="z-10 px-6 pt-20 flex flex-col lg:flex-row items-center justify-center gap-10 bg-white"
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
                        <Button
                            variant="secondary"
                            size="lg"
                            className="rounded-md text-lg px-6 py-3 shadow transition transform duration-200 hover:scale-105 hover:bg-secondary/80"
                        >
                            Learn more
                        </Button>
                    </div>
                    <div className="order-first lg:order-none lg:max-w-2xl max-w-xl">
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
                            <GradientButton>Join The Waitlist</GradientButton>
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
