'use client'

import { useMutation } from '@tanstack/react-query'
import {
  handleAuthSuccess,
  handleAuthError,
} from '@/features/auth/utils/authHandlers'
import { api } from '@/lib/api/fetcher'
import { ROUTES } from '@/constants/routes'
import type { UserSubscription } from '@/types/user'

export default function useSubscribe() {
  const mutation = useMutation({
    mutationFn: (data: UserSubscription) =>
      api.post(ROUTES.API.PUBLIC.SUBSCRIBE, data),
    onSuccess: () => {
      handleAuthSuccess({
        message: 'Subscription Successful',
        description: 'You will be redirected to the home page.',
      })
    },
    onError: (error: Error) => {
      console.log('Subscription error:', error)
      handleAuthError({
        message: 'Subscription Failed',
        description:
          'An error occurred while requesting subscription. Please try again.',
      })
    },
  })

  return {
    subscribe: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
