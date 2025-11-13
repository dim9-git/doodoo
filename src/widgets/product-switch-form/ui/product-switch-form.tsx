"use client"

import { toast } from "sonner"

import { ProductResponseDTO, AddOnProductForm } from "@/entities/products"

import { BuildPizzaForm } from "@/features/build-pizza"
import { AddToCartVariables, useAddToCart } from "@/features/add-to-cart"

export default function ProductSwitchForm({
  product,
  _onSubmit,
}: {
  product: ProductResponseDTO
  _onSubmit?: VoidFunction
}) {
  const { addItemAsync, isPending: isLoading } = useAddToCart()

  const firstItem = product.items[0]
  const isPizza = Boolean(firstItem.type)

  const onSubmit = async (payload: AddToCartVariables) => {
    await addItemAsync(payload, {
      onSuccess: () => {
        toast.success("Товар добавлен в корзину", {})
      },
      onError: () => {
        toast.error("Ошибка при добавлении товара")
      },
    })

    _onSubmit?.()
  }

  return isPizza ? (
    <BuildPizzaForm
      name={product.name}
      coverUrl={product.coverUrl ?? ""}
      items={product.items}
      ingredients={product.ingredients}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  ) : (
    <AddOnProductForm
      item={firstItem}
      name={product.name}
      coverUrl={product.coverUrl ?? ""}
      price={firstItem.price}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  )
}
