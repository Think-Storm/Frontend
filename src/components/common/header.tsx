import Image from "next/image";
import { Button } from "../ui/button";
import * as React from "react";

export default function Header({leftChildren, middleChildren, rightChildren} : {leftChildren: React.ReactNode, middleChildren: React.ReactNode, rightChildren: React.ReactNode}) {
    return (
        <div className="fixed top-0 left-0 right-0 w-screen z-[100] flex flex-wrap justify-between items-center p-3 md:p-4 bg-white text-black">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-2 sm:ml-4 md:ml-6">
                <Button 
                    href="/"
                    variant="ghost"
                    size="lg"
                    className="flex items-center gap-2 px-0 mx-0"
                    target="_self"
                >
                    <Image
                        src="/images/logo-gradient.png"
                        alt="Logo"
                        width={40}
                        height={24}
                        className="w-[45px] h-auto object-contain"
                    />

                    <span className="text-2xl md:text-3xl font-semibold leading-none">
                        ThinkStorm
                    </span>
                </Button>  
               {leftChildren}
            </div>
            <div>
                {middleChildren}
            </div>
            <div> 
                {rightChildren}
            </div>
        </div>
    );
}
