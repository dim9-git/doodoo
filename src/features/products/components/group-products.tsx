"use client"

import * as React from "react"
import { useIntersection } from "react-use"

import ProductCard from "./product-card"
import { ProductNested } from "../server/db"

import { cn } from "@/shared/lib/utils"
import { Title } from "@/shared/components/title"
import { useCategoryStore } from "@/shared/store/category"

type Props = {
  classNames?: {
    container?: string
    list?: string
  }
  title: string
  categoryId: number
  products: ProductNested[]
}

export default function GroupProducts({
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
  }, [intersection, categoryId, setCategoryId])

  return (
    <div className={classNames?.container} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold" />

      <div className={cn("grid grid-cols-3 gap-12", classNames?.list)}>
        {products.map((product, idx) => (
          <ProductCard
            key={`product-${idx}`}
            payload={{
              ...product,
              price: product.items[0].price,
            }}
          />
        ))}
      </div>
    </div>
  )
}
