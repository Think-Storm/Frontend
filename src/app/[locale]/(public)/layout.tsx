import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Button, GradientButton } from "@/components/ui/button";
import { siteMetadata } from "@/constants/metadata";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let leftChildren = (
        <Button
            variant="white"
            size="lg"
            className="text-sm sm:text-base md:text-lg xl:text-xl leading-[28px] px-3 sm:px-4 md:px-6 mt-[2px]"
            href={`mailto:${siteMetadata.email}`}
            target="_blank"
        >
            Contact Us
        </Button>
    );
    let rightChildren = (
        <div className="flex items-center mr-2 sm:mr-8 md:mr-10">
            <GradientButton className="mr-2 sm:mr-3 md:mr-4 text-sm sm:text-base md:text-lg xl:text-xl max-[640px]:!hidden">
                Register
            </GradientButton>
            <GradientButton
                className="text-sm sm:text-base md:text-lg xl:text-xl max-[640px]:!hidden"
                textBgWhite={true}
                textClassName="!text-black !bg-white"
            >
                Log In
            </GradientButton>
        </div>
    );
    return (
        <>
            <Header leftChildren={leftChildren} middleChildren={undefined} rightChildren={rightChildren} />
            {children}
            <Footer />
        </>
    );
}
