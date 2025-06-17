import type { Metadata } from 'next'
import { Provider } from '@/providers/provider'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import '@/styles/globals.css'
import { satoshi, nippo } from '@/styles/fonts'
import {
  BASE_URL,
  TITLE,
  DESCRIPTION,
  KEYWORDS,
  AUTHOR,
  OG_IMAGE,
} from '@/lib/constants/common'
import QueryProvider from '@/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'


export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: { name: AUTHOR },
  icons: {
    icon: '/images/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [OG_IMAGE],
    url: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale}>
      <body
        className={`${satoshi.variable} ${nippo.variable}`}
      >
        <NextIntlClientProvider>
          <QueryProvider>
            <Provider>
              <main>{children}
              </main>
            </Provider>
          </QueryProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
