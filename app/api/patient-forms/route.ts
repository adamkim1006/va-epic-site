import { NextResponse } from "next/server"
import { z } from "zod"
import {
  MissingEmailConfigError,
  ResendEmailError,
  type ResendAttachment,
  sendResendEmail,
} from "@/lib/resend"

const MAX_FILE_COUNT = 6
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
])

const patientFormsUploadSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  notes: z.string().trim().max(3000).optional(),
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]+/g, "-")
}

function isAllowedFile(file: File) {
  const mimeType = file.type?.toLowerCase()

  if (mimeType && allowedMimeTypes.has(mimeType)) {
    return true
  }

  return /\.(pdf|doc|docx|jpe?g|png)$/i.test(file.name)
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = patientFormsUploadSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      notes: formData.get("notes") || undefined,
    })

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Please complete the patient information fields." },
        { status: 400 }
      )
    }

    const files = formData
      .getAll("files")
      .filter((value): value is File => value instanceof File && value.size > 0)

    if (files.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Please attach at least one completed form." },
        { status: 400 }
      )
    }

    if (files.length > MAX_FILE_COUNT) {
      return NextResponse.json(
        {
          ok: false,
          error: `Please upload no more than ${MAX_FILE_COUNT} files at a time.`,
        },
        { status: 400 }
      )
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0)

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: "The total upload is too large. Please keep attachments under 20 MB.",
        },
        { status: 400 }
      )
    }

    const invalidFile = files.find(
      (file) => !isAllowedFile(file) || file.size > MAX_FILE_SIZE_BYTES
    )

    if (invalidFile) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please upload PDF, Word, JPG, or PNG files only, with each file under 10 MB.",
        },
        { status: 400 }
      )
    }

    const attachments: ResendAttachment[] = await Promise.all(
      files.map(async (file) => ({
        filename: sanitizeFilename(file.name),
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
        content_type: file.type || undefined,
      }))
    )

    const { firstName, lastName, email, phone, notes } = result.data
    const fullName = `${firstName} ${lastName}`.trim()

    await sendResendEmail({
      subject: `New patient paperwork from ${fullName}`,
      replyTo: email,
      attachments,
      text: [
        `Patient name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Attached files: ${files.map((file) => file.name).join(", ")}`,
        "",
        "Notes:",
        notes || "No additional notes provided.",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
          <h2 style="margin-bottom: 16px;">New Patient Paperwork Submission</h2>
          <p><strong>Patient name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Attached files:</strong> ${escapeHtml(
            files.map((file) => file.name).join(", ")
          )}</p>
          <p><strong>Notes:</strong></p>
          <div style="white-space: pre-wrap; padding: 16px; border-radius: 12px; background: #f3f4f6;">${escapeHtml(
            notes || "No additional notes provided."
          )}</div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof MissingEmailConfigError) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      )
    }

    if (error instanceof ResendEmailError) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 502 }
      )
    }

    const message =
      error instanceof Error ? error.message : "Unknown patient upload error"

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    )
  }
}
