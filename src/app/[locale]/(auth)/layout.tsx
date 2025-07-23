"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row p-8 min-h-screen">
      {/* Background Images */}
      <aside className="fixed inset-0 -z-10 w-full lg:w-full lg:min-w-[1440px] min-h-screen overflow-hidden">
        {/* Desktop Background */}
        <Image
          src="/images/auth/auth-bg-with-logo.svg"
          alt=""
          aria-hidden="true"
          className="object-cover object-center scale-[1] lg:scale-100 hidden lg:block"
          fill
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/images/auth/auth-bg-without-logo.svg"
          alt=""
          aria-hidden="true"
          className="object-cover object-center scale-[1.2] lg:scale-100 block lg:hidden rotate-180"
          fill
        />
      </aside>
      {/* Left Spacer for Layout Adjustment */}
      <div className="lg:block lg:flex-1" aria-hidden="true" />
      {/* Main Content */}
      <main className="flex-1 z-10 w-full flex flex-col justify-between items-center gap-8 min-h-[calc(100vh-4rem)]">
        {/* Mobile Logo */}
        <header
          className="lg:hidden text-3xl font-bold"
          aria-label="mobile brand header"
        >
          <div className="flex flex-col items-center justify-center gap-1 text-white lg:hidden">
            <div className="flex items-center gap-1">
              <span>
                <Image
                  src="/images/common/thinkstorm-logo-white.svg"
                  alt=""
                  width={28}
                  height={28}
                />
              </span>
              <h1 className="text-3xl font-normal font-nippo">ThinkStorm</h1>
            </div>
            <div className="text-xl font-extralight text-center">
              Discover, Collaborate, Innovate.
            </div>
          </div>
        </header>
        {/* Form Container */}
        <section
          role="main"
          aria-label="authentication form section"
          className="w-full flex-1 flex items-center justify-center lg:justify-end"
        >
          <div className="w-full max-w-[640px] min-h-[90vh] p-12 bg-white rounded-2xl flex flex-col justify-center items-center">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
