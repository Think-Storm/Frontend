"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSelector from "@/components/common/locale/LanguageSelector";

export default function LandingPage() {
  const t = useTranslations("landing");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/bg-auth-plain.svg"
          alt="Background image"
          className="object-cover object-center"
          fill
          priority
        />
      </div>
      {/* Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex justify-end p-8">
          <LanguageSelector />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {t("welcome")}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>

            <nav
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 sm:pt-8"
              aria-label="authentication"
            >
              <Link
                href="/signin"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black rounded-full text-base sm:text-lg font-medium hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
              >
                {t("signIn")}
              </Link>
              <Link
                href="/signup"
                className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white text-white rounded-full text-base sm:text-lg font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl"
              >
                {t("signUp")}
              </Link>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
