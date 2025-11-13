import { Trash2Icon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

import { CartItem, CartItemProps } from "@/entities/cart-items"

import { useUpdateCart } from "@/features/update-cart"
import { useRemoveFromCart } from "@/features/remove-from-cart"

import { useDebouncedItem } from "../model/use-debounced-item"

interface Props extends CartItemProps {
  className?: string
  onItemChange?: (isPending: boolean) => void
}

export default function CartDrawerItem({
  className,
  id,
  imageUrl,
  name,
  price, // total price from the server
  quantity, // quantity from the server
  details,
  disabled,
  onItemChange,
}: Props) {
  const { updateItemAsync, isPending } = useUpdateCart()
  const { removeItem } = useRemoveFromCart()

  const { count, total, onUpdate } = useDebouncedItem({
    id,
    price,
    quantity,
    updateItem: updateItemAsync,
    onItemChange,
  })

  const onRemove = () => {
    removeItem({ id })
  }

  return (
    <div
      className={cn(
        "flex bg-white gap-6 p-4",
        className,
        isPending && "pointer-events-none opacity-50"
      )}
      id={id.toString()}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButtons onClick={onUpdate} value={count} />

          <button
            className="flex items-center gap-3"
            onClick={onRemove}
            disabled={disabled}
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
