import type { Metadata } from 'next'
import '@/styles/globals.scss'

const siteName = 'Think Storm'
const description =
  'ThinkStorm is a collaborative platform for developers and innovators.'

export const metadata: Metadata = {
  title: siteName,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL as string),
  openGraph: {
    title: siteName,
    description,
    url: process.env.NEXT_PUBLIC_API_BASE_URL,
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
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
