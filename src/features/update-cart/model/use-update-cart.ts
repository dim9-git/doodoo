import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"
import { UpdateCartItemPayload } from "@/entities/cart-items"

import { updateCartItem } from "../api/update-cart-item"

export type UpdateCartVariables = UpdateCartItemPayload

export const useUpdateCart = () => {
  const qc = useQueryClient()

  const {
    mutate: updateItem,
    mutateAsync: updateItemAsync,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ id, quantity }: UpdateCartVariables) => {
      return mapCartToState(await updateCartItem({ id, quantity }))
    },
    onMutate: async ({ id, quantity }) => {
      await qc.cancelQueries({ queryKey: CART_KEY })

      const prev = qc.getQueryData<CartState>(CART_KEY)

      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        const itemToUpdate = old.items.find((item) => item.id === id)
        if (!itemToUpdate) return old

        const unitPrice =
          itemToUpdate.quantity > 0
            ? itemToUpdate.price / itemToUpdate.quantity
            : 0
        const newItemTotal = unitPrice * quantity

        return {
          items: old.items.map((item) =>
            item.id === id ? { ...item, quantity, price: newItemTotal } : item
          ),
          total: old.total - itemToUpdate.price + newItemTotal,
        }
      })

      return { prev, updatedId: id }
    },
    onError: (_error, _variables, context) => {
      if (context?.prev) qc.setQueryData(CART_KEY, context.prev)
    },
    onSuccess: (data, _variables, context) => {
      if (!context?.updatedId) {
        qc.setQueryData(CART_KEY, data)
        return
      }

      qc.setQueryData<CartState>(CART_KEY, (current) => {
        if (!current) return data

        const { updatedId } = context

        const updatedItem = data.items.find((item) => item.id === updatedId)
        if (!updatedItem) return data

        const existingItem = current.items.find((item) => item.id === updatedId)
        const items = current.items.map((item) =>
          item.id === updatedId ? updatedItem : item
        )

        const total = existingItem
          ? current.total - existingItem.price + updatedItem.price
          : current.total

        return { items, total }
      })
    },
  })

  return {
    updateItem,
    updateItemAsync,
    isPending,
    isSuccess,
    isError,
  }
}
