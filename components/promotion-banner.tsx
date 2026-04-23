import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import promotionBanner from "@/content/promotion-banner.json"

function isPromotionActive() {
  if (!promotionBanner.enabled) return false

  const now = new Date()
  const startsOn = promotionBanner.startsOn
    ? new Date(`${promotionBanner.startsOn}T00:00:00`)
    : undefined
  const endsOn = promotionBanner.endsOn
    ? new Date(`${promotionBanner.endsOn}T23:59:59`)
    : undefined

  if (startsOn && now < startsOn) return false
  if (endsOn && now > endsOn) return false

  return true
}

export function PromotionBanner() {
  if (!isPromotionActive()) {
    return null
  }

  return (
    <div className="border-b border-accent/20 bg-[linear-gradient(90deg,rgba(79,209,217,0.12)_0%,rgba(37,99,235,0.08)_100%)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-start gap-4">
          {promotionBanner.imageSrc ? (
            <div className="relative hidden h-16 w-16 overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm sm:block">
              <Image
                src={promotionBanner.imageSrc}
                alt={promotionBanner.imageAlt || promotionBanner.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : null}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Featured Update
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {promotionBanner.title}
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {promotionBanner.message}
            </p>
            {(promotionBanner.startsOn || promotionBanner.endsOn) && (
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {promotionBanner.startsOn || "Now"} to{" "}
                  {promotionBanner.endsOn || "until further notice"}
                </span>
              </div>
            )}
          </div>
        </div>
        {promotionBanner.ctaLabel && promotionBanner.ctaHref ? (
          <Link
            href={promotionBanner.ctaHref}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {promotionBanner.ctaLabel}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
