import { NextResponse } from "next/server"

import {
  getRelatedProducts,
  RelatedProductsResponseDTO,
} from "@/entities/products"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params
  const id = Number(idString)

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Неверный ID продукта" },
      { status: 400 }
    )
  }

  try {
    const relatedProducts = await getRelatedProducts(id)

    return NextResponse.json({
      data: relatedProducts,
    } satisfies RelatedProductsResponseDTO)
  } catch (error) {
    console.error("[PRODUCTS_${ID}_RELATED_GET] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
