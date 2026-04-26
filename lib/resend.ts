export class MissingEmailConfigError extends Error {
  constructor() {
    super(
      "Email delivery is not configured yet. Add RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL."
    )
    this.name = "MissingEmailConfigError"
  }
}

export class ResendEmailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ResendEmailError"
  }
}

export type ResendAttachment = {
  filename: string
  content: string
  content_type?: string
}

type ResendEmailInput = {
  subject: string
  replyTo?: string
  text: string
  html: string
  attachments?: ResendAttachment[]
}

function getEmailConfig() {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!resendApiKey || !fromEmail || !toEmail) {
    throw new MissingEmailConfigError()
  }

  return {
    resendApiKey,
    fromEmail,
    toEmail,
  }
}

export async function sendResendEmail({
  subject,
  replyTo,
  text,
  html,
  attachments,
}: ResendEmailInput) {
  const { resendApiKey, fromEmail, toEmail } = getEmailConfig()

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      reply_to: replyTo,
      text,
      html,
      attachments,
    }),
  })

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text()
    throw new ResendEmailError(`Email provider error: ${errorText}`)
  }
}
