import { NextResponse } from "next/server"

import { getDecapConfig, getRequestOrigin } from "@/lib/decap"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const origin = getRequestOrigin(request)
  const config = await getDecapConfig(origin)

  return new NextResponse(config, {
    headers: {
      "Content-Type": "text/yaml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
