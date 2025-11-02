import { http } from "@/shared/lib/http"

import { CartDTO } from "@/entities/cart"
import { CreateCartItemRequestDTO } from "@/entities/cart-item"

export const createCartItem = async (payload: CreateCartItemRequestDTO) => {
  return (
    await http.post<{
      data: CartDTO
    }>("/api/cart", payload)
  ).data
}
