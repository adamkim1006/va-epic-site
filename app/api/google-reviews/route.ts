import { NextResponse } from "next/server"
import { fetchGoogleReviews } from "@/lib/google-places"

export const revalidate = 86400

export async function GET() {
  try {
    const data = await fetchGoogleReviews()
    return NextResponse.json({
      ok: true,
      ...data,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Google Places error"

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    )
  }
}
