import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"
import { calcCartStateItemTotalPrice } from "@/entities/cart-items"

import { removeCartItem } from "../api/remove-cart-item"

export function useRemoveFromCart() {
  const qc = useQueryClient()

  const {
    mutate: removeItem,
    mutateAsync: removeItemAsync,
    isPending: isRemovePending,
    isError: isRemoveError,
  } = useMutation({
    mutationFn: async (id: number) => {
      return mapCartToState(await removeCartItem(id))
    },
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await qc.cancelQueries({ queryKey: CART_KEY })

      // Snapshot the previous value
      const prev = qc.getQueryData<CartState>(CART_KEY)

      // Optimistically update to the new value
      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        const itemToDelete = old.items.find((item) => item.id === id)
        if (!itemToDelete) return old

        const itemToDeleteTotal = itemToDelete.price * itemToDelete.quantity

        return {
          items: old.items.filter((item) => item.id !== id),
          total: old.total - itemToDeleteTotal,
        }
      })

      return { prev, removedId: id }
    },
    onError: (_err, _id, context) => {
      if (context?.prev) qc.setQueryData<CartState>(CART_KEY, context.prev)
    },
    onSuccess: (mappedCart, _id, context) => {
      const current = qc.getQueryData<CartState>(CART_KEY)
      if (current && context?.removedId) {
        const itemStillExists = current.items.some(
          (item) => item.id === context.removedId
        )
        if (!itemStillExists) {
          // replace optimistic with server truth
          qc.setQueryData<CartState>(CART_KEY, mappedCart)
        }
      }
    },
  })

  return { removeItem, removeItemAsync, isRemovePending, isRemoveError }
}
