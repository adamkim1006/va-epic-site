import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section } from "@/components/section"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { MapSection } from "@/components/contact/map-section"
import { editablePageContent } from "@/content/site-content"
import { practice } from "@/lib/site"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata(
  "Contact Us",
  "Contact VA EPIC to schedule your consultation in Chantilly, Virginia for implants, periodontal care, and full-arch reconstruction.",
  "/contact"
)

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle={editablePageContent.contactHero.subtitle}
          title={editablePageContent.contactHero.title}
          description={editablePageContent.contactHero.description}
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
