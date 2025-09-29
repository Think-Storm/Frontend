'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OAuthGoogleButtonProps {
  isPending?: boolean
  onClick?: () => void
  className?: string
}

export default function OAuthGoogleButton({
  isPending,
  onClick,
  className,
}: OAuthGoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'w-full h-11 text-base font-light border-gray-200 hover:bg-transparent hover:text-black',
        className,
      )}
      disabled={isPending}
      onClick={onClick}
    >
      <Image
        src="/icons/auth/google-icon.svg"
        alt=""
        aria-hidden="true"
        className="mr-2 filter grayscale"
        width={20}
        height={20}
      />
      Continue with Google
    </Button>
  )
}
