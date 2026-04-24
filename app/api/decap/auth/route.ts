import { randomBytes } from "node:crypto"

import { NextResponse } from "next/server"

import { getRequestOrigin } from "@/lib/decap"

export const runtime = "nodejs"

function getGithubClientId() {
  return process.env.GITHUB_OAUTH_CLIENT_ID
}

export async function GET(request: Request) {
  const clientId = getGithubClientId()

  if (!clientId) {
    return NextResponse.json(
      {
        error:
          "Missing GITHUB_OAUTH_CLIENT_ID. Add the GitHub OAuth app credentials in Vercel before using /admin.",
      },
      { status: 500 }
    )
  }

  const origin = getRequestOrigin(request)
  const state = randomBytes(24).toString("hex")
  const callbackUrl = new URL("/api/decap/callback", origin)
  const githubAuthorizeUrl = new URL("https://github.com/login/oauth/authorize")

  githubAuthorizeUrl.searchParams.set("client_id", clientId)
  githubAuthorizeUrl.searchParams.set("redirect_uri", callbackUrl.toString())
  githubAuthorizeUrl.searchParams.set(
    "scope",
    process.env.DECAP_GITHUB_SCOPE || "repo"
  )
  githubAuthorizeUrl.searchParams.set("state", state)

  const response = NextResponse.redirect(githubAuthorizeUrl)

  response.cookies.set("decap-oauth-state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 10,
  })

  return response
}
