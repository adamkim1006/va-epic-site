import fs from "node:fs/promises"
import path from "node:path"
import { patientFormMetadata, type PatientFormCategory } from "@/content/patient-form-metadata"

const patientFormsDir = path.join(process.cwd(), "public", "patient-forms")

export type PatientFormItem = {
  slug: string
  filename: string
  title: string
  description: string
  category: PatientFormCategory
  extension: "pdf" | "docx"
  publicPath: string
  availablePreview: boolean
  sizeLabel: string
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function toPublicPath(filename: string) {
  return `/patient-forms/${filename.split("/").map(encodeURIComponent).join("/")}`
}

export async function getPatientForms(): Promise<PatientFormItem[]> {
  const files = await fs.readdir(patientFormsDir)

  const knownFiles = patientFormMetadata.map(async (entry) => {
    if (!files.includes(entry.filename)) {
      return null
    }

    const filePath = path.join(patientFormsDir, entry.filename)
    const stats = await fs.stat(filePath)
    const extension = path.extname(entry.filename).slice(1).toLowerCase()

    if (extension !== "pdf" && extension !== "docx") {
      return null
    }

    return {
      slug: slugify(entry.filename),
      filename: entry.filename,
      title: entry.title,
      description: entry.description,
      category: entry.category,
      extension,
      publicPath: toPublicPath(entry.filename),
      availablePreview: extension === "pdf",
      sizeLabel: formatSize(stats.size),
    } satisfies PatientFormItem
  })

  const resolved = await Promise.all(knownFiles)

  return resolved
    .filter((item): item is PatientFormItem => Boolean(item))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export async function getPatientFormBySlug(slug?: string) {
  const forms = await getPatientForms()
  const selected =
    forms.find((item) => item.slug === slug) ||
    forms.find((item) => item.availablePreview) ||
    forms[0]

  return {
    forms,
    selected,
  }
}
