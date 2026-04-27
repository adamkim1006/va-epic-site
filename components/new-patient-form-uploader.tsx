"use client"

import { useMemo, useRef, useState, type DragEvent, type FormEvent } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Download,
  FileBadge2,
  FileUp,
  LoaderCircle,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { PatientFormItem } from "@/lib/patient-forms"
import { cn } from "@/lib/utils"

const MAX_FILES = 6
const ACCEPTED_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
]

type StatusState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }

type NewPatientFormsUploaderProps = {
  forms: PatientFormItem[]
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function dedupeFiles(files: File[]) {
  const seen = new Set<string>()

  return files.filter((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

export function NewPatientFormsUploader({
  forms,
}: NewPatientFormsUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<StatusState>({
    kind: "idle",
    message:
      "Completed forms can be sent securely to the office here before the first appointment.",
  })
  const [patientInfo, setPatientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  const totalSizeLabel = useMemo(() => {
    const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0)
    return formatBytes(totalSize)
  }, [uploadedFiles])

  function mergeFiles(nextFiles: File[]) {
    const merged = dedupeFiles([...uploadedFiles, ...nextFiles]).slice(0, MAX_FILES)
    setUploadedFiles(merged)
  }

  function handleFileSelection(fileList: FileList | null) {
    if (!fileList) return

    const nextFiles = Array.from(fileList)

    if (uploadedFiles.length + nextFiles.length > MAX_FILES) {
      setStatus({
        kind: "error",
        message: `Please upload no more than ${MAX_FILES} files at once.`,
      })
    }

    mergeFiles(nextFiles)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFileSelection(event.dataTransfer.files)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (uploadedFiles.length === 0) {
      setStatus({
        kind: "error",
        message: "Please attach at least one completed form before sending.",
      })
      return
    }

    const formData = new FormData()
    formData.set("firstName", patientInfo.firstName)
    formData.set("lastName", patientInfo.lastName)
    formData.set("email", patientInfo.email)
    formData.set("phone", patientInfo.phone)
    formData.set("notes", patientInfo.notes)

    uploadedFiles.forEach((file) => formData.append("files", file))

    setIsSubmitting(true)
    setStatus({
      kind: "idle",
      message: "Sending paperwork to the office...",
    })

    fetch("/api/patient-forms", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const payload = (await response.json()) as { ok?: boolean; error?: string }

        if (!response.ok || !payload.ok) {
          throw new Error(
            payload.error || "There was a problem sending your completed forms."
          )
        }

        setUploadedFiles([])
        setPatientInfo({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          notes: "",
        })
        if (inputRef.current) {
          inputRef.current.value = ""
        }
        setStatus({
          kind: "success",
          message:
            "Your completed paperwork has been emailed to VA EPIC. The team can review it before your first appointment.",
        })
      })
      .catch((error: unknown) => {
        setStatus({
          kind: "error",
          message:
            error instanceof Error
              ? error.message
              : "There was a problem sending your completed forms.",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr] xl:gap-8">
      <div className="order-2 space-y-5 xl:order-1 xl:space-y-6">
        <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                First Appointment
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-foreground">
                New patient checklist
              </h3>
            </div>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-6">
            <p>
              These three forms are the main items new patients should complete
              before coming in for their first visit.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 rounded-2xl bg-secondary/70 px-4 py-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary shadow-sm dark:bg-slate-950/82 dark:text-sky-300 dark:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.88)]">
                  1
                </span>
                <p>Open each form below and complete it on your device or by hand.</p>
              </div>
              <div className="flex gap-3 rounded-2xl bg-secondary/70 px-4 py-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary shadow-sm dark:bg-slate-950/82 dark:text-sky-300 dark:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.88)]">
                  2
                </span>
                <p>Upload the completed files together so the office can review them before your visit.</p>
              </div>
              <div className="flex gap-3 rounded-2xl bg-secondary/70 px-4 py-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary shadow-sm dark:bg-slate-950/82 dark:text-sky-300 dark:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.88)]">
                  3
                </span>
                <p>
                  If anything is missing, the team can still help you finish the rest at check-in.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {forms.map((form) => (
            <div
              key={form.slug}
              className="rounded-[1.45rem] border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
                  <FileBadge2 className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-semibold text-foreground">{form.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {form.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-3 py-1 uppercase">
                      {form.extension}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1">
                      {form.sizeLabel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Button asChild className="w-full rounded-full sm:w-auto">
                  <Link href={form.publicPath} target="_blank">
                    <Download className="h-4 w-4" />
                    Open form
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="order-1 rounded-[1.75rem] border border-border bg-card p-5 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.42)] sm:p-7 xl:order-2"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Send Before Your Visit
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-foreground">
              Upload completed forms
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Drag and drop your completed forms here, or select them manually.
              They will be emailed directly to the office for review before your appointment.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">First name</span>
            <Input
              required
              value={patientInfo.firstName}
              onChange={(event) =>
                setPatientInfo((current) => ({
                  ...current,
                  firstName: event.target.value,
                }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Last name</span>
            <Input
              required
              value={patientInfo.lastName}
              onChange={(event) =>
                setPatientInfo((current) => ({
                  ...current,
                  lastName: event.target.value,
                }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Email</span>
            <Input
              required
              type="email"
              value={patientInfo.email}
              onChange={(event) =>
                setPatientInfo((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-foreground">Phone</span>
            <Input
              required
              type="tel"
              value={patientInfo.phone}
              onChange={(event) =>
                setPatientInfo((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
            />
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-sm font-medium text-foreground">
            Notes for the office
          </span>
          <Textarea
            value={patientInfo.notes}
            onChange={(event) =>
              setPatientInfo((current) => ({
                ...current,
                notes: event.target.value,
              }))
            }
            placeholder="Optional: mention which appointment these forms are for, or anything the office should know."
            className="min-h-28"
          />
        </label>

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(event) => {
            event.preventDefault()
            setIsDragging(false)
          }}
          onDrop={handleDrop}
          className={cn(
            "mt-6 rounded-[1.5rem] border border-dashed px-4 py-6 text-center transition-colors sm:px-6 sm:py-8",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border bg-secondary/50 hover:border-accent/40 hover:bg-secondary/80"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPTED_FILE_EXTENSIONS.join(",")}
            className="hidden"
            onChange={(event) => handleFileSelection(event.target.files)}
          />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-950/82 dark:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.88)]">
            <FileUp className="h-7 w-7 text-primary dark:text-sky-300" />
          </div>
          <p className="mt-4 text-base font-medium text-foreground">
            Drag and drop completed forms here
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Or click to select PDFs, Word documents, or clear phone scans.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Up to {MAX_FILES} files. Accepted formats: {ACCEPTED_FILE_EXTENSIONS.join(", ")}.
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-border bg-secondary/40 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Attached files</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {uploadedFiles.length} file{uploadedFiles.length === 1 ? "" : "s"} attached
                {uploadedFiles.length > 0 ? ` • ${totalSizeLabel}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Office inbox delivery
            </div>
          </div>

          {uploadedFiles.length > 0 ? (
            <div className="mt-4 space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setUploadedFiles((current) =>
                        current.filter((_, currentIndex) => currentIndex !== index)
                      )
                    }
                    aria-label={`Remove ${file.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No files attached yet.
            </p>
          )}
        </div>

        <div className="mt-6">
          <Alert
            className={cn(
              status.kind === "success" && "border-emerald-200 bg-emerald-50 text-emerald-900",
              status.kind === "error" && "border-destructive/30 bg-destructive/5"
            )}
            variant={status.kind === "error" ? "destructive" : "default"}
          >
            <AlertTitle>
              {status.kind === "success"
                ? "Forms ready"
                : status.kind === "error"
                  ? "Submission issue"
                  : "Paperwork upload"}
            </AlertTitle>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">
            If you prefer, you can still bring paperwork to the office. This upload
            option is simply meant to make first visits easier.
          </p>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full px-6 sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending forms
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                Email completed forms
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
