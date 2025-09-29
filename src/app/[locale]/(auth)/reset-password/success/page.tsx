'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import AuthForm from '@/features/auth/components/AuthForm'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function ResetPasswordSuccessPage() {
  const router = useRouter()

  function handleSignIn() {
    router.push(ROUTES.PAGE.AUTH.SIGNIN)
  }

  return (
    <AuthForm>
      <AuthForm.Header
        title="Success!"
        description="Your password has been reset. Click below to sign in."
      />
      <AuthForm.Content>
        <AuthForm.Content.Actions>
          <Button
            variant="gradientBorderDark"
            className="w-full h-11 text-base font-light"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </AuthForm.Content.Actions>
        <AuthForm.Content.Links>
          <Link
            href={ROUTES.PAGE.PUBLIC.HOME}
            className="font-light text-black"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowLeft size={20} />
              &nbsp;Back to home without signing in
            </div>
          </Link>
        </AuthForm.Content.Links>
      </AuthForm.Content>
    </AuthForm>
  )
}
