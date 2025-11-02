import { CircleCheck } from "lucide-react"
import Image from "next/image"
import React from "react"
import { cn } from "../lib/utils"

interface Props {
  active: boolean
  className?: string
  onClick?: () => void
  imageUrl: string | null
  name: string
  price: number
}

export default function IngredientItem({
  active,
  className,
  onClick,
  imageUrl,
  name,
  price,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
        { "border border-primary": active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      {imageUrl ? (
        <Image
          width={110}
          height={110}
          src={imageUrl}
          alt={name}
          className="rounded-md"
        />
      ) : null}
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  )
}
