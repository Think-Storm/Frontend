import { toast } from 'sonner'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

type ToastOptions = {
  id?: string
  message?: string
  description?: string
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-emerald-500 text-white border-0 shadow-lg',
  error: 'bg-rose-500 text-white border-0 shadow-lg',
  info: 'bg-sky-500 text-white border-0 shadow-lg',
  warning: 'bg-amber-500 text-white border-0 shadow-lg',
}

export function showToast(
  variant: ToastVariant,
  {
    id,
    message,
    description,
    duration = 3000,
    position = 'top-right',
  }: ToastOptions = {},
) {
  const defaultMessages: Record<
    ToastVariant,
    { message: string; description: string }
  > = {
    success: {
      message: 'Success',
      description: 'Your request has been completed successfully.',
    },
    error: {
      message: 'Error',
      description: 'Something went wrong. Please try again later.',
    },
    info: {
      message: 'Info',
      description: 'Here is some information for you.',
    },
    warning: {
      message: 'Warning',
      description: 'Please check this before proceeding.',
    },
  }

  const { message: defaultMessage, description: defaultDescription } =
    defaultMessages[variant]

  toast[variant](message ?? defaultMessage, {
    id,
    description: description ?? defaultDescription,
    className: variantStyles[variant],
    duration,
    position,
  })
}
