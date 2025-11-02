import { NextResponse } from "next/server"
import { prisma } from "db/prisma"

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()

  const { password, email, firstName } = body

  const user = await prisma.user.create({
    data: { password, email, firstName },
  })

  return NextResponse.json(user)
}
