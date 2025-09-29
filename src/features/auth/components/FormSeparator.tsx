import { cn } from '@/lib/utils'

interface SeparatorProps {
  text?: string
  className?: string
  'aria-label'?: string
}

export default function FormSeparator({
  text = 'Or',
  className,
  'aria-label': ariaLabel = 'or continue with',
}: SeparatorProps) {
  return (
    <div className={cn('flex items-center w-full', className)}>
      <hr
        className="flex-1 border-t border-gray-200"
        role="separator"
        aria-orientation="horizontal"
        aria-label={ariaLabel}
      />
      <span className="px-2 text-xs uppercase text-gray-500">{text}</span>
      <hr
        className="flex-1 border-t border-gray-200"
        role="separator"
        aria-orientation="horizontal"
        aria-label={ariaLabel}
      />
    </div>
  )
}
