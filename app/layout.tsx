import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { practice } from "@/lib/site"

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: practice.name,
    title: `${practice.name} | Implants & Periodontology Center | ${practice.city}, ${practice.state}`,
    description:
      "At VA EPIC, Dr. Park provides patients with the best quality implants, periodontology, and prosthodontics services.",
  },
}

export const viewport: Viewport = {
  themeColor: "#2d4658",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
