'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { siteMetadata } from '@/constants/metadata'
import Footer from '@/components/common/layout/footer'
import Header from '@/components/common/layout/header'
import { Button } from '@/components/ui/button'

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  let leftChildren = (
    <Button
      variant="transparent"
      size="lg"
      className="text-lg font-light mt-1"
      asChild
    >
      <Link href={`mailto:${siteMetadata.email}`} target="_blank">
        Contact Us
      </Link>
    </Button>
  )
  let rightChildren = (
    <div className="flex items-center gap-2 mr-2 sm:mr-8 md:mr-10">
      <Button variant="gradientBorderDark" size="lg" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button variant="gradientBorderLight" size="lg" asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    </div>
  )
  return (
    <>
      <Header
        leftChildren={leftChildren}
        middleChildren={undefined}
        rightChildren={rightChildren}
      />
      {children}
      <Footer />
    </>
  )
}
