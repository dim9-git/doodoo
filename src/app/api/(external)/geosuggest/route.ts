import { NextRequest, NextResponse } from "next/server"
import { GeoResponseDTO } from "@/features/geosuggest"
import { getRateLimitIdentifier, moderateRateLimit } from "@/shared"

const YANDEX_GEO_SUGGEST_URL = "https://suggest-maps.yandex.ru/v1/suggest"
const YANDEX_API_KEY = process.env.YANDEX_API_KEY

export async function GET(req: NextRequest) {
  const identifier = getRateLimitIdentifier(req)

  const { success, reset } = await moderateRateLimit.limit(identifier)

  if (!success) {
    const retryAfter = Math.round((reset - Date.now()) / 1000)
    return NextResponse.json(
      { message: "Too many requests...", retryAfter },
      { status: 429, headers: { "Retry-After": retryAfter.toString() } }
    )
  }

  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("q")
  const limit = searchParams.get("limit")
  const type = searchParams.get("type")

  if (!query || query.length < 3) {
    return NextResponse.json({
      data: {
        results: [],
      },
    } satisfies GeoResponseDTO)
  }

  if (!YANDEX_API_KEY) {
    return NextResponse.json(
      { message: "Yandex API key is not configured" },
      { status: 500 }
    )
  }

  const apiReqUrl = new URL(YANDEX_GEO_SUGGEST_URL)
  apiReqUrl.searchParams.set("apikey", YANDEX_API_KEY)
  apiReqUrl.searchParams.set("text", query)
  apiReqUrl.searchParams.set("lang", "ru_RU")

  if (limit) {
    apiReqUrl.searchParams.set("results", limit)
  }

  if (type) {
    apiReqUrl.searchParams.set("type", type)
  }

  try {
    const res = await fetch(apiReqUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || "Failed to fetch Yandex Geosuggest")
    }

    const data = await res.json()
    return NextResponse.json({
      data,
    } satisfies GeoResponseDTO)
  } catch (error) {
    console.error("[YANDEX_GEO_SUGGEST] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
