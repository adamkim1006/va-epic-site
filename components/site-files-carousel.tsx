"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Section, SectionHeader } from "@/components/section"

const importedImages = [
  {
    src: "/images/Site%20Files/20210709_124951.jpg",
    alt: "VA EPIC office and training photo",
  },
  {
    src: "/images/Site%20Files/20210709_125021.jpg",
    alt: "VA EPIC office interior photo",
  },
  {
    src: "/images/Site%20Files/20210709_125109.jpg",
    alt: "VA EPIC procedure room photo",
  },
  {
    src: "/images/Site%20Files/20210709_125343.jpg",
    alt: "VA EPIC treatment space photo",
  },
  {
    src: "/images/va-epic-logo.jpg",
    alt: "VA EPIC facility detail photo",
  },
  {
    src: "/images/Site%20Files/20210709_133507.jpg",
    alt: "VA EPIC clinical environment photo",
  },
  {
    src: "/images/Site%20Files/20210709_133525.jpg",
    alt: "VA EPIC interior architecture photo",
  },
  {
    src: "/images/Site%20Files/20210709_135724.jpg",
    alt: "VA EPIC practice photo",
  },
  {
    src: "/images/va-epic-logo.jpg",
    alt: "VA EPIC office detail",
  },
  {
    src: "/images/Site%20Files/20210716_110441.jpg",
    alt: "VA EPIC event or office photo",
  },
  {
    src: "/images/Site%20Files/20210716_121326.jpg",
    alt: "VA EPIC clinic team or office photo",
  },
  {
    src: "/images/Site%20Files/20210719_140741.jpg",
    alt: "VA EPIC treatment room or facility photo",
  },
] as const

export function SiteFilesCarousel() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="Image Library"
        title="Imported Site Photos"
        description="A temporary carousel of Wix-site images so we can review the visual inventory in context before assigning each photo to a final section."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-12"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto max-w-6xl"
        >
          <CarouselContent>
            {importedImages.map((image) => (
              <CarouselItem
                key={image.src}
                className="basis-[88%] md:basis-1/2 xl:basis-1/3"
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 88vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 top-auto bottom-3 translate-y-0 border-white/70 bg-white/90 text-primary hover:bg-white" />
          <CarouselNext className="right-3 top-auto bottom-3 translate-y-0 border-white/70 bg-white/90 text-primary hover:bg-white" />
        </Carousel>
      </motion.div>
    </Section>
  )
}
