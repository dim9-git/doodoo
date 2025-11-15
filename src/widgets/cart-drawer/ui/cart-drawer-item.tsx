import { Trash2Icon } from "lucide-react"

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
  onItemChange?: (isCartLoading: boolean) => void
}

export default function CartDrawerItem({
  id,
  imageUrl,
  name,
  price, // total price from the server
  quantity, // quantity from the server
  details,
  className,
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
        "flex bg-white gap-6 p-4",
        className,
        isPending && "pointer-events-none opacity-50"
      )}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButtons onClick={onClickUpdate} value={count} />

          <button
            className="flex items-center gap-3"
            onClick={onClickRemove}
            disabled={isPending}
          >
            <CartItem.Price value={total} />
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
