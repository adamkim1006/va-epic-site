"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionHeader } from "@/components/section"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  description?: string
  items: readonly FAQItem[]
  variant?: "default" | "muted"
  id?: string
}

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "FAQ",
  description = "Find answers to common questions about our procedures and care.",
  items,
  variant = "muted",
  id,
}: FAQSectionProps) {
  return (
    <Section id={id} variant={variant}>
      <SectionHeader title={title} subtitle={subtitle} description={description} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto mt-12"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-lg border border-border px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="font-semibold">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  )
}
