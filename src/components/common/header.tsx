import Image from "next/image";
import { Button, GradientButton } from "../ui/button";

export default function Header() {
    return (
        <div className="sticky top-0 z-100 flex justify-between items-center p-4 bg-white text-black mt-1">
            <div className="flex items-center gap-[4px] ml-6">
                <Image src="/images/logo-gradient.png" alt="Logo" width={45} height={25} />
                <span className="text-4xl leading-[30px] font-semibold h-[30px] flex items-center">ThinkStorm</span>
                <Button variant="white" size="lg" className="ml-3 text-xl leading-[30px] mt-[3px] px-4">
                    Contact Us
                </Button>
            </div>
            <GradientButton className="mr-6">Join The Waitlist</GradientButton>
        </div>
    );
}
