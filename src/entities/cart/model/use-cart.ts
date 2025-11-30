import { useQuery } from "@tanstack/react-query"

import { CartResponseDTO, mapCartToState, getCart } from "@/entities/cart"

import { useCartStore } from "./use-cart-store"

export const CART_KEY = ["cart"] as const

export function useCart(params?: { initialData?: CartResponseDTO | null }) {
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
    initialData: params?.initialData
      ? mapCartToState(params.initialData)
      : undefined,
    // Prevent refetch on mount when we have initialData (SSR)
    refetchOnMount: !params?.initialData,
    // Prevent refetch on window focus when we have initialData
    refetchOnWindowFocus: !params?.initialData,
  })

  const { isUpdating, setIsUpdating, isAdding, setIsAdding } = useCartStore()

  return {
    cart,
    isLoading,
    isError,
    isSuccess,
    isUpdating,
    setIsUpdating,
    isAdding,
    setIsAdding,
  }
}
