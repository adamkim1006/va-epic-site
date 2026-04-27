import type { Metadata } from "next"
import Link from "next/link"
import {
  ClipboardList,
  Download,
  FilePenLine,
  FolderHeart,
  HeartPulse,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { NewPatientFormsUploader } from "@/components/new-patient-form-uploader"
import { CTASection } from "@/components/cta-section"
import { Section, SectionHeader } from "@/components/section"
import {
  patientResourceCopy,
  patientSupportLinks,
} from "@/content/site-content"
import { getPatientForms } from "@/lib/patient-forms"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata(
  "For Patients",
  "Access patient forms, visit-prep details, and practical resources for consultations and specialty care at VA EPIC in Chantilly, Virginia.",
  "/for-patients"
)

const categoryDescriptions = {
  "Fillable Forms": "Best for pre-visit paperwork patients can complete before arriving.",
  "Policies & Privacy": "Office documents patients often review or sign alongside intake paperwork.",
  "Post-Op Instructions": "Downloadable recovery guidance for surgical and grafting procedures.",
} as const

const newPatientFormTitles = new Set([
  "Patient Registration Form",
  "HIPAA Acknowledgement",
  "Financial Policy",
])

function FormCard({
  title,
  description,
  href,
  category,
  extension,
  sizeLabel,
}: {
  title: string
  description: string
  href: string
  category: string
  extension: string
  sizeLabel: string
}) {
  const Icon = FilePenLine

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Patient Document
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">{title}</h3>
          </div>
        </div>
      </div>
      <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-secondary px-3 py-1">{category}</span>
        <span className="rounded-full bg-secondary px-3 py-1 uppercase">{extension}</span>
        <span className="rounded-full bg-secondary px-3 py-1">{sizeLabel}</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={href}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Open file
        </Link>
      </div>
    </div>
  )
}

export default async function ForPatientsPage() {
  const forms = await getPatientForms()
  const newPatientForms = forms.filter((form) => newPatientFormTitles.has(form.title))
  const libraryForms = forms.filter((form) => !newPatientFormTitles.has(form.title))
  const groupedForms = libraryForms.reduce<Record<string, typeof libraryForms>>((acc, form) => {
    if (!acc[form.category]) {
      acc[form.category] = []
    }
    acc[form.category].push(form)
    return acc
  }, {})

  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle={patientResourceCopy.heroSubtitle}
          title={patientResourceCopy.heroTitle}
          description={patientResourceCopy.heroDescription}
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          secondaryButtonText="View FAQs"
          secondaryButtonHref="/faqs"
          backgroundImageSrc="/images/Site Files/waiting-area.jpg"
          backgroundPosition="center 46%"
          showAnimatedBackground={false}
        />

        <Section>
          <SectionHeader
            subtitle="Patient Resources"
            title={patientResourceCopy.introTitle}
            description={patientResourceCopy.introDescription}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "New Patient Forms",
                description:
                  "Registration, HIPAA, and financial-policy paperwork are grouped together below so first-time patients know exactly where to start.",
                icon: ClipboardList,
              },
              {
                title: "Upload Before You Visit",
                description:
                  "Completed forms can be uploaded here and sent to the office before your appointment.",
                icon: FolderHeart,
              },
              {
                title: "Recovery Instructions",
                description:
                  "Post-operative PDFs remain available separately for patients who need home-care guidance after surgery or grafting procedures.",
                icon: HeartPulse,
              },
            ].map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="patient-forms" variant="muted">
          <SectionHeader
            subtitle="New Patients"
            title={patientResourceCopy.newPatientTitle}
            description={patientResourceCopy.newPatientDescription}
          />
          <div className="mt-12">
            <NewPatientFormsUploader forms={newPatientForms} />
          </div>
        </Section>

        <Section>
          <SectionHeader
            subtitle="Forms"
            title={patientResourceCopy.formsLibraryTitle}
            description={patientResourceCopy.formsLibraryDescription}
          />
          <div className="mt-12">
            <div className="space-y-8">
              {Object.entries(groupedForms).map(([category, categoryForms]) => (
                <div key={category}>
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">{category}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                      {categoryForms?.length ?? 0} file{(categoryForms?.length ?? 0) === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="grid gap-6">
                    {categoryForms?.map((form) => (
                      <FormCard
                        key={form.slug}
                        title={form.title}
                        description={form.description}
                        href={form.publicPath}
                        category={form.category}
                        extension={form.extension}
                        sizeLabel={form.sizeLabel}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section variant="muted">
          <SectionHeader
            subtitle="Support"
            title={patientResourceCopy.supportTitle}
            description={patientResourceCopy.supportDescription}
          />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {patientSupportLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-primary dark:border-white/10 dark:bg-slate-950/76 dark:text-slate-200 dark:hover:border-accent/35 dark:hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Section>

        <CTASection
          title="Need Help Before Your Appointment?"
          description="Call the office if you want help choosing the right paperwork, confirming records to bring, or understanding what to expect at your consultation."
        />
      </main>
      <Footer />
    </>
  )
}
