import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { ServiceMarkdownSections } from "@/components/service-markdown-sections"
import { BeforeAfterPreview } from "@/components/before-after-preview"
import { ImplantAnatomyScene } from "@/components/three/implant-anatomy-scene"
import { getServicePageContent } from "@/lib/service-page-content"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicePageContent("dental-implants-chantilly-va")
  return buildMetadata(
    content.metaTitle,
    content.metaDescription,
    "/dental-implants-chantilly-va"
  )
}

export default async function DentalImplantsPage() {
  const content = await getServicePageContent("dental-implants-chantilly-va")

  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle={content.heroSubtitle}
          title={content.heroTitle}
          description={content.heroDescription}
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          backgroundImageSrc={content.heroBackgroundImageSrc}
          backgroundPosition={content.heroBackgroundPosition}
        />
        <Section className="p-0 lg:p-0 overflow-visible">
          <div className="pt-16 lg:pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={content.visualSectionSubtitle}
              title={content.visualSectionTitle}
              description={content.visualSectionDescription}
            />
          </div>
          
          <ImplantAnatomyScene />
        </Section>

        <ServiceMarkdownSections sections={content.sections} />
        <BeforeAfterPreview />
        <FAQSection
          items={content.faqs}
          title={content.faqTitle}
          subtitle={content.faqSubtitle}
          description={content.faqDescription}
        />
        <CTASection
          title={content.ctaTitle}
          description={content.ctaDescription}
        />
      </main>
      <Footer />
    </>
  )
}
