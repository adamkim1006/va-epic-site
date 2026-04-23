"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { practice } from "@/lib/site"

interface CTASectionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  showPhone?: boolean
}

export function CTASection({
  title = "Ready to Transform Your Smile?",
  description = "Schedule your consultation today and take the first step toward a healthier, more confident smile. Our team is here to answer all your questions.",
  primaryButtonText = "Schedule Consultation",
  primaryButtonHref = "/contact",
  showPhone = true,
}: CTASectionProps) {
  return (
    <Section variant="primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance mb-4">
          {title}
        </h2>
        <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 text-pretty">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-base"
          >
            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
          </Button>
          {showPhone && (
            <a
              href={practice.phoneHref}
              className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">{practice.phoneDisplay}</span>
            </a>
          )}
        </div>
      </motion.div>
    </Section>
  )
}
