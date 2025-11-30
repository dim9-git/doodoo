import { NextResponse } from "next/server"
import { prisma } from "db/prisma"

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany()

    return NextResponse.json(ingredients)
  } catch (error) {
    console.error("[INGREDIENTS_GET] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
