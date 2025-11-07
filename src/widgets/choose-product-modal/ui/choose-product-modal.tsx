"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/shared/ui/sh"
import { cn } from "@/shared/lib/utils"

import { ProductDetailsDTO } from "@/entities/products"

import { AddToCartItem, useAddToCart } from "@/features/add-to-cart"
import { PizzaBuilderForm } from "@/features/pizza-builder"

import ChooseSimpleProductForm from "../ui/choose-simple-product-form"

interface Props {
  product: ProductDetailsDTO
  className?: string
}

export default function ChooseProductModal({ product, className }: Props) {
  const router = useRouter()
  const { addItemAsync, isPending: isLoading } = useAddToCart()

  const firstItem = product.items[0]
  const isPizza = Boolean(firstItem.type)

  const onSubmit = async (payload: AddToCartItem) => {
    await addItemAsync(payload, {
      onSuccess: () => {
        toast.success("Товар добавлен в корзину", {
          
        })
      },
      onError: () => {
        toast.error("Ошибка при добавлении товара")
      },
    })

    router.back()
  }

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[500px] p-0 bg-white overflow-hidden",
          className
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Выберите продукт</DialogTitle>
          <DialogDescription>Выберите продукт</DialogDescription>
        </DialogHeader>

        {isPizza ? (
          <PizzaBuilderForm
            name={product.name}
            coverUrl={product.coverUrl ?? ""}
            items={product.items}
            ingredients={product.ingredients}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        ) : (
          <ChooseSimpleProductForm
            item={firstItem}
            name={product.name}
            coverUrl={product.coverUrl ?? ""}
            price={firstItem.price}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
