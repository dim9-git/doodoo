import { useQuery } from "@tanstack/react-query"
import { CartDTO, getCart, mapCartToState } from "@/entities/cart"

export const CART_KEY = ["cart"] as const

export function useCart(opts?: { initialData?: CartDTO | null }) {
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

  return {
    cart,
    isLoading,
    isError,
    isSuccess,
  }
}
