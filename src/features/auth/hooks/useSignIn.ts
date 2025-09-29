import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ROUTES } from '@/constants/routes'
import { loginSuccess } from '@/store/reducers/auth/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { LoginUser, UserResponse } from '@think-storm/contracts'
import { signIn } from '../api/authApi'
import { handleAuthError, handleAuthSuccess } from '../utils/authHandlers'

interface LoginUserResponse {
  message: string
  data: UserResponse
}

interface UseSignInOptions {
  onSuccess?: (response: LoginUserResponse) => void
}

export default function useSignIn(options?: UseSignInOptions) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const mutation = useMutation<LoginUserResponse, Error, LoginUser>({
    mutationFn: signIn,
    onSuccess: (response: LoginUserResponse) => {
      dispatch(loginSuccess({ user: response.data }))

      handleAuthSuccess({
        message: 'Sign-in Successful',
        description: 'You have successfully signed in',
        redirectPath: ROUTES.PAGE.PROTECTED.EXPLORE,
        router,
      })

      options?.onSuccess?.(response)
    },
    onError: (error: Error) => {
      handleAuthError({
        error,
        message: 'Sign-in Failed',
        description: 'Please try again',
      })
    },
  })

  return {
    signIn: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
