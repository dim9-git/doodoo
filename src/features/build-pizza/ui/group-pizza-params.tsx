"use client"

import { cn } from "@/shared/lib/utils"

export type PizzaParam = {
  name: string
  value: string
  disabled?: boolean
}

interface Props {
  items: PizzaParam[]
  onClick?: (value: PizzaParam["value"]) => void
  value?: PizzaParam["value"]
  className?: string
}

export default function GroupPizzaParams({
  items,
  onClick,
  value,
  className,
}: Props) {
  return (
    <div
      className={cn(
        className,
        "bg-[#F3F3F7] flex justify-between rounded-3xl p-1 select-none"
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "h-[30px] flex flex-1 items-center justify-center cursor-pointer px-5 rounded-3xl text-sm transition-all duration-400",
            {
              "bg-white shadow": item.value === value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
