"use client"

import * as React from "react"
import { useIntersection } from "react-use"

import { Title, cn } from "@/shared"

import { useCategoryStore } from "@/entities/product-categories"
import { ProductCard, ProductResponseDTO } from "@/entities/products"

type Props = {
  classNames?: {
    container?: string
    list?: string
  }
  title: string
  categoryId: number
  products: ProductResponseDTO[]
}

export default function CatGroupProducts({
  classNames,
  title,
  categoryId,
  products,
}: Props) {
  const setCategoryId = useCategoryStore((state) => state.setActiveId)

  const intersectionRef = React.useRef<HTMLDivElement>(null)
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.5,
    }
  )

  React.useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setCategoryId(categoryId)
    }
  }, [intersection, categoryId, setCategoryId, title])

  return (
    <div className={classNames?.container} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold" />

      <div className={cn("grid grid-cols-3 gap-12", classNames?.list)}>
        {products.map((product, idx) => (
          <ProductCard
            key={`product-${idx}`}
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
