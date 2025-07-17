import { GradientButton } from "@/components/ui/button";
import FadeInStagger, { itemVariants } from "@/components/ui/FadeInStagger";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import { faqList } from "@/constants/home";
import { siteMetadata } from "@/constants/metadata";
import { motion } from "framer-motion";

export default function SectionFAQ() {
    return (
        <FadeInWhenVisible>
            <section className="px-6 py-20 bg-white text-center">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6">FAQs</h2>
                <p className="max-w-3xl mx-auto text-gray-600 mb-12 text-[19px]">
                    Welcome to ThinkStorm! We’re building a unique platform to connect innovators, developers, and
                    recruiters in meaningful ways. Here, you&apos;ll find answers to some common questions about how
                    ThinkStorm works, who it’s for, and what you can expect from the platform. If you&apos;re ready to
                    discover, collaborate, and showcase your skills, ThinkStorm is here to empower your journey.
                </p>

                {/* FAQ Cards */}
                <FadeInStagger>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center max-w-6xl mx-auto mb-16">
                        {faqList.map((faq, idx) => (
                            <motion.div key={idx} variants={itemVariants}>
                                <div className="text-3xl mb-2">❓</div>
                                <h4 className="font-semibold mb-3">{faq.question}</h4>
                                <p className="text-gray-600">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeInStagger>
                {/* Still have questions */}
                <FadeInWhenVisible delay={0.56}>
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">Still have a questions?</h3>
                        <p className="text-gray-600 mb-6 text-md">
                            If you still have questions or need more details, we’re here to help! Reach out to us, and
                            we’ll be happy to assist you on your ThinkStorm journey. Whether you&apos;re curious about
                            features, need guidance on getting started, or just want to share feedback, we’re only a
                            click away.
                        </p>
                        <GradientButton target="_blank" href={`mailto:${siteMetadata.email}`}>Contact Us</GradientButton>
                    </div>
                </FadeInWhenVisible>
            </section>
        </FadeInWhenVisible>
    );
}
