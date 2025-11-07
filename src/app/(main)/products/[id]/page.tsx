import { notFound } from "next/navigation"

import Container from "@/shared/ui/container"
import { Title } from "@/shared/ui/title"

import { getProduct } from "@/entities/products"
import ProductCover from "@/entities/products/ui/product-cover"

import { GroupPizzaParams } from "@/features/pizza-builder"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(Number(id))

  if (!product) return notFound()

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductCover coverUrl={product.coverUrl} size={40} />

        <div className="w-[490px] bg-[#f7f5f5] p-6">
          <Title text={product.name} size="md" className="font-extrabold" />

          <p className="text-gray-400">{product.description}</p>

          <GroupPizzaParams
            value="1"
            items={[
              {
                name: "100%",
                value: "1",
              },
              {
                name: "50%",
                value: "2",
              },
              {
                name: "25%",
                value: "3",
              },
            ]}
          />
        </div>
      </div>
    </Container>
  )
}
