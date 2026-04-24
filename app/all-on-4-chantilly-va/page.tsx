import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { ServiceMarkdownSections } from "@/components/service-markdown-sections"
import { BeforeAfterPreview } from "@/components/before-after-preview"
import { AllOnXScene } from "@/components/three/all-on-x-scene"
import { getServicePageContent } from "@/lib/service-page-content"
import { buildMetadata } from "@/lib/seo"

const allOnXBeforeAfterContent = {
  subtitle: "Full-Arch Results",
  title: "Compare an All-on-X Transformation",
  description:
    "See how a full-arch case looks before treatment and after restoration, with a focused pano comparison and one supporting smile reference.",
  featuredCase: {
    category: "All-on-X",
    title: "Full-Arch Pano Transformation",
    description:
      "Compare the pre-treatment panoramic view with the restored post-treatment result using the interactive slider.",
    beforeImage: "/images/Site Files/Lee All on 4 Before sx Pano.JPG",
    afterImage: "/images/Site Files/Lee All on 4 after sx Pano.JPG",
  },
  supportingCases: [
    {
      category: "All-on-X",
      title: "Smile Preview",
      image: "/images/Site Files/All on 4 Lee before and after.jpg",
      description:
        "A supporting before-and-after smile view that complements the featured panoramic comparison.",
    },
    {
      category: "Smile Design",
      title: "Cosmetic Reference",
      image: "/images/Site Files/Veneers before and after.jpg",
      description:
        "An additional visual reference that keeps the side column lively without repeating the pano comparison.",
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicePageContent("all-on-4-chantilly-va")
  return buildMetadata(
    content.metaTitle,
    content.metaDescription,
    "/all-on-4-chantilly-va"
  )
}

export default async function AllOnXPage() {
  const content = await getServicePageContent("all-on-4-chantilly-va")

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
        
        <AllOnXScene />
      </Section>

        <ServiceMarkdownSections sections={content.sections} />
        <BeforeAfterPreview {...allOnXBeforeAfterContent} />
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
