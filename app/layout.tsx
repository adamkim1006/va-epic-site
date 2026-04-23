import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { PracticeJsonLd } from "@/components/practice-json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { practice } from "@/lib/site"
import { siteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${practice.name} | Implants & Periodontology Center | ${practice.city}, ${practice.state}`,
    template: `%s | ${practice.name}`,
  },
  description:
    "At VA EPIC, Dr. Park provides patients with the best quality implants, periodontology, and prosthodontics services.",
  keywords: [
    "VA EPIC",
    "dental implants",
    "periodontist",
    "prosthodontics",
    "Chantilly VA",
    "All-on-X",
    "gum disease treatment",
    "periodontal surgery",
  ],
  authors: [{ name: practice.legalName }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: practice.name,
    url: siteUrl,
    title: `${practice.name} | Implants & Periodontology Center | ${practice.city}, ${practice.state}`,
    description:
      "At VA EPIC, Dr. Park provides patients with the best quality implants, periodontology, and prosthodontics services.",
    images: [
      {
        url: "/images/va-epic-logo.jpg",
        width: 1200,
        height: 630,
        alt: `${practice.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${practice.name} | Implants & Periodontology Center | ${practice.city}, ${practice.state}`,
    description:
      "At VA EPIC, Dr. Park provides patients with the best quality implants, periodontology, and prosthodontics services.",
    images: ["/images/va-epic-logo.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#08111d" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <PracticeJsonLd />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
