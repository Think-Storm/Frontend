'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSubscription } from '@/types/user'
import { subscriptionSchema } from '@/schemas/userSchema'
import useSubscribe from '@/features/footer/hooks/useSubscribe'
import { ROUTES } from '@/constants/routes'

export default function Footer() {
  const { subscribe, isPending } = useSubscribe()
  const form = useForm<UserSubscription>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(subscriptionSchema),
  })

  function onSubmit(FormValues: UserSubscription) {
    subscribe(FormValues)
  }

  return (
    <footer className="px-6 pt-12 pb-6 bg-white">
      <div className="max-w-[95%] mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Left: Logo and Socials */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/common/thinkstorm-logo-gradient.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-xl font-semibold">ThinkStorm</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Our LinkedIn</span>
            <Link
              href="https://www.linkedin.com/company/think-storm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="/icons/common/linkedin-icon.svg"
                alt=""
                width={16}
                height={16}
              />
            </Link>
          </div>
        </div>

        {/* Right: Subscribe */}
        {/* <FooterForm>
          <h4 className="text-sm font-semibold mb-2">Subscribe</h4>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-between justify-center items-start gap-2 "
            >
              <FooterFormField
                control={form.control}
                name="email"
                type="email"
                aria-required="true"
                autoComplete="email"
              />
              <Button
                type="submit"
                aria-busy={isPending}
                disabled={isPending}
                variant="secondary"
                size="lg"
                className="rounded-md text-lg px-6 py-3 shadow transition transform duration-200 hover:bg-secondary/80"
              >
                {isPending ? (
                  <>
                    <Spinner size="small" />
                    <span aria-hidden="true">Subscribing...</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-xs text-gray-500 mt-2 text-right">
            By subscribing you agree to with our&nbsp;
            <Link href={ROUTES.PAGE.PUBLIC.PRIVACY_POLICY} className="underline hover:text-black">
              Privacy Policy
            </Link>
          </p>
        </FooterForm> */}
      </div>

      {/* Divider */}
      <hr className="my-6 border-t border-gray-200"></hr>

      {/* Bottom Links + Copyright */}
      <div className="max-w-[95%] mx-auto flex flex-col lg:flex-row justify-center items-center text-sm text-gray-600 gap-8">
        <div className="flex flex-wrap gap-4">
          <Link
            href={ROUTES.PAGE.PUBLIC.PRIVACY_POLICY}
            className="hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href={ROUTES.PAGE.PUBLIC.TERMS_OF_SERVICE}
            className="hover:underline"
          >
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline">
            Cookies Settings
          </Link>
        </div>
        <span className="text-xs">
          &copy; 2025 ThinkStorm. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
