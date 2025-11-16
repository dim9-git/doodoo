"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  Button,
  cn,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Title,
} from "@/shared"

import { getCartItemInfo } from "@/entities/cart-items"
import { useCart } from "@/entities/cart"

import CartDrawerItem from "./cart-drawer-item"
import { getCartLengthLabel } from "../lib/get-cart-length-label"

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function CartDrawer({ children }: Props) {
  const { cart, setIsUpdating, isUpdating, isAdding } = useCart()

  const totalAmount = cart?.total ? cart.total : 0

  const isDisabled = isUpdating || isAdding

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}
        >
          {totalAmount > 0 ? (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className="font-bold">
                  {cart?.items.length} {getCartLengthLabel(cart?.items.length)}
                </span>
              </SheetTitle>
            </SheetHeader>
          ) : (
            <SheetHeader className="sr-only">
              <SheetTitle>Корзина пустая</SheetTitle>
            </SheetHeader>
          )}

          {!(totalAmount > 0) ? (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button asChild className="w-56 h-12 text-base" size="lg">
                  <span>
                    <ArrowLeft className="w-5 mr-2" />
                    Вернуться назад
                  </span>
                </Button>
              </SheetClose>
            </div>
          ) : null}

          {/* Items */}
          {totalAmount > 0 ? (
            <>
              <div className="-mx-6 overflow-auto flex-1">
                <div className="mb-2">
                  {cart?.items.map((item, idx) => (
                    <CartDrawerItem
                      key={`cdwi_${idx}_${item.id}`}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      imageUrl={item.coverImageUrl}
                      details={getCartItemInfo(
                        item.pizzaType,
                        item.pizzaSize,
                        item.ingredients
                      )}
                      className="mb-6"
                      onItemChange={setIsUpdating}
                      isAdding={isAdding}
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
                        isUpdating && "pointer-events-none opacity-50 shimmer"
                      )}
                    >
                      {totalAmount.toLocaleString("ru-RU")} ₸
                    </span>
                  </div>

                  <Link href={"/checkout"}>
                    <Button
                      type="submit"
                      disabled={isDisabled}
                      className="w-full h-12 text-base disabled:bg-primary/80"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}
