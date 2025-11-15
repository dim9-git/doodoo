import { cn } from "@/shared"

import { CartItemCountIconButton } from "./cart-item-count-icon-button"

export interface CountButtonProps {
  value?: number
  size?: "sm" | "lg"
  onClick: (type: "plus" | "minus") => void
  className?: string
}

export function CartItemCountButton({
  className,
  onClick,
  value = 1,
  size = "sm",
}: CountButtonProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <CartItemCountIconButton
        onClick={() => onClick("minus")}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CartItemCountIconButton
        onClick={() => onClick("plus")}
        size={size}
        type="plus"
      />
    </div>
  )
}
