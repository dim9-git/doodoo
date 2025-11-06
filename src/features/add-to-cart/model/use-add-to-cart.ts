import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CART_KEY, CartState, mapCartToState } from "@/entities/cart"
import { CartStateItem, CreateCartItemRequestDTO } from "@/entities/cart-items"

import { addCartItem } from "../api/add-cart-item"

export type AddToCartItem = CreateCartItemRequestDTO & {
  ui: CartStateItem
}

export function useAddToCart() {
  const qc = useQueryClient()

  const {
    mutate: addItem,
    mutateAsync: addItemAsync,
    isPending: isAddPending,
    isError: isAddError,
    isSuccess: isAddSuccess,
  } = useMutation({
    mutationFn: async (newItem: AddToCartItem) => {
      console.log("[MUTATE ADD] payload:", newItem)
      const dto = await addCartItem(newItem)
      return mapCartToState(dto)
    },
    onMutate: async (newItem) => {
      //  Optimistic updates here
      await qc.cancelQueries({ queryKey: CART_KEY })

      const prev = qc.getQueryData<CartState>(CART_KEY)

      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        // item.price is totalPrice
        const newItemTotal = newItem.ui.price * newItem.ui.quantity

        return {
          items: [
            {
              ...newItem.ui,
              quantity: newItem.ui.quantity,
            },
            ...old.items,
          ],
          total: old.total + newItemTotal,
        }
      })

      return { prev }
    },
    onError: (_err, _newItem, context) => {
      if (context?.prev) qc.setQueryData<CartState>(CART_KEY, context.prev)

      toast.error("Ошибка при добавлении товара")
    },
    onSuccess: (mappedCart) => {
      // replace optimistic with server truth
      qc.setQueryData<CartState>(CART_KEY, mappedCart)
      toast.success("Товар добавлен в корзину")
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: CART_KEY })
    },
  })

  return { addItem, addItemAsync, isAddPending, isAddError, isAddSuccess }
}
