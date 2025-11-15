import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button, Title, cn } from "@/shared"

import { ProductResponseDTO } from "../api/dto/response"

interface Props {
  className?: string
  product: ProductResponseDTO & {
    price: number
  }
}

export default function ProductCard({ className, product }: Props) {
  return (
    <div className={cn(className, "group flex flex-col max-h-full")}>
      <Link href={`/products/${product.id}`} scroll={false}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg max-h-[260px] w-full group-hover:shadow-md transition-all">
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

      <div className="mt-1 h-full flex flex-col">
        <Title text={product.name} className="font-bold" size="sm" />

        <p className="text-sm text-gray-400">
          {product.ingredients.map((ingredient) => ingredient.name).join(", ")}
        </p>

        <p className="mt-3 text-sm text-gray-500">{product.description}</p>

        <div className="flex justify-between items-center mt-auto gap-2">
          <span className="text-[20px]">
            от <b>{product.price} ₸</b>
          </span>

          <Button
            size="sm"
            variant="secondary"
            className="font-bold group/button"
            type="button"
          >
            <Plus className="size-5 mr-1 group-hover/button:rotate-90 transition-transform" />
            Добавить
          </Button>
        </div>
      </div>
    </div>
  )
}
