"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Megaphone } from "lucide-react"
import promotionBanner from "@/content/promotion-banner.json"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

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
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const storageKey = useMemo(
    () =>
      [
        "promotion-drawer",
        promotionBanner.title,
        promotionBanner.startsOn ?? "no-start",
        promotionBanner.endsOn ?? "no-end",
        promotionBanner.ctaHref ?? "no-cta",
      ].join(":"),
    []
  )

  useEffect(() => {
    setIsMounted(true)
    const storedState = window.localStorage.getItem(storageKey)
    setIsOpen(storedState !== "closed")
  }, [storageKey])

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen)
    window.localStorage.setItem(storageKey, nextOpen ? "open" : "closed")
  }

  if (!isPromotionActive() || !isMounted) {
    return null
  }

  return (
    <>
      {!isOpen ? (
        <>
          <button
            type="button"
            onClick={() => handleOpenChange(true)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/90 px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/35 hover:text-primary sm:hidden"
            aria-label="Open promotional update"
          >
            <Megaphone className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenChange(true)}
            className="fixed right-0 top-1/2 z-[70] hidden -translate-y-1/4 rounded-l-2xl border border-r-0 border-primary/20 bg-white/95 px-3 py-4 text-left shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground sm:flex"
            aria-label="Open promotional update"
          >
            <span className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-semibold uppercase tracking-[0.22em]">
                Promotion
              </span>
            </span>
          </button>
        </>
      ) : null}

      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          className="w-[92vw] max-w-none border-l border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(239,246,255,0.97)_100%)] p-0 sm:w-[30rem] sm:max-w-[30rem]"
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {promotionBanner.imageSrc ? (
              <div className="relative h-64 w-full overflow-hidden border-b border-primary/10 sm:h-72">
                <Image
                  src={promotionBanner.imageSrc}
                  alt={promotionBanner.imageAlt || promotionBanner.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 92vw, 480px"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.38)_100%)]" />
                <div className="absolute left-5 bottom-5 rounded-full bg-white/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary shadow-sm backdrop-blur-sm">
                  Featured Update
                </div>
              </div>
            ) : null}

            <SheetHeader className="space-y-3 px-6 pt-6 pb-3 text-left">
              <SheetTitle className="pr-10 text-2xl leading-tight">
                {promotionBanner.title}
              </SheetTitle>
              <SheetDescription className="text-sm leading-relaxed text-muted-foreground">
                {promotionBanner.message}
              </SheetDescription>
            </SheetHeader>

            <div className="px-6 pb-6">
              {(promotionBanner.startsOn || promotionBanner.endsOn) && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-border/70">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>
                    {promotionBanner.startsOn || "Now"} to{" "}
                    {promotionBanner.endsOn || "until further notice"}
                  </span>
                </div>
              )}

              {promotionBanner.ctaLabel && promotionBanner.ctaHref ? (
                <div className="mt-5">
                  <Link
                    href={promotionBanner.ctaHref}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {promotionBanner.ctaLabel}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
