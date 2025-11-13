import { http } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"
import { UpdateCartItemDTO } from "@/entities/cart-items"

export const updateCartItem = async ({ id, quantity }: UpdateCartItemDTO) => {
  return (
    await http.patch<{ data: CartResponseDTO }>(`/api/cart/${id}`, { quantity })
  ).data
}
