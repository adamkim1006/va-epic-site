const GOOGLE_PLACES_BASE_URL = "https://places.googleapis.com/v1/places"
export const GOOGLE_REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24

type GooglePlacesLocalizedText = {
  text?: string
  languageCode?: string
}

type GooglePlacesReview = {
  rating?: number
  relativePublishTimeDescription?: string
  publishTime?: string
  text?: GooglePlacesLocalizedText
  originalText?: GooglePlacesLocalizedText
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
  }
  googleMapsUri?: string
}

type GooglePlacesResponse = {
  displayName?: GooglePlacesLocalizedText
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: GooglePlacesReview[]
}

export type GoogleReview = {
  name: string
  content: string
  rating: number
  treatment: string
  relativeTime: string
  authorUrl?: string
  sourceUrl?: string
}

export type GoogleReviewSummary = {
  placeName?: string
  rating?: number
  totalRatings?: number
  placeUrl?: string
}

function toInitials(name?: string): string {
  if (!name) return "GR"

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  return initials || "GR"
}

function mapReview(review: GooglePlacesReview): GoogleReview {
  return {
    name: toInitials(review.authorAttribution?.displayName),
    content:
      review.text?.text ||
      review.originalText?.text ||
      "Shared a review on Google.",
    rating: review.rating || 5,
    treatment: "Google Review",
    relativeTime: review.relativePublishTimeDescription || "Recent review",
    authorUrl: review.authorAttribution?.uri,
    sourceUrl: review.googleMapsUri,
  }
}

export async function fetchGoogleReviews(): Promise<{
  reviews: GoogleReview[]
  summary?: GoogleReviewSummary
}> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID

  if (!apiKey || !placeId) {
    return { reviews: [] }
  }

  const response = await fetch(`${GOOGLE_PLACES_BASE_URL}/${placeId}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
    next: {
      revalidate: GOOGLE_REVIEWS_REVALIDATE_SECONDS,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Google Places request failed with status ${response.status}: ${errorText}`
    )
  }

  const data = (await response.json()) as GooglePlacesResponse

  const allReviews =
    data.reviews
      ?.slice()
      .sort((a, b) => {
        const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0
        const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0
        return bTime - aTime
      })
      .slice(0, 4)
      .map(mapReview) || []

  const fiveStarReviews =
    data.reviews
      ?.filter((review) => review.rating === 5)
      .slice()
      .sort((a, b) => {
        const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0
        const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0
        return bTime - aTime
      })
      .slice(0, 4)
      .map(mapReview) || []

  const reviews = fiveStarReviews.length > 0 ? fiveStarReviews : allReviews

  if (process.env.NODE_ENV !== "production") {
    console.log("[google-places] fetched reviews", {
      totalFromApi: data.reviews?.length ?? 0,
      fiveStarCount: fiveStarReviews.length,
      displayedCount: reviews.length,
      placeName: data.displayName?.text,
    })
  }

  return {
    reviews,
    summary: {
      placeName: data.displayName?.text,
      rating: data.rating,
      totalRatings: data.userRatingCount,
      placeUrl: data.googleMapsUri,
    },
  }
}
