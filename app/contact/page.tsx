import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section } from "@/components/section"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { MapSection } from "@/components/contact/map-section"
import { practice } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact VA EPIC to schedule your consultation in Chantilly, Virginia for implants, periodontal care, and full-arch reconstruction.",
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="Get In Touch"
          title="Schedule Your Consultation"
          description="If you have questions about implants, gum treatment, extractions, full-arch reconstruction, or treatment costs, our team is here to help you schedule the right next step."
          showAnimatedBackground={false}
          primaryButtonText="Call Now"
          primaryButtonHref={practice.phoneHref}
          backgroundImageSrc="/images/Site%20Files/20210709_133507.jpg"
          backgroundPosition="center 45%"
        />
        
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </Section>

        <MapSection />
      </main>
      <Footer />
    </>
  )
}
