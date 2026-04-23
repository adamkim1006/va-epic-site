"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Globe, MapPin, Phone, Star } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"
import { TestimonialCard } from "@/components/testimonial-card"
import type { GoogleReview, GoogleReviewSummary } from "@/lib/google-places"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface TestimonialsSectionClientProps {
  reviews: GoogleReview[]
  summary?: GoogleReviewSummary
}

export function TestimonialsSectionClient({
  reviews,
  summary,
}: TestimonialsSectionClientProps) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api || reviews.length <= 1) return

    const interval = window.setInterval(() => {
      api.scrollNext()
    }, 4500)

    return () => window.clearInterval(interval)
  }, [api, reviews.length])

  return (
    <Section
      variant="muted"
      // backgroundImageSrc="/images/Site Files/Hiossen Live Sx at VA EPIC 29.jpg"
      // backgroundPosition="center"
      // backgroundOpacity={0.22}
    >
      <SectionHeader
        subtitle="Google Reviews"
        title="Patient Testimonials"
        // description="Pulled from the VA EPIC Google Business profile and refreshed with ISR so the homepage stays current without frequent API calls."
      />

      {summary?.rating && summary.totalRatings ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto mt-8 max-w-4xl rounded-3xl border border-primary/12 bg-white/88 p-5 shadow-sm backdrop-blur"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-primary">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{summary.rating.toFixed(1)}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground">
                {summary.totalRatings.toLocaleString()} Google ratings
              </span>
              {summary.primaryType ? (
                <>
                  <div className="hidden h-4 w-px bg-border sm:block" />
                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    {summary.primaryType}
                  </span>
                </>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {summary.websiteUrl ? (
                <Link
                  href={summary.websiteUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-primary"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </Link>
              ) : null}
              {summary.phone ? (
                <Link
                  href={`tel:${summary.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Link>
              ) : null}
              {summary.placeUrl ? (
                <Link
                  href={summary.placeUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm text-foreground transition-colors hover:border-accent/30 hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Maps
                </Link>
              ) : null}
            </div>
          </div>

          {summary.address || summary.weekdayHours?.length ? (
            <div className="mt-4 grid gap-3 border-t border-border/70 pt-4 md:grid-cols-2">
              {summary.address ? (
                <div className="rounded-2xl bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Practice address:</span>{" "}
                  {summary.address}
                </div>
              ) : null}
              {summary.weekdayHours?.[0] ? (
                <div className="rounded-2xl bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Hours snapshot:</span>{" "}
                  {summary.weekdayHours[0]}
                </div>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      ) : null}

      <div className="mt-12">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto max-w-[1200px]"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem
                key={`${review.name}-${index}`}
                className="basis-[88%] md:basis-[420px] lg:basis-[440px]"
              >
                <TestimonialCard {...review} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-auto bottom-3 translate-y-0 border-white/70 bg-white/92 text-primary hover:bg-white" />
          <CarouselNext className="right-2 top-auto bottom-3 translate-y-0 border-white/70 bg-white/92 text-primary hover:bg-white" />
        </Carousel>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 inline-flex rounded-full border border-primary/10 bg-white/88 px-5 py-2 text-muted-foreground shadow-sm backdrop-blur"
      >
        <MapPin className="h-5 w-5 text-accent" />
        <span>Proudly serving Chantilly, VA and surrounding areas</span>
      </motion.div>
    </Section>
  )
}
