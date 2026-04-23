import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { AllOnXBenefits } from "@/components/all-on-x/benefits"
import { AllOnXComparison } from "@/components/all-on-x/comparison"
import { AllOnXProcess } from "@/components/all-on-x/process"
import { BeforeAfterPreview } from "@/components/before-after-preview"
import { AllOnXScene } from "@/components/three/all-on-x-scene"

export const metadata: Metadata = {
  title: "All-on-4 Dental Implants in Chantilly, VA",
  description: "All-on-X full-arch restoration in Chantilly, Virginia. Rebuild a full smile with a fixed implant-supported solution planned around comfort, function, and stability.",
}

const faqItems = [
  {
    question: "What is the difference between All-on-4 and All-on-6?",
    answer: "Both procedures replace a full arch of teeth using implants. All-on-4 uses 4 strategically placed implants, while All-on-6 uses 6 implants for additional support. The best option depends on your bone density and specific needs. During your consultation, we will recommend the approach that offers the best long-term results for your situation.",
  },
  {
    question: "Can I get All-on-X if I have bone loss?",
    answer: "Yes, one of the major advantages of All-on-X is that the implants are placed at specific angles to maximize available bone. Many patients who have been told they do not have enough bone for traditional implants are excellent candidates for All-on-X. In some cases, bone grafting may still be beneficial.",
  },
  {
    question: "Will I leave with teeth the same day?",
    answer: "Yes! One of the biggest benefits of All-on-X is that you receive a temporary fixed bridge on the same day as your surgery. This means you never have to go without teeth. After healing (typically 3-6 months), your permanent, custom-designed prosthesis will be placed.",
  },
  {
    question: "How long does the All-on-X procedure take?",
    answer: "The surgical procedure typically takes 2-4 hours per arch. Most patients are surprised at how comfortable and quick the process is. You will be sedated during the procedure and many patients report minimal discomfort afterward.",
  },
  {
    question: "How do I care for my All-on-X teeth?",
    answer: "Care is similar to natural teeth. You will brush twice daily with a soft-bristle brush and use a water flosser to clean around the prosthesis. Regular check-ups every 6 months are important to ensure everything remains healthy and secure.",
  },
]

export default function AllOnXPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="All-on-X Full Arch"
          title="All-on-4 Dental Implants in Chantilly, VA"
          description="For patients with failing dentition or extensive tooth loss, All-on-X can provide a fixed, implant-supported full-arch solution with a strong emphasis on planning, stability, and function."
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          backgroundImageSrc="/images/Site%20Files/All-on-4%20smile.jpg"
          backgroundPosition="center 28%"
        />
        
      <Section className="p-0 lg:p-0 overflow-visible">
        <div className="pt-16 lg:pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Full Arch Restoration"
            title="A Complete Smile Solution"
            description="All-on-X (including All-on-4 and All-on-6) is a revolutionary dental implant technique that provides a full arch of beautiful, functional teeth supported by just 4-6 strategically placed implants. This approach offers immediate results and long-term stability."
          />
        </div>
        
        <AllOnXScene />
      </Section>

        <AllOnXBenefits />
        <AllOnXComparison />
        <AllOnXProcess />
        <BeforeAfterPreview />
        <FAQSection items={faqItems} />
        <CTASection
          title="Ready for a Complete Smile Transformation?"
          description="Discover if All-on-X is right for you. Schedule your consultation to learn how we can restore your smile in just one day."
        />
      </main>
      <Footer />
    </>
  )
}
