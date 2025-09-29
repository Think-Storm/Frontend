'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginUser } from '@think-storm/contracts'
import { loginSchema } from '@/schemas/authSchemas'
import useSignIn from '@/features/auth/hooks/useSignIn'
import { Form } from '@/components/ui/form'
import AuthForm from '@/features/auth/components/AuthForm'
import AuthFormField from '@/features/auth/components/AuthFormField'
import FormSeparator from '@/features/auth/components/FormSeparator'
import SubmitButton from '@/features/auth/components/SubmitButton'
import OAuthGoogleButton from '@/features/auth/components/OAuthGoogleButton'
import { ROUTES } from '@/constants/routes'

export default function SignInPage() {
  const { signIn, isPending } = useSignIn()

  const form = useForm<LoginUser>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(FormValues: LoginUser) {
    signIn(FormValues)
  }

  function handleOAuthSignIn() {
    console.log('OAuth sign-in clicked')
  }

  return (
    <AuthForm>
      <AuthForm.Header
        title="Sign In"
        description="Welcome back! Please enter your details"
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
              <div className="relative">
                <AuthFormField
                  control={form.control}
                  name="password"
                  label="Password*"
                  type="password"
                  aria-required="true"
                  autoComplete="current-password"
                />
                <div className="absolute -top-1 right-0 text-[13px] text-gray-600">
                  <Link
                    href={ROUTES.PAGE.AUTH.FORGOT_PASSWORD}
                    className="underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </AuthForm.Content.Fields>
            <AuthForm.Content.Actions>
              <SubmitButton
                isPending={isPending}
                text="Sign In"
                pendingText="Signing in..."
              />

              <FormSeparator />
              <OAuthGoogleButton
                isPending={isPending}
                onClick={handleOAuthSignIn}
              />
            </AuthForm.Content.Actions>
            <AuthForm.Content.Links>
              Don&apos;t have an account?&nbsp;
              <Link
                href={ROUTES.PAGE.AUTH.SIGNUP}
                className="font-medium text-black underline"
              >
                Sign Up
              </Link>
            </AuthForm.Content.Links>
          </form>
        </Form>
      </AuthForm.Content>
    </AuthForm>
  )
}
