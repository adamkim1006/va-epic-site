import type { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"
import {
  ArrowUpRight,
  Download,
  FilePenLine,
  MonitorSmartphone,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { PatientPdfViewer } from "@/components/patient-pdf-viewer"
import { CTASection } from "@/components/cta-section"
import { Section, SectionHeader } from "@/components/section"
import {
  patientResourceCopy,
  patientSupportLinks,
} from "@/content/site-content"
import { getPatientFormBySlug } from "@/lib/patient-forms"
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

function FormCard({
  slug,
  title,
  description,
  href,
  category,
  extension,
  sizeLabel,
  selected,
}: {
  slug: string
  title: string
  description: string
  href: string
  category: string
  extension: string
  sizeLabel: string
  selected: boolean
}) {
  const Icon = FilePenLine

  return (
    <div
      className={`rounded-2xl border bg-card p-6 shadow-sm transition-all ${
        selected ? "border-primary/40 shadow-lg" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Interactive PDF
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
          href={{
            pathname: "/for-patients",
            query: { form: slug },
            hash: "patient-forms",
          }}
          scroll={false}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-primary"
        >
          <MonitorSmartphone className="h-4 w-4" />
          View details
        </Link>
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

export default async function ForPatientsPage({
  searchParams,
}: {
  searchParams?: Promise<{ form?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const { forms, selected } = await getPatientFormBySlug(resolvedSearchParams?.form)
  const groupedForms = forms.reduce<Record<string, typeof forms>>((acc, form) => {
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
            {Object.entries(categoryDescriptions).map(([category, description]) => (
              <div key={category} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold">{category}</h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="patient-forms" variant="muted">
          <SectionHeader
            subtitle="Forms"
            title="Patient Forms Library"
            description="The page reads directly from `public/patient-forms/` and renders each PDF in a native in-browser viewer with dark-mode support, quick downloads, and a larger reading column."
          />
          <div className="mt-12 grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
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
                        slug={form.slug}
                        title={form.title}
                        description={form.description}
                        href={form.publicPath}
                        category={form.category}
                        extension={form.extension}
                        sizeLabel={form.sizeLabel}
                        selected={selected?.slug === form.slug}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="xl:sticky xl:top-28 xl:self-start">
              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
                <div className="border-b border-border bg-[linear-gradient(135deg,rgba(79,209,217,0.1)_0%,rgba(37,99,235,0.06)_100%)] px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {patientResourceCopy.previewTitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground">
                    {selected?.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {patientResourceCopy.previewDescription}
                  </p>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-3 py-1">
                      {selected?.category}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 uppercase">
                      {selected?.extension}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1">
                      {selected?.sizeLabel}
                    </span>
                  </div>

                  {selected?.availablePreview ? (
                    <PatientPdfViewer
                      src={selected.publicPath}
                      title={selected.title}
                    />
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border bg-secondary/70 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <p className="mt-4 text-base font-medium text-foreground">
                        This file is available to download, but it does not support embedded preview.
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Open the file in a new tab or download it directly if you need the original document on your device.
                      </p>
                    </div>
                  )}

                  {selected ? (
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={selected.publicPath}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Open in new tab
                      </Link>
                      <Link
                        href={selected.publicPath}
                        download
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-primary"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
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
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-primary"
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
