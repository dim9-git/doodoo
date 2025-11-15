import { NextResponse } from "next/server"
import { prisma } from "db/prisma"

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

export async function POST(request: Request) {
  try {
    const body = await request.json()

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
