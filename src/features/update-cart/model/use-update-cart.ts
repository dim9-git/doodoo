import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"

import { updateCartItem } from "../api/update-cart-item"
// import logger from "@/shared/lib/logger"

type Vars = { id: number; quantity: number }

export const useUpdateCart = () => {
  const qc = useQueryClient()

  const {
    mutate: updateItem,
    mutateAsync: updateItemAsync,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ id, quantity }: Vars) => {
      return mapCartToState(await updateCartItem(id, quantity))
    },
    onMutate: async ({ id, quantity }) => {
      await qc.cancelQueries({ queryKey: CART_KEY })

      const prev = qc.getQueryData<CartState>(CART_KEY)

      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        const itemToUpdate = old.items.find((item) => item.id === id)
        if (!itemToUpdate) return old

        // logger.info("params:", { id, quantity })
        // logger.info("ITEM TO UPDATE:", itemToUpdate)

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
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(CART_KEY, ctx.prev)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: CART_KEY })
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
