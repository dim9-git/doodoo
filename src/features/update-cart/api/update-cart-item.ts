import { Api } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"
import { UpdateCartItemDTO } from "@/entities/cart-items"

export const updateCartItem = async ({ id, quantity }: UpdateCartItemDTO) => {
  const res = await Api.patch<{ data: CartResponseDTO }>(`/api/cart/${id}`, {
    quantity,
  })

  return res.data.data
}
