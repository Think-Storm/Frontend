import { showToast } from '@/components/common/notification/Toast'
import { NextRouter } from 'next/router'

interface ToastParams {
  type: 'success' | 'error' | 'info' | 'warning'
  message?: string
  description?: string
  redirectPath?: string
  router?: NextRouter | { push: (path: string) => void }
}

function handleToast({
  type,
  message,
  description,
  redirectPath,
  router,
}: ToastParams) {
  showToast(type, {
    id: `toast-${type}-${Date.now()}`,
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
    message: params.error?.message || 'An error occurred',
    description: params.description || 'Please try again.',
    redirectPath: params.redirectPath,
    router: params.router,
  })
}
