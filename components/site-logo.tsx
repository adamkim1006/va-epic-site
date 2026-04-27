"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type SiteLogoProps = {
  href?: string
  label: string
  containerClassName?: string
  imageClassName?: string
  sizes: string
  priority?: boolean
}

export function SiteLogo({
  href = "/",
  label,
  containerClassName,
  imageClassName,
  sizes,
  priority = false,
}: SiteLogoProps) {
  const logo = (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-white ring-1 ring-border/80 dark:bg-transparent dark:ring-white/12",
        containerClassName
      )}
    >
      <Image
        src="/images/va-epic-logo.jpg"
        alt={label}
        fill
        className={cn("object-contain p-1.5 sm:p-2 dark:hidden", imageClassName)}
        sizes={sizes}
        priority={priority}
      />
      <Image
        src="/images/va-epic-logo.jpg"
        alt={label}
        fill
        className={cn(
          "hidden object-contain p-1.5 sm:p-2 dark:block dark:opacity-95 dark:mix-blend-screen dark:[filter:invert(1)_hue-rotate(180deg)_brightness(1.06)_contrast(1.04)]",
          imageClassName
        )}
        sizes={sizes}
        priority={priority}
      />
    </div>
  )

  if (!href) {
    return logo
  }

  return (
    <Link href={href} className="flex items-center" aria-label={label}>
      {logo}
    </Link>
  )
}
