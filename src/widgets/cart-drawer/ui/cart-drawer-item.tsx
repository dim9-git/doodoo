import { Trash2Icon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

import { CartItem, CartItemProps } from "@/entities/cart-items"

import { useRemoveFromCart } from "@/features/remove-from-cart"

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
  const { removeItem } = useRemoveFromCart()

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

          <button
            className="flex items-center gap-3"
            onClick={() => removeItem(id)}
            disabled={disabled}
          >
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-red-500"
              size={16}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
