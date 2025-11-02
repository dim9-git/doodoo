import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { CreateCartItemRequestDTO } from "@/entities/cart-item"
import { createCartItem } from "@/entities/cart-item/api/create-cart-item"
import { CartState, CartStateItem, mapCartToState } from "@/entities/cart"
import { getCart } from "@/entities/cart/api/get-cart"

const CART_KEY = ["cart"] as const

export type AddToCartItem = CreateCartItemRequestDTO & {
  ui: CartStateItem
}

export default function useCart() {
  const qc = new QueryClient()

  const {
    data: cart,
    isError,
    isLoading,
  } = useQuery({
    queryKey: CART_KEY,
    queryFn: async () => {
      const dto = await getCart()
      console.log("GOT CART DTO:", dto)
      return mapCartToState(dto)
    },
  })

  const addMut = useMutation({
    mutationFn: async (newItem: AddToCartItem) => {
      const dto = await createCartItem(newItem)
      return mapCartToState(dto)
    },
    onMutate: async (newItem) => {
      //  Optimistic updates here
      await qc.cancelQueries({ queryKey: CART_KEY })

      const prev = qc.getQueryData<CartState>(CART_KEY)

      qc.setQueryData<CartState>(CART_KEY, (old) => {
        if (!old) return old

        return {
          items: [
            ...old.items,
            {
              ...newItem.ui,
              quantity: 1,
            },
          ],
          total: old.total + newItem.ui.price,
        }
      })

      return { prev }
    },
    onError: (_err, _newItem, context) => {
      if (context?.prev) qc.setQueryData<CartState>(CART_KEY, context.prev)
    },
    onSuccess: (mappedCart) => {
      // replace optimistic with server truth
      qc.setQueryData<CartState>(CART_KEY, mappedCart)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: CART_KEY })
    },
  })

  return {
    cart,
    isLoading,
    isError,
    addItem: addMut.mutate,
    addItemAsync: addMut.mutateAsync,
    adding: addMut.isPending,
  }
}
