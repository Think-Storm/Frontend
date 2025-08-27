'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { siteMetadata } from '@/constants/metadata'
import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { isWhite, isHidden } = useAppSelector((state) => state.header)
  let leftChildren = (
    <Button
      variant={!isWhite && !isHidden ? 'transparent' : 'ghost'}
      size="lg"
      className="text-sm sm:text-base md:text-lg xl:text-xl leading-[28px] px-3 sm:px-4 md:px-6 mt-[2px]"
    >
      <Link href={`mailto:${siteMetadata.email}`} target="_blank">
        Contact Us
      </Link>
    </Button>
  )
  let rightChildren = (
    <div className="flex items-center mr-2 sm:mr-8 md:mr-10">
      <Button
        variant="gradient"
        size="gradient"
        className="mr-2 sm:mr-3 md:mr-4 text-sm sm:text-base md:text-lg xl:text-xl max-[640px]:!hidden"
      >
        <Link href="/signup" target="_self">
          Register
        </Link>
      </Button>
      <Button
        className="text-sm sm:text-base md:text-lg xl:text-xl max-[640px]:!hidden"
        variant="gradient"
        size="gradient"
        textBgWhite
        textClassName="!text-black !bg-white"
      >
        <Link href="/signin" target="_self">
          Log In
        </Link>
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
