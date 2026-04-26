import { NextResponse } from "next/server"
import { z } from "zod"
import {
  MissingEmailConfigError,
  ResendEmailError,
  sendResendEmail,
} from "@/lib/resend"

const contactFormSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  service: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(5000),
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Please check the form fields and try again." },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, phone, service, message } = result.data
    const fullName = `${firstName} ${lastName}`.trim()

    await sendResendEmail({
      subject: `New VA EPIC website inquiry from ${fullName}`,
      replyTo: email,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
          <h2 style="margin-bottom: 16px;">New VA EPIC Website Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; padding: 16px; border-radius: 12px; background: #f3f4f6;">${escapeHtml(
            message
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
      error instanceof Error ? error.message : "Unknown contact form error"

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    )
  }
}
