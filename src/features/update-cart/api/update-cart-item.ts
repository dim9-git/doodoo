import { CartDTO } from "@/entities/cart"
import { http } from "@/shared/lib/http"

export const updateCartItem = async (id: number, quantity: number) => {
  return (await http.patch<{ data: CartDTO }>(`/api/cart/${id}`, { quantity }))
    .data
}
