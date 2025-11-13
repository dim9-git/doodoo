import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"
import { CartStateItem, CreateCartItemPayload } from "@/entities/cart-items"

import { addCartItem } from "../api/add-cart-item"

export type AddToCartVariables = {
  payload: CreateCartItemPayload
  optItem: CartStateItem
}

export function useAddToCart() {
  const qc = useQueryClient()

  const {
    mutate: addItem,
    mutateAsync: addItemAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ payload }: AddToCartVariables) => {
      console.log("[MUTATE ADD] payload:", payload)
      const responseDTO = await addCartItem(payload)
      return mapCartToState(responseDTO)
    },
    onMutate: async ({ optItem }) => {
      //  Optimistic updates here
      await qc.cancelQueries({ queryKey: CART_KEY })

      const prev = qc.getQueryData<CartState>(CART_KEY)

      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        // item.price is totalPrice
        const newItemTotal = optItem.price * optItem.quantity

        return {
          items: [optItem, ...old.items],
          total: old.total + newItemTotal,
        }
      })

      return { prev, optItem }
    },
    onError: (_err, _variables, context) => {
      if (context?.prev) qc.setQueryData<CartState>(CART_KEY, context.prev)
    },
    onSuccess: (data, _variables, context) => {
      // replace optimistic with server truth
      if (!context?.optItem) {
        qc.setQueryData<CartState>(CART_KEY, data)
        return
      }

      qc.setQueryData<CartState>(CART_KEY, (current) => {
        if (!current) return data

        const { optItem } = context

        const newItem = data.items.find((item) => item.id === optItem.id)
        if (!newItem) return data

        return current
      })
    },
  })

  return { addItem, addItemAsync, isPending, isError, isSuccess }
}
