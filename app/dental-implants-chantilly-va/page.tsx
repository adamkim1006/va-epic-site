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

const implantBeforeAfterContent = {
  subtitle: "Implant Outcomes",
  title: "Compare Implant Restorations",
  description:
    "Review implant-focused before-and-after imaging and see how treatment planning translates into structural change and restored function.",
  featuredCase: {
    category: "Dental Implants",
    title: "Implant Pano Comparison",
    description:
      "Use the slider to compare the pre-treatment panoramic view with the post-treatment result after implant reconstruction.",
    beforeImage: "/images/Site Files/Lee All on 4 Before sx Pano.JPG",
    afterImage: "/images/Site Files/Lee All on 4 after sx Pano.JPG",
  },
  supportingCases: [
    {
      category: "All-on-X",
      title: "Smile Preview",
      image: "/images/Site Files/All on 4 Lee before and after.jpg",
      description:
        "Restorative work can dramatically change smile presentation.",
    },
    {
      category: "Smile Design",
      title: "Cosmetic Reference",
      image: "/images/Site Files/Veneers before and after.jpg",
      description:
        "Like natural teeth, high-quality porcelain allows light to penetrate the surface rather than reflecting it bluntly.",
    },
  ],
}

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
        <BeforeAfterPreview {...implantBeforeAfterContent} />
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
