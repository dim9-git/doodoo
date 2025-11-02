import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")

  if (!query) {
    return NextResponse.json(
      { error: "Запрос не может быть пустым" },
      { status: 400 }
    )
  }

  const products = await prisma.product.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
    take: 5,
  })

  return NextResponse.json(products)
}
