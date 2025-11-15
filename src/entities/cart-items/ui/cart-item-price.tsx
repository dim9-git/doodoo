import { cn } from "@/shared"

interface Props {
  value: number
  className?: string
}

export function CartItemPrice({ value, className }: Props) {
  return <h2 className={cn("font-bold", className)}>{value} ₸</h2>
}
