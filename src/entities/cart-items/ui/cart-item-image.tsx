import { cn, Skeleton } from "@/shared"

interface Props {
  src: string | null
  className?: string
}

export function CartItemImage({ src, className }: Props) {
  if (!src)
    return (
      <div>
        <Skeleton className={cn("w-[60px] h-[60px]", className)} />
      </div>
    )

  return (
    <img
      className={cn("w-[60px] h-[60px]", className)}
      src={src}
      alt={src.slice(0, 3)}
    />
  )
}
