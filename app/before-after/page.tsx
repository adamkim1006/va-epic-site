import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { GalleryFilters } from "@/components/gallery/gallery-filters"

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description: "View real results from dental implant and periodontal treatments at VA EPIC. See the transformations our patients have achieved.",
}

export default function BeforeAfterPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="Results"
          title="Before & After Gallery"
          description="See real transformations from our dental implant and periodontal treatments. These results showcase the life-changing impact of proper care and expert treatment."
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          showAnimatedBackground={false}
          backgroundImageSrc="/images/Site%20Files/pano%20before%20and%20after.jpg"
          backgroundPosition="center 32%"
        />
        
        <Section>
          <SectionHeader
            subtitle="Real Patients, Real Results"
            title="Our Work Speaks for Itself"
            description="Browse our gallery of successful cases. Each transformation represents a patient who regained their confidence and oral health through our care."
          />
          <GalleryFilters />
          <GalleryGrid />
        </Section>

        <Section variant="muted">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Results May Vary</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every patient is unique, and results depend on individual circumstances. During your consultation, we will discuss realistic expectations for your specific situation and create a treatment plan designed to achieve the best possible outcome for you.
            </p>
          </div>
        </Section>

        <CTASection
          title="Ready to Start Your Transformation?"
          description="Schedule your consultation to discuss your goals and learn how we can help you achieve a healthier, more confident smile."
        />
      </main>
      <Footer />
    </>
  )
}
