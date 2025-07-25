"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import useHeaderVisibility from "@/components/ui/use-header-visibility";
import { siteMetadata } from "@/constants/metadata";

export default function PrivacyPolicy() {
  const { changeHeaderWhite, changeHeaderHidden } = useHeaderVisibility();
  const { scrollY } = useScroll();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (window.scrollY === 0) {
      changeHeaderWhite(false);
      changeHeaderHidden(false);
    }
    setIsInitialized(true);
  }, [changeHeaderWhite, changeHeaderHidden]);

  const updateHeaderState = useCallback(
    (currentScrollY: number) => {
      if (!isInitialized) return;

      if (currentScrollY === 0) {
        changeHeaderWhite(false);
        changeHeaderHidden(false);
      } else if (currentScrollY > 0) {
        changeHeaderWhite(true);
        changeHeaderHidden(false);
      }
    },
    [isInitialized, changeHeaderWhite, changeHeaderHidden]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    updateHeaderState(latest);
  });

  useEffect(() => {
    const handleLoad = () => {
      updateHeaderState(window.scrollY);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [updateHeaderState]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-30">
      <section className="flex flex-col items-center justify-center mt-[20vh] xl:mt-[25vh] mb-[10vh] xl:mb-[18vh] max-w-[65vw] xl:max-w-[60vw]">
        <h1 className="text-4xl xl:text-5xl text-center font-bold tracking-wide">
          Privacy Policy
        </h1>
        <p className="text-lg xl:text-xl text-center mt-10">
          Effective Date: July 25, 2025
        </p>
      </section>
      <section className="flex flex-col items-center justify-center max-w-[70vw] xl:max-w-[55vw]">
        <p className="text-md xl:text-lg mb-20 leading-relaxed">
          Welcome to ThinkStorm! This Privacy Policy describes how ThinkStorm
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
          and shares your personal information when you access or use our
          website and services, including thinkstorm.com (the
          &quot;Platform&quot;). By using our Platform, you agree to the terms
          outlined in this Privacy Policy. If you have any questions, please
          contact us at{" "}
          <span className="font-bold hover:underline">
            <Link href={`mailto:${siteMetadata.email}`} target="_blank">
              contact@thinkstorm.app
            </Link>
          </span>
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Information We Collect
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed">
          We collect personal information to enhance user experiences,
          facilitate matchmaking services, and for marketing. This includes:{" "}
          <br />- <span className="font-bold">Registration Information</span>:
          When you create an account, we collect your name, email address, and
          user profile information. <br />-{" "}
          <span className="font-bold">Usage Data</span>: We collect data such as
          IP address, browser type, and interactions with our Platform. This
          helps us understand how users engage with our services. <br />-{" "}
          <span className="font-bold">Cookies and Analytics</span>: We use
          cookies and similar technologies to track user activity and improve
          our services. Users may manage cookie preferences via browser
          settings.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          How We Use Your Information
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          We process personal information to:
          <br />- Facilitate user matchmaking and communication on the Platform,{" "}
          <br />
          - Improve our services based on user engagement and feedback, <br />-
          Send promotional communications and updates (with the option to
          unsubscribe).
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Sharing Your Information with Third Parties
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          Currently, we do not share personal information with third-party
          service providers. If and when third-party providers (e.g., for
          analytics, marketing, or payments) are added, this Privacy Policy will
          be updated to reflect those relationships.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Data Security
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          We implement security measures, including password encryption, to
          protect your personal information. However, please note that no
          electronic transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          International Data Transfers
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          Since we serve users globally, including in the European Union (EU),
          we comply with GDPR requirements for international data transfers.
          Data transferred outside of the EU is protected under legally approved
          safeguards to ensure adequate data protection.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Data Retention
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          We retain personal data as follows: <br />-{" "}
          <span className="font-bold">Account Information</span>: Retained for
          the duration of the active account. Upon deletion, data is retained
          for 90 days to accommodate reactivation requests. <br />-{" "}
          <span className="font-bold">Usage and Analytics Data</span>: Retained
          for 6 to 12 months for internal analysis, after which it is anonymized
          or deleted. <br />- <span className="font-bold">Marketing Data</span>:
          Retained until users unsubscribe or after 12–24 months of inactivity.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          User Rights and Choices
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          Depending on your location, you may have rights regarding your
          personal data: <br />
          - Access, update, or delete your data, <br />
          - Withdraw consent for data processing, <br />
          - Opt-out of marketing communications.
          <br />
          <br />
          Please contact us at{" "}
          <span className="font-bold hover:underline">
            <Link href={`mailto:${siteMetadata.email}`} target="_blank">
              contact@thinkstorm.app
            </Link>
          </span>{" "}
          to exercise these rights.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Changes to This Privacy Policy
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          We may update this Privacy Policy periodically to reflect changes in
          our practices. The &quot;Last Updated&quot; date at the top of this
          page indicates the latest revision date.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Contact Us
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          For any questions about these Terms, please contact us at:{" "}
          <span className="font-bold hover:underline">
            <Link href={`mailto:${siteMetadata.email}`} target="_blank">
              contact@thinkstorm.app
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
}
