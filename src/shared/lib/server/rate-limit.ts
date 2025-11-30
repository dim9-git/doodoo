import { NextRequest } from "next/server"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL!
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!

export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
})

export const strictRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "15m"),
  analytics: true,
})

export const moderateRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
})

export const getRateLimitIdentifier = (req: NextRequest, token?: string) => {
  // Prefer token-based identification for authenticated actions
  if (token) {
    return `token:${token}` // e.g., "token:abc-123-xyz"
  }

  const forwarded = req.headers.get("x-forwarded-for")
  const ip = forwarded
    ? forwarded.split(",")[0] // Get first IP (original client)
    : req.headers.get("x-real-ip") || "unknown" // Fallback
  return `ip:${ip}`
}
