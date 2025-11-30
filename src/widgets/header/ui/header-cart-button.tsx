"use client"

import { ArrowRight, ShoppingCart } from "lucide-react"

import { Button } from "@/shared"

import { CartResponseDTO, useCart } from "@/entities/cart"

import { CartDrawer } from "@/widgets/cart-drawer"

interface Props {
  total?: number
  itemsCount?: number
  initialCart: CartResponseDTO | null
}

export default function HeaderCartButton({ initialCart }: Props) {
  // seeds initial cart data for useQuery cache
  const { cart } = useCart({ initialData: initialCart })

  // Use initialCart if cart hasn't loaded yet (prevents hydration mismatch)
  const totalPrice = cart?.total ?? initialCart?.total ?? 0
  const count = cart?.items.length ?? initialCart?.items?.length ?? 0

  return (
    <CartDrawer>
      <Button className="group relative">
        <b>{totalPrice.toLocaleString("ru-RU")} </b>
        <span className="h-full w-px bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{count}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  )
}
