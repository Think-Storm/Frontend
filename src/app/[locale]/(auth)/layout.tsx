"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-[url('/images/bg-auth-plain.png')] bg-cover bg-center bg-no-repeat" />
      <div className="relative mx-auto min-h-screen flex flex-col justify-center items-center px-8 py-8">
        <header className="absolute top-50 left-10 text-3xl font-bold hidden lg:block">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-black">
                <Image
                  src="/images/common/thinkstorm-logo-white.svg"
                  alt="think storm logo"
                  width={42}
                  height={42}
                  className="filter invert"
                />
              </span>
              <h1 className="text-4xl font-normal font-nippo">ThinkStorm</h1>
            </div>
            <div className="text-xl font-extralight text-gray-700 ml-4">
              Discover, Collaborate, Innovate.
            </div>
          </div>
        </header>

        <header className="text-3xl font-bold lg:hidden mb-8">
          <div className="flex flex-col gap-1 items-center">
            <div className="flex items-center gap-1">
              <span className="text-black">
                <Image
                  src="/images/common/thinkstorm-logo-white.svg"
                  alt="think storm logo"
                  width={42}
                  height={42}
                  className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px] filter invert"
                />
              </span>
              <h1 className="text-3xl lg:text-4xl font-normal font-nippo">
                ThinkStorm
              </h1>
            </div>
            <div className="text-base lg:text-xl font-extralight text-gray-700">
              Discover, Collaborate, Innovate.
            </div>
          </div>
        </header>

        <section
          role="main"
          className="w-full flex items-center justify-center lg:justify-end relative"
        >
          <div className="h-screen w-full max-w-[500px] p-[2px] bg-gradient-to-r from-[#5e00c3] to-[#F81A1A] rounded-2xl relative">
            <div className="absolute top-0 -left-48 w-64 h-64 bg-[url('/images/bg-cloud.svg')] bg-contain bg-no-repeat hidden lg:block animate-cloud" />
            <div className="w-full h-full flex flex-col items-center overflow-y-auto bg-white rounded-[calc(1rem-2px)] ">
              <div className="w-full flex-1 flex flex-col justify-center items-center p-12">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
