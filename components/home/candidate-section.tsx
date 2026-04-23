"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"

const candidateCriteria = [
  "You have one or more missing teeth",
  "You wear uncomfortable dentures",
  "Your teeth are severely damaged or decayed",
  "You have sufficient jawbone density (or qualify for bone grafting)",
  "You are in good general health",
  "You do not smoke or are willing to quit",
  "You want a permanent, long-lasting solution",
]

export function CandidateSection() {
  return (
    <Section id="candidate">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            align="left"
            subtitle="Are You a Candidate?"
            title="Am I a Candidate for Dental Implants?"
            description="Dental implants are an excellent solution for most adults missing one or more teeth. Review the checklist below to see if you might be a good candidate."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Schedule Your Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 border border-border shadow-sm"
        >
          <h3 className="font-semibold text-lg mb-6">You may be a good candidate if:</h3>
          <ul className="space-y-4">
            {candidateCriteria.map((criterion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <span className="text-muted-foreground">{criterion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}
