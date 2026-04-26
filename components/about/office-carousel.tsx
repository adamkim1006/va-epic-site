"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type OfficeImage = {
  src: string
  alt: string
  label: string
}

export function OfficeCarousel({ images }: { images: readonly OfficeImage[] }) {
  const trackImages = [...images, ...images]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-12 overflow-hidden"
    >
      <motion.div
        className="flex w-max gap-4 md:gap-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {trackImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="w-[17rem] shrink-0 md:w-[29rem] lg:w-[31rem]"
          >
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 272px, (max-width: 1280px) 336px, 368px"
                />
              </div>
              <div className="border-t border-border px-5 py-4">
                <p className="text-sm font-medium text-foreground">{image.label}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
