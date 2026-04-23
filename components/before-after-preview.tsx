"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"

export function BeforeAfterPreview() {
  return (
    <Section>
      <SectionHeader
        subtitle="Real Results"
        title="See the Transformation"
        description="View our gallery of successful dental implant cases and see the life-changing results our patients have achieved."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="aspect-[4/3] rounded-2xl bg-secondary border border-border overflow-hidden relative group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Before & After {item}</span>
            </div>
            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-primary-foreground font-medium">View Case Study</span>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Button asChild variant="outline" size="lg">
          <Link href="/before-after">
            View Full Gallery
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  )
}
