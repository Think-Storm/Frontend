import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

const siteName = 'Think Storm'
const description =
  'ThinkStorm is a collaborative platform for developers and innovators.'

export const metadata: Metadata = {
  title: siteName,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  openGraph: {
    title: siteName,
    description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
