import { NextResponse } from "next/server"
import { z } from "zod"

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

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.CONTACT_FROM_EMAIL
    const toEmail = process.env.CONTACT_TO_EMAIL

    if (!resendApiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email delivery is not configured yet. Add RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.",
        },
        { status: 500 }
      )
    }

    const { firstName, lastName, email, phone, service, message } = result.data
    const fullName = `${firstName} ${lastName}`.trim()

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New VA EPIC website inquiry from ${fullName}`,
        reply_to: email,
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
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      return NextResponse.json(
        { ok: false, error: `Email provider error: ${errorText}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown contact form error"

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    )
  }
}

