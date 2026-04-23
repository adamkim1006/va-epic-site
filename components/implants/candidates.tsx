"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"

const goodCandidates = [
  "One or more missing teeth",
  "Adequate jawbone density",
  "Healthy gums without periodontal disease",
  "Good general health",
  "Non-smoker or willing to quit",
  "Committed to oral hygiene",
]

const mayRequireEvaluation = [
  "Smokers may have slower healing",
  "Uncontrolled diabetes needs management first",
  "Bone loss may require grafting",
  "Some medications may affect healing",
]

export function ImplantCandidates() {
  return (
    <Section>
      <SectionHeader
        subtitle="Am I a Candidate?"
        title="Who Can Get Dental Implants?"
        description="Most healthy adults are good candidates for dental implants. During your consultation, we evaluate several factors to ensure success."
      />
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 border border-border"
        >
          <h3 className="font-semibold text-lg mb-6 text-accent">Ideal Candidates Have:</h3>
          <ul className="space-y-4">
            {goodCandidates.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 border border-border"
        >
          <h3 className="font-semibold text-lg mb-6">May Need Additional Evaluation:</h3>
          <ul className="space-y-4">
            {mayRequireEvaluation.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                  <X className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            Even if you have these conditions, implants may still be possible with proper treatment planning.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Button asChild size="lg">
          <Link href="/contact">
            Schedule Your Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  )
}
