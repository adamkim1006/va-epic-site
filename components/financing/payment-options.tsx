"use client"

import { motion } from "framer-motion"
import { CreditCard, Wallet, Calendar, PiggyBank } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const paymentMethods = [
  {
    icon: CreditCard,
    title: "CareCredit",
    description: "Special financing options with low monthly payments. Apply online or in our office for instant approval.",
    features: ["0% interest plans available", "Flexible payment terms", "Quick approval process"],
  },
  {
    icon: Calendar,
    title: "In-House Payment Plans",
    description: "We offer customized payment plans to fit your budget. No third-party lenders or credit checks required.",
    features: ["Tailored to your budget", "No interest for qualified patients", "Flexible terms"],
  },
  {
    icon: Wallet,
    title: "Cash & Cards",
    description: "We accept all major credit cards, debit cards, personal checks, and cash payments.",
    features: ["Visa, Mastercard, Amex", "Discover, personal checks", "HSA/FSA cards accepted"],
  },
  {
    icon: PiggyBank,
    title: "HSA & FSA",
    description: "Use your Health Savings Account or Flexible Spending Account for tax-advantaged dental care.",
    features: ["Pre-tax dollars for care", "We provide documentation", "Maximize your benefits"],
  },
]

export function PaymentOptions() {
  return (
    <Section>
      <SectionHeader
        subtitle="Payment Options"
        title="Flexible Ways to Pay"
        description="We offer multiple payment options to make your treatment affordable and accessible."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <method.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">{method.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {method.description}
            </p>
            <ul className="space-y-2">
              {method.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
