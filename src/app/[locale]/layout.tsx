import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { satoshi, nippo } from '@/styles/fonts'
import { siteMetadata } from '@/constants/metadata'
import { Provider } from '@/providers/provider'

const { baseUrl, title, description, keywords, author, ogImage } = siteMetadata

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  keywords,
  authors: { name: author },
  icons: {
    icon: '/images/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: title,
    images: [ogImage],
    url: baseUrl,
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
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  return (
    <html lang={locale} className="overflow-x-hidden w-screen">
      <body
        className={`${satoshi.variable} ${nippo.variable} overflow-x-hidden w-screen`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <Provider>
            <main>{children}</main>
          </Provider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
