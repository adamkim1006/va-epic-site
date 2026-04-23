import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { PerioTreatments } from "@/components/perio/treatments"
import { ServiceMarkdownSections } from "@/components/service-markdown-sections"
import { PerioReversalScene } from "@/components/three/perio-reversal-scene"
import { getServicePageContent } from "@/lib/service-page-content"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicePageContent("periodontal-treatment-chantilly-va")
  return buildMetadata(
    content.metaTitle,
    content.metaDescription,
    "/periodontal-treatment-chantilly-va"
  )
}

export default async function PeriodontalTreatmentPage() {
  const content = await getServicePageContent("periodontal-treatment-chantilly-va")

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
        
        <Section>
          <SectionHeader
            subtitle="Understanding Gum Health"
            title="The Foundation of Your Smile"
            description="Your gums play a crucial role in supporting your teeth and overall oral health. Periodontal disease, if left untreated, can lead to tooth loss and has been linked to systemic health conditions including heart disease and diabetes."
          />
          <div className="mt-12 bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">47%</div>
                <p className="text-muted-foreground text-sm">
                  of adults over 30 have some form of periodontal disease
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">#1</div>
                <p className="text-muted-foreground text-sm">
                  cause of tooth loss in adults is periodontal disease
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">80%</div>
                <p className="text-muted-foreground text-sm">
                  of cases can be treated effectively with early intervention
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section className="p-0 lg:p-0 overflow-visible">
          <div className="pt-16 lg:pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle={content.visualSectionSubtitle}
              title={content.visualSectionTitle}
              description={content.visualSectionDescription}
            />
          </div>
          <PerioReversalScene />
        </Section>

        <ServiceMarkdownSections sections={content.sections} />
        <PerioTreatments />
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
