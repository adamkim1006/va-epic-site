import type { Metadata } from "next"
import { officeHours } from "@/content/site-content"
import { practice, primaryNav, servicePages } from "@/lib/site"

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://va-epic-site.vercel.app"

export function buildMetadata(
  title: string,
  description: string,
  pathname: string
): Metadata {
  const canonical = new URL(pathname, siteUrl).toString()

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: practice.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: new URL("/images/va-epic-logo.jpg", siteUrl).toString(),
          width: 1200,
          height: 630,
          alt: `${practice.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/images/va-epic-logo.jpg", siteUrl).toString()],
    },
  }
}

export function getSitemapRoutes() {
  return [
    ...primaryNav.map((item) => item.href),
    ...servicePages.map((item) => item.href),
    "/before-after",
    "/patient-forms",
  ]
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: practice.legalName,
    alternateName: practice.name,
    url: siteUrl,
    image: new URL("/images/va-epic-logo.jpg", siteUrl).toString(),
    telephone: practice.phoneDisplay,
    email: practice.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.addressLine1,
      addressLocality: practice.city,
      addressRegion: practice.state,
      postalCode: "20151",
      addressCountry: "US",
    },
    areaServed: practice.serviceArea,
    priceRange: "$$$",
    sameAs: [practice.mapsHref],
    openingHoursSpecification: officeHours
      .filter((item) => item.hours !== "Closed")
      .map((item) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: item.day,
        opens: item.hours === "1st & 3rd by appointment" ? "09:00" : "09:00",
        closes: item.hours === "1st & 3rd by appointment" ? "13:00" : "17:00",
      })),
  }
}

