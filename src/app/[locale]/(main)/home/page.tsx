import Image from "next/image";
import { Button, GradientButton } from "../../../../components/ui/button";
import { cardData } from "@/constants/home";
import Card from "@/components/features/home/components/card";
import SectionFAQ from "@/components/features/home/components/sectionFAQ";

export default function Home() {
    return (
        <>
            {/* Section1 */}
            <section className="relative h-[500px] flex items-center justify-center text-white text-center overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/bg-home.png"
                        alt="Home background"
                        fill
                        className="object-cover block"
                        priority
                        aria-hidden="true"
                    />
                </div>

                <div className="z-10 px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">LET’S START YOUR DEVELOPER JOURNEY.</h1>
                    <p className="text-lg md:text-xl mb-6">
                        The leading collaboration platform to grow your career and shape your future.
                    </p>
                    <GradientButton>Join The Waitlist</GradientButton>
                </div>
            </section>
            {/* Section2 */}
            <section className="px-6 pt-20 flex flex-col lg:flex-row items-center justify-center gap-10 bg-white">
                {/* Text Contents */}
                <div className="order-last lg:order-none max-w-2xl">
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">About</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-8">
                        Create inspiring projects for education, open-source initiatives, or profit-driven purposes.
                    </h3>
                    <p className="text-gray-700 mb-6 text-[19px]">
                        ThinkStorm is the premier platform for creating projects with millions of developers worldwide,
                        learning new programming languages, and innovating to inspire by building the world of tomorrow.
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
            </section>
            {/* Section3 */}
            <section className="px-6 pt-20 bg-white flex flex-col lg:flex-row gap-10 items-center justify-center">
                {/* Left Side */}
                <div className="lg:w-1/3 space-y-6 lg:max-w-[450px] max-w-2xl">
                    <h2 className="text-sm font-semibold text-gray-600">Services</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-8">
                        It’s always hard to start from scratch on your own
                    </h3>
                    <p className="text-gray-700 text-[19px]">
                        Have you watched the entire YouTube tutorial for the programming languages you want to learn?
                        Are you feeling frustrated with the meaningless projects you’ve completed?
                    </p>
                    <GradientButton>Join The Waitlist</GradientButton>
                </div>

                {/* Right Side Cards */}
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-[600px] max-w-2xl">
                    {cardData.map((card, idx) => (
                        <div key={idx} className="space-y-2">
                            <Card
                                emoji={card.emoji}
                                title={card.title}
                                description={card.description}
                                learnmoreLink={card.learnmoreLink}
                            />
                        </div>
                    ))}
                </div>
            </section>
            {/* Section4 - FAQ */}
            <SectionFAQ />
        </>
    );
}
