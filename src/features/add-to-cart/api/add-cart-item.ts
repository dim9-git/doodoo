import { http } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"
import { CreateCartItemDTO } from "@/entities/cart-items"

export const addCartItem = async (payload: CreateCartItemDTO) => {
  return (
    await http.post<{
      data: CartResponseDTO
    }>("/api/cart", payload)
  ).data
}
