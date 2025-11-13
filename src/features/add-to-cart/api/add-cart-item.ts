import { http } from "@/shared/lib/http"

import { CartResponseDTO } from "@/entities/cart"
import { CreateCartItemDTO } from "@/entities/cart-items"

export const addCartItem = async (payload: CreateCartItemDTO) => {
  return (
    await http.post<{
      data: CartResponseDTO
    }>("/api/cart", payload)
  ).data
}
