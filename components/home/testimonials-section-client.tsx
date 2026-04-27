"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Star } from "lucide-react"
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
          className="mx-auto mt-8 max-w-4xl rounded-3xl border border-primary/12 bg-white/88 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-42px_rgba(0,0,0,0.85)]"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-primary">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{summary.rating.toFixed(1)}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground">
                {summary.totalRatings.toLocaleString()} Google ratings
              </span>
            </div>
          </div>
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
          <CarouselPrevious className="left-2 top-auto bottom-3 translate-y-0 border-white/70 bg-white/92 text-primary hover:bg-white dark:border-white/12 dark:bg-slate-950/82 dark:text-accent dark:hover:bg-slate-900" />
          <CarouselNext className="right-2 top-auto bottom-3 translate-y-0 border-white/70 bg-white/92 text-primary hover:bg-white dark:border-white/12 dark:bg-slate-950/82 dark:text-accent dark:hover:bg-slate-900" />
        </Carousel>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 inline-flex rounded-full border border-primary/10 bg-white/88 px-5 py-2 text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-42px_rgba(0,0,0,0.85)]"
      >
        <MapPin className="h-5 w-5 text-accent" />
        <span>Proudly serving Chantilly, VA and surrounding areas</span>
      </motion.div>
    </Section>
  )
}
