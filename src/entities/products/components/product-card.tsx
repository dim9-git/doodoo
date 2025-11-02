import Image from "next/image"
import Link from "next/link"

import { Plus } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Title } from "@/shared/components/title"
import { Button } from "@/shared/components/ui/button"

import { ProductDetailsDTO } from "../api/dto/product.dto"

interface Props {
  className?: string
  product: ProductDetailsDTO & {
    price: number
  }
}

export default function ProductCard({ className, product }: Props) {
  return (
    <div className={cn(className)}>
      <Link href={`/products/${product.id}`} scroll={false}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg max-h-[260px] w-full">
          {product.coverUrl ? (
            <Image
              src={product.coverUrl}
              alt={product.name}
              width={215}
              height={215}
              className="w-[215px] h-[215px]"
            />
          ) : (
            <div className="w-[215px] h-[215px] bg-gray-200 rounded-lg" />
          )}
        </div>
      </Link>

      <div className="mt-1">
        <Title text={product.name} className="font-bold" size="sm" />

        <p className="mt-3 text-sm text-gray-500">{product.description}</p>

        <div className="flex justify-between items-center mt-4 gap-2">
          <span className="text-[20px]">
            от <b>{product.price} ₽</b>
          </span>

          <Button
            size="sm"
            variant="secondary"
            className="font-bold"
            type="button"
          >
            <Plus className="size-5 mr-1" />
            Добавить
          </Button>
        </div>
      </div>
    </div>
  )
}
