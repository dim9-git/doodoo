"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  Button,
  cn,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared"

import { getCartItemInfoText } from "@/entities/cart-items"
import { useCart } from "@/entities/cart"

import CartDrawerItem from "./cart-drawer-item"
import { getCartLengthLabel } from "../lib/get-cart-length-label"

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function CartDrawer({ children }: Props) {
  const { cart } = useCart()
  const [isCartPending, setIsCartPending] = useState<boolean>(false)

  const onItemChange = (isPending: boolean) => {
    setIsCartPending(isPending)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            В корзине{" "}
            <span className="font-bold">
              {cart?.items.length} {getCartLengthLabel(cart?.items.length)}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="-mx-6 overflow-auto flex-1">
          <div className="mb-2">
            {cart?.items.map((item, idx) => (
              <CartDrawerItem
                key={`${idx}-${item.id}`}
                id={item.id}
                imageUrl={item.coverImageUrl ?? ""}
                details={getCartItemInfoText(
                  item.pizzaType,
                  item.pizzaSize,
                  item.ingredients
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                className="mb-6"
                onItemChange={onItemChange}
              />
            ))}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого:
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span
                className={cn(
                  "font-bold text-lg flex items-center gap-1",
                  isCartPending && "pointer-events-none opacity-50"
                )}
              >
                {cart?.total.toLocaleString("ru-RU")} ₽
              </span>
            </div>

            <Link href={"/cart"}>
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
