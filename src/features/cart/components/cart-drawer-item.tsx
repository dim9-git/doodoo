import React from "react"
import { cn } from "@/shared/lib/utils"

import * as CartItem from "./cart-item"
import { CartItemProps } from "./cart-item/cart-item.types"
import { Trash2Icon } from "lucide-react"

interface Props extends CartItemProps {
  className?: string
}

export default function CartDrawerItem({
  className,
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
}: Props) {
  return (
    <div
      className={cn("flex bg-white gap-6 p-4", className)}
      id={id.toString()}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButtons
            onClick={(type) => console.log(type)}
            value={quantity}
          />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-red-500"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
