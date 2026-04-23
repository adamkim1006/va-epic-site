import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { ImplantBenefits } from "@/components/implants/benefits"
import { ImplantProcess } from "@/components/implants/process"
import { ImplantCandidates } from "@/components/implants/candidates"
import { BeforeAfterPreview } from "@/components/before-after-preview"
import { ImplantAnatomyScene } from "@/components/three/implant-anatomy-scene" // ADD THIS LINE

export const metadata: Metadata = {
  title: "Dental Implants in Chantilly, VA",
  description: "Expert dental implant planning and placement at VA EPIC in Chantilly, Virginia. Restore missing teeth with stable, long-term implant solutions.",
}

const faqItems = [
  {
    question: "Is the dental implant procedure painful?",
    answer: "Most patients report that getting a dental implant is less painful than having a tooth extracted. We use local anesthesia during the procedure, and sedation options are available for anxious patients. Post-procedure discomfort is typically mild and manageable with over-the-counter pain medication.",
  },
  {
    question: "How much do dental implants cost?",
    answer: "The cost of dental implants varies depending on your specific needs, including the number of implants, any preparatory procedures like bone grafting, and the type of restoration. During your consultation, we provide a detailed cost breakdown and discuss financing options. Many patients find implants to be a worthwhile investment compared to the ongoing costs of bridges or dentures.",
  },
  {
    question: "How long do dental implants last?",
    answer: "With proper care, dental implants can last a lifetime. The implant itself is made of titanium, which fuses with your jawbone and is incredibly durable. The crown (the visible tooth portion) typically lasts 10-15 years before it may need replacement due to normal wear.",
  },
  {
    question: "What is the recovery time for dental implants?",
    answer: "Initial healing takes about 1-2 weeks, during which you may experience some swelling and discomfort. The implant then needs 3-6 months to fully integrate with your jawbone before the final crown can be placed. Most patients return to normal activities within a few days of the procedure.",
  },
  {
    question: "Can I get an implant if I have bone loss?",
    answer: "Yes, in many cases. If you have bone loss, we can often perform bone grafting to build up the bone before placing the implant. During your consultation, we use advanced 3D imaging to assess your bone structure and determine the best approach for your situation.",
  },
]

export default function DentalImplantsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="Dental Implants"
          title="Dental Implants in Chantilly, VA"
          description="Dental implants offer a stable, long-term way to replace missing teeth. At VA EPIC, treatment is planned carefully around your bone support, bite, esthetic goals, and overall oral health."
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          backgroundImageSrc="/images/Site%20Files/dental-implant-anatomy.jpg"
          backgroundPosition="center"
        />
        
{/* ADDED overflow-visible HERE */}
        <Section className="p-0 lg:p-0 overflow-visible">
          <div className="pt-16 lg:pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="What Are Dental Implants?"
              title="The Permanent Solution for Missing Teeth"
              description="Dental implants are titanium posts surgically placed into your jawbone..."
            />
          </div>
          
          <ImplantAnatomyScene />
        </Section>

        <ImplantBenefits />
        <ImplantCandidates />
        <ImplantProcess />
        <BeforeAfterPreview />
        <FAQSection items={faqItems} />
        <CTASection
          title="Ready for Your New Smile?"
          description="Take the first step toward permanent tooth replacement. Schedule your consultation to learn if dental implants are right for you."
        />
      </main>
      <Footer />
    </>
  )
}
