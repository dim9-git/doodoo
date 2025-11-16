"use client"

import { toast } from "sonner"

import { ProductResponseDTO, AddOnProductForm } from "@/entities/products"
import { useCart } from "@/entities/cart"

import { BuildPizzaForm } from "@/features/build-pizza"
import { AddToCartVariables, useAddToCart } from "@/features/add-to-cart"

export default function ProductSwitchForm({
  product,
  onFormSubmit,
}: {
  product: ProductResponseDTO
  onFormSubmit?: VoidFunction
}) {
  const { setIsAdding } = useCart()
  const { addItemAsync, isPending } = useAddToCart()

  const firstItem = product.items[0]
  const isPizza = Boolean(firstItem.type)

  const onSubmit = async (payload: AddToCartVariables) => {
    setIsAdding(true)
    await addItemAsync(payload, {
      onSuccess: () => {
        toast.success(`${product.name} добавлен в корзину`)
      },
      onError: () => {
        toast.error("Ошибка при добавлении товара")
      },
    })
    setIsAdding(false)

    onFormSubmit?.()
  }

  return isPizza ? (
    <BuildPizzaForm
      name={product.name}
      coverUrl={product.coverUrl ?? ""}
      items={product.items}
      ingredients={product.ingredients}
      onSubmit={onSubmit}
      isAdding={isPending}
    />
  ) : (
    <AddOnProductForm
      item={firstItem}
      name={product.name}
      coverUrl={product.coverUrl ?? ""}
      price={firstItem.price}
      onSubmit={onSubmit}
      isAdding={isPending}
    />
  )
}
