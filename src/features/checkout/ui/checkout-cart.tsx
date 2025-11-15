import { WhiteBlock } from "@/shared"

import { CartStateItem, getCartItemInfo } from "@/entities/cart-items"

import CheckoutItem from "./checkout-item"
import CheckoutItemSkeleton from "./checkout-item-skeleton"

interface Props {
  items: CartStateItem[]
  isLoading?: boolean
  className?: string
  setIsUpdating: (isUpdating: boolean) => void
}

export default function CheckoutCart({
  className,
  items,
  isLoading,
  setIsUpdating,
}: Props) {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
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
                onItemChange={setIsUpdating}
              />
            ))}
      </div>
    </WhiteBlock>
  )
}
