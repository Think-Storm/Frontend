import type { Metadata } from "next";
import { Provider } from "@/providers/provider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import "@/styles/globals.css";
import { satoshi, nippo } from "@/styles/fonts";
import { siteMetadata } from "@/constants/metadata";
import { Toaster } from "sonner";

const { baseUrl, title, description, keywords, author, ogImage } = siteMetadata;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  keywords,
  authors: { name: author },
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
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
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${satoshi.variable} ${nippo.variable}`}
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
  );
}
