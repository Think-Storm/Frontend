'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface SubmitButtonProps {
  isPending?: boolean
  text: string
  pendingText?: string
  className?: string
}

export default function SubmitButton({
  isPending,
  text,
  pendingText,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      variant="gradientBorderDark"
      className={cn('w-full h-11 text-base font-light', className)}
      aria-busy={isPending}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Spinner size="small" className="text-white" />
          <span aria-hidden="true">{pendingText ?? `${text}...`}</span>
        </>
      ) : (
        text
      )}
    </Button>
  )
}
