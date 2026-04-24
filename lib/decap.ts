import { readFile } from "node:fs/promises"
import path from "node:path"

const DEFAULT_SITE_URL = "https://va-epic-site.vercel.app"

function normalizeOrigin(value: string) {
  return value.replace(/\/+$/, "")
}

export function getRequestOrigin(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost || request.headers.get("host")
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (host) {
    return normalizeOrigin(`${forwardedProto || "https"}://${host}`)
  }

  if (envSiteUrl) {
    return normalizeOrigin(envSiteUrl)
  }

  return DEFAULT_SITE_URL
}

export function getRequestHostname(request: Request) {
  return new URL(getRequestOrigin(request)).hostname
}

export async function getDecapConfig(origin: string) {
  const templatePath = path.join(process.cwd(), "public", "admin", "config.yml")
  const template = await readFile(templatePath, "utf8")

  return template
    .replace(
      /  # For Vercel-hosted Decap, point these at your OAuth proxy domain\.\n  # Example:\n  # base_url: https:\/\/your-decap-oauth\.example\.com\n  # auth_endpoint: auth\n/,
      `  site_domain: ${new URL(origin).hostname}\n  base_url: ${origin}\n  auth_endpoint: api/decap/auth\n`
    )
    .replace(/^site_url: .*/m, `site_url: ${origin}`)
    .replace(/^display_url: .*/m, `display_url: ${origin}`)
}
