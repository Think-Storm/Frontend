import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ForgotPassword } from '@think-storm/contracts'
import { forgotPassword } from '../api/authApi'
import { handleAuthError, handleAuthSuccess } from '../utils/authHandlers'
import { ROUTES } from '@/constants/routes'

export default function useForgotPassword() {
  const router = useRouter()

  const mutation = useMutation<void, Error, ForgotPassword>({
    mutationFn: forgotPassword,
    onSuccess: () => {
      handleAuthSuccess({
        message: 'Reset Email Sent',
        description: 'Please check your email for password reset instructions',
        redirectPath: ROUTES.PAGE.AUTH.CHECK_EMAIL,
        router,
      })
    },
    onError: (error: Error) => {
      handleAuthError({
        error,
        message: 'Failed to Send Reset Email',
        description: 'Please try again',
      })
    },
  })

  return {
    forgotPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
