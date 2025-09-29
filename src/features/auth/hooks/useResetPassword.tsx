import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ForgotUpdatePassword } from '@think-storm/contracts'
import { resetPassword } from '../api/authApi'
import { handleAuthError, handleAuthSuccess } from '../utils/authHandlers'
import { ROUTES } from '@/constants/routes'

export default function useResetPassword() {
  const router = useRouter()

  const mutation = useMutation<void, Error, ForgotUpdatePassword>({
    mutationFn: resetPassword,
    onSuccess: () => {
      handleAuthSuccess({
        message: 'Password Reset Successful',
        description: 'Your password has been successfully reset',
        redirectPath: ROUTES.PAGE.AUTH.RESET_PASSWORD.SUCCESS,
        router,
      })
    },
    onError: (error: Error) => {
      handleAuthError({
        error,
        message: 'Failed to Reset Password',
        description: 'Please try again',
      })
    },
  })

  return {
    resetPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
