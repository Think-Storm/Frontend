'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterUser } from '@think-storm/contracts'
import { signupSchema } from '@/schemas/authSchemas'
import useSignUp from '@/features/auth/hooks/useSignUp'
import { Form } from '@/components/ui/form'
import AuthForm from '@/features/auth/components/AuthForm'
import AuthFormField from '@/features/auth/components/AuthFormField'
import FormSeparator from '@/features/auth/components/FormSeparator'
import SubmitButton from '@/features/auth/components/SubmitButton'
import OAuthGoogleButton from '@/features/auth/components/OAuthGoogleButton'

export default function SignUpPage() {
  const { signUp, isPending } = useSignUp()

  const form = useForm<RegisterUser>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signupSchema),
  })

  function onSubmit(FormValues: RegisterUser) {
    signUp(FormValues)
  }

  function handleOAuthSignUp() {
    console.log('OAuth sign-up clicked')
  }

  return (
    <AuthForm>
      <AuthForm.Header
        title="Create Account"
        description="Welcome! Please enter your details"
      />
      <AuthForm.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <AuthForm.Content.Fields>
              <AuthFormField
                control={form.control}
                name="username"
                label="Username*"
                type="text"
                aria-required="true"
                autoComplete="username"
              />
              <AuthFormField
                control={form.control}
                name="email"
                label="Email*"
                type="email"
                aria-required="true"
                autoComplete="email"
              />
              <AuthFormField
                control={form.control}
                name="password"
                label="Password*"
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
                text="Sign Up"
                pendingText="Creating account..."
              />
              <FormSeparator />
              <OAuthGoogleButton
                isPending={isPending}
                onClick={handleOAuthSignUp}
              />
            </AuthForm.Content.Actions>
            <AuthForm.Content.Links>
              Already have an account?&nbsp;
              <Link href="/signin" className="font-medium text-black underline">
                Sign In
              </Link>
            </AuthForm.Content.Links>
          </form>
        </Form>
      </AuthForm.Content>
    </AuthForm>
  )
}
