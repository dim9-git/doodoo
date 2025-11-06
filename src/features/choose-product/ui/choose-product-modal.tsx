"use client"

import { useRouter } from "next/navigation"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/shared/ui/sh"
import { cn } from "@/shared/lib/utils"

import { ProductDetailsDTO } from "@/entities/products"

import ChoosePizzaForm from "./choose-pizza-form"
import ChooseSimpleProductForm from "./choose-simple-product-form"

interface Props {
  product: ProductDetailsDTO
  className?: string
}

export default function ChooseProductModal({ product, className }: Props) {
  const router = useRouter()

  if (!product) return null

  const isPizza = Boolean(product.items[0].type)

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[500px] p-0 bg-white overflow-hidden",
          className
        )}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Выберите продукт</DialogTitle>
          <DialogDescription>Выберите продукт</DialogDescription>
        </VisuallyHidden.Root>

        {isPizza ? (
          <ChoosePizzaForm
            product={product}
            name={product.name}
            coverUrl={product.coverUrl ?? ""}
            items={product.items}
            ingredients={product.ingredients}
            onSubmit={() => {}}
            isLoading={false}
          />
        ) : (
          <ChooseSimpleProductForm
            price={0}
            name={product.name}
            coverUrl={product.coverUrl ?? ""}
            onSubmit={() => {}}
            isLoading={false}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
