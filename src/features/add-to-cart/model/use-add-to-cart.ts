import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"
import { CartStateItem, CreateCartItemDTO } from "@/entities/cart-items"

import { addCartItem } from "../api/add-cart-item"

export type AddToCartVariables = {
  payload: CreateCartItemDTO
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
        const newItemPrice = optItem.price * optItem.quantity

        const prevTotalAmount = old.total ? old.total : 0

        return {
          items: [optItem, ...old.items],
          total: prevTotalAmount + newItemPrice,
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

        // Find optimistic item index
        const oIdx = current.items.findIndex((item) => item.id === optItem.id)

        if (oIdx === -1) {
          // Optimistic item not found, use full server data
          return data
        }

        // Find the new real item in server response
        // It's the item that doesn't exist in current cart (excluding optimistic item)
        const currentOtherItemIds = current.items
          .filter((item) => item.id !== optItem.id)
          .map((item) => item.id)

        const realItem = data.items.find(
          (item) => !currentOtherItemIds.includes(item.id)
        )

        if (!realItem) {
          // Couldn't find new item, use server data as fallback
          return data
        }

        const updatedItems = [...current.items]
        updatedItems[oIdx] = realItem

        return {
          items: updatedItems,
          total: data.total,
        }
      })
    },
  })

  return { addItem, addItemAsync, isPending, isError, isSuccess }
}
