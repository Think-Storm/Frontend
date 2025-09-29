'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import useHeaderVisibility from '@/hooks/use-header-visibility'
import { siteMetadata } from '@/constants/metadata'

export default function TermsOfService() {
  const { changeHeaderWhite, changeHeaderHidden } = useHeaderVisibility()
  const { scrollY } = useScroll()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (window.scrollY === 0) {
      changeHeaderWhite(false)
      changeHeaderHidden(false)
    }
    setIsInitialized(true)
  }, [changeHeaderWhite, changeHeaderHidden])

  const updateHeaderState = useCallback(
    (currentScrollY: number) => {
      if (!isInitialized) return

      if (currentScrollY === 0) {
        changeHeaderWhite(false)
        changeHeaderHidden(false)
      } else if (currentScrollY > 0) {
        changeHeaderWhite(true)
        changeHeaderHidden(false)
      }
    },
    [isInitialized, changeHeaderWhite, changeHeaderHidden],
  )

  useMotionValueEvent(scrollY, 'change', (latest) => {
    updateHeaderState(latest)
  })

  useEffect(() => {
    const handleLoad = () => {
      updateHeaderState(window.scrollY)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [updateHeaderState])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-30">
      <section className="flex flex-col items-center justify-center mt-[20vh] xl:mt-[25vh] mb-[10vh] xl:mb-[18vh] max-w-[65vw] xl:max-w-[60vw]">
        <h1 className="text-4xl xl:text-5xl text-center font-bold tracking-wide">
          Terms of Service
        </h1>
        <p className="text-lg xl:text-xl text-center mt-10">
          Effective Date: July 25, 2025
        </p>
      </section>
      <section className="flex flex-col items-center justify-center max-w-[70vw] xl:max-w-[55vw]">
        <p className="text-md xl:text-lg mb-20 leading-relaxed">
          Welcome to ThinkStorm! These Terms of Service (&quot;Terms&quot;)
          govern your access to and use of our website and services, including
          thinkstorm.com (the &quot;Platform&quot;). By using our Platform, you
          agree to comply with these Terms. Please read them carefully.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Eligibility and Account Responsibilities
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed">
          To use ThinkStorm, you must be at least 16 years old. Users under 18
          years of age must obtain parental or guardian consent before creating
          an account or using the Platform. By creating an account, you confirm
          that you meet these requirements. You agree to provide accurate
          information when creating an account and are responsible for
          maintaining the confidentiality of your login credentials.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Service Offerings and Use of Platform
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed">
          ThinkStorm provides a collaborative platform that facilitates project
          creation, networking, and resource sharing among professionals,
          innovators, and learners across various fields. Through the ThinkStorm
          platform, users can participate in project development, explore career
          growth opportunities, and engage in challenges and competitions
          tailored to different areas of expertise. By using the platform, you
          agree to the following: <br /> <br />
          1. Project Creation and Collaboration
          <br />
          <span className="pl-8 block">
            Users may initiate projects, form teams, and invite collaborators
            with appropriate permissions. ThinkStorm is not responsible for the
            outcomes of user-led projects; however, all members must agree to
            honour shared goals, protect proprietary information, and maintain
            the integrity of collaboration.
          </span>
          <br />
          2. Competition and Challenges
          <br />
          <span className="pl-8 block">
            ThinkStorm may host competitions or challenges to inspire
            innovation. By participating, users agree to the competition rules
            and understand that ThinkStorm retains the right to assess
            submissions and award recognitions at its discretion.
          </span>
          <br />
          3. Career Development and Job Offers
          <br />
          <span className="pl-8 block">
            ThinkStorm offers career-building resources that focus on showcasing
            users&apos; project portfolios rather than traditional resumes. Any
            job offers facilitated through the platform are external to
            ThinkStorm and solely managed by the employer and candidate.
          </span>
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          User Conduct
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          You agree to: <br />
          - Use the Platform for lawful purposes, <br />- Respect other users
          and avoid any form of harassment or misuse, <br />- Not engage in
          spamming, phishing, or unauthorized data access.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Intellectual Property
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          Users retain ownership of their content but grant ThinkStorm a
          non-exclusive, royalty-free licence to display, distribute, and
          promote such content within the platform&apos;s bounds. Users are
          responsible for ensuring they have the right to share any proprietary
          information or materials they upload.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Limitation of Liability
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          ThinkStorm is not liable for any direct, indirect, or incidental
          damages resulting from your use of the Platform, including but not
          limited to user interactions, project outcomes, or technical issues.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Data Privacy and Security
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          Your privacy is important to us. By using ThinkStorm, you agree to our
          Privacy Policy. We take measures to secure user data.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Termination
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          We may suspend or terminate your account if you violate these Terms.
          You may also terminate your account at any time by contacting us at{' '}
          <span className="font-bold hover:underline">
            <Link href={`mailto:${siteMetadata.email}`} target="_blank">
              contact@thinkstorm.app
            </Link>
          </span>
          . Upon termination, relevant data will be handled according to our
          Privacy Policy&apos;s retention guidelines.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Governing Law and Dispute Resolution
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          These Terms are governed by the laws of South Korea. Any disputes will
          be resolved in accordance with South Korean law and adjudicated in
          South Korean courts.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Changes to These Terms
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          We may update these Terms periodically to reflect changes to our
          services. Continued use of the Platform indicates acceptance of the
          updated Terms.
        </p>
        <h2 className="text-2xl xl:text-3xl text-left font-bold w-full">
          Contact Us
        </h2>
        <p className="text-md xl:text-lg my-10 leading-relaxed text-left w-full">
          For any questions about these Terms, please contact us at:{' '}
          <span className="font-bold hover:underline">
            <Link href={`mailto:${siteMetadata.email}`} target="_blank">
              contact@thinkstorm.app
            </Link>
          </span>
        </p>
      </section>
    </div>
  )
}
