"use client"

import { ArrowRight, ShoppingCart } from "lucide-react"

import { Button } from "@/shared"

import { CartDTO, useCart } from "@/entities/cart"

import { CartDrawer } from "@/widgets/cart-drawer"

interface Props {
  total?: number
  itemsCount?: number
  initialData: CartDTO | null
}

export default function HeaderCartButton({ initialData }: Props) {
  // seeds initial cart data for useQuery cache
  const { cart } = useCart({ initialData })
  const totalPrice = cart?.total ?? 0
  const count = cart?.items.length ?? 0

  return (
    <CartDrawer>
      <Button className="group relative">
        <b>{totalPrice.toLocaleString("ru-RU")} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
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
