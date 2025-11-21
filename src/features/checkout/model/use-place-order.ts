import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CART_KEY } from "@/entities/cart"

import { createOrder } from "../api/actions/create-order"
import { CheckoutFormValues } from "./schema"

export function usePlaceOrder() {
  const qc = useQueryClient()

  const {
    mutate: placeOrder,
    mutateAsync: placeOrderAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: CheckoutFormValues) => {
      return await createOrder(data)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [CART_KEY] })
    },
    onError: (error) => {
      console.error("[USE_PLACE_ORDER] error:", error)
    },
  })

  return {
    placeOrder,
    placeOrderAsync,
    isPending,
    isError,
    isSuccess,
  }
}
