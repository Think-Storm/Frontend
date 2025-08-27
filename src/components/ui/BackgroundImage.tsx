import React from 'react'
import { BackgroundHeaderProps } from '@/lib/utils/types'
import { cn } from '@/utils/common'
import Image from 'next/image'

const BackgroundImage = ({ bgImage, children }: BackgroundHeaderProps) => {
  return (
    <div className={cn('relative w-full bg-opacity-50 h-[720px]')}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
          quality={85}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-white to-transparent z-[1]" />

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default BackgroundImage
