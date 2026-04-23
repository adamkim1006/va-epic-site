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

type OfficeImage = {
  src: string
  alt: string
  label: string
}

export function OfficeCarousel({ images }: { images: readonly OfficeImage[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto max-w-6xl"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem
              key={image.src}
              className="basis-[92%] md:basis-[72%] lg:basis-[58%]"
            >
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, (max-width: 1280px) 72vw, 58vw"
                  />
                </div>
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm font-medium text-foreground">{image.label}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 top-auto bottom-4 translate-y-0 border-white/70 bg-white/92 text-primary hover:bg-white" />
        <CarouselNext className="right-3 top-auto bottom-4 translate-y-0 border-white/70 bg-white/92 text-primary hover:bg-white" />
      </Carousel>
    </motion.div>
  )
}

