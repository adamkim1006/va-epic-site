import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { InsuranceSection } from "@/components/financing/insurance-section"
import { PaymentOptions } from "@/components/financing/payment-options"
import { buildMetadata } from "@/lib/seo"
import { financingFaqItems, generalFaqItems } from "@/lib/site"

export const metadata: Metadata = buildMetadata(
  "FAQs",
  "Read common questions about consultations, implants, periodontal care, insurance, and financing at VA EPIC in Chantilly, Virginia.",
  "/faqs"
)

export default function FAQsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="FAQs"
          title="Questions About Treatment, Consultations, and Financing"
          description="This page brings together the most common questions patients ask before starting care at VA EPIC, including what to expect, when to seek specialty treatment, and how financing conversations work."
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          showAnimatedBackground={false}
          backgroundImageSrc="/images/Site Files/20201022_153925.jpg"
          backgroundPosition="center"
        />

        <FAQSection
          items={generalFaqItems}
          title="General Questions"
          subtitle="Frequently Asked Questions"
          description="Start here for common questions about the office, specialty care, and treatment planning."
          variant="default"
        />

        <InsuranceSection />
        <PaymentOptions />
        <FAQSection
          id="financing"
          items={financingFaqItems}
          title="Financing & Insurance Questions"
          subtitle="Financing"
          description="Answers to common questions about estimates, benefits, insurance coordination, and payment planning."
          variant="default"
        />

        <CTASection
          title="Still Have Questions?"
          description="If your case is complex or you are weighing several treatment paths, the best next step is to schedule a consultation so we can talk through your specific diagnosis and options."
        />
      </main>
      <Footer />
    </>
  )
}
