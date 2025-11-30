import { NextResponse } from "next/server"
import { prisma } from "db/prisma"

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true,
      },
    })

    return NextResponse.json(stories)
  } catch (error) {
    console.error("[STORIES_GET] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
