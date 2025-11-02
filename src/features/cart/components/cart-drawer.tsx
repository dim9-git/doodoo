"use client"

import React from "react"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui"

import CartDrawerItem from "./cart-drawer-item"
import { getCartItemInfoText } from "../utils/get-cart-item-info-text"
import useCart from "../hooks/use-cart"

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function CartDrawer({ children }: Props) {
  const { cart, isLoading, isError } = useCart()
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    console.log(id, quantity, type)
  }

  console.log("CART DRAWER CART:", cart, isLoading, isError)

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="-mx-6 overflow-auto flex-1">
          <div className="mb-2">
            {cart?.items
              ? cart.items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
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
                  />
                ))
              : null}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого:
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">1 560 ₽</span>
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
