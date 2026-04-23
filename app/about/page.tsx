import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { OfficeCarousel } from "@/components/about/office-carousel"
import { DoctorProfile } from "@/components/about/doctor-profile"
import { Philosophy } from "@/components/about/philosophy"
import { editablePageContent, officeGalleryImages } from "@/content/site-content"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata(
  "About Us",
  "Meet Dr. Dong-Soo Park and learn about the diagnosis-driven, specialist approach behind VA EPIC in Chantilly, Virginia.",
  "/about"
)

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle={editablePageContent.aboutHero.subtitle}
          title={editablePageContent.aboutHero.title}
          description={editablePageContent.aboutHero.description}
          primaryButtonText="Meet Dr. Park"
          primaryButtonHref="#doctor"
          showAnimatedBackground={false}
          backgroundImageSrc="/images/Site Files/1626896176227-4.jpg"
          backgroundPosition="center 44%"
        />
        
        <DoctorProfile />
        <Philosophy />
        <Section>
          <SectionHeader
            subtitle="Our Office"
            title="A Modern Office Designed for Thoughtful Care"
            description="Our office is built to support careful diagnosis, efficient treatment planning, and a comfortable patient experience from the first consultation through follow-up care."
          />
          <OfficeCarousel images={officeGalleryImages} />
        </Section>

        <CTASection
          title="Ready to Experience the Difference?"
          description="Schedule your consultation and learn how VA EPIC approaches implant and periodontal care with clarity, precision, and long-term planning."
        />
      </main>
      <Footer />
    </>
  )
}
