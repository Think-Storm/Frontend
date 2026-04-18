'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AuthForm from '@/features/auth/components/AuthForm'
import { ROUTES } from '@/constants/routes'

export default function CheckEmailPage() {
  return (
    <AuthForm>
      <AuthForm.Header
        title="Check Your Email"
        description="A password reset link has been sent to your email"
      />
      <AuthForm.Content>
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
      </AuthForm.Content>
    </AuthForm>
  )
}
