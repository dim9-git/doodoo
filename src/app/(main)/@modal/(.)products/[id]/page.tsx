import { notFound } from "next/navigation"

import { findProductDetails } from "@/entities/products/server"

import { ChooseProductModal } from "@/widgets/choose-product-modal"

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await findProductDetails(Number(id))

  if (!product) return notFound()

  return <ChooseProductModal product={product} />
}
