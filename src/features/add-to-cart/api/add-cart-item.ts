import { http } from "@/shared/lib/http"

import { CartDTO } from "@/entities/cart"
import { CreateCartItemPayload } from "@/entities/cart-items"

export const addCartItem = async (payload: CreateCartItemPayload) => {
  return (
    await http.post<{
      data: CartDTO
    }>("/api/cart", payload)
  ).data
}
