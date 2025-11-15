import { X } from "lucide-react"

import { cn } from "@/shared"

import {
  CartItem,
  CartItemProps,
  useDebouncedCartItem,
} from "@/entities/cart-items"

import { useUpdateCart } from "@/features/update-cart"
import { useRemoveFromCart } from "@/features/remove-from-cart"

interface Props extends CartItemProps {
  className?: string
  onItemChange?: (isUpdating: boolean) => void
}

export default function CheckoutItem({
  id,
  className,
  imageUrl,
  name,
  details,
  quantity,
  price,
  onItemChange,
}: Props) {
  const { updateItemAsync, isPending } = useUpdateCart()
  const { removeItem } = useRemoveFromCart()

  const { count, total, onClickUpdate } = useDebouncedCartItem({
    id,
    price,
    quantity,
    updateItemAsync,
    onItemChange,
  })

  const onClickRemove = () => {
    removeItem({ id })
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "opacity-50 pointer-events-none": isPending,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <CartItem.Price value={total} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.CountButtons onClick={onClickUpdate} value={count} />
        <button type="button" onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  )
}
