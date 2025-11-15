import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")

  if (!query) {
    return NextResponse.json(
      { message: "Запрос не может быть пустым" },
      { status: 400 }
    )
  }

  try {
    const products = await prisma.product.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      take: 5,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[PRODUCTS_SEARCH_GET] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
