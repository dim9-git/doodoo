import { Cart, CartItem } from "@prisma/client"

interface ReturnProps {
  items: CartItem[]
  totalAmount: number
}

export const getCartFull = (data: Cart) => {
  const items = data.items || []
}
