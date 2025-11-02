import React from "react"

import { notFound } from "next/navigation"

import ChooseProductModal from "@/features/products/components/choose-product-modal"
import { getProductNested } from "@/features/products/server/db"

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductNested(Number(id))

  if (!product) return notFound()

  return <ChooseProductModal product={product} />
}
