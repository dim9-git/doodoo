import { useQuery } from "@tanstack/react-query"

import { CartResponseDTO, getCart, mapCartToState } from "@/entities/cart"

import { useCartStore } from "./use-cart-store"

export const CART_KEY = ["cart"] as const

export function useCart(opts?: { initialData?: CartResponseDTO | null }) {
  const {
    data: cart,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: CART_KEY,
    queryFn: async () => {
      return mapCartToState(await getCart())
    },
    initialData: opts?.initialData
      ? mapCartToState(opts.initialData)
      : undefined,
  })

  const { isUpdating, setIsUpdating } = useCartStore()

  return {
    cart,
    isLoading,
    isError,
    isSuccess,
    isUpdating,
    setIsUpdating,
  }
}
