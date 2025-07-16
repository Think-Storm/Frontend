import Image from "next/image";
import { Button, GradientButton } from "../ui/button";
import { siteMetadata } from "@/constants/metadata";

export default function Header() {
    return (
        <div className="sticky top-0 z-100 flex flex-wrap justify-between items-center p-3 md:p-4 bg-white text-black mt-1 overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-2 sm:ml-4 md:ml-6">
                <Image
                    src="/images/logo-gradient.png"
                    alt="Logo"
                    width={40}
                    height={24}
                    className="w-[30px] sm:w-[40px] md:w-[45px] h-auto"
                />

                <span className="text-lg sm:text-2xl md:text-3xl xl:text-4xl font-semibold leading-none flex items-center h-auto">
                    ThinkStorm
                </span>

                <Button
                    variant="white"
                    size="lg"
                    className="text-sm sm:text-base md:text-lg xl:text-xl leading-[28px] px-3 sm:px-4 md:px-6 mt-[2px]"
                    href={`mailto:${siteMetadata.email}`}
                >
                    Contact Us
                </Button>
            </div>

            <GradientButton className="mr-2 sm:mr-4 md:mr-6 text-sm sm:text-base md:text-lg xl:text-xl max-[640px]:!hidden">
                Coming Soon!
            </GradientButton>
        </div>
    );
}
