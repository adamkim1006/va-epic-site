import { getLocalBusinessJsonLd } from "@/lib/seo"

export function PracticeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getLocalBusinessJsonLd()),
      }}
    />
  )
}

