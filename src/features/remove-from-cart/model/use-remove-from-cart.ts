import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"
import { RemoveCartItemDTO } from "@/entities/cart-items"

import { removeCartItem } from "../api/remove-cart-item"

type RemoveFromCartVariables = RemoveCartItemDTO

export function useRemoveFromCart() {
  const qc = useQueryClient()

  const {
    mutate: removeItem,
    mutateAsync: removeItemAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ id }: RemoveFromCartVariables) => {
      return mapCartToState(await removeCartItem(id))
    },
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches
      await qc.cancelQueries({ queryKey: CART_KEY })

      // Snapshot the previous value
      const prev = qc.getQueryData<CartState>(CART_KEY)

      // Optimistically update to the new value
      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        const itemToDelete = old.items.find((item) => item.id === id)
        if (!itemToDelete) return old

        const itemToDeleteTotal = itemToDelete.price

        return {
          items: old.items.filter((item) => item.id !== id),
          total: old.total - itemToDeleteTotal,
        }
      })

      return { prev, removedId: id }
    },
    onError: (_error, _variables, context) => {
      if (context?.prev) qc.setQueryData<CartState>(CART_KEY, context.prev)
    },
    onSuccess: (data, _variables, context) => {
      if (!context?.removedId) {
        qc.setQueryData(CART_KEY, data)
        return
      }

      qc.setQueryData<CartState>(CART_KEY, (current) => {
        if (!current) return data

        const { removedId } = context

        const itemToRemoveFound = current.items.some(
          (item) => item.id === removedId
        )

        if (!itemToRemoveFound) {
          return data
        }

        return current
      })
    },
  })

  return { removeItem, removeItemAsync, isPending, isSuccess, isError }
}
