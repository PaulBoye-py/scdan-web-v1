import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

// Sanity webhook: called on publish so changes appear immediately instead of within 5 minutes.
// Configure in sanity.io/manage → API → Webhooks with the same secret as SANITY_REVALIDATE_SECRET.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret)
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    // Content appears across listings, the homepage, the sitemap and OG images, so refresh everything.
    revalidatePath("/", "layout")
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Unknown error" }, { status: 500 })
  }
}
