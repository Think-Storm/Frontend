import { showToast } from '@/components/common/notification/Toast'
import { NextRouter } from 'next/router'

interface ToastParams {
  id?: string
  type: 'success' | 'error' | 'info' | 'warning'
  message?: string
  description?: string
  redirectPath?: string
  router?: NextRouter | { push: (path: string) => void }
}

function handleToast({
  id,
  type,
  message,
  description,
  redirectPath,
  router,
}: ToastParams) {
  showToast(type, {
    id: id || `toast-${type}`,
    message,
    description: description,
  })

  if (redirectPath && router) {
    router.push(redirectPath)
  }
}

export function handleAuthSuccess(params: Omit<ToastParams, 'type'>) {
  handleToast({ type: 'success', ...params })
}

export function handleAuthError(
  params: Omit<ToastParams, 'type'> & { error?: Error },
) {
  if (params.error) {
    console.error('Auth error:', params.error.message)
  }

  handleToast({
    type: 'error',
    message: params.error?.message || params.message || 'An error occurred',
    description: params.description || 'Please try again.',
    redirectPath: params.redirectPath,
    router: params.router,
  })
}
