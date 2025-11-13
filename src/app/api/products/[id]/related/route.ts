import { NextResponse } from "next/server"

import {
  getRelatedProducts,
  RelatedProductsResponseDTO,
} from "@/entities/products"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const nId = Number(id)

  if (isNaN(nId)) {
    return NextResponse.json({ message: "Invalid product ID" }, { status: 400 })
  }

  try {
    const relatedProducts = await getRelatedProducts(nId)

    return NextResponse.json({
      data: relatedProducts,
    } satisfies RelatedProductsResponseDTO)
  } catch (error) {
    console.error("[RELATED_PRODUCTS] error:", error)
    return NextResponse.json(
      { message: "[RELATED_PRODUCTS] Server error" },
      { status: 500 }
    )
  }
}
