import { notFound } from "next/navigation"

import { Container } from "@/shared"

import { getProductDetails, RelatedProducts } from "@/entities/products"

import { ProductSwitchForm } from "@/widgets/product-switch-form"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await getProductDetails(Number(id))

  if (!product) return notFound()

  return (
    <Container className="flex flex-col mb-10">
      <ProductSwitchForm product={product} />

      <RelatedProducts id={Number(id)} />
    </Container>
  )
}
