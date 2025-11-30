import { notFound } from "next/navigation"

import { Container } from "@/shared"

import { RelatedProducts } from "@/entities/products"
import { findProductDetails } from "@/entities/products/server"

import { ProductSwitchForm } from "@/widgets/product-switch-form"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await findProductDetails(Number(id))

  if (!product) return notFound()

  return (
    <Container className="flex flex-col mb-10">
      <ProductSwitchForm product={product} />

      <RelatedProducts id={Number(id)} />
    </Container>
  )
}
