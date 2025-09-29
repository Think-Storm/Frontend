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
import { ROUTES } from '@/constants/routes'

export default function ResetPasswordPage() {
  const { forgotPassword } = useForgotPassword()

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
        title="Check Your Email"
        description="A password reset link has been sent to your email"
      />
      <AuthForm.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
