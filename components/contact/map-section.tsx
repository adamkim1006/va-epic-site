"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/section"

export function MapSection() {
  return (
    <Section variant="muted" className="pb-8 pt-0 lg:pb-12 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-secondary"
      >
        <iframe
          src="https://www.google.com/maps?q=14100%20Park%20Meadow%20Dr%20%23110%2C%20Chantilly%2C%20VA%2020151&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="VA EPIC Location"
          className="grayscale transition-all duration-500 hover:grayscale-0 dark:brightness-[0.82] dark:contrast-[1.08] dark:hue-rotate-[190deg] dark:invert-[0.92] dark:saturate-[0.8]"
        />
      </motion.div>
    </Section>
  )
}
