'use client'

import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/constants/routes'

export default function Header({
  leftChildren,
  middleChildren,
  rightChildren,
}: {
  leftChildren: ReactNode
  middleChildren: ReactNode
  rightChildren: ReactNode
}) {
  const { isWhite, isHidden } = useAppSelector((state) => state.header)

  return (
    <AnimatePresence mode="wait">
      {!isHidden && (
        <motion.header
          initial={{
            y: -100,
            opacity: 0,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            backdropFilter: 'blur(0px)',
          }}
          animate={{
            y: 0,
            opacity: 1,
            backgroundColor: isWhite
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(255, 255, 255, 0)',
            backdropFilter: isWhite ? 'blur(10px)' : 'blur(0px)',
          }}
          exit={{
            y: -100,
            opacity: 0,
            transition: { duration: 0.4, ease: 'easeInOut' },
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            duration: 0.4,
            ease: 'easeOut',
            backgroundColor: { duration: 0.2 },
            backdropFilter: { duration: 0.2 },
          }}
          className={`fixed top-0 left-0 right-0 w-full z-[100] flex flex-wrap justify-between items-center p-3 md:p-4 text-black overflow-hidden`}
        >
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-2 sm:ml-4 md:ml-6">
            <Button
              variant="transparent"
              size="lg"
              className="flex items-center gap-2 px-0 mx-0"
            >
              <Link href={ROUTES.PAGE.PUBLIC.HOME} target="_self">
                <div className="flex items-center justify-content">
                  <Image
                    src="/images/common/thinkstorm-logo-gradient.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="w-[28px] h-auto object-contain"
                  />
                  <span className="ml-4 text-2xl md:text-3xl font-semibold leading-none">
                    ThinkStorm
                  </span>
                </div>
              </Link>
            </Button>
            {leftChildren}
          </div>
          <div>{middleChildren}</div>
          <div>{rightChildren}</div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
