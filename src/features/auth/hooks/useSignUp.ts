import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { RegisterUser, UserResponse } from '@think-storm/contracts'
import { ROUTES } from '@/constants/routes'
import { signUp } from '../api/authApi'
import { handleAuthSuccess, handleAuthError } from '../utils/authHandlers'

export default function useSignUp() {
  const router = useRouter()

  const mutation = useMutation<UserResponse, Error, RegisterUser>({
    mutationFn: signUp,
    onSuccess: () =>
      handleAuthSuccess({
        message: 'Sign-up Successful',
        description: 'Please sign in to continue',
        redirectPath: ROUTES.PAGE.AUTH.SIGNIN,
        router,
      }),
    onError: (error: Error) =>
      handleAuthError({
        error,
        message: 'Sign-up Failed',
      }),
  })

  return {
    signUp: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
