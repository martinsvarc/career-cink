import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"
import HotjarScript from "./components/hotjar-script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

// Remove Google Fonts imports that are causing timeouts
// and replace with system fonts fallbacks
const systemSerif = localFont({
  src: "./fonts/Balboa-Bold.ttf", // We'll keep using the local font
  display: "swap",
  variable: "--font-playfair",
  weight: "700",
  fallback: ["Georgia", "Times New Roman", "serif"],
})

const systemSans = localFont({
  src: "./fonts/Balboa-Bold.ttf", // Using the same file but with sans-serif fallbacks
  display: "swap",
  variable: "--font-inter",
  weight: "700",
  fallback: ["Arial", "Helvetica", "sans-serif"],
})

const balboa = localFont({
  src: "./fonts/Balboa-Bold.ttf",
  display: "swap",
  variable: "--font-balboa",
  weight: "700",
  fallback: ["serif"],
})

export const metadata: Metadata = {
  title: {
    default: "Cink™ - Digital Model Club",
    template: "%s | Cink™",
  },
  description:
    "Cink™ provides elite AI voice models and marketing systems. Join our team of young, ambitious professionals working online and connecting offline. 20-50k monthly from home comfort.",
  keywords: [
    "AI voice models",
    "marketing systems",
    "remote work",
    "Czech AI opportunities",
    "voice AI jobs",
    "marketing automation",
    "elite systems",
    "young professionals",
    "online work",
    "Czech tech jobs",
  ],
  authors: [{ name: "Cink™" }],
  creator: "Cink™",
  publisher: "Cink™",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cinktm.com"),
  alternates: {
    canonical: "/",
  },
      openGraph: {
      type: "website",
      locale: "cs_CZ",
      url: "https://cinktm.com",
      siteName: "Cink™",
      title: "Cink™ - Digital Model Club",
    description:
      "Cink™ provides elite AI voice models and marketing systems. Join our team of young, ambitious professionals working online and connecting offline.",
    images: [
      {
        url: "https://res.cloudinary.com/dmbzcxhjn/image/upload/v1753833753/Screenshot_2025-07-30_020142_cb6pmw.png",
        width: 1200,
        height: 630,
        alt: "Cink™ - Elite AI Voice Models",
      },
    ],
  },
      twitter: {
      card: "summary_large_image",
      title: "Cink™ - Digital Model Club",
    description:
      "Cink™ provides elite AI voice models and marketing systems. Join our team of young, ambitious professionals.",
    images: ["https://res.cloudinary.com/dmbzcxhjn/image/upload/v1753833753/Screenshot_2025-07-30_020142_cb6pmw.png"],
    creator: "@cinktm",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${systemSerif.variable} ${systemSans.variable} ${balboa.variable}`}>
      <head>
        {/* Preload critical fonts to prevent FOUT */}
        <link rel="preload" href="/fonts/Balboa-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fast.wistia.net" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//n8n.automatedsolarbiz.com" />

        <link rel="canonical" href="https://cinktm.com" />
        <link rel="icon" href="https://res.cloudinary.com/dmbzcxhjn/image/upload/v1753833753/Screenshot_2025-07-30_020142_cb6pmw.png" sizes="any" />
        <link rel="icon" href="https://res.cloudinary.com/dmbzcxhjn/image/upload/v1753833753/Screenshot_2025-07-30_020142_cb6pmw.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dmbzcxhjn/image/upload/v1753833753/Screenshot_2025-07-30_020142_cb6pmw.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffde59" />
        <meta name="msapplication-TileColor" content="#ffde59" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cink™",
              url: "https://cinktm.com",
              logo: "https://res.cloudinary.com/dmbzcxhjn/image/upload/v1753833753/Screenshot_2025-07-30_020142_cb6pmw.png",
              description:
                "Cink™ provides elite AI voice models and marketing systems. Join our team of young, ambitious professionals working online and connecting offline.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "support@cinktm.com",
                contactType: "customer service",
                availableLanguage: "Czech",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "CZ",
              },
            }),
          }}
        />

        <HotjarScript />
      </head>
      <body
        className={`min-w-[320px] w-full overflow-x-hidden ${systemSans.variable} ${systemSerif.variable} ${balboa.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
