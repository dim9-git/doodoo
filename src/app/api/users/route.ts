import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

import { getRateLimitIdentifier, strictRateLimit } from "@/shared/lib/server"

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
  } catch (error) {
    console.error("[USERS_GET] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const identifier = getRateLimitIdentifier(req)

  const { success, reset } = await strictRateLimit.limit(identifier)

  if (!success) {
    const retryAfter = Math.round((reset - Date.now()) / 1000)
    return NextResponse.json(
      { message: "Слишком много попыток. Попробуйте позже.", retryAfter },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
        },
      }
    )
  }

  try {
    const body = await req.json()

    const { password, email, firstName } = body

    const user = await prisma.user.create({
      data: { password, email, firstName },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("[USERS_POST] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
