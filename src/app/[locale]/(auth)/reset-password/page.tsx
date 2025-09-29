'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotUpdatePassword } from '@think-storm/contracts'
import { ArrowLeft } from 'lucide-react'
import { resetPasswordSchema } from '@/schemas/authSchemas'
import useResetPassword from '@/features/auth/hooks/useResetPassword'
import { Form } from '@/components/ui/form'
import AuthForm from '@/features/auth/components/AuthForm'
import AuthFormField from '@/features/auth/components/AuthFormField'
import SubmitButton from '@/features/auth/components/SubmitButton'
import { handleAuthError } from '@/features/auth/utils/authHandlers'
import { ROUTES } from '@/constants/routes'

type ResetPasswordFormValues = ForgotUpdatePassword & {
  confirmPassword: string
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token: string | null = searchParams.get('token')
  const { resetPassword, isPending } = useResetPassword()

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
      passwordResetToken: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  function onSubmit(values: ResetPasswordFormValues) {
    if (!token) return null
    const { confirmPassword, ...payload } = values
    resetPassword({ ...payload, passwordResetToken: token })
  }

  useEffect(() => {
    if (!token) {
      handleAuthError({
        id: 'reset-password-invalid-link',
        message: 'Oops! This link is invalid.',
        description:
          'The password reset link has expired or is not valid. Please request a new password reset link.',
        redirectPath: ROUTES.PAGE.AUTH.FORGOT_PASSWORD,
        router,
      })
    }
  }, [token, router])

  return (
    <AuthForm>
      <AuthForm.Header
        title="Reset Password"
        description="Please enter a new password that has not been used"
      />
      <AuthForm.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <AuthForm.Content.Fields>
              <AuthFormField
                control={form.control}
                name="password"
                label="Password*"
                type="password"
                aria-required="true"
                autoComplete="current-password"
              />
              <AuthFormField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password*"
                type="password"
                aria-required="true"
                autoComplete="new-password"
                description={[
                  `Contains uppercase, lowercase, number and special character`,
                  `Must be between 8 and 16 characters long`,
                  `Cannot contain spaces`,
                ]}
              />
            </AuthForm.Content.Fields>
            <AuthForm.Content.Actions>
              <SubmitButton
                isPending={isPending}
                text="Reset Password"
                pendingText="Resetting password..."
              />
            </AuthForm.Content.Actions>
            <AuthForm.Content.Links>
              <Link
                href={ROUTES.PAGE.AUTH.SIGNIN}
                className="font-light text-black"
              >
                <div className="flex items-center justify-center gap-2">
                  <ArrowLeft size={20} />
                  &nbsp;Back to Sign In
                </div>
              </Link>
            </AuthForm.Content.Links>
          </form>
        </Form>
      </AuthForm.Content>
    </AuthForm>
  )
}
