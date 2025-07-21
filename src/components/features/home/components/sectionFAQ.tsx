import Image from "next/image";
import { motion } from "framer-motion";
import FadeInStagger, { itemVariants } from "@/components/ui/FadeInStagger";
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";
import FadeInFromTopOnly from "@/components/ui/FadeInFromTopOnly";
import { GradientButton } from "@/components/ui/button";
import { faqList } from "@/constants/home";
import Link from "next/link";
import { siteMetadata } from "@/constants/metadata";

export default function SectionFAQ() {
    return (
        <section className="w-full px-10 min-[450px]:px-20 min-[650px]:px-30 py-16 bg-[#1E1C26] text-white flex flex-col xl:flex-row justify-center items-center gap-5 xl:gap-20">
            <div className="w-full xl:w-1/2 space-y-4">
                <div className="text-sm text-gray-400 flex items-center gap-2">
                    <div>
                        <Link
                            href="/"
                            className="text-white inline-flex border-b-2 pb-2 items-center justify-center xl:justify-start"
                        >
                            <Image
                                src="/icons/copy-white.svg"
                                alt="Copy Icon"
                                width={15}
                                height={15}
                                className="mx-auto xl:mx-0"
                                priority
                            />
                            <p className="text-md xl:text-lg text-white font-medium pl-2">Frequently Asked Questions</p>
                        </Link>
                    </div>
                </div>
                {faqList.map((faq) => (
                    <div key={faq.id} className={`rounded-lg px-6 py-4 text-sm font-medium ${faq.bg} text-black`}>
                        {faq.question}
                    </div>
                ))}
            </div>

            <div className="flex pt-20">
                <div className="pr-3 pt-8 min-[520px]:block hidden">
                    <Image
                        src="/icons/arrow.svg"
                        alt="Arrow"
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>
                <div className="w-full xl:w-1/2 flex flex-col items-center xl:items-start text-left gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden mx-auto">
                            <Image
                                src="/images/home-section5-avatar.png"
                                alt="Contact Avatar"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -top-5 -left-6 w-24 h-24 border-dotted border-2 border-white rounded-full opacity-30 animate-ping" />
                    </div>
                    <p className="text-sm text-white max-w-md">
                        If you still have questions or need more details, we’re here to help! Reach out to us, and we’ll
                        be happy to assist you on your ThinkStorm journey. Whether you’re curious about features, need
                        guidance on getting started, or just want to share feedback, we’re only a click away.
                    </p>
                    <GradientButton
                        target="_blank"
                        href={`mailto:${siteMetadata.email}`}
                        textBgWhite
                        textClassName="!bg-white !text-black text-sm sm:text-base"
                    >
                        Contact Us
                    </GradientButton>
                </div>
            </div>
        </section>
    );
}
