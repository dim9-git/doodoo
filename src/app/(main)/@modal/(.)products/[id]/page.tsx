import { notFound } from "next/navigation"

import { getProductDetails } from "@/entities/products"

import ChooseProductModal from "@/features/products/components/choose-product-modal"

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductDetails(Number(id))

  if (!product) return notFound()

  return <ChooseProductModal product={product} />
}
