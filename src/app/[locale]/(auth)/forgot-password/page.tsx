'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPassword } from '@think-storm/contracts'
import { forgotPasswordSchema } from '@/schemas/authSchemas'
import useForgotPassword from '@/features/auth/hooks/useForgotPassword'
import { Form } from '@/components/ui/form'
import AuthForm from '@/features/auth/components/AuthForm'
import AuthFormField from '@/features/auth/components/AuthFormField'
import SubmitButton from '@/features/auth/components/SubmitButton'
import { ROUTES } from '@/constants/routes'

export default function ForgotPasswordPage() {
  const { forgotPassword, isPending } = useForgotPassword()

  const form = useForm<ForgotPassword>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  function onSubmit(FormValues: ForgotPassword) {
    forgotPassword(FormValues)
  }

  return (
    <AuthForm>
      <AuthForm.Header
        title="Forgot Password?"
        description="Please enter your email to reset your password"
      />
      <AuthForm.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <AuthForm.Content.Fields>
              <AuthFormField
                control={form.control}
                name="email"
                label="Email*"
                type="email"
                aria-required="true"
                autoComplete="email"
              />
            </AuthForm.Content.Fields>
            <AuthForm.Content.Actions>
              <SubmitButton
                isPending={isPending}
                text="Send Reset Link"
                pendingText="Sending reset link..."
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
