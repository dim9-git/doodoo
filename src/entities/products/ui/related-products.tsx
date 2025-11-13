"use client"

import { Skeleton, Title } from "@/shared"

import { useRelatedProducts } from "../model/use-related-products"
import ProductCard from "./product-card"

interface Props {
  id: number
}

export default function RelatedProducts({ id }: Props) {
  const { relatedProducts, isLoading, isError } = useRelatedProducts(id)

  if (isLoading)
    return <Skeleton className="w-full h-[260px] rounded-lg mt-10" />

  if (isError) return null

  return (
    <div className="mt-8">
      <Title text="Похожие товары" size="md" className="font-extrabold" />

      <div className="grid grid-cols-3 gap-12 mt-4">
        {relatedProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              price: product.items[0].price,
            }}
          />
        ))}
      </div>
    </div>
  )
}
