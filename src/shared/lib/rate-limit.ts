import { NextRequest } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

let redisInstance: Redis | null = null

const getRedis = () => {
  if (!redisInstance) {
    const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL
    const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
      throw new Error(
        "UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not defined"
      )
    }
    redisInstance = new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
    })
  }
  return redisInstance
}

let strictRateLimitInstance: Ratelimit | null = null

const getStrictRateLimit = () => {
  if (!strictRateLimitInstance) {
    strictRateLimitInstance = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(5, "15m"),
      analytics: true,
    })
  }
  return strictRateLimitInstance
}

export const strictRateLimit = new Proxy({} as Ratelimit, {
  get(_target, prop) {
    return getStrictRateLimit()[prop as keyof Ratelimit]
  },
})

let moderateRateLimitInstance: Ratelimit | null = null

const getModerateRateLimit = () => {
  if (!moderateRateLimitInstance) {
    moderateRateLimitInstance = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      analytics: true,
    })
  }
  return moderateRateLimitInstance
}

export const moderateRateLimit = new Proxy({} as Ratelimit, {
  get(_target, prop) {
    return getModerateRateLimit()[prop as keyof Ratelimit]
  },
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
