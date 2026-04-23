"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { editablePageContent } from "@/content/site-content"
import { practice } from "@/lib/site"

interface CTASectionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  showPhone?: boolean
}

export function CTASection({
  title = editablePageContent.defaultCta.title,
  description = editablePageContent.defaultCta.description,
  primaryButtonText = "Schedule Consultation",
  primaryButtonHref = "/contact",
  showPhone = true,
}: CTASectionProps) {
  return (
    <Section className="pb-20 lg:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(247,243,238,0.94)_55%,rgba(237,242,247,0.9)_100%)] px-8 py-12 text-center shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] ring-1 ring-white/70 sm:px-12"
      >
        <div className="mx-auto mb-5 h-1 w-24 rounded-full brand-gradient" />
        <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="text-base"
          >
            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
          </Button>
          {showPhone && (
            <a
              href={practice.phoneHref}
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
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
