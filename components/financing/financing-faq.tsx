"use client"

import { FAQSection } from "@/components/faq-section"

const faqItems = [
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We offer complimentary consultations for new patients considering dental implants or periodontal treatment. During this visit, we will evaluate your needs, discuss treatment options, and provide a detailed cost estimate with no obligation.",
  },
  {
    question: "What if I do not have dental insurance?",
    answer: "We believe everyone deserves quality dental care regardless of insurance status. We offer in-house payment plans, work with financing companies like CareCredit, and accept HSA/FSA accounts. Our team will help you find a solution that fits your budget.",
  },
  {
    question: "How much do dental implants cost?",
    answer: "The cost varies depending on your specific needs, including the number of implants, any preparatory procedures, and the type of restoration. Single implants typically range from $3,000-$5,000 including the crown. During your consultation, we provide a detailed breakdown with no hidden fees.",
  },
  {
    question: "Does insurance cover dental implants?",
    answer: "Coverage varies by plan. Some dental plans cover a portion of implant procedures, while others may not. Medical insurance may cover certain aspects if the procedure is medically necessary. We verify your benefits and explain exactly what is covered before treatment begins.",
  },
  {
    question: "Can I use my FSA or HSA for dental implants?",
    answer: "Yes! Dental implants and periodontal treatments are typically eligible expenses for both Flexible Spending Accounts (FSA) and Health Savings Accounts (HSA). This allows you to pay with pre-tax dollars, effectively saving 20-30% on your care.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Absolutely. We offer in-house payment plans with flexible terms tailored to your budget. We also partner with CareCredit for extended financing options, including 0% interest promotional plans for qualified patients.",
  },
]

export function FinancingFAQ() {
  return (
    <FAQSection
      title="Financing Questions"
      subtitle="Common Questions"
      description="Find answers to frequently asked questions about payment and insurance."
      items={faqItems}
    />
  )
}
