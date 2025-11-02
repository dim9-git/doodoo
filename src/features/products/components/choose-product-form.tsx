import React from "react"

import ProductCover from "./product-cover"

import { cn } from "@/shared/lib/utils"
import { Title } from "@/shared/components/title"
import { Button } from "@/shared/components/ui"

interface Props {
  className?: string
  name: string
  coverUrl: string
  price: number
  isLoading?: boolean
  onSubmit?: () => void
}

export default function ChooseProductForm({
  className,
  name,
  coverUrl,
  price,
  isLoading,
  onSubmit,
}: Props) {
  return (
    <div className={cn("flex flex-1", className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <ProductCover coverUrl={coverUrl} size={20} withBorder={false} />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold" />

        <Button
          isLoading={isLoading}
          onClick={() => onSubmit?.()}
          className="w-full h-[55px] mt-10 px-10 rounded-[18px] text-base"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
