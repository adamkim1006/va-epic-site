"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, CreditCard, FileCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"

const financingFeatures = [
  {
    icon: Shield,
    title: "Insurance Accepted",
    description: "We work with most major dental insurance providers and will help you maximize your benefits.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Plans",
    description: "Interest-free financing options available to make your treatment affordable.",
  },
  {
    icon: FileCheck,
    title: "Transparent Pricing",
    description: "No hidden fees. We provide detailed cost breakdowns before any treatment begins.",
  },
]

export function FinancingSection() {
  return (
    <Section
      backgroundImageSrc="/images/va-epic-logo.jpg"
      backgroundPosition="center"
      backgroundOpacity={0.18}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {financingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(79,209,217,0.22)_0%,rgba(37,99,235,0.14)_100%)] ring-1 ring-accent/20">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div>
          <SectionHeader
            align="left"
            subtitle="FAQs & Financing"
            title="Answers About Care, Insurance, and Next Steps"
            description="We keep the process transparent. Explore common questions about treatment, consultation flow, insurance coordination, and financing support in one place."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/faqs">
                Explore FAQs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
